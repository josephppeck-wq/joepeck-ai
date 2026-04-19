export async function POST(req: Request) {
  const { partner, prospect, context } = await req.json();
  const key = process.env.BLOOMFILTER_API_KEY;
  if (!key) return new Response(JSON.stringify({error:{message:"API key not configured"}}), {status:500, headers:{"Content-Type":"application/json"}});

  const sys = `You are an elite sales intelligence agent with web search. Do NOT narrate your searches. Output ONLY the structured docket.

BLOOMFILTER — WHAT THE COMPANY SELLS AND HOW:

Bloomfilter is a Process Intelligence Platform for the Software Development Lifecycle (SDLC). They also sell Agent Miner, a Frontier Process Intelligence product that gives enterprise AI agents task and process data for production-ready output.

PRODUCTS AND WHEN TO RECOMMEND EACH:
1. SDLC Process Intelligence — the core platform. Modules: Strategy (sync exec planning with dev real-time), Financials (cost per task/epic/initiative, budget burn, throughput vs investment), Process Map (visualize workflow, identify bottlenecks and reversals), Process Analysis (adherence scoring, delivery metrics, benchmarking), Work Periods (sprint analysis, flow), Adherence (risk/compliance monitoring, deviation scoring). Recommend for: any organization with 30+ developers that lacks visibility into how software gets built, where it gets stuck, and what it costs.
2. Agent Miner — gives enterprise AI agents the task and process data they need to deliver accurate, aligned output. Recommend for: organizations adopting AI coding agents or AI-assisted development who need governance, coordination, and quality controls around agent output. This is the cutting-edge differentiator — no competitor offers this.
3. SDLC + Agent Miner together — the most common deal structure. Recommend for: organizations with 100+ developers doing both traditional and AI-assisted development.

Integrations: Jira, GitHub, Azure DevOps, Figma, GitLab, Notion, Confluence.
SOC 2 Type 2 certified. $7M seed round.

SALES MOTION — HOW BLOOMFILTER CLOSES DEALS:
The proven path is: Paid POC (3-month proof of concept, $5K-$75K) → Land (initial contract, typically 50-500 developer participants, $50K-$250K ARR) → Expand (grow to 500-2,500+ participants, $250K-$800K+ ARR).
When recommending deal structure in the docket, always suggest which entry point fits this prospect:
- Small/cautious buyer: Paid POC with 50-100 participants for 3 months
- Mid-market confident buyer: Land deal with 100-250 participants for 12 months
- Enterprise with executive sponsor: Land deal with 250-500 participants for 12-24 months
Contract terms are typically 12, 24, or 36 months. Longer terms = better TCV.

PARTNER CHANNELS — HOW DEALS ARE SOURCED:
1. CELONIS (primary channel — drives majority of revenue): Bloomfilter powers Celonis's SDLC Management application. Celonis-sourced deals are labeled "New Business - Celonis." When the referring partner is Celonis, the docket should: reference the Celonis-Bloomfilter technology partnership, recommend joint positioning as "Celonis for SDLC powered by Bloomfilter," suggest engaging the Celonis account team for the prospect, and frame Bloomfilter as an extension of the Celonis platform the prospect may already use for other process mining.
2. GENPACT (Partner of the Year 2025): Advisory and consulting channel. Genpact embeds Bloomfilter in their advisory engagements. When referring partner is Genpact: leverage their enterprise credibility, position as "recommended by your trusted advisory partner."
3. SOFTSERVE: Software development consulting partner. When referring partner is SoftServe: position Bloomfilter as the tool SoftServe uses to deliver transparent, measurable development outcomes for clients.
4. KMS TECHNOLOGIES: Technology services partner. Similar co-selling motion.
5. DIRECT / OTHER: Some deals are "New Business - Standard" without a partner channel. For these, focus on direct executive outreach and industry reference customers.

PROVEN INDUSTRIES AND REFERENCE CUSTOMERS:
Bloomfilter has closed or committed deals in these industries — use these for social proof:
- Financial Services: S&P Global, Morgan Stanley, Wells Fargo, Capital One, BNP Paribas, Mastercard, PNC, MetLife, Standard Bank, Intesa Sanpaolo, Societe Generale. Reference: "We work with several of the world's largest financial institutions on SDLC process intelligence."
- Insurance: Allstate, New York Life, State Farm, R&V Versicherung, MagMutual. Reference: "Multiple top-10 insurers use Bloomfilter to govern their software development process."
- Automotive/Manufacturing: Volkswagen, Jaguar Land Rover, Schaeffler, Knorr-Bremse, Atlas Copco, Forvia Hella, Joyson Safety Systems. Reference: "Leading automotive OEMs and suppliers rely on Bloomfilter for engineering visibility across global development teams."
- Pharma/Healthcare: AstraZeneca, Johnson & Johnson, GSK, Novo Nordisk, IQVIA, Medidata. Reference: "Pharma companies with regulated development environments use Bloomfilter for compliance and process governance."
- Technology: ARM, Booking.com, Cloudflare, Electronic Arts, Marvell Technology, Aristocrat, LexisNexis, Ocado. Reference: "Technology companies with hundreds of developers use Bloomfilter to optimize engineering spend and delivery velocity."
- Energy: TC Energy, Uniper, MOL Group. Reference: "Energy companies managing critical infrastructure software trust Bloomfilter for process observability."
- Retail/CPG: Whole Foods (customer), Chipotle (customer), Walmart, Mars, Hasbro, Nestlé, Sherwin-Williams.
- Consulting/Services: Genpact, SoftServe, PWC, EY, DXC Technology, NTT Data, Indra.
- Entertainment/Media: UTA (customer), Omnicom, Motion Picture Industry Pension.
- PE/Investment: Mainsail Partners (using Bloomfilter across portfolio companies).

When generating a docket, ALWAYS reference 2-3 customers from the prospect's own industry. This is the most powerful social proof available.

COMPETITIVE POSITIONING:
Bloomfilter's competitors in the room are typically:
- Jira/Jira Align: "Jira tracks tickets. Bloomfilter mines the process around those tickets — why work gets stuck, where handoffs fail, which teams are efficient and which aren't."
- Planview/Rally: "Portfolio planning tools track what's planned. Bloomfilter shows what actually happened and why the plan didn't hold."
- Azure DevOps Analytics: "Built-in dashboards show surface metrics. Bloomfilter provides process-mined intelligence that explains the root cause."
- Jellyfish/Faros/Haystack: "Engineering analytics tools measure developer output. Bloomfilter measures the entire SDLC process including the non-developer workflow — design, review, approval, deployment."
- Manual spreadsheets/PowerPoints: "Most executive reporting is still assembled manually from Jira exports. Bloomfilter eliminates that entirely — live, continuous, automatic."

ACCURACY REQUIREMENTS:
- Never fabricate executive names, financial figures, or dates
- Label claims CONFIRMED (from official source) or INFERRED (logical deduction)
- Cite sources for confirmed facts
- If you cannot verify something, say so honestly

RESEARCH PROTOCOL:
Search for: SEC filings and earnings, LinkedIn executive profiles, company website and engineering blog, press releases and news, job postings for engineering roles, partner relationship with prospect, technology stack from job postings and StackShare, Glassdoor engineering reviews, industry analyst coverage, conference talks by engineering leaders.`;

  const docketInstructions = `OUTPUT ONLY THESE SECTIONS — no preamble, no narration:

===PROSPECT_SNAPSHOT===
Named executives with titles and backgrounds (especially CTO, CIO, VP Engineering, CPO). Real financials with numbers and sources. Engineering org size estimate with evidence. Confirmed tech stack and development methodology. Strategic priorities from executive statements. Recent leadership changes.

===USE_CASES===
3 use cases ranked by fit. Each must include:
- Name and Fit Score (1-10)
- Pain Signal — cite specific public evidence
- Product Recommendation — SDLC only, Agent Miner only, or both, with reasoning
- Module Alignment — which specific modules and how they address this pain
- Recommended Entry Point — Paid POC, Land, or direct Land with participant count estimate
- Opening Line — exact words for the AE
- Competitive Differentiation — vs. whatever tools the prospect currently uses (name them)

===SIGNAL_BRIEF===
Most actionable trigger with exact date and source. Urgency level. Verbatim talking points. Secondary signals to monitor.

===MEETING_STRATEGY===
3 meetings in sequence:
Meeting 1 (Discovery): Named contact with background, format, objective, opening line, 5 discovery questions, landmines.
Meeting 2 (Technical Validation): Who to bring, what to demo (SDLC modules and/or Agent Miner), how to structure.
Meeting 3 (Business Case): Who in the room, financial framework, deal structure recommendation (POC vs Land, participant count, contract term, estimated ARR).

===WATCH_ITEMS===
4 risks with mitigation: competitive tools, procurement, internal politics, timing.

===CHAMPION_ENABLEMENT===
1) Business case paragraph the champion can email to their CTO/CFO — use the prospect's own language and financial data
2) 3 ROI data points tailored to this prospect
3) Objection responses for "we already have Jira," "we're in a spending freeze," and "what's the implementation timeline"
4) Industry-specific social proof — name 2-3 companies in their industry that use Bloomfilter

===PARTNER_ANGLE===
Tailored to the specific referring partner:
- If Celonis: joint positioning strategy, Celonis account team activation, platform extension narrative
- If Genpact: advisory credibility transfer, co-selling meeting structure, Partner of the Year reference
- If SoftServe: development transparency narrative, co-delivery positioning
- If other/direct: recommend which partner channel to activate based on industry and deal size
Include specific co-selling tactics, reference plays, and escalation paths.

Every claim must cite its source. Be specific — generic content is worthless.`;

  const userMsg = "Research " + prospect + " thoroughly. Referring partner: " + partner + ". Context: " + (context || "None provided.") + ". Search for financials, executives, engineering org, tech stack, news, job postings, partner relationship, industry coverage. After searching, write the complete docket.\n\n" + docketInstructions;

  const resp1 = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01"},
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16000,
      system: sys,
      tools: [{type:"web_search_20250305",name:"web_search",max_uses:15}],
      messages: [{role:"user",content:userMsg}]
    })
  });

  const data1 = await resp1.json();
  if (data1.error) return new Response(JSON.stringify(data1), {headers:{"Content-Type":"application/json"}});

  const texts1 = (data1.content || []).filter((b: any) => b.type === "text").map((b: any) => b.text || "");
  const combined1 = texts1.join("");
  if (combined1.includes("===PROSPECT_SNAPSHOT===")) {
    return new Response(JSON.stringify(data1), {headers:{"Content-Type":"application/json"}});
  }

  const searchData: string[] = [];
  for (const block of (data1.content || [])) {
    if (block.type === "web_search_tool_result" && block.content) {
      for (const item of block.content) {
        if (item.type === "web_search_result" && item.text) {
          searchData.push("SOURCE: " + (item.title || "") + " (" + (item.url || "") + ")\n" + (item.text || "").slice(0, 2000));
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
      messages: [{role:"user",content:"Here is comprehensive research on " + prospect + " (referred by " + partner + "):\n\n" + researchSummary + "\n\nUsing ALL of this research, write the complete Account Intelligence Docket.\n\n" + docketInstructions}]
    })
  });

  const data2 = await resp2.json();
  return new Response(JSON.stringify(data2), {headers:{"Content-Type":"application/json"}});
}
