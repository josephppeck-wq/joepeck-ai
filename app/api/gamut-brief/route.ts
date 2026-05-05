import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60;

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are a CRO intelligence system built specifically for Gamut Podcast Network, a podcast advertising sales organization under Hubbard Radio. Gamut sells podcast advertising sponsorships across a network of 50+ shows spanning sports, entertainment, news, and comedy.

Your job is to analyze a set of active deals submitted by Gamut's CRO and produce a Morning Brief that tells him exactly where to spend his time this week.

The CRO's time is his scarcest resource. He should only be involved in deals where his presence changes the outcome. Your output should make it impossible for him to waste time in pipeline reviews or coaching sessions that don't move revenue.

CONTEXT ON GAMUT'S SALES MOTION:
- Gamut AEs sell podcast advertising packages to brand advertisers
- Deals involve CPM rates, episode counts, flight dates, show selection, and brand category fit
- Renewal timing, show download trends, and advertiser budget cycles are key risk signals
- A stalled deal in podcast ad sales usually means: wrong show match, advertiser budget uncertainty, or AE hasn't created urgency around flight dates
- The CRO's highest value is: closing deals where a senior voice accelerates the buyer, or redirecting AE time away from dead deals

OUTPUT FORMAT — produce exactly four sections:

DEALS THAT NEED YOU THIS WEEK
List each flagged deal with: Deal name/advertiser, one sentence on why the CRO's involvement changes the outcome, and one specific coaching question to ask the AE in their 1:1.

DEALS TO SKIP THIS WEEK
List deals the CRO should not spend time on, with a one-line reason the AE can hear directly.

THE ONE DEAL TO CLOSE PERSONALLY
Identify the single highest-leverage deal where the CRO getting on a call with the buyer — not the AE — is the right move. Explain why in two sentences.

WEEK ASSESSMENT
Two to three sentences on the overall health of this pipeline snapshot and what it means for the CRO's priorities this week.

Be direct. No filler. Write like a trusted advisor who has seen a thousand sales pipelines and has no patience for theater.`;

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Configuration error: API key not set." },
      { status: 500 }
    );
  }

  let deals: string;
  try {
    ({ deals } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!deals || typeof deals !== "string" || deals.trim().length < 5) {
    return NextResponse.json({ error: "Please provide deal data." }, { status: 400 });
  }

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Here are my active deals this week. Analyze them and produce my Morning Brief.\n\n${deals.trim()}`,
        },
      ],
    });

    const brief =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ brief });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upstream API error";
    return NextResponse.json(
      { error: `Brief generation failed: ${message}` },
      { status: 502 }
    );
  }
}
