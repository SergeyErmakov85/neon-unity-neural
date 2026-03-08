import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AlgorithmTable from "./AlgorithmTable";

const levels = [
  {
    level: "Новичок",
    duration: "4 недели",
    color: "primary",
    topics: [
      "Основы Reinforcement Learning",
      "Установка окружения PyTorch + Unity",
      "Первый агент: CartPole",
      "Базовый DQN алгоритм",
    ],
    isActive: true,
  },
  {
    level: "Средний",
    duration: "6 недель",
    color: "secondary",
    topics: [
      "Policy Gradient методы",
      "PPO алгоритм с нуля",
      "Работа с непрерывными действиями",
      "Обучение в Unity ML-Agents",
    ],
    isActive: false,
  },
  {
    level: "Продвинутый",
    duration: "8 недель",
    color: "accent",
    topics: [
      "SAC и off-policy методы",
      "Многоагентное обучение (MAPOCA)",
      "Curriculum Learning",
      "Деплой моделей в продакшн",
    ],
    isActive: false,
  },
];

const LearningPathSection = () => {
  const navigate = useNavigate();
  return (
    <section id="learning-path" className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              Карта обучения
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Структурированный путь от новичка до эксперта в RL
          </p>
        </div>

        {/* Learning Path Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {levels.map((level, index) => {
                const colorClasses = {
                  primary: {
                    border: "border-primary/30 hover:border-primary/60",
                    shadow: "hover:shadow-glow-cyan",
                    text: "text-primary",
                    bg: "bg-primary",
                    bgLight: "bg-primary/10",
                  },
                  secondary: {
                    border: "border-secondary/30 hover:border-secondary/60",
                    shadow: "hover:shadow-glow-purple",
                    text: "text-secondary",
                    bg: "bg-secondary",
                    bgLight: "bg-secondary/10",
                  },
                  accent: {
                    border: "border-accent/30 hover:border-accent/60",
                    shadow: "hover:shadow-glow-pink",
                    text: "text-accent",
                    bg: "bg-accent",
                    bgLight: "bg-accent/10",
                  },
                };
                
                const colors = colorClasses[level.color as keyof typeof colorClasses];

                return (
                  <div key={index} className="relative">
                    {/* Timeline Node - Desktop */}
                    <div className="hidden lg:flex justify-center mb-8">
                      <div className={`w-12 h-12 rounded-full ${colors.bg} flex items-center justify-center z-10 relative`}>
                        <span className="text-lg font-bold text-background">{index + 1}</span>
                      </div>
                    </div>

                    {/* Mobile Step Indicator */}
                    <div className="lg:hidden flex items-center gap-4 mb-4">
                      <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center`}>
                        <span className="text-sm font-bold text-background">{index + 1}</span>
                      </div>
                      {index < levels.length - 1 && (
                        <ArrowRight className={`w-5 h-5 ${colors.text}`} />
                      )}
                    </div>

                    <Card 
                      className={`bg-card/60 backdrop-blur-sm ${colors.border} ${colors.shadow} transition-all duration-300 ${level.isActive ? 'cursor-pointer' : ''}`}
                      onClick={() => level.isActive && navigate("/beginner-course")}
                    >
                      <CardContent className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className={`text-sm ${colors.text} font-medium mb-1`}>
                              Этап {index + 1}
                            </div>
                            <h3 className="text-xl font-bold text-foreground">{level.level}</h3>
                          </div>
                          <div className={`px-3 py-1 rounded-full ${colors.bgLight} border ${colors.border.split(' ')[0]}`}>
                            <span className={`text-xs font-medium ${colors.text}`}>{level.duration}</span>
                          </div>
                        </div>

                        <div className="space-y-3 pt-2">
                          {level.topics.map((topic, topicIndex) => (
                            <div key={topicIndex} className="flex items-start gap-3">
                              {level.isActive ? (
                                <CheckCircle2 className={`w-4 h-4 ${colors.text} flex-shrink-0 mt-0.5`} />
                              ) : (
                                <Circle className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                              )}
                              <span className={`text-sm ${level.isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {topic}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
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

export default LearningPathSection;
