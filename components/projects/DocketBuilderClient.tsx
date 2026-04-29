"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CompanyOverview {
  industry?: string;
  size?: string;
  hq?: string;
  ownership?: string;
  funding_stage?: string;
}

interface CustomerSnapshot {
  company_overview?: CompanyOverview;
  business_model?: string;
  tech_stack_signals?: string[];
  recent_news?: string[];
  strategic_priorities?: string[];
  relevant_job_postings?: string[];
}

interface DecisionMaker {
  name: string;
  title: string;
  tenure?: string;
  public_signal: string;
  persona_match: string;
  source_url: string;
}

interface FitMapEntry {
  product_name: string;
  fit_score: "High" | "Medium" | "Low" | "None";
  reasoning: string;
  evidence_refs?: string[];
}

interface CrossSellOpportunity {
  rank?: number;
  product?: string;
  buyer?: string;
  why_now?: string;
  summary?: string;
  [key: string]: unknown;
}

interface RecommendedPlays {
  cross_sell_opportunities?: CrossSellOpportunity[];
  talking_points?: string[];
  discovery_questions?: string[];
}

interface DocketMetadata {
  seller_profile_source?: string;
  seller_profile_confidence?: string;
  customer_research_quality?: string;
  customer_research_source_count?: number | string;
  warnings?: string[];
  generated_at?: string;
}

interface Docket {
  executive_summary?: string;
  customer_snapshot?: CustomerSnapshot;
  decision_makers?: DecisionMaker[];
  seller_fit_map?: FitMapEntry[];
  recommended_plays?: RecommendedPlays;
  risks_and_unknowns?: string[];
  sources?: { seller?: string[]; customer?: string[] };
  metadata?: DocketMetadata;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function extractJson(text: string): Docket | null {
  try {
    // Primary: extract JSON from inside the last ```json ... ``` fence
    const fenceMatches = Array.from(text.matchAll(/```json\s*([\s\S]*?)```/g));
    if (fenceMatches.length > 0) {
      const last = fenceMatches[fenceMatches.length - 1];
      return JSON.parse(last[1].trim()) as Docket;
    }
    // Fallback: find the outermost JSON object in the streamed text
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) return null;
    return JSON.parse(text.slice(start, end + 1)) as Docket;
  } catch {
    return null;
  }
}

// Detect which phase is currently streaming based on accumulated text
function detectActivePhase(text: string): number {
  if (text.includes("PHASE 4") || text.includes("Assembling docket")) return 4;
  if (text.includes("PHASE 3") || text.includes("Mapping product fit")) return 3;
  if (text.includes("PHASE 2.5") || text.includes("Identifying decision-makers")) return 2.5;
  if (text.includes("PHASE 2") || text.includes("Researching ")) return 2;
  if (text.includes("PHASE 1") || text.includes("Analyzing ")) return 1;
  return 0;
}

