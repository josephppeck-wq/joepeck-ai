"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="hero-gradient" />
      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Floating orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl animate-pulse-slow"
        style={{ background: "#2563EB" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl animate-pulse-slow"
        style={{ background: "#2563EB", animationDelay: "2s" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="tag">AI Strategist · Sales Leader · Builder</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] mb-8"
        >
          <span className="gradient-text">The Sales Leader</span>
          <br />
          <span className="accent-text">Who Builds AI.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto text-lg lg:text-xl text-white/55 leading-relaxed mb-12"
        >
          20 years scaling SaaS teams to $415M+ in revenue. Co-founded an ML company (acquired).
          Now I build the AI tools and strategies that give revenue teams a structural competitive advantage.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent hover:bg-accent-light text-white font-semibold text-base transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 group"
          >
            See How I Can Help
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="#insights"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/12 hover:border-white/25 text-white/80 hover:text-white font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/04"
          >
            Read My Thinking
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
