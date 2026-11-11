import { publicAsset } from "../assets";
import { Img, interpolate } from "remotion";
import { C, F } from "../style";
import { NameCursor, clamp, lerp, useTime } from "../components";
import type { ShotTiming } from "../timing";
import { Act1Kicker, Act1Scene, Act1Source } from "./shared";
import { voiceCue } from "./cues";

export const platforms = [
  { name: "Discord", file: "discord", width: 328 },
  { name: "Valve", file: "valve", width: 228 },
  { name: "Reddit", file: "reddit", width: 270 },
];
export const PlatformLogo = ({
  index,
  width,
  height,
}: {
  index: number;
  width: number;
  height: number;
}) => (
  <Img
    src={publicAsset(`v38/brands/${platforms[index].file}.png`)}
    alt={platforms[index].name}
    style={{
      width,
      height,
      objectFit: "contain",
      objectPosition: "left center",
      display: "block",
    }}
  />
);

export const Subpoenas = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const formAt = voiceCue(timing, 6, "弄清楚");
  const form = lerp(t, formAt, formAt + 0.85);
  const fieldTimes = [
    voiceCue(timing, 6, "比如叫什么"),
    voiceCue(timing, 6, "住在哪"),
    voiceCue(timing, 6, "怎么联系"),
  ];
  const activeY = interpolate(
    t,
    [
      fieldTimes[0],
      fieldTimes[1] - 0.13,
      fieldTimes[1],
      fieldTimes[2] - 0.13,
      fieldTimes[2],
    ],
    [0, 0, 134, 134, 268],
    clamp,
  );
  return (
    <Act1Scene>
      <Act1Kicker right="PRE-TRIAL DISCOVERY">
        06 / FOLLOW THE ACCOUNT
      </Act1Kicker>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 300,
          opacity: 1 - form,
          translate: `${-form * 220}px ${-form * 60}px`,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 23, color: "#87928a" }}>
          ONE PSEUDONYM
        </div>
        <div style={{ marginTop: 36 }}>
          <NameCursor size={96} />
        </div>
        <div style={{ marginTop: 42, fontSize: 32, color: "#b5bdb5" }}>
          账号背后的人是谁？
        </div>
      </div>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0, opacity: 1 - form }}
      >
        {platforms.map((p, i) => (
          <path
            key={p.name}
            d={`M650 455 C790 455 850 ${255 + i * 205} 1050 ${255 + i * 205}`}
            fill="none"
            stroke={i === 1 ? C.blue : "#7f8c825e"}
            strokeWidth={2}
            strokeDasharray="8 12"
            strokeDashoffset={-t * 36}
            opacity={lerp(t, 0.9 + i * 0.55, 1.35 + i * 0.55)}
          />
        ))}
      </svg>
      {/* The document unfolds behind the same platform cards as they dock. */}
      <div
        style={{
          position: "absolute",
          left: 225,
          top: 145,
          width: 1490,
          height: 665,
          background: "#f1ede3",
          color: C.ink,
          boxShadow: "0 35px 100px #0009",
          opacity: form,
          translate: `0 ${(1 - form) * 220}px`,
          rotate: `${(1 - form) * -1.8}deg`,
          transformOrigin: "50% 20%",
          clipPath: `inset(0 0 ${100 * (1 - form)}% 0)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 65,
            right: 65,
            top: 128,
            height: 1,
            background: "#16213a36",
            scale: `${lerp(t, formAt + 0.4, formAt + 0.95)} 1`,
            transformOrigin: "left",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 62,
            top: 47,
            fontSize: 25,
            color: C.red,
            opacity: lerp(t, formAt + 0.65, formAt + 1),
          }}
        >
          申请阶段 · 身份待识别
        </div>
        <div
          style={{
            position: "absolute",
            left: 65,
            top: 155,
            fontSize: 49,
            opacity: lerp(t, formAt + 0.2, formAt + 0.6),
            translate: `${lerp(t, formAt + 0.2, formAt + 0.75, 60, 0)}px 0`,
          }}
        >
          法院要找的，不只是一个网名。
        </div>
        <div
          style={{
            position: "absolute",
            left: 65,
            right: 65,
            top: 250,
            height: 402,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: activeY,
              height: 112,
              opacity: lerp(t, fieldTimes[0] - 0.24, fieldTimes[0]),
              background:
                "linear-gradient(90deg,#c23b2e0e,#c23b2e06 65%,transparent)",
              borderLeft: `4px solid ${C.red}`,
            }}
          />
          {["姓名", "住址", "联系方式"].map((label, i) => {
            const appear = lerp(
              t,
              formAt + 0.65 + i * 0.13,
              formAt + 1.12 + i * 0.13,
            );
            const at = fieldTimes[i];
            const progress = lerp(t, at - 0.05, at + 0.24);
            const active =
              t >= at - 0.1 && (i === 2 || t < fieldTimes[i + 1] - 0.08);
            const value =
              t < at
                ? "···"
                : "[ UNKNOWN ]".slice(
                    0,
                    Math.min(11, Math.floor((t - at) * 56) + 1),
                  );
            const scan = (t - at) / 0.4;
            return (
              <div
                key={label}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: i * 134,
                  height: 112,
                  display: "flex",
                  alignItems: "center",
                  borderBottom: "1px solid #16213a27",
                  opacity: appear,
                  translate: `${(1 - appear) * 160}px 0`,
                  clipPath: `inset(0 ${100 * (1 - appear)}% 0 0)`,
                }}
              >
                <div
                  style={{
                    width: 85,
                    paddingLeft: 22,
                    fontFamily: F.mono,
                    fontSize: 20,
                    color: "#95968d",
                  }}
                >
                  0{i + 1}
                </div>
                <div style={{ width: 390, fontSize: 38 }}>{label}</div>
                <div
                  style={{
                    position: "relative",
                    fontFamily: F.mono,
                    fontSize: 52,
                    color: t < at ? "#a9a99f" : C.red,
                    minWidth: 560,
                  }}
                >
                  {value}
                  <span
                    style={{
                      marginLeft: 16,
                      fontSize: 36,
                      color: C.red,
                      opacity:
                        active && Math.floor((t - at) * 5) % 2 === 0 ? 1 : 0,
                    }}
                  >
                    ▮
                  </span>
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: -14,
                      width: 420,
                      height: 2,
                      background: C.red,
                      scale: `${progress} 1`,
                      transformOrigin: "left",
                      opacity: 0.45,
                    }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    bottom: 8,
                    left: 470 + Math.max(0, Math.min(1, scan)) * 580,
                    width: 2,
                    background: "#c23b2e55",
                    boxShadow: "0 0 18px #c23b2e55",
                    opacity: scan >= 0 && scan <= 1 ? 1 : 0,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      {platforms.map((p, i) => {
        const at = 0.85 + i * 0.55;
        const dock = lerp(t, formAt + i * 0.07, formAt + 0.78 + i * 0.07);
        return (
          <div
            key={p.name}
            style={{
              position: "absolute",
              left: interpolate(dock, [0, 1], [1050, 300 + i * 270]),
              top: interpolate(dock, [0, 1], [175 + i * 205, 177]),
              width: interpolate(dock, [0, 1], [690, 230]),
              height: interpolate(dock, [0, 1], [160, 72]),
              background: "#ece7dc",
              boxShadow: `0 ${20 * (1 - dock)}px ${65 * (1 - dock)}px #0005`,
              borderLeft: `${7 * (1 - dock)}px solid ${i === 1 ? C.blue : C.ink}`,
              opacity: lerp(t, at, at + 0.35),
              translate: `${lerp(t, at, at + 0.55, 600, 0)}px 0`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: interpolate(dock, [0, 1], [38, 26]),
                top: interpolate(dock, [0, 1], [47, 18]),
              }}
            >
              <PlatformLogo
                index={i}
                width={interpolate(
                  dock,
                  [0, 1],
                  [p.width, i === 1 ? 145 : 178],
                )}
                height={interpolate(dock, [0, 1], [66, 36])}
              />
            </div>
            {i === 1 && (
              <div
                style={{
                  position: "absolute",
                  left: 300,
                  top: 64,
                  fontFamily: F.mono,
                  fontSize: 25,
                  color: "#697078",
                  opacity: 1 - dock,
                }}
              >
                / Steam
              </div>
            )}
            <div
              style={{
                position: "absolute",
                right: 38,
                top: 57,
                padding: "8px 12px",
                border: `2px solid ${C.red}`,
                color: C.red,
                fontSize: 22,
                rotate: "-5deg",
                opacity: 1 - lerp(dock, 0, 0.3),
              }}
            >
              申请传票
            </div>
          </div>
        );
      })}
      <Act1Source>同期报道｜TorrentFreak｜2026-10-06 · 申请阶段</Act1Source>
    </Act1Scene>
  );
};
