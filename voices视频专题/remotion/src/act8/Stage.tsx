import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img } from "remotion";
import { publicAsset } from "../assets";
import { useTime, lerp } from "../components";
import { C, F } from "../style";
export { lin, pos, mono } from "../act7/Stage";
export const red = "#D95D4D",
  cyan = "#83C8C6";
export const Stage = ({
  name,
  source,
  paper = false,
  children,
}: {
  name: string;
  source: string;
  paper?: boolean;
  children: ReactNode;
}) => {
  const t = useTime();
  return (
    <AbsoluteFill
      data-act8-stage={name}
      style={{
        overflow: "hidden",
        background: paper ? C.paper : "#0A1219",
        color: paper ? C.ink : C.white,
        fontFamily: F.cn,
      }}
    >
      <AbsoluteFill
        style={{
          background: paper
            ? "radial-gradient(ellipse at 40% 10%,#fff8,transparent 75%)"
            : `radial-gradient(ellipse at ${48 + Math.sin(t * 0.18) * 12}% 50%,#1a3541,transparent 72%)`,
        }}
      />
      {children}
      {source ? (
        <div
          data-source-credit
          style={{
            position: "absolute",
            left: 100,
            top: 870,
            maxWidth: 1710,
            padding: "10px 14px",
            borderLeft: `3px solid ${paper ? "#a69c88" : "#617783"}`,
            fontSize: 22,
            lineHeight: 1.35,
            zIndex: 40,
            color: paper ? C.ink : "#d2dedc",
            background: paper ? "#f3efe4ed" : "#0a1219ed",
          }}
        >
          {source}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
export const Source = ({
  name,
  style,
}: {
  name: string;
  style?: CSSProperties;
}) => (
  <Img
    src={publicAsset(`v38/act8/${name}.png`)}
    style={{ display: "block", ...style }}
  />
);
export const Eyebrow = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      position: "absolute",
      left: 100,
      top: 80,
      fontSize: 23,
      fontFamily: F.mono,
      letterSpacing: 3,
      ...style,
    }}
  >
    {children}
  </div>
);
export const Paper = ({
  name,
  width = 1000,
  style,
}: {
  name: string;
  width?: number;
  style?: CSSProperties;
}) => (
  <div
    style={{
      width,
      padding: 18,
      background: "#fff",
      boxShadow: "0 24px 65px #0005",
      ...style,
    }}
  >
    <Source name={name} style={{ width: "100%" }} />
  </div>
);
export const Pen = ({
  at,
  left,
  top,
  width,
  color = C.yellow,
  height = 22,
}: {
  at: number;
  left: number;
  top: number;
  width: number;
  color?: string;
  height?: number;
}) => {
  const t = useTime();
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: width * lerp(t, at, at + 0.6),
        height,
        background: color,
        mixBlendMode: "multiply",
        opacity: 0.65,
      }}
    />
  );
};
export const Brand = ({
  name,
  width = 180,
  style,
}: {
  name: string;
  width?: number;
  style?: CSSProperties;
}) => (
  <Source
    name={name}
    style={{ width, height: width * 0.6, objectFit: "contain", ...style }}
  />
);
// A moving light across a real picture plane; no asynchronous CSS animation.
export const Light = ({ period = 8 }: { period?: number }) => {
  const t = useTime();
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        background: `linear-gradient(${110 + Math.sin(t / period) * 8}deg,transparent ${20 + ((t % period) / period) * 50}%,#ffffff09,transparent ${42 + ((t % period) / period) * 50}%)`,
      }}
    />
  );
};
