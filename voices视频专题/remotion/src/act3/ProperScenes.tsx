import { Img, Sequence, staticFile, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { C, F } from "../style";
import { useTime, lerp, NameCursor } from "../components";
import type { ShotTiming } from "../timing";
import {
  A3Scene,
  Header,
  Reveal,
  Divider,
  NfoImage,
  AccentLine,
} from "./shared";
import { say } from "./timing";
import { pewAt, apologyAt } from "./motion";

export const DeadSpace = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const { fps } = useVideoConfig();
  const kind = say(timing, 80);
  const correction = say(timing, 81);
  const dismiss = say(timing, 82);
  const pew = pewAt(timing);
  return (
    <A3Scene source="游戏背景｜EA 官方宣传片／静帧 · NFO｜V06｜2026-01-11">
      <Img
        src={staticFile("v38/act3/dead-space.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: 1920,
          height: 1080,
          objectFit: "cover",
          scale: 1 + t * 0.002,
        }}
      />
      <Sequence name="官方片段 · 走廊" durationInFrames={Math.round(1.8 * fps)}>
        <Video
          src={staticFile("v38/act3/footage/corridor.mp4")}
          muted
          style={{ width: 1920, height: 1080, objectFit: "cover" }}
        />
      </Sequence>
      <Sequence
        name="官方片段 · 战斗"
        from={Math.round(kind * fps)}
        durationInFrames={Math.round(3.7 * fps)}
      >
        <Video
          src={staticFile("v38/act3/footage/combat.mp4")}
          muted
          style={{ width: 1920, height: 1080, objectFit: "cover" }}
        />
      </Sequence>
      <Sequence
        name="官方片段 · 探索"
        from={Math.round((kind + 3.7) * fps)}
        durationInFrames={Math.round(3.5 * fps)}
      >
        <Video
          src={staticFile("v38/act3/footage/explore.mp4")}
          muted
          style={{ width: 1920, height: 1080, objectFit: "cover" }}
        />
      </Sequence>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg,#060d11f5 0%,#060d11d9 38%,#060d1140 75%),linear-gradient(0deg,#060d11ee,transparent 35%)",
        }}
      />
      <Header title="死亡空间：重制版" right="2026.01.11" />
      <Reveal
        style={{
          position: "absolute",
          left: 140,
          top: 265,
          fontFamily: F.mono,
          fontSize: 64,
          color: C.white,
        }}
      >
        DEAD SPACE
      </Reveal>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 377,
          opacity: lerp(t, kind, kind + 0.3),
        }}
      >
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 30,
            color: C.yellow,
            marginBottom: 25,
          }}
        >
          KIND
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 55, lineHeight: 1.3 }}>
          Pew-Pew at
          <br />
          Zombies in Space
        </div>
        <Reveal
          at={kind + 1.4}
          style={{ fontSize: 50, marginTop: 35, lineHeight: 1.5 }}
        >
          在太空里，
          <br />
          对着僵尸 biu biu biu。
        </Reveal>
      </div>
      {[0, 1, 2].map((i) => {
        const local = t - pew - i * 0.18;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 1260 + i * 140,
              top: 450 - i * 45,
              opacity: local >= 0 && local < 0.14 ? 1 : 0,
              scale: 1 + Math.max(0, local) * 3,
              color: C.yellow,
              fontFamily: F.mono,
              fontSize: 40,
            }}
          >
            ✦
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: lerp(t, dismiss, dismiss + 0.45, 1250, 1500),
          top: lerp(t, dismiss, dismiss + 0.45, 700, 795),
          fontSize: lerp(t, dismiss, dismiss + 0.45, 48, 25),
          color: C.white,
          opacity: lerp(t, correction + 0.8, correction + 1.2),
        }}
      >
        严格来说：尸变体
      </div>
    </A3Scene>
  );
};

