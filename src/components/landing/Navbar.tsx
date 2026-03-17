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
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-14" : "h-16 md:h-20"}`}>
          {/* Logo */}
          <a
            href="/"
            className="flex items-center group"
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Button
                  key={link.href}
                  variant="ghost"
                  size="sm"
                  className={`transition-all duration-300 ${
                    active
                      ? "text-primary bg-primary/10 shadow-glow-cyan"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                  }`}
                  onClick={() => navigate(link.href)}
                >
                  <Icon className="w-4 h-4 mr-1" />
                  {link.label}
                </Button>
              );
            })}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground hover:bg-primary/5"
              onClick={() => {
                const event = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
                document.dispatchEvent(event);
              }}
            >
              <Search className="w-4 h-4 mr-1" />
              <span className="text-xs text-muted-foreground">Ctrl+K</span>
            </Button>
            {authLoading ? (
              <div className="flex items-center gap-2 ml-2">
                <Skeleton className="h-8 w-24 rounded-md" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            ) : authUser ? (
              <div className="flex items-center gap-2 ml-2 animate-fade-in">
                <Button size="sm" variant="ghost" onClick={() => navigate("/profile")} className="text-foreground hover:text-primary">
                  {displayName}
                </Button>
                <Button size="sm" variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2 animate-fade-in">
                <Button size="sm" variant="outline" onClick={() => navigate("/login")}>Войти</Button>
                <Button size="sm" className="bg-gradient-neon hover:shadow-glow-cyan hover:scale-105 transition-all duration-300" onClick={() => navigate("/register")}>Регистрация</Button>
              </div>
            )}
            {authUser && <UserProfilePopover />}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
