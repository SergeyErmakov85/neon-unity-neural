import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Brain, Zap, Shield, GitBranch, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const algorithms = [
  {
    id: "dqn",
    name: "DQN",
    fullName: "Deep Q-Network",
    description: "Классический алгоритм для дискретных действий с Experience Replay и Target Network.",
    pros: ["Дискретные действия", "Off-policy", "Experience Replay"],
    cons: ["Непрерывные — нет", "Overestimation bias"],
    complexity: 2,
    stability: 3,
    link: "/algorithms/dqn",
    color: "primary",
    icon: Brain,
  },
  {
    id: "ppo",
    name: "PPO",
    fullName: "Proximal Policy Optimization",
    description: "Стабильный алгоритм policy gradient с clipped objective. Стандарт в ML-Agents.",
    pros: ["Непрерывные и дискретные", "On-policy", "Стабильное обучение"],
    cons: ["Менее sample-efficient", "Требует больше данных"],
    complexity: 3,
    stability: 5,
    link: "/algorithms/ppo",
    color: "secondary",
    icon: Shield,
  },
  {
    id: "sac",
    name: "SAC",
    fullName: "Soft Actor-Critic",
    description: "Off-policy алгоритм с максимизацией энтропии для стабильного исследования.",
    pros: ["Непрерывные действия", "Off-policy", "Автоматическая энтропия"],
    cons: ["Сложнее в реализации", "Больше гиперпараметров"],
    complexity: 4,
    stability: 4,
    link: "/algorithms/sac",
    color: "accent",
    icon: Zap,
  },
  {
    id: "a3c",
    name: "A3C",
    fullName: "Asynchronous Advantage Actor-Critic",
    description: "Асинхронное обучение с параллельными агентами для ускорения сходимости.",
    pros: ["Параллельное обучение", "On-policy", "Быстрая сходимость"],
    cons: ["Сложная реализация", "Нестабильность"],
    complexity: 4,
    stability: 3,
    link: "/algorithms/a3c",
    color: "primary",
    icon: GitBranch,
  },
];

const Stars = ({ count, max = 5 }: { count: number; max?: number }) => (
  <span className="text-sm">
    {"★".repeat(count)}{"☆".repeat(max - count)}
  </span>
);

