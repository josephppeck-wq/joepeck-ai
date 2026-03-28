"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AccountBrief {
  company: string;
  companyOverview: string;
  strategicContext: string;
  buyingSignals: string[];
  keyStakeholders: { role: string; typicalPriorities: string; engagementAngle: string }[];
  painPoints: { pain: string; impact: string; yourAngle: string }[];
  outreachAngles: { angle: string; subject: string; opener: string }[];
  competitiveLandscape: string;
  talkingPoints: string[];
}

export default function AccountResearcherClient() {
  const [companies, setCompanies] = useState<string[]>([]);
  const [selected, setSelected] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [result, setResult] = useState<AccountBrief | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/account-researcher")
      .then((r) => r.json())
      .then((d) => setCompanies(d.companies || []));
  }, []);

  const research = async () => {
    if (!selected) return;
    setIsStreaming(true);
    setStreamedText("");
    setResult(null);
    setError("");

    const res = await fetch("/api/account-researcher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company: selected }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Research failed");
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
      // Strip the __COMPANY__ header line prepended by the route
      const body = accumulated.replace(/^__COMPANY__:[^\n]*\n/, "");
      const company = accumulated.match(/^__COMPANY__:([^\n]*)/)?.[1] || selected;
      const jsonMatch = body.match(/\{[\s\S]*\}/);
      if (jsonMatch) setResult({ company, ...JSON.parse(jsonMatch[0]) });
      else setError("Failed to parse response");
    } catch {
      setError("Failed to parse response");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card p-8 mb-8">
        <label className="block text-sm font-medium text-white/70 uppercase tracking-wide mb-4">
          Select a Company
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {companies.map((company) => (
            <button
              key={company}
              onClick={() => setSelected(company)}
              className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                selected === company
                  ? "bg-accent border-accent text-white"
                  : "bg-white/03 border-white/08 text-white/60 hover:border-white/20 hover:text-white"
              }`}
            >
              {company}
            </button>
          ))}
        </div>
        <button
          onClick={research}
          disabled={!selected || isStreaming}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-accent/25"
        >
          {isStreaming ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Researching {selected}...
            </>
          ) : (
            `Generate Brief${selected ? ` for ${selected}` : ""}`
          )}
        </button>
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
              <span className="text-white/40 text-xs uppercase tracking-wide">Researching {selected}...</span>
            </div>
            <pre className="text-white/30 text-xs font-mono leading-relaxed whitespace-pre-wrap overflow-hidden max-h-32">
              {streamedText.replace(/^__COMPANY__:[^\n]*\n/, "")}
            </pre>
          </motion.div>
        )}

        {result && (
          <motion.div key="result" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            {/* Overview */}
            <div className="card p-8">
              <div className="text-accent text-xs uppercase tracking-widest mb-4 font-medium">Company Overview</div>
              <p className="text-white/75 leading-relaxed mb-4">{result.companyOverview}</p>
              <div className="border-t border-white/06 pt-4">
                <div className="text-white/40 text-xs uppercase tracking-wide mb-2">Strategic Context</div>
                <p className="text-white/65 text-sm leading-relaxed">{result.strategicContext}</p>
              </div>
            </div>

            {/* Buying signals */}
            <div className="card p-8">
              <div className="text-accent text-xs uppercase tracking-widest mb-4 font-medium">Buying Signals</div>
              <div className="flex flex-wrap gap-2">
                {result.buyingSignals.map((signal, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs">{signal}</span>
                ))}
              </div>
            </div>

            {/* Stakeholders */}
            <div className="card p-8">
              <div className="text-accent text-xs uppercase tracking-widest mb-6 font-medium">Key Stakeholders</div>
              <div className="space-y-6">
                {result.keyStakeholders.map((s, i) => (
                  <div key={i} className="border-b border-white/06 pb-6 last:border-0 last:pb-0">
                    <div className="text-white font-semibold text-sm mb-2">{s.role}</div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-white/40 text-xs mb-1">Priorities</div>
                        <p className="text-white/60 text-xs leading-relaxed">{s.typicalPriorities}</p>
                      </div>
                      <div>
                        <div className="text-accent text-xs mb-1">Engagement Angle</div>
                        <p className="text-white/60 text-xs leading-relaxed">{s.engagementAngle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pain points */}
            <div className="card p-8">
              <div className="text-accent text-xs uppercase tracking-widest mb-6 font-medium">Pain Points & Your Angle</div>
              <div className="space-y-5">
                {result.painPoints.map((p, i) => (
                  <div key={i} className="border-b border-white/06 pb-5 last:border-0 last:pb-0">
                    <div className="text-white font-medium text-sm mb-2">{p.pain}</div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-white/40 text-xs mb-1">Business Impact</div>
                        <p className="text-white/60 text-xs leading-relaxed">{p.impact}</p>
                      </div>
                      <div>
                        <div className="text-accent text-xs mb-1">Your Angle</div>
                        <p className="text-white/60 text-xs leading-relaxed">{p.yourAngle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outreach angles */}
            <div className="card p-8">
              <div className="text-accent text-xs uppercase tracking-widest mb-6 font-medium">3 Personalized Outreach Angles</div>
              <div className="space-y-6">
                {result.outreachAngles.map((a, i) => (
                  <div key={i} className="bg-white/02 border border-white/06 rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">{i + 1}</div>
                      <div className="text-white font-semibold text-sm">{a.angle}</div>
                    </div>
                    <div className="text-white/40 text-xs mb-1">Subject Line</div>
                    <div className="text-white/70 text-sm mb-3 font-medium">{a.subject}</div>
                    <div className="text-white/40 text-xs mb-1">Opening Line</div>
                    <div className="text-white/60 text-sm italic">&ldquo;{a.opener}&rdquo;</div>
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
