"use client";

import { motion } from "framer-motion";

const companies = [
  "Groupon",
  "DocuSign",
  "CloudKitchens",
  "Prokeep",
  "CareerBuilder",
  "SpringCM",
];

export default function CredibilityBar() {
  return (
    <section className="py-16 border-y border-white/06 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs tracking-widest uppercase text-white/25 mb-10"
        >
          Organizations I&apos;ve Scaled
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {companies.map((company, i) => (
            <motion.span
              key={company}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="text-white/25 text-base lg:text-lg font-semibold tracking-wide hover:text-white/50 transition-colors duration-300 cursor-default select-none"
            >
              {company}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
