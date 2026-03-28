"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type RiskLevel = "High" | "Medium" | "Low";

interface Deal {
  id: string;
  company: string;
  rep: string;
  amount: number;
  stage: string;
  closeDate: string;
  repForecast: string;
  aiScore: number;
  aiRisk: RiskLevel;
  flags: string[];
  daysSinceActivity: number;
}

const deals: Deal[] = [
  { id: "1", company: "Apex Dynamics", rep: "K. Torres", amount: 120000, stage: "Proposal", closeDate: "Apr 15", repForecast: "Commit", aiScore: 34, aiRisk: "High", flags: ["Champion went dark 18 days", "No EB engagement", "Deal age 2.3× avg"], daysSinceActivity: 18 },
  { id: "2", company: "Meridian Health", rep: "S. Park", amount: 85000, stage: "Negotiation", closeDate: "Mar 31", repForecast: "Commit", aiScore: 78, aiRisk: "Low", flags: ["Strong champion activity", "EB meeting last week"], daysSinceActivity: 6 },
  { id: "3", company: "Vertex Capital", rep: "M. Chen", amount: 200000, stage: "Discovery", closeDate: "Jun 30", repForecast: "Best Case", aiScore: 22, aiRisk: "High", flags: ["Only 1 stakeholder engaged", "No technical eval started", "Competitor spotted"], daysSinceActivity: 12 },
  { id: "4", company: "NovaTech Solutions", rep: "J. Williams", amount: 55000, stage: "Negotiation", closeDate: "Mar 28", repForecast: "Commit", aiScore: 88, aiRisk: "Low", flags: ["Multi-threaded (4 stakeholders)", "Procurement engaged", "Legal review underway"], daysSinceActivity: 2 },
  { id: "5", company: "Cascade Systems", rep: "A. Rodriguez", amount: 145000, stage: "Proposal", closeDate: "Apr 30", repForecast: "Best Case", aiScore: 51, aiRisk: "Medium", flags: ["Champion present but low influence", "Budget not confirmed", "2nd vendor shortlisted"], daysSinceActivity: 9 },
  { id: "6", company: "Pinnacle Group", rep: "K. Torres", amount: 310000, stage: "Verbal", closeDate: "Mar 31", repForecast: "Commit", aiScore: 41, aiRisk: "High", flags: ["Legal cycle started but stalled", "Champion on PTO", "Close date slipped twice"], daysSinceActivity: 14 },
  { id: "7", company: "BlueLine Software", rep: "S. Park", amount: 72000, stage: "Proposal", closeDate: "Apr 15", repForecast: "Best Case", aiScore: 65, aiRisk: "Medium", flags: ["Good discovery depth", "Metrics quantified", "No paper process visibility"], daysSinceActivity: 5 },
  { id: "8", company: "Sentinel Analytics", rep: "M. Chen", amount: 98000, stage: "Negotiation", closeDate: "Mar 31", repForecast: "Commit", aiScore: 82, aiRisk: "Low", flags: ["EB signed off verbally", "IT security review complete", "Strong champion"], daysSinceActivity: 3 },
];

