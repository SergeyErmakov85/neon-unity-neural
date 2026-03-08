import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  MessageCircle,
  HelpCircle,
  Image,
  Trophy,
  Clock,
  Users,
  Zap,
  Star,
  ExternalLink,
  Calendar,
  Gift,
  Target,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";

const discordChannels = [
  {
    name: "#general",
    icon: MessageCircle,
    description: "Общение на любые темы, знакомства, новости платформы и RL-индустрии",
    members: "320+",
  },
  {
    name: "#help",
    icon: HelpCircle,
    description: "Помощь с кодом, настройкой окружения, отладкой агентов и вопросами по курсу",
    members: "210+",
  },
  {
    name: "#showcase",
    icon: Image,
    description: "Делитесь своими проектами, GIF-анимациями обученных агентов и результатами",
    members: "150+",
  },
];

const studentProjects = [
  {
    title: "Drone Navigator",
    author: "Алексей К.",
    description: "Агент управляет дроном в 3D-среде, избегая препятствий и собирая контрольные точки",
    tags: ["PPO", "Unity", "3D"],
    gradient: "from-primary/40 to-cyan-500/40",
  },
  {
    title: "Chess Endgame Solver",
    author: "Мария С.",
    description: "RL-агент, обученный разыгрывать шахматные эндшпили с точностью 94%",
    tags: ["DQN", "PyTorch", "Стратегия"],
    gradient: "from-purple-500/40 to-primary/40",
  },
  {
    title: "Traffic Controller",
    author: "Дмитрий В.",
    description: "Мультиагентная система управления светофорами, снижающая пробки на 35%",
    tags: ["MA-POCA", "Multi-Agent", "Симуляция"],
    gradient: "from-emerald-500/40 to-primary/40",
  },
  {
    title: "Robotic Arm Grabber",
    author: "Елена П.",
    description: "SAC-агент управляет роботизированной рукой для захвата объектов разной формы",
    tags: ["SAC", "Continuous", "Робототехника"],
    gradient: "from-orange-500/40 to-primary/40",
  },
];

const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
};

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-3xl md:text-4xl font-bold font-mono text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.6)]">
      {String(value).padStart(2, "0")}
    </span>
    <span className="text-xs text-muted-foreground mt-1">{label}</span>
  </div>
);

const Community = () => {
  const challengeEnd = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
  const countdown = useCountdown(challengeEnd);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-20 space-y-24">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>

        {/* ===== SECTION 1 — Discord ===== */}
        <section className="space-y-8">
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card/80 to-card p-8 md:p-12">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative z-10 max-w-2xl space-y-4">
              <Badge className="bg-primary/20 text-primary border-primary/30 mb-2">
                <Users className="w-3 h-3 mr-1" /> 500+ участников
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground">
                Присоединяйтесь к{" "}
                <span className="bg-gradient-neon bg-clip-text text-transparent">Discord-сообществу</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Обсуждайте RL, получайте помощь, делитесь проектами и участвуйте в еженедельных челленджах вместе с единомышленниками.
              </p>
              <Button
                size="lg"
                className="bg-gradient-neon hover:shadow-glow-cyan hover:scale-105 transition-all mt-2"
                asChild
              >
                <a href="https://discord.gg/lovable-dev" target="_blank" rel="noopener noreferrer">
                  Присоединиться к Discord
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {discordChannels.map((ch) => {
              const Icon = ch.icon;
              return (
                <Card
                  key={ch.name}
                  className="border-border/50 bg-card/40 hover:border-primary/40 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.25)] transition-all duration-300 group"
                >
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-primary group-hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.6)] transition-all" />
                      <span className="font-semibold text-foreground">{ch.name}</span>
                      <span className="ml-auto text-xs text-muted-foreground">{ch.members}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{ch.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ===== SECTION 2 — Weekly Challenge ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Еженедельные Challenge</h2>
          </div>

          <p className="text-muted-foreground max-w-2xl">
            Каждую неделю — новая задача. Лучшие решения попадают в галерею, а авторы получают бейджи и бонусы.
          </p>

          <Card className="border-primary/30 bg-card/40 overflow-hidden">
            <CardContent className="p-6 md:p-8 space-y-6">
              <Badge className="bg-accent/20 text-accent-foreground border-accent/30">
                <Zap className="w-3 h-3 mr-1" /> Текущий Challenge
              </Badge>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                Обучи агента пройти лабиринт за минимальное число шагов
              </h3>
              <p className="text-muted-foreground">
                Используйте любой алгоритм (Q-Learning, DQN, PPO). Среда — GridWorld 10×10 с случайными стенами. Метрика — среднее число шагов за 100 эпизодов.
              </p>

              {/* Countdown */}
              <div className="flex items-center gap-1 md:gap-4">
                <Clock className="w-5 h-5 text-muted-foreground mr-2 hidden sm:block" />
                <CountdownUnit value={countdown.days} label="дней" />
                <span className="text-2xl text-muted-foreground">:</span>
                <CountdownUnit value={countdown.hours} label="часов" />
                <span className="text-2xl text-muted-foreground">:</span>
                <CountdownUnit value={countdown.minutes} label="минут" />
                <span className="text-2xl text-muted-foreground">:</span>
                <CountdownUnit value={countdown.seconds} label="секунд" />
              </div>

              <Button className="bg-gradient-neon hover:shadow-glow-cyan hover:scale-105 transition-all">
                Участвовать
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* ===== SECTION 3 — Student Gallery ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Star className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Галерея проектов студентов</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {studentProjects.map((proj) => (
              <Card
                key={proj.title}
                className="border-border/50 bg-card/40 hover:border-primary/40 hover:shadow-[0_0_25px_-5px_hsl(var(--primary)/0.3)] transition-all duration-300 group overflow-hidden"
              >
                {/* GIF placeholder */}
                <div
                  className={`h-40 bg-gradient-to-br ${proj.gradient} flex items-center justify-center`}
                >
                  <div className="w-16 h-16 rounded-xl border-2 border-foreground/20 bg-background/30 backdrop-blur flex items-center justify-center">
                    <Zap className="w-8 h-8 text-foreground/50 group-hover:text-primary transition-colors" />
                  </div>
                </div>
                <CardContent className="p-5 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{proj.title}</h3>
                    <p className="text-xs text-muted-foreground">от {proj.author}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-muted/50 text-muted-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ===== SECTION 4 — Hackathon ===== */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Trophy className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Ежемесячный RL Hackathon</h2>
          </div>

          <Card className="border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 overflow-hidden">
            <CardContent className="p-6 md:p-10 space-y-6">
              <p className="text-muted-foreground max-w-2xl text-lg">
                48 часов, одна задача, неограниченные подходы. Соревнуйтесь с участниками сообщества, демонстрируйте навыки и выигрывайте призы!
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Calendar, label: "Следующий хакатон", value: "5 апреля 2026" },
                  { icon: Gift, label: "Призы", value: "PRO-подписки, мерч, менторство" },
                  { icon: Users, label: "Формат", value: "Соло или команды до 3 человек" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="p-4 rounded-xl border border-border/50 bg-background/50 space-y-1"
                    >
                      <Icon className="w-5 h-5 text-primary mb-2" />
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  );
                })}
              </div>

              <Button
                size="lg"
                className="bg-gradient-neon hover:shadow-glow-cyan hover:scale-105 transition-all"
              >
                Узнать подробнее
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Community;