export const ProperWord = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const proper = say(timing, 83, "PROPER");
  const define = say(timing, 84);
  const example = say(timing, 85);
  return (
    <A3Scene source="发行记录｜V06 · PROPER 术语示意，不代表官方认证">
      <Header title="版本名里，多了一个词" right="2026.01.11" />
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 245,
          fontFamily: F.mono,
          fontSize: 37,
          color: C.gray,
        }}
      >
        Dead.Space.Remake.<span style={{ color: C.yellow }}>PROPER</span>
        -voices38
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 345,
          fontFamily: F.mono,
          fontSize: 148,
          color: C.yellow,
          letterSpacing: -7,
          scale: lerp(t, proper - 0.35, proper + 0.45, 0.88, 1),
          transformOrigin: "left center",
        }}
      >
        PROPER
      </div>
      <Reveal
        at={define}
        style={{ position: "absolute", left: 1030, top: 405, fontSize: 64 }}
      >
        修正版
      </Reveal>
      <AccentLine x1={565} y1={705} x2={1350} y2={705} at={example + 0.7} />
      <Reveal
        at={example}
        style={{
          position: "absolute",
          left: 140 + lerp(t, example, example + 1, 0, 100),
          top: 610,
          width: 590,
          padding: "25px 35px",
          border: `1px solid ${C.gray}`,
          background: C.black,
        }}
      >
        <div style={{ fontSize: 40 }}>先前发行</div>
        <div style={{ fontSize: 30, color: C.gray, marginTop: 18 }}>
          存在问题
        </div>
      </Reveal>
      <Reveal
        at={example + 1.7}
        style={{
          position: "absolute",
          left: 1120 - lerp(t, example + 1.7, example + 2.7, 0, 100),
          top: 610,
          width: 590,
          padding: "25px 35px",
          border: `1px solid ${C.yellow}`,
          background: C.black,
        }}
      >
        <div style={{ fontSize: 40, color: C.yellow }}>后续发行</div>
        <div style={{ fontSize: 30, color: C.gray, marginTop: 18 }}>
          针对问题修正
        </div>
      </Reveal>
    </A3Scene>
  );
};

export const EarlierBeta = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const route = say(timing, 87);
  const later = say(timing, 88);
  const p = lerp(t, later, later + 0.6);
  return (
    <A3Scene source="发行背景｜V06、V08 · Hypervisor 路线留至第六幕展开">
      <Header title="同一款游戏，先前已有一次尝试" right="DEAD SPACE" />
      <AccentLine x1={240} y1={555} x2={1670} y2={555} at={0.1} />
      <div style={{ position: "absolute", left: 270, top: 300 }}>
        <div style={{ fontSize: 32, color: C.gray, marginBottom: 28 }}>
          几天前
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 72 }}>0xZeOn</div>
        <div style={{ fontSize: 40, marginTop: 28, color: C.blue }}>测试版</div>
      </div>
      <div style={{ position: "absolute", left: 1225, top: 300 }}>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 32,
            color: C.gray,
            marginBottom: 28,
          }}
        >
          2026.01.11
        </div>
        <NameCursor size={65} />
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 40,
            marginTop: 28,
            color: C.yellow,
          }}
        >
          PROPER
        </div>
      </div>
      {[300, 1260].map((x, i) => (
        <div
          key={x}
          style={{
            position: "absolute",
            left: x,
            top: 547,
            width: 16,
            height: 16,
            background: i ? C.yellow : C.blue,
            rotate: "45deg",
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: 270 + p * 890,
          top: 610 - p * 5,
          width: 630 - p * 80,
          padding: "25px 35px",
          background: "#1b2c36",
          borderTop: `2px solid ${C.blue}`,
          opacity: lerp(t, route + 0.5, route + 0.9),
          rotate: `${p * -2}deg`,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 44 }}>Hypervisor</div>
        <div style={{ fontSize: 27, color: C.gray, marginTop: 20 }}>
          {p < 0.5 ? "另一条技术路线" : "第六幕 · 两条路线"}
        </div>
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            borderTop: "35px solid #416078",
            borderLeft: "35px solid transparent",
            opacity: p,
          }}
        />
      </div>
    </A3Scene>
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
  const phase = t < starts[1] ? 0 : t < starts[2] ? 1 : t < starts[3] ? 2 : 3;
  const headings = [
    "先表达尊重，再提出批评",
    "配置与 Linux",
    "随机卡死、崩溃与虚拟内存",
    "从设计上就有问题",
  ];
  const cn = [
    "尊重 ZeOn 的尝试。\n但不认同他使用的方法。",
    "很多配置无法运行；\nLinux 上也用不了。",
    "随机卡死、崩溃；\n需要调大虚拟内存来规避。",
    "他认为，这是一条\n糟糕的技术路线。",
  ];
  const en = [
    "I respect ZeOn’s crack attempts…",
    "doesn’t run on various configurations\nnor on linux via proton",
    "random freezing/crashing issues",
    "the method used is bad by design",
  ];
  return (
    <A3Scene source="当事人评价｜voices38 · V06 PROPER NFO｜2026-01-11 · 中文译述">
      <Header title="voices38 对先前方案的评价" right="PROPER NOTES" />
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 247,
          fontFamily: F.mono,
          fontSize: 90,
          color: C.yellow,
          opacity: 0.45,
        }}
      >
        “
      </div>
      <div style={{ position: "absolute", left: 245, top: 267, width: 1390 }}>
        <div style={{ fontSize: 29, color: C.blue, letterSpacing: 3 }}>
          {headings[phase]}
        </div>
        <div
          key={phase}
          style={{
            fontSize: 70,
            lineHeight: 1.55,
            whiteSpace: "pre-line",
            marginTop: 35,
            translate: `0 ${lerp(t, starts[phase], starts[phase] + 0.45, 25, 0)}px`,
            opacity: lerp(t, starts[phase], starts[phase] + 0.25),
          }}
        >
          {cn[phase]}
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 34,
            lineHeight: 1.5,
            color: C.gray,
            whiteSpace: "pre-line",
            marginTop: 40,
          }}
        >
          {en[phase]}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 245,
          top: 780,
          display: "flex",
          gap: 16,
        }}
      >
        {starts.map((at, i) => (
          <div
            key={at}
            style={{
              width: 310,
              height: 3,
              background: i <= phase ? C.yellow : "#8a8f9833",
              scale: `${i === phase ? lerp(t, at, at + 0.6) : 1} 1`,
              transformOrigin: "left",
            }}
          />
        ))}
      </div>
    </A3Scene>
  );
};

