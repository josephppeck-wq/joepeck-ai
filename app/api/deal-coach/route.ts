import { NextRequest, NextResponse } from "next/server";

const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 5;
  const requests = (requestLog.get(ip) || []).filter((t) => now - t < windowMs);
  if (requests.length >= maxRequests) return true;
  requestLog.set(ip, [...requests, now]);
  return false;
}

async function callClaude(systemPrompt: string, userMessage: string, maxTokens = 1500) {
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
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again in an hour." },
      { status: 429 }
    );
  }

  const { dealNotes } = await req.json();

  if (!dealNotes || typeof dealNotes !== "string" || dealNotes.trim().length < 20) {
    return NextResponse.json(
      { error: "Please provide at least a brief description of your deal." },
      { status: 400 }
    );
  }

  const truncated = dealNotes.slice(0, 2000);

  const systemPrompt = `You are an elite enterprise sales coach with 20+ years of experience coaching high-performing revenue organizations. You specialize in MEDDPICC deal qualification.

Analyze the deal notes provided and produce a structured MEDDPICC analysis. For each element, provide:
1. A score: Strong | Needs Work | Missing
2. A 1-2 sentence assessment of what's present or missing
3. A specific next action to advance or fill the gap

Format your response as valid JSON with this exact structure:
{
  "dealSummary": "2-sentence summary of the deal situation",
  "overallScore": "Strong|Moderate|At Risk",
  "overallAssessment": "2-3 sentence overall coaching assessment",
  "meddpicc": {
    "metrics": { "score": "Strong|Needs Work|Missing", "assessment": "...", "nextAction": "..." },
    "economicBuyer": { "score": "Strong|Needs Work|Missing", "assessment": "...", "nextAction": "..." },
    "decisionCriteria": { "score": "Strong|Needs Work|Missing", "assessment": "...", "nextAction": "..." },
    "decisionProcess": { "score": "Strong|Needs Work|Missing", "assessment": "...", "nextAction": "..." },
    "paperProcess": { "score": "Strong|Needs Work|Missing", "assessment": "...", "nextAction": "..." },
    "implicatedPain": { "score": "Strong|Needs Work|Missing", "assessment": "...", "nextAction": "..." },
    "champion": { "score": "Strong|Needs Work|Missing", "assessment": "...", "nextAction": "..." },
    "competition": { "score": "Strong|Needs Work|Missing", "assessment": "...", "nextAction": "..." }
  },
  "topThreeActions": ["action1", "action2", "action3"]
}

Be direct, specific, and coaching-forward. Don't sugarcoat gaps.`;

  try {
    const text = await callClaude(systemPrompt, `Analyze these deal notes:\n\n${truncated}`);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Could not parse response");
    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Deal coach error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Analysis failed: ${message}` }, { status: 500 });
  }
}
