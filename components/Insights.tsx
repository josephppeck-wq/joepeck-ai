"use client";

import { motion } from "framer-motion";

const posts = [
  {
    slug: "5-ai-tools-every-sales-leader",
    title: "The 5 AI Tools Every Sales Leader Should Be Using Right Now",
    excerpt: "Most sales leaders are still treating AI like a novelty. The ones who aren't are pulling away from the pack. Here's what's actually worth your time.",
    category: "AI Strategy",
    readTime: "6 min read",
    date: "Mar 2025",
  },
  {
    slug: "why-your-forecast-is-wrong",
    title: "Why Your Forecast Is Wrong — And How AI Fixes It",
    excerpt: "Every CRO has sat in a board meeting defending a number they knew was fiction. It doesn't have to be this way. AI-native forecasting changes everything.",
    category: "Sales Leadership",
    readTime: "5 min read",
    date: "Feb 2025",
  },
  {
    slug: "autonomous-ai-agent-lessons",
    title: "I Built an Autonomous AI Agent. Here's What It Taught Me About the Future of Work.",
    excerpt: "I spent a weekend building an agent that runs on a Mac Mini in my home office. It changed how I think about every role on a revenue team.",
    category: "Tools & Workflows",
    readTime: "8 min read",
    date: "Jan 2025",
  },
];

const categoryColors: Record<string, string> = {
  "AI Strategy": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Sales Leadership": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Tools & Workflows": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function Insights() {
  return (
    <section id="insights" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-4">
          <div className="max-w-2xl">
            <div className="mb-4"><span className="tag">Insights</span></div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
              Thinking Out Loud
            </h2>
          </div>
          <a href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors group">
            All posts
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.a
              key={post.slug}
              href={`/blog/${post.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-8 flex flex-col group cursor-pointer"
            >
              <div className="h-40 rounded-lg blog-gradient mb-6 flex items-center justify-center overflow-hidden">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${categoryColors[post.category] || "bg-white/05 text-white/40 border-white/10"}`}>
                  {post.category}
                </span>
                <span className="text-white/30 text-xs">{post.readTime}</span>
              </div>
              <h3 className="text-lg font-semibold text-white leading-snug mb-3 group-hover:text-accent transition-colors duration-200">
                {post.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/06">
                <span className="text-white/30 text-xs">{post.date}</span>
                <span className="text-accent text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
