import { AbsoluteFill } from "remotion";
import { C, F } from "../style";
import { useTime, lerp } from "../components";
import type { ShotTiming } from "../timing";
import classNfo from "./class-header.json";
import { say } from "./timing";
import {
  Stage,
  Footage,
  Darken,
  Kicker,
  SourceImage,
  pos,
  mono,
} from "./Stage";

export const OldArgument = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    argument = say(timing, 208) + 1.05,
    back = say(timing, 209),
    p = lerp(t, argument - 0.4, argument + 0.6),
    out = lerp(t, back, back + 0.75);
  return (
    <Stage
      name="A7-07 · 1998年的老争论"
      source="历史：L05／L06 · Razor 字标：JeD / ACiD · 画面：Valve 周年官网（非版本核验）"
    >
      <Footage name="half-life" />
      <Darken />
      <div
        style={{ ...pos, inset: 0, background: "#09150d", opacity: p * 0.53 }}
      />
      <Kicker style={{ color: "#d9bb77" }}>HALF-LIFE / 1998</Kicker>
      <div
        style={{
          ...pos,
          left: 100,
          top: 240,
          ...mono,
          fontSize: 300,
          color: C.yellow,
          lineHeight: 1,
          translate: `${out * -150}px ${p * -80}px`,
          scale: 1 - p * 0.4,
          transformOrigin: "left top",
          opacity: 1 - p,
        }}
      >
        1998
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 180,
          width: 780,
          opacity: p * (1 - out),
          translate: `${(1 - p) * -600 - out * 400}px 0`,
          transform: `rotateY(${(1 - p) * -28}deg)`,
        }}
      >
        <SourceImage
          name="razor-jed.png"
          style={{ width: 740, height: 265, objectFit: "contain" }}
        />
        <div style={{ ...mono, fontSize: 22, color: "#b2c1b4", marginTop: 8 }}>
          JeD / ACiD · 原始 ASCII 字标
        </div>
        <div style={{ fontSize: 36, color: C.yellow, marginTop: 42 }}>
          Razor 1911 当时质疑
        </div>
        <div style={{ fontSize: 76, marginTop: 15 }}>这是测试版？</div>
      </div>
      <div
        style={{
          ...pos,
          left: 1010,
          top: 240,
          width: 790,
          padding: "32px 22px",
          background: "#080d0ce8",
          borderTop: "2px solid #b8c4aa",
          opacity: p * (1 - out),
          translate: `${(1 - p) * 650 + out * 400}px 0`,
          transform: `perspective(1500px) rotateY(${-10 + out * 10}deg)`,
        }}
      >
        <pre
          style={{
            fontFamily: F.pixel,
            fontSize: 18,
            lineHeight: 1,
            margin: 0,
            color: "#cbd9b5",
            whiteSpace: "pre",
          }}
        >
          {classNfo.art}
        </pre>
        <div style={{ marginTop: 33, ...mono, fontSize: 32 }}>
          Half-Life (c) Sierra Studios
        </div>
        <div style={{ marginTop: 20, ...mono, fontSize: 27, color: "#b4c4b2" }}>
          Released: November 13th, 1998
        </div>
        <div style={{ marginTop: 32, fontSize: 29 }}>CLASS 原始 NFO 题头</div>
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 280,
          right: 100,
          opacity: out,
          translate: `0px ${(1 - out) * 90}px`,
        }}
      >
        <div style={{ fontSize: 86 }}>什么才算合格的发行？</div>
        <div
          style={{
            marginTop: 75,
            display: "flex",
            alignItems: "center",
            gap: 45,
            ...mono,
            fontSize: 100,
            color: C.yellow,
          }}
        >
          <span>1998</span>
          <div
            style={{
              height: 3,
              background: C.yellow,
              width: 800 * lerp(t, back + 0.3, back + 1.4),
              position: "relative",
            }}
          >
            <div
              style={{
                ...pos,
                right: -1,
                top: -8,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: C.yellow,
              }}
            />
          </div>
          <span style={{ opacity: lerp(t, back + 0.65, back + 1.2) }}>
            2026
          </span>
        </div>
      </div>
    </Stage>
  );
};

export const CrackOrBypass = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    right = say(timing, 210, "还是"),
    p = lerp(t, 0, 0.6),
    r = lerp(t, right - 0.15, right + 0.4),
    exit = lerp(t, timing.duration - 0.65, timing.duration);
  return (
    <Stage
      name="A7-08 · 破解，还是绕过"
      source="术语与技术争议｜不把报道或参与者的主张当作独立结论"
    >
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at 50% 50%,#294352,#080e13 70%)",
        }}
      />
      <Kicker>2026 / THE QUESTION REMAINS</Kicker>
      <div
        style={{
          ...pos,
          left: 100,
          top: 360,
          opacity: p,
          translate: `${(1 - p) * -250}px 0`,
        }}
      >
        <div style={{ ...mono, fontSize: 140, color: C.yellow }}>CRACK</div>
        <div style={{ fontSize: 55, marginTop: 18 }}>破解</div>
      </div>
      <div
        style={{
          ...pos,
          left: 1190,
          top: 360,
          opacity: r,
          translate: `${(1 - r) * 250}px 0`,
        }}
      >
        <div style={{ ...mono, fontSize: 140, color: "#93d9dd" }}>BYPASS</div>
        <div style={{ fontSize: 55, marginTop: 18 }}>绕过</div>
      </div>
      <div
        style={{
          ...pos,
          left: 875,
          top: 315,
          ...mono,
          fontSize: 260,
          color: C.white,
          lineHeight: 1,
          opacity: p,
          transform: `rotateY(${(1 - r) * 25}deg)`,
        }}
      >
        ?
      </div>
      <div
        style={{
          ...pos,
          left: 0,
          right: 0,
          bottom: -160 + exit * 220,
          height: 160,
          background: C.paper,
          rotate: "-3deg",
          boxShadow: "0 -10px 60px #0007",
        }}
      />
    </Stage>
  );
};
