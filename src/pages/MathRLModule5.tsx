import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Brain, BarChart3, GitBranch, Code2, Lightbulb, TrendingUp, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Math from "@/components/Math";

const MathRLModule5 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/math-rl")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            К модулям
          </Button>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/10 text-secondary">Модуль 5</span>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-neon bg-clip-text text-transparent">
            Учебное пособие по математике и глубокому обучению с подкреплением
          </span>
        </h1>
        <p className="text-muted-foreground mb-4 text-lg">
          Комплексное пособие, интегрирующее все математические основы (модули 1–4) в единую систему знаний для глубокого обучения с подкреплением
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">Модуль 1: Анализ</span>
          <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary">Модуль 2: Линейная алгебра</span>
          <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent">Модуль 3: Вероятность и MDP</span>
          <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary">Модуль 4: Оптимизация</span>
        </div>

        {/* ============================================================ */}
        {/* CHAPTER 1: Introduction to Deep RL */}
        {/* ============================================================ */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 pb-3 border-b border-primary/30">
            Глава 1. Введение в глубокое обучение с подкреплением
          </h2>

          <Section icon={<BookOpen className="w-5 h-5 text-primary" />} title="1.1 Основные понятия: агент, среда, награда, состояние, действие">
            <p>
              <strong className="text-foreground">Глубокое обучение с подкреплением (Deep RL)</strong> объединяет методы обучения с подкреплением с возможностями глубоких нейронных сетей. Эта комбинация позволяет решать сложные задачи принятия решений в условиях неопределённости.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Ключевые компоненты</h3>
            <ul className="list-disc list-inside space-y-3">
              <li><strong className="text-foreground">Агент (Agent)</strong> — сущность, которая принимает решения и выполняет действия. Цель — максимизировать накопленное вознаграждение путём выбора оптимальных действий.</li>
              <li><strong className="text-foreground">Среда (Environment)</strong> — внешний мир, реальный или виртуальный, с которым взаимодействует агент. Среда реагирует на действия, изменяя состояние и предоставляя вознаграждение.</li>
              <li><strong className="text-foreground">Состояние (State)</strong> — представление текущей ситуации в среде. Может быть <em>полностью наблюдаемым</em> или <em>частично наблюдаемым</em> (POMDP).</li>
              <li><strong className="text-foreground">Действие (Action)</strong> — операция агента. Пространство действий может быть <em>дискретным</em> (конечное число вариантов) или <em>непрерывным</em> (диапазон значений).</li>
              <li><strong className="text-foreground">Награда (Reward)</strong> — числовой сигнал обратной связи от среды. Ключевой механизм, указывающий на качество выбранного действия.</li>
              <li><strong className="text-foreground">Политика (Policy)</strong> — стратегия выбора действий. Может быть <em>детерминированной</em> или <em>стохастической</em>.</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Цикл взаимодействия</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>Агент получает состояние <Math display={false}>{`s_t`}</Math></li>
              <li>Выбирает действие <Math display={false}>{`a_t`}</Math> согласно политике</li>
              <li>Среда переходит в новое состояние <Math display={false}>{`s_{t+1}`}</Math></li>
              <li>Агент получает награду <Math display={false}>{`r_t`}</Math></li>
              <li>Процесс повторяется</li>
            </ol>

            <InfoBox color="primary" title="Эпизоды и траектории">
              <p className="text-sm">
                <strong className="text-foreground">Эпизод</strong> — последовательность от начального до терминального состояния (например, одна партия в шахматы).{" "}
                <strong className="text-foreground">Траектория</strong> <Math display={false}>{`\\tau = (s_0, a_0, r_1, s_1, a_1, r_2, \\ldots)`}</Math> — полная запись взаимодействия.
              </p>
            </InfoBox>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Особенности Deep RL</h3>
            <p>Глубокие нейронные сети используются для аппроксимации:</p>
            <ol className="list-decimal list-inside space-y-2 mt-3">
              <li><strong className="text-foreground">Функции ценности</strong> — оценка ожидаемой будущей награды в каждом состоянии</li>
              <li><strong className="text-foreground">Политики</strong> — прямая параметризация выбора действий</li>
              <li><strong className="text-foreground">Модели среды</strong> — предсказание следующего состояния и награды</li>
            </ol>
          </Section>

          <Section icon={<Brain className="w-5 h-5 text-secondary" />} title="1.2 Формализация задачи RL: MDP и уравнение Беллмана">
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Марковский процесс принятия решений (MDP)</h3>
            <p>MDP определяется кортежем:</p>
            <Math>{`(\\mathcal{S},\\; \\mathcal{A},\\; P,\\; R,\\; \\gamma)`}</Math>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li><Math display={false}>{`\\mathcal{S}`}</Math> — конечное множество состояний</li>
              <li><Math display={false}>{`\\mathcal{A}`}</Math> — конечное множество действий</li>
              <li><Math display={false}>{`P: \\mathcal{S} \\times \\mathcal{A} \\times \\mathcal{S} \\to [0,1]`}</Math> — функция вероятности перехода</li>
              <li><Math display={false}>{`R: \\mathcal{S} \\times \\mathcal{A} \\times \\mathcal{S} \\to \\mathbb{R}`}</Math> — функция вознаграждения</li>
              <li><Math display={false}>{`\\gamma \\in [0,1]`}</Math> — коэффициент дисконтирования</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Марковское свойство</h3>
            <p>Будущее зависит только от текущего состояния и действия:</p>
            <Math>{`P(s_{t+1}|s_t, a_t, s_{t-1}, a_{t-1}, \\ldots, s_0, a_0) = P(s_{t+1}|s_t, a_t)`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Функция ценности состояния</h3>
            <Math>{`V^\\pi(s) = \\mathbb{E}_\\pi\\left[\\sum_{t=0}^{\\infty} \\gamma^t R_{t+1} \\;\\middle|\\; S_0 = s\\right]`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Функция ценности действия</h3>
            <Math>{`Q^\\pi(s, a) = \\mathbb{E}_\\pi\\left[\\sum_{t=0}^{\\infty} \\gamma^t R_{t+1} \\;\\middle|\\; S_0 = s, A_0 = a\\right]`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Уравнение Беллмана для <Math display={false}>{`V^\\pi`}</Math></h3>
            <Math>{`V^\\pi(s) = \\sum_{a \\in \\mathcal{A}} \\pi(a|s) \\sum_{s' \\in \\mathcal{S}} P(s'|s,a)\\bigl[R(s,a,s') + \\gamma\\, V^\\pi(s')\\bigr]`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Уравнение Беллмана для <Math display={false}>{`Q^\\pi`}</Math></h3>
            <Math>{`Q^\\pi(s,a) = \\sum_{s'} P(s'|s,a)\\left[R(s,a,s') + \\gamma \\sum_{a'} \\pi(a'|s')\\, Q^\\pi(s',a')\\right]`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Уравнения оптимальности Беллмана</h3>
            <Math>{`V^*(s) = \\max_{a \\in \\mathcal{A}} \\sum_{s'} P(s'|s,a)\\bigl[R(s,a,s') + \\gamma\\, V^*(s')\\bigr]`}</Math>
            <Math>{`Q^*(s,a) = \\sum_{s'} P(s'|s,a)\\left[R(s,a,s') + \\gamma \\max_{a'} Q^*(s',a')\\right]`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Оптимальная политика</h3>
            <Math>{`\\pi^*(s) = \\arg\\max_{a \\in \\mathcal{A}} Q^*(s,a)`}</Math>

            <InfoBox color="secondary" title="Практическое значение уравнения Беллмана">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Теоретическая основа</strong> — математический фундамент для анализа задач RL</li>
                <li><strong className="text-foreground">Алгоритмическая основа</strong> — Value Iteration, Policy Iteration, Q-learning</li>
                <li><strong className="text-foreground">Связь с динамическим программированием</strong> — итеративное решение через рекурсию</li>
              </ul>
            </InfoBox>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Ограничения MDP</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong className="text-foreground">Размерность</strong> — для больших или непрерывных пространств точное решение невозможно</li>
              <li><strong className="text-foreground">Неизвестная модель</strong> — функции <Math display={false}>{`P`}</Math> и <Math display={false}>{`R`}</Math> часто неизвестны (model-free методы)</li>
              <li><strong className="text-foreground">Частичная наблюдаемость</strong> — POMDP требуют байесовского вывода</li>
            </ol>
          </Section>

          <Section icon={<Lightbulb className="w-5 h-5 text-accent" />} title="1.3 Обзор алгоритмов RL">
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Q-learning: табличный метод</h3>
            <p>
              Q-learning (Уоткинс, 1989) — фундаментальный off-policy алгоритм класса временных различий (TD). Итеративно обновляет оценки Q-функции по формуле:
            </p>
            <Math>{`Q(s,a) \\leftarrow Q(s,a) + \\alpha\\bigl[r + \\gamma \\max_{a'} Q(s',a') - Q(s,a)\\bigr]`}</Math>
            <p className="mt-3">
              где <Math display={false}>{`\\alpha`}</Math> — скорость обучения, <Math display={false}>{`\\gamma`}</Math> — коэффициент дисконтирования.
            </p>

            <InfoBox color="primary" title="Сходимость Q-learning">
              <p className="text-sm">
                Доказано, что при бесконечном посещении всех пар (s, a) и убывающей скорости обучения Q-learning сходится к оптимальной <Math display={false}>{`Q^*(s,a)`}</Math> независимо от политики исследования.
              </p>
            </InfoBox>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Deep Q-Network (DQN)</h3>
            <p>DQN (DeepMind, 2013–2015) заменяет Q-таблицу глубокой нейронной сетью <Math display={false}>{`Q(s,a;\\theta)`}</Math>. Ключевые компоненты:</p>
            <ol className="list-decimal list-inside space-y-2 mt-3">
              <li><strong className="text-foreground">Аппроксимация нейронной сетью:</strong> <Math display={false}>{`Q(s,a;\\theta)`}</Math></li>
              <li><strong className="text-foreground">Experience Replay:</strong> буфер переходов <Math display={false}>{`(s,a,r,s')`}</Math> для стабилизации обучения</li>
              <li><strong className="text-foreground">Target Network:</strong> отдельная сеть <Math display={false}>{`Q(s,a;\\theta^-)`}</Math>, обновляемая реже</li>
            </ol>
            <p className="mt-4">Функция потерь DQN:</p>
            <Math>{`L(\\theta) = \\frac{1}{N} \\sum_j \\bigl(y_j - Q(s_j, a_j; \\theta)\\bigr)^2`}</Math>
            <p>где целевое значение:</p>
            <Math>{`y_j = r_j + \\gamma \\max_{a'} Q(s'_j, a'; \\theta^-)`}</Math>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Улучшения DQN</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-foreground">Double DQN</strong> — разделяет выбор и оценку действия для борьбы с переоценкой</li>
              <li><strong className="text-foreground">Dueling DQN</strong> — разделяет <Math display={false}>{`Q = V(s) + A(s,a)`}</Math></li>
              <li><strong className="text-foreground">Prioritized Experience Replay</strong> — выборка пропорционально TD-ошибке</li>
              <li><strong className="text-foreground">Noisy Networks</strong> — параметрический шум для исследования</li>
              <li><strong className="text-foreground">Distributional DQN</strong> — моделирование распределения наград</li>
              <li><strong className="text-foreground">Rainbow</strong> — объединение всех улучшений</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Policy Gradient: методы градиента политики</h3>
            <p>
              Прямая оптимизация параметров политики <Math display={false}>{`\\pi(a|s;\\theta)`}</Math> без промежуточного вычисления функции ценности. Теорема о градиенте политики:
            </p>
            <Math>{`\\nabla_\\theta J(\\theta) = \\mathbb{E}_\\pi\\bigl[\\nabla_\\theta \\log \\pi(a|s;\\theta) \\cdot Q^\\pi(s,a)\\bigr]`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Алгоритм REINFORCE</h4>
            <p>Использует метод Монте-Карло для оценки <Math display={false}>{`Q^\\pi`}</Math>. Обновление параметров:</p>
            <Math>{`\\theta \\leftarrow \\theta + \\alpha \\cdot \\nabla_\\theta \\log \\pi(a_t|s_t;\\theta) \\cdot G_t`}</Math>
            <p>где <Math display={false}>{`G_t = \\sum_{k=t}^T \\gamma^{k-t} r_{k+1}`}</Math> — дисконтированная сумма наград.</p>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Улучшения REINFORCE</h4>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong className="text-foreground">Baseline:</strong> <Math display={false}>{`\\nabla_\\theta J = \\mathbb{E}[\\nabla_\\theta \\log \\pi \\cdot (Q^\\pi(s,a) - b(s))]`}</Math> — снижение дисперсии</li>
              <li><strong className="text-foreground">Actor-Critic:</strong> Critic оценивает <Math display={false}>{`V(s)`}</Math>, Actor обновляет политику</li>
              <li><strong className="text-foreground">A2C/A3C:</strong> Advantage <Math display={false}>{`A(s,a) = Q(s,a) - V(s)`}</Math>, параллельное обучение</li>
              <li><strong className="text-foreground">TRPO:</strong> ограничение размера обновления через KL-дивергенцию</li>
              <li><strong className="text-foreground">PPO:</strong> клиповый суррогат-объектив (подробно в Модуле 4)</li>
            </ol>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Современные алгоритмы</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-foreground">SAC (Soft Actor-Critic)</strong> — энтропийная регуляризация для исследования</li>
              <li><strong className="text-foreground">TD3</strong> — двойные Q-сети, задержка обновления политики</li>
              <li><strong className="text-foreground">D4PG</strong> — распределённое обучение с моделированием распределения наград</li>
            </ul>

            <InfoBox color="accent" title="Выбор алгоритма">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Дискретные действия</strong> → Q-learning, DQN</li>
                <li><strong className="text-foreground">Непрерывные действия</strong> → DDPG, TD3, SAC</li>
                <li><strong className="text-foreground">Стохастическая среда</strong> → Policy Gradient методы</li>
                <li><strong className="text-foreground">Большое пространство состояний</strong> → Deep RL (нейросетевая аппроксимация)</li>
              </ul>
            </InfoBox>
          </Section>
        </div>

        {/* ============================================================ */}
        {/* CHAPTER 2: Mathematical Foundations */}
        {/* ============================================================ */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 pb-3 border-b border-secondary/30">
            Глава 2. Математические основы глубокого обучения с подкреплением
          </h2>

          {/* 2.1 Calculus */}
          <Section icon={<TrendingUp className="w-5 h-5 text-primary" />} title="2.1 Математический анализ">
            <ReferenceTag modules={[1, 4]} />

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Производные и правила дифференцирования</h3>
            <p>Производная функции <Math display={false}>{`f(x)`}</Math> в точке <Math display={false}>{`x`}</Math>:</p>
            <Math>{`f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Основные правила</h4>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-foreground">Степенная функция:</strong> <Math display={false}>{`(x^n)' = nx^{n-1}`}</Math></li>
              <li><strong className="text-foreground">Произведение:</strong> <Math display={false}>{`(fg)' = f'g + fg'`}</Math></li>
              <li><strong className="text-foreground">Частное:</strong> <Math display={false}>{`\\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2}`}</Math></li>
              <li><strong className="text-foreground">Цепное правило:</strong> <Math display={false}>{`(f \\circ g)'(x) = f'(g(x)) \\cdot g'(x)`}</Math></li>
              <li><strong className="text-foreground">Экспонента:</strong> <Math display={false}>{`(e^x)' = e^x`}</Math></li>
              <li><strong className="text-foreground">Логарифм:</strong> <Math display={false}>{`(\\ln x)' = \\frac{1}{x}`}</Math></li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Частные производные и градиент</h3>
            <p>Для функции нескольких переменных <Math display={false}>{`f(x_1, x_2, \\ldots, x_n)`}</Math>:</p>
            <Math>{`\\frac{\\partial f}{\\partial x_i} = \\lim_{h \\to 0} \\frac{f(x_1, \\ldots, x_i + h, \\ldots, x_n) - f(x_1, \\ldots, x_n)}{h}`}</Math>

            <p className="mt-4"><strong className="text-foreground">Градиент</strong> — вектор всех частных производных:</p>
            <Math>{`\\nabla f = \\left(\\frac{\\partial f}{\\partial x_1},\\; \\frac{\\partial f}{\\partial x_2},\\; \\ldots,\\; \\frac{\\partial f}{\\partial x_n}\\right)`}</Math>

            <InfoBox color="primary" title="Применение в RL (Модуль 4)">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Градиентный спуск:</strong> <Math display={false}>{`\\theta_{\\text{new}} = \\theta_{\\text{old}} - \\alpha \\nabla L(\\theta)`}</Math></li>
                <li><strong className="text-foreground">Обратное распространение</strong> — цепное правило для вычисления градиентов в нейросетях</li>
                <li><strong className="text-foreground">Градиент политики:</strong> <Math display={false}>{`\\nabla_\\theta J(\\theta) = \\mathbb{E}_\\pi[\\nabla_\\theta \\log \\pi \\cdot Q^\\pi]`}</Math></li>
              </ul>
            </InfoBox>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Экстремумы функций</h3>
            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Одна переменная</h4>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-foreground">Необходимое условие:</strong> <Math display={false}>{`f'(a) = 0`}</Math></li>
              <li><Math display={false}>{`f''(a) > 0`}</Math> → локальный минимум</li>
              <li><Math display={false}>{`f''(a) < 0`}</Math> → локальный максимум</li>
              <li><Math display={false}>{`f''(a) = 0`}</Math> → требуется дополнительное исследование</li>
            </ul>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Несколько переменных</h4>
            <p>Для <Math display={false}>{`f(x,y)`}</Math> с критической точкой <Math display={false}>{`(a,b)`}</Math>:</p>
            <Math>{`D = \\frac{\\partial^2 f}{\\partial x^2} \\cdot \\frac{\\partial^2 f}{\\partial y^2} - \\left(\\frac{\\partial^2 f}{\\partial x \\partial y}\\right)^2`}</Math>
            <ul className="list-disc list-inside space-y-1 mt-3">
              <li><Math display={false}>{`D > 0`}</Math> и <Math display={false}>{`\\frac{\\partial^2 f}{\\partial x^2} > 0`}</Math> → локальный минимум</li>
              <li><Math display={false}>{`D > 0`}</Math> и <Math display={false}>{`\\frac{\\partial^2 f}{\\partial x^2} < 0`}</Math> → локальный максимум</li>
              <li><Math display={false}>{`D < 0`}</Math> → седловая точка</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Примеры</h3>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Задача 1</h4>
            <p>Найти экстремумы <Math display={false}>{`f(x) = x^3 - 3x^2 + 3x - 1`}</Math>.</p>
            <div className="ml-4 mt-2 space-y-2 text-sm">
              <p><Math display={false}>{`f'(x) = 3(x-1)^2`}</Math>, <Math display={false}>{`f'(1) = 0`}</Math></p>
              <p><Math display={false}>{`f''(1) = 0`}</Math> → точка перегиба, не экстремум (функция возрастает при <Math display={false}>{`x \\ne 1`}</Math>)</p>
            </div>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Задача 2</h4>
            <p>Найти экстремумы <Math display={false}>{`f(x,y) = x^2 + y^2 - 2x - 4y + 5`}</Math>.</p>
            <div className="ml-4 mt-2 space-y-2 text-sm">
              <p><Math display={false}>{`\\frac{\\partial f}{\\partial x} = 2x - 2 = 0 \\Rightarrow x = 1`}</Math>, <Math display={false}>{`\\frac{\\partial f}{\\partial y} = 2y - 4 = 0 \\Rightarrow y = 2`}</Math></p>
              <p><Math display={false}>{`D = 2 \\cdot 2 - 0^2 = 4 > 0`}</Math>, <Math display={false}>{`\\frac{\\partial^2 f}{\\partial x^2} = 2 > 0`}</Math> → локальный минимум в <Math display={false}>{`(1, 2)`}</Math></p>
              <p><Math display={false}>{`f(1,2) = 0`}</Math></p>
            </div>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Задача 3</h4>
            <p>Найти экстремумы <Math display={false}>{`f(x,y) = xy - x^3 - y^3`}</Math>.</p>
            <div className="ml-4 mt-2 space-y-2 text-sm">
              <p>Критические точки: <Math display={false}>{`(0,0)`}</Math> и <Math display={false}>{`(\\frac{1}{3}, \\frac{1}{3})`}</Math></p>
              <p>В <Math display={false}>{`(0,0)`}</Math>: <Math display={false}>{`D = -1 < 0`}</Math> → седловая точка</p>
              <p>В <Math display={false}>{`(\\frac{1}{3}, \\frac{1}{3})`}</Math>: <Math display={false}>{`D = 3 > 0`}</Math>, <Math display={false}>{`A = -2 < 0`}</Math> → локальный максимум</p>
            </div>
          </Section>

          {/* 2.2 Linear Algebra */}
          <Section icon={<Layers className="w-5 h-5 text-secondary" />} title="2.2 Линейная алгебра">
            <ReferenceTag modules={[2]} />

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Векторы и векторные пространства</h3>
            <p>Вектор размерности <Math display={false}>{`n`}</Math>:</p>
            <Math>{`\\mathbf{x} = (x_1, x_2, \\ldots, x_n)^\\top`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Операции над векторами</h4>
            <ul className="list-disc list-inside space-y-2">
              <li><strong className="text-foreground">Сложение:</strong> <Math display={false}>{`\\mathbf{x} + \\mathbf{y} = (x_1+y_1, \\ldots, x_n+y_n)^\\top`}</Math></li>
              <li><strong className="text-foreground">Скалярное произведение:</strong> <Math display={false}>{`\\mathbf{x} \\cdot \\mathbf{y} = \\sum_{i=1}^n x_i y_i`}</Math></li>
              <li><strong className="text-foreground">Евклидова норма:</strong> <Math display={false}>{`\\|\\mathbf{x}\\|_2 = \\sqrt{\\sum_{i=1}^n x_i^2}`}</Math></li>
              <li><strong className="text-foreground">Угол между векторами:</strong> <Math display={false}>{`\\cos\\theta = \\frac{\\mathbf{x} \\cdot \\mathbf{y}}{\\|\\mathbf{x}\\|_2 \\cdot \\|\\mathbf{y}\\|_2}`}</Math></li>
              <li><strong className="text-foreground">Ортогональность:</strong> <Math display={false}>{`\\mathbf{x} \\cdot \\mathbf{y} = 0`}</Math></li>
            </ul>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Пример</h4>
            <p>Даны <Math display={false}>{`\\mathbf{x} = (2, -1, 3)^\\top`}</Math> и <Math display={false}>{`\\mathbf{y} = (4, 0, -2)^\\top`}</Math>:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li><Math display={false}>{`\\mathbf{x} + \\mathbf{y} = (6, -1, 1)^\\top`}</Math></li>
              <li><Math display={false}>{`\\mathbf{x} \\cdot \\mathbf{y} = 8 + 0 - 6 = 2`}</Math></li>
              <li><Math display={false}>{`\\|\\mathbf{x}\\|_2 = \\sqrt{14} \\approx 3.74`}</Math></li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Матрицы и матричные операции</h3>
            <p>Матрица <Math display={false}>{`A`}</Math> размера <Math display={false}>{`m \\times n`}</Math>:</p>
            <Math>{`A = \\begin{pmatrix} a_{11} & a_{12} & \\cdots & a_{1n} \\\\ a_{21} & a_{22} & \\cdots & a_{2n} \\\\ \\vdots & \\vdots & \\ddots & \\vdots \\\\ a_{m1} & a_{m2} & \\cdots & a_{mn} \\end{pmatrix}`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Специальные типы матриц</h4>
            <ul className="list-disc list-inside space-y-1">
              <li><strong className="text-foreground">Квадратная</strong> (<Math display={false}>{`m = n`}</Math>)</li>
              <li><strong className="text-foreground">Диагональная</strong> (<Math display={false}>{`a_{ij} = 0`}</Math> при <Math display={false}>{`i \\ne j`}</Math>)</li>
              <li><strong className="text-foreground">Единичная</strong> <Math display={false}>{`I`}</Math> (<Math display={false}>{`a_{ii} = 1`}</Math>)</li>
              <li><strong className="text-foreground">Симметричная</strong> (<Math display={false}>{`A = A^\\top`}</Math>)</li>
              <li><strong className="text-foreground">Ортогональная</strong> (<Math display={false}>{`A^\\top A = I`}</Math>)</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Собственные значения и собственные векторы</h3>
            <p>Ненулевой вектор <Math display={false}>{`\\mathbf{v}`}</Math> — собственный вектор матрицы <Math display={false}>{`A`}</Math> с собственным значением <Math display={false}>{`\\lambda`}</Math>, если:</p>
            <Math>{`A\\mathbf{v} = \\lambda\\mathbf{v}`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Характеристическое уравнение</h4>
            <Math>{`\\det(A - \\lambda I) = 0`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Свойства</h4>
            <ul className="list-disc list-inside space-y-1">
              <li><Math display={false}>{`\\sum \\lambda_i = \\text{tr}(A)`}</Math></li>
              <li><Math display={false}>{`\\prod \\lambda_i = \\det(A)`}</Math></li>
              <li>Собственные значения симметричной матрицы всегда действительны</li>
              <li>Собственные векторы симметричной матрицы при разных <Math display={false}>{`\\lambda`}</Math> ортогональны</li>
            </ul>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Пример</h4>
            <p>Для <Math display={false}>{`A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}`}</Math>:</p>
            <div className="ml-4 mt-2 space-y-2 text-sm">
              <p><Math display={false}>{`\\lambda^2 - 4\\lambda + 3 = 0 \\Rightarrow \\lambda_1 = 3,\\; \\lambda_2 = 1`}</Math></p>
              <p><Math display={false}>{`\\mathbf{v}_1 = (1, 1)^\\top`}</Math> для <Math display={false}>{`\\lambda_1 = 3`}</Math>, <Math display={false}>{`\\mathbf{v}_2 = (1, -1)^\\top`}</Math> для <Math display={false}>{`\\lambda_2 = 1`}</Math></p>
            </div>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Спектральное разложение</h3>
            <p>Диагонализация: <Math display={false}>{`A = PDP^{-1}`}</Math></p>
            <p className="mt-2">Для симметричной матрицы:</p>
            <Math>{`A = Q\\Lambda Q^\\top`}</Math>
            <p>где <Math display={false}>{`Q`}</Math> — ортогональная матрица собственных векторов, <Math display={false}>{`\\Lambda`}</Math> — диагональная матрица собственных значений.</p>

            <InfoBox color="secondary" title="Применение в Deep RL (Модуль 2)">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Нейросети</strong> = линейные преобразования + нелинейные активации: <Math display={false}>{`W\\mathbf{x} + \\mathbf{b}`}</Math></li>
                <li><strong className="text-foreground">Ковариационные матрицы</strong> в стохастических политиках с непрерывными действиями</li>
                <li><strong className="text-foreground">PCA</strong> для снижения размерности пространства состояний</li>
              </ul>
            </InfoBox>
          </Section>

          {/* 2.3 Probability and Statistics */}
          <Section icon={<BarChart3 className="w-5 h-5 text-accent" />} title="2.3 Теория вероятностей и статистика">
            <ReferenceTag modules={[3]} />

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.3.1 Случайные величины, ожидание, дисперсия</h3>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Вероятностное пространство</h4>
            <p>Тройка <Math display={false}>{`(\\Omega, \\mathcal{F}, P)`}</Math>, где:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><Math display={false}>{`\\Omega`}</Math> — пространство элементарных исходов</li>
              <li><Math display={false}>{`\\mathcal{F}`}</Math> — σ-алгебра событий</li>
              <li><Math display={false}>{`P`}</Math> — вероятностная мера</li>
            </ul>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Аксиомы Колмогорова</h4>
            <ol className="list-decimal list-inside space-y-1">
              <li><Math display={false}>{`P(A) \\ge 0`}</Math> для любого события <Math display={false}>{`A`}</Math></li>
              <li><Math display={false}>{`P(\\Omega) = 1`}</Math></li>
              <li>Счётная аддитивность: <Math display={false}>{`P(A_1 \\cup A_2 \\cup \\ldots) = P(A_1) + P(A_2) + \\ldots`}</Math> для несовместных событий</li>
            </ol>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Условная вероятность</h4>
            <Math>{`P(A|B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(B) > 0`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Математическое ожидание</h4>
            <p>Дискретная случайная величина:</p>
            <Math>{`\\mathbb{E}[X] = \\sum_x x \\cdot P(X = x)`}</Math>
            <p>Непрерывная:</p>
            <Math>{`\\mathbb{E}[X] = \\int_{-\\infty}^{\\infty} x \\cdot f(x)\\,dx`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Дисперсия</h4>
            <Math>{`\\text{Var}(X) = \\mathbb{E}[(X - \\mathbb{E}[X])^2] = \\mathbb{E}[X^2] - (\\mathbb{E}[X])^2`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Ковариация и корреляция</h4>
            <Math>{`\\text{Cov}(X, Y) = \\mathbb{E}[(X - \\mathbb{E}[X])(Y - \\mathbb{E}[Y])]`}</Math>
            <Math>{`\\rho = \\frac{\\text{Cov}(X,Y)}{\\sigma_X \\cdot \\sigma_Y} \\in [-1, 1]`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Пример</h4>
            <p>Дано: <Math display={false}>{`P(X=1) = 0.2,\\; P(X=2) = 0.5,\\; P(X=3) = 0.3`}</Math></p>
            <div className="ml-4 mt-2 space-y-2 text-sm">
              <p><Math display={false}>{`\\mathbb{E}[X] = 1 \\cdot 0.2 + 2 \\cdot 0.5 + 3 \\cdot 0.3 = 2.1`}</Math></p>
              <p><Math display={false}>{`\\mathbb{E}[X^2] = 1 \\cdot 0.2 + 4 \\cdot 0.5 + 9 \\cdot 0.3 = 4.9`}</Math></p>
              <p><Math display={false}>{`\\text{Var}(X) = 4.9 - 2.1^2 = 0.49`}</Math></p>
            </div>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2.3.2 Вероятностные распределения</h3>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Распределение Бернулли</h4>
            <p><Math display={false}>{`X \\sim \\text{Bernoulli}(p)`}</Math>: <Math display={false}>{`P(X=1) = p`}</Math>, <Math display={false}>{`P(X=0) = 1-p`}</Math></p>
            <p><Math display={false}>{`\\mathbb{E}[X] = p`}</Math>, <Math display={false}>{`\\text{Var}(X) = p(1-p)`}</Math></p>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Биномиальное распределение</h4>
            <Math>{`P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}`}</Math>
            <p><Math display={false}>{`\\mathbb{E}[X] = np`}</Math>, <Math display={false}>{`\\text{Var}(X) = np(1-p)`}</Math></p>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Категориальное распределение</h4>
            <p><Math display={false}>{`P(X = i) = p_i`}</Math>, где <Math display={false}>{`\\sum_i p_i = 1`}</Math>. Используется для стохастических политик с дискретными действиями.</p>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Распределение Пуассона</h4>
            <Math>{`P(X = k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}, \\quad k = 0, 1, 2, \\ldots`}</Math>
            <p><Math display={false}>{`\\mathbb{E}[X] = \\lambda`}</Math>, <Math display={false}>{`\\text{Var}(X) = \\lambda`}</Math></p>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Нормальное распределение</h4>
            <Math>{`f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} \\exp\\left(-\\frac{(x - \\mu)^2}{2\\sigma^2}\\right)`}</Math>
            <p><Math display={false}>{`\\mathbb{E}[X] = \\mu`}</Math>, <Math display={false}>{`\\text{Var}(X) = \\sigma^2`}</Math></p>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Многомерное нормальное распределение</h4>
            <Math>{`f(\\mathbf{x}) = \\frac{1}{(2\\pi)^{n/2} |\\Sigma|^{1/2}} \\exp\\!\\left(-\\frac{1}{2}(\\mathbf{x} - \\boldsymbol{\\mu})^\\top \\Sigma^{-1} (\\mathbf{x} - \\boldsymbol{\\mu})\\right)`}</Math>

            <InfoBox color="accent" title="Применение в Deep RL">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Категориальное</strong> — дискретные политики</li>
                <li><strong className="text-foreground">Нормальное</strong> — непрерывные стохастические политики (Policy Gradient)</li>
                <li><strong className="text-foreground">Многомерное нормальное</strong> — ковариационная матрица определяет форму исследования</li>
              </ul>
            </InfoBox>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2.3.3 Методы статистической оценки</h3>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Оценка максимального правдоподобия (MLE)</h4>
            <p>Функция правдоподобия для <Math display={false}>{`n`}</Math> наблюдений:</p>
            <Math>{`L(\\theta) = \\prod_{i=1}^n f(X_i | \\theta)`}</Math>
            <p>Оценка MLE:</p>
            <Math>{`\\hat{\\theta}_{\\text{MLE}} = \\arg\\max_\\theta L(\\theta) = \\arg\\max_\\theta \\sum_{i=1}^n \\log f(X_i|\\theta)`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Пример: MLE для нормального распределения</h4>
            <Math>{`\\hat{\\mu} = \\frac{1}{n}\\sum_{i=1}^n X_i, \\qquad \\hat{\\sigma}^2 = \\frac{1}{n}\\sum_{i=1}^n (X_i - \\hat{\\mu})^2`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Оценка максимума апостериорной вероятности (MAP)</h4>
            <p>Учитывает априорную информацию через формулу Байеса:</p>
            <Math>{`\\hat{\\theta}_{\\text{MAP}} = \\arg\\max_\\theta \\bigl[\\log P(X|\\theta) + \\log P(\\theta)\\bigr]`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Пример: MAP для Бернулли с бета-априорным</h4>
            <p>Данные: <Math display={false}>{`X_1, \\ldots, X_n \\sim \\text{Bernoulli}(p)`}</Math>, априор: <Math display={false}>{`p \\sim \\text{Beta}(\\alpha, \\beta)`}</Math>.</p>
            <Math>{`\\hat{p}_{\\text{MAP}} = \\frac{k + \\alpha - 1}{n + \\alpha + \\beta - 2}`}</Math>
            <p>где <Math display={false}>{`k = \\sum X_i`}</Math> — число успехов.</p>

            <InfoBox color="primary" title="Регуляризация = априорное распределение">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">L1 (Lasso)</strong> → лапласовский априор</li>
                <li><strong className="text-foreground">L2 (Ridge)</strong> → нормальный априор с <Math display={false}>{`\\mu = 0`}</Math></li>
              </ul>
            </InfoBox>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2.3.4 Задачи по теории вероятностей</h3>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Задача 1: ε-жадная политика</h4>
            <p>
              Агент использует ε-жадную политику с <Math display={false}>{`\\varepsilon = 0.1`}</Math> для 4 действий. Вероятность выбора оптимального действия:
            </p>
            <Math>{`P(\\text{оптимальное}) = (1 - \\varepsilon) + \\varepsilon \\cdot \\frac{1}{4} = 0.9 + 0.025 = 0.925`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Задача 2: Ожидаемая награда</h4>
            <div className="my-4 overflow-x-auto">
              <table className="w-full text-sm border border-border/30 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-card/60">
                    <th className="text-left p-3 text-foreground font-semibold border-b border-border/30">Действие</th>
                    <th className="text-left p-3 text-foreground font-semibold border-b border-border/30"><Math display={false}>{`\\pi(a|s)`}</Math></th>
                    <th className="text-left p-3 text-foreground font-semibold border-b border-border/30"><Math display={false}>{`Q(s,a)`}</Math></th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/20"><td className="p-3"><Math display={false}>{`a_1`}</Math></td><td className="p-3">0.4</td><td className="p-3">5</td></tr>
                  <tr className="border-b border-border/20"><td className="p-3"><Math display={false}>{`a_2`}</Math></td><td className="p-3">0.3</td><td className="p-3">8</td></tr>
                  <tr className="border-b border-border/20"><td className="p-3"><Math display={false}>{`a_3`}</Math></td><td className="p-3">0.2</td><td className="p-3">3</td></tr>
                  <tr><td className="p-3"><Math display={false}>{`a_4`}</Math></td><td className="p-3">0.1</td><td className="p-3">10</td></tr>
                </tbody>
              </table>
            </div>
            <Math>{`\\mathbb{E}[Q(s,a)] = 0.4 \\cdot 5 + 0.3 \\cdot 8 + 0.2 \\cdot 3 + 0.1 \\cdot 10 = 6.0`}</Math>
          </Section>

          {/* 2.4 Differential Equations */}
          <Section icon={<GitBranch className="w-5 h-5 text-primary" />} title="2.4 Дифференциальные уравнения">
            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Обыкновенные дифференциальные уравнения (ОДУ)</h3>
            <p>
              ОДУ — уравнение, связывающее неизвестную функцию <Math display={false}>{`y(x)`}</Math> с её производными. Порядок ОДУ определяется старшей производной.
            </p>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">ОДУ с разделяющимися переменными</h4>
            <p>Уравнение <Math display={false}>{`y' = ky`}</Math>:</p>
            <Math>{`\\frac{dy}{y} = k\\,dx \\quad \\Rightarrow \\quad \\ln|y| = kx + C \\quad \\Rightarrow \\quad y = C_1 e^{kx}`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Линейные ОДУ первого порядка</h4>
            <p>Уравнение <Math display={false}>{`y' + p(x)y = q(x)`}</Math>. Метод интегрирующего множителя:</p>
            <Math>{`\\mu(x) = e^{\\int p(x)\\,dx}`}</Math>
            <Math>{`y = \\frac{1}{\\mu(x)}\\left(\\int \\mu(x)\\,q(x)\\,dx + C\\right)`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Пример</h4>
            <p>Решить <Math display={false}>{`y' + 2xy = x`}</Math>.</p>
            <div className="ml-4 mt-2 space-y-2 text-sm">
              <p><Math display={false}>{`\\mu(x) = e^{x^2}`}</Math></p>
              <p><Math display={false}>{`e^{x^2} y = \\int x e^{x^2}\\,dx + C = \\tfrac{1}{2} e^{x^2} + C`}</Math></p>
              <p><Math display={false}>{`y = \\tfrac{1}{2} + Ce^{-x^2}`}</Math></p>
            </div>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">ОДУ второго порядка с постоянными коэффициентами</h3>
            <p>Уравнение <Math display={false}>{`ay'' + by' + cy = 0`}</Math>. Характеристическое уравнение:</p>
            <Math>{`ar^2 + br + c = 0`}</Math>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Различные действительные корни <Math display={false}>{`r_1 \\ne r_2`}</Math>: <Math display={false}>{`y = C_1 e^{r_1 x} + C_2 e^{r_2 x}`}</Math></li>
              <li>Кратный корень <Math display={false}>{`r_1 = r_2 = r`}</Math>: <Math display={false}>{`y = (C_1 + C_2 x)e^{rx}`}</Math></li>
              <li>Комплексные корни <Math display={false}>{`r = \\alpha \\pm i\\beta`}</Math>: <Math display={false}>{`y = e^{\\alpha x}(C_1 \\cos\\beta x + C_2 \\sin\\beta x)`}</Math></li>
            </ul>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Пример</h4>
            <p>Решить <Math display={false}>{`y'' - 5y' + 6y = 0`}</Math>:</p>
            <div className="ml-4 mt-2 space-y-2 text-sm">
              <p><Math display={false}>{`r^2 - 5r + 6 = 0 \\Rightarrow r_1 = 2,\\; r_2 = 3`}</Math></p>
              <p><Math display={false}>{`y = C_1 e^{2x} + C_2 e^{3x}`}</Math></p>
            </div>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Неоднородные ОДУ</h3>
            <p>Уравнение <Math display={false}>{`ay'' + by' + cy = f(x)`}</Math>. Общее решение: <Math display={false}>{`y = y_h + y_p`}</Math></p>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Пример</h4>
            <p>Решить <Math display={false}>{`y'' - 4y = x^2`}</Math>:</p>
            <div className="ml-4 mt-2 space-y-2 text-sm">
              <p>Однородное: <Math display={false}>{`y_h = C_1 e^{2x} + C_2 e^{-2x}`}</Math></p>
              <p>Частное: <Math display={false}>{`y_p = -\\frac{x^2}{4} - \\frac{1}{8}`}</Math></p>
              <p>Общее: <Math display={false}>{`y = C_1 e^{2x} + C_2 e^{-2x} - \\frac{x^2}{4} - \\frac{1}{8}`}</Math></p>
            </div>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Системы ОДУ</h3>
            <p>Матричная форма однородной системы:</p>
            <Math>{`\\mathbf{Y}' = A\\mathbf{Y}`}</Math>
            <p>Общее решение через собственные значения и собственные векторы матрицы <Math display={false}>{`A`}</Math>:</p>
            <Math>{`\\mathbf{Y} = c_1 e^{\\lambda_1 x}\\mathbf{v}_1 + c_2 e^{\\lambda_2 x}\\mathbf{v}_2 + \\cdots + c_n e^{\\lambda_n x}\\mathbf{v}_n`}</Math>

            <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Пример</h4>
            <p>Система: <Math display={false}>{`y'_1 = 3y_1 + 2y_2`}</Math>, <Math display={false}>{`y'_2 = 2y_1 + 3y_2`}</Math></p>
            <div className="ml-4 mt-2 space-y-2 text-sm">
              <p>Матрица <Math display={false}>{`A = \\begin{pmatrix} 3 & 2 \\\\ 2 & 3 \\end{pmatrix}`}</Math></p>
              <p><Math display={false}>{`\\lambda_1 = 5`}</Math>, <Math display={false}>{`\\lambda_2 = 1`}</Math></p>
              <p><Math display={false}>{`\\mathbf{Y} = c_1 e^{5x} \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} + c_2 e^{x} \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}`}</Math></p>
            </div>

            <InfoBox color="primary" title="Связь с Deep RL">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Динамика систем:</strong> ОДУ описывают эволюцию состояний в непрерывных средах (робототехника, управление)</li>
                <li><strong className="text-foreground">Neural ODE:</strong> нейросети, моделирующие непрерывную динамику</li>
                <li><strong className="text-foreground">Системы ОДУ</strong> — основа для model-based RL</li>
              </ul>
            </InfoBox>
          </Section>
        </div>

        {/* Conclusion */}
        <section className="mt-12 p-6 rounded-lg bg-card/40 border border-border/30">
          <h3 className="text-lg font-semibold text-foreground mb-3">📌 Итоги пособия</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Данное учебное пособие объединило все пять модулей курса «Математика RL» в единую систему знаний:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li><strong className="text-foreground">Модуль 1 (Анализ)</strong> → производные, пределы, градиенты → градиентный спуск, обратное распространение</li>
            <li><strong className="text-foreground">Модуль 2 (Линейная алгебра)</strong> → матрицы, собственные значения, спектральное разложение → нейросети, PCA</li>
            <li><strong className="text-foreground">Модуль 3 (Вероятность и MDP)</strong> → распределения, Байес, Марковские процессы → формализация RL</li>
            <li><strong className="text-foreground">Модуль 4 (Оптимизация)</strong> → SGD, Adam, PPO → обучение политик</li>
            <li><strong className="text-foreground">Модуль 5 (Пособие)</strong> → интеграция всех тем + DQN, дифференциальные уравнения, статистические оценки</li>
          </ul>
        </section>

        {/* References */}
        <section className="mt-8 p-6 rounded-lg bg-card/40 border border-border/30">
          <h3 className="text-lg font-semibold text-foreground mb-3">📚 Литература</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Sutton, R. S., & Barto, A. G. (2018). <em>Reinforcement Learning: An Introduction.</em> MIT Press.</li>
            <li>Mnih, V., et al. (2015). Human-level control through deep RL. <em>Nature</em>, 518, 529–533.</li>
            <li>Schulman, J., et al. (2017). Proximal Policy Optimization Algorithms. <em>arXiv:1707.06347</em>.</li>
            <li>Goodfellow, I., et al. (2016). <em>Deep Learning.</em> MIT Press.</li>
            <li>Bertsekas, D. P. (2017). <em>Dynamic Programming and Optimal Control.</em> Athena Scientific.</li>
          </ol>
        </section>

        {/* Back */}
        <div className="mt-16 flex justify-center">
          <Button variant="outline" onClick={() => navigate("/math-rl")} className="border-secondary/50 text-secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться к модулям
          </Button>
        </div>
      </article>
    </div>
  );
};

/* ─── Reusable sub-components ─── */

const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <section className="mt-12 first:mt-0">
    <div className="flex items-center gap-3 mb-6">
      {icon}
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    </div>
    <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
  </section>
);

const InfoBox = ({ color, title, children }: { color: "primary" | "secondary" | "accent"; title: string; children: React.ReactNode }) => {
  const borderColor = color === "primary" ? "border-primary/30" : color === "secondary" ? "border-secondary/30" : "border-accent/30";
  const titleColor = color === "primary" ? "text-primary" : color === "secondary" ? "text-secondary" : "text-accent";
  return (
    <div className={`my-4 p-4 rounded-lg bg-card/60 border ${borderColor}`}>
      <p className={`font-semibold ${titleColor} text-sm mb-2`}>{title}</p>
      {children}
    </div>
  );
};

const ReferenceTag = ({ modules }: { modules: number[] }) => {
  const colors = ["bg-primary/10 text-primary", "bg-secondary/10 text-secondary", "bg-accent/10 text-accent"];
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {modules.map(m => (
        <span key={m} className={`text-xs px-2 py-0.5 rounded-full ${colors[(m - 1) % 3]}`}>
          ← Модуль {m}
        </span>
      ))}
    </div>
  );
};

export default MathRLModule5;
