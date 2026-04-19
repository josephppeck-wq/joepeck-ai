export async function POST(req: Request) {
  const { partner, prospect, context } = await req.json();
  const key = process.env.BLOOMFILTER_API_KEY;
  if (!key) return new Response(JSON.stringify({error:{message:"API key not configured"}}), {status:500, headers:{"Content-Type":"application/json"}});

  const sys = `You are an elite sales intelligence agent with web search. Do NOT narrate your searches. Output ONLY the structured docket.

You are researching prospects for Bloomfilter, a Process Intelligence Platform for SDLC.
Modules: Strategy (sync exec planning with dev), Financials (cost per task/epic, budget burn), Process Map (workflow visualization, bottlenecks), Process Analysis (adherence scoring, metrics), Work Periods (sprint analysis), Adherence (risk/compliance, deviation scoring).
Integrations: Jira, GitHub, Azure DevOps, Figma, GitLab, Notion, Confluence.
SOC 2 Type 2. Partners: Genpact (2025 Partner of Year), SoftServe, Celonis. Customers: Whole Foods, Chipotle, UTA, Intrusion.

ACCURACY: Never fabricate. Label CONFIRMED vs INFERRED. Cite sources.`;

  const docketInstructions = `OUTPUT ONLY THESE SECTIONS — no preamble:

===PROSPECT_SNAPSHOT===
Named executives with titles and backgrounds. Real financials with numbers and sources. Engineering org size. Tech stack. Methodology. Strategic priorities.

===USE_CASES===
3 use cases: Name, Fit Score 1-10, Pain Signal with evidence, Module Alignment, ROI Hypothesis, Opening Line for AE, Competitive Differentiation vs current tools.

===SIGNAL_BRIEF===
Most actionable trigger with date, urgency, verbatim talking points. Secondary signals.

===MEETING_STRATEGY===
Meeting 1: Named contact, format, objective, opening line, 5 discovery questions, landmines.
Meeting 2: Technical validation — who, what to demo.
Meeting 3: Executive business case — who, financial framework.

===WATCH_ITEMS===
4 risks: competitive tools, procurement, politics, timing. Each with mitigation.

===CHAMPION_ENABLEMENT===
Business case paragraph for champion. 3 ROI points. Objection responses for procurement, IT, finance.

===PARTNER_ANGLE===
Co-selling tactics, reference plays, escalation paths.

Every claim must cite its source. Generic content is worthless — be specific.`;

  // PHASE 1: Search comprehensively
  const resp1 = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01"},
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16000,
      system: sys,
      tools: [{type:"web_search_20250305",name:"web_search",max_uses:15}],
      messages: [{role:"user",content:"Research " + prospect + " thoroughly. Partner: " + partner + ". Context: " + (context || "None.") + ". Search for: financials, executives, engineering org, tech stack, news, job postings, partner relationship, Glassdoor, industry coverage. After searching, write the complete docket.\n\n" + docketInstructions}]
    })
  });

  const data1 = await resp1.json();
  if (data1.error) return new Response(JSON.stringify(data1), {headers:{"Content-Type":"application/json"}});

  // Check if docket was written in Phase 1
  const texts1 = (data1.content || []).filter((b: any) => b.type === "text").map((b: any) => b.text || "");
  const combined1 = texts1.join("");
  if (combined1.includes("===PROSPECT_SNAPSHOT===")) {
    return new Response(JSON.stringify(data1), {headers:{"Content-Type":"application/json"}});
  }

  // PHASE 2: Extract search results and ask for docket compilation
  const searchData: string[] = [];
  for (const block of (data1.content || [])) {
    if (block.type === "web_search_tool_result" && block.content) {
      for (const item of block.content) {
        if (item.type === "web_search_result" && item.text) {
          searchData.push("SOURCE: " + (item.title || "") + " (" + (item.url || "") + ")\n" + item.text);
        }
      }
    }
    if (block.type === "text" && block.text) {
      searchData.push("ANALYSIS: " + block.text);
    }
  }

  const researchSummary = searchData.join("\n\n---\n\n");

  const resp2 = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01"},
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16000,
      system: sys,
      messages: [{role:"user",content:"Here is comprehensive research gathered on " + prospect + " (referred by " + partner + "):\n\n" + researchSummary + "\n\nUsing ALL of this research, write the complete Account Intelligence Docket.\n\n" + docketInstructions}]
    })
  });

  const data2 = await resp2.json();
  return new Response(JSON.stringify(data2), {headers:{"Content-Type":"application/json"}});
}
