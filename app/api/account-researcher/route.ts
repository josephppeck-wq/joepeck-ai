import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

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

// Curated company profiles for consistent, high-quality outputs
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

  const systemPrompt = `You are a world-class sales researcher producing executive-quality account briefs. You have deep knowledge of enterprise SaaS companies and sales dynamics.

Using the company context provided, produce a comprehensive account research brief that a senior AE would use before a first executive meeting. The brief should position the seller to demonstrate business acumen and earn a second meeting.

Respond in this exact JSON format:
{
  "companyOverview": "3-4 sentences covering what they do, scale, and market position",
  "strategicContext": "2-3 sentences on their current strategic priorities and pressures",
  "buyingSignals": ["signal1", "signal2", "signal3"],
  "keyStakeholders": [
    { "role": "Chief Revenue Officer", "typicalPriorities": "...", "engagementAngle": "..." },
    { "role": "VP of Sales", "typicalPriorities": "...", "engagementAngle": "..." },
    { "role": "Revenue Operations Leader", "typicalPriorities": "...", "engagementAngle": "..." }
  ],
  "painPoints": [
    { "pain": "...", "impact": "...", "yourAngle": "..." },
    { "pain": "...", "impact": "...", "yourAngle": "..." },
    { "pain": "...", "impact": "...", "yourAngle": "..." }
  ],
  "outreachAngles": [
    { "angle": "...", "subject": "...", "opener": "..." },
    { "angle": "...", "subject": "...", "opener": "..." },
    { "angle": "...", "subject": "...", "opener": "..." }
  ],
  "competitiveLandscape": "2 sentences on who else they're likely talking to and how to differentiate",
  "talkingPoints": ["point1", "point2", "point3"]
}`;

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `Generate a full account research brief for: ${company}\n\nCompany context: ${profile}`,
        },
      ],
      system: systemPrompt,
    });

    const content = message.content[0];
    if (content.type !== "text") throw new Error("Unexpected response");

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Parse error");

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json({ company, ...parsed });
  } catch (error) {
    console.error("Account researcher error:", error);
    return NextResponse.json({ error: "Research failed. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ companies: ALLOWED_COMPANIES });
}
