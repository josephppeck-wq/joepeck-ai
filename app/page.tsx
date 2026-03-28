import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import CredibilityBar from "@/components/CredibilityBar";
import About from "@/components/About";
import Services from "@/components/Services";
import ProjectsTeaser from "@/components/ProjectsTeaser";
import LeadMagnet from "@/components/LeadMagnet";
import Insights from "@/components/Insights";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <CredibilityBar />
      <About />
      <div className="divider" />
      <Services />
      <div className="divider" />
      <ProjectsTeaser />
      <div className="divider" />
      <LeadMagnet />
      <div className="divider" />
      <Insights />
      <div className="divider" />
      <Timeline />
      <div className="divider" />
      <Contact />
      <Footer />
    </main>
  );
}
