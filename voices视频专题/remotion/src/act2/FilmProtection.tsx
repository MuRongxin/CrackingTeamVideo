import { publicAsset } from "../assets";
import { Video } from "@remotion/media";
import { Img, interpolate, useVideoConfig } from "remotion";
import { C, F } from "../style";
import { lerp, useTime, clamp } from "../components";
import type { ShotTiming } from "../timing";
import { FilmScene, GameStill, cue } from "./film-shared";

export const DenuvoShell = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const lockAt = cue(timing, 25, "Denuvo");
  const lock = lerp(t, lockAt - 0.12, lockAt + 0.28);
  const gap = interpolate(t, [0.25, lockAt], [760, 36], clamp);
  const jaw = {
    position: "absolute" as const,
    top: 150,
    width: 900,
    height: 740,
    background:
      "linear-gradient(180deg,#24343f 0%,#10181e 18%,#18242c 82%,#0c1216 100%)",
    boxShadow: "0 0 40px #000c",
  };
  return (
    <FilmScene
      title="新版本，外面合上一层保护"
      right="概念示意 / 不是程序结构"
      source="保护概念示意｜Denuvo 反篡改保护"
    >
      <GameStill dark={0.42} />
      <div
        style={{
          left: 960 - gap / 2 - 900,
          ...jaw,
          borderRight: "6px solid #9ec3de",
          translate: `${Math.sin(t * 1.3) * (1 - lock) * 6}px 0`,
        }}
      />
      <div
        style={{
          left: 960 + gap / 2,
          ...jaw,
          borderLeft: "6px solid #9ec3de",
          translate: `${Math.sin(t * 1.3) * (1 - lock) * -6}px 0`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 280,
          top: interpolate(t, [0.2, lockAt - 0.2], [-180, 150], clamp),
          width: 1360,
          height: 28,
          background: "#8fb4cc",
          opacity: lerp(t, 0.2, 0.7),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 280,
          top: interpolate(t, [0.2, lockAt - 0.2], [1100, 862], clamp),
          width: 1360,
          height: 28,
          background: "#8fb4cc",
          opacity: lerp(t, 0.2, 0.7),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 960 - gap / 2,
          top: 210,
          width: Math.max(gap, 0),
          height: 620,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 64,
            color: C.white,
            whiteSpace: "nowrap",
            opacity: 1 - lock,
          }}
        >
          v1.7.1
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: interpolate(t, [0.4, lockAt], [180, 860], clamp),
          height: 70,
          background:
            "linear-gradient(90deg,transparent,#9ec3de55 20%,#ffffffaa 50%,#9ec3de55 80%,transparent)",
          opacity: 0.85 * (1 - lock * 0.7),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 430,
          top: 300,
          width: 1060,
          textAlign: "center",
          opacity: lock,
          scale: 0.86 + lock * 0.14 + Math.sin(t * 5) * lock * 0.012,
        }}
      >
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 22,
            letterSpacing: 8,
            color: C.blue,
          }}
        >
          ANTI-TAMPER
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 132,
            color: "#d5e8f4",
            letterSpacing: interpolate(lock, [0, 1], [18, 2]),
            textShadow: "0 0 28px #6e8aa688",
          }}
        >
          Denuvo
        </div>
        <div style={{ fontSize: 42, marginTop: 8 }}>俗称 D 加密</div>
      </div>
    </FilmScene>
  );
};
export { ProtectionCube as LayerDiagram } from "./ProtectionCube";

const path =
  "M150 748C220 740 215 290 365 285C510 280 565 545 780 625C1010 715 1350 733 1780 742";
