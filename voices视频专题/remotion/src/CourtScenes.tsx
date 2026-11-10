import React from "react";
import {
  AbsoluteFill,
  staticFile,
  interpolate,
  spring,
  useVideoConfig,
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

const court = (name: string) => staticFile(`v38/court/${name}.png`);
const Frame = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      position: "absolute",
      background: C.paper,
      color: C.ink,
      boxShadow: "0 24px 90px #0005, 0 1px 2px #fff8 inset",
      ...style,
    }}
  >
    {children}
  </div>
);
export const CourtOpening = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const p = t / timing.duration;
  return (
    <Scene>
      <Frame
        style={{
          left: 260,
          top: 160,
          width: 1400,
          height: 900,
          padding: "62px 90px",
          rotate: `${-1.5 + p * 0.4}deg`,
          translate: `0 ${lerp(t, 0.4, 1.4, 1000, 0) - lerp(t, timing.duration - 0.45, timing.duration, 0, 28)}px`,
          scale: 1 + p * 0.07,
        }}
      >
        <Eyebrow>UNITED STATES DISTRICT COURT　 /　 诉状节选</Eyebrow>
        <Photo src={court("header")} style={{ width: 1220 }} />
        <div
          style={{
            position: "absolute",
            top: 134,
            left: 800,
            width: lerp(t, 1.33, 1.63, 0, 235),
            height: 40,
            background: "#6e8aa64a",
            mixBlendMode: "multiply",
            rotate: "-1deg",
          }}
        />
        <div
          style={{
            margin: "35px -40px 48px",
            height: 18,
            background:
              "linear-gradient(180deg,transparent,#16213a10,transparent)",
            borderTop: "1px dashed #8886",
          }}
        />
        <Photo src={court("court")} style={{ width: 1120, margin: "0 auto" }} />
        <Photo
          src={court("parties")}
          style={{ width: 680, marginTop: 50, marginLeft: 25 }}
        />
        <div
          style={{
            position: "absolute",
            right: 75,
            top: 420,
            width: 330,
            borderTop: `2px solid ${C.ink}`,
            paddingTop: 25,
            fontFamily: F.mono,
            fontSize: 27,
            lineHeight: 1.8,
          }}
        >
          COMPLAINT FOR
          <br />
          COPYRIGHT
          <br />
          INFRINGEMENT<Stamp style={{ marginTop: 48 }}>FILED · 已提交</Stamp>
        </div>
      </Frame>
      <div
        style={{
          position: "absolute",
          left: 270,
          top: 105,
          color: C.paper,
          fontFamily: F.mono,
          fontSize: 30,
          letterSpacing: 2,
          opacity: lerp(t, 1.2, 1.6),
        }}
      >
        2026.09.14
      </div>
      <AbsoluteFill
        style={{ background: C.black, opacity: 1 - lerp(t, 0.4, 0.7) }}
      />
      {t > 0.9 && <SourceTag>法院文件｜起诉书 Dkt. 1｜2026-09-14</SourceTag>}
    </Scene>
  );
};
export const Plaintiff = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const p = t / timing.duration;
  return (
    <Scene paper>
      <Frame
        style={{
          left: 180,
          top: 176,
          width: 1030,
          height: 1060,
          padding: 68,
          rotate: `${-0.8 + p * 0.3}deg`,
          scale: 1 + p * 0.025,
          translate: `0 ${lerp(t, 0, 0.65, 70, 0)}px`,
        }}
      >
        <Eyebrow>COMPLAINT　 /　 当事人栏</Eyebrow>
        <Photo src={court("parties")} style={{ width: 890, marginTop: 22 }} />
        <svg
          style={{
            position: "absolute",
            left: 58,
            top: 127,
            width: 470,
            height: 146,
          }}
        >
          <path
            d="M8 10 L455 6 L459 130 L4 136 Z"
            fill="none"
            stroke={C.ink}
            strokeWidth="3"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - lerp(t, 0.6, 0.87)}
          />
        </svg>
      </Frame>
      <div
        style={{
          position: "absolute",
          top: 340,
          left: 1270,
          width: 470,
          opacity: lerp(t, 0.5, 0.85),
          translate: `${lerp(t, 0.5, 1.15, 220, 0)}px 0`,
        }}
      >
        <Eyebrow>PLAINTIFF / 原告</Eyebrow>
        <div
          style={{
            fontFamily: F.mono,
            color: C.blue,
            fontSize: 69,
            lineHeight: 1.15,
          }}
        >
          Denuvo
          <br />
          GmbH
        </div>
        <div style={{ marginTop: 50 }}>
          <Rule />
        </div>
        <div style={{ fontSize: 38, marginTop: 32 }}>奥地利 · 萨尔茨堡</div>
      </div>
      <SourceTag>法院文件｜起诉书 Dkt. 1｜第 2 段</SourceTag>
    </Scene>
  );
};
export const Defendant = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const { fps } = useVideoConfig();
  const zoom = lerp(t, 1.72, 1.92);
  return (
    <Scene paper>
      <Frame
        style={{
          left: 180,
          top: 180,
          width: 1550,
          height: 760,
          padding: "55px 80px",
          rotate: `${-0.5 + t * 0.025}deg`,
        }}
      >
        <Eyebrow>DEFENDANTS / 被告</Eyebrow>
        <div
          style={{
            position: "absolute",
            left: 75 + zoom * 185,
            top: 190,
            background: C.paper,
            width: 1250 - zoom * 920,
            height: 350 - zoom * 252,
            overflow: "hidden",
            transformOrigin: "0 30%",
            scale: 1 + zoom * 1.32,
            translate: `0 ${-zoom * 15}px`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 5,
              width: lerp(t, 1.95, 2.3, 0, 310),
              height: 72,
              background: C.yellow,
              opacity: 0.8,
              rotate: "-.8deg",
            }}
          />
          <Photo
            src={court("defendant")}
            style={{
              width: 1250,
              position: "relative",
              filter: t > 1.72 && t < 1.92 ? "blur(1px)" : "none",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 300,
              top: 7,
              fontFamily: F.mono,
              color: C.yellow,
              fontSize: 77,
              opacity: t > timing.duration - 0.8 && t % 1 < 0.5 ? 1 : 0,
            }}
          >
            ▮
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 1080,
            top: 120,
            fontFamily: F.cn,
            fontSize: 120,
            color: C.red,
            opacity: lerp(t, 2, 2.1),
            scale: spring({
              frame: Math.max(0, (t - 2) * fps),
              fps,
              config: { damping: 11 },
            }),
            rotate: "12deg",
          }}
        >
          ?
        </div>
      </Frame>
      <SourceTag>法院文件｜起诉书 Dkt. 1｜当事人栏</SourceTag>
    </Scene>
  );
};
export const Identity = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  return (
    <Scene paper>
      <Frame
        style={{
          left: 142,
          top: 190,
          width: 1636,
          height: 624,
          padding: "62px 88px",
          rotate: `${-0.35 + t * 0.04}deg`,
          scale: 1.01 - (t / timing.duration) * 0.01,
        }}
      >
        <Eyebrow>DEFENDANT / 起诉书中的身份描述</Eyebrow>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 51,
            marginTop: 70,
            whiteSpace: "nowrap",
            letterSpacing: -2,
          }}
        >
          an <Word text="unknown" start={0.9} t={t} red />{" "}
          <Word text="individual" start={1.25} t={t} />{" "}
          <span style={{ position: "relative" }}>
            or
            <Circle progress={lerp(t, 1.8, 2.2)} />
          </span>{" "}
          <Word text="entity" start={1.6} t={t} />
        </div>
        <div
          style={{
            marginTop: 105,
            opacity: lerp(t, 1.5, 2),
            translate: `0 ${lerp(t, 1.5, 2.2, 20, 0)}px`,
          }}
        >
          <span style={{ fontSize: 26, color: C.gray, marginRight: 24 }}>
            译述
          </span>
          <span style={{ fontSize: 66 }}>身份不明的个人或实体</span>
        </div>
      </Frame>
      <SourceTag>法院文件｜起诉书 Dkt. 1｜当事人栏</SourceTag>
    </Scene>
  );
};
const Word = ({
  text,
  t,
  start,
  red = false,
}: {
  text: string;
  t: number;
  start: number;
  red?: boolean;
}) => (
  <span style={{ position: "relative" }}>
    {text}
    <span
      style={{
        position: "absolute",
        height: 3,
        background: red ? C.red : C.ink,
        left: 0,
        bottom: -12,
        width: `${lerp(t, start, start + 0.24) * 100}%`,
      }}
    />
  </span>
);
export const Pseudonym = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const quoteStart = timing.voices[1].start;
  const reveal = lerp(t, quoteStart - 0.2, quoteStart + 0.6);
  return (
    <Scene>
      <AbsoluteFill
        style={{
          background: C.paper,
          width: "50%",
          translate: `${-reveal * 960}px 0`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 365,
          color: C.ink,
          opacity: 1 - reveal,
          translate: `${-reveal * 300}px 0`,
        }}
      >
        <Eyebrow>原告</Eyebrow>
        <div style={{ fontFamily: F.mono, fontSize: 68, color: C.blue }}>
          DENUVO GMBH
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 930,
          top: 434,
          fontFamily: F.serif,
          fontSize: 48,
          color: C.gray,
          opacity: 1 - reveal,
        }}
      >
        v.
      </div>
      <div
        style={{
          position: "absolute",
          left: 1070,
          top: 390,
          perspective: 1500,
          opacity: 1 - reveal,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 650,
            height: 180,
            transformStyle: "preserve-3d",
            rotate: `y ${lerp(t, 0.5, 0.9, 0, 180)}deg`,
          }}
        >
          <div
            style={{
              position: "absolute",
              backfaceVisibility: "hidden",
              background: C.paper,
              padding: 24,
            }}
          >
            <NameCursor size={84} upper />
          </div>
          <div
            style={{
              position: "absolute",
              backfaceVisibility: "hidden",
              rotate: "y 180deg",
              padding: 24,
            }}
          >
            <NameCursor size={84} />
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 240,
          right: 240,
          top: 250,
          opacity: reveal,
          translate: `0 ${lerp(t, quoteStart, quoteStart + 1, 55, 0)}px`,
          scale: 1 + (t - quoteStart) * 0.003,
        }}
      >
        <Eyebrow dark>修改后的申请　 /　 2026.10</Eyebrow>
        <div
          style={{
            fontFamily: F.serif,
            fontSize: 130,
            color: C.blue,
            opacity: 0.4,
            height: 70,
          }}
        >
          “
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 50, lineHeight: 1.6 }}>
          Denuvo has only a{" "}
          <span
            style={{ borderBottom: `3px solid ${C.yellow}`, paddingBottom: 10 }}
          >
            pseudonym.
          </span>
        </div>
        <div style={{ fontSize: 68, marginTop: 64 }}>
          <span style={{ fontSize: 26, color: C.gray, marginRight: 28 }}>
            译述
          </span>
          Denuvo 手里只有一个<span style={{ color: C.yellow }}>化名</span>
        </div>
        <div style={{ marginTop: 65 }}>
          <Rule color="#e9ede633" progress={reveal} />
        </div>
      </div>
      <SourceTag>
        同期报道｜TorrentFreak｜2026-10-19 · 转述修改后的申请
      </SourceTag>
    </Scene>
  );
};
const PlatformLogo = ({ kind }: { kind: string }) =>
  kind === "Discord" ? (
    <svg viewBox="0 0 128 100" width="72" height="56">
      <path
        d="M27 16 Q64 0 101 16 Q119 42 120 76 L96 90 L85 74 Q64 81 43 74 L32 90 L8 76 Q9 42 27 16Z"
        fill="currentColor"
      />
      <ellipse cx="44" cy="49" rx="9" ry="12" fill={C.paper} />
      <ellipse cx="84" cy="49" rx="9" ry="12" fill={C.paper} />
    </svg>
  ) : kind === "Reddit" ? (
    <svg viewBox="0 0 110 100" width="65" height="60">
      <g fill="none" stroke="currentColor" strokeWidth="5">
        <ellipse cx="55" cy="63" rx="41" ry="27" />
        <path d="M58 37 L65 10 L88 17 M36 73 Q55 86 75 73" />
        <circle cx="94" cy="18" r="9" />
        <circle cx="13" cy="48" r="9" />
        <circle cx="98" cy="48" r="9" />
      </g>
      <circle cx="40" cy="59" r="5" fill="currentColor" />
      <circle cx="71" cy="59" r="5" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 100 100" width="65" height="65">
      <g fill="none" stroke="currentColor" strokeWidth="6">
        <circle cx="69" cy="29" r="20" />
        <circle cx="69" cy="29" r="12" />
        <circle cx="29" cy="72" r="16" />
        <path d="M43 74 L76 48 M27 55 L48 26 M4 61 L29 74" />
      </g>
    </svg>
  );
