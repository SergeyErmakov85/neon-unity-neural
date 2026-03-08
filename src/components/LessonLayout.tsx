import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, FolderKanban, Circle, CheckCircle2, Lock, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LessonMeta {
  id: string;
  path: string;
  title: string;
  type: "lesson" | "project";
}

interface LessonLayoutProps {
  children: ReactNode;
  lessonTitle: string;
  lessonNumber: string;
  duration: string;
  tags: string[];
  level?: number;
  prevLesson?: { path: string; title: string };
  nextLesson?: { path: string; title: string };
}

const level1Lessons: LessonMeta[] = [
  { id: "1-1", path: "/courses/1-1", title: "Что такое обучение с подкреплением?", type: "lesson" },
  { id: "1-2", path: "/courses/1-2", title: "Установка окружения: PyTorch + Unity ML-Agents", type: "lesson" },
  { id: "1-3", path: "/courses/1-3", title: "CartPole — первый агент", type: "lesson" },
  { id: "1-4", path: "/courses/1-4", title: "DQN с нуля на PyTorch", type: "lesson" },
  { id: "1-p", path: "/courses/project-1", title: "Проект: Балансировка шеста", type: "project" },
];

const level2Lessons: LessonMeta[] = [
  { id: "2-1", path: "/courses/2-1", title: "Policy Gradient и теорема градиента", type: "lesson" },
  { id: "2-2", path: "/courses/2-2", title: "PPO — реализация с нуля", type: "lesson" },
  { id: "2-3", path: "/courses/2-3", title: "Непрерывные действия и Actor-Critic", type: "lesson" },
  { id: "2-4", path: "/courses/2-4", title: "Reward Shaping", type: "lesson" },
  { id: "2-5", path: "/courses/2-5", title: "Параллельные среды", type: "lesson" },
  { id: "2-6", path: "/courses/2-6", title: "TensorBoard и W&B", type: "lesson" },
  { id: "2-p1", path: "/courses/project-2", title: "Проект: 3D-охотник", type: "project" },
  { id: "2-p2", path: "/courses/project-3", title: "Проект: Гоночный агент", type: "project" },
  { id: "2-p2", path: "/courses/project-3", title: "Проект: Racing Car", type: "project" },
];

const levelConfigs = [
  { label: "Уровень 1 — Новичок", lessons: level1Lessons, tag: "FREE", tagClass: "text-green-400" },
  { label: "Уровень 2 — Средний", lessons: level2Lessons, tag: "PRO", tagClass: "text-secondary" },
];

const LessonLayout = ({
  children,
  lessonTitle,
  lessonNumber,
  duration,
  tags,
  level = 1,
  prevLesson,
  nextLesson,
}: LessonLayoutProps) => {
  const location = useLocation();
  const isPro = level >= 2;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Курсы
          </Link>
          <span className="text-border">|</span>
          <span className="text-sm text-muted-foreground truncate">Урок {lessonNumber}</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar — desktop only */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-20 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
            {levelConfigs.map((cfg, li) => (
              <div key={li}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3 flex items-center gap-2">
                  {cfg.label}
                  {cfg.tag === "PRO" && <Crown className="w-3 h-3 text-secondary" />}
                </h3>
                <div className="space-y-0.5">
                  {cfg.lessons.map((l) => {
                    const active = location.pathname === l.path;
                    return (
                      <Link
                        key={l.id}
                        to={l.path}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors",
                          active
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        )}
                      >
                        {l.type === "project" ? (
                          <FolderKanban className="w-3 h-3 flex-shrink-0" />
                        ) : active ? (
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                        ) : cfg.tag === "PRO" ? (
                          <Lock className="w-3 h-3 flex-shrink-0" />
                        ) : (
                          <Circle className="w-3 h-3 flex-shrink-0" />
                        )}
                        <span className="truncate">{l.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 max-w-3xl">
          {/* Lesson header */}
          <div className="mb-8 space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full border",
                isPro
                  ? "bg-secondary/20 text-secondary border-secondary/30"
                  : "bg-green-500/20 text-green-400 border-green-500/30"
              )}>
                {isPro ? "PRO" : "FREE"}
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> {duration}
              </span>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              <span className="text-muted-foreground font-normal text-2xl md:text-3xl">
                {lessonNumber}.{" "}
              </span>
              {lessonTitle}
            </h1>
          </div>

          {/* Lesson body */}
          <article className="prose-cyber space-y-6">{children}</article>

          {/* Nav buttons */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-border/50">
            {prevLesson ? (
              <Button variant="outline" asChild>
                <Link to={prevLesson.path} className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  {prevLesson.title}
                </Link>
              </Button>
            ) : (
              <div />
            )}
            {nextLesson ? (
              <Button variant="default" asChild>
                <Link to={nextLesson.path} className="flex items-center gap-2">
                  {nextLesson.title}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LessonLayout;
