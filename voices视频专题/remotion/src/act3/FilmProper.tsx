import { C, F } from "../style";
import { lerp, useTime } from "../components";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
import { pewAt } from "./motion";
import {
  Stage,
  Raster,
  Still,
  Clip,
  Grid,
  Type,
  Stroke,
  OriginalLine,
  DateRail,
  pos,
  mono,
  ramp,
} from "./motion-shared";

export const DeadSpace = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    kind = say(timing, 80),
    correction = say(timing, 81),
    dismiss = say(timing, 82),
    pew = pewAt(timing);
  const p = lerp(t, kind, kind + 0.5),
    corrected = lerp(t, correction + 0.7, correction + 1.1),
    out = lerp(t, dismiss, dismiss + 0.4);
  return (
    <Stage
      label="2026.01.11 / DEAD SPACE REMAKE"
      source="voices38《死亡空间》发行说明 · 游戏画面：EA"
    >
      <Still src="v38/act3/dead-space.jpg" dim={0.05} />
      <Clip src="v38/act3/footage/corridor.mp4" duration={1.8} dim={0.05} />
      <Clip
        src="v38/act3/footage/combat.mp4"
        at={kind}
        duration={3.7}
        dim={0.1}
      />
      <Clip
        src="v38/act3/footage/explore.mp4"
        at={kind + 3.7}
        duration={3.5}
        dim={0.05}
      />
      <div
        style={{
          ...pos,
          left: 80,
          top: 140,
          ...mono,
          fontSize: 150,
          lineHeight: 0.95,
          letterSpacing: -6,
          textShadow: "0 3px 30px #000",
          opacity: 1 - p,
          translate: `0 ${-p * 380}px`,
        }}
      >
        DEAD
        <br />
        SPACE
      </div>
      <div
        style={{
          ...pos,
          left: 95,
          top: 160,
          opacity: p * (1 - out),
          transformOrigin: "left",
          scale: 1 - corrected * 0.2,
          textShadow: "0 4px 25px #000",
        }}
      >
        <div style={{ ...mono, fontSize: 29, color: C.yellow }}>KIND</div>
        <div style={{ ...mono, fontSize: 70, marginTop: 20 }}>
          Pew-Pew at
          <br />
          Zombies in Space
        </div>
      </div>
      {[0, 1, 2].map((i) => {
        const q = ramp(t, pew + i * 0.18, pew + i * 0.18 + 0.45);
        return (
          <div
            key={i}
            style={{
              ...pos,
              left: 850 + i * 270,
              top: 470 - i * 80,
              ...mono,
              fontSize: 105,
              color: C.yellow,
              opacity: q > 0 ? 1 - q : 0,
              transform: `rotate(${-15 + i * 10}deg) scale(${1 + q * 0.5})`,
              textShadow: "0 0 30px #ffc83d60",
            }}
          >
            PEW!
          </div>
        );
      })}
      <div
        style={{
          ...pos,
          left: 100 + out * 1600,
          top: 590,
          fontSize: 76,
          color: C.white,
          textShadow: "0 4px 20px #000",
          opacity: corrected,
          rotate: `${out * 12}deg`,
        }}
      >
        <span style={{ position: "relative", color: C.gray }}>
          僵尸
          <span
            style={{
              ...pos,
              left: 0,
              right: 0,
              top: "50%",
              height: 6,
              background: C.red,
              scale: `${corrected} 1`,
              transformOrigin: "left",
            }}
          />
        </span>
        <span
          style={{
            display: "inline-block",
            marginLeft: 65,
            translate: `0 ${(1 - corrected) * 100}px`,
            color: C.yellow,
          }}
        >
          尸变体
        </span>
      </div>
      <div
        style={{
          ...pos,
          right: 100,
          top: 725,
          fontSize: 48,
          color: C.yellow,
          opacity: out,
        }}
      >
        不过，这不重要。
      </div>
    </Stage>
  );
};

