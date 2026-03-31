import LessonLayout from "@/components/LessonLayout";
import ProUpgradeBanner from "@/components/ProUpgradeBanner";
import CyberCodeBlock from "@/components/CyberCodeBlock";
import Quiz from "@/components/Quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Lightbulb, Shield, Shuffle, Database, RefreshCw } from "lucide-react";
import CrossLinkToHub from "@/components/CrossLinkToHub";

const quizQuestions = [
  {
    question: "Зачем в DQN используется Target Network?",
    options: [
      "Для ускорения обучения",
      "Для стабилизации — target не меняется каждый шаг",
      "Для увеличения размера батча",
      "Target Network не используется в DQN",
    ],
    correctIndex: 1,
  },
  {
    question: "Что хранит Replay Buffer?",
    options: [
      "Только последние наблюдения",
      "Веса нейронной сети",
      "Переходы (s, a, r, s', done)",
      "Градиенты функции потерь",
    ],
    correctIndex: 2,
  },
  {
    question: "Как работает epsilon-greedy с decay?",
    options: [
      "ε всегда равен 0.5",
      "ε начинается высоким и постепенно уменьшается",
      "ε увеличивается со временем",
      "ε случайно меняется каждый эпизод",
    ],
    correctIndex: 1,
  },
  {
    question: "Какая функция потерь обычно используется в DQN?",
    options: [
      "Cross-Entropy Loss",
      "Hinge Loss",
      "MSE Loss (или Huber Loss)",
      "KL Divergence",
    ],
    correctIndex: 2,
  },
  {
    question: "Как часто обновляется Target Network в классическом DQN?",
    options: [
      "Каждый шаг",
      "Каждый эпизод",
      "Каждые N шагов (hard update)",
      "Никогда — она фиксирована",
    ],
    correctIndex: 2,
  },
];

