import { C, F } from "../style";
import { lerp, useTime, Typed } from "../components";
import type { ShotTiming } from "../timing";
import {
  A3Scene,
  Header,
  Divider,
  Reveal,
  NfoImage,
  KindStage,
  AccentLine,
} from "./shared";
import { say } from "./timing";
import { nitroAt, doorAt } from "./motion";

export const NfoGrows = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const grow = say(timing, 55);
  const logo = say(timing, 56);
  const fields = say(timing, 57);
  const p = lerp(t, grow - 0.25, grow + 0.9);
  const rows = [
    ["RELEASE NAME", "Need.For.Speed.Hot.Pursuit.\nRemastered-voices38"],
    ["RELEASE DATE", "11/18/2025"],
    ["FORMAT", "ISO"],
    ["PROTECTION", "Denuvo + EA"],
  ];
  return (
    <A3Scene source="voices38 发行说明节选">
      <Header title="从几行说明，到一份完整的 NFO" right="2025.10 →" />
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 255,
          width: 1640,
          height: 540,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: lerp(t, grow, grow + 1, 0, 100),
            width: 640,
            scale: 1 - p * 0.28 + t * 0.0005,
            transformOrigin: "left top",
            opacity: 1 - p * 0.4,
          }}
        >
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 27,
              color: C.gray,
              marginBottom: 35,
            }}
          >
            Total War - Three Kingdoms v1.7.1
          </div>
          <div
            style={{
              fontFamily: F.pixel,
              fontSize: 32,
              lineHeight: 1.5,
              color: C.white,
            }}
          >
            Game is updated to the latest version
            <br />
            and all DLCs are included.
          </div>
          <div
            style={{
              marginTop: 44,
              fontFamily: F.mono,
              fontSize: 64,
              color: C.yellow,
            }}
          >
            0.34 KB
          </div>
          <div style={{ fontSize: 29, color: C.gray, marginTop: 15 }}>
            最初的几行说明
          </div>
        </div>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 980 + i * 55,
              top: 65 + i * 42,
              width: 430,
              height: 330,
              border: `1px solid ${C.blue}77`,
              background: "#101817",
              opacity: lerp(t, 1 + i * 1.1, 1.6 + i * 1.1) * (1 - p),
              translate: `${lerp(t, 1 + i * 1.1, 1.7 + i * 1.1, 140, 0)}px 0`,
              rotate: `${(i - 1) * 4}deg`,
              padding: 32,
            }}
          >
            <div style={{ fontFamily: F.mono, fontSize: 27, color: C.gray }}>
              RELEASE / NFO
            </div>
            {[0, 1, 2, 3].map((j) => (
              <div
                key={j}
                style={{
                  height: 2,
                  width: 290 - j * 28,
                  background: j === 0 ? C.yellow : "#6e8aa666",
                  marginTop: 31,
                }}
              />
            ))}
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: lerp(t, grow, grow + 1, 900, 590),
            top: 0,
            width: 1050,
            height: 540,
            borderLeft: `1px solid ${C.gray}55`,
            paddingLeft: 48,
            opacity: p,
          }}
        >
          <div
            style={{
              height: 190,
              overflow: "hidden",
              clipPath: `inset(0 ${100 * (1 - lerp(t, logo, logo + 0.9))}% 0 0)`,
            }}
          >
            <NfoImage
              name="voices-header"
              style={{ width: 640, height: 211, marginTop: -12 }}
            />
          </div>
          {rows.map(([label, value], i) => (
            <div
              key={label}
              style={{
                display: "flex",
                gap: 20,
                alignItems: "baseline",
                marginTop: i ? 20 : 12,
                opacity: lerp(t, fields + i * 0.52, fields + i * 0.52 + 0.35),
                translate: `${lerp(t, fields + i * 0.52, fields + i * 0.52 + 0.5, 25, 0)}px 0`,
                fontFamily: F.mono,
                lineHeight: 1.3,
              }}
            >
              <span
                style={{
                  width: 230,
                  fontSize: 25,
                  color: C.gray,
                  flexShrink: 0,
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontSize: i === 0 ? 28 : 34,
                  color: i === 3 ? C.yellow : C.white,
                  whiteSpace: "pre-line",
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 815,
          width: 1640,
          height: 1,
          background: `linear-gradient(90deg,${C.yellow} ${lerp(t, 0, timing.duration) * 100}%,#8a8f9822 0)`,
        }}
      />
    </A3Scene>
  );
};

export const KindIntro = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const joke = say(timing, 60);
  const p = lerp(t, joke, joke + 0.5);
  return (
    <A3Scene source="voices38 发行说明 · KIND 字段">
      <Header title="有一栏，越来越不像类型" right="voices38 / KIND" />
      <Divider />
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 291,
          color: C.yellow,
          fontFamily: F.mono,
          fontSize: 42,
        }}
      >
        KIND
      </div>
      <div
        style={{
          position: "absolute",
          left: 400,
          top: 280,
          fontSize: 78,
          lineHeight: 1.25,
        }}
      >
        <div style={{ opacity: 1 - p, translate: `0 ${-p * 35}px` }}>
          游戏类型<span style={{ color: C.gray, marginLeft: 20 }}>？</span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            whiteSpace: "nowrap",
            opacity: p,
            translate: `0 ${(1 - p) * 35}px`,
            color: C.yellow,
          }}
        >
          玩家的玩笑
        </div>
      </div>
      <div style={{ position: "absolute", left: 400, top: 505, width: 1300 }}>
        {[
          "Fast Cars on Nitro",
          "Zombie Puzzle Simulator",
          "The MI6 Hitman",
        ].map((text, i) => (
          <Reveal
            key={text}
            at={joke + 0.45 + i * 0.55}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 25,
              marginBottom: 21,
              fontFamily: F.mono,
              fontSize: 34,
              color: i === 0 ? C.white : C.gray,
            }}
          >
            <span style={{ color: C.yellow, fontSize: 22 }}>0{i + 1}</span>
            {text}
            <span
              style={{ height: 1, width: 80, background: C.gray, opacity: 0.4 }}
            />
          </Reveal>
        ))}
      </div>
    </A3Scene>
  );
};

