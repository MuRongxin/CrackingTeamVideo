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
    entry = lerp(t, 0, 0.65),
    r = lerp(t, right - 0.2, right + 0.5),
    push = Math.min(1, t / timing.duration),
    exit = lerp(t, timing.duration - 0.65, timing.duration),
    stroke = Math.max(0, Math.min(1, (t - 0.65) / 2.3));
  return (
    <Stage
      name="A7-08 · 破解，还是绕过"
      source="术语与技术争议｜游戏画面：2K 官方；非破解版本运行对比"
    >
      <div
        style={{
          ...pos,
          inset: 0,
          scale: 1.03 + push * 0.1,
          translate: `${-push * 35}px 0`,
        }}
      >
        <Footage name="mafia-question" />
      </div>
      <Darken />
      <AbsoluteFill
        style={{
          background: "linear-gradient(90deg,#07131cdd,transparent 75%)",
        }}
      />
      <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
        <path
          d={`M${1630 - r * 720} -200L${1310 - r * 720} 1200H2200V-200Z`}
          fill="#153b45"
          opacity={0.12 + r * 0.32}
        />
        <path
          d={`M${1630 - r * 720} -200L${1310 - r * 720} 1200`}
          fill="none"
          stroke="#87ced5"
          strokeWidth="3"
        />
        <path
          d={`M0 ${145 + t * 35}H1920`}
          stroke="#ffffff"
          strokeOpacity=".09"
        />
      </svg>
      <Kicker>2026 / 今天的争论</Kicker>
      <div
        style={{
          ...pos,
          left: 100 + push * 35,
          top: 260 + r * 75,
          transformOrigin: "left center",
          transform: `perspective(1400px) translateX(${(1 - entry) * -1100 - exit * 500}px) rotateY(${(1 - entry) * 50 - r * 8}deg) scale(${1 - r * 0.38})`,
          opacity: (1 - exit) * entry,
        }}
      >
        <div
          style={{ ...mono, fontSize: 220, letterSpacing: -8, color: C.yellow }}
        >
          CRACK
        </div>
        <div
          style={{ fontSize: 78, marginTop: 8, translate: `${push * 20}px 0` }}
        >
          破解
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 1110,
          top: 355,
          transform: `perspective(1400px) translateX(${(1 - r) * 1200 + exit * 500}px) rotateY(${(1 - r) * -35 + r * -5}deg)`,
          opacity: r * (1 - exit),
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: 170,
            letterSpacing: -6,
            color: "#a0e7e6",
          }}
        >
          BYPASS
        </div>
        <div style={{ fontSize: 68, marginTop: 8 }}>绕过</div>
      </div>
      <svg
        width="280"
        height="420"
        viewBox="0 0 280 420"
        style={{
          ...pos,
          left: 795,
          top: 300,
          opacity: 1 - exit,
          scale: 1 + push * 0.12,
          translate: `${r * 12}px ${-push * 15}px`,
        }}
      >
        <path
          d="M45 120C45 60 95 30 145 30C210 30 249 73 225 128C205 177 141 182 141 247"
          fill="none"
          stroke={C.white}
          strokeWidth="18"
          strokeLinecap="round"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={100 * (1 - stroke)}
        />
        <circle
          cx="141"
          cy="300"
          r={11 * lerp(t, right, right + 0.4)}
          fill={C.white}
        />
      </svg>
      <div
        style={{
          ...pos,
          left: 2300 - exit * 3500,
          top: -220,
          width: 3600,
          height: 1600,
          background: C.paper,
          transform: "skewX(-16deg)",
          zIndex: 45,
          boxShadow: "-35px 0 80px #0007",
        }}
      >
        <div
          style={{
            ...pos,
            left: 50,
            top: 0,
            bottom: 0,
            width: 2,
            background: "#b3ab97",
          }}
        />
      </div>
    </Stage>
  );
};
