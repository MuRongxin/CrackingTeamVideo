import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img } from "remotion";
import { C, F } from "../style";
import { SourceTag, useTime, lerp } from "../components";
import { publicAsset } from "../assets";
export { pos, mono, mix, linear, smooth, PageMark } from "../act5/shared";
import { pos, mono, mix, linear } from "../act5/shared";
export const HV = "#79ced5";
export const OS = C.yellow;
export const Stage = ({
  label,
  source,
  children,
}: {
  label: string;
  source: string;
  children: ReactNode;
}) => (
  <AbsoluteFill
    data-act6-stage={label}
    style={{
      overflow: "hidden",
      background: "#071017",
      color: C.white,
      fontFamily: F.cn,
    }}
  >
    {children}
    <div
      style={{
        ...pos,
        inset: 0,
        pointerEvents: "none",
        background:
          "linear-gradient(0deg,#03080fee,transparent 19%,transparent 87%,#03090e99)",
        zIndex: 30,
      }}
    />
    <div
      style={{
        ...pos,
        left: 86,
        top: 48,
        ...mono,
        fontSize: 22,
        letterSpacing: 2,
        color: "#bed2d8",
        zIndex: 40,
      }}
    >
      {label}
    </div>
    <SourceTag>{source}</SourceTag>
  </AbsoluteFill>
);
export const Space = ({
  speed = 1,
  warm = false,
}: {
  speed?: number;
  warm?: boolean;
}) => {
  const t = useTime();
  return (
    <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
      <defs>
        <radialGradient id="a6-haze">
          <stop stopColor={warm ? "#614c24" : "#174852"} stopOpacity=".5" />
          <stop offset="1" stopColor="#071017" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="1080" cy="470" rx="900" ry="650" fill="url(#a6-haze)" />
      {Array.from({ length: 19 }, (_, i) => (
        <path
          key={i}
          d={`M960 260L${-900 + i * 210} 1050`}
          stroke="#557580"
          strokeOpacity=".11"
        />
      ))}
      {Array.from({ length: 12 }, (_, i) => {
        const p = (i / 12 + t * 0.035 * speed) % 1;
        const y = 260 + p * p * 800;
        return (
          <path
            key={i}
            d={`M0 ${y}H1920`}
            stroke="#7ea5b2"
            strokeOpacity={p * 0.16}
          />
        );
      })}
      {Array.from({ length: 40 }, (_, i) => {
        const x = ((i * 677 + t * 17 * speed) % 2080) - 80,
          y = 110 + ((i * 113) % 660);
        return (
          <path
            key={i}
            d={`M${x} ${y}h${6 + (i % 4) * 5}`}
            stroke="#a8c5ce"
            opacity={0.09 + (i % 3) * 0.035}
          />
        );
      })}
    </svg>
  );
};
export const Trace = ({
  d,
  at = 0,
  duration = 0.8,
  color = HV,
  width = 3,
  opacity = 1,
}: {
  d: string;
  at?: number;
  duration?: number;
  color?: string;
  width?: number;
  opacity?: number;
}) => {
  const t = useTime(),
    p = lerp(t, at, at + duration);
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      pathLength="1"
      strokeDasharray="1"
      strokeDashoffset={1 - p}
      opacity={opacity}
    />
  );
};
export const Raster = ({
  path,
  style,
}: {
  path: string;
  style?: CSSProperties;
}) => (
  <Img
    src={publicAsset(path)}
    style={{ display: "block", imageRendering: "pixelated", ...style }}
  />
);
// The stack shows only the conceptual location; no patch, address or settings instructions.
export const Stack = ({
  spread = 1,
  active = "hv",
  work = 0,
  opacity = 1,
}: {
  spread?: number;
  active?: "hv" | "game";
  work?: number;
  opacity?: number;
}) => {
  const t = useTime();
  return (
    <svg width="1920" height="1080" style={{ ...pos, inset: 0, opacity }}>
      {[2, 1, 0].map((i) => {
        const y = 300 + i * (40 + spread * 155),
          color =
            i === 0 && active === "game"
              ? OS
              : i === 2 && active === "hv"
                ? HV
                : "#496470";
        return (
          <g key={i}>
            <path
              d={`M625 ${y}L1160 ${y - 75}L1440 ${y + 35}L905 ${y + 110}Z`}
              fill={i === 0 ? "#182b36" : "#0b1d27"}
              stroke={color}
              strokeWidth="2"
            />
            <path
              d={`M625 ${y}v24l280 110l535-75v-24L905 ${y + 110}Z`}
              fill="#08141e"
              stroke={color}
              strokeOpacity=".6"
            />
            <path
              d={`M170 ${y + 35}H535L625 ${y}`}
              fill="none"
              stroke={color}
              strokeWidth="2"
            />
            <text
              x="170"
              y={y + 17}
              fontFamily={F.cn}
              fontSize="44"
              fill={color}
            >
              {["游戏程序", "操作系统", "虚拟化层"][i]}
            </text>
            <text
              x="170"
              y={y + 77}
              fontFamily={F.mono}
              fontSize="22"
              fill="#7895a2"
            >
              {["APPLICATION", "WINDOWS", "HYPERVISOR"][i]}
            </text>
            {[0, 1, 2, 3, 4].map((j) => (
              <path
                key={j}
                d={`M${780 + j * 75} ${y - 5 + j * -8}l105 42`}
                stroke={color}
                opacity=".22"
              />
            ))}
          </g>
        );
      })}
      <g transform={`translate(1020 ${305})`}>
        <path
          d="M-90-27L20-43L104-10L-8 7Z M-90-27v38L-8 44L104 28v-38 M-8 7V44"
          fill="#223441"
          stroke={OS}
          strokeWidth="2"
        />
        <text x="-70" y="-55" fill={C.white} fontFamily={F.mono} fontSize="25">
          DENUVO
        </text>
      </g>
      {active === "hv" ? (
        <g>
          <path
            d={`M1100 365C1510 420 1490 ${480 + spread * 130} 1120 ${395 + spread * 390}`}
            fill="none"
            stroke={HV}
            strokeWidth="3"
            strokeDasharray="8 11"
          />
          {[0, 1, 2, 3].map((i) => {
            const q = (t * 0.32 + i / 4) % 1,
              x = 1100 + Math.sin(q * Math.PI) * 240,
              y = mix(365, 395 + spread * 390, q);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="6"
                fill={HV}
                opacity={opacity * 0.8}
              />
            );
          })}
          <circle
            cx="1120"
            cy={395 + spread * 390}
            r={26 + Math.sin(t * 3) * 6}
            fill="none"
            stroke={HV}
            strokeWidth="2"
          />
        </g>
      ) : (
        <g>
          <path
            d="M760 300L870 278L970 315"
            fill="none"
            stroke={OS}
            strokeWidth="4"
            pathLength="1"
            strokeDasharray=".13 .87"
            strokeDashoffset={-(t * 0.35) % 1}
          />
          <g
            transform={`translate(${1030 + Math.sin(t * 2) * 28} ${310 + Math.cos(t * 2) * 15}) rotate(${t * 22})`}
          >
            <circle
              r="83"
              fill="none"
              stroke={OS}
              strokeDasharray="12 15"
              strokeWidth="3"
              opacity={work}
            />
          </g>
        </g>
      )}
    </svg>
  );
};

export const RailPair = ({
  converge = 0,
  split = 1,
  opacity = 1,
}: {
  converge?: number;
  split?: number;
  opacity?: number;
}) => {
  const t = useTime();
  return (
    <svg width="1920" height="1080" style={{ ...pos, inset: 0, opacity }}>
      {[0, 1].map((i) => {
        const y = 430 + (i ? 1 : -1) * split * 160;
        const end = mix(y, 440, converge),
          color = i ? OS : HV;
        return (
          <g key={i}>
            <path
              d={`M-100 ${y}C700 ${y} 1120 ${end} 2020 ${end}`}
              stroke={color}
              fill="none"
              strokeWidth="3"
              opacity=".5"
            />
            {[0, 1, 2, 3, 4].map((j) => {
              const p = (t * 0.14 + j * 0.2) % 1;
              return (
                <circle
                  key={j}
                  cx={p * 2100 - 100}
                  cy={mix(y, end, p * p)}
                  r="6"
                  fill={color}
                  opacity={0.6}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};
