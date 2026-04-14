import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ═══════════════════════════════════════════════════
   Функция ценности состояния V^π(s) — визуализация
   MDP-цепочка + дисконтирование + формула
   ═══════════════════════════════════════════════════ */

interface StateNode {
  id: number;
  name: string;
  label: string;
  x: number;
  y: number;
  canvasColor: string;
}

interface Transition {
  from: number;
  to: number;
  reward: number;
  label: string;
}

interface Step {
  k: number;
  from: number;
  to: number;
  reward: number;
  discount: number;
  contrib: number;
  cumSum: number;
}

const STATES: StateNode[] = [
  { id: 0, name: "S₀", label: "Старт",    x: 0.08, y: 0.5, canvasColor: "#00FFD6" },
  { id: 1, name: "S₁", label: "Разведка",  x: 0.28, y: 0.5, canvasColor: "#60A5FA" },
  { id: 2, name: "S₂", label: "Опасность", x: 0.48, y: 0.5, canvasColor: "#FBBF24" },
  { id: 3, name: "S₃", label: "Подъём",    x: 0.68, y: 0.5, canvasColor: "#D946EF" },
  { id: 4, name: "S₄", label: "Цель",      x: 0.88, y: 0.5, canvasColor: "#34D399" },
];

const TRANSITIONS: Transition[] = [
  { from: 0, to: 1, reward: 1,  label: "+1" },
  { from: 1, to: 2, reward: 3,  label: "+3" },
  { from: 2, to: 3, reward: -2, label: "−2" },
  { from: 3, to: 4, reward: 10, label: "+10" },
];

function computeReturn(startIdx: number, gamma: number): { steps: Step[]; G: number } {
  const steps: Step[] = [];
  let G = 0;
  let k = 0;
  for (let i = startIdx; i < TRANSITIONS.length; i++) {
    const t = TRANSITIONS[i];
    const discount = Math.pow(gamma, k);
    const contrib = discount * t.reward;
    G += contrib;
    steps.push({ k, from: t.from, to: t.to, reward: t.reward, discount, contrib, cumSum: G });
    k++;
  }
  return { steps, G };
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return `${parseInt(h.substring(0, 2), 16)},${parseInt(h.substring(2, 4), 16)},${parseInt(h.substring(4, 6), 16)}`;
}

