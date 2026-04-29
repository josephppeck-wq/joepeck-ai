/**
 * Persistent rate limiter for /api/docket-builder
 * Uses Upstash Redis when env vars are present; falls back to in-memory for local dev.
 *
 * Limit: 3 successful runs per IP per 24 hours.
 * Failed runs (validation errors, API errors) do NOT count.
 */

// ── Upstash Redis client (lazy init) ─────────────────────────────────────────

let upstashClient: import("@upstash/redis").Redis | null = null;

function getUpstashClient() {
  if (upstashClient) return upstashClient;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  // Dynamic import to avoid build errors when package is installed but not configured
  const { Redis } = require("@upstash/redis");
  upstashClient = new Redis({ url, token });
  return upstashClient;
}

// ── In-memory fallback (dev / cold start before Upstash is configured) ───────

const memStore = new Map<string, number[]>();

function memCheck(ip: string, maxCount: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (memStore.get(ip) || []).filter((t) => now - t < windowMs);
  if (hits.length >= maxCount) return false;
  memStore.set(ip, [...hits, now]);
  return true;
}

// ── Debounce store (identical inputs within 60s from same IP) ─────────────────

const debounceStore = new Map<string, number>();

export function isDebounced(ip: string, sellerUrl: string, customerName: string): boolean {
  const key = `${ip}:${sellerUrl}:${customerName}`;
  const last = debounceStore.get(key);
  const now = Date.now();
  if (last && now - last < 60_000) return true;
  debounceStore.set(key, now);
  // Prune old entries periodically
  if (debounceStore.size > 1000) {
    for (const [k, t] of Array.from(debounceStore.entries())) {
      if (now - t > 120_000) debounceStore.delete(k);
    }
  }
  return false;
}

// ── Main rate limit check ─────────────────────────────────────────────────────

const MAX_RUNS = 3;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const WINDOW_SEC = 86400;

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  const client = getUpstashClient();

  if (client) {
    try {
      const key = `docket:rl:${ip}`;
      const current = await client.incr(key);
      if (current === 1) {
        // First hit — set expiry
        await client.expire(key, WINDOW_SEC);
      }
      if (current > MAX_RUNS) {
        return { allowed: false, remaining: 0 };
      }
      return { allowed: true, remaining: MAX_RUNS - current };
    } catch {
      // Upstash error — fall through to in-memory
    }
  }

  // In-memory fallback
  const allowed = memCheck(ip, MAX_RUNS, WINDOW_MS);
  return { allowed, remaining: allowed ? MAX_RUNS - 1 : 0 };
}

// ── Log run result ────────────────────────────────────────────────────────────

export async function logRun(entry: {
  ip: string;
  sellerUrl: string;
  customerName: string;
  success: boolean;
  failReason?: string;
  tokens?: number;
}) {
  const client = getUpstashClient();
  const record = {
    ...entry,
    ts: new Date().toISOString(),
  };
  // Log to console always (Vercel captures this in function logs)
  console.log("[docket-builder]", JSON.stringify(record));

  if (client) {
    try {
      // Keep last 500 runs in a Redis list for monitoring
      await client.lpush("docket:runs", JSON.stringify(record));
      await client.ltrim("docket:runs", 0, 499);
    } catch {
      // Non-critical — ignore
    }
  }
}
