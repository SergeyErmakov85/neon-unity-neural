import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, GraduationCap, Code2, FileText, CreditCard, HelpCircle, Users, Search, LogOut, Brain, Gamepad2, Sparkles, Rocket } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import logoImage from "@/assets/Logo_RL_platform.png";
import GlobalSearch from "@/components/GlobalSearch";
import UserProfilePopover from "@/components/UserProfilePopover";
import XpNotification from "@/components/XpNotification";
import { checkStreak } from "@/lib/gamification";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const navLinks = [
  { href: "/courses", label: "Курсы", icon: GraduationCap },
  { href: "/code-examples", label: "Примеры кода", icon: Code2 },
  { href: "/blog", label: "Блог", icon: FileText },
  { href: "/pricing", label: "Тарифы", icon: CreditCard },
  { href: "/faq", label: "FAQ", icon: HelpCircle },
  { href: "/community", label: "Сообщество", icon: Users },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const loadUserDisplayName = useCallback(async (user: User) => {
    const metadataName = typeof user.user_metadata?.name === "string" ? user.user_metadata.name : null;
    const fallbackName = metadataName || user.email || "User";

    const { data } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", user.id)
      .maybeSingle();

    setUserName(data?.name?.trim() || fallbackName);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    checkStreak();
  }, []);

  useEffect(() => {
    let mounted = true;

    const syncAuthState = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!mounted) return;

      if (!user) {
        setAuthUser(null);
        setUserName(null);
        setAuthLoading(false);
        return;
      }

      setAuthUser(user);
      await loadUserDisplayName(user);
      if (mounted) setAuthLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextUser = session?.user ?? null;
      setAuthUser(nextUser);

      if (!nextUser) {
        setUserName(null);
        setAuthLoading(false);
        return;
      }

      void loadUserDisplayName(nextUser);
    });

    void syncAuthState();
    window.addEventListener("focus", syncAuthState);

    return () => {
      mounted = false;
      window.removeEventListener("focus", syncAuthState);
      subscription.unsubscribe();
    };
  }, [loadUserDisplayName]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthUser(null);
    setUserName(null);
    navigate("/");
  };

  const isActive = (href: string) => location.pathname === href;
  const displayName = userName || authUser?.email || "Профиль";

  return (
    <>
    <GlobalSearch />
    <XpNotification />
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-primary/30 shadow-[var(--glow-cyan)]" : "bg-background"}`}>
      <div className="container px-4 mx-auto">
        <div className={`relative flex items-center justify-center transition-all duration-300 ${isScrolled ? "h-14" : "h-16 md:h-20"}`}>
          {/* Logo - positioned left */}
          <a
            href="/"
            className="absolute left-0 flex items-center group"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            <img
              src={logoImage}
              alt="RL Platform"
              className="h-12 md:h-14 lg:h-16 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
            />
          </a>

          {/* Desktop Navigation - Tech Stack Badges */}
          <div className="hidden lg:flex items-center gap-3 -ml-8">
            <button onClick={() => navigate("/pytorch")} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-primary/30 shadow-glow-cyan hover:bg-primary/10 hover:scale-105 transition-all duration-300 cursor-pointer">
              <Brain className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">PyTorch</span>
            </button>
            <button onClick={() => navigate("/unity-ml-agents")} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-secondary/30 shadow-glow-purple hover:bg-secondary/10 hover:scale-105 transition-all duration-300 cursor-pointer">
              <Gamepad2 className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-foreground">Unity ML-Agents</span>
            </button>
            <button onClick={() => navigate("/deep-rl")} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-accent/30 shadow-glow-pink hover:bg-accent/10 hover:scale-105 transition-all duration-300 cursor-pointer">
              <Code2 className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-foreground">Deep RL</span>
            </button>
            <button onClick={() => navigate("/demo-project")} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-secondary/30 shadow-glow-purple hover:bg-secondary/10 hover:scale-105 transition-all duration-300 cursor-pointer">
              <Rocket className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-foreground">Пример проекта</span>
            </button>
            <button onClick={() => navigate("/math-rl")} className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/60 backdrop-blur-sm border border-accent/30 shadow-glow-pink hover:bg-accent/10 hover:scale-105 transition-all duration-300 cursor-pointer">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium text-foreground">Математика RL</span>
            </button>
          </div>

          {/* Menu - positioned right */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <div className="absolute right-0">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 hover:shadow-glow-cyan">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            </div>
            <SheetTrigger asChild>
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
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.href);
                    return (
                      <button
                        key={link.href}
                        onClick={() => {
                          setIsOpen(false);
                          navigate(link.href);
                        }}
                        className={`flex items-center px-4 py-3 text-left rounded-lg transition-all duration-300 group ${
                          active
                            ? "text-primary bg-primary/10 shadow-glow-cyan"
                            : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                        }`}
                      >
                        <Icon className={`w-4 h-4 mr-3 transition-all duration-300 ${active ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                        {link.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-col gap-1 mt-4 pt-4 border-t border-border/30">
                  <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Быстрый доступ</p>
                  {[
                    { href: "/pytorch", label: "PyTorch", Icon: Brain, color: "text-primary" },
                    { href: "/unity-ml-agents", label: "Unity ML-Agents", Icon: Gamepad2, color: "text-secondary" },
                    { href: "/deep-rl", label: "Deep RL", Icon: Code2, color: "text-accent" },
                    { href: "/demo-project", label: "Пример проекта", Icon: Rocket, color: "text-secondary" },
                    { href: "/math-rl", label: "Математика RL", Icon: Sparkles, color: "text-accent" },
                  ].map((item) => (
                    <button
                      key={item.href}
                      onClick={() => { setIsOpen(false); navigate(item.href); }}
                      className={`flex items-center px-4 py-3 text-left rounded-lg transition-all duration-300 group ${
                        isActive(item.href)
                          ? `${item.color} bg-primary/10`
                          : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                      }`}
                    >
                      <item.Icon className={`w-4 h-4 mr-3 transition-all duration-300 ${isActive(item.href) ? item.color : "text-muted-foreground group-hover:" + item.color}`} />
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-auto flex flex-col gap-3 px-2 pb-8">
                  {authLoading ? (
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-10 w-full rounded-md" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  ) : authUser ? (
                    <div className="animate-fade-in flex flex-col gap-3">
                      <Button variant="ghost" className="w-full justify-start" onClick={() => { setIsOpen(false); navigate("/profile"); }}>
                        {displayName}
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => { setIsOpen(false); handleLogout(); }}>
                        <LogOut className="w-4 h-4 mr-2" /> Выйти
                      </Button>
                    </div>
                  ) : (
                    <div className="animate-fade-in flex flex-col gap-3">
                      <Button className="w-full bg-gradient-neon hover:shadow-glow-cyan" onClick={() => { setIsOpen(false); navigate("/register"); }}>Регистрация</Button>
                      <Button variant="outline" className="w-full" onClick={() => { setIsOpen(false); navigate("/login"); }}>Войти</Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Neon line at bottom */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-opacity duration-300 ${isScrolled ? "opacity-100" : "opacity-0"}`} />
    </nav>
    </>
  );
};

export default Navbar;
