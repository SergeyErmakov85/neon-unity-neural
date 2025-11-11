import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Play } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CodeExample = () => {
  const [copied, setCopied] = useState(false);

  const codeExample = `using Unity.MLAgents;
using Unity.MLAgents.Actuators;
using Unity.MLAgents.Sensors;
using UnityEngine;

public class SimpleAgent : Agent
{
    public override void OnEpisodeBegin()
    {
        // Сброс позиции агента
        transform.localPosition = Vector3.zero;
    }

    public override void CollectObservations(
        VectorSensor sensor)
    {
        // Добавление наблюдений
        sensor.AddObservation(transform.localPosition);
    }

    public override void OnActionReceived(
        ActionBuffers actions)
    {
        // Получение действий от нейросети
        float moveX = actions.ContinuousActions[0];
        float moveZ = actions.ContinuousActions[1];
        
        // Применение движения
        Vector3 move = new Vector3(moveX, 0, moveZ);
        transform.localPosition += move * Time.deltaTime;
        
        // Награда за достижение цели
        if (ReachedTarget())
        {
            SetReward(1.0f);
            EndEpisode();
        }
    }
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    toast.success("Код скопирован в буфер обмена");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-foreground">Пример </span>
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              кода
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Простой агент для начала работы с ML-Agents
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 shadow-glow-cyan overflow-hidden">
            <div className="bg-gradient-cyber p-4 flex items-center justify-between border-b border-primary/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-accent" />
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="ml-4 text-sm text-foreground font-mono">
                  SimpleAgent.cs
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopy}
                  className="hover:bg-primary/10"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? "Скопировано!" : "Копировать"}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="hover:bg-primary/10"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Запустить
                </Button>
              </div>
            </div>
            <CardContent className="p-0">
              <pre className="p-6 overflow-x-auto text-sm">
                <code className="text-foreground font-mono leading-relaxed">
                  {codeExample}
                </code>
              </pre>
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-card/30 backdrop-blur-sm border-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-2">01</div>
                <div className="text-sm text-muted-foreground">
                  Инициализация эпизода
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/30 backdrop-blur-sm border-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-secondary mb-2">02</div>
                <div className="text-sm text-muted-foreground">
                  Сбор наблюдений
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/30 backdrop-blur-sm border-border">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent mb-2">03</div>
                <div className="text-sm text-muted-foreground">
                  Обработка действий
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeExample;
