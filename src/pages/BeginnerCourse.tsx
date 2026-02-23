import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Code, Video, CheckSquare, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const lessons = [
  {
    id: 1,
    title: "Основы Reinforcement Learning",
    duration: "30 мин",
    theory: `Unity ML-Agents Toolkit - это открытая библиотека, которая позволяет играм и симуляциям служить средой для обучения интеллектуальных агентов.

Основные компоненты:
• Unity Environment - игровая среда, где агент обучается
• Python API - для обучения моделей с использованием PyTorch
• Unity Package - для интеграции в Unity проекты

ML-Agents использует алгоритмы обучения с подкреплением (Reinforcement Learning), где агент учится принимать решения, получая награды за правильные действия.`,
    code: `# Установка через pip
pip3 install mlagents

# Проверка установки
mlagents-learn --help

# Клонирование репозитория с примерами
git clone https://github.com/Unity-Technologies/ml-agents.git

# Установка пакета в Unity Package Manager
# Window -> Package Manager -> Add package from git URL
# com.unity.ml-agents`,
    videoId: "zPFU30tbyKs",
    tasks: [
      "Установите Python 3.8+ и проверьте версию",
      "Установите mlagents через pip",
      "Создайте новый Unity проект версии 2021.3 или новее",
      "Установите ML-Agents пакет через Package Manager",
      "Откройте пример сцены из пакета ML-Agents"
    ]
  },
  {
    id: 2,
    title: "Установка окружения PyTorch + Unity",
    duration: "45 мин",
    theory: `Агент в ML-Agents - это объект, который может наблюдать за окружением, принимать решения и выполнять действия.

Ключевые методы класса Agent:
• OnEpisodeBegin() - вызывается в начале каждого эпизода обучения
• CollectObservations() - собирает данные об окружении
• OnActionReceived() - получает и выполняет действия от нейросети
• Heuristic() - ручное управление для тестирования

Цикл обучения:
1. Агент собирает наблюдения
2. Нейросеть принимает решение
3. Агент выполняет действие
4. Получает награду
5. Повторяется до конца эпизода`,
    code: `using Unity.MLAgents;
using Unity.MLAgents.Actuators;
using Unity.MLAgents.Sensors;
using UnityEngine;

public class RollerAgent : Agent
{
    Rigidbody rBody;
    public Transform Target;
    public float speed = 10f;

    void Start()
    {
        rBody = GetComponent<Rigidbody>();
    }

    public override void OnEpisodeBegin()
    {
        // Сброс если агент упал
        if (transform.localPosition.y < 0)
        {
            rBody.angularVelocity = Vector3.zero;
            rBody.velocity = Vector3.zero;
            transform.localPosition = new Vector3(0, 0.5f, 0);
        }

        // Рандомная позиция цели
        Target.localPosition = new Vector3(
            Random.value * 8 - 4,
            0.5f,
            Random.value * 8 - 4
        );
    }

    public override void CollectObservations(VectorSensor sensor)
    {
        // Позиция цели (3 значения)
        sensor.AddObservation(Target.localPosition);
        // Позиция агента (3 значения)
        sensor.AddObservation(transform.localPosition);
        // Скорость агента (3 значения)
        sensor.AddObservation(rBody.velocity);
    }

    public override void OnActionReceived(ActionBuffers actions)
    {
        // Получение действий
        Vector3 controlSignal = Vector3.zero;
        controlSignal.x = actions.ContinuousActions[0];
        controlSignal.z = actions.ContinuousActions[1];
        
        // Применение силы
        rBody.AddForce(controlSignal * speed);

        // Награды и штрафы
        float distanceToTarget = Vector3.Distance(
            transform.localPosition, 
            Target.localPosition
        );

        // Достиг цели
        if (distanceToTarget < 1.42f)
        {
            SetReward(1.0f);
            EndEpisode();
        }

        // Упал с платформы
        if (transform.localPosition.y < 0)
        {
            EndEpisode();
        }
    }

    public override void Heuristic(in ActionBuffers actionsOut)
    {
        // Ручное управление для тестирования
        var continuousActionsOut = actionsOut.ContinuousActions;
        continuousActionsOut[0] = Input.GetAxis("Horizontal");
        continuousActionsOut[1] = Input.GetAxis("Vertical");
    }
}`,
    videoId: "fiQsmdwEGT8",
    tasks: [
      "Создайте сцену с плоскостью-платформой",
      "Добавьте куб-агента с Rigidbody",
      "Создайте скрипт RollerAgent и прикрепите к агенту",
      "Добавьте компоненты Behavior Parameters и Decision Requester",
      "Создайте цель (Target) и привяжите в инспекторе",
      "Протестируйте ручное управление через Heuristic"
    ]
  },
  {
    id: 3,
    title: "Первый агент: CartPole",
    duration: "40 мин",
    theory: `Обучение с подкреплением (Reinforcement Learning) - это метод машинного обучения, где агент учится принимать решения через взаимодействие со средой.

Ключевые концепции:
• State (Состояние) - наблюдения агента об окружении
• Action (Действие) - что может делать агент
• Reward (Награда) - обратная связь за действия
• Policy (Политика) - стратегия принятия решений
• Episode (Эпизод) - один цикл от начала до конца

Алгоритмы ML-Agents:
• PPO (Proximal Policy Optimization) - стабильный, универсальный
• SAC (Soft Actor-Critic) - для непрерывных действий
• POCA - для многоагентных систем

Система наград:
✓ Давайте награду за достижение цели (+1.0)
✓ Маленькие награды за прогресс (+0.01)
✗ Штрафы за нежелательное поведение (-0.1)
✗ Не давайте награды слишком часто`,
    code: `# Конфигурация обучения (config.yaml)
behaviors:
  RollerBall:
    trainer_type: ppo
    hyperparameters:
      batch_size: 10
      buffer_size: 100
      learning_rate: 0.0003
      beta: 0.005
      epsilon: 0.2
      lambd: 0.99
      num_epoch: 3
      learning_rate_schedule: linear
    network_settings:
      normalize: false
      hidden_units: 128
      num_layers: 2
    reward_signals:
      extrinsic:
        gamma: 0.99
        strength: 1.0
    max_steps: 500000
    time_horizon: 64
    summary_freq: 10000`,
    videoId: "VMp6pq6_QjI",
    tasks: [
      "Создайте файл конфигурации config.yaml",
      "Настройте параметры для вашего агента",
      "Запустите обучение: mlagents-learn config.yaml --run-id=FirstRun",
      "Следите за процессом в TensorBoard",
      "Проанализируйте графики обучения",
      "Экспортируйте обученную модель .onnx"
    ]
  },
  {
    id: 4,
    title: "Базовый DQN алгоритм",
    duration: "60 мин",
    theory: `Классический пример ML-Agents - балансировка мяча на платформе. Агент учится наклонять платформу, чтобы удерживать мяч.

Архитектура проекта:
• Платформа с возможностью вращения
• Мяч с физикой
• Область обучения (Training Area)
• Система наград

Наблюдения агента (8 float):
- Вращение платформы (x, z)
- Позиция мяча относительно платформы (x, y, z)
- Скорость мяча (x, y, z)

Действия (2 continuous):
- Вращение вокруг оси X
- Вращение вокруг оси Z

Награды:
+0.1 каждый кадр, когда мяч на платформе
-1.0 если мяч упал
Эпизод завершается после падения`,
    code: `using Unity.MLAgents;
using Unity.MLAgents.Actuators;
using Unity.MLAgents.Sensors;
using UnityEngine;

public class Ball3DAgent : Agent
{
    [Header("References")]
    public GameObject ball;
    public GameObject platform;
    
    [Header("Settings")]
    public float rotationSpeed = 50f;
    
    private Rigidbody ballRb;
    private Vector3 ballStartPos;
    private Quaternion platformStartRot;

    public override void Initialize()
    {
        ballRb = ball.GetComponent<Rigidbody>();
        ballStartPos = ball.transform.localPosition;
        platformStartRot = platform.transform.localRotation;
    }

    public override void OnEpisodeBegin()
    {
        // Сброс позиций
        platform.transform.localRotation = platformStartRot;
        ball.transform.localPosition = ballStartPos;
        ballRb.velocity = Vector3.zero;
        ballRb.angularVelocity = Vector3.zero;
    }

    public override void CollectObservations(VectorSensor sensor)
    {
        // Вращение платформы (2)
        sensor.AddObservation(platform.transform.localRotation.z);
        sensor.AddObservation(platform.transform.localRotation.x);
        
        // Позиция мяча (3)
        sensor.AddObservation(ball.transform.localPosition);
        
        // Скорость мяча (3)
        sensor.AddObservation(ballRb.velocity);
    }

    public override void OnActionReceived(ActionBuffers actions)
    {
        // Получение действий
        float rotateX = actions.ContinuousActions[0];
        float rotateZ = actions.ContinuousActions[1];

        // Применение вращения
        Vector3 rotation = new Vector3(rotateX, 0, rotateZ);
        platform.transform.Rotate(
            rotation * rotationSpeed * Time.deltaTime
        );

        // Проверка - мяч на платформе
        if (ball.transform.localPosition.y > 0.5f && 
            ball.transform.localPosition.y < 5f)
        {
            // Награда за удержание мяча
            AddReward(0.1f);
        }

        // Мяч упал
        if (ball.transform.localPosition.y < 0)
        {
            SetReward(-1f);
            EndEpisode();
        }

        // Ограничение длительности эпизода
        if (StepCount > 5000)
        {
            EndEpisode();
        }
    }

    public override void Heuristic(in ActionBuffers actionsOut)
    {
        var continuousActions = actionsOut.ContinuousActions;
        continuousActions[0] = Input.GetAxis("Horizontal");
        continuousActions[1] = Input.GetAxis("Vertical");
    }
}`,
    videoId: "zPFU30tbyKs",
    tasks: [
      "Создайте 3D сцену с платформой и мячом",
      "Настройте физику (Rigidbody, Colliders)",
      "Реализуйте скрипт Ball3DAgent",
      "Добавьте Behavior Parameters (Space Type: Continuous, Actions: 2)",
      "Создайте 16 копий Training Area для ускорения обучения",
      "Запустите обучение на 500k шагов",
      "Протестируйте обученную модель"
    ]
  }
];

