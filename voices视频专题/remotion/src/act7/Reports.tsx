import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { useTime, lerp } from "../components";
import { C, F } from "../style";
import type { ShotTiming } from "../timing";
import { GroupMark } from "../act6/Picture";
import { say } from "./timing";
import {
  Stage,
  Footage,
  Darken,
  Kicker,
  SourceImage,
  pos,
  mono,
  lin,
} from "./Stage";

export const OtherSide = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    turn = lerp(t, say(timing, 190) - 0.15, say(timing, 190) + 0.65);
  return (
    <Stage
      name="A7-01 · 澄清的另一面"
      source="KiriGiri 的说法，经游民星空转述｜V13 · 游戏画面：Capcom 官方"
    >
      <Footage
        name="requiem-question"
        style={{ scale: 1.04 + lin(t, 0, timing.duration) * 0.035 }}
      />
      <Darken />
      <div
        style={{
          ...pos,
          inset: 0,
          background: "#080e13",
          opacity: (1 - turn) * 0.35,
        }}
      />
      <Kicker>07 / 一个问号</Kicker>
      <div
        style={{
          ...pos,
          left: 100,
          top: 195,
          opacity: 1 - turn,
          translate: `${turn * -200}px 0`,
        }}
      >
        <GroupMark name="denuvowo" width={620} />
        <div style={{ fontSize: 40, marginTop: 8 }}>KiriGiri</div>
        <div style={{ fontSize: 76, marginTop: 28 }}>还有另一句话。</div>
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 540,
          opacity: turn,
          translate: `${(1 - turn) * 95}px 0`,
        }}
      >
        <div
          style={{ ...mono, fontSize: 27, letterSpacing: 6, color: C.yellow }}
        >
          RESIDENT EVIL REQUIEM
        </div>
        <div style={{ fontSize: 88, marginTop: 20 }}>生化危机：安魂曲</div>
      </div>
      <div
        style={{
          ...pos,
          left: 1390,
          top: 240,
          ...mono,
          color: C.yellow,
          fontSize: 400,
          lineHeight: 1,
          opacity: turn,
          transform: `rotateY(${(1 - turn) * 80}deg)`,
          textShadow: "0 10px 90px #0008",
        }}
      >
        ?
      </div>
    </Stage>
  );
};

export const HoursAndDays = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    fast = say(timing, 192, "几个小时"),
    slow = say(timing, 193),
    p = lerp(t, slow, slow + 1.1),
    x =
      260 + lerp(t, fast, fast + 0.7) * 225 + lerp(t, slow, slow + 1.1) * 1065;
  return (
    <Stage
      name="A7-02 · 数小时与四十多天"
      source="时间间隔：TechSpot 报道｜V11 · 图示使用报道概数"
    >
      <Footage name="requiem-clock" />
      <Darken />
      <AbsoluteFill
        style={{
          background: "linear-gradient(0deg,#061017f2,transparent 90%)",
        }}
      />
      <Kicker>2026.02 / 下旬发售</Kicker>
      <div style={{ ...pos, left: 100, top: 170, fontSize: 64 }}>
        同一个起点，<span style={{ color: C.yellow }}>不同的等待。</span>
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 320,
          width: 1720,
          height: 430,
          perspective: 1400,
        }}
      >
        <div
          style={{
            ...pos,
            inset: 0,
            transform: `rotateY(${-6 + p * 6}deg) translateZ(${p * 25}px)`,
          }}
        >
          <svg width="1720" height="430" style={{ ...pos, inset: 0 }}>
            <path d="M160 220H1590" stroke="#8094a9" strokeWidth="2" />
            {Array.from({ length: 43 }, (_, i) => (
              <path
                key={i}
                d={`M${160 + i * 34} 210v${i % 7 === 0 ? 32 : 16}`}
                stroke="#8aa1ae"
                opacity={0.5}
              />
            ))}
            <path d={`M160 220H${x - 100}`} stroke={C.yellow} strokeWidth="5" />
            <circle cx={x - 100} cy="220" r="10" fill={C.yellow} />
          </svg>
          <div style={{ ...pos, left: 70, top: 280, ...mono, fontSize: 29 }}>
            RELEASE
          </div>
          <div
            style={{
              ...pos,
              left: 285,
              top: 65,
              opacity: lerp(t, fast, fast + 0.45),
            }}
          >
            <div style={{ fontSize: 76, color: "#85d8dc" }}>数小时</div>
            <div style={{ ...mono, fontSize: 29, marginTop: 18 }}>
              Hypervisor
            </div>
          </div>
          <div
            style={{
              ...pos,
              left: 1040,
              top: 35,
              opacity: p,
              translate: `${(1 - p) * 120}px 0`,
            }}
          >
            <div style={{ fontSize: 110, color: C.yellow }}>四十多天</div>
            <GroupMark name="voices38" width={470} style={{ marginTop: 52 }} />
          </div>
        </div>
      </div>
    </Stage>
  );
};

