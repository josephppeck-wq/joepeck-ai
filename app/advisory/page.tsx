import Nav from "@/components/Nav";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Advisory & Consulting — Joe Peck",
  description:
    "Fractional CRO leadership, AI-powered GTM strategy, and sales organization design. Three ways to work together.",
};

export default function AdvisoryPage() {
  return (
    <main className="relative">
      <Nav />
      <div className="section-padding pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-4">
          <span className="tag">Advisory</span>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight mt-4 mb-4">
            How I Help
          </h1>
          <p className="text-white/50 text-lg max-w-2xl">
            Three engagement models for companies that want senior sales leadership
            and AI-native operating systems — without a full-time hire.
          </p>
        </div>
      </div>
      <Services />
      <Footer />
    </main>
  );
}
