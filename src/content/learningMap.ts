import { LESSON_CONTEXT_LINKS, type ContextLink } from "./lessonContextLinks";

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  contextLinks: ContextLink[];
}

export interface Stage {
  id: string;
  slug: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

function linksFor(slug: string): ContextLink[] {
  return LESSON_CONTEXT_LINKS[slug] ?? [];
}

export const LEARNING_MAP: Stage[] = [
  {
    id: "stage-1",
    slug: "stage-1",
    title: "Основы RL",
    description: "Фундамент: теория, окружение, первый агент и базовый алгоритм.",
    lessons: [
      { id: "1-1", slug: "basics-rl", title: "Основы Reinforcement Learning", contextLinks: linksFor("basics-rl") },
      { id: "1-2", slug: "setup-pytorch-unity", title: "Установка PyTorch + Unity", contextLinks: linksFor("setup-pytorch-unity") },
      { id: "1-3", slug: "cartpole", title: "Первый агент: CartPole", contextLinks: linksFor("cartpole") },
      { id: "1-4", slug: "basic-dqn", title: "Базовый DQN", contextLinks: linksFor("basic-dqn") },
    ],
  },
  {
    id: "stage-2",
    slug: "stage-2",
    title: "Продвинутые методы",
    description: "Policy Gradient, PPO, непрерывные действия и Unity ML-Agents.",
    lessons: [
      { id: "2-1", slug: "policy-gradient", title: "Policy Gradient (REINFORCE)", contextLinks: linksFor("policy-gradient") },
      { id: "2-2", slug: "ppo", title: "PPO", contextLinks: linksFor("ppo") },
      { id: "2-3", slug: "continuous-actions", title: "Непрерывные действия", contextLinks: linksFor("continuous-actions") },
      { id: "2-4", slug: "unity-ml-agents-intro", title: "Unity ML-Agents", contextLinks: linksFor("unity-ml-agents-intro") },
    ],
  },
  {
    id: "stage-3",
    slug: "stage-3",
    title: "Мастерство",
    description: "SAC, мультиагентные системы, curriculum learning и деплой.",
    lessons: [
      { id: "3-1", slug: "sac", title: "SAC", contextLinks: linksFor("sac") },
      { id: "3-2", slug: "multi-agent", title: "Мультиагентное обучение", contextLinks: linksFor("multi-agent") },
      { id: "3-3", slug: "curriculum-learning", title: "Curriculum Learning", contextLinks: linksFor("curriculum-learning") },
      { id: "3-4", slug: "deployment", title: "Деплой модели", contextLinks: linksFor("deployment") },
    ],
  },
];
