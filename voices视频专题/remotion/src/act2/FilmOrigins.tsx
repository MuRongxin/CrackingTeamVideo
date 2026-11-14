import { publicAsset } from "../assets";
import { Img, interpolate } from "remotion";
import { C, F } from "../style";
import { useTime, lerp, clamp } from "../components";
import type { ShotTiming } from "../timing";
import { FilmScene, GameStill, cue } from "./film-shared";

export const WhatNfo = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const explain = cue(timing, 14, "也就是");
  const arrive = lerp(t, 0.05, 0.8);
  const focus = lerp(t, explain - 0.18, explain + 1.0);
  // The source is 497 × 264. Its meaningful text starts at y=1;
  // y=23..32 is the version/DLC line. Keep these rows in view at both scales.
  const imageWidth = 1440 + focus * 260;
  return (
    <FilmScene
      title="随发行一起留下的文件"
      right="2025.10.14 / NFO"
      source="voices38 发行说明 · xREL"
    >
      <GameStill dark={0.73} />
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 145 + focus * 115,
          width: 1700,
          height: 680 - focus * 270,
          overflow: "hidden",
          background: "#fff",
          opacity: arrive,
          translate: `${(1 - arrive) * 1300}px ${(1 - arrive) * 170}px`,
          boxShadow: "0 30px 90px #0009",
        }}
      >
        <Img
          src={publicAsset("v38/act2/nfo/three-kingdoms-original.png")}
          style={{
            position: "absolute",
            left: (1700 - imageWidth) / 2,
            top: 20 + focus * 25,
            width: imageWidth,
            imageRendering: "pixelated",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 18,
            top: 45 + 32 * (1700 / 497) + 8,
            height: 3,
            width: lerp(t, explain + 0.45, explain + 1.2, 0, 1620),
            opacity: focus,
            background: C.yellow,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 180,
          fontSize: 36,
          color: C.yellow,
          opacity: focus,
          translate: `0 ${(1 - focus) * 30}px`,
        }}
      >
        随发行附带的说明
      </div>
    </FilmScene>
  );
};
export const OldNfo = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const detail = cue(timing, 16);
  const scroll = interpolate(
    t,
    [0.1, detail - 0.2, timing.duration - 0.08],
    [0, 0.06, 1],
    clamp,
  );
  const pages = [
    {
      name: "RELOADED · 2006",
      file: "reloaded-full.png",
      height: 1032,
      width: 624,
      ground: "#0000ff",
    },
    {
      name: "RAZOR 1911",
      file: "razor-full.png",
      height: 3861,
      width: 560,
      ground: "#fff",
    },
  ];
  return (
    <FilmScene
      title="老牌破解组的发行说明"
      right="RELOADED / RAZOR 1911"
      source="NFO 存档：NFOHump / xREL"
    >
      {pages.map((page, i) => (
        <div
          key={page.file}
          style={{
            position: "absolute",
            left: 24 + i * 960,
            top: 145,
            width: 912,
            height: 690,
            overflow: "hidden",
            background: page.ground,
          }}
        >
          <Img
            src={publicAsset(`v38/act2/nfo/${page.file}`)}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 912,
              imageRendering: "pixelated",
              translate: `0 ${-scroll * ((page.height * 912) / page.width - 690)}px`,
            }}
          />
        </div>
      ))}
      {pages.map((page, i) => (
        <div
          key={page.name}
          style={{
            position: "absolute",
            left: 35 + i * 960,
            top: 108,
            fontFamily: F.mono,
            fontSize: 23,
            color: i ? C.blue : C.yellow,
          }}
        >
          {page.name}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 958,
          top: 145,
          width: 3,
          height: 690,
          background: C.yellow,
        }}
      />
    </FilmScene>
  );
};

