import LessonLayout from "@/components/LessonLayout";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Quiz from "@/components/Quiz";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2, Monitor } from "lucide-react";

const quizQuestions = [
  {
    question: "Какая минимальная версия Python требуется для ML-Agents 1.1.0?",
    options: ["Python 3.8", "Python 3.9", "Python 3.10", "Python 3.12"],
    correctIndex: 2,
  },
  {
    question: "Какой командой можно проверить, что ML-Agents установлен корректно?",
    options: [
      "python -m mlagents",
      "mlagents-learn --help",
      "pip show unity",
      "ml-agents --version",
    ],
    correctIndex: 1,
  },
  {
    question: "Через какой инструмент Unity устанавливается пакет ML-Agents?",
    options: [
      "Asset Store",
      "Unity Hub",
      "Package Manager (Add by name)",
      "NuGet",
    ],
    correctIndex: 2,
  },
];

const CourseLesson1_2 = () => {
  return (
    <LessonLayout
      lessonId="1-2"
      lessonTitle="Установка окружения: PyTorch + Unity ML-Agents"
      lessonNumber="1.2"
      duration="30 мин"
      tags={["#setup", "#pytorch", "#unity", "#mlagents"]}
      prevLesson={{ path: "/courses/1-1", title: "Что такое RL?" }}
      nextLesson={{ path: "/courses/1-3", title: "Первый агент: CartPole" }}
    >
      {/* System requirements */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Системные требования</h2>
        <Card className="bg-card/50 border-border/40">
          <CardContent className="p-5">
            <div className="flex items-start gap-3 mb-4">
              <Monitor className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <h3 className="font-bold text-foreground">Минимальные требования</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Python", value: "3.10+" },
                { label: "Unity", value: "2022.3 LTS" },
                { label: "ML-Agents", value: "1.1.0" },
                { label: "PyTorch", value: "2.0+" },
                { label: "ОС", value: "Windows 10 / macOS 12+ / Ubuntu 20.04+" },
                { label: "CUDA (опционально)", value: "11.8+ для GPU-ускорения" },
              ].map((req, i) => (
                <div key={i} className="flex justify-between items-center py-2 px-3 rounded bg-muted/20 border border-border/20 text-sm">
                  <span className="text-muted-foreground">{req.label}</span>
                  <span className="font-mono text-primary text-xs">{req.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Step 1: Python environment */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 1. Создание Python-окружения</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Рекомендуем использовать виртуальное окружение, чтобы избежать конфликтов зависимостей.
        </p>

        <CyberCodeBlock language="python" filename="terminal">
{`# Создаём виртуальное окружение
python -m venv rl-env

# Активация (Windows)
rl-env\\Scripts\\activate

# Активация (macOS / Linux)
source rl-env/bin/activate

# Проверяем версию Python
python --version
# Python 3.10.x или выше`}
        </CyberCodeBlock>
      </section>

      {/* Step 2: PyTorch */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 2. Установка PyTorch</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          PyTorch — фреймворк для глубокого обучения, который используется ML-Agents «под капотом».
        </p>

        <CyberCodeBlock language="python" filename="terminal">
{`# CPU-версия (подходит для начала)
pip install torch torchvision torchaudio

# GPU-версия (CUDA 11.8)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# Проверка установки
python -c "import torch; print(torch.__version__); print('CUDA:', torch.cuda.is_available())"
# Ожидаемый вывод: 2.x.x, CUDA: True/False`}
        </CyberCodeBlock>
      </section>

      {/* Step 3: ML-Agents */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 3. Установка ML-Agents</h2>

        <CyberCodeBlock language="python" filename="terminal">
{`# Установка ML-Agents Python-пакета
pip install mlagents==1.1.0

# Проверка установки
mlagents-learn --help

# Вы должны увидеть список параметров:
#   --run-id, --env, --num-envs, и др.`}
        </CyberCodeBlock>
      </section>

      {/* Step 4: Unity */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 4. Настройка Unity-проекта</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Создайте новый 3D-проект в Unity Hub с версией <strong className="text-foreground">2022.3 LTS</strong>,
          затем добавьте пакет ML-Agents:
        </p>

        <div className="space-y-3">
          {[
            "Откройте Unity Hub → New Project → 3D (URP) → назовите проект, например «RL-Lab»",
            "В Unity: Window → Package Manager → + → Add package by name",
            "Введите: com.unity.ml-agents → Install",
            "Дождитесь завершения установки (появится в списке пакетов)",
          ].map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">{i + 1}</span>
              </div>
              <p className="text-sm text-muted-foreground">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Step 5: Verify */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Шаг 5. Проверка связи</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Запустите тренировку без среды, чтобы убедиться, что всё работает:
        </p>

        <CyberCodeBlock language="python" filename="terminal">
{`# Тестовый запуск (без Unity-среды)
mlagents-learn --help

# Если видите справку — установка прошла успешно!
# Позже мы будем запускать так:
# mlagents-learn config/trainer_config.yaml --run-id=first_run`}
        </CyberCodeBlock>

        <Card className="bg-green-500/5 border-green-500/20 mt-4">
          <CardContent className="p-4 flex gap-3 items-start">
            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-green-400">Всё готово!</p>
              <p className="text-xs text-muted-foreground mt-1">
                Если вы видите вывод справки mlagents-learn — окружение настроено корректно.
                В следующем уроке мы создадим первого агента.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Common errors */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Типичные ошибки и решения</h2>
        <div className="space-y-3">
          {[
            {
              error: "protobuf version conflict",
              solution: "pip install protobuf==3.20.3 — ML-Agents требует конкретную версию protobuf.",
            },
            {
              error: "grpcio installation fails",
              solution: "pip install grpcio==1.48.2 — на некоторых системах нужна конкретная версия.",
            },
            {
              error: "Python version not supported",
              solution: "ML-Agents 1.1.0 не поддерживает Python 3.12+. Используйте Python 3.10 или 3.11.",
            },
            {
              error: "ModuleNotFoundError: No module named 'mlagents'",
              solution: "Убедитесь, что виртуальное окружение активировано: source rl-env/bin/activate",
            },
          ].map((item, i) => (
            <Card key={i} className="bg-card/40 border-destructive/20">
              <CardContent className="p-4 flex gap-3 items-start">
                <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-mono text-xs text-destructive">{item.error}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.solution}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <CyberCodeBlock language="python" filename="fix_dependencies.sh">
{`# Если возникают конфликты — переустановите с фиксированными версиями
pip install protobuf==3.20.3
pip install grpcio==1.48.2
pip install mlagents==1.1.0

# Проверка всех зависимостей
pip check`}
        </CyberCodeBlock>
      </section>

      {/* Quiz */}
      <Quiz title="Проверь себя: Установка окружения" questions={quizQuestions} />
    </LessonLayout>
  );
};

export default CourseLesson1_2;
