"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GTMBlueprint {
  executiveSummary: string;
  icp: {
    primarySegment: string;
    firmographics: string[];
    technographics: string[];
    behavioralSignals: string[];
    antiICP: string;
  };
  channelStrategy: { channel: string; priority: string; rationale: string; firstAction: string }[];
  teamStructure: { immediate: string; sixMonth: string; twelveMonth: string };
  compModel: { repOTE: string; split: string; accelerators: string; keyMetrics: string[] };
  first90Days: { week: string; focus: string; deliverables: string[] }[];
  kpiTargets: { metric: string; target: string; timeframe: string }[];
  topRisks: { risk: string; mitigation: string }[];
  joesPOV: string;
}

const stages = ["Pre-Revenue", "Seed / <$1M ARR", "$1M–$5M ARR", "$5M–$20M ARR", "$20M–$50M ARR", "$50M+ ARR"];
const motions = ["PLG (Product-Led Growth)", "SLG (Sales-Led Growth)", "Hybrid PLG + SLG", "Channel/Partner-Led", "Enterprise/Field Sales"];

export default function GTMBlueprintClient() {
  const [form, setForm] = useState({ product: "", market: "", stage: "", teamSize: "", asp: "", salesCycle: "", motion: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GTMBlueprint | null>(null);
  const [error, setError] = useState("");

  const generate = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/gtm-blueprint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isValid = form.product.trim().length > 5 && form.market.trim().length > 5 && form.stage;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card p-8 mb-8">
        <h3 className="text-white font-semibold mb-6">Tell me about your business</h3>
        <div className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wide mb-2">Product / Solution *</label>
              <input
                type="text"
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
                placeholder="e.g. AI-powered sales coaching platform"
                className="w-full bg-white/04 border border-white/08 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wide mb-2">Target Market *</label>
              <input
                type="text"
                value={form.market}
                onChange={(e) => setForm({ ...form, market: e.target.value })}
                placeholder="e.g. Mid-market B2B SaaS companies"
                className="w-full bg-white/04 border border-white/08 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent/50 transition-all"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wide mb-2">Company Stage *</label>
              <select
                value={form.stage}
                onChange={(e) => setForm({ ...form, stage: e.target.value })}
                className="w-full bg-white/04 border border-white/08 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 transition-all appearance-none"
              >
                <option value="" className="bg-gray-900">Select stage...</option>
                {stages.map((s) => <option key={s} value={s} className="bg-gray-900">{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wide mb-2">Sales Motion</label>
              <select
                value={form.motion}
                onChange={(e) => setForm({ ...form, motion: e.target.value })}
                className="w-full bg-white/04 border border-white/08 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-accent/50 transition-all appearance-none"
              >
                <option value="" className="bg-gray-900">Select motion...</option>
                {motions.map((m) => <option key={m} value={m} className="bg-gray-900">{m}</option>)}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wide mb-2">Current Team Size</label>
              <input
                type="text"
                value={form.teamSize}
                onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
                placeholder="e.g. 2 AEs, no SDRs"
                className="w-full bg-white/04 border border-white/08 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wide mb-2">Avg Deal Size</label>
              <input
                type="text"
                value={form.asp}
                onChange={(e) => setForm({ ...form, asp: e.target.value })}
                placeholder="e.g. $24K ACV"
                className="w-full bg-white/04 border border-white/08 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-white/40 uppercase tracking-wide mb-2">Sales Cycle</label>
              <input
                type="text"
                value={form.salesCycle}
                onChange={(e) => setForm({ ...form, salesCycle: e.target.value })}
                placeholder="e.g. 45–60 days"
                className="w-full bg-white/04 border border-white/08 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent/50 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={generate}
            disabled={!isValid || loading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-accent/25"
          >
            {loading ? (
              <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Generating Blueprint...</>
            ) : "Generate GTM Blueprint"}
          </button>
          {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            {/* Summary */}
            <div className="card p-8">
              <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">Executive Summary</div>
              <p className="text-white/75 leading-relaxed">{result.executiveSummary}</p>
            </div>

            {/* ICP */}
            <div className="card p-8">
              <div className="text-accent text-xs uppercase tracking-widest mb-4 font-medium">Ideal Customer Profile</div>
              <div className="text-white font-semibold mb-4">{result.icp.primarySegment}</div>
              <div className="grid sm:grid-cols-2 gap-6 mb-4">
                <div>
                  <div className="text-white/40 text-xs mb-2">Firmographics</div>
                  <ul className="space-y-1">{result.icp.firmographics.map((f, i) => <li key={i} className="text-white/60 text-sm flex items-start gap-2"><span className="text-accent mt-1">·</span>{f}</li>)}</ul>
                </div>
                <div>
                  <div className="text-white/40 text-xs mb-2">Buying Signals</div>
                  <ul className="space-y-1">{result.icp.behavioralSignals.map((s, i) => <li key={i} className="text-white/60 text-sm flex items-start gap-2"><span className="text-accent mt-1">·</span>{s}</li>)}</ul>
                </div>
              </div>
              <div className="bg-red-500/05 border border-red-500/15 rounded-lg p-4">
                <div className="text-red-400 text-xs font-medium mb-1">Anti-ICP (Don&apos;t Sell To)</div>
                <p className="text-white/55 text-sm">{result.icp.antiICP}</p>
              </div>
            </div>

            {/* Channels */}
            <div className="card p-8">
              <div className="text-accent text-xs uppercase tracking-widest mb-4 font-medium">Channel Strategy</div>
              <div className="space-y-4">
                {result.channelStrategy.map((c, i) => (
                  <div key={i} className="border-b border-white/06 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-white font-semibold text-sm">{c.channel}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${c.priority === "Primary" ? "bg-accent/20 text-accent" : "bg-white/08 text-white/40"}`}>{c.priority}</span>
                    </div>
                    <p className="text-white/55 text-xs mb-2">{c.rationale}</p>
                    <p className="text-accent text-xs"><span className="text-white/40">First action: </span>{c.firstAction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 90 Days */}
            <div className="card p-8">
              <div className="text-accent text-xs uppercase tracking-widest mb-4 font-medium">First 90 Days</div>
              <div className="space-y-4">
                {result.first90Days.map((phase, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-16 text-accent text-xs font-mono mt-1">Wk {phase.week}</div>
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm mb-2">{phase.focus}</div>
                      <ul className="space-y-1">{phase.deliverables.map((d, j) => <li key={j} className="text-white/55 text-xs flex items-start gap-2"><span className="text-accent mt-1">✓</span>{d}</li>)}</ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div className="card p-8">
              <div className="text-accent text-xs uppercase tracking-widest mb-4 font-medium">KPI Targets</div>
              <div className="grid sm:grid-cols-2 gap-4">
                {result.kpiTargets.map((kpi, i) => (
                  <div key={i} className="bg-white/02 border border-white/06 rounded-lg p-4">
                    <div className="text-white/50 text-xs mb-1">{kpi.metric}</div>
                    <div className="text-accent font-bold text-lg">{kpi.target}</div>
                    <div className="text-white/30 text-xs">{kpi.timeframe}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Joe's POV */}
            <div className="card p-8 border-accent/20">
              <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">Joe&apos;s Take</div>
              <p className="text-white/75 leading-relaxed italic">&ldquo;{result.joesPOV}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                  <span className="text-accent font-bold text-xs">JP</span>
                </div>
                <div className="text-white/40 text-xs">Joe Peck · Senior Sales Executive & AI Strategist</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
