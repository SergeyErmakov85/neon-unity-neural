import { Button } from "@/components/ui/button";
import { ArrowLeft, Code2, Brain, Lightbulb, Settings2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Math from "@/components/Math";
import CyberCodeBlock from "@/components/CyberCodeBlock";

const PyTorchModule = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            На главную
          </Button>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">PyTorch</span>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-neon bg-clip-text text-transparent">
            DQN на PyTorch: среда Taxi-v3
          </span>
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Практическая реализация Deep Q-Network для задачи навигации такси с использованием PyTorch и Gymnasium
        </p>

        {/* Section 1: Overview */}
        <Section icon={<Brain className="w-5 h-5 text-primary" />} title="Обзор задачи">
          <p>
            Среда <strong className="text-foreground">Taxi-v3</strong> из библиотеки Gymnasium — классическая задача обучения с подкреплением. Агент-такси должен подобрать пассажира и доставить его в пункт назначения на сетке 5×5.
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li><strong className="text-foreground">Состояния:</strong> <Math display={false}>{`|\\mathcal{S}| = 500`}</Math> (позиция такси, позиция пассажира, пункт назначения)</li>
            <li><strong className="text-foreground">Действия:</strong> <Math display={false}>{`|\\mathcal{A}| = 6`}</Math> (вверх, вниз, влево, вправо, подобрать, высадить)</li>
            <li><strong className="text-foreground">Награды:</strong> +20 за успешную доставку, −10 за неправильную посадку/высадку, −1 за каждый шаг</li>
          </ul>

          <InfoBox color="primary" title="Связь с теорией (Модули 1–5)">
            <p className="text-sm">
              Эта реализация объединяет: <strong className="text-foreground">MDP</strong> (Модуль 3), <strong className="text-foreground">уравнение Беллмана</strong> и <strong className="text-foreground">Q-learning</strong> (Модуль 5), <strong className="text-foreground">градиентный спуск</strong> и <strong className="text-foreground">Adam</strong> (Модуль 4), <strong className="text-foreground">нейросетевую аппроксимацию</strong> Q-функции (Модуль 2).
            </p>
          </InfoBox>
        </Section>

        {/* Section 2: Architecture */}
        <Section icon={<Settings2 className="w-5 h-5 text-secondary" />} title="Архитектура DQN">
          <p>
            Нейросеть аппроксимирует Q-функцию <Math display={false}>{`Q(s,a;\\theta)`}</Math>. Архитектура:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li>Вход: one-hot вектор состояния размерности <Math display={false}>{`500`}</Math></li>
            <li>Скрытый слой: 24 нейрона с активацией ReLU</li>
            <li>Выход: 6 значений (по одному Q-значению для каждого действия)</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Гиперпараметры</h3>
          <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border border-border/30 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-card/60">
                  <th className="text-left p-3 text-foreground font-semibold border-b border-border/30">Параметр</th>
                  <th className="text-left p-3 text-foreground font-semibold border-b border-border/30">Значение</th>
                  <th className="text-left p-3 text-foreground font-semibold border-b border-border/30">Описание</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/20">
                  <td className="p-3"><Math display={false}>{`\\gamma`}</Math></td>
                  <td className="p-3">0.99</td>
                  <td className="p-3">Дисконтирование будущих наград</td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="p-3"><Math display={false}>{`\\varepsilon`}</Math></td>
                  <td className="p-3">0.1</td>
                  <td className="p-3">Вероятность случайного действия (exploration)</td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="p-3"><Math display={false}>{`\\alpha`}</Math> (lr)</td>
                  <td className="p-3">0.01</td>
                  <td className="p-3">Скорость обучения Adam</td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="p-3">Loss</td>
                  <td className="p-3">MSE</td>
                  <td className="p-3">Среднеквадратичная ошибка</td>
                </tr>
                <tr>
                  <td className="p-3">Эпизоды</td>
                  <td className="p-3">1000</td>
                  <td className="p-3">Количество тренировочных эпизодов</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Формула обновления Q-значений</h3>
          <p>Целевое значение (target) для обновления сети:</p>
          <Math>{`y = r + \\gamma \\cdot \\max_{a'} Q(s', a'; \\theta) \\cdot (1 - \\text{done})`}</Math>
          <p>Функция потерь:</p>
          <Math>{`L(\\theta) = \\bigl(y - Q(s, a; \\theta)\\bigr)^2`}</Math>
        </Section>

        {/* Section 3: Full Code */}
        <Section icon={<Code2 className="w-5 h-5 text-accent" />} title="Полный код реализации">
          <p>Ниже приведён полный код DQN-агента для среды Taxi-v3 с подробными комментариями на каждую строку:</p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">1. Импорт библиотек и создание среды</h3>
          <CyberCodeBlock language="python" filename="dqn_taxi.py">{`import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
import gymnasium as gym
import numpy as np
import matplotlib.pyplot as plt  # Для визуализации результатов

# Создание среды Taxi-v3
env = gym.make("Taxi-v3")
n_actions = env.action_space.n      # Количество действий (6)
n_states = env.observation_space.n  # Количество состояний (500)`}</CyberCodeBlock>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">2. Определение нейронной сети</h3>
          <CyberCodeBlock language="python" filename="dqn_model.py">{`class DQN(nn.Module):
    def __init__(self, n_states, n_actions):
        super(DQN, self).__init__()
        self.fc = nn.Linear(n_states, 24)   # Полносвязный слой: 500 → 24
        self.out = nn.Linear(24, n_actions)  # Выходной слой: 24 → 6

    def forward(self, x):
        x = F.relu(self.fc(x))  # Активация ReLU
        return self.out(x)       # Q-значения для каждого действия`}</CyberCodeBlock>

          <InfoBox color="secondary" title="Архитектура сети">
            <p className="text-sm">
              Состояние кодируется как one-hot вектор размерности 500 и проходит через один скрытый слой с 24 нейронами. На выходе — 6 Q-значений, по одному для каждого действия.
            </p>
          </InfoBox>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">3. Инициализация и ε-жадная политика</h3>
          <CyberCodeBlock language="python">{`# Инициализация сети, оптимизатора и параметров
policy_net = DQN(n_states, n_actions)
optimizer = optim.Adam(policy_net.parameters(), lr=0.01)
criterion = nn.MSELoss()  # Функция потерь

gamma = 0.99    # Коэффициент дисконтирования
epsilon = 0.1   # Вероятность исследования

# Выбор действия по ε-жадной политике
def select_action(state):
    if np.random.rand() < epsilon:
        # С вероятностью ε — случайное действие (exploration)
        return env.action_space.sample()
    else:
        # Иначе — действие с максимальным Q-значением (exploitation)
        with torch.no_grad():
            state_tensor = torch.eye(n_states)[state].unsqueeze(0)
            return torch.argmax(policy_net(state_tensor)).item()`}</CyberCodeBlock>

          <InfoBox color="accent" title="ε-жадная политика (Модуль 3)">
            <p className="text-sm">
              Вероятность выбора оптимального действия: <Math display={false}>{`P(\\text{opt}) = (1 - \\varepsilon) + \\varepsilon / |\\mathcal{A}| = 0.9 + 0.1/6 \\approx 0.917`}</Math>
            </p>
          </InfoBox>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">4. Цикл обучения</h3>
          <CyberCodeBlock language="python" filename="training_loop.py">{`n_episodes = 1000
rewards = []

for episode in range(n_episodes):
    state, _ = env.reset()       # Сброс среды
    done = False
    total_reward = 0

    while not done:
        action = select_action(state)
        next_state, reward, done, _, _ = env.step(action)
        total_reward += reward

        # Вычисление Q-значений
        state_tensor = torch.eye(n_states)[state]
        next_state_tensor = torch.eye(n_states)[next_state]

        # Целевое Q-значение: r + γ · max_a' Q(s', a') · (1 - done)
        target = reward + gamma * torch.max(
            policy_net(next_state_tensor)
        ).item() * (1 - done)

        # Предсказанное Q-значение для выбранного действия
        prediction = policy_net(state_tensor)[action]

        # Обновление сети
        loss = criterion(prediction, torch.tensor(target))
        optimizer.zero_grad()  # Обнуление градиентов
        loss.backward()        # Обратное распространение
        optimizer.step()       # Шаг оптимизатора Adam

        state = next_state

    rewards.append(total_reward)

    if episode % 100 == 0:
        print(f"Episode {episode}, Total Reward: {total_reward}")

print("Training finished!")`}</CyberCodeBlock>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">5. Визуализация результатов</h3>
          <CyberCodeBlock language="python" filename="plot.py">{`plt.plot(rewards)
plt.xlabel('Episode')
plt.ylabel('Total Reward')
plt.title('Training Progress')
plt.show()`}</CyberCodeBlock>
        </Section>

        {/* Section 4: Key Concepts */}
        <Section icon={<Lightbulb className="w-5 h-5 text-primary" />} title="Ключевые концепции">
          <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">One-hot кодирование состояния</h3>
          <p>
            Состояние кодируется вектором длины 500, где все элементы равны 0, кроме одного (индекс текущего состояния):
          </p>
          <Math>{`\\mathbf{s} = \\text{one\\_hot}(\\text{state}) \\in \\{0, 1\\}^{500}`}</Math>
          <p>Это позволяет нейросети обрабатывать дискретные состояния.</p>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Цикл обучения DQN</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Наблюдаем состояние <Math display={false}>{`s`}</Math></li>
            <li>Выбираем действие <Math display={false}>{`a`}</Math> по ε-жадной политике</li>
            <li>Выполняем действие, получаем <Math display={false}>{`(r, s', \\text{done})`}</Math></li>
            <li>Вычисляем целевое Q-значение: <Math display={false}>{`y = r + \\gamma \\max_{a'} Q(s', a')`}</Math></li>
            <li>Минимизируем <Math display={false}>{`L = (y - Q(s, a))^2`}</Math> через Adam</li>
            <li>Переходим к следующему состоянию</li>
          </ol>

          <h3 className="text-xl font-semibold text-foreground mt-8 mb-3">Упражнения для самопроверки</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Измените <Math display={false}>{`\\varepsilon`}</Math> на 0.3 и 0.01 — как это влияет на скорость обучения?</li>
            <li>Добавьте второй скрытый слой (24 → 24) — улучшится ли сходимость?</li>
            <li>Реализуйте убывающий <Math display={false}>{`\\varepsilon`}</Math> (epsilon decay) от 1.0 до 0.01 за 1000 эпизодов.</li>
            <li>Добавьте Experience Replay буфер размером 10000 — как это повлияет на стабильность?</li>
            <li>Замените MSE на Huber Loss (<code className="text-foreground">nn.SmoothL1Loss</code>) — что изменится?</li>
          </ol>
        </Section>

        {/* Cheat Sheet Link */}
        <div className="mt-12 p-6 rounded-lg bg-card/60 border border-secondary/30 text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">📋 Шпаргалка по PyTorch</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Исчерпывающее руководство: тензоры, autograd, нейросети, цикл обучения, сохранение моделей и многое другое
          </p>
          <Button onClick={() => navigate("/pytorch/cheatsheet")} className="bg-secondary hover:bg-secondary/80 text-secondary-foreground">
            Открыть шпаргалку
          </Button>
        </div>

        {/* Back */}
        <div className="mt-16 flex justify-center">
          <Button variant="outline" onClick={() => navigate("/")} className="border-primary/50 text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            На главную
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

export default PyTorchModule;
