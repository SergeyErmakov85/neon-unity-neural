import { lazy, Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { Skeleton } from "@/components/ui/skeleton";

const Part1 = lazy(() => import("@/components/math-rl/parts/Part1Limits"));
const Part1b = lazy(() => import("@/components/math-rl/parts/Part1bCalculus"));
const Part2 = lazy(() => import("@/components/math-rl/parts/Part2LinearAlgebra"));
const Part3 = lazy(() => import("@/components/math-rl/parts/Part3Probability"));
const Part4 = lazy(() => import("@/components/math-rl/parts/Part4Optimization"));
const Part5 = lazy(() => import("@/components/math-rl/parts/Part5FundamentalRL"));
const Part6 = lazy(() => import("@/components/math-rl/parts/Part6DeepRL"));
const GDPlayground = lazy(() => import("@/components/math-rl/GradientDescentPlayground"));

const parts = [
  { id: "part-1", num: "I", title: "Пределы, последовательности и ряды", color: "primary" as const },
  { id: "part-1b", num: "II", title: "Производные, градиент и оптимизация", color: "secondary" as const },
  { id: "part-2", num: "III", title: "Линейная алгебра для RL", color: "accent" as const },
  { id: "part-3", num: "IV", title: "От вероятности к алгоритмам RL", color: "primary" as const },
  { id: "part-4", num: "V", title: "Методы оптимизации политик", color: "secondary" as const },
  { id: "part-5", num: "VI", title: "Фундаментальная математика RL", color: "accent" as const },
  { id: "part-6", num: "VII", title: "Глубокое обучение с подкреплением", color: "primary" as const },
];

const partSubtopics: Record<string, string[]> = {
  "part-1": [
    "Введение",
    "1. Предел последовательности",
    "2. Бесконечные ряды и их сходимость",
    "  Геометрический ряд",
    "  Необходимое условие сходимости",
    "  Абсолютная сходимость",
    "3. Пределы и ряды в контексте RL",
    "4. Уравнения Беллмана и дисконтирование",
    "  Функция ценности состояния",
    "  Уравнение оптимальности Беллмана",
    "5. Итерация ценности: сходимость",
    "6. Дисконтирование в RL",
    "7. Примеры, аналогии и задачи",
    "8. Интерактивные визуализации",
    "9. Источники",
  ],
  "part-1b": [
    "§ 1. Производные и дифференцирование",
    "  Chain Rule = Backpropagation",
    "  Таблица основных производных",
    "§ 2. Частные производные и градиент",
    "  Направление роста и антиградиент",
    "  Градиент в Deep RL",
    "§ 3. Градиентный спуск и оптимизация",
    "  Варианты: SGD, Momentum, Adam",
    "§ 4. Policy Gradient в RL",
    "  Теорема о градиенте политики",
    "§ 5. Весь раздел в одной картине",
    "  Практические задачи",
  ],
  "part-2": [
    "1. Векторы",
    "  Линейная комбинация и базис",
    "2. Матрицы",
    "  Операции, определитель, ранг",
    "  Обратная матрица",
    "3. Скалярное произведение",
    "4. Собственные значения и векторы",
    "5. Сингулярное разложение (SVD)",
    "6. Квадратичные формы, проекции, LU/QR",
  ],
  "part-3": [
    "1. Теория вероятностей",
    "  Случайные величины и распределения",
    "  Условная вероятность и Байес",
    "2. Статистика",
    "  Оценка параметров и гипотезы",
    "3. Марковские процессы",
    "  Цепи Маркова и MDP",
    "4. Функции ценности и уравнения Беллмана",
    "5. Алгоритмы RL",
    "6. Практические примеры (Python)",
  ],
  "part-4": [
    "Лекция 1. Основы RL и оптимизация политики",
    "  Целевая функция политики",
    "Лекция 2. Вывод градиента политики",
    "  Трюк с логарифмом",
    "  Формула REINFORCE",
    "  Reward-to-go и Advantage",
    "Лекция 3. Градиентный спуск",
    "  Momentum, RMSProp, Adam",
    "Лекция 4. PPO",
    "  Клиповый суррогат-объектив",
    "  Гиперпараметры PPO",
  ],
  "part-5": [
    "Фундаментальная математика RL",
  ],
  "part-6": [
    "1.1 Основные понятия",
    "1.2 Обзор алгоритмов RL",
    "2.1 Математический анализ",
    "  Производные и градиент",
    "2.2 Теория вероятностей",
    "  MLE и MAP",
    "2.3 Дифференциальные уравнения",
    "Deep Q-Network (DQN)",
    "Современные алгоритмы",
  ],
};

const colorClasses = {
  primary: { border: "border-primary/40", text: "text-primary", bg: "bg-primary/5" },
  secondary: { border: "border-secondary/40", text: "text-secondary", bg: "bg-secondary/5" },
  accent: { border: "border-accent/40", text: "text-accent", bg: "bg-accent/5" },
};

const PartSkeleton = () => (
  <div className="space-y-4 py-8">
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <Skeleton className="h-32 w-full" />
  </div>
);
const PartComponents = [Part1, Part1b, Part2, Part3, Part4, Part5, Part6];

const CollapsibleParts = () => {
  const [openParts, setOpenParts] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenParts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      {parts.map((part, i) => {
        const c = colorClasses[part.color];
        const isOpen = openParts.has(part.id);
        const PartComponent = PartComponents[i];
        return (
          <div key={part.id} id={part.id} className="scroll-mt-24">
            <button
              onClick={() => toggle(part.id)}
              className={`w-full text-left ${i === 0 ? "mt-0" : "mt-6"} p-6 rounded-xl border ${c.border} ${c.bg} transition-all duration-200 hover:brightness-110 cursor-pointer group`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-xs font-bold ${c.text} uppercase tracking-wider`}>Часть {part.num}</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-1">{part.title}</h2>
                </div>
                <ChevronDown className={`w-6 h-6 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </div>
            </button>

            {isOpen && (
              <div className="mt-8 mb-4">
                <Suspense fallback={<PartSkeleton />}>
                  <PartComponent />
                </Suspense>
                {part.id === "part-1b" && (
                  <Suspense fallback={<PartSkeleton />}>
                    <GDPlayground />
                  </Suspense>
                )}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
const MathRL = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ScrollProgressBar />

      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 pt-24 pb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground mb-4 -ml-2">
            <ArrowLeft className="w-4 h-4 mr-2" /> На главную
          </Button>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              Математика и глубокого обучения с подкреплением
            </span>
          </h1>
          <p className="text-muted-foreground max-w-3xl text-lg">
            Единый учебный модуль: от пределов и производных до PPO и глубокого обучения с подкреплением. Семь частей с задачами, Python-кодом и интерактивными демо.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl flex gap-8">
        {/* Sidebar TOC */}
        <aside className="hidden lg:block w-72 flex-shrink-0">
          <nav className="sticky top-24 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Содержание</p>
            {parts.map((part) => {
              const c = colorClasses[part.color];
              const subtopics = partSubtopics[part.id] || [];
              return (
                <Popover key={part.id}>
                  <PopoverTrigger asChild>
                    <button
                      className={`flex items-center justify-between w-full text-left text-xs py-2 px-3 rounded text-muted-foreground hover:text-foreground hover:${c.bg} transition-colors`}
                    >
                      <span>
                        <span className={`font-bold ${c.text} mr-1.5`}>{part.num}.</span>
                        {part.title}
                      </span>
                      <ChevronRight className="w-3 h-3 flex-shrink-0 opacity-50" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent side="right" align="start" className="w-72 p-0 bg-card border-border/50 backdrop-blur-sm">
                    <div className="p-3 border-b border-border/30">
                      <button
                        onClick={() => document.getElementById(part.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                        className={`text-sm font-semibold ${c.text} hover:underline cursor-pointer`}
                      >
                        Часть {part.num}. {part.title}
                      </button>
                    </div>
                    <div className="p-2 max-h-64 overflow-y-auto space-y-0.5">
                      {subtopics.map((topic, i) => {
                        const isIndented = topic.startsWith("  ");
                        const label = topic.trim();
                        return (
                          <div
                            key={i}
                            className={`text-xs py-1 px-2 rounded text-muted-foreground ${isIndented ? "pl-5" : "font-medium text-foreground"}`}
                          >
                            {label}
                          </div>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              );
            })}

            <div className="border-t border-border/30 mt-4 pt-4">
              <button
                onClick={() => navigate("/hub/fca-rl")}
                className="block w-full text-left text-xs py-2 px-3 rounded text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors"
              >
                <span className="font-bold text-primary mr-1.5">+</span>
                FCA + RL для NPC
              </button>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <article className="flex-1 max-w-4xl">
          <CollapsibleParts />

          {/* Literature */}
          <section className="mt-20 p-6 rounded-lg bg-card/40 border border-border/30">
            <h3 className="text-lg font-semibold text-foreground mb-3">📚 Литература</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Sutton, R. S., & Barto, A. G. (2018). <em>Reinforcement Learning: An Introduction.</em> MIT Press.</li>
              <li>Mnih, V., et al. (2015). Human-level control through deep RL. <em>Nature</em>, 518, 529–533.</li>
              <li>Schulman, J., et al. (2017). Proximal Policy Optimization Algorithms. <em>arXiv:1707.06347</em>.</li>
              <li>Goodfellow, I., et al. (2016). <em>Deep Learning.</em> MIT Press.</li>
              <li>Bertsekas, D. P. (2017). <em>Dynamic Programming and Optimal Control.</em> Athena Scientific.</li>
            </ol>
          </section>

          {/* Footer Navigation */}
          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <Button variant="outline" onClick={() => navigate("/")} className="border-primary/50 text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" /> На главную
            </Button>
            <Button variant="outline" onClick={() => navigate("/courses")} className="border-secondary/50 text-secondary">
              Перейти к курсам
            </Button>
            <Button variant="outline" onClick={() => navigate("/hub/fca-rl")} className="border-accent/50 text-accent">
              FCA + RL для NPC →
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default MathRL;
