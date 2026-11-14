import React from "react";
import { AbsoluteFill } from "remotion";
import { C, F } from "../style";

export const Act1Scene = ({
  children,
  paper = false,
}: {
  children: React.ReactNode;
  paper?: boolean;
}) => (
  <AbsoluteFill
    style={{
      background: paper ? "#d9d3c7" : C.black,
      color: paper ? C.ink : C.white,
      fontFamily: F.cn,
      overflow: "hidden",
    }}
  >
    <AbsoluteFill
      style={{
        background: paper
          ? "radial-gradient(ellipse at 42% 30%, #f7f3e9 0%, #e6e0d4 58%, #cec7ba 100%)"
          : "radial-gradient(ellipse at 58% 40%, #18201f 0%, #0a0d0c 58%, #050706 100%)",
      }}
    />
    <AbsoluteFill
      style={{
        opacity: paper ? 0.16 : 0.1,
        backgroundImage: paper
          ? "repeating-linear-gradient(93deg, transparent 0, transparent 7px, #756d5d08 8px)"
          : "repeating-linear-gradient(0deg, transparent 0, transparent 4px, #b6c5b20a 5px)",
        pointerEvents: "none",
      }}
    />
    <AbsoluteFill
      style={{
        boxShadow: paper
          ? "inset 0 0 180px #675e451c"
          : "inset 0 0 220px #000b",
        pointerEvents: "none",
      }}
    />
    {children}
  </AbsoluteFill>
);

export const Act1Source = ({
  children,
  paper = false,
}: {
  children: React.ReactNode;
  paper?: boolean;
}) => children ? (
  <div
    data-source-credit
    style={{
      position: "absolute",
      left: 72,
      top: 872,
      maxWidth: 1500,
      padding: "8px 14px",
      borderLeft: `3px solid ${paper ? C.red : C.yellow}`,
      background: paper ? "#f3efe4d9" : "#070a09d9",
      color: paper ? "#575c60" : "#9da69e",
      fontFamily: F.mono,
      fontSize: 20,
      letterSpacing: 0.4,
      zIndex: 40,
    }}
  >
    {children}
  </div>
) : null;

export const Act1Kicker = ({
  children,
  right,
  paper = false,
}: {
  children: React.ReactNode;
  right?: React.ReactNode;
  paper?: boolean;
}) => (
  <div
    style={{
      position: "absolute",
      left: 72,
      right: 72,
      top: 58,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: paper ? "#64686a" : "#818d85",
      fontFamily: F.mono,
      fontSize: 21,
      letterSpacing: 3,
      zIndex: 30,
    }}
  >
    <span>{children}</span>
    {right ? (
      <span style={{ color: paper ? C.blue : C.yellow }}>{right}</span>
    ) : null}
  </div>
);

export const Act1Rule = ({
  progress = 1,
  color = C.yellow,
}: {
  progress?: number;
  color?: string;
}) => (
  <div
    style={{
      height: 2,
      width: "100%",
      background: color,
      scale: `${progress} 1`,
      transformOrigin: "left",
    }}
  />
);
