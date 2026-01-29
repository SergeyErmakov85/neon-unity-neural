import { Repeat, Beaker, Award } from "lucide-react";

const values = [
  {
    icon: Repeat,
    title: "Reproducible Experiments",
    description: "Every experiment is versioned, documented, and guaranteed to produce the same results.",
    stat: "100%",
    statLabel: "Reproducible",
  },
  {
    icon: Beaker,
    title: "Real Environments",
    description: "Train in Unity 3D environments, not toy problems. Build skills that transfer to real projects.",
    stat: "10+",
    statLabel: "Environments",
  },
  {
    icon: Award,
    title: "Research-Level Rigor",
    description: "Implementations follow best practices from top RL conferences like NeurIPS and ICML.",
    stat: "50+",
    statLabel: "Papers Referenced",
  },
];

const UniqueValue = () => {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider">Why Choose Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Learning RL the right way
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We combine academic rigor with practical implementation for the best learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="relative bg-background border border-border rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 overflow-hidden group"
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {value.description}
                  </p>
                  
                  <div className="pt-6 border-t border-border">
                    <div className="text-3xl font-bold text-gradient">{value.stat}</div>
                    <div className="text-sm text-muted-foreground">{value.statLabel}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UniqueValue;
