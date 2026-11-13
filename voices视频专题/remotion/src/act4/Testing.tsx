import { Img } from "remotion";
import { C, F } from "../style";
import { lerp, useTime } from "../components";
import { publicAsset } from "../assets";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
import {
  Stage,
  Reveal,
  Rule,
  Rig,
  pos,
  mono,
  Stroke,
  NewYearQuote,
  Raster,
} from "./shared";

export const LinuxTesting = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    linux = say(timing, 116, "所有破解"),
    benefit = say(timing, 117);
  const expand = lerp(t, linux - 0.2, linux + 0.7);
  return (
    <Stage
      label="2025.12.28 / 同一份说明"
      source="测试声明｜voices38 · V30 社区转述 · 据文本存档重排"
    >
      <div
        style={{
          ...pos,
          left: 130,
          top: 165,
          ...mono,
          fontSize: 26,
          color: C.gray,
        }}
      >
        Some notes since last release
      </div>
      <div
        style={{
          ...pos,
          left: 130,
          top: 232,
          width: 1650,
          fontFamily: F.mono,
          fontSize: 50,
          lineHeight: 1.4,
        }}
      >
        Also, all cracks are now
        <br />
        tested on <span style={{ color: C.yellow }}>Linux</span> as well.
      </div>
      <Rule y={425} at={linux} />
      <div
        style={{
          ...pos,
          left: 126,
          top: 485,
          opacity: expand,
          translate: `${(1 - expand) * -100}px 0`,
        }}
      >
        <div style={{ fontSize: 31, color: C.gray }}>新增测试环境</div>
        <div style={{ ...mono, fontSize: 100, marginTop: 20, color: C.yellow }}>
          Linux
        </div>
        <div style={{ fontSize: 42, marginTop: 26 }}>纳入测试流程</div>
      </div>
      <div
        style={{
          ...pos,
          left: 960,
          top: 480,
          width: 690,
          opacity: expand,
          translate: `${(1 - expand) * 260}px 0`,
        }}
      >
        <Rig linux active={lerp(t, linux, benefit + 1)} />
      </div>
      <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
        <Stroke d="M580 640H920" at={linux + 0.3} color={C.yellow} />
      </svg>
    </Stage>
  );
};

export const TestingLimits = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    report = say(timing, 119),
    open = lerp(t, report, report + 0.75);
  return (
    <Stage
      label="测试 / 运行反馈"
      source="社区个别用户反馈的译述｜研究主档 D.5｜007 官方画面仅展示作品语境"
    >
      <div style={{ ...pos, left: 130, top: 190, fontSize: 75 }}>
        测试 <span style={{ color: C.yellow }}>≠</span> 保证
      </div>
      <div
        style={{
          ...pos,
          left: 135,
          top: 430,
          width: 550,
          opacity: 1 - open * 0.25,
        }}
      >
        <div style={{ ...mono, fontSize: 75, color: C.yellow }}>Linux</div>
        <div style={{ fontSize: 40, marginTop: 26 }}>已纳入测试</div>
        <div style={{ fontSize: 28, marginTop: 35, color: C.gray }}>
          2025 年末的公开声明
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 815,
          top: 178,
          width: 960,
          height: 650,
          overflow: "hidden",
          translate: `${(1 - open) * 1100}px 0`,
        }}
      >
        <Img
          src={publicAsset("v38/act3/motion/bond.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            scale: 1.05 + t * 0.007,
          }}
        />
        <div
          style={{
            ...pos,
            inset: 0,
            background:
              "linear-gradient(0deg,#050c13 1%,#050c13b0 48%,#050c1320)",
          }}
        />
        <div
          style={{
            ...pos,
            left: 45,
            top: 38,
            ...mono,
            fontSize: 30,
            color: C.yellow,
          }}
        >
          007 FIRST LIGHT
        </div>
        <div
          style={{ ...pos, left: 45, top: 385, fontSize: 29, color: C.yellow }}
        >
          个别用户报告 / 译述
        </div>
        <div
          style={{ ...pos, left: 45, top: 442, fontSize: 57, lineHeight: 1.35 }}
        >
          在 Linux 上<br />
          启动不了
        </div>
      </div>
    </Stage>
  );
};

