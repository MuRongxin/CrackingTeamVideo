import { AbsoluteFill, Img } from "remotion";
import { publicAsset } from "../assets";
import { useTime, lerp } from "../components";
import { C } from "../style";
import type { ShotTiming } from "../timing";
import { GroupMark } from "../act6/Picture";
import { say } from "./timing";
import {
  Stage,
  Source,
  Paper,
  Eyebrow,
  Light,
  pos,
  mono,
  lin,
  red,
  cyan,
} from "./Stage";

export const ReportedDisbanding = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    report = say(timing, 229),
    chat = say(timing, 230),
    detail = say(timing, 231),
    link = say(timing, 231, "并把"),
    p = lerp(t, report, report + 0.8),
    q = lerp(t, chat, chat + 0.9),
    zoom = lerp(t, link, link + 1.1),
    r = lin(t, detail, timing.duration);
  return (
    <Stage
      name="A8-10 · 波及另一个团队"
      source="MK13 / Tom’s Hardware · 2026-09-28；其所链接 CrackWatch 转帖｜流传截图，未独立核实"
    >
      <Eyebrow style={{ color: C.yellow }}>
        {t < report
          ? "影响 / BEYOND ONE NAME"
          : "2026.09.28 / Tom’s Hardware 报道"}
      </Eyebrow>
      <svg
        width="1920"
        height="1080"
        style={{ ...pos, inset: 0, opacity: 1 - q * 0.8 }}
      >
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            cx="340"
            cy="470"
            r={100 + ((t * 0.11 + i * 0.2) % 1) * 1200}
            fill="none"
            stroke={cyan}
            strokeWidth="1.5"
            opacity={0.35}
          />
        ))}
      </svg>
      <div
        style={{
          ...pos,
          left: 130,
          top: 290,
          opacity: 1 - p,
          transform: `translateX(${-p * 900}px)`,
        }}
      >
        <Paper
          name="court-caption"
          width={500}
          style={{ transform: `rotate(${-6 + t * 0.2}deg)` }}
        />
      </div>
      <GroupMark
        name="denuvowo"
        width={690 - p * 330}
        style={{
          ...pos,
          left: 960 + p * 490,
          top: 250 - p * 135,
          transform: `translateY(${Math.sin(t * 0.5) * 8}px)`,
          opacity: 1 - q * 0.35,
        }}
      />
      <div
        style={{ ...pos, left: 110, top: 590, fontSize: 61, opacity: 1 - p }}
      >
        没有停在一个人身上
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 180,
          width: 1260,
          transform: `translateX(${(1 - p) * -1700 - q * 1900}px) rotate(${-2 + lin(t, report, chat) * 3}deg)`,
        }}
      >
        <Paper name="toms-title" width={1250} />
        <div style={{ marginTop: 34, fontSize: 64, color: C.yellow }}>
          据报解散
          <span style={{ fontSize: 27, color: "#ced4d1", marginLeft: 28 }}>
            reportedly
          </span>
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 198,
          width: 1680,
          height: 610,
          background: "#161b20",
          overflow: "hidden",
          border: "1px solid #6f7c86",
          transform: `translateX(${(1 - q) * 1900}px)`,
        }}
      >
        <Source
          name="circulating-chat-1"
          style={{
            width: 1470 + lin(t, chat, link) * 120 + zoom * 1110,
            translate: `${80 - lin(t, chat, link) * 40 - zoom * 325}px ${-lin(t, chat, link) * 80 - zoom * 545 - r * 12}px`,
            transformOrigin: "top left",
          }}
        />
        <AbsoluteFill style={{ boxShadow: "inset 0 0 70px #0004" }} />
      </div>
      <div
        style={{
          ...pos,
          left: 130,
          top: 822,
          fontSize: 25,
          color: C.yellow,
          opacity: q,
        }}
      >
        报道所引转帖中的原图 / 并非团队正式告别声明
      </div>
      <Light />
    </Stage>
  );
};

