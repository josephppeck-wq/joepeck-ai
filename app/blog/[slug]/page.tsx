import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const posts: Record<string, {
  title: string;
  category: string;
  readTime: string;
  date: string;
  dateISO: string;
  description: string;
  content: string;
}> = {
  "5-ai-tools-every-sales-leader": {
    title: "The 5 AI Tools Every Sales Leader Should Be Using Right Now",
    category: "AI Strategy",
    readTime: "6 min read",
    date: "March 2025",
    dateISO: "2025-03-01",
    description: "Most sales leaders are still treating AI like a novelty. The ones who aren't are pulling away from the pack. Here are the 5 AI tools that actually move the needle for revenue teams.",
    content: `Most sales leaders are still treating AI like a novelty — something their ops team is "exploring" or something they demo at SKO to get a round of applause. The ones who aren't are pulling away from the pack fast.

I've been building with AI for the past two years, not just talking about it. Here's what's actually worth your time right now.

## 1. Claude for Deal Coaching and Playbook Creation

Forget the generic use case of "write me a cold email." The real unlock is using Claude as a thinking partner for deal strategy. Paste in your deal notes and ask it to pressure-test your qualification against MEDDPICC. Have it draft the email you need to send to your champion when the deal is stalling. Use it to synthesize call transcripts into next steps.

The quality bar here is much higher than most people realize. You need to give it context — your ICP, your value prop, your competitive positioning. But once you do, it becomes an extension of your best sales mind, available at 2am when you're prepping for a board review.

## 2. Gong or Chorus for Deal Intelligence

If you're not recording and analyzing calls at scale, you're flying blind. These tools have been around, but the AI-native features are where it gets interesting: automatic MEDDPICC scoring, competitor mention tracking, talk ratio analysis, and deal risk flags that surface before your rep even knows a deal is in trouble.

The best use case I've found: weekly pipeline review with AI-generated deal summaries. Instead of spending 90 minutes going deal by deal, your manager spends 20 minutes reviewing AI-synthesized deal health and focusing conversation on the handful of deals that actually need attention.

## 3. Clay for AI-Powered Prospecting

Clay is what every enterprise research team wishes they had in 2015. It connects to 100+ data sources and lets you build AI-powered enrichment workflows that would have taken a team of researchers to produce manually.

The magic: you define your ICP, it finds the companies, enriches them with tech stack, hiring signals, recent news, and executive changes, and then Claude drafts personalized outreach for each one. Your SDRs stop doing research and start doing outreach.

## 4. Perplexity for Account Research

Before any important call, I run the account through Perplexity. Not Google — Perplexity. It synthesizes recent news, financial information, leadership changes, and strategic initiatives into a digestible brief in 30 seconds.

The difference from a Google search: it reasons over the results and gives you a narrative, not a list of links. That narrative is what you need before walking into an executive conversation.

## 5. Your Own AI Agent (Yes, Really)

This is the one most people aren't doing yet, but should be. I run an autonomous agent on a Mac Mini in my home office that monitors industry news, tracks competitor moves, and surfaces relevant intelligence every morning.

Building your own agent sounds technical, but the tools have gotten accessible. If you can describe what you want in plain English, you can build a workflow. Start simple: an agent that monitors your top 20 accounts for news and sends you a daily digest. That alone is worth hours of research time per week.

---

The through-line across all five: AI doesn't replace the judgment of a great sales leader. It removes the grunt work so that judgment can be applied to higher-leverage decisions. That's the shift that separates the leaders who are pulling away right now from the ones who are watching it happen.`,
  },
  "why-your-forecast-is-wrong": {
    title: "Why Your Forecast Is Wrong — And How AI Fixes It",
    category: "Sales Leadership",
    readTime: "5 min read",
    date: "February 2025",
    dateISO: "2025-02-01",
    description: "Every CRO has sat in a board meeting defending a forecast they knew was fiction. AI-native pipeline scoring changes this permanently — here's how it works and what to do about it.",
    content: `I've managed $60M+ in quota across multiple organizations. I can count on one hand the number of times the forecast was actually right.

That's not a failure of math. It's a structural problem with how we collect and weight forecast inputs — and it's exactly the kind of problem AI is built to solve.

## The Root Cause

Every forecast I've seen is built on the same flawed architecture: a rep's opinion, wrapped in a stage name, dressed up in a spreadsheet.

Stage names are notoriously inconsistent. What's "Commit" at one company is "Best Case" at another. Even within the same org, two reps in the same territory interpret stage criteria differently. One rep's 90% is another's 60%.

So you average these opinions together, apply some gut-feel discount factor, and present a number to the board that everyone in the room knows is fiction.

## What AI Actually Changes

The shift isn't about better math on top of the same inputs. It's about changing what the inputs are.

Instead of asking "what does the rep think will close?", AI-native forecasting asks: What is the deal *doing*?

- How many days since the last meaningful interaction?
- Has the economic buyer been engaged in the last 30 days?
- Is the deal accelerating or decelerating compared to similar deals at this stage?
- How does the contract value compare to the rep's historical win rate at this deal size?
- Has the champion gone dark?

These are behavioral signals. They're in your CRM, your email, your calendar, your call recordings. AI can synthesize them at scale and produce a confidence score that's demonstrably more accurate than rep-submitted pipeline.

## The Gap Is Real

In the work I've done building these models, the pattern is consistent: AI-based forecasting identifies roughly 70–75% of deals that will slip before the rep flags them. The average rep calls slippage an average of 3.2 weeks late.

That 3.2 weeks is the difference between proactive intervention and a miss that was already baked in.

## What To Do About It

You don't need to rebuild your CRM. Start with the data you have. Run your closed-won and closed-lost deals from the last 18 months through an analysis that identifies which behavioral signals correlated most strongly with wins.

Once you know which signals matter, you can build a lightweight scoring model — even in a spreadsheet — that surfaces deals worth your coaching attention before they slip.

The reps will resist it at first. They always do. Then one of them wins a deal because you flagged an at-risk champion two weeks before the competition moved in, and suddenly everyone wants to know how the model works.

That's the moment your forecast goes from fiction to intelligence.`,
  },
  "autonomous-ai-agent-lessons": {
    title: "I Built an Autonomous AI Agent. Here's What It Taught Me About the Future of Work.",
    category: "Tools & Workflows",
    readTime: "8 min read",
    date: "January 2025",
    dateISO: "2025-01-01",
    description: "I built an autonomous AI agent that runs on a Mac Mini in my home office. What I learned changed how I think about every role on a revenue team — and the future of sales organizations.",
    content: `There's a Mac Mini sitting on a shelf in my home office. It's been running continuously for the past several months, doing work that used to require a team.

It monitors industry news. It researches accounts. It drafts outreach. It synthesizes intelligence and delivers it on a schedule. It doesn't take days off. It doesn't have a bad week. It doesn't need to be managed.

Building it taught me more about the future of revenue teams than 20 years of managing humans did.

## What I Actually Built

The agent is orchestrated through OpenClaw — a system that chains together different AI capabilities and tool access into a coherent workflow. At its core, it's Claude doing the reasoning, with tools that let it search the web, read documents, send messages, and take scheduled actions.

The practical setup: The agent runs on a schedule. Every morning at 6am, it pulls news about my target accounts and competitors, checks for relevant signals (leadership changes, funding announcements, product launches), drafts a briefing for me, and flags anything that needs immediate attention. If I ask it to research a specific account, it goes deep — 30-second turnaround on a brief that used to take 45 minutes.

## What This Taught Me About Sales Teams

Here's the uncomfortable truth: roughly 40% of what a typical SDR does is research, administrative work, and task coordination. Maybe more. The actual high-value work — building relationships, navigating political complexity, understanding what a buyer actually cares about — is a fraction of their day.

AI agents don't replace reps. They eliminate the 40% that wasn't generating value anyway and give reps their time back for the part that matters.

The implications:

**Team size will compress, output will not.** A 10-person SDR team running with AI-powered research and outreach assistance can produce what a 15-person team produces today. The ceiling on what each individual can handle goes up significantly.

**The skill bar rises.** When research is automated, what's left is judgment, creativity, and relationship intelligence. The average performer who spent their time on research tasks becomes visible. The exceptional performers — the ones who were always great at the human parts — become dramatically more valuable.

**Managers become architects.** The best sales managers I know already think about their team like a system: who handles what, how does information flow, what are the inputs and outputs of each role. That systems thinking is now the job description. You're not managing workflows anymore — you're designing them, with AI as one of the components.

## The Part Nobody Talks About

Building the agent also taught me something I wasn't expecting: how much of our work is about signaling effort rather than producing output.

An AI agent doesn't have meetings about the work. It doesn't update slides about the work. It doesn't send status updates about the work. It just does the work.

When you remove all the overhead, you realize how much of the modern knowledge worker's day is performance rather than production. That's an uncomfortable thing to reckon with.

I'm not saying meetings are worthless — the strategic conversations, the relationship-building, the coaching moments are irreplaceable. But a lot of what fills calendars is coordination overhead that exists because we don't have better information systems.

AI agents are better information systems.

## Where This Goes

I think in five years, every serious revenue organization will run some version of what I have on that Mac Mini. Not because it's cool, but because the competitive economics will force it. The company that deploys AI across their revenue function will have a structural cost and speed advantage that manually-operating competitors can't close.

The question isn't whether this happens. It's whether you're the person who figures it out first or the person who figures it out last.

I'd rather be first.`,
  },
  "meddpicc-in-the-age-of-ai": {
    title: "MEDDPICC in the Age of AI: What Changes and What Doesn't",
    category: "Sales Leadership",
    readTime: "7 min read",
    date: "December 2024",
    dateISO: "2024-12-01",
    description: "MEDDPICC isn't dead — it's about to get a major upgrade. Here's how AI changes the cost of gathering qualification data without changing the fundamentals of why the framework works.",
    content: `MEDDPICC isn't going anywhere. Let me be clear about that upfront, because I've seen the hot takes suggesting that AI makes deal qualification frameworks obsolete. They're wrong.

What AI does is change the cost of gathering the information MEDDPICC demands — dramatically. And that changes how you should apply it.

## What MEDDPICC Is Really About

At its core, MEDDPICC is a framework for identifying whether you have enough of the right information to be confident a deal will close. It forces you to answer hard questions:

- Do you know what metrics the buyer is trying to move?
- Have you identified and engaged the person who actually controls the budget?
- Do you understand how they'll make this decision?
- Is there someone inside the organization actively championing your solution?

These aren't questions AI can answer for you. They require human judgment, relationship intelligence, and direct conversation with buyers. AI cannot tell you whether your champion has real influence. Only you can assess that.

## What AI Changes

What AI changes is the research leg of each element.

Take Metrics. To have a meaningful conversation about business impact, you need context: How is this company performing? What are their public commitments to investors? What pain is visible in their earnings calls or press releases?

That research used to take hours. Now it takes seconds. Better research means better conversations. Better conversations mean faster qualification.

The same logic applies across every element:
- **Economic Buyer**: AI can surface org charts, recent leadership changes, board composition
- **Decision Criteria**: AI can analyze competitor win/loss patterns to predict what criteria will surface
- **Competition**: AI can monitor competitor positioning and recent wins in your territory in real time
- **Paper Process**: AI can research typical procurement patterns for similar companies

The framework doesn't change. The speed and depth of information gathering does.

## The Champion Question

Champion identification and development is the element that AI changes least, and it's also the one that matters most.

A champion is someone who believes in your solution, has organizational credibility, and is willing to spend political capital advocating for you. You cannot determine whether someone fits that profile without direct, human observation over time.

What AI can do: help you coach champions more effectively. I've used Claude to help prepare champions for internal conversations — drafting the business case, anticipating objections, structuring the ROI narrative. The champion still has to deliver it. But they deliver it better.

## The Practical Implication

If I were building a revenue org today, I would not change the MEDDPICC framework. I would change the expectation around how quickly and thoroughly reps should be able to complete each element.

In 2019, it was reasonable for a rep to take three weeks to develop a solid understanding of a prospect's decision process. Today, that information is mostly available in 20 minutes of AI-assisted research. The three weeks should now be spent on relationship development and champion coaching — the parts that actually require a human.

The framework is a checklist for what you need to know. AI changes how fast you can know it. The judgment about what to do with that information stays human.

That's not obsolescence. That's leverage.`,
  },
  "from-zero-to-400m-playbook": {
    title: "From $0 to $400M: The Playbook I'd Run Differently Today (With AI)",
    category: "AI Strategy",
    readTime: "9 min read",
    date: "November 2024",
    dateISO: "2024-11-01",
    description: "I built a sales org from zero to $415M at Groupon with 400+ reps. Here's exactly what I'd do differently today with modern AI tools — and why the delta is worth hundreds of millions.",
    content: `In 2010, I walked into Groupon and started building a sales team from nothing. Two years later, we had 400+ sellers generating $415M in revenue across 23 markets.

It was chaotic, fast, and built almost entirely on human intuition, hustle, and luck. We made a lot of money and a lot of mistakes.

I've been thinking about what I'd do differently if I were running that play today — with the AI tools that exist right now. The answer changes almost everything about execution, while the core strategy stays the same.

## What Wouldn't Change

The fundamentals of building a high-velocity sales org are not disrupted by AI. They're amplified by it.

You still need:
- A clear ICP with tight criteria for who you're going after and why
- A repeatable sales motion that new reps can learn in weeks, not months
- A compensation structure that rewards the right behaviors
- A coaching culture where managers spend time on deals, not just in reports
- A feedback loop between what sales hears and what product builds

None of that changes. AI doesn't replace the strategic clarity required to build a sales organization. If anything, it makes strategic clarity more important — because AI amplifies whatever direction you're already moving.

## What Changes Completely

### Market Mapping and ICP Development

At Groupon, we built our ICP by having reps call everyone and figure out who bought. It worked, but it took six months to develop the pattern recognition that told us where to focus.

Today, that analysis happens in days. You feed your closed-won data into an AI model, it identifies the firmographic and behavioral patterns that correlate with fast closes and high retention, and you have a refined ICP before you've made 100 calls.

We would have known in week three what we figured out in month six. That's not a marginal improvement — it changes your entire ramp trajectory.

### SDR Productivity

At Groupon's scale, a significant portion of our team's time was spent on research, data entry, and list building. We had people whose primary job was to find phone numbers. That's not an exaggeration.

With today's Clay + AI stack, one ops person can do what a team of researchers did in 2010. Your SDRs spend their time on conversations, not prep work. The unit economics of outbound change fundamentally.

### Forecasting and Pipeline Management

I made a lot of forecast decisions on gut feel in 2010. Sometimes I was right. Often I wasn't. When you're scaling at that speed, a bad call on where to add headcount or where to pull back costs you months.

AI-native forecasting gives you signal you can actually act on: which markets are overperforming, which teams are seeing deal velocity slow, which rep cohorts are underperforming relative to their pipeline. Real-time intelligence, not end-of-quarter surprises.

### Enablement at Scale

When you hire 400 people in two years, enablement is a crisis response. You build content, you run trainings, you hope enough of it sticks. The reps who figured it out faster were the ones who had the most coaching time with the best managers — which was random and inequitable.

Today, you build AI-powered coaching tools. Every rep gets immediate feedback on their call quality, their deal qualification, their email copy. The best manager's judgment gets embedded in a tool that scales to every rep simultaneously.

That's not a nice-to-have. That's the difference between your 50th percentile rep performing like your 70th percentile rep. Across 400 people, that's hundreds of millions of dollars.

## The One Thing That Doesn't Change

Here's what two decades in this business has taught me: the quality of your people still determines the ceiling.

AI raises the floor dramatically. A mediocre rep with great AI tools can outperform a good rep without them. But the great reps — the ones with judgment, resilience, strategic thinking, and the ability to build genuine trust with buyers — are still the difference between good and exceptional.

What AI does is make it clearer, faster, who those people are. The signal-to-noise ratio on performance improves when you remove the tasks that let average performers hide.

That's uncomfortable for some people. It's an enormous advantage for the ones who are genuinely excellent at the human parts of the job.

If I were building Groupon's sales team today, I'd hire fewer people, deploy them with better tools, and set a higher bar for what "good" looks like. The output would be the same. The efficiency would be unrecognizable.

That's the playbook I'd run today.`,
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = posts[params.slug];
  if (!post) return {};

  const url = `https://joepeck.ai/blog/${params.slug}`;
  const ogTitle = `${post.title} — Joe Peck`;

  return {
    title: ogTitle,
    description: post.description,
    authors: [{ name: "Joe Peck", url: "https://joepeck.ai" }],
    openGraph: {
      title: ogTitle,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.dateISO,
      authors: ["Joe Peck"],
      tags: [post.category, "Sales Leadership", "AI Strategy", "B2B Sales"],
      siteName: "Joe Peck",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: post.description,
    },
    alternates: { canonical: url },
  };
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-2xl font-bold text-white mt-12 mb-6 leading-snug">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="text-xl font-semibold text-white mt-8 mb-4 leading-snug">
          {line.slice(4)}
        </h3>
      );
    } else if (line.match(/^- \*\*(.+?)\*\*:/)) {
      const match = line.match(/^- \*\*(.+?)\*\*: (.+)$/);
      if (match) {
        elements.push(
          <li key={i} className="text-white/65 leading-relaxed mb-3 ml-4">
            <strong className="text-white/90">{match[1]}</strong>: {match[2]}
          </li>
        );
      }
    } else if (line.startsWith("- ")) {
      elements.push(
        <li key={i} className="text-white/65 leading-relaxed mb-2 ml-4 list-disc">
          {line.slice(2)}
        </li>
      );
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-4" />);
    } else if (line.startsWith("---")) {
      elements.push(<div key={i} className="divider my-10" />);
    } else {
      elements.push(
        <p key={i} className="text-white/65 leading-relaxed text-lg mb-0">
          {line}
        </p>
      );
    }
    i++;
  }
  return elements;
}

