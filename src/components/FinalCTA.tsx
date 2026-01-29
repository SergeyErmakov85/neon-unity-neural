import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Background decoration */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-10 blur-3xl rounded-full" />
            
            <div className="relative bg-card border border-border rounded-3xl p-12 md:p-16 shadow-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Free to start</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Start your RL journey today
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of learners mastering reinforcement learning with hands-on projects. 
                No credit card required.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/beginner-course">
                  <Button size="xl" variant="gradient" className="w-full sm:w-auto">
                    Get Started for Free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/code-examples">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto">
                    Browse Examples
                  </Button>
                </Link>
              </div>
              
              <p className="text-sm text-muted-foreground mt-6">
                ✓ Free tutorials  ✓ Open source code  ✓ Active community
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