export const ProperWord = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    word = say(timing, 83, "PROPER"),
    define = say(timing, 84),
    example = say(timing, 85),
    bad = say(timing, 85, "有问题"),
    fix = say(timing, 85, "后面");
  const zoom = lerp(t, word - 0.15, word + 0.55),
    down = lerp(t, example, example + 0.65),
    repair = lerp(t, fix, fix + 0.55);
  return (
    <Stage
      light
      label="版本名里 / 多了一个词"
      source="voices38《死亡空间》PROPER 发行说明"
    >
      <Grid />
      <div
        style={{
          ...pos,
          left: 85,
          top: 200 - zoom * 75 - down * 75,
          width: 1750,
          height: 220,
          overflow: "hidden",
          opacity: 1 - down,
          transformOrigin: "right top",
          scale: 1 + zoom * 0.18,
        }}
      >
        <Raster src="v38/act3/nfo/proper-fields.png" style={{ width: 1704 }} />
      </div>
      <div
        style={{
          ...pos,
          left: 90,
          top: 430 - down * 230,
          ...mono,
          fontSize: 205 - down * 60,
          color: C.ink,
          letterSpacing: -8,
          opacity: zoom,
          translate: `0 ${(1 - zoom) * 90}px`,
        }}
      >
        PROPER
        <span
          style={{
            fontSize: 55,
            fontFamily: F.cn,
            color: C.ink,
            marginLeft: 65,
            opacity: lerp(t, define + 0.4, define + 1),
          }}
        >
          修正版
        </span>
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 485,
          width: 1715,
          height: 225,
          opacity: down,
        }}
      >
        <div style={{ ...mono, fontSize: 25, color: C.gray, marginBottom: 25 }}>
          RELEASE / 先前发行
        </div>
        <svg width={1715} height={160} style={{ overflow: "visible" }}>
          {Array.from({ length: 26 }, (_, i) => {
            const broken = [9, 10, 16].includes(i);
            const fault = lerp(t, bad, bad + 0.5);
            return (
              <g
                key={i}
                transform={`translate(${i * 65},${broken ? fault * (1 - repair) * 160 : 0})`}
                opacity={broken ? 1 - fault + repair : 1}
              >
                <path
                  d="M0 0H57V120H0Z"
                  fill={broken && repair ? C.yellow : "#263746"}
                  stroke={broken ? C.yellow : C.blue}
                />
                <path
                  d="M8 20H48M8 32H40M8 44H48M8 56H35M8 68H48"
                  stroke={C.blue}
                  strokeWidth={2}
                />
              </g>
            );
          })}
        </svg>
        <div
          style={{
            ...pos,
            left: 565,
            top: 210,
            fontSize: 39,
            color: repair > 0.4 ? C.yellow : C.red,
          }}
        >
          {repair > 0.4 ? "后续发行，修正问题" : t >= bad ? "这一版有问题" : ""}
        </div>
        <div
          style={{
            ...pos,
            left: repair * 1715,
            top: 38,
            width: 4,
            height: 135,
            background: C.yellow,
            boxShadow: "0 0 35px #ffc83d",
            opacity: t >= fix && repair < 1 ? 1 : 0,
          }}
        />
      </div>
    </Stage>
  );
};

