import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, FlaskConical, Play } from "lucide-react";

const codeBlock = (code: string) => (
  <pre className="bg-card/80 border border-primary/20 rounded-lg p-4 overflow-x-auto text-xs md:text-sm font-mono leading-relaxed">
    <code>{code}</code>
  </pre>
);

// Lab 1: Discounting interactive
const DiscountLab = () => {
  const [gamma, setGamma] = useState(0.99);
  const rewards = [1, 1, 1, 1, 1, 10];

  const computeReturn = (rewards: number[], g: number) => {
    let G = 0;
    const returns: number[] = [];
    for (let i = rewards.length - 1; i >= 0; i--) {
      G = rewards[i] + g * G;
      returns.unshift(G);
    }
    return returns;
  };

  const returns = computeReturn(rewards, gamma);
  const gammaValues = [0.5, 0.9, 0.99, 0.999];
  const allReturns = gammaValues.map(g => ({ gamma: g, G0: computeReturn(rewards, g)[0] }));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-primary mb-2">Цель</h3>
        <p className="text-muted-foreground">
          Понять влияние γ (gamma) на обучение агента. Исследуйте как коэффициент дисконтирования меняет «горизонт планирования».
        </p>
      </div>

      {codeBlock(`def compute_discounted_return(rewards, gamma=0.99):
    """Вычисляет дисконтированный возврат."""
    G = 0
    returns = []
    for r in reversed(rewards):
        G = r + gamma * G
        returns.insert(0, G)
    return returns

rewards = [1, 1, 1, 1, 1, 10]
for gamma in [0.5, 0.9, 0.99, 0.999]:
    returns = compute_discounted_return(rewards, gamma)
    print(f"γ={gamma}: G_0={returns[0]:.2f}")`)}

      <Card className="border-primary/30">
        <CardHeader><CardTitle className="text-sm">Интерактивный эксперимент</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>γ (gamma)</span><span className="text-primary font-mono">{gamma.toFixed(3)}</span>
            </div>
            <Slider value={[gamma]} onValueChange={([v]) => setGamma(v)} min={0} max={1} step={0.001} />
          </div>

          <div className="text-sm">
            <p className="text-muted-foreground mb-1">Награды: [{rewards.join(", ")}]</p>
            <p className="font-mono">G₀ = <span className="text-primary font-bold">{returns[0].toFixed(2)}</span></p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {allReturns.map(r => (
              <div key={r.gamma} className={`p-3 rounded-lg border text-center ${r.gamma === gamma ? "border-primary bg-primary/10" : "border-border/50 bg-card/50"}`}>
                <div className="text-xs text-muted-foreground">γ = {r.gamma}</div>
                <div className="font-mono font-bold">{r.G0.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-accent/30">
        <CardHeader><CardTitle className="text-sm">🧠 Вопросы для размышления</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>1. Как γ влияет на «горизонт планирования» агента?</p>
          <p>2. Почему γ=1 может быть проблематичным?</p>
          <p>3. Какой γ выбрали бы для задачи с долгосрочным планированием?</p>
        </CardContent>
      </Card>
    </div>
  );
};

// Lab 2: Exploration vs Exploitation
const ExplorationLab = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-primary mb-2">Цель</h3>
      <p className="text-muted-foreground">
        Изучить баланс между exploration и exploitation. Сравнить стратегии ε-greedy, decaying ε и UCB.
      </p>
    </div>

    {codeBlock(`import numpy as np

def epsilon_greedy(q_values, epsilon=0.1):
    """ε-жадная политика"""
    if np.random.random() < epsilon:
        return np.random.randint(len(q_values))
    return np.argmax(q_values)

def softmax_exploration(q_values, temperature=1.0):
    """Softmax (Boltzmann) exploration"""
    exp_q = np.exp(q_values / temperature)
    probs = exp_q / exp_q.sum()
    return np.random.choice(len(q_values), p=probs)

def ucb_action(q_values, counts, t, c=2.0):
    """Upper Confidence Bound"""
    ucb = q_values + c * np.sqrt(np.log(t + 1) / (counts + 1e-5))
    return np.argmax(ucb)`)}

    <div>
      <h3 className="text-lg font-semibold text-primary mb-2">Задания</h3>
      <ul className="space-y-1 text-muted-foreground list-disc list-inside text-sm">
        <li>Реализуйте ε-жадную политику</li>
        <li>Реализуйте softmax (Boltzmann) exploration</li>
        <li>Сравните стратегии: ε-greedy, decaying ε, UCB</li>
        <li>Визуализируйте результаты на задаче Multi-Armed Bandit</li>
      </ul>
    </div>
  </div>
);

// Lab 3: Experience Replay
const ReplayLab = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-primary mb-2">Цель</h3>
      <p className="text-muted-foreground">
        Понять важность и реализацию буфера опыта для стабильного обучения.
      </p>
    </div>

    {codeBlock(`import random
from collections import deque

class ReplayBuffer:
    def __init__(self, capacity=10000):
        self.buffer = deque(maxlen=capacity)
    
    def push(self, state, action, reward, next_state, done):
        self.buffer.append((state, action, reward, next_state, done))
    
    def sample(self, batch_size=32):
        batch = random.sample(self.buffer, batch_size)
        states, actions, rewards, next_states, dones = zip(*batch)
        return (
            np.array(states), np.array(actions),
            np.array(rewards), np.array(next_states),
            np.array(dones)
        )
    
    def __len__(self):
        return len(self.buffer)

# Prioritized Experience Replay
class PrioritizedReplayBuffer:
    def __init__(self, capacity=10000, alpha=0.6):
        self.buffer = deque(maxlen=capacity)
        self.priorities = deque(maxlen=capacity)
        self.alpha = alpha
    
    def push(self, state, action, reward, next_state, done, td_error=1.0):
        self.buffer.append((state, action, reward, next_state, done))
        self.priorities.append(abs(td_error) + 1e-6)
    
    def sample(self, batch_size=32, beta=0.4):
        priorities = np.array(self.priorities) ** self.alpha
        probs = priorities / priorities.sum()
        indices = np.random.choice(len(self.buffer), batch_size, p=probs)
        # Importance sampling weights
        weights = (len(self.buffer) * probs[indices]) ** (-beta)
        weights /= weights.max()
        batch = [self.buffer[i] for i in indices]
        return batch, indices, weights`)}

    <div>
      <h3 className="text-lg font-semibold text-primary mb-2">Задания</h3>
      <ul className="space-y-1 text-muted-foreground list-disc list-inside text-sm">
        <li>Реализуйте класс ReplayBuffer</li>
        <li>Сравните обучение с/без replay buffer</li>
        <li>Исследуйте влияние размера буфера</li>
        <li>Реализуйте Prioritized Experience Replay</li>
      </ul>
    </div>
  </div>
);

const Labs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> На главную
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-neon bg-clip-text text-transparent">
          <FlaskConical className="w-8 h-8 inline mr-2" /> Практикумы
        </h1>
        <p className="text-muted-foreground mb-8">
          Лабораторные работы в стиле Jupyter — код, эксперименты и вопросы для размышления.
        </p>

        <Tabs defaultValue="discount" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="discount">Lab 1: Дисконтирование</TabsTrigger>
            <TabsTrigger value="explore">Lab 2: Exploration</TabsTrigger>
            <TabsTrigger value="replay">Lab 3: Replay Buffer</TabsTrigger>
          </TabsList>

          <TabsContent value="discount"><DiscountLab /></TabsContent>
          <TabsContent value="explore"><ExplorationLab /></TabsContent>
          <TabsContent value="replay"><ReplayLab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Labs;
