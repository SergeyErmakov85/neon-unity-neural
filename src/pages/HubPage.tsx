import { useMemo, lazy, Suspense } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { SUPPORT_HUBS, type HubId } from "@/content/hubs";
import { LEARNING_MAP, type Stage, type Lesson } from "@/content/learningMap";
import { Button } from "@/components/ui/button";
import { PageSkeleton } from "@/components/SkeletonCard";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";

// Lazy-load original page content for each hub
const HUB_CONTENT: Record<HubId, React.LazyExoticComponent<React.ComponentType>> = {
  pytorch: lazy(() => import("@/pages/PyTorchModule")),
  "unity-ml-agents": lazy(() => import("@/pages/UnityMLAgentsModule")),
  "deep-rl": lazy(() => import("@/pages/DeepRLModule")),
  project: lazy(() => import("@/pages/DemoProject")),
  "math-rl": lazy(() => import("@/pages/MathRL")),
};

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

  const ContentComponent = HUB_CONTENT[hub.id];

  return (
    <div className="min-h-screen bg-background">
      {/* Embedded original page content */}
      <Suspense fallback={<PageSkeleton />}>
        <ContentComponent />
      </Suspense>

      {/* Back-links section (appended after content) */}
      {groupedByStage.length > 0 && (
        <div className="border-t border-border/50 bg-card/20">
          <div className="container mx-auto px-4 py-12 max-w-3xl space-y-6">
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
        </div>
      )}
    </div>
  );
};

export default HubPage;
