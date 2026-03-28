import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "The Autonomous SDR Agent — Joe Peck",
  description: "A fully autonomous outbound sales agent. Architecture, walkthrough, and sample outputs.",
};

const steps = [
  { num: "01", title: "Receive Target List", desc: "ICP definition or account list triggers the agent. Can be a CSV, CRM segment, or natural language description." },
  { num: "02", title: "Account Research", desc: "Agent researches each account: company overview, recent news, tech stack signals, financial context, and strategic priorities." },
  { num: "03", title: "Stakeholder Mapping", desc: "Identifies likely decision-makers and champions by role, seniority, and tenure. Prioritizes by ICP fit score." },
  { num: "04", title: "Sequence Generation", desc: "Drafts a personalized 5-touch email + LinkedIn sequence for each target. Tailored to account context, not templates." },
  { num: "05", title: "CRM Logging", desc: "All outputs logged to Google Sheets or CRM automatically. Full audit trail with timestamps and confidence scores." },
  { num: "06", title: "Scheduled Execution", desc: "Runs on a schedule — daily, weekly, or triggered by events. No human intervention required." },
];

const sampleOutputs = [
  {
    company: "Acme Corp",
    contact: "Sarah Chen, VP Revenue Ops",
    subject: "Your Q1 forecast gap — a different approach",
    opener: "Sarah — saw Acme's expansion into the Southeast and noticed you brought on 3 new AE territories in Q4. The forecast complexity that creates is exactly what we help companies like yours solve. Worth 20 minutes?",
    score: 87,
  },
  {
    company: "Velocity Inc",
    contact: "Marcus Webb, CRO",
    subject: "DocuSign multi-product adoption went from 8% to 41% — here's how",
    opener: "Marcus — I led the multi-product motion at DocuSign that moved adoption from 8% to 41%. I noticed Velocity launched two new product lines this year. The GTM coordination challenge is real. I have a playbook that might be relevant.",
    score: 94,
  },
  {
    company: "NexaHQ",
    contact: "Priya Nair, VP Sales",
    subject: "Re: Series B → scaling your sales motion",
    opener: "Priya — congrats on the Series B close. The next 90 days are where most companies either nail the scale or create tech debt in their GTM. I've been through this transition at 4 companies. Happy to share what actually works.",
    score: 91,
  },
];

export default function AutonomousSDRPage() {
  return (
    <main>
      <Nav />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="tag">Autonomous Agents</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Architecture Showcase
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
              The Autonomous SDR Agent
            </h1>
            <p className="text-xl text-accent mb-4">Outbound at scale. Zero manual research.</p>
            <p className="text-white/55 text-lg leading-relaxed">
              What if your best SDR never slept, never had a bad day, and could research 50 accounts before your team finishes their morning coffee? I built that agent. It&apos;s running on a Mac Mini in my home office. This is where outbound sales is headed — and I can show you exactly how it works.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-white/06">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {[
                { value: "50", label: "Accounts researched per run" },
                { value: "12 min", label: "Full run time" },
                { value: "0", label: "Human hours required" },
                { value: "24/7", label: "Operational availability" },
              ].map((stat) => (
                <div key={stat.label} className="card p-6 text-center">
                  <div className="text-3xl font-bold accent-text mb-2">{stat.value}</div>
                  <div className="text-white/40 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Architecture */}
            <div className="mb-16">
              <div className="text-accent text-xs uppercase tracking-widest mb-8 font-medium">Agent Architecture</div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {steps.map((step) => (
                  <div key={step.num} className="card p-6 relative">
                    <div className="text-4xl font-bold text-white/05 absolute top-4 right-6 font-mono">{step.num}</div>
                    <div className="text-accent font-mono text-xs mb-3">{step.num}</div>
                    <div className="text-white font-semibold text-sm mb-2">{step.title}</div>
                    <p className="text-white/55 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample outputs */}
            <div className="mb-16">
              <div className="text-accent text-xs uppercase tracking-widest mb-8 font-medium">Sample Agent Outputs</div>
              <div className="space-y-4">
                {sampleOutputs.map((output) => (
                  <div key={output.company} className="card p-6">
                    <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                      <div>
                        <div className="text-white font-semibold">{output.company}</div>
                        <div className="text-accent text-sm">{output.contact}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white/40 mb-1">ICP Fit Score</div>
                        <div className="text-2xl font-bold accent-text">{output.score}</div>
                      </div>
                    </div>
                    <div className="bg-white/02 border border-white/06 rounded-lg p-4">
                      <div className="text-white/40 text-xs mb-1">Subject Line</div>
                      <div className="text-white/80 text-sm font-medium mb-3">{output.subject}</div>
                      <div className="text-white/40 text-xs mb-1">Personalized Opener</div>
                      <div className="text-white/65 text-sm italic">&ldquo;{output.opener}&rdquo;</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div className="card p-8">
              <div className="text-accent text-xs uppercase tracking-widest mb-6 font-medium">Built With</div>
              <div className="flex flex-wrap gap-3">
                {["Claude Opus (reasoning)", "OpenClaw (orchestration)", "Web Search API", "Google Sheets API", "Mac Mini (always-on)", "Cron scheduling"].map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-full bg-white/04 border border-white/10 text-white/60 text-sm">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/06">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Want to bring this to your team?</h3>
            <p className="text-white/55 mb-8">I can design and deploy a custom autonomous prospecting agent for your specific ICP, messaging, and tech stack.</p>
            <a href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent hover:bg-accent-light text-white font-semibold transition-all hover:shadow-xl hover:shadow-accent/30">Let&apos;s Talk</a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
