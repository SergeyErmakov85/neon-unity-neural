import { useEffect, useRef } from "react";

const LAYERS = [4, 6, 6, 4];
const NEURON_R = 12;
const LAYER_GAP = 210;
const NEURON_GAP = 60;
const WIDTH = (LAYERS.length - 1) * LAYER_GAP + 120;
const HEIGHT = Math.max(...LAYERS) * NEURON_GAP + 60;

const colors = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "hsl(var(--accent))",
  "hsl(var(--primary))",
];

interface Pos { x: number; y: number; color: string }

const getPositions = (): Pos[][] =>
  LAYERS.map((count, li) => {
    const x = 40 + li * LAYER_GAP;
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

  // Respect reduced motion
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const svg = svgRef.current;
    if (!svg || prefersReduced) return;
    const lines = svg.querySelectorAll<SVGLineElement>(".nn-conn");
    if (!lines.length) return;

    let frame: number;
    const animate = () => {
      const count = 3 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const line = lines[Math.floor(Math.random() * lines.length)];
        line.style.opacity = "0.8";
        line.style.strokeWidth = "2";
        setTimeout(() => {
          line.style.opacity = "0.12";
          line.style.strokeWidth = "1";
        }, 400 + Math.random() * 400);
      }
      frame = window.setTimeout(animate, 600 + Math.random() * 600) as unknown as number;
    };
    animate();
    return () => clearTimeout(frame);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full max-w-lg mx-auto opacity-60 hover:opacity-90 transition-opacity duration-500"
      aria-hidden="true"
    >
      {/* Connections */}
      {positions.slice(0, -1).map((layer, li) =>
        layer.map((from, fi) =>
          positions[li + 1].map((to, ti) => (
            <line
              key={`${li}-${fi}-${ti}`}
              className="nn-conn"
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={from.color}
              strokeWidth="1"
              opacity="0.12"
              style={{ transition: "opacity 0.4s, stroke-width 0.4s" }}
            />
          ))
        )
      )}

      {/* Neurons */}
      {positions.map((layer, li) =>
        layer.map((n, ni) => (
          <g key={`n-${li}-${ni}`}>
            {/* Glow */}
            <circle
              cx={n.x}
              cy={n.y}
              r={NEURON_R + 4}
              fill={n.color}
              opacity="0.15"
              className="animate-pulse"
              style={{ animationDelay: `${(li * 300 + ni * 150) % 2000}ms` }}
            />
            {/* Core */}
            <circle
              cx={n.x}
              cy={n.y}
              r={NEURON_R}
              fill="hsl(var(--background))"
              stroke={n.color}
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: `${(li * 300 + ni * 150) % 2000}ms` }}
            />
            {/* Inner dot */}
            <circle cx={n.x} cy={n.y} r={3} fill={n.color} opacity="0.7" />
          </g>
        ))
      )}
    </svg>
  );
};

export default NeuralNetworkViz;
