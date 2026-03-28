import DealCoachClient from "@/components/projects/DealCoachClient";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "The Deal Coach — Joe Peck",
  description: "AI-powered MEDDPICC deal analysis. Paste your deal notes, get instant coaching.",
};

export default function DealCoachPage() {
  return (
    <main>
      <Nav />
      <div className="pt-24">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="tag">Enablement</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Demo · Powered by Claude Opus
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              The Deal Coach
            </h1>
            <p className="text-xl text-accent mb-4">Paste your deal notes. Get instant MEDDPICC coaching.</p>
            <p className="text-white/55 text-lg leading-relaxed">
              I&apos;ve coached thousands of reps through MEDDPICC and SPICED. The problem? Coaching doesn&apos;t scale. A frontline manager with 8–10 reps can&apos;t review every deal deeply every week. So I built an AI deal coach that gives reps instant, methodology-specific feedback on every deal in their pipeline. Try it yourself.
            </p>
          </div>
        </div>

        {/* Problem / Solution */}
        <div className="border-t border-white/06">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">The Problem</div>
                <p className="text-white/65 text-sm leading-relaxed">
                  Frontline managers can&apos;t review every deal deeply. Average pipeline review covers 30% of deals. At-risk deals slip before anyone notices.
                </p>
              </div>
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">The Approach</div>
                <p className="text-white/65 text-sm leading-relaxed">
                  Claude Opus analyzes deal notes against each MEDDPICC element, scores qualification gaps, and returns specific next actions — in under 30 seconds.
                </p>
              </div>
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">The Impact</div>
                <p className="text-white/65 text-sm leading-relaxed">
                  Every rep gets a dedicated coaching session on every deal. The best manager&apos;s judgment, applied at scale, 24/7.
                </p>
              </div>
            </div>

            {/* Interactive Demo */}
            <DealCoachClient />
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-white/06">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Want to bring this to your team?</h3>
            <p className="text-white/55 mb-8">This tool can be customized for your specific sales methodology, integrated with your CRM, and scaled to your entire revenue team.</p>
            <a
              href="https://calendly.com/joseph-p-peck" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent hover:bg-accent-light text-white font-semibold transition-all hover:shadow-xl hover:shadow-accent/30"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
