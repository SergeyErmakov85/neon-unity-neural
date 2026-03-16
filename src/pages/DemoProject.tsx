import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft, Download, Brain, Zap, Shield, Target, Layers,
  GitBranch, CheckCircle2, XCircle, ChevronRight, Sparkles,
  Play, Database, RefreshCw, Save, FileCode, Box
} from "lucide-react";

/* ───────── Section Navigation ───────── */
const sections = [
  { id: "intro", label: "Введение" },
  { id: "architecture", label: "Архитектура" },
  { id: "training", label: "Обучение" },
  { id: "export", label: "Экспорт" },
  { id: "test", label: "Тест" },
];

/* ───────── Optimizations Data ───────── */
const optimizations = [
  { id: 1, title: "Длина эпизода (MAX_STEPS)", icon: Target, was: "100", now: "1000", why: "Позволяет агенту завершить маневр" },
  { id: 2, title: "Нормализация advantage", icon: Zap, was: "отсутствовала", now: "(adv−mean)/std", why: "Стабилизирует градиент" },
  { id: 3, title: "Value targets", icon: Shield, was: "ret_t", now: "ret_t.detach()", why: "Предотвращает коллапс обучения" },
  { id: 4, title: "Хранение sample", icon: Database, was: "clamped action", now: "raw sample", why: "Корректный подсчет log_prob" },
  { id: 5, title: "ENTROPY_COEFF", icon: Sparkles, was: "0.01", now: "0.02", why: "Предотвращает коллапс дискретной головы" },
  { id: 6, title: "Checkpoint guard", icon: Save, was: "ep≥100", now: "ep≥20", why: "Сохраняет лучшие ранние модели" },
  { id: 7, title: "Двойной clamp", icon: Layers, was: "[-3,3] + [-1,1]", now: "единый [-1,1]", why: "Устраняет рассогласование" },
  { id: 8, title: "Форма ONNX", icon: Box, was: "flat [1,N]", now: "grid [1,C,H,W]", why: "Для корректного инференса в Unity" },
];

/* ───────── Timeline Data ───────── */
const timelineSteps = [
  {
    step: 1,
    title: "Сбор данных (Rollout)",
    icon: Play,
    description: "1000 шагов взаимодействия со средой БЕЗ построения графа. Сбор obs, cont_raw, disc_acts.",
    color: "primary" as const,
  },
  {
    step: 2,
    title: "Discounted Returns & Advantage",
    icon: RefreshCw,
    description: "Вычисление дисконтированной награды и Advantage.",
    highlight: "Нормализация: (adv − mean) / std",
    color: "secondary" as const,
  },
  {
    step: 3,
    title: "Обновление (Update)",
    icon: Zap,
    description: "Один батчевый forward С градиентом.",
    highlight: "Loss = Policy Loss + 0.5 × Value Loss − 0.02 × Entropy",
    color: "accent" as const,
  },
  {
    step: 4,
    title: "Сохранение чекпоинта",
    icon: Save,
    description: "Если средняя награда за 100 эпизодов выросла и прошло более 20 эпизодов.",
    color: "primary" as const,
  },
];

/* ───────── Checklist Data ───────── */
const checklistItems = [
  "Обернуть модель в UnityONNXWrapper (добавляет фиктивные тензоры version_number и memory_size)",
  "Экспортировать граф с помощью torch.onnx.export (opset_version=15)",
  "Добавить metadata_props в ONNX файл (размеры сенсоров и действий)",
  "Проверить форму входов (должна быть grid [1, C, H, W], а не flat)",
  "Скопировать .onnx файл в папку Assets/ML-Agents/ в Unity",
  "В Inspector агента выбрать Behavior Type = Inference Only",
];

