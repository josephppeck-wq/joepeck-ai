"use client";

import { useState, useRef } from "react";

export default function GamutBriefPage() {
  const [deals, setDeals] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const outputRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!deals.trim()) return;

    setLoading(true);
    setOutput("");
    setError("");

    try {
      const res = await fetch("/api/gamut-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deals: deals.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setOutput(data.brief ?? "");
      outputRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        fontFamily: "'Courier New', Courier, monospace",
        padding: "48px 24px 80px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1
            style={{
              fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 8px",
              letterSpacing: "-0.02em",
            }}
          >
            Gamut CRO Morning Brief
          </h1>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#888",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Paste your active deals below. Get your week in under 60 seconds.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label
              htmlFor="deals"
              style={{
                display: "block",
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "#555",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 8,
              }}
            >
              Active Deals This Week
            </label>
            <textarea
              id="deals"
              value={deals}
              onChange={(e) => setDeals(e.target.value)}
              placeholder={
                "Paste deals here — one per block. Include: Advertiser, Show, Deal Size, Stage, Last Activity, AE Owner, Notes"
              }
              rows={14}
              disabled={loading}
              style={{
                width: "100%",
                boxSizing: "border-box",
                backgroundColor: "#0a0a0a",
                border: "1px solid #2a2a2a",
                borderRadius: 4,
                color: "#e8e8e8",
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: "0.85rem",
                lineHeight: 1.6,
                padding: "14px 16px",
                resize: "vertical",
                outline: "none",
                transition: "border-color 150ms",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#444")}
              onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !deals.trim()}
            style={{
              padding: "11px 28px",
              backgroundColor: loading || !deals.trim() ? "#222" : "#fff",
              color: loading || !deals.trim() ? "#444" : "#000",
              border: "none",
              borderRadius: 4,
              fontSize: "0.82rem",
              fontWeight: 700,
              fontFamily: "'Courier New', Courier, monospace",
              letterSpacing: "0.05em",
              cursor: loading || !deals.trim() ? "not-allowed" : "pointer",
              transition: "all 150ms",
              textTransform: "uppercase",
            }}
          >
            {loading ? "Analyzing pipeline..." : "Generate Brief"}
          </button>
        </form>

        {/* Error */}
        {error && (
          <div
            style={{
              marginTop: 24,
              padding: "12px 16px",
              border: "1px solid #3a1a1a",
              borderRadius: 4,
              backgroundColor: "#1a0a0a",
              color: "#cc4444",
              fontSize: "0.82rem",
              lineHeight: 1.5,
            }}
          >
            {error}
          </div>
        )}

        {/* Output */}
        {output && (
          <div
            ref={outputRef}
            style={{
              marginTop: 36,
              borderTop: "1px solid #1e1e1e",
              paddingTop: 28,
            }}
          >
            <p
              style={{
                fontSize: "0.68rem",
                color: "#444",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              Brief
            </p>
            <div
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "0.88rem",
                lineHeight: 1.75,
                color: "#d8d8d8",
                fontFamily: "'Courier New', Courier, monospace",
              }}
            >
              {output}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
