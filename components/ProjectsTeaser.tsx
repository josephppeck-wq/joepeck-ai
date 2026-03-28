"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const featured = [
  {
    href: "/projects/deal-coach",
    title: "The Deal Coach",
    subtitle: "Instant MEDDPICC analysis on any deal",
    tag: "Try it live →",
    gradient: "from-blue-600/20 to-indigo-600/10",
    metric: "30 sec",
  },
  {
    href: "/projects/gtm-blueprint",
    title: "GTM Blueprint Generator",
    subtitle: "20 years of strategy. Instant output.",
    tag: "Try it live →",
    gradient: "from-violet-600/20 to-purple-600/10",
    metric: "Instant",
  },
  {
    href: "/projects/forecast-machine",
    title: "The Forecast Truth Machine",
    subtitle: "AI scoring. Behavioral signals. Real answers.",
    tag: "Explore →",
    gradient: "from-cyan-600/20 to-blue-600/10",
    metric: "73%",
  },
];

export default function ProjectsTeaser() {
  return (
    <section className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="tag">AI Portfolio</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight"
            >
              I don&apos;t just talk about AI.
              <br />
              <span className="accent-text">I build with it.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/projects"
              className="hidden lg:inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors group"
            >
              All 6 projects
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={project.href} className="card p-8 flex flex-col group block h-full">
                <div className={`h-28 rounded-lg bg-gradient-to-br ${project.gradient} mb-6 flex items-end p-4`}>
                  <div className="text-2xl font-bold text-white">{project.metric}</div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed flex-1">{project.subtitle}</p>
                <div className="mt-6 pt-6 border-t border-white/06">
                  <span className="text-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    {project.tag}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
