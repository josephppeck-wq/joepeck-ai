import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from "@/lib/blog";

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

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `https://joepeck.ai/blog/${slug}`;
  const ogTitle = `${post.title} — Joe Peck`;
  const keywords = post.keywords.length > 0
    ? post.keywords
    : [post.category, "B2B Sales", "AI Strategy", "Sales Leadership"];

  return {
    title: ogTitle,
    description: post.description,
    keywords: keywords.join(", "),
    authors: [{ name: "Joe Peck", url: "https://joepeck.ai" }],
    openGraph: {
      title: ogTitle,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.dateISO,
      modifiedTime: post.dateISO,
      authors: ["Joe Peck"],
      tags: keywords.slice(0, 6),
      siteName: "Joe Peck",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: post.description,
      creator: "@joepeck",
    },
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
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
      jobTitle: "AI Strategist & Sales Leader",
    },
    publisher: {
      "@type": "Person",
      name: "Joe Peck",
      url: "https://joepeck.ai",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://joepeck.ai/blog/${slug}`,
    },
    keywords: post.keywords.join(", "),
    timeRequired: post.readTime,
    isAccessibleForFree: true,
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
            <div className="text-white/40 text-xs">AI Strategist · Sales Leader · Builder</div>
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <MDXRemote source={post.content} />
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
