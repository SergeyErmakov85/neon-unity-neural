import LessonLayout from "@/components/LessonLayout";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Quiz from "@/components/Quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Brain, Target, Eye, Gift, Gamepad2 } from "lucide-react";
import CrossLinkToHub from "@/components/CrossLinkToHub";

const rlCycleSteps = [
  { label: "Агент", sub: "принимает решение", icon: Brain, color: "text-primary" },
  { label: "Действие", sub: "выполняет action", icon: Target, color: "text-secondary" },
  { label: "Среда", sub: "изменяет состояние", icon: Gamepad2, color: "text-accent" },
  { label: "Наблюдение", sub: "новое состояние + награда", icon: Eye, color: "text-green-400" },
];

const quizQuestions = [
  {
    question: "Какой тип машинного обучения использует функцию награды для обучения агента?",
    options: [
      "Supervised Learning",
      "Unsupervised Learning",
      "Reinforcement Learning",
      "Semi-supervised Learning",
    ],
    correctIndex: 2,
  },
  {
    question: "Что такое MDP в контексте RL?",
    options: [
      "Multi-Dimensional Programming",
      "Markov Decision Process",
      "Maximum Data Processing",
      "Minimum Distance Protocol",
    ],
    correctIndex: 1,
  },
  {
    question: "Что определяет параметр γ (gamma) в RL?",
    options: [
      "Скорость обучения",
      "Размер батча",
      "Дисконтирование будущих наград",
      "Количество эпизодов",
    ],
    correctIndex: 2,
  },
  {
    question: "Какой компонент MDP описывает вероятность перехода между состояниями?",
    options: [
      "Policy (π)",
      "Reward function (R)",
      "Transition function (T)",
      "Value function (V)",
    ],
    correctIndex: 2,
  },
];