const riskConfig: Record<RiskLevel, { color: string; bg: string; dot: string }> = {
  High: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", dot: "bg-red-400" },
  Medium: { color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", dot: "bg-amber-400" },
  Low: { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-400" },
};

export default function ForecastDashboard() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [filter, setFilter] = useState<"All" | RiskLevel>("All");

  const filtered = filter === "All" ? deals : deals.filter((d) => d.aiRisk === filter);
  const totalCommit = deals.filter((d) => d.repForecast === "Commit").reduce((s, d) => s + d.amount, 0);
  const aiCommit = deals.filter((d) => d.aiScore >= 70).reduce((s, d) => s + d.amount, 0);
  const atRisk = deals.filter((d) => d.repForecast === "Commit" && d.aiRisk === "High").reduce((s, d) => s + d.amount, 0);

  const fmt = (n: number) => `$${(n / 1000).toFixed(0)}K`;

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-6">
          <div className="text-white/40 text-xs uppercase tracking-wide mb-2">Rep-Called Commit</div>
          <div className="text-3xl font-bold text-white">{fmt(totalCommit)}</div>
          <div className="text-white/35 text-xs mt-1">What reps say will close</div>
        </div>
        <div className="card p-6">
          <div className="text-white/40 text-xs uppercase tracking-wide mb-2">AI Confidence Commit</div>
          <div className="text-3xl font-bold accent-text">{fmt(aiCommit)}</div>
          <div className="text-white/35 text-xs mt-1">AI score ≥70 (high confidence)</div>
        </div>
        <div className="card p-6 border-red-500/20">
          <div className="text-red-400 text-xs uppercase tracking-wide mb-2">⚠️ At-Risk Commit</div>
          <div className="text-3xl font-bold text-red-400">{fmt(atRisk)}</div>
          <div className="text-white/35 text-xs mt-1">Called commit, AI flags high risk</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-white/40 text-sm">Filter by AI risk:</span>
        {(["All", "High", "Medium", "Low"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              filter === f
                ? "bg-accent border-accent text-white"
                : "bg-white/03 border-white/08 text-white/50 hover:border-white/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Deal table */}
      <div className="card overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/06">
                {["Company", "Rep", "Amount", "Stage", "Close", "Rep Forecast", "AI Score", "AI Risk", ""].map((h) => (
                  <th key={h} className="text-left text-xs text-white/30 uppercase tracking-wide py-4 px-4 first:pl-6 last:pr-6 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((deal) => {
                const cfg = riskConfig[deal.aiRisk];
                return (
                  <motion.tr
                    key={deal.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-white/04 hover:bg-white/02 cursor-pointer transition-colors"
                    onClick={() => setSelectedDeal(selectedDeal?.id === deal.id ? null : deal)}
                  >
                    <td className="py-4 px-4 pl-6 text-white font-medium text-sm whitespace-nowrap">{deal.company}</td>
                    <td className="py-4 px-4 text-white/50 text-sm whitespace-nowrap">{deal.rep}</td>
                    <td className="py-4 px-4 text-white text-sm font-mono whitespace-nowrap">{fmt(deal.amount)}</td>
                    <td className="py-4 px-4 text-white/60 text-sm whitespace-nowrap">{deal.stage}</td>
                    <td className="py-4 px-4 text-white/60 text-sm whitespace-nowrap">{deal.closeDate}</td>
                    <td className="py-4 px-4 text-sm whitespace-nowrap">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${deal.repForecast === "Commit" ? "bg-blue-500/10 text-blue-400" : "bg-white/05 text-white/40"}`}>
                        {deal.repForecast}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full rounded-full bg-accent" style={{ width: `${deal.aiScore}%` }} />
                        </div>
                        <span className={`text-sm font-bold ${deal.aiScore >= 70 ? "text-emerald-400" : deal.aiScore >= 50 ? "text-amber-400" : "text-red-400"}`}>{deal.aiScore}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {deal.aiRisk}
                      </span>
                    </td>
                    <td className="py-4 px-4 pr-6">
                      <svg className={`w-4 h-4 text-white/30 transition-transform ${selectedDeal?.id === deal.id ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deal detail */}
      {selectedDeal && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{selectedDeal.company}</h3>
              <div className="text-white/50 text-sm">{selectedDeal.rep} · {selectedDeal.stage} · Close {selectedDeal.closeDate}</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold accent-text">{selectedDeal.aiScore}</div>
              <div className="text-white/40 text-xs">AI Confidence Score</div>
            </div>
          </div>
          <div>
            <div className="text-white/40 text-xs uppercase tracking-wide mb-3">AI Flags</div>
            <div className="space-y-2">
              {selectedDeal.flags.map((flag, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className={selectedDeal.aiRisk === "High" ? "text-red-400" : selectedDeal.aiRisk === "Medium" ? "text-amber-400" : "text-emerald-400"}>
                    {selectedDeal.aiRisk === "Low" ? "✓" : "⚠"}
                  </span>
                  <span className="text-white/65">{flag}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/06">
            <div className="text-white/40 text-xs mb-2">Recommendation</div>
            <p className="text-white/65 text-sm">
              {selectedDeal.aiRisk === "High"
                ? `This deal needs immediate manager attention. ${selectedDeal.daysSinceActivity} days since last activity and key qualification gaps suggest this is unlikely to close on ${selectedDeal.closeDate}. Schedule a deal review this week.`
                : selectedDeal.aiRisk === "Medium"
                ? `Deal shows moderate confidence. Address the flagged gaps — particularly around multi-threading and paper process — to increase close probability before the forecast date.`
                : `Deal is tracking well. Maintain current velocity and ensure legal/procurement momentum doesn't stall in the final stages.`}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
