import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img, interpolate } from "remotion";
import { C, F } from "../style";
import { SourceTag, useTime, lerp } from "../components";
import { publicAsset } from "../assets";
import testers from "./testers.json";
export { Stroke } from "../act3/motion-shared";
export const pos: CSSProperties = { position: "absolute" };
export const mono: CSSProperties = { fontFamily: F.mono };
export const clamp = (n: number) => Math.max(0, Math.min(1, n));
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
export const linear = (t: number, a: number, b: number) =>
  clamp((t - a) / (b - a));
export const smooth = (t: number, a: number, b: number) => {
  const p = linear(t, a, b);
  return p * p * (3 - 2 * p);
};
export const names = testers.pragmata.names;
export const Stage = ({
  label,
  source,
  children,
  light = false,
}: {
  label: string;
  source: string;
  children: ReactNode;
  light?: boolean;
}) => (
  <AbsoluteFill
    data-act5-stage={label}
    style={{
      overflow: "hidden",
      background: light ? C.paper : "#060d12",
      color: light ? C.ink : C.white,
      fontFamily: F.cn,
    }}
  >
    {children}
    <div
      style={{
        ...pos,
        inset: 0,
        pointerEvents: "none",
        background: light
          ? "none"
          : "linear-gradient(0deg,#03090eee,transparent 19%,transparent 87%,#03090e99)",
        zIndex: 30,
      }}
    />
    <div
      style={{
        ...pos,
        left: 86,
        top: 48,
        ...mono,
        fontSize: 22,
        letterSpacing: 2,
        color: light ? C.ink : "#bed2d8",
        zIndex: 40,
      }}
    >
      {label}
    </div>
    <SourceTag>{source}</SourceTag>
  </AbsoluteFill>
);
export const Raster = ({
  path,
  style,
}: {
  path: string;
  style?: CSSProperties;
}) => (
  <Img
    src={publicAsset(path)}
    style={{ display: "block", imageRendering: "pixelated", ...style }}
  />
);

// Sparse star/tracer field. Deterministic frame-based camera movement, no timers.
export const Field = ({
  speed = 1,
  opacity = 1,
}: {
  speed?: number;
  opacity?: number;
}) => {
  const t = useTime();
  return (
    <svg
      viewBox="0 0 1920 1080"
      style={{ ...pos, inset: 0, width: "100%", height: "100%", opacity }}
    >
      <defs>
        <radialGradient id="a5-field">
          <stop stopColor="#1c4246" stopOpacity=".52" />
          <stop offset="1" stopColor="#060d12" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx={1180 + Math.sin(t * 0.13) * 170}
        cy="450"
        rx="920"
        ry="670"
        fill="url(#a5-field)"
      />
      {Array.from({ length: 54 }, (_, i) => {
        const z = 1 + (i % 5) * 0.2,
          x = ((i * 719 + t * (11 + z * 4) * speed) % 2200) - 140,
          y = ((i * 277) % 800) + 40;
        return (
          <g key={i} opacity={0.13 + (i % 4) * 0.055}>
            <path
              d={`M${x - 10 * z} ${y}h${18 * z}`}
              stroke="#8db8bf"
              strokeWidth="1"
            />
            <circle cx={x} cy={y} r={i % 3 === 0 ? 1.5 : 0.7} fill={C.white} />
          </g>
        );
      })}
      {[0, 1, 2].map((i) => (
        <ellipse
          key={i}
          cx="960"
          cy="478"
          rx={620 + i * 135}
          ry={180 + i * 75}
          fill="none"
          stroke="#6e8aa6"
          strokeOpacity=".09"
          transform={`rotate(${-20 + i * 18 + t * speed * 0.35} 960 478)`}
        />
      ))}
    </svg>
  );
};