const fitScoreConfig: Record<string, { label: string; classes: string }> = {
  High: { label: "High", classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  Medium: { label: "Medium", classes: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  Low: { label: "Low", classes: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  None: { label: "None", classes: "bg-white/05 text-white/35 border-white/10" },
};

const phaseLabels = [
  { phase: 1, label: "Analyzing seller" },
  { phase: 2, label: "Researching customer" },
  { phase: 2.5, label: "Identifying decision-makers" },
  { phase: 3, label: "Mapping product fit" },
  { phase: 4, label: "Assembling docket" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PhaseProgressBar({ activePhase }: { activePhase: number }) {
  return (
    <div className="flex items-center gap-2 mb-6 flex-wrap">
      {phaseLabels.map(({ phase, label }, i) => {
        const done = activePhase > phase;
        const active = Math.abs(activePhase - phase) < 0.1;
        return (
          <div key={phase} className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition-all ${
                done
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : active
                  ? "bg-accent/15 text-accent border-accent/30"
                  : "bg-white/03 text-white/25 border-white/06"
              }`}
            >
              {done ? (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : active ? (
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
              )}
              {label}
            </div>
            {i < phaseLabels.length - 1 && (
              <div className={`w-4 h-px ${done ? "bg-emerald-500/30" : "bg-white/08"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function CopyButton({ json }: { json: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  };
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/04 hover:bg-white/08 text-white/50 hover:text-white/80 text-xs transition-all"
    >
      {copied ? (
        <>
          <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy as JSON
        </>
      )}
    </button>
  );
}

function DocketView({ docket, rawJson }: { docket: Docket; rawJson: string }) {
  const snap = docket.customer_snapshot;
  const overview = snap?.company_overview;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Docket Complete
          </span>
          {docket.metadata?.seller_profile_source === "INFERRED" && (
            <span className="px-2.5 py-1 rounded-full text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20">
              ⚠ Seller profile inferred
            </span>
          )}
        </div>
        <CopyButton json={rawJson} />
      </div>

      {/* Warnings */}
      {docket.metadata?.warnings && docket.metadata.warnings.length > 0 && (
        <div className="card p-4 border-amber-500/20 bg-amber-500/05">
          <div className="text-amber-400 text-xs uppercase tracking-widest mb-2 font-medium">Warnings</div>
          <ul className="space-y-1">
            {docket.metadata.warnings.map((w, i) => (
              <li key={i} className="text-amber-300/70 text-xs leading-relaxed flex items-start gap-2">
                <span className="mt-0.5 flex-shrink-0">⚠</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Executive Summary */}
      {docket.executive_summary && (
        <div className="card p-8">
          <div className="text-accent text-xs uppercase tracking-widest mb-4 font-medium">Executive Summary</div>
          <p className="text-white/80 leading-relaxed">{docket.executive_summary}</p>
          {docket.metadata && (
            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/06">
              {docket.metadata.seller_profile_confidence && (
                <span className="text-xs text-white/35">
                  Seller confidence: <span className="text-white/55">{docket.metadata.seller_profile_confidence}</span>
                </span>
              )}
              {docket.metadata.customer_research_quality && (
                <span className="text-xs text-white/35">
                  Customer research: <span className="text-white/55">{docket.metadata.customer_research_quality}</span>
                </span>
              )}
              {docket.metadata.customer_research_source_count !== undefined && (
                <span className="text-xs text-white/35">
                  Sources: <span className="text-white/55">{docket.metadata.customer_research_source_count}</span>
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Customer Snapshot */}
      {snap && (
        <div className="card p-8">
          <div className="text-accent text-xs uppercase tracking-widest mb-6 font-medium">Customer Snapshot</div>
          {overview && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {overview.industry && (
                <div>
                  <div className="text-white/35 text-xs mb-1">Industry</div>
                  <div className="text-white/75 text-sm">{overview.industry}</div>
                </div>
              )}
              {overview.size && (
                <div>
                  <div className="text-white/35 text-xs mb-1">Size</div>
                  <div className="text-white/75 text-sm">{overview.size}</div>
                </div>
              )}
              {overview.hq && (
                <div>
                  <div className="text-white/35 text-xs mb-1">HQ</div>
                  <div className="text-white/75 text-sm">{overview.hq}</div>
                </div>
              )}
              {overview.ownership && (
                <div>
                  <div className="text-white/35 text-xs mb-1">Ownership</div>
                  <div className="text-white/75 text-sm">{overview.ownership}</div>
                </div>
              )}
              {overview.funding_stage && (
                <div>
                  <div className="text-white/35 text-xs mb-1">Funding Stage</div>
                  <div className="text-white/75 text-sm">{overview.funding_stage}</div>
                </div>
              )}
            </div>
          )}
          {snap.business_model && (
            <div className="mb-5">
              <div className="text-white/35 text-xs mb-2">Business Model</div>
              <p className="text-white/65 text-sm leading-relaxed">{snap.business_model}</p>
            </div>
          )}
          {snap.strategic_priorities && snap.strategic_priorities.length > 0 && (
            <div className="mb-5">
              <div className="text-white/35 text-xs mb-2">Strategic Priorities</div>
              <ul className="space-y-1">
                {snap.strategic_priorities.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-white/60 text-xs leading-relaxed">
                    <span className="text-accent mt-0.5 flex-shrink-0">→</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {snap.tech_stack_signals && snap.tech_stack_signals.length > 0 && (
            <div className="mb-5">
              <div className="text-white/35 text-xs mb-2">Tech Stack Signals</div>
              <div className="flex flex-wrap gap-2">
                {snap.tech_stack_signals.map((t, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-full bg-white/04 border border-white/08 text-white/50 text-xs">{t}</span>
                ))}
              </div>
            </div>
          )}
          {snap.recent_news && snap.recent_news.length > 0 && (
            <div>
              <div className="text-white/35 text-xs mb-2">Recent News</div>
              <ul className="space-y-1">
                {snap.recent_news.map((n, i) => (
                  <li key={i} className="text-white/50 text-xs leading-relaxed flex items-start gap-2">
                    <span className="text-white/20 flex-shrink-0 mt-0.5">•</span>
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Decision Makers */}
      {docket.decision_makers && docket.decision_makers.length > 0 && (
        <div className="card p-8">
          <div className="text-accent text-xs uppercase tracking-widest mb-6 font-medium">Decision-Maker Map</div>
          <div className="space-y-5">
            {docket.decision_makers.map((dm, i) => (
              <div key={i} className="border-b border-white/06 pb-5 last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                  <div>
                    <div className="text-white font-semibold text-sm">{dm.name}</div>
                    <div className="text-white/45 text-xs mt-0.5">{dm.title}</div>
                    {dm.tenure && <div className="text-white/30 text-xs mt-0.5">{dm.tenure}</div>}
                  </div>
                  <span className="tag text-xs px-2.5 py-1 flex-shrink-0">{dm.persona_match}</span>
                </div>
                {dm.public_signal && (
                  <p className="text-white/50 text-xs leading-relaxed mb-2">{dm.public_signal}</p>
                )}
                {dm.source_url && (
                  <a
                    href={dm.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent/60 hover:text-accent text-xs transition-colors break-all"
                  >
                    {dm.source_url}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Seller Fit Map */}
      {docket.seller_fit_map && docket.seller_fit_map.length > 0 && (
        <div className="card p-8">
          <div className="text-accent text-xs uppercase tracking-widest mb-6 font-medium">Product Fit Map</div>
          <div className="space-y-5">
            {docket.seller_fit_map.map((entry, i) => {
              const cfg = fitScoreConfig[entry.fit_score] ?? fitScoreConfig["None"];
              return (
                <div key={i} className="border-b border-white/06 pb-5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
                    <div className="text-white font-semibold text-sm">{entry.product_name}</div>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.classes}`}>
                      {entry.fit_score}
                    </span>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed mb-3">{entry.reasoning}</p>
                  {entry.evidence_refs && entry.evidence_refs.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {entry.evidence_refs.map((ref, j) => (
                        <a
                          key={j}
                          href={ref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent/50 hover:text-accent text-xs transition-colors truncate max-w-xs"
                        >
                          {ref}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommended Plays */}
      {docket.recommended_plays && (
        <div className="card p-8">
          <div className="text-accent text-xs uppercase tracking-widest mb-6 font-medium">Recommended Plays</div>

          {docket.recommended_plays.cross_sell_opportunities && docket.recommended_plays.cross_sell_opportunities.length > 0 && (
            <div className="mb-8">
              <div className="text-white/35 text-xs uppercase tracking-wide mb-4">Land & Expand Opportunities</div>
              <div className="space-y-4">
                {docket.recommended_plays.cross_sell_opportunities.map((opp, i) => (
                  <div key={i} className="bg-white/02 border border-white/06 rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {opp.rank ?? i + 1}
                      </div>
                      <div className="text-white font-medium text-sm">{opp.product ?? ""}</div>
                    </div>
                    {opp.buyer && (
                      <div className="text-white/40 text-xs mb-2">Buyer: <span className="text-white/60">{opp.buyer}</span></div>
                    )}
                    {opp.why_now && (
                      <p className="text-white/55 text-xs leading-relaxed mb-2">{opp.why_now}</p>
                    )}
                    {opp.summary && (
                      <p className="text-white/40 text-xs leading-relaxed italic">{opp.summary}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {docket.recommended_plays.talking_points && docket.recommended_plays.talking_points.length > 0 && (
            <div className="mb-8">
              <div className="text-white/35 text-xs uppercase tracking-wide mb-3">Talking Points</div>
              <div className="space-y-3">
                {docket.recommended_plays.talking_points.map((tp, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center text-accent text-xs font-semibold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-white/65 text-sm leading-relaxed">{tp}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {docket.recommended_plays.discovery_questions && docket.recommended_plays.discovery_questions.length > 0 && (
            <div>
              <div className="text-white/35 text-xs uppercase tracking-wide mb-3">Discovery Questions</div>
              <div className="space-y-3">
                {docket.recommended_plays.discovery_questions.map((q, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-accent/50 text-xs mt-1 flex-shrink-0">Q{i + 1}</span>
                    <p className="text-white/60 text-sm leading-relaxed italic">&ldquo;{q}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Risks */}
      {docket.risks_and_unknowns && docket.risks_and_unknowns.length > 0 && (
        <div className="card p-8">
          <div className="text-accent text-xs uppercase tracking-widest mb-4 font-medium">Risks &amp; Unknowns</div>
          <div className="space-y-3">
            {docket.risks_and_unknowns.map((risk, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-orange-400/60 text-xs mt-0.5 flex-shrink-0">⚠</span>
                <p className="text-white/55 text-xs leading-relaxed">{risk}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sources */}
      {docket.sources && (
        <div className="card p-6">
          <div className="text-white/25 text-xs uppercase tracking-widest mb-4 font-medium">Sources</div>
          <div className="grid sm:grid-cols-2 gap-6">
            {docket.sources.seller && docket.sources.seller.length > 0 && (
              <div>
                <div className="text-white/30 text-xs mb-2">Seller</div>
                <ul className="space-y-1">
                  {docket.sources.seller.map((s, i) => (
                    <li key={i}>
                      <a href={s} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-accent text-xs transition-colors break-all">
                        {s}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {docket.sources.customer && docket.sources.customer.length > 0 && (
              <div>
                <div className="text-white/30 text-xs mb-2">Customer</div>
                <ul className="space-y-1">
                  {docket.sources.customer.map((s, i) => (
                    <li key={i}>
                      <a href={s} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-accent text-xs transition-colors break-all">
                        {s}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DocketBuilderClient() {
  const [sellerUrl, setSellerUrl] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [activePhase, setActivePhase] = useState(0);
  const [docket, setDocket] = useState<Docket | null>(null);
  const [rawJson, setRawJson] = useState("");
  const [error, setError] = useState("");
  const [jsonParseError, setJsonParseError] = useState(false);

  const urlValid = isValidUrl(sellerUrl);
  const nameValid = customerName.trim().length >= 2 && customerName.trim().length <= 200;
  const canSubmit = urlValid && nameValid && !isGenerating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsGenerating(true);
    setStreamedText("");
    setDocket(null);
    setRawJson("");
    setError("");
    setJsonParseError(false);
    setActivePhase(1);

    let res: Response;
    try {
      res = await fetch("/api/docket-builder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sellerUrl: sellerUrl.trim(), customerName: customerName.trim() }),
      });
    } catch {
      setError("Network error — please check your connection and try again.");
      setIsGenerating(false);
      return;
    }

    if (!res.ok) {
      let errMsg = "Something went wrong. Please try again.";
      try {
        const data = await res.json();
        if (res.status === 429) {
          errMsg = data.error ?? "Rate limit reached. This demo allows 3 dockets per hour. Please try again shortly.";
        } else {
          errMsg = data.error ?? errMsg;
        }
      } catch { /* ignore parse error */ }
      setError(errMsg);
      setIsGenerating(false);
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
        setActivePhase(detectActivePhase(accumulated));
      }
    } catch {
      setError("Stream interrupted. The response may be incomplete — scroll down to see what was generated.");
      setIsGenerating(false);
    }

    setIsGenerating(false);
    setActivePhase(5); // all done

    // Extract the Phase 4 JSON block from the streamed output
    // Primary: prefer content inside the last ```json ... ``` fence
    const fenceMatches = Array.from(accumulated.matchAll(/```json\s*([\s\S]*?)```/g));
    let jsonStr = "";
    if (fenceMatches.length > 0) {
      jsonStr = fenceMatches[fenceMatches.length - 1][1].trim();
    } else {
      // Fallback: outermost braces
      const jsonStart = accumulated.indexOf("{");
      const jsonEnd = accumulated.lastIndexOf("}");
      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        jsonStr = accumulated.slice(jsonStart, jsonEnd + 1);
      }
    }
    if (jsonStr) {
      setRawJson(jsonStr);
      const parsed = extractJson(accumulated);
      if (parsed) {
        setDocket(parsed);
      } else {
        setJsonParseError(true);
      }
    } else {
      setJsonParseError(true);
    }
  };

  const handleReset = () => {
    setDocket(null);
    setStreamedText("");
    setRawJson("");
    setError("");
    setJsonParseError(false);
    setActivePhase(0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Form card */}
      <div className="card p-8 mb-8">
        <form onSubmit={handleSubmit} noValidate>
          {/* Seller URL */}
          <div className="mb-6">
            <label
              htmlFor="seller-url"
              className="block text-sm font-medium text-white/70 uppercase tracking-wide mb-2"
            >
              Seller Website URL <span className="text-accent">*</span>
            </label>
            <input
              id="seller-url"
              type="url"
              value={sellerUrl}
              onChange={(e) => setSellerUrl(e.target.value)}
              placeholder="https://www.example.com"
              required
              disabled={isGenerating}
              autoComplete="off"
              spellCheck={false}
              className="w-full bg-white/04 border border-white/08 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent/50 focus:bg-white/06 transition-all font-mono disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p className="mt-2 text-white/35 text-xs leading-relaxed">
              The company doing the selling. The agent will learn their products from this website.
            </p>
            {sellerUrl.length > 0 && !urlValid && (
              <p className="mt-1.5 text-red-400 text-xs">Please enter a valid URL including https://</p>
            )}
          </div>

          {/* Customer Name */}
          <div className="mb-8">
            <label
              htmlFor="customer-name"
              className="block text-sm font-medium text-white/70 uppercase tracking-wide mb-2"
            >
              Customer Name <span className="text-accent">*</span>
            </label>
            <input
              id="customer-name"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Acme Corporation"
              required
              minLength={2}
              maxLength={200}
              disabled={isGenerating}
              className="w-full bg-white/04 border border-white/08 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent/50 focus:bg-white/06 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-white/35 text-xs leading-relaxed">
                The end customer being researched.
              </p>
              <span className="text-white/25 text-xs flex-shrink-0 ml-4">
                {customerName.length}/200
              </span>
            </div>
            {customerName.length > 0 && customerName.trim().length < 2 && (
              <p className="mt-1.5 text-red-400 text-xs">Name must be at least 2 characters</p>
            )}
          </div>

          {/* Submit row */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-white/25 text-xs">
              Agent runs in phases · typically 60–90 seconds
            </p>
            <div className="flex items-center gap-3">
              {(docket || jsonParseError) && !isGenerating && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-white/10 bg-white/04 hover:bg-white/08 text-white/50 hover:text-white/80 text-sm transition-all"
                >
                  Run again
                </button>
              )}
              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-accent/25"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Docket
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/08 border border-red-500/20 flex items-start gap-3">
              <span className="text-red-400 text-sm flex-shrink-0 mt-0.5">⚠</span>
              <div>
                <p className="text-red-400 text-sm">{error}</p>
                {error.includes("Rate limit") && (
                  <p className="text-red-400/60 text-xs mt-1">
                    This demo allows 3 dockets per hour per IP to keep it free for everyone.
                  </p>
                )}
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Output region */}
      <AnimatePresence mode="wait">
        {/* Streaming / loading state */}
        {isGenerating && (
          <motion.div
            key="generating"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card p-6 mb-6"
          >
            <PhaseProgressBar activePhase={activePhase} />
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-white/40 text-xs uppercase tracking-wide">
                {activePhase === 1 && "Analyzing seller..."}
                {activePhase === 2 && "Researching customer..."}
                {activePhase === 2.5 && "Identifying decision-makers..."}
                {activePhase === 3 && "Mapping product fit..."}
                {activePhase === 4 && "Assembling docket..."}
                {activePhase === 0 && "Starting agent..."}
              </span>
            </div>
            <pre className="text-white/25 text-xs font-mono leading-relaxed whitespace-pre-wrap overflow-hidden max-h-48">
              {streamedText}
            </pre>
          </motion.div>
        )}

        {/* JSON parse error fallback — show raw output */}
        {!isGenerating && jsonParseError && !docket && (
          <motion.div
            key="parse-error"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-amber-400 text-sm">⚠</span>
              <span className="text-amber-400 text-sm font-medium">Rendering issue — showing raw output</span>
            </div>
            <p className="text-white/40 text-xs mb-4">
              The agent completed its run but the Phase 4 JSON could not be parsed for display. The full output is below.
            </p>
            <pre className="text-white/55 text-xs font-mono leading-relaxed whitespace-pre-wrap overflow-auto max-h-[32rem] p-4 bg-white/02 rounded-lg border border-white/06">
              {streamedText}
            </pre>
            {rawJson && <div className="mt-4"><CopyButton json={rawJson} /></div>}
          </motion.div>
        )}

        {/* Assembled docket */}
        {!isGenerating && docket && (
          <motion.div key="docket" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PhaseProgressBar activePhase={5} />
            <DocketView docket={docket} rawJson={rawJson} />
          </motion.div>
        )}

        {/* Empty state */}
        {!isGenerating && !docket && !jsonParseError && !error && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card p-12 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-accent/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-white/70 font-semibold text-lg mb-2">Your docket will appear here</h3>
            <p className="text-white/30 text-sm leading-relaxed max-w-sm mx-auto mb-8">
              Enter a seller website and customer name above, then click Generate Docket.
              The agent streams results in real time across five phases.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Seller Profile", "Customer Research", "Decision-Maker Discovery", "Product Fit Map", "Recommended Plays"].map((label) => (
                <span key={label} className="px-3 py-1.5 rounded-full text-xs border border-white/08 text-white/25 bg-white/02">
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