export const Nitro = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const boost = nitroAt(timing);
  const acceleration = Math.max(0, t - boost);
  const head = 140 + t * 100 + acceleration * acceleration * 1400;
  return (
    <KindStage
      game="极品飞车：热力追踪 重制版"
      english={<Typed text="Fast Cars on Nitro" start={0.15} speed={45} />}
      chinese="加满氮气的快车"
      source="voices38《极品飞车》发行说明 · 2025-11-18"
    >
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <linearGradient id="nitro-trail">
            <stop stopColor={C.yellow} stopOpacity="0" />
            <stop offset="1" stopColor={C.yellow} />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M-100 ${580 + i * 66}L2020 ${630 + i * 66}`}
            stroke={i === 1 ? C.blue : "#6e8aa644"}
            strokeWidth={i === 1 ? 2 : 1}
            fill="none"
          />
        ))}
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M-100 ${608 + i * 66}L2020 ${658 + i * 66}`}
            stroke="#6e8aa677"
            strokeWidth="2"
            strokeDasharray="100 170"
            strokeDashoffset={-(t * 160 + acceleration * acceleration * 1500)}
          />
        ))}
        <g
          opacity={lerp(t, 0.3, 0.7)}
          style={{ translate: `${head}px ${639 + head * 0.023}px` }}
        >
          <path
            d={`M${-130 - acceleration * 160} 0H0`}
            stroke="url(#nitro-trail)"
            strokeWidth={5 + Math.min(acceleration * 4, 6)}
          />
          <rect x="0" y="-7" width="40" height="14" rx="4" fill={C.yellow} />
          <circle cx="40" r="3" fill="white" />
        </g>
      </svg>
      <Reveal
        at={boost}
        style={{
          position: "absolute",
          left: 140,
          top: 760,
          fontFamily: F.mono,
          fontSize: 28,
          color: C.yellow,
          letterSpacing: 6,
        }}
      >
        N I T R O{" "}
        <span style={{ opacity: (t * 4) % 1 < 0.6 ? 1 : 0.35 }}>→</span>
      </Reveal>
    </KindStage>
  );
};

