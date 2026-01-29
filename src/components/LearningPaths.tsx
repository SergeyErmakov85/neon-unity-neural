import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const paths = [
  {
    level: "Beginner",
    title: "Foundations",
    duration: "4 weeks",
    description: "Learn the fundamentals of reinforcement learning and set up your environment.",
    modules: [
      "RL basics: agents, environments, rewards",
      "Setting up Unity ML-Agents",
      "Your first training loop",
      "Understanding observations and actions",
    ],
    color: "primary",
    active: true,
  },
  {
    level: "Intermediate",
    title: "Core Algorithms",
    duration: "6 weeks",
    description: "Master the most important RL algorithms with hands-on implementations.",
    modules: [
      "Deep Q-Networks (DQN)",
      "Policy Gradient methods",
      "Proximal Policy Optimization (PPO)",
      "Reward shaping and curriculum learning",
    ],
    color: "teal",
    active: false,
  },
  {
    level: "Advanced",
    title: "Production RL",
    duration: "8 weeks",
    description: "Build production-ready systems and tackle complex challenges.",
    modules: [
      "Multi-agent systems",
      "Imitation learning",
      "Hyperparameter optimization",
      "Deploying trained models",
    ],
    color: "indigo",
    active: false,
  },
];

const colorClasses: Record<string, { border: string; bg: string; text: string }> = {
  primary: { border: "border-primary", bg: "bg-primary", text: "text-primary" },
  teal: { border: "border-teal", bg: "bg-teal", text: "text-teal" },
  indigo: { border: "border-indigo", bg: "bg-indigo", text: "text-indigo" },
};

const LearningPaths = () => {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider">Learning Path</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Your journey to RL mastery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A structured curriculum that takes you from beginner to advanced practitioner.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

            <div className="space-y-8">
              {paths.map((path, index) => {
                const colors = colorClasses[path.color];
                return (
                  <div key={index} className="relative flex gap-8">
                    {/* Timeline dot */}
                    <div className={`hidden md:flex flex-shrink-0 w-16 h-16 rounded-full ${colors.bg}/10 border-2 ${colors.border} items-center justify-center z-10 bg-background`}>
                      <span className={`text-xl font-bold ${colors.text}`}>{index + 1}</span>
                    </div>

                    {/* Card */}
                    <div className={`flex-1 bg-background border border-border rounded-2xl p-6 hover:border-primary/30 transition-all ${path.active ? 'shadow-lg' : ''}`}>
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                        <div>
                          <span className={`text-xs font-semibold ${colors.text} uppercase tracking-wider`}>
                            {path.level}
                          </span>
                          <h3 className="text-xl font-bold text-foreground mt-1">{path.title}</h3>
                        </div>
                        <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                          {path.duration}
                        </span>
                      </div>

                      <p className="text-muted-foreground mb-6">{path.description}</p>

                      <div className="grid sm:grid-cols-2 gap-3 mb-6">
                        {path.modules.map((module, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                            <span className="text-sm text-muted-foreground">{module}</span>
                          </div>
                        ))}
                      </div>

                      {path.active ? (
                        <Link to="/beginner-course">
                          <Button variant="gradient" className="w-full sm:w-auto">
                            Start This Path
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="outline" disabled className="w-full sm:w-auto">
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningPaths;
