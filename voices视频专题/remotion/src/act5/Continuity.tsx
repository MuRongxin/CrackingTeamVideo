import { C, F } from "../style";
import { useTime, lerp } from "../components";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
import testers from "./testers.json";
import {
  Stage,
  Field,
  pos,
  mono,
  linear,
  mix,
  smooth,
  PageMark,
} from "./shared";
const listPos = (i: number, right = false) => ({
  x: (right ? 1250 : 135) + (i >= 17 ? 270 : 0),
  y: 315 + (i % 17) * 28,
});
export const ReturningNames = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    travel = say(timing, 144, "参与"),
    p = lerp(t, travel - 0.2, travel + 1.3);
  return (
    <Stage
      label="2026.05.14 → 2026.06.09 / 名字延续"
      source="V14 ↔ V15 测试者字段｜据文本重排，仅连接完全相同的昵称"
    >
      <Field speed={1.8} />
      <div
        style={{
          ...pos,
          inset: 0,
          translate: `${lerp(t, 0, timing.duration, 35, -25)}px 0`,
        }}
      >
        <div
          style={{
            ...pos,
            left: 130,
            top: 147,
            ...mono,
            fontSize: 45,
            color: C.white,
          }}
        >
          PRAGMATA
        </div>
        <div
          style={{
            ...pos,
            left: 130,
            top: 215,
            ...mono,
            fontSize: 27,
            color: C.blue,
          }}
        >
          2026.05.14 / 34
        </div>
        <div
          style={{
            ...pos,
            left: 1250,
            top: 147,
            ...mono,
            fontSize: 45,
            color: C.white,
          }}
        >
          007 FIRST LIGHT
        </div>
        <div
          style={{
            ...pos,
            left: 1250,
            top: 215,
            ...mono,
            fontSize: 27,
            color: C.blue,
          }}
        >
          2026.06.09 / 29
        </div>
        <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
          <path
            d="M110 279H760M1230 279H1850"
            stroke={C.blue}
            strokeWidth="2"
          />
          {testers.exactMatches.map((name, i) => {
            const a = listPos(testers.pragmata.names.indexOf(name)),
              b = listPos(testers.bond.names.indexOf(name), true);
            const d = `M${a.x + 150} ${a.y + 12}C900 ${a.y + 12},1030 ${b.y + 12},${b.x - 20} ${b.y + 12}`;
            const q = linear(
              t,
              travel - 0.25 + i * 0.022,
              travel + 0.8 + i * 0.022,
            );
            return (
              <g key={name}>
                <path
                  d={d}
                  fill="none"
                  stroke={C.blue}
                  opacity={0.14 * p}
                  strokeWidth="1"
                />
                <path
                  d={d}
                  fill="none"
                  stroke={C.yellow}
                  strokeWidth="2"
                  pathLength="1"
                  strokeDasharray=".04 .96"
                  strokeDashoffset={-q}
                  opacity={Math.sin(q * Math.PI) * 0.75}
                />
              </g>
            );
          })}
        </svg>
        {testers.pragmata.names.map((name, i) => {
          const a = listPos(i),
            matched = testers.exactMatches.includes(name);
          return (
            <div
              key={name}
              style={{
                ...pos,
                left: a.x,
                top: a.y,
                ...mono,
                fontSize: 22,
                color: matched ? C.white : "#4b6370",
                opacity: matched ? 1 - p * 0.45 : 0.6,
              }}
            >
              {name}
            </div>
          );
        })}
        {testers.bond.names.map((name, i) => {
          const b = listPos(i, true),
            matched = testers.exactMatches.includes(name);
          return (
            <div
              key={name}
              style={{
                ...pos,
                left: b.x,
                top: b.y,
                ...mono,
                fontSize: 22,
                color: matched ? C.yellow : "#4b6370",
                opacity: matched
                  ? lerp(t, travel + 0.4 + i * 0.02, travel + 0.8 + i * 0.02)
                  : 0.6,
              }}
            >
              {name}
            </div>
          );
        })}
        {testers.exactMatches.map((name, i) => {
          const a = listPos(testers.pragmata.names.indexOf(name)),
            b = listPos(testers.bond.names.indexOf(name), true),
            q = smooth(t, travel - 0.25 + i * 0.022, travel + 0.8 + i * 0.022);
          const x = mix(a.x, b.x, q),
            y =
              mix(a.y, b.y, q) +
              Math.sin(q * Math.PI) * (i % 2 === 0 ? -85 : 85);
          return (
            <div
              key={name}
              style={{
                ...pos,
                left: x,
                top: y,
                ...mono,
                fontSize: 22,
                color: C.yellow,
                opacity: Math.sin(q * Math.PI),
                textShadow: "0 0 16px #ffcc4d90",
                scale: 1 + Math.sin(q * Math.PI) * 0.15,
              }}
            >
              {name}
            </div>
          );
        })}
        <div
          style={{
            ...pos,
            left: 830,
            top: 180,
            width: 320,
            textAlign: "center",
            opacity: lerp(t, travel, travel + 0.5),
            background: "#060d12d9",
            padding: "12px 0",
          }}
        >
          <span style={{ ...mono, fontSize: 83, color: C.yellow }}>
            {Math.round(p * 26)}
          </span>
          <div style={{ fontSize: 28, color: C.gray }}>完全同名</div>
        </div>
      </div>
    </Stage>
  );
};

