import type { CSSProperties, ReactNode } from "react";
import { useTime, lerp } from "../components";
import { C } from "../style";
import { pos } from "./Stage";

// Masks and editorial marks move; original evidence stays fixed while it is read.
export const Reveal = ({
  at = 0,
  seconds = 0.45,
  vertical = false,
  children,
  style,
}: {
  at?: number;
  seconds?: number;
  vertical?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}) => {
  const t = useTime();
  return (
    <div
      style={{
        ...pos,
        inset: 0,
        ...style,
        clipPath: vertical
          ? `inset(0 0 ${100 * (1 - lerp(t, at, at + seconds))}% 0)`
          : `inset(0 ${100 * (1 - lerp(t, at, at + seconds))}% 0 0)`,
      }}
    >
      {children}
    </div>
  );
};
export const InkLine = ({
  at,
  x,
  y,
  width,
  color = C.yellow,
  height = 5,
}: {
  at: number;
  x: number;
  y: number;
  width: number;
  color?: string;
  height?: number;
}) => {
  const t = useTime();
  return (
    <div
      style={{
        ...pos,
        left: x,
        top: y,
        width: width * lerp(t, at, at + 0.6),
        height,
        background: color,
      }}
    />
  );
};
export const Kinetic = ({
  text,
  at = 0,
  x = 110,
  y = 600,
  size = 90,
  color = C.white,
  step = 0.045,
}: {
  text: string;
  at?: number;
  x?: number;
  y?: number;
  size?: number;
  color?: string;
  step?: number;
}) => {
  const t = useTime();
  return (
    <div
      style={{
        ...pos,
        left: x,
        top: y,
        fontSize: size,
        color,
        whiteSpace: "nowrap",
        lineHeight: 1.2,
        overflow: "hidden",
        paddingBottom: 12,
      }}
    >
      {[...text].map((c, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            translate: `0 ${54 * (1 - lerp(t, at + i * step, at + i * step + 0.34))}px`,
            opacity: lerp(t, at + i * step, at + i * step + 0.2),
          }}
        >
          {c}
        </span>
      ))}
    </div>
  );
};
export const Question = ({
  at,
  x = 1430,
  y = 270,
  size = 300,
  color = C.yellow,
}: {
  at: number;
  x?: number;
  y?: number;
  size?: number;
  color?: string;
}) => {
  const t = useTime();
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 200 280"
      style={{ ...pos, left: x, top: y }}
    >
      <path
        d="M30 72 C30 2 172 2 172 72 C172 120 102 127 102 182"
        fill="none"
        stroke={color}
        strokeWidth="16"
        strokeLinecap="square"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - lerp(t, at, at + 0.9)}
      />
      <rect
        x="94"
        y="228"
        width="18"
        height="18"
        fill={color}
        opacity={lerp(t, at + 0.9, at + 1.1)}
      />
    </svg>
  );
};
export const cover: CSSProperties = {
  ...pos,
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};
export const FilmShade = ({ side = false }: { side?: boolean }) => (
  <div
    style={{
      ...pos,
      inset: 0,
      background: side
        ? "linear-gradient(90deg,#071218ed,transparent 80%),linear-gradient(0deg,#071218ef,transparent 75%)"
        : "linear-gradient(0deg,#071218ef,transparent 85%)",
    }}
  />
);