export const GoodReviews = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    { fps } = useVideoConfig(),
    headline = say(timing, 195),
    perf = say(timing, 196),
    memory = say(timing, 197),
    out = lerp(t, perf - 0.25, perf + 0.55),
    intro = lerp(t, headline - 0.3, headline + 0.35);
  return (
    <Stage
      name="A7-03 · 很高的评价"
      source={
        t < perf
          ? "TechSpot · 2026.04.13｜原标题存档渲染；“移除”为媒体用词"
          : "Tom’s Hardware · 2026.04.11｜报道所引对比，并非本片实测"
      }
    >
      <Sequence from={Math.round(headline * fps)} name="未用时段：安魂曲官方片">
        <Footage name="requiem-review" />
      </Sequence>
      <Darken />
      <AbsoluteFill
        style={{ background: "#0b1720", opacity: 0.75 - out * 0.3 }}
      />
      <GroupMark
        name="voices38"
        width={660}
        style={{
          ...pos,
          left: 100,
          top: 170,
          opacity: 1 - intro,
          translate: `0px ${intro * -180}px`,
        }}
      />
      <div
        style={{
          ...pos,
          left: 100,
          top: 470,
          fontSize: 115,
          opacity: 1 - intro,
        }}
      >
        晚，但评价很高。
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 175,
          width: 1720,
          opacity: intro * (1 - out),
          perspective: 1600,
          transform: `translateX(${-out * 1450}px) rotateY(${-out * 35}deg)`,
        }}
      >
        <div
          style={{ ...mono, fontSize: 29, color: C.yellow, marginBottom: 36 }}
        >
          TechSpot / ORIGINAL HEADLINE
        </div>
        <div
          style={{
            background: "white",
            padding: 24,
            boxShadow: "0 28px 80px #0009",
            rotate: `${(1 - intro) * 3}deg`,
          }}
        >
          <SourceImage name="techspot-title.png" style={{ width: "100%" }} />
        </div>
        <div style={{ marginTop: 25, fontSize: 32, color: "#aebecb" }}>
          报道用词
        </div>
        <div
          style={{
            fontSize: 120,
            color: C.yellow,
            letterSpacing: 2,
            marginTop: 15,
          }}
        >
          “移除”
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 122,
          width: 1720,
          opacity: out,
          translate: `${(1 - out) * 220}px 0`,
        }}
      >
        <div style={{ ...mono, fontSize: 29, color: C.yellow }}>
          Tom’s Hardware / REPORTED COMPARISON
        </div>
        <div
          style={{
            display: "flex",
            gap: 110,
            alignItems: "baseline",
            marginTop: 30,
          }}
        >
          <div style={{ fontSize: 74 }}>帧数略高</div>
          <div
            style={{
              opacity: lerp(t, memory - 0.1, memory + 0.35),
              display: "flex",
              alignItems: "baseline",
              gap: 20,
            }}
          >
            <span style={{ fontSize: 135, color: "#8fdbcf", ...mono }}>
              1–2<span style={{ fontSize: 60 }}> GB</span>
            </span>
            <span style={{ fontSize: 40 }}>显存减少</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 38,
            width: 1460,
            background: "white",
            padding: 20,
            boxShadow: "0 30px 60px #0008",
            transform: `rotateX(${(1 - out) * 18}deg)`,
          }}
        >
          <SourceImage name="toms-performance.png" style={{ width: "100%" }} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 22,
            fontSize: 27,
          }}
        >
          <span>报道所引测试：ChillyWillMD</span>
          <span style={mono}>i9-13900K / RTX 3090</span>
        </div>
      </div>
    </Stage>
  );
};
