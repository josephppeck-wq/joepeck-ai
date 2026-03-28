"use client";

import { motion } from "framer-motion";

const career = [
  {
    company: "Prokeep",
    period: "Nov 2024 – Nov 2025",
    title: "Senior Director of Sales",
    highlights: "GTM strategy driving 30% of company revenue · 3× pipeline expansion · 3 new verticals",
    current: false,
    badge: null,
  },
  {
    company: "CloudKitchens",
    period: "Nov 2022 – Dec 2023",
    title: "Head of Sales, Central U.S.",
    highlights: "4 regional teams · 15 markets · $20M+ revenue · 300% increase in outbound demos",
    current: false,
    badge: null,
  },
  {
    company: "DocuSign",
    period: "Jan 2019 – Sept 2022",
    title: "AVP & RVP of Sales",
    highlights: "70+ AEs · $20M+ ARR quota · $15M net new ARR · Multi-product adoption 8% → 41%",
    current: false,
    badge: null,
  },
  {
    company: "SpringCM → DocuSign",
    period: "Feb 2018 – Sept 2022",
    title: "VP Business Development",
    highlights: "Founded BD org, $1.5M new revenue in 6 months · Executive sponsor on $10M+ ACV deals",
    current: false,
    badge: null,
  },
  {
    company: "SimpleRelevance",
    period: "Jan 2013 – Dec 2016",
    title: "Co-Founder & VP",
    highlights: "Built ML/predictive analytics SaaS for Fortune 500 clients · Acquired by Rise Interactive",
    current: false,
    badge: "Co-Founded",
  },
  {
    company: "Groupon",
    period: "Aug 2010 – Sept 2012",
    title: "Regional Vice President",
    highlights: "0 to 400+ sellers · $415M+ revenue · 23 new markets · Consumer Goods at $8M/mo run rate",
    current: false,
    badge: null,
  },
  {
    company: "CareerBuilder",
    period: "2004 – 2010",
    title: "Sales Director",
    highlights: "Built SMB team from 0 to 240 sellers · $20M division revenue",
    current: false,
    badge: null,
  },
];

export default function Timeline() {
  return (
    <section id="track-record" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="mb-4"><span className="tag">Experience</span></div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-4 leading-tight">
              The Track<br /><span className="accent-text">Record</span>
            </h2>
            <p className="text-white/55 leading-relaxed mb-2 text-base lg:text-lg">
              Two decades of building. Now available to build for you.
            </p>
            <p className="text-accent text-sm mb-12">Currently accepting a limited number of advisory and fractional engagements.</p>

            <div className="card p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">Case Western Reserve University</div>
                  <div className="text-white/50 text-sm">BA Political Science · Cum Laude</div>
                </div>
              </div>
            </div>

            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/12 hover:border-accent/40 text-white/70 hover:text-white text-sm font-medium transition-all duration-300">
              Get in touch →
            </a>
          </div>

          {/* Right: Timeline */}
          <div>
            {career.map((role, i) => (
              <motion.div
                key={`${role.company}-${i}`}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="relative pl-12 pb-10"
              >
                {i < career.length - 1 && <div className="timeline-line" />}
                <div className={`absolute left-0 top-1 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${role.badge === "Co-Founded" ? "bg-violet-500/20 border-2 border-violet-400" : "bg-white/05 border border-white/12"}`}>
                  <div className={`w-2 h-2 rounded-full ${role.badge === "Co-Founded" ? "bg-violet-400" : "bg-white/30"}`} />
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="text-white font-semibold text-base">{role.company}</span>
                    {role.badge && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-violet-500/15 text-violet-400 border border-violet-500/25">
                        {role.badge}
                      </span>
                    )}
                  </div>
                  <div className="text-accent text-sm font-medium mb-1">{role.title}</div>
                  <div className="text-white/35 text-xs mb-3">{role.period}</div>
                  <div className="text-white/55 text-sm leading-relaxed">{role.highlights}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
