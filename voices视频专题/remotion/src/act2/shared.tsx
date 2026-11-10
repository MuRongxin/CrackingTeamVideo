import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { C, F } from "../style";
import { useTime, lerp, Eyebrow, NameCursor } from "../components";
export const DateCard = ({
  date,
  caption,
  style = {},
}: {
  date: string;
  caption?: string;
  style?: React.CSSProperties;
}) => (
  <div style={{ fontFamily: F.mono, color: C.white, ...style }}>
    <div style={{ fontSize: 44, letterSpacing: 3 }}>{date}</div>
    {caption && (
      <div
        style={{ fontFamily: F.cn, fontSize: 28, color: C.gray, marginTop: 15 }}
      >
        {caption}
      </div>
    )}
  </div>
);
export const Cursor = ({
  size = 60,
  color = C.yellow,
}: {
  size?: number;
  color?: string;
}) => {
  const t = useTime();
  return (
    <span
      style={{
        color,
        fontFamily: F.mono,
        fontSize: size,
        opacity: t % 1 < 0.5 ? 1 : 0,
      }}
    >
      ▮
    </span>
  );
};
export const TerminalPanel = ({
  children,
  title,
  style = {},
}: {
  children: React.ReactNode;
  title: string;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      background: "#0b100fed",
      border: "1px solid #8a8f9840",
      boxShadow: "0 30px 90px #0006",
      ...style,
    }}
  >
    <div
      style={{
        height: 64,
        borderBottom: "1px solid #8a8f9833",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "0 26px",
        fontFamily: F.mono,
        fontSize: 22,
        color: C.gray,
      }}
    >
      <span style={{ height: 8, width: 8, background: C.blue }} />
      <span style={{ height: 8, width: 8, background: "#69756b" }} />
      <span style={{ marginLeft: 15 }}>{title}</span>
    </div>
    {children}
  </div>
);
export const Paper = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      background: C.paper,
      color: C.ink,
      boxShadow: "0 24px 65px #0003",
      ...style,
    }}
  >
    {children}
  </div>
);
export const TinyNote = ({
  children,
  paper = false,
}: {
  children: React.ReactNode;
  paper?: boolean;
}) => (
  <div
    style={{
      position: "absolute",
      right: 112,
      top: 815,
      fontSize: 24,
      color: paper ? "#757b80" : C.gray,
    }}
  >
    {children}
  </div>
);
export const Nameplate = ({
  name,
  caption,
  active = false,
  style = {},
}: {
  name: string;
  caption: string;
  active?: boolean;
  style?: React.CSSProperties;
}) => (
  <div style={{ ...style }}>
    <div style={{ fontSize: 25, color: C.gray, marginBottom: 16 }}>
      {caption}
    </div>
    <div
      style={{
        fontFamily: F.mono,
        fontSize: 44,
        color: active ? C.yellow : C.ink,
        padding: "22px 30px",
        background: active ? C.black : "#e5e0d5",
        border: "1px solid #16213a33",
        whiteSpace: "nowrap",
      }}
    >
      {active ? <NameCursor size={44} /> : name}
    </div>
  </div>
);
export const Topline = ({
  label,
  right,
  paper = false,
}: {
  label: string;
  right: string;
  paper?: boolean;
}) => (
  <div
    style={{
      position: "absolute",
      top: 143,
      left: 130,
      right: 130,
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <Eyebrow dark={!paper}>{label}</Eyebrow>
    <div style={{ fontFamily: F.mono, fontSize: 24, color: C.gray }}>
      {right}
    </div>
  </div>
);
export const TypedText = ({
  text,
  start,
  speed = 35,
}: {
  text: string;
  start: number;
  speed?: number;
}) => {
  const t = useTime();
  return <>{text.slice(0, Math.max(0, Math.floor((t - start) * speed)))}</>;
};
