import { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { SUPPORT_HUBS, type HubId } from "@/content/hubs";
import { LEARNING_MAP, type Stage, type Lesson } from "@/content/learningMap";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

interface BackLink {
  stage: Stage;
  lesson: Lesson;
}

function findLessonsForHub(hubId: HubId): BackLink[] {
  const results: BackLink[] = [];
  for (const stage of LEARNING_MAP) {
    for (const lesson of stage.lessons) {
      if (lesson.contextLinks.some((cl) => cl.hubId === hubId)) {
        results.push({ stage, lesson });
      }
    }
  }
  return results;
}

const HubPage = () => {
  const { hubId } = useParams<{ hubId: string }>();
  const navigate = useNavigate();

  const hub = hubId ? SUPPORT_HUBS[hubId as HubId] : undefined;

  const backLinks = useMemo(() => {
    if (!hub) return [];
    return findLessonsForHub(hub.id);
  }, [hub]);

  const groupedByStage = useMemo(() => {
    const map = new Map<string, { stage: Stage; lessons: Lesson[] }>();
    for (const bl of backLinks) {
      if (!map.has(bl.stage.id)) map.set(bl.stage.id, { stage: bl.stage, lessons: [] });
      map.get(bl.stage.id)!.lessons.push(bl.lesson);
    }
    return Array.from(map.values());
  }, [backLinks]);

  if (!hub) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Хаб не найден</p>
        <Button variant="outline" onClick={() => navigate("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> На главную
        </Button>
      </div>
    );
  }

  const Icon = hub.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" /> Карта обучения
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl space-y-12">
        {/* Hero */}
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <Icon className={`h-7 w-7 ${hub.colorAccent}`} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-neon bg-clip-text text-transparent">{hub.label}</span>
            </h1>
            <p className="mt-2 text-muted-foreground leading-relaxed">{hub.shortDescription}</p>
          </div>
        </div>

        {/* Placeholder content */}
        <div className="rounded-xl border border-border/50 bg-card/40 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-foreground">Материалы хаба</h2>
          <p className="text-sm text-muted-foreground">
            Здесь будут справочники, шпаргалки, примеры кода и дополнительные ресурсы по теме «{hub.label}».
          </p>
        </div>

        {/* Back-links section */}
        {groupedByStage.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Где это пригодится в обучении</h2>
            </div>

            {groupedByStage.map(({ stage, lessons }) => (
              <div key={stage.id} className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {stage.title}
                </h3>
                <div className="space-y-1.5">
                  {lessons.map((lesson) => (
                    <Link
                      key={lesson.id}
                      to={`/learn/${stage.slug}/${lesson.slug}`}
                      className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/30 px-4 py-3 text-sm text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors group"
                    >
                      <span className="flex-1">{lesson.title}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center pt-4">
          <Button variant="outline" onClick={() => navigate("/")} className="border-primary/50 text-primary hover:bg-primary/10">
            <ArrowLeft className="w-4 h-4 mr-2" /> На главную
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HubPage;
