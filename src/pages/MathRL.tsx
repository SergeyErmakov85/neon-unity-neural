import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const modules = [
  {
    id: 1,
    title: "Пределы, последовательности и ряды",
    description: "Фундаментальные понятия предела и их связь с алгоритмами RL: сходимость, дисконтирование, уравнения Беллмана.",
    available: true,
    color: "primary" as const,
  },
  {
    id: 2,
    title: "Модуль 2 (скоро)",
    description: "Материал готовится.",
    available: false,
    color: "secondary" as const,
  },
  {
    id: 3,
    title: "Модуль 3 (скоро)",
    description: "Материал готовится.",
    available: false,
    color: "accent" as const,
  },
  {
    id: 4,
    title: "Модуль 4 (скоро)",
    description: "Материал готовится.",
    available: false,
    color: "primary" as const,
  },
  {
    id: 5,
    title: "Модуль 5 (скоро)",
    description: "Материал готовится.",
    available: false,
    color: "secondary" as const,
  },
];

const colorMap = {
  primary: {
    border: "border-primary/30 hover:border-primary/60",
    shadow: "hover:shadow-glow-cyan",
    icon: "text-primary",
    badge: "bg-primary/10 text-primary",
  },
  secondary: {
    border: "border-secondary/30 hover:border-secondary/60",
    shadow: "hover:shadow-glow-purple",
    icon: "text-secondary",
    badge: "bg-secondary/10 text-secondary",
  },
  accent: {
    border: "border-accent/30 hover:border-accent/60",
    shadow: "hover:shadow-glow-pink",
    icon: "text-accent",
    badge: "bg-accent/10 text-accent",
  },
};

const MathRL = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            На главную
          </Button>
          <h1 className="text-3xl md:text-5xl font-bold">
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              Математика RL
            </span>
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Пять учебных модулей по математическим основам обучения с подкреплением.
          </p>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {modules.map((mod) => {
            const colors = colorMap[mod.color];
            return (
              <Card
                key={mod.id}
                className={`bg-card/60 backdrop-blur-sm ${colors.border} ${mod.available ? `${colors.shadow} cursor-pointer` : "opacity-60 cursor-not-allowed"} transition-all duration-300`}
                onClick={() => mod.available && navigate(`/math-rl/module-${mod.id}`)}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${colors.badge}`}>
                      Модуль {mod.id}
                    </span>
                    {mod.available ? (
                      <BookOpen className={`w-5 h-5 ${colors.icon}`} />
                    ) : (
                      <Lock className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{mod.title}</h3>
                  <p className="text-sm text-muted-foreground">{mod.description}</p>
                  {mod.available && (
                    <Button variant="outline" size="sm" className={`${colors.border} ${colors.icon} w-full`}>
                      Открыть модуль
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MathRL;
