"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const roles = ["CEO / Founder", "CRO / VP Sales", "Head of RevOps", "Investor / Board Member", "Recruiter / Hiring Manager", "Other"];
const intents = ["Fractional Sales Leadership", "AI Strategy & Implementation", "GTM Audit / Consulting", "Custom AI Tool Build", "Speaking / Content Collaboration", "Just exploring", "Other"];
const budgets = ["< $5K", "$5K – $15K", "$15K – $50K", "$50K+", "Not sure yet"];

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  intent: string;
  budget: string;
  message: string;
}

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState<FormData>({
    name: "", email: "", company: "", role: "", intent: "", budget: "", message: ""
  });

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mgopozre", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", company: "", role: "", intent: "", budget: "", message: "" });
      } else {
        window.location.href = `mailto:joe@joepeck.ai?subject=Inquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}`;
        setStatus("sent");
      }
    } catch {
      window.location.href = `mailto:joe@joepeck.ai?subject=Inquiry from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}`;
      setStatus("sent");
    }
  };

  const inputClass = "w-full bg-zinc-900 border border-white/08 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent/50 focus:bg-zinc-800 transition-all";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-5 blur-3xl" style={{ background: "#2563EB" }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="mb-4 flex justify-center"><span className="tag">Contact</span></div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Let&apos;s Talk
          </h2>
          <p className="text-white/55 text-lg leading-relaxed">
            Whether you&apos;re looking to hire a sales leader, need help building your AI strategy, or want to collaborate — I&apos;d love to connect.
          </p>
          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 text-sm font-medium">Q2 2026 availability: Limited. Reach out early.</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start max-w-5xl mx-auto">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            <a href="mailto:joe@joepeck.ai" className="card p-6 flex items-center gap-4 group block hover:border-accent/30">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <div className="text-white/40 text-xs mb-0.5 uppercase tracking-wide">Email</div>
                <div className="text-white/80 text-sm group-hover:text-white transition-colors">joe@joepeck.ai</div>
              </div>
            </a>

            <a href="https://linkedin.com/in/joseph-p-peck" target="_blank" rel="noopener noreferrer" className="card p-6 flex items-center gap-4 group block hover:border-accent/30">
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.771v20.451C0 23.2.792 24 1.771 24h20.451C23.2 24 24 23.2 24 22.222V1.771C24 .792 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <div className="text-white/40 text-xs mb-0.5 uppercase tracking-wide">LinkedIn</div>
                <div className="text-white/80 text-sm group-hover:text-white transition-colors">joseph-p-peck</div>
              </div>
            </a>

            <div className="card p-6">
              <div className="text-white/40 text-xs uppercase tracking-wide mb-3">Typical response time</div>
              <div className="text-white font-semibold text-sm">Within 24 hours</div>
              <div className="text-white/40 text-xs mt-1">I read every message personally.</div>
            </div>
          </motion.div>

          {/* Right: Upgraded form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {status === "sent" ? (
              <div className="card p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Message sent.</h3>
                <p className="text-white/55">I&apos;ll get back to you within 24 hours. Looking forward to connecting.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wide mb-2">Name *</label>
                    <input type="text" required value={form.name} onChange={set("name")} placeholder="Your name" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wide mb-2">Email *</label>
                    <input type="email" required value={form.email} onChange={set("email")} placeholder="your@email.com" className={inputClass} />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wide mb-2">Company</label>
                    <input type="text" value={form.company} onChange={set("company")} placeholder="Your company" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wide mb-2">Your Role</label>
                    <select value={form.role} onChange={set("role")} className={selectClass}>
                      <option value="" className="bg-zinc-900">Select role...</option>
                      {roles.map(r => <option key={r} value={r} className="bg-zinc-900">{r}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wide mb-2">What are you looking for?</label>
                    <select value={form.intent} onChange={set("intent")} className={selectClass}>
                      <option value="" className="bg-zinc-900">Select...</option>
                      {intents.map(i => <option key={i} value={i} className="bg-zinc-900">{i}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 uppercase tracking-wide mb-2">Budget Range (optional)</label>
                    <select value={form.budget} onChange={set("budget")} className={selectClass}>
                      <option value="" className="bg-zinc-900">Select...</option>
                      {budgets.map(b => <option key={b} value={b} className="bg-zinc-900">{b}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-white/40 uppercase tracking-wide mb-2">Anything else I should know?</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell me about your situation, what you're working on, or what you need help with..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 rounded-lg bg-accent hover:bg-accent-light disabled:opacity-60 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>

                <p className="text-white/20 text-xs text-center">I read every message personally and respond within 24 hours.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
