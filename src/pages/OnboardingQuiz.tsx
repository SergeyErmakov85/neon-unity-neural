import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Rocket, BookOpen, Code2, Gamepad2, Clock, Target, Sparkles } from "lucide-react";
import Navbar from "@/components/landing/Navbar";

interface QuizStep {
  id: string;
  question: string;
  icon: React.ReactNode;
  options: { value: string; label: string; description: string }[];
}

const steps: QuizStep[] = [
  {
    id: "programming",
    question: "Ваш опыт программирования",
    icon: <Code2 className="w-6 h-6 text-primary" />,
    options: [
      { value: "beginner", label: "Новичок (< 1 года)", description: "Знаю основы синтаксиса, пишу простые программы" },
      { value: "intermediate", label: "Средний (1–3 года)", description: "Уверенно пишу код, знаю ООП и базы данных" },
      { value: "advanced", label: "Продвинутый (3+ лет)", description: "Опыт коммерческой разработки, знаю несколько языков" },
    ],
  },
  {
    id: "ml",
    question: "Знакомы ли вы с машинным обучением?",
    icon: <Sparkles className="w-6 h-6 text-secondary" />,
    options: [
      { value: "none", label: "Нет, только слышал", description: "Знаю что такое AI, но не изучал детально" },
      { value: "basics", label: "Изучал основы", description: "Линейная регрессия, классификация, базовые модели" },
      { value: "neural", label: "Работал с нейросетями", description: "Опыт с PyTorch или TensorFlow, обучал модели" },
    ],
  },
  {
    id: "unity",
    question: "Ваш опыт с Unity",
    icon: <Gamepad2 className="w-6 h-6 text-accent" />,
    options: [
      { value: "none", label: "Не использовал", description: "Никогда не работал с Unity" },
      { value: "basic", label: "Делал простые проекты", description: "Создавал сцены, знаю основы C# в Unity" },
      { value: "experienced", label: "Опытный Unity-разработчик", description: "Публиковал проекты, знаю систему компонентов" },
    ],
  },
  {
    id: "goal",
    question: "Ваша цель",
    icon: <Target className="w-6 h-6 text-primary" />,
    options: [
      { value: "general", label: "Понять основы RL", description: "Хочу понять основы для общего развития" },
      { value: "gamedev", label: "Умные NPC в играх", description: "Хочу добавить умных агентов в свою игру" },
      { value: "research", label: "Академический интерес", description: "Исследовательская деятельность, публикации" },
      { value: "career", label: "Карьера в AI/ML", description: "Хочу работать в области искусственного интеллекта" },
    ],
  },
  {
    id: "time",
    question: "Сколько времени готовы уделять в неделю?",
    icon: <Clock className="w-6 h-6 text-secondary" />,
    options: [
      { value: "low", label: "2–3 часа", description: "Учусь в спокойном темпе, по выходным" },
      { value: "medium", label: "5–7 часов", description: "Стабильные занятия несколько раз в неделю" },
      { value: "high", label: "10+ часов", description: "Интенсивное погружение, максимальный фокус" },
    ],
  },
];

interface LearningPlan {
  startLevel: string;
  startLevelNum: number;
  duration: string;
  focus: string;
  focusDescription: string;
  firstLesson: string;
  firstLessonPath: string;
}

