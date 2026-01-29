import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";

const CodeExamples = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider">Code Examples</p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Explore our code on GitHub
            </h1>
            <p className="text-muted-foreground text-lg">
              Browse complete, working examples of Unity ML-Agents implementations.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all shadow-lg">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Github className="w-8 h-8 text-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Hello World NPC</h2>
            <p className="text-muted-foreground mb-6">
              Your first step into Unity ML-Agents. A simple example to get you started.
            </p>
            <a
              href="https://github.com/SergeyErmakov85/My_First_NPC"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="gradient" className="gap-2">
                <ExternalLink className="w-5 h-5" />
                View on GitHub
              </Button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CodeExamples;
