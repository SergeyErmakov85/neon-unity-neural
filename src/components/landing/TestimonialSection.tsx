import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Алексей М.",
    role: "Unity Developer",
    avatar: "А",
    rating: 5,
    text: "Наконец-то понял, как работает PPO! Визуализация математики и реальные Unity-проекты — это именно то, чего не хватало в других курсах.",
    color: "primary",
  },
  {
    name: "Мария К.",
    role: "AI Engineer",
    avatar: "М",
    rating: 5,
    text: "Качество реализаций на PyTorch впечатляет. Чистый код, хорошая документация. Использую модули в своих рабочих проектах.",
    color: "secondary",
  },
  {
    name: "Дмитрий С.",
    role: "Студент CS",
    avatar: "Д",
    rating: 5,
    text: "Сделал дипломный проект по RL за два месяца благодаря этой платформе. Пошаговые проекты очень помогли разобраться в теме.",
    color: "accent",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-20 px-4 relative bg-cyber-darker/50">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-foreground">Что говорят </span>
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              наши студенты
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Отзывы тех, кто уже прошёл обучение
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => {
            const colorClasses = {
              primary: {
                border: "border-primary/20 hover:border-primary/40",
                text: "text-primary",
                bg: "bg-primary",
              },
              secondary: {
                border: "border-secondary/20 hover:border-secondary/40",
                text: "text-secondary",
                bg: "bg-secondary",
              },
              accent: {
                border: "border-accent/20 hover:border-accent/40",
                text: "text-accent",
                bg: "bg-accent",
              },
            };
            
            const colors = colorClasses[testimonial.color as keyof typeof colorClasses];

            return (
              <Card
                key={index}
                className={`bg-card/60 backdrop-blur-sm ${colors.border} transition-all duration-300`}
              >
                <CardContent className="p-6 space-y-4">
                  {/* Quote Icon */}
                  <Quote className={`w-8 h-8 ${colors.text} opacity-50`} />

                  {/* Rating */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-muted-foreground text-sm leading-relaxed italic">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center`}>
                      <span className="text-sm font-bold text-background">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
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

export default TestimonialSection;
