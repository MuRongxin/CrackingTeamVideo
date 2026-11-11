import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C, F } from "./style";
import { Circle, NameCursor, lerp, useTime } from "./components";
import { Act1Kicker, Act1Rule, Act1Scene, Act1Source } from "./act1/shared";
import type { ShotTiming } from "./timing";

const court = (name: string) => staticFile(`v38/court/${name}.png`);

const Document = ({ opacity = 1 }: { opacity?: number }) => {
  const t = useTime();
  // Locked editorial framings: cut between compositions, never drift within one.
  // The identity line deliberately keeps the defendant framing to avoid a second move.
  const framing =
    t < 6.52
      ? { scale: 0.88, x: 30, y: 30 }
      : t < 10.25
        ? { scale: 1.14, x: 170, y: -130 }
        : { scale: 1.42, x: 300, y: -520 };
  const reveal = lerp(t, 0.25, 1.85);
  const filedMark = lerp(t, 1.1, 1.45);
  const filedAttention = 1 - lerp(t, 5.65, 6.15);
  const stamp = lerp(t, 1.45, 1.7);
  const nameMark = lerp(t, 10.75, 11.25);
  const identityMark = lerp(t, 14.15, 14.65);

  return (
    <AbsoluteFill
      style={{
        opacity,
        scale: framing.scale,
        translate: `${framing.x}px ${framing.y}px`,
        transformOrigin: "960px 540px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 50,
          width: 1680,
          height: 1280,
          padding: "70px 100px",
          background: "#f4f0e6",
          color: C.ink,
          boxShadow: "0 45px 140px #000b, 0 0 0 1px #fff5",
          clipPath: `inset(0 0 ${(1 - reveal) * 100}% 0)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 895,
            top: 105,
            width: filedMark * 235,
            height: 42,
            opacity: filedAttention,
            background: "#6e8aa64d",
            mixBlendMode: "multiply",
          }}
        />
        <Img
          src={court("header")}
          style={{ width: 1390, display: "block", mixBlendMode: "multiply" }}
        />
        <div
          style={{
            margin: "64px 0 52px",
            borderTop: "1px solid #16213a24",
          }}
        />
        <Img
          src={court("court")}
          style={{
            width: 1060,
            marginLeft: 170,
            display: "block",
            mixBlendMode: "multiply",
          }}
        />
        <div
          style={{
            margin: "70px 0 46px",
            borderTop: "1px dashed #16213a2e",
          }}
        />
        <div style={{ position: "relative", width: 1320 }}>
          <Img
            src={court("plaintiff")}
            style={{ width: 850, display: "block", mixBlendMode: "multiply" }}
          />
          <div
            style={{
              position: "absolute",
              left: -20,
              top: -16,
              width: lerp(t, 5.85, 6.35, 0, 560),
              height: 105,
              border: `3px solid ${C.blue}`,
              opacity: lerp(t, 5.75, 6.05) * (1 - lerp(t, 9.8, 10.2)),
            }}
          />
        </div>
        <div
          style={{
            fontFamily: F.serif,
            fontSize: 38,
            fontStyle: "italic",
            margin: "28px 0",
          }}
        >
          vs.
        </div>
        <div style={{ position: "relative", width: 1320 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 28,
              width: 370 * nameMark,
              height: 90,
              background: "#ffc83daa",
              mixBlendMode: "multiply",
              rotate: "-0.7deg",
            }}
          />
          <div
            style={{
              position: "absolute",
              // Follow the source image's phrase bounds (350–1205 px),
              // below its first text line (104 px in the 1256 × 350 crop).
              left: `${(350 / 1256) * 100}%`,
              top: `${(104 / 350) * 100}%`,
              width: `${(855 / 1256) * 100}%`,
              scale: `${identityMark} 1`,
              transformOrigin: "left",
              height: 4,
              background: C.red,
            }}
          />
          <Img
            src={court("defendant")}
            style={{
              width: "100%",
              display: "block",
              mixBlendMode: "multiply",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            right: 95,
            top: 515,
            paddingLeft: 28,
            borderLeft: `2px solid ${C.ink}`,
            fontFamily: F.mono,
            fontSize: 24,
            lineHeight: 1.8,
          }}
        >
          COMPLAINT FOR
          <br />
          COPYRIGHT
          <br />
          INFRINGEMENT
        </div>
        <div
          style={{
            position: "absolute",
            right: 105,
            top: 350,
            padding: "10px 18px",
            border: `3px double ${C.red}`,
            color: C.red,
            fontFamily: F.mono,
            fontSize: 25,
            letterSpacing: 2,
            rotate: "-6deg",
            opacity: stamp * filedAttention,
            scale: 1.22 - stamp * 0.22,
          }}
        >
          FILED / 09.14.26
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 120,
          top: 50 + reveal * 1050,
          width: 1680,
          height: 3,
          background:
            "linear-gradient(90deg, transparent, #ffc83dcc 12%, #fff6 50%, #ffc83dcc 88%, transparent)",
          boxShadow: "0 0 28px #ffc83d70",
          opacity: lerp(t, 0.25, 0.4) * (1 - lerp(t, 1.7, 1.9)),
        }}
      />
    </AbsoluteFill>
  );
};

const ColdOpenVersus = ({ progress }: { progress: number }) => {
  const t = useTime();
  return (
    <AbsoluteFill
      style={{
        opacity: progress,
        background: "#080b0a",
        translate: `${lerp(t, 17.75, 18.35, 90, 0)}px 0`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "43%",
          background: "linear-gradient(110deg, #e9e3d7 0%, #cfc8ba 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 85,
          top: 250,
          color: C.ink,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 23, letterSpacing: 5 }}>
          PLAINTIFF / 原告
        </div>
        <div
          style={{
            marginTop: 48,
            fontFamily: F.mono,
            fontSize: 72,
            color: C.blue,
            lineHeight: 1.12,
          }}
        >
          DENUVO
          <br />
          GMBH
        </div>
        <div style={{ marginTop: 44, fontSize: 31 }}>奥地利公司</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: "43%",
          top: 0,
          bottom: 0,
          width: 2,
          background: `linear-gradient(transparent, ${C.red}, transparent)`,
          scale: `1 ${progress}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "41.5%",
          top: 475,
          width: 110,
          textAlign: "center",
          fontFamily: F.serif,
          fontStyle: "italic",
          fontSize: 48,
          color: C.red,
        }}
      >
        v.
      </div>
      <div
        style={{
          position: "absolute",
          right: 30,
          top: 70,
          fontFamily: F.mono,
          fontWeight: 700,
          fontSize: 490,
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "2px #ffc83d13",
        }}
      >
        38
      </div>
      <div style={{ position: "absolute", left: 940, top: 265 }}>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 23,
            letterSpacing: 5,
            color: "#859087",
          }}
        >
          DEFENDANT / 被告
        </div>
        <div style={{ marginTop: 55 }}>
          <NameCursor size={116} />
        </div>
        <div
          style={{
            marginTop: 62,
            fontFamily: F.mono,
            fontSize: 29,
            color: "#a7b0a8",
            opacity: lerp(t, 18.75, 19.25),
          }}
        >
          an unknown individual{" "}
          <span style={{ position: "relative", color: C.yellow }}>
            or
            <Circle progress={lerp(t, 19.25, 19.75)} color={C.yellow} />
          </span>{" "}
          entity
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 940,
          top: 670,
          fontSize: 34,
          color: "#cad0c8",
          opacity: lerp(t, 19.4, 20),
        }}
      >
        名字在案，身份未知。
      </div>
    </AbsoluteFill>
  );
};

