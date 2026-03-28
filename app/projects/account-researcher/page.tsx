import AccountResearcherClient from "@/components/projects/AccountResearcherClient";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "The AI Account Researcher — Joe Peck",
  description: "Full account research briefs in 30 seconds. Powered by Claude Opus.",
};

export default function AccountResearcherPage() {
  return (
    <main>
      <Nav />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="tag">Prospecting</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Demo · Powered by Claude Opus
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              The AI Account Researcher
            </h1>
            <p className="text-xl text-accent mb-4">Full account briefs in 30 seconds, not 45 minutes.</p>
            <p className="text-white/55 text-lg leading-relaxed">
              Your reps spend 30–40% of their day researching accounts instead of selling. I built an AI agent that delivers a full account brief — complete with pain points, decision-maker mapping, and personalized talk tracks — in under a minute. Select a company below to see it in action.
            </p>
          </div>
        </div>

        <div className="border-t border-white/06">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">The Problem</div>
                <p className="text-white/65 text-sm leading-relaxed">AEs spend 30–40% of their time on research, not selling. Most account prep is shallow and inconsistent. Personalization is the exception, not the rule.</p>
              </div>
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">The Approach</div>
                <p className="text-white/65 text-sm leading-relaxed">Claude Opus synthesizes company context into a structured brief: overview, stakeholder map, pain points, buying signals, and 3 personalized outreach angles.</p>
              </div>
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">The Impact</div>
                <p className="text-white/65 text-sm leading-relaxed">45 minutes of research becomes 30 seconds. Every rep walks into every call with executive-quality prep. Personalization scales.</p>
              </div>
            </div>
            <AccountResearcherClient />
          </div>
        </div>

        <div className="border-t border-white/06">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Want to bring this to your team?</h3>
            <p className="text-white/55 mb-8">This can be extended to pull from your CRM, custom ICP data, and proprietary market intelligence.</p>
            <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent hover:bg-accent-light text-white font-semibold transition-all hover:shadow-xl hover:shadow-accent/30">Let&apos;s Talk</a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
