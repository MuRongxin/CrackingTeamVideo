import { AbsoluteFill } from "remotion";
import { Video } from "@remotion/media";
import { publicAsset } from "../assets";
import { useTime, lerp } from "../components";
import { C, F } from "../style";
import type { ShotTiming } from "../timing";
import { GroupMark } from "../act6/Picture";
import { say } from "./timing";
import {
  Stage,
  Source,
  Paper,
  Eyebrow,
  Pen,
  Light,
  pos,
  mono,
  lin,
  red,
} from "./Stage";

export const Filing = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    p = lerp(t, 0.12, 1),
    q = lerp(t, say(timing, 211, "Denuvo"), 3.2),
    drift = lin(t, 0, timing.duration);
  return (
    <Stage
      name="A8-01 · 一份起诉书"
      paper
      source="COURT_COMPLAINT｜2026-09-14 提交的起诉书原件；此处为原告诉讼主张"
    >
      <Eyebrow>08 / 一份起诉书</Eyebrow>
      <div
        style={{
          ...pos,
          left: 100,
          top: 155,
          ...mono,
          fontSize: 60,
          color: red,
          letterSpacing: -3,
          translate: `${-100 * (1 - p)}px 0`,
        }}
      >
        2026.09.14
      </div>
      <div
        style={{
          ...pos,
          left: 96,
          top: 300,
          fontSize: 122,
          lineHeight: 1.16,
          letterSpacing: -3,
          transform: `translateY(${50 * (1 - p)}px)`,
        }}
      >
        一份
        <br />
        起诉书
      </div>
      {[2, 1, 0].map((i) => (
        <Paper
          key={i}
          name="court-caption"
          width={930}
          style={{
            ...pos,
            left: 850 + i * 18 + drift * 25,
            top: 180 - i * 18,
            transform: `perspective(1500px) rotateY(${-13 + q * 8}deg) rotateZ(${-9 + i * 4 + drift * 3}deg) translateY(${(1 - p) * 800}px)`,
            opacity: i === 0 ? 1 : 0.34,
          }}
        />
      ))}
      <Source
        name="filed-date"
        style={{ ...pos, left: 903, top: 135, width: 832, opacity: p }}
      />
      <div
        style={{
          ...pos,
          left: 100,
          top: 645,
          width: 640,
          height: 164,
          background: "#0c1118",
          overflow: "hidden",
          clipPath: `inset(0 ${100 * (1 - q)}% 0 0)`,
        }}
      >
        <Source
          name="denuvo-logo"
          style={{
            ...pos,
            left: 18,
            top: 0,
            width: 220,
            height: 132,
            objectFit: "contain",
          }}
        />
        <div
          style={{ ...pos, left: 265, top: 55, fontSize: 30, color: C.yellow }}
        >
          →
        </div>
        <GroupMark
          name="voices38"
          width={260}
          style={{ ...pos, left: 340, top: 49 }}
        />
      </div>
      <Light />
    </Stage>
  );
};

export const Games = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    list = say(timing, 213),
    p = lerp(t, list, list + 1),
    r = lin(t, 0, timing.duration);
  const focus =
    lerp(t, list + 4.0, list + 4.5) +
    lerp(t, list + 5.6, list + 6.1) +
    lerp(t, list + 7, list + 7.4);
  const crops = ["game-fifa", "game-hogwarts", "game-wukong", "game-requiem"];
  const names = ["FIFA 20", "霍格沃茨之遗", "黑神话：悟空", "生化危机：安魂曲"];
  return (
    <Stage
      name="A8-02 · 26款游戏"
      source="诉状第5、7、8页｜画面：《霍格沃茨之遗》官方预告；非破解版本实测"
    >
      <Video
        src={publicAsset("v38/act8/hogwarts-list.mp4")}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg,#050c13e8,transparent 70%),linear-gradient(0deg,#050c13ec,transparent 70%)",
        }}
      />
      <Eyebrow style={{ color: C.yellow }}>起诉书列举 / 26 GAMES</Eyebrow>
      <div
        style={{
          ...pos,
          left: 100,
          top: 170,
          transform: `translateX(${-40 * r}px) scale(${1 - p * 0.15})`,
          transformOrigin: "left top",
        }}
      >
        <div style={{ ...mono, fontSize: 250, lineHeight: 1 }}>
          26<span style={{ fontSize: 42, marginLeft: 20 }}>款</span>
        </div>
        <div style={{ fontSize: 32, color: "#c7d6d8" }}>原告列出的游戏</div>
      </div>
      <div
        style={{
          ...pos,
          left: 650,
          top: 210,
          width: 1140,
          transform: `translateX(${(1 - p) * 80}px)`,
          opacity: 1 - p,
        }}
      >
        <Paper
          name="defendant"
          width={1060}
          style={{ transform: `rotate(-3deg) translateY(${-r * 65}px)` }}
        />
        <div style={{ fontSize: 33, marginTop: 28 }}>“起诉书说”</div>
      </div>
      <div
        style={{
          ...pos,
          left: 670,
          top: 184,
          width: 1120,
          height: 620,
          opacity: p,
          overflow: "hidden",
        }}
      >
        {crops.map((name, i) => {
          const delta = i - focus;
          return (
            <div
              key={name}
              style={{
                ...pos,
                left: i * 14,
                top: 70 + i * 145 - focus * 120,
                opacity: Math.max(0.22, 1 - Math.abs(i - focus) * 0.75),
                transform: `perspective(1600px) rotateY(${delta * 4}deg) translateX(${(1 - lerp(t, list + i * 0.18, list + i * 0.18 + 0.65)) * 1200}px)`,
                width: 1060,
              }}
            >
              <div style={{ fontSize: 27, color: C.yellow, marginBottom: 10 }}>
                {String(i + 1).padStart(2, "0")} / {names[i]}
              </div>
              <Paper name={name} width={1040} />
            </div>
          );
        })}
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 650,
          fontSize: 62,
          opacity: p,
          translate: `0 ${40 * (1 - p)}px`,
        }}
      >
        从老作品
        <br />
        <span style={{ color: C.yellow }}>到新游戏</span>
      </div>
    </Stage>
  );
};

