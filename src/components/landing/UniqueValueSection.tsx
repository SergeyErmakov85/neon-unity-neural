import { Card, CardContent } from "@/components/ui/card";
import { FlaskConical, Gamepad2, GraduationCap, Repeat, Eye, Zap } from "lucide-react";

const values = [
  {
    icon: Repeat,
    title: "Воспроизводимые эксперименты",
    description: "Каждый проект включает фиксированные seed-значения, версии зависимостей и детальные инструкции. Получите те же результаты, что и в примерах",
    color: "primary",
  },
  {
    icon: Gamepad2,
    title: "Реальные игровые среды",
    description: "Не абстрактные задачи, а полноценные Unity-проекты. Обучайте агентов в 3D-мирах с физикой, визуализацией и интерактивностью",
    color: "secondary",
  },
  {
    icon: FlaskConical,
    title: "Научный подход",
    description: "Следуем лучшим практикам из исследований. Алгоритмы реализованы согласно оригинальным статьям с понятными объяснениями",
    color: "accent",
  },
  {
    icon: Eye,
    title: "Визуализация обучения",
    description: "Наблюдайте за процессом в реальном времени. Графики наград, траектории агентов, распределения действий — всё визуализировано",
    color: "primary",
  },
  {
    icon: GraduationCap,
    title: "От основ до продвинутого",
    description: "Структурированная программа обучения. Начните с базовых концепций и дойдите до state-of-the-art алгоритмов",
    color: "secondary",
  },
  {
    icon: Zap,
    title: "Практика с первого дня",
    description: "Никакой месячной подготовки. Запустите первого агента в первый же день обучения и сразу увидите результаты",
    color: "accent",
  },
];

const UniqueValueSection = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-foreground">Почему </span>
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              именно мы?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Уникальные преимущества нашей платформы
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            const colorClasses = {
              primary: {
                border: "border-primary/20 hover:border-primary/50",
                shadow: "hover:shadow-glow-cyan",
                text: "text-primary",
                gradient: "from-primary/20 via-primary/10 to-transparent",
              },
              secondary: {
                border: "border-secondary/20 hover:border-secondary/50",
                shadow: "hover:shadow-glow-purple",
                text: "text-secondary",
                gradient: "from-secondary/20 via-secondary/10 to-transparent",
              },
              accent: {
                border: "border-accent/20 hover:border-accent/50",
                shadow: "hover:shadow-glow-pink",
                text: "text-accent",
                gradient: "from-accent/20 via-accent/10 to-transparent",
              },
            };
            
            const colors = colorClasses[value.color as keyof typeof colorClasses];

            return (
              <Card
                key={index}
                className={`group bg-card/50 backdrop-blur-sm ${colors.border} ${colors.shadow} transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              >
                {/* Gradient overlay */}
                <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <CardContent className="p-6 space-y-4 relative">
                  <div className="w-12 h-12 rounded-lg bg-card border border-border/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
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

export default UniqueValueSection;
