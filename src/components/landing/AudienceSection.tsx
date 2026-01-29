import { Card, CardContent } from "@/components/ui/card";
import { Gamepad2, GraduationCap, Cpu, FlaskConical, Star } from "lucide-react";

const audiences = [
  {
    icon: Gamepad2,
    title: "Разработчики игр",
    description: "Интегрируйте умных NPC и адаптивный геймплей в свои Unity-проекты. Создавайте агентов, которые учатся и развиваются",
    color: "primary",
    isPrimary: true,
    benefits: ["Готовые Unity-проекты", "ML-Agents интеграция", "Игровые среды"],
  },
  {
    icon: GraduationCap,
    title: "Студенты",
    description: "Получите практические навыки RL для курсовых, дипломов или портфолио. Понятные объяснения и реальные проекты",
    color: "secondary",
    isPrimary: false,
    benefits: ["Пошаговое обучение", "Теория + практика", "Готовые примеры"],
  },
  {
    icon: Cpu,
    title: "AI-инженеры",
    description: "Расширьте навыки в области RL. Современные алгоритмы PPO, SAC с чистыми реализациями на PyTorch",
    color: "accent",
    isPrimary: false,
    benefits: ["Продвинутые алгоритмы", "Чистый код", "Best practices"],
  },
  {
    icon: FlaskConical,
    title: "Исследователи",
    description: "Воспроизводимые эксперименты и модульная архитектура для быстрого прототипирования новых идей",
    color: "primary",
    isPrimary: false,
    benefits: ["Воспроизводимость", "Модульность", "Эксперименты"],
  },
];

const AudienceSection = () => {
  return (
    <section id="audience" className="py-20 px-4 relative bg-cyber-darker/50">
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-foreground">Для кого </span>
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              эта платформа?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Материалы адаптированы для разных уровней и целей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            const colorClasses = {
              primary: {
                border: audience.isPrimary ? "border-primary" : "border-primary/30 hover:border-primary/60",
                shadow: audience.isPrimary ? "shadow-glow-cyan" : "hover:shadow-glow-cyan",
                text: "text-primary",
                bg: "bg-primary/10",
              },
              secondary: {
                border: "border-secondary/30 hover:border-secondary/60",
                shadow: "hover:shadow-glow-purple",
                text: "text-secondary",
                bg: "bg-secondary/10",
              },
              accent: {
                border: "border-accent/30 hover:border-accent/60",
                shadow: "hover:shadow-glow-pink",
                text: "text-accent",
                bg: "bg-accent/10",
              },
            };
            
            const colors = colorClasses[audience.color as keyof typeof colorClasses];

            return (
              <Card
                key={index}
                className={`bg-card/60 backdrop-blur-sm ${colors.border} ${colors.shadow} transition-all duration-300 ${audience.isPrimary ? 'md:col-span-2 lg:col-span-1 ring-2 ring-primary/20' : ''}`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center`}>
                      <Icon className={`w-7 h-7 ${colors.text}`} />
                    </div>
                    {audience.isPrimary && (
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
                        <Star className="w-3 h-3 text-primary fill-primary" />
                        <span className="text-xs font-medium text-primary">Основная ЦА</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {audience.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {audience.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {audience.benefits.map((benefit, benefitIndex) => (
                      <span
                        key={benefitIndex}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border.split(' ')[0]}`}
                      >
                        {benefit}
                      </span>
                    ))}
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

export default AudienceSection;