export const EarlierBeta = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    name = say(timing, 86, "0xZeOn"),
    route = say(timing, 87, "Hypervisor"),
    later = say(timing, 88);
  const reveal = lerp(t, route - 0.2, route + 0.65),
    bookmark = lerp(t, later + 0.6, later + 1.2);
  return (
    <Stage
      label="同一款游戏 / 几天前的另一条路线"
      source="发行记录：Reddit · r/CrackWatch"
    >
      <Still src="v38/act3/motion/dead-space-alt.jpg" dim={0.38} />
      <div
        style={{
          ...pos,
          inset: 0,
          background: "linear-gradient(90deg,#05101af5,transparent)",
        }}
      />
      <div
        style={{
          ...pos,
          left: 100,
          top: 160,
          ...mono,
          fontSize: 30,
          color: C.gray,
        }}
      >
        DEAD SPACE / BETA
      </div>
      <Type
        at={name - 0.15}
        duration={0.5}
        style={{ ...pos, left: 90, top: 235, fontSize: 155, color: "#9dc7df" }}
      >
        0xZeOn
      </Type>
      <div
        style={{
          ...pos,
          left: 110,
          top: 455,
          fontSize: 50,
          color: C.white,
          opacity: lerp(t, say(timing, 87), say(timing, 87) + 0.5),
        }}
      >
        先前发布的测试版
      </div>
      <svg width={1920} height={1080} style={{ ...pos, inset: 0 }}>
        <Stroke
          d="M110 670H750L940 505H1700"
          at={route - 0.2}
          duration={1.1}
          color="#9dc7df"
          width={5}
        />
        <Stroke d="M110 670H1720" at={0.2} duration={1.6} color="#6e8aa64d" />
        <circle
          cx={750 + bookmark * 950}
          cy={670 - bookmark * 165}
          r={10}
          fill={C.yellow}
          opacity={reveal}
        />
      </svg>
      <div
        style={{
          ...pos,
          left: 965,
          top: 360,
          ...mono,
          fontSize: 80 - bookmark * 25,
          color: "#9dc7df",
          opacity: reveal,
          translate: `${bookmark * 200}px ${bookmark * 220}px`,
        }}
      >
        Hypervisor
      </div>
      <div
        style={{
          ...pos,
          right: 170,
          top: 700,
          fontSize: 33,
          color: C.yellow,
          opacity: bookmark,
        }}
      >
        这条支线，后面再展开 ↗
      </div>
      <div
        style={{
          ...pos,
          left: 110,
          top: 715,
          fontSize: 27,
          ...mono,
          color: C.gray,
        }}
      >
        几天前 → 2026.01.11 / PROPER
      </div>
    </Stage>
  );
};

const notes = "v38/act3/nfo/proper-notes.png";
const Monitor = ({
  x,
  y,
  fail,
  linux = false,
}: {
  x: number;
  y: number;
  fail: number;
  linux?: boolean;
}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect
      width={380}
      height={225}
      rx={10}
      fill="#0c1a25"
      stroke={fail ? C.red : C.blue}
      strokeWidth={3}
    />
    <path d="M25 36H355M25 56H260" stroke={C.blue} opacity={0.5} />
    <path d="M190 225V264M100 266H280" stroke={C.blue} strokeWidth={8} />
    <text
      x={190}
      y={140}
      textAnchor="middle"
      fontFamily={F.mono}
      fontSize={linux ? 49 : 39}
      fill={fail ? C.red : C.white}
    >
      {linux ? "Linux" : "CONFIG"}
    </text>
    <path
      d="M45 190L337 35M45 35L337 190"
      stroke={C.red}
      strokeWidth={6}
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - fail}
    />
  </g>
);

