import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Brain, Code2, Lightbulb, List, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
            <strong className="text-primary">Интуиция:</strong> Последовательность – это набор элементов x₁, x₂, x₃, …
            Говорят, что последовательность имеет предел (сходится к значению <em>a</em>), если её члены постепенно
            приближаются к <em>a</em>. Например, последовательность 1, ½, ⅓, ¼, … приближается к 0.
          </p>
          <div className="my-4 p-4 rounded-lg bg-card/80 border border-primary/20">
            <p className="font-mono text-sm text-foreground">
              lim x<sub>n</sub> = a &nbsp;⟺&nbsp; ∀ε &gt; 0 ∃N(ε): ∀n ≥ N, |x<sub>n</sub> − a| &lt; ε
            </p>
          </div>
          <p className="text-muted-foreground">Примеры:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
            <li>x<sub>n</sub> = 1/n — сходится к 0</li>
            <li>x<sub>n</sub> = (−1)<sup>n</sup> — не имеет предела (прыгает 1, −1, +1, −1, …)</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">1.2 Бесконечные ряды и их сходимость</h3>
          <p>
            Бесконечный ряд – это сумма бесконечного числа слагаемых: a₁ + a₂ + a₃ + … или ∑aₙ.
            Ряд сходится, если последовательность частичных сумм S<sub>n</sub> = a₁ + a₂ + ⋯ + aₙ имеет конечный предел.
          </p>
          <div className="my-4 p-4 rounded-lg bg-card/80 border border-secondary/20">
            <p className="font-semibold text-foreground mb-2">Геометрический ряд:</p>
            <p className="font-mono text-sm">1 + r + r² + r³ + … = 1/(1−r), при |r| &lt; 1</p>
          </div>
          <p>Гармонический ряд 1 + ½ + ⅓ + … расходится (S<sub>n</sub> ≈ ln n + γ → +∞).</p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">1.3 Пределы и ряды в контексте RL</h3>
          <p>
            В RL будущее вознаграждение суммируется за все шаги с дисконтированием γ<sup>t</sup> (0 ≤ γ &lt; 1):
          </p>
          <div className="my-4 p-4 rounded-lg bg-card/80 border border-accent/20">
            <p className="font-mono text-sm text-foreground">
              G<sub>t</sub> = R<sub>t+1</sub> + γR<sub>t+2</sub> + γ²R<sub>t+3</sub> + … = ∑<sub>k=0</sub><sup>∞</sup> γ<sup>k</sup> R<sub>t+k+1</sub>
            </p>
          </div>
          <p>
            Если γ &lt; 1, ряд сходится. Например, при постоянном вознаграждении R = 1 и γ = 0.9,
            суммарный возврат равен 1/(1−0.9) = 10.
          </p>
          <p className="mt-3">
            Функция ценности V<sup>π</sup>(s) — математическое ожидание суммарного дисконтированного возврата:
          </p>
          <div className="my-4 p-4 rounded-lg bg-card/80 border border-primary/20">
            <p className="font-mono text-sm text-foreground">
              V<sup>π</sup>(s) = E<sub>π</sub>[ ∑<sub>t=0</sub><sup>∞</sup> γ<sup>t</sup>R<sub>t+1</sub> | S₀ = s ]
            </p>
          </div>
        </Section>

        {/* 2. RL Connections */}
        <Section icon={<Lightbulb className="w-5 h-5 text-accent" />} title="2. Связь с алгоритмами RL">
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.1 Уравнения Беллмана и дисконтирование</h3>
          <p>
            Уравнения Беллмана — центральные равенства RL. Уравнение оценки политики:
          </p>
          <div className="my-4 p-4 rounded-lg bg-card/80 border border-primary/20">
            <p className="font-mono text-sm text-foreground">
              V<sup>π</sup>(s) = ∑<sub>a</sub> π(a|s) ∑<sub>s′</sub> P(s′|s,a) [ R(s,a,s′) + γV<sup>π</sup>(s′) ]
            </p>
          </div>
          <p>
            Без γ сумма часто расходится. Именно поэтому в бесконечных задачах RL берут γ &lt; 1 (обычно 0.9, 0.99).
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2.2 Итерация ценности</h3>
          <p>
            Алгоритм итерации ценности решает уравнение Беллмана итеративно: начиная с V₀(s) = 0,
            многократно применяет оператор Беллмана. Оператор является сжимающим отображением с коэффициентом γ,
            что гарантирует сходимость к V* по теореме Банаха.
          </p>
          <div className="my-4 p-4 rounded-lg bg-card/80 border border-secondary/20">
            <p className="font-mono text-sm text-foreground">
              V*(s) = max<sub>a</sub> ∑<sub>s′</sub> P(s′|s,a) [ R(s,a,s′) + γV*(s′) ]
            </p>
          </div>

          <h4 className="text-lg font-semibold text-foreground mt-6 mb-2">Пример: MDP с двумя состояниями</h4>
          <p>
            S₁ → S₂ (награда +2), S₂ → S₁ (награда 0), γ = 0.9.
            Решаем систему: v₁ = 2 + 0.9·v₂, v₂ = 0.9·v₁ → v₁ ≈ 10.53, v₂ ≈ 9.47.
          </p>
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
            γ — знаменатель геометрической прогрессии. Чем γ ближе к 1, тем медленнее ряд сходится.
            При γ = 0 учитывается только немедленная награда. На практике γ ≈ 0.99 для стратегических задач
            и γ ≈ 0.8–0.9 для коротких эпизодов.
          </p>
        </Section>

        {/* 3. Examples */}
        <Section icon={<Code2 className="w-5 h-5 text-primary" />} title="3. Примеры и задачи">
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">3.1 Предел последовательности</h3>
          <p>
            <strong>Пример:</strong> a₁ = 1, a<sub>n+1</sub> = ½(a<sub>n</sub> + 6). Найти предел.
          </p>
          <p className="mt-2">
            Если a<sub>n</sub> → L, то L = ½(L + 6) → 2L = L + 6 → <strong className="text-primary">L = 6</strong>.
            Аналогично поиску V* как неподвижной точки оператора Беллмана.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">3.2 Сумма бесконечного ряда</h3>
          <p>
            Вычислить 0.8 + 0.8² + 0.8³ + … = 0.8/(1−0.8) = <strong className="text-primary">4</strong>
          </p>
          <CodeBlock>{`s = 0.0
for n in range(1, 51):
    s += 0.8**n
print(s)  # 3.99999998 ≈ 4`}</CodeBlock>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">3.3 Дисконтирование наград в RL</h3>
          <p>
            Агент получает R = 1 каждый шаг. Суммарное вознаграждение G₀ = 1/(1−γ):
          </p>
          <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-4 text-muted-foreground">γ</th>
                  <th className="text-left py-2 px-4 text-muted-foreground">G₀</th>
                </tr>
              </thead>
              <tbody className="text-foreground">
                <tr className="border-b border-border/30"><td className="py-2 px-4">0</td><td className="py-2 px-4">1</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-4">0.5</td><td className="py-2 px-4">2</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-4">0.9</td><td className="py-2 px-4">10</td></tr>
                <tr className="border-b border-border/30"><td className="py-2 px-4">0.99</td><td className="py-2 px-4">100</td></tr>
                <tr><td className="py-2 px-4">1.0</td><td className="py-2 px-4">∞ (расходится)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-sm">
            <strong>Аналогия (финансы):</strong> Дисконтирование в RL — как приведённая стоимость денег.
            При γ = 0.95 бесконечный поток выплат 1/год стоит 20 сегодня.
          </p>
        </Section>

        {/* 4. Visualizations */}
        <Section icon={<Lightbulb className="w-5 h-5 text-secondary" />} title="4. Визуализация сходимости">
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">4.1 Сходимость геометрического ряда</h3>
          <p>
            При γ = 0.5 ряд сходится очень быстро (~5–6 слагаемых до предела 2).
            При γ = 0.9 сходимость медленнее: к N = 30 сумма ≈ 9.58 (предел = 10).
          </p>
          <p className="mt-2 text-muted-foreground text-sm">
            Даже при γ = 0.9: γ²⁰ ≈ 0.12, γ⁵⁰ ≈ 0.005. Эффективный горизонт ≈ 1/(1−γ) шагов.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">4.2 Итерация ценности в MDP</h3>
          <p>
            Значения V<sub>k</sub>(S₁) и V<sub>k</sub>(S₂) осциллируют, приближаясь к пределам.
            Расстояние до предела убывает ~γ<sup>k</sup> каждую итерацию (контрактность оператора Беллмана).
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
            <GlossaryItem term="Последовательность (xₙ)" definition="Набор пронумерованных элементов x₁, x₂, …, xₙ, …" />
            <GlossaryItem term="Предел последовательности" definition="Число a, к которому приближаются члены. ∀ε>0 ∃N: ∀n>N, |xₙ−a| < ε" />
            <GlossaryItem term="Ряд ∑aₙ" definition="Бесконечная сумма. Сходится, если частичные суммы Sₙ имеют конечный предел." />
            <GlossaryItem term="Дисконтирование" definition="Умножение вознаграждения на γᵗ. При γ<1 будущие награды обесцениваются экспоненциально." />
            <GlossaryItem term="MDP" definition="Марковский процесс принятия решений: состояния S, действия A, переходы P(s′|s,a), награды R, и γ." />
            <GlossaryItem term="Функция ценности V^π(s)" definition="Ожидаемый суммарный дисконтированный возврат из состояния s при политике π." />
            <GlossaryItem term="Уравнение Беллмана" definition="Рекуррентное соотношение: V(s) = R + γ·V(s′), связывает текущую и будущую ценность." />
            <GlossaryItem term="Итерация ценности" definition="Алгоритм вычисления V* итеративным применением оператора Беллмана. Сходится за счёт контрактности." />
            <GlossaryItem term="Q-обучение" definition="Офлайн-алгоритм: Q(s,a) ← Q(s,a) + α[R + γ·max Q(s′,a′) − Q(s,a)]. Сходится к Q*." />
            <GlossaryItem term="Контрактное отображение" definition="F с κ<1: d(F(x),F(y)) ≤ κ·d(x,y). Имеет единственную неподвижную точку. В RL оператор Беллмана — γ-сжатие." />
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
  <pre className="my-4 p-4 rounded-lg bg-cyber-darker border border-primary/20 overflow-x-auto">
    <code className="text-sm text-primary font-mono whitespace-pre">{children}</code>
  </pre>
);

const GlossaryItem = ({ term, definition }: { term: string; definition: string }) => (
  <div className="p-3 rounded-lg bg-card/60 border border-border/50">
    <dt className="font-semibold text-foreground text-sm">{term}</dt>
    <dd className="text-muted-foreground text-sm mt-1">{definition}</dd>
  </div>
);

export default MathRLModule1;
