"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    label: "Revenue Architecture",
    heading: "REVENUE ARCHITECTURE",
    body: "I don't parachute in with a playbook. I diagnose the specific bottlenecks in your pipeline, pricing, team structure, and process - then build the systems to fix them. At Groupon, that meant scaling from 0 to 400+ sellers across 23 markets. At DocuSign, it meant driving multi-product adoption from 8% to 41%.",
  },
  {
    label: "AI as an Operating Advantage",
    heading: "AI AS AN OPERATING ADVANTAGE",
    body: "I build autonomous agents, AI-powered prospecting systems, and intelligent forecasting tools - not demos, but working systems that create measurable competitive advantage for revenue teams.",
  },
  {
    label: "Team Building & Coaching",
    heading: "TEAM BUILDING & COACHING",
    body: "The best sales organizations aren't hired - they're built. I design hiring profiles, comp plans, enablement programs, and performance frameworks that turn good sellers into great ones and great ones into leaders.",
  },
];

export default function WhatIBring() {
  return (
    <section id="what-i-bring" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="mb-4">
            <span className="tag">What I Bring</span>
          </div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
            What I Bring
          </h2>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-8 flex flex-col"
            >
              <h3 className="text-xs font-bold tracking-widest uppercase text-accent mb-5">
                {pillar.heading}
              </h3>
              <p className="text-white/60 leading-relaxed text-sm flex-1">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