export const Criticism = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    starts = [
      say(timing, 89),
      say(timing, 90),
      say(timing, 91),
      say(timing, 92),
    ];
  const phase = t < starts[1] ? 0 : t < starts[2] ? 1 : t < starts[3] ? 2 : 3;
  const at = starts[phase],
    local = t - at,
    bad = say(timing, 89, "坏的"),
    memory = say(timing, 91, "虚拟内存");
  const band = [
    [2, 26],
    [14, 26],
    [38, 26],
    [14, 14],
  ][phase];
  return (
    <Stage
      label="PROPER NOTES / voices38 怎样评价先前方案"
      source="技术批评：voices38《死亡空间》PROPER 发行说明"
    >
      <Grid />
      <div
        style={{
          ...pos,
          left: 70,
          top: 140,
          width: 1780,
          borderLeft: `4px solid ${phase === 0 ? C.yellow : C.red}`,
          background: "#000",
          padding: "20px 15px",
          translate: `0 ${lerp(t, at, at + 0.45, 32, 0)}px`,
        }}
      >
        <OriginalLine
          src={notes}
          sourceWidth={568}
          y={band[0]}
          h={band[1]}
          width={1720}
        />
      </div>
      {phase === 0 && (
        <div
          style={{
            ...pos,
            left: 105,
            top: 385,
            transformOrigin: "left",
            scale: 1 + ramp(t, at, starts[1]) * 0.045,
          }}
        >
          <div style={{ ...mono, fontSize: 40, color: C.gray }}>
            I respect ZeOn’s crack attempts, but…
          </div>
          <div
            style={{
              fontSize: 120,
              marginTop: 65,
              color: t >= bad ? C.red : C.white,
              translate: `0 ${lerp(t, bad, bad + 0.3, 30, 0)}px`,
            }}
          >
            {t >= bad ? "从设计上有问题。" : "尊重尝试，"}
          </div>
          <div
            style={{
              height: 5,
              width: lerp(t, bad, bad + 0.8, 0, 1510),
              background: C.red,
              marginTop: 35,
            }}
          />
        </div>
      )}
      {phase === 1 && (
        <svg width={1920} height={1080} style={{ ...pos, inset: 0 }}>
          {[0, 1, 2].map((i) => (
            <Monitor
              key={i}
              x={140 + i * 590}
              y={430 + Math.sin(local * 0.6 + i) * 6}
              fail={lerp(t, at + 0.2 + i * 0.65, at + 0.6 + i * 0.65)}
              linux={i === 2}
            />
          ))}
          <text x={150} y={795} fill={C.red} fontSize={48} fontFamily={F.cn}>
            配置兼容性
          </text>
          <text x={1330} y={795} fill={C.red} fontSize={48} fontFamily={F.cn}>
            Linux / Proton
          </text>
        </svg>
      )}
      {phase === 2 && (
        <>
          <div
            style={{
              ...pos,
              left: 110,
              top: 365,
              ...mono,
              fontSize: 99,
              color: C.red,
              letterSpacing: -3,
              translate: `${local < 1 ? Math.sin(local * 95) * 9 : 0}px 0`,
            }}
          >
            FREEZE / CRASH
          </div>
          <div
            style={{
              ...pos,
              left: 110,
              top: 540,
              width: 1690,
              height: 90,
              display: "flex",
              gap: 13,
            }}
          >
            {Array.from({ length: 28 }, (_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: i < 11 ? "#97b8cd" : C.yellow,
                  opacity:
                    i < 11
                      ? 0.7
                      : lerp(
                          t,
                          memory + (i - 11) * 0.055,
                          memory + 0.3 + (i - 11) * 0.055,
                        ),
                  translate: `0 ${i < 11 ? 0 : lerp(t, memory + (i - 11) * 0.055, memory + 0.5 + (i - 11) * 0.055, 130, 0)}px`,
                  borderBottom: "10px solid #142536",
                }}
              />
            ))}
          </div>
          <div
            style={{
              ...pos,
              left: 110,
              top: 698,
              fontSize: 49,
              color: C.yellow,
              opacity: lerp(t, memory, memory + 0.3),
            }}
          >
            调大虚拟内存，避开问题。
          </div>
        </>
      )}
      {phase === 3 && (
        <>
          <div
            style={{
              ...pos,
              left: 90,
              top: 320,
              ...mono,
              fontSize: 190,
              color: C.red,
              lineHeight: 0.95,
              letterSpacing: -10,
              translate: `${lerp(t, at, at + 0.4, 400, 0)}px 0`,
            }}
          >
            BAD BY
            <br />
            DESIGN.
          </div>
          <div
            style={{
              ...pos,
              right: 110,
              top: 715,
              fontSize: 30,
              color: C.gray,
            }}
          >
            —— voices38 的评价
          </div>
        </>
      )}
      <div
        style={{
          ...pos,
          right: 90,
          top: 70,
          ...mono,
          fontSize: 22,
          color: C.gray,
        }}
      >
        0{phase + 1} / 04
      </div>
    </Stage>
  );
};