export const Circumvention = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    law = say(timing, 216),
    p = lerp(t, law - 0.1, law + 0.85),
    drift = lin(t, law, timing.duration),
    violation = say(timing, 217);
  return (
    <Stage
      name="A8-03 · 反规避条款"
      paper
      source="诉状第10—12页 / 17 U.S.C. §1201(a)(1)、(a)(2)｜诉讼依据，不表示法院已认定违法"
    >
      <Eyebrow style={{ color: red }}>诉讼的依据 / LEGAL BASIS</Eyebrow>
      <div
        style={{
          ...pos,
          inset: 0,
          transform: `translateY(${-p * 1100}px)`,
          opacity: 1 - p,
        }}
      >
        {["game-fifa", "game-hogwarts", "game-wukong", "game-requiem"].map(
          (n, i) => (
            <Paper
              key={n}
              name={n}
              width={1060}
              style={{
                ...pos,
                left: 760 + i * 35,
                top:
                  180 + i * 132 + (1 - lerp(t, i * 0.32, i * 0.32 + 0.7)) * 550,
                transform: `perspective(1500px) rotateY(${-9 + lin(t, 0, law) * 9}deg) rotate(${i * 3 - 7 + t * 0.45}deg) translateX(${-lin(t, 0, law) * 70}px)`,
              }}
            />
          ),
        )}
        <div
          style={{
            ...pos,
            left: 100,
            top: 240,
            fontSize: 135,
            lineHeight: 1.25,
          }}
        >
          26 款<br />
          版权归属
        </div>
        <div
          style={{
            ...pos,
            left: 100,
            top: 590,
            fontSize: 72,
            color: red,
            opacity: lerp(t, 1.55, 2.15),
          }}
        >
          Denuvo：0
        </div>
        <div
          style={{
            ...pos,
            left: 100,
            top: 735,
            fontSize: 32,
            opacity: lerp(t, say(timing, 215), say(timing, 215) + 0.5),
          }}
        >
          不以传统的版权侵权主张起诉
        </div>
      </div>
      <div
        style={{
          ...pos,
          inset: 0,
          transform: `translateY(${(1 - p) * 1000}px)`,
        }}
      >
        <div
          style={{
            ...pos,
            left: 95 - drift * 20,
            top: 160,
            ...mono,
            fontSize: 190,
            color: C.ink,
            letterSpacing: -10,
          }}
        >
          §1201
        </div>
        <div style={{ ...pos, left: 108, top: 390, fontSize: 62, color: red }}>
          反规避条款
        </div>
        <Paper
          name="count-one"
          width={840}
          style={{
            ...pos,
            left: 990 - drift * 45,
            top: 170,
            transform: `rotate(${-4 + drift * 2}deg)`,
          }}
        />
        <Paper
          name="count-two"
          width={840}
          style={{
            ...pos,
            left: 950 + drift * 30,
            top: 475,
            transform: `rotate(${4 - drift * 2}deg)`,
          }}
        />
        <div
          style={{
            ...pos,
            left: 110,
            top: 560,
            width: 720,
            height: 210,
            opacity: lerp(t, violation, violation + 0.5),
          }}
        >
          <svg width="720" height="150">
            <path
              d="M10 92 H190 Q220 92 220 62 V35 Q220 5 255 5 H390 Q425 5 425 35 V62 Q425 92 455 92 H650"
              fill="none"
              stroke={red}
              strokeWidth="5"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - lin(t, violation, violation + 2.6)}
            />
            <rect x="280" y="50" width="75" height="90" fill="#16213a" />
            <path
              d="M640 80l15 12-15 12"
              fill="none"
              stroke={red}
              strokeWidth="5"
            />
          </svg>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 28,
            }}
          >
            <span>绕过技术措施</span>
            <span style={{ color: red }}>本身可能违法</span>
          </div>
        </div>
      </div>
      <Light />
    </Stage>
  );
};

