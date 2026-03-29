import { BookX, Unlink, Brain, AlertTriangle, FileX } from "lucide-react";
import { useState } from "react";

const problems = [
  {
    icon: BookX,
    title: "Слишком много сухой теории",
    description: "Учебники переполнены формулами и математикой, но не объясняют, как применить их на практике",
    gradient: "from-yellow-500/20 to-orange-500/20",
    border: "border-yellow-500/40",
    glow: "shadow-[0_0_30px_rgba(234,179,8,0.15)]",
    glowHover: "hover:shadow-[0_0_40px_rgba(234,179,8,0.3)]",
    iconBg: "bg-yellow-500/15",
    iconColor: "text-yellow-400",
    titleColor: "text-yellow-300",
  },
  {
    icon: Unlink,
    title: "Код оторван от результатов",
    description: "Вы пишете код, но не видите, как он влияет на поведение агента в реальной среде",
    gradient: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/40",
    glow: "shadow-[0_0_30px_rgba(249,115,22,0.15)]",
    glowHover: "hover:shadow-[0_0_40px_rgba(249,115,22,0.3)]",
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
    titleColor: "text-orange-300",
  },
  {
    icon: Brain,
    title: "Сложность алгоритмов",
    description: "PPO, SAC, DQN — аббревиатуры путают, а реализации кажутся недоступными",
    gradient: "from-amber-500/20 to-yellow-600/20",
    border: "border-amber-500/40",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    glowHover: "hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
    titleColor: "text-amber-300",
  },
  {
    icon: AlertTriangle,
    title: "Отсутствие практики",
    description: "Нет пошаговых проектов, где можно увидеть результат своего обучения",
    gradient: "from-red-500/20 to-rose-500/20",
    border: "border-red-500/40",
    glow: "shadow-[0_0_30px_rgba(239,68,68,0.15)]",
    glowHover: "hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]",
    iconBg: "bg-red-500/15",
    iconColor: "text-red-400",
    titleColor: "text-red-300",
  },
  {
    icon: FileX,
    title: "Нет реального кода",
    description: "Туториалы показывают теорию, но готовый воспроизводимый код для Unity ML-Agents с PyTorch найти сложно. Нужны рабочие ноутбуки, а не псевдокод.",
    gradient: "from-orange-600/20 to-amber-500/20",
    border: "border-orange-600/40",
    glow: "shadow-[0_0_30px_rgba(234,88,12,0.15)]",
    glowHover: "hover:shadow-[0_0_40px_rgba(234,88,12,0.3)]",
    iconBg: "bg-orange-600/15",
    iconColor: "text-orange-500",
    titleColor: "text-orange-300",
  },
];

/* SVG puzzle-piece clip paths — each piece has unique tab/blank combos */
const puzzleClips = [
  // Top-left: right tab, bottom tab
  `M0,0 H90 
   C90,0 90,25 100,25 C110,25 110,0 110,0 H200 
   V90 C200,90 175,90 175,100 C175,110 200,110 200,110 V200 
   H0 V0Z`,
  // Top-right: left blank, bottom tab  
  `M0,0 H200 V200 
   H110 C110,200 110,175 100,175 C90,175 90,200 90,200 H0 
   V110 C0,110 25,110 25,100 C25,90 0,90 0,90 V0Z`,
  // Middle-left: right tab, top blank
  `M0,0 H90 
   C90,0 90,25 100,25 C110,25 110,0 110,0 H200 
   V200 H0 
   V110 C0,110 25,110 25,100 C25,90 0,90 0,90 V0Z`,
  // Middle-right: left blank, bottom blank
  `M0,0 H200 V90 
   C200,90 175,90 175,100 C175,110 200,110 200,110 V200 
   H0 V110 
   C0,110 25,110 25,100 C25,90 0,90 0,90 V0Z`,
  // Bottom-center: top blank, wider
  `M0,0 H200 V200 H0 V110 
   C0,110 25,110 25,100 C25,90 0,90 0,90 V0Z`,
];

