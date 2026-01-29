import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Zap, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 bg-mesh opacity-80" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-teal/10 rounded-full blur-3xl animate-float animation-delay-200" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo/10 rounded-full blur-3xl animate-float animation-delay-400" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium opacity-0 animate-fade-up">
            <Sparkles className="w-4 h-4" />
            <span>Learn by building real AI agents</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight opacity-0 animate-fade-up animation-delay-200">
            <span className="text-foreground">Master Reinforcement Learning</span>
            <br />
            <span className="text-gradient">by Training Real Game Agents</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-up animation-delay-400">
            Learn RL with PyTorch and Unity ML-Agents through hands-on projects and reproducible experiments. From theory to deployment.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 opacity-0 animate-fade-up animation-delay-600">
            <Link to="/beginner-course">
              <Button size="xl" variant="gradient" className="w-full sm:w-auto">
                Start Learning
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/code-examples">
              <Button size="xl" variant="outline" className="w-full sm:w-auto">
                <Play className="w-5 h-5" />
                View Demo
              </Button>
            </Link>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 opacity-0 animate-fade-up animation-delay-600">
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium">PyTorch-based RL</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <div className="p-2 rounded-lg bg-teal/10">
                <Zap className="w-5 h-5 text-teal" />
              </div>
              <span className="text-sm font-medium">Unity ML-Agents</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <div className="p-2 rounded-lg bg-indigo/10">
                <Sparkles className="w-5 h-5 text-indigo" />
              </div>
              <span className="text-sm font-medium">Real Environments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