export const OwnProper = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const all = say(timing, 93, "在什么环境");
  const memory = say(timing, 93, "也没有");
  const enjoy = say(timing, 94);
  return (
    <A3Scene source="当事人自述｜V06｜2026-01-11 · 中文译述，非兼容性实测">
      <Header title="voices38 自述" right="PROPER / 2026.01.11" />
      <Divider />
      <div
        style={{
          position: "absolute",
          left: 170,
          top: 315,
          fontFamily: F.mono,
          fontSize: 74,
          color: C.yellow,
        }}
      >
        old school proper
      </div>
      <Reveal
        at={all - 0.15}
        style={{ position: "absolute", left: 170, top: 465, fontSize: 69 }}
      >
        在什么环境下都能用。
      </Reveal>
      <Reveal
        at={memory - 0.15}
        style={{
          position: "absolute",
          left: 170,
          top: 565,
          fontSize: 59,
          color: C.white,
        }}
      >
        没有内存问题。
      </Reveal>
      <Reveal
        at={enjoy - 0.1}
        style={{
          position: "absolute",
          left: 170,
          top: 735,
          fontSize: 39,
          color: C.gray,
        }}
      >
        Enjoy. <span style={{ marginLeft: 25 }}>祝大家玩得开心。</span>
      </Reveal>
      <div
        style={{
          position: "absolute",
          right: 175,
          top: 320,
          height: 425,
          width: 2,
          background: C.yellow,
          scale: `1 ${lerp(t, 0, timing.duration)}`,
          transformOrigin: "top",
        }}
      />
    </A3Scene>
  );
};

