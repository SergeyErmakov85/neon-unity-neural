import React from "react";

export const Section = ({ icon, title, id, children }: { icon: React.ReactNode; title: string; id?: string; children: React.ReactNode }) => (
  <section className="mt-12 first:mt-0 scroll-mt-28" id={id}>
    <div className="flex items-center gap-3 mb-6">
      {icon}
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    </div>
    <div className="text-muted-foreground leading-relaxed space-y-3">
      {children}
    </div>
  </section>
);

export const CodeBlock = ({ children }: { children: string }) => (
  <pre className="my-4 p-4 rounded-lg bg-[hsl(var(--cyber-darker))] border border-primary/20 overflow-x-auto">
    <code className="text-sm text-primary font-mono whitespace-pre">{children}</code>
  </pre>
);

export const GlossaryItem = ({ term, formula, definition }: { term: string; formula: string; definition: string }) => {
  const Math = React.lazy(() => import("@/components/Math"));
  return (
    <div className="p-4 rounded-lg bg-card/60 border border-border/50 space-y-2">
      <dt className="font-semibold text-foreground text-sm">{term}</dt>
      <div className="overflow-x-auto">
        <React.Suspense fallback={null}>
          <Math className="my-1 py-2">{formula}</Math>
        </React.Suspense>
      </div>
      <dd className="text-muted-foreground text-sm">{definition}</dd>
    </div>
  );
};

export const InfoBox = ({ children, variant = "primary" }: { children: React.ReactNode; variant?: "primary" | "secondary" | "accent" }) => {
  const borderColor = variant === "primary" ? "border-primary/30" : variant === "secondary" ? "border-secondary/30" : "border-accent/30";
  return (
    <div className={`my-4 p-4 rounded-lg bg-card/80 border ${borderColor}`}>
      {children}
    </div>
  );
};
