import LessonLayout from "@/components/LessonLayout";

const CourseLesson1_6 = () => (
  <LessonLayout
    lessonId="1-6"
    title="Q-Learning: табличный метод"
    titleExtra=""
    subtitle="Классический алгоритм обучения без модели среды: обновление таблицы Q-значений."
    currentPath="/courses/1-6"
    prevLesson={{ path: "/courses/1-5", title: "MDP" }}
    nextLesson={{ path: "/courses/1-7", title: "Exploration vs Exploitation" }}
    stageSlug="stage-1"
    lessonSlug="q-learning-tabular"
    badges={["#algorithm", "#tabular"]}
    duration="30 мин"
    isFree
  >
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">🚧 Урок в разработке</h2>
      <p className="text-muted-foreground text-lg">
        Этот урок скоро будет доступен. Вы узнаете, как работает табличный Q-Learning
        и реализуете его с нуля на Python.
      </p>
    </section>
  </LessonLayout>
);

export default CourseLesson1_6;
