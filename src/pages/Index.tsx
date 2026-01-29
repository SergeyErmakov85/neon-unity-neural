import Hero from "@/components/Hero";
import Features from "@/components/Features";
import LearningPaths from "@/components/LearningPaths";
import CodeExample from "@/components/CodeExample";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <LearningPaths />
      <CodeExample />
      
      {/* Footer */}
      <footer className="border-t border-border bg-card/30 backdrop-blur-sm py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
              <span className="text-lg font-semibold bg-gradient-neon bg-clip-text text-transparent">
                Unity ML-Agents Обучение
              </span>
              <div className="w-2 h-2 rounded-full bg-secondary animate-glow-pulse" />
            </div>
            <p className="text-muted-foreground text-sm">
              Создавайте умных агентов с машинным обучением
            </p>
            <div className="text-xs text-muted-foreground/60">
              © 2024 Unity ML-Agents Learning Platform
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
