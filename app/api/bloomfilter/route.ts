export async function POST(req: Request) {
  const { partner, prospect, context } = await req.json();
  const key = process.env.BLOOMFILTER_API_KEY;
  if (!key) return new Response(JSON.stringify({error:{message:"API key not configured"}}), {status:500, headers:{"Content-Type":"application/json"}});

  const sys = `CRITICAL INSTRUCTION: Do NOT narrate your search process. Do NOT write "Let me search for..." or "Now I'll look up..." — just silently perform your searches and then produce the final docket directly. Your entire response must be the structured docket and nothing else.

You are an elite enterprise sales intelligence agent with web search. Produce a comprehensive account intelligence docket for Bloomfilter, a Process Intelligence Platform for SDLC.

Bloomfilter Modules: Strategy (sync exec planning with dev), Financials (cost per task/epic, budget burn), Process Map (workflow visualization, bottlenecks), Process Analysis (adherence scoring, metrics), Work Periods (sprint analysis), Adherence (risk/compliance monitoring). Integrations: Jira, GitHub, Azure DevOps, Figma, GitLab, Notion, Confluence. SOC 2 Type 2. Partners: Genpact (2025 Partner of Year), SoftServe, Celonis. Customers: Whole Foods, Chipotle, UTA, Intrusion. ICP: 30-300+ developer orgs.

ACCURACY: Never fabricate names or numbers. Cite sources. Label claims as CONFIRMED or INFERRED. If you cannot verify something, say so.

Search for: SEC filings, earnings, LinkedIn executive profiles, company website, press releases, job postings, StackShare/GitHub, Glassdoor, industry news, partner relationships, board composition, conference talks, G2 reviews, acquisition history.

OUTPUT ONLY THESE SECTIONS — no preamble, no narration:

===PROSPECT_SNAPSHOT===
Named executives with titles and backgrounds. Real financials with numbers and sources. Engineering org size estimate. Tech stack. Development methodology. Strategic priorities.

===USE_CASES===
3 use cases: Name, Fit Score 1-10, Pain Signal with cited evidence, Module Alignment, Opening Line for AE, Competitive Differentiation vs current tools.

===SIGNAL_BRIEF===
Most actionable trigger with exact date, urgency level, and verbatim talking points.

===MEETING_STRATEGY===
3 meetings: named contact, format, objective, opening line, 5 discovery questions, landmines to avoid.

===WATCH_ITEMS===
4 risks with mitigation strategies.

===CHAMPION_ENABLEMENT===
One-paragraph business case the champion can email to their boss. 3 ROI data points. Objection responses for procurement, IT, and finance pushback.

===PARTNER_ANGLE===
Co-selling tactics, reference plays, escalation paths.`;

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01"},
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16000,
      system: sys,
      tools: [{type:"web_search_20250305",name:"web_search",max_uses:20}],
      messages: [{role:"user",content:"Research " + prospect + " thoroughly and produce the account intelligence docket. Referring partner: " + partner + ". Context: " + (context || "None provided.") + " — Remember: output ONLY the structured docket sections. No narration of your search process."}]
    })
  });

  const data = await resp.json();
  return new Response(JSON.stringify(data), {headers:{"Content-Type":"application/json"}});
}
