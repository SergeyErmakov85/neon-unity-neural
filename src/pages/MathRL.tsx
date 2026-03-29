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
              return (
                <button
                  key={part.id}
                  onClick={() => document.getElementById(part.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className={`block w-full text-left text-xs py-2 px-3 rounded text-muted-foreground hover:text-foreground hover:${c.bg} transition-colors`}
                >
                  <span className={`font-bold ${c.text} mr-1.5`}>{part.num}.</span>
                  {part.title}
                </button>
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
