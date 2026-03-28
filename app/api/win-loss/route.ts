import { NextRequest, NextResponse } from "next/server";

const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 3;
  const requests = (requestLog.get(ip) || []).filter((t) => now - t < windowMs);
  if (requests.length >= maxRequests) return true;
  requestLog.set(ip, [...requests, now]);
  return false;
}

async function callClaude(systemPrompt: string, userMessage: string, maxTokens = 2000) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not configured");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-opus-4-5-20251101",
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.content[0].text as string;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded." }, { status: 429 });
  }

  const { dealSummaries } = await req.json();

  if (!dealSummaries || dealSummaries.trim().length < 50) {
    return NextResponse.json({ error: "Please provide at least 3 deal summaries." }, { status: 400 });
  }

  const truncated = dealSummaries.slice(0, 3000);

  const systemPrompt = `You are a Chief Revenue Officer with 20 years of experience and a pattern-recognition engine. You have reviewed hundreds of win/loss datasets and you know that most companies sit on a goldmine of strategic intelligence in their closed deals — and almost none of them mine it properly.

Your standard for this analysis: a CRO should read your strategicRecommendation and immediately know what to change in their sales motion. Not a general observation. Not "improve qualification." A specific, concrete change they can brief their managers on tomorrow morning.

Win pattern insights must explain WHY — not just that you won when you had an executive sponsor, but why executive sponsors matter at this deal size or in this buying environment, and what that tells you about where to invest in future deals.

Loss pattern insights must be brutally honest. Don't soften findings. If the data suggests the product is being beaten on price consistently, say it plainly and give the mitigation strategy. If the data suggests reps are losing because they're not reaching economic buyers, say it and tell them what to change.

The playbook changes must be prioritized. The High-impact items should be specific enough to include in a sales manager's coaching guide.

The strategicRecommendation is the single most important output. It should be the ONE thing a sales leader should change based on this data — the insight that moves the needle. If they do nothing else, they should do this.

Analyze the win/loss summaries provided and return a strategic analysis in this exact JSON format:
{
  "summary": "2-3 sentence executive summary of the most important finding — lead with the most surprising or actionable insight, not a generic overview",
  "winPatterns": [
    { "pattern": "Specific pattern observed in wins", "frequency": "High|Medium|Low", "insight": "Why this pattern matters and what it tells you about where to focus — specific, not generic" },
    { "pattern": "...", "frequency": "High|Medium|Low", "insight": "..." },
    { "pattern": "...", "frequency": "High|Medium|Low", "insight": "..." }
  ],
  "lossPatterns": [
    { "pattern": "Specific pattern observed in losses", "frequency": "High|Medium|Low", "insight": "Honest assessment of why this pattern causes losses and what needs to change — be direct" },
    { "pattern": "...", "frequency": "High|Medium|Low", "insight": "..." },
    { "pattern": "...", "frequency": "High|Medium|Low", "insight": "..." }
  ],
  "competitiveInsights": "2-3 specific sentences on competitive dynamics visible in the data — name competitors where evident, describe where you're winning and losing and why",
  "playBookChanges": [
    { "change": "Specific, actionable change to the sales process or playbook", "rationale": "Why this change based on the data — reference specific patterns", "impact": "High|Medium|Low" },
    { "change": "...", "rationale": "...", "impact": "High|Medium|Low" },
    { "change": "...", "rationale": "...", "impact": "High|Medium|Low" }
  ],
  "objectionMap": [
    { "objection": "Specific objection that appears in the data", "frequency": "High|Medium|Low", "recommendedResponse": "Specific, concrete response strategy — not 'acknowledge the concern' but what to actually say and do" },
    { "objection": "...", "frequency": "High|Medium|Low", "recommendedResponse": "..." }
  ],
  "strategicRecommendation": "The ONE thing this sales organization should change immediately based on the data. Specific, concrete, and briefable to a frontline manager in 60 seconds. This should be the insight that makes the CRO say 'I needed to hear that.'"
}`;

  try {
    const text = await callClaude(systemPrompt, `Analyze these win/loss summaries:\n\n${truncated}`);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Parse error");
    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Win/loss error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Analysis failed: ${message}` }, { status: 500 });
  }
}
