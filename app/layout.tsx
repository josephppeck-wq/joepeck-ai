import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joepeck.ai"),
  icons: { icon: "/favicon.ico" },
  title: "Joe Peck — AI-Powered Sales Leadership",
  description:
    "Senior SaaS sales executive and AI strategist helping revenue teams sell smarter. 20+ years scaling organizations from $0 to $400M+.",
  keywords: "AI sales strategy, fractional CRO, AI powered sales, B2B sales leadership, sales AI tools, GTM strategy, revenue operations, AI agent sales, fractional VP Sales, sales transformation",
  openGraph: {
    title: "Joe Peck — AI-Powered Sales Leadership",
    description:
      "Senior SaaS sales executive and AI strategist helping revenue teams sell smarter. 20+ years scaling organizations from $0 to $400M+.",
    url: "https://joepeck.ai",
    siteName: "Joe Peck",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Joe Peck — AI-Powered Sales Leadership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joe Peck — AI-Powered Sales Leadership",
    description:
      "Senior SaaS sales executive and AI strategist helping revenue teams sell smarter. 20+ years scaling organizations from $0 to $400M+.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Joe Peck",
  url: "https://joepeck.ai",
  jobTitle: "Senior Sales Executive & AI Strategist",
  description:
    "Senior SaaS sales executive and AI strategist helping revenue teams sell smarter.",
  sameAs: ["https://linkedin.com/in/joseph-p-peck"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Case Western Reserve University",
  },
  worksFor: {
    "@type": "Organization",
    name: "Independent",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div className="noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