const ObjectIcon = ({ kind }: { kind: number }) => (
  <svg
    viewBox="0 0 100 100"
    width={78}
    height={78}
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
  >
    {kind === 0 ? (
      <>
        <circle cx="31" cy="32" r="16" />
        <path d="M43 44L80 81M62 63L75 50M74 75L86 63" />
      </>
    ) : kind === 1 ? (
      <>
        <path d="M50 8L62 27L85 30L74 52L80 77L55 75L37 92L25 68L7 54L27 39L31 15Z" />
        <circle cx="48" cy="49" r="14" />
      </>
    ) : (
      <>
        <path d="M18 18H57V36H82V71H59V87H25V64H9V37H18Z" />
        <circle cx="45" cy="50" r="11" />
      </>
    )}
  </svg>
);
export const ZombiePuzzle = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const start = say(timing, 63);
  const open = doorAt(timing);
  const p = lerp(t, open, open + 0.7);
  return (
    <KindStage
      game="生化危机：安魂曲"
      english="Zombie Puzzle Simulator"
      chinese="僵尸解谜模拟器"
      source="voices38《生化危机：安魂曲》发行说明"
    >
      {[0, 1, 2].map((i) => {
        const move = lerp(t, start + 1.4 + i * 0.75, open - 0.1);
        const x = [550, 845, 1120][i];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + (1390 - x) * move,
              top: 575 + Math.sin(t * 1.8 + i) * 8 * (1 - move),
              opacity:
                lerp(t, start + i * 0.25, start + i * 0.25 + 0.5) *
                (1 - lerp(t, open - 0.15, open + 0.1)),
              color: i === 0 ? C.yellow : C.white,
              rotate: `${(i - 1) * 12 * (1 - move)}deg`,
            }}
          >
            <ObjectIcon kind={i} />
            <div style={{ fontSize: 28, marginTop: 18, textAlign: "center" }}>
              {["钥匙", "徽章", "零件"][i]}
            </div>
          </div>
        );
      })}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        <path d="M495 784H1615" stroke="#6e8aa655" />
        <rect
          x={1340}
          y={510}
          width={220}
          height={274}
          fill="#111b1c"
          stroke={C.blue}
          strokeWidth={2}
        />
        <rect x={1348} y={518} width={202} height={258} fill={C.black} />
        <rect
          x={1537}
          y={522}
          width={12 * p}
          height={252}
          fill={C.yellow}
          opacity={p}
        />
        <path
          d={`M1348 518L${1548 - p * 39} ${518 + p * 12}V${776 - p * 12}L1348 776Z`}
          fill="#172225"
          stroke={C.blue}
        />
        <circle
          cx={1515 - p * 34}
          cy={657}
          r={5}
          fill={p ? C.yellow : C.gray}
        />
      </svg>
      <Reveal
        at={open}
        style={{
          position: "absolute",
          left: 400,
          top: 760,
          fontSize: 30,
          color: C.gray,
        }}
      >
        找齐了，门才开一条缝。
      </Reveal>
    </KindStage>
  );
};

export const MI6 = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const explain = say(timing, 65);
  return (
    <KindStage
      game="007：初露锋芒"
      english={
        <>
          <span>The </span>
          <span
            style={{ borderBottom: `2px solid ${C.yellow}`, paddingBottom: 8 }}
          >
            MI6
          </span>
          <span> </span>
          <span
            style={{ borderBottom: `2px solid ${C.yellow}`, paddingBottom: 8 }}
          >
            Hitman
          </span>
        </>
      }
      chinese="军情六处的杀手"
      source="voices38《007：初露锋芒》发行说明"
    >
      <AccentLine x1={500} y1={650} x2={950} y2={650} at={explain + 0.2} />
      <AccentLine x1={1050} y1={650} x2={1490} y2={650} at={explain + 1.8} />
      <Reveal
        at={explain}
        style={{
          position: "absolute",
          left: 220,
          top: 590,
          width: 490,
          textAlign: "center",
          background: C.black,
          padding: "25px 0",
          fontSize: 43,
        }}
      >
        007：初露锋芒
      </Reveal>
      <Reveal
        at={explain + 0.5}
        style={{
          position: "absolute",
          left: 745,
          top: 558,
          width: 440,
          textAlign: "center",
          background: C.black,
          border: `1px solid ${C.blue}`,
          padding: "22px 0",
        }}
      >
        <div style={{ fontSize: 24, color: C.gray, marginBottom: 15 }}>
          同一开发商
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 34 }}>IO Interactive</div>
      </Reveal>
      <Reveal
        at={explain + 2}
        style={{
          position: "absolute",
          left: 1300,
          top: 590,
          width: 400,
          textAlign: "center",
          background: C.black,
          padding: "25px 0",
          fontSize: 43,
          color: C.yellow,
        }}
      >
        《杀手》系列
      </Reveal>
    </KindStage>
  );
};

