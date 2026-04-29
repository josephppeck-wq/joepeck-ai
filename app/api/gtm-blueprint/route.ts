import { NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

// Extend Vercel function timeout to maximum allowed on free tier
export const maxDuration = 60;

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

const systemPrompt = `You are Joe Peck — 20+ years building GTM from scratch. Groupon: 0 to 400+ reps, $415M revenue. DocuSign: large enterprise ARR quota, 70+ AEs. Co-founded SimpleRelevance (ML SaaS, acquired). You give operators real answers, not consulting frameworks.

Generate a focused GTM blueprint. Be specific and concise — one sharp sentence per field, not paragraphs. Total response must be under 2500 tokens.

Return ONLY this JSON (no code fences, no preamble, start with {):
{
  "executiveSummary": "2 sentences: core GTM thesis specific to these inputs",
  "icp": {
    "primarySegment": "Company size + revenue range + vertical + buyer title in one line",
    "firmographics": ["size: X-Y employees", "revenue: $XM-$YM ARR", "vertical", "stage signal"],
    "technographics": ["tech signal 1", "tech signal 2"],
    "behavioralSignals": ["buying signal 1", "buying signal 2", "timing signal"],
    "antiICP": "One sentence: who NOT to sell to and why"
  },
  "channelStrategy": [
    { "channel": "Channel name", "priority": "Primary", "rationale": "One sentence why", "firstAction": "Specific action this week" },
    { "channel": "Channel name", "priority": "Primary", "rationale": "One sentence why", "firstAction": "Specific action this week" },
    { "channel": "Channel name", "priority": "Secondary", "rationale": "One sentence why", "firstAction": "Specific action this week" }
  ],
  "teamStructure": {
    "immediate": "First hire: title + one sentence why this role first",
    "sixMonth": "Team at 6mo: X people, roles listed",
    "twelveMonth": "Team at 12mo: X people, roles listed"
  },
  "compModel": {
    "repOTE": "$XXK-$XXK OTE — one sentence rationale",
    "split": "XX/XX base/variable — one sentence rationale",
    "accelerators": "X% above quota at Y multiplier",
    "keyMetrics": ["metric: target", "metric: target", "metric: target"]
  },
  "first90Days": [
    { "week": "1-2", "focus": "Focus area", "deliverables": ["deliverable 1", "deliverable 2"] },
    { "week": "3-4", "focus": "Focus area", "deliverables": ["deliverable 1", "deliverable 2"] },
    { "week": "5-8", "focus": "Focus area", "deliverables": ["deliverable 1", "deliverable 2"] },
    { "week": "9-12", "focus": "Focus area", "deliverables": ["deliverable 1", "deliverable 2"] }
  ],
  "kpiTargets": [
    { "metric": "metric name", "target": "specific number", "timeframe": "timeframe" },
    { "metric": "metric name", "target": "specific number", "timeframe": "timeframe" },
    { "metric": "metric name", "target": "specific number", "timeframe": "timeframe" },
    { "metric": "metric name", "target": "specific number", "timeframe": "timeframe" },
    { "metric": "metric name", "target": "specific number", "timeframe": "timeframe" }
  ],
  "topRisks": [
    { "risk": "Specific risk", "mitigation": "Specific action (not 'monitor closely')" },
    { "risk": "Specific risk", "mitigation": "Specific action" },
    { "risk": "Specific risk", "mitigation": "Specific action" }
  ],
  "joesPOV": "2 sentences: the one thing most people get wrong in this specific GTM situation. Sharp, direct, reference the actual inputs."
}`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded." }, { status: 429 });
  }

  const { product, market, stage, teamSize, asp, salesCycle, motion } = await req.json();

  if (!product || !market || !stage) {
    return NextResponse.json({ error: "Product, market, and stage are required." }, { status: 400 });
  }

  // Pre-flight: ensure API key is configured
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Configuration error: API key not set." },
      { status: 500 }
    );
  }

  const result = streamText({
    model: anthropic("claude-opus-4-5-20251101"),
    maxOutputTokens: 3000,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `Generate a GTM blueprint for:
Product/Solution: ${product}
Target Market: ${market}
Company Stage: ${stage}
Current Team Size: ${teamSize || "Not specified"}
Average Deal Size: ${asp || "Not specified"}
Typical Sales Cycle: ${salesCycle || "Not specified"}
Sales Motion: ${motion || "Not specified"}`,
      },
    ],
  });

  // Eagerly read first chunk so auth errors return a proper status
  const encoder = new TextEncoder();
  try {
    const reader = result.textStream.getReader();
    const { done, value } = await reader.read();
    const firstChunk = done ? "" : (value ?? "");
    const stream = new ReadableStream({
      async start(controller) {
        try {
          if (firstChunk) controller.enqueue(encoder.encode(firstChunk));
          while (true) {
            const { done: d, value: v } = await reader.read();
            if (d) break;
            controller.enqueue(encoder.encode(v ?? ""));
          }
        } catch (err) { controller.error(err); }
        finally { controller.close(); }
      },
    });
    return new Response(stream, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upstream API error";
    return NextResponse.json({ error: `Agent error: ${message}` }, { status: 502 });
  }
}
