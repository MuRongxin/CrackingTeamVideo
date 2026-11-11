import { interpolate } from "remotion";
import { C, F } from "./style";
import { NameCursor, lerp, useTime } from "./components";
import { Act1Kicker, Act1Rule, Act1Scene, Act1Source } from "./act1/shared";

export const TitleCard = ({ still = false }: { still?: boolean }) => {
  const time = useTime();
  const t = still ? 2.8 : time;
  const enter = lerp(t, 0.12, 0.65);
  const bars = lerp(t, 0.05, 0.75);
  return (
    <Act1Scene>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 16,
          background: C.yellow,
          scale: `1 ${enter}`,
          transformOrigin: "top",
        }}
      />
      <Act1Kicker right="A NAME ON FILE">VOICES38 / THE STORY</Act1Kicker>
      <div
        style={{
          position: "absolute",
          right: 35,
          top: 105,
          fontFamily: F.mono,
          fontSize: 460,
          fontWeight: 700,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "2px #ffc83d12",
        }}
      >
        38
      </div>
      <div
        style={{
          position: "absolute",
          left: 135,
          top: 280,
          opacity: enter,
          translate: `0 ${lerp(t, 0.12, 0.8, 80, 0)}px`,
        }}
      >
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 25,
            letterSpacing: 6,
            color: "#89958c",
          }}
        >
          DENUVO v. AN UNKNOWN NAME
        </div>
        <div
          style={{
            marginTop: 38,
            fontSize: 158,
            lineHeight: 1.15,
            letterSpacing: -5,
          }}
        >
          <span style={{ color: "#91aec5", fontFamily: F.mono, fontSize: 142 }}>
            Denuvo
          </span>
          <span style={{ marginLeft: 28 }}>的天敌</span>
        </div>
        <div
          style={{
            marginTop: 52,
            display: "flex",
            alignItems: "center",
            gap: 26,
            fontSize: 55,
          }}
        >
          <NameCursor size={67} blink={!still} />
          <span>的故事</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 790,
          width: 1080,
          opacity: enter,
        }}
      >
        <Act1Rule progress={lerp(t, 0.55, 1.15)} color="#ffc83d88" />
      </div>
      {!still &&
        Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: interpolate(bars, [0, 1], [140 + i * 125, 1410]),
              top: interpolate(bars, [0, 1], [820, 804]),
              width: interpolate(bars, [0, 1], [96, 14]),
              height: interpolate(bars, [0, 1], [36, 76]),
              background: i === 8 ? C.yellow : "#dfe6dc",
              opacity: 1 - lerp(t, 0.7, 1.05),
            }}
          />
        ))}
      <div
        style={{
          position: "absolute",
          right: 85,
          bottom: 165,
          textAlign: "right",
          fontFamily: F.mono,
          fontSize: 20,
          lineHeight: 1.8,
          color: "#737f76",
          opacity: lerp(t, 0.85, 1.25),
        }}
      >
        DOCUMENT 01 / VOICES38
        <br />
        AN UNKNOWN INDIVIDUAL OR ENTITY
      </div>
    </Act1Scene>
  );
};

export { Evidence, Unknown, Pronoun } from "./act1/PublicTrail";
