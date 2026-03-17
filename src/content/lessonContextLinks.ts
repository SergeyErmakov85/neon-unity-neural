import type { HubId } from "./hubs";

export type LinkPlacement =
  | "after-intro"
  | "after-core-explanation"
  | "after-code"
  | "lesson-end";

export interface ContextLink {
  hubId: HubId;
  placement: LinkPlacement;
  title: string;
  whyThisNow: string;
  ctaLabel: string;
  isPrimary: boolean;
}

/**
 * Maps lessonSlug → array of contextual hub links shown inside lesson pages.
 */
export const LESSON_CONTEXT_LINKS: Record<string, ContextLink[]> = {
  /* ── Stage 1 ── */
  "basics-rl": [
    {
      hubId: "math-rl",
      placement: "after-intro",
      title: "Математика за MDP",
      whyThisNow: "Чтобы понять награды и переходы, полезно знать основы вероятностей.",
      ctaLabel: "Открыть математику",
      isPrimary: false,
    },
  ],
  "setup-pytorch-unity": [
    {
      hubId: "pytorch",
      placement: "after-core-explanation",
      title: "Шпаргалка PyTorch",
      whyThisNow: "Здесь мы устанавливаем PyTorch — загляните в хаб за справкой по тензорам.",
      ctaLabel: "PyTorch хаб",
      isPrimary: true,
    },
    {
      hubId: "unity-ml-agents",
      placement: "after-code",
      title: "Настройка Unity ML-Agents",
      whyThisNow: "Параллельно настраиваем Unity — подробности в хабе.",
      ctaLabel: "Unity хаб",
      isPrimary: true,
    },
  ],
  "cartpole": [
    {
      hubId: "pytorch",
      placement: "after-code",
      title: "Нейросеть в PyTorch",
      whyThisNow: "CartPole использует простую нейросеть — повторите основы nn.Module.",
      ctaLabel: "Повторить PyTorch",
      isPrimary: false,
    },
    {
      hubId: "project",
      placement: "lesson-end",
      title: "Проект: CartPole",
      whyThisNow: "Закрепите знания в самостоятельном проекте.",
      ctaLabel: "К проекту",
      isPrimary: true,
    },
  ],
  "basic-dqn": [
    {
      hubId: "deep-rl",
      placement: "after-core-explanation",
      title: "Теория DQN",
      whyThisNow: "Глубже разберём experience replay и target network.",
      ctaLabel: "Deep RL хаб",
      isPrimary: true,
    },
    {
      hubId: "math-rl",
      placement: "after-intro",
      title: "Уравнение Беллмана",
      whyThisNow: "DQN опирается на уравнение Беллмана — освежите формулу.",
      ctaLabel: "К математике",
      isPrimary: false,
    },
  ],

  /* ── Stage 2 ── */
  "policy-gradient": [
    {
      hubId: "math-rl",
      placement: "after-core-explanation",
      title: "Градиент политики",
      whyThisNow: "Вывод REINFORCE требует знания логарифмических производных.",
      ctaLabel: "Математика",
      isPrimary: true,
    },
  ],
  "ppo": [
    {
      hubId: "deep-rl",
      placement: "after-core-explanation",
      title: "PPO в деталях",
      whyThisNow: "Clipping, GAE и другие нюансы PPO подробно в хабе.",
      ctaLabel: "Deep RL хаб",
      isPrimary: true,
    },
  ],
  "continuous-actions": [
    {
      hubId: "unity-ml-agents",
      placement: "after-code",
      title: "Continuous в Unity",
      whyThisNow: "Настройка непрерывных действий в ML-Agents отличается от дискретных.",
      ctaLabel: "Unity хаб",
      isPrimary: false,
    },
  ],
  "unity-ml-agents-intro": [
    {
      hubId: "unity-ml-agents",
      placement: "after-intro",
      title: "Полный гайд ML-Agents",
      whyThisNow: "Подробная документация по всем компонентам фреймворка.",
      ctaLabel: "Unity хаб",
      isPrimary: true,
    },
    {
      hubId: "project",
      placement: "lesson-end",
      title: "Проект: 3D Ball",
      whyThisNow: "Попробуйте обучить агента в реальной 3D-среде.",
      ctaLabel: "К проекту",
      isPrimary: true,
    },
  ],

  /* ── Stage 3 ── */
  "sac": [
    {
      hubId: "deep-rl",
      placement: "after-core-explanation",
      title: "SAC: теория",
      whyThisNow: "Энтропийная регуляризация и двойной Q — детали в хабе.",
      ctaLabel: "Deep RL хаб",
      isPrimary: true,
    },
  ],
  "multi-agent": [
    {
      hubId: "unity-ml-agents",
      placement: "after-code",
      title: "MAPOCA в Unity",
      whyThisNow: "Мультиагентное обучение через self-play в ML-Agents.",
      ctaLabel: "Unity хаб",
      isPrimary: true,
    },
    {
      hubId: "project",
      placement: "lesson-end",
      title: "Проект: Soccer",
      whyThisNow: "Командный футбол — лучший способ закрепить мультиагентные навыки.",
      ctaLabel: "К проекту",
      isPrimary: false,
    },
  ],
  "curriculum-learning": [
    {
      hubId: "unity-ml-agents",
      placement: "after-core-explanation",
      title: "Curriculum в Unity",
      whyThisNow: "Настройка curriculum learning в yaml-конфиге ML-Agents.",
      ctaLabel: "Unity хаб",
      isPrimary: false,
    },
  ],
  "deployment": [
    {
      hubId: "project",
      placement: "lesson-end",
      title: "Финальный проект",
      whyThisNow: "Объедините все знания в итоговом проекте с деплоем.",
      ctaLabel: "К проекту",
      isPrimary: true,
    },
  ],
};
