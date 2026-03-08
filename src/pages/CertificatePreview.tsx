import Navbar from "@/components/landing/Navbar";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Lock, Crown, QrCode, Download } from "lucide-react";

const CertificatePreview = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Сертификат | RL Platform"
        description="Получите сертификат о прохождении курса по Reinforcement Learning после завершения всех уровней."
        path="/certificate-preview"
      />
      <Navbar />

      <main className="container mx-auto px-4 py-24 max-w-3xl">
        <div className="text-center space-y-4 mb-10">
          <Award className="w-12 h-12 text-secondary mx-auto" />
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Сертификат о прохождении
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Подтверждает успешное завершение курса «Reinforcement Learning: от основ до мультиагентных систем»
          </p>
        </div>

        {/* Certificate Card */}
        <div className="relative p-1 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent">
          <div className="bg-card rounded-xl p-8 md:p-12 space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Сертификат</p>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                RL Learning Platform
              </h2>
              <p className="text-xs text-muted-foreground">Certificate of Completion</p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {/* Body */}
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">Настоящим подтверждается, что</p>
              <p className="text-2xl font-bold text-foreground border-b border-dashed border-muted-foreground/30 pb-2 inline-block px-8">
                Иван Петров
              </p>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                успешно завершил(а) полный курс по обучению с подкреплением, включающий
                18 уроков, 5 практических проектов и финальный проект.
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Дата</p>
                <p className="text-sm font-semibold text-foreground">08.03.2026</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Номер</p>
                <p className="text-sm font-semibold text-foreground font-mono">RL-2026-00042</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Верификация</p>
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded bg-muted/50 border border-border/50 flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground">
                Курс: Reinforcement Learning — от основ до мультиагентных систем
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-sm text-secondary">
            <Lock className="w-4 h-4" />
            Доступно после завершения всех уровней на тарифе PRO
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-gradient-neon gap-2">
              <Link to="/pricing">
                <Crown className="w-4 h-4" />
                Получить PRO-доступ
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/courses">Начать обучение</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CertificatePreview;
