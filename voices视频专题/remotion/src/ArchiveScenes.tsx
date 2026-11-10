import React from "react";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useVideoConfig,
  spring,
} from "remotion";
import { C, F } from "./style";
import {
  Scene,
  SourceTag,
  Eyebrow,
  NameCursor,
  Photo,
  Stamp,
  Circle,
  Rule,
  useTime,
  lerp,
  clamp,
} from "./components";
import type { ShotTiming } from "./timing";

export const TitleCard = ({ still = false }: { still?: boolean }) => {
  const time = useTime();
  const t = still ? 2.8 : time;
  return (
    <Scene>
      <AbsoluteFill style={{ width: "50%", background: C.paper }} />
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 160,
          fontFamily: F.mono,
          fontSize: 26,
          letterSpacing: 5,
          color: C.ink,
        }}
      >
        第一幕 / 01
      </div>
      <div
        style={{
          position: "absolute",
          right: 110,
          top: 160,
          fontFamily: F.mono,
          fontSize: 23,
          letterSpacing: 5,
          color: C.gray,
        }}
      >
        A NAME ON FILE
      </div>
      <div
        style={{
          position: "absolute",
          top: 335,
          width: "100%",
          textAlign: "center",
          scale: 1 + (t - 1) * 0.007,
          opacity: lerp(t, 0.28, 0.6),
          translate: `0 ${lerp(t, 0.28, 1, 35, 0)}px`,
        }}
      >
        <div
          style={{
            fontFamily: F.cn,
            fontSize: 116,
            lineHeight: 1.35,
            background: `linear-gradient(90deg, ${C.ink} 50%, ${C.paper} 50%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            whiteSpace: "nowrap",
            clipPath: `inset(0 ${100 - lerp(t, 0.3, 1.1) * 100}% 0 0)`,
          }}
        >
          Denuvo 起诉了一个网名
        </div>
        <div style={{ marginTop: 60 }}>
          <NameCursor size={70} blink={!still} />
        </div>
        <div
          style={{
            display: "flex",
            gap: 0,
            justifyContent: "center",
            marginTop: 45,
            opacity: lerp(t, 0.9, 1.2),
          }}
        >
          <div style={{ height: 1, width: 420, background: "#16213a44" }} />
          <div style={{ height: 1, width: 420, background: "#e9ede644" }} />
        </div>
      </div>
      {!still &&
        t < 0.45 &&
        Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: interpolate(t, [0, 0.45], [130 + i * 185, 950], clamp),
              top: interpolate(t, [0, 0.45], [520, 560], clamp),
              width: interpolate(t, [0, 0.45], [170, 18], clamp),
              height: interpolate(t, [0, 0.45], [174, 60], clamp),
              background: C.ink,
              opacity: 1 - lerp(t, 0.25, 0.45),
            }}
          />
        ))}
    </Scene>
  );
};
const tags = [
  "当事人发布",
  "社区帖子",
  "当事人发布",
  "同期报道",
  "当事人发布",
  "法院文件",
  "同期报道",
  "当事人发布",
];
const labels = [
  "发布说明",
  "帖子",
  "一句道歉",
  "一笔没凑齐的账",
  "还有不少玩笑",
  "起诉书",
  "媒体报道",
  "测试者",
];
export const EvidenceBag = ({
  index,
  compact = false,
}: {
  index: number;
  compact?: boolean;
}) => {
  const t = useTime();
  const color = index >= 5 ? "#8696a1" : "#bda67c";
  return (
    <div
      style={{
        width: 350,
        height: 266,
        position: "relative",
        border: "1px solid #c8d8d03d",
        background:
          "linear-gradient(130deg,#e7f0e11b,#ffffff05 40%,#ffffff1c 72%,#ffffff07)",
        boxShadow: "10px 22px 25px #0005,inset 0 0 30px #ffffff0c",
        padding: 22,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 10,
          right: 10,
          top: 9,
          height: 6,
          borderTop: "2px solid #cad4c36b",
          borderBottom: "1px solid #cad4c333",
        }}
      />
      <div
        style={{
          height: 148,
          background: index === 5 ? C.paper : "#0a0c0b",
          padding: "16px 18px",
          color: C.white,
          overflow: "hidden",
          fontFamily: F.pixel,
          fontSize: 25,
          lineHeight: 1.25,
        }}
      >
        {index === 0 ? (
          <>
            <div style={{ color: C.yellow }}>voices38 PRESENTS</div>
            <Photo
              src={staticFile("v38/nfo/proper-header.png")}
              style={{
                width: 270,
                opacity: 0.7,
                marginTop: 6,
                imageRendering: "pixelated",
              }}
            />
          </>
        ) : null}
        {index === 1 ? (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <div
                style={{
                  width: 17,
                  height: 17,
                  borderRadius: "50%",
                  background: "#878d88",
                }}
              />
              <div style={{ width: 105, height: 13, background: "#595f5b" }} />
            </div>
            <div style={{ fontSize: 23 }}>
              Dead.Space.Remake.
              <br />
              PROPER-<span style={{ color: C.yellow }}>voices38</span>
            </div>
            <div style={{ fontSize: 18, color: C.gray, marginTop: 9 }}>
              据帖子存档重排
            </div>
          </>
        ) : null}
        {index === 2 ? (
          <>
            <div style={{ color: C.gray, fontSize: 20 }}>CRACKFIX</div>
            <div style={{ color: C.yellow, fontSize: 31, marginTop: 22 }}>
              Sorry about that
            </div>
          </>
        ) : null}
        {index === 3 ? (
          <>
            <div style={{ fontFamily: F.mono, fontSize: 35 }}>
              35<span style={{ fontSize: 20 }}>%</span>
            </div>
            <div style={{ height: 9, background: "#e9ede622", marginTop: 14 }}>
              <div
                style={{ height: "100%", width: "35%", background: C.blue }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                right: 57,
                top: 56,
                width: 22,
                height: 22,
                border: `2px solid ${C.gray}`,
                borderRightColor: "transparent",
                borderRadius: "50%",
                rotate: `${t * 120}deg`,
              }}
            />
          </>
        ) : null}
        {index === 4 ? (
          <>
            <div style={{ color: C.gray, fontSize: 20 }}>KIND ............</div>
            <div style={{ fontSize: 27, marginTop: 15 }}>
              Pew-Pew at
              <br />
              Zombies in Space
            </div>
          </>
        ) : null}
        {index === 5 ? (
          <>
            <Photo
              src={staticFile("v38/court/header.png")}
              style={{ width: 270, marginTop: 12 }}
            />
            <Stamp style={{ marginTop: 25, fontSize: 23 }}>COMPLAINT</Stamp>
          </>
        ) : null}
        {index === 6 ? (
          <>
            <div style={{ fontFamily: F.mono, fontSize: 18, color: C.blue }}>
              TorrentFreak
            </div>
            <div style={{ fontSize: 27, marginTop: 16 }}>
              Denuvo Sues
              <br />
              Game Cracker
              <br />
              <span style={{ color: C.yellow }}>voices38</span>
            </div>
          </>
        ) : null}
        {index === 7 ? (
          <>
            <div style={{ fontSize: 20, color: C.gray, marginBottom: 12 }}>
              TESTERS / THANKS
            </div>
            {[150, 195, 120].map((w, i) => (
              <div
                key={i}
                style={{
                  height: 12,
                  width: w,
                  background: "#a7afa6",
                  marginBottom: 10,
                }}
              />
            ))}
          </>
        ) : null}
      </div>
      <div
        style={{
          position: "absolute",
          left: 22,
          bottom: 13,
          width: 306,
          height: 65,
          background: color,
          color: C.ink,
          padding: "6px 13px",
          boxShadow: "0 1px 3px #0003",
        }}
      >
        <div style={{ fontSize: 17, letterSpacing: 2, opacity: 0.7 }}>
          {tags[index]}
        </div>
        <div style={{ fontSize: compact ? 23 : 27, marginTop: 2 }}>
          {labels[index]}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          width: 140,
          height: 400,
          background:
            "linear-gradient(90deg,transparent,#ffffff09,transparent)",
          rotate: "-25deg",
          top: -70,
          left: ((t * 12 + index * 47) % 500) - 120,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
const grid = (i: number) => ({
  x: 165 + (i % 4) * 405,
  y: 260 + Math.floor(i / 4) * 310,
  r: [-5, 3, -3, 4, 3, -3, 5, -2][i],
});
export const Evidence = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const cue = timing.voices[2].start;
  const last = timing.voices[3].start;
  const arrivals = [
    cue - 0.25,
    cue + 0.8,
    cue + 1.4,
    cue + 2.25,
    cue + 3.4,
    last + 0.1,
    last + 0.45,
    last + 0.8,
  ];
  return (
    <Scene>
      <div
        style={{
          position: "absolute",
          left: lerp(t, 3.7, 5.2, 470, 130),
          top: lerp(t, 3.7, 5.2, 350, 140),
          display: "flex",
          alignItems: "center",
          gap: 48,
        }}
      >
        <NameCursor size={lerp(t, 3.7, 5.2, 138, 54)} />
        <div
          style={{ fontSize: 36, color: "#b4bab2", opacity: lerp(t, 4.5, 5.2) }}
        >
          公开留下的材料
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          scale: 1 + t * 0.0017,
          translate: `${-t * 0.6}px ${-t * 0.25}px`,
        }}
      >
        {Array.from({ length: 8 }, (_, i) => {
          const g = grid(i);
          const a = arrivals[i];
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: g.x,
                top: g.y,
                rotate: `${g.r + Math.sin(t * 0.4 + i) * 0.45}deg`,
                opacity: lerp(t, a, a + 0.22),
                translate: `0 ${lerp(t, a, a + 0.65, -160, 0)}px`,
                scale: lerp(t, a, a + 0.6, 1.2, 1),
              }}
            >
              <EvidenceBag index={i} />
            </div>
          );
        })}
      </div>
    </Scene>
  );
};
export const TimeAxis = ({ progress = 1 }: { progress?: number }) => (
  <div style={{ position: "absolute", left: 175, right: 175, top: 680 }}>
    <Rule color={C.blue} progress={progress} />
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontFamily: F.mono,
        color: C.gray,
      }}
    >
      {Array.from({ length: 14 }, (_, i) => (
        <div
          key={i}
          style={{ textAlign: "center", opacity: progress > i / 15 ? 1 : 0 }}
        >
          <div
            style={{
              height: i === 0 || i === 13 ? 18 : 10,
              width: 1,
              background: C.blue,
              margin: "0 auto 18px",
            }}
          />
          {i === 0
            ? "2025.10"
            : i === 13
              ? "2026.11"
              : String(((i + 9) % 12) + 1).padStart(2, "0")}
        </div>
      ))}
    </div>
  </div>
);
export const Unknown = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const change = timing.voices[1].start;
  const orbit = lerp(t, 0, 0.9);
  const line = lerp(t, change, change + 1.3);
  return (
    <Scene>
      {Array.from({ length: 8 }, (_, i) => {
        const g = grid(i);
        const a = (i / 8) * Math.PI * 2;
        const ringX = 790 + Math.cos(a) * 660,
          ringY = 390 + Math.sin(a) * 260;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: interpolate(
                line,
                [0, 1],
                [interpolate(orbit, [0, 1], [g.x, ringX]), 140 + i * 210],
              ),
              top: interpolate(
                line,
                [0, 1],
                [interpolate(orbit, [0, 1], [g.y, ringY]), 390 + (i % 2) * 25],
              ),
              scale: interpolate(orbit, [0, 1], [1, 0.5]) * (1 - line * 0.1),
              transformOrigin: "top left",
              rotate: `${g.r * (1 - line)}deg`,
              opacity: 1 - line * 0.15,
            }}
          >
            <EvidenceBag index={i} compact />
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 620,
          top: 280,
          width: 680,
          height: 300,
          padding: "35px 44px",
          background: C.paper,
          boxShadow: "0 20px 60px #0006",
          color: C.ink,
          opacity: orbit * (1 - line),
          scale: 1 + Math.sin(t) * 0.005,
        }}
      >
        <div style={{ fontSize: 28 }}>
          被告　
          <NameCursor size={45} />
        </div>
        <div style={{ fontSize: 29, marginTop: 50 }}>
          身份　
          <span style={{ letterSpacing: 7, color: "#666b68" }}>▇▇▇▇▇▇</span>
        </div>
        <Stamp
          style={{
            position: "absolute",
            right: 35,
            bottom: 27,
            opacity: lerp(t, 0.9, 1.1),
          }}
        >
          未知
        </Stamp>
      </div>
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 200,
          fontSize: 66,
          opacity: line,
          translate: `0 ${lerp(t, change, change + 1, 25, 0)}px`,
        }}
      >
        他是怎样做事的
      </div>
      <TimeAxis progress={line} />
    </Scene>
  );
};
const quotes = [
  {
    text: "I spent a lot of time reverse engineering Denuvo...",
    source: "当事人自述｜经 iXBT 转述｜2025-10-15",
  },
  {
    text: "I respect ZeOn’s crack attempts, but...",
    source: "当事人发布｜PROPER NFO｜2026-01-11",
  },
  {
    text: "...so I need hardware, to ensure stability.",
    source: "当事人发布｜同一份 NFO 的捐款说明",
  },
];
export const Pronoun = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const { fps } = useVideoConfig();
  const merge = timing.voices[1].start;
  const question = timing.voices[2].start;
  const end = timing.duration - 0.55;
  const m = lerp(t, merge - 0.25, merge + 0.65);
  const q = lerp(t, question - 0.1, question + 0.7);
  return (
    <Scene>
      {t < end && (
        <>
          <div
            style={{
              position: "absolute",
              left: 140,
              top: 155,
              opacity: 1 - q,
            }}
          >
            <Eyebrow dark>FIRST PERSON / 第一人称</Eyebrow>
          </div>
          {quotes.map((quote, i) => {
            const start = 0.2 + i * 0.52;
            const body = quote.text.slice(
              0,
              Math.max(0, Math.floor((t - start) * 95)),
            );
            return (
              <div
                key={quote.text}
                style={{
                  position: "absolute",
                  left: 170,
                  top: 275 + i * 180,
                  opacity: lerp(t, start, start + 0.2) * (1 - m),
                  translate: `${m * 50}px ${-m * i * 70}px`,
                  scale: 1 - m * 0.1,
                }}
              >
                <div
                  style={{ fontFamily: F.mono, fontSize: 43, color: C.yellow }}
                >
                  {body}
                </div>
                <div style={{ fontSize: 24, color: C.gray, marginTop: 25 }}>
                  {quote.source} · 文字重排
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: i === 2 ? 148 : -5,
                    top: -4,
                    width: 33,
                    height: 59,
                    border: `2px solid ${C.yellow}`,
                    opacity: lerp(t, start + 0.4, start + 0.56),
                  }}
                />
              </div>
            );
          })}
          {t > merge - 0.25 &&
            t < merge + 0.8 &&
            [0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: lerp(
                    t,
                    merge - 0.25,
                    merge + 0.6,
                    i === 2 ? 318 : 170,
                    925,
                  ),
                  top: lerp(t, merge - 0.25, merge + 0.6, 275 + i * 180, 410),
                  fontFamily: F.mono,
                  fontSize: lerp(t, merge - 0.25, merge + 0.6, 43, 100),
                  color: C.yellow,
                  opacity: 1 - lerp(t, merge + 0.25, merge + 0.7),
                }}
              >
                I
              </div>
            ))}
          <div
            style={{
              position: "absolute",
              left: interpolate(q, [0, 1], [730, 150]),
              top: interpolate(q, [0, 1], [315, 145]),
              fontFamily: F.serif,
              fontWeight: 900,
              fontSize: interpolate(q, [0, 1], [240, 80]),
              color: C.white,
              opacity: m,
              scale: lerp(t, merge - 0.1, merge + 0.7, 0.82, 1),
            }}
          >
            “他”
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: interpolate(q, [0, 1], [665, 250]),
              textAlign: "center",
              fontSize: 29,
              color: C.gray,
              opacity: m * (1 - q),
            }}
          >
            本片暂用的称呼
          </div>
          {q > 0 && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 345,
                  height: 155,
                  opacity: q,
                }}
              >
                {Array.from({ length: 5 }, (_, i) => {
                  const local = t - question;
                  const expansion = interpolate(
                    local,
                    [0, 0.7, 1.2, 1.7, 2.2, 2.8],
                    [0, 1, 1, 2, 2, 0],
                    clamp,
                  );
                  const spread = (i - 2) * 75 * expansion;
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        left: 938 + spread,
                        top: Math.sin(t * 3 + i) * 5,
                        color: C.yellow,
                        fontFamily: F.mono,
                        fontSize: 130,
                        opacity:
                          local < 3
                            ? expansion < 1.1 && (i === 0 || i === 4)
                              ? 0
                              : 1
                            : 0,
                        scale: spring({
                          frame: Math.max(0, (local - i * 0.035) * fps),
                          fps,
                          config: { damping: 12 },
                        }),
                      }}
                    >
                      ▮
                    </div>
                  );
                })}
                <div
                  style={{
                    textAlign: "center",
                    fontSize: 150,
                    color: C.yellow,
                    opacity: lerp(t, question + 2.8, question + 3.1),
                    fontFamily: F.mono,
                  }}
                >
                  ?
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 620,
                  width: "100%",
                  textAlign: "center",
                  opacity: lerp(t, question + 0.7, question + 1.2),
                }}
              >
                <div style={{ fontFamily: F.mono, fontSize: 44 }}>
                  an unknown individual{" "}
                  <span style={{ position: "relative" }}>
                    or
                    <Circle progress={lerp(t, question + 2, question + 2.5)} />
                  </span>{" "}
                  entity
                </div>
                <div style={{ fontSize: 45, marginTop: 52, color: "#bdc2ba" }}>
                  一个人，还是几个人？
                </div>
              </div>
            </>
          )}
        </>
      )}
      {t >= end ? (
        <AbsoluteFill
          style={{
            background: C.black,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: F.mono,
              color: C.yellow,
              fontSize: 96,
              opacity: t % 1 < 0.5 ? 1 : 0,
            }}
          >
            ▮
          </span>
        </AbsoluteFill>
      ) : (
        <SourceTag>
          {q > 0.5
            ? "法院文件｜起诉书 Dkt. 1｜个人或实体"
            : "当事人自述｜iXBT 2025-10-15 ／ PROPER NFO 2026-01-11"}
        </SourceTag>
      )}
    </Scene>
  );
};
