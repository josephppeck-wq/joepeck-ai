"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "$415M+", label: "Revenue Generated" },
  { value: "400+", label: "Sellers Scaled & Led" },
  { value: "20+", label: "Years in SaaS Sales" },
  { value: "3×", label: "Average Pipeline Growth" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            transition={{ staggerChildren: 0.08 }}
          >
            <motion.div variants={fadeUp} className="mb-4">
              <span className="tag">About</span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-8 leading-tight"
            >
              From Scaling Sales Teams
              <br />
              <span className="accent-text">to Scaling Intelligence</span>
            </motion.h2>

            <div className="space-y-5">
              {[
                "I've spent two decades in the trenches of SaaS sales — building teams from zero, opening new markets, and driving hundreds of millions in revenue at companies like Groupon, DocuSign, and CloudKitchens.",
                "Now I'm focused on what I believe is the biggest unlock in the history of B2B sales: artificial intelligence. Not the hype. The real, practical application of AI to pipeline generation, deal execution, forecasting, enablement, and everything in between.",
                "I don't just talk about AI — I build with it. I run autonomous AI agents, architect workflows, and develop frameworks that give revenue teams a genuine competitive edge.",
                "Whether you're a startup trying to find product-market fit or an enterprise looking to transform your GTM motion, I can help.",
              ].map((para, i) => (
                <motion.p
                  key={i}
                  variants={fadeUp}
                  className="text-white/60 leading-relaxed text-base lg:text-lg"
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            className="lg:pt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="card p-6 lg:p-8"
                >
                  <div className="text-4xl lg:text-5xl xl:text-6xl font-bold accent-text mb-3 leading-none">
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-sm leading-snug">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
