import { useEffect, useRef } from "react";

const LAYERS = [4, 8, 10, 8, 4];
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
    const lines = svg.querySelectorAll<SVGLineElement>(".nn-conn");
    const neuronGlows = svg.querySelectorAll<SVGCircleElement>(".nn-glow");
    const neuronCores = svg.querySelectorAll<SVGCircleElement>(".nn-core");
    const neuronDots = svg.querySelectorAll<SVGCircleElement>(".nn-dot");
    if (!lines.length) return;

    // Build index: neuron id -> elements
    const neuronMap = new Map<string, { glow: SVGCircleElement; core: SVGCircleElement; dot: SVGCircleElement; origColor: string }>();
    neuronGlows.forEach((el) => {
      const id = el.dataset.nid!;
      const core = svg.querySelector<SVGCircleElement>(`.nn-core[data-nid="${id}"]`)!;
      const dot = svg.querySelector<SVGCircleElement>(`.nn-dot[data-nid="${id}"]`)!;
      neuronMap.set(id, { glow: el, core, dot, origColor: el.dataset.origcolor! });
    });

    let frame: number;
    const animate = () => {
      const count = 4 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) {
        const line = lines[Math.floor(Math.random() * lines.length)];
        const activeColor = ACTIVE_COLORS[Math.floor(Math.random() * ACTIVE_COLORS.length)];
        const fromId = line.dataset.from!;
        const toId = line.dataset.to!;

        // Light up connection
        line.style.opacity = "0.85";
        line.style.strokeWidth = "2.5";
        line.style.stroke = activeColor;

        // Light up connected neurons
        [fromId, toId].forEach((nid) => {
          const n = neuronMap.get(nid);
          if (!n) return;
          n.glow.style.fill = activeColor;
          n.glow.style.opacity = "0.5";
          n.core.style.stroke = activeColor;
          n.core.style.strokeWidth = "3";
          n.dot.style.fill = activeColor;
          n.dot.style.opacity = "1";
        });

        const duration = 500 + Math.random() * 500;
        setTimeout(() => {
          line.style.opacity = "0.1";
          line.style.strokeWidth = "1";
          line.style.stroke = line.dataset.origcolor!;

          [fromId, toId].forEach((nid) => {
            const n = neuronMap.get(nid);
            if (!n) return;
            n.glow.style.fill = n.origColor;
            n.glow.style.opacity = "0.15";
            n.core.style.stroke = n.origColor;
            n.core.style.strokeWidth = "2";
            n.dot.style.fill = n.origColor;
            n.dot.style.opacity = "0.7";
          });
        }, duration);
      }
      frame = window.setTimeout(animate, 500 + Math.random() * 500) as unknown as number;
    };
    animate();
    return () => clearTimeout(frame);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full max-w-3xl mx-auto opacity-60 hover:opacity-90 transition-opacity duration-500"
      aria-hidden="true"
    >
      {/* Connections */}
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
              style={{ transition: "opacity 0.4s, stroke-width 0.4s, stroke 0.4s" }}
            />
          ))
        )
      )}

      {/* Neurons */}
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
                style={{ transition: "fill 0.4s, opacity 0.4s" }}
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
                style={{ transition: "stroke 0.4s, stroke-width 0.4s" }}
              />
              <circle
                className="nn-dot"
                data-nid={nid}
                cx={n.x}
                cy={n.y}
                r={4}
                fill={n.color}
                opacity="0.7"
                style={{ transition: "fill 0.4s, opacity 0.4s" }}
              />
            </g>
          );
        })
      )}
    </svg>
  );
};

export default NeuralNetworkViz;
