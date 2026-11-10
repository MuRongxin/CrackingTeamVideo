import { C, F } from "../style";
import { Scene, SourceTag, useTime, lerp } from "../components";
import { Topline, Cursor } from "./shared";
export const FirstAttemptQuote = () => {
  const t = useTime();
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 425,
        textAlign: "center",
        fontFamily: F.mono,
        fontSize: 72,
        color: C.yellow,
        opacity: lerp(t, 0, 0.5),
        scale: 1 + Math.sin(t * 0.4) * 0.004,
      }}
    >
      Here's my first attempt
      <Cursor size={72} />
    </div>
  );
};
export const FirstAttempt = () => (
  <Scene>
    <Topline label="第一次尝试" right="2025.10.14" />
    <FirstAttemptQuote />
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 600,
        textAlign: "center",
        fontSize: 52,
        color: C.white,
      }}
    >
      这是我的第一次尝试
    </div>
    <SourceTag>当事人自述｜经 iXBT 转述｜2025-10-15</SourceTag>
  </Scene>
);
