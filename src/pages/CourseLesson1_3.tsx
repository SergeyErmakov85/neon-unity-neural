import LessonLayout from "@/components/LessonLayout";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Quiz from "@/components/Quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lightbulb, BarChart3 } from "lucide-react";
import CrossLinkToHub from "@/components/CrossLinkToHub";

const quizQuestions = [
  {
    question: "Сколько действий доступно агенту в среде CartPole-v1?",
    options: ["1 (только вправо)", "2 (влево и вправо)", "4 (вверх, вниз, влево, вправо)", "Непрерывное действие"],
    correctIndex: 1,
  },
  {
    question: "Какой максимальный reward возможен в CartPole-v1?",
    options: ["100", "200", "500", "Неограничен"],
    correctIndex: 2,
  },
  {
    question: "Почему случайный агент получает в среднем ~20 reward?",
    options: [
      "Среда слишком сложная для любого агента",
      "Случайные действия не учитывают состояние — шест быстро падает",
      "Случайный агент использует неправильную функцию потерь",
      "CartPole ограничивает reward до 20",
    ],
    correctIndex: 1,
  },
  {
    question: "Что возвращает env.step(action) в Gymnasium?",
    options: [
      "observation, reward",
      "observation, reward, done",
      "observation, reward, terminated, truncated, info",
      "state, action, reward, next_state",
    ],
    correctIndex: 2,
  },
];

