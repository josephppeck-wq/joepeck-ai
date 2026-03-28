import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

const posts = [
  {
    slug: "what-changed-in-ai-sales-2025",
    title: "What Changed in AI Sales Tools in 2025 — And What's Coming in 2026",
    excerpt: "I've been in the trenches watching this space evolve in real time. Here's an honest assessment of what moved the needle, what was hype, and where I'm placing my bets for 2026.",
    category: "AI Strategy",
    readTime: "8 min read",
    date: "March 2026",
  },
  {
    slug: "fractional-cro-model",
    title: "The Fractional CRO Model: Why More Companies Are Choosing Flexible Leadership",
    excerpt: "The full-time CRO model made sense when companies scaled linearly. AI-era companies don't. Here's why fractional leadership is becoming the default for smart founders.",
    category: "Sales Leadership",
    readTime: "6 min read",
    date: "February 2026",
  },
  {
    slug: "ai-agent-budget-experiment",
    title: "I Gave My AI Agent a Budget. Here's What Happened.",
    excerpt: "I gave my autonomous agent $50 and told it to generate pipeline. What it did — and what it couldn't do — taught me more about the future of sales than any conference I've attended.",
    category: "Tools & Workflows",
    readTime: "7 min read",
    date: "January 2026",
  },
  {
    slug: "5-ai-tools-every-sales-leader",
    title: "The 5 AI Tools Every Sales Leader Should Be Using Right Now",
    excerpt: "Most sales leaders are still treating AI like a novelty. The ones who aren't are pulling away from the pack. Here's what's actually worth your time.",
    category: "AI Strategy",
    readTime: "6 min read",
    date: "March 2025",
  },
  {
    slug: "why-your-forecast-is-wrong",
    title: "Why Your Forecast Is Wrong — And How AI Fixes It",
    excerpt: "Every CRO has sat in a board meeting defending a number they knew was fiction. It doesn't have to be this way. AI-native forecasting changes everything.",
    category: "Sales Leadership",
    readTime: "5 min read",
    date: "February 2025",
  },
  {
    slug: "autonomous-ai-agent-lessons",
    title: "I Built an Autonomous AI Agent. Here's What It Taught Me About the Future of Work.",
    excerpt: "I spent a weekend building an agent that runs on a Mac Mini in my home office. It changed how I think about every role on a revenue team.",
    category: "Tools & Workflows",
    readTime: "8 min read",
    date: "January 2025",
  },
  {
    slug: "meddpicc-in-the-age-of-ai",
    title: "MEDDPICC in the Age of AI: What Changes and What Doesn't",
    excerpt: "The methodology isn't dead — it's about to get a significant upgrade. Here's how I think about deal qualification when AI can do half the research.",
    category: "Sales Leadership",
    readTime: "7 min read",
    date: "December 2024",
  },
  {
    slug: "from-zero-to-400m-playbook",
    title: "From $0 to $400M: The Playbook I'd Run Differently Today (With AI)",
    excerpt: "Looking back at Groupon and what I'd do differently if I had today's AI tools in my hands. The answer might surprise you.",
    category: "AI Strategy",
    readTime: "9 min read",
    date: "November 2024",
  },
];

const categoryColors: Record<string, string> = {
  "AI Strategy": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Sales Leadership": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Tools & Workflows": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export const metadata = {
  title: "Insights — Joe Peck",
  description: "Thinking on AI, sales leadership, and the future of revenue organizations.",
};

export default function BlogPage() {
  return (
    <main>
      <Nav />
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <span className="tag mb-4 inline-block">Insights</span>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mt-4 mb-6">
            Thinking Out Loud
          </h1>
          <p className="text-white/55 text-lg leading-relaxed">
            Frameworks, tools, and perspectives on AI-powered sales and revenue leadership.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-8 flex flex-col group">
              <div className="h-36 rounded-lg blog-gradient mb-6" />
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${categoryColors[post.category] || "bg-white/05 text-white/40 border-white/10"}`}>
                  {post.category}
                </span>
                <span className="text-white/30 text-xs">{post.readTime}</span>
              </div>
              <h2 className="text-base font-semibold text-white leading-snug mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-white/45 text-sm leading-relaxed flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/06">
                <span className="text-white/30 text-xs">{post.date}</span>
                <span className="text-accent text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
