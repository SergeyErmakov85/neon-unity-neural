import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => (
  <div className="min-h-screen bg-background">
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          На главную
        </Link>
      </div>
    </header>
    <main className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <Construction className="w-16 h-16 mx-auto text-primary drop-shadow-[0_0_15px_hsl(var(--primary)/0.5)]" />
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="bg-gradient-neon bg-clip-text text-transparent">Блог</span>
        </h1>
        <p className="text-muted-foreground text-lg">Раздел в разработке</p>
        <Button variant="outline" asChild>
          <Link to="/">Вернуться на главную</Link>
        </Button>
      </div>
    </main>
  </div>
);

export default Blog;
