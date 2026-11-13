import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../style";
import { useTime, lerp } from "../components";
import type { ShotTiming } from "../timing";
import { GroupMark } from "../act6/Picture";
import { say } from "./timing";
import { Stage, Kicker, SourceImage, pos, mono, lin } from "./Stage";

// Each real source follows the same camera move, with a separate entrance.
const EvidenceRibbon = ({
  index,
  at,
  fold,
  label,
  claim,
  children,
}: {
  index: number;
  at: number;
  fold: number;
  label: string;
  claim: string;
  children: ReactNode;
}) => {
  const t = useTime(),
    enter = lerp(t, at, at + 0.65),
    p = lerp(t, fold, fold + 1.65),
    drift = lin(t, 0, 10);
  const width = 1250,
    scale = 1 - p * 0.56;
  return (
    <div
      style={{
        ...pos,
        left: 100 + (1 - p) * (index * 85 + drift * 35),
        top: 150 + index * 205,
        width,
        height: 190,
        transformOrigin: "left center",
        transform: `perspective(1800px) translateX(${(1 - enter) * (index === 1 ? 1800 : -1600)}px) rotateY(${(1 - enter) * 24 + p * -9}deg) rotateZ(${(1 - p) * [-3, 2, -2][index] + p * Math.sin(t * 0.65 + index) * 1.6}deg) scale(${scale})`,
        opacity: enter,
        boxShadow: "0 25px 70px #0009",
        background: index === 1 ? "#102c35" : C.paper,
        color: index === 1 ? C.white : C.ink,
        overflow: "hidden",
      }}
    >
      <div
        style={{ ...pos, inset: "20px 365px 20px 24px", overflow: "hidden" }}
      >
        {children}
      </div>
      <div
        style={{
          ...pos,
          right: 0,
          top: 0,
          bottom: 0,
          width: 335,
          background: index === 1 ? "#183d46" : "#ded8c9",
          padding: "25px 20px",
        }}
      >
        <div style={{ ...mono, fontSize: 27, marginBottom: 15 }}>{label}</div>
        <div style={{ fontSize: 52, whiteSpace: "nowrap" }}>{claim}</div>
      </div>
      <div
        style={{
          ...pos,
          left: -90 + (((t - at) * 190) % 1450),
          top: 0,
          bottom: 0,
          width: 90,
          opacity: 0.15,
          background: "linear-gradient(90deg,transparent,#fff,transparent)",
        }}
      />
    </div>
  );
};