export const ThreeDays = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const fix = say(timing, 95, "CRACKFIX");
  const meaning = say(timing, 96);
  const flipStart = 0.24;
  const step = Math.min(3, Math.max(0, Math.floor((t - flipStart) / 0.46)));
  const f = Math.max(0, (t - flipStart) / 0.46) % 1;
  return (
    <A3Scene source="发行记录｜V06 PROPER · 01.11 / V07 CRACKFIX · 01.14">
      <Header title="三天后，又有一份发行说明" right="2026.01" />
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 265,
          width: 470,
          height: 485,
          perspective: 1300,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: C.paper,
            color: C.ink,
            padding: 35,
            boxShadow: "0 25px 65px #0007",
          }}
        >
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 32,
              letterSpacing: 6,
              borderBottom: `2px solid ${C.ink}`,
              paddingBottom: 22,
            }}
          >
            JANUARY 2026
          </div>
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 220,
              textAlign: "center",
              lineHeight: 1.45,
            }}
          >
            {t < flipStart ? 11 : Math.min(14, 12 + step)}
          </div>
        </div>
        {step < 3 && t >= flipStart && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: C.paper,
              color: C.ink,
              padding: 35,
              transformOrigin: "top",
              transform: `rotateX(${-f * 100}deg)`,
              opacity: 1 - f * 0.8,
              backfaceVisibility: "hidden",
              boxShadow: "0 16px 26px #0005",
            }}
          >
            <div
              style={{
                fontFamily: F.mono,
                fontSize: 32,
                letterSpacing: 6,
                borderBottom: `2px solid ${C.ink}`,
                paddingBottom: 22,
              }}
            >
              JANUARY 2026
            </div>
            <div
              style={{
                fontFamily: F.mono,
                fontSize: 220,
                textAlign: "center",
                lineHeight: 1.45,
              }}
            >
              {11 + step}
            </div>
          </div>
        )}
        <div
          style={{
            position: "absolute",
            left: 210,
            top: 95,
            width: 1,
            height: 1,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 840,
          top: 285,
          fontFamily: F.mono,
          fontSize: 49,
          color: C.gray,
        }}
      >
        PROPER <span style={{ fontSize: 29 }}>01.11</span>
      </div>
      <AccentLine x1={860} y1={375} x2={860} y2={485} at={1.7} />
      <Reveal
        at={fix - 0.5}
        style={{
          position: "absolute",
          left: 840,
          top: 500,
          fontFamily: F.mono,
          fontSize: 88,
          color: C.yellow,
        }}
      >
        CRACKFIX
      </Reveal>
      <Reveal
        at={meaning + 0.3}
        style={{
          position: "absolute",
          left: 840,
          top: 660,
          fontSize: 47,
          lineHeight: 1.5,
        }}
      >
        修复自己的
        <br />
        上一个破解版本。
      </Reveal>
    </A3Scene>
  );
};

export const Sorry = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const repaired = say(timing, 97, "表示现在");
  const apology = apologyAt(timing);
  const tools = say(timing, 98);
  const p = lerp(t, tools, tools + 0.65);
  return (
    <A3Scene source="当事人声明｜V07 CRACKFIX｜2026-01-14 · 据文本存档重排">
      <Header title="修复说明，也写下了一句道歉" right="CRACKFIX NOTES" />
      <div
        style={{
          position: "absolute",
          left: 170,
          top: 290,
          right: 170,
          opacity: 1 - p,
          translate: `0 ${-p * 80}px`,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 35, color: C.gray }}>
          Missed few things.
        </div>
        <div style={{ fontSize: 61, marginTop: 20 }}>
          上一版漏掉了几个地方。
        </div>
        <Reveal
          at={repaired}
          style={{ fontSize: 42, color: C.gray, marginTop: 40 }}
        >
          现在应该已经全部修好。
        </Reveal>
        <Reveal
          at={apology - 0.15}
          style={{
            fontFamily: F.mono,
            fontSize: 70,
            color: C.yellow,
            marginTop: 65,
          }}
        >
          Sorry about that.
        </Reveal>
      </div>
      <div
        style={{
          position: "absolute",
          left: 170,
          top: 290,
          right: 170,
          opacity: p,
          translate: `0 ${(1 - p) * 70}px`,
        }}
      >
        <div style={{ fontSize: 31, color: C.gray }}>他还写道</div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 73,
            marginTop: 35,
            color: C.blue,
          }}
        >
          2023 Denuvo tools
        </div>
        <div style={{ fontSize: 66, marginTop: 38 }}>会继续改进。</div>
        <div
          style={{
            height: 2,
            background: C.blue,
            width: lerp(t, tools + 0.6, tools + 1.5, 0, 1400),
            marginTop: 42,
          }}
        />
        <Reveal
          at={tools + 2}
          style={{ fontSize: 45, color: C.gray, marginTop: 35 }}
        >
          避免同样的问题再次发生
        </Reveal>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 28,
            color: C.gray,
            marginTop: 30,
          }}
        >
          “the 2023 denuvo tools will be improved”
        </div>
      </div>
    </A3Scene>
  );
};

