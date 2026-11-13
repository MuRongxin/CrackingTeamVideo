import type { ReactNode, CSSProperties } from "react";
import { AbsoluteFill, Img } from "remotion";
import { useTime, lerp } from "../components";
import { C, F } from "../style";
import { publicAsset } from "../assets";
import { Source, pos, mono, lin, red, mint } from "./Stage";
export { pos, mono, lin, red, mint };

// Sub-shots share the narration clock. Cuts change subject/scale at spoken beats.
export const Beat = ({
  from = 0,
  to = Infinity,
  name,
  paper = false,
  clear = false,
  children,
}: {
  from?: number;
  to?: number;
  name: string;
  paper?: boolean;
  clear?: boolean;
  children: ReactNode;
}) => {
  const t = useTime();
  if (t < from || t >= to) return null;
  return (
    <AbsoluteFill
      data-act9-beat={name}
      style={{
        background: clear ? "transparent" : paper ? C.paper : "#08131b",
        color: paper ? C.ink : C.white,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
export const Tag = ({
  children,
  light = false,
  style,
}: {
  children: ReactNode;
  light?: boolean;
  style?: CSSProperties;
}) => (
  <div
    style={{
      ...pos,
      left: 100,
      top: 76,
      ...mono,
      fontSize: 25,
      letterSpacing: 2,
      color: light ? C.yellow : red,
      ...style,
    }}
  >
    {children}
  </div>
);
export const Line = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      ...pos,
      left: 110,
      top: 630,
      fontSize: 94,
      lineHeight: 1.15,
      ...style,
    }}
  >
    {children}
  </div>
);
// Source documents stay still while readable; narrative changes use explicit cuts.
export const Archive = ({
  name,
  x = 100,
  y = 240,
  width = 1720,
  style,
}: {
  name: string;
  x?: number;
  y?: number;
  width?: number;
  style?: CSSProperties;
}) => (
  <Source name={name} style={{ ...pos, left: x, top: y, width, ...style }} />
);
export const OldSource = ({
  file,
  style,
}: {
  file: string;
  style?: CSSProperties;
}) => <Img src={publicAsset(file)} style={{ display: "block", ...style }} />;
export const Rule = ({
  at = 0,
  width = 1500,
  top = 780,
  color = red,
}: {
  at?: number;
  width?: number;
  top?: number;
  color?: string;
}) => {
  const t = useTime();
  return (
    <div
      style={{
        ...pos,
        left: 110,
        top,
        width: width * lerp(t, at, at + 0.65),
        height: 5,
        background: color,
      }}
    />
  );
};
export const NumberDate = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      ...pos,
      left: 110,
      top: 170,
      ...mono,
      fontSize: 230,
      lineHeight: 1,
      color: C.yellow,
      ...style,
    }}
  >
    {children}
  </div>
);
