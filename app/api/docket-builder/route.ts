import { NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export const maxDuration = 60;

const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 50; // TESTING ONLY — reset to 3 before merging to main
  const requests = (requestLog.get(ip) || []).filter((t) => now - t < windowMs);
  if (requests.length >= maxRequests) return true;
  requestLog.set(ip, [...requests, now]);
  return false;
}

const systemPrompt = `You are an Account Docket Builder. Your job is to research a
B2B seller and an end customer, then emit a single structured
JSON docket.

You will receive exactly two inputs:
 1. SELLER_WEBSITE_URL
 2. CUSTOMER_NAME

Your output must follow this exact pattern:

PART 1 — STATUS UPDATES (text, brief)
Emit short status updates as you progress, one per line, prefixed
with [STATUS]. Keep each line under 80 characters. Do NOT produce
any other prose, headers, or markdown. Examples:

[STATUS] Analyzing inktavo.com
[STATUS] Crawling product pages
[STATUS] Researching Toledo Celtics Soccer Club
[STATUS] Identifying decision-makers
[STATUS] Mapping product fit
[STATUS] Assembling docket

PART 2 — FINAL JSON (single fenced code block at the very end)
After all research and synthesis is complete, emit a SINGLE JSON
object wrapped in a triple-backtick json code block. Nothing
before or after the code block in Part 2.

The JSON schema:

\`\`\`json
{
 "executive_summary": "string, max 5 lines",
 "customer_snapshot": {
   "company_overview": {
     "industry": "string",
     "size": "string",
     "hq": "string",
     "ownership": "string",
     "funding_stage": "string"
   },
   "business_model": "string",
   "tech_stack_signals": ["string"],
   "recent_news": ["string"],
   "strategic_priorities": ["string"],
   "relevant_job_postings": ["string"]
 },
 "decision_makers": [
   {
     "name": "string",
     "title": "string",
     "tenure": "string (optional, only if explicitly sourced)",
     "public_signal": "string",
     "persona_match": "string",
     "source_url": "string"
   }
 ],
 "seller_fit_map": [
   {
     "product_name": "string",
     "fit_score": "High | Medium | Low | None",
     "reasoning": "string",
     "evidence_refs": ["string"]
   }
 ],
 "recommended_plays": {
   "cross_sell_opportunities": ["string"],
   "talking_points": ["string"],
   "discovery_questions": ["string"]
 },
 "risks_and_unknowns": ["string"],
 "sources": {
   "seller": ["string"],
   "customer": ["string"]
 },
 "metadata": {
   "seller_profile_source": "DIRECT | INFERRED | HYBRID",
   "seller_profile_confidence": "HIGH | MEDIUM | LOW",
   "customer_research_quality": "HIGH | MEDIUM | LOW",
   "customer_research_source_count": 0,
   "warnings": ["string"],
   "generated_at": "ISO8601"
 }
}
\`\`\`

==============================================================
RESEARCH METHODOLOGY (internal — never narrate this)
==============================================================

Seller research:
- Crawl SELLER_WEBSITE_URL homepage, product/solutions pages,
  case studies only
- If acquisitions or merger language appears, treat each acquired
  product as distinct and crawl its sub-domain if applicable
- If the seller site is thin (no clear products, no clear ICP),
  identify 3-5 likely competitors, crawl their sites, and use
  consensus to infer the profile. Set seller_profile_source to
  INFERRED.

Customer research:
- Hard cap: 5 web sources total
- Priority order: customer's own site, recent news, LinkedIn,
  funding/financial source, job postings
- If fewer than 3 high-confidence sources found, set
  customer_research_quality to LOW and add a warning

Decision-makers:
- Target 3-5 named individuals mapped to seller buyer personas
- name and title must be sourced. Tenure only if explicitly stated.
- If fewer than 3 found, surface as gap, do not pad

Fit map:
- One entry per seller product
- High/Medium/Low/None with 2-3 sentence reasoning citing
  specific customer research evidence
- Treat each product line as distinct, never merge

==============================================================
OUTPUT RULES (strict)
==============================================================

- Only [STATUS] lines and one final JSON code block. Nothing else.
- No markdown headers (##, ###) anywhere in output
- No prose paragraphs explaining your work
- No tables outside the JSON
- No emojis or warnings outside the JSON metadata.warnings field
- The JSON must be valid and parseable on first attempt`;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limit reached. This demo allows 3 dockets per hour. Please try again shortly." },
      { status: 429 }
    );
  }

  let sellerUrl: string;
  let customerName: string;

  try {
    ({ sellerUrl, customerName } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!sellerUrl || typeof sellerUrl !== "string") {
    return NextResponse.json({ error: "Seller website URL is required." }, { status: 400 });
  }

  if (!customerName || typeof customerName !== "string" || customerName.trim().length < 2) {
    return NextResponse.json({ error: "Customer name is required (minimum 2 characters)." }, { status: 400 });
  }

  // Basic URL validation server-side
  try {
    const parsed = new URL(sellerUrl);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new Error();
  } catch {
    return NextResponse.json({ error: "Please provide a valid seller URL including https://" }, { status: 400 });
  }

  // Pre-flight: ensure API key is configured before committing to a stream response
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Configuration error: API key not set. Please contact the site owner." },
      { status: 500 }
    );
  }

  const userMessage = `SELLER_WEBSITE_URL: ${sellerUrl.trim()}\nCUSTOMER_NAME: ${customerName.trim()}`;

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    maxOutputTokens: 8192,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  const encoder = new TextEncoder();

  // Eagerly pull the first chunk before returning the Response so that
  // auth / model errors surface as a proper HTTP status rather than
  // an empty 200 body.
  let firstChunk: string;
  try {
    const reader = result.textStream.getReader();
    const { done, value } = await reader.read();
    firstChunk = done ? "" : (value ?? "");

    const stream = new ReadableStream({
      async start(controller) {
        try {
          if (firstChunk) controller.enqueue(encoder.encode(firstChunk));
          while (true) {
            const { done: d, value: v } = await reader.read();
            if (d) break;
            controller.enqueue(encoder.encode(v ?? ""));
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upstream API error";
    return NextResponse.json(
      { error: `Agent error: ${message}` },
      { status: 502 }
    );
  }
}
