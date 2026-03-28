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
  "ai-agents-will-outnumber-sellers": {
    title: "By 2028, AI Agents Will Outnumber Human Sellers 10 to 1. Here's What That Actually Means.",
    category: "AI Strategy",
    readTime: "10 min read",
    date: "March 2026",
    dateISO: "2026-03-28",
    description: "Gartner says AI agents will outnumber human sellers 10-to-1 by 2028. McKinsey says only 6% of companies are extracting real value from AI. Forrester says B2B buyers will send their own AI agents to negotiate with your AI agents. Here's what the data actually means for revenue leaders who are paying attention.",
    content: `Let me give you three data points and then tell you why most people are drawing the wrong conclusions from all of them.

**Data point one:** Gartner predicts that by 2028, AI agents will outnumber human sellers by a factor of ten. In the same breath, they predict that fewer than 40% of sellers will report that those agents actually improved their productivity. Ten times the agents. Less than half the reps feeling the benefit. That's not a rounding error — that's a structural warning.

**Data point two:** McKinsey's 2025 State of AI report found that 88% of organizations are now using AI in at least one business function. Of those, only 6% — six percent — qualify as "high performers" who are extracting meaningful bottom-line value. The other 94% are running AI tools and not moving the needle.

**Data point three:** Forrester predicts that by 2026, at least one in five B2B sellers will be compelled to engage with AI-powered *buyer* agents — procurement systems that negotiate autonomously, scale across hundreds of suppliers simultaneously, and don't care about your relationship with their CFO.

Now here's where most takes go wrong: people read these numbers and reach for either euphoria or panic. The euphoria crowd says AI is going to 10× everyone's productivity and the future is infinite leverage. The panic crowd says sellers are being replaced and the profession is dying.

Both are wrong. The data tells a more interesting and more nuanced story.

## The 6% Problem Is Really an Execution Problem

Let's start with McKinsey's number, because it's the one that should scare revenue leaders the most.

88% of organizations using AI. 6% seeing real impact. That gap — 82 percentage points of wasted investment — is not a technology failure. The tools work. Claude works. Gong works. Clay works. The failure is organizational.

McKinsey's high performers share a specific profile: they use AI for transformative business change rather than task automation, they fundamentally redesign workflows rather than layering AI onto broken processes, they have C-suite championship rather than IT-driven pilots, and they invest substantially in both the technology and the change management required to make it stick.

In plain English: the companies winning with AI are the ones treating it as a strategic operating system, not a productivity hack.

The companies losing — which is most of them — are the ones who bought a Gong license, had their reps click the "AI Insights" button a few times, and reported back to the board that they're "exploring AI."

I've seen this pattern at every scale. A $50M ARR company buys an AI forecasting tool, runs it alongside their existing process for six months without integrating it into decision-making, concludes that "AI forecasting isn't ready," and files it under failed experiments. What actually failed was the implementation — not the technology.

The 6% who are winning did something different. They picked a specific, high-value workflow. They rebuilt it from first principles with AI at the center. They measured the outcome with precision. Then they moved to the next workflow.

That's it. There's no secret. The secret is discipline.

## What Gartner's 10× Number Actually Means

Back to the prediction that AI agents will outnumber human sellers 10-to-1 by 2028.

The instinct is to read this as a displacement story. More agents, fewer humans. That's probably not what happens. Here's what I think actually happens:

The number of *human* sellers doesn't collapse — the number of *tasks* a single seller is responsible for does. An AI agent running autonomously handles research, initial outreach, CRM logging, follow-up scheduling, and basic qualification. A human seller steps in when there's a real conversation to have.

What this creates is a bifurcation. The sellers who were primarily doing administrative work — list building, data entry, template-based outreach, activity tracking — those roles compress dramatically. The sellers who were always great at the high-judgment parts of the job — building trust, navigating political complexity, closing against competition — those roles become exponentially more valuable.

Gartner's caveat is the key: fewer than 40% of sellers will report that AI agents actually helped their productivity. Not because the agents don't work — because the agents weren't deployed in a way that removed real friction from the seller's day. If you give a rep 47 AI tools and tell them to figure it out, you haven't made them more productive. You've made their job more complicated.

The winners in a 10× agent world are the organizations that design the human-AI handoff deliberately. Where does the agent stop? Where does the human start? Who reviews the agent's work and what's the escalation path? These are org design questions, not technology questions.

Most companies will get this wrong. The ones who get it right will be able to run the output of a 20-person sales team with 8 people. That's not a projection. That's already happening in the early adopter cohort.

## The Plot Twist: Your Buyers Are Building Agents Too

Forrester's prediction is the one I find most fascinating and most underreported.

By 2026, at least one in five B2B sellers will face AI-powered *buyer* agents. Procurement teams deploying autonomous systems that can negotiate with hundreds of suppliers simultaneously, run RFP processes at machine speed, and optimize for pre-set parameters without human emotion or relationship bias.

Think about what this means for a moment.

The entire relationship-based model of enterprise sales — the relationship with the champion, the rapport with the economic buyer, the lunch with the procurement team — becomes irrelevant when procurement runs an autonomous agent that evaluates vendors against a scoring rubric at 3am on a Saturday.

Your champion still matters. But your champion's *agent* might matter more.

This isn't science fiction. Pactum is already running AI-powered supplier negotiations for Walmart and other enterprises. The technology is deployed and scaling. What Forrester is predicting is mass adoption — the point at which this shifts from early adopter to competitive necessity on the buyer side.

The implication for sellers: if your buyer deploys an agent, you need an agent that can respond. Not a human trying to keep up with a machine's pace and scope, but a seller-controlled agent that can engage the buyer's agent with dynamically generated counteroffers, pricing scenarios, and proposal variations — all within guardrails set by a human sales leader.

We are, in the relatively near future, going to watch two AI systems negotiate a $500,000 enterprise software deal while the humans on both sides approve the parameters and review the outcome. If that sounds implausible, remember that algorithmic trading systems have been executing multi-million dollar financial transactions without human intervention since the 1980s. The technology isn't the blocker. The adoption curve is.

## The Metric That Tells You Everything

Here's the one number I'd use to diagnose any sales organization's AI readiness right now:

What percentage of your sellers' time is spent on tasks that require human judgment?

If the answer is less than 60%, your organization has a massive AI deployment opportunity — because at least 40% of your sellers' day is being consumed by work that an agent could do better, faster, and cheaper.

If the answer is already above 80%, you're either ahead of the curve or you haven't looked closely enough.

The AI in sales market is currently valued at $8.8 billion and projected to reach $63.5 billion by 2032 — a 32.6% CAGR. That capital is flowing toward tools that eliminate the 40% of non-judgment work. Companies that deploy those tools effectively will have a structural cost advantage that compounds annually.

Companies that don't will face a competitor who can sell at a lower CAC, respond faster, personalize at higher quality, and forecast with greater accuracy — permanently, not as a temporary edge.

## What I'd Tell Any Revenue Leader Reading This

First: stop treating AI as a line item in your tech budget and start treating it as a redesign of your operating model. The 6% who are winning didn't add AI to their existing workflows. They rebuilt the workflows.

Second: identify the three highest-leverage, most repetitive tasks in your sales motion and eliminate them completely. Not "use AI to assist with them." Eliminate the human involvement entirely. Research, first-draft outreach, CRM hygiene — these should not require a human decision in 2026.

Third: invest in the human capabilities that AI can't replicate. Judgment. Creativity. The ability to read a room. Political intelligence. Relationship depth. These are your durable competitive advantages in a world where the commodity work is automated.

Fourth: start thinking about the buyer agent problem now, before it's urgent. When your biggest customer's procurement team deploys an autonomous negotiation agent, you want to have already thought through your response — not be scrambling to figure it out in the middle of a renewal.

The window to build this capability before it becomes table stakes is probably 12–18 months. The organizations that start now will have a meaningful lead. The ones that wait for the technology to mature will be catching up to competitors who already ran the playbook.

---

*The data in this piece draws on Gartner's November 2025 predictions report, McKinsey's 2025 State of AI survey, Forrester's 2026 B2B predictions, Salesforce's 2024 State of Sales report, and MarketsandMarkets AI sales market sizing research. All forecasts are projections — the future is uncertain. But the direction is not.*`,
  },
  "what-changed-in-ai-sales-2025": {
    title: "What Changed in AI Sales Tools in 2025 — And What's Coming in 2026",
    category: "AI Strategy",
    readTime: "8 min read",
    date: "March 2026",
    dateISO: "2026-03-01",
    description: "An honest assessment of what moved the needle in AI sales tools in 2025, what was pure hype, and where the smart money is going in 2026.",
    content: `I've spent the last two years building with AI, not just reading about it. Every week I'm testing new tools, shipping new workflows, and watching what actually sticks versus what makes for a good demo.

Here's my honest take on what changed in 2025 — and what I'm watching heading into 2026.

## What Actually Moved the Needle in 2025

### AI-native forecasting became real

This was the year that AI forecasting went from "interesting concept" to "this is clearly better than what we were doing." The gap between rep-submitted pipeline and behavioral signal-based forecasting became undeniable. Teams that adopted signal-based scoring saw forecast accuracy improve 30–50%. The ones still running on gut feel and stage names are losing ground fast.

I built a version of this myself — you can [try it on this site](/projects/forecast-machine) with mock data, or request a session with your real pipeline.

### Claude and GPT-4o became genuinely useful for deal work

In 2024, AI for sales was mostly copy generation. In 2025, it became strategic. Using Claude to analyze deal notes, coach reps through MEDDPICC gaps, and synthesize call transcripts into action items — these are now daily workflows, not experiments.

The quality bar crossed a threshold. The outputs are good enough to act on without heavy editing. That changes the economics of what one rep can handle.

### Autonomous agents went from demos to deployments

This is the one I'm most excited about. In 2025, a meaningful number of sales teams deployed actual autonomous agents — not AI features in existing tools, but purpose-built agents that take actions without human prompting.

I've been running one on a Mac Mini in my home office. It monitors accounts, researches contacts, drafts outreach, and logs everything. The [SDR Agent page](/projects/autonomous-sdr) on this site shows exactly how it's built. In 2026, this moves from early adopter to competitive necessity.

## What Was Mostly Hype

### "AI-powered" CRM features

Every CRM added an AI layer in 2025. Most of it was glorified autocomplete. The forecasting insights were thin, the "recommended actions" were generic, and the ROI was marginal.

The real AI value in 2025 came from external tools and custom workflows — not the AI features your CRM vendor bolted on to justify a price increase.

### AI SDRs that actually convert

The promise of fully autonomous outbound that books meetings without human involvement — not there yet. The AI SDRs in market are good at volume, bad at judgment. They can research and draft. They can't read a relationship or know when to back off.

The winning pattern right now is AI-augmented SDRs, not AI-replaced SDRs. Give your best reps AI research and personalization tools and watch their output triple. Don't replace them yet.

## What I'm Watching in 2026

### Multi-agent sales systems

The next frontier isn't one agent — it's coordinated systems of agents. An account research agent feeds a personalization agent, which feeds an outreach scheduling agent, which logs to a CRM sync agent. Each piece is simple. Together, they replace a function.

I'm actively building in this space. If you want to see where this goes, [try the GTM Blueprint tool](/projects/gtm-blueprint) — it's a primitive version of what multi-agent GTM planning will look like at scale.

### Voice AI in sales calls

This was early-stage in 2025 but it's accelerating fast. Real-time AI coaching during live calls — flagging objections, surfacing relevant case studies, suggesting talk tracks — is going to be table stakes for enterprise sales teams within 18 months.

### The consolidation wave

Right now there are hundreds of AI sales tools. By end of 2026, there will be a handful of survivors and a lot of acqui-hires. The tools that win will be the ones that integrate deeply into existing workflows rather than requiring yet another login.

## The Bottom Line

2025 was the year AI stopped being a sales tool and started being a sales advantage. The gap between teams that are building AI into their workflows and teams that are still "evaluating" is now large enough to be visible in quota attainment.

2026 is the year that gap becomes a chasm.

If you're still in evaluation mode, the window to catch up is closing. The question isn't whether to adopt AI in your revenue organization — it's whether you figure it out before your competition does.`,
  },
  "fractional-cro-model": {
    title: "The Fractional CRO Model: Why More Companies Are Choosing Flexible Leadership",
    category: "Sales Leadership",
    readTime: "6 min read",
    date: "February 2026",
    dateISO: "2026-02-01",
    description: "The full-time CRO model made sense when companies scaled linearly. AI-era companies don't. Here's why fractional sales leadership is becoming the default for smart founders.",
    content: `The traditional CRO hire goes like this: you hit $2–3M ARR, you raise a Series A, you bring in a full-time Chief Revenue Officer at $350K base plus equity, and you pray they can scale you to $20M.

Sometimes it works. More often, it doesn't.

The mismatch isn't about the person. It's about the model. Full-time CRO economics made sense when sales organizations scaled linearly — more reps, more revenue, predictable curve. The AI era doesn't work that way.

## Why the Model Is Breaking

### The expertise gap is real

Most companies raising a Series A need someone who can build a repeatable sales motion from first principles, implement AI-powered prospecting and forecasting tools, design an org structure that scales without massive headcount, and avoid the ten most expensive GTM mistakes.

That's a very specific combination. The full-time CRO market is full of operators who are excellent at scaling from $20M to $100M but have never built from zero. Or they've built from zero but in a different era, before AI changed the unit economics.

### The cost structure doesn't fit

A $350K salary plus equity for a CRO who needs 6–12 months to get up to speed is an enormous commitment for a company at $2–5M ARR. That's often 10–15% of your entire revenue in one leadership salary — before you've proven the motion works.

Most Series A companies would be dramatically better served by investing that money in the actual sales team and bringing in fractional leadership to build the system.

### AI changes the leverage ratio

This is the piece that changes everything. A fractional CRO with the right AI tools can do what used to require a full-time operator plus a team of analysts. Pipeline intelligence, forecast modeling, competitive tracking, enablement development — these used to require headcount. Now they require a Claude subscription and a few well-designed workflows.

## What Fractional Actually Looks Like

People hear "fractional" and picture an advisor who shows up once a month and offers opinions. That's not what I'm describing.

Effective fractional CRO engagement looks like:
- 2–3 days per week of active operational involvement
- Attendance at pipeline reviews, deal strategy sessions, and manager 1:1s
- Ownership of the forecast and revenue reporting
- Direct coaching of frontline managers and AEs
- System design: comp plans, territory models, tech stack, AI workflow implementation

The difference from a full-time hire: you're not paying for the 40% of a CRO's time that gets consumed by internal politics, organizational maintenance, and meetings that could have been emails.

## Who It's Right For

The fractional model works best when you're scaling from $2M to $15M ARR and need to establish your first repeatable sales motion; you've had turnover in sales leadership and need experienced stabilization while you find the right long-term hire; you're adding a new product line or entering a new market and need strategic GTM leadership without a full-time headcount commitment; or you want to implement AI-powered sales systems and need someone who has actually built them, not just recommended them.

It's not the right model if you need full-time operational presence, have a large team that requires constant daily management, or are beyond $20M ARR with a mature motion that needs optimization rather than construction.

## The Equity Question

One more piece that founders often get wrong: fractional leaders can still receive equity. A smaller grant, vesting over a shorter period, but enough to create real alignment. The best fractional arrangements feel like a partnership, not a consulting engagement.

If you're working with a fractional CRO who isn't willing to take any equity stake in your outcome, ask yourself why.

## The Bottom Line

The rise of fractional leadership isn't a trend — it's a structural shift driven by AI-era economics. The best operators can now deliver more impact in 20 hours per week than they could have in 40 hours five years ago.

For early-stage founders, the math is increasingly clear: you get more expertise, more flexibility, and better AI leverage from a senior fractional operator than from a full-time hire you can barely afford.

If you're evaluating your sales leadership situation, [I'd be happy to talk through whether a fractional engagement makes sense for where you are](/). No agenda — just a direct conversation about fit.`,
  },
  "ai-agent-budget-experiment": {
    title: "I Gave My AI Agent a Budget. Here's What Happened.",
    category: "Tools & Workflows",
    readTime: "7 min read",
    date: "January 2026",
    dateISO: "2026-01-01",
    description: "I gave my autonomous AI agent $50 and told it to generate pipeline. What it did — and what it couldn't do — was more instructive than any conference keynote.",
    content: `I've been running an autonomous AI agent for several months now. It does research, monitors accounts, drafts outreach, synthesizes intelligence. It's useful, but it's been operating in a controlled environment — defined tasks, defined outputs.

So I ran an experiment. I gave it $50 in API credits and a simple instruction: generate pipeline.

No specific accounts to target. No outreach templates to follow. No defined process. Just: figure out who to reach, figure out what to say, and try to create conversations with potential clients.

Here's what happened.

## What It Did Well

### Research was genuinely impressive

Within 20 minutes of starting, the agent had identified 23 companies that matched my ICP — Series B SaaS companies with 50–200 employees, aggressive growth targets, and signals suggesting they were rebuilding or scaling their sales motion.

The research depth was excellent. For each company, it pulled recent funding announcements, job postings (which signal intent better than almost any other data source), executive LinkedIn activity, and relevant industry news. It synthesized this into a one-paragraph account brief for each target.

This is the [AI Account Researcher](/projects/account-researcher) workflow I've productized on this site — at scale, running autonomously, with no human prompting.

### Personalization was above average

For each account, the agent drafted a first-touch outreach message. The personalization was real — it referenced the specific signals it had found, connected them to relevant pain points, and made a specific ask.

Were they perfect? No. Were they better than the average SDR cold email? Absolutely.

### The volume was legitimately impressive

In 4 hours, the agent produced: 23 researched accounts, 23 personalized outreach drafts, a prioritization ranking by fit score, and a recommended contact for each account with engagement angle.

That's a solid week of SDR work, done while I was doing other things.

## What It Couldn't Do

### It couldn't actually send anything

This is by design — I haven't given my agent email sending credentials, and I won't yet. The liability of an autonomous system sending emails under my name without review is too high at this stage.

But it's worth noting: the last mile of outbound — actually contacting humans — is still a human step. For now.

### It couldn't navigate ambiguity

When I gave it the open-ended "generate pipeline" instruction, it interpreted this narrowly: find accounts, draft messages. It didn't ask clarifying questions. It didn't explore whether there were faster paths to pipeline (like referrals, or activating a dormant relationship) that didn't involve cold outreach.

A human strategist would have started by asking: what's your current network? Who do you know? Where's the fastest path to a conversation?

The agent went to cold outreach because that's what it knows how to do. This is a real limitation — agents optimize for what they're trained to do, not for what the situation actually calls for.

### It couldn't read relationship signals

Two of the companies it identified were ones I'd had prior contact with — one a successful client engagement 18 months ago, one a deal that went cold for reasons worth understanding before re-engaging.

It found them because they fit the ICP. It had no way to know that the approach to re-engaging them should be fundamentally different from a cold approach.

Context that lives in my head — relationship history, why things ended, who trusts me — is invisible to the agent.

## What This Means for Sales Teams

The experiment taught me something important about how to think about AI agents in a sales context.

Agents are exceptional at research, synthesis, and generation at scale. They're weak at judgment, context, and the kind of relationship intelligence that lives in a rep's head.

The right model isn't "replace SDRs with agents." It's "give your best SDRs an agent that handles everything except the judgment calls."

Your rep should be reviewing the 23 accounts the agent found, adding relationship context the agent couldn't know, editing the outreach to reflect things that don't show up in public data, and making the actual send decision.

That version of an SDR can work 3–5× the pipeline of a SDR doing all of this manually. That's the unlock.

## The $50 Result

Total spend: $47.23 in API costs. Time invested by me: about 20 minutes of setup and review.

Output: a prioritized list of 23 accounts with research briefs and personalized outreach ready to go.

Did it generate pipeline? Not directly — that depends on what you do with the output. But the input required to start 23 conversations cost me $47 and 20 minutes. The question every sales leader should be asking: what does that math look like at scale, integrated into your existing motion?

The tools to find out are [already on this site](/projects). The only thing missing is the decision to start.`,
  },
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
