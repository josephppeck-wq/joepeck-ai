export async function POST(req: Request) {
  const { partner, prospect, context } = await req.json();
  const key = process.env.BLOOMFILTER_API_KEY;
  if (!key) return new Response(JSON.stringify({error:{message:"API key not configured"}}), {status:500, headers:{"Content-Type":"application/json"}});

  const sys = `You are an elite enterprise sales intelligence agent with web search. Produce the most thorough account intelligence docket possible for Bloomfilter, a Process Intelligence Platform for SDLC.

BLOOMFILTER: Modules: Strategy, Financials, Process Map, Process Analysis, Work Periods, Adherence. Integrations: Jira, GitHub, Azure DevOps, Figma, GitLab, Notion, Confluence. SOC 2 Type 2. Partners: Genpact (2025 Partner of Year), SoftServe, Celonis. Customers: Whole Foods, Chipotle, UTA, Intrusion. ICP: 30-300+ developer orgs.

RESEARCH PROTOCOL: 1) Search prospect financials with SPECIFIC NUMBERS. 2) Find CTO/CIO/VP Engineering by NAME. 3) Identify engineering methodology and tools. 4) Find recent news with DATES. 5) Search job postings for pain signals. 6) Research partner relationship with prospect.

USE THESE EXACT SECTION MARKERS:
===PROSPECT_SNAPSHOT=== (named execs, real financials, dev org, tech stack, cite sources)
===USE_CASES=== (3 use cases: Name, Fit Score 1-10, Pain Signal with evidence, Module Alignment, Opening Line, Competitive Differentiation vs Jira/Rally/Planview)
===SIGNAL_BRIEF=== (trigger event with date, urgency level, recommended action with talking points)
===MEETING_STRATEGY===
