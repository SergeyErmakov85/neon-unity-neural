import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const CodeExamples = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            На главную
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-neon bg-clip-text text-transparent">
                Примеры кода
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Изучите готовые примеры Unity ML-Agents на GitHub
            </p>
          </div>

          <div className="p-8 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/20 shadow-glow-cyan">
            <a
              href="https://github.com/SergeyErmakov85/My_First_NPC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="cyber" className="text-lg gap-2">
                <ExternalLink className="w-5 h-5" />
                Hello world NPC
              </Button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CodeExamples;
