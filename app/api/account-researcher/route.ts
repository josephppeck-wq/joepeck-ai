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

const COMPANY_PROFILES: Record<string, string> = {
  Salesforce: "Salesforce (CRM) is the world's #1 CRM platform, headquartered in San Francisco. ~$35B annual revenue, ~70,000 employees, publicly traded (NYSE: CRM). Key products: Sales Cloud, Service Cloud, Marketing Cloud, Slack, MuleSoft. CEO: Marc Benioff. Recent focus: AI with Agentforce platform, cost optimization after major acquisitions.",
  HubSpot: "HubSpot (HUBS) is an inbound marketing and CRM platform. ~$2.6B annual revenue, ~7,000 employees. Products: CRM, Marketing Hub, Sales Hub, Service Hub, CMS. CEO: Yamini Rangan. Recent: Strong SMB and mid-market growth, AI features across product suite.",
  Gartner: "Gartner (IT) is the world's leading IT research and advisory company. ~$6B annual revenue, ~19,000 employees. Products: Research subscriptions, consulting, conferences (Magic Quadrant, Hype Cycle). CEO: Gene Hall. Primary buyers: CIOs, CTOs, VPs of IT.",
  "Workday": "Workday (WDAY) provides enterprise cloud applications for finance and HR. ~$8B annual revenue, ~20,000 employees. Products: HCM, Financial Management, Planning. CEO: Carl Eschenbach. Buying signals: HR transformation, ERP modernization, finance digitization.",
  "ServiceNow": "ServiceNow (NOW) is a digital workflow platform. ~$10B annual revenue, ~22,000 employees. Products: ITSM, HRSD, Customer Workflows, Now Platform. CEO: Bill McDermott. Strong AI push with Now Assist.",
  "Zendesk": "Zendesk is a customer service software company, taken private by PE in 2022. ~$1.7B annual revenue, ~5,000 employees. Products: Support, Sell, Sunshine Platform. CEO: Tom Eggemeier. Focus: AI-powered CX, SMB to enterprise.",
  "Outreach": "Outreach is a sales execution platform (unicorn, private). ~$300M ARR, ~1,200 employees. Products: Sales Engagement, Revenue Intelligence, Kaia AI. CEO: Manny Medina. Primary buyers: VPs of Sales, Revenue Operations.",
  "Gong": "Gong is a revenue intelligence platform (late-stage private). ~$300M ARR, ~1,000 employees. Products: Conversation Intelligence, Deal Intelligence, Forecasting. CEO: Amit Bendov. Primary buyers: VP Sales, Sales Enablement, Revenue Ops.",
  "Veeva Systems": "Veeva Systems (VEEV) is a cloud software for life sciences. ~$2.6B annual revenue, ~7,000 employees. Industry-specific CRM, content, and data products for pharma and biotech. CEO: Peter Gassner.",
  "Monday.com": "Monday.com (MNDY) is a work operating system. ~$1B annual revenue, ~2,000 employees. Products: Work OS, CRM, Dev, Service. CEO: Roy Mann. Strong mid-market growth, expanding upmarket.",
};

const ALLOWED_COMPANIES = Object.keys(COMPANY_PROFILES);

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Rate limit exceeded." }, { status: 429 });
  }

  const { company } = await req.json();

  if (!company || !ALLOWED_COMPANIES.includes(company)) {
    return NextResponse.json({ error: "Please select a valid company." }, { status: 400 });
  }

  const profile = COMPANY_PROFILES[company];

  const systemPrompt = `You are a senior revenue intelligence analyst — the kind that top-tier PE firms and enterprise sales teams rely on before major accounts. You produce briefs that make sellers sound like they've been following this company for months, even on a first call. You understand business strategy, not just sales tactics.

Your standard: a senior AE should read your brief and immediately have 3 things they can say in the first two minutes of an executive meeting that will make the buyer lean forward. Generic observations do not meet your standard. "They're focused on growth" is not intelligence. "Their latest earnings call flagged rep ramp time as their #1 sales productivity concern" is intelligence.

For stakeholder engagement angles: do not say "discuss their priorities." Tell the seller HOW to engage — what hook, what question, what insight to lead with that will make that specific persona want to continue the conversation.

For outreach angles: each angle must be genuinely differentiated. Not three variations of "I noticed you're growing." One angle from a strategic business event. One angle from a specific pain point their peer companies share. One angle that challenges their current assumption or status quo.

Respond in this exact JSON format:
{
  "companyOverview": "3-4 sentences covering what they do, their scale, market position, and one specific recent development that matters for context",
  "strategicContext": "2-3 sentences on their current strategic priorities and pressures — specific, not generic. What is this company trying to prove to the market right now?",
  "buyingSignals": ["Specific signal 1 that suggests active need or timing", "Specific signal 2", "Specific signal 3"],
  "keyStakeholders": [
    { "role": "Chief Revenue Officer", "typicalPriorities": "2-3 specific things this persona cares about at a company like this", "engagementAngle": "Specific HOW to engage — the hook, question, or insight that will earn a second sentence from this person" },
    { "role": "VP of Sales", "typicalPriorities": "...", "engagementAngle": "Specific HOW to engage — not a generic opener" },
    { "role": "Revenue Operations Leader", "typicalPriorities": "...", "engagementAngle": "..." }
  ],
  "painPoints": [
    { "pain": "Specific, named pain point this company likely experiences", "impact": "Business impact of this pain — quantify where possible", "yourAngle": "How to position your solution against this specific pain — be direct" },
    { "pain": "...", "impact": "...", "yourAngle": "..." },
    { "pain": "...", "impact": "...", "yourAngle": "..." }
  ],
  "outreachAngles": [
    { "angle": "Strategic event angle — tied to something specific happening at the company", "subject": "Subject line that would make a CRO open the email", "opener": "2-3 sentence opener that is specific, relevant, and earns a response — not a template" },
    { "angle": "Industry/peer insight angle — challenge their assumption or share a pattern from their peer set", "subject": "...", "opener": "..." },
    { "angle": "Pain + solution angle — lead with a specific pain point they're visibly experiencing", "subject": "...", "opener": "..." }
  ],
  "competitiveLandscape": "2 specific sentences on who else is likely in this account and what the differentiation argument should be — name competitors where relevant",
  "talkingPoints": ["Specific insight or stat that will make the buyer say 'I hadn't thought about it that way'", "Specific business outcome you can reference from a comparable company or situation", "Specific question to ask that positions you as strategic, not transactional"]
}`;

  try {
    const text = await callClaude(systemPrompt, `Generate a full account research brief for: ${company}\n\nCompany context: ${profile}`);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Parse error");
    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ company, ...parsed });
  } catch (error) {
    console.error("Account researcher error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Research failed: ${message}` }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ companies: ALLOWED_COMPANIES });
}