export const ColdOpen = () => {
  const t = useTime();
  const versus = lerp(t, 17.55, 18.15);
  const hookOpacity = lerp(t, 0.25, 0.65) * (1 - lerp(t, 3.25, 3.9));
  const section =
    t < 6.52
      ? "01 / THE COMPLAINT"
      : t < 10.25
        ? "02 / PLAINTIFF"
        : t < 13.77
          ? "03 / DEFENDANT"
          : t < 17.75
            ? "04 / IDENTITY"
            : "05 / UNKNOWN";
  return (
    <Act1Scene>
      <Document opacity={1 - versus} />
      <Act1Kicker right="FILED 2026.09.14">{section}</Act1Kicker>
      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 180,
          width: 1150,
          padding: "34px 42px 38px",
          background: "#080b0aeb",
          borderLeft: `6px solid ${C.yellow}`,
          opacity: hookOpacity,
          translate: `0 ${lerp(t, 0.25, 0.8, 60, 0)}px`,
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 23,
            letterSpacing: 4,
            color: C.yellow,
            marginBottom: 18,
          }}
        >
          A NAME ON FILE
        </div>
        <div style={{ fontSize: 76, lineHeight: 1.25, fontWeight: 700 }}>
          Denuvo 起诉了一个网名。
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 75,
          top: 265,
          width: 470,
          padding: "34px 38px",
          background: "#101817ed",
          borderTop: `4px solid ${C.blue}`,
          opacity: lerp(t, 6.85, 7.3) * (1 - lerp(t, 9.65, 10.1)),
          zIndex: 8,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 22, color: "#8b9890" }}>
          PLAINTIFF / 原告
        </div>
        <div
          style={{
            marginTop: 25,
            fontFamily: F.mono,
            fontSize: 60,
            color: "#91afc7",
          }}
        >
          Denuvo GmbH
        </div>
        <div style={{ marginTop: 25, fontSize: 32 }}>奥地利公司</div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 70,
          top: 205,
          width: 690,
          padding: "44px 48px",
          background: "#0a0f0ded",
          borderTop: `4px solid ${C.red}`,
          opacity: lerp(t, 14, 14.4) * (1 - versus),
          zIndex: 9,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 21, color: "#929d95" }}>
          THE IDENTITY ON FILE
        </div>
        <div
          style={{
            marginTop: 36,
            fontFamily: F.mono,
            fontSize: 45,
            lineHeight: 1.5,
          }}
        >
          an <span style={{ color: "#ef7b6e" }}>unknown</span> individual
          <br />
          <span style={{ position: "relative", color: C.yellow }}>
            or
            <Circle progress={lerp(t, 15.3, 15.8)} color={C.yellow} />
          </span>{" "}
          entity
        </div>
        <div style={{ marginTop: 28, fontSize: 38 }}>身份不明的个人或实体</div>
      </div>
      <ColdOpenVersus progress={versus} />
      <AbsoluteFill
        style={{
          background: C.black,
          opacity: 1 - lerp(t, 0.05, 0.55),
          pointerEvents: "none",
          zIndex: 50,
        }}
      />
      <div style={{ opacity: 1 - hookOpacity }}>
        <Act1Source paper={t < 17.75}>
          {t < 17.75
            ? "法院文件｜起诉书 Dkt. 1｜2026-09-14"
            : "旁白概括｜据起诉书 Dkt. 1"}
        </Act1Source>
      </div>
      <div style={{ position: "absolute", left: 72, right: 72, top: 100 }}>
        <Act1Rule progress={Math.min(1, t / 21.68)} color="#ffc83d55" />
      </div>
    </Act1Scene>
  );
};

export { Subpoenas } from "./act1/AccountDiscovery";

export { Requests } from "./act1/CourtRequests";
