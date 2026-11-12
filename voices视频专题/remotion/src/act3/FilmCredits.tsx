import { C, F } from "../style";
import { lerp, useTime } from "../components";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
import {
  Stage,
  Grid,
  Type,
  Stroke,
  Clip,
  pos,
  mono,
  ramp,
} from "./motion-shared";

const Tool = ({
  color = "#8bbfe1",
  title = "EA",
  sub = "EMULATOR",
  style,
}: {
  color?: string;
  title?: string;
  sub?: string;
  style?: React.CSSProperties;
}) => (
  <div style={{ width: 510, height: 360, position: "relative", ...style }}>
    <svg
      width={510}
      height={360}
      viewBox="0 0 510 360"
      style={{ ...pos, inset: 0 }}
    >
      <defs>
        <linearGradient id={`tool-${title}`} x2="1" y2="1">
          <stop stopColor="#34434f" />
          <stop offset="1" stopColor="#0a131c" />
        </linearGradient>
      </defs>
      <path
        d="M30 36H445L480 72V320H30Z"
        fill={`url(#tool-${title})`}
        stroke={color}
        strokeWidth={3}
      />
      {Array.from({ length: 14 }, (_, i) => (
        <g key={i} fill={color}>
          <rect x={50 + i * 28} y={17} width={12} height={25} />
          <rect x={50 + i * 28} y={316} width={12} height={24} />
        </g>
      ))}
      <path
        d="M60 75H240M60 85H190M390 285H450M415 275H450"
        stroke={color}
        opacity={0.35}
      />
    </svg>
    <div
      style={{
        ...pos,
        left: 65,
        top: 100,
        color,
        ...mono,
        fontSize: title.length > 4 ? 65 : 105,
      }}
    >
      {title}
    </div>
    <div
      style={{
        ...pos,
        left: 70,
        top: 240,
        color: C.white,
        ...mono,
        fontSize: 25,
        letterSpacing: 3,
      }}
    >
      {sub}
    </div>
  </div>
);

export const Thanks = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    entry = say(timing, 73),
    name = say(timing, 73, "anadius"),
    emulator = say(timing, 74);
  const scroll = lerp(t, entry - 0.3, entry + 0.8),
    focus = lerp(t, name - 0.25, name + 0.75),
    tool = lerp(t, emulator + 0.5, emulator + 1.3);
  return (
    <Stage
      label="NFO / 字段之外，还有别人的名字"
      source="V16｜2025-11-18 发行说明致谢 · 按本地原文重排，工具外形为示意"
    >
      <Grid tilt />
      <div
        style={{
          ...pos,
          left: 90,
          top: 165,
          width: 1770,
          translate: `0 ${-scroll * 420}px`,
          transformOrigin: "left center",
          scale: 1 + focus * 0.04,
        }}
      >
        <div style={{ ...mono, fontSize: 56, color: C.gray }}>PROTECTION</div>
        <div
          style={{ ...mono, fontSize: 110, marginTop: 25, color: "#a2c7df" }}
        >
          Denuvo + EA
        </div>
        <div
          style={{
            ...mono,
            marginTop: 210,
            fontSize: 52,
            color: C.gray,
            letterSpacing: 4,
          }}
        >
          GREETINGS TO
        </div>
        <div
          style={{
            ...mono,
            fontSize: 170 - tool * 30,
            color: focus > 0.2 ? C.yellow : C.white,
            marginTop: 18,
            letterSpacing: -8,
            translate: `${(1 - focus) * 12}px 0`,
          }}
        >
          anadius
          <span style={{ color: C.yellow, opacity: t % 1 < 0.45 ? 1 : 0 }}>
            _
          </span>
        </div>
        <div
          style={{
            width: (870 - tool * 120) * focus,
            height: 4,
            background: C.yellow,
            marginTop: 15,
          }}
        />
        <div
          style={{
            ...mono,
            fontSize: 42,
            lineHeight: 1.6,
            marginTop: 35,
            color: "#b8c4c9",
            opacity: scroll,
          }}
        >
          for his awesome
          <br />
          <span style={{ color: tool ? "#9ccbec" : C.white }}>
            EA emulator
          </span>{" "}
          used in this release.
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 1100,
          top: 300,
          opacity: tool,
          transform: `perspective(1400px) rotateX(${35 - tool * 12}deg) rotateY(${-25 + t * 0.3}deg) rotateZ(-9deg) translateY(${(1 - tool) * 500}px)`,
        }}
      >
        <Tool />
      </div>
      <svg width={1920} height={1080} style={{ ...pos, inset: 0 }}>
        <Stroke
          d="M800 620H970V480H1110"
          at={emulator + 0.6}
          duration={0.9}
          color="#8bbfe1"
        />
      </svg>
      <div
        style={{
          ...pos,
          left: 1160,
          top: 735,
          fontSize: 31,
          color: "#a2c7df",
          opacity: tool,
        }}
      >
        这次发行使用的 EA 模拟器
      </div>
    </Stage>
  );
};

