export async function POST(req: Request) {
  const { partner, prospect, context } = await req.json();
  const key = process.env.BLOOMFILTER_API_KEY;
  if (!key) return new Response(JSON.stringify({error:{message:"API key not configured"}}), {status:500, headers:{"Content-Type":"application/json"}});

  const sys = `You are an elite sales intelligence agent with web search. Do NOT narrate your searches — never write "Let me search" or "I'll look up." Just search silently.

You will be called in two phases:
PHASE 1: Search comprehensively. Use as many searches as needed to gather deep intelligence. Search for financials, executives, engineering org, tech stack, news, job postings, partner relationships, Glassdoor, industry coverage, and anything else valuable.
PHASE 2: You will be asked to compile your findings into a structured docket. At that point, write the complete docket using everything you found.

You are researching prospects for Bloomfilter, a Process Intelligence Platform for SDLC.
Modules: Strategy (sync exec planning with dev), Financials (cost per task/epic, budget burn, throughput vs investment), Process Map (workflow visualization, bottlenecks, reversals), Process Analysis (adherence scoring, delivery metrics, benchmarking), Work Periods (sprint analysis), Adherence (risk/compliance, deviation scoring).
Integrations: Jira, GitHub, Azure DevOps, Figma, GitLab, Notion, Confluence.
SOC 2 Type 2. Partners: Genpact (2025 Partner of Year), SoftServe, Celonis. Customers: Whole Foods, Chipotle, UTA, Intrusion. ICP: 30-300+ developer orgs, consulting firms, PE firms.`;

  const userMsg = "Conduct comprehensive research on " + prospect + ". Referring partner: " + partner + ". Context: " + (context || "None provided.") + " — Search as many sources as needed: SEC filings, earnings, LinkedIn executives, company website, engineering blog, job postings, press releases, StackShare, GitHub, Glassdoor, industry news, conference talks, patents, partner relationship. Be thorough.";

  // PHASE 1: Let Claude search comprehensively
  const resp1 = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01"},
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16000,
      system: sys,
      tools: [{type:"web_search_20250305",name:"web_search",max_uses:20}],
      messages: [{role:"user",content:userMsg}]
    })
  });

  const data1 = await resp1.json();
  if (data1.error) return new Response(JSON.stringify(data1), {headers:{"Content-Type":"application/json"}});

  // Check if Claude finished with text output already
  const hasText = (data1.content || []).some((b: {type: string, text?: string}) => b.type === "text" && b.text && b.text.includes("==="));
  if (hasText) {
    return new Response(JSON.stringify(data1), {headers:{"Content-Type":"application/json"}});
  }

  // PHASE 2: Claude searched but didn't write the docket yet — ask it to compile
  const compilePrompt = `Using ALL the research you just gathered, write the complete Account Intelligence Docket. Output ONLY these sections — no preamble, no narration, no commentary:

===PROSPECT_SNAPSHOT===
Named executives with verified titles and backgrounds. Real financials with specific numbers, time periods, and sources. Engineering org size estimate with evidence. Confirmed tech stack. Development methodology. Strategic priorities from executive statements. Label each fact CONFIRMED or INFERRED.

===USE_CASES===
3 use cases ranked by fit. Each: Name, Fit Score 1-10 with justification, Pain Signal citing specific evidence and source, Bloomfilter Module Alignment with specifics, ROI Hypothesis using prospect's own financial data, Opening Line for AE, Competitive Differentiation vs prospect's current tools.

===SIGNAL_BRIEF===
Most actionable trigger event with exact date and source. Urgency: URGENT/IMPORTANT/INFORMATIONAL. Verbatim talking points AE can copy-paste. Secondary signals to monitor.

===MEETING_STRATEGY===
Meeting 1 (Discovery): Named contact with LinkedIn context, format, objective, word-for-word opening line, 5 research-backed discovery questions, landmines and why.
Meeting 2 (Technical Validation): Who to bring, what to demo, how to structure.
Meeting 3 (Executive Business Case): Who in the room, financial framework, connection to their priorities.

===WATCH_ITEMS===
4 risks: 1) Competitive tools deployed — name them, positioning against each. 2) Procurement — timeline, navigation, how SOC 2 helps. 3) Internal politics — potential blockers, how to navigate. 4) Timing — budget cycles, competing priorities, optimal close window.

===CHAMPION_ENABLEMENT===
1) One-paragraph business case champion can email to their boss using prospect's own language and data. 2) 3 ROI data points tailored to this prospect. 3) Objection responses for procurement, IT, and finance pushback. 4) Competitive talking points vs tools prospect currently uses.

===PARTNER_ANGLE===
Specific co-selling tactics, credibility transfer strategy, relevant reference customers, joint value narrative, escalation paths.

Every claim must cite its source. Be specific — generic content is worthless. This docket must give the AE an unfair advantage.`;

  const resp2 = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01"},
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16000,
      system: sys,
      messages: [
        {role:"user",content:userMsg},
        {role:"assistant",content:data1.content},
        {role:"user",content:compilePrompt}
      ]
    })
  });

  const data2 = await resp2.json();
  return new Response(JSON.stringify(data2), {headers:{"Content-Type":"application/json"}});
}