export const NewYear = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    happy = say(timing, 120, "祝大家"),
    free = say(timing, 121),
    old = say(timing, 121, "依然");
  return (
    <Stage
      label="2025 → 2026 / 说明的末尾"
      source="年末祝福｜voices38 · V30 社区转述 · 据文本存档重排"
    >
      <div
        style={{
          ...pos,
          left: 130,
          top: 175,
          color: C.gray,
          ...mono,
          fontSize: 27,
        }}
      >
        Sonic.Colors.Ultimate / 公开声明末句
      </div>
      <div
        style={{
          ...pos,
          left: 130,
          top: 262,
          width: 1650,
          ...mono,
          fontSize: 49,
          lineHeight: 1.65,
          color: "#c8d3c9",
        }}
      >
        {NewYearQuote}
      </div>
      <div
        style={{
          ...pos,
          left: 122,
          top: 464,
          fontSize: 125,
          color: C.yellow,
          opacity: lerp(t, happy - 0.15, happy + 0.4),
          translate: `0 ${lerp(t, happy, happy + 0.6, 30, 0)}px`,
        }}
      >
        新年快乐
      </div>
      <Reveal at={free} style={{ ...pos, left: 135, top: 645, fontSize: 49 }}>
        也希望新的一年，依然能享受到
      </Reveal>
      <Reveal
        at={old}
        style={{ ...pos, left: 135, top: 717, fontSize: 62, color: C.yellow }}
      >
        没有 DRM 的老派游戏体验。
      </Reveal>
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          style={{
            ...pos,
            left: 1120 + ((i * 89) % 650),
            top: 790 - ((t * 24 + i * 57) % 530),
            width: i % 3 === 0 ? 6 : 3,
            height: i % 3 === 0 ? 6 : 3,
            background: C.yellow,
            opacity: lerp(t, happy, happy + 0.8) * 0.22,
          }}
        />
      ))}
    </Stage>
  );
};

export const HardwareProgress = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    claim = say(timing, 123),
    number = say(timing, 123, "测试平台"),
    ram = say(timing, 124);
  const transform = lerp(t, claim - 0.3, claim + 0.7),
    progress = lerp(t, number + 0.8, number + 2.3) * 0.35;
  return (
    <Stage
      label="2026.01.28 / 一个月后的进展"
      source="测试硬件筹备目标：本人说法｜GameGPU 转述 · V31｜题头原图 V05"
      light
    >
      <div
        style={{
          ...pos,
          left: 130,
          top: 155,
          width: 1660,
          opacity: 1 - transform,
          translate: `0 ${-transform * 180}px`,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 27, color: C.red }}>
          SONIC FRONTIERS / 2026.01.28
        </div>
        <Raster
          name="sonic-header"
          style={{
            width: 1060,
            marginTop: 40,
            marginLeft: 300,
            mixBlendMode: "multiply",
          }}
        />
      </div>
      <div style={{ ...pos, inset: 0, opacity: transform }}>
        <div style={{ ...pos, left: 130, top: 170, fontSize: 45 }}>
          测试硬件筹备目标{" "}
          <span style={{ fontSize: 29, color: "#6f7776" }}>（本人说法）</span>
        </div>
        <div
          style={{
            ...pos,
            left: 120,
            top: 270,
            ...mono,
            fontSize: 205,
            lineHeight: 1,
            color: C.ink,
          }}
        >
          {Math.round(progress * 100)}
          <span style={{ fontSize: 112, color: C.red }}>%</span>
        </div>
        <div
          style={{
            ...pos,
            left: 1050,
            top: 280,
            width: 630,
            height: 222,
            display: "grid",
            gridTemplateColumns: "repeat(10,1fr)",
            gap: 10,
          }}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                border: "2px solid #9aa6a0",
                background:
                  i < Math.round(progress * 20) ? C.ink : "transparent",
                opacity: i < 7 ? 1 : 0.35,
              }}
            />
          ))}
        </div>
        <div
          style={{
            ...pos,
            left: 130,
            top: 561,
            width: 1640,
            height: 55,
            border: "2px solid #a8ada5",
            background: "#e2dfd5",
          }}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: "100%",
              background: C.ink,
            }}
          />
          <div
            style={{
              ...pos,
              left: 1640 * progress - 1,
              top: -17,
              width: 3,
              height: 86,
              background: C.red,
            }}
          />
        </div>
        <div
          style={{
            ...pos,
            left: 130,
            top: 650,
            fontSize: 29,
            color: "#69746e",
          }}
        >
          硬件筹备进度
        </div>
        <Reveal
          at={ram}
          style={{
            ...pos,
            left: 735,
            top: 659,
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
        >
          <div style={{ width: 110, height: 2, background: C.red }} />
          <div style={{ fontSize: 42, color: C.red }}>采购被内存价格拖住</div>
        </Reveal>
      </div>
    </Stage>
  );
};

