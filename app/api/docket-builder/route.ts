import { NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export const maxDuration = 300;

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

const systemPrompt = `You are an Account Docket Builder for a B2B sales demo. Your
job: research a seller's product portfolio from their website,
research a customer briefly, produce a focused product-to-customer
fit analysis, and recommend concrete plays the seller's rep can
take.

You will receive exactly two inputs:
 1. SELLER_WEBSITE_URL
 2. CUSTOMER_NAME

Your output must follow this exact pattern:

PART 1 — STATUS UPDATES (text)
Emit short status updates as you progress, prefixed with [STATUS].
Keep each line under 80 characters. Do NOT produce any other
prose, headers, or markdown. Examples:

[STATUS] Analyzing inktavo.com
[STATUS] Crawling product pages
[STATUS] Researching Toledo Celtics Soccer Club
[STATUS] Mapping product fit
[STATUS] Generating recommended plays
[STATUS] Assembling docket

PART 2 — FINAL JSON (single fenced code block at the very end)
After research is complete, emit a SINGLE JSON object wrapped
in a triple-backtick json code block. Nothing before or after
the code block.

The JSON schema:

\`\`\`json
{
  "seller_profile": {
    "company_one_liner": "string, 1 sentence",
    "product_portfolio": [
      {
        "name": "string",
        "what_it_does": "string, 1-2 sentences",
        "primary_user": "string",
        "primary_value_prop": "string, 1 sentence"
      }
    ],
    "icp": {
      "industries": ["string"],
      "company_sizes": ["string"],
      "buyer_roles": ["string"]
    },
    "top_3_differentiators": ["string"]
  },
  "customer_snapshot": {
    "name": "string",
    "industry": "string",
    "size_estimate": "string",
    "location": "string",
    "what_they_do": "string, 2-3 sentences"
  },
  "fit_map": [
    {
      "product_name": "string",
      "fit_score": "High | Medium | Low | None",
      "reasoning": "string, 2-3 sentences citing specific evidence",
      "evidence_refs": ["string (URL)"]
    }
  ],
  "recommended_plays": {
    "cross_sell_opportunities": [
      {
        "rank": 1,
        "product": "string",
        "play_type": "Land | Expand | Upsell",
        "summary": "string, 1-2 sentences",
        "why_now": "string, 1-2 sentences"
      }
    ],
    "talking_points": ["string"],
    "discovery_questions": ["string"]
  },
  "metadata": {
    "seller_profile_source": "DIRECT | INFERRED | HYBRID",
    "seller_profile_confidence": "HIGH | MEDIUM | LOW",
    "customer_research_source_count": 0,
    "warnings": ["string"]
  }
}
\`\`\`

==============================================================
RESEARCH METHODOLOGY (internal — never narrate)
==============================================================

Seller research (deep — this is the core of the demo):
- Crawl SELLER_WEBSITE_URL homepage, product/solutions pages,
  and case studies
- If acquisition or merger language appears, treat each acquired
  product as distinct. Crawl sub-domains if applicable.
- Treat each product line as a separate offering. Never merge.
- If seller site is thin, identify 3-5 competitors and use
  consensus to infer profile. Set seller_profile_source to
  INFERRED.
- When crawling any seller with multiple product brands, verify
  each product name by visiting its dedicated page on the seller's
  website. Do not infer product names from context — they must
  appear verbatim on the seller's site. If a product is mentioned
  in a press release or acquisition announcement but does not have
  a current product page, note this in the warnings field rather
  than inventing details.

Customer research (lightweight):
- Hard cap: 3 web sources total
- Priority: customer's own website, one news source, one
  industry/financial source
- Goal: enough context to reason about product fit and concrete
  plays. NOT a full account brief.

Fit map:
- One entry per seller product
- Score High/Medium/Low/None with 2-3 sentence reasoning
- Reasoning MUST cite specific evidence from customer research
- No generic fit logic. No "this would be useful for any company"

Recommended plays:
- 3 cross_sell_opportunities ranked by priority. Each ties to
  a specific product from the fit map and includes why_now (a
  concrete trigger or reason this is the right time)
- 3 talking_points that are specific to this customer, not
  generic seller pitch language
- 3 discovery_questions that surface real pain or stakeholder
  dynamics

==============================================================
OUTPUT RULES (strict)
==============================================================

- Only [STATUS] lines and one final JSON code block. Nothing else.
- No markdown headers, prose paragraphs, or tables outside the JSON.
- The JSON must be valid and parseable on first attempt.
- generated_at must use the actual current date in ISO8601 format.
- Never invent product names. If unsure, set seller_profile_source
  to INFERRED and add a warning.
- No outbound message drafts, no email templates, no LinkedIn copy.
  Intelligence only.`;

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
    model: anthropic("claude-opus-4-5-20251101"),
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
