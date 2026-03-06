import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Calculator, Brain, Boxes, Eye, FlaskConical, Sparkles } from "lucide-react";
import logoImage from "@/assets/Logo_RL_platform.png";
const navLinks = [{
  href: "#problem",
  label: "Проблема"
}, {
  href: "#solution",
  label: "Решение"
}, {
  href: "#features",
  label: "Возможности"
}, {
  href: "#demo",
  label: "Демо"
}, {
  href: "#learning-path",
  label: "Путь обучения"
}, {
  href: "#audience",
  label: "Аудитория"
}];
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
    setIsOpen(false);
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-md border-b border-primary/30 shadow-glow-cyan" : "bg-transparent"}`}>
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center group" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }}>
            <img src={logoImage} alt="RL Platform" className="h-16 md:h-20 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_15px_hsl(var(--primary)/0.5)]" />
          </a>

          {/* Desktop CTA */}




          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-accent/50 text-accent hover:bg-accent/10 hover:border-accent hover:shadow-glow-pink transition-all duration-300" onClick={() => navigate("/math-rl")}>
              <Calculator className="w-4 h-4 mr-1" />
              Математика RL
            </Button>
            <Button variant="outline" size="sm" className="border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary hover:shadow-glow-pink transition-all duration-300" onClick={() => navigate("/algorithms")}>
              <Brain className="w-4 h-4 mr-1" />
              Алгоритмы
            </Button>
            <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:shadow-glow-cyan transition-all duration-300" onClick={() => navigate("/unity-projects")}>
              <Boxes className="w-4 h-4 mr-1" />
              Проекты
            </Button>
            <Button variant="outline" size="sm" className="border-accent/50 text-accent hover:bg-accent/10 hover:border-accent hover:shadow-glow-pink transition-all duration-300" onClick={() => navigate("/visualizations")}>
              <Eye className="w-4 h-4 mr-1" />
              Визуализации
            </Button>
            <Button variant="outline" size="sm" className="border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary hover:shadow-glow-purple transition-all duration-300" onClick={() => navigate("/advanced")}>
              <Sparkles className="w-4 h-4 mr-1" />
              Продвинутое
            </Button>
            <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:shadow-glow-cyan transition-all duration-300" onClick={() => navigate("/labs")}>
              <FlaskConical className="w-4 h-4 mr-1" />
              Практикумы
            </Button>
            <Button size="sm" className="bg-gradient-neon hover:shadow-glow-cyan hover:scale-105 transition-all duration-300" onClick={() => navigate("/beginner-course")}>
              Начать обучение
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 hover:shadow-glow-cyan">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-xl border-l border-primary/30">
              <div className="flex flex-col h-full pt-8">
                {/* Mobile Logo */}
                <div className="flex items-center gap-2 mb-8 px-2">
                  <img src={logoImage} alt="RL Platform" className="h-10 w-auto" />
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => <button key={link.href} onClick={() => scrollToSection(link.href)} className="flex items-center px-4 py-3 text-left text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-all duration-300 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:shadow-glow-cyan mr-3 transition-all duration-300" />
                      {link.label}
                    </button>)}
                </div>

                {/* Mobile CTA Buttons */}
                <div className="mt-auto flex flex-col gap-3 px-2 pb-8">
                  <Button variant="outline" className="w-full border-accent/50 text-accent hover:bg-accent/10 hover:border-accent" onClick={() => {
                  setIsOpen(false);
                  navigate("/math-rl");
                }}>
                    <Calculator className="w-4 h-4 mr-1" />
                    Математика RL
                  </Button>
                  <Button variant="outline" className="w-full border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary" onClick={() => {
                  setIsOpen(false);
                  navigate("/algorithms");
                }}>
                    <Brain className="w-4 h-4 mr-1" />
                    Алгоритмы
                  </Button>
                  <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:border-primary" onClick={() => {
                  setIsOpen(false);
                  navigate("/unity-projects");
                }}>
                    <Boxes className="w-4 h-4 mr-1" />
                    Проекты
                  </Button>
                  <Button variant="outline" className="w-full border-accent/50 text-accent hover:bg-accent/10 hover:border-accent" onClick={() => {
                  setIsOpen(false);
                  navigate("/visualizations");
                }}>
                    <Eye className="w-4 h-4 mr-1" />
                    Визуализации
                  </Button>
                  <Button variant="outline" className="w-full border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary" onClick={() => {
                  setIsOpen(false);
                  navigate("/advanced");
                }}>
                    <Sparkles className="w-4 h-4 mr-1" />
                    Продвинутое
                  </Button>
                  <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:border-primary" onClick={() => {
                  setIsOpen(false);
                  navigate("/labs");
                }}>
                    <FlaskConical className="w-4 h-4 mr-1" />
                    Практикумы
                  </Button>
                  <Button variant="outline" className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:border-primary" onClick={() => {
                    setIsOpen(false);
                    const el = document.querySelector('#learning-path');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    Карта обучения
                  </Button>
                  <Button className="w-full bg-gradient-neon hover:shadow-glow-cyan" onClick={() => { setIsOpen(false); navigate("/beginner-course"); }}>
                    Начать обучение
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Neon line at bottom */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`} />
    </nav>;
};
export default Navbar;