const CourseLesson1_1 = () => {
  return (
    <LessonLayout
      lessonId="1-1"
      lessonTitle="Что такое обучение с подкреплением?"
      lessonNumber="1.1"
      duration="25 мин"
      tags={["#theory", "#basics"]}
      nextLesson={{ path: "/courses/1-2", title: "Установка окружения" }}
    >
      {/* Intro */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Место RL в машинном обучении</h2>
        <p className="text-muted-foreground leading-relaxed">
          Машинное обучение делится на три основных парадигмы. Каждая решает задачи по-своему:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[
            {
              title: "Supervised Learning",
              desc: "Учитель даёт правильные ответы. Модель учится на размеченных данных.",
              example: "Классификация изображений, перевод текста",
              active: false,
            },
            {
              title: "Unsupervised Learning",
              desc: "Нет правильных ответов. Модель ищет скрытые паттерны в данных.",
              example: "Кластеризация, уменьшение размерности",
              active: false,
            },
            {
              title: "Reinforcement Learning",
              desc: "Агент учится методом проб и ошибок, получая награды за действия.",
              example: "Игры, робототехника, навигация",
              active: true,
            },
          ].map((item, i) => (
            <Card
              key={i}
              className={`bg-card/60 backdrop-blur-sm transition-all ${
                item.active
                  ? "border-primary/50 shadow-[0_0_20px_hsl(180_100%_50%/0.15)]"
                  : "border-border/50"
              }`}
            >
              <CardContent className="p-4 space-y-2">
                <h3 className={`font-bold text-sm ${item.active ? "text-primary" : "text-foreground"}`}>
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
                <p className="text-xs text-muted-foreground/70 italic">Пример: {item.example}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* RL Cycle Diagram */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Цикл обучения с подкреплением</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          В основе RL лежит простой цикл взаимодействия агента со средой. На каждом шаге агент
          наблюдает состояние, выбирает действие, получает награду и переходит в новое состояние.
        </p>

        {/* Animated RL Cycle */}
        <div className="relative bg-card/40 rounded-xl border border-border/50 p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
            {rlCycleSteps.map((step, i) => (
              <div key={i} className="text-center space-y-3">
                <div className="relative mx-auto w-16 h-16">
                  <div className={`absolute inset-0 rounded-full bg-current opacity-10 ${step.color}`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <step.icon className={`w-7 h-7 ${step.color}`} />
                  </div>
                </div>
                <div>
                  <p className={`font-bold text-sm ${step.color}`}>{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.sub}</p>
                </div>
                {i < rlCycleSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -translate-y-1/2 text-muted-foreground/30 text-2xl"
                    style={{ left: `${(i + 1) * 25 - 3}%` }}
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <div className="px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-xs text-primary">
              ↻ Цикл повторяется каждый временной шаг t
            </div>
          </div>
        </div>
      </section>

      {/* MDP */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Формализм MDP</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong className="text-foreground"><CrossLinkToHub hubPath="/deep-rl" hubAnchor="foundations" hubTitle="Deep RL — Основы">Markov Decision Process (MDP)</CrossLinkToHub></strong> — математическая
          модель принятия решений в условиях неопределённости. MDP задаётся кортежем из пяти элементов:
        </p>

        <div className="space-y-3">
          {[
            { symbol: "S", name: "Состояния (States)", desc: "Множество всех возможных состояний среды. Например, позиция фигуры на доске." },
            { symbol: "A", name: "Действия (Actions)", desc: "Множество доступных действий агента. Например, движение вверх, вниз, влево, вправо." },
            { symbol: "R", name: "Награды (Rewards)", desc: "Сигнал обратной связи: R(s, a, s') — числовая оценка перехода." },
            { symbol: "T", name: "Переходы (Transitions)", desc: "T(s'|s,a) — вероятность перехода в состояние s' при действии a в состоянии s." },
            { symbol: "γ", name: <><CrossLinkToHub hubPath="/math-rl/module-1" hubTitle="Ряды и дисконтирование">Дисконт (Discount)</CrossLinkToHub></>, desc: "γ ∈ [0, 1] — насколько агент ценит будущие награды по сравнению с текущими (дисконтирование γ)." },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start p-3 rounded-lg bg-card/40 border border-border/30">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="font-mono font-bold text-primary text-sm">{item.symbol}</span>
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <CyberCodeBlock language="pseudo" filename="mdp_formalism.txt">
{`MDP = (S, A, T, R, γ)

# Цель агента: максимизировать суммарную дисконтированную награду
G_t = R_{t+1} + γ·R_{t+2} + γ²·R_{t+3} + ...
    = ∑ γ^k · R_{t+k+1}  where k = 0, 1, 2, ...

# Свойство Маркова: будущее зависит только от текущего состояния
P(s_{t+1} | s_t, a_t) = P(s_{t+1} | s_1, a_1, ..., s_t, a_t)`}
        </CyberCodeBlock>
      </section>

      {/* Real-world examples */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Примеры из реальных игр</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              game: "Шахматы (AlphaZero)",
              states: "Позиции фигур на доске",
              actions: "Возможные ходы",
              reward: "+1 за победу, -1 за проигрыш",
            },
            {
              game: "Atari (DQN)",
              states: "Пиксели экрана (210×160)",
              actions: "Кнопки джойстика",
              reward: "Очки в игре",
            },
            {
              game: "Навигация NPC",
              states: "Координаты, скорость, препятствия",
              actions: "Направление и скорость движения",
              reward: "+за достижение цели, -за столкновение",
            },
          ].map((ex, i) => (
            <Card key={i} className="bg-card/50 border-border/40">
              <CardContent className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-foreground">{ex.game}</h3>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p><span className="text-primary font-medium">S:</span> {ex.states}</p>
                  <p><span className="text-secondary font-medium">A:</span> {ex.actions}</p>
                  <p><span className="text-green-400 font-medium">R:</span> {ex.reward}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Dog analogy */}
      <section>
        <Card className="bg-card/40 border-primary/20">
          <CardContent className="p-6 flex gap-4 items-start">
            <Lightbulb className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="font-bold text-foreground">Интуитивная аналогия: дрессировка собаки 🐕</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Представьте, что вы дрессируете собаку. Собака — это <strong className="text-primary">агент</strong>.
                Комната — это <strong className="text-accent">среда</strong>. Команда «сидеть» — <strong className="text-secondary">действие</strong>.
                Лакомство — <strong className="text-green-400">награда</strong>.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Собака пробует разные действия. Когда она садится по команде, получает лакомство (+reward).
                Когда игнорирует — не получает ничего (0 reward). Со временем собака учится: выполнение
                команды → лакомство. Это и есть обучение с подкреплением!
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Key concepts */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Ключевые концепции</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { term: "Пространство состояний", desc: "Множество всех возможных состояний среды S. Определяет, что агент может наблюдать." },
            { term: "Пространство действий", desc: "Множество всех доступных действий A. Может быть дискретным (кнопки) или непрерывным (угол поворота)." },
            { term: "Мат. ожидание награды", desc: "𝔼[G_t] — среднее значение суммарной дисконтированной награды (математическое ожидание), которое агент стремится максимизировать." },
            { term: "MDP", desc: "Математическая модель: состояния, действия, переходы, награды, дисконт." },
            { term: "Policy (π)", desc: "Стратегия агента: π(a|s) — вероятность выбрать действие a в состоянии s." },
            { term: "Value Function (V)", desc: "V(s) — ожидаемая суммарная награда из состояния s при следовании политике π." },
            { term: "Reward Signal", desc: "Скалярный сигнал от среды, определяющий качество действия агента." },
            { term: "Environment", desc: "Всё, с чем взаимодействует агент. Определяет правила и динамику." },
          ].map((item, i) => (
            <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-muted/20 border border-border/30">
              <Gift className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-mono font-bold text-sm text-primary">{item.term}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <Quiz title="Проверь себя: Основы RL" questions={quizQuestions} />
    </LessonLayout>
  );
};

export default CourseLesson1_1;