const BeginnerCourse = () => {
  const [completedTasks, setCompletedTasks] = useState<Record<number, Set<number>>>({});

  const toggleTask = (lessonId: number, taskIndex: number) => {
    setCompletedTasks(prev => {
      const lessonTasks = new Set(prev[lessonId] || []);
      if (lessonTasks.has(taskIndex)) {
        lessonTasks.delete(taskIndex);
        toast.info("Задание отмечено как невыполненное");
      } else {
        lessonTasks.add(taskIndex);
        toast.success("Задание выполнено!");
      }
      return { ...prev, [lessonId]: lessonTasks };
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Назад
              </Button>
            </Link>
            <h1 className="text-xl font-bold bg-gradient-neon bg-clip-text text-transparent">
              Основы ML-Agents
            </h1>
            <Badge variant="secondary" className="hidden sm:flex">
              Начальный уровень
            </Badge>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Course Header */}
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-neon bg-clip-text text-transparent">
                Начальный курс
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              4 урока • ~3 часа обучения • Практические задания
            </p>
          </div>

          {/* Lessons */}
          {lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        Урок {lesson.id}
                      </Badge>
                      <Badge variant="outline">{lesson.duration}</Badge>
                    </div>
                    <CardTitle className="text-2xl">{lesson.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="theory" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-muted/50">
                    <TabsTrigger value="theory" className="gap-2">
                      <BookOpen className="w-4 h-4" />
                      <span className="hidden sm:inline">Теория</span>
                    </TabsTrigger>
                    <TabsTrigger value="code" className="gap-2">
                      <Code className="w-4 h-4" />
                      <span className="hidden sm:inline">Код</span>
                    </TabsTrigger>
                    <TabsTrigger value="video" className="gap-2">
                      <Video className="w-4 h-4" />
                      <span className="hidden sm:inline">Видео</span>
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="gap-2">
                      <CheckSquare className="w-4 h-4" />
                      <span className="hidden sm:inline">Задания</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="theory" className="mt-6 space-y-4">
                    <div className="prose prose-invert max-w-none">
                      <div className="text-foreground/90 whitespace-pre-line leading-relaxed">
                        {lesson.theory}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="code" className="mt-6">
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-glow-cyan overflow-hidden">
                      <div className="bg-gradient-cyber p-3 flex items-center justify-between border-b border-primary/20">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-destructive" />
                          <div className="w-3 h-3 rounded-full bg-accent" />
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          <span className="ml-4 text-sm text-foreground font-mono">
                            {lesson.id === 3 ? "config.yaml" : "Agent.cs"}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            navigator.clipboard.writeText(lesson.code);
                            toast.success("Код скопирован");
                          }}
                          className="hover:bg-primary/10"
                        >
                          Копировать
                        </Button>
                      </div>
                      <div className="p-6 overflow-x-auto">
                        <pre className="text-sm">
                          <code className="text-foreground font-mono leading-relaxed">
                            {lesson.code}
                          </code>
                        </pre>
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="video" className="mt-6">
                    <Card className="bg-card/30 backdrop-blur-sm border-border overflow-hidden">
                      <div className="aspect-video bg-muted/50 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                        <div className="relative z-10 text-center space-y-4">
                          <Play className="w-16 h-16 mx-auto text-primary" />
                          <p className="text-muted-foreground">
                            Видео-урок будет доступен после запуска курса
                          </p>
                          <Button variant="outline" size="sm">
                            Открыть видео
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="tasks" className="mt-6">
                    <div className="space-y-3">
                      {lesson.tasks.map((task, idx) => {
                        const isCompleted = completedTasks[lesson.id]?.has(idx);
                        return (
                          <Card
                            key={idx}
                            className={`bg-card/30 backdrop-blur-sm border transition-all cursor-pointer ${
                              isCompleted
                                ? "border-primary/50 bg-primary/5"
                                : "border-border hover:border-primary/30"
                            }`}
                            onClick={() => toggleTask(lesson.id, idx)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div
                                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                    isCompleted
                                      ? "bg-primary border-primary"
                                      : "border-muted-foreground/30"
                                  }`}
                                >
                                  {isCompleted && (
                                    <CheckSquare className="w-3 h-3 text-primary-foreground" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <span
                                    className={`text-sm ${
                                      isCompleted
                                        ? "text-foreground line-through"
                                        : "text-foreground/90"
                                    }`}
                                  >
                                    {task}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}

          {/* Completion CTA */}
          <Card className="bg-gradient-cyber border-primary/30 shadow-glow-cyan">
            <CardContent className="p-8 text-center space-y-4">
              <h3 className="text-2xl font-bold text-foreground">
                Готовы к следующему уровню?
              </h3>
              <p className="text-muted-foreground">
                После завершения начального курса переходите к продвинутым техникам
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/">
                  <Button variant="outline" size="lg">
                    Вернуться на главную
                  </Button>
                </Link>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Начать продвинутый курс
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BeginnerCourse;