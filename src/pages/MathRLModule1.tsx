import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Brain, Code2, Lightbulb, List, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Math from "@/components/Math";

const MathRLModule1 = () => {
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
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">Модуль 1</span>
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-neon bg-clip-text text-transparent">
            Пределы, последовательности и ряды
          </span>
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          в контексте обучения с подкреплением
        </p>

        {/* Introduction */}
        <Section icon={<BookOpen className="w-5 h-5 text-primary" />} title="Введение">
          <p>
            В этом учебном модуле рассматриваются фундаментальные математические понятия предела, последовательности и ряда
            и их связь с алгоритмами обучения с подкреплением (Reinforcement Learning, RL). Несмотря на абстрактность, эти
            понятия играют ключевую роль в понимании сходимости алгоритмов RL и расчёте бесконечных сумм вознаграждений.
          </p>
          <p className="mt-3">Модуль содержит:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
            <li>Теоретический обзор понятий предела, последовательности и ряда</li>
            <li>Связь с RL: уравнения Беллмана, итерация ценности и дисконтирование</li>
            <li>Примеры и аналогии с решениями</li>
            <li>Визуализации и Jupyter-демонстрации</li>
            <li>Источники для самостоятельного изучения</li>
            <li>Мини-глоссарий ключевых терминов</li>
          </ul>
        </Section>

        {/* 1. Theoretical Foundations */}
        <Section icon={<Brain className="w-5 h-5 text-secondary" />} title="1. Теоретические основы">
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">1.1 Предел последовательности</h3>
          <p>
            <strong className="text-primary">Интуиция:</strong> Последовательность – это набор элементов{" "}
            <Math display={false}>{"x_1, x_2, x_3, \\ldots"}</Math>{" "}
            Говорят, что последовательность имеет предел (сходится к значению <Math display={false}>{"a"}</Math>), если её члены постепенно
            приближаются к <Math display={false}>{"a"}</Math>. Например, последовательность <Math display={false}>{"1, \\tfrac{1}{2}, \\tfrac{1}{3}, \\tfrac{1}{4}, \\ldots"}</Math> приближается к 0.
          </p>
          <Math>{"\\lim_{n \\to \\infty} x_n = a \\;\\Longleftrightarrow\\; \\forall\\, \\varepsilon > 0 \\;\\exists\\, N(\\varepsilon):\\; \\forall\\, n \\geq N,\\; |x_n - a| < \\varepsilon"}</Math>
          <p className="text-muted-foreground">Примеры:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
            <li><Math display={false}>{"x_n = \\tfrac{1}{n}"}</Math> — сходится к 0</li>
            <li><Math display={false}>{"x_n = (-1)^n"}</Math> — не имеет предела (прыгает <Math display={false}>{"1, -1, 1, -1, \\ldots"}</Math>)</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">1.2 Бесконечные ряды и их сходимость</h3>
          <p>
            Бесконечный ряд – это сумма бесконечного числа слагаемых: <Math display={false}>{"a_1 + a_2 + a_3 + \\cdots"}</Math> или <Math display={false}>{"\\sum a_n"}</Math>.
            Ряд сходится, если последовательность частичных сумм <Math display={false}>{"S_n = a_1 + a_2 + \\cdots + a_n"}</Math> имеет конечный предел.
          </p>
          <div className="my-4 p-4 rounded-lg bg-card/80 border border-secondary/20">
            <p className="font-semibold text-foreground mb-2">Геометрический ряд:</p>
            <Math>{"1 + r + r^2 + r^3 + \\cdots = \\frac{1}{1-r}, \\quad |r| < 1"}</Math>
          </div>
          <p>
            Гармонический ряд <Math display={false}>{"1 + \\tfrac{1}{2} + \\tfrac{1}{3} + \\cdots"}</Math> расходится (<Math display={false}>{"S_n \\approx \\ln n + \\gamma \\to +\\infty"}</Math>).
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">1.3 Пределы и ряды в контексте RL</h3>
          <p>
            В RL будущее вознаграждение суммируется за все шаги с дисконтированием <Math display={false}>{"\\gamma^t"}</Math> (<Math display={false}>{"0 \\leq \\gamma < 1"}</Math>):
          </p>
          <Math>{"G_t = R_{t+1} + \\gamma\\, R_{t+2} + \\gamma^2 R_{t+3} + \\cdots = \\sum_{k=0}^{\\infty} \\gamma^k\\, R_{t+k+1}"}</Math>
          <p>
            Если <Math display={false}>{"\\gamma < 1"}</Math>, ряд сходится. Например, при <Math display={false}>{"R = 1"}</Math> и <Math display={false}>{"\\gamma = 0.9"}</Math>,
            суммарный возврат равен <Math display={false}>{"\\frac{1}{1-0.9} = 10"}</Math>.
          </p>
          <p className="mt-3">
            Функция ценности <Math display={false}>{"V^\\pi(s)"}</Math> — математическое ожидание суммарного дисконтированного возврата:
          </p>
          <Math>{"V^\\pi(s) = \\mathbb{E}_\\pi\\!\\left[\\sum_{t=0}^{\\infty} \\gamma^t\\, R_{t+1} \\;\\middle|\\; S_0 = s\\right]"}</Math>
        </Section>

        {/* 2. RL Connections */}
        <Section icon={<Lightbulb className="w-5 h-5 text-accent" />} title="2. Связь с алгоритмами RL">
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.1 Уравнения Беллмана и дисконтирование</h3>
          <p>Уравнения Беллмана — центральные равенства RL. Уравнение оценки политики:</p>
          <Math>{"V^\\pi(s) = \\sum_{a} \\pi(a|s) \\sum_{s'} P(s'|s,a)\\Big[R(s,a,s') + \\gamma\\, V^\\pi(s')\\Big]"}</Math>
          <p>
            Без <Math display={false}>{"\\gamma"}</Math> сумма часто расходится. Именно поэтому в бесконечных задачах RL берут <Math display={false}>{"\\gamma < 1"}</Math>.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2.2 Итерация ценности</h3>
          <p>
            Алгоритм итерации ценности решает уравнение Беллмана итеративно: начиная с <Math display={false}>{"V_0(s) = 0"}</Math>,
            многократно применяет оператор Беллмана. Оператор является сжимающим отображением с коэффициентом <Math display={false}>{"\\gamma"}</Math>,
            что гарантирует сходимость к <Math display={false}>{"V^*"}</Math> по теореме Банаха.
          </p>
          <Math>{"V^*(s) = \\max_{a} \\sum_{s'} P(s'|s,a)\\Big[R(s,a,s') + \\gamma\\, V^*(s')\\Big]"}</Math>

          <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Пример: MDP с двумя состояниями</h4>
          <p>
            <Math display={false}>{"S_1 \\to S_2"}</Math> (награда +2), <Math display={false}>{"S_2 \\to S_1"}</Math> (награда 0), <Math display={false}>{"\\gamma = 0.9"}</Math>.
          </p>
          <Math>{"\\begin{cases} v_1 = 2 + 0.9\\,v_2 \\\\ v_2 = 0.9\\,v_1 \\end{cases} \\;\\Rightarrow\\; v_1 \\approx 10.53,\\quad v_2 \\approx 9.47"}</Math>
          <CodeBlock>{`gamma = 0.9
V = [0.0, 0.0]  # V[0] = V(S1), V[1] = V(S2)
for i in range(1, 6):
    V_new = [0.0, 0.0]
    V_new[0] = 2 + gamma * V[1]   # S1: награда 2 + дисконт V(S2)
    V_new[1] = 0 + gamma * V[0]   # S2: награда 0 + дисконт V(S1)
    V = V_new
    print(f"Итерация {i}: V1={V[0]:.3f}, V2={V[1]:.3f}")

# Итерация 1: V1=2.000, V2=0.000
# Итерация 2: V1=2.000, V2=1.800
# Итерация 3: V1=3.620, V2=1.800
# ...`}</CodeBlock>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2.3 Дисконтирование и его влияние</h3>
          <p>
            <Math display={false}>{"\\gamma"}</Math> — знаменатель геометрической прогрессии. Чем <Math display={false}>{"\\gamma"}</Math> ближе к 1, тем медленнее ряд сходится.
            При <Math display={false}>{"\\gamma = 0"}</Math> учитывается только немедленная награда.
          </p>
        </Section>

        {/* 3. Examples */}
        <Section icon={<Code2 className="w-5 h-5 text-primary" />} title="3. Примеры и задачи">
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3.1 Предел последовательности</h3>
          <p>
            <strong>Пример:</strong> <Math display={false}>{"a_1 = 1,\\; a_{n+1} = \\tfrac{1}{2}(a_n + 6)"}</Math>. Найти предел.
          </p>
          <Math>{"L = \\tfrac{1}{2}(L + 6) \\;\\Rightarrow\\; 2L = L + 6 \\;\\Rightarrow\\; \\boxed{L = 6}"}</Math>
          <p className="mt-2">Аналогично поиску <Math display={false}>{"V^*"}</Math> как неподвижной точки оператора Беллмана.</p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">3.2 Сумма бесконечного ряда</h3>
          <Math>{"0.8 + 0.8^2 + 0.8^3 + \\cdots = \\frac{0.8}{1 - 0.8} = \\boxed{4}"}</Math>
          <CodeBlock>{`s = 0.0
for n in range(1, 51):
    s += 0.8**n
print(s)  # 3.99999998 ≈ 4`}</CodeBlock>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">3.3 Дисконтирование наград в RL</h3>
          <p>
            Агент получает <Math display={false}>{"R = 1"}</Math> каждый шаг. Суммарное вознаграждение:
          </p>
          <Math>{"G_0 = \\frac{1}{1 - \\gamma}"}</Math>
          <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-4 text-muted-foreground"><Math display={false}>{"\\gamma"}</Math></th>
                  <th className="text-left py-2 px-4 text-muted-foreground"><Math display={false}>{"G_0"}</Math></th>
                </tr>
              </thead>
              <tbody className="text-foreground">
                <tr className="border-b border-border/30"><td className="py-2 px-4">0</td><td className="py-2 px-4">1</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-4">0.5</td><td className="py-2 px-4">2</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-4">0.9</td><td className="py-2 px-4">10</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-4">0.99</td><td className="py-2 px-4">100</td></tr>
                <tr><td className="py-2 px-4">1.0</td><td className="py-2 px-4"><Math display={false}>{"\\infty"}</Math> (расходится)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-sm">
            <strong>Аналогия (финансы):</strong> При <Math display={false}>{"\\gamma = 0.95"}</Math> бесконечный поток выплат 1/год стоит <Math display={false}>{"\\frac{1}{0.05} = 20"}</Math> сегодня.
          </p>
        </Section>

        {/* 4. Visualizations */}
        <Section icon={<Lightbulb className="w-5 h-5 text-secondary" />} title="4. Визуализация сходимости">
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">4.1 Сходимость геометрического ряда</h3>
          <p>
            При <Math display={false}>{"\\gamma = 0.5"}</Math> ряд сходится быстро (~5–6 слагаемых до предела 2).
            При <Math display={false}>{"\\gamma = 0.9"}</Math> медленнее: к <Math display={false}>{"N = 30"}</Math> сумма ≈ 9.58 (предел = 10).
          </p>
          <p className="mt-2 text-muted-foreground text-sm">
            Даже при <Math display={false}>{"\\gamma = 0.9"}</Math>: <Math display={false}>{"\\gamma^{20} \\approx 0.12"}</Math>, <Math display={false}>{"\\gamma^{50} \\approx 0.005"}</Math>. Эффективный горизонт ≈ <Math display={false}>{"\\frac{1}{1-\\gamma}"}</Math> шагов.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">4.2 Итерация ценности в MDP</h3>
          <p>
            Значения <Math display={false}>{"V_k(S_1)"}</Math> и <Math display={false}>{"V_k(S_2)"}</Math> осциллируют, приближаясь к пределам.
            Расстояние до предела убывает <Math display={false}>{"\\sim \\gamma^k"}</Math> каждую итерацию (контрактность оператора Беллмана).
          </p>
        </Section>

        {/* 5. Sources */}
        <Section icon={<List className="w-5 h-5 text-accent" />} title="5. Источники">
          <ul className="space-y-3 text-muted-foreground">
            <li><strong className="text-foreground">Саттон, Барто</strong> — «Обучение с подкреплением: Введение», 2-е изд., 2020</li>
            <li><strong className="text-foreground">David Silver</strong> — Reinforcement Learning course (UCL, 2015)</li>
            <li><strong className="text-foreground">Khan Academy</strong> — раздел «Пределы и ряды»</li>
            <li><strong className="text-foreground">Wikipedia</strong> — Limit of a sequence, Series, Bellman equation, MDP</li>
            <li><strong className="text-foreground">Bertsekas D.</strong> — Dynamic Programming and Optimal Control</li>
          </ul>
        </Section>

        {/* 6. Glossary */}
        <Section icon={<GraduationCap className="w-5 h-5 text-primary" />} title="6. Мини-глоссарий">
          <div className="space-y-4">
            <GlossaryItem term="Последовательность" formula={"(x_n) = x_1, x_2, \\ldots, x_n, \\ldots"} definition="Набор пронумерованных элементов. Пример: последовательность вознаграждений R₁, R₂, …" />
            <GlossaryItem term="Предел последовательности" formula={"\\lim_{n\\to\\infty} x_n = a"} definition="Число a, к которому приближаются члены. Формально: ∀ε>0 ∃N: ∀n>N, |xₙ−a| < ε" />
            <GlossaryItem term="Числовой ряд" formula={"\\sum_{n=1}^{\\infty} a_n"} definition="Бесконечная сумма. Сходится, если частичные суммы имеют конечный предел." />
            <GlossaryItem term="Дисконтирование" formula={"\\gamma^t,\\; 0 \\leq \\gamma < 1"} definition="Умножение вознаграждения на γᵗ. Будущие награды обесцениваются экспоненциально." />
            <GlossaryItem term="Функция ценности" formula={"V^\\pi(s) = \\mathbb{E}_\\pi\\!\\left[\\sum_{t=0}^{\\infty} \\gamma^t R_{t+1} \\mid S_0 = s\\right]"} definition="Ожидаемый суммарный дисконтированный возврат из состояния s при политике π." />
            <GlossaryItem term="Уравнение Беллмана" formula={"V^\\pi(s) = \\sum_a \\pi(a|s)\\sum_{s'}P(s'|s,a)[R + \\gamma V^\\pi(s')]"} definition="Рекуррентное соотношение, связывающее текущую и будущую ценность." />
            <GlossaryItem term="Итерация ценности" formula={"V_{k+1} \\leftarrow \\mathcal{T}[V_k]"} definition="Алгоритм вычисления V* итеративным применением оператора Беллмана." />
            <GlossaryItem term="Q-обучение" formula={"Q(s,a) \\leftarrow Q(s,a) + \\alpha\\big[R + \\gamma \\max_{a'} Q(s',a') - Q(s,a)\\big]"} definition="Офлайн-алгоритм, сходящийся к Q* при посещении всех пар (s,a)." />
            <GlossaryItem term="Контрактное отображение" formula={"d(F(x), F(y)) \\leq \\kappa\\, d(x, y),\\; \\kappa < 1"} definition="Имеет единственную неподвижную точку. В RL оператор Беллмана — γ-сжатие." />
          </div>
        </Section>

        {/* Back button */}
        <div className="mt-16 flex justify-center">
          <Button variant="outline" onClick={() => navigate("/math-rl")} className="border-primary/50 text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Вернуться к модулям
          </Button>
        </div>
      </article>
    </div>
  );
};

const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <section className="mt-12 first:mt-0">
    <div className="flex items-center gap-3 mb-6">
      {icon}
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    </div>
    <div className="text-muted-foreground leading-relaxed space-y-3">
      {children}
    </div>
  </section>
);

const CodeBlock = ({ children }: { children: string }) => (
  <pre className="my-4 p-4 rounded-lg bg-[hsl(var(--cyber-darker))] border border-primary/20 overflow-x-auto">
    <code className="text-sm text-primary font-mono whitespace-pre">{children}</code>
  </pre>
);

const GlossaryItem = ({ term, formula, definition }: { term: string; formula: string; definition: string }) => (
  <div className="p-4 rounded-lg bg-card/60 border border-border/50 space-y-2">
    <dt className="font-semibold text-foreground text-sm">{term}</dt>
    <div className="overflow-x-auto">
      <Math className="my-1 py-2">{formula}</Math>
    </div>
    <dd className="text-muted-foreground text-sm">{definition}</dd>
  </div>
);

export default MathRLModule1;