/* ───────── Quiz Data ───────── */
const quizQuestions = [
  {
    question: "Почему мы должны хранить raw sample (pre-clamp), а не обрезанное значение для функции log_prob?",
    options: [
      "Это экономит память",
      "Распределение Normal не знает об обрезке, и расчет вероятности исказится",
      "Unity требует сырые данные",
    ],
    correct: 1,
    explanation: "Normal distribution не учитывает clamp — log_prob вычисляется для значения, которое не совпадает с реально отправленным в среду, что искажает policy gradient.",
  },
  {
    question: "Для чего нужен ret_t.detach() при подсчете Value Loss?",
    options: [
      "Чтобы Value Network подгонялась под фиксированные таргеты, не ломая граф",
      "Чтобы ускорить обучение в 2 раза",
      "Для экспорта в ONNX",
    ],
    correct: 0,
    explanation: "Без .detach() backward pass мог бы двигать и предсказание, и таргет одновременно, что приводит к коллапсу обучения.",
  },
  {
    question: "Зачем была увеличена длина эпизода (MAX_STEPS) со 100 до 1000?",
    options: [
      "Из-за бага в PyTorch",
      "FoodCollector имеет разреженный сигнал награды, за 100 шагов агент не успевает ничего сделать",
      "Чтобы увеличить размер батча",
    ],
    correct: 1,
    explanation: "FoodCollector рассчитан на эпизоды 1000–5000 шагов. За 100 шагов агент совершает ~3-4 манёвра и почти не сталкивается с едой.",
  },
];

/* ───────── Code Snippets ───────── */
const codeAct = `@torch.no_grad()
def act(self, obs):
    c_mean, c_std, d_logits, val = self.forward(obs)
    
    c_dist = Normal(c_mean, c_std)
    c_raw  = c_dist.sample()          # pre-clamp: для log_prob
    c_act  = c_raw.clamp(-1.0, 1.0)   # clamped: для Unity
    
    d_acts = [Categorical(logits=l).sample() 
              for l in d_logits]
    
    return c_raw, c_act, d_acts, val`;

const codeEval = `def evaluate_actions(self, obs, c_act_stored, d_acts_stored):
    c_mean, c_std, d_logits, val = self.forward(obs)
    
    lp  = torch.zeros(obs.shape[0], device=obs.device)
    ent = torch.zeros_like(lp)
    
    # Непрерывные: log_prob от raw-действий
    dist_c = Normal(c_mean, c_std)
    lp  += dist_c.log_prob(c_act_stored).sum(-1)
    ent += dist_c.entropy().sum(-1)
    
    # Дискретные
    for i, logits in enumerate(d_logits):
        dist_d = Categorical(logits=logits)
        lp  += dist_d.log_prob(d_acts_stored[i])
        ent += dist_d.entropy()
    
    return lp, ent, val`;

/* ───────── Animated Section Wrapper ───────── */
const AnimatedSection = ({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </section>
  );
};

