import { Card, CardContent } from "@/components/ui/card";
import { Brain, Layers, LineChart, Rocket, Cpu, GitBranch } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "PyTorch-Based RL",
    description: "Clean implementations of PPO, DQN, A2C, and more with detailed explanations.",
    color: "primary",
  },
  {
    icon: Layers,
    title: "Unity ML-Agents",
    description: "Learn to train agents in realistic 3D game environments.",
    color: "teal",
  },
  {
    icon: LineChart,
    title: "Visual Math",
    description: "Understand policy gradients and value functions through interactive diagrams.",
    color: "indigo",
  },
  {
    icon: Rocket,
    title: "Step-by-Step Projects",
    description: "Build complete agents from scratch with guided tutorials.",
    color: "rose",
  },
  {
    icon: Cpu,
    title: "Reproducible Experiments",
    description: "All code is tested, versioned, and guaranteed to work.",
    color: "teal",
  },
  {
    icon: GitBranch,
    title: "Research-Level Rigor",
    description: "Implementations follow best practices from top RL papers.",
    color: "primary",
  },
];

const colorClasses: Record<string, { bg: string; text: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary" },
  teal: { bg: "bg-teal/10", text: "text-teal" },
  indigo: { bg: "bg-indigo/10", text: "text-indigo" },
  rose: { bg: "bg-rose/10", text: "text-rose" },
};

const Features = () => {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Everything you need to master RL
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A complete learning platform designed for practical, hands-on reinforcement learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = colorClasses[feature.color];
            return (
              <Card
                key={index}
                className="group bg-background border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6 space-y-4">
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
