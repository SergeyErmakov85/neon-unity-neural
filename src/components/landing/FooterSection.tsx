import { Github, Mail, MessageCircle, FileQuestion, ExternalLink } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
              <span className="text-xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                RL Learning Platform
              </span>
              <div className="w-2 h-2 rounded-full bg-secondary animate-glow-pulse" />
            </div>
            <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
              Практическая платформа для изучения Reinforcement Learning. 
              Создавайте умных игровых агентов с PyTorch и Unity ML-Agents.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:border-primary/50 hover:shadow-glow-cyan transition-all duration-300"
              >
                <Github className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:border-secondary/50 hover:shadow-glow-purple transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-muted-foreground hover:text-secondary" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:border-accent/50 hover:shadow-glow-pink transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-muted-foreground hover:text-accent" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Навигация</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  Курсы
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  Примеры кода
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  Демо
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  Блог
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Поддержка</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <FileQuestion className="w-4 h-4" />
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Контакты
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-xs text-muted-foreground/60">
              © 2024 RL Learning Platform. Все права защищены.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
