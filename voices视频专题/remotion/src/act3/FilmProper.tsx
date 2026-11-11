import { publicAsset } from "../assets";
import { Img } from "remotion";
import { C, F } from "../style";
import { lerp, useTime } from "../components";
import type { ShotTiming } from "../timing";
import { FilmScene } from "../act2/film-shared";
import { say } from "./timing";

const notes = publicAsset("v38/act3/nfo/proper-notes.png");
const pix = { imageRendering: "pixelated" as const, display: "block" };
export const ProperWord = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const word = say(timing, 83, "PROPER");
  const define = say(timing, 84);
  const example = say(timing, 85);
  return (
    <FilmScene
      title="这一次，多了一个词"
      right="2026.01.11 / PROPER"
      source="V06｜发行名原图；下方为术语示意"
    >
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 170,
          translate: `0 ${lerp(t, word - 0.2, word + 0.6, 100, 0)}px`,
        }}
      >
        <Img
          src={publicAsset("v38/act3/nfo/proper-fields.png")}
          style={{ ...pix, width: 1704, height: 276 }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 500,
          fontFamily: F.mono,
          fontSize: 125,
          color: C.yellow,
          opacity: lerp(t, word - 0.15, word + 0.25),
        }}
      >
        PROPER
        <span
          style={{
            fontFamily: F.cn,
            fontSize: 61,
            color: C.white,
            marginLeft: 70,
            opacity: lerp(t, define, define + 0.4),
          }}
        >
          修正版
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 735,
          width: 1600,
          height: 75,
          fontSize: 37,
          color: C.gray,
          display: "flex",
          gap: 75,
          alignItems: "center",
        }}
      >
        {["先前发行", "存在问题", "后续修正"].map((v, i) => (
          <div
            key={v}
            style={{
              opacity: lerp(t, example + i * 0.65, example + i * 0.65 + 0.3),
              translate: `${lerp(t, example + i * 0.65, example + i * 0.65 + 0.5, 100, 0)}px 0`,
              color: i === 2 ? C.yellow : C.gray,
            }}
          >
            {i ? "→　" : ""}
            {v}
          </div>
        ))}
      </div>
    </FilmScene>
  );
};
export const EarlierBeta = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const route = say(timing, 87);
  const bookmark = say(timing, 88);
  const fold = lerp(t, bookmark, bookmark + 0.65);
  return (
    <FilmScene
      title="同一款游戏，先前已有一次尝试"
      right="发行记录整理 / DEAD SPACE"
      source="V06、V08｜发行背景及 Hypervisor 路线；非原网页截图"
    >
      <Img
        src={publicAsset("v38/act3/dead-space.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: 1920,
          height: 1080,
          objectFit: "cover",
          scale: 1.05 + t * 0.003,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg,#050d0de8,#050d0d85),linear-gradient(0deg,#050d0d,transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 230,
          width: 920,
          height: 540,
          background: "#eee8db",
          color: C.ink,
          padding: 50,
          rotate: "-2deg",
          boxShadow: "0 30px 80px #0008",
          translate: `0 ${lerp(t, 0, 0.8, 250, 0)}px`,
        }}
      >
        <div style={{ fontSize: 32, color: C.gray }}>几天前 · 测试版</div>
        <div style={{ fontFamily: F.mono, fontSize: 99, marginTop: 45 }}>
          0xZeOn
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 59,
            marginTop: 55,
            color: C.blue,
            opacity: lerp(t, route + 0.5, route + 1),
          }}
        >
          Hypervisor
        </div>
        <div
          style={{
            height: 3,
            background: C.blue,
            width: lerp(t, route + 0.5, route + 1.5, 0, 750),
            marginTop: 25,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 1120,
          top: 285,
          width: 630,
          height: 480,
          background: "#090d0a",
          borderTop: `3px solid ${C.yellow}`,
          padding: 40,
          rotate: "3deg",
          boxShadow: "0 30px 80px #0009",
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 29, color: C.gray }}>
          2026.01.11
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 63,
            color: C.yellow,
            marginTop: 40,
          }}
        >
          voices38
        </div>
        <Img
          src={publicAsset("v38/act3/nfo/proper-fields.png")}
          style={{
            ...pix,
            width: 568,
            height: 92,
            marginTop: 55,
            marginLeft: -8,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 700 + fold * 350,
          top: 570 + fold * 120,
          width: 610,
          height: 115,
          background: "#263c49",
          padding: "26px 35px",
          boxShadow: "0 15px 40px #0006",
          rotate: `${fold * -3}deg`,
          opacity: fold,
          fontFamily: F.cn,
          fontSize: 35,
        }}
      >
        Hypervisor · 留到第六幕展开
      </div>
    </FilmScene>
  );
};
export const Criticism = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const starts = [
    say(timing, 89),
    say(timing, 90),
    say(timing, 91),
    say(timing, 92),
  ];
  const p = t < starts[1] ? 0 : t < starts[2] ? 1 : t < starts[3] ? 2 : 3;
  const band = [
    [0, 28],
    [24, 41],
    [36, 67],
    [12, 28],
  ][p];
  const caption =
    p === 0
      ? t > starts[0] + 4.58
        ? "从设计上有问题"
        : "先表达尊重，再提出批评"
      : ["", "配置与 Linux", "卡死、崩溃与虚拟内存", "他对这条路线的评价"][p];
  return (
    <FilmScene
      title="voices38 对先前方案的评价"
      right="PROPER NOTES / 原文扫读"
      source="当事人评价｜V06｜2026-01-11 · 不是本片实测结论"
    >
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 230,
          fontFamily: F.mono,
          fontSize: 42,
          color: C.yellow,
        }}
      >
        PROPER NOTES
      </div>
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 365,
          width: 1720,
          height: 340,
          overflow: "hidden",
          translate: `${lerp(t, 0, timing.duration, 40, -15)}px 0`,
        }}
      >
        <Img
          src={notes}
          style={{ ...pix, width: 1704, height: 312, opacity: 0.23 }}
        />
        <Img
          src={notes}
          style={{
            ...pix,
            position: "absolute",
            inset: 0,
            width: 1704,
            height: 312,
            clipPath: `inset(${(band[0] / 104) * 100}% 0 ${100 - (band[1] / 104) * 100}% 0)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 340,
            top: band[1] * 3 + 2,
            height: 3,
            width: lerp(t, starts[p], starts[p] + 0.8, 0, 1260),
            background: C.yellow,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 760,
          fontSize: 46,
          color: C.gray,
          translate: `0 ${lerp(t, starts[p], starts[p] + 0.35, 30, 0)}px`,
        }}
      >
        {caption}
      </div>
    </FilmScene>
  );
};
export const OwnProper = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const all = say(timing, 93, "在什么环境");
  const enjoy = say(timing, 94);
  const pan = lerp(t, 0.6, enjoy, 30, 0);
  return (
    <FilmScene
      title="然后，他介绍自己的版本"
      right="voices38 自述 / 2026.01.11"
      source="当事人自述｜V06｜兼容性陈述未作独立实测"
    >
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 205,
          fontFamily: F.mono,
          fontSize: 74,
          color: C.yellow,
        }}
      >
        old school proper
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 365,
          width: 1640,
          height: 220,
          overflow: "hidden",
        }}
      >
        <Img
          src={publicAsset("v38/evidence/proper-claim.png")}
          style={{ ...pix, width: 1344, height: 99, translate: `${pan}px 0` }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 147,
            height: 3,
            width: lerp(t, all - 0.1, all + 0.7, 0, 1500),
            background: C.yellow,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 640,
          fontSize: 48,
          color: C.gray,
          opacity: lerp(t, enjoy - 0.2, enjoy + 0.1),
        }}
      >
        Enjoy. <span style={{ marginLeft: 28 }}>祝大家玩得开心。</span>
      </div>
    </FilmScene>
  );
};
export const Sorry = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const apology = say(timing, 97, "并向玩家道歉");
  const tools = say(timing, 98);
  const blue = lerp(t, tools, tools + 0.4);
  return (
    <FilmScene
      title="三天后的修复说明"
      right="CRACKFIX / 2026.01.14"
      source="当事人声明｜V07｜原始 NFO 局部"
    >
      <Img
        src={publicAsset("v38/evidence/fix-fields.png")}
        style={{
          ...pix,
          position: "absolute",
          left: 140,
          top: 170,
          width: 1136,
          height: 184,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 440,
          width: 1704,
          height: 180,
          translate: `${lerp(t, 0, timing.duration, 15, -10)}px 0`,
        }}
      >
        <Img
          src={publicAsset("v38/evidence/crackfix-notes.png")}
          style={{ ...pix, width: 1704, height: 132 }}
        />
        <div
          style={{
            position: "absolute",
            left: 265,
            top: 76,
            width: lerp(t, apology - 0.1, apology + 0.3, 0, 400),
            height: 3,
            background: C.yellow,
            opacity: 1 - blue,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 700,
            top: 76,
            width: lerp(t, tools + 0.4, tools + 1.3, 0, 950),
            height: 3,
            background: C.blue,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 700,
          fontSize: 55,
          color: C.yellow,
          opacity: lerp(t, apology - 0.1, apology + 0.2) * (1 - blue),
        }}
      >
        向玩家道歉。
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 700,
          fontSize: 55,
          color: C.blue,
          opacity: blue,
          translate: `0 ${(1 - blue) * 70}px`,
        }}
      >
        继续改进 2023 Denuvo 工具
      </div>
    </FilmScene>
  );
};
export const ThreeDaysApart = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const after = t >= say(timing, 100);
  return (
    <FilmScene
      title={after ? "三天后 / 2026.01.14" : "三天前 / 2026.01.11"}
      right="同一个署名，两份说明"
      source="V06 / V07｜两份 NFO 原文对照 · 中文见旁白字幕"
    >
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 230,
          fontFamily: F.mono,
          fontSize: 44,
          color: C.gray,
        }}
      >
        {after ? "CRACKFIX NOTES" : "PROPER NOTES"}
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 400,
          width: 1640,
          height: 200,
          overflow: "hidden",
        }}
      >
        {after ? (
          <Img
            src={publicAsset("v38/evidence/apology.png")}
            style={{ ...pix, width: 1088, height: 96 }}
          />
        ) : (
          <Img
            src={publicAsset("v38/evidence/proper-claim.png")}
            style={{ ...pix, width: 1344, height: 99 }}
          />
        )}
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 670,
          width: after ? 1088 : 1344,
          height: 3,
          background: after ? C.yellow : C.gray,
        }}
      />
    </FilmScene>
  );
};
export const EarlierFix = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const old = say(timing, 102);
  const repair = say(timing, 103);
  const bring = lerp(t, old - 0.15, old + 0.65);
  const page = lerp(t, repair - 0.15, repair + 0.5);
  const scan = lerp(t, repair + 0.3, repair + 2.6);
  return (
    <FilmScene
      title="发布之后，再补修复"
      right={page > 0.5 ? "2006.05.28 / OS FIX" : "2006.05.26 / RELOADED"}
      source="RELOADED NFO｜P04、P05｜兼容性说明为发行者自述"
    >
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 350,
          opacity: 1 - bring,
          translate: `${-bring * 1600}px 0`,
        }}
      >
        <Img
          src={publicAsset("v38/evidence/crackfix-notes.png")}
          style={{ ...pix, width: 1704, height: 132 }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 170,
          top: 150,
          width: 1280,
          height: 680,
          overflow: "hidden",
          background: C.ink,
          boxShadow: "0 30px 85px #0008",
          translate: `${(1 - bring) * 1800}px 0`,
        }}
      >
        <Img
          src={publicAsset("v38/act2/nfo/reloaded-header.png")}
          style={{
            ...pix,
            width: 1248,
            height: 876,
            opacity: 1 - page,
            position: "absolute",
            top: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: -scan * 710,
            opacity: page,
          }}
        >
          <Img
            src={publicAsset("v38/act3/nfo/reloaded-os-header.png")}
            style={{ ...pix, width: 1280, height: 972 }}
          />
          <Img
            src={publicAsset("v38/act3/nfo/reloaded-os-note.png")}
            style={{
              ...pix,
              width: 1248,
              height: 112,
              position: "absolute",
              left: 16,
              top: 1096,
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1510,
          top: 250,
          width: 300,
          color: C.white,
          opacity: bring,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 80 }}>2006</div>
        <div style={{ fontSize: 40, lineHeight: 1.6, marginTop: 40 }}>
          两天后，
          <br />
          也有一份修复。
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 30,
            color: C.yellow,
            lineHeight: 1.5,
            marginTop: 50,
            opacity: lerp(t, repair + 2, repair + 2.5),
          }}
        >
          Windows
          <br />
          XP SP2
        </div>
      </div>
    </FilmScene>
  );
};
