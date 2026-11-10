import type { CSSProperties, ReactNode } from "react";
import {
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { C, F } from "../style";
import { lerp, useTime, SourceTag, Scene } from "../components";

export const A3Scene = ({
  children,
  source,
  paper = false,
}: {
  children: ReactNode;
  source: string;
  paper?: boolean;
}) => (
  <Scene paper={paper}>
    {children}
    <SourceTag>{source}</SourceTag>
  </Scene>
);
export const Header = ({
  title,
  right = "NFO / 03",
  paper = false,
}: {
  title: string;
  right?: string;
  paper?: boolean;
}) => (
  <div
    style={{
      position: "absolute",
      left: 140,
      right: 140,
      top: 134,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      color: paper ? C.ink : C.gray,
    }}
  >
    <div style={{ fontSize: 28, letterSpacing: 3 }}>{title}</div>
    <div style={{ fontFamily: F.mono, fontSize: 25, letterSpacing: 2 }}>
      {right}
    </div>
  </div>
);
export const Reveal = ({
  at = 0,
  children,
  style = {},
  distance = 24,
}: {
  at?: number;
  children: ReactNode;
  style?: CSSProperties;
  distance?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        ...style,
        opacity: interpolate(frame, [at * fps, (at + 0.34) * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(
          frame,
          [at * fps, (at + 0.55) * fps],
          [`0px ${distance}px`, "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
      }}
    >
      {children}
    </div>
  );
};
export const NfoImage = ({
  name,
  style = {},
}: {
  name: string;
  style?: CSSProperties;
}) => (
  <Img
    src={staticFile(`v38/act3/nfo/${name}.png`)}
    style={{ imageRendering: "pixelated", display: "block", ...style }}
  />
);
export const Divider = ({
  at = 0,
  top = 252,
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
        position: "absolute",
        left: 140,
        right: 140,
        top,
        height: 2,
        background: color,
        scale: `${lerp(t, at, at + 0.7)} 1`,
        transformOrigin: "left",
      }}
    />
  );
};
export const KindStage = ({
  game,
  english,
  chinese,
  at = 0,
  children,
  source,
}: {
  game: string;
  english: ReactNode;
  chinese: string;
  at?: number;
  children?: ReactNode;
  source: string;
}) => (
  <A3Scene source={source}>
    <Header title={game} right="voices38 / KIND" />
    <Divider />
    <div
      style={{
        position: "absolute",
        left: 140,
        top: 291,
        color: C.yellow,
        fontFamily: F.mono,
        fontSize: 42,
      }}
    >
      KIND
    </div>
    <Reveal
      at={at}
      style={{
        position: "absolute",
        left: 400,
        top: 280,
        right: 140,
        fontFamily: F.mono,
        fontSize: 66,
        lineHeight: 1.25,
      }}
    >
      {english}
    </Reveal>
    <Reveal
      at={at + 0.18}
      style={{
        position: "absolute",
        left: 400,
        top: 385,
        fontSize: 58,
        color: C.yellow,
      }}
    >
      {chinese}
    </Reveal>
    {children}
  </A3Scene>
);
export const AccentLine = ({
  x1,
  y1,
  x2,
  y2,
  at,
  color = C.blue,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  at: number;
  color?: string;
}) => {
  const t = useTime();
  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <path
        d={`M${x1} ${y1}L${x2} ${y2}`}
        pathLength={1}
        stroke={color}
        strokeWidth={2}
        strokeDasharray={1}
        strokeDashoffset={1 - lerp(t, at, at + 0.6)}
        fill="none"
      />
    </svg>
  );
};
