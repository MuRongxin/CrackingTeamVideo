import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import { C, F } from "../style";
import {
  Scene,
  SourceTag,
  NameCursor,
  Eyebrow,
  Rule,
  useTime,
  lerp,
  clamp,
} from "../components";
import type { ShotTiming } from "../timing";
import { Paper, TerminalPanel, Topline, DateCard, Cursor } from "./shared";
const quote =
  'I spent a lot of time reverse engineering Denuvo and studying old "cracks" to see how others were cracking DRM, since no one else seems to care about it anymore.';
export const Research = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const study = timing.voices[2].start;
  const final = timing.voices[4].start;
  const chars = Math.floor(
    interpolate(
      t,
      [
        timing.voices[1].start - 0.3,
        study,
        timing.voices[3].start,
        final,
        final + 1.7,
      ],
      [0, 49, 79, 112, quote.length],
      clamp,
    ),
  );
  const text = quote.slice(0, chars);
  const last = text.indexOf("since");
  return (
    <Scene>
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 250 + i * 300,
            top: 180,
            background: "#25312c",
            width: 340,
            height: 530,
            padding: 30,
            rotate: `${(i - 1.5) * 7 + Math.sin(t + i) * 2}deg`,
            opacity: lerp(t, study, study + 0.6) * 0.6,
            translate: `0 ${-lerp(t, study + i * 0.1, study + 0.6 + i * 0.1, 0, 50)}px`,
            filter: "blur(3px)",
          }}
        >
          {Array.from({ length: 15 }, (_, j) => (
            <div
              key={j}
              style={{
                width: `${40 + ((i * 13 + j * 17) % 60)}%`,
                height: j < 3 ? 15 : 4,
                background: "#b8c4ba55",
                marginBottom: 14,
              }}
            />
          ))}
        </div>
      ))}
      <TerminalPanel
        title="iXBT · 2025-10-15 转述"
        style={{
          position: "absolute",
          left: 125,
          top: 220,
          width: 1670,
          height: 590,
          scale: 1 + t * 0.0013,
        }}
      >
        <div
          style={{
            padding: "45px",
            fontFamily: F.mono,
            fontSize: 44,
            color: C.yellow,
            lineHeight: 1.65,
            minHeight: 420,
          }}
        >
          {last >= 0 ? (
            <>
              {text.slice(0, last)}
              <span style={{ color: "#95a194", fontSize: 41 }}>
                {text.slice(last)}
              </span>
            </>
          ) : (
            text
          )}
          <Cursor size={44} />
        </div>
      </TerminalPanel>
      <div style={{ position: "absolute", left: 140, top: 142 }}>
        <NameCursor size={43} />
      </div>
      <SourceTag>当事人自述｜经 iXBT 转述｜2025-10-15</SourceTag>
    </Scene>
  );
};
export const FirstAttemptQuote = () => {
  const t = useTime();
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 425,
        textAlign: "center",
        fontFamily: F.mono,
        fontSize: 72,
        color: C.yellow,
        opacity: lerp(t, 0, 0.5),
        scale: 1 + Math.sin(t * 0.4) * 0.004,
      }}
    >
      Here's my first attempt
      <Cursor size={72} />
    </div>
  );
};
export const FirstAttempt = () => (
  <Scene>
    <Topline label="第一次尝试" right="2025.10.14" />
    <FirstAttemptQuote />
    <SourceTag>当事人自述｜经 iXBT 转述｜2025-10-15</SourceTag>
  </Scene>
);
export const IxbtOpening = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const lead = timing.voices[1].start;
  const retreat = lerp(t, lead + 1, lead + 3);
  return (
    <Scene paper>
      <Paper
        style={{
          position: "absolute",
          left: 180,
          top: 165,
          width: 1560,
          height: 620,
          padding: "45px 60px",
          borderTop: `6px solid ${C.blue}`,
          rotate: `${-0.35 + t * 0.025}deg`,
          translate: `0 ${lerp(t, 0, 0.7, 65, 0)}px`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              fontFamily: F.mono,
              fontSize: 42,
              fontWeight: 700,
              color: C.blue,
            }}
          >
            iXBT.games
          </span>
          <span style={{ fontFamily: F.mono, fontSize: 25, color: C.gray }}>
            2025.10.15 / 英文版文字重排
          </span>
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 34,
            lineHeight: 1.4,
            color: C.ink,
          }}
        >
          Denuvo's "Current" Version Hacked. Hacker Boasted
          <br />
          About Their First Victory Over DRM Protection
        </div>
        <div style={{ height: 1, background: "#16213a30", margin: "30px 0" }} />
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 36,
            lineHeight: 1.5,
            position: "relative",
          }}
        >
          <span
            style={{
              background: `linear-gradient(90deg,#6e8aa640 ${lerp(t, lead, lead + 0.7) * 100}%,transparent 0)`,
              padding: "6px 0",
            }}
          >
            While Empress is in retreat,
            <br />
            other tech enthusiasts are working.
          </span>
        </div>
        <div
          style={{
            fontSize: 52,
            lineHeight: 1.45,
            marginTop: 32,
            opacity: lerp(t, lead + 0.4, lead + 1),
          }}
        >
          <span style={{ fontSize: 24, color: C.gray, marginRight: 18 }}>
            译述
          </span>
          EMPRESS 正在退场
          <br />
          别的技术爱好者还在工作
        </div>
      </Paper>
      <div
        style={{
          position: "absolute",
          left: lerp(t, lead + 0.7, lead + 3, 210, -600),
          top: 773,
          fontFamily: F.mono,
          fontSize: 32,
          color: C.ink,
          padding: "15px 25px",
          background: "#ddd7c9",
          opacity: lerp(t, lead - 0.2, lead + 0.3),
        }}
      >
        EMPRESS
      </div>
      <div
        style={{
          position: "absolute",
          right: 230,
          top: 766,
          display: "flex",
          gap: 20,
          opacity: retreat,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              fontFamily: F.mono,
              fontSize: 48,
              color: C.gray,
              opacity: t % 1 < 0.5 ? 1 : 0,
            }}
          >
            ▮
          </div>
        ))}
      </div>
      <SourceTag>同期报道｜iXBT｜2025-10-15</SourceTag>
    </Scene>
  );
};
export const Farewell = () => {
  const t = useTime();
  return (
    <Scene paper>
      <Topline label="一个半月后" right="STATEMENT / 声明" paper />
      <div
        style={{
          position: "absolute",
          left: 240,
          top: 260,
          fontFamily: F.mono,
          fontSize: 61,
          color: C.ink,
          letterSpacing: 4,
        }}
      >
        {t < 0.55 ? "2025.10.15" : "2025.12.01"}
      </div>
      <div
        style={{
          position: "absolute",
          left: 240 - t * 650,
          top: 350,
          fontFamily: F.mono,
          fontSize: 30,
          color: C.gray,
          opacity: 1 - lerp(t, 0, 0.5),
        }}
      >
        EMPRESS
      </div>
      <Paper
        style={{
          position: "absolute",
          left: 240,
          top: 390,
          width: 1440,
          height: 315,
          padding: "60px",
          rotate: `${lerp(t, 0.65, 1.2, 3, -1)}deg`,
          translate: `0 ${lerp(t, 0.65, 1.3, -100, 0)}px`,
          opacity: lerp(t, 0.65, 0.9),
          display: "flex",
          alignItems: "center",
          gap: 55,
        }}
      >
        <div
          style={{
            width: 130,
            height: 170,
            border: `3px solid ${C.ink}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: F.mono,
            fontSize: 34,
            color: C.blue,
          }}
        >
          PDF
        </div>
        <div>
          <div style={{ fontFamily: F.mono, fontSize: 45 }}>
            End Of An Era - EMPRESS.pdf
          </div>
          <div style={{ fontSize: 31, color: C.gray, marginTop: 28 }}>
            2025-12-01 · 频道公告中的文件名
          </div>
        </div>
      </Paper>
      <SourceTag>当事人声明｜EMPRESS 频道公告｜2025-12-01</SourceTag>
    </Scene>
  );
};
export const RedditHeader = ({ reply = false }: { reply?: boolean }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 20,
      fontFamily: F.mono,
      fontSize: 27,
      color: C.gray,
    }}
  >
    <span>r/PiratedGames</span>
    <span
      style={{ width: 90, height: 13, background: "#a8aca5", marginLeft: 16 }}
    />
    <span style={{ marginLeft: "auto", fontSize: 23 }}>
      2025.10.14{reply ? " · 回复" : ""}
    </span>
  </div>
);
export const WeWon = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const { fps } = useVideoConfig();
  const chinese = timing.voices[2].start;
  return (
    <Scene paper>
      <Paper
        style={{
          position: "absolute",
          left: 240,
          top: 170,
          width: 1440,
          height: 650,
          padding: "42px 58px",
          rotate: `${-1 + t * 0.09}deg`,
          translate: `0 ${lerp(t, 0, 0.6, 90, 0)}px`,
        }}
      >
        <RedditHeader />
        <div style={{ fontFamily: F.mono, fontSize: 114, marginTop: 30 }}>
          we won{" "}
          <span
            style={{
              display: "inline-block",
              rotate: `${t > chinese && t < chinese + 0.5 ? Math.sin((t - chinese) * 30) * 8 : 0}deg`,
            }}
          >
            ?
          </span>
        </div>
        <div
          style={{
            fontSize: 66,
            margin: "15px 0 30px",
            opacity: lerp(t, chinese - 0.1, chinese + 0.1),
            scale: spring({
              frame: Math.max(0, (t - chinese) * fps),
              fps,
              config: { damping: 12 },
            }),
            transformOrigin: "left",
          }}
        >
          我们赢了？
        </div>
        <div
          style={{
            height: 205,
            border: "1px dashed #8a8f9880",
            background:
              "repeating-linear-gradient(135deg,#8a8f9805,#8a8f9805 12px,#8a8f980e 12px,#8a8f980e 13px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 34,
            color: C.gray,
          }}
        >
          梗图未存档
        </div>
      </Paper>
      <SourceTag>社区讨论｜r/PiratedGames｜2025-10-14 · 文字重排</SourceTag>
    </Scene>
  );
};
export const WaveJoke = ({ at }: { at: number }) => {
  const t = useTime();
  const local = t - at;
  const spike = local > 1.3;
  const rgb = local >= 1.3 && local < 1.4;
  const path = Array.from({ length: 481 }, (_, i) => {
    const x = 120 + i * 3.5;
    const envelope = spike
      ? Math.exp(-(((x - (1050 + (local - 1.3) * 220)) / 70) ** 2)) * 190
      : 0;
    const y =
      550 +
      Math.sin(x * 0.055 - t * 11) * (18 + envelope) +
      Math.sin(x * 0.13 + t * 7) * 8;
    return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return (
    <AbsoluteFill style={{ background: C.black, color: C.white }}>
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 265,
          fontFamily: F.mono,
          fontSize: 76,
          opacity: lerp(local, 0.2, 0.7),
        }}
      >
        voice cracks{" "}
        <span style={{ fontFamily: F.cn, color: spike ? C.yellow : C.white }}>
          ＝ 破音
        </span>
      </div>
      <svg width="1920" height="1080" style={{ position: "absolute" }}>
        <path d="M120 550 H1800" stroke="#e9ede615" strokeWidth="1" />
        {rgb && (
          <>
            <path
              d={path}
              stroke="#e25b5b"
              fill="none"
              strokeWidth="5"
              transform="translate(6 0)"
            />
            <path
              d={path}
              stroke="#63b6d5"
              fill="none"
              strokeWidth="5"
              transform="translate(-6 0)"
            />
          </>
        )}
        <path
          d={path}
          stroke={spike ? C.yellow : C.white}
          fill="none"
          strokeWidth="4"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 730,
          fontSize: 31,
          color: C.gray,
        }}
      >
        一个双关，评论区接住了。
      </div>
    </AbsoluteFill>
  );
};
export const Cracked = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const reply = timing.voices[1].start;
  const wave = timing.voices[2].start;
  return (
    <Scene paper>
      <Paper
        style={{
          position: "absolute",
          left: 190,
          top: 190,
          width: 1510,
          height: 270,
          padding: "42px 55px",
          translate: `0 ${lerp(t, 0, 0.5, 50, 0)}px`,
        }}
      >
        <RedditHeader />
        <div style={{ fontFamily: F.mono, fontSize: 42, marginTop: 45 }}>
          …
          <span
            style={{
              background: `linear-gradient(90deg,${C.yellow} ${lerp(t, 2.6, 3.2) * 100}%,transparent 0)`,
            }}
          >
            Voices cracked
          </span>{" "}
          the most recent one.
        </div>
      </Paper>
      <Paper
        style={{
          position: "absolute",
          left: 330,
          top: 490,
          width: 1370,
          height: 295,
          padding: "35px 48px",
          opacity: lerp(t, reply, reply + 0.3),
          translate: `0 ${lerp(t, reply, reply + 0.7, 75, 0)}px`,
        }}
      >
        <RedditHeader reply />
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 36,
            color: C.gray,
            borderLeft: `3px solid ${C.blue}`,
            paddingLeft: 20,
            marginTop: 25,
          }}
        >
          Voices cracked
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 42, marginTop: 25 }}>
          See what you did there
        </div>
      </Paper>
      {t >= wave && <WaveJoke at={wave} />}
      <SourceTag>社区讨论｜r/PiratedGames｜2025-10-14</SourceTag>
    </Scene>
  );
};
export const ColdComment = ({ wet = false }: { wet?: boolean }) => {
  const t = useTime();
  return (
    <Paper
      style={{
        position: "absolute",
        left: 180,
        top: 195,
        width: 1560,
        height: 600,
        padding: "45px 60px",
        rotate: `${wet ? Math.sin(t * 2) * 0.35 : 0}deg`,
        translate: `0 ${wet ? Math.sin(t * 3) * 2 : 0}px`,
        boxShadow: wet ? "0 22px 75px #3e728b38" : "0 24px 65px #0003",
      }}
    >
      <RedditHeader />
      <div
        style={{
          fontFamily: F.mono,
          fontSize: 38,
          lineHeight: 1.5,
          marginTop: 46,
        }}
      >
        don't take this to mean newer games will also be
        <br />
        cracked anytime soon. These games used older
        <br />
        versions of Denuvo…
      </div>
      <div
        style={{ height: 2, background: C.blue, marginTop: 30, width: 920 }}
      />
      <div style={{ fontSize: 27, color: C.gray, marginTop: 28 }}>译述</div>
      <div style={{ fontSize: 53, lineHeight: 1.4, marginTop: 13 }}>
        别以为新游戏很快也能这样
        <br />
        这些游戏用的都是老版本的 Denuvo
      </div>
      {wet &&
        [0, 1].map((i) => (
          <svg
            key={i}
            width="35"
            height="55"
            viewBox="0 0 35 55"
            style={{
              position: "absolute",
              left: 330 + i * 840,
              top: 565 + ((t * 25 + i * 31) % 90),
              opacity: 1 - ((t * 25 + i * 31) % 90) / 100,
            }}
          >
            <path
              d="M17 0 C14 18 2 22 3 34 C4 53 31 53 32 34 C33 22 21 18 17 0Z"
              fill="#6e8aa67a"
            />
          </svg>
        ))}
    </Paper>
  );
};
export const ColdWater = () => {
  const t = useTime();
  const splash = interpolate(t, [0.55, 0.9], [0, 1], clamp);
  return (
    <Scene paper>
      {t < 0.75 && <AbsoluteFill style={{ background: C.black }} />}
      <div style={{ opacity: lerp(t, 0.75, 1) }}>
        <ColdComment wet />
      </div>
      {t >= 0.55 && t < 1.3 && (
        <svg
          width="1920"
          height="1080"
          style={{ position: "absolute", opacity: 1 - lerp(t, 0.95, 1.3) }}
        >
          <path
            d={`M-400 -200 L${-300 + splash * 3200} -200 Q${-500 + splash * 2800} 400 ${-200 + splash * 2200} 660 Q${-600 + splash * 2100} 1000 ${-500 + splash * 1900} 1300 L-500 1300 Z`}
            fill="#6e8aa6"
          />
          <path
            d={`M-700 0 Q${splash * 2100} 400 ${splash * 2200} 1300`}
            fill="none"
            stroke="#a3c8d777"
            strokeWidth="140"
          />
          {Array.from({ length: 12 }, (_, i) => (
            <ellipse
              key={i}
              cx={-100 + splash * (2000 + i * 30)}
              cy={i * 100 + Math.sin(i) * 130}
              rx={12 + (i % 3) * 18}
              ry={9 + (i % 4) * 20}
              fill="#6e8aa6"
            />
          ))}
        </svg>
      )}
      <SourceTag>社区讨论｜r/PiratedGames｜2025-10-14</SourceTag>
    </Scene>
  );
};
export const ExpirySticker = ({ start = 0.9 }: { start?: number }) => {
  const t = useTime();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left: 1270,
        top: 640,
        width: 460,
        height: 205,
        background: "#f7f0dc",
        border: `2px solid ${C.ink}`,
        color: C.ink,
        padding: "23px 27px",
        rotate: "-6deg",
        scale: spring({
          frame: Math.max(0, (t - start) * fps),
          fps,
          config: { damping: 12 },
        }),
        opacity: t >= start ? 1 : 0,
        boxShadow: "0 10px 25px #0003",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
        <span style={{ fontSize: 27 }}>保质期</span>
        <span style={{ fontSize: 64 }}>约 5 个月</span>
      </div>
      <div
        style={{
          borderTop: `1px dashed ${C.ink}`,
          marginTop: 19,
          paddingTop: 16,
          fontSize: 22,
        }}
      >
        生产日期　<span style={{ fontFamily: F.mono }}>2025.10.14</span>
      </div>
    </div>
  );
};
export const Expiry = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  return (
    <Scene paper>
      <ColdComment />
      <ExpirySticker />
      <SourceTag>社区讨论｜r/PiratedGames｜2025-10-14</SourceTag>
      <AbsoluteFill
        style={{
          background: C.black,
          opacity: lerp(t, timing.duration - 0.3, timing.duration),
        }}
      />
    </Scene>
  );
};
