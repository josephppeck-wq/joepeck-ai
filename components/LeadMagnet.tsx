"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const workflows = [
  "Account research in 30 seconds",
  "AI-powered deal coaching",
  "Autonomous outbound sequencing",
  "Forecast signal scoring",
  "Win/loss pattern extraction",
  "GTM blueprint generation",
  "Champion tracking & alerts",
];

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await fetch("https://formspree.io/f/mgopozre", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name, email, type: "playbook-download" }),
      });
    } catch {}
    setStatus("done");
  };

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-08 blur-3xl" style={{ background: "radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4"><span className="tag">Free Resource</span></div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Get the Playbook
            </h2>
            <p className="text-white/55 text-lg leading-relaxed mb-8">
              7 AI workflows that are changing how top sales teams operate. Specific, actionable, and ready to implement this week. Free.
            </p>
            <ul className="space-y-3">
              {workflows.map((w, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex items-center gap-3 text-white/65 text-sm"
                >
                  <span className="w-5 h-5 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {w}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {status === "done" ? (
              <div className="card p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">You&apos;re on the list.</h3>
                <p className="text-white/55 text-sm leading-relaxed">Check your inbox — the playbook is on its way. I&apos;ll follow up with more frameworks like this.</p>
              </div>
            ) : (
              <div className="card p-8">
                {/* Playbook preview */}
                <div className="bg-gradient-to-br from-accent/20 to-transparent rounded-xl p-6 mb-8 border border-accent/15">
                  <div className="text-xs text-accent/60 uppercase tracking-widest mb-2">Free Resource</div>
                  <div className="text-white font-bold text-lg mb-1">The AI-Powered Sales Playbook</div>
                  <div className="text-white/50 text-sm">7 Workflows You Can Implement This Week</div>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="text-white/30 text-xs">Sent to your inbox</span>
                    <span className="text-white/30 text-xs">·</span>
                    <span className="text-white/30 text-xs">Free forever</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wide mb-2">First Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-zinc-900 border border-white/08 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wide mb-2">Work Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full bg-zinc-900 border border-white/08 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent/50 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-4 rounded-lg bg-accent hover:bg-accent-light disabled:opacity-60 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-accent/25"
                  >
                    {status === "sending" ? "Sending..." : "Send Me the Playbook →"}
                  </button>
                  <p className="text-white/20 text-xs text-center">No spam. Unsubscribe anytime.</p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