const AlgorithmsHub = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> На главную
          </Button>
          <h1 className="text-3xl md:text-5xl font-bold">
            <span className="bg-gradient-neon bg-clip-text text-transparent">Алгоритмы RL</span>
          </h1>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            Подробные руководства по основным алгоритмам обучения с подкреплением: теория, математика и реализация на PyTorch.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-12">
        {/* Algorithm Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {algorithms.map((algo) => {
            const Icon = algo.icon;
            return (
              <Card key={algo.id} className="bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{algo.name}</h3>
                      <p className="text-xs text-muted-foreground">{algo.fullName}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{algo.description}</p>

                  <div className="space-y-2">
                    {algo.pros.map((pro, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                        <span className="text-muted-foreground">{pro}</span>
                      </div>
                    ))}
                    {algo.cons.map((con, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
                        <span className="text-muted-foreground">{con}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border/30">
                    <span>Сложность: <Stars count={algo.complexity} /></span>
                    <span>Стабильность: <Stars count={algo.stability} /></span>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-primary/50 text-primary hover:bg-primary/10"
                    onClick={() => navigate(algo.link)}
                    disabled={algo.link === "#"}
                  >
                    {algo.link === "#" ? "Скоро" : "Подробнее"} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Comparison Table */}
        <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Сравнение алгоритмов</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-3 text-foreground">Характеристика</th>
                    <th className="text-center p-3 text-primary">DQN</th>
                    <th className="text-center p-3 text-secondary">PPO</th>
                    <th className="text-center p-3 text-accent">SAC</th>
                    <th className="text-center p-3 text-primary">A3C</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/30">
                    <td className="p-3 font-medium text-foreground">Тип действий</td>
                    <td className="p-3 text-center">Дискретные</td>
                    <td className="p-3 text-center">Оба</td>
                    <td className="p-3 text-center">Непрерывные</td>
                    <td className="p-3 text-center">Оба</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="p-3 font-medium text-foreground">Policy</td>
                    <td className="p-3 text-center">Off-policy</td>
                    <td className="p-3 text-center">On-policy</td>
                    <td className="p-3 text-center">Off-policy</td>
                    <td className="p-3 text-center">On-policy</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="p-3 font-medium text-foreground">Sample Efficiency</td>
                    <td className="p-3 text-center">Средняя</td>
                    <td className="p-3 text-center">Низкая</td>
                    <td className="p-3 text-center">Высокая</td>
                    <td className="p-3 text-center">Низкая</td>
                  </tr>
                  <tr className="border-b border-border/30">
                    <td className="p-3 font-medium text-foreground">Стабильность</td>
                    <td className="p-3 text-center">Средняя</td>
                    <td className="p-3 text-center">Высокая</td>
                    <td className="p-3 text-center">Высокая</td>
                    <td className="p-3 text-center">Средняя</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">ML-Agents</td>
                    <td className="p-3 text-center">❌</td>
                    <td className="p-3 text-center">✅ Основной</td>
                    <td className="p-3 text-center">✅</td>
                    <td className="p-3 text-center">❌</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Decision Tree */}
        <Card className="bg-card/60 backdrop-blur-sm border-primary/20">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Какой алгоритм выбрать?</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {[
                {
                  trigger: "Дискретные действия (прыжок, выстрел, поворот)",
                  content: "Для дискретных пространств действий лучше всего подходят DQN (для простых сред) или PPO (для более сложных). DQN эффективнее по данным благодаря replay buffer, но PPO стабильнее при масштабировании.",
                  algo: "DQN или PPO",
                  links: [{ label: "DQN", path: "/algorithms/dqn" }, { label: "PPO", path: "/algorithms/ppo" }],
                },
                {
                  trigger: "Непрерывные действия (скорость, угол руля)",
                  content: "Для непрерывных действий выбирайте PPO (стабильнее, проще в настройке) или SAC (эффективнее по данным, лучше исследует). SAC — off-policy, что позволяет переиспользовать данные.",
                  algo: "PPO или SAC",
                  links: [{ label: "PPO", path: "/algorithms/ppo" }, { label: "SAC", path: "/algorithms/sac" }],
                },
                {
                  trigger: "Мультиагентная кооперация",
                  content: "MA-POCA (Multi-Agent POsthumous Credit Assignment) — специализированный алгоритм Unity ML-Agents для кооперативных задач. Поддерживает групповые награды и динамическое число агентов.",
                  algo: "MA-POCA",
                  links: [{ label: "Подробнее о MA-POCA", path: "/courses/3-2" }],
                },
                {
                  trigger: "Имитация поведения эксперта",
                  content: "GAIL (Generative Adversarial Imitation Learning) в связке с PPO позволяет агенту обучаться на демонстрациях эксперта без явной функции награды. Отлично подходит для сложного поведения NPC.",
                  algo: "GAIL + PPO",
                  links: [{ label: "Имитационное обучение", path: "/courses/3-4" }],
                },
                {
                  trigger: "Максимальная sample-efficiency",
                  content: "SAC — off-policy алгоритм с автоматической настройкой энтропии. Переиспользует данные из replay buffer, что делает его самым эффективным по числу взаимодействий со средой.",
                  algo: "SAC (off-policy)",
                  links: [{ label: "SAC", path: "/algorithms/sac" }],
                },
                {
                  trigger: "Максимальная стабильность",
                  content: "PPO с clipped surrogate objective обеспечивает монотонное улучшение политики. Это стандарт в Unity ML-Agents и наиболее надёжный выбор для большинства задач.",
                  algo: "PPO (on-policy)",
                  links: [{ label: "PPO", path: "/algorithms/ppo" }],
                },
              ].map((item, i) => (
                <AccordionItem key={i} value={`decision-${i}`} className="border border-border/30 rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary">
                    {item.trigger}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pb-4">
                    <p className="text-sm text-muted-foreground">{item.content}</p>
                    <div className="flex items-center gap-2 text-xs text-primary font-semibold">
                      Рекомендация: {item.algo}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {item.links.map((link) => (
                        <Button key={link.path} variant="outline" size="sm" onClick={() => navigate(link.path)} className="text-xs">
                          {link.label} <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button onClick={() => navigate("/")} variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
            <ArrowLeft className="w-4 h-4 mr-2" /> На главную
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmsHub;
