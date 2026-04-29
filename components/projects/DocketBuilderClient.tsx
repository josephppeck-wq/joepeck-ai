"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function DocketBuilderClient() {
  const [sellerUrl, setSellerUrl] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const urlValid = isValidUrl(sellerUrl);
  const nameValid = customerName.trim().length >= 2 && customerName.trim().length <= 200;
  const canSubmit = urlValid && nameValid && !isGenerating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError("");
    setIsGenerating(true);

    // Stub — agent invocation wired in next pass
    console.log("Docket Builder inputs:", { sellerUrl, customerName });

    // Simulate a brief delay so the loading state is visible
    await new Promise((r) => setTimeout(r, 800));
    setIsGenerating(false);
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
              autoComplete="off"
              spellCheck={false}
              className="w-full bg-white/04 border border-white/08 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent/50 focus:bg-white/06 transition-all font-mono"
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
              className="w-full bg-white/04 border border-white/08 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-accent/50 focus:bg-white/06 transition-all"
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

          {/* Submit */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-white/25 text-xs">
              Agent runs in phases · typically 60–90 seconds
            </p>
            <button
              type="submit"
              disabled={!canSubmit}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-accent/25"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  Generate Docket
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>

          {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
        </form>
      </div>

      {/* Output region */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            key="generating"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="card p-6 mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                <span
                  className="w-2 h-2 rounded-full bg-accent animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-accent animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-accent animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
              <span className="text-white/40 text-xs uppercase tracking-wide">
                Agent running · analyzing seller profile...
              </span>
            </div>

            {/* Phase skeletons */}
            <div className="space-y-4">
              {[
                { label: "Phase 1", desc: "Learning seller products from website" },
                { label: "Phase 2", desc: "Researching customer" },
                { label: "Phase 3", desc: "Mapping product fit" },
                { label: "Phase 4", desc: "Assembling docket" },
              ].map((phase, i) => (
                <div key={phase.label} className="flex items-center gap-4">
                  <div
                    className="w-16 h-5 rounded bg-white/04 animate-pulse flex-shrink-0"
                    style={{ animationDelay: `${i * 200}ms` }}
                  />
                  <div
                    className="h-3 rounded bg-white/04 animate-pulse flex-1"
                    style={{
                      animationDelay: `${i * 200 + 100}ms`,
                      maxWidth: `${60 + i * 8}%`,
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty state — shown before any run */}
        {!isGenerating && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card p-12 text-center"
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-accent/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <h3 className="text-white/70 font-semibold text-lg mb-2">
              Your docket will appear here
            </h3>
            <p className="text-white/30 text-sm leading-relaxed max-w-sm mx-auto mb-8">
              Enter a seller website and customer name above, then click Generate Docket.
              The agent will research both sides and stream the results in real time.
            </p>

            {/* Phase preview pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                "Seller Profile",
                "Customer Research",
                "Decision-Maker Discovery",
                "Product Fit Map",
                "Recommended Plays",
              ].map((label) => (
                <span
                  key={label}
                  className="px-3 py-1.5 rounded-full text-xs border border-white/08 text-white/25 bg-white/02"
                >
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
