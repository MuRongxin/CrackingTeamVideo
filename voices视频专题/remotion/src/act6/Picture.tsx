import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img, Sequence, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { publicAsset } from "../assets";
import { useTime, lerp } from "../components";
import { C, F } from "../style";
import { pos, mono, HV, OS, linear } from "./shared";

export const Film = ({
  name,
  style,
  shade = 0,
  children,
}: {
  name: string;
  style?: CSSProperties;
  shade?: number;
  children?: ReactNode;
}) => (
  <AbsoluteFill style={{ overflow: "hidden", ...style }}>
    <Video
      name={name}
      src={publicAsset(`v38/revision/${name}.mp4`)}
      muted
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
    {shade > 0 && (
      <AbsoluteFill style={{ background: `rgba(0,8,12,${shade})` }} />
    )}
    {children}
  </AbsoluteFill>
);

// Both are source marks, never a font replacement. The voices38 crop stays in
// CSS so the archived NFO remains intact, with its original pixel structure.
export const GroupMark = ({
  name,
  width = 600,
  style,
}: {
  name: "voices38" | "denuvowo";
  width?: number;
  style?: CSSProperties;
}) => (
  <div
    data-source-mark={name}
    style={{
      width,
      height: width * (name === "voices38" ? 0.29 : 0.547),
      overflow: "hidden",
      mixBlendMode: "screen",
      ...style,
    }}
  >
    <Img
      src={publicAsset(
        `v38/revision/${name === "voices38" ? "voices38-nfo" : "denuvowo"}.png`,
      )}
      style={{
        width: "100%",
        display: "block",
        imageRendering: name === "voices38" ? "pixelated" : "auto",
      }}
    />
  </div>
);

export const Shade = ({ side = "left" }: { side?: "left" | "bottom" }) => (
  <AbsoluteFill
    style={{
      background:
        side === "left"
          ? "linear-gradient(90deg,#030b10df, #030b1040 48%,transparent 75%)"
          : "linear-gradient(0deg,#03080fee,transparent 65%)",
    }}
  />
);

export const CaptionSlug = ({
  kicker,
  title,
  sub,
  at = 0,
  color = OS,
  style,
}: {
  kicker: string;
  title: string;
  sub?: string;
  at?: number;
  color?: string;
  style?: CSSProperties;
}) => {
  const t = useTime(),
    p = lerp(t, at, at + 0.7);
  return (
    <div
      style={{
        ...pos,
        left: 100,
        top: 590,
        opacity: p,
        translate: `${(1 - p) * -70}px 0`,
        textShadow: "0 3px 30px #000",
        ...style,
      }}
    >
      <div
        style={{
          ...mono,
          fontSize: 23,
          letterSpacing: 4,
          color,
          marginBottom: 14,
        }}
      >
        {kicker}
      </div>
      <div style={{ fontSize: 76, lineHeight: 1.12 }}>{title}</div>
      {sub && (
        <div style={{ fontSize: 30, color: "#d3dad9", marginTop: 18 }}>
          {sub}
        </div>
      )}
    </div>
  );
};

export const Slash = ({
  at = 0,
  duration = 0.65,
  color = HV,
}: {
  at?: number;
  duration?: number;
  color?: string;
}) => {
  const t = useTime(),
    p = linear(t, at, at + duration);
  return p > 0 && p < 1 ? (
    <div
      style={{
        ...pos,
        top: -200,
        left: p * 2600 - 400,
        width: 7,
        height: 1500,
        background: color,
        rotate: "18deg",
        boxShadow: `0 0 35px ${color}`,
        zIndex: 20,
      }}
    />
  ) : null;
};

export const NfoTop = ({
  width = 880,
  style,
}: {
  width?: number;
  style?: CSSProperties;
}) => (
  <div
    style={{
      width,
      height: width * 0.5,
      overflow: "hidden",
      background: "#000",
      ...style,
    }}
  >
    <Img
      src={publicAsset("v38/revision/voices38-nfo.png")}
      style={{ width: "100%", imageRendering: "pixelated" }}
    />
  </div>
);

// A travelling camera moves through the actual picture plane. The remaining
// layers are explicitly conceptual; no made-up code or operating-system UI.
export const Machine = ({
  spread,
  focus = "hv",
}: {
  spread: number;
  focus?: "hv" | "game";
}) => {
  const t = useTime();
  return (
    <div
      style={{
        ...pos,
        left: 550,
        top: 110,
        width: 1130,
        height: 730,
        perspective: 1600,
        scale: 0.87,
        transformOrigin: "top left",
        translate: `${spread * -130}px ${spread * -55}px`,
      }}
    >
      {[2, 1, 0].map((i) => (
        <div
          key={i}
          style={{
            ...pos,
            left: 0,
            top: i * (30 + spread * 158),
            width: 1130,
            height: 510,
            transform: `rotateX(${spread * 49}deg) rotateZ(${-spread * 16}deg)`,
            transformOrigin: "50% 50%",
            border: `2px solid ${i === 2 ? HV : i === 0 ? OS : "#8fa1b2"}`,
            boxShadow: `0 18px 0 ${i === 2 ? "#12343c" : "#111d26"},0 40px 65px #0007`,
            background: i === 2 ? "#12363bea" : "#14212ded",
            overflow: "hidden",
          }}
        >
          {i === 0 && <Film name="layer-game" />}
          {i === 2 && (
            <svg width="1130" height="510" style={{ ...pos, inset: 0 }}>
              {Array.from({ length: 17 }, (_, j) => (
                <path
                  key={j}
                  d={`M${j * 90 - 120} 510L${j * 90 + 180} 0`}
                  stroke="#7fdce148"
                />
              ))}
              {Array.from({ length: 9 }, (_, j) => (
                <path
                  key={j}
                  d={`M0 ${(j * 72 + t * 70) % 510}H1130`}
                  stroke="#7fdce166"
                />
              ))}
            </svg>
          )}
          <div
            style={{
              ...pos,
              left: 25,
              bottom: 22,
              ...mono,
              fontSize: 30,
              color: i === 2 ? HV : C.white,
              background: "#03080fc9",
              padding: "10px 18px",
            }}
          >
            {["GAME / 程序", "WINDOWS / 操作系统", "HYPERVISOR / 虚拟化层"][i]}
          </div>
          {i === 0 && (
            <div
              style={{
                ...pos,
                right: 20,
                top: 20,
                fontFamily: F.mono,
                fontSize: 28,
                padding: "10px 18px",
                border: `1px solid ${OS}`,
                background: "#090b10cf",
              }}
            >
              DENUVO
            </div>
          )}
          {((focus === "hv" && i === 2) || (focus === "game" && i === 0)) && (
            <div
              style={{
                ...pos,
                top: 0,
                bottom: 0,
                width: 110,
                left: ((t * 0.24) % 1) * 1240 - 110,
                background: `linear-gradient(90deg,transparent,${focus === "hv" ? "#79ced53a" : "#ffc83d36"},transparent)`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
