import { Sequence, useVideoConfig } from "remotion";
import { C, F } from "../style";
import { useTime, lerp } from "../components";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
import { Stage, pos, mono, HV, OS } from "./shared";
import { Film, GroupMark, Shade, CaptionSlug, Slash, Machine } from "./Picture";

export const TwoRoutes = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    split = say(timing, 152),
    p = lerp(t, split, split + 0.9);
  return (
    <Stage
      label="06 / Wuk0ng"
      source="游戏画面：CAPCOM 官方预告｜两条路线为概念比较｜时间回到 2026 年初"
    >
      <Film name="routes" />
      <Shade />
      <div
        style={{
          ...pos,
          inset: 0,
          background: "linear-gradient(112deg,#051c28cc 49.8%,#f5b74030 50%)",
          opacity: p,
        }}
      />
      <GroupMark
        name="voices38"
        width={690}
        style={{
          ...pos,
          left: 105,
          top: 310,
          opacity: 1 - p,
          translate: `${-p * 1000}px 0`,
        }}
      />
      <div
        style={{ ...pos, left: 100, top: 220, overflow: "hidden", width: 1300 }}
      >
        <div
          style={{
            ...mono,
            fontSize: 116,
            letterSpacing: -7,
            color: HV,
            translate: `${lerp(t, 0, 0.8, 300, 0)}px 0`,
            opacity: lerp(t, 0, 0.4),
          }}
        >
          Hypervisor
        </div>
        <div
          style={{
            height: 5,
            width: lerp(t, 0.4, 1.3, 0, 780),
            background: HV,
            marginTop: 16,
          }}
        />
      </div>
      <div
        style={{
          ...pos,
          left: 980,
          top: 570,
          opacity: p,
          translate: `${(1 - p) * 450}px 0`,
        }}
      >
        <div style={{ ...mono, fontSize: 92, color: OS }}>old school</div>
        <div style={{ fontSize: 30, marginTop: 18 }}>游戏程序层</div>
      </div>
      <div
        style={{
          ...pos,
          left: 105,
          top: 742,
          ...mono,
          fontSize: 34,
          color: "#fff",
          opacity: p,
        }}
      >
        2026 / 两种选择
      </div>
      <div
        style={{
          ...pos,
          left: 105,
          top: 400,
          fontSize: 30,
          color: HV,
          opacity: p,
        }}
      >
        系统底层
      </div>
      <Slash at={split} />
    </Stage>
  );
};

export const Hypervisor = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    deep = say(timing, 154),
    report = say(timing, 155),
    p = lerp(t, deep, deep + 2.1),
    news = lerp(t, report, report + 0.8);
  return (
    <Stage
      label="路线 01 / 进入系统底层"
      source="分层为技术位置示意｜CAPCOM 官方预告｜发售日现象据 TorrentFreak / V20"
    >
      <div
        style={{
          ...pos,
          inset: 0,
          background: "radial-gradient(ellipse at 68% 36%,#275361,#08121b 70%)",
        }}
      />
      <Machine spread={p} />
      <div
        style={{
          ...pos,
          left: 90,
          top: 170,
          width: 490,
          translate: `0 ${-news * 40}px`,
        }}
      >
        <div style={{ ...mono, fontSize: 22, color: HV, letterSpacing: 4 }}>
          VIRTUALIZATION
        </div>
        <div style={{ fontSize: 80, lineHeight: 1.2, marginTop: 25 }}>
          向下
          <br />
          一层。
        </div>
        <div
          style={{ fontSize: 30, color: "#b8c8cd", marginTop: 35, opacity: p }}
        >
          在更底层应付验证检查
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 95,
          top: 560,
          width: 430,
          opacity: news,
          translate: `0 ${(1 - news) * 70}px`,
          borderLeft: `4px solid ${HV}`,
          paddingLeft: 24,
        }}
      >
        <div style={{ ...mono, fontSize: 24, color: HV }}>TORRENTFREAK</div>
        <div style={{ fontSize: 42, lineHeight: 1.3, marginTop: 18 }}>
          一波新的
          <br />
          发售日绕过
        </div>
      </div>
    </Stage>
  );
};