function generatePlan(answers: Record<string, string>): LearningPlan {
  const { programming, ml, unity, goal, time } = answers;

  // Determine start level
  let startLevelNum = 1;
  if (programming === "advanced" && (ml === "neural" || ml === "basics")) startLevelNum = 2;
  if (programming === "advanced" && ml === "neural" && unity !== "none") startLevelNum = 3;

  const levelNames: Record<number, string> = {
    1: "Уровень 1 — Основы RL",
    2: "Уровень 2 — Глубокое RL",
    3: "Уровень 3 — Multi-Agent & Unity",
  };

  // Duration based on time + level
  const lessonsRemaining = startLevelNum === 1 ? 18 : startLevelNum === 2 ? 12 : 7;
  const hoursPerWeek = time === "low" ? 2.5 : time === "medium" ? 6 : 10;
  const weeksNeeded = Math.ceil((lessonsRemaining * 1.5) / hoursPerWeek);
  const duration = weeksNeeded <= 4 ? `~${weeksNeeded} недели` : `~${Math.ceil(weeksNeeded / 4)} месяца`;

  // Focus
  let focus = "Сбалансированный";
  let focusDescription = "Теория и практика в равных пропорциях";
  if (goal === "research") {
    focus = "Теория и математика";
    focusDescription = "Углублённое изучение математических основ RL, уравнения Беллмана, policy gradient теоремы";
  } else if (goal === "gamedev") {
    focus = "Практика Unity";
    focusDescription = "Фокус на Unity ML-Agents, создание игровых сред и тренировка агентов в 3D-средах";
  } else if (goal === "career") {
    focus = "Полный стек RL";
    focusDescription = "Все алгоритмы + проекты для портфолио, подготовка к техническим интервью";
  }

  const lessonPaths: Record<number, string> = {
    1: "/courses/1-1",
    2: "/courses/2-1",
    3: "/courses/3-1",
  };

  const lessonNames: Record<number, string> = {
    1: "Урок 1.1 — Введение в RL",
    2: "Урок 2.1 — Deep Q-Networks",
    3: "Урок 3.1 — Multi-Agent RL",
  };

  return {
    startLevel: levelNames[startLevelNum],
    startLevelNum,
    duration,
    focus,
    focusDescription,
    firstLesson: lessonNames[startLevelNum],
    firstLessonPath: lessonPaths[startLevelNum],
  };
}

const OnboardingQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("rl-onboarding-complete");
    // Allow revisiting even if completed
  }, []);

  const progress = showResult ? 100 : ((currentStep + 1) / steps.length) * 100;
  const currentQuestion = steps[currentStep];
  const currentAnswer = answers[currentQuestion?.id];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleStart = (path: string) => {
    localStorage.setItem("rl-onboarding-complete", "true");
    localStorage.setItem("rl-onboarding-answers", JSON.stringify(answers));
    const plan = generatePlan(answers);
    localStorage.setItem("rl-onboarding-plan", JSON.stringify(plan));
    navigate(path);
  };

  const plan = showResult ? generatePlan(answers) : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-16 max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {showResult ? "Результат" : `Шаг ${currentStep + 1} из ${steps.length}`}
            </span>
            <span className="text-sm text-primary font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-muted" />
        </div>

        {!showResult ? (
          /* Question Card */
          <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                {currentQuestion.icon}
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  {currentQuestion.question}
                </h2>
              </div>

              <RadioGroup
                value={currentAnswer || ""}
                onValueChange={handleSelect}
                className="space-y-3"
              >
                {currentQuestion.options.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                      currentAnswer === opt.value
                        ? "border-primary bg-primary/10 shadow-[0_0_15px_hsl(var(--primary)/0.15)]"
                        : "border-border/50 hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    <RadioGroupItem value={opt.value} className="mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">{opt.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">{opt.description}</div>
                    </div>
                  </label>
                ))}
              </RadioGroup>

              <div className="flex justify-between mt-8">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Назад
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  className="gap-2 bg-gradient-neon"
                >
                  {currentStep === steps.length - 1 ? "Показать план" : "Далее"}{" "}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : plan ? (
          /* Result Card */
          <Card className="border-primary/30 bg-card/80 backdrop-blur-sm overflow-hidden">
            <div className="h-1 bg-gradient-neon" />
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-3">
                <Rocket className="w-14 h-14 text-primary mx-auto animate-pulse" />
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                  Ваш персональный план обучения
                </h2>
                <p className="text-muted-foreground">На основе ваших ответов мы подобрали оптимальный путь</p>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <BookOpen className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <div className="text-sm text-muted-foreground">Стартовый уровень</div>
                    <div className="font-semibold text-foreground">{plan.startLevel}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/5 border border-secondary/20">
                  <Clock className="w-8 h-8 text-secondary shrink-0" />
                  <div>
                    <div className="text-sm text-muted-foreground">Ориентировочный срок</div>
                    <div className="font-semibold text-foreground">{plan.duration}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
                  <Target className="w-8 h-8 text-accent shrink-0" />
                  <div>
                    <div className="text-sm text-muted-foreground">Персональный акцент</div>
                    <div className="font-semibold text-foreground">{plan.focus}</div>
                    <div className="text-sm text-muted-foreground mt-1">{plan.focusDescription}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-gradient-neon text-lg gap-2"
                  onClick={() => handleStart(plan.firstLessonPath)}
                >
                  <Rocket className="w-5 h-5" />
                  Начать с «{plan.firstLesson}»
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={handleBack}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Изменить ответы
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
};

export default OnboardingQuiz;