const CourseLesson1_4 = () => {
  return (
    <LessonLayout
      lessonId="1-4"
      lessonTitle="DQN с нуля на PyTorch"
      lessonNumber="1.4"
      duration="45 мин"
      tags={["#code", "#pytorch", "#dqn", "#deep"]}
      prevLesson={{ path: "/courses/1-3", title: "CartPole агент" }}
      nextLesson={{ path: "/courses/project-1", title: "Проект 1" }}
    >
      {/* Colab */}
      <div className="flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <a href="https://colab.research.google.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            Открыть в Google Colab
          </a>
        </Button>
      </div>

      {/* Architecture */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Архитектура DQN</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          <strong className="text-foreground">Deep Q-Network</strong> — алгоритм, предложенный DeepMind в 2015 году.
          Две ключевые инновации сделали обучение стабильным:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: Shield,
              title: <><CrossLinkToHub hubPath="/algorithms/dqn" hubTitle="DQN — Target Network">Target Network</CrossLinkToHub></>,
              desc: "Копия Q-сети, обновляемая каждые N шагов. Стабилизирует target-значения, предотвращая «гонку за собственным хвостом».",
              color: "text-primary",
            },
            {
              icon: Database,
              title: <><CrossLinkToHub hubPath="/algorithms/dqn" hubTitle="DQN — Replay Buffer">Experience Replay</CrossLinkToHub></>,
              desc: "Буфер переходов (s, a, r, s', done). Разрушает корреляцию между последовательными шагами, делая обучение эффективнее.",
              color: "text-secondary",
            },
          ].map((item, i) => (
            <Card key={i} className="bg-card/50 border-border/40">
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* DQN flow */}
        <div className="mt-6 p-4 rounded-lg bg-card/30 border border-border/30">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-3">Цикл обучения DQN</p>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {[
              { label: "Sample batch", icon: Shuffle, color: "text-primary" },
              { label: "Compute Q(s,a)", icon: RefreshCw, color: "text-secondary" },
              { label: "Compute target", icon: Shield, color: "text-accent" },
              { label: "MSE Loss", icon: RefreshCw, color: "text-green-400" },
              { label: "Gradient step", icon: RefreshCw, color: "text-primary" },
              { label: "Update target net", icon: Database, color: "text-secondary" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className={`flex items-center gap-1 px-2 py-1 rounded bg-muted/30 border border-border/30 ${step.color}`}>
                  <step.icon className="w-3 h-3" />
                  <span className="text-xs">{step.label}</span>
                </span>
                {i < 5 && <span className="text-muted-foreground/50">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Replay Buffer */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Replay Buffer</h2>

        <CyberCodeBlock language="python" filename="replay_buffer.py">
{`import random
from collections import deque, namedtuple

Transition = namedtuple('Transition',
    ('state', 'action', 'reward', 'next_state', 'done'))

class ReplayBuffer:
    def __init__(self, capacity=100000):
        self.buffer = deque(maxlen=capacity)

    def push(self, state, action, reward, next_state, done):
        self.buffer.append(Transition(state, action, reward, next_state, done))

    def sample(self, batch_size):
        batch = random.sample(self.buffer, batch_size)
        return Transition(*zip(*batch))

    def __len__(self):
        return len(self.buffer)`}
        </CyberCodeBlock>
      </section>

      {/* Epsilon-greedy */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Epsilon-greedy стратегия</h2>

        <Card className="bg-card/40 border-primary/20 mb-4">
          <CardContent className="p-4 flex gap-3 items-start">
            <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <strong className="text-foreground">Дилемма exploration vs exploitation:</strong> агент должен
              исследовать среду (exploration) и использовать уже полученные знания (exploitation).
              ε-greedy решает это: с вероятностью ε — случайное действие, иначе — лучшее по Q-значению.
            </div>
          </CardContent>
        </Card>

        <CyberCodeBlock language="python" filename="epsilon_greedy.py">
{`def select_action(state, q_net, epsilon, n_actions=2):
    """Epsilon-greedy выбор действия"""
    if random.random() < epsilon:
        return random.randrange(n_actions)  # Исследование
    else:
        with torch.no_grad():
            q_values = q_net(torch.FloatTensor(state))
            return q_values.argmax().item()  # Эксплуатация

# Decay: ε уменьшается экспоненциально
epsilon = max(EPS_END, EPS_START * EPS_DECAY ** step)`}
        </CyberCodeBlock>
      </section>

      {/* Full DQN code */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Полный код DQN-агента</h2>

        <CyberCodeBlock language="python" filename="dqn_agent.py">
{`import torch
import torch.nn as nn
import torch.optim as optim
import gymnasium as gym
import numpy as np
import random
from collections import deque, namedtuple

# ── Гиперпараметры ──────────────────────────────────────
LR = 1e-3
GAMMA = 0.99
EPS_START = 1.0
EPS_END = 0.01
EPS_DECAY = 0.995
EPISODES = 600
BATCH_SIZE = 64
MEMORY_SIZE = 100000
TARGET_UPDATE = 10  # Обновление target-сети каждые N эпизодов
SEED = 42

# ── Воспроизводимость ───────────────────────────────────
random.seed(SEED)
np.random.seed(SEED)
torch.manual_seed(SEED)

# ── Replay Buffer ───────────────────────────────────────
Transition = namedtuple('Transition',
    ('state', 'action', 'reward', 'next_state', 'done'))

class ReplayBuffer:
    def __init__(self, capacity):
        self.buffer = deque(maxlen=capacity)

    def push(self, *args):
        self.buffer.append(Transition(*args))

    def sample(self, batch_size):
        batch = random.sample(self.buffer, batch_size)
        return Transition(*zip(*batch))

    def __len__(self):
        return len(self.buffer)

# ── Q-Network ──────────────────────────────────────────
class DQN(nn.Module):
    def __init__(self, obs_dim=4, n_actions=2):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(obs_dim, 128),
            nn.ReLU(),
            nn.Linear(128, 128),
            nn.ReLU(),
            nn.Linear(128, n_actions)
        )

    def forward(self, x):
        return self.net(x)

# ── Инициализация ──────────────────────────────────────
env = gym.make("CartPole-v1")
policy_net = DQN()
target_net = DQN()
target_net.load_state_dict(policy_net.state_dict())  # Копируем веса
target_net.eval()  # Target-сеть не обучается

optimizer = optim.Adam(policy_net.parameters(), lr=LR)
memory = ReplayBuffer(MEMORY_SIZE)
epsilon = EPS_START
rewards_history = []

# ── Цикл обучения ─────────────────────────────────────
for episode in range(EPISODES):
    state, _ = env.reset(seed=SEED + episode)
    total_reward = 0

    while True:
        # Epsilon-greedy
        if random.random() < epsilon:
            action = env.action_space.sample()
        else:
            with torch.no_grad():
                action = policy_net(torch.FloatTensor(state)).argmax().item()

        next_state, reward, term, trunc, _ = env.step(action)
        done = term or trunc
        memory.push(state, action, reward, next_state, done)
        state = next_state
        total_reward += reward

        # Обучение
        if len(memory) >= BATCH_SIZE:
            batch = memory.sample(BATCH_SIZE)

            states = torch.FloatTensor(np.array(batch.state))
            actions = torch.LongTensor(batch.action).unsqueeze(1)
            rewards = torch.FloatTensor(batch.reward)
            next_states = torch.FloatTensor(np.array(batch.next_state))
            dones = torch.FloatTensor(batch.done)

            # Q(s, a) из policy-сети
            q_values = policy_net(states).gather(1, actions).squeeze()

            # max Q(s', a') из target-сети
            with torch.no_grad():
                next_q = target_net(next_states).max(1)[0]
                target = rewards + GAMMA * next_q * (1 - dones)

            loss = nn.SmoothL1Loss()(q_values, target)  # Huber loss
            optimizer.zero_grad()
            loss.backward()
            torch.nn.utils.clip_grad_norm_(policy_net.parameters(), 1.0)
            optimizer.step()

        if done:
            break

    # Decay epsilon
    epsilon = max(EPS_END, epsilon * EPS_DECAY)
    rewards_history.append(total_reward)

    # Обновление target-сети
    if (episode + 1) % TARGET_UPDATE == 0:
        target_net.load_state_dict(policy_net.state_dict())

    if (episode + 1) % 50 == 0:
        avg = np.mean(rewards_history[-50:])
        print(f"Ep {episode+1} | Avg: {avg:.1f} | ε: {epsilon:.3f}")

print(f"\\nФинальный средний reward (последние 100): "
      f"{np.mean(rewards_history[-100:]):.1f}")`}
        </CyberCodeBlock>
      </section>

      {/* Convergence graph */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">График сходимости</h2>

        <CyberCodeBlock language="python" filename="plot_convergence.py">
{`import matplotlib.pyplot as plt

window = 50
avg_rewards = [np.mean(rewards_history[max(0,i-window):i+1])
               for i in range(len(rewards_history))]

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

# Reward
ax1.plot(rewards_history, alpha=0.2, color='cyan')
ax1.plot(avg_rewards, color='magenta', linewidth=2)
ax1.axhline(y=475, color='lime', linestyle='--', alpha=0.7)
ax1.set_xlabel('Эпизод')
ax1.set_ylabel('Reward')
ax1.set_title('DQN: Reward vs Episodes')
ax1.legend(['Raw', f'Avg-{window}', 'Target=475'])

# Epsilon
eps_vals = [max(EPS_END, EPS_START * EPS_DECAY**i) for i in range(EPISODES)]
ax2.plot(eps_vals, color='cyan')
ax2.set_xlabel('Эпизод')
ax2.set_ylabel('Epsilon')
ax2.set_title('Epsilon Decay')

plt.tight_layout()
plt.show()`}
        </CyberCodeBlock>
      </section>

      {/* Quiz */}
      <Quiz title="Проверь себя: DQN" questions={quizQuestions} lessonPath="/courses/1-4" nextLesson={{ path: "/courses/project-1", title: "Проект: Балансировка шеста" }} />

      {/* PRO Upgrade Banner */}
      <ProUpgradeBanner />
    </LessonLayout>
  );
};

export default CourseLesson1_4;