export const sourcePositions = (() => {
  const result: { x: number; y: number }[] = [];
  for (const [row, line] of testers.pragmata.lines.entries()) {
    let cursor = 0;
    const length = line.join(" | ").length;
    const left = 960 - length * 7.1;
    for (const name of line) {
      result.push({
        x: left + cursor * 14.2 + name.length * 7.1,
        y: 470 + row * 45,
      });
      cursor += name.length + 3;
    }
  }
  return result;
})();
// Six rows on a rotating cylinder, projected in JS. Keeps Studio WebGL-free.
const projectPoint = (i: number, phase: number) => {
  const row = Math.floor(i / 6),
    column = i % 6;
  const angle = (column / 6) * Math.PI * 2 + row * 0.27 + phase;
  const z = Math.cos(angle) * 220,
    perspective = 1300 / (1300 + z);
  return {
    x: 960 + Math.sin(angle) * 790 * perspective,
    y: 495 + (row - 2.5) * 84 * perspective,
    z,
    scale: perspective,
    opacity: 0.48 + 0.5 * (1 - z / 440),
  };
};
// Resolve screen-space collisions after projection, before the camera moves.
// A one-phase cache avoids solving the same layout for each label in a frame.
let cachedPhase = Number.NaN;
let cachedPoints: ReturnType<typeof projectPoint>[] = [];
export const cloudPoint = (index: number, phase: number) => {
  if (phase !== cachedPhase) {
    cachedPhase = phase;
    cachedPoints = names.map((_, i) => projectPoint(i, phase));
    const halfWidths = names.map(
      (name, i) => name.length * 8.6 * cachedPoints[i].scale + 12,
    );
    for (let pass = 0; pass < 24; pass++) {
      for (let i = 0; i < cachedPoints.length; i++) {
        const a = cachedPoints[i];
        a.x = Math.max(80 + halfWidths[i], Math.min(1840 - halfWidths[i], a.x));
        a.y = Math.max(270, Math.min(735, a.y));
        for (let j = i + 1; j < cachedPoints.length; j++) {
          const b = cachedPoints[j];
          const clearance = 21 * (a.scale + b.scale);
          if (
            Math.abs(a.x - b.x) < halfWidths[i] + halfWidths[j] &&
            Math.abs(a.y - b.y) < clearance
          ) {
            const direction = a.y <= b.y ? -1 : 1;
            const shift = (clearance - Math.abs(a.y - b.y)) / 2 + 0.25;
            a.y += direction * shift;
            b.y -= direction * shift;
          }
        }
      }
    }
  }
  return cachedPoints[index];
};
export const Cloud = ({
  spread = 1,
  phase = 0.4,
  opacity = 1,
  focus,
  zoom = 1,
  pan = { x: 960, y: 360 },
  count = 34,
}: {
  spread?: number;
  phase?: number;
  opacity?: number;
  focus?: string;
  zoom?: number;
  pan?: { x: number; y: number };
  count?: number;
}) => {
  const points = names
    .map((name, i) => ({ name, i, ...cloudPoint(i, phase) }))
    .sort((a, b) => b.z - a.z);
  return (
    <div style={{ ...pos, inset: 0, opacity }}>
      {points.map((p) => {
        const a = sourcePositions[p.i],
          x = mix(a.x, p.x, spread),
          y = mix(a.y, p.y, spread),
          focused = p.name === focus;
        return (
          <div
            key={p.name}
            data-tester={p.name}
            style={{
              ...pos,
              left: (x - pan.x) * zoom + 960,
              top: (y - pan.y) * zoom + 360,
              translate: "-50% -50%",
              scale: mix(1, p.scale, spread) * zoom,
              fontFamily: F.mono,
              fontSize: mix(24, 28, spread),
              whiteSpace: "nowrap",
              opacity:
                p.i < count
                  ? focus && !focused
                    ? 0.045
                    : mix(1, p.opacity, spread)
                  : 0,
              color: focused ? C.yellow : C.white,
              textShadow: focused ? "0 0 25px #ffc83d25" : "0 3px 10px #000",
              zIndex: focused ? 25 : Math.round(12 - p.z / 80),
            }}
          >
            {p.name}
          </div>
        );
      })}
    </div>
  );
};

export const PageMark = ({
  x = 0,
  y = 0,
  size = 1,
  label = "NFO",
  color = C.blue,
}: {
  x?: number;
  y?: number;
  size?: number;
  label?: string;
  color?: string;
}) => (
  <g transform={`translate(${x} ${y}) scale(${size})`}>
    <path
      d="M-57-75H25L57-43V75H-57Z"
      fill="#0e1a23"
      stroke={color}
      strokeWidth="2"
    />
    <path d="M25-75V-43H57" fill="none" stroke={color} strokeWidth="2" />
    <text x="-35" y="-15" fill={color} fontSize="22" fontFamily={F.mono}>
      {label}
    </text>
    {[0, 1, 2].map((i) => (
      <path
        key={i}
        d={`M-35 ${12 + i * 15}h${65 - i * 8}`}
        stroke={color}
        strokeWidth="2"
        opacity=".5"
      />
    ))}
  </g>
);
