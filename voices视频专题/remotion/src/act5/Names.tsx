import { Sequence, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { C, F } from "../style";
import { useTime, lerp } from "../components";
import { publicAsset } from "../assets";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
import {
  Stage,
  Field,
  Cloud,
  cloudPoint,
  names,
  sourcePositions,
  pos,
  mono,
  mix,
  smooth,
  linear,
  clamp,
} from "./shared";

const TesterHeading = ({ opacity = 1 }: { opacity?: number }) => (
  <div style={{ ...pos, left: 150, top: 190, width: 1640, opacity }}>
    <div style={{ ...mono, fontSize: 24, color: C.blue, marginBottom: 29 }}>
      PRAGMATA-voices38 / 2026.05.14
    </div>
    <div style={{ ...mono, fontSize: 34, lineHeight: 1.5 }}>
      Special thanks to the testers
      <br />
      who ensured quality of this release:
    </div>
  </div>
);

export const MoonList = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    { fps } = useVideoConfig(),
    kind = say(timing, 138),
    moon = say(timing, 138, "在月球");
  const dive = smooth(t, timing.duration - 0.9, timing.duration - 0.06);
  const mask = lerp(t, kind - 0.3, kind + 0.6);
  return (
    <Stage
      label="05 / 三十四个化名"
      source="PRAGMATA 宣传片｜CAPCOM · 用户提供 IGN 转载｜NFO 据 V14 文本重排"
    >
      <Field />
      <Sequence
        name="PRAGMATA 原速动作"
        durationInFrames={Math.round(timing.duration * fps)}
      >
        <div
          style={{
            ...pos,
            inset: 0,
            clipPath: `inset(0 ${dive * 100}% 0 0)`,
            opacity: 1 - dive,
          }}
        >
          <Video
            src={publicAsset("v38/revision/pragmata-new.mp4")}
            muted
            style={{ width: 1920, height: 1080, objectFit: "cover" }}
          />

          <div
            style={{
              ...pos,
              inset: 0,
              background: "linear-gradient(90deg,#020b10c0,transparent 70%)",
            }}
          />
          <div
            style={{
              ...pos,
              left: 0,
              right: 0,
              bottom: 0,
              height: 180,
              background: "linear-gradient(0deg,#040b10 75%,transparent)",
            }}
          />
        </div>
      </Sequence>
      <div
        style={{
          ...pos,
          left: 110,
          top: 170,
          opacity: 1 - dive,
          translate: `${-dive * 900}px 0`,
        }}
      >
        <div style={{ ...mono, fontSize: 33, color: C.yellow }}>2026.05</div>
        <div style={{ fontSize: 106, marginTop: 18 }}>识质存在</div>
        <div
          style={{ ...mono, fontSize: 45, letterSpacing: 12, color: "#b9ced5" }}
        >
          PRAGMATA
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 110,
          top: 565,
          width: 1650,
          translate: `0 ${lerp(t, kind, kind + 0.6, 200, 0) - dive * 900}px`,
          opacity: mask * (1 - dive),
        }}
      >
        <span style={{ ...mono, fontSize: 30, color: C.yellow }}>KIND / </span>
        <span style={{ ...mono, fontSize: 49 }}>
          Fighting Rogue AI on the Moon
        </span>
        <div
          style={{
            fontSize: 59,
            color: C.yellow,
            marginTop: 24,
            clipPath: `inset(0 ${(1 - lerp(t, moon, moon + 0.55)) * 100}% 0 0)`,
          }}
        >
          在月球上，跟失控的 AI 打架
        </div>
      </div>
      <div
        style={{
          ...pos,
          inset: 0,
          background: "#060d12",
          opacity: dive,
          transform: `perspective(1600px) rotateY(${(1 - dive) * -36}deg) rotateZ(${(1 - dive) * 8}deg) scale(${0.55 + dive * 0.45})`,
          translate: `${(1 - dive) * 1600}px ${(1 - dive) * -230}px`,
        }}
      >
        <Field speed={0.6} />
        <TesterHeading />
        <Cloud spread={0} />
        <div
          style={{
            ...pos,
            left: 142,
            top: 352,
            width: 1420,
            height: 2,
            background: C.yellow,
          }}
        />
      </div>
    </Stage>
  );
};