export const OpenQuestion = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    different = say(timing, 205),
    analysis = say(timing, 206),
    finish = say(timing, 206, "把这件事"),
    p = lerp(t, different, different + 1.65),
    draw = lin(t, analysis + 0.2, finish + 0.5),
    camera = lin(t, analysis, timing.duration),
    end = lerp(t, finish, finish + 0.8);
  return (
    <Stage
      name="A7-06 · 独立分析？"
      source="公开证据边界｜截至文稿资料期；保留不同来源各自的说法"
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${58 + Math.sin(t * 0.4) * 14}% 48%,#254a58,#071018 74%)`,
        }}
      />
      <svg
        width="1920"
        height="1080"
        style={{ ...pos, inset: 0, opacity: 0.22 }}
      >
        {Array.from({ length: 14 }, (_, i) => (
          <path
            key={i}
            d={`M${-500 + i * 210 + t * 25} 0l-500 1080`}
            stroke="#73949d"
            strokeWidth="1"
          />
        ))}
        <circle
          cx="1410"
          cy="470"
          r={300 + t * 9}
          fill="none"
          stroke="#77989e"
          strokeDasharray="2 20"
        />
      </svg>
      <Kicker>07 / 一道尚未解开的题</Kicker>
      <EvidenceRibbon
        index={0}
        at={0}
        fold={different}
        label="TechSpot"
        claim="移除"
      >
        <SourceImage
          name="techspot-title.png"
          style={{ width: 845, marginTop: 20 }}
        />
      </EvidenceRibbon>
      <EvidenceRibbon
        index={1}
        at={0.62}
        fold={different}
        label="KiriGiri"
        claim="VM 仍运行"
      >
        <GroupMark
          name="denuvowo"
          width={390}
          style={{ position: "absolute", left: 0, top: -36 }}
        />
        <div
          style={{ ...pos, left: 430, top: 48, fontSize: 28, color: "#c4dfdc" }}
        >
          经媒体转述
        </div>
      </EvidenceRibbon>
      <EvidenceRibbon
        index={2}
        at={1.24}
        fold={different}
        label="DSOGaming"
        claim="绕过"
      >
        <div style={{ ...mono, fontSize: 32, lineHeight: 1.6, marginTop: 20 }}>
          “this crack is also
          <br />
          bypassing Denuvo.”
        </div>
      </EvidenceRibbon>
      <div
        style={{
          ...pos,
          left: 1550,
          top: 180,
          ...mono,
          fontSize: 410,
          lineHeight: 1,
          color: C.yellow,
          opacity: lerp(t, 1.2, 1.9) * (1 - p),
          transform: `rotateY(${-t * 7}deg) translateZ(${t * 18}px)`,
        }}
      >
        ?
      </div>
      <svg
        width="1920"
        height="1080"
        style={{ ...pos, inset: 0, opacity: p * 0.6 }}
      >
        {[245, 450, 655].map((y, i) => (
          <g key={y}>
            <path
              d={`M660 ${y}C850 ${y} 790 500 1000 500`}
              fill="none"
              stroke="#81a7b2"
              strokeDasharray="4 10"
            />
            <path
              d={`M660 ${y}C850 ${y} 790 500 1000 500`}
              pathLength="100"
              fill="none"
              stroke={C.yellow}
              strokeWidth="3"
              strokeDasharray="5 95"
              strokeDashoffset={-((t * 27 + i * 31) % 100)}
            />
          </g>
        ))}
      </svg>
      <div
        style={{
          ...pos,
          left: 870,
          top: 150,
          width: 900,
          height: 650,
          opacity: lerp(t, analysis - 0.25, analysis + 0.35),
          transformOrigin: "55% 55%",
          transform: `perspective(1500px) rotateY(${-10 + camera * 10}deg) scale(${0.94 + camera * 0.12})`,
          translate: `${(1 - p) * 260 - camera * 22}px 0`,
        }}
      >
        <div style={{ fontSize: 76, color: C.white, display: "flex", gap: 24 }}>
          <span style={{ opacity: lerp(t, analysis, analysis + 0.4) }}>
            公开
          </span>
          <span
            style={{
              color: C.yellow,
              opacity: lerp(t, analysis + 0.75, analysis + 1.1),
            }}
          >
            ·
          </span>
          <span style={{ opacity: lerp(t, analysis + 0.85, analysis + 1.25) }}>
            独立
          </span>
        </div>
        <div
          style={{
            fontSize: 150,
            marginTop: 20,
            clipPath: `inset(0 ${100 * (1 - lerp(t, analysis + 1.4, analysis + 2))}% 0 0)`,
          }}
        >
          分析
        </div>
        <svg
          width="900"
          height="430"
          style={{ ...pos, left: 0, top: 170, overflow: "visible" }}
        >
          <path
            d="M455 180C455 100 505 50 582 50C675 50 712 105 690 162C673 208 580 222 580 289"
            pathLength="100"
            fill="none"
            stroke={C.yellow}
            strokeWidth="28"
            strokeLinecap="round"
            strokeDasharray="100"
            strokeDashoffset={100 * (1 - draw)}
          />
          <circle
            cx="580"
            cy="352"
            r={15 * lerp(t, finish - 0.3, finish + 0.25)}
            fill={C.yellow}
          />
          <circle
            cx="580"
            cy="352"
            r={18 + end * 55}
            fill="none"
            stroke={C.yellow}
            opacity={(1 - end) * 0.7}
          />
          <path
            d="M0 370H325"
            fill="none"
            stroke="#83a7b2"
            strokeWidth="2"
            strokeDasharray="325"
            strokeDashoffset={325 * (1 - lin(t, analysis + 1, finish + 1))}
          />
          <path
            d={`M${camera * 280} 362v16`}
            stroke={C.yellow}
            strokeWidth="3"
          />
        </svg>
        <div
          style={{
            ...pos,
            left: 0,
            top: 585,
            fontSize: 30,
            color: "#bfd0d3",
            opacity: lerp(t, finish, finish + 0.45),
          }}
        >
          还没有公开的独立结论
        </div>
      </div>
    </Stage>
  );
};
