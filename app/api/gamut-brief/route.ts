import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

// Stub — replace with Anthropic call in next pass
export async function POST(req: NextRequest) {
  let deals: string;
  try {
    ({ deals } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!deals || typeof deals !== "string" || deals.trim().length < 5) {
    return NextResponse.json({ error: "Please provide deal data." }, { status: 400 });
  }

  // Stub response — streaming will be wired in the next pass
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode("API stub — brief generation coming in next pass."));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