const SizeWheel = ({ value }: { value: number }) => (
  <div style={{ height: 220, width: 132, overflow: "hidden" }}>
    <div style={{ translate: `0 ${-value * 220}px` }}>
      {Array.from({ length: 40 }, (_, i) => (
        <div key={i} style={{ height: 220, lineHeight: "220px" }}>
          {i % 10}
        </div>
      ))}
    </div>
  </div>
);
export const TinyNfo = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const numberAt = cue(timing, 17, "只有");
  const shrink = lerp(t, cue(timing, 17, "和前辈"), numberAt - 0.3);
  const value = lerp(t, numberAt - 0.68, numberAt + 0.16, 0, 34);
  const impactAge = Math.max(0, t - numberAt - 0.16);
  const settle =
    t < numberAt + 0.16
      ? 0
      : Math.exp(-impactAge * 7) * Math.sin(impactAge * 22);
  return (
    <FilmScene
      title="和前辈们相比，只有这么大"
      right="NFO / xREL"
      source="voices38《全面战争：三国》发行说明"
    >
      <div
        style={{
          position: "absolute",
          left: 150 + shrink * 220,
          top: 245 + shrink * 110,
          width: 740,
          height: 335,
          background: "#fff",
          overflow: "hidden",
          opacity: lerp(t, 0.05, 0.5),
          scale: 1 - shrink * 0.64,
          transformOrigin: "0 50%",
          translate: `0 ${-Math.sin(t * 1.4) * 6}px`,
          boxShadow: "0 30px 80px #0008",
        }}
      >
        <Img
          src={publicAsset("v38/act2/nfo/three-kingdoms-original.png")}
          style={{ width: 740, imageRendering: "pixelated" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 365,
          top: 630,
          fontFamily: F.mono,
          fontSize: 31,
          color: C.gray,
          opacity: shrink,
          translate: `0 ${lerp(t, 2, 2.6, 30, 0)}px`,
        }}
      >
        voices38.nfo
      </div>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d="M660 520H950"
          stroke={C.gray}
          strokeWidth={2}
          strokeDasharray="5 12"
          opacity={shrink}
        />
        {Array.from({ length: 14 }, (_, i) => {
          const p = Math.max(0, Math.min(1, (t - 1.8 - i * 0.065) / 1.65));
          return (
            <rect
              key={i}
              x={670 + p * 285}
              y={515 + Math.sin(p * Math.PI * 2 + i) * 40 * (1 - p)}
              width={7}
              height={7}
              fill={C.yellow}
              opacity={p > 0 && p < 1 ? 0.7 : 0}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 1010,
          top: 290,
          color: C.yellow,
          opacity: lerp(t, numberAt - 1.1, numberAt - 0.65),
          scale: 1 + settle * 0.1,
        }}
      >
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 24,
            letterSpacing: 4,
            color: C.gray,
            marginBottom: 24,
          }}
        >
          FILE SIZE
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: F.mono,
            fontSize: 200,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <div style={{ height: 220, lineHeight: "220px" }}>0.</div>
          <SizeWheel
            value={Math.floor(value / 10) + lerp(value % 10, 8.5, 10)}
          />
          <SizeWheel value={value} />
          <span
            style={{
              fontSize: 51,
              marginLeft: 24,
              alignSelf: "flex-end",
              marginBottom: 30,
            }}
          >
            KB
          </span>
        </div>
        <div
          style={{
            height: 4,
            width: lerp(t, numberAt - 0.6, numberAt + 0.3, 0, 660),
            background: C.yellow,
            boxShadow: `0 0 ${Math.abs(settle) * 40}px ${C.yellow}`,
          }}
        />
      </div>
    </FilmScene>
  );
};
export const FewLines = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const languages = cue(timing, 19);
  const p = lerp(t, languages - 0.2, languages + 0.5);
  const codes = languages + 1.7;
  return (
    <FilmScene
      title="这份 NFO，几行就能读完"
      right="Total War / v1.7.1"
      source="voices38《全面战争：三国》发行说明节选"
    >
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 210 - p * 75,
          fontFamily: F.pixel,
          fontSize: 65,
          lineHeight: 1.5,
          translate: `${lerp(t, 0, 0.6, 100, 0)}px 0`,
        }}
      >
        <div style={{ fontSize: 40, color: C.gray, marginBottom: 34 }}>
          Total War - Three Kingdoms v1.7.1
        </div>
        <div style={{ color: p > 0.5 ? C.gray : C.white }}>
          Game is updated to the{" "}
          <span style={{ color: C.yellow }}>latest version</span>
          <br />
          and <span style={{ color: C.yellow }}>all DLCs</span> are included.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 510,
          fontFamily: F.pixel,
          fontSize: 50,
          color: C.white,
          opacity: p,
          translate: `0 ${(1 - p) * 100}px`,
        }}
      >
        How To Change Language:
      </div>
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 615,
          width: 1650,
          display: "flex",
          flexWrap: "wrap",
          gap: "28px 52px",
          fontFamily: F.mono,
          fontSize: 50,
        }}
      >
        {"EN BR CZ DE ES FR IT KR PO RU TR CN ZH".split(" ").map((code, i) => (
          <span
            key={code}
            style={{
              color: i > 10 ? C.yellow : C.white,
              opacity: lerp(t, codes + i * 0.06, codes + i * 0.06 + 0.2),
              translate: `0 ${lerp(t, codes + i * 0.06, codes + i * 0.06 + 0.3, 50, 0)}px`,
            }}
          >
            {code}
          </span>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 470 - p * 45,
          height: 3,
          width: lerp(t, 0.5, 1.7, 0, 1480),
          background: C.yellow,
          opacity: 1 - p,
        }}
      />
    </FilmScene>
  );
};
export const Versions = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const b = cue(timing, 21),
    c = cue(timing, 22),
    d = cue(timing, 23);
  const codex = lerp(t, b + 0.35, b + 0.9);
  const empress = lerp(t, c + 0.15, c + 0.7);
  const again = lerp(t, d + 0.1, d + 0.55);
  const drift = Math.sin(t * 0.45) * 12;
  return (
    <FilmScene
      title="同一款游戏，三个发行年份"
      right="字符 Logo 来自各自 NFO"
      source="发行记录：xREL"
    >
      <Img
        src={publicAsset("v38/act2/stills/three-kingdoms.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: 1920,
          height: 1080,
          objectFit: "cover",
          scale: 1.08 + t * 0.004,
          translate: `${-t * 8}px 0`,
          opacity: 1 - codex,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#f3efe6",
          opacity: codex * (1 - empress),
        }}
      />
      <Img
        src={publicAsset("v38/act2/nfo/codex-logo.png")}
        style={{
          position: "absolute",
          left: 70,
          top: 168,
          width: 1780,
          imageRendering: "pixelated",
          opacity: codex * (1 - empress),
          scale: 0.88 + codex * 0.14,
          translate: `0 ${drift}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#070b0a",
          opacity: empress * (1 - again),
        }}
      />
      <Img
        src={publicAsset("v38/act2/nfo/empress-logo.png")}
        style={{
          position: "absolute",
          left: 40,
          top: 340,
          width: 1840,
          imageRendering: "pixelated",
          filter: "invert(1)",
          opacity: empress * (1 - again),
          scale: 0.92 + empress * 0.1,
          translate: `0 ${-drift}px`,
        }}
      />
      <Img
        src={publicAsset("v38/act2/stills/three-kingdoms-2.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: 1920,
          height: 1080,
          objectFit: "cover",
          opacity: again,
          scale: 1.06 + again * 0.06,
          translate: `${again * -30}px 0`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(0deg,#050908d0,transparent 42%),linear-gradient(180deg,#05090888,transparent 28%)",
          opacity: (1 - codex) * (1 - empress) + again,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 108,
          fontFamily: F.mono,
          fontSize: 34,
          letterSpacing: 3,
          color: codex > empress && empress < 0.5 ? C.ink : C.white,
        }}
      >
        {again > 0.5 ? "2025.10" : empress > 0.5 ? "2020" : "2019"}
      </div>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 730,
          fontFamily: F.mono,
          fontSize: 72,
          color:
            again > 0.45
              ? C.yellow
              : codex > 0.5 && empress < 0.45
                ? C.ink
                : C.white,
        }}
      >
        {again > 0.45 ? "voices38" : codex > 0.4 && again < 0.45 ? "" : "首发"}
      </div>
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 250,
          fontSize: 180,
          color: C.yellow,
          opacity: lerp(t, d + 1.1, d + 1.5),
          rotate: `${lerp(t, d + 1.1, d + 1.6, -8, 0)}deg`,
        }}
      >
        ?
      </div>
    </FilmScene>
  );
};
const updatePulse = (t: number, at: number) =>
  lerp(t, at + 0.12, at + 0.2) * (1 - lerp(t, at + 0.27, at + 0.58));
export const Updates = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const approach = cue(timing, 24, "旧的破解");
  const attempt = cue(timing, 24, "后来更新的内容");
  const latest = cue(timing, 24, "voices38 处理");
  const k = lerp(t, latest + 0.1, latest + 0.85);
  const hit = Math.max(
    ...Array.from({ length: 6 }, (_, i) => updatePulse(t, attempt + i * 0.18)),
  );
  return (
    <FilmScene
      title="社区解释：后来的更新，加不进旧破解"
      right="Reddit / 版本更新讨论"
      source="Reddit · r/PiratedGames · 2025-10-14"
    >
      <GameStill dark={0.7} />
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 175,
          width: 710,
          height: 600,
          padding: 48,
          boxSizing: "border-box",
          background: "#e7e1d4",
          color: C.ink,
          opacity: 1 - k * 0.65,
          translate: `${-k * 220 - hit * 5}px 0`,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 25, color: "#5c6560" }}>
          OLD CRACK
        </div>
        <div style={{ fontSize: 80, marginTop: 22 }}>旧版本</div>
        <div
          style={{
            height: 7,
            width: 460,
            background: hit > 0.2 ? C.red : C.ink,
            marginTop: 48,
          }}
        />
        <div style={{ fontSize: 38, lineHeight: 1.6, marginTop: 42 }}>
          旧破解停在旧版本。
          <br />
          后来的更新，加不进去。
        </div>
      </div>
      {Array.from({ length: 6 }, (_, i) => {
        const at = attempt + i * 0.18;
        const initialX = 1000 + (i % 3) * 245;
        const impact = updatePulse(t, at);
        const x = interpolate(
          t,
          [at - 0.45, at + 0.12, at + 0.22, at + 0.68],
          [initialX, 784, 770, initialX + 32],
          clamp,
        );
        const enter = lerp(
          t,
          approach - 0.5 + i * 0.055,
          approach + 0.25 + i * 0.055,
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + (1120 - x) * k,
              top:
                230 +
                Math.floor(i / 3) * 240 +
                impact * (i % 2 ? 14 : -14) -
                k * 70,
              width: 300,
              height: 180,
              background: "#182a2b",
              border: `3px solid ${impact > 0.2 ? C.red : C.blue}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 58,
              color: C.white,
              boxShadow:
                impact > 0.2 ? "0 0 28px #c23b2e88" : "0 20px 40px #0009",
              opacity: enter * (1 - k),
              scale: `${1 - impact * 0.26 - k * 0.25} ${1 + impact * 0.1 - k * 0.25}`,
              rotate: `${((i % 3) - 1) * 4 - impact * 8}deg`,
              transformOrigin: "left center",
              translate: `${(1 - enter) * 400}px 0`,
            }}
          >
            更新
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 775,
          top: 190,
          width: 7,
          height: 570,
          background: C.red,
          opacity: hit * (1 - k),
          boxShadow: "0 0 35px #c23b2e",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 1050,
          top: 280,
          width: 670,
          height: 390,
          padding: 50,
          boxSizing: "border-box",
          background: "#111c17",
          border: `3px solid ${C.yellow}`,
          opacity: k,
          translate: `${(1 - k) * 330}px ${(1 - k) * 70}px`,
          scale: 0.86 + k * 0.14,
          rotate: `${(1 - k) * -6}deg`,
          boxShadow: "0 30px 90px #0009",
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 26, color: C.gray }}>
          NEW RELEASE / voices38
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 105,
            color: C.yellow,
            marginTop: 32,
          }}
        >
          v1.7.1
        </div>
        <div style={{ fontSize: 40, color: C.white, marginTop: 24 }}>
          最新版本 / 全部 DLC
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 810,
          fontFamily: F.mono,
          fontSize: 26,
          color: C.white,
          opacity: lerp(t, attempt, attempt + 0.3) * (1 - k),
        }}
      >
        “no updates could be added to it after some point.”
      </div>
    </FilmScene>
  );
};