/* ─── MDP Canvas ─── */
function MDPCanvas({ startState, gamma, highlightStep }: {
  startState: number; gamma: number; highlightStep: number | null;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pulseRef = useRef(0);
  const frameRef = useRef(0);
  const startRef = useRef(startState);
  const gammaRef = useRef(gamma);
  const hlRef = useRef(highlightStep);

  useEffect(() => { startRef.current = startState; }, [startState]);
  useEffect(() => { gammaRef.current = gamma; }, [gamma]);
  useEffect(() => { hlRef.current = highlightStep; }, [highlightStep]);

  useEffect(() => {
    const cvs = ref.current;
    if (!cvs) return;
    let running = true;

    const draw = () => {
      if (!running) return;
      const ctx = cvs.getContext("2d");
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = cvs.getBoundingClientRect();
      const W = rect.width, H = rect.height;
      if (cvs.width !== Math.round(W * dpr) || cvs.height !== Math.round(H * dpr)) {
        cvs.width = Math.round(W * dpr);
        cvs.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      const curStart = startRef.current;
      const curGamma = gammaRef.current;
      const curHL = hlRef.current;

      pulseRef.current += 0.025;
      const pulse = (Math.sin(pulseRef.current) + 1) * 0.5;

      const styles = getComputedStyle(document.documentElement);
      const bgColor = styles.getPropertyValue("--background").trim();
      ctx.fillStyle = `hsl(${bgColor})`;
      ctx.fillRect(0, 0, W, H);

      const nodeR = Math.min(28, W * 0.035);
      const { steps } = computeReturn(curStart, curGamma);
      const activeStates = new Set<number>();
      activeStates.add(curStart);
      steps.forEach(s => { activeStates.add(s.from); activeStates.add(s.to); });

      const mono = "'JetBrains Mono', monospace";
      const sans = "'IBM Plex Sans', sans-serif";

      // Transitions
      TRANSITIONS.forEach((t, ti) => {
        const from = STATES[t.from];
        const to = STATES[t.to];
        const fx = from.x * W, fy = from.y * H;
        const tx = to.x * W, ty = to.y * H;
        const isActive = ti >= curStart && ti < curStart + steps.length;
        const isHighlighted = curHL !== null && ti === curStart + curHL;

        const angle = Math.atan2(ty - fy, tx - fx);
        const sx = fx + Math.cos(angle) * (nodeR + 4);
        const sy = fy + Math.sin(angle) * (nodeR + 4);
        const ex = tx - Math.cos(angle) * (nodeR + 4);
        const ey = ty - Math.sin(angle) * (nodeR + 4);

        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey);
        if (isHighlighted) {
          ctx.strokeStyle = `rgba(0,255,214,${0.7 + pulse * 0.3})`;
          ctx.lineWidth = 3;
          ctx.shadowColor = "#00FFD6"; ctx.shadowBlur = 12;
        } else if (isActive) {
          ctx.strokeStyle = "rgba(255,255,255,0.2)";
          ctx.lineWidth = 2; ctx.shadowBlur = 0;
        } else {
          ctx.strokeStyle = "rgba(255,255,255,0.06)";
          ctx.lineWidth = 1; ctx.shadowBlur = 0;
        }
        ctx.stroke(); ctx.shadowBlur = 0;

        // Arrowhead
        const aSize = isHighlighted ? 10 : 7;
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(ex - aSize * Math.cos(angle - 0.4), ey - aSize * Math.sin(angle - 0.4));
        ctx.lineTo(ex - aSize * Math.cos(angle + 0.4), ey - aSize * Math.sin(angle + 0.4));
        ctx.closePath();
        ctx.fillStyle = isHighlighted ? "#00FFD6" : (isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)");
        ctx.fill();

        // Reward label
        const mx = (sx + ex) / 2, my = (sy + ey) / 2 - 20;
        const rewColor = t.reward >= 0 ? "#34D399" : "#F87171";
        ctx.font = `bold ${isHighlighted ? 16 : 13}px ${mono}`;
        ctx.textAlign = "center";

        if (isHighlighted) {
          const tw = ctx.measureText(t.label).width;
          const rx = mx - tw / 2 - 8, ry = my - 12, rw = tw + 16, rh = 24, rr = 6;
          ctx.fillStyle = `rgba(${hexToRgb(rewColor)},0.15)`;
          ctx.beginPath();
          ctx.moveTo(rx + rr, ry);
          ctx.arcTo(rx + rw, ry, rx + rw, ry + rh, rr);
          ctx.arcTo(rx + rw, ry + rh, rx, ry + rh, rr);
          ctx.arcTo(rx, ry + rh, rx, ry, rr);
          ctx.arcTo(rx, ry, rx + rw, ry, rr);
          ctx.closePath(); ctx.fill();
        }

        ctx.fillStyle = isHighlighted ? rewColor : (isActive ? `rgba(${hexToRgb(rewColor)},0.6)` : "rgba(107,116,144,1)");
        ctx.fillText(t.label, mx, my + 5);

        if (isHighlighted) {
          const stepIdx = ti - curStart;
          const disc = Math.pow(curGamma, stepIdx);
          ctx.font = `12px ${mono}`;
          ctx.fillStyle = "#FBBF24";
          ctx.fillText(`γ^${stepIdx}=${disc.toFixed(3)}`, mx, my + 22);
        }
      });

      // Nodes
      STATES.forEach((s) => {
        const cx = s.x * W, cy = s.y * H;
        const isActive = activeStates.has(s.id);
        const isStart = s.id === curStart;

        if (isActive) {
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, nodeR * 2);
          g.addColorStop(0, `rgba(${hexToRgb(s.canvasColor)},${isStart ? 0.2 : 0.08})`);
          g.addColorStop(1, `rgba(${hexToRgb(s.canvasColor)},0)`);
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(cx, cy, nodeR * 2, 0, Math.PI * 2); ctx.fill();
        }

        ctx.beginPath(); ctx.arc(cx, cy, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? `rgba(${hexToRgb(s.canvasColor)},0.15)` : "rgba(255,255,255,0.02)";
        ctx.fill();
        ctx.strokeStyle = isActive ? s.canvasColor : "rgba(255,255,255,0.08)";
        ctx.lineWidth = isStart ? 2.5 : 1.5;
        ctx.stroke();

        if (isStart) {
          ctx.setLineDash([3, 3]);
          ctx.beginPath(); ctx.arc(cx, cy, nodeR + 6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${hexToRgb(s.canvasColor)},${0.3 + pulse * 0.2})`;
          ctx.lineWidth = 1.5; ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.font = `bold 14px ${mono}`;
        ctx.textAlign = "center";
        ctx.fillStyle = isActive ? "#F4F7FC" : "rgba(107,116,144,1)";
        ctx.fillText(s.name, cx, cy + 5);

        ctx.font = `11px ${sans}`;
        ctx.fillStyle = isActive ? "#B0B8CE" : "rgba(107,116,144,1)";
        ctx.fillText(s.label, cx, cy + nodeR + 18);
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => { running = false; cancelAnimationFrame(frameRef.current); };
  }, []);

  return <canvas ref={ref} className="w-full rounded-lg" style={{ height: 220, display: "block" }} />;
}

/* ─── Contribution bars ─── */
function ContributionBars({ steps }: { steps: Step[] }) {
  if (!steps.length) return null;
  const maxAbs = Math.max(...steps.map(s => Math.abs(s.contrib)), 0.1);
  return (
    <div className="flex items-end gap-1 h-16 py-2">
      {steps.map((s, i) => {
        const h = (Math.abs(s.contrib) / maxAbs) * 48;
        const isPos = s.contrib >= 0;
        return (
          <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
            <span className={`font-mono text-[10px] ${isPos ? "text-green-400" : "text-red-400"}`}>
              {s.contrib >= 0 ? "+" : ""}{s.contrib.toFixed(2)}
            </span>
            <div
              className={`w-full max-w-[28px] rounded-sm ${isPos ? "bg-gradient-to-t from-green-500/40 to-green-400" : "bg-gradient-to-t from-red-500/40 to-red-400"}`}
              style={{ height: h, transition: "height 0.3s ease" }}
            />
            <span className="font-mono text-[9px] text-muted-foreground">γ·R</span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Step table ─── */
function StepTable({ steps, highlightStep, onHover }: {
  steps: Step[]; highlightStep: number | null; onHover: (i: number | null) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs font-mono border-collapse">
        <thead>
          <tr className="border-b border-border/30">
            {["k", "Переход", "Rₖ", "γᵏ", "γᵏ·Rₖ", "Gₜ"].map((h, i) => (
              <th key={i} className={`py-1.5 px-2 text-muted-foreground font-semibold uppercase text-[10px] ${i > 1 ? "text-right" : "text-left"}`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {steps.map((s, i) => (
            <tr
              key={i}
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
              className={`border-b border-border/10 cursor-pointer transition-colors ${highlightStep === i ? "bg-primary/5" : "hover:bg-card/40"}`}
            >
              <td className="py-1 px-2 text-muted-foreground">{s.k}</td>
              <td className="py-1 px-2 text-foreground">S{s.from} → S{s.to}</td>
              <td className={`py-1 px-2 text-right font-semibold ${s.reward >= 0 ? "text-green-400" : "text-red-400"}`}>
                {s.reward >= 0 ? "+" : ""}{s.reward}
              </td>
              <td className="py-1 px-2 text-right text-accent">{s.discount.toFixed(4)}</td>
              <td className={`py-1 px-2 text-right font-medium ${s.contrib >= 0 ? "text-green-400" : "text-red-400"}`}>
                {s.contrib >= 0 ? "+" : ""}{s.contrib.toFixed(4)}
              </td>
              <td className="py-1 px-2 text-right text-primary font-semibold">{s.cumSum.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Formula breakdown ─── */
function FormulaBreakdown({ steps, G, highlightStep, onHover }: {
  steps: Step[]; G: number; highlightStep: number | null; onHover: (i: number | null) => void;
}) {
  return (
    <div className="p-3 rounded-lg bg-card/40 border border-border/30 space-y-2">
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
        Разложение формулы
      </p>

      {/* Symbolic */}
      <div className="font-mono text-xs text-muted-foreground">
        <span className="text-muted-foreground font-bold">Символьная: </span>
        {steps.map((s, i) => (
          <span
            key={i}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            className={`cursor-pointer px-1 py-0.5 rounded ${highlightStep === i ? "bg-primary/10" : ""}`}
          >
            {i > 0 && <span className="text-muted-foreground"> + </span>}
            <span className="text-accent">γ<sup>{s.k}</sup></span>
            <span className="text-muted-foreground">·</span>
            <span className={s.reward >= 0 ? "text-green-400" : "text-red-400"}>
              ({s.reward >= 0 ? "+" : ""}{s.reward})
            </span>
          </span>
        ))}
      </div>

      {/* Numeric */}
      <div className="font-mono text-xs text-muted-foreground">
        <span className="text-muted-foreground font-bold">Числовая: </span>
        {steps.map((s, i) => (
          <span
            key={i}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            className={`cursor-pointer px-1 py-0.5 rounded ${highlightStep === i ? "bg-primary/10" : ""}`}
          >
            {i > 0 && <span className="text-muted-foreground"> + </span>}
            <span className="text-accent">{s.discount.toFixed(3)}</span>
            <span className="text-muted-foreground">·</span>
            <span className={s.reward >= 0 ? "text-green-400" : "text-red-400"}>
              ({s.reward >= 0 ? "+" : ""}{s.reward})
            </span>
          </span>
        ))}
      </div>

      {/* Result */}
      <div className="font-mono text-sm text-foreground">
        <span className="text-muted-foreground font-bold">Результат: </span>
        {steps.map((s, i) => (
          <span key={i} className="mr-1">
            {i > 0 && <span className="text-muted-foreground"> + </span>}
            <span className={s.contrib >= 0 ? "text-green-400" : "text-red-400"}>
              {s.contrib >= 0 ? "+" : ""}{s.contrib.toFixed(3)}
            </span>
          </span>
        ))}
        <span className="text-muted-foreground"> = </span>
        <span className="text-primary font-bold">{G.toFixed(4)}</span>
      </div>

      <p className="text-[11px] text-muted-foreground mt-1">
        Наведите на слагаемое — подсветится переход на диаграмме и строка в таблице.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */
const ValueFunctionViz = () => {
  const [startState, setStartState] = useState(0);
  const [gamma, setGamma] = useState(0.9);
  const [highlightStep, setHighlightStep] = useState<number | null>(null);

  const { steps, G } = useMemo(() => computeReturn(startState, gamma), [startState, gamma]);

  const allValues = useMemo(() => {
    return STATES.map((_, i) => {
      if (i >= TRANSITIONS.length) return 0;
      return computeReturn(i, gamma).G;
    });
  }, [gamma]);

  const horizon = gamma < 1 ? (1 / (1 - gamma)).toFixed(1) : "∞";

  return (
    <Card className="my-6 border-primary/20 bg-card/60 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-4 md:p-6 space-y-5">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-foreground tracking-wide uppercase">
            Функция ценности V<sup>π</sup>(s)
          </h4>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-primary/30 text-primary font-mono text-xs">
              V(s) = {G.toFixed(4)}
            </Badge>
            <Badge variant="outline" className="border-accent/30 text-accent font-mono text-xs">
              Горизонт ≈ {horizon}
            </Badge>
          </div>
        </div>

        {/* State selector */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Начальное состояние</p>
          <div className="flex flex-wrap gap-2">
            {STATES.slice(0, TRANSITIONS.length).map((s, i) => (
              <button
                key={i}
                onClick={() => setStartState(i)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
                  i === startState
                    ? "border-primary/40 bg-primary/10 text-primary font-bold shadow-[0_0_12px_hsl(var(--primary)/0.15)]"
                    : "border-border/50 bg-card/30 text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {s.name} {s.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Выбор начального состояния меняет точку отсчёта — формула, таблица и диаграмма пересчитываются мгновенно.
          </p>
        </div>

        {/* MDP Canvas */}
        <div className="rounded-lg border border-border/30 overflow-hidden bg-background">
          <MDPCanvas startState={startState} gamma={gamma} highlightStep={highlightStep} />
        </div>

        {/* Gamma slider + contribution bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-muted-foreground font-mono">γ (gamma)</span>
              <span className="text-accent font-mono font-bold">{gamma.toFixed(2)}</span>
            </div>
            <Slider
              value={[gamma]}
              onValueChange={([v]) => setGamma(v)}
              min={0} max={0.99} step={0.01}
            />
            <p className="text-xs text-muted-foreground mt-2">
              {gamma < 0.3 && "«Близорук» — агент почти не учитывает далёкие награды."}
              {gamma >= 0.3 && gamma <= 0.7 && "Умеренное дисконтирование — баланс ближних и дальних наград."}
              {gamma > 0.7 && "«Дальновиден» — агент учитывает награды далеко в будущем."}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">γᵏ·R — вклад каждого шага</p>
            <ContributionBars steps={steps} />
          </div>
        </div>

        {/* V(s) for all states */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">V(s) для всех состояний</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {STATES.map((s, i) => {
              const val = allValues[i];
              const maxV = Math.max(...allValues.map(Math.abs), 0.1);
              const pct = Math.abs(val) / maxV * 100;
              return (
                <button
                  key={i}
                  onClick={() => i < TRANSITIONS.length && setStartState(i)}
                  className={`text-left p-2 rounded-md border transition-all ${
                    i === startState ? "border-primary/30 bg-primary/5" : "border-border/20 bg-card/20 hover:border-primary/20"
                  } ${i >= TRANSITIONS.length ? "opacity-40 cursor-default" : "cursor-pointer"}`}
                >
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className={i === startState ? "text-primary" : "text-muted-foreground"}>{s.name}</span>
                    <span className="text-primary font-semibold">{val.toFixed(2)}</span>
                  </div>
                  <div className="h-1 rounded-full bg-muted/30 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Formula + Table */}
        <FormulaBreakdown steps={steps} G={G} highlightStep={highlightStep} onHover={setHighlightStep} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StepTable steps={steps} highlightStep={highlightStep} onHover={setHighlightStep} />
          <div className="p-3 rounded-lg bg-card/40 border border-border/30 text-sm text-muted-foreground leading-relaxed space-y-2">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Что означает V(s)?</p>
            <p>
              <span className="text-primary font-semibold">V(s)</span> — суммарная ожидаемая выгода агента, начавшего из состояния s и следующего политике π.
            </p>
            <p>
              Каждая награда <span className="text-green-400">Rₖ</span> умножается на <span className="text-accent">γᵏ</span> — «степень забывания».
              Награда через 1 шаг стоит <span className="text-accent">{gamma.toFixed(2)}</span> от номинала, через 2 — <span className="text-accent">{(gamma * gamma).toFixed(3)}</span>.
            </p>
            <p>
              Без дисконтирования (γ=1) бесконечная сумма расходится.
              γ {"<"} 1 гарантирует конечность V(s) и корректность уравнений Беллмана.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValueFunctionViz;