export const Subpoenas = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const { fps } = useVideoConfig();
  const cut = timing.voices[1].start - 0.05;
  const q = t - cut;
  return (
    <Scene>
      {t < cut ? (
        <>
          <div style={{ position: "absolute", left: 110, top: 180 }}>
            <Eyebrow dark>EARLY DISCOVERY / 提前取证</Eyebrow>
          </div>
          <div style={{ position: "absolute", left: 120, top: 440 }}>
            <NameCursor size={92} />
          </div>
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M710 500 C840 500 800 ${265 + i * 220} 1020 ${265 + i * 220}`}
                fill="none"
                stroke={C.gray}
                strokeWidth="2"
                strokeDasharray="8 12"
                opacity={lerp(t, 1.5 + i * 0.55, 1.85 + i * 0.55)}
                strokeDashoffset={-t * 18}
              />
            ))}
          </svg>
          {["Discord", "Valve", "Reddit"].map((name, i) => {
            const a = 1.4 + i * 0.63;
            return (
              <Frame
                key={name}
                style={{
                  left: 1020 + i * 38,
                  top: 175 + i * 213,
                  width: 600,
                  height: 175,
                  padding: "27px 35px",
                  rotate: `${[-4, 1, 4][i]}deg`,
                  translate: `${lerp(t, a, a + 0.6, 900, 0)}px 0`,
                  color: C.ink,
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                }}
              >
                <PlatformLogo kind={name} />
                <div style={{ fontFamily: F.mono, fontSize: 43 }}>
                  {name}
                  {name === "Valve" && (
                    <div style={{ fontSize: 24, color: C.gray }}>Steam</div>
                  )}
                </div>
                <Stamp
                  style={{
                    position: "absolute",
                    right: 20,
                    bottom: 20,
                    fontSize: 19,
                    scale: spring({
                      frame: Math.max(0, (t - a - 0.45) * fps),
                      fps,
                      config: { damping: 12 },
                    }),
                  }}
                >
                  SUBPOENA
                  <br />
                  传票
                </Stamp>
              </Frame>
            );
          })}
        </>
      ) : (
        <Frame
          style={{
            left: 230,
            top: 170,
            width: 1460,
            height: 670,
            padding: "55px 70px",
            rotate: `${-0.6 + q * 0.09}deg`,
            scale: lerp(q, 0, 0.65, 0.96, 1),
          }}
        >
          <Eyebrow>IDENTIFY THE DEFENDANT / 账号背后的人</Eyebrow>
          <div style={{ fontSize: 66, marginBottom: 44 }}>
            他叫什么，住在哪，怎么联系？
          </div>
          {["姓名", "住址", "联系方式"].map((label, i) => (
            <div
              key={label}
              style={{
                height: 119,
                borderTop: "1px solid #16213a33",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div style={{ fontSize: 38, width: 300 }}>{label}</div>
              <div
                style={{
                  fontFamily: F.mono,
                  fontSize: 41,
                  color: C.gray,
                  opacity: lerp(q, 0.3 + i * 0.75, 0.5 + i * 0.75),
                }}
              >
                {i === 0 && q < 1.2 ? (
                  <span style={{ color: C.yellow }}>voices38</span>
                ) : (
                  <span style={{ letterSpacing: 8 }}>▇▇▇▇▇</span>
                )}
              </div>
              {i === 0 && q > 0.7 && (
                <>
                  <div
                    style={{
                      position: "absolute",
                      left: 299,
                      top: 57,
                      width: lerp(q, 0.7, 1, 0, 250),
                      height: 4,
                      background: C.red,
                      rotate: "-6deg",
                      opacity: q < 1.3 ? 1 : 0,
                    }}
                  />
                  <span
                    style={{
                      color: C.red,
                      fontSize: 27,
                      marginLeft: 36,
                      opacity: lerp(q, 0.7, 1),
                    }}
                  >
                    这是网名
                  </span>
                </>
              )}
            </div>
          ))}
        </Frame>
      )}
      <SourceTag>同期报道｜TorrentFreak｜2026-10-06</SourceTag>
    </Scene>
  );
};
const categories = [
  "付款记录",
  "交易记录",
  "登录日志",
  "帖子",
  "评论",
  "姓名",
  "证件",
  "邮箱",
  "IP 地址",
  "电话",
  "住址",
];
export const Requests = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const d = timing.duration;
  const collapse = d * 0.6;
  const k = lerp(t, collapse, collapse + 1.1);
  const count = Math.round(
    interpolate(t, [collapse, collapse + 0.7], [46, 9], clamp),
  );
  return (
    <Scene paper>
      <div style={{ position: "absolute", left: 125, top: 155 }}>
        <Eyebrow>REQUESTS FOR PRODUCTION / 取证请求</Eyebrow>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 170,
            lineHeight: 1,
            color: C.ink,
          }}
        >
          {count}
          <span style={{ fontSize: 35, marginLeft: 25 }}>项</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 145,
          top: 160,
          width: 900,
          opacity: lerp(t, 0.8, 1.4) * (1 - k),
        }}
      >
        <Eyebrow>2026.10.08 / 法院命令 · 原文节选</Eyebrow>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {["order-line1", "order-line2", "order-line3"].map((name, i) => (
            <Photo
              key={name}
              src={court(name)}
              style={{ width: [720, 531, 654][i] }}
            />
          ))}
        </div>
        <div
          style={{
            height: 3,
            width: lerp(t, 1.4, 2, 0, 690),
            background: C.red,
            marginTop: 12,
          }}
        />
        <div style={{ fontSize: 29, marginTop: 17, lineHeight: 1.4 }}>
          远超识别被告所需
          <br />
          可能带来严重的隐私问题
        </div>
      </div>
      {Array.from({ length: 46 }, (_, i) => {
        const keep = i < 9;
        const x = 130 + (i % 8) * 205;
        const y = 520 + Math.floor(i / 8) * 55;
        const drop = keep
          ? 0
          : lerp(
              t,
              collapse + (i - 9) * 0.017,
              collapse + 0.9 + (i - 9) * 0.017,
              0,
              900,
            );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: interpolate(k, [0, 1], [x, 130 + i * 185]),
              top: interpolate(k, [0, 1], [y, 520]) + drop,
              width: keep ? interpolate(k, [0, 1], [192, 170]) : 192,
              height: keep ? interpolate(k, [0, 1], [49, 174]) : 49,
              background: keep && k > 0.5 ? C.ink : "#fffc",
              border: "1px solid #16213a25",
              boxShadow: "0 5px 14px #16213a09",
              color: keep && k > 0.5 ? C.paper : C.ink,
              padding: keep && k > 0.5 ? "19px 10px" : "9px 14px",
              fontSize: 23,
              rotate: `${keep ? Math.sin(t * 1.3 + i) * k * 0.4 : (drop / 45) * (i % 2 ? 1 : -1)}deg`,
              opacity: lerp(t, i * 0.012, 0.3 + i * 0.012),
              overflow: "hidden",
              textAlign: keep && k > 0.5 ? "center" : "left",
            }}
          >
            {keep && k > 0.5 ? (
              <>
                <div
                  style={{
                    fontFamily: F.mono,
                    fontSize: 22,
                    marginBottom: 22,
                    color: C.blue,
                  }}
                >
                  {i === 0 ? "Discord" : i === 1 ? "Reddit" : "Steam"}
                </div>
                身份／
                <br />
                联系方式
              </>
            ) : (
              categories[i % categories.length]
            )}
            {!keep && t > collapse && (
              <div
                style={{
                  position: "absolute",
                  height: 2,
                  background: C.red,
                  width: "90%",
                  top: 25,
                  left: 8,
                  rotate: "-7deg",
                }}
              />
            )}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          top: 367,
          left: 130,
          fontSize: 37,
          color: C.red,
          opacity: k,
        }}
      >
        范围收窄
      </div>
      <div
        style={{
          position: "absolute",
          right: 130,
          top: 816,
          fontSize: 24,
          color: C.gray,
        }}
      >
        卡面为示意
      </div>
      <SourceTag>
        {k < 0.5
          ? "法院文件｜命令 Dkt. 24｜2026-10-08"
          : "同期报道｜TorrentFreak｜2026-10-19"}
      </SourceTag>
    </Scene>
  );
};
