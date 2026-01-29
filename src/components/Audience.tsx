import { GraduationCap, Code2, FlaskConical, Gamepad2 } from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "AI Students",
    description: "Supplement your coursework with practical, hands-on RL experience.",
  },
  {
    icon: Code2,
    title: "Developers",
    description: "Add AI and ML skills to your toolkit with production-ready code.",
  },
  {
    icon: FlaskConical,
    title: "Researchers",
    description: "Reproduce experiments quickly and build on clean implementations.",
  },
  {
    icon: Gamepad2,
    title: "Game Developers",
    description: "Create intelligent NPCs and adaptive game mechanics with RL.",
  },
];

const Audience = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider">Who It's For</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Built for builders like you
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're a student, developer, or researcher, we have the resources you need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {audience.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {audience.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Audience;
