import { GroupMark } from "../act6/Picture";
import { C, F } from "../style";
import { useTime, lerp } from "../components";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
import {
  Stage,
  Field,
  PageMark,
  pos,
  mono,
  names,
  mix,
  linear,
  Stroke,
} from "./shared";

export const VisibleWork = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    funds = say(timing, 149, "一群捐款"),
    tests = say(timing, 150),
    component = say(timing, 150, "还有");
  const fund = lerp(t, funds - 0.15, funds + 0.65),
    test = lerp(t, tests - 0.15, tests + 0.9),
    tool = lerp(t, component - 0.1, component + 0.7);
  const close = lerp(t, timing.duration - 1.1, timing.duration - 0.12);
  const phase = t * 0.18;
  return (
    <Stage
      label="公开留下的协作痕迹"
      source="voices38 发行说明中的支持者、测试者与组件致谢"
    >
      <Field speed={1.5} />
      <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
        <ellipse
          cx="960"
          cy="462"
          rx={590 + close * 100}
          ry="255"
          stroke="#7aa1a9"
          fill="none"
          opacity=".17"
          transform={`rotate(${t * 3} 960 462)`}
        />
        {[0, 1, 2].map((i) => {
          const a = phase + i * 2.1;
          return (
            <g key={i} opacity={0.17 * (1 - test)}>
              <PageMark
                x={960 + Math.cos(a) * 520}
                y={470 + Math.sin(a) * 250}
                size={0.65}
                label="NFO"
              />
            </g>
          );
        })}
        <Stroke
          d="M360 525C550 700 720 620 875 505"
          at={funds}
          color={C.yellow}
        />
        <Stroke
          d="M1350 240C1300 350 1180 420 1080 460"
          at={component}
          color="#79c4ce"
        />
        {Array.from({ length: 6 }, (_, i) => {
          const q = ((t - funds) * 0.7 + i / 6) % 1;
          if (t < funds || q < 0) return null;
          return (
            <circle
              key={i}
              cx={mix(360, 875, q)}
              cy={mix(525, 505, q) + Math.sin(q * Math.PI) * 105}
              r="4"
              fill={C.yellow}
              opacity={fund * Math.sin(q * Math.PI)}
            />
          );
        })}
        {names.map((name, i) => {
          const a = (i / 34) * Math.PI * 2 + phase * 0.4,
            x = 960 + Math.cos(a) * 670,
            y = 465 + Math.sin(a) * 285;
          const flight = linear(t, tests + i * 0.014, tests + 0.8 + i * 0.014),
            pulse = (t * 0.8 + i * 0.11) % 1;
          return (
            <g key={name} opacity={test}>
              <path
                d={`M${x} ${y}Q${960 + Math.cos(a) * 270} ${465 + Math.sin(a) * 70} 960 465`}
                stroke={C.blue}
                strokeWidth="1"
                opacity=".17"
              />
              <circle
                cx={mix(x, 960, pulse)}
                cy={mix(y, 465, pulse)}
                r="2"
                fill="#83bdc2"
                opacity={Math.sin(pulse * Math.PI) * 0.7}
              />
              <circle
                cx={mix(960, x, flight)}
                cy={mix(465, y, flight)}
                r={i % 5 === 0 ? 4 : 2}
                fill={C.yellow}
              />
            </g>
          );
        })}
        <g
          opacity={tool}
          transform={`translate(${lerp(t, component + 0.1, component + 1.1, 1350, 1025)} ${lerp(t, component + 0.1, component + 1.1, 280, 590)}) rotate(${lerp(t, component + 0.1, component + 1.1, 12, 0)})`}
        >
          <PageMark size={0.7} label="EA" color="#79c4ce" />
        </g>
        <g opacity={lerp(t, component + 0.7, component + 1.2)}>
          <PageMark x={960} y={627} size={1.05} label="NFO" color={C.yellow} />
        </g>
      </svg>
      <GroupMark
        name="voices38"
        width={540}
        style={{ ...pos, left: 690, top: 365 }}
      />
      <div
        style={{
          ...pos,
          left: 770,
          top: 535,
          fontSize: 28,
          color: C.gray,
          opacity: lerp(t, 0.65, 1.2),
        }}
      >
        对外说话的署名
      </div>
      <div
        style={{
          ...pos,
          left: 135,
          top: 410,
          opacity: fund,
          translate: `${(1 - fund) * -180}px 0`,
        }}
      >
        <div style={{ fontSize: 48, color: C.yellow }}>资金支持者</div>
        <div
          style={{
            ...mono,
            fontSize: 25,
            lineHeight: 1.8,
            color: "#b7c6cb",
            marginTop: 20,
          }}
        >
          Sin / Pantheon
          <br />
          BachhalxJatt / 1 unknown
        </div>
        <div style={{ fontSize: 27, color: C.gray, marginTop: 20 }}>资助</div>
      </div>
      <div
        style={{
          ...pos,
          left: 1120,
          top: 147,
          opacity: tool,
          translate: `0 ${(1 - tool) * -90}px`,
        }}
      >
        <div style={{ ...mono, fontSize: 58, color: "#8bd0da" }}>anadius</div>
        <div style={{ fontSize: 32, marginTop: 10 }}>EA 模拟器 · 组件使用</div>
      </div>
      <div
        style={{
          ...pos,
          left: 1230,
          top: 654,
          opacity: test,
          translate: `${(1 - test) * 220}px 0`,
        }}
      >
        <div style={{ fontSize: 47, color: C.yellow }}>三十多个测试者</div>
        <div
          style={{
            ...mono,
            fontSize: 24,
            marginTop: 22,
            lineHeight: 1.5,
            color: "#b7c6cb",
          }}
        >
          Eru Iluvatar / Arix
          <br />
          Sun_Goku / Solid Snake / …
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 690,
          top: 782,
          opacity: close,
          ...mono,
          fontSize: 35,
          letterSpacing: 4,
          color: C.yellow,
        }}
      >
        SPECIAL THANKS
      </div>
    </Stage>
  );
};