export const ThirtyFour = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    thanks = say(timing, 139, "特别感谢"),
    number = say(timing, 140);
  const detach = lerp(t, number - 0.7, number + 1.4),
    phase = 0.4 * detach;
  const count = Math.min(34, Math.ceil(linear(t, thanks, number + 0.55) * 34));
  return (
    <Stage
      label="PRAGMATA / TESTERS"
      source="34 个测试者署名｜V14 NFO 文本重排｜空间排列为动效设计"
    >
      <Field speed={1.4} />
      <div
        style={{
          ...pos,
          inset: 0,
          translate: `0 ${-detach * 210}px`,
          opacity: 1 - detach,
        }}
      >
        <TesterHeading />
        <div
          style={{
            ...pos,
            left: 150,
            top: 365,
            fontSize: 40,
            color: C.yellow,
            opacity: lerp(t, thanks, thanks + 0.4),
          }}
        >
          特别感谢，确保这次发行质量的测试者
        </div>
      </div>
      <svg
        width="1920"
        height="1080"
        style={{ ...pos, inset: 0, opacity: Math.sin(detach * Math.PI) * 0.6 }}
      >
        {names.map((_, i) => {
          const a = sourcePositions[i],
            b = cloudPoint(i, phase);
          return (
            <path
              key={i}
              d={`M${a.x} ${a.y}Q960 460 ${b.x} ${b.y}`}
              fill="none"
              stroke={C.blue}
              strokeWidth="1"
            />
          );
        })}
      </svg>
      <Cloud spread={detach} phase={phase} />
      <div
        style={{
          ...pos,
          left: 1330,
          top: 78,
          fontFamily: F.mono,
          fontSize: 125,
          color: C.yellow,
          opacity: lerp(t, thanks, thanks + 0.5),
          zIndex: 25,
        }}
      >
        {String(count).padStart(2, "0")}
        <span
          style={{
            fontFamily: F.cn,
            fontSize: 30,
            marginLeft: 15,
            color: C.gray,
          }}
        >
          个化名
        </span>
      </div>
      <div
        style={{
          ...pos,
          left: 140,
          top: 785,
          fontSize: 32,
          color: C.blue,
          opacity: detach,
        }}
      >
        名单中记下的，是参与测试的人。
      </div>
    </Stage>
  );
};

const Book = ({ t }: { t: number }) => {
  const open = lerp(t, 0.05, 0.8);
  return (
    <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
      <defs>
        <radialGradient id="book-glow">
          <stop stopColor="#ffd77d" stopOpacity=".23" />
          <stop offset="1" stopColor="#ffd77d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse
        cx="960"
        cy="600"
        rx="680"
        ry="320"
        fill="url(#book-glow)"
        opacity={open}
      />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(960 670) scale(${open} 1)`}>
          <path
            d={`M0 0Q-180 ${-90 - i * 12} -420 ${-25 - i * 12}L-400 ${-205 - i * 9}Q-180 ${-260 - i * 9} 0 -165Q180 ${-260 - i * 9} 400 ${-205 - i * 9}L420 ${-25 - i * 12}Q180 ${-90 - i * 12} 0 0`}
            fill={i === 3 ? "#c8bb98" : "#17252c"}
            stroke="#e0c181"
            strokeWidth="2"
          />
        </g>
      ))}
      <path d="M960 505V670" stroke="#8c7142" strokeWidth="3" />
      {Array.from({ length: 14 }, (_, i) => {
        const a = t * 0.9 + i * 0.67,
          r = 100 + i * 17;
        return (
          <circle
            key={i}
            cx={960 + Math.cos(a) * r}
            cy={590 - i * 16 - Math.sin(t * 2 + i) * 12}
            r={i % 3 === 0 ? 3 : 1.5}
            fill={C.yellow}
            opacity={open * (0.2 + (i % 3) * 0.15)}
          />
        );
      })}
    </svg>
  );
};
const Boss = ({ t }: { t: number }) => {
  const p = lerp(t, 0.05, 0.65),
    pulse = 1 + Math.sin(t * 7) * 0.012;
  const pixelRows = [
    "1100000000000011",
    "0110000000000110",
    "0011111111111100",
    "0001111111111000",
    "0001100110011000",
    "0001111111111000",
    "0000110110110000",
    "0000011111100000",
    "0000001111000000",
  ];
  return (
    <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
      <g transform={`translate(640 410) scale(${2.1 * pulse})`} opacity={p}>
        {pixelRows.flatMap((row, y) =>
          [...row].map((v, x) =>
            v === "1" ? (
              <rect
                key={`${x}:${y}`}
                x={x * 19}
                y={y * 19}
                width="18"
                height="18"
                fill={y === 4 && (x === 6 || x === 9) ? C.yellow : "#bc513d"}
                opacity={lerp(
                  t,
                  x * 0.014 + y * 0.018,
                  0.4 + x * 0.014 + y * 0.018,
                )}
              />
            ) : null,
          ),
        )}
      </g>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${630 - i * 45} ${760 + i * 20}H${1290 + i * 45}`}
          stroke="#9f382c"
          opacity={0.5 - i * 0.13}
        />
      ))}
    </svg>
  );
};
const Freedom = ({ t }: { t: number }) => {
  const p = lerp(t, 0.6, 1.3);
  return (
    <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
      <g transform="translate(960 590)">
        <path
          d={`M-73 -30V-100C-73 -200 73 -200 73 -100V${-30 - p * 80}`}
          fill="none"
          stroke={C.yellow}
          strokeWidth="17"
          transform={`translate(${p * 60} ${-p * 80}) rotate(${p * 32})`}
        />
        <rect
          x="-113"
          y="-35"
          width="226"
          height="170"
          rx="12"
          fill="#17252d"
          stroke={C.yellow}
          strokeWidth="3"
        />
        <circle cx="0" cy="30" r="16" fill={C.yellow} />
        <path d="M0 42V85" stroke={C.yellow} strokeWidth="10" />
      </g>
      {[-1, 1].map((side) => (
        <g
          key={side}
          transform={`translate(${960 + side * p * 730} 580)`}
          opacity={1 - p * 0.85}
        >
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={side * (180 + i * 112) - 40}
              y="-45"
              width="115"
              height="65"
              rx="30"
              fill="none"
              stroke={C.blue}
              strokeWidth="13"
            />
          ))}
        </g>
      ))}
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i * Math.PI) / 8;
        return (
          <path
            key={i}
            d={`M${960 + Math.cos(a) * (160 + p * 400)} ${590 + Math.sin(a) * (80 + p * 150)}l${Math.cos(a) * 45} ${Math.sin(a) * 20}`}
            stroke={C.yellow}
            opacity={Math.sin(p * Math.PI) * 0.8}
          />
        );
      })}
    </svg>
  );
};

