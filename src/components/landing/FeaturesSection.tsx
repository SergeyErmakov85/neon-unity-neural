import { useState } from "react";
import { Code2, Gamepad2, LineChart, BookOpen, Layers, Cpu, FileCode2 } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "PyTorch RL",
    description: "Полные реализации DQN, PPO, SAC с нуля. Чистый код с подробными комментариями",
    hsl: "0, 70%, 65%",       // coral
  },
  {
    icon: Gamepad2,
    title: "Unity ML-Agents",
    description: "Готовые проекты для Unity с настроенными средами. Обучайте агентов в 3D-играх",
    hsl: "35, 85%, 60%",      // orange
  },
  {
    icon: LineChart,
    title: "Визуализация",
    description: "Интерактивные графики и анимации для функций потерь, градиентов и оптимизации",
    hsl: "70, 60%, 55%",      // yellow-green
  },
  {
    icon: Cpu,
    title: "Оптимизация",
    description: "Параллельные среды, GPU-обучение, гиперпараметры. Эффективное использование ресурсов",
    hsl: "160, 55%, 50%",     // teal
  },
  {
    icon: BookOpen,
    title: "Проекты",
    description: "От простых задач до сложных игровых сценариев. Каждый проект — законченное решение",
    hsl: "210, 70%, 65%",     // blue
  },
  {
    icon: Layers,
    title: "Архитектура",
    description: "Переиспользуемые компоненты: буферы опыта, нейросети, функции вознаграждения",
    hsl: "280, 55%, 65%",     // purple
  },
];

const centerFeature = {
  icon: FileCode2,
  title: "Jupyter",
  description: "Рабочие .ipynb-файлы: Taxi-v3, FoodCollector REINFORCE. Скачай и запусти",
};

// 6 circles around center, like the flower-of-life
const getCirclePosition = (index: number, radius: number) => {
  const angle = (index * 60 - 90) * (Math.PI / 180);
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
};

const FeaturesSection = () => {
  const [active, setActive] = useState<number | null>(null);
  const CenterIcon = centerFeature.icon;

  return (
    <section id="features" className="py-20 px-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16 space-y-4">
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

        {/* Desktop: Flower of Life layout */}
        <div className="hidden md:block">
          <div className="relative mx-auto" style={{ width: 560, height: 520 }}>
            {/* Outer 6 circles */}
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const pos = getCirclePosition(index, 140);
              const isActive = active === index;
              const size = 220;

              return (
                <div
                  key={index}
                  className="absolute cursor-pointer transition-all duration-500 ease-out group"
                  style={{
                    width: size,
                    height: size,
                    left: `calc(50% + ${pos.x}px - ${size / 2}px)`,
                    top: `calc(50% + ${pos.y}px - ${size / 2}px)`,
                    zIndex: isActive ? 20 : 10 - index,
                  }}
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                >
                  <div
                    className="w-full h-full rounded-full flex flex-col items-center justify-center text-center p-6 transition-all duration-500 border-2"
                    style={{
                      background: isActive
                        ? `hsla(${feature.hsl}, 0.35)`
                        : `hsla(${feature.hsl}, 0.15)`,
                      borderColor: isActive
                        ? `hsla(${feature.hsl}, 0.8)`
                        : `hsla(${feature.hsl}, 0.4)`,
                      boxShadow: isActive
                        ? `0 0 40px hsla(${feature.hsl}, 0.4), inset 0 0 30px hsla(${feature.hsl}, 0.1)`
                        : `0 0 15px hsla(${feature.hsl}, 0.1)`,
                      transform: isActive ? "scale(1.08)" : "scale(1)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Icon
                      className="w-7 h-7 mb-2 transition-transform duration-300"
                      style={{
                        color: `hsl(${feature.hsl})`,
                        filter: isActive ? `drop-shadow(0 0 8px hsla(${feature.hsl}, 0.6))` : "none",
                      }}
                    />
                    <span
                      className="text-sm font-bold leading-tight"
                      style={{ color: `hsl(${feature.hsl})` }}
                    >
                      {feature.title}
                    </span>
                    <span
                      className="text-xs mt-1 leading-snug transition-opacity duration-300 max-w-[140px]"
                      style={{
                        color: `hsla(${feature.hsl}, 0.8)`,
                        opacity: isActive ? 1 : 0,
                        maxHeight: isActive ? 60 : 0,
                        overflow: "hidden",
                      }}
                    >
                      {feature.description}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Center circle */}
            <div
              className="absolute cursor-pointer transition-all duration-500"
              style={{
                width: 140,
                height: 140,
                left: "calc(50% - 70px)",
                top: "calc(50% - 70px)",
                zIndex: active === 6 ? 30 : 5,
              }}
              onMouseEnter={() => setActive(6)}
              onMouseLeave={() => setActive(null)}
            >
              <div
                className="w-full h-full rounded-full flex flex-col items-center justify-center text-center transition-all duration-500 border-2"
                style={{
                  background: active === 6
                    ? "hsla(142, 60%, 50%, 0.35)"
                    : "hsla(142, 60%, 50%, 0.12)",
                  borderColor: active === 6
                    ? "hsla(142, 60%, 50%, 0.8)"
                    : "hsla(142, 60%, 50%, 0.4)",
                  boxShadow: active === 6
                    ? "0 0 40px hsla(142, 60%, 50%, 0.4), inset 0 0 20px hsla(142, 60%, 50%, 0.1)"
                    : "0 0 10px hsla(142, 60%, 50%, 0.1)",
                  transform: active === 6 ? "scale(1.1)" : "scale(1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <CenterIcon
                  className="w-6 h-6 mb-1"
                  style={{
                    color: "hsl(142, 60%, 50%)",
                    filter: active === 6 ? "drop-shadow(0 0 8px hsla(142, 60%, 50%, 0.6))" : "none",
                  }}
                />
                <span className="text-xs font-bold" style={{ color: "hsl(142, 60%, 50%)" }}>
                  {centerFeature.title}
                </span>
              </div>
            </div>
          </div>

          {/* Description below on hover */}
          <div className="h-16 mt-6 text-center transition-opacity duration-300">
            {active !== null && (
              <p className="text-muted-foreground text-base max-w-md mx-auto animate-in fade-in duration-300">
                {active === 6 ? centerFeature.description : features[active]?.description}
              </p>
            )}
          </div>
        </div>

        {/* Mobile: Grid of circles */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-300"
                style={{
                  background: `hsla(${feature.hsl}, 0.1)`,
                  borderColor: `hsla(${feature.hsl}, 0.3)`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
                  style={{ background: `hsla(${feature.hsl}, 0.2)` }}
                >
                  <Icon className="w-6 h-6" style={{ color: `hsl(${feature.hsl})` }} />
                </div>
                <span className="text-sm font-bold text-foreground mb-1">{feature.title}</span>
                <span className="text-xs text-muted-foreground leading-snug">{feature.description}</span>
              </div>
            );
          })}
          {/* Center feature on mobile */}
          <div
            className="col-span-2 flex flex-col items-center text-center p-4 rounded-2xl border transition-all duration-300"
            style={{
              background: "hsla(142, 60%, 50%, 0.1)",
              borderColor: "hsla(142, 60%, 50%, 0.3)",
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
              style={{ background: "hsla(142, 60%, 50%, 0.2)" }}
            >
              <CenterIcon className="w-6 h-6" style={{ color: "hsl(142, 60%, 50%)" }} />
            </div>
            <span className="text-sm font-bold text-foreground mb-1">{centerFeature.title}</span>
            <span className="text-xs text-muted-foreground leading-snug">{centerFeature.description}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
