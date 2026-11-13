import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img } from "remotion";
import { useTime } from "../components";
import { publicAsset } from "../assets";
import { C, F } from "../style";
export const pos: CSSProperties = { position: "absolute" };
export const mono: CSSProperties = { fontFamily: F.mono, fontWeight: 500 };
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
}) => (
  <AbsoluteFill
    data-act10-stage={name}
    style={{
      background: paper ? C.paper : "#071218",
      color: paper ? C.ink : C.white,
      fontFamily: F.cn,
      overflow: "hidden",
    }}
  >
    {children}
    <div
      data-act10-credit
      style={{
        ...pos,
        left: 100,
        top: 900,
        maxWidth: 1700,
        fontSize: 23,
        lineHeight: 1.35,
        color: paper ? "#55626b" : "#b8c8ca",
        borderLeft: "2px solid #7b989d",
        paddingLeft: 16,
      }}
    >
      {source}
    </div>
  </AbsoluteFill>
);
export const Cut = ({
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
      data-act10-cut={name}
      style={{
        background: clear ? "transparent" : paper ? C.paper : "#071218",
        color: paper ? C.ink : C.white,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
export const Still = ({
  src,
  name,
  x = 100,
  y = 250,
  width = 1720,
  style,
}: {
  src?: string;
  name?: string;
  x?: number;
  y?: number;
  width?: number;
  style?: CSSProperties;
}) => (
  <Img
    data-act10-source={src ?? name}
    src={publicAsset(src ?? `v38/act10/${name}.png`)}
    style={{ ...pos, left: x, top: y, width, display: "block", ...style }}
  />
);
export const Label = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => (
  <div
    style={{
      ...pos,
      left: 100,
      top: 78,
      ...mono,
      fontSize: 24,
      letterSpacing: 2,
      color: C.yellow,
      ...style,
    }}
  >
    {children}
  </div>
);
export const Words = ({
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
      top: 580,
      width: 1700,
      fontSize: 100,
      lineHeight: 1.22,
      ...style,
    }}
  >
    {children}
  </div>
);
