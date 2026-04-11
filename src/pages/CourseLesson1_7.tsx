import LessonLayout from "@/components/LessonLayout";

const CourseLesson1_7 = () => (
  <LessonLayout
    lessonId="1-7"
    title="Exploration vs Exploitation"
    titleExtra=""
    subtitle="Баланс между исследованием новых стратегий и использованием уже известных."
    currentPath="/courses/1-7"
    prevLesson={{ path: "/courses/1-6", title: "Q-Learning: табличный метод" }}
    nextLesson={{ path: "/courses/project-1", title: "Проект: Балансировка шеста" }}
    stageSlug="stage-1"
    lessonSlug="exploration-exploitation"
    badges={["#theory", "#strategy"]}
    duration="20 мин"
    isFree
  >
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">🚧 Урок в разработке</h2>
      <p className="text-muted-foreground text-lg">
        Этот урок скоро будет доступен. Мы разберём ε-greedy, UCB, Thompson Sampling
        и другие стратегии исследования.
      </p>
    </section>
  </LessonLayout>
);

export default CourseLesson1_7;
