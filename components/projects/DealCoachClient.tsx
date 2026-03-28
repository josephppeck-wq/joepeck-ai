"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SAMPLE_NOTES = `We're working a deal with Acme Corp, $180K ARR, targeting their VP of Revenue Ops. The deal came in through inbound - they downloaded our ROI calculator. Had a good discovery call last week. They mentioned they're losing deals to competitors because their reps don't have good visibility into account health. We showed them a demo and they were pretty excited. Their fiscal year ends in June so they're hoping to have something in place before Q2. Not sure who else is involved in the decision. They mentioned they might also be looking at a couple of other vendors. Close date is set for April 15.`;

type MEDDPICCScore = "Strong" | "Needs Work" | "Missing";

interface MEDDPICCElement {
  score: MEDDPICCScore;
  assessment: string;
  nextAction: string;
}

interface DealAnalysis {
  dealSummary: string;
  overallScore: "Strong" | "Moderate" | "At Risk";
  overallAssessment: string;
  meddpicc: {
    metrics: MEDDPICCElement;
    economicBuyer: MEDDPICCElement;
    decisionCriteria: MEDDPICCElement;
    decisionProcess: MEDDPICCElement;
    paperProcess: MEDDPICCElement;
    implicatedPain: MEDDPICCElement;
    champion: MEDDPICCElement;
    competition: MEDDPICCElement;
  };
  topThreeActions: string[];
}

const scoreConfig: Record<MEDDPICCScore, { color: string; bg: string; icon: string }> = {
  Strong: { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", icon: "✅" },
  "Needs Work": { color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20", icon: "⚠️" },
  Missing: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/20", icon: "❌" },
};

const overallConfig = {
  Strong: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Moderate: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  "At Risk": "text-red-400 bg-red-500/10 border-red-500/20",
};

const meddpiccLabels: Record<string, string> = {
  metrics: "Metrics",
  economicBuyer: "Economic Buyer",
  decisionCriteria: "Decision Criteria",
  decisionProcess: "Decision Process",
  paperProcess: "Paper Process",
  implicatedPain: "Implicated Pain",
  champion: "Champion",
  competition: "Competition",
};

export default function DealCoachClient() {
  const [notes, setNotes] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [result, setResult] = useState<DealAnalysis | null>(null);
  const [error, setError] = useState("");

  const analyze = async (text: string) => {
    setIsStreaming(true);
    setStreamedText("");
    setResult(null);
    setError("");

    const res = await fetch("/api/deal-coach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dealNotes: text }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Analysis failed");
      setIsStreaming(false);
      return;
    }

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();
    let accumulated = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setStreamedText(accumulated);
      }
    } catch {
      setError("Stream interrupted");
      setIsStreaming(false);
      return;
    }

    setIsStreaming(false);

    try {
      const jsonMatch = accumulated.match(/\{[\s\S]*\}/);
      if (jsonMatch) setResult(JSON.parse(jsonMatch[0]));
      else setError("Failed to parse response");
    } catch {
      setError("Failed to parse response");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card p-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium text-white/70 uppercase tracking-wide">
            Your Deal Notes
          </label>
          <button
            onClick={() => setNotes(SAMPLE_NOTES)}
            className="text-xs text-accent hover:text-accent-light transition-colors"
          >
            Load sample deal →
          </button>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Paste your deal notes here — call summaries, CRM notes, email context, anything you know about the deal..."
          rows={8}
          maxLength={2000}
          className="w-full bg-white/04 border border-white/08 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent/50 focus:bg-white/06 transition-all resize-none font-mono"
        />
        <div className="flex items-center justify-between mt-4">
          <span className="text-white/25 text-xs">{notes.length}/2000 characters</span>
          <button
            onClick={() => analyze(notes)}
            disabled={isStreaming || notes.trim().length < 20}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-accent/25"
          >
            {isStreaming ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                Analyze Deal
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </>
            )}
          </button>
        </div>
        {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
      </div>

      <AnimatePresence>
        {isStreaming && (
          <motion.div
            key="streaming"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card p-6 mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-white/40 text-xs uppercase tracking-wide">Analyzing...</span>
            </div>
            <pre className="text-white/30 text-xs font-mono leading-relaxed whitespace-pre-wrap overflow-hidden max-h-32">
              {streamedText}
            </pre>
          </motion.div>
        )}

        {result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Overall score */}
            <div className="card p-8 mb-6">
              <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-wide mb-1">Deal Summary</div>
                  <p className="text-white/80 text-sm leading-relaxed max-w-xl">{result.dealSummary}</p>
                </div>
                <div className={`px-4 py-2 rounded-lg border text-sm font-bold ${overallConfig[result.overallScore]}`}>
                  {result.overallScore}
                </div>
              </div>
              <p className="text-white/65 text-sm leading-relaxed border-t border-white/06 pt-4 mt-2">
                {result.overallAssessment}
              </p>
            </div>

            {/* MEDDPICC grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {Object.entries(result.meddpicc).map(([key, element]) => {
                const cfg = scoreConfig[element.score as MEDDPICCScore];
                return (
                  <div key={key} className="card p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-semibold text-sm">{meddpiccLabels[key]}</span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.color}`}>
                        {cfg.icon} {element.score}
                      </span>
                    </div>
                    <p className="text-white/55 text-xs leading-relaxed mb-3">{element.assessment}</p>
                    <div className="border-t border-white/06 pt-3">
                      <div className="text-accent text-xs font-medium mb-1">Next Action</div>
                      <p className="text-white/65 text-xs leading-relaxed">{element.nextAction}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Top 3 Actions */}
            <div className="card p-8">
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs">3</span>
                Priority Actions This Week
              </h3>
              <div className="space-y-4">
                {result.topThreeActions.map((action, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{action}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
