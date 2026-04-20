export async function POST(req: Request) {
  const { partner, prospect, context } = await req.json();
  const key = process.env.BLOOMFILTER_API_KEY;
  if (!key) return new Response(JSON.stringify({error:{message:"API key not configured"}}), {status:500, headers:{"Content-Type":"application/json"}});

  const sys = "You are an elite sales intelligence agent with web search. Do NOT narrate searches. Output ONLY the structured docket. BLOOMFILTER STRATEGIC POSITIONING: Bloomfilter is NOT selling SDLC improvement via financial metrics. They sell improving adoption of AI to improve the SDLC. EAGER ADOPTERS have AI mandate and need governance via Agent Miner. WAIT AND SEE prospects need SDLC process intelligence first. PRODUCTS: 1) Agent Miner governance for AI agents in SDLC. 2) SDLC modules Strategy Financials Process Map Process Analysis Work Periods Adherence. 3) Both together most common. SALES MOTION: POC 5K-75K 3mo then Land 50-500 participants 50K-250K then Expand 500-2500 plus 250K-800K. CHANNELS: Celonis primary, Genpact 2025 Partner of Year, SoftServe, KMS. BLOOMFILTER TEAM: Erik Severinghaus Co-CEO Northwestern Kellogg Chicago, Andrew Wolfe Co-CEO Cleveland, Kevin Knickrehm VP Sales, Eddie Hanson Dir Sales, Sam Aborne Head Partnerships, David Luke Head CX. INVESTORS: Magarac Sequoia HPA North Coast Techstars Pacific Western Alumni Ventures. REFERENCES: Financial Services S&P Global Morgan Stanley Wells Fargo Capital One. Insurance Allstate New York Life State Farm. Automotive VW JLR Schaeffler. Pharma AstraZeneca J&J GSK Novo Nordisk. Tech ARM Booking.com Cloudflare EA Marvell. COMPETITIVE: Jira tracks tickets not AI governance. Planview plans not AI adoption. Jellyfish analytics not process mining. ACCURACY: Never fabricate. CONFIRMED vs INFERRED. Cite sources. RESEARCH PROTOCOL: 1) prospect AI adoption software development 2025 2026. 2) prospect AI mandate strategy. 3) prospect OpenAI Cursor Copilot Anthropic Claude Amazon Q. 4) prospect CTO VP Engineering site:linkedin.com to find named leaders. 5) prospect competitors AI adoption. 6) prospect regulatory FINRA ASPICE SOX HIPAA FDA. 7) prospect Celonis existing relationship. 8) prospect Magarac Sequoia HPA Techstars shared investors. 9) prospect CTO name Northwestern Kellogg Conexiom for shared background with Erik. 10) prospect Chicago technology leadership for geographic overlap. 11) AI ML Engineer Prompt Engineer LLM job postings at prospect. 12) prospect engineering blog AI adoption.";

  const docketInstructions = "OUTPUT THESE SECTIONS IN ORDER no preamble: ===PROSPECT_SNAPSHOT=== Named executives especially Chief AI Officer Head of AI. Financials. Engineering org size. Tech stack including AI tools. AI adoption maturity AGGRESSIVE ADOPTER or ACTIVE EXPLORER or WAIT AND SEE with evidence. ===AI_ADOPTION_PROFILE=== MOST IMPORTANT SECTION. PUBLIC AI STATEMENTS executive quotes about AI with dates sources. AI MANDATE formal strategy or board directive. AI TOOLS IN USE confirmed Copilot Cursor CodeWhisperer Claude Code from job postings blogs. LLM VENDOR ALIGNMENT relationships with OpenAI Anthropic Google Amazon Microsoft. REGULATORY CONSTRAINTS industry regulations FINRA ASPICE FDA SOX HIPAA that strengthen Agent Miner case. COMPETITOR AI ACTIVITY 5 closest competitors AI in development. AI READINESS SCORE 1-10 with justification. ===RELATIONSHIP_MAP=== BLOOMFILTER CONNECTIONS search each prospect executive by name cross-reference education especially Northwestern Kellogg Case Western and previous employers especially Conexiom HPA Groupon DocuSign and location Chicago Cleveland against Bloomfilter team. For each connection explain the path. If no direct connection identify closest path and tell AE exactly what to search in LinkedIn Sales Navigator. INVESTOR OVERLAP name every shared investor between Bloomfilter and prospect suggest warm intro through shared investor. CELONIS RELATIONSHIP does prospect already use Celonis. PARTNER PATHS through Genpact SoftServe KMS. ===USE_CASES=== 3 use cases through AI ADOPTION lens. Name Fit Score 1-10. AI Adoption Pain Signal with evidence. Product Agent Miner or SDLC or both. Module Alignment. Entry Point POC or Land with participants and term. Opening Line about AI adoption. Why Bloomfilter only platform governing AI agents in SDLC. ===SIGNAL_BRIEF=== Most actionable AI trigger with date. Urgency. Talking points on AI adoption. ===MEETING_STRATEGY=== 3 meetings. Meeting 1 named contact prioritize AI-titled roles opening about AI adoption 5 questions about AI journey landmines. Meeting 2 demo Agent Miner if aggressive SDLC if wait-and-see. Meeting 3 ROI around AI adoption velocity and governance. ===WATCH_ITEMS=== 4 risks including AI-specific. ===CHAMPION_ENABLEMENT=== Business case around AI governance. ROI on AI productivity and risk. Objections for we dont need AI governance yet and we already use Copilot. ===PARTNER_ANGLE=== For Celonis AI governance on existing process mining. Include Celonis relationship. Every claim cite source.";

  const userMsg = "Research " + prospect + " with emphasis on AI adoption in software development. Partner: " + partner + ". Context: " + (context || "None.") + ". Search for AI statements AI mandates LLM vendor relationships regulatory constraints competitor AI activity Bloomfilter team connections Celonis relationship AI-titled executives AI job postings." + " " + docketInstructions;

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
          searchData.push("SOURCE: " + (item.title || "") + " (" + (item.url || "") + ") " + (item.text || "").slice(0, 2000));
        }
      }
    }
    if (block.type === "text" && block.text) {
      searchData.push("ANALYSIS: " + block.text);
    }
  }

  const resp2 = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01"},
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16000,
      system: sys,
      messages: [{role:"user",content:"Research on " + prospect + " (partner: " + partner + "): " + searchData.join(" --- ") + " Write the complete docket. " + docketInstructions}]
    })
  });

  const data2 = await resp2.json();
  return new Response(JSON.stringify(data2), {headers:{"Content-Type":"application/json"}});
}