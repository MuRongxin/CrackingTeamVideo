import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { Video } from "@remotion/media";
import { vignette } from "@remotion/effects/vignette";
import { saturation } from "@remotion/effects/saturation";
import { noise } from "@remotion/effects/noise";
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
import {
  Cursor,
  DateCard,
  TerminalPanel,
  Topline,
  TinyNote,
  TypedText,
} from "./shared";
const footage = {
  river: staticFile("v38/act2/footage/river.mp4"),
  army: staticFile("v38/act2/footage/army.mp4"),
  snow: staticFile("v38/act2/footage/snow.mp4"),
};
const videoEffects = [
  saturation({ amount: 0.8 }),
  vignette({ amount: 0.38, radius: 0.58 }),
  noise({ amount: 0.018, seed: 38 }),
];

export const Rewind = () => {
  const t = useTime();
  const rewind = interpolate(
    t,
    [0.25, 0.65, 1.3, 1.65],
    [0, 0.025, 0.74, 1],
    clamp,
  );
  const start = Date.UTC(2026, 8, 14),
    end = Date.UTC(2025, 9, 14);
  const date = new Date(start + (end - start) * rewind)
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, ".");
  return (
    <Scene>
      <div
        style={{
          position: "absolute",
          top: 340,
          left: 180,
          right: 180,
          textAlign: "center",
          fontFamily: F.mono,
          fontSize: 126,
          color: C.white,
          letterSpacing: 4,
          translate: `${t > 0.25 && t < 1.65 ? Math.sin(t * 160) * 10 : 0}px 0`,
        }}
      >
        {t < 0.25 ? (
          <Cursor size={96} />
        ) : (
          <>
            {date}
            <Cursor size={110} />
          </>
        )}
      </div>
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: (i * 151 + t * 720) % 1080,
            left: -40,
            right: -40,
            height: 3 + (i % 3) * 5,
            background: "#d1ddda1c",
            opacity: t > 0.25 && t < 1.65 ? 0.6 : 0,
            translate: `${Math.sin(t * 130 + i) * 130}px 0`,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 570,
          textAlign: "center",
          opacity: lerp(t, 1.7, 2),
          translate: `0 ${lerp(t, 1.7, 2.2, 24, 0)}px`,
        }}
      >
        <div style={{ fontSize: 31, color: C.gray, letterSpacing: 9 }}>
          第二幕
        </div>
        <div style={{ fontSize: 68, marginTop: 22 }}>第一次尝试</div>
      </div>
    </Scene>
  );
};
export const OldGame = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const { fps } = useVideoConfig();
  return (
    <Scene>
      <Video
        name="河流与城池 · 11—14秒"
        src={footage.river}
        durationInFrames={3 * fps}
        muted
        effects={videoEffects}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        objectFit="cover"
      />
      <Video
        name="大军列阵 · 51秒起"
        src={footage.army}
        from={3 * fps}
        durationInFrames={Math.round(Math.min(5, timing.duration - 3) * fps)}
        muted
        effects={videoEffects}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        objectFit="cover"
      />
      {timing.duration > 8 && (
        <Sequence
          name="官方静帧 · 缓推"
          from={8 * fps}
          durationInFrames={Math.ceil((timing.duration - 8) * fps)}
        >
          <OfficialStill />
        </Sequence>
      )}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(0deg,#000e 0%,transparent 55%,#0006 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 180,
          fontFamily: F.cn,
          fontSize: 36,
          letterSpacing: 8,
          color: "#fff9",
          opacity: lerp(t, 0.1, 0.8),
        }}
      >
        全面战争：三国
      </div>
      <DateCard
        date="2025.10.14"
        style={{
          position: "absolute",
          left: 130,
          top: 625,
          translate: `0 ${lerp(t, 0, 0.8, 50, 0)}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 710,
          fontSize: 37,
          color: C.white,
          opacity: lerp(t, 2, 2.4),
        }}
      >
        首发：2019 年{" "}
        <span style={{ fontSize: 28, color: "#c8c8bb", marginLeft: 28 }}>
          六年前的游戏
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          right: 135,
          top: 700,
          fontFamily: F.mono,
          fontSize: 54,
          color: C.white,
          opacity: lerp(t, 5.8, 6.5),
        }}
      >
        v1.7.1
      </div>
      <SourceTag>游戏画面：SEGA 官方资料</SourceTag>
    </Scene>
  );
};
export const Signature = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const { fps } = useVideoConfig();
  const nameStart = timing.voices[0].start + 0.6;
  return (
    <Scene>
      <Video
        name="雪地骑兵与大军 · 26—29秒"
        src={footage.snow}
        playbackRate={3 / timing.duration}
        durationInFrames={Math.round(timing.duration * fps)}
        muted
        effects={videoEffects}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        objectFit="cover"
      />
      <AbsoluteFill style={{ background: "#0009" }} />
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 280,
          right: 150,
          scale: 1 + t * 0.003,
        }}
      >
        <Eyebrow dark>RELEASE NAME / 发布名</Eyebrow>
        <div style={{ fontFamily: F.mono, fontSize: 67, lineHeight: 1.5 }}>
          {" "}
          <TypedText text="Total.War.Three.Kingdoms." start={0.15} speed={40} />
          <br />
          <span style={{ color: C.white, opacity: lerp(t, 0.8, 1.1) }}>
            v1.7.1
          </span>
          <span style={{ color: C.yellow }}>
            <TypedText text="-voices38" start={nameStart} speed={23} />
            {t > nameStart + 0.4 && <Cursor size={67} />}
          </span>
        </div>
        <div style={{ width: 450, marginTop: 38 }}>
          <Rule color="#e9ede66a" progress={lerp(t, 0.4, 1.5)} />
        </div>
      </div>
      <SourceTag>xREL 发行记录 · 2025-10-14</SourceTag>
    </Scene>
  );
};
export const WhatNfo = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const pull = lerp(t, 1.2, 3);
  return (
    <Scene>
      <Topline label="Total.War.Three.Kingdoms.v1.7.1" right="RELEASE / 发行" />
      <div
        style={{
          position: "absolute",
          left: 310,
          top: 340,
          width: 500,
          height: 350,
          border: `2px solid ${C.blue}`,
          background: "#182322",
          rotate: `${-3 + t * 0.2}deg`,
          translate: `${-pull * 60}px 0`,
          boxShadow: "0 30px 80px #0006",
        }}
      >
        <div
          style={{
            height: 75,
            borderBottom: `1px solid ${C.blue}`,
            background: "#6e8aa61c",
          }}
        />
        <div
          style={{
            fontSize: 93,
            textAlign: "center",
            marginTop: 45,
            color: C.white,
          }}
        >
          发行
        </div>
      </div>
      <svg width="1920" height="1080" style={{ position: "absolute" }}>
        <path
          d="M850 520 C1030 520 980 410 1120 410"
          stroke={C.blue}
          strokeWidth="2"
          strokeDasharray="5 9"
          fill="none"
          pathLength="1"
          strokeDashoffset={1 - pull}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: lerp(t, 1.2, 3, 450, 1090),
          top: lerp(t, 1.2, 3, 350, 275),
          width: 380,
          height: 440,
          background: C.paper,
          color: C.ink,
          padding: 50,
          rotate: `${lerp(t, 1.2, 3, -6, 3)}deg`,
          scale: lerp(t, 1.2, 3, 0.55, 1),
          boxShadow: "0 25px 70px #0007",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 70,
            height: 70,
            background: "linear-gradient(45deg,#dedace 50%,#0a0c0b 50%)",
          }}
        />
        <div style={{ fontFamily: F.mono, fontSize: 82, marginTop: 68 }}>
          .nfo
        </div>
        <div
          style={{ height: 2, background: "#16213a33", margin: "35px 0 24px" }}
        />
        <div style={{ fontSize: 45 }}>说明文件</div>
      </div>
      <TinyNote>随发行附带的文字说明</TinyNote>
    </Scene>
  );
};
export const OldNfo = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const tagsAt = timing.voices[1].start;
  const mottoAt = tagsAt + 2.4;
  const motto = lerp(t, mottoAt, mottoAt + 0.7);
  return (
    <Scene>
      <Topline label="RELOADED / 2006" right="NFO AS AN ARTIFACT" />
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 215,
          width: 1120,
          height: 570,
          overflow: "hidden",
          background: "#060908",
          border: "1px solid #ffffff20",
        }}
      >
        <Img
          src={staticFile("v38/act2/nfo/reloaded-header.png")}
          style={{
            position: "absolute",
            width: 1248,
            height: 876,
            maxWidth: "none",
            left: -64,
            top: interpolate(t, [0, mottoAt], [0, -430], clamp),
            imageRendering: "pixelated",
            opacity: 1 - motto * 0.8,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 45,
            right: 45,
            top: 250,
            opacity: motto,
          }}
        >
          <div
            style={{
              fontFamily: F.pixel,
              fontSize: 40,
              color: C.gray,
              marginBottom: 28,
            }}
          >
            GROUPNOTES / 原文节选
          </div>
          <Img
            src={staticFile("v38/act2/nfo/reloaded-motto.png")}
            style={{
              width: 1134,
              height: 48,
              maxWidth: "none",
              marginLeft: -45,
              imageRendering: "pixelated",
            }}
          />
          <div style={{ marginTop: 38, fontSize: 25, color: C.gray }}>
            只展示口号所在行
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 1310, top: 275, width: 480 }}>
        {["字符画 Logo", "成员名单", "组织口号", "写给对手的挑衅"].map(
          (label, i) => {
            const a = i === 3 ? timing.voices[1].start + 4 : tagsAt + i * 1.1;
            return (
              <div
                key={label}
                style={{
                  position: "relative",
                  fontSize: 44,
                  marginBottom: 36,
                  paddingLeft: 25,
                  borderLeft: `3px solid ${i === 2 ? C.blue : "#6e8aa65a"}`,
                  opacity: lerp(t, a, a + 0.3),
                  translate: `${lerp(t, a, a + 0.5, 70, 0)}px 0`,
                }}
              >
                {label}
              </div>
            );
          },
        )}
      </div>
      <SourceTag>
        RELOADED 发行说明 · NFOHump 存档
      </SourceTag>
    </Scene>
  );
};
const miniLines = [
  "Total War - Three Kingdoms v1.7.1",
  "Game is updated to the latest version",
  "and all DLCs are included.",
  "How To Change Language:",
  "EN BR CZ DE ES FR IT KR PO RU TR CN ZH",
];
export const TinyNfo = () => {
  const t = useTime();
  const lens = lerp(t, 1, 2.1);
  return (
    <Scene>
      <div
        style={{
          position: "absolute",
          left: 870,
          top: 450,
          width: 480,
          fontFamily: F.pixel,
          fontSize: 25,
          color: C.white,
          scale: 0.04,
          transformOrigin: "top left",
          whiteSpace: "pre",
        }}
      >
        {miniLines.join("\n")}
      </div>
      <div
        style={{
          position: "absolute",
          left: lerp(t, 1, 2.1, 1300, 700),
          top: lerp(t, 1, 2.1, 670, 300),
          width: 340,
          height: 340,
          border: `5px solid ${C.white}`,
          borderRadius: "50%",
          opacity: lens,
          background: "#12201be6",
          boxShadow: "0 0 65px #a4c9b511",
          rotate: `${lerp(t, 1, 2.1, 25, -12)}deg`,
          overflow: "visible",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 286,
            top: 280,
            width: 120,
            height: 11,
            background: C.white,
            rotate: "45deg",
            transformOrigin: "left",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 42,
            top: 110,
            width: 254,
            overflow: "hidden",
            fontFamily: F.pixel,
            fontSize: 14,
            lineHeight: 1.5,
            color: "#e9ede69c",
            whiteSpace: "pre",
          }}
        >
          {miniLines.join("\n")}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1180,
          top: 625,
          fontFamily: F.mono,
          fontSize: 95,
          opacity: lerp(t, 1.65, 2.1),
          translate: `0 ${lerp(t, 1.65, 2.1, 35, 0)}px`,
        }}
      >
        0.34 <span style={{ fontSize: 45 }}>KB</span>
      </div>
      <SourceTag>voices38 发行说明 · xREL</SourceTag>
    </Scene>
  );
};
export const FewLines = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const languageAt = timing.voices[1].start;
  const codesAt = languageAt + 1.7;
  const zoom = lerp(t, timing.duration - 1, timing.duration);
  const count = Math.floor(
    interpolate(t, [codesAt, codesAt + 0.87], [0, 13], clamp),
  );
  return (
    <Scene>
      <Topline label="NFO / 文字重排" right="0.34 KB" />
      <TerminalPanel
        title="Total War - Three Kingdoms v1.7.1"
        style={{
          position: "absolute",
          left: 120,
          top: 235,
          width: 1680,
          height: 590,
          scale: lerp(t, 0, 0.6, 1.07, 1) - zoom * 0.035,
          transformOrigin: "center",
        }}
      >
        <div
          style={{
            padding: "38px 42px",
            fontFamily: F.pixel,
            fontSize: 44,
            lineHeight: 1.25,
            color: C.white,
          }}
        >
          <div>
            <TypedText
              text="Total War - Three Kingdoms v1.7.1"
              start={0.2}
              speed={60}
            />
          </div>
          <div
            style={{
              fontFamily: F.cn,
              fontSize: 26,
              color: C.gray,
              margin: "9px 0 28px",
            }}
          >
            全面战争：三国 · v1.7.1
          </div>
          <div style={{ maxWidth: 1400 }}>
            <TypedText
              text="Game is updated to the latest version and all DLCs are included."
              start={1.1}
              speed={60}
            />
          </div>
          <div
            style={{
              fontFamily: F.cn,
              fontSize: 26,
              color: C.gray,
              marginTop: 12,
              opacity: lerp(t, 2, 2.3),
            }}
          >
            已更新至最新版本，包含全部 DLC
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 36,
              opacity: lerp(t, languageAt, languageAt + 0.25),
            }}
          >
            How To Change Language:
            <br />
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 32,
            top: 90,
            width: 130,
            borderLeft: "1px solid #8a8f9833",
            paddingLeft: 30,
            fontFamily: F.pixel,
            fontSize: 30,
            lineHeight: "31px",
          }}
        >
          {"EN BR CZ DE ES FR IT KR PO RU TR CN ZH"
            .split(" ")
            .map((code, i) => (
              <div
                key={code}
                style={{
                  opacity: count > i ? 1 : 0,
                  translate: `0 ${lerp(t, codesAt + i / 15, codesAt + i / 15 + 0.15, -10, 0)}px`,
                }}
              >
                {code}
              </div>
            ))}
        </div>
      </TerminalPanel>
      <div
        style={{
          position: "absolute",
          right: 175,
          top: 778,
          fontFamily: F.mono,
          color: C.blue,
          fontSize: 32,
          opacity: lerp(t, codesAt, codesAt + 0.2),
        }}
      >
        {String(count).padStart(2, "0")} / 13
      </div>
      <SourceTag>voices38 发行说明节选 · 2025-10-14</SourceTag>
    </Scene>
  );
};
const OfficialStill = () => {
  const t = useTime();
  return (
    <Img
      src={staticFile("v38/act2/stills/three-kingdoms.jpg")}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        scale: 1 + t * 0.009,
      }}
    />
  );
};
