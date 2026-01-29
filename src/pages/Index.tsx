import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Features from "@/components/Features";
import Demo from "@/components/Demo";
import LearningPaths from "@/components/LearningPaths";
import Audience from "@/components/Audience";
import UniqueValue from "@/components/UniqueValue";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <Demo />
      <LearningPaths />
      <Audience />
      <UniqueValue />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
