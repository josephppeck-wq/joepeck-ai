import WinLossClient from "@/components/projects/WinLossClient";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "The Win/Loss Analyzer — Joe Peck",
  description: "Paste your deal summaries. Get AI-powered pattern analysis and playbook recommendations.",
};

export default function WinLossPage() {
  return (
    <main>
      <Nav />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="tag">Revenue Intelligence</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live AI · Powered by Claude Opus
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              The Win/Loss Analyzer
            </h1>
            <p className="text-xl text-accent mb-4">Your closed deals are a goldmine. Mine them.</p>
            <p className="text-white/55 text-lg leading-relaxed">
              Every company I&apos;ve led has had the data to understand why they win and lose. Almost none of them analyzed it systematically. Paste your win/loss summaries below and get structured pattern analysis — why you win, why you lose, what to change in your playbook.
            </p>
          </div>
        </div>

        <div className="border-t border-white/06">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">The Problem</div>
                <p className="text-white/65 text-sm leading-relaxed">Win/loss data sits in CRM notes, spreadsheets, and people&apos;s heads. Almost no one analyzes it at scale. Patterns that could transform the playbook go undetected for years.</p>
              </div>
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">The Approach</div>
                <p className="text-white/65 text-sm leading-relaxed">Paste 3–10 deal summaries (wins and losses). Claude Opus extracts patterns: why you win, why you lose, competitive dynamics, objection trends, and playbook recommendations.</p>
              </div>
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">The Impact</div>
                <p className="text-white/65 text-sm leading-relaxed">Pattern analysis in minutes, not quarters. The insights that used to require a 6-week consulting engagement, now in your hands before your next pipeline review.</p>
              </div>
            </div>
            <WinLossClient />
          </div>
        </div>

        <div className="border-t border-white/06">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Want this run against your real pipeline data?</h3>
            <p className="text-white/55 mb-8">I can connect this to your CRM and run systematic win/loss analysis on your full historical dataset — not just a paste.</p>
            <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent hover:bg-accent-light text-white font-semibold transition-all hover:shadow-xl hover:shadow-accent/30">Let&apos;s Talk</a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
