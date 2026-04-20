export async function POST(req: Request) {
  const { partner, prospect, context } = await req.json();
  const key = process.env.BLOOMFILTER_API_KEY;
  if (!key) return new Response(JSON.stringify({error:{message:"API key not configured"}}), {status:500, headers:{"Content-Type":"application/json"}});

  const sys = "You are an elite sales intelligence agent with web search. Do NOT narrate searches. Output ONLY the structured docket. BLOOMFILTER STRATEGIC POSITIONING: Bloomfilter is NOT selling SDLC improvement via financial metrics. They are selling improving adoption of AI to improve the SDLC. Key qualifier: How aggressive is this prospect in adopting AI in software development? EAGER ADOPTERS have AI mandate, use AI coding tools, need governance - Agent Miner is perfect. WAIT AND SEE prospects need SDLC process intelligence first. PRODUCTS: 1) Agent Miner - governance for AI agents in SDLC (Cursor, Copilot, Codex, Claude Code, Amazon Q). 2) SDLC Process Intelligence - Strategy, Financials, Process Map, Process Analysis, Work Periods, Adherence. 3) Both together most common. SALES MOTION: POC ($5K-75K 3mo) then Land (50-500 participants $50K-250K) then Expand (500-2500+ $250K-800K+). CHANNELS: Celonis (primary), Genpact (2025 Partner of Year), SoftServe, KMS. BLOOMFILTER TEAM for relationship mapping: Erik Severinghaus (Co-CEO Northwestern Kellogg Chicago), Andrew Wolfe (Co-CEO Cleveland), Kevin Knickrehm (VP Sales), Eddie Hanson (Dir Sales), Sam Aborne (Head Partnerships), David Luke (Head CX). INVESTORS: Magarac Venture Partners, Sequoia, HPA, North Coast Ventures, Techstars, Pacific Western Bank, Alumni Ventures. REFERENCES: Financial Services (S&P Global Morgan Stanley Wells Fargo Capital One BNP Paribas Mastercard Standard Bank). Insurance (Allstate New York Life State Farm). Automotive (VW JLR Schaeffler Knorr-Bremse). Pharma (AstraZeneca J&J GSK Novo Nordisk IQVIA Medidata). Tech (ARM Booking.com Cloudflare EA Marvell LexisNexis). Energy (TC Energy Uniper). Retail (Whole Foods Chipotle Walmart Nestle). COMPETITIVE: Jira/Jira Align tracks tickets not AI governance. Planview/Rally planning not AI adoption. Jellyfish/Faros analytics not process mining or AI governance. ACCURACY: Never fabricate. CONFIRMED vs INFERRED. Cite sources. RESEARCH PROTOCOL - AI ADOPTION (HIGHEST PRIORITY): 1) prospect AI adoption software development 2025 2026. 2) prospect AI mandate strategy. 3) prospect OpenAI OR Cursor OR Copilot OR Anthropic OR Claude OR Amazon Q. 4) prospect AI coding agents engineering. 5) prospect competitors AI adoption. REGULATORY: 6) prospect regulatory software FINRA ASPICE SOX HIPAA FDA. 7) prospect AI governance risk. RELATIONSHIPS: 8) connections between Bloomfilter team and prospect - LinkedIn shared employers alumni Northwestern Kellogg Chicago. 9) prospect Magarac OR Sequoia OR Techstars shared investors. CELONIS: 10) prospect Celonis existing relationship. LEADERSHIP: 11) CTO CIO VP Engineering Chief AI Officer Head of AI by NAME. 12) leaders posting about AI on LinkedIn or conferences. ENGINEERING: 13) AI ML Engineer Prompt Engineer LLM job postings. 14) engineering blog AI adoption. 15) GitHub StackShare AI tools.";

  const docketInstructions = "OUTPUT THESE SECTIONS IN ORDER - no preamble: ===PROSPECT_SNAPSHOT=== Named executives especially Chief AI Officer or Head of AI. Financials. Engineering org size. Tech stack including AI tools. AI adoption maturity AGGRESSIVE ADOPTER or ACTIVE EXPLORER or WAIT AND SEE with evidence. ===AI_ADOPTION_PROFILE=== MOST IMPORTANT SECTION. PUBLIC AI STATEMENTS with quotes dates sources. AI MANDATE formal strategy or board directive. AI TOOLS IN USE confirmed from job postings or blogs (Copilot Cursor CodeWhisperer Claude Code). LLM VENDOR ALIGNMENT relationships with OpenAI Anthropic Google Amazon Microsoft. REGULATORY CONSTRAINTS industry regulations (FINRA ASPICE FDA SOX HIPAA) that STRENGTHEN Agent Miner case. COMPETITOR AI ACTIVITY what 5 closest competitors doing with AI. AI READINESS SCORE 1-10 with justification. ===RELATIONSHIP_MAP=== BLOOMFILTER CONNECTIONS LinkedIn overlap shared schools (Northwestern Kellogg) shared employers Chicago connections. INVESTOR OVERLAP shared investors (Magarac Sequoia HPA North Coast Techstars). CELONIS RELATIONSHIP does prospect use Celonis already. PARTNER PATHS through Genpact SoftServe KMS. ===USE_CASES=== 3 use cases through AI ADOPTION lens. Name Fit Score 1-10. AI Adoption Pain Signal with evidence. Product Agent Miner or SDLC or both. Module Alignment. Entry Point POC or Land with participants and term. Opening Line about AI adoption. Why Bloomfilter is only platform governing AI agents in SDLC. ===SIGNAL_BRIEF=== Most actionable AI-related trigger with date. Urgency. Talking points on AI adoption. ===MEETING_STRATEGY=== 3 meetings. Meeting 1 named contact prioritize AI-titled roles opening about AI adoption 5 questions about AI journey landmines. Meeting 2 demo Agent Miner if aggressive or SDLC if wait-and-see. Meeting 3 ROI framed around AI adoption velocity and governance. ===WATCH_ITEMS=== 4 risks including AI-specific (prospect thinks governance premature or locked into competing platform). ===CHAMPION_ENABLEMENT=== Business case around AI adoption governance. ROI on AI productivity and risk. Objections for we dont need AI governance yet and we already use Copilot. ===PARTNER_ANGLE=== For Celonis AI governance on top of existing process mining. Include Celonis relationship from research. Every claim cite source.";

  const userMsg = "Research " + prospect + " with emphasis on AI adoption in software development. Partner: " + partner + ". Context: " + (context || "None.") + ". Search for: AI statements, AI mandates, LLM vendor relationships, regulatory constraints, competitor AI activity, Bloomfilter team connections, Celonis relationship, AI-titled executives, AI job postings.\n\n" + docketInstructions;

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

  const resp2 = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01"},
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 16000,
      system: sys,
      messages: [{role:"user",content:"Research on " + prospect + " (partner: " + partner + "):\n\n" + searchData.join("\n\n---\n\n") + "\n\nWrite the complete docket.\n\n" + docketInstructions}]
    })
  });

  const data2 = await resp2.json();
  return new Response(JSON.stringify(data2), {headers:{"Content-Type":"application/json"}});
}