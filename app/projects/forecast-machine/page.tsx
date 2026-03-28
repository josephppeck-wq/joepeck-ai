import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ForecastDashboard from "@/components/projects/ForecastDashboard";

export const metadata = {
  title: "The Forecast Truth Machine — Joe Peck",
  description: "AI pipeline scoring that predicts slippage before reps flag it.",
};

export default function ForecastMachinePage() {
  return (
    <main>
      <Nav />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="tag">Forecasting</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Interactive Demo · Mock Pipeline
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              The Forecast Truth Machine
            </h1>
            <p className="text-xl text-accent mb-4">Stop guessing. Start knowing.</p>
            <p className="text-white/55 text-lg leading-relaxed">
              I&apos;ve managed $20M+ in ARR quota across 70+ reps. The forecast was never right — because we relied on gut feel dressed up in stage names. I built a tool that scores every deal on actual behavioral signals, not what the rep hopes will happen. Below is a live demo with realistic mock pipeline data.
            </p>
          </div>
        </div>

        <div className="border-t border-white/06">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">The Problem</div>
                <p className="text-white/65 text-sm leading-relaxed">Traditional forecasting is built on rep opinions. Rep opinions are biased, inconsistent, and always late to flag slippage.</p>
              </div>
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">The Approach</div>
                <p className="text-white/65 text-sm leading-relaxed">Score each deal on behavioral signals: days since last activity, champion engagement, stage velocity, multi-threading, deal age vs. historical avg.</p>
              </div>
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">The Impact</div>
                <p className="text-white/65 text-sm leading-relaxed">73% of slipping deals identified before reps flag them. Average early warning lead time: 3.2 weeks.</p>
              </div>
            </div>

            <ForecastDashboard />
          </div>
        </div>

        <div className="border-t border-white/06">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Want to run this on your real pipeline?</h3>
            <p className="text-white/55 mb-8">I can build this against your actual CRM data — Salesforce, HubSpot, or any platform with an API.</p>
            <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent hover:bg-accent-light text-white font-semibold transition-all hover:shadow-xl hover:shadow-accent/30">Request a Live Demo</a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
