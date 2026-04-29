import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

const projects = [
  {
    slug: "deal-coach",
    title: "The Deal Coach",
    subtitle: "Paste your deal notes. Get instant MEDDPICC coaching.",
    category: "Enablement",
    status: "live",
    description: "AI-powered deal analysis that gives reps immediate, methodology-specific feedback on every deal in their pipeline. No more waiting for manager availability.",
    metric: "30 sec",
    metricLabel: "to full deal analysis",
    gradient: "from-blue-600/20 to-indigo-600/10",
  },
  {
    slug: "account-researcher",
    title: "The AI Account Researcher",
    subtitle: "Full account briefs in 30 seconds, not 45 minutes.",
    category: "Prospecting",
    status: "live",
    description: "An AI agent that produces complete account research briefs — company context, stakeholder mapping, pain points, and personalized outreach angles — instantly.",
    metric: "45 min → 30s",
    metricLabel: "research time reduction",
    gradient: "from-emerald-600/20 to-teal-600/10",
  },
  {
    slug: "gtm-blueprint",
    title: "The GTM Blueprint Generator",
    subtitle: "20 years of GTM knowledge. Instant output.",
    category: "GTM Strategy",
    status: "live",
    description: "Input your product, market, and stage. Get a complete go-to-market blueprint: ICP, channels, team structure, comp model, 90-day plan, and KPI targets.",
    metric: "Week 1",
    metricLabel: "strategy most consultants take months to deliver",
    gradient: "from-violet-600/20 to-purple-600/10",
  },
  {
    slug: "autonomous-sdr",
    title: "The Autonomous SDR Agent",
    subtitle: "Outbound at scale. Zero manual research.",
    category: "Autonomous Agents",
    status: "live",
    description: "A fully autonomous agent that researches accounts, identifies decision-makers, drafts personalized sequences, and logs everything to a CRM — without human intervention.",
    metric: "50 sequences",
    metricLabel: "produced in 12 minutes",
    gradient: "from-orange-600/20 to-red-600/10",
  },
  {
    slug: "forecast-machine",
    title: "The Forecast Truth Machine",
    subtitle: "Stop guessing. Start knowing.",
    category: "Forecasting",
    status: "live",
    description: "AI pipeline scoring that analyzes behavioral signals — not rep opinions — to produce a confidence-weighted forecast that's demonstrably more accurate than traditional methods.",
    metric: "73%",
    metricLabel: "of slips identified before reps flagged them",
    gradient: "from-cyan-600/20 to-blue-600/10",
  },
  {
    slug: "win-loss",
    title: "The Win/Loss Analyzer",
    subtitle: "Your closed-lost deals are a goldmine. Mine them.",
    category: "Revenue Intelligence",
    status: "live",
    description: "Paste your win/loss summaries. Get structured pattern analysis: why you win, why you lose, what competitors keep appearing, and what to change in your playbook.",
    metric: "Minutes",
    metricLabel: "not quarters, to actionable strategy",
    gradient: "from-rose-600/20 to-pink-600/10",
  },
  {
    slug: "docket-builder",
    title: "Account Docket Builder",
    subtitle: "AI agent that learns any seller's product portfolio from their website, then builds a fit-mapped docket for any customer.",
    category: "Account Intelligence",
    status: "live",
    description: "Paste a seller website URL and a customer name. The agent learns the seller's products, researches the customer, maps fit, surfaces decision-makers, and streams a structured sales-ready docket.",
    metric: "< 2 min",
    metricLabel: "to a fully researched, fit-mapped account docket",
    gradient: "from-amber-600/20 to-yellow-600/10",
  },
];

const categoryColors: Record<string, string> = {
  "Enablement": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Prospecting": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "GTM Strategy": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Autonomous Agents": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Forecasting": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Revenue Intelligence": "bg-rose-500/10 text-rose-400 border-rose-500/20",
  "Account Intelligence": "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export const metadata = {
  title: "AI Projects — Joe Peck",
  description: "Real AI tools built for revenue teams. Not demos — production-grade applications.",
};

export default function ProjectsPage() {
  return (
    <main>
      <Nav />
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-6">
          <span className="tag mb-4 inline-block">AI Portfolio</span>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mt-4 mb-6 leading-tight">
            Built with AI.<br />
            <span className="accent-text">Built for Revenue Teams.</span>
          </h1>
          <p className="text-white/55 text-lg leading-relaxed">
            These aren&apos;t slide decks or concepts. They&apos;re working tools I built to solve real problems in sales and revenue operations. Try them yourself.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-8 mb-16 py-8 border-y border-white/06">
          {[
            { value: "7", label: "Live Tools" },
            { value: "4", label: "Powered by Claude Opus" },
            { value: "~30s", label: "Average response time" },
            { value: "Free", label: "No account required" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold accent-text">{stat.value}</div>
              <div className="text-white/40 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="card p-8 flex flex-col group"
            >
              {/* Gradient header */}
              <div className={`h-32 rounded-lg bg-gradient-to-br ${project.gradient} mb-6 flex items-end p-4`}>
                <div>
                  <div className="text-2xl font-bold text-white">{project.metric}</div>
                  <div className="text-white/50 text-xs">{project.metricLabel}</div>
                </div>
              </div>

              {/* Category + status */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${categoryColors[project.category]}`}>
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold text-white leading-snug mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h2>
              <p className="text-accent text-sm mb-4">{project.subtitle}</p>
              <p className="text-white/45 text-sm leading-relaxed flex-1">{project.description}</p>

              {/* CTA */}
              <div className="flex items-center gap-2 mt-6 pt-6 border-t border-white/06">
                <span className="text-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Try it now
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 card p-10 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Want these tools working for your team?</h3>
          <p className="text-white/55 mb-8 leading-relaxed">
            Every tool here can be adapted, extended, and integrated into your existing revenue stack. I work with a small number of companies at a time.
          </p>
          <Link
            href="https://calendly.com/joseph-p-peck" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent hover:bg-accent-light text-white font-semibold text-base transition-all hover:shadow-xl hover:shadow-accent/30"
          >
            Let&apos;s Build Together
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
