import { useEffect, useRef } from "react";

const LAYERS = [4, 6, 8, 6, 4];
const NEURON_R = 12;
const LAYER_GAP = 180;
const NEURON_GAP = 50;
const WIDTH = (LAYERS.length - 1) * LAYER_GAP + 120;
const HEIGHT = Math.max(...LAYERS) * NEURON_GAP + 60;

const ACTIVE_COLORS = ["#FFD700", "#FF8C00", "#FFA500", "#FFAE42"];

const colors = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--secondary))",
  "hsl(var(--primary))",
];

interface Pos { x: number; y: number; color: string }

const getPositions = (): Pos[][] =>
  LAYERS.map((count, li) => {
    const x = 60 + li * LAYER_GAP;
    const totalH = (count - 1) * NEURON_GAP;
    const startY = (HEIGHT - totalH) / 2;
    return Array.from({ length: count }, (_, ni) => ({
      x,
      y: startY + ni * NEURON_GAP,
      color: colors[li],
    }));
  });

const NeuralNetworkViz = () => {
  const positions = getPositions();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const svg = svgRef.current;
    if (!svg || prefersReduced) return;

    // Build lookup maps
    const getLinesBetween = (li: number, fi: number, ti: number) =>
      svg.querySelector<SVGLineElement>(`.nn-conn[data-from="${li}-${fi}"][data-to="${li + 1}-${ti}"]`);

    const getNeuron = (nid: string) => ({
      glow: svg.querySelector<SVGCircleElement>(`.nn-glow[data-nid="${nid}"]`),
      core: svg.querySelector<SVGCircleElement>(`.nn-core[data-nid="${nid}"]`),
      dot: svg.querySelector<SVGCircleElement>(`.nn-dot[data-nid="${nid}"]`),
    });

    const activateNeuron = (nid: string, color: string) => {
      const n = getNeuron(nid);
      if (!n.glow) return;
      n.glow!.style.fill = color;
      n.glow!.style.opacity = "0.55";
      n.core!.style.stroke = color;
      n.core!.style.strokeWidth = "3";
      n.dot!.style.fill = color;
      n.dot!.style.opacity = "1";
    };

    const deactivateNeuron = (nid: string, origColor: string) => {
      const n = getNeuron(nid);
      if (!n.glow) return;
      n.glow!.style.fill = origColor;
      n.glow!.style.opacity = "0.15";
      n.core!.style.stroke = origColor;
      n.core!.style.strokeWidth = "2";
      n.dot!.style.fill = origColor;
      n.dot!.style.opacity = "0.7";
    };

    const activateLine = (line: SVGLineElement, color: string) => {
      line.style.opacity = "0.85";
      line.style.strokeWidth = "2.5";
      line.style.stroke = color;
    };

    const deactivateLine = (line: SVGLineElement) => {
      line.style.opacity = "0.1";
      line.style.strokeWidth = "1";
      line.style.stroke = line.dataset.origcolor!;
    };

    let timeout: number;
    let cancelled = false;

    const runWave = () => {
      if (cancelled) return;
      const waveColor = ACTIVE_COLORS[Math.floor(Math.random() * ACTIVE_COLORS.length)];
      // Pick a random starting neuron in layer 0
      const startNeuron = Math.floor(Math.random() * LAYERS[0]);
      
      // For each layer transition, pick 1-2 random paths
      // Build the full path first
      const path: { layer: number; neuron: number }[] = [{ layer: 0, neuron: startNeuron }];
      for (let li = 0; li < LAYERS.length - 1; li++) {
        const nextNeuron = Math.floor(Math.random() * LAYERS[li + 1]);
        path.push({ layer: li + 1, neuron: nextNeuron });
      }

      const STEP_DELAY = 300;
      const HOLD = 400;

      // Animate each step
      path.forEach((step, idx) => {
        const delay = idx * STEP_DELAY;

        setTimeout(() => {
          if (cancelled) return;
          const nid = `${step.layer}-${step.neuron}`;
          activateNeuron(nid, waveColor);

          // Activate the connection line from previous to this
          if (idx > 0) {
            const prev = path[idx - 1];
            const line = getLinesBetween(prev.layer, prev.neuron, step.neuron);
            if (line) activateLine(line, waveColor);
          }

          // Deactivate after hold
          setTimeout(() => {
            if (cancelled) return;
            deactivateNeuron(nid, colors[step.layer]);
            if (idx > 0) {
              const prev = path[idx - 1];
              const line = getLinesBetween(prev.layer, prev.neuron, step.neuron);
              if (line) deactivateLine(line);
            }
          }, HOLD);
        }, delay);
      });

      // Schedule next wave
      const totalDuration = path.length * STEP_DELAY + HOLD + 200;
      timeout = window.setTimeout(runWave, totalDuration + Math.random() * 600);
    };

    // Run waves and also random sparkles
    runWave();

    // Additional random sparkles
    const lines = svg.querySelectorAll<SVGLineElement>(".nn-conn");
    let sparkleTimeout: number;
    const sparkle = () => {
      if (cancelled) return;
      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        const line = lines[Math.floor(Math.random() * lines.length)];
        const color = ACTIVE_COLORS[Math.floor(Math.random() * ACTIVE_COLORS.length)];
        const fromId = line.dataset.from!;
        const toId = line.dataset.to!;

        activateLine(line, color);
        activateNeuron(fromId, color);
        activateNeuron(toId, color);

        setTimeout(() => {
          if (cancelled) return;
          deactivateLine(line);
          const [fli, fni] = fromId.split("-").map(Number);
          const [tli, tni] = toId.split("-").map(Number);
          deactivateNeuron(fromId, colors[fli]);
          deactivateNeuron(toId, colors[tli]);
        }, 400 + Math.random() * 300);
      }
      sparkleTimeout = window.setTimeout(sparkle, 800 + Math.random() * 800);
    };
    sparkle();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      clearTimeout(sparkleTimeout);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full max-w-3xl mx-auto opacity-60 hover:opacity-90 transition-opacity duration-500"
      aria-hidden="true"
    >
      {positions.slice(0, -1).map((layer, li) =>
        layer.map((from, fi) =>
          positions[li + 1].map((to, ti) => (
            <line
              key={`${li}-${fi}-${ti}`}
              className="nn-conn"
              data-from={`${li}-${fi}`}
              data-to={`${li + 1}-${ti}`}
              data-origcolor={from.color}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={from.color}
              strokeWidth="1"
              opacity="0.1"
              style={{ transition: "opacity 0.3s, stroke-width 0.3s, stroke 0.3s" }}
            />
          ))
        )
      )}

      {positions.map((layer, li) =>
        layer.map((n, ni) => {
          const nid = `${li}-${ni}`;
          return (
            <g key={nid}>
              <circle
                className="nn-glow"
                data-nid={nid}
                data-origcolor={n.color}
                cx={n.x}
                cy={n.y}
                r={NEURON_R + 5}
                fill={n.color}
                opacity="0.15"
                style={{ transition: "fill 0.3s, opacity 0.3s" }}
              />
              <circle
                className="nn-core"
                data-nid={nid}
                cx={n.x}
                cy={n.y}
                r={NEURON_R}
                fill="hsl(var(--background))"
                stroke={n.color}
                strokeWidth="2"
                style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
              />
              <circle
                className="nn-dot"
                data-nid={nid}
                cx={n.x}
                cy={n.y}
                r={4}
                fill={n.color}
                opacity="0.7"
                style={{ transition: "fill 0.3s, opacity 0.3s" }}
              />
            </g>
          );
        })
      )}
    </svg>
  );
};

export default NeuralNetworkViz;
