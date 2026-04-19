export async function POST(req: Request) {
  const { partner, prospect, context } = await req.json();
  const key = process.env.BLOOMFILTER_API_KEY;
  if (!key) return new Response(JSON.stringify({error:{message:"API key not configured"}}), {status:500, headers:{"Content-Type":"application/json"}});

  const sys = "You are an elite enterprise sales intelligence agent with web search. Produce the most thorough account intelligence docket possible for Bloomfilter, a Process Intelligence Platform for SDLC. Modules: Strategy, Financials, Process Map, Process Analysis, Work Periods, Adherence. Integrations: Jira, GitHub, Azure DevOps, Figma, GitLab, Notion, Confluence. SOC 2 Type 2. Partners: Genpact (2025 Partner of Year), SoftServe, Celonis. Customers: Whole Foods, Chipotle, UTA, Intrusion. ICP: 30-300+ developer orgs. RESEARCH: 1) Search financials with NUMBERS. 2) Find CTO/CIO/VP Eng by NAME. 3) Identify methodology and tools. 4) Find news with DATES. 5) Search job postings. 6) Research partner relationship. OUTPUT WITH EXACT MARKERS: ===PROSPECT_SNAPSHOT=== (named execs, financials, dev org, tech stack) ===USE_CASES=== (3 use cases: Name, Fit 1-10, Pain Signal, Module Alignment, Opening Line, vs Jira/Rally/Planview) ===SIGNAL_BRIEF=== (trigger with date, urgency, action with talking points) ===MEETING_STRATEGY=== (3 meetings: named contact, format, opening line, questions, landmines) ===WATCH_ITEMS=== (4 risks with mitigation) ===PARTNER_ANGLE=== (co-selling tactics, reference plays, escalation). Real names, numbers, dates.";

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01"},
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: sys,
      tools: [{type:"web_search_20250305",name:"web_search",max_uses:10}],
      messages: [{role:"user",content:"Generate an Account Intelligence Docket with live web research.\n\nPARTNER: "+partner+"\nPROSPECT: "+prospect+"\nCONTEXT: "+(context||"Conduct thorough independent research.")+"\n\nSearch for: earnings with numbers, named CTO/CIO/VP Eng, engineering org, recent news with dates, job postings, partner relationship. Cite sources."}]
    })
  });

  const data = await resp.json();
  return new Response(JSON.stringify(data), {headers:{"Content-Type":"application/json"}});
}