export const ThreeDaysApart = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const after = t >= say(timing, 100);
  return (
    <A3Scene source="当事人自述对照｜V06 / V07 · 中文译述">
      <Header title="同一个署名，两份说明" right="voices38" />
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 290,
          fontFamily: F.mono,
          fontSize: 38,
          color: C.gray,
        }}
      >
        {after ? "2026.01.14 / 三天后" : "2026.01.11 / 三天前"}
      </div>
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 410,
          fontSize: after ? 122 : 80,
          lineHeight: 1.35,
          color: after ? C.yellow : C.white,
        }}
      >
        {after ? "抱歉。" : "在什么环境下都能用。"}
      </div>
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 670,
          fontFamily: F.mono,
          fontSize: 32,
          color: C.gray,
        }}
      >
        {after ? "Sorry about that." : "works on everything"}
      </div>
      <div
        style={{
          position: "absolute",
          right: 180,
          top: 290,
          width: 1,
          height: 420,
          background: C.gray,
          opacity: 0.25,
        }}
      />
    </A3Scene>
  );
};

export const EarlierFix = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const date = say(timing, 102);
  const note = say(timing, 103);
  const p = lerp(t, note, note + 0.7);
  const xp = say(timing, 103, "只有 Windows");
  return (
    <A3Scene
      paper
      source="发行 NFO｜RELOADED · P04 / P05｜2006-05-26 / 05-28 · 兼容性为其自述"
    >
      <Header title="发布之后，再补发修复" right="RELOADED / 2006" paper />
      <div
        style={{
          position: "absolute",
          left: 170,
          right: 170,
          top: 225,
          opacity: 1 - p,
          translate: `0 ${-p * 70}px`,
        }}
      >
        <div style={{ position: "absolute", left: 0, width: 640 }}>
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 29,
              color: C.ink,
              marginBottom: 20,
            }}
          >
            2006.05.26 · RELEASE
          </div>
          <Img
            src={staticFile("v38/act2/nfo/reloaded-header.png")}
            style={{
              width: 624,
              height: 438,
              imageRendering: "pixelated",
              display: "block",
              background: C.ink,
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            right: 0,
            width: 640,
            opacity: lerp(t, date, date + 0.6),
            translate: `${lerp(t, date, date + 0.8, 90, 0)}px 0`,
          }}
        >
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 29,
              color: C.ink,
              marginBottom: 20,
            }}
          >
            2006.05.28 · OS FIX
          </div>
          <NfoImage
            name="reloaded-os-header"
            style={{ width: 640, height: 486, background: C.ink }}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 280,
          top: 275,
          width: 1360,
          opacity: p,
          translate: `0 ${(1 - p) * 65}px`,
        }}
      >
        <div style={{ fontSize: 32, color: C.ink, marginBottom: 35 }}>
          RELOADED 在 OS FIX 中解释
        </div>
        <NfoImage
          name="reloaded-os-note"
          style={{ width: 1248, height: 112, background: C.ink }}
        />
        <div style={{ fontSize: 57, color: C.ink, marginTop: 35 }}>
          初版使用的技术，仅支持
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 70,
            color: C.ink,
            marginTop: 22,
            display: "inline-block",
            position: "relative",
          }}
        >
          Windows XP SP2
          <div
            style={{
              position: "absolute",
              inset: "-8px -18px",
              border: `3px solid ${C.red}`,
              clipPath: `inset(0 ${100 * (1 - lerp(t, xp - 0.3, xp + 0.4))}% 0 0)`,
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 280,
          top: 735,
          display: "flex",
          gap: 110,
          color: C.ink,
          opacity: p,
        }}
      >
        <div style={{ fontSize: 27 }}>
          <span style={{ fontFamily: F.mono, color: C.gray, marginRight: 24 }}>2006</span>
          RELEASE → OS FIX
        </div>
        <div style={{ fontSize: 27 }}>
          <span style={{ fontFamily: F.mono, color: C.gray, marginRight: 24 }}>2026</span>
          PROPER → CRACKFIX
        </div>
      </div>
    </A3Scene>
  );
};
