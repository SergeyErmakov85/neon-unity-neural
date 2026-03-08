import LessonLayout from "@/components/LessonLayout";
import ProGate from "@/components/ProGate";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Quiz from "@/components/Quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, BarChart3, AlertTriangle } from "lucide-react";

const quizQuestions = [
  {
    question: "Какая встроенная система визуализации поддерживается ML-Agents?",
    options: ["Matplotlib", "TensorBoard", "Weights & Biases", "Plotly"],
    correctIndex: 1,
  },
  {
    question: "Что указывает растущий value loss при стабильном reward?",
    options: [
      "Обучение идёт отлично",
      "Critic не может предсказать returns — возможно переобучение или нестабильность",
      "Нужно увеличить learning rate",
      "Value loss всегда растёт — это нормально",
    ],
    correctIndex: 1,
  },
  {
    question: "Что означает резкое падение entropy к нулю?",
    options: [
      "Агент обучился оптимальной политике",
      "Политика стала детерминированной слишком рано — агент перестал исследовать",
      "Entropy всегда падает к нулю — это нормально",
      "Нужно уменьшить entropy coefficient",
    ],
    correctIndex: 1,
  },
];

const CourseLesson2_6 = () => {
  const preview = (
    <>
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Зачем визуализировать обучение</h2>
        <p className="text-muted-foreground leading-relaxed">
          RL-обучение — процесс непредсказуемый. Без мониторинга вы не поймёте, обучается ли агент,
          застрял ли он, или награды растут случайно. <strong className="text-foreground">TensorBoard</strong> и
          <strong className="text-foreground"> Weights & Biases</strong> — два ключевых инструмента для
          отслеживания прогресса.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-3">
          ML-Agents имеет встроенную интеграцию с TensorBoard — достаточно запустить команду,
          и все метрики автоматически логируются.
        </p>
      </section>
    </>
  );

  return (
    <LessonLayout
      lessonTitle="Визуализация обучения: TensorBoard и W&B"
      lessonNumber="2.6"
      duration="25 мин"
      tags={["#tools", "#visualization", "#monitoring"]}
      level={2}
      prevLesson={{ path: "/courses/2-5", title: "Параллельные среды" }}
      nextLesson={{ path: "/courses/project-2", title: "Проект 2" }}
    >
      <ProGate preview={preview}>
        {preview}

        {/* TensorBoard integration */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">TensorBoard с ML-Agents</h2>
          <CyberCodeBlock language="python" filename="terminal">
{`# Запуск обучения (TensorBoard логи создаются автоматически)
mlagents-learn config/trainer.yaml --run-id=experiment_01

# Логи сохраняются в: results/experiment_01/

# Запуск TensorBoard
tensorboard --logdir results --port 6006

# Откройте в браузере: http://localhost:6006

# Сравнение нескольких экспериментов
tensorboard --logdir results  # Покажет все run-id`}
          </CyberCodeBlock>
        </section>

        {/* Key metrics */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Ключевые метрики</h2>
          <div className="space-y-3">
            {[
              { metric: "Cumulative Reward", desc: "Суммарная награда за эпизод. Главная метрика — должна расти.", icon: BarChart3, color: "text-primary" },
              { metric: "Entropy", desc: "Мера случайности политики. Падает при обучении, но слишком быстрое падение → агент перестал исследовать.", icon: Lightbulb, color: "text-secondary" },
              { metric: "Value Loss", desc: "Ошибка предсказания V(s). Должна сначала расти (critic учится), потом стабилизироваться.", icon: BarChart3, color: "text-accent" },
              { metric: "Policy Loss", desc: "Потеря при обновлении политики. Нестабильная метрика — смотрите на тренд.", icon: BarChart3, color: "text-green-400" },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-4 rounded-lg bg-card/40 border border-border/30">
                <item.icon className={`w-5 h-5 ${item.color} flex-shrink-0 mt-0.5`} />
                <div>
                  <p className="font-semibold text-sm text-foreground">{item.metric}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interpretation */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Интерпретация графиков</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card/50 border-green-500/30">
              <CardContent className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-green-400">✅ Здоровое обучение</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Reward стабильно растёт</li>
                  <li>• Entropy плавно снижается</li>
                  <li>• Value loss растёт, затем стабилизируется</li>
                  <li>• Episode length уменьшается (агент быстрее решает задачу)</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-destructive/30">
              <CardContent className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-destructive">⚠️ Проблемы</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Reward на плато → уменьшите LR или добавьте curriculum</li>
                  <li>• Entropy → 0 быстро → увеличьте beta (entropy coef)</li>
                  <li>• Value loss растёт бесконечно → уменьшите LR</li>
                  <li>• Reward осциллирует → уменьшите epsilon (PPO clip)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* W&B */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Weights & Biases</h2>
          <CyberCodeBlock language="python" filename="wandb_integration.py">
{`import wandb
from stable_baselines3 import PPO
from stable_baselines3.common.callbacks import BaseCallback

class WandbCallback(BaseCallback):
    def __init__(self):
        super().__init__()

    def _on_step(self):
        if self.n_calls % 1000 == 0:
            wandb.log({
                "reward": self.locals.get("rewards", [0])[-1],
                "timesteps": self.num_timesteps,
            })
        return True

# Инициализация W&B
wandb.init(project="rl-course", name="ppo-cartpole")

model = PPO("MlpPolicy", "CartPole-v1", verbose=1)
model.learn(total_timesteps=100000, callback=WandbCallback())

wandb.finish()`}
          </CyberCodeBlock>

          <Card className="bg-card/40 border-primary/20 mt-4">
            <CardContent className="p-4 flex gap-3 items-start">
              <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">W&B vs TensorBoard:</strong> W&B хранит данные в облаке,
                позволяет сравнивать эксперименты в команде и автоматически логирует гиперпараметры.
                Идеально для командных проектов.
              </div>
            </CardContent>
          </Card>
        </section>

        <Quiz title="Проверь себя: Визуализация" questions={quizQuestions} />
      </ProGate>
    </LessonLayout>
  );
};

export default CourseLesson2_6;
