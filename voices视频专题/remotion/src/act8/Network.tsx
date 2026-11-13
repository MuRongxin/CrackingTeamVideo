import { Img } from "remotion";
import { publicAsset } from "../assets";
import { useTime, lerp } from "../components";
import { C } from "../style";
import type { ShotTiming } from "../timing";
import { GroupMark } from "../act6/Picture";
import { say } from "./timing";
import {
  Stage,
  Source,
  Paper,
  Eyebrow,
  Brand,
  Light,
  pos,
  mono,
  lin,
  red,
  cyan,
} from "./Stage";

export const Business = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    damage = say(timing, 219),
    p = lerp(t, damage, damage + 0.7),
    r = lin(t, 0, timing.duration);
  const names = ["ea", "ubisoft", "capcom", "sony"],
    labels = ["Electronic Arts", "Ubisoft", "Capcom", "Sony"];
  return (
    <Stage
      name="A8-04 · 技术生意"
      source="V20 / 诉状｜Denuvo 对其商业利益的主张；品牌标识为原品牌图形"
    >
      <Eyebrow style={{ color: C.yellow }}>
        Denuvo 的理由 / THE BUSINESS
      </Eyebrow>
      <div style={{ ...pos, left: 100, top: 160, fontSize: 76 }}>
        它卖的是反篡改技术
      </div>
      <div
        style={{
          ...pos,
          left: 140 - r * 20,
          top: 350,
          width: 550,
          transform: `perspective(1400px) rotateY(${r * 4}deg)`,
        }}
      >
        <Source name="denuvo-logo" style={{ width: 500 }} />
        <div style={{ fontSize: 27, marginTop: 25, color: cyan }}>
          ANTI-TAMPER / 技术服务
        </div>
      </div>
      <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
        {names.map((n, i) => {
          const y = 335 + i * 123,
            at = 1.8 + i * 0.55,
            progress = lerp(t, at, at + 0.65),
            x = 710 + (((((t - at) * 145) % 320) + 320) % 320);
          return (
            <g key={n} opacity={progress}>
              <path
                d={`M680 510 H780 Q820 510 820 ${y} H1040`}
                fill="none"
                stroke={p ? red : "#527985"}
                strokeWidth="3"
                pathLength="1"
                strokeDasharray={p ? ".025 .025" : "1"}
                strokeDashoffset={1 - progress}
              />
              <rect
                x={x}
                y={y - 5}
                width="22"
                height="10"
                fill={p ? red : C.yellow}
              />
            </g>
          );
        })}
      </svg>
      {names.map((n, i) => {
        const at = 1.8 + i * 0.55,
          q = lerp(t, at, at + 0.6);
        return (
          <div
            key={n}
            style={{
              ...pos,
              left: 1070 + (1 - q) * 360,
              top: 277 + i * 123,
              width: 670,
              height: 106,
              opacity: q,
              background: "#0b1822aa",
              borderBottom: `1px solid ${p ? "#d95d4d80" : "#54727c80"}`,
              display: "flex",
              alignItems: "center",
              gap: 35,
            }}
          >
            <Brand
              name={n}
              width={210}
              style={{ height: 86, mixBlendMode: "screen" }}
            />
            <span style={{ fontSize: 31, ...mono }}>{labels[i]}</span>
          </div>
        );
      })}
      <div
        style={{
          ...pos,
          left: 100,
          top: 748,
          fontSize: 55,
          color: red,
          opacity: p,
          translate: `0 ${35 * (1 - p)}px`,
        }}
      >
        破解，损害它的利益
        <span style={{ fontSize: 25, color: "#c5cccb", marginLeft: 24 }}>
          原告主张
        </span>
      </div>
      <Light />
    </Stage>
  );
};

export const Accounts = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    p = lerp(t, 1.55, 2.3),
    steam = lerp(t, 4.3, 4.9),
    r = lin(t, 0, timing.duration);
  return (
    <Stage
      name="A8-07 · 只有账号"
      source="诉状第2—3页｜1 个 Discord、1 个 Reddit、7 个 Steam；仅展示数量，不展示账号 ID"
    >
      <Eyebrow style={{ color: C.yellow }}>
        UNKNOWN INDIVIDUAL OR ENTITY
      </Eyebrow>
      <div style={{ ...pos, left: 100, top: 175, fontSize: 82 }}>
        没有真实姓名
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 350,
          transform: `perspective(1600px) rotateY(${-6 + p * 3}deg) translateX(${-r * 20}px)`,
        }}
      >
        <GroupMark name="voices38" width={660} />
        <div style={{ fontSize: 32, color: "#c5d0d0", marginTop: 32 }}>
          一个网名
        </div>
      </div>
      <svg width="1920" height="900" style={{ ...pos, inset: 0 }}>
        {[255, 455, 655].map((y, i) => (
          <path
            key={y}
            d={`M730 466 C900 466 860 ${y} 1080 ${y}`}
            stroke={i === 2 ? cyan : "#93a4aa"}
            fill="none"
            strokeWidth="3"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - lerp(t, 1.55 + i * 0.8, 2.2 + i * 0.8)}
          />
        ))}
      </svg>
      {["discord", "reddit", "steam"].map((n, i) => {
        const at = [1.55, 3.0, 4.3][i],
          q = lerp(t, at, at + 0.5);
        return (
          <div
            key={n}
            style={{
              ...pos,
              left: 1090 + (1 - q) * 220,
              top: 191 + i * 200,
              width: 630,
              height: 142,
              opacity: q,
            }}
          >
            {n === "steam" ? (
              <Brand name="steam" width={90} style={{ height: 90 }} />
            ) : n === "reddit" ? (
              <div style={{ width: 90, height: 90, overflow: "hidden" }}>
                <Img
                  src={publicAsset("v38/brands/reddit.png")}
                  style={{
                    width: 300,
                    height: 90,
                    objectFit: "contain",
                    maxWidth: "none",
                  }}
                />
              </div>
            ) : (
              <Img
                src={publicAsset(`v38/brands/${n}.png`)}
                style={{
                  width: 300,
                  height: 90,
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                }}
              />
            )}
            {n !== "discord" && (
              <div
                style={{
                  ...pos,
                  left: 130,
                  top: 10,
                  fontSize: 42,
                  textTransform: "capitalize",
                  ...mono,
                }}
              >
                {n}
              </div>
            )}
            <div
              style={{
                ...pos,
                right: 20,
                top: -10,
                fontSize: 100,
                lineHeight: 1,
                ...mono,
                color: i === 2 ? cyan : C.yellow,
              }}
            >
              {i === 2 ? 7 : 1}
            </div>
            {i === 2 &&
              Array.from({ length: 7 }, (_, j) => (
                <div
                  key={j}
                  style={{
                    ...pos,
                    left: 135 + j * 51,
                    top: 95,
                    width: 18,
                    height: 18,
                    border: `2px solid ${cyan}`,
                    background:
                      j < Math.floor(steam * 7) ? cyan : "transparent",
                    transform: `translateY(${Math.sin(t * 1.2 + j * 0.3) * 3}px)`,
                  }}
                />
              ))}
          </div>
        );
      })}
      <Light />
    </Stage>
  );
};

