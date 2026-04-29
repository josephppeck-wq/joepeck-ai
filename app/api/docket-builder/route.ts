import { NextRequest, NextResponse } from "next/server";
import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export const maxDuration = 300;

// ─── Rate limiter ─────────────────────────────────────────────────────────────

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

// ─── Pre-crawl: deterministic seller product discovery ────────────────────────

interface DiscoveredProduct {
  name: string;
  url: string;
}

const SKIP_DOMAINS = [
  "google.com", "facebook.com", "twitter.com", "linkedin.com",
  "instagram.com", "youtube.com", "calendly.com", "hubspot.com",
  "intercom.com", "zendesk.com", "zapier.com", "mailchimp.com",
  "wordpress.com", "wp.com", "cloudflare.com", "akamai.com",
];

function isSkippableDomain(url: string): boolean {
  try {
    const parsed = new URL(url);
    return SKIP_DOMAINS.some((d) => parsed.hostname.includes(d)) ||
      parsed.hostname.includes("/wp-content/");
  } catch {
    return true;
  }
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AccountDocketBot/1.0)" },
      redirect: "follow",
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function extractNavAnchorProducts(
  html: string,
  sellerHostname: string
): Array<{ name: string; anchor: string }> {
  // Products in multi-brand sites appear in nav as anchor links to same-domain sections
  // e.g. <a href="/#inksoft">InkSoft</a>
  const products: Array<{ name: string; anchor: string }> = [];
  const navRegex = /<nav[^>]*>([\s\S]*?)<\/nav>/gi;
  let navMatch;
  while ((navMatch = navRegex.exec(html)) !== null) {
    const navContent = navMatch[1];
    const linkRegex = /<a\s[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let linkMatch;
    while ((linkMatch = linkRegex.exec(navContent)) !== null) {
      const href = linkMatch[1];
      const text = linkMatch[2].replace(/<[^>]+>/g, "").trim();
      try {
        const parsed = new URL(href, `https://${sellerHostname}`);
        const isSameDomainAnchor = parsed.hash && parsed.hostname === sellerHostname;
        if (isSameDomainAnchor && text && text.length > 1 && text.length < 35) {
          products.push({ name: text, anchor: parsed.hash });
        }
      } catch {
        // skip
      }
    }
  }
  // Deduplicate by name
  return Array.from(new Map(products.map((p) => [p.name, p])).values());
}

function extractAllExternalLinks(
  html: string,
  sellerHostname: string
): Map<string, { url: string; context: string }> {
  // Returns map of hostname -> { url (root), context (text before the link) }
  const externalLinks = new Map<string, { url: string; context: string }>();
  const linkRegex = /<a\s[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const href = match[1];
    if (!href || href.startsWith("#") || href.startsWith("javascript:")) continue;
    try {
      const parsed = new URL(href);
      if (parsed.hostname !== sellerHostname && !isSkippableDomain(href)) {
        const rootDomain = `${parsed.protocol}//${parsed.hostname}`;
        if (!externalLinks.has(parsed.hostname)) {
          const before = html.slice(Math.max(0, match.index - 600), match.index);
          externalLinks.set(parsed.hostname, { url: rootDomain, context: before });
        }
      }
    } catch {
      // skip
    }
  }
  return externalLinks;
}

function matchNavProductsToExternalUrls(
  navProducts: Array<{ name: string; anchor: string }>,
  externalLinks: Map<string, { url: string; context: string }>
): Array<{ name: string; url: string | null }> {
  return navProducts.map(({ name }) => {
    const nameLower = name.toLowerCase().replace(/\s+/g, "");
    let bestUrl: string | null = null;

    // 1. Hostname contains the product name slug
    for (const [hostname, { url }] of Array.from(externalLinks.entries())) {
      const hostBase = hostname.replace(/^www\./, "").split(".")[0].toLowerCase();
      if (hostBase.includes(nameLower) || nameLower.includes(hostBase)) {
        bestUrl = url;
        break;
      }
    }

    // 2. Product name appears in context text before an external link
    if (!bestUrl) {
      for (const [, { url, context }] of Array.from(externalLinks.entries())) {
        if (context.toLowerCase().includes(name.toLowerCase())) {
          bestUrl = url;
          break;
        }
      }
    }

    return { name, url: bestUrl };
  });
}

function extractMergerCandidates(html: string, sellerNameCapitalized: string): string[] {
  const candidates: string[] = [];
  // "[SellerName] and [OtherName] Merge/Join/Acqui"
  const p1 = new RegExp(
    `${sellerNameCapitalized}\\s+and\\s+([A-Z][A-Za-z0-9]+(?:[A-Z][a-z0-9]+)*)\\s+(?:Merge|Join|Acqui)`,
    "g"
  );
  // "[OtherName] and [SellerName] Merge/Join/Acqui"
  const p2 = new RegExp(
    `([A-Z][A-Za-z0-9]+(?:[A-Z][a-z0-9]+)*)\\s+and\\s+${sellerNameCapitalized}\\s+(?:Merge|Join|Acqui)`,
    "g"
  );
  for (const pattern of [p1, p2]) {
    let m;
    while ((m = pattern.exec(html)) !== null) {
      const name = m[1].trim();
      if (name && name !== sellerNameCapitalized) candidates.push(name);
    }
  }
  return Array.from(new Set(candidates));
}

async function preCrawlSellerProducts(
  sellerUrl: string,
  totalTimeoutMs = 10000
): Promise<{ products: DiscoveredProduct[]; precrawlFailed: boolean }> {
  const deadline = Date.now() + totalTimeoutMs;

  const homepageHtml = await fetchWithTimeout(sellerUrl, Math.min(5000, deadline - Date.now()));
  if (!homepageHtml) return { products: [], precrawlFailed: true };

  const sellerHostname = new URL(sellerUrl).hostname;
  const sellerName = sellerHostname.replace(/^www\./, "").split(".")[0];
  const sellerNameCapitalized = sellerName.charAt(0).toUpperCase() + sellerName.slice(1);

  // Step 1: nav anchor products
  const navProducts = extractNavAnchorProducts(homepageHtml, sellerHostname);

  // Step 2: all external links
  const externalLinks = extractAllExternalLinks(homepageHtml, sellerHostname);

  // Step 3: match nav products to external URLs — only keep those with matches
  const matched = matchNavProductsToExternalUrls(navProducts, externalLinks);
  const confirmedNavProducts = matched.filter(({ url }) => url !== null) as Array<{ name: string; url: string }>;

  // Step 4: merger/acquisition candidates
  const mergerCandidates = extractMergerCandidates(homepageHtml, sellerNameCapitalized);

  // Build candidate map
  const candidateMap = new Map<string, string>();
  for (const { name, url } of confirmedNavProducts) {
    candidateMap.set(name, url);
  }
  for (const name of mergerCandidates) {
    if (!candidateMap.has(name)) {
      candidateMap.set(name, `https://www.${name.toLowerCase()}.com`);
    }
  }

  if (candidateMap.size === 0) return { products: [], precrawlFailed: true };

  // Step 5: verify candidates in parallel
  const remainingTime = deadline - Date.now();
  const perFetchTimeout = Math.min(4000, Math.floor(remainingTime / Math.max(1, candidateMap.size)));

  const verificationPromises = Array.from(candidateMap.entries()).map(
    async ([name, url]): Promise<DiscoveredProduct | null> => {
      const html = await fetchWithTimeout(url, perFetchTimeout);
      if (!html || html.length < 500) return null;
      if (!html.toLowerCase().includes(name.toLowerCase())) return null;
      return { name, url };
    }
  );

  const results = await Promise.all(verificationPromises);
  const products = results.filter((r): r is DiscoveredProduct => r !== null);
  return { products, precrawlFailed: products.length === 0 };
}

// ─── System prompt ────────────────────────────────────────────────────────────

const systemPrompt = `You are an Account Docket Builder for a B2B sales demo. Your job:
using the verified seller product list provided in the user message,
research each product and the customer, then produce a focused
product-to-customer fit analysis with concrete recommended plays.

You will receive:
 1. SELLER_WEBSITE_URL
 2. CUSTOMER_NAME
 3. CONFIRMED_SELLER_PRODUCTS — pre-verified, authoritative list

Your output must follow this exact pattern:

PART 1 — STATUS UPDATES (text)
Emit short status updates as you progress, prefixed with [STATUS].
Keep each line under 80 characters. Do NOT produce any other prose,
headers, or markdown. Examples:

[STATUS] Researching InkSoft at inksoft.com
[STATUS] Researching Printavo at printavo.com
[STATUS] Researching Toledo Celtics Soccer Club
[STATUS] Mapping product fit
[STATUS] Generating recommended plays
[STATUS] Assembling docket

PART 2 — FINAL JSON (single fenced code block at the very end)
After research is complete, emit a SINGLE JSON object wrapped
in a triple-backtick json code block. Nothing before or after.

\`\`\`json
{
  "seller_profile": {
    "company_one_liner": "string, 1 sentence",
    "product_portfolio": [
      {
        "name": "string — use name EXACTLY as given in CONFIRMED_SELLER_PRODUCTS",
        "what_it_does": "string, 1-2 sentences from visiting the product URL",
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
      "product_name": "string — must match a name from product_portfolio exactly",
      "fit_score": "High | Medium | Low | None",
      "reasoning": "string, 2-3 sentences citing specific customer evidence",
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

Seller product research:
- CONFIRMED_SELLER_PRODUCTS is the authoritative list.
  Include ALL products in product_portfolio. No additions.
  No omissions. Use each name EXACTLY as given.
- Visit each product URL to extract what_it_does, primary_user,
  and primary_value_prop from the page content.

Customer research (3 sources max):
- Customer's own website, one news source, one financial source.
  Focus on fit reasoning, not a full account brief.

Fit map:
- One entry per product (same count as product_portfolio).
- Score High/Medium/Low/None with evidence-specific reasoning.
- No generic logic. Cite what you found about the customer.

Recommended plays:
- 3 opportunities tied to specific products with concrete triggers.
- 3 talking points specific to this customer.
- 3 discovery questions surfacing real pain or stakeholder dynamics.

==============================================================
OUTPUT RULES (strict)
==============================================================

- Only [STATUS] lines and one final JSON code block. Nothing else.
- No markdown headers, prose paragraphs, or tables outside JSON.
- JSON must be valid and parseable on first attempt.
- No outbound message drafts or email templates. Intelligence only.`;

// ─── Route Handler ────────────────────────────────────────────────────────────

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

  let parsedSellerUrl: URL;
  try {
    parsedSellerUrl = new URL(sellerUrl);
    if (parsedSellerUrl.protocol !== "http:" && parsedSellerUrl.protocol !== "https:") throw new Error();
  } catch {
    return NextResponse.json({ error: "Please provide a valid seller URL including https://" }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Configuration error: API key not set. Please contact the site owner." },
      { status: 500 }
    );
  }

  // ── Pre-crawl: deterministic product discovery ──────────────────────────────
  const { products: confirmedProducts, precrawlFailed } = await preCrawlSellerProducts(
    parsedSellerUrl.href,
    10000
  );

  // ── Build user message ──────────────────────────────────────────────────────
  let userMessage = `SELLER_WEBSITE_URL: ${sellerUrl.trim()}\nCUSTOMER_NAME: ${customerName.trim()}\n`;

  if (confirmedProducts.length > 0) {
    userMessage += `\nCONFIRMED_SELLER_PRODUCTS (pre-verified — use EXACTLY these, no additions or omissions):\n`;
    for (const p of confirmedProducts) {
      userMessage += `- ${p.name} (${p.url})\n`;
    }
    userMessage += `\nVisit each product URL to extract what_it_does, primary_user, and primary_value_prop. Use each product name EXACTLY as listed above.`;
  } else {
    userMessage += `\nNote: Automated product discovery was unable to identify products from this seller's site. Please discover products by crawling the seller's homepage, navigation, and product pages. Add a warning to metadata.warnings noting that pre-crawl failed and discovery was performed by the AI.`;
  }

  // ── Stream the LLM response ─────────────────────────────────────────────────
  const result = streamText({
    model: anthropic("claude-opus-4-5-20251101"),
    maxOutputTokens: 8192,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

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
    return NextResponse.json({ error: `Agent error: ${message}` }, { status: 502 });
  }
}
