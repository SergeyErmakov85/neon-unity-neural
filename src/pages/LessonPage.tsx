import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const LessonPage = () => {
  const { stageSlug, lessonSlug } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Назад
          </Button>
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-neon bg-clip-text text-transparent">
              {stageSlug} / {lessonSlug}
            </span>
          </h1>
          <p className="text-muted-foreground mt-2">Страница урока — placeholder</p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm p-8 text-center text-muted-foreground">
          Контент урока <code className="text-primary">{lessonSlug}</code> из этапа <code className="text-primary">{stageSlug}</code> будет здесь.
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
