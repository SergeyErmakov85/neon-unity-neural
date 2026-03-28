import { useNavigate } from "react-router-dom";
import { Network, BookOpen, Code2, GraduationCap, ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Math from "@/components/Math";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/landing/Navbar";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const FcaRLModule = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <ScrollProgressBar />
    <div className="min-h-screen bg-background pt-28 pb-16">
      <SEOHead
        title="FCA + RL для NPC | Neon Unity Neural"
        description="Формальный Анализ Понятий (FCA) для структурирования пространства состояний RL-агентов в Unity."
      />

      <div className="container mx-auto px-4 max-w-4xl space-y-12">
        {/* Back button */}
        <Button variant="ghost" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground mb-6 -ml-2">
          <ArrowLeft className="mr-2 h-4 w-4" /> На главную
        </Button>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Network className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Formal Concept Analysis в обучении с подкреплением
            </h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            FCA позволяет извлекать понятийные решётки из пространства состояний агента,
            структурировать его наблюдения и ускорять обобщение через иерархию понятий.
          </p>
        </div>

        {/* Секция 1: Что такое FCA */}
        <Card className="border-yellow-500/30 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <BookOpen className="h-5 w-5 text-yellow-400" />
              1. Что такое FCA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Формальный Анализ Понятий (Formal Concept Analysis)</strong> —
              это математический аппарат для извлечения иерархической структуры из бинарных данных.
            </p>
            <p>
              Основа FCA — <strong className="text-foreground">формальный контекст</strong>,
              задаваемый тройкой:
            </p>
            <Math>{`\\mathcal{K} = (G,\\, M,\\, I)`}</Math>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong className="text-foreground">G</strong> — множество объектов (состояния агента)</li>
              <li><strong className="text-foreground">M</strong> — множество признаков (атрибуты наблюдений)</li>
              <li><strong className="text-foreground">I ⊆ G × M</strong> — отношение инциденции («объект g обладает признаком m»)</li>
            </ul>
            <p>
              <strong className="text-foreground">Формальное понятие</strong> — пара (A, B), где
              A ⊆ G (объём) и B ⊆ M (содержание), связанные замыканием Галуа.
              Все понятия образуют <strong className="text-foreground">решётку понятий</strong> — иерархию
              от самого общего понятия к самому специфичному.
            </p>
          </CardContent>
        </Card>

        {/* Секция 2: Зачем FCA + RL */}
        <Card className="border-yellow-500/30 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Network className="h-5 w-5 text-yellow-400" />
              2. FCA + RL — зачем это нужно
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-yellow-400 shrink-0" />
                <span>
                  <strong className="text-foreground">Структурирование пространства наблюдений GridSensor</strong> —
                  бинарные признаки сенсора (food_near, enemy_near, wall_ahead…) напрямую образуют формальный контекст.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-yellow-400 shrink-0" />
                <span>
                  <strong className="text-foreground">Понятийные кластеры для curriculum learning</strong> —
                  иерархия решётки задаёт естественные уровни сложности: простые понятия → простые задачи.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-yellow-400 shrink-0" />
                <span>
                  <strong className="text-foreground">Сокращение пространства состояний</strong> —
                  понятийная абстракция объединяет эквивалентные состояния, ускоряя обучение.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Секция 3: Пример — FCA для GridSensor */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Code2 className="h-6 w-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-foreground">3. Пример — FCA для GridSensor</h2>
          </div>
          <p className="text-muted-foreground">
            Создаём формальный контекст из наблюдений GridSensor и строим решётку понятий:
          </p>
          <CyberCodeBlock language="python" filename="fca_gridsensor.py">
{`from concepts import Context  # pip install concepts

# Бинарный формальный контекст из наблюдений GridSensor
# G = состояния, M = объекты в поле зрения агента
objects    = ['s1', 's2', 's3', 's4', 's5']
attributes = ['food_near', 'enemy_near', 'wall_ahead', 'open_path']

table = [
    (1, 0, 0, 1),  # s1: еда рядом, путь открыт
    (0, 1, 1, 0),  # s2: враг рядом, стена впереди
    (1, 0, 1, 0),  # s3: еда рядом, стена впереди
    (0, 0, 0, 1),  # s4: открытый путь
    (1, 1, 0, 0),  # s5: еда и враг рядом
]

ctx = Context(objects, attributes, table)
lattice = ctx.lattice

print(f"Число понятий в решётке: {len(lattice)}")
for concept in lattice:
    print(f"  Extent: {concept.extent}, Intent: {concept.intent}")`}
          </CyberCodeBlock>
        </div>

        {/* Секция 4: Применение в curriculum learning */}
        <Card className="border-yellow-500/30 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <GraduationCap className="h-5 w-5 text-yellow-400" />
              4. Применение в curriculum learning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground leading-relaxed">
            <p>
              Решётка понятий задаёт <strong className="text-foreground">естественный порядок сложности</strong> для
              curriculum learning:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>
                <strong className="text-foreground">Верх решётки</strong> (мало признаков в intent) — самые общие ситуации.
                Агент начинает обучение здесь: «открытое пространство», «ничего вокруг».
              </li>
              <li>
                <strong className="text-foreground">Середина решётки</strong> — частичные комбинации.
                Например, «еда рядом + стена» требует выбора направления.
              </li>
              <li>
                <strong className="text-foreground">Низ решётки</strong> (много признаков) — самые специфичные и сложные ситуации.
                «Еда + враг + стена» — агенту нужна сложная стратегия.
              </li>
            </ul>
            <p>
              Переход по уровням решётки от простого к сложному автоматически создаёт curriculum,
              где каждый уровень добавляет новый признак в контекст среды.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FcaRLModule;
