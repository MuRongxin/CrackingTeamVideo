import { publicAsset } from "../assets";
import type { ReactNode } from "react";
import { Img } from "remotion";
import { Scene, SourceTag, useTime } from "../components";
import { C, F } from "../style";
import type { ShotTiming } from "../timing";
import captions from "./captions.json";

export const cue = (timing: ShotTiming, id: number, phrase?: string) => {
  const voice = timing.voices.find((v) => v.id === id);
  const row = phrase
    ? (captions as Record<string, { text: string; startMs: number }[]>)[
        id
      ].find((c) => c.text.replace(/\n/g, "").includes(phrase))
    : null;
  if (!voice || (phrase && !row))
    throw new Error(`Missing act 2 cue ${id}: ${phrase}`);
  return voice.start + (row?.startMs ?? 0) / 1000;
};
export const FilmScene = ({
  children,
  title,
  right,
  source,
  paper = false,
}: {
  children: ReactNode;
  title: string;
  right: string;
  source: string;
  paper?: boolean;
}) => (
  <Scene paper={paper}>
    {children}
    <div
      style={{
        position: "absolute",
        left: 95,
        right: 95,
        top: 65,
        display: "flex",
        justifyContent: "space-between",
        fontFamily: F.mono,
        fontSize: 23,
        color: paper ? "#6e756f" : C.gray,
        zIndex: 15,
        letterSpacing: 2,
      }}
    >
      <span>{title}</span>
      <span>{right}</span>
    </div>
    <SourceTag>{source}</SourceTag>
  </Scene>
);
export const GameStill = ({ dark = 0.45 }: { dark?: number }) => {
  const t = useTime();
  return (
    <>
      <Img
        src={publicAsset("v38/act2/stills/three-kingdoms.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: 1920,
          height: 1080,
          objectFit: "cover",
          scale: 1.06 + t * 0.004,
          translate: `${-t * 3}px 0`,
          filter: "saturate(.65)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg,rgba(3,9,9,${dark + 0.3}),rgba(3,9,9,${dark}) 65%,rgba(3,9,9,${dark + 0.1})),linear-gradient(0deg,#000d,transparent 45%)`,
        }}
      />
    </>
  );
};