export const AnotherField = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const at = say(timing, 67);
  const p = lerp(t, at, at + 0.8);
  const complex = say(timing, 68);
  return (
    <A3Scene source="voices38 发行说明 · PROTECTION 字段">
      <Header title="同一份 NFO，另一种语气" />
      <Divider color={C.blue} />
      <div
        style={{
          position: "absolute",
          left: 140,
          right: 140,
          top: 290,
          height: 500,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            translate: `0 ${-p * 275}px`,
            opacity: 1 - p,
            fontFamily: F.mono,
          }}
        >
          <div style={{ fontSize: 42, color: C.yellow }}>KIND</div>
          {[
            "Fast Cars on Nitro",
            "Zombie Puzzle Simulator",
            "The MI6 Hitman",
          ].map((s, i) => (
            <div
              key={s}
              style={{
                position: "absolute",
                left: 480,
                top: i * 73,
                rotate: `${(i - 1) * 2}deg`,
                fontSize: 40,
                color: i === 0 ? C.white : C.gray,
              }}
            >
              {s}
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            translate: `0 ${(1 - p) * 280}px`,
            opacity: p,
          }}
        >
          <div style={{ fontFamily: F.mono, fontSize: 76, color: C.blue }}>
            PROTECTION
          </div>
          <div style={{ marginTop: 30, fontSize: 46 }}>游戏用了哪些保护</div>
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 39,
              marginTop: 85,
              display: "flex",
              gap: 36,
            }}
          >
            {["Denuvo", "Steam", "VMProtect", "Custom"].map((x, i) => (
              <Reveal
                key={x}
                at={complex + i * 0.85}
                style={{
                  borderBottom: `1px solid ${C.blue}`,
                  paddingBottom: 20,
                }}
              >
                {i > 0 && (
                  <span style={{ color: C.gray, marginRight: 25 }}>+</span>
                )}
                {x}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </A3Scene>
  );
};

export const ProtectionLists = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const newer = say(timing, 70);
  const list = say(timing, 70, "变成了");
  return (
    <A3Scene source="voices38 发行说明 · PROTECTION 字段">
      <Header title="PROTECTION" right="2025.11 → 2026.05" />
      <div style={{ position: "absolute", left: 140, right: 140, top: 240 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 32 }}>
          <span style={{ fontFamily: F.mono, fontSize: 31, color: C.gray }}>
            2025.11
          </span>
          <span style={{ fontSize: 38 }}>极品飞车：热力追踪 重制版</span>
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 35 }}>
          {["Denuvo", "EA"].map((x, i) => (
            <Reveal
              key={x}
              at={0.55 + i * 0.25}
              style={{
                fontFamily: F.mono,
                fontSize: 44,
                padding: "22px 35px",
                border: `1px solid ${C.blue}`,
                background: "#16213a55",
                color: t < newer ? C.white : C.gray,
              }}
            >
              {i > 0 && (
                <span style={{ color: C.gray, marginRight: 28 }}>+</span>
              )}
              {x}
            </Reveal>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          right: 140,
          top: 480,
          height: 1,
          background: "#6e8aa655",
        }}
      />
      <Reveal
        at={newer}
        style={{ position: "absolute", left: 140, top: 530, fontSize: 38 }}
      >
        <span
          style={{
            fontFamily: F.mono,
            fontSize: 31,
            color: C.gray,
            marginRight: 35,
          }}
        >
          2026.05
        </span>
        识质存在{" "}
        <span style={{ fontFamily: F.mono, marginLeft: 20 }}>PRAGMATA</span>
      </Reveal>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 625,
          display: "flex",
          gap: 24,
        }}
      >
        {["Denuvo", "Steam", "VMProtect", "Custom"].map((x, i) => (
          <Reveal
            key={x}
            at={list + i * 0.58}
            style={{
              fontFamily: F.mono,
              fontSize: 42,
              padding: "24px 32px",
              border: `1px solid ${i === 3 ? C.yellow : C.blue}`,
              background: "#16213a55",
              color: i === 3 ? C.yellow : C.white,
            }}
          >
            {i > 0 && <span style={{ color: C.gray, marginRight: 24 }}>+</span>}
            {x}
          </Reveal>
        ))}
      </div>
      <Reveal
        at={say(timing, 71) - 0.3}
        style={{
          position: "absolute",
          left: 1250,
          top: 760,
          fontSize: 31,
          color: C.yellow,
        }}
      >
        Custom · 厂商自定义保护
      </Reveal>
    </A3Scene>
  );
};