export const CommercialWindow = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const { fps } = useVideoConfig();
  const launch = cue(timing, 28);
  const delay = cue(timing, 29);
  const x = lerp(t, delay, delay + 3.6, 560, 1470);
  return (
    <FilmScene
      title="它不必永远挡住破解"
      right="首发窗口 / 示意曲线"
      source="画面｜艾尔登法环官方宣传片 · 曲线为商业逻辑示意，不是销量"
    >
      <Video
        src={publicAsset("v38/act2/footage/launch-window.mp4")}
        durationInFrames={Math.round(timing.duration * fps)}
        muted
        style={{
          position: "absolute",
          width: 1920,
          height: 1080,
          objectFit: "cover",
          scale: 1.05 + t * 0.002,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg,#05090833 0%,#050908c4 42%,#050908f2 100%)",
        }}
      />
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <clipPath id="sales-reveal">
            <rect
              x={100}
              y={200}
              width={lerp(t, 0.1, 3, 0, 1750)}
              height={590}
            />
          </clipPath>
          <linearGradient id="sales-window" x1={0} x2={0} y1={0} y2={1}>
            <stop stopColor={C.blue} stopOpacity={0.42} />
            <stop offset={1} stopColor={C.blue} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <path
          d="M140 230V765H1790"
          fill="none"
          stroke="#ffffff55"
          strokeWidth={2}
        />
        <g clipPath="url(#sales-reveal)">
          <path
            d="M150 748C220 740 215 290 365 285C510 280 565 545 780 625L780 765H150Z"
            fill="url(#sales-window)"
          />
          <path d={path} stroke={C.blue} strokeWidth={6} fill="none" />
        </g>
        <path
          d={`M${x} 540V765`}
          fill="none"
          stroke={C.red}
          strokeWidth={3}
          opacity={lerp(t, delay, delay + 0.3)}
        />
        <circle
          cx={x}
          cy={765}
          r={8}
          fill={C.red}
          opacity={lerp(t, delay, delay + 0.3)}
        />
        <path
          d="M220 218H690"
          stroke={C.blue}
          strokeWidth={3}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - lerp(t, launch, launch + 1)}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 220,
          top: 165,
          fontSize: 63,
          color: C.blue,
          opacity: lerp(t, launch, launch + 0.4),
        }}
      >
        首发窗口
      </div>
      <div
        style={{
          position: "absolute",
          left: 910,
          top: 275,
          width: 780,
          fontSize: 64,
          lineHeight: 1.5,
        }}
      >
        最集中的销量
        <br />
        <span
          style={{
            fontSize: 42,
            color: C.gray,
            opacity: lerp(t, launch + 0.6, launch + 1.1),
          }}
        >
          在发售后的这段时间
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: x - 70,
          top: 465,
          fontSize: 34,
          color: C.red,
          opacity: lerp(t, delay, delay + 0.3),
        }}
      >
        破解出现
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 790,
          fontSize: 30,
          color: C.gray,
        }}
      >
        发售日
      </div>
      <div
        style={{
          position: "absolute",
          right: 130,
          top: 790,
          fontSize: 31,
          color: C.white,
          opacity: lerp(t, delay + 0.5, delay + 1),
        }}
      >
        尽可能往后推 →
      </div>
    </FilmScene>
  );
};
export const FiveDays = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const { fps } = useVideoConfig();
  const at = cue(timing, 31);
  const turn = Math.max(0, (t - at) / 0.32);
  const day = Math.min(5, Math.floor(turn));
  const shown = t < at ? 24 : Math.min(29, 24 + day);
  const frac = day >= 5 || t < at ? 0 : turn % 1;
  const struck = lerp(t, at + 1.55, at + 2.05);
  return (
    <FilmScene
      title="生化危机 7"
      right="2017.01.24 → 01.29"
      source="同期报道｜S40 · 画面为 CAPCOM 官方宣传片实机段落"
    >
      <Video
        src={publicAsset("v38/act2/footage/re7.mp4")}
        durationInFrames={Math.round(timing.duration * fps)}
        muted
        style={{
          position: "absolute",
          width: 1920,
          height: 1080,
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg,#05090866 0%,#05090818 60%),linear-gradient(0deg,#050908cc,transparent 38%)",
        }}
      />
      <div style={{ position: "absolute", left: 90, top: 150 }}>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 28,
            letterSpacing: 4,
            color: C.gray,
          }}
        >
          2017.01
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 210,
            lineHeight: 0.9,
            color: C.white,
            translate: `0 ${-frac * 22}px`,
          }}
        >
          {shown}
        </div>
        <div style={{ fontSize: 36, color: shown === 29 ? C.red : C.white }}>
          {shown === 24 ? "发售当天" : `第 ${shown - 24} 天`}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 620,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {[24, 25, 26, 27, 28, 29].map((n) => (
          <div key={n} style={{ width: 220, textAlign: "center" }}>
            <div
              style={{
                height: 4,
                background: n <= shown ? C.yellow : "#ffffff33",
                marginBottom: 16,
              }}
            />
            <div
              style={{
                fontFamily: F.mono,
                fontSize: n === shown ? 40 : 26,
                color: n === shown ? C.yellow : C.gray,
              }}
            >
              {String(n).padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          right: 110,
          top: 180,
          textAlign: "right",
          opacity: struck,
          translate: `${(1 - struck) * 80}px 0`,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 92 }}>CPY</div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 48,
            color: C.blue,
            marginTop: 10,
          }}
        >
          Denuvo
        </div>
        <div
          style={{
            height: 4,
            width: struck * 280,
            background: C.red,
            marginLeft: "auto",
            marginTop: -28,
            rotate: "-6deg",
          }}
        />
      </div>
    </FilmScene>
  );
};
export const DenuvoResponse = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const quote = cue(timing, 33);
  const y = interpolate(
    t,
    [0.15, quote, timing.duration - 0.15],
    [40, -420, -1480],
    clamp,
  );
  return (
    <FilmScene
      title="Denuvo 市场总监的回应"
      right="Ars Technica / 2017.02.06"
      source="报道页截图｜Ars Technica｜2017-02-06 · 观点归回应者"
    >
      <Img
        src={publicAsset("v38/act2/stills/ars-re7.png")}
        style={{
          position: "absolute",
          left: 80,
          width: 1760,
          translate: `0 ${y}px`,
        }}
      />
    </FilmScene>
  );
};
