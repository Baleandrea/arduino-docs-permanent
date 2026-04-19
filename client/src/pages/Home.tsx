import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import IntroductionSection from "@/components/IntroductionSection";
import FSMAnalysisSection from "@/components/FSMAnalysisSection";
import HardwareSpecsSection from "@/components/HardwareSpecsSection";
import EnhancedHardwareSection from "@/components/EnhancedHardwareSection";
import CompletePinLegend from "@/components/CompletePinLegend";
import AdvancedTechniquesSection from "@/components/AdvancedTechniquesSection";
import ConfigurationSection from "@/components/ConfigurationSection";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Home() {
  const [, setActiveSection] = useState("intro");
  const { user } = useAuth();

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onNavClick={handleNavClick} />
      
      <main className="flex-1">
        <section id="intro">
          <HeroSection />
        </section>
        
        <IntroductionSection />
        <FSMAnalysisSection />
        <HardwareSpecsSection />
        <EnhancedHardwareSection />
        <CompletePinLegend />
        <AdvancedTechniquesSection />
        <ConfigurationSection />
      </main>

      <Footer />
    </div>
  );
}
