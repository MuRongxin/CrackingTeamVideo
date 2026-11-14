import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
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
import { Topline, TinyNote, Paper, Nameplate, Cursor } from "./shared";

export const VersionAxis = ({
  introduced = true,
}: {
  introduced?: boolean;
}) => {
  const t = useTime();
  return (
    <>
      <div style={{ position: "absolute", left: 170, right: 170, top: 640 }}>
        <Rule color="#16213a55" progress={introduced ? 1 : lerp(t, 0, 1.2)} />
      </div>
      {[2019, 2020, 2021, 2022, 2023, 2024, 2025].map((year, i) => (
        <div
          key={year}
          style={{
            position: "absolute",
            left: 230 + i * 207,
            top: 625,
            fontFamily: F.mono,
            color: i === 0 || i === 1 || i === 6 ? C.ink : "#9c9e98",
            fontSize: 30,
            textAlign: "center",
            width: 80,
          }}
        >
          <div
            style={{
              width: 2,
              height: 28,
              background: "#16213a77",
              margin: "0 auto 18px",
            }}
          />
          {year}
        </div>
      ))}
    </>
  );
};
export const Versions = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const codex = timing.voices[1].start + 0.9;
  const empress = timing.voices[2].start + 0.5;
  return (
    <Scene paper>
      <Topline label="全面战争：三国" right="2019 — 2025" paper />
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 235,
          fontSize: 61,
          opacity: lerp(t, 0.2, 0.7),
        }}
      >
        不是一款新游戏
      </div>
      <VersionAxis introduced={false} />
      <Nameplate
        name="CODEX"
        caption="C 组 · 既有发行"
        style={{
          position: "absolute",
          left: 150,
          top: 380,
          opacity: lerp(t, codex, codex + 0.4),
          translate: `0 ${lerp(t, codex, codex + 0.65, -50, 0)}px`,
        }}
      />
      <Nameplate
        name="EMPRESS"
        caption="女皇 · 相关发行"
        style={{
          position: "absolute",
          left: 360,
          top: 380,
          opacity: lerp(t, empress, empress + 0.4),
          translate: `0 ${lerp(t, empress, empress + 0.65, -50, 0)}px`,
        }}
      />
      <Nameplate
        name="voices38▮"
        caption="2025.10"
        active
        style={{
          position: "absolute",
          left: 1360,
          top: 380,
          opacity: lerp(t, 0.2, 0.7),
          translate: `0 ${Math.sin(t * 0.8) * 3}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 170,
          top: 740,
          fontSize: 28,
          color: C.gray,
        }}
      >
        首发：2019
      </div>
      {timing.voices[3] && (
        <div
          style={{
            position: "absolute",
            left: 1720,
            top: 365,
            fontSize: 85,
            color: C.red,
            opacity: lerp(
              t,
              timing.voices[3].start,
              timing.voices[3].start + 0.5,
            ),
          }}
        >
          ?
        </div>
      )}
      <SourceTag>发行记录：xREL</SourceTag>
    </Scene>
  );
};
export const Updates = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const bump = timing.voices[0].start + 3.7;
  const latest = timing.voices[0].start + 6;
  const hit = Math.max(0, t - bump);
  const bounce = hit < 1.7 ? Math.abs(Math.sin(hit * 6.3)) * 40 : 0;
  return (
    <Scene paper>
      <Topline label="社区解释：新的是游戏版本" right="VERSION HISTORY" paper />
      <div style={{ opacity: 1 - lerp(t, 0, 0.65) }}>
        <VersionAxis />
      </div>
      <Nameplate
        name="CODEX"
        caption="2019"
        style={{
          position: "absolute",
          left: lerp(t, 0, 0.65, 150, 130),
          top: lerp(t, 0, 0.65, 380, 255),
        }}
      />
      <Nameplate
        name="EMPRESS"
        caption="2020"
        style={{
          position: "absolute",
          left: lerp(t, 0, 0.65, 360, 480),
          top: lerp(t, 0, 0.65, 380, 255),
        }}
      />
      <Nameplate
        name="voices38▮"
        caption="2025.10"
        active
        style={{
          position: "absolute",
          left: lerp(t, 0, 0.65, 1360, 1350),
          top: lerp(t, 0, 0.65, 380, 255),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 425,
          height: 150,
          width: 2,
          background: C.ink,
          scale: `1 ${lerp(t, 0.5, 1.2)}`,
          transformOrigin: "top",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 570,
          top: 425,
          height: 150,
          width: 2,
          background: C.ink,
          scale: `1 ${lerp(t, 0.8, 1.5)}`,
          transformOrigin: "top",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 1450,
          top: 425,
          height: 150,
          width: 3,
          background: C.yellow,
          scale: `1 ${lerp(t, latest, latest + 0.6)}`,
          transformOrigin: "top",
        }}
      />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 160 + i * 170 + (i > 2 ? bounce : 0),
            top: 575,
            width: 122,
            height: 76,
            background: i < 3 ? "#d2d0c5" : "#e2e4de",
            border: `2px solid ${i < 3 ? C.ink : "#a9b5ba"}`,
            opacity: lerp(t, 0.4 + i * 0.08, 0.7 + i * 0.08),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 25,
            color: C.gray,
          }}
        >
          {i < 3 ? "旧版本" : "更新"}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 650,
          top: 550,
          width: 12,
          height: 122,
          background: C.red,
          opacity: lerp(t, 1, 1.3),
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 1420,
          top: 550,
          width: 330,
          height: 126,
          background: C.black,
          color: C.white,
          border: `2px solid ${t > latest ? C.yellow : C.blue}`,
          padding: "21px 28px",
          scale: 1 + Math.sin(t) * 0.003,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 42 }}>v1.7.1</div>
        <div style={{ fontSize: 27, color: C.gray, marginTop: 8 }}>
          全部 DLC
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 717,
          fontFamily: F.mono,
          fontSize: 31,
          color: C.ink,
          opacity: lerp(t, bump - 0.6, bump),
        }}
      >
        “…no updates could be added to it after some point.”
      </div>
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 775,
          fontSize: 30,
          color: C.gray,
          opacity: lerp(t, bump, bump + 0.4),
        }}
      >
        译述：后来的更新加不进去
      </div>
      <SourceTag>Reddit · r/PiratedGames · 2025-10-14</SourceTag>
      <TinyNote paper>版本位置为示意</TinyNote>
    </Scene>
  );
};
export const DenuvoShell = () => {
  const t = useTime();
  const shell = lerp(t, 0.65, 1.5);
  return (
    <Scene paper>
      <Topline label="v1.7.1 / 保护" right="DENUVO" paper />
      <svg width="1920" height="1080" style={{ position: "absolute" }}>
        <g transform={`translate(0 ${Math.sin(t * 0.8) * 5})`}>
          <path
            d="M570 370 L760 265 L950 370 L950 595 L760 705 L570 595 Z"
            fill="#dfe3df"
            stroke={C.ink}
            strokeWidth="2"
          />
          <path
            d="M570 370 L760 475 L950 370 M760 475 L760 705"
            fill="none"
            stroke={C.ink}
            strokeWidth="2"
          />
          <g opacity={shell}>
            <path
              d={`M${520 - 100 * (1 - shell)} 350 L760 215 L1000 350 L1000 625 L760 765 L520 625 Z`}
              fill="#6e8aa622"
              stroke={C.blue}
              strokeWidth="14"
            />
            <path
              d="M520 350 L760 490 L1000 350 M760 490 L760 765"
              stroke={C.blue}
              strokeWidth="5"
              fill="none"
            />
          </g>
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          left: 655,
          top: 380,
          fontFamily: F.mono,
          fontSize: 40,
          color: C.ink,
        }}
      >
        v1.7.1
      </div>
      <div
        style={{
          position: "absolute",
          left: 1130,
          top: 375,
          opacity: lerp(t, 0.7, 1.3),
          translate: `${lerp(t, 0.7, 1.3, 80, 0)}px 0`,
        }}
      >
        <Eyebrow>这一版使用的保护</Eyebrow>
        <div style={{ fontFamily: F.mono, fontSize: 86, color: C.blue }}>
          Denuvo
        </div>
        <div style={{ fontSize: 35, marginTop: 30 }}>俗称 D 加密</div>
      </div>
    </Scene>
  );
};
export const LayerDiagram = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const outer = timing.voices[0].start + 2.8;
  const arrow = lerp(t, outer + 1.3, outer + 2.1);
  return (
    <Scene paper>
      <Topline label="保护与验证，各在一层" right="CONCEPT / 技术示意" paper />
      <svg width="1920" height="1080" style={{ position: "absolute" }}>
        <defs>
          <pattern
            id="shell-hatch"
            width="15"
            height="15"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(30)"
          >
            <path d="M0 0 V15" stroke={C.blue} strokeWidth="3" />
          </pattern>
        </defs>
        <rect
          x="310"
          y="265"
          width="750"
          height="485"
          rx="75"
          fill="url(#shell-hatch)"
          stroke={C.blue}
          strokeWidth="3"
        />
        <rect x="335" y="290" width="700" height="435" rx="52" fill={C.paper} />
        <rect
          x="415"
          y="365"
          width="540"
          height="285"
          rx="28"
          fill="#e5e7e0"
          stroke={C.ink}
          strokeWidth={t < outer ? 4 + Math.sin(t * 5) * 1.5 : 3}
        />
        <rect
          x="565"
          y="450"
          width="240"
          height="110"
          rx="5"
          fill="#fffdf5"
          stroke="#16213a55"
          strokeWidth="2"
        />
        <path
          d="M955 410 L1150 335 L1220 335"
          stroke={C.ink}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M1060 625 L1150 650 L1220 650"
          stroke={C.blue}
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M100 510 L282 510 L245 390 L292 310"
          stroke={C.red}
          strokeWidth="4"
          strokeDasharray="8 12"
          fill="none"
          opacity={arrow}
          pathLength="1"
          strokeDashoffset={-t * 0.15}
        />
        <path
          d="M278 301 L295 310 L290 329 M282 510 L263 500 M282 510 L267 525"
          fill="none"
          stroke={C.red}
          strokeWidth="4"
          opacity={arrow}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 566,
          top: 480,
          width: 240,
          textAlign: "center",
          fontSize: 38,
        }}
      >
        游戏程序
      </div>
      <div style={{ position: "absolute", left: 1225, top: 290 }}>
        <div style={{ fontSize: 49 }}>正版验证</div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 27,
            color: C.gray,
            marginTop: 16,
          }}
        >
          例如 Steam
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1225,
          top: 575,
          opacity: lerp(t, outer - 0.3, outer + 0.3),
          translate: `0 ${lerp(t, outer - 0.3, outer + 0.4, 30, 0)}px`,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 57, color: C.blue }}>
          Denuvo
        </div>
        <div style={{ fontSize: 43, marginTop: 15 }}>反篡改层</div>
      </div>
    </Scene>
  );
};
const salesPath =
  "M190 715 C215 700 220 275 300 285 C450 290 440 510 650 585 C880 665 1160 685 1720 702";
export const SalesCurve = ({
  progress = 1,
  tail = false,
}: {
  progress?: number;
  tail?: boolean;
}) => {
  const t = useTime();
  return (
    <svg width="1920" height="1080" style={{ position: "absolute" }}>
      <defs>
        <clipPath id="curve-progress">
          <rect x="0" y="0" width={190 + progress * 1560} height="1080" />
        </clipPath>
        <linearGradient id="window-fill" x1="0" x2="0" y1="0" y2="1">
          <stop stopColor={C.blue} stopOpacity=".4" />
          <stop offset="1" stopColor={C.blue} stopOpacity=".04" />
        </linearGradient>
      </defs>
      <path
        d="M180 240 V735 H1750"
        stroke="#16213a66"
        strokeWidth="2"
        fill="none"
      />
      <g clipPath="url(#curve-progress)">
        <path
          d="M190 715 C215 700 220 275 300 285 C450 290 440 510 650 585 L650 735 L190 735Z"
          fill="url(#window-fill)"
          opacity={tail ? 0.2 : 1}
        />
        <path d={salesPath} fill="none" stroke={C.blue} strokeWidth="6" />
      </g>
      {!tail && (
        <circle cx="300" cy="285" r={8 + Math.sin(t * 2) * 2} fill={C.blue} />
      )}
    </svg>
  );
};