const CourseLesson1_3 = () => {
  return (
    <LessonLayout
      lessonId="1-3"
      lessonTitle="CartPole — твой первый RL-агент"
      lessonNumber="1.3"
      duration="35 мин"
      tags={["#code", "#pytorch", "#gym"]}
      prevLesson={{ path: "/courses/1-2", title: "Установка окружения" }}
      nextLesson={{ path: "/courses/1-4", title: "DQN с нуля" }}
    >
      {/* Colab button */}
      <div className="flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <a href="https://colab.research.google.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            Открыть в Google Colab
          </a>
        </Button>
      </div>

      {/* Intro */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Среда CartPole-v1</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong className="text-foreground">CartPole</strong> — классическая задача RL из библиотеки Gymnasium.
          На тележке закреплён шест. Цель агента — удерживать шест в вертикальном положении,
          двигая тележку влево или вправо.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: "Наблюдения (S)", value: "4: позиция тележки, скорость, угол шеста, угловая скорость" },
            { label: "Действия (A)", value: "2: толкнуть влево (0) или вправо (1)" },
            { label: "Награда (R)", value: "+1 за каждый шаг, пока шест не упал" },
            { label: "Конец эпизода", value: "Угол > 12° или позиция > 2.4, или 500 шагов" },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-lg bg-card/40 border border-border/30">
              <p className="text-xs text-primary font-semibold">{item.label}</p>
              <p className="text-sm text-muted-foreground mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Random agent */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Случайный агент (baseline)</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Начнём с самого простого — агента, который выбирает действия случайно.
          Это наш baseline для сравнения.
        </p>

        <CyberCodeBlock language="python" filename="random_agent.py">
{`import gymnasium as gym

env = gym.make("CartPole-v1")
total_rewards = []

for episode in range(100):
    obs, info = env.reset()
    episode_reward = 0
    done = False

    while not done:
        action = env.action_space.sample()  # Случайное действие
        obs, reward, terminated, truncated, info = env.step(action)
        episode_reward += reward
        done = terminated or truncated

    total_rewards.append(episode_reward)

avg_reward = sum(total_rewards) / len(total_rewards)
print(f"Средний reward за 100 эпизодов: {avg_reward:.1f}")
# Ожидаемый результат: ~20-25 (случайный агент)`}
        </CyberCodeBlock>

        <Card className="bg-card/40 border-primary/20 mt-4">
          <CardContent className="p-4 flex gap-3 items-start">
            <BarChart3 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Случайный агент получает в среднем <strong className="text-foreground">~20-25</strong> reward.
              Максимум — 500. Наша цель — обучить агента, который стабильно достигает 475+.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Q-table limitations */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Q-таблица и её ограничения</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          В простых средах (как GridWorld) можно использовать Q-таблицу — матрицу,
          где для каждой пары (состояние, действие) хранится ожидаемая награда.
          Но в CartPole состояния <strong className="text-foreground">непрерывные</strong> (позиция, скорость) —
          создать таблицу для бесконечного числа состояний невозможно.
        </p>

        <Card className="bg-card/40 border-accent/20">
          <CardContent className="p-4 flex gap-3 items-start">
            <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm text-foreground">Решение: нейросетевая аппроксимация</p>
              <p className="text-xs text-muted-foreground mt-1">
                Вместо таблицы используем нейронную сеть, которая принимает состояние
                и предсказывает Q-значения для каждого действия. Это основа Deep Q-Network (DQN).
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Neural network Q-learning agent */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Агент на PyTorch</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Реализуем простой нейросетевой Q-learning агент. Сеть принимает 4 наблюдения
          и выдаёт Q-значения для 2 действий.
        </p>

        <CyberCodeBlock language="python" filename="simple_q_agent.py">
{`import torch
import torch.nn as nn
import torch.optim as optim
import gymnasium as gym
import numpy as np
from collections import deque
import random

# Гиперпараметры
LR = 1e-3
GAMMA = 0.99
EPSILON_START = 1.0
EPSILON_END = 0.01
EPSILON_DECAY = 0.995
EPISODES = 500
BATCH_SIZE = 64
MEMORY_SIZE = 10000

# Q-сеть: 4 входа → 128 → 128 → 2 выхода
class QNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(4, 128),
            nn.ReLU(),
            nn.Linear(128, 128),
            nn.ReLU(),
            nn.Linear(128, 2)
        )

    def forward(self, x):
        return self.net(x)

# Инициализация
env = gym.make("CartPole-v1")
q_net = QNetwork()
optimizer = optim.Adam(q_net.parameters(), lr=LR)
memory = deque(maxlen=MEMORY_SIZE)
epsilon = EPSILON_START
rewards_history = []

for episode in range(EPISODES):
    obs, _ = env.reset()
    total_reward = 0

    while True:
        # Epsilon-greedy выбор действия
        if random.random() < epsilon:
            action = env.action_space.sample()
        else:
            with torch.no_grad():
                q_vals = q_net(torch.FloatTensor(obs))
                action = q_vals.argmax().item()

        next_obs, reward, term, trunc, _ = env.step(action)
        done = term or trunc
        memory.append((obs, action, reward, next_obs, done))
        obs = next_obs
        total_reward += reward

        # Обучение на мини-батче
        if len(memory) >= BATCH_SIZE:
            batch = random.sample(memory, BATCH_SIZE)
            states = torch.FloatTensor([b[0] for b in batch])
            actions = torch.LongTensor([b[1] for b in batch])
            rewards = torch.FloatTensor([b[2] for b in batch])
            next_states = torch.FloatTensor([b[3] for b in batch])
            dones = torch.FloatTensor([b[4] for b in batch])

            current_q = q_net(states).gather(1, actions.unsqueeze(1))
            next_q = q_net(next_states).max(1)[0].detach()
            target_q = rewards + GAMMA * next_q * (1 - dones)

            loss = nn.MSELoss()(current_q.squeeze(), target_q)
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

        if done:
            break

    epsilon = max(EPSILON_END, epsilon * EPSILON_DECAY)
    rewards_history.append(total_reward)

    if (episode + 1) % 50 == 0:
        avg = np.mean(rewards_history[-50:])
        print(f"Episode {episode+1}, Avg Reward: {avg:.1f}, ε: {epsilon:.3f}")`}
        </CyberCodeBlock>
      </section>

      {/* Results visualization */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Визуализация результатов</h2>

        <CyberCodeBlock language="python" filename="plot_results.py">
{`import matplotlib.pyplot as plt

# Скользящее среднее за 50 эпизодов
window = 50
smoothed = [np.mean(rewards_history[max(0,i-window):i+1])
            for i in range(len(rewards_history))]

plt.figure(figsize=(10, 5))
plt.plot(rewards_history, alpha=0.3, color='cyan', label='Reward')
plt.plot(smoothed, color='magenta', linewidth=2, label=f'Avg (окно={window})')
plt.axhline(y=475, color='lime', linestyle='--', label='Цель: 475')
plt.xlabel('Эпизод')
plt.ylabel('Reward')
plt.title('Обучение Q-агента на CartPole-v1')
plt.legend()
plt.grid(alpha=0.2)
plt.show()`}
        </CyberCodeBlock>

        <Card className="bg-card/40 border-border/30 mt-4">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground mb-3">Ожидаемая динамика обучения:</p>
            <div className="space-y-2">
              {[
                { ep: "0-100", reward: "~20-50", note: "Исследование (высокий ε)" },
                { ep: "100-250", reward: "~100-300", note: "Активное обучение" },
                { ep: "250-400", reward: "~300-475", note: "Стабилизация" },
                { ep: "400-500", reward: "~475-500", note: "Конвергенция" },
              ].map((row, i) => (
                <div key={i} className="flex items-center gap-4 text-sm">
                  <span className="font-mono text-xs text-primary w-20">{row.ep}</span>
                  <span className="text-foreground w-24">{row.reward}</span>
                  <span className="text-muted-foreground">{row.note}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Quiz */}
      <Quiz title="Проверь себя: CartPole" questions={quizQuestions} />
    </LessonLayout>
  );
};

export default CourseLesson1_3;