export const Contrast = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    other = say(timing, 233),
    p = lerp(t, other, other + 0.6),
    r = lin(t, 0, timing.duration);
  return (
    <Stage
      name="A8-11 · 两种反应"
      source="V20 的当事人公开回复 / MK13 的解散报道｜分别保留说话主体"
    >
      <AbsoluteFill
        style={{
          background: `linear-gradient(105deg,#102e37 0%,#102e37 ${54 - p * 7}%,#14131d ${54 - p * 7}%)`,
        }}
      />
      <div style={{ ...pos, left: 90 - r * 18, top: 135 }}>
        <div style={{ fontSize: 32, color: cyan }}>被点名的人</div>
        <GroupMark name="voices38" width={720} style={{ marginTop: 130 }} />
        <div
          style={{
            fontSize: 100,
            marginTop: 90,
            color: cyan,
            opacity: lerp(t, 0.1, 0.6),
          }}
        >
          一切照常
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 1080 - r * 35,
          top: 135,
          opacity: 0.3 + p * 0.7,
        }}
      >
        <div style={{ fontSize: 32, color: C.yellow }}>未被点名的团队</div>
        <GroupMark name="denuvowo" width={610} style={{ marginTop: 35 }} />
        <div
          style={{
            fontSize: 95,
            marginTop: 15,
            color: C.yellow,
            clipPath: `inset(0 ${100 * (1 - p)}% 0 0)`,
          }}
        >
          据报解散
        </div>
      </div>
      <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
        <path
          d={`M${1060 - p * 140} 0L${800 - p * 40} 1080`}
          stroke="#c7d1cb66"
          strokeWidth="2"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - lerp(t, 0.1, 1.5)}
        />
      </svg>
      <Light />
    </Stage>
  );
};

// The two attachment windows use unaltered regions of the downloaded composite.
// No invented messages, avatars, timestamps or publication interface.
const ChatFragment = ({ part, width }: { part: 0 | 1; width: number }) => {
  const b =
      part === 0
        ? { x: 129, y: 92, w: 551, h: 194 }
        : { x: 129, y: 307, w: 317, h: 160 },
    s = width / b.w;
  return (
    <div
      style={{
        width,
        height: b.h * s,
        overflow: "hidden",
        background: "#13151b",
      }}
    >
      <Source
        name="circulating-chat-1"
        style={{ width: 1024 * s, translate: `${-b.x * s}px ${-b.y * s}px` }}
      />
    </div>
  );
};
export const NoFarewell = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    now = say(timing, 235),
    only = say(timing, 236),
    p = lerp(t, now, now + 1),
    q = lerp(t, only, only + 0.8),
    r = lin(t, 0, timing.duration),
    end = lin(t, timing.duration - 0.7, timing.duration);
  return (
    <Stage
      name="A8-12 · 没有告别信"
      source="历史对照：EMPRESS 公开告别长文 / DenuvOwO：MK13 所引流传截图；无团队正式告别声明"
    >
      <Eyebrow style={{ color: C.yellow }}>告别留下了什么 / THE RECORD</Eyebrow>
      <div
        style={{ ...pos, left: 100, top: 170, fontSize: 74, opacity: 1 - p }}
      >
        过去：一封正式告别信
      </div>
      <div
        style={{
          ...pos,
          left: 200,
          top: 300,
          width: 1160,
          transform: `perspective(1800px) translateX(${-p * 1800}px) rotateY(${-p * 35}deg) rotateZ(${-5 + r * 4}deg)`,
          opacity: 1 - p,
        }}
      >
        <div
          style={{ fontSize: 23, ...mono, marginBottom: 14, color: "#b5cacd" }}
        >
          历史对照 / EMPRESS 原始公开长文
        </div>
        <div
          style={{
            height: 450,
            overflow: "hidden",
            background: "#e9e6dc",
            boxShadow: "0 30px 70px #0008",
          }}
        >
          <Img
            src={publicAsset("v38/act2/stills/empress-farewell-page-01.png")}
            style={{ width: 1160, translate: `0 ${-lin(t, 0, now) * 110}px` }}
          />
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 160,
          opacity: p,
          transform: `translateX(${(1 - p) * 300}px)`,
        }}
      >
        <div style={{ fontSize: 71 }}>这一次</div>
        <div style={{ fontSize: 57, color: C.yellow, marginTop: 26 }}>
          没有正式告别声明
        </div>
        <GroupMark name="denuvowo" width={620} style={{ marginTop: 40 }} />
      </div>
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            ...pos,
            left: 850 + i * 190 - q * i * 100,
            top: 190 + i * 330 - q * i * 55,
            width: 870,
            opacity: p,
            transform: `perspective(1600px) translateX(${(1 - p) * 1600}px) rotateZ(${i === 0 ? -4 + r * 3 : 6 - r * 3}deg) scale(${1 - q * 0.08})`,
            boxShadow: "0 28px 70px #0009",
          }}
        >
          <ChatFragment part={i as 0 | 1} width={i === 0 ? 870 : 760} />
        </div>
      ))}
      <div
        style={{
          ...pos,
          left: 100,
          top: 720,
          fontSize: 67,
          color: C.white,
          opacity: q,
          translate: `0 ${40 * (1 - q)}px`,
        }}
      >
        只有流传的截图。
      </div>
      <Light />
      <AbsoluteFill
        style={{
          background: "#080e13",
          clipPath: `inset(0 0 0 ${100 - end * 100}%)`,
          zIndex: 45,
        }}
      />
    </Stage>
  );
};
