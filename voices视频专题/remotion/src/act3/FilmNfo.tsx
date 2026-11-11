import { publicAsset } from "../assets";
import { Img, Sequence, interpolate, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { C, F } from "../style";
import { lerp, useTime, clamp } from "../components";
import type { ShotTiming } from "../timing";
import { FilmScene } from "../act2/film-shared";
import { say } from "./timing";
import { nitroAt, doorAt } from "./motion";

export const NfoGrows = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const grow = say(timing, 55);
  const logo = say(timing, 56);
  const fields = say(timing, 57);
  const pull = lerp(t, grow - 0.1, grow + 0.9);
  const down = lerp(t, fields + 0.45, fields + 1.3);
  const values = [
    ["RELEASE NAME", "Need.For.Speed.Hot.Pursuit.\nRemastered-voices38"],
    ["RELEASE DATE", "11/18/2025"],
    ["FORMAT", "ISO"],
    ["PROTECTION", "Denuvo + EA"],
  ];
  return (
    <FilmScene
      title="随着新游戏不断出现"
      right="NFO / 逐渐完整"
      source="NFO 原文及题头｜V02、V16、V06｜字段重排"
    >
      <div
        style={{
          position: "absolute",
          left: 140 - pull * 700,
          top: 260,
          width: 1500,
          fontFamily: F.pixel,
          fontSize: 60,
          color: C.white,
          opacity: 1 - pull,
          scale: 1 - pull * 0.5,
          transformOrigin: "left center",
        }}
      >
        Total War - Three Kingdoms v1.7.1
        <br />
        <br />
        Game is updated to the latest version
        <br />
        and all DLCs are included.
      </div>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 1280 - i * 110,
            top: 210 + i * 100,
            width: 640,
            height: 315,
            rotate: `${(i - 1) * 5}deg`,
            background: "#090c09",
            boxShadow: "0 15px 40px #0009",
            opacity: lerp(t, 0.5 + i * 1.1, 0.9 + i * 1.1) * (1 - pull),
            translate: `${lerp(t, 0.5 + i * 1.1, 1.3 + i * 1.1, 500, 0)}px 0`,
          }}
        >
          <Img
            src={publicAsset("v38/evidence/nfo-sheet.png")}
            style={{ width: 640, height: 314, imageRendering: "pixelated" }}
          />
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 140 + (1 - pull) * 1700,
          top: 200 - down * 445,
          width: 1640,
        }}
      >
        <Img
          src={publicAsset("v38/act3/nfo/voices-header.png")}
          style={{
            width: 1280,
            height: 422,
            imageRendering: "pixelated",
            clipPath: `inset(0 ${100 * (1 - lerp(t, logo, logo + 0.9))}% 0 0)`,
          }}
        />
        <div style={{ marginTop: 30 }}>
          {values.map(([key, value], i) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "baseline",
                marginTop: 30,
                gap: 48,
                opacity: lerp(
                  t,
                  fields + 0.15 + i * 0.65,
                  fields + 0.45 + i * 0.65,
                ),
                translate: `${lerp(t, fields + 0.15 + i * 0.65, fields + 0.75 + i * 0.65, 100, 0)}px 0`,
                fontFamily: F.mono,
              }}
            >
              <span
                style={{
                  fontSize: 29,
                  color: C.gray,
                  width: 300,
                  flexShrink: 0,
                }}
              >
                {key}
              </span>
              <span
                style={{
                  fontSize: i === 0 ? 40 : 51,
                  color: i === 3 ? C.yellow : C.white,
                  whiteSpace: "pre-line",
                  lineHeight: 1.25,
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 805,
          width: lerp(t, fields + 2, fields + 4, 0, 1610),
          height: 2,
          background: C.yellow,
        }}
      />
    </FilmScene>
  );
};
export const KindIntro = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const joke = say(timing, 60);
  const p = lerp(t, joke - 0.1, joke + 0.55);
  return (
    <FilmScene
      title="有一个字段，越来越有意思"
      right="KIND / 游戏类型"
      source="NFO 字段｜V16、V10、V15｜编辑释义"
    >
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 195,
          fontFamily: F.mono,
          fontSize: 110,
          color: C.gray,
        }}
      >
        KIND
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 355,
          width: 1650,
          height: 230,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: 115,
            translate: `${-p * 1600}px 0`,
            opacity: 1 - p,
          }}
        >
          游戏类型
          <span style={{ fontFamily: F.mono, color: C.gray, marginLeft: 50 }}>
            ?
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            fontSize: 112,
            color: C.yellow,
            translate: `${(1 - p) * 1700}px 0`,
          }}
        >
          玩家的玩笑。
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 630,
          fontFamily: F.mono,
          fontSize: 47,
          color: C.white,
          clipPath: `inset(0 ${100 * (1 - lerp(t, joke + 0.45, joke + 1.3))}% 0 0)`,
          translate: `${lerp(t, joke + 0.5, joke + 2.2, 180, 0)}px 0`,
        }}
      >
        Fast Cars on Nitro{" "}
        <span style={{ color: C.gray, marginLeft: 60 }}>→</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 580,
          width: 1480,
          height: 3,
          background: C.yellow,
          scale: `${p} 1`,
          transformOrigin: "left",
        }}
      />
    </FilmScene>
  );
};
export const Nitro = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const { fps } = useVideoConfig();
  const boost = nitroAt(timing);
  return (
    <FilmScene
      title="极品飞车：热力追踪 重制版"
      right="KIND / V16"
      source="游戏背景｜EA 官方 Gameplay；KIND 原文｜V16"
    >
      <Video
        src={publicAsset("v38/film/nfs.mp4")}
        muted
        durationInFrames={Math.round(5.12 * fps)}
        style={{
          position: "absolute",
          inset: 0,
          width: 1920,
          height: 1080,
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg,#040b0cf2,#040b0c99 43%,#040b0c15 77%),linear-gradient(0deg,#040b0ccc,transparent 50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 240,
          fontFamily: F.mono,
          fontSize: 108,
          lineHeight: 1.2,
          color: C.white,
        }}
      >
        Fast Cars
        <br />
        on{" "}
        <span
          style={{
            color: t > boost ? C.yellow : C.white,
            letterSpacing: t > boost ? 3 : 0,
          }}
        >
          Nitro
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 660,
          fontSize: 63,
          color: C.yellow,
          translate: `${lerp(t, boost, boost + 0.3, 0, -25)}px 0`,
        }}
      >
        加满氮气的快车
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 770,
          width: lerp(t, boost, boost + 0.3, 0, 1500),
          height: 3,
          background: C.yellow,
          opacity: 1 - lerp(t, boost + 0.5, boost + 0.85),
        }}
      />
    </FilmScene>
  );
};
const Item = ({ type }: { type: number }) => (
  <svg
    width={100}
    height={100}
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth={4}
  >
    {type === 0 ? (
      <>
        <circle cx={30} cy={28} r={17} />
        <path d="M43 42L85 84M60 58L73 45M74 73L87 60" />
      </>
    ) : type === 1 ? (
      <>
        <path d="M50 8L63 29L87 36L74 57L77 82L51 74L30 90L24 65L7 48L30 32Z" />
        <circle cx={49} cy={49} r={12} />
      </>
    ) : (
      <>
        <path d="M15 15H55V35H86V68H58V87H26V64H9V35H15Z" />
        <circle cx={45} cy={49} r={10} />
      </>
    )}
  </svg>
);
export const ZombiePuzzle = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const { fps } = useVideoConfig();
  const search = say(timing, 63);
  const open = doorAt(timing);
  const p = lerp(t, open, open + 0.65);
  return (
    <FilmScene
      title="生化危机：安魂曲"
      right="KIND / V10"
      source="游戏背景｜CAPCOM 官方宣传片；KIND｜V10 · 道具为概念示意"
    >
      <Img
        src={publicAsset("v38/film/requiem-corridor.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: 1920,
          height: 1080,
          objectFit: "cover",
          scale: 1 + t * 0.002,
        }}
      />
      <Sequence durationInFrames={Math.round(3.3 * fps)}>
        <Video
          src={publicAsset("v38/film/requiem-establish.mp4")}
          muted
          style={{ width: 1920, height: 1080, objectFit: "cover" }}
        />
      </Sequence>
      <Sequence
        from={Math.round(3.3 * fps)}
        durationInFrames={Math.round(2.8 * fps)}
      >
        <Video
          src={publicAsset("v38/film/requiem-corridor.mp4")}
          muted
          style={{ width: 1920, height: 1080, objectFit: "cover" }}
        />
      </Sequence>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(0deg,#040a0af5,#040a0a85 70%),linear-gradient(90deg,#040a0aa0,transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 170,
          fontFamily: F.mono,
          fontSize: 73,
        }}
      >
        Zombie Puzzle Simulator
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 282,
          fontSize: 58,
          color: C.yellow,
        }}
      >
        僵尸解谜模拟器
      </div>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d="M190 500H450V700H720V450H1030V730H1310"
          fill="none"
          stroke="#6e8aa655"
          strokeWidth={3}
        />
        <path
          d="M190 760H400M550 430V560H850M830 800H1180V565H1260"
          fill="none"
          stroke="#6e8aa633"
          strokeWidth={2}
        />
        <rect
          x={1370}
          y={400}
          width={290}
          height={420}
          fill="#17262b"
          stroke={C.blue}
          strokeWidth={3}
        />
        <rect x={1378} y={408} width={274} height={404} fill="#030806" />
        <rect x={1640} y={414} width={14 * p} height={392} fill={C.yellow} />
        <path
          d={`M1378 408L${1652 - p * 55} ${408 + p * 22}V${812 - p * 22}L1378 812Z`}
          stroke={C.blue}
          strokeWidth={3}
          fill="#172429"
        />
        <circle
          cx={1605 - p * 44}
          cy={638}
          r={9}
          fill={p ? C.yellow : C.gray}
        />
      </svg>
      {[0, 1, 2].map((i) => {
        const at = search + 1 + i * 0.85;
        const move = lerp(t, at, open - 0.1);
        const x = [200, 660, 1010][i];
        const y = [460, 630, 420][i];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x + (1450 - x) * move,
              top: y + (575 - y) * move,
              color: i === 0 ? C.yellow : C.white,
              opacity:
                lerp(t, search + i * 0.25, search + i * 0.25 + 0.3) *
                (1 - lerp(t, open - 0.05, open + 0.15)),
              rotate: `${(i - 1) * 15 * (1 - move)}deg`,
              scale: 1.25 - move * 0.5,
            }}
          >
            <Item type={i} />
          </div>
        );
      })}
    </FilmScene>
  );
};
export const MI6 = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const relation = say(timing, 65);
  const p = lerp(t, relation, relation + 0.8);
  return (
    <FilmScene
      title="007：初露锋芒"
      right="KIND / V15"
      source="游戏背景｜007 官方宣传片；NFO｜V15 · 开发商关系图解"
    >
      <Video
        src={publicAsset("v38/film/bond.mp4")}
        muted
        style={{
          position: "absolute",
          inset: 0,
          width: 1920,
          height: 1080,
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg,#040b0ced,#040b0c44),linear-gradient(0deg,#040b0cdd,transparent 65%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 180,
          fontFamily: F.mono,
          fontSize: 105,
          color: C.white,
        }}
      >
        The <span style={{ color: C.yellow }}>MI6 Hitman</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 355,
          fontSize: 59,
          color: C.yellow,
        }}
      >
        军情六处的杀手
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 555,
          fontFamily: F.mono,
          fontSize: 130,
          color: C.white,
          translate: `${p * 80}px 0`,
        }}
      >
        007
      </div>
      <div
        style={{
          position: "absolute",
          left: 1310,
          top: 555,
          fontFamily: F.mono,
          fontSize: 105,
          color: C.white,
          opacity: p,
          translate: `${(1 - p) * 300}px 0`,
        }}
      >
        HITMAN
      </div>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d="M510 635H1280"
          stroke={C.blue}
          strokeWidth={3}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - p}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 660,
          top: 525,
          width: 600,
          background: C.black,
          padding: "25px 20px",
          opacity: p,
          textAlign: "center",
          translate: `0 ${(1 - p) * 100}px`,
        }}
      >
        <div style={{ fontSize: 27, color: C.gray, marginBottom: 22 }}>
          同一开发商
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 48 }}>IO Interactive</div>
      </div>
    </FilmScene>
  );
};
export const AnotherField = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const at = say(timing, 67);
  const p = lerp(t, at - 0.15, at + 0.8);
  const complex = say(timing, 68);
  return (
    <FilmScene
      title="同一张 NFO，另一种语气"
      right="KIND → PROTECTION"
      source="NFO 字段重排｜V16、V14"
    >
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 220,
          width: 1650,
          height: 600,
          overflow: "hidden",
        }}
      >
        <div style={{ translate: `0 ${-p * 470}px` }}>
          <div style={{ fontFamily: F.mono, fontSize: 78, color: C.gray }}>
            KIND
          </div>
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 53,
              color: C.yellow,
              marginTop: 50,
            }}
          >
            Fast Cars on Nitro
            <br />
            Zombie Puzzle Simulator
            <br />
            The MI6 Hitman
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 470,
            translate: `0 ${-p * 470}px`,
          }}
        >
          <div style={{ fontFamily: F.mono, fontSize: 102, color: C.blue }}>
            PROTECTION
          </div>
          <div style={{ fontSize: 47, marginTop: 35 }}>游戏用了哪些保护</div>
          <div style={{ fontFamily: F.mono, fontSize: 53, marginTop: 80 }}>
            {["Denuvo", "Steam", "VMProtect", "Custom"].map((x, i) => (
              <span
                key={x}
                style={{
                  display: "inline-block",
                  marginRight: 38,
                  opacity: lerp(
                    t,
                    complex + i * 0.65,
                    complex + i * 0.65 + 0.3,
                  ),
                  translate: `0 ${lerp(t, complex + i * 0.65, complex + i * 0.65 + 0.45, 60, 0)}px`,
                }}
              >
                {i ? "+ " : ""}
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>
    </FilmScene>
  );
};
export const ProtectionLists = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const newer = say(timing, 70);
  const terms = say(timing, 70, "变成了");
  const p = lerp(t, newer, newer + 0.6);
  return (
    <FilmScene
      title="PROTECTION"
      right={p > 0.5 ? "2026.05 / PRAGMATA" : "2025.11 / 极品飞车"}
      source="V16 / V14｜发行者列出的保护组合；加号不表示嵌套层级"
    >
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 210,
          fontSize: 60,
          color: C.gray,
        }}
      >
        {p > 0.5 ? "识质存在 · PRAGMATA" : "极品飞车：热力追踪 重制版"}
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 390,
          fontFamily: F.mono,
          fontSize: 91,
          color: C.blue,
        }}
      >
        Denuvo
      </div>
      <div
        style={{
          position: "absolute",
          left: 670,
          top: 390,
          fontFamily: F.mono,
          fontSize: 91,
          color: C.white,
          translate: `0 ${-p * 160}px`,
          opacity: 1 - p,
        }}
      >
        + EA
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 555,
          fontFamily: F.mono,
          fontSize: 70,
          color: C.white,
        }}
      >
        {["Steam", "VMProtect", "Custom"].map((word, i) => (
          <span
            key={word}
            style={{
              display: "inline-block",
              marginRight: 40,
              opacity: lerp(t, terms + 0.45 + i * 0.62, terms + 0.7 + i * 0.62),
              translate: `${lerp(t, terms + 0.45 + i * 0.62, terms + 1 + i * 0.62, 130, 0)}px 0`,
              color: i === 2 ? C.yellow : C.white,
            }}
          >
            + {word}
          </span>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 1250,
          top: 735,
          fontSize: 34,
          color: C.yellow,
          opacity: lerp(t, say(timing, 71) - 0.2, say(timing, 71) + 0.1),
        }}
      >
        Custom · 厂商自己的保护
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 760,
          width: 1050,
          height: 2,
          background: C.blue,
          scale: `${p} 1`,
          transformOrigin: "left",
        }}
      />
    </FilmScene>
  );
};