const PuzzlePiece = ({
  problem,
  index,
}: {
  problem: (typeof problems)[0];
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const Icon = problem.icon;

  // Scattered positions for puzzle feel
  const positions = [
    { rotate: "-3deg", x: "0", y: "0" },
    { rotate: "2deg", x: "4px", y: "-6px" },
    { rotate: "-2deg", x: "-3px", y: "8px" },
    { rotate: "3deg", x: "6px", y: "-4px" },
    { rotate: "-1deg", x: "-2px", y: "4px" },
  ];

  const pos = positions[index];

  return (
    <div
      className={`relative group cursor-default transition-all duration-500 ease-out ${problem.glow} ${problem.glowHover}`}
      style={{
        transform: hovered
          ? "rotate(0deg) translate(0, 0) scale(1.03)"
          : `rotate(${pos.rotate}) translate(${pos.x}, ${pos.y})`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Puzzle piece shape via SVG clip + border glow */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id={`puzzle-${index}`} clipPathUnits="objectBoundingBox">
            {/* simplified rectangular clips with notches */}
          </clipPath>
        </defs>
        <path
          d={puzzleClips[index]}
          fill="none"
          stroke={
            index === 0
              ? "rgba(234,179,8,0.35)"
              : index === 1
                ? "rgba(249,115,22,0.35)"
                : index === 2
                  ? "rgba(245,158,11,0.35)"
                  : index === 3
                    ? "rgba(239,68,68,0.35)"
                    : "rgba(234,88,12,0.35)"
          }
          strokeWidth="2"
          className="transition-all duration-500"
          style={{
            filter: hovered ? `drop-shadow(0 0 8px ${
              index === 0
                ? "rgba(234,179,8,0.5)"
                : index === 1
                  ? "rgba(249,115,22,0.5)"
                  : index === 2
                    ? "rgba(245,158,11,0.5)"
                    : index === 3
                      ? "rgba(239,68,68,0.5)"
                      : "rgba(234,88,12,0.5)"
            })` : "none",
          }}
        />
      </svg>

      {/* Card content */}
      <div
        className={`relative rounded-2xl bg-gradient-to-br ${problem.gradient} border ${problem.border} backdrop-blur-sm p-6 md:p-7 h-full transition-all duration-500`}
        style={{
          clipPath: `url(#puzzle-clip-${index})`,
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex-shrink-0 w-11 h-11 rounded-xl ${problem.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
          >
            <Icon className={`w-5 h-5 ${problem.iconColor}`} />
          </div>
          <div className="space-y-2 min-w-0">
            <h3 className={`text-base md:text-lg font-bold ${problem.titleColor}`}>
              {problem.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {problem.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProblemSection = () => {
  return (
    <section id="problem" className="py-20 px-4 relative overflow-hidden" style={{ background: "radial-gradient(ellipse at center, hsl(0 30% 8%), hsl(var(--background)))" }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, rgba(249,115,22,0.6), transparent 70%)" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/30 mb-4">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm text-destructive font-medium">Знакомые проблемы?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-foreground">Почему изучение </span>
            <span className="text-destructive">RL так сложно?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Многие разработчики сталкиваются с одними и теми же препятствиями
          </p>
        </div>

        {/* Puzzle grid — scattered layout */}
        <div className="max-w-5xl mx-auto">
          {/* Row 1: two pieces */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-5 md:mb-3">
            <PuzzlePiece problem={problems[0]} index={0} />
            <PuzzlePiece problem={problems[1]} index={1} />
          </div>
          {/* Row 2: two pieces offset */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 md:px-8 mb-5 md:mb-3">
            <PuzzlePiece problem={problems[2]} index={2} />
            <PuzzlePiece problem={problems[3]} index={3} />
          </div>
          {/* Row 3: one centered piece */}
          <div className="max-w-lg mx-auto">
            <PuzzlePiece problem={problems[4]} index={4} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