export const DayOne = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    { fps } = useVideoConfig(),
    next = say(timing, 158),
    third = next + 2.6;
  const game = t < third ? (t < next ? 0 : 1) : 2;
  return (
    <Stage
      label="2026 / 发售当天"
      source="各游戏官方宣传片｜画面用于作品展示｜时间叙述沿用文稿与 V11 / V20"
    >
      <Sequence
        name="安魂曲 / 新取官方镜头"
        durationInFrames={Math.round(next * fps)}
      >
        <Film name="requiem-day" />
      </Sequence>
      <Sequence
        name="赤色沙漠 / 实际游戏画面"
        from={Math.round(next * fps)}
        durationInFrames={Math.round((third - next) * fps)}
      >
        <Film name="crimson-day" />
      </Sequence>
      <Sequence
        name="奇异人生重聚 / 实际游戏画面"
        from={Math.round(third * fps)}
      >
        <Film name="reunion-day" />
      </Sequence>
      <Shade side="bottom" />
      <CaptionSlug
        key={game}
        at={game === 0 ? 0 : game === 1 ? next : third}
        kicker={
          [
            "RESIDENT EVIL REQUIEM",
            "CRIMSON DESERT",
            "LIFE IS STRANGE: REUNION",
          ][game]
        }
        title={["生化危机：安魂曲", "赤色沙漠", "奇异人生：重聚"][game]}
        sub={
          game === 0 ? "正式发售后，仅仅几个小时" : "发售当天 · Hypervisor 绕过"
        }
        style={{ top: 620 }}
      />
      <div
        style={{
          ...pos,
          right: 110,
          top: 120,
          width: 230,
          height: 230,
          borderRadius: "50%",
          border: `2px solid ${HV}`,
          background: "#04101799",
          textAlign: "center",
        }}
      >
        <svg width="230" height="230" style={{ ...pos, inset: 0 }}>
          {Array.from({ length: 24 }, (_, i) => (
            <path
              key={i}
              d="M115 12V23"
              stroke={HV}
              transform={`rotate(${i * 15} 115 115)`}
            />
          ))}
          <path
            d="M115 115V42M115 115L155 133"
            fill="none"
            stroke="white"
            strokeWidth="4"
            transform={`rotate(${t * 35} 115 115)`}
          />
        </svg>
        <div
          style={{
            ...pos,
            top: 245,
            right: 0,
            ...mono,
            fontSize: 32,
            whiteSpace: "nowrap",
            color: HV,
          }}
        >
          DAY ONE
        </div>
      </div>
      <Slash at={next} />
      <Slash at={third} />
    </Stage>
  );
};