export const OwnProper = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    old = say(timing, 93, "老派"),
    all = say(timing, 93, "在什么"),
    memory = say(timing, 93, "内存"),
    enjoy = say(timing, 94);
  const out = lerp(t, enjoy - 0.1, enjoy + 0.35);
  return (
    <Stage
      label="然后 / 他介绍自己的版本"
      source="兼容性主张：voices38《死亡空间》发行说明"
    >
      <Grid color={C.yellow} />
      <div
        style={{
          ...pos,
          left: 90,
          top: 170,
          ...mono,
          fontSize: 117,
          color: C.yellow,
          translate: `${lerp(t, old - 0.4, old + 0.3, 160, 0)}px ${-out * 300}px`,
          opacity: 1 - out,
        }}
      >
        old school proper
      </div>
      <div
        style={{
          ...pos,
          left: 85,
          top: 380,
          transformOrigin: "left top",
          scale: 1 + ramp(t, 0, enjoy) * 0.025,
          opacity: 1 - out,
        }}
      >
        <Raster src="v38/evidence/proper-claim.png" style={{ width: 1740 }} />
      </div>
      <div
        style={{
          ...pos,
          left: 95,
          top: 610,
          width: 1700,
          overflow: "hidden",
          opacity: 1 - out,
        }}
      >
        <div
          style={{
            fontSize: 69,
            color: C.white,
            translate: `0 ${lerp(t, all, all + 0.4, 120, 0)}px`,
          }}
        >
          在什么环境下都能用
          <span
            style={{
              display: "inline-block",
              marginLeft: 75,
              color: C.yellow,
              opacity: lerp(t, memory, memory + 0.35),
            }}
          >
            没有内存问题
          </span>
        </div>
        <div
          style={{
            marginTop: 28,
            height: 4,
            width: lerp(t, all, memory + 0.8, 0, 1670),
            background: C.yellow,
          }}
        />
      </div>
      <div
        style={{
          ...pos,
          left: 95,
          top: 310,
          ...mono,
          fontSize: 250,
          color: C.yellow,
          opacity: out,
          translate: `0 ${(1 - out) * 500}px`,
          letterSpacing: -10,
        }}
      >
        Enjoy.
      </div>
      <div style={{ ...pos, left: 110, top: 680, fontSize: 51, opacity: out }}>
        祝大家玩得开心。
      </div>
    </Stage>
  );
};

export const ThreeDays = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    word = say(timing, 95, "CRACKFIX"),
    self = say(timing, 96, "自己的");
  const day =
    11 + (t >= 0.24 ? 1 : 0) + (t >= 0.7 ? 1 : 0) + (t >= 1.16 ? 1 : 0);
  const swap = lerp(t, 1.1, 1.8),
    fix = lerp(t, word - 0.3, word + 0.35),
    focus = lerp(t, self - 0.2, self + 0.5);
  return (
    <Stage
      label="三天后 / 2026.01.14"
      source="voices38《死亡空间》发行说明 · 2026-01-11 / 01-14"
    >
      <Grid color={C.red} />
      <div
        style={{
          ...pos,
          right: 70,
          top: 60,
          ...mono,
          fontSize: 430,
          lineHeight: 1,
          color: "#24313c",
          letterSpacing: -35,
        }}
      >
        {day}
      </div>
      <div
        style={{
          ...pos,
          left: 95,
          top: 180,
          ...mono,
          fontSize: 44,
          color: C.gray,
        }}
      >
        JAN / 2026
      </div>
      <div
        style={{
          ...pos,
          left: 95,
          top: 320,
          width: 1730,
          height: 260,
          overflow: "hidden",
          translate: `0 ${-fix * 100}px`,
        }}
      >
        <div style={{ translate: `0 ${-swap * 330}px` }}>
          <Raster
            src="v38/act3/nfo/proper-fields.png"
            style={{ width: 1704 }}
          />
        </div>
        <div
          style={{ ...pos, left: 0, top: 330, translate: `0 ${-swap * 330}px` }}
        >
          <Raster src="v38/evidence/fix-fields.png" style={{ width: 1704 }} />
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 82,
          top: 535 - focus * 65,
          ...mono,
          fontSize: 180 - focus * 25,
          letterSpacing: -8,
          color: C.yellow,
          opacity: fix,
          translate: `${lerp(t, word - 0.2, word + 0.3, 250, 0)}px 0`,
        }}
      >
        CRACKFIX
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 728,
          fontSize: 48,
          color: C.red,
          opacity: focus,
        }}
      >
        这次要修的，是他自己的破解版本。
      </div>
      <svg width={1920} height={1080} style={{ ...pos, inset: 0 }}>
        <Stroke
          d="M1360 705V587H1640V270"
          at={self}
          color={C.red}
          duration={0.7}
        />
      </svg>
    </Stage>
  );
};

