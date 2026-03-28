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

  const systemPrompt = `You are a revenue intelligence analyst specializing in win/loss pattern analysis. You extract strategic insights from deal data to help sales leaders understand what's working, what isn't, and what to change.

Analyze the win/loss summaries provided and return a strategic analysis in this exact JSON format:
{
  "summary": "2-3 sentence executive summary of what you found",
  "winPatterns": [
    { "pattern": "...", "frequency": "High|Medium|Low", "insight": "..." },
    { "pattern": "...", "frequency": "High|Medium|Low", "insight": "..." },
    { "pattern": "...", "frequency": "High|Medium|Low", "insight": "..." }
  ],
  "lossPatterns": [
    { "pattern": "...", "frequency": "High|Medium|Low", "insight": "..." },
    { "pattern": "...", "frequency": "High|Medium|Low", "insight": "..." },
    { "pattern": "...", "frequency": "High|Medium|Low", "insight": "..." }
  ],
  "competitiveInsights": "2-3 sentences on competitive dynamics visible in the data",
  "playBookChanges": [
    { "change": "...", "rationale": "...", "impact": "High|Medium|Low" },
    { "change": "...", "rationale": "...", "impact": "High|Medium|Low" },
    { "change": "...", "rationale": "...", "impact": "High|Medium|Low" }
  ],
  "objectionMap": [
    { "objection": "...", "frequency": "High|Medium|Low", "recommendedResponse": "..." },
    { "objection": "...", "frequency": "High|Medium|Low", "recommendedResponse": "..." }
  ],
  "strategicRecommendation": "2-3 sentence strategic take on the single most important thing to change based on this data"
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
