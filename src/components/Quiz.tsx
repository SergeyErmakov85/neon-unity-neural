import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

interface QuizProps {
  title: string;
  questions: QuizQuestion[];
}

const Quiz = ({ title, questions }: QuizProps) => {
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [submitted, setSubmitted] = useState(false);

  const selectAnswer = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const score = questions.filter((q, i) => answers[i] === q.correctIndex).length;
  const allAnswered = questions.every((_, i) => answers[i] !== undefined && answers[i] !== null);

  return (
    <Card className="border-accent/30 mt-8">
      <CardHeader>
        <CardTitle className="text-lg">🧠 {title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((q, qIdx) => (
          <div key={qIdx} className="space-y-2">
            <p className="font-medium text-sm">{qIdx + 1}. {q.question}</p>
            <div className="grid gap-2">
              {q.options.map((opt, optIdx) => {
                const selected = answers[qIdx] === optIdx;
                const isCorrect = q.correctIndex === optIdx;
                let cls = "border-border/50 hover:border-primary/50 hover:bg-primary/5";
                if (submitted && selected && isCorrect) cls = "border-green-500 bg-green-500/10";
                else if (submitted && selected && !isCorrect) cls = "border-destructive bg-destructive/10";
                else if (submitted && isCorrect) cls = "border-green-500/50";
                else if (selected) cls = "border-primary bg-primary/10";

                return (
                  <button
                    key={optIdx}
                    onClick={() => selectAnswer(qIdx, optIdx)}
                    className={`text-left p-3 rounded-lg border text-sm transition-all ${cls}`}
                  >
                    <div className="flex items-center gap-2">
                      {submitted && selected && isCorrect && <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />}
                      {submitted && selected && !isCorrect && <XCircle className="w-4 h-4 text-destructive shrink-0" />}
                      <span className="text-muted-foreground">{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {!submitted ? (
          <Button onClick={() => setSubmitted(true)} disabled={!allAnswered} className="w-full bg-gradient-neon">
            Проверить ответы
          </Button>
        ) : (
          <div className="flex items-center justify-between p-4 rounded-lg bg-card/80 border border-primary/20">
            <span className="font-medium">Результат: {score}/{questions.length}</span>
            <Button variant="outline" size="sm" onClick={() => { setAnswers({}); setSubmitted(false); }}>
              Попробовать снова
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Quiz;
