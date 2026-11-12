import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img, Sequence, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { publicAsset } from "../assets";
import { C, F } from "../style";
import { SourceTag, lerp, useTime } from "../components";

export const pos: CSSProperties = { position: "absolute" };
export const mono: CSSProperties = { fontFamily: F.mono };
export const pixel: CSSProperties = {
  imageRendering: "pixelated",
  display: "block",
};
export const ramp = (t: number, a: number, b: number) =>
  Math.min(1, Math.max(0, (t - a) / (b - a)));

// The sequence owns the clock. No browser timers, CSS animation or WebGL.
export const Stage = ({
  children,
  label,
  source,
  light = false,
}: {
  children: ReactNode;
  label: string;
  source: string;
  light?: boolean;
}) => (
  <AbsoluteFill
    data-act3-stage={label}
    style={{
      overflow: "hidden",
      background: light ? C.paper : "#070c10",
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
          : "linear-gradient(0deg,#020608e6,transparent 19%,transparent 85%,#020608a6)",
        zIndex: 20,
      }}
    />
    <div
      style={{
        ...pos,
        left: 74,
        top: 49,
        fontFamily: F.mono,
        fontSize: 21,
        letterSpacing: 3,
        color: light ? C.ink : "#ced5d8",
        zIndex: 30,
      }}
    >
      {label}
    </div>
    <SourceTag>{source}</SourceTag>
  </AbsoluteFill>
);

export const Raster = ({
  src,
  style,
}: {
  src: string;
  style?: CSSProperties;
}) => <Img src={publicAsset(src)} style={{ ...pixel, ...style }} />;

export const Still = ({
  src,
  dim = 0.3,
  x = 0,
  drift = 1,
}: {
  src: string;
  dim?: number;
  x?: number;
  drift?: number;
}) => {
  const t = useTime();
  return (
    <>
      <Img
        src={publicAsset(src)}
        style={{
          ...pos,
          inset: 0,
          width: 1920,
          height: 1080,
          objectFit: "cover",
          scale: 1.08 + t * 0.003 * drift,
          translate: `${x - t * 2.4 * drift}px 0`,
        }}
      />
      <div
        style={{
          ...pos,
          inset: 0,
          background: `linear-gradient(90deg,#030a10ad,transparent 80%),rgba(1,7,11,${dim})`,
        }}
      />
    </>
  );
};

export const Clip = ({
  src,
  at = 0,
  duration,
  dim = 0.15,
}: {
  src: string;
  at?: number;
  duration: number;
  dim?: number;
}) => {
  const { fps } = useVideoConfig();
  return (
    <Sequence
      name={src.split("/").pop()}
      from={Math.round(at * fps)}
      durationInFrames={Math.round(duration * fps)}
    >
      <Video
        src={publicAsset(src)}
        muted
        style={{ width: 1920, height: 1080, objectFit: "cover" }}
      />
      <div style={{ ...pos, inset: 0, background: `rgba(1,7,11,${dim})` }} />
    </Sequence>
  );
};

export const Grid = ({
  color = C.blue,
  tilt = false,
}: {
  color?: string;
  tilt?: boolean;
}) => {
  const t = useTime();
  return (
    <div
      style={{
        ...pos,
        inset: -600,
        opacity: 0.15,
        backgroundImage: `linear-gradient(${color}55 1px,transparent 1px),linear-gradient(90deg,${color}55 1px,transparent 1px)`,
        backgroundSize: "100px 100px",
        backgroundPosition: `${t * -14}px ${t * 7}px`,
        transform: tilt
          ? "perspective(1000px) rotateX(55deg) rotateZ(-14deg)"
          : undefined,
      }}
    />
  );
};

export const Type = ({
  children,
  at = 0,
  duration = 0.65,
  style,
}: {
  children: string;
  at?: number;
  duration?: number;
  style?: CSSProperties;
}) => {
  const t = useTime();
  const p = ramp(t, at, at + duration);
  return (
    <div style={{ ...mono, whiteSpace: "pre-wrap", ...style }}>
      {children.slice(0, Math.ceil(p * children.length))}
      <span
        style={{ opacity: p < 1 || t % 0.9 < 0.5 ? 1 : 0, color: C.yellow }}
      >
        ▌
      </span>
    </div>
  );
};

export const Stroke = ({
  d,
  at,
  duration = 0.65,
  color = C.yellow,
  width = 3,
}: {
  d: string;
  at: number;
  duration?: number;
  color?: string;
  width?: number;
}) => {
  const t = useTime();
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - lerp(t, at, at + duration)}
    />
  );
};

// Real NFO pixels at a known crop. Each crop uses source coordinates, so a
// move can only traverse actual text rather than an image's blank centre.
export const OriginalLine = ({
  src,
  sourceWidth,
  y,
  h,
  width,
  style,
}: {
  src: string;
  sourceWidth: number;
  y: number;
  h: number;
  width: number;
  style?: CSSProperties;
}) => (
  <div
    style={{
      width,
      height: (h * width) / sourceWidth,
      overflow: "hidden",
      ...style,
    }}
  >
    <Raster
      src={src}
      style={{ width, translate: `0 ${(-y * width) / sourceWidth}px` }}
    />
  </div>
);

export const DateRail = ({
  from,
  to,
  progress,
  color = C.yellow,
}: {
  from: string;
  to: string;
  progress: number;
  color?: string;
}) => (
  <div
    style={{
      ...pos,
      left: 100,
      top: 767,
      width: 1720,
      height: 70,
      ...mono,
      fontSize: 23,
      color: C.gray,
    }}
  >
    <span>{from}</span>
    <span style={{ float: "right", color }}>{to}</span>
    <div
      style={{
        ...pos,
        left: 0,
        right: 0,
        top: 45,
        height: 2,
        background: "#6e8aa650",
      }}
    />
    <div
      style={{
        ...pos,
        left: 0,
        top: 44,
        width: progress * 1720,
        height: 4,
        background: color,
      }}
    />
    <div
      style={{
        ...pos,
        left: progress * 1720 - 5,
        top: 40,
        width: 12,
        height: 12,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 22px ${color}`,
      }}
    />
  </div>
);