const categoryColors: Record<string, string> = {
  "AI Strategy": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Sales Leadership": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Tools & Workflows": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = posts[params.slug];
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.dateISO,
    dateModified: post.dateISO,
    author: {
      "@type": "Person",
      name: "Joe Peck",
      url: "https://joepeck.ai",
      jobTitle: "Senior Sales Executive & AI Strategist",
    },
    publisher: {
      "@type": "Person",
      name: "Joe Peck",
      url: "https://joepeck.ai",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://joepeck.ai/blog/${params.slug}`,
    },
    keywords: [post.category, "B2B Sales", "AI Strategy", "Sales Leadership", "Revenue Operations"].join(", "),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <article className="pt-32 pb-24 max-w-3xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <Link href="/blog" className="text-white/35 hover:text-white text-sm transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            All insights
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${categoryColors[post.category] || "bg-white/05 text-white/40 border-white/10"}`}>
            {post.category}
          </span>
          <span className="text-white/30 text-sm">{post.readTime}</span>
          <span className="text-white/20 text-sm">·</span>
          <span className="text-white/30 text-sm">{post.date}</span>
        </div>

        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight mb-12">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-12 pb-12 border-b border-white/08">
          <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
            <span className="text-accent font-bold text-sm">JP</span>
          </div>
          <div>
            <div className="text-white font-medium text-sm">Joe Peck</div>
            <div className="text-white/40 text-xs">Senior Sales Executive & AI Strategist</div>
          </div>
        </div>

        <div className="prose-custom">
          {renderContent(post.content)}
        </div>

        <div className="mt-16 pt-12 border-t border-white/08">
          <div className="card p-8 text-center">
            <h3 className="text-xl font-bold mb-3">Want to talk through your revenue strategy?</h3>
            <p className="text-white/55 mb-6">I work with a small number of companies at a time. If this resonated, let&apos;s connect.</p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-light text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-accent/25"
            >
              Let&apos;s Talk
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
