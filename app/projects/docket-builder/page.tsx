import DocketBuilderClient from "@/components/projects/DocketBuilderClient";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./print.css";

export const metadata = {
  title: "Account Docket Builder — Joe Peck",
  description:
    "Paste a seller website and a customer name. Get a sales-ready, fit-mapped account docket in under two minutes.",
};

export default function DocketBuilderPage() {
  return (
    <main>
      <Nav />
      <div className="pt-24">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-16 print:hidden">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="tag">Account Intelligence</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Demo · Powered by Claude
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Account Docket Builder
            </h1>
            <p className="text-xl text-accent mb-4">
              Paste your company URL and a customer name. Get a sales-ready account docket in under two minutes.
            </p>
            <p className="text-white/55 text-lg leading-relaxed">
              Good account research takes 45 minutes of tab-juggling — if you even do it. Most reps walk in cold. This agent reads the seller&apos;s product portfolio from their own website, researches the target customer, maps product fit, surfaces decision-makers, and builds a structured docket with talking points and discovery questions. Try it yourself.
            </p>
          </div>
        </div>

        {/* Problem / Approach / Impact — hidden in print */}
        <div className="border-t border-white/06 print:hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-0">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">
                  The Problem
                </div>
                <p className="text-white/65 text-sm leading-relaxed">
                  Reps spend 45+ minutes on account research — or skip it entirely. Either way, they go into calls without a clear fit hypothesis, wasting the buyer&apos;s time and their own.
                </p>
              </div>
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">
                  The Approach
                </div>
                <p className="text-white/65 text-sm leading-relaxed">
                  A multi-phase agent crawls the seller&apos;s product pages, researches the customer from public sources, maps fit for each product, identifies decision-makers, and synthesizes talking points and discovery questions.
                </p>
              </div>
              <div className="card p-6">
                <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">
                  The Impact
                </div>
                <p className="text-white/65 text-sm leading-relaxed">
                  Every rep walks into every call with a structured, evidence-backed account docket — regardless of how much prep time they had. No hardcoded product knowledge required.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Demo — NOT hidden in print; docket content lives here */}
        <div className="border-t border-white/06">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
            <DocketBuilderClient />
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-white/06 print:hidden">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Want this running for your team?</h3>
            <p className="text-white/55 mb-8">
              This agent can be trained on your specific product portfolio, integrated with your CRM, and deployed across your entire revenue team — customized for your ICP and methodology.
            </p>
            <a
              href="https://calendly.com/joseph-p-peck"
              target="_blank"
              rel="noopener noreferrer"
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