export const Sorry = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    repaired = say(timing, 97, "全部修好"),
    apology = say(timing, 97, "并向"),
    tools = say(timing, 98),
    done = say(timing, 98, "避免");
  const a = lerp(t, apology - 0.1, apology + 0.4),
    b = lerp(t, tools + 0.3, tools + 1);
  return (
    <Stage
      label="CRACKFIX NOTES / 他的承认与补救"
      source="voices38《死亡空间》CRACKFIX 发行说明 · 2026-01-14"
    >
      <Grid />
      <div
        style={{
          ...pos,
          left: 70,
          top: 145,
          padding: "20px 10px",
          background: "#000",
          width: 1780,
        }}
      >
        <Raster src="v38/evidence/crackfix-notes.png" style={{ width: 1740 }} />
      </div>
      <div style={{ ...pos, left: 100, top: 410, width: 1720, opacity: 1 - a }}>
        <div style={{ fontSize: 64, color: t < repaired ? C.red : C.yellow }}>
          {t < repaired ? "上一版，漏掉了几个地方。" : "现在应该已经全部修好。"}
        </div>
        <div style={{ display: "flex", gap: 18, marginTop: 70 }}>
          {Array.from({ length: 18 }, (_, i) => {
            const missing = [4, 10, 14].includes(i),
              p = lerp(
                t,
                repaired + (i % 4) * 0.12,
                repaired + 0.5 + (i % 4) * 0.12,
              );
            return (
              <div
                key={i}
                style={{
                  height: 110,
                  flex: 1,
                  background: missing
                    ? p > 0.5
                      ? C.yellow
                      : "transparent"
                    : "#2c4657",
                  border: `2px solid ${missing ? (p > 0.5 ? C.yellow : C.red) : C.blue}`,
                  translate: `0 ${missing ? (1 - p) * -24 : 0}px`,
                }}
              />
            );
          })}
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 95,
          top: 430 - b * 110,
          opacity: a,
          transformOrigin: "left",
          scale: 1 - b * 0.4,
        }}
      >
        <Raster src="v38/evidence/apology.png" style={{ width: 1420 }} />
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 670,
          fontSize: 65,
          color: C.yellow,
          opacity: a * (1 - b),
        }}
      >
        向玩家道歉。
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 535,
          opacity: b,
          translate: `0 ${(1 - b) * 180}px`,
        }}
      >
        <div style={{ ...mono, fontSize: 76, color: "#9fc6de" }}>
          2023 Denuvo tools
        </div>
        <svg width={1720} height={150} style={{ marginTop: 20 }}>
          <path d="M0 80H1720" stroke="#7592a355" strokeWidth={3} />
          {Array.from({ length: 25 }, (_, i) => {
            const x = ((t - tools) * 180 + i * 73) % 1720;
            return (
              <path
                key={i}
                d={`M${x} 65v30m-10-15h20`}
                stroke={C.blue}
                strokeWidth={3}
              />
            );
          })}
          <Stroke
            d="M0 80H1720"
            at={done}
            duration={1.5}
            color={C.yellow}
            width={5}
          />
        </svg>
        <div
          style={{
            ...pos,
            left: 930,
            top: 5,
            fontSize: 40,
            color: C.yellow,
            opacity: lerp(t, done, done + 0.4),
          }}
        >
          改进工具，避免重演。
        </div>
      </div>
    </Stage>
  );
};

