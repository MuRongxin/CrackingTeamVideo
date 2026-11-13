import { Img } from "remotion";
import { C, F } from "../style";
import { lerp, useTime } from "../components";
import { publicAsset } from "../assets";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
import { Stage, Reveal, Rig, Memory, pos, mono, Stroke } from "./shared";

export const DarkAges = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    game = say(timing, 127, "《毁灭"),
    difference = say(timing, 128),
    media = say(timing, 129);
  const enter = lerp(t, game - 0.5, game + 0.7),
    pull = lerp(t, media, media + 0.9);
  return (
    <Stage
      label="2026.03.13 / 新的发行"
      source="发行日期｜研究主档 D.6 · 重要节点为媒体评价｜TechSpot / V11 · 文字海报"
    >
      <div
        style={{
          ...pos,
          inset: 0,
          background:
            "radial-gradient(ellipse at 70% 70%,#6a362a90,transparent 65%)",
          opacity: enter,
        }}
      />
      <div
        style={{
          ...pos,
          left: 110,
          top: 142,
          ...mono,
          fontSize: 88,
          color: C.yellow,
          translate: `0 ${-pull * 10}px`,
        }}
      >
        2026.03.13
      </div>
      <div
        style={{
          ...pos,
          left: 125,
          top: 276,
          width: 1670,
          height: 410,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: 'Impact, "Noto Sans", sans-serif',
            fontWeight: 900,
            fontSize: 340,
            lineHeight: 1,
            letterSpacing: -15,
            color: C.paper,
            translate: `0 ${(1 - enter) * 450}px`,
            scale: 1 + t * 0.003,
            transformOrigin: "left",
          }}
        >
          DOOM
        </div>
        <div
          style={{
            ...pos,
            top: 170,
            left: 1120,
            color: "#dcaa85",
            ...mono,
            fontSize: 40,
            letterSpacing: 5,
            opacity: enter,
          }}
        >
          THE DARK AGES
        </div>
      </div>
      <Reveal
        at={game}
        style={{
          ...pos,
          left: 140,
          top: 635,
          fontSize: 76,
          translate: `${pull * -20}px 0`,
        }}
      >
        毁灭战士：黑暗时代
      </Reveal>
      <div
        style={{
          ...pos,
          left: 130,
          top: 745,
          width: 1650,
          height: 3,
          background: "#705044",
          scale: `${lerp(t, difference, difference + 0.8)} 1`,
          transformOrigin: "left",
        }}
      />
      <Reveal
        at={media}
        style={{ ...pos, left: 140, top: 782, fontSize: 36, color: C.yellow }}
      >
        媒体评价：开始突破较新一代 Denuvo 的重要节点
      </Reveal>
    </Stage>
  );
};

export const FiveMonths = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    months = say(timing, 131),
    answer = say(timing, 132),
    done = say(timing, 132, "已经");
  const move = lerp(t, months, months + 0.75),
    settle = lerp(t, answer, done + 0.5);
  return (
    <Stage
      label="回到最初的提醒 / 2025.10 → 2026.03"
      source="原评论截图｜V03 · Mediocre-Housing-131｜发行日期：研究主档 D.6"
    >
      <Img
        src={publicAsset("v38/act2/stills/reddit-21-comment.png")}
        style={{
          ...pos,
          left: 195,
          top: 150,
          width: 1530,
          scale: 1 - move * 0.43,
          transformOrigin: "left top",
          translate: `${-move * 45}px ${-move * 60}px`,
          boxShadow: "0 25px 90px #0008",
        }}
      />
      <div
        style={{
          ...pos,
          left: 140,
          top: 470,
          opacity: move,
          ...mono,
          fontSize: 27,
          color: C.gray,
        }}
      >
        2025.10
      </div>
      <div
        style={{
          ...pos,
          right: 160,
          top: 470,
          opacity: move,
          ...mono,
          fontSize: 27,
          color: C.yellow,
        }}
      >
        2026.03
      </div>
      <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
        <Stroke d="M150 535H1760" at={months} duration={1.1} color={C.blue} />
      </svg>
      <div
        style={{
          ...pos,
          left: 150 + lerp(t, months, answer + 0.3) * 1610,
          top: 529,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: C.yellow,
          opacity: move,
        }}
      />
      <div
        style={{
          ...pos,
          left: 810,
          top: 472,
          fontSize: 39,
          color: C.yellow,
          opacity: move,
        }}
      >
        约 5 个月
      </div>
      <div
        style={{
          ...pos,
          left: 150,
          top: 610,
          width: 580,
          fontSize: 57,
          opacity: move,
        }}
      >
        新版 Denuvo
        <span style={{ ...mono, color: C.yellow, opacity: 1 - settle }}>
          {" "}
          ?
        </span>
      </div>
      <div
        style={{
          ...pos,
          left: 925,
          top: 598,
          opacity: settle,
          translate: `${(1 - settle) * 350}px 0`,
        }}
      >
        <div style={{ fontSize: 57 }}>《黑暗时代》</div>
        <div style={{ ...mono, fontSize: 32, color: C.yellow, marginTop: 25 }}>
          2026.03.13 / voices38
        </div>
        <div style={{ fontSize: 30, color: C.gray, marginTop: 16 }}>
          新的发行给出了回答
        </div>
      </div>
      <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
        <Stroke d="M700 660H865L840 640M865 660L840 680" at={done} />
      </svg>
    </Stage>
  );
};