/* ═══════════════════════════════════════ */
/*              MAIN COMPONENT            */
/* ═══════════════════════════════════════ */
const DemoProject = () => {
  const [activeSection, setActiveSection] = useState("intro");
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(checklistItems.length).fill(false));
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));
  const [quizRevealed, setQuizRevealed] = useState<boolean[]>(new Array(quizQuestions.length).fill(false));

  const allChecked = checkedItems.every(Boolean);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const toggleCheck = (i: number) => {
    setCheckedItems((prev) => { const n = [...prev]; n[i] = !n[i]; return n; });
  };

  const selectAnswer = (qIdx: number, aIdx: number) => {
    if (quizRevealed[qIdx]) return;
    setQuizAnswers((prev) => { const n = [...prev]; n[qIdx] = aIdx; return n; });
    setQuizRevealed((prev) => { const n = [...prev]; n[qIdx] = true; return n; });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="FoodCollector REINFORCE Training Pipeline | RL Platform"
        description="Интерактивный модуль: обучение агента в Unity ML-Agents с алгоритмом REINFORCE. Архитектура, тренировка, экспорт ONNX."
        path="/demo-project"
      />
      <Navbar />

      {/* Section Nav */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeSection === s.id
                    ? "bg-primary/20 text-primary shadow-[0_0_12px_hsl(var(--primary)/0.3)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="pt-36 pb-20 px-4">
        <div className="container mx-auto max-w-5xl space-y-32">

          {/* Back + Download */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Назад на главную
              </Button>
            </Link>
            <a href="/FoodCollector_REINFORCE_v3.ipynb" download>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Скачать .ipynb
              </Button>
            </a>
          </div>

          {/* ════════ SECTION 1: INTRO ════════ */}
          <AnimatedSection id="intro">
            <div className="text-center space-y-6 mb-16">
              <Badge variant="outline" className="border-primary/50 text-primary px-4 py-1">
                Unity ML-Agents · Policy Gradient · ONNX
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  FoodCollector
                </span>
                <br />
                <span className="text-foreground text-3xl sm:text-4xl">REINFORCE Training Pipeline v3</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Единый оптимизированный пайплайн: <span className="text-primary font-semibold">подключение</span> →{" "}
                <span className="text-secondary font-semibold">обучение</span> →{" "}
                <span className="text-accent font-semibold">экспорт ONNX</span> для Unity ML-Agents.
                Среда: FoodCollector (Release 22). Алгоритм: REINFORCE + Baseline.
              </p>
            </div>

            {/* Optimization Cards */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                Ключевые оптимизации v3
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {optimizations.map((opt) => {
                  const Icon = opt.icon;
                  return (
                    <Card
                      key={opt.id}
                      className="bg-card/60 backdrop-blur-sm border-border/50 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(var(--primary)/0.15)] transition-all duration-300 group"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <CardTitle className="text-sm font-semibold text-foreground leading-tight">{opt.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-destructive/10 text-destructive border border-destructive/20">
                            {opt.was}
                          </span>
                          <ChevronRight className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                            {opt.now}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{opt.why}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* ════════ SECTION 2: ARCHITECTURE ════════ */}
          <AnimatedSection id="architecture">
            <h2 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Архитектура HybridPolicyNetwork
              </span>
            </h2>
            <p className="text-muted-foreground mb-8">Два режима работы одной сети</p>

            {/* Architecture Diagram */}
            <Card className="bg-card/40 border-border/50 mb-8 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
                  <div className="px-6 py-4 rounded-xl bg-muted/50 border border-border text-center">
                    <div className="text-muted-foreground text-xs mb-1">Input</div>
                    <div className="font-mono font-semibold text-foreground">obs [N, 8000]</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-primary rotate-90 md:rotate-0" />
                  <div className="px-6 py-4 rounded-xl bg-primary/10 border border-primary/30 text-center">
                    <div className="text-primary text-xs mb-1">Shared</div>
                    <div className="font-mono font-semibold text-foreground">Encoder (256→256)</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-primary rotate-90 md:rotate-0" />
                  <div className="flex flex-col gap-2">
                    <div className="px-4 py-2 rounded-lg bg-secondary/10 border border-secondary/30 text-center">
                      <span className="font-mono text-xs text-secondary">Continuous Head</span>
                      <span className="text-xs text-muted-foreground block">Normal(μ, σ)</span>
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-center">
                      <span className="font-mono text-xs text-accent">Discrete Heads</span>
                      <span className="text-xs text-muted-foreground block">Categorical</span>
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-center">
                      <span className="font-mono text-xs text-primary">Value Head</span>
                      <span className="text-xs text-muted-foreground block">Baseline V(s)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs: Rollout vs Update */}
            <Tabs defaultValue="rollout" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/30">
                <TabsTrigger value="rollout" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  Rollout (act)
                </TabsTrigger>
                <TabsTrigger value="update" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary">
                  Update (evaluate_actions)
                </TabsTrigger>
              </TabsList>
              <TabsContent value="rollout" className="mt-4">
                <Card className="bg-card/40 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-primary flex items-center gap-2">
                      <Play className="w-5 h-5" /> Rollout — torch.no_grad()
                    </CardTitle>
                    <CardDescription>
                      Быстрый сэмплинг действий без построения вычислительного графа.
                      Возвращает c_raw (pre-clamp для log_prob), c_act (clamped [-1,1] для Unity),
                      дискретные действия и baseline value.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-background/80 rounded-lg p-4 overflow-x-auto text-sm font-mono text-foreground border border-border/50">
                      <code>{codeAct}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="update" className="mt-4">
                <Card className="bg-card/40 border-secondary/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary flex items-center gap-2">
                      <GitBranch className="w-5 h-5" /> Update — с градиентом
                    </CardTitle>
                    <CardDescription>
                      Пересчитывает log_prob и энтропию по ранее сэмплированным действиям.
                      Выполняет один backward pass.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-background/80 rounded-lg p-4 overflow-x-auto text-sm font-mono text-foreground border border-border/50">
                      <code>{codeEval}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </AnimatedSection>

          {/* ════════ SECTION 3: TRAINING ════════ */}
          <AnimatedSection id="training">
            <h2 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Тренировочный цикл
              </span>
            </h2>
            <p className="text-muted-foreground mb-10">Схема «Batched Replay»</p>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent" />

              <div className="space-y-8">
                {timelineSteps.map((ts) => {
                  const Icon = ts.icon;
                  const colorClasses = {
                    primary: { border: "border-primary", bg: "bg-primary/10", text: "text-primary" },
                    secondary: { border: "border-secondary", bg: "bg-secondary/10", text: "text-secondary" },
                    accent: { border: "border-accent", bg: "bg-accent/10", text: "text-accent" },
                  }[ts.color];

                  return (
                    <div key={ts.step} className="relative pl-16">
                      <div className={`absolute left-3 top-5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${colorClasses.border} ${colorClasses.bg} ${colorClasses.text}`}>
                        {ts.step}
                      </div>
                      <Card className={`bg-card/40 backdrop-blur-sm ${colorClasses.border}/30 hover:${colorClasses.border}/60 transition-all duration-300`}>
                        <CardHeader className="pb-2">
                          <CardTitle className={`text-lg flex items-center gap-2 ${colorClasses.text}`}>
                            <Icon className="w-5 h-5" />
                            Шаг {ts.step}: {ts.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <p className="text-sm text-muted-foreground">{ts.description}</p>
                          {ts.highlight && (
                            <div className="inline-block px-3 py-1.5 rounded-md bg-background/80 border border-border/50">
                              <code className={`text-xs font-mono ${colorClasses.text}`}>{ts.highlight}</code>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* ════════ SECTION 4: EXPORT ════════ */}
          <AnimatedSection id="export">
            <h2 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Экспорт ONNX и интеграция в Unity
              </span>
            </h2>
            <p className="text-muted-foreground mb-10">Отметьте все шаги, чтобы завершить пайплайн</p>

            <Card className="bg-card/40 border-border/50">
              <CardContent className="p-6 space-y-4">
                {checklistItems.map((item, i) => (
                  <label
                    key={i}
                    className={`flex items-start gap-4 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      checkedItems[i]
                        ? "bg-primary/5 border border-primary/20"
                        : "bg-muted/20 border border-transparent hover:bg-muted/30"
                    }`}
                  >
                    <Checkbox
                      checked={checkedItems[i]}
                      onCheckedChange={() => toggleCheck(i)}
                      className="mt-0.5"
                    />
                    <div className="flex-1">
                      <span className={`text-sm transition-colors ${checkedItems[i] ? "text-primary" : "text-foreground"}`}>
                        {i + 1}. {item}
                      </span>
                    </div>
                    {checkedItems[i] && <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />}
                  </label>
                ))}

                {/* Success Animation */}
                <div
                  className={`mt-6 p-6 rounded-xl text-center transition-all duration-500 ${
                    allChecked
                      ? "opacity-100 translate-y-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/30"
                      : "opacity-0 translate-y-4 pointer-events-none h-0 p-0 m-0 overflow-hidden"
                  }`}
                >
                  <div className="text-4xl mb-3">🎉</div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Успех! Пайплайн завершен
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Все шаги выполнены — ваша модель готова к инференсу в Unity.
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* ════════ SECTION 5: QUIZ ════════ */}
          <AnimatedSection id="test">
            <h2 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Knowledge Check
              </span>
            </h2>
            <p className="text-muted-foreground mb-10">Проверьте своё понимание ключевых концепций</p>

            <div className="space-y-8">
              {quizQuestions.map((q, qIdx) => (
                <Card key={qIdx} className="bg-card/40 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">
                      <span className="text-primary mr-2">#{qIdx + 1}</span>
                      {q.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {q.options.map((opt, aIdx) => {
                      const isSelected = quizAnswers[qIdx] === aIdx;
                      const isRevealed = quizRevealed[qIdx];
                      const isCorrect = aIdx === q.correct;

                      let optionStyle = "bg-muted/20 border-transparent hover:bg-muted/40 cursor-pointer";
                      if (isRevealed) {
                        if (isCorrect) {
                          optionStyle = "bg-primary/10 border-primary/30";
                        } else if (isSelected && !isCorrect) {
                          optionStyle = "bg-destructive/10 border-destructive/30";
                        } else {
                          optionStyle = "bg-muted/10 border-transparent opacity-50";
                        }
                      }

                      return (
                        <button
                          key={aIdx}
                          onClick={() => selectAnswer(qIdx, aIdx)}
                          disabled={isRevealed}
                          className={`w-full flex items-center gap-3 p-4 rounded-lg border text-left transition-all duration-300 ${optionStyle}`}
                        >
                          <span className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                            {String.fromCharCode(65 + aIdx)}
                          </span>
                          <span className="text-sm text-foreground flex-1">{opt}</span>
                          {isRevealed && isCorrect && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
                          {isRevealed && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive shrink-0" />}
                        </button>
                      );
                    })}

                    {/* Explanation */}
                    {quizRevealed[qIdx] && (
                      <div className="mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20 animate-fade-in">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold text-primary">Пояснение: </span>
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </AnimatedSection>

          {/* ════════ FULL CODE ════════ */}
          <AnimatedSection id="full-code" className="pt-8">
            <Card className="bg-card/40 border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-foreground flex items-center gap-2">
                      <FileCode className="w-5 h-5 text-primary" />
                      Полный код ноутбука
                    </CardTitle>
                    <CardDescription className="mt-1">FoodCollector_REINFORCE_v3.ipynb</CardDescription>
                  </div>
                  <a href="/FoodCollector_REINFORCE_v3.ipynb" download>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="w-4 h-4" />
                      Скачать
                    </Button>
                  </a>
                </div>
              </CardHeader>
              <CardContent>
                <FullCodeDisplay />
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

/* ───────── Full Code Display Component ───────── */
const FullCodeDisplay = () => {
  const [expanded, setExpanded] = useState(false);

  const fullCode = `# ▓▓▓ FoodCollector · REINFORCE Training · v3 (Fixed) ▓▓▓
# Unity ML-Agents · Policy Gradient · ONNX Export Pipeline
# Среда: FoodCollector (Release 22)
# Алгоритм: REINFORCE + Baseline (Actor-Critic Lite)
# Действия: Hybrid (3 continuous + 1 discrete branch)

# §1 · Зависимости
import os, time
import numpy as np
from collections import deque

import torch
import torch.nn as nn
import torch.optim as optim
from torch.distributions import Categorical, Normal
from torch.utils.tensorboard import SummaryWriter

from mlagents_envs.environment import UnityEnvironment
from mlagents_envs.side_channel.engine_configuration_channel import (
    EngineConfigurationChannel,
)
from mlagents_envs.base_env import ActionTuple

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# §2 · Подключение к Unity
engine_channel = EngineConfigurationChannel()
env = UnityEnvironment(file_name=None, seed=42,
    side_channels=[engine_channel], worker_id=0)

engine_channel.set_configuration_parameters(
    time_scale=20.0, target_frame_rate=-1, quality_level=0)

env.reset()
behavior_name = list(env.behavior_specs.keys())[0]
spec = env.behavior_specs[behavior_name]

obs_shapes = [o.shape for o in spec.observation_specs]
total_obs_size = sum(int(np.prod(s)) for s in obs_shapes)
continuous_size = spec.action_spec.continuous_size
discrete_branches = spec.action_spec.discrete_branches

# §3 · HybridPolicyNetwork
class HybridPolicyNetwork(nn.Module):
    def __init__(self, obs_size, cont_size, disc_branches, hidden=256):
        super().__init__()
        self.obs_size = obs_size
        self.continuous_size = cont_size
        self.discrete_branches = disc_branches
        
        self.encoder = nn.Sequential(
            nn.Linear(obs_size, hidden), nn.ReLU(),
            nn.Linear(hidden, hidden), nn.ReLU(),
        )
        self.cont_mean = nn.Linear(hidden, cont_size)
        self.cont_logstd = nn.Parameter(torch.zeros(cont_size))
        self.disc_heads = nn.ModuleList(
            [nn.Linear(hidden, b) for b in disc_branches]
        )
        self.value_head = nn.Linear(hidden, 1)
    
    def forward(self, obs):
        h = self.encoder(obs)
        c_mean = self.cont_mean(h)
        c_std = torch.clamp(self.cont_logstd, -5.0, 2.0).exp().expand_as(c_mean)
        d_logits = [head(h) for head in self.disc_heads]
        val = self.value_head(h).squeeze(-1)
        return c_mean, c_std, d_logits, val

    @torch.no_grad()
    def act(self, obs):
        c_mean, c_std, d_logits, val = self.forward(obs)
        c_dist = Normal(c_mean, c_std)
        c_raw = c_dist.sample()            # pre-clamp
        c_act = c_raw.clamp(-1.0, 1.0)     # для Unity
        d_acts = [Categorical(logits=l).sample() for l in d_logits]
        return c_raw, c_act, d_acts, val

    def evaluate_actions(self, obs, c_act_stored, d_acts_stored):
        c_mean, c_std, d_logits, val = self.forward(obs)
        lp = torch.zeros(obs.shape[0], device=obs.device)
        ent = torch.zeros_like(lp)
        if self.continuous_size > 0:
            dist_c = Normal(c_mean, c_std)
            lp += dist_c.log_prob(c_act_stored).sum(-1)
            ent += dist_c.entropy().sum(-1)
        for i, logits in enumerate(d_logits):
            dist_d = Categorical(logits=logits)
            lp += dist_d.log_prob(d_acts_stored[i])
            ent += dist_d.entropy()
        return lp, ent, val

# §4 · Утилиты
def obs_to_tensor(decision_steps):
    parts = [o.reshape(o.shape[0], -1) for o in decision_steps.obs]
    return torch.from_numpy(np.concatenate(parts, 1)).float().to(device)

def make_action_tuple(cont, disc, n):
    c = np.clip(cont.cpu().numpy(), -1, 1).astype(np.float32)
    d = np.stack([a.cpu().numpy() for a in disc], 1).astype(np.int32)
    return ActionTuple(continuous=c, discrete=d)

def discounted_returns(rewards, gamma=0.99):
    G, out = 0.0, []
    for r in reversed(rewards):
        G = r + gamma * G
        out.append(G)
    out.reverse()
    ret = np.array(out, np.float32)
    return (ret - ret.mean()) / (ret.std() + 1e-8) if len(ret) > 1 else ret

# §5 · Тренировочный цикл
NUM_EPISODES = 300
MAX_STEPS = 1000         # FIX 1
GAMMA = 0.99
ENTROPY_COEFF = 0.02     # FIX 5
VALUE_COEFF = 0.5
CLIP_GRAD = 1.0

policy = HybridPolicyNetwork(
    total_obs_size, continuous_size, discrete_branches).to(device)
optimizer = optim.Adam(policy.parameters(), lr=3e-4)

reward_buf = deque(maxlen=100)
best_avg = -float('inf')

for ep in range(1, NUM_EPISODES + 1):
    env.reset()
    stored_obs, stored_cont, stored_disc = [], [], []
    stored_n, buf_val, buf_rew = [], [], []
    ep_reward, ep_steps = 0.0, 0

    # ROLLOUT
    for _ in range(MAX_STEPS):
        dec, term = env.get_steps(behavior_name)
        if len(dec) == 0:
            if len(term) > 0: break
            env.step(); continue
        
        obs_t = obs_to_tensor(dec)
        c_raw, c_act, d_acts, val = policy.act(obs_t)
        env.set_actions(behavior_name, make_action_tuple(c_act, d_acts, len(dec)))
        env.step()
        
        r = float(np.mean(dec.reward))
        stored_obs.append(obs_t)
        stored_cont.append(c_raw)     # FIX 4: raw
        stored_disc.append(d_acts)
        stored_n.append(len(dec))
        buf_val.append(val.mean().item())
        buf_rew.append(r)
        ep_reward += r
        ep_steps += 1
        if len(term) > 0: break

    if not buf_rew: continue

    # UPDATE
    T = len(buf_rew)
    all_obs = torch.cat(stored_obs, 0)
    all_cont = torch.cat(stored_cont, 0)
    all_disc = [torch.cat([stored_disc[t][b] for t in range(T)], 0)
                for b in range(len(discrete_branches))]

    lp_flat, ent_flat, val_flat = policy.evaluate_actions(
        all_obs, all_cont, all_disc)

    lp_t = torch.stack([c.mean() for c in torch.split(lp_flat, stored_n)])
    ent_t = torch.stack([c.mean() for c in torch.split(ent_flat, stored_n)])
    val_t = torch.stack([c.mean() for c in torch.split(val_flat, stored_n)])

    ret_t = torch.from_numpy(discounted_returns(buf_rew, GAMMA)).to(device)
    adv = ret_t - val_t.detach()

    # FIX 2: Нормализация advantage
    if adv.shape[0] > 1:
        adv = (adv - adv.mean()) / (adv.std() + 1e-8)

    p_loss = -(lp_t * adv).mean()
    v_loss = nn.functional.mse_loss(val_t, ret_t.detach())  # FIX 3
    e_bon = ent_t.mean()
    loss = p_loss + VALUE_COEFF * v_loss - ENTROPY_COEFF * e_bon

    optimizer.zero_grad()
    loss.backward()
    nn.utils.clip_grad_norm_(policy.parameters(), CLIP_GRAD)
    optimizer.step()

    reward_buf.append(ep_reward)
    avg100 = float(np.mean(reward_buf))

    # FIX 6: Checkpoint guard ep>=20
    if avg100 > best_avg and ep >= 20:
        best_avg = avg100
        torch.save({
            'episode': ep,
            'model_state_dict': policy.state_dict(),
            'optimizer_state_dict': optimizer.state_dict(),
            'avg_reward': avg100,
        }, 'best_model_checkpoint.pth')

# §6 · Экспорт ONNX
class UnityONNXWrapper(nn.Module):
    def __init__(self, net, grid_c=None, grid_h=None, grid_w=None):
        super().__init__()
        self.net = net
        self.grid_c = grid_c
        self.register_buffer('version_number', torch.tensor([3.0]))
        self.register_buffer('memory_size', torch.tensor([0.0]))
    
    def forward(self, obs_0, action_masks=None):
        obs_flat = obs_0.reshape(obs_0.shape[0], -1)
        c_mean, _, d_logits, _ = self.net(obs_flat)
        cont_out = torch.tanh(c_mean)
        disc_parts = [logits.argmax(-1, keepdim=True) for logits in d_logits]
        disc_out = torch.cat(disc_parts, -1).long()
        return cont_out, disc_out, self.version_number, self.memory_size

# torch.onnx.export(wrapper, ..., opset_version=15)
# Добавить metadata_props в ONNX файл
# Проверить форму входов: grid [1, C, H, W]
# Скопировать .onnx в Assets/ML-Agents/

env.close()`;

  return (
    <div className="relative">
      <div className={`overflow-hidden transition-all duration-500 ${expanded ? "max-h-none" : "max-h-96"}`}>
        <pre className="bg-background/80 rounded-lg p-4 overflow-x-auto text-xs font-mono text-foreground border border-border/50 leading-relaxed">
          <code>{fullCode}</code>
        </pre>
      </div>
      {!expanded && (
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent" />
      )}
      <Button
        variant="outline"
        size="sm"
        className="mt-4 w-full"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Свернуть" : "Показать весь код"}
      </Button>
    </div>
  );
};

export default DemoProject;
