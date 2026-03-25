import { Card, CardContent } from "@/components/ui/card";
import { BookX, Unlink, Brain, AlertTriangle, FileX } from "lucide-react";

const problems = [
  {
    icon: BookX,
    title: "Слишком много сухой теории",
    description: "Учебники переполнены формулами и математикой, но не объясняют, как применить их на практике",
    color: "primary",
  },
  {
    icon: Unlink,
    title: "Код оторван от результатов",
    description: "Вы пишете код, но не видите, как он влияет на поведение агента в реальной среде",
    color: "secondary",
  },
  {
    icon: Brain,
    title: "Сложность алгоритмов",
    description: "PPO, SAC, DQN — аббревиатуры путают, а реализации кажутся недоступными",
    color: "accent",
  },
  {
    icon: AlertTriangle,
    title: "Отсутствие практики",
    description: "Нет пошаговых проектов, где можно увидеть результат своего обучения",
    color: "primary",
  },
  {
    icon: FileX,
    title: "Нет реального кода",
    description: "Туториалы показывают теорию, но готовый воспроизводимый код для Unity ML-Agents с PyTorch найти сложно. Нужны рабочие ноутбуки, а не псевдокод.",
    color: "accent",
  },
];

const ProblemSection = () => {
  return (
    <section id="problem" className="py-20 px-4 relative bg-cyber-darker/50">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-destructive/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-destructive/50 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/30 mb-4">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm text-destructive font-medium">Знакомые проблемы?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-foreground">Почему изучение </span>
            <span className="text-destructive">RL так сложно?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Многие разработчики сталкиваются с одними и теми же препятствиями
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <Card
                key={index}
                className="group bg-card/50 backdrop-blur-sm border-destructive/20 hover:border-destructive/50 transition-all duration-300"
              >
                <CardContent className="p-6 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                      <Icon className="w-6 h-6 text-destructive" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-foreground">
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
