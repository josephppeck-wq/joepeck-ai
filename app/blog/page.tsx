import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

const categoryColors: Record<string, string> = {
  "AI Strategy": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Sales Leadership": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Tools & Workflows": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Revenue Operations": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Sales Methodology": "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "GTM Strategy": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Sales Operations": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Career": "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export const metadata = {
  title: "Insights — Joe Peck",
  description: "Thinking on AI, sales leadership, and the future of revenue organizations.",
};

export default function BlogPage() {
  const posts = getAllPosts();

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
