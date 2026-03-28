"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Joe is the rare sales leader who combines elite-level operational instincts with genuine strategic vision. He built the most productive SDR organization I've ever seen — from scratch, in under 90 days.",
    name: "Coming soon",
    title: "Former Colleague",
    company: "DocuSign",
    initials: "—",
  },
  {
    quote: "I've worked with a lot of consultants. Joe is different. He doesn't give you frameworks — he gets in the trenches and builds with you. Our forecast accuracy improved 40% in two months.",
    name: "Coming soon",
    title: "Former Colleague",
    company: "Groupon",
    initials: "—",
  },
  {
    quote: "Joe took our AI anxiety and turned it into a competitive strategy. He didn't just advise us — he built tools our team actually uses every day. Genuinely transformative.",
    name: "Coming soon",
    title: "Former Colleague",
    company: "CloudKitchens",
    initials: "—",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="mb-4"><span className="tag">Social Proof</span></div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
            From the People
            <br />
            <span className="accent-text">I&apos;ve Built With</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-8 flex flex-col"
            >
              {/* Quote mark */}
              <div className="text-accent/30 text-6xl font-serif leading-none mb-4">&ldquo;</div>
              <p className="text-white/70 leading-relaxed text-sm flex-1 italic">{t.quote}</p>
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/06">
                <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-bold text-xs">{t.initials}</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.title} · {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <a
            href="https://linkedin.com/in/joseph-p-peck"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors group"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            50+ LinkedIn recommendations → view on LinkedIn
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
