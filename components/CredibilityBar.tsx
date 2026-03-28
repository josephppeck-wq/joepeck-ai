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
        <p className="text-center text-xs tracking-widest uppercase text-white/25 mb-10">
          Organizations I&apos;ve Scaled
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {companies.map((company, i) => (
            <motion.span
              key={company}
              initial={{ opacity: 0.4 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="text-white/30 text-base lg:text-lg font-semibold tracking-wide hover:text-white/60 transition-colors duration-300 cursor-default select-none"
            >
              {company}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
