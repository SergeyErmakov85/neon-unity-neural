import { XCircle, BookX, Frown } from "lucide-react";

const problems = [
  {
    icon: BookX,
    title: "Too Theoretical",
    description: "Most RL resources focus on math without practical implementation guidance.",
  },
  {
    icon: XCircle,
    title: "Hard to Reproduce",
    description: "Research code is often messy, poorly documented, and breaks easily.",
  },
  {
    icon: Frown,
    title: "Steep Learning Curve",
    description: "Jumping from tutorials to real projects feels like crossing a chasm.",
  },
];

const Problem = () => {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider">The Problem</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Why is RL so hard to learn?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Traditional resources leave you stuck between dense math papers and toy examples that don't scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-background border border-border"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-destructive/10 mb-6">
                  <Icon className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Problem;