export const Response = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    quote = say(timing, 223, "一切"),
    p = lerp(t, 0.2, 1),
    q = lerp(t, quote, quote + 0.55),
    r = lin(t, 0, timing.duration);
  return (
    <Stage
      name="A8-08 · 照常继续"
      paper
      source="V20｜TorrentFreak 所刊 voices38 的 Reddit 回复原图；2026-09-16 更新"
    >
      <Eyebrow style={{ color: red }}>两天后 / 2026.09.16</Eyebrow>
      <div
        style={{
          ...pos,
          left: 100,
          top: 145,
          ...mono,
          fontSize: 97,
          color: "#b0a796",
          opacity: 1 - q,
        }}
      >
        09.14 <span style={{ color: red }}>→ 09.16</span>
      </div>
      <Paper
        name="voices38-response"
        width={1640}
        style={{
          ...pos,
          left: 130 - r * 20,
          top: 310 - r * 35,
          transform: `perspective(1800px) rotateX(${(1 - p) * 12}deg) rotateZ(${-2 + r * 2}deg) translateX(${(1 - p) * 1850}px)`,
        }}
      />
      <div
        style={{
          ...pos,
          left: 155,
          top: 650,
          fontSize: 98,
          color: C.ink,
          overflow: "hidden",
          width: 1580,
          clipPath: `inset(0 ${100 * (1 - q)}% 0 0)`,
        }}
      >
        一切正常，照常继续。
      </div>
      <div
        style={{
          ...pos,
          left: 155,
          top: 786,
          height: 5,
          width: 1510 * q,
          background: red,
        }}
      />
      <Light />
    </Stage>
  );
};

export const SameCourt = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    old = say(timing, 225),
    now = say(timing, 227),
    p = lerp(t, old, old + 0.9),
    q = lerp(t, now - 0.2, now + 0.8),
    r = lin(t, 0, timing.duration);
  return (
    <Stage
      name="A8-09 · 同一家法院"
      paper
      source="M22 / GameSpot · 2000-04-27；V20 / 2026诉状｜历史关系示意，未伪造2000年的法院文件"
    >
      <Eyebrow style={{ color: red }}>美国加州北区联邦法院</Eyebrow>
      <Paper
        name="court-name"
        width={1250}
        style={{
          ...pos,
          left: 470 - r * 90,
          top: 145,
          transform: `rotate(${-2 + r * 3}deg)`,
          opacity: 0.8,
        }}
      />
      <div
        style={{
          ...pos,
          left: 100,
          top: 340,
          width: 2500,
          transform: `translateX(${-q * 850}px)`,
        }}
      >
        <svg width="2450" height="440" style={{ ...pos, inset: 0 }}>
          <path d="M100 240H2300" stroke="#aaa495" strokeWidth="3" />
          <path
            d="M100 240H2300"
            stroke={red}
            strokeWidth="5"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - lerp(t, old, timing.duration)}
          />
        </svg>
        <div style={{ ...pos, left: 10, top: 0, opacity: p }}>
          <div style={{ ...mono, fontSize: 140, color: red }}>2000</div>
          <div style={{ fontSize: 64 }}>PARADIGM</div>
          <div style={{ marginTop: 52, fontSize: 38 }}>破解组的相关成员</div>
          <div
            style={{
              display: "flex",
              gap: 22,
              marginTop: 22,
              background: "#172335",
              padding: "12px 25px",
              width: 420,
            }}
          >
            <Brand name="ea" width={135} style={{ height: 70 }} />
            <Brand name="sony" width={180} style={{ height: 70 }} />
          </div>
        </div>
        <div style={{ ...pos, left: 1000, top: 0 }}>
          <div style={{ ...mono, fontSize: 140, color: q ? red : "#b9b2a6" }}>
            2026
          </div>
          <div
            style={{ width: 610, background: "#0b1018", padding: "20px 35px" }}
          >
            <GroupMark name="voices38" width={530} />
          </div>
          <div style={{ marginTop: 55, fontSize: 54, color: red, opacity: q }}>
            只是一个网名。
          </div>
        </div>
      </div>
      <Light />
    </Stage>
  );
};
