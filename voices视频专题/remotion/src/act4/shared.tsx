import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill, Img } from "remotion";
import { C, F } from "../style";
import { SourceTag, lerp, useTime } from "../components";
import { publicAsset } from "../assets";
export { Reveal } from "../act3/shared";
export { Stroke } from "../act3/motion-shared";
export const pos: CSSProperties = { position: "absolute" };
export const mono: CSSProperties = { fontFamily: F.mono };
export const Stage = ({
  children,
  label,
  source,
  light = false,
}: {
  children: ReactNode;
  label: string;
  source: string;
  light?: boolean;
}) => (
  <AbsoluteFill
    data-act4-stage={label}
    style={{
      overflow: "hidden",
      background: light ? C.paper : "#080d11",
      color: light ? C.ink : C.white,
      fontFamily: F.cn,
    }}
  >
    <AbsoluteFill
      style={{
        background: light
          ? "radial-gradient(ellipse at 20% 10%,#fff8,transparent 70%)"
          : "radial-gradient(ellipse at 75% 42%,#21312d80,transparent 65%)",
      }}
    />
    {children}
    <div
      style={{
        ...pos,
        left: 96,
        top: 52,
        ...mono,
        fontSize: 22,
        letterSpacing: 2,
        color: light ? "#6e736e" : "#a4b2b9",
      }}
    >
      {label}
    </div>
    <SourceTag>{source}</SourceTag>
  </AbsoluteFill>
);
export const Raster = ({
  name,
  style,
}: {
  name: string;
  style?: CSSProperties;
}) => (
  <Img
    src={publicAsset(`v38/act4/${name}.png`)}
    style={{ display: "block", imageRendering: "pixelated", ...style }}
  />
);
export const Rule = ({
  at = 0,
  y = 205,
  width = 1728,
  color = C.blue,
}: {
  at?: number;
  y?: number;
  width?: number;
  color?: string;
}) => {
  const t = useTime();
  return (
    <div
      style={{
        ...pos,
        left: 96,
        top: y,
        width,
        height: 2,
        background: color,
        scale: `${lerp(t, at, at + 0.7)} 1`,
        transformOrigin: "left",
      }}
    />
  );
};
// Generic hardware drawings. No claimed model, count, configuration or test result.
export const Memory = ({
  insert = 0,
  price = false,
  color = C.yellow,
}: {
  insert?: number;
  price?: boolean;
  color?: string;
}) => {
  const t = useTime();
  return (
    <svg viewBox="0 0 640 440" style={{ width: "100%", overflow: "visible" }}>
      <path
        d="M48 340L430 414L610 290L230 218Z"
        fill="#142226"
        stroke="#6e8aa6"
        strokeWidth="2"
      />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M${120 + i * 27} ${322 - i * 18}l260 52`}
          stroke="#42616a"
          strokeWidth="7"
        />
      ))}
      <g transform={`translate(0,${-92 * (1 - insert)})`}>
        <path
          d="M110 252L405 310L405 192L110 134Z"
          fill="#203b32"
          stroke={color}
          strokeWidth="3"
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <path
              d={`M${129 + i * 54} ${165 + i * 10.6}l36 7v55l-36-7Z`}
              fill="#080e13"
              stroke="#8a9b91"
            />
            <path
              d={`M${130 + i * 54} ${247 + i * 10.6}l36 7v11l-36-7Z`}
              fill={color}
            />
          </g>
        ))}
        <text x="128" y="128" fill={color} fontSize="21" fontFamily={F.mono}>
          RAM
        </text>
      </g>
      {price && (
        <g transform={`translate(452 ${84 + Math.sin(t * 1.5) * 5})`}>
          <path d="M-50 95L0 18H125V100H0Z" fill={C.yellow} />
          <text x="14" y="70" fill={C.ink} fontSize="35" fontFamily={F.cn}>
            涨价 ↑
          </text>
        </g>
      )}
    </svg>
  );
};
export const Rig = ({
  active = 0,
  linux = false,
}: {
  active?: number;
  linux?: boolean;
}) => (
  <svg viewBox="0 0 520 340" style={{ width: "100%" }}>
    <rect
      x="24"
      y="32"
      width="330"
      height="210"
      rx="5"
      fill="#0a1215"
      stroke={C.blue}
      strokeWidth="3"
    />
    <path
      d="M148 242v35h90v-35M113 280h160"
      stroke={C.blue}
      strokeWidth="4"
      fill="none"
    />
    <rect
      x="384"
      y="55"
      width="100"
      height="228"
      rx="6"
      stroke={C.blue}
      fill="#102024"
      strokeWidth="2"
    />
    <circle cx="433" cy="88" r="7" fill={active > 0 ? C.yellow : C.blue} />
    {[0, 1, 2, 3].map((i) => (
      <path
        key={i}
        d={`M406 ${151 + i * 24}h56`}
        stroke={active > i / 4 ? C.yellow : C.blue}
        strokeWidth="3"
      />
    ))}
    <text x="53" y="100" fontFamily={F.mono} fontSize="33" fill={C.white}>
      {linux ? "Linux" : "TEST"}
    </text>
    <path d="M54 125h265" stroke="#31454c" />
    {[0, 1, 2].map((i) => (
      <g key={i} opacity={active > i / 3 ? 1 : 0.22}>
        <rect x="55" y={148 + i * 23} width="9" height="9" fill={C.yellow} />
        <path
          d={`M79 ${153 + i * 23}h${170 - i * 25}`}
          stroke={C.blue}
          strokeWidth="3"
        />
      </g>
    ))}
  </svg>
);
export const NewYearQuote =
  "Wish you all a happy drm free and old school new year!";
