import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Easing,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, F } from "./style";
export const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
export const ease = { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) };
export const lerp = (t: number, a: number, b: number, x = 0, y = 1) =>
  interpolate(t, [a, b], [x, y], ease);
export const useTime = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};
export const NameCursor = ({
  upper = false,
  size = 90,
  blink = true,
}: {
  upper?: boolean;
  size?: number;
  blink?: boolean;
}) => {
  const t = useTime();
  return (
    <span
      style={{
        color: C.yellow,
        fontFamily: F.mono,
        fontWeight: 500,
        fontSize: size,
        whiteSpace: "nowrap",
      }}
    >
      {upper ? "VOICES38" : "voices38"}
      <span style={{ opacity: !blink || t % 1 < 0.5 ? 1 : 0 }}>▮</span>
    </span>
  );
};
export const SourceTag = ({ children }: { children?: React.ReactNode }) => children ? (
  <div
    data-source-credit
    style={{
      position: "absolute",
      left: 96,
      top: 874,
      padding: "10px 16px",
      fontFamily: F.cn,
      fontSize: 24,
      color: C.white,
      background: "#0a0c0be3",
      borderLeft: `3px solid ${C.gray}`,
      zIndex: 40,
    }}
  >
    {children}
  </div>
) : null;
export const Eyebrow = ({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) => (
  <div
    style={{
      fontFamily: F.mono,
      fontSize: 24,
      letterSpacing: 4,
      color: dark ? "#858e89" : "#777568",
      marginBottom: 25,
    }}
  >
    {children}
  </div>
);
export const Ambient = ({ paper = false }: { paper?: boolean }) => {
  const t = useTime();
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          background: paper
            ? "radial-gradient(ellipse at 40% 35%, #f7f4eb 5%, #ddd7ca 100%)"
            : "radial-gradient(ellipse at 50% 40%, #1c2422 0%, #0A0C0B 72%)",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: paper ? 0.09 : 0.04,
          backgroundImage: paper
            ? 'url("' + grain + '")'
            : "repeating-linear-gradient(0deg, transparent, transparent 3px, #adc1aa 4px)",
          translate: `${Math.sin(t * 0.35) * 8}px ${Math.cos(t * 0.3) * 6}px`,
          scale: 1.03,
        }}
      />
      <div
        style={{
          position: "absolute",
          height: 1000,
          width: 700,
          top: -450,
          left: 100 + t * 5,
          rotate: "-25deg",
          background: paper ? "#fff5" : "#6e8aa60c",
          filter: "blur(95px)",
        }}
      />
    </AbsoluteFill>
  );
};
const grain =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".82" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" opacity=".4" filter="url(#n)"/></svg>',
  );
export const Scene = ({
  paper = false,
  children,
}: {
  paper?: boolean;
  children: React.ReactNode;
}) => (
  <AbsoluteFill
    style={{
      background: paper ? C.paper : C.black,
      color: paper ? C.ink : C.white,
      fontFamily: F.cn,
      overflow: "hidden",
    }}
  >
    <Ambient paper={paper} />
    {children}
  </AbsoluteFill>
);
export const Circle = ({
  progress = 1,
  color = C.red,
}: {
  progress?: number;
  color?: string;
}) => (
  <svg
    viewBox="0 0 120 80"
    style={{
      position: "absolute",
      inset: "-17% -15%",
      width: "130%",
      height: "140%",
      overflow: "visible",
    }}
  >
    <path
      d="M100 14 C56 -7 5 7 6 40 C3 73 102 81 112 43 C119 13 63 0 26 14"
      fill="none"
      stroke={color}
      strokeWidth="3"
      pathLength="1"
      strokeDasharray="1"
      strokeDashoffset={1 - progress}
    />
  </svg>
);
export const Stamp = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      display: "inline-block",
      fontFamily: F.cn,
      color: C.red,
      border: `4px double ${C.red}`,
      padding: "10px 24px",
      fontSize: 32,
      rotate: "-9deg",
      ...style,
    }}
  >
    {children}
  </div>
);
export const Typed = ({
  text,
  start = 0,
  speed = 28,
}: {
  text: string;
  start?: number;
  speed?: number;
}) => {
  const t = useTime();
  return <>{text.slice(0, Math.max(0, Math.floor((t - start) * speed)))}</>;
};
export const Rule = ({
  color = C.ink,
  progress = 1,
}: {
  color?: string;
  progress?: number;
}) => (
  <div
    style={{
      height: 2,
      background: color,
      scale: `${progress} 1`,
      transformOrigin: "left",
    }}
  />
);
export const Photo = ({
  src,
  style = {},
}: {
  src: string;
  style?: React.CSSProperties;
}) => (
  <Img
    src={src}
    style={{ display: "block", mixBlendMode: "multiply", ...style }}
  />
);
