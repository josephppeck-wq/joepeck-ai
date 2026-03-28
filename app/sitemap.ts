import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: "https://joepeck.ai", lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: "https://joepeck.ai/blog", lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: "https://joepeck.ai/projects", lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // Blog posts — 2026
    { url: "https://joepeck.ai/blog/what-changed-in-ai-sales-2025", lastModified: new Date("2026-03-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://joepeck.ai/blog/fractional-cro-model", lastModified: new Date("2026-02-01"), changeFrequency: "monthly", priority: 0.9 },
    { url: "https://joepeck.ai/blog/ai-agent-budget-experiment", lastModified: new Date("2026-01-01"), changeFrequency: "monthly", priority: 0.8 },
    // Blog posts — 2025
    { url: "https://joepeck.ai/blog/5-ai-tools-every-sales-leader", lastModified: new Date("2025-03-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://joepeck.ai/blog/why-your-forecast-is-wrong", lastModified: new Date("2025-02-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://joepeck.ai/blog/autonomous-ai-agent-lessons", lastModified: new Date("2025-01-01"), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://joepeck.ai/blog/meddpicc-in-the-age-of-ai", lastModified: new Date("2024-12-01"), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://joepeck.ai/blog/from-zero-to-400m-playbook", lastModified: new Date("2024-11-01"), changeFrequency: "monthly", priority: 0.7 },
    // Projects
    { url: "https://joepeck.ai/projects/deal-coach", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: "https://joepeck.ai/projects/account-researcher", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://joepeck.ai/projects/gtm-blueprint", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://joepeck.ai/projects/autonomous-sdr", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://joepeck.ai/projects/forecast-machine", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: "https://joepeck.ai/projects/win-loss", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
