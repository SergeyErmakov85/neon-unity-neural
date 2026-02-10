import Navbar from "@/components/landing/Navbar";
import SectionNav from "@/components/landing/SectionNav";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import DemoSection from "@/components/landing/DemoSection";
import LearningPathSection from "@/components/landing/LearningPathSection";
import AudienceSection from "@/components/landing/AudienceSection";
import UniqueValueSection from "@/components/landing/UniqueValueSection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import FinalCTASection from "@/components/landing/FinalCTASection";
import FooterSection from "@/components/landing/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SectionNav />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <DemoSection />
      <LearningPathSection />
      <AudienceSection />
      <UniqueValueSection />
      <TestimonialSection />
      <FinalCTASection />
      <FooterSection />
    </div>
  );
};

export default Index;
