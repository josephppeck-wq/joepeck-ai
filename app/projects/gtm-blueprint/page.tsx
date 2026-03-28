import GTMBlueprintClient from "@/components/projects/GTMBlueprintClient";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "The GTM Blueprint Generator — Joe Peck",
  description: "20 years of GTM knowledge. Instant output. Generate your go-to-market plan.",
};

export default function GTMBlueprintPage() {
  return (
    <main>
      <Nav />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="tag">GTM Strategy</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Demo · Powered by Claude Opus
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              The GTM Blueprint Generator
            </h1>
            <p className="text-xl text-accent mb-4">20 years of GTM knowledge. Instant output.</p>
            <p className="text-white/55 text-lg leading-relaxed">
              I&apos;ve built GTM strategies for startups, scale-ups, and public companies. The frameworks live in my head — so I taught them to an AI. This tool won&apos;t replace a seasoned GTM leader, but it&apos;ll give you a smarter starting point than most consultants deliver in week one. Fill in the form below.
            </p>
          </div>
        </div>

        <div className="border-t border-white/06">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">The Problem</div>
                <p className="text-white/65 text-sm leading-relaxed">Early-stage GTM strategy is expensive to get right. Good advisors charge $10–25K for a strategy that often stays theoretical.</p>
              </div>
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">The Approach</div>
                <p className="text-white/65 text-sm leading-relaxed">Input your core parameters. Claude Opus, trained on 20 years of GTM knowledge, generates a complete blueprint: ICP, channels, team, comp, 90-day plan, and KPIs.</p>
              </div>
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">The Impact</div>
                <p className="text-white/65 text-sm leading-relaxed">A working GTM framework in minutes, not months. Use it as a starting point or a pressure-test for your existing strategy.</p>
              </div>
            </div>
            <GTMBlueprintClient />
          </div>
        </div>

        <div className="border-t border-white/06">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Want a custom GTM strategy?</h3>
            <p className="text-white/55 mb-8">This tool gives you the framework. I can give you the implementation — with hands-on execution support.</p>
            <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent hover:bg-accent-light text-white font-semibold transition-all hover:shadow-xl hover:shadow-accent/30">Let&apos;s Talk</a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