export const SharedTool = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    author = say(timing, 76),
    other = say(timing, 77),
    join = say(timing, 78);
  const spread = lerp(t, other, other + 0.8),
    lock = lerp(t, join + 1, join + 2),
    movie = lerp(t, timing.duration - 2.25, timing.duration - 1.8);
  return (
    <Stage
      label="一项工具，怎样成为另一份发行的一部分"
      source="V16 致谢｜组件贡献关系示意，不代表软件实际内部结构 · 背景为 EA 官方游戏片段"
    >
      <Grid tilt />
      <div style={{ ...pos, inset: 0, opacity: movie }}>
        <Clip
          src="v38/act3/motion/nfs-pursuit.mp4"
          at={timing.duration - 4.1}
          duration={4.1}
          dim={0.2}
        />
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 150,
          fontSize: 55,
          opacity: 1 - movie,
        }}
      >
        模拟 EA 平台的验证环境
      </div>
      <div
        style={{
          ...pos,
          inset: 0,
          opacity: 1 - movie,
          transformOrigin: "50% 50%",
          scale: 1 - spread * 0.05,
        }}
      >
        <svg width={1920} height={1080} style={{ ...pos, inset: 0 }}>
          <path
            d="M-50 520H550M1060 520H1970"
            stroke="#76aaca44"
            strokeWidth={3}
            fill="none"
          />
          {Array.from({ length: 9 }, (_, i) => {
            const x = ((t * 170 + i * 230) % 2100) - 100;
            return (
              <rect
                key={i}
                x={x}
                y={511}
                width={45}
                height={18}
                rx={2}
                fill="#8bbfe1"
                opacity={0.7 * (1 - spread)}
              />
            );
          })}
          <Stroke
            d="M500 350V285H1430V380"
            at={other + 0.3}
            color={C.yellow}
            duration={1}
          />
        </svg>
        <div
          style={{
            ...pos,
            left: 560 - spread * 300 + lock * 320,
            top: 340,
            transform: `perspective(1400px) rotateX(${24 - lock * 15}deg) rotateY(${12 - lock * 12}deg) rotateZ(${-8 + lock * 8}deg)`,
            translate: `0 ${Math.sin(t * 0.7) * 8}px`,
          }}
        >
          <Tool />
          <div
            style={{
              ...mono,
              fontSize: 48,
              color: "#9ac6e2",
              marginTop: 25,
              opacity: lerp(t, author, author + 0.4),
            }}
          >
            anadius
          </div>
        </div>
        <div
          style={{
            ...pos,
            left: 1220 - lock * 145,
            top: 340,
            opacity: spread,
            transform: `perspective(1400px) rotateX(${24 - lock * 15}deg) rotateY(${-12 + lock * 12}deg) rotateZ(${8 - lock * 8}deg)`,
            translate: `${(1 - spread) * 800}px ${Math.sin(t * 0.7 + 1) * 8}px`,
          }}
        >
          <Tool color={C.yellow} title="Denuvo" sub="CRACK / VOICES38" />
          <div
            style={{ ...mono, fontSize: 48, color: C.yellow, marginTop: 25 }}
          >
            voices38
          </div>
        </div>
        <div
          style={{
            ...pos,
            left: 90,
            top: 710,
            fontSize: 28,
            color: C.gray,
            opacity: 1 - spread,
          }}
        >
          验证环境示意
        </div>
        <div
          style={{
            ...pos,
            left: 540,
            top: 265,
            width: 1080,
            height: 480,
            border: `2px solid ${C.yellow}`,
            opacity: lock,
            clipPath: `inset(0 ${(1 - lock) * 100}% 0 0)`,
            boxShadow: `0 0 ${lock * 70}px #ffc83d20`,
          }}
        />
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 180,
          opacity: movie,
          translate: `0 ${(1 - movie) * -70}px`,
          textShadow: "0 3px 25px #000",
        }}
      >
        <div style={{ ...mono, fontSize: 32, color: C.yellow }}>
          NEED FOR SPEED
        </div>
        <div style={{ ...mono, fontSize: 96, lineHeight: 1.1, marginTop: 20 }}>
          HOT PURSUIT
          <br />
          REMASTERED
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 725,
          fontSize: 35,
          opacity: lerp(t, join, join + 0.5),
          color: C.yellow,
          textShadow: "0 2px 15px #000",
        }}
      >
        分别贡献，共同组成这次发行。
      </div>
    </Stage>
  );
};
