import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img } from "remotion";
import { Video } from "@remotion/media";
import { publicAsset } from "../assets";
import { useTime } from "../components";
import { C, F } from "../style";
export { pos, mono, lin } from "../act7/Stage";
export { Light, Pen } from "../act8/Stage";
export const red = "#D95D4D",
  mint = "#83C8C6";
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
  return (
    <AbsoluteFill
      data-act9-stage={name}
      style={{
        overflow: "hidden",
        fontFamily: F.cn,
        color: paper ? C.ink : C.white,
        background: paper ? C.paper : "#08131b",
      }}
    >
      {children}
      {source ? (
        <div
          data-source-credit
          style={{
            position: "absolute",
            left: 100,
            top: 885,
            maxWidth: 1650,
            fontSize: 23,
            lineHeight: 1.35,
            padding: "9px 14px",
            borderLeft: "2px solid #8e9d9b",
            background: "#08131be8",
            color: "#d4dedb",
            zIndex: 40,
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
    data-act9-source={name}
    src={publicAsset(`v38/act9/${name.includes(".") ? name : name + ".png"}`)}
    style={{ display: "block", ...style }}
  />
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
      boxShadow: "0 28px 70px #0005",
      ...style,
    }}
  >
    <Source name={name} style={{ width: "100%" }} />
  </div>
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
      top: 78,
      fontFamily: F.mono,
      fontSize: 24,
      letterSpacing: 3,
      ...style,
    }}
  >
    {children}
  </div>
);
export const Film = ({
  name,
  style,
}: {
  name: string;
  style?: CSSProperties;
}) => (
  <>
    <Video
      src={publicAsset(`v38/act9/${name}.mp4`)}
      muted
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...style,
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 930,
        bottom: 0,
        background:
          "linear-gradient(0deg,#08131b 0%,#08131b 70%,#08131b00 100%)",
      }}
    />
  </>
);
export const Shade = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(90deg,#041019d9,transparent 75%),linear-gradient(0deg,#031018eb,transparent 70%)",
    }}
  />
);
export const Logo = ({
  name,
  width = 250,
  style,
}: {
  name: "discord" | "reddit" | "valve" | "denuvo" | "capcom";
  width?: number;
  style?: CSSProperties;
}) => (
  <Img
    src={publicAsset(
      ["denuvo", "capcom"].includes(name)
        ? `v38/act8/${name === "denuvo" ? "denuvo-logo" : "capcom"}.png`
        : `v38/brands/${name}.png`,
    )}
    style={{ width, height: 100, objectFit: "contain", ...style }}
  />
);
