import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img } from "remotion";
import { Video } from "@remotion/media";
import { publicAsset } from "../assets";
import { useTime, lerp, SourceTag } from "../components";
import { C, F } from "../style";
export const pos: CSSProperties = { position: "absolute" };
export const mono: CSSProperties = { fontFamily: F.mono };
export const lin = (t: number, a: number, b: number) =>
  Math.max(0, Math.min(1, (t - a) / (b - a)));
export const Stage = ({
  name,
  source,
  children,
}: {
  name: string;
  source: string;
  children: ReactNode;
}) => (
  <AbsoluteFill
    data-act7-stage={name}
    style={{
      background: "#080e13",
      color: C.white,
      fontFamily: F.cn,
      overflow: "hidden",
    }}
  >
    {children}
    <SourceTag>{source}</SourceTag>
  </AbsoluteFill>
);
export const Footage = ({
  name,
  style,
}: {
  name: string;
  style?: CSSProperties;
}) => (
  <Video
    name={name}
    src={publicAsset(`v38/act7/${name}.mp4`)}
    muted
    style={{
      ...pos,
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      ...style,
    }}
  />
);
export const Darken = ({ opacity = 0.9 }: { opacity?: number }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: `linear-gradient(0deg,rgba(4,9,15,${opacity}),transparent 65%),linear-gradient(90deg,#03090ea8,transparent 75%)`,
    }}
  />
);
export const SourceImage = ({
  name,
  style,
}: {
  name: string;
  style?: CSSProperties;
}) => (
  <Img
    src={publicAsset(`v38/act7/${name}`)}
    style={{ display: "block", ...style }}
  />
);
export const Kicker = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      ...pos,
      top: 88,
      left: 100,
      ...mono,
      fontSize: 24,
      letterSpacing: 3,
      color: C.yellow,
      ...style,
    }}
  >
    {children}
  </div>
);
export const Rule = ({
  at = 0,
  top = 225,
  color = C.yellow,
}: {
  at?: number;
  top?: number;
  color?: string;
}) => {
  const t = useTime();
  return (
    <div
      style={{
        ...pos,
        left: 100,
        top,
        width: 1720 * lerp(t, at, at + 0.8),
        height: 3,
        background: color,
      }}
    />
  );
};
export const Question = ({ style }: { style?: CSSProperties }) => {
  const t = useTime();
  return (
    <div
      style={{
        ...pos,
        left: 760,
        top: 140,
        ...mono,
        fontSize: 430,
        fontWeight: 500,
        lineHeight: 1,
        color: C.yellow,
        translate: `0px ${Math.sin(t * 0.8) * 8}px`,
        ...style,
      }}
    >
      ?
    </div>
  );
};
