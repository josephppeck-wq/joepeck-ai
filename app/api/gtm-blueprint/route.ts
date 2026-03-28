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

async function callClaude(systemPrompt: string, userMessage: string, maxTokens = 3000) {
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

  const { product, market, stage, teamSize, asp, salesCycle, motion } = await req.json();

  if (!product || !market || !stage) {
    return NextResponse.json({ error: "Product, market, and stage are required." }, { status: 400 });
  }

  const systemPrompt = `You are Joe Peck — a senior SaaS sales executive with 20+ years of experience building GTM strategies from $0 to $400M+. You've led teams at Groupon (0 to 400 reps, $415M revenue), DocuSign ($20M+ ARR quota), and CloudKitchens ($20M+ revenue).

You are generating a comprehensive Go-To-Market Launch Blueprint based on the inputs provided. This should reflect the hard-won strategic judgment of a seasoned revenue leader — not generic MBA frameworks.

Produce a focused, actionable GTM blueprint in this exact JSON format:
{
  "executiveSummary": "3-4 sentences summarizing the GTM approach and core thesis",
  "icp": {
    "primarySegment": "...",
    "firmographics": ["criteria1", "criteria2", "criteria3", "criteria4"],
    "technographics": ["tech1", "tech2"],
    "behavioralSignals": ["signal1", "signal2", "signal3"],
    "antiICP": "Who NOT to sell to and why"
  },
  "channelStrategy": [
    { "channel": "...", "priority": "Primary|Secondary", "rationale": "...", "firstAction": "..." },
    { "channel": "...", "priority": "Primary|Secondary", "rationale": "...", "firstAction": "..." },
    { "channel": "...", "priority": "Primary|Secondary", "rationale": "...", "firstAction": "..." }
  ],
  "teamStructure": {
    "immediate": "Who to hire first and why",
    "sixMonth": "What the team looks like at 6 months",
    "twelveMonth": "What the team looks like at 12 months"
  },
  "compModel": {
    "repOTE": "Recommended OTE range with rationale",
    "split": "Base/variable split recommendation",
    "accelerators": "Accelerator structure",
    "keyMetrics": ["metric1", "metric2", "metric3"]
  },
  "first90Days": [
    { "week": "1-2", "focus": "...", "deliverables": ["...", "..."] },
    { "week": "3-4", "focus": "...", "deliverables": ["...", "..."] },
    { "week": "5-8", "focus": "...", "deliverables": ["...", "..."] },
    { "week": "9-12", "focus": "...", "deliverables": ["...", "..."] }
  ],
  "kpiTargets": [
    { "metric": "...", "target": "...", "timeframe": "..." },
    { "metric": "...", "target": "...", "timeframe": "..." },
    { "metric": "...", "target": "...", "timeframe": "..." },
    { "metric": "...", "target": "...", "timeframe": "..." },
    { "metric": "...", "target": "...", "timeframe": "..." }
  ],
  "topRisks": [
    { "risk": "...", "mitigation": "..." },
    { "risk": "...", "mitigation": "..." },
    { "risk": "...", "mitigation": "..." }
  ],
  "joesPOV": "Joe's personal 2-3 sentence take on the most important thing to get right in this specific GTM situation"
}

Be specific. Use real numbers. Draw on patterns from actual GTM builds, not generic advice.`;

  try {
    const text = await callClaude(systemPrompt, `Generate a GTM blueprint for:
Product/Solution: ${product}
Target Market: ${market}
Company Stage: ${stage}
Current Team Size: ${teamSize || "Not specified"}
Average Deal Size: ${asp || "Not specified"}
Typical Sales Cycle: ${salesCycle || "Not specified"}
Sales Motion: ${motion || "Not specified"}`);

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Parse error");
    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("GTM blueprint error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Blueprint generation failed: ${message}` }, { status: 500 });
  }
}
