import {
  AbsoluteFill,
  Img,
  interpolate,
  useVideoConfig,
  spring,
  staticFile,
} from "remotion";
import { C, F } from "./style";
import {
  Scene,
  SourceTag,
  Eyebrow,
  NameCursor,
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
          color: C.ink,
          letterSpacing: 5,
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
          color: C.gray,
          letterSpacing: 4,
        }}
      >
        A NAME ON FILE
      </div>
      <div
        style={{
          position: "absolute",
          top: 330,
          width: "100%",
          textAlign: "center",
          scale: 1 + (t - 1) * 0.006,
          opacity: lerp(t, 0.25, 0.65),
          translate: `0 ${lerp(t, 0.25, 1, 35, 0)}px`,
        }}
      >
        <div
          style={{
            fontFamily: F.cn,
            fontSize: 145,
            lineHeight: 1.35,
            background: `linear-gradient(90deg,${C.ink} 50%,${C.paper} 50%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Denuvo 的天敌
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 57,
            background: `linear-gradient(90deg,${C.ink} 50%,${C.paper} 50%)`,
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          <NameCursor size={66} blink={!still} />
          的故事
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 46 }}
        >
          <div style={{ width: 420, height: 1, background: "#16213a44" }} />
          <div style={{ width: 420, height: 1, background: "#e9ede644" }} />
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
              top: interpolate(t, [0, 0.45], [540, 560], clamp),
              width: interpolate(t, [0, 0.45], [170, 18], clamp),
              height: interpolate(t, [0, 0.45], [125, 60], clamp),
              background: C.ink,
              opacity: 1 - lerp(t, 0.25, 0.45),
            }}
          />
        ))}
    </Scene>
  );
};
const Bag = ({ index }: { index: number }) => {
  const t = useTime();
  return (
    <div
      style={{
        width: 390,
        height: 300,
        position: "relative",
        padding: 24,
        border: "1px solid #c8d8d044",
        background: "linear-gradient(135deg,#e7f0e11c,#ffffff05 45%,#ffffff15)",
        boxShadow: "10px 22px 25px #0005",
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
          height: 185,
          background: C.black,
          padding: 21,
          fontFamily: F.pixel,
          fontSize: 29,
          lineHeight: 1.4,
        }}
      >
        {index === 0 ? (
          <>
            <div style={{ color: C.yellow }}>voices38 PRESENTS</div>
            <Img
              src={staticFile("v38/nfo/proper-header.png")}
              style={{
                width: 290,
                opacity: 0.6,
                marginTop: 10,
                imageRendering: "pixelated",
              }}
            />
          </>
        ) : index === 1 ? (
          <>
            <div
              style={{
                height: 12,
                width: 135,
                background: "#6c736d",
                marginBottom: 24,
              }}
            />
            <div>Black.Myth.Wukong</div>
            <div style={{ color: C.yellow }}>voices38</div>
          </>
        ) : (
          <>
            <div style={{ color: C.gray, fontSize: 23, marginBottom: 24 }}>
              RELEASE NOTES
            </div>
            <div style={{ height: 5, width: 260, background: "#b6c2b166" }} />
            <div
              style={{
                height: 5,
                width: 225,
                background: "#b6c2b166",
                marginTop: 14,
              }}
            />
            <div
              style={{
                height: 5,
                width: 240,
                background: "#b6c2b166",
                marginTop: 14,
              }}
            />
          </>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 24,
          bottom: 16,
          width: 342,
          height: 56,
          padding: "6px 15px",
          background: "#bda67c",
          color: C.ink,
          fontSize: 27,
        }}
      >
        {
          [
            "当事人发布 · NFO 题头",
            "社区帖子 · 标题重排",
            "当事人发布 · 发行说明",
          ][index]
        }
      </div>
      <div
        style={{
          position: "absolute",
          width: 150,
          height: 450,
          top: -70,
          left: ((t * 14 + index * 80) % 600) - 120,
          rotate: "-25deg",
          background: "linear-gradient(90deg,transparent,#fff1,transparent)",
        }}
      />
    </div>
  );
};
export const Evidence = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  return (
    <Scene>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 155,
          display: "flex",
          alignItems: "center",
          gap: 45,
        }}
      >
        <NameCursor size={58} />
        <div style={{ fontSize: 40, color: "#c7cec4" }}>自己公开留下的材料</div>
      </div>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 220 + i * 500,
            top: 330,
            rotate: `${[-5, 2, -2][i] + Math.sin(t * 0.5 + i) * 0.5}deg`,
            opacity: lerp(t, 0.5 + i * 0.45, 0.8 + i * 0.45),
            translate: `0 ${lerp(t, 0.5 + i * 0.45, 1.1 + i * 0.45, -180, 0)}px`,
            scale: lerp(t, 0.5 + i * 0.45, 1.1 + i * 0.45, 1.15, 1),
          }}
        >
          <Bag index={i} />
        </div>
      ))}
      <SourceTag>当事人发布｜V06、V07 · 社区帖子｜V18 · 局部预告</SourceTag>
    </Scene>
  );
};
export const TimeAxis = ({ progress = 1 }: { progress?: number }) => (
  <div style={{ position: "absolute", left: 170, right: 170, top: 695 }}>
    <Rule color={C.blue} progress={progress} />
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontFamily: F.mono,
        color: C.gray,
        fontSize: 22,
      }}
    >
      {Array.from({ length: 14 }, (_, i) => (
        <div
          key={i}
          style={{ opacity: progress > i / 15 ? 1 : 0, textAlign: "center" }}
        >
          <div
            style={{
              height: 15,
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
  const line = lerp(t, 2.1, 3.6);
  return (
    <Scene>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: interpolate(
              line,
              [0, 1],
              [[130, 1120, 1450][i], 360 + i * 460],
            ),
            top: interpolate(line, [0, 1], [[320, 200, 560][i], 375]),
            scale: 0.65,
            transformOrigin: "top left",
            rotate: `${[-8, 4, 6][i] * (1 - line)}deg`,
          }}
        >
          <Bag index={i} />
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 620,
          top: 275,
          width: 680,
          height: 290,
          padding: "40px",
          color: C.ink,
          background: C.paper,
          boxShadow: "0 20px 60px #0006",
          opacity: 1 - line,
        }}
      >
        <div style={{ fontSize: 31 }}>
          名字　
          <NameCursor size={46} />
        </div>
        <div style={{ marginTop: 40, fontSize: 32 }}>
          身份　
          <span style={{ fontFamily: F.mono, fontSize: 60, color: C.red }}>
            ?
          </span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 195,
          fontSize: 67,
          opacity: line,
        }}
      >
        他是怎样做事的
      </div>
      <TimeAxis progress={line} />
    </Scene>
  );
};
export const Pronoun = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const merge = 5.25;
  const question = timing.voices[1].start;
  const m = lerp(t, merge - 0.3, merge + 0.6),
    q = lerp(t, question, question + 0.6);
  const lastVoice = timing.voices[timing.voices.length - 1];
  const end = Math.min(
    timing.duration - 0.18,
    lastVoice.start + lastVoice.duration + 0.08,
  );
  const quotes = [
    [
      "I spent a lot of time reverse engineering Denuvo…",
      "当事人自述｜经 iXBT 转述｜2025-10-15",
    ],
    [
      "I respect ZeOn’s crack attempts, but…",
      "当事人发布｜PROPER NFO｜2026-01-11",
    ],
    [
      "…so I need hardware, to ensure stability.",
      "当事人发布｜PROPER NFO 捐款说明｜2026-01-11",
    ],
  ];
  return (
    <Scene>
      {t < end ? (
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
          {quotes.map(([text, source], i) => (
            <div
              key={text}
              style={{
                position: "absolute",
                left: 170,
                top: 265 + i * 170,
                opacity: lerp(t, 0.2 + i * 0.7, 0.7 + i * 0.7) * (1 - m),
              }}
            >
              <div
                style={{ fontFamily: F.mono, fontSize: 41, color: C.yellow }}
              >
                {text}
              </div>
              <div style={{ fontSize: 24, color: C.gray, marginTop: 25 }}>
                {source} · 文字重排
              </div>
            </div>
          ))}
          {t > merge - 0.3 &&
            t < merge + 0.8 &&
            [0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: lerp(
                    t,
                    merge - 0.3,
                    merge + 0.6,
                    i === 2 ? 318 : 170,
                    925,
                  ),
                  top: lerp(t, merge - 0.3, merge + 0.6, 265 + i * 170, 410),
                  fontFamily: F.mono,
                  fontSize: lerp(t, merge - 0.3, merge + 0.6, 41, 100),
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
              opacity: m,
            }}
          >
            “他”
          </div>
          {q > 0 && (
            <>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 340,
                  textAlign: "center",
                  fontFamily: F.mono,
                  fontSize: 130,
                  color: C.yellow,
                  opacity: q,
                }}
              >
                {t < question + 2.4 ? (
                  <span
                    style={{
                      letterSpacing: interpolate(
                        t,
                        [question, question + 1.1, question + 2.4],
                        [0, 75, 0],
                        clamp,
                      ),
                    }}
                  >
                    ▮▮▮
                  </span>
                ) : (
                  "?"
                )}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 620,
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
                <div style={{ fontSize: 47, color: "#bdc2ba", marginTop: 40 }}>
                  一个人，还是一个团队？
                </div>
              </div>
            </>
          )}
          <SourceTag>
            {q > 0.5
              ? "法院文件｜起诉书 Dkt. 1｜个人或实体"
              : "当事人自述｜iXBT 转述 ／ PROPER NFO · 文字节选"}
          </SourceTag>
        </>
      ) : (
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
      )}
    </Scene>
  );
};
