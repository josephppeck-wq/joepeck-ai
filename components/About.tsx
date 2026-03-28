"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "$415M+", label: "Revenue Generated" },
  { value: "400+", label: "Sellers Scaled & Led" },
  { value: "20+", label: "Years in SaaS Sales" },
  { value: "3×", label: "Average Pipeline Growth" },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div>
            <div className="mb-4"><span className="tag">About</span></div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-sm font-medium">Currently taking on a limited number of advisory and fractional engagements.</span>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-8 leading-tight">
              From Scaling Sales Teams
              <br />
              <span className="accent-text">to Scaling Intelligence</span>
            </h2>
            <div className="space-y-5">
              {[
                "I've spent two decades in the trenches of SaaS sales — building teams from zero, opening new markets, and driving hundreds of millions in revenue at companies like Groupon, DocuSign, and CloudKitchens.",
                "Now I'm focused on what I believe is the biggest unlock in the history of B2B sales: artificial intelligence. Not the hype. The real, practical application of AI to pipeline generation, deal execution, forecasting, enablement, and everything in between.",
                "I don't just talk about AI — I build with it. I run autonomous AI agents, architect workflows, and develop frameworks that give revenue teams a genuine competitive edge.",
                "Whether you're a startup trying to find product-market fit or an enterprise looking to transform your GTM motion, I can help.",
              ].map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="text-white/60 leading-relaxed text-base lg:text-lg"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>

          {/* Right: Stats */}
          <div className="lg:pt-20 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card p-6 lg:p-8"
              >
                <div className="text-4xl lg:text-5xl xl:text-6xl font-bold accent-text mb-3 leading-none">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm leading-snug">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
