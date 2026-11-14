import { Img } from "remotion";
import { C, F } from "../style";
import { publicAsset } from "../assets";
import { useTime, lerp } from "../components";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
import { Stage, pos, mono, HV, OS, linear } from "./shared";
import { Film, GroupMark, Shade, Slash } from "./Picture";

export const Rivals = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    q = say(timing, 184, "是对手"),
    p = lerp(t, 0, 0.9),
    question = lerp(t, q - 0.1, q + 0.4);
  return (
    <Stage
      label="路线不同 / 关系如何"
      source=""
    >
      <div
        style={{
          ...pos,
          inset: 0,
          background: "linear-gradient(112deg,#12333d,#070d14 49%,#352d19)",
        }}
      />
      <GroupMark
        name="denuvowo"
        width={770}
        style={{
          ...pos,
          left: 90,
          top: 140,
          translate: `${(1 - p) * -700}px 0`,
          transform: `perspective(1500px) rotateY(${(1 - p) * 40}deg)`,
        }}
      />
      <GroupMark
        name="voices38"
        width={730}
        style={{
          ...pos,
          right: 100,
          top: 360,
          translate: `${(1 - p) * 700}px 0`,
          transform: `perspective(1500px) rotateY(${(1 - p) * -40}deg)`,
        }}
      />
      <div
        style={{
          ...pos,
          left: 120,
          top: 580,
          ...mono,
          fontSize: 37,
          color: HV,
        }}
      >
        Hypervisor
      </div>
      <div
        style={{
          ...pos,
          right: 130,
          top: 580,
          ...mono,
          fontSize: 37,
          color: OS,
        }}
      >
        old school
      </div>
      <div
        style={{
          ...pos,
          left: 690,
          top: 650,
          fontSize: 111,
          color: "white",
          opacity: question,
          scale: 1.25 - question * 0.25,
        }}
      >
        对手？
      </div>
      <Slash at={q} color={OS} />
    </Stage>
  );
};

export const Clarification = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    kir = say(timing, 186),
    denial = say(timing, 186, "其实"),
    chat = say(timing, 187),
    target = say(timing, 187, "他们的"),
    different = say(timing, 187, "只是"),
    p = lerp(t, kir, kir + 0.9),
    d = lerp(t, denial - 0.1, denial + 0.6),
    c = lerp(t, chat, chat + 0.9),
    g = lerp(t, target, target + 0.7),
    last = lerp(t, different, different + 0.6);
  return (
    <Stage
      label="KiriGiri 的澄清 / 2026.04"
      source="KiriGiri 公开回应 · 游民星空转述"
    >
      <div
        style={{
          ...pos,
          inset: 0,
          background: "radial-gradient(ellipse at 35% 35%,#203a45,#050b12 70%)",
        }}
      />
      <GroupMark
        name="denuvowo"
        width={1040}
        style={{
          ...pos,
          left: 440 - p * 315,
          top: 45,
          scale: 1 - p * 0.45,
          transformOrigin: "left top",
          opacity: 1 - c * 0.15,
        }}
      />
      <div
        style={{
          ...pos,
          left: 170,
          top: 480 - p * 135,
          opacity: p,
          translate: `${(1 - p) * -120}px 0`,
        }}
      >
        <div style={{ ...mono, fontSize: 65 }}>KiriGiri</div>
        <div style={{ fontSize: 30, color: HV, marginTop: 18 }}>
          DenuvOwO 核心成员
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 760,
          top: 145,
          width: 1030,
          opacity: p * (1 - c),
          translate: `${(1 - p) * 1400}px ${-c * 800}px`,
          transform: `perspective(1300px) rotateY(${(1 - p) * -38}deg) rotateZ(${(1 - p) * 6}deg)`,
          boxShadow: "0 30px 80px #000a",
        }}
      >
        <div
          style={{
            background: "#d8dcda",
            color: "#19242e",
            fontSize: 25,
            padding: "17px 24px",
            fontFamily: F.mono,
          }}
        >
          游民星空 / 2026.04.10 / 报道原段落
        </div>
        <Img
          src={publicAsset("v38/revision/v13-quote.png")}
          style={{ width: "100%", display: "block" }}
        />
        <div style={{ background: "#f0f1f3", height: 5, width: d * 1030 }} />
        <div
          style={{
            fontSize: 55,
            color: OS,
            marginTop: 36,
            opacity: d,
            translate: `0 ${(1 - d) * 55}px`,
          }}
        >
          并不敌视
        </div>
      </div>
      <GroupMark
        name="voices38"
        width={580}
        style={{
          ...pos,
          left: 1220,
          top: 245,
          opacity: c,
          translate: `${(1 - c) * 700}px 0`,
        }}
      />
      <div
        style={{
          ...pos,
          left: 870,
          top: 305,
          opacity: c,
          scale: 0.7 + c * 0.3,
        }}
      >
        <Img
          src={publicAsset("v38/brands/discord.png")}
          style={{
            width: 170,
            height: 130,
            objectFit: "contain",
            filter: "brightness(0) invert(1)",
          }}
        />
      </div>
      <svg width="1920" height="1080" style={{ ...pos, inset: 0, opacity: c }}>
        <path
          d="M650 380Q760 280 860 350M1050 350Q1120 290 1200 330"
          fill="none"
          stroke={HV}
          strokeWidth="3"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - c}
        />
        {[0, 1, 2, 3].map((i) => {
          const a = ((t - chat) * 0.5 + i * 0.25) % 1;
          return (
            <circle
              key={i}
              cx={650 + a * 550}
              cy={370 - Math.sin(a * Math.PI) * 45}
              r="5"
              fill={HV}
              opacity={c * Math.sin(a * Math.PI)}
            />
          );
        })}
      </svg>
      <div
        style={{
          ...pos,
          left: 800,
          top: 505,
          fontSize: 37,
          color: "#d6e1e5",
          opacity: c,
        }}
      >
        在 Discord 上直接交流
      </div>
      <div
        style={{
          ...pos,
          left: 165,
          top: 630,
          width: 1600,
          borderTop: `1px solid ${HV}77`,
          paddingTop: 25,
          opacity: g,
          translate: `0 ${(1 - g) * 130}px`,
        }}
      >
        <span style={{ fontSize: 62, color: OS }}>同一个目标</span>
        <span style={{ fontSize: 40, marginLeft: 100, opacity: last }}>
          路线、理念不同
        </span>
      </div>
      <Slash at={chat} />
    </Stage>
  );
};

export const Meanwhile = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    play = say(timing, 188, "先有"),
    p = lerp(t, play - 0.3, play + 0.55);
  return (
    <Stage
      label="在等待期间 / 先有得玩"
      source="KiriGiri 公开回应 · 游戏画面：游戏科学"
    >
      <Film name="wukong-play" />
      <Shade side="bottom" />
      <div style={{ ...pos, left: 105, top: 125, opacity: 1 - p }}>
        <GroupMark name="denuvowo" width={490} />
        <div style={{ fontSize: 28, color: "#e0e7e5", marginTop: -20 }}>
          KiriGiri 对这条路线的定义
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 640,
          fontSize: 66,
          color: "white",
          translate: `${-p * 600}px 0`,
          opacity: 1 - p,
        }}
      >
        在等待“正常破解”的时候
      </div>
      <div
        style={{
          ...pos,
          left: 105,
          top: 635,
          fontSize: 118,
          color: OS,
          opacity: p,
          translate: `${(1 - p) * -220}px 0`,
          textShadow: "0 6px 35px #000",
        }}
      >
        先有得玩。
      </div>
      <Slash at={play - 0.3} color={OS} />
    </Stage>
  );
};