export const Conditions = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    hardware = say(timing, 134),
    ram = say(timing, 135),
    support = say(timing, 136),
    study = say(timing, 136, "也确实");
  const drift =
    -650 * lerp(t, hardware - 0.3, hardware + 1) -
    570 * lerp(t, support - 0.2, study + 0.8);
  return (
    <Stage
      label="支持 / 硬件 / 研究 / 维护"
      source="捐款用途自述与叙事概括｜V05、V30、V31｜流程与配置为图解"
    >
      <div style={{ ...pos, left: 130, top: 145, fontSize: 58 }}>
        继续研究的条件
      </div>
      <div
        style={{
          ...pos,
          left: 0,
          top: 0,
          width: 3300,
          height: 850,
          translate: `${drift}px 0`,
        }}
      >
        <div style={{ ...pos, left: 140, top: 300, width: 640 }}>
          <div style={{ ...mono, fontSize: 29, color: C.yellow }}>
            01 / 捐款用途自述
          </div>
          <div style={{ fontSize: 57, marginTop: 40 }}>匿名支持者</div>
          {["Crystal", "kuba271k (x2)", "unknown"].map((n, i) => (
            <div
              key={n}
              style={{
                ...mono,
                fontSize: 31,
                color: i === 2 ? C.yellow : C.gray,
                marginTop: 30,
                translate: `${Math.sin(t * 0.5 + i) * 5}px 0`,
              }}
            >
              {n}
            </div>
          ))}
          <div style={{ fontSize: 30, color: C.gray, marginTop: 45 }}>
            支持以后的研究
          </div>
        </div>
        <div style={{ ...pos, left: 880, top: 300, width: 670 }}>
          <div style={{ ...mono, fontSize: 29, color: C.yellow }}>
            02 / 测试电脑与硬件
          </div>
          <div style={{ width: 600, marginTop: 15 }}>
            <Memory insert={0.6} price={t >= ram} />
          </div>
          <Reveal at={ram} style={{ fontSize: 32, color: C.yellow }}>
            内存涨价，采购放慢
          </Reveal>
        </div>
        <div style={{ ...pos, left: 1640, top: 300, width: 640 }}>
          <div style={{ ...mono, fontSize: 29, color: C.yellow }}>
            03 / 工具研究
          </div>
          <div
            style={{
              marginTop: 65,
              width: 440,
              height: 230,
              border: "2px solid #6e8aa6",
              padding: 28,
              background: "#102024",
            }}
          >
            <div style={{ ...mono, fontSize: 40, color: C.white }}>
              voices38
            </div>
            {["研究", "验证", "改进"].map((label, i) => (
              <div
                key={label}
                style={{
                  display: "inline-block",
                  marginTop: 40,
                  marginRight: 22,
                  fontSize: 31,
                  color: t >= support + i * 0.4 ? C.yellow : C.gray,
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 35, color: C.gray, marginTop: 38 }}>
            资金提供了继续的条件
          </div>
        </div>
        <div style={{ ...pos, left: 2380, top: 300, width: 560 }}>
          <div style={{ ...mono, fontSize: 29, color: C.yellow }}>
            04 / 发行与修复
          </div>
          <div
            style={{
              marginTop: 47,
              width: 350,
              height: 285,
              border: "2px solid #6e8aa6",
              padding: 35,
              rotate: "4deg",
              background: "#111c21",
            }}
          >
            <div style={{ ...mono, fontSize: 48 }}>NFO</div>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  height: 2,
                  width: 250 - i * 24,
                  background: C.blue,
                  marginTop: 30,
                }}
              />
            ))}
          </div>
        </div>
        <svg width="3300" height="850" style={{ ...pos, inset: 0 }}>
          <Stroke
            d="M620 550H825L800 530M825 550L800 570"
            at={hardware}
            color={C.yellow}
          />
          <Stroke
            d="M1440 550H1580L1555 530M1580 550L1555 570"
            at={support}
            color={C.yellow}
          />
          <Stroke
            d="M2180 550H2330L2305 530M2330 550L2305 570"
            at={study}
            color={C.yellow}
          />
        </svg>
      </div>
    </Stage>
  );
};
