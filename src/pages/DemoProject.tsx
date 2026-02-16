import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import FooterSection from "@/components/landing/FooterSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play, Download, Monitor, Terminal, Brain, BarChart3, FileCode, Cpu, Settings, Package, FlaskConical, Cog, Upload, ChevronRight } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Установка Unity и Unity Hub",
    description: "Скачивание и настройка Unity Editor нужной версии через Unity Hub.",
    icon: Monitor,
    color: "primary",
  },
  {
    number: 2,
    title: "Установка Anaconda и создание виртуального окружения",
    description: "Настройка изолированной Python-среды через conda для управления зависимостями.",
    icon: Terminal,
    color: "secondary",
  },
  {
    number: 3,
    title: "Установка Python и PyTorch",
    description: "Установка совместимой версии Python и PyTorch с поддержкой CUDA (GPU).",
    icon: Cpu,
    color: "accent",
  },
  {
    number: 4,
    title: "Установка пакетов ML-Agents",
    description: "Установка mlagents, mlagents-envs и связанных Python-пакетов через pip.",
    icon: Package,
    color: "primary",
  },
  {
    number: 5,
    title: "Создание Unity-проекта и импорт ML-Agents",
    description: "Инициализация нового проекта Unity и добавление ML-Agents Unity Package.",
    icon: Settings,
    color: "secondary",
  },
  {
    number: 6,
    title: "Создание окружения и агента",
    description: "Разработка сцены, написание C#-скрипта агента с наблюдениями и действиями.",
    icon: Cog,
    color: "accent",
  },
  {
    number: 7,
    title: "Настройка конфигурации обучения (YAML)",
    description: "Создание YAML-файла с гиперпараметрами алгоритма (PPO/SAC), наградами и параметрами сети.",
    icon: FileCode,
    color: "primary",
  },
  {
    number: 8,
    title: "Запуск обучения через CLI / Jupyter Notebook",
    description: "Запуск mlagents-learn из терминала или .ipynb ноутбука для старта тренировки агента.",
    icon: FlaskConical,
    color: "secondary",
  },
  {
    number: 9,
    title: "Мониторинг обучения в TensorBoard",
    description: "Визуализация метрик: cumulative reward, episode length, policy loss в реальном времени.",
    icon: BarChart3,
    color: "accent",
  },
  {
    number: 10,
    title: "Получение ONNX-модели",
    description: "После завершения обучения — экспорт обученной нейросети в формат .onnx.",
    icon: Brain,
    color: "primary",
  },
  {
    number: 11,
    title: "Импорт ONNX в Unity и тестирование",
    description: "Загрузка .onnx файла в Unity, привязка к агенту и запуск inference-режима.",
    icon: Upload,
    color: "secondary",
  },
  {
    number: 12,
    title: "Анализ результатов и итерация",
    description: "Оценка поведения агента, корректировка наград и гиперпараметров, повторное обучение.",
    icon: BarChart3,
    color: "accent",
  },
];

const colorMap: Record<string, string> = {
  primary: "border-primary/30 bg-primary/5",
  secondary: "border-secondary/30 bg-secondary/5",
  accent: "border-accent/30 bg-accent/5",
};

const iconColorMap: Record<string, string> = {
  primary: "text-primary bg-primary/10",
  secondary: "text-secondary bg-secondary/10",
  accent: "text-accent bg-accent/10",
};

const DemoProject = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Back link */}
          <Link to="/#demo">
            <Button variant="ghost" className="mb-8 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Назад на главную
            </Button>
          </Link>

          {/* Video Demo Section */}
          <section className="mb-20">
            <div className="text-center mb-8 space-y-3">
              <h1 className="text-3xl md:text-5xl font-bold">
                <span className="text-foreground">Демо: </span>
                <span className="bg-gradient-neon bg-clip-text text-transparent">
                  Обученный агент в действии
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Посмотрите, как агент, обученный с помощью PyTorch и Unity ML-Agents, решает задачу в среде Unity
              </p>
            </div>

            <Card className="bg-card/60 backdrop-blur-sm border-primary/30 overflow-hidden max-w-4xl mx-auto">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-cyber-dark to-cyber-darker flex items-center justify-center relative group cursor-pointer">
                  <div className="absolute inset-0 opacity-20">
                    <div className="h-full w-full bg-[linear-gradient(to_right,#00f0ff10_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff10_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                  </div>
                  <div className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/30 transition-all duration-300 shadow-glow-cyan">
                    <Play className="w-10 h-10 text-primary ml-1" />
                  </div>
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border/50">
                    <span className="text-sm text-foreground">Видео будет добавлено</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Steps Pipeline */}
          <section>
            <div className="text-center mb-12 space-y-3">
              <h2 className="text-2xl md:text-4xl font-bold">
                <span className="text-foreground">Этапы </span>
                <span className="bg-gradient-neon bg-clip-text text-transparent">
                  реализации проекта
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Последовательный путь от установки инструментов до работающего RL-агента
              </p>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-accent/50" />

              <div className="space-y-6">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.number} className="relative pl-16 md:pl-20">
                      {/* Circle on timeline */}
                      <div className={`absolute left-3 md:left-5 top-6 w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                        step.color === "primary" ? "border-primary bg-primary/20 text-primary" :
                        step.color === "secondary" ? "border-secondary bg-secondary/20 text-secondary" :
                        "border-accent bg-accent/20 text-accent"
                      }`}>
                        {step.number}
                      </div>

                      <Card className={`${colorMap[step.color]} backdrop-blur-sm transition-all duration-300 hover:scale-[1.01]`}>
                        <CardHeader className="pb-2 flex flex-row items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconColorMap[step.color]}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <CardTitle className="text-lg text-foreground">{step.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                          <Button variant="ghost" size="sm" className="mt-3 gap-1 text-xs opacity-50 cursor-default">
                            Скоро будет доступно
                            <ChevronRight className="w-3 h-3" />
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default DemoProject;