const Floppy = ({
  x,
  y,
  angle = 0,
  size = 1,
  open = 0,
}: {
  x: number;
  y: number;
  angle?: number;
  size?: number;
  open?: number;
}) => (
  <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${size})`}>
    <path
      d="M-58-65H42L62-43V65H-58Z"
      fill="#1a2c38"
      stroke={C.blue}
      strokeWidth="3"
    />
    <path d="M-30-65H30V-12H-30Z" fill="#a1b3bb" />
    <path d="M10-60V-24" stroke="#263944" strokeWidth="12" />
    <rect x="-40" y="18" width="80" height="45" fill={C.paper} />
    <path
      d={`M-12 34V${21 - open * 25}C-12 ${7 - open * 25} 12 ${7 - open * 25} 12 ${21 - open * 25}V${34 - open * 25}`}
      fill="none"
      stroke={C.ink}
      strokeWidth="3"
    />
    <rect x="-18" y="32" width="36" height="23" rx="3" fill={C.ink} />
  </g>
);
export const UnknownStructure = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    unknown = say(timing, 148),
    cut = lerp(t, unknown, unknown + 0.9);
  const travel = linear(t, 0.12, say(timing, 147, "各有专人"));
  const x = 170 + travel * 1430,
    compress = lerp(t, 2, 2.55),
    unpack = lerp(t, 3, 3.4);
  const stages = [
    { x: 240, label: "供应" },
    { x: 700, label: "破解" },
    { x: 1140, label: "打包" },
    { x: 1570, label: "传递" },
  ];
  return (
    <Stage
      label="分工与身份 / 可以看见什么"
      source="早年分工为历史示意｜voices38 的组织结构未公开｜研究主档 D.1、D.7"
    >
      <Field speed={2 - cut} />
      <div
        style={{
          ...pos,
          inset: 0,
          translate: `${-cut * 2100}px 0`,
          rotate: `${cut * -6}deg`,
          opacity: 1 - cut,
        }}
      >
        <div
          style={{ ...pos, left: 115, top: 150, fontSize: 36, color: C.gray }}
        >
          早年的分工
        </div>
        <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
          <path d="M80 610H1820" stroke="#526f79" strokeWidth="4" />
          {Array.from({ length: 23 }, (_, i) => (
            <circle
              key={i}
              cx={80 + i * 79}
              cy="636"
              r="16"
              fill="none"
              stroke="#38505e"
              strokeWidth="3"
              strokeDasharray="14 5"
              transform={`rotate(${t * 130} ${80 + i * 79} 636)`}
            />
          ))}
          {stages.map((s, i) => (
            <g key={s.label}>
              <path
                d={`M${s.x - 95} 590V390h190v200`}
                fill="none"
                stroke={C.blue}
                strokeWidth="3"
              />
              <text
                x={s.x}
                y="335"
                textAnchor="middle"
                fill={t > i * 0.65 ? C.yellow : C.gray}
                fontFamily={F.cn}
                fontSize="52"
              >
                {s.label}
              </text>
              <circle
                cx={s.x + 74}
                cy="414"
                r="5"
                fill={t > i * 0.65 ? C.yellow : C.gray}
              />
            </g>
          ))}
          <Floppy
            x={x}
            y={535 - Math.sin(travel * Math.PI * 5) * 8}
            angle={Math.sin(t * 5) * 3}
            size={1 - compress * 0.2}
            open={lerp(t, 0.9, 1.5)}
          />
          <g
            transform={`translate(1140 ${430 + Math.sin(linear(t, 2, 2.7) * Math.PI) * 70})`}
            opacity={1 - cut}
          >
            <path
              d="M-95-15H95M-95-15V55M95-15V55"
              stroke={C.yellow}
              strokeWidth="7"
              fill="none"
            />
          </g>
          {Array.from({ length: 9 }, (_, i) => {
            const q = (t * 1.4 + i * 0.14) % 1;
            return (
              <path
                key={i}
                d={`M${1620 + q * 260} ${465 + (i % 3) * 27}h25`}
                stroke={C.yellow}
                opacity={unpack * (1 - q)}
              />
            );
          })}
        </svg>
      </div>
      <div style={{ ...pos, inset: 0, opacity: cut }}>
        <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4,
              r = 300;
            const endX = 960 + Math.cos(a) * r,
              endY = 440 + Math.sin(a) * r * 0.7;
            const retract = lerp(t, unknown + 0.65, unknown + 1.5);
            return (
              <g key={i} opacity={1 - retract}>
                <path
                  d={`M960 440L${mix(endX, 960, retract)} ${mix(endY, 440, retract)}`}
                  stroke={C.blue}
                  strokeDasharray="5 12"
                />
                <rect
                  x={endX - 42}
                  y={endY - 26}
                  width="84"
                  height="52"
                  fill="none"
                  stroke={C.blue}
                  strokeDasharray="6 8"
                  transform={`rotate(${retract * (i % 2 ? 20 : -20)} ${endX} ${endY})`}
                />
              </g>
            );
          })}
          {Array.from({ length: 18 }, (_, i) => {
            const a = i * 2.4,
              q = linear(t, unknown + 0.7, unknown + 2.3),
              r = 250 + q * 350;
            return (
              <path
                key={i}
                d={`M${960 + Math.cos(a) * r} ${440 + Math.sin(a) * r * 0.45}h${14 + q * 30}`}
                stroke={C.blue}
                opacity={Math.sin(q * Math.PI) * 0.4}
              />
            );
          })}
        </svg>
        <div
          style={{
            ...pos,
            left: 0,
            right: 0,
            top: 383,
            textAlign: "center",
            ...mono,
            fontSize: 104,
            color: C.yellow,
            scale: lerp(t, unknown, unknown + 0.8, 0.8, 1),
          }}
        >
          voices38
        </div>
        <div
          style={{
            ...pos,
            left: 0,
            right: 0,
            top: 596,
            textAlign: "center",
            fontSize: 50,
            color: C.gray,
            opacity: lerp(t, unknown + 1.1, unknown + 1.5),
          }}
        >
          组织结构，仍然未知
        </div>
      </div>
    </Stage>
  );
};
