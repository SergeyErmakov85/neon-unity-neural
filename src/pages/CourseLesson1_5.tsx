import LessonLayout from "@/components/LessonLayout";

const CourseLesson1_5 = () => (
  <LessonLayout
    lessonTitle="Марковские процессы принятия решений (MDP)"
    lessonNumber="1.5"
    duration="25 мин"
    tags={["theory", "math"]}
    level={1}
    lessonId="1-5"
    prevLesson={{ path: "/courses/1-4", title: "DQN с нуля на PyTorch" }}
    nextLesson={{ path: "/courses/1-6", title: "Q-Learning: табличный метод" }}
  >
    <section>
      <h2 className="text-2xl font-bold text-foreground mb-4">🚧 Урок в разработке</h2>
      <p className="text-muted-foreground text-lg">
        Этот урок скоро будет доступен. Мы работаем над подробным объяснением
        марковских процессов принятия решений — математического фундамента RL.
      </p>
    </section>
  </LessonLayout>
);

export default CourseLesson1_5;
