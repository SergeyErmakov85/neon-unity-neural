import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Gamepad2, LineChart, BookOpen, Layers, Cpu, FileCode2 } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Реализации RL на PyTorch",
    description: "Полные реализации DQN, PPO, SAC с нуля. Чистый код с подробными комментариями и объяснениями каждого шага",
    color: "primary",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Gamepad2,
    title: "Интеграция Unity ML-Agents",
    description: "Готовые проекты для Unity с настроенными средами. Обучайте агентов в 3D-играх и наблюдайте результаты",
    color: "secondary",
    gradient: "from-secondary/20 to-secondary/5",
  },
  {
    icon: LineChart,
    title: "Визуализация математики",
    description: "Интерактивные графики и анимации, объясняющие функции потерь, градиенты и оптимизацию",
    color: "accent",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: BookOpen,
    title: "Пошаговые проекты",
    description: "От простых задач до сложных игровых сценариев. Каждый проект — законченное решение с документацией",
    color: "primary",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    icon: Layers,
    title: "Модульная архитектура",
    description: "Переиспользуемые компоненты: буферы опыта, нейросети, функции вознаграждения. Собирайте свои решения",
    color: "secondary",
    gradient: "from-secondary/20 to-secondary/5",
  },
  {
    icon: Cpu,
    title: "Оптимизация обучения",
    description: "Техники ускорения: параллельные среды, GPU-обучение, гиперпараметры. Эффективное использование ресурсов",
    color: "accent",
    gradient: "from-accent/20 to-accent/5",
  },
  {
    icon: FileCode2,
    title: "Jupyter-ноутбуки включены",
    description: "Полностью рабочие .ipynb-файлы: Taxi-v3, FoodCollector REINFORCE. Скачай — запусти — получи результат. Никаких скрытых зависимостей.",
    color: "primary",
    gradient: "from-green-500/20 to-green-500/5",
    customColor: "text-green-400 border-green-500/30 hover:border-green-500/60",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 px-4 relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-foreground">Что включает </span>
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              платформа?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Всё необходимое для освоения Reinforcement Learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              primary: "text-primary shadow-glow-cyan border-primary/30 hover:border-primary/60",
              secondary: "text-secondary shadow-glow-purple border-secondary/30 hover:border-secondary/60",
              accent: "text-accent shadow-glow-pink border-accent/30 hover:border-accent/60",
            };
            
            return (
              <Card
                key={index}
                className={`group bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 ${colorClasses[feature.color as keyof typeof colorClasses]}`}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-7 h-7 ${colorClasses[feature.color as keyof typeof colorClasses].split(' ')[0]}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
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

export default FeaturesSection;