export const Aliases = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    a = say(timing, 141),
    b = say(timing, 142),
    c = say(timing, 143);
  const focus = t < c ? "IconOfSin" : "DRM-Free-FTW";
  const chosen = t < b ? "Eru Iluvatar" : focus;
  // Stable source cylinder; camera travels to each real entry, rather than swapping cards.
  const targets = ["Eru Iluvatar", "IconOfSin", "DRM-Free-FTW"].map((n) =>
    cloudPoint(names.indexOf(n), 0.4),
  );
  const p0 = lerp(t, a - 0.1, a + 0.65),
    p1 = lerp(t, b - 0.12, b + 0.55),
    p2 = lerp(t, c - 0.12, c + 0.55);
  let x = mix(960, targets[0].x, p0),
    y = mix(360, targets[0].y + 70, p0);
  x = mix(mix(x, targets[1].x, p1), targets[2].x, p2);
  y = mix(mix(y, targets[1].y + 70, p1), targets[2].y + 70, p2);
  const last = t < c ? (t < b ? a : b) : c,
    explain =
      t < b
        ? say(timing, 141, "托尔金")
        : t < c
          ? say(timing, 142, "《毁灭")
          : say(timing, 143, "无 DRM");
  const tilt = Math.sin(linear(t, last, last + 0.55) * Math.PI) * 5;
  return (
    <Stage
      label="化名里的游戏与故事"
      source="公开昵称及文稿释义｜V14｜书页、像素轮廓、开锁均为图解"
    >
      <Field speed={2} />
      <div
        style={{
          ...pos,
          inset: 0,
          opacity: lerp(t, last, last + 0.3),
          rotate: `${tilt}deg`,
        }}
      >
        {t < b ? (
          <Book t={t - a} />
        ) : t < c ? (
          <Boss t={t - b} />
        ) : (
          <Freedom t={t - c} />
        )}
      </div>
      <Cloud
        phase={0.4}
        focus={chosen}
        zoom={mix(1, 2.55, p0)}
        pan={{ x, y }}
      />
      <div
        style={{
          ...pos,
          left: 100,
          right: 100,
          top: 777,
          textAlign: "center",
          fontSize: 50,
          color: C.yellow,
          opacity: lerp(t, explain - 0.2, explain + 0.3),
          translate: `0 ${lerp(t, explain - 0.2, explain + 0.4, 24, 0)}px`,
        }}
      >
        {t < b
          ? "托尔金笔下的造物主"
          : t < c
            ? "《毁灭战士 2》的最终 Boss"
            : "无 DRM 万岁"}
      </div>
    </Stage>
  );
};