export const SystemCost = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    off = say(timing, 159, "玩家"),
    priv = say(timing, 160),
    risk = say(timing, 160, "这会"),
    p = lerp(t, off, off + 0.9),
    q = lerp(t, priv, priv + 0.9),
    r = lerp(t, risk, risk + 0.65);
  return (
    <Stage
      label="运行之前 / 系统环境的代价"
      source="CAPCOM 官方预告中的屏幕画面｜叠加为权限示意，依据 V12 / V20"
    >
      <Film name="system" />
      <Shade />
      <div style={{ ...pos, left: 105, top: 165, fontSize: 72 }}>
        运行起来之前
      </div>
      <div
        style={{
          ...pos,
          left: 110,
          top: 300,
          width: 730,
          transform: `perspective(1200px) rotateY(${-12 + p * 12}deg)`,
        }}
      >
        <div style={{ fontSize: 35, color: "#d7e1e5" }}>
          Windows · 部分安全功能
        </div>
        <div
          style={{
            marginTop: 25,
            width: 220,
            height: 78,
            borderRadius: 42,
            border: `2px solid ${HV}`,
            background: p > 0.5 ? "#303642" : "#245c66",
            position: "relative",
          }}
        >
          <div
            style={{
              ...pos,
              top: 8,
              left: 12 + (1 - p) * 126,
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: "#dfe9e7",
            }}
          />
          <div
            style={{
              ...pos,
              left: 102,
              top: 21,
              fontFamily: F.mono,
              fontSize: 27,
              color: HV,
              opacity: p,
            }}
          >
            OFF
          </div>
        </div>
        <div
          style={{
            height: 2,
            width: 610,
            background: "#859aa759",
            marginTop: 43,
          }}
        />
        <div
          style={{
            marginTop: 30,
            fontSize: 49,
            color: OS,
            opacity: q,
            translate: `${(1 - q) * -120}px 0`,
          }}
        >
          更高的系统权限
        </div>
        <div
          style={{
            marginTop: 27,
            fontSize: 37,
            color: "#ffa186",
            opacity: r,
            translate: `0 ${(1 - r) * 35}px`,
          }}
        >
          潜在稳定性问题
        </div>
        <div style={{ fontSize: 23, marginTop: 28, color: "#a2b6c2" }}>
          环境要求示意
        </div>
      </div>
      <div
        style={{
          ...pos,
          top: 0,
          left: 1100 - q * 210,
          height: 1080,
          width: 3,
          background: OS,
          opacity: q * 0.5,
        }}
      />
      <Slash at={priv} color={OS} />
    </Stage>
  );
};

export const OldSchool = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    game = say(timing, 162, "在游戏"),
    steady = say(timing, 163),
    p = lerp(t, game - 0.3, game + 0.9),
    q = lerp(t, steady, steady + 0.6);
  return (
    <Stage
      label="路线 02 / voices38 自称 old school"
      source="voices38 原字标：V18 NFO｜定位据 V05｜CAPCOM 官方画面，程序层为概念示意"
    >
      <Film name="oldschool" />
      <Shade />
      <div
        style={{
          ...pos,
          inset: 0,
          background: "linear-gradient(90deg,#02070af0,transparent 95%)",
          opacity: 1 - p * 0.6,
        }}
      />
      <GroupMark
        name="voices38"
        width={850}
        style={{
          ...pos,
          left: 100,
          top: 135,
          scale: 1 - p * 0.25,
          transformOrigin: "left top",
        }}
      />
      <div
        style={{
          ...pos,
          left: 110,
          top: 440 - p * 85,
          ...mono,
          fontSize: 85,
          color: OS,
          letterSpacing: -3,
        }}
      >
        old school
      </div>
      <div style={{ ...pos, left: 115, top: 565 - p * 55, fontSize: 41 }}>
        老派路线
      </div>
      <div
        style={{
          ...pos,
          left: 1050,
          top: 240,
          width: 680,
          height: 400,
          border: `2px solid ${OS}`,
          opacity: p,
          transform: `perspective(1000px) rotateY(${(1 - p) * -65}deg)`,
          translate: `${(1 - p) * 700}px 0`,
          background: "#071015a8",
        }}
      >
        <div style={{ ...mono, fontSize: 25, padding: 24, color: OS }}>
          GAME / 程序层
        </div>
        <div style={{ fontSize: 64, margin: "25px 38px" }}>在这里动手</div>
        <div
          style={{
            ...mono,
            fontSize: 29,
            margin: "26px 38px",
            borderTop: "1px solid #697b80",
            paddingTop: 22,
          }}
        >
          DENUVO · 仍在程序中
        </div>
        <div
          style={{
            ...pos,
            top: 80,
            bottom: 0,
            width: 95,
            left: ((t * 0.23) % 1) * 680,
            background:
              "linear-gradient(90deg,transparent,#ffc83d29,transparent)",
          }}
        />
      </div>
      <div
        style={{
          ...pos,
          left: 110,
          top: 730,
          fontSize: 42,
          color: OS,
          opacity: q,
          translate: `0 ${(1 - q) * 40}px`,
        }}
      >
        不用改动玩家的系统
      </div>
    </Stage>
  );
};
