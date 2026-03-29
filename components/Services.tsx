"use client";

import { motion } from "framer-motion";

const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.698-1.348 2.698H4.346c-1.378 0-2.348-1.698-1.348-2.698l1.373-1.373" />
      </svg>
    ),
    title: "AI-Powered GTM Strategy",
    description: "I design go-to-market strategies that leverage AI for smarter prospecting, personalized outreach, pipeline forecasting, and deal intelligence. Not theory — executable playbooks your team can run tomorrow.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Sales Organization Design & Leadership",
    description: "From building your first sales team to restructuring a 400-person org, I bring the operating system: hiring profiles, comp plans, territory design, enablement programs, and performance management frameworks.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: "Fractional / Advisory Sales Leadership",
    description: "Need a senior sales leader without the full-time commitment? I serve as a fractional CRO/VP Sales or board-level advisor to help you hit your next growth milestone.",
  },
];

const engagements = [
  {
    name: "Advisory Sprint",
    duration: "1–2 weeks",
    description: "Rapid assessment and strategic recommendation. Ideal for GTM audits, AI readiness evaluations, or a senior second opinion on a major sales decision.",
    deliverable: "Written strategy brief + 2 working sessions",
    ideal: "Companies facing a specific, defined challenge",
    color: "border-blue-500/20",
    accentBg: "bg-blue-500/10",
    accentText: "text-blue-400",
  },
  {
    name: "Fractional Leadership",
    duration: "3–6 months",
    description: "I embed with your team part-time as a fractional CRO or VP Sales. I attend pipeline reviews, coach your managers, and build the systems that scale.",
    deliverable: "Ongoing operational leadership + weekly engagement",
    ideal: "Series A–C companies scaling past $5M ARR",
    color: "border-accent/30",
    accentBg: "bg-accent/10",
    accentText: "text-accent",
  },
  {
    name: "AI Revenue Transformation",
    duration: "Custom",
    description: "End-to-end design and deployment of AI-powered sales systems — from agent builds to workflow automation to team enablement. I build the tools, train the team, measure the results.",
    deliverable: "Custom scope: tools, training, and measurable outcomes",
    ideal: "Organizations ready to make AI a competitive advantage",
    color: "border-violet-500/20",
    accentBg: "bg-violet-500/10",
    accentText: "text-violet-400",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="mb-4"><span className="tag">Services</span></div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight mb-4">
            How I Help
          </h2>

        </div>

        {/* Service cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card p-8 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 flex-shrink-0">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 leading-snug">{service.title}</h3>
              <p className="text-white/55 leading-relaxed text-sm flex-1">{service.description}</p>
              <div className="mt-8">
                <a href="#contact" className="inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:gap-3 transition-all duration-200 group">
                  Let&apos;s discuss
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Engagement models */}
        <div>
          <div className="mb-10">
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">How We Work Together</h3>
            <p className="text-white/50">Three ways to engage, depending on what you need and where you are.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {engagements.map((eng, i) => (
              <motion.div
                key={eng.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`card p-8 border ${eng.color}`}
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${eng.accentBg} ${eng.accentText} border ${eng.color} mb-6`}>
                  {eng.duration}
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{eng.name}</h4>
                <p className="text-white/55 text-sm leading-relaxed mb-6">{eng.description}</p>
                <div className="space-y-3 border-t border-white/06 pt-6">
                  <div>
                    <div className="text-white/30 text-xs uppercase tracking-wide mb-1">Deliverable</div>
                    <div className="text-white/65 text-sm">{eng.deliverable}</div>
                  </div>
                  <div>
                    <div className="text-white/30 text-xs uppercase tracking-wide mb-1">Ideal for</div>
                    <div className="text-white/65 text-sm">{eng.ideal}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-white/30 text-sm mt-6 text-center">Investment varies by scope and engagement type. <a href="#contact" className="text-accent hover:text-accent-light transition-colors">Let&apos;s talk about fit →</a></p>
        </div>
      </div>
    </section>
  );
}