export const ThreeDaysApart = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    at = say(timing, 100),
    after = t >= at,
    kick = after ? lerp(t, at, at + 0.25, 1.1, 1) : lerp(t, 0, at, 1, 1.04);
  return (
    <Stage
      label={after ? "01.14 / 三天后" : "01.11 / 三天前"}
      source="voices38《死亡空间》发行说明 · 2026-01-11 / 01-14"
    >
      <div
        style={{ ...pos, inset: 0, background: after ? "#141014" : "#0a1720" }}
      />
      <div
        style={{
          ...pos,
          left: 85,
          top: 150,
          ...mono,
          fontSize: 160,
          letterSpacing: -8,
          color: after ? C.red : "#829ba9",
          opacity: 0.7,
        }}
      >
        {after ? "CRACKFIX" : "PROPER"}
      </div>
      <div
        style={{
          ...pos,
          left: 85,
          top: 390,
          transformOrigin: "left",
          scale: kick,
        }}
      >
        <Raster
          src={
            after ? "v38/evidence/apology.png" : "v38/evidence/proper-claim.png"
          }
          style={{ width: after ? 1450 : 1730 }}
        />
      </div>
      <div
        style={{
          ...pos,
          left: 95,
          top: 690,
          fontSize: after ? 100 : 70,
          color: after ? C.yellow : C.white,
        }}
      >
        {after ? "抱歉。" : "“在什么环境下都能用。”"}
      </div>
    </Stage>
  );
};

export const EarlierFix = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    old = say(timing, 102),
    repair = say(timing, 103),
    why = say(timing, 103, "只有 Windows");
  const history = lerp(t, old - 0.2, old + 0.65),
    fix = lerp(t, repair - 0.2, repair + 0.7),
    detail = lerp(t, why - 0.5, why + 0.4);
  return (
    <Stage
      label="发行之后，修复仍在继续"
      source="RELOADED《细胞分裂：混沌理论》发行说明 · 2006-05"
    >
      <Grid color={C.blue} />
      <div
        style={{
          ...pos,
          left: 95,
          top: 170,
          ...mono,
          fontSize: 220,
          color: "#5d7b8e",
          letterSpacing: -10,
          translate: `0 ${-history * 420}px`,
          opacity: 1 - history,
        }}
      >
        2026
      </div>
      <div
        style={{
          ...pos,
          left: 95,
          top: 450,
          opacity: 1 - history,
          translate: `${-history * 1900}px 0`,
        }}
      >
        <Raster src="v38/evidence/crackfix-notes.png" style={{ width: 1740 }} />
      </div>
      <div
        style={{
          ...pos,
          left: 65,
          top: 135,
          width: 880,
          height: 700,
          overflow: "hidden",
          opacity: history,
          transform: `perspective(1700px) rotateY(${8 - history * 8}deg) rotateZ(${-3 * (1 - detail)}deg)`,
          translate: `${(1 - history) * 1900}px 0`,
        }}
      >
        <Raster
          src={
            fix > 0.5
              ? "v38/act3/nfo/reloaded-os-header.png"
              : "v38/act2/nfo/reloaded-header.png"
          }
          style={{
            width: 880,
            translate: `0 ${-ramp(t, old, timing.duration) * 130}px`,
          }}
        />
      </div>
      <div
        style={{
          ...pos,
          left: 1020,
          top: 170,
          opacity: history,
          translate: `0 ${(1 - history) * 300}px`,
        }}
      >
        <div style={{ ...mono, fontSize: 110, color: "#9dc6e0" }}>2006</div>
        <div style={{ fontSize: 44, marginTop: 20 }}>细胞分裂：混沌理论</div>
        <div
          style={{
            ...mono,
            fontSize: 100,
            color: C.yellow,
            marginTop: 85 - detail * 75,
            opacity: fix,
            translate: `${(1 - fix) * 500}px 0`,
          }}
        >
          OS FIX
        </div>
        <div
          style={{ fontSize: 46, marginTop: 30, opacity: fix * (1 - detail) }}
        >
          两天后，也有一份修复。
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 90,
          top: 530,
          width: 1740,
          height: 225,
          padding: 25,
          background: "#070d18",
          boxShadow: "0 30px 80px #000b",
          opacity: detail,
          translate: `0 ${(1 - detail) * 400}px`,
        }}
      >
        <Raster
          src="v38/act3/nfo/reloaded-os-note.png"
          style={{ width: 1660 }}
        />
        <div style={{ ...mono, fontSize: 34, color: C.yellow, marginTop: 10 }}>
          Windows XP SP2
        </div>
      </div>
      <DateRail
        from="2006.05.26 / RELEASE"
        to="2006.05.28 / OS FIX"
        progress={fix}
        color="#9dc6e0"
      />
    </Stage>
  );
};