export const NewVersions = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    next = say(timing, 126),
    versions = say(timing, 126, "就要尝试"),
    complex = say(timing, 126, "更加复杂");
  const push = lerp(t, next, next + 0.75);
  return (
    <Stage
      label="2026.01 / 研究继续"
      source="voices38 的后续计划｜GameGPU 转述 · V31｜保护结构为图解"
    >
      <div style={{ ...pos, left: 130, top: 150, fontSize: 30, color: C.gray }}>
        测试硬件筹备
      </div>
      <div
        style={{
          ...pos,
          left: 130,
          top: 195,
          ...mono,
          fontSize: 82,
          color: C.yellow,
        }}
      >
        35%
      </div>
      <div
        style={{
          ...pos,
          left: 130,
          top: 310,
          width: 365,
          height: 5,
          background: "#395058",
        }}
      >
        <div style={{ width: "35%", height: "100%", background: C.yellow }} />
      </div>
      <div
        style={{ ...pos, left: 130, top: 397, fontSize: 40, opacity: 1 - push }}
      >
        继续往前走。
      </div>
      <div
        style={{
          ...pos,
          left: 620,
          top: 170,
          width: 1180,
          height: 610,
          opacity: push,
          translate: `${(1 - push) * 600}px 0`,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              ...pos,
              left: 270 + i * 105,
              top: 125 - i * 26,
              width: 410,
              height: 420,
              border: `2px solid ${i === 3 ? C.yellow : C.blue}`,
              background: "#0c161bdd",
              rotate: `${-12 + i * 5}deg`,
              translate: `${lerp(t, complex, complex + 0.8, 0, i * 20)}px 0`,
              boxShadow: "-16px 12px 45px #0007",
            }}
          >
            <div
              style={{
                padding: 26,
                ...mono,
                fontSize: 28,
                color: i === 3 ? C.yellow : C.blue,
              }}
            >
              Denuvo
            </div>
            {Array.from({ length: 6 }, (_, j) => (
              <div
                key={j}
                style={{
                  margin: "18px 26px",
                  height: 2,
                  width: 260 - (j % 3) * 45,
                  background: "#59778565",
                }}
              />
            ))}
          </div>
        ))}
        <Reveal
          at={versions}
          style={{ ...pos, left: 15, top: 0, fontSize: 74, color: C.white }}
        >
          更新
        </Reveal>
        <Reveal
          at={complex}
          style={{ ...pos, left: 15, top: 510, fontSize: 64, color: C.yellow }}
        >
          更加复杂
        </Reveal>
      </div>
      <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
        <Stroke
          d="M150 740H545L590 695M545 740L590 785"
          at={next}
          duration={0.8}
        />
      </svg>
    </Stage>
  );
};
