import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Brain, Code2, Lightbulb, List, GraduationCap, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MathRLModule2 = () => {
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
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/10 text-secondary">Модуль 2</span>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-neon bg-clip-text text-transparent">
            Линейная Алгебра для RL
          </span>
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Векторы, матрицы, собственные значения и разложения в контексте обучения с подкреплением
        </p>

        {/* Section 1: Vectors */}
        <Section icon={<BookOpen className="w-5 h-5 text-primary" />} title="1. Векторы">
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">1.4. Линейная комбинация векторов</h3>
          <p>
            Линейная комбинация векторов v₁, v₂, …, vₘ с коэффициентами c₁, c₂, …, cₘ:
          </p>
          <Formula>w = c₁v₁ + c₂v₂ + ⋯ + cₘvₘ = ∑ cᵢvᵢ</Formula>
          <p>
            В RL функция ценности часто аппроксимируется как линейная комбинация базисных функций:
          </p>
          <Formula>V(s) ≈ ∑ wᵢφᵢ(s) = wᵀφ(s)</Formula>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">1.5. Линейная зависимость и независимость</h3>
          <p>
            Система векторов <strong className="text-foreground">линейно зависима</strong>, если существуют не все нулевые коэффициенты c₁, …, cₘ, такие что c₁v₁ + ⋯ + cₘvₘ = 0.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Линейно независимые</strong> векторы указывают на «разные» направления — ни один не выражается через остальные. Это важно при выборе признаков: линейно зависимые признаки ведут к мультиколлинеарности.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">1.6. Базис и размерность</h3>
          <p>
            <strong className="text-foreground">Базис</strong> — упорядоченный набор линейно независимых векторов, через которые единственным образом выражается любой вектор пространства. <strong className="text-foreground">Размерность</strong> — число векторов в базисе.
          </p>
          <p className="mt-2">
            Методы понижения размерности (PCA) ищут новый базис, сохраняя максимум информации меньшим числом координат — борьба с «проклятием размерности» в RL.
          </p>
        </Section>

        {/* Section 2: Matrices */}
        <Section icon={<Layers className="w-5 h-5 text-secondary" />} title="2. Матрицы">
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">2.1. Определение и типы матриц</h3>
          <p>
            Матрица A размера n × m — прямоугольная таблица чисел. Основные типы:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong className="text-foreground">Квадратная</strong> (n = m), <strong className="text-foreground">диагональная</strong>, <strong className="text-foreground">единичная</strong> I</li>
            <li><strong className="text-foreground">Треугольная</strong> (верхняя/нижняя), <strong className="text-foreground">симметрическая</strong> (A = Aᵀ)</li>
            <li><strong className="text-foreground">Нулевая</strong> O, <strong className="text-foreground">кососимметрическая</strong> (A = −Aᵀ)</li>
          </ul>
          <InfoBox color="primary" title="Применение в RL">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Матрицы переходных вероятностей P(s′|s,a) в MDP</li>
              <li>Весовые матрицы нейронных сетей в Deep RL</li>
              <li>Системы уравнений Беллмана: V = (I − γPπ)⁻¹Rπ</li>
            </ul>
          </InfoBox>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2.2. Операции над матрицами</h3>
          <p><strong className="text-foreground">Сложение:</strong> C = A + B (поэлементно, одинаковые размеры).</p>
          <p className="mt-2"><strong className="text-foreground">Умножение на скаляр:</strong> cᵢⱼ = k · aᵢⱼ.</p>
          <p className="mt-2">
            <strong className="text-foreground">Произведение:</strong> A(n×s) · B(s×m) = C(n×m), где cᵢⱼ = ∑ₖ aᵢₖbₖⱼ.
          </p>
          <p className="mt-1 text-sm">⚠️ В общем случае AB ≠ BA (некоммутативность).</p>
          <p className="mt-2"><strong className="text-foreground">Транспонирование:</strong> (Aᵀ)ᵢⱼ = aⱼᵢ. Свойства: (AB)ᵀ = BᵀAᵀ.</p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2.3. Определитель матрицы</h3>
          <p>
            det(A) — число, характеризующее квадратную матрицу. Если det(A) = 0, матрица вырождена (необратима). Геометрически — коэффициент изменения «объёма» при линейном преобразовании.
          </p>
          <Formula>det(AB) = det(A) · det(B), &nbsp; det(Aᵀ) = det(A), &nbsp; det(A⁻¹) = 1/det(A)</Formula>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2.4. Ранг матрицы</h3>
          <p>
            rank(A) — максимальное число линейно независимых строк (или столбцов). rank(A) ≤ min(n, m). Матрица невырождена ⟺ rank(A) = n.
          </p>
          <InfoBox color="secondary" title="Теорема Кронекера-Капелли">
            Система Ax = b совместна ⟺ rank(A) = rank([A|b]). Если rank(A) = n — единственное решение; если rank(A) &lt; n — бесконечно много решений.
          </InfoBox>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2.5. Обратная матрица</h3>
          <p>
            A⁻¹ существует ⟺ det(A) ≠ 0. Формула: A⁻¹ = (1/det(A)) · Cᵀ, где C — матрица алгебраических дополнений.
          </p>
          <Formula>V = (I − γPπ)⁻¹Rπ — решение уравнений Беллмана через обратную матрицу</Formula>
          <p className="mt-2 text-sm">
            Метод Гаусса-Жордана: [A|I] → [I|A⁻¹] элементарными преобразованиями строк.
          </p>
        </Section>

        {/* Section 3: Dot Product */}
        <Section icon={<Brain className="w-5 h-5 text-accent" />} title="3. Скалярное произведение">
          <p>
            <strong className="text-foreground">Геометрическое определение:</strong> a⃗ · b⃗ = ‖a⃗‖ · ‖b⃗‖ · cos(θ)
          </p>
          <p className="mt-2">
            <strong className="text-foreground">Алгебраическое (в координатах):</strong> a⃗ · b⃗ = ∑ aᵢbᵢ
          </p>
          <div className="mt-4 space-y-2">
            <p>• Если θ &lt; 90° → произведение &gt; 0 (векторы «сонаправлены»)</p>
            <p>• Если θ = 90° → произведение = 0 (<strong className="text-primary">ортогональность</strong>)</p>
            <p>• Если θ &gt; 90° → произведение &lt; 0 (противонаправлены)</p>
          </div>
          <InfoBox color="accent" title="В RL">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>V(s) ≈ wᵀφ(s) — скалярное произведение весов и признаков</li>
              <li>Косинусное сходство для сравнения эмбеддингов состояний</li>
              <li>Градиентный спуск: ∇J(θ) — вектор частных производных</li>
            </ul>
          </InfoBox>
        </Section>

        {/* Section 4: Eigenvalues */}
        <Section icon={<Lightbulb className="w-5 h-5 text-primary" />} title="4. Собственные значения и собственные векторы">
          <Formula>Av = λv, где v ≠ 0</Formula>
          <p className="mt-3">
            λ — собственное значение, v — собственный вектор. Находим из характеристического уравнения det(A − λI) = 0.
          </p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Спектральное разложение</h3>
          <p>
            Если A диагонализуема: A = PDP⁻¹, где D = diag(λ₁, …, λₙ), P — матрица из собственных векторов.
            Тогда Aᵏ = PDᵏP⁻¹ — удобно для степеней матриц.
          </p>

          <InfoBox color="primary" title="В RL">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Анализ сходимости: спектральный радиус ρ(γPπ) &lt; 1 гарантирует сходимость итерации ценности</li>
              <li>PCA = собственное разложение ковариационной матрицы → понижение размерности</li>
              <li>Собственные значения матрицы Гессе → выпуклость/невыпуклость целевой функции</li>
            </ul>
          </InfoBox>
        </Section>

        {/* Section 5: SVD */}
        <Section icon={<Code2 className="w-5 h-5 text-secondary" />} title="5. Сингулярное разложение (SVD)">
          <Formula>A = UΣVᵀ</Formula>
          <ul className="list-disc list-inside mt-3 space-y-2">
            <li><strong className="text-foreground">U</strong> (m×m) — ортогональная, столбцы = левые сингулярные векторы</li>
            <li><strong className="text-foreground">Σ</strong> (m×n) — диагональная, σ₁ ≥ σ₂ ≥ ⋯ ≥ σᵣ &gt; 0 (сингулярные числа)</li>
            <li><strong className="text-foreground">V</strong> (n×n) — ортогональная, столбцы = правые сингулярные векторы</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Геометрический смысл</h3>
          <p>Любое линейное преобразование = Вращение (Vᵀ) → Масштабирование (Σ) → Вращение (U).</p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Теорема Эккарта-Янга</h3>
          <p>
            Лучшая аппроксимация ранга k: Aₖ = UΣₖVᵀ (обнуляем σₖ₊₁, …, σᵣ). Лежит в основе PCA и понижения размерности.
          </p>

          <InfoBox color="secondary" title="Применение SVD в RL">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Понижение размерности пространства состояний</li>
              <li>Аппроксимация Q-таблицы матрицей меньшего ранга</li>
              <li>Псевдообратная A⁺ = VΣ⁺Uᵀ для LSTD</li>
              <li>Робастность к шуму через низкоранговую аппроксимацию</li>
            </ul>
          </InfoBox>
        </Section>

        {/* Section 6: Additional Topics */}
        <Section icon={<GraduationCap className="w-5 h-5 text-accent" />} title="6. Дополнительные темы">
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">6.1. Квадратичные формы</h3>
          <Formula>Q(x) = xᵀAx, где A — симметрическая матрица</Formula>
          <p>
            Классификация: <strong className="text-primary">положительно определённая</strong> (все λᵢ &gt; 0, минимум), <strong className="text-secondary">отрицательно определённая</strong> (все λᵢ &lt; 0, максимум), <strong className="text-accent">знакопеременная</strong> (седловая точка).
          </p>
          <p className="mt-2 text-sm">В RL: критерий Сильвестра для проверки выпуклости целевых функций оптимизации.</p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">6.2. Ортогональная проекция</h3>
          <p>Проекция вектора b на подпространство span(A):</p>
          <Formula>proj = A(AᵀA)⁻¹Aᵀb</Formula>
          <p className="mt-2 text-sm">Основа метода наименьших квадратов и аппроксимации функции ценности V(s) ≈ Φw.</p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">6.3. Изменение базиса</h3>
          <p>
            Матрица перехода P<sub>B→B′</sub> связывает координаты: [v]<sub>B</sub> = P·[v]<sub>B′</sub>.
            Матрица оператора в новом базисе: M<sub>B′</sub> = P⁻¹M<sub>B</sub>P (подобие).
          </p>
          <p className="mt-2 text-sm">PCA — переход к базису из собственных векторов ковариационной матрицы.</p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">6.4. Разложения LU и QR</h3>
          <p>
            <strong className="text-foreground">LU:</strong> A = LU (нижне- × верхнетреугольная). Эффективно для решения Ax = b с разными b.
          </p>
          <p className="mt-2">
            <strong className="text-foreground">QR:</strong> A = QR (ортогональная × верхнетреугольная). Численно устойчиво для наименьших квадратов и собственных значений (QR-алгоритм).
          </p>
          <InfoBox color="accent" title="В RL">
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Решение (I − γPπ)V = Rπ через LU-разложение</li>
              <li>LSTD использует QR или SVD для задачи наименьших квадратов</li>
              <li>Натуральный градиент: обращение матрицы Фишера через разложения</li>
            </ul>
          </InfoBox>
        </Section>

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

const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <section className="mt-12 first:mt-0">
    <div className="flex items-center gap-3 mb-6">
      {icon}
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    </div>
    <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
  </section>
);

const Formula = ({ children }: { children: React.ReactNode }) => (
  <div className="my-4 p-4 rounded-lg bg-card/80 border border-primary/20">
    <p className="font-mono text-sm text-foreground">{children}</p>
  </div>
);

const InfoBox = ({ color, title, children }: { color: "primary" | "secondary" | "accent"; title: string; children: React.ReactNode }) => {
  const borderColor = color === "primary" ? "border-primary/30" : color === "secondary" ? "border-secondary/30" : "border-accent/30";
  const titleColor = color === "primary" ? "text-primary" : color === "secondary" ? "text-secondary" : "text-accent";
  return (
    <div className={`my-4 p-4 rounded-lg bg-card/60 border ${borderColor}`}>
      <p className={`font-semibold ${titleColor} text-sm mb-2`}>{title}</p>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
};

export default MathRLModule2;
