"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SAMPLE = `WON - Meridian Health, $85K ARR, 45 days. Champion: VP Revenue Ops. Beat Clari. Key factors: strong ROI case built together with champion, EB engaged early, 4 stakeholders involved, we identified their forecast problem before they could articulate it. They'd missed Q3 number and board was asking questions.

LOST - Vertex Capital, $200K ARR, 90 days. Lost to status quo. Champion was VP Sales but had no EB access. Never met CFO. Deal stalled after legal review started. They said "timing isn't right" but real issue was we never got above the champion.

WON - NovaTech Solutions, $55K ARR, 30 days. Beat HubSpot. Fast close because we matched their procurement timeline. Multi-threaded from day 1. IT, RevOps, and VP Sales all in discovery. Clear metrics: 40% reduction in forecast error.

LOST - Pinnacle Group, $310K ARR, 120 days. Lost to Clari. Champion left the company mid-deal. Never rebuilt. New contact was cold. We should have had a second champion. Deal dragged and competitor stepped in.

WON - BlueLine Software, $72K ARR, 52 days. No competitor. Created urgency around their Series B board expectations. Champion was new CRO trying to make immediate impact. We gave them a win.`;

interface WinLossResult {
  summary: string;
  winPatterns: { pattern: string; frequency: string; insight: string }[];
  lossPatterns: { pattern: string; frequency: string; insight: string }[];
  competitiveInsights: string;
  playBookChanges: { change: string; rationale: string; impact: string }[];
  objectionMap: { objection: string; frequency: string; recommendedResponse: string }[];
  strategicRecommendation: string;
}

const freqColor: Record<string, string> = {
  High: "bg-red-500/10 text-red-400 border-red-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Low: "bg-white/05 text-white/40 border-white/10",
};

const impactColor: Record<string, string> = {
  High: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Medium: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Low: "bg-white/05 text-white/40 border-white/10",
};

export default function WinLossClient() {
  const [text, setText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [result, setResult] = useState<WinLossResult | null>(null);
  const [error, setError] = useState("");

  const analyze = async (input: string) => {
    setIsStreaming(true);
    setStreamedText("");
    setResult(null);
    setError("");

    const res = await fetch("/api/win-loss", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dealSummaries: input }),
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
          <label className="text-sm font-medium text-white/70 uppercase tracking-wide">Your Deal Summaries</label>
          <button onClick={() => setText(SAMPLE)} className="text-xs text-accent hover:text-accent-light transition-colors">Load sample data →</button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Paste 3–10 deal summaries here. Include wins and losses. Example format:\n\nWON - Company Name, $XX ARR, X days. Champion: [role]. Beat [competitor]. Key factors: ...\n\nLOST - Company Name, $XX ARR, X days. Lost to [reason/competitor]. Key factors: ...`}
          rows={10}
          maxLength={3000}
          className="w-full bg-white/04 border border-white/08 rounded-lg px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-accent/50 transition-all resize-none font-mono"
        />
        <div className="flex items-center justify-between mt-4">
          <span className="text-white/25 text-xs">{text.length}/3000 characters</span>
          <button
            onClick={() => analyze(text)}
            disabled={isStreaming || text.trim().length < 50}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-accent/25"
          >
            {isStreaming ? <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Analyzing...</> : "Analyze Deals"}
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
          <motion.div key="result" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div className="card p-8">
              <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">Executive Summary</div>
              <p className="text-white/75 leading-relaxed">{result.summary}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="card p-8">
                <div className="text-emerald-400 text-xs uppercase tracking-widest mb-4 font-medium">Why You Win</div>
                <div className="space-y-4">
                  {result.winPatterns.map((p, i) => (
                    <div key={i} className="border-b border-white/06 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-white text-sm font-medium">{p.pattern}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs border ${freqColor[p.frequency]}`}>{p.frequency}</span>
                      </div>
                      <p className="text-white/55 text-xs leading-relaxed">{p.insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-8">
                <div className="text-red-400 text-xs uppercase tracking-widest mb-4 font-medium">Why You Lose</div>
                <div className="space-y-4">
                  {result.lossPatterns.map((p, i) => (
                    <div key={i} className="border-b border-white/06 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-white text-sm font-medium">{p.pattern}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs border ${freqColor[p.frequency]}`}>{p.frequency}</span>
                      </div>
                      <p className="text-white/55 text-xs leading-relaxed">{p.insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card p-8">
              <div className="text-accent text-xs uppercase tracking-widest mb-4 font-medium">Playbook Changes</div>
              <div className="space-y-4">
                {result.playBookChanges.map((c, i) => (
                  <div key={i} className="flex items-start gap-4 border-b border-white/06 pb-4 last:border-0 last:pb-0">
                    <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-white font-medium text-sm">{c.change}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs border ${impactColor[c.impact]}`}>{c.impact} impact</span>
                      </div>
                      <p className="text-white/55 text-xs leading-relaxed">{c.rationale}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-8 border-accent/20">
              <div className="text-accent text-xs uppercase tracking-widest mb-3 font-medium">Strategic Recommendation</div>
              <p className="text-white/75 leading-relaxed italic">&ldquo;{result.strategicRecommendation}&rdquo;</p>
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
