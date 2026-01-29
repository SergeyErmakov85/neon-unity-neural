import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Lightbulb, Code2, Gamepad2, CheckCircle2 } from "lucide-react";

const SolutionSection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Наше решение</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              Мост между теорией и практикой
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Платформа, которая связывает математику, код и реальные игровые среды
          </p>
        </div>

        {/* Solution Flow */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center">
            {/* Math Card */}
            <Card className="bg-card/60 backdrop-blur-sm border-primary/30 hover:border-primary/60 transition-all duration-300 hover:shadow-glow-cyan">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-cyber flex items-center justify-center shadow-glow-cyan">
                  <Lightbulb className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Теория и математика</h3>
                <p className="text-sm text-muted-foreground">
                  Визуализация формул и интуитивные объяснения алгоритмов
                </p>
              </CardContent>
            </Card>

            {/* Arrow */}
            <div className="hidden md:flex justify-center">
              <ArrowRight className="w-8 h-8 text-primary animate-glow-pulse" />
            </div>
            <div className="flex md:hidden justify-center py-2">
              <ArrowRight className="w-8 h-8 text-primary rotate-90" />
            </div>

            {/* Code Card */}
            <Card className="bg-card/60 backdrop-blur-sm border-secondary/30 hover:border-secondary/60 transition-all duration-300 hover:shadow-glow-purple">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-cyber flex items-center justify-center shadow-glow-purple">
                  <Code2 className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Код на PyTorch</h3>
                <p className="text-sm text-muted-foreground">
                  Чистые реализации алгоритмов с подробными комментариями
                </p>
              </CardContent>
            </Card>

            {/* Arrow */}
            <div className="hidden md:flex justify-center md:col-start-2">
              <ArrowRight className="w-8 h-8 text-secondary animate-glow-pulse animation-delay-300" />
            </div>
            <div className="flex md:hidden justify-center py-2">
              <ArrowRight className="w-8 h-8 text-secondary rotate-90" />
            </div>

            {/* Game Card */}
            <Card className="md:col-start-3 bg-card/60 backdrop-blur-sm border-accent/30 hover:border-accent/60 transition-all duration-300 hover:shadow-glow-pink">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-cyber flex items-center justify-center shadow-glow-pink">
                  <Gamepad2 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Игровые среды Unity</h3>
                <p className="text-sm text-muted-foreground">
                  Обучение агентов в реальных 3D-окружениях
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Benefits */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Понятные визуализации",
              "Воспроизводимые эксперименты",
              "Пошаговые проекты",
              "Реальные результаты",
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg bg-card/40 backdrop-blur-sm border border-border/50"
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
