export async function POST(req: Request) {
  const { partner, prospect, context } = await req.json();
  const key = process.env.BLOOMFILTER_API_KEY;
  if (!key) return new Response(JSON.stringify({error:{message:"API key not configured"}}), {status:500, headers:{"Content-Type":"application/json"}});

  const sys = `You are a sales intelligence agent with web search. Do NOT narrate searches. Output ONLY the final docket.

IMPORTANT: You have a LIMITED number of searches. Use NO MORE THAN 8 searches total. Be strategic — combine searches, prioritize the most valuable sources. After searching, you MUST write the complete docket. Do not spend all your capacity on searching.

Research this prospect for Bloomfilter, a Process Intelligence Platform for SDLC (modules: Strategy, Financials, Process Map, Process Analysis, Work Periods, Adherence). Partners: Genpact (2025 Partner of Year), SoftServe, Celonis. Customers: Whole Foods, Chipotle, UTA, Intrusion. ICP: 30-300+ developer orgs.

SEARCH STRATEGY (max 8 searches):
1. "[prospect] revenue earnings 2025 2026" — financials
2. "[prospect] CTO VP Engineering leadership" — key executives
3. "[prospect] engineering jobs software developer" — team size, tools, methodology
4. "[prospect] digital transformation technology news 2025 2026" — recent signals
5. "[prospect] [partner] partnership" — partner relationship
6-8. Fill gaps from first 5 searches

ACCURACY: Never fabricate. Label CONFIRMED vs INFERRED. Cite sources.

AFTER SEARCHING, OUTPUT THESE SECTIONS:

===PROSPECT_SNAPSHOT===
Named executives, real financials with numbers and sources, engineering org estimate, tech stack, methodology, strategic priorities.

===USE_CASES===
3 use cases: Name, Fit Score 1-10, Pain Signal with cited evidence, Module Alignment, Opening Line for AE, Competitive Differentiation vs current tools.

===SIGNAL_BRIEF===
Most actionable trigger with date, urgency, verbatim talking points.

===MEETING_STRATEGY===
3 meetings: contact name/title, format, objective, opening line, 5 discovery questions, landmines.

===WATCH_ITEMS===
4 risks with mitigation strategies.

===CHAMPION_ENABLEMENT===
Business case paragraph for champion to email their boss. 3 ROI points. Objection responses.

===PARTNER_ANGLE===
Co-selling tactics, reference plays, escalation paths.`;

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01"},
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16000,
      system: sys,
      tools: [{type:"web_search_20250305",name:"web_search",max_uses:8}],
      messages: [{role:"user",content:"Research " + prospect + " and produce the complete account intelligence docket. Partner: " + partner + ". Context: " + (context || "None.") + " — Use no more than 8 searches, then WRITE THE FULL DOCKET with all 7 sections. The docket is the deliverable, not the searches."}]
    })
  });

  const data = await resp.json();

  // If Claude paused after searching, continue to get the docket
  if (data.stop_reason === "pause_turn" || data.stop_reason === "tool_use") {
    const resp2 = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01"},
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 16000,
        system: sys,
        messages: [
          {role:"user",content:"Research " + prospect + " and produce the complete account intelligence docket. Partner: " + partner + ". Context: " + (context || "None.") + " — Use no more than 8 searches, then WRITE THE FULL DOCKET with all 7 sections."},
          {role:"assistant",content:data.content},
          {role:"user",content:"Now write the complete docket using all the research you gathered. Output all 7 sections starting with ===PROSPECT_SNAPSHOT===. No narration."}
        ],
        tools: [{type:"web_search_20250305",name:"web_search",max_uses:0}]
      })
    });
    const data2 = await resp2.json();
    return new Response(JSON.stringify(data2), {headers:{"Content-Type":"application/json"}});
  }

  return new Response(JSON.stringify(data), {headers:{"Content-Type":"application/json"}});
}