export const FirstCase = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    p = lerp(t, 0.1, 0.85),
    r = lin(t, 0, timing.duration);
  return (
    <Stage
      name="A8-05 · 据其所知"
      source="V20｜TorrentFreak 原报道；“据其所知”的限定保留"
    >
      <div
        style={{
          ...pos,
          right: 0,
          top: -130,
          ...mono,
          fontSize: 900,
          lineHeight: 1,
          color: "#94aeb714",
          translate: `${r * -100}px 0`,
        }}
      >
        01
      </div>
      <Eyebrow style={{ color: C.yellow }}>TorrentFreak / 据其所知</Eyebrow>
      <div
        style={{
          ...pos,
          left: 100,
          top: 190,
          fontSize: 82,
          lineHeight: 1.2,
          translate: `${(1 - p) * -100}px 0`,
        }}
      >
        Denuvo 首次
        <br />
        在美国法院起诉破解者
      </div>
      <Paper
        name="tf-first"
        width={1510}
        style={{
          ...pos,
          left: 200 - r * 70,
          top: 490 - r * 15,
          transform: `perspective(1800px) rotateY(${-7 + p * 5}deg) rotateZ(${-2 + r}deg) translateY(${(1 - p) * 700}px)`,
        }}
      />
      <div
        style={{
          ...pos,
          left: 120,
          top: 470,
          width: 1540 * p,
          height: 4,
          background: C.yellow,
        }}
      />
      <Light />
    </Stage>
  );
};

export const Injunction = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    future = say(timing, 221, "包括"),
    p = lerp(t, future, future + 0.8),
    r = lin(t, 0, timing.duration);
  return (
    <Stage
      name="A8-06 · 未来的游戏"
      paper
      source="诉状第13页 PRAYER FOR RELIEF｜原告请求的禁令范围，并非已经获批的法院命令"
    >
      <Eyebrow style={{ color: red }}>原告请求 / PRAYER FOR RELIEF</Eyebrow>
      <div style={{ ...pos, left: 100, top: 165, fontSize: 96 }}>请求禁令</div>
      <div style={{ ...pos, left: 105, top: 318, fontSize: 34 }}>
        禁止绕过任何游戏的 Denuvo 保护
      </div>
      <div
        style={{
          ...pos,
          left: 960 - r * 30,
          top: 135,
          width: 835,
          transform: `perspective(1800px) rotateY(${-r * 6}deg) rotate(${3 - r * 3}deg) scale(${1 + p * 0.1})`,
        }}
      >
        <Paper name="relief" width={835} />
        <Pen at={2.1} left={192} top={498} width={610} height={33} />
      </div>
      <svg width="920" height="350" style={{ ...pos, left: 100, top: 470 }}>
        <path d="M0 105H800" stroke="#9c9689" strokeWidth="3" />
        <path
          d="M0 105H800"
          stroke={red}
          strokeWidth="6"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - lin(t, 0.4, future + 0.4)}
        />
        {[0, 1, 2].map((i) => (
          <g
            key={i}
            opacity={i === 2 ? p : lerp(t, 0.6 + i * 0.8, 1.2 + i * 0.8)}
          >
            <circle cx={80 + i * 300} cy="105" r="11" fill={red} />
            <text
              x={80 + i * 300}
              y="60"
              fill={C.ink}
              fontSize="38"
              textAnchor="middle"
              fontFamily={F.cn}
            >
              {["过去", "现在", "未来"][i]}
            </text>
          </g>
        ))}
      </svg>
      <div
        style={{
          ...pos,
          left: 105,
          top: 690,
          width: 790,
          overflow: "hidden",
          clipPath: `inset(0 ${100 * (1 - p)}% 0 0)`,
        }}
      >
        <div style={{ fontSize: 58, color: red, whiteSpace: "nowrap" }}>
          还没被做出来的游戏
        </div>
        <div style={{ fontSize: 25, marginTop: 18, ...mono }}>
          PAST → PRESENT → FUTURE
        </div>
      </div>
      <Light />
    </Stage>
  );
};
