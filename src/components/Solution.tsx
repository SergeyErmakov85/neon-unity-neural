import { ArrowRight, Code2, BookOpen, Gamepad2 } from "lucide-react";

const Solution = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-primary font-semibold text-sm uppercase tracking-wider">The Solution</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Bridge the gap between theory and practice
              </h2>
              <p className="text-lg text-muted-foreground">
                Our platform connects mathematical foundations, clean PyTorch implementations, and real Unity environments into one cohesive learning experience.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Visual Math Explanations</h3>
                  <p className="text-muted-foreground">Understand the intuition behind algorithms with interactive visualizations.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-teal" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Production-Ready Code</h3>
                  <p className="text-muted-foreground">Clean, documented PyTorch implementations you can actually use.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo/10 flex items-center justify-center">
                  <Gamepad2 className="w-6 h-6 text-indigo" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Real Game Environments</h3>
                  <p className="text-muted-foreground">Train agents in Unity ML-Agents environments, not toy problems.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <div className="relative bg-card border border-border rounded-2xl p-8 shadow-xl">
              {/* Code-like visual */}
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <p><span className="text-primary">import</span> torch</p>
                  <p><span className="text-primary">from</span> mlagents <span className="text-primary">import</span> Environment</p>
                  <p className="text-muted-foreground/50"># Train your first agent</p>
                  <p>agent = <span className="text-teal">PPOAgent</span>(env)</p>
                  <p>agent.<span className="text-indigo">train</span>(episodes=<span className="text-rose">1000</span>)</p>
                  <p className="mt-4 text-green-500"># ✓ Agent trained successfully!</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 p-3 bg-primary rounded-xl shadow-lg animate-float">
                <ArrowRight className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
