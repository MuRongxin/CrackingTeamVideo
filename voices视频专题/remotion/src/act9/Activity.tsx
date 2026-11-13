import { Sequence, useVideoConfig } from "remotion";
import { useTime, lerp } from "../components";
import { C } from "../style";
import type { ShotTiming } from "../timing";
import { GroupMark } from "../act6/Picture";
import { say } from "./timing";
import { Stage, Source, Film, Shade, Logo } from "./Stage";
import {
  Beat,
  Tag,
  Line,
  Archive,
  OldSource,
  Rule,
  NumberDate,
  pos,
  mono,
  lin,
  red,
  mint,
} from "./Motion";
type Props = { timing: ShotTiming };

export const ReturningReleases = ({ timing }: Props) => {
  const t = useTime(),
    { fps } = useVideoConfig(),
    gap = say(timing, 256),
    unknown = say(timing, 256, "是不是"),
    returns = say(timing, 257),
    fix = say(timing, 258),
    progress = lin(t, gap, returns);
  return (
    <Stage
      name="A9-09 · 发行再次出现"
      source="公开发行索引 xREL / TorrentFreak · 间隔原因未知"
    >
      <Beat to={gap} name="从案卷切回名字">
        <div
          style={{
            ...pos,
            left: 0,
            top: 0,
            width: 1920,
            height: 1080,
            background: C.paper,
            translate: `${-1920 * lerp(t, 0, 0.45)}px 0`,
          }}
        >
          <Archive name="grant" x={180} y={150} width={1550} />
        </div>
        <div
          style={{ ...pos, left: 480, top: 310, opacity: lerp(t, 0.35, 0.8) }}
        >
          <GroupMark name="voices38" width={960} />
        </div>
        <Line
          style={{
            left: 0,
            width: 1920,
            top: 660,
            textAlign: "center",
            fontSize: 100,
          }}
        >
          名字，又出现了
        </Line>
      </Beat>
      <Beat from={gap} to={returns} name="穿过没有新发行的日子">
        <Tag light>起诉之后 / 公开发行记录</Tag>
        <div
          style={{
            ...pos,
            left: 170 - progress * 1100,
            top: 300,
            display: "flex",
            gap: 0,
          }}
        >
          {Array.from({ length: 23 }, (_, i) => (
            <div
              key={i}
              style={{
                width: 145,
                flexShrink: 0,
                height: 240,
                borderLeft: "2px solid #667c86",
                paddingLeft: 16,
              }}
            >
              <div
                style={{
                  ...mono,
                  fontSize: 43,
                  color: i === 0 ? mint : "#91a8b1",
                }}
              >
                {i + 14 <= 30 ? `09.${i + 14}` : `10.0${i - 16}`}
              </div>
              <div
                style={{
                  width: 90,
                  height: 3,
                  marginTop: 118,
                  background: "#58717d",
                }}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            ...pos,
            left: 0,
            right: 0,
            top: 240,
            height: 390,
            background:
              "linear-gradient(90deg,#08131b,transparent 12%,transparent 88%,#08131b)",
          }}
        />
        <Line style={{ top: 650, fontSize: 100, color: C.yellow }}>
          约三周，未见新发行
        </Line>
        <div
          style={{
            ...pos,
            left: 1320,
            top: 770,
            fontSize: 42,
            color: mint,
            opacity: lerp(t, unknown, unknown + 0.3),
          }}
        >
          原因未知
        </div>
      </Beat>
      <Beat from={returns} to={fix} name="10月7日真实发行条目" paper>
        <Tag>公开发行重新出现</Tag>
        <NumberDate style={{ top: 165, color: red, fontSize: 205 }}>
          10.07
        </NumberDate>
        <Archive
          name="release-atomfall"
          x={110}
          y={470}
          width={1180}
          style={{
            maxHeight: 320,
            objectFit: "contain",
            objectPosition: "left center",
          }}
        />
        <Rule at={returns} top={790} />
      </Beat>
      <Sequence
        from={Math.round(fix * fps)}
        durationInFrames={Math.ceil((timing.duration - fix) * fps)}
      >
        <Film name="dead-return" />
        <Shade />
      </Sequence>
      <Beat from={fix} name="死亡空间修复接入游戏画面" clear>
        <Tag light>10.08 / 《死亡空间》修复</Tag>
        <Archive name="release-dead" x={100} y={700} width={1490} />
      </Beat>
    </Stage>
  );
};

export const Exorcism = ({ timing }: Props) => {
  const t = useTime(),
    kind = say(timing, 260),
    word = kind + 0.65;
  return (
    <Stage
      name="A9-10 · 驱魔"
      source="V27 原 NFO · 背景：SEGA 亚洲官方炭治郎角色演示"
    >
      <Film name="demon-tanjiro" />
      <Beat to={kind} name="作品先出现" clear>
        <Tag light>2026.10.18</Tag>
        <div
          style={{
            ...pos,
            left: 0,
            bottom: 0,
            width: 1920,
            height: 410,
            background: "linear-gradient(0deg,#08131bea,transparent)",
          }}
        />
        <Line
          style={{
            left: 100,
            top: 705,
            fontSize: 76,
            textShadow: "0 3px 8px #000",
          }}
        >
          鬼灭之刃：火之神血风谭
        </Line>
      </Beat>
      <Beat from={kind} name="KIND字段切入" clear>
        <div
          style={{
            ...pos,
            left: 0,
            top: 220,
            width: 1920,
            height: 410,
            background: "#03070bf2",
            clipPath: `inset(0 ${100 * (1 - lerp(t, kind, kind + 0.22))}% 0 0)`,
          }}
        >
          <Archive name="demon-kind" x={120} y={90} width={1680} />
          <div
            style={{
              ...pos,
              left: 120,
              top: 210,
              ...mono,
              fontSize: 115,
              color: C.yellow,
            }}
          >
            Exorcism
          </div>
        </div>
        <Line
          style={{
            left: 1380,
            top: 680,
            fontSize: 145,
            color: C.yellow,
            opacity: lerp(t, word, word + 0.25),
            translate: `${100 * (1 - lerp(t, word, word + 0.25))}px 0`,
            textShadow: "0 4px 10px #000",
          }}
        >
          驱魔
        </Line>
      </Beat>
    </Stage>
  );
};

export const BetterTools = ({ timing }: Props) => {
  const t = useTime(),
    reply = say(timing, 262);
  return (
    <Stage name="A9-11 · 更好的工具" source="V27 · 公开留言原文重排">
      <Beat to={reply} name="用户问他是否消失">
        <Tag light>帖子下面 / 一位用户</Tag>
        <Line style={{ top: 255, ...mono, fontSize: 86, lineHeight: 1.4 }}>
          almost thought
          <br />
          you we're dissapeared
        </Line>
        <div style={{ ...pos, left: 110, top: 650, fontSize: 67, color: mint }}>
          “还以为你消失了。”
        </div>
        <Rule at={0.7} color={mint} top={785} />
      </Beat>
      <Beat from={reply} name="回答切到更好的工具">
        <div style={{ ...pos, left: 110, top: 85 }}>
          <GroupMark name="voices38" width={400} />
        </div>
        <Line style={{ top: 235, ...mono, fontSize: 104, color: C.white }}>
          Yeah, to focus on
        </Line>
        <Line
          style={{
            top: 420,
            ...mono,
            fontSize: 140,
            color: mint,
            clipPath: `inset(0 ${100 * (1 - lerp(t, reply + 0.5, reply + 1))}% 0 0)`,
          }}
        >
          making better tools.
        </Line>
        <div
          style={{
            ...pos,
            left: 110,
            top: 710,
            fontSize: 64,
            opacity: lerp(t, reply + 1.2, reply + 1.5),
          }}
        >
          专心做更好的工具
        </div>
      </Beat>
    </Stage>
  );
};

export const Disappeared = ({ timing }: Props) => {
  const t = useTime(),
    date = say(timing, 264),
    unknown = say(timing, 265),
    turn = lerp(t, 0.5, 1.2);
  return (
    <Stage
      name="A9-12 · 两天后消失"
      source="GBAtemp 同期讨论 / V25 · 账号消失原因未知"
    >
      <Beat to={date} name="两天后的空缺">
        <Tag light>两天后 / Reddit</Tag>
        <div
          style={{
            ...pos,
            left: 100,
            top: 230,
            width: 1720,
            height: 360,
            overflow: "hidden",
          }}
        >
          <NumberDate style={{ left: 0, top: -turn * 400, fontSize: 270 }}>
            10.18
          </NumberDate>
          <NumberDate
            style={{
              left: 0,
              top: 400 - turn * 400,
              fontSize: 270,
              color: mint,
            }}
          >
            10.20
          </NumberDate>
        </div>
        <div style={{ ...pos, right: 160, top: 280 }}>
          <Logo
            name="reddit"
            width={420}
            style={{ height: 160, background: C.paper, padding: 20 }}
          />
        </div>
        <Line style={{ top: 680, fontSize: 100, opacity: turn }}>
          账号不见了
        </Line>
      </Beat>
      <Beat from={date} to={unknown} name="同期讨论与删除状态" paper>
        <Tag>10 月 20 日前后</Tag>
        <Archive name="account-title" x={100} y={230} width={1700} />
        <Line
          style={{
            top: 500,
            ...mono,
            fontSize: 215,
            color: red,
            clipPath: `inset(0 ${100 * (1 - lerp(t, date + 0.6, date + 1.3))}% 0 0)`,
          }}
        >
          [deleted]
        </Line>
        <div
          style={{
            ...pos,
            left: 110,
            top: 770,
            fontSize: 28,
            color: "#657980",
          }}
        >
          作者状态示意
        </div>
      </Beat>
      <Beat from={unknown} name="原因仍然未知">
        <div
          style={{
            ...pos,
            left: 0,
            top: 120,
            width: 1920,
            textAlign: "center",
            ...mono,
            fontSize: 360,
            lineHeight: 1,
            color: "#829fa33b",
          }}
        >
          ?
        </div>
        <Line
          style={{
            left: 0,
            width: 1920,
            top: 540,
            textAlign: "center",
            fontSize: 130,
          }}
        >
          外界无法判断
        </Line>
        <div
          style={{
            ...pos,
            left: 600,
            top: 750,
            width: 720,
            height: 4,
            background: mint,
            scale: `${lerp(t, unknown + 0.5, unknown + 1)} 1`,
          }}
        />
      </Beat>
    </Stage>
  );
};

export const SurvivingPosts = ({ timing }: Props) => {
  const t = useTime(),
    past = say(timing, 267),
    apology = past + 2.6,
    wukong = past + 3.8;
  const items = [
    [
      "PROPER",
      "v38/act3/nfo/proper-notes.png",
      "在什么环境下都能用",
      past,
      apology,
    ],
    ["CRACKFIX", "v38/evidence/apology.png", "抱歉", apology, wukong],
    ["Wuk0ng", "v38/act6/wukong-fields.png", "Wuk0ng", wukong, timing.duration],
  ] as const;
  return (
    <Stage
      name="A9-13 · 留下的帖子"
      source="V06、V07、V18 · 旧帖回看 / 原 NFO 局部"
    >
      <Beat to={past} name="不同帖子同一作者状态">
        <Tag light>采集时可见的作者状态</Tag>
        {["PROPER", "CRACKFIX", "Wuk0ng"].map((s, i) => (
          <div
            key={s}
            style={{
              ...pos,
              left: 150,
              top: 195 + i * 185,
              display: "flex",
              alignItems: "baseline",
              gap: 100,
              opacity: lerp(t, i * 0.55, i * 0.55 + 0.35),
            }}
          >
            <span
              style={{ ...mono, fontSize: 40, width: 480, color: "#839fa8" }}
            >
              {s}
            </span>
            <span style={{ ...mono, fontSize: 107, color: mint }}>
              [deleted]
            </span>
          </div>
        ))}
      </Beat>
      {items.map(([title, file, translation, from, to], i) => (
        <Beat key={file} from={from} to={to} name={`回看 ${title}`}>
          <Tag light>旧帖回看 / {title}</Tag>
          <OldSource
            file={file}
            style={{
              ...pos,
              left: 140,
              top: i === 1 ? 310 : 270,
              width: i === 1 ? 1500 : 1630,
              maxHeight: 430,
              objectFit: "contain",
              objectPosition: "left center",
              imageRendering: "pixelated",
            }}
          />
          <div
            style={{
              ...pos,
              left: 140,
              top: 745,
              fontSize: 56,
              color: C.yellow,
            }}
          >
            {translation}
          </div>
          <div
            style={{
              ...pos,
              right: 140,
              top: 760,
              ...mono,
              fontSize: 36,
              color: mint,
            }}
          >
            [deleted]
          </div>
        </Beat>
      ))}
    </Stage>
  );
};

export const RenameReport = ({ timing }: Props) => {
  const t = useTime(),
    history = say(timing, 268, "在一个"),
    name = say(timing, 268, "名字");
  return (
    <Stage
      name="A9-14 · 旧帖还在"
      source="Playground · 2026.10.20 / 据报道，旧帖保留、账号更名"
    >
      <Beat to={history} name="同期更名报道" paper>
        <Tag>同一时间 / Playground</Tag>
        <Archive name="playground-title" x={110} y={260} width={1700} />
      </Beat>
      <Beat from={history} to={name} name="原文里留下的历史" paper>
        <Tag>Playground 报道</Tag>
        <Archive name="playground-history" x={100} y={210} width={1720} />
        <Line style={{ top: 680, fontSize: 110 }}>旧帖，还在</Line>
        <Rule at={history + 0.7} top={815} />
      </Beat>
      <Beat from={name} name="名字变了">
        <Tag light>名字却改了</Tag>
        <Line style={{ top: 365, ...mono, fontSize: 200, color: mint }}>
          v0ices38
        </Line>
      </Beat>
    </Stage>
  );
};

export const OneLetter = ({ timing }: Props) => {
  const t = useTime(),
    flip = say(timing, 269) + 0.8,
    one = say(timing, 271),
    unknown = say(timing, 272),
    p = lerp(t, flip, flip + 0.55),
    detail = lerp(t, flip - 0.35, flip + 0.25) * (1 - lerp(t, one, one + 0.45)),
    u = lerp(t, unknown, unknown + 0.35);
  return (
    <Stage
      name="A9-15 · 一个字母"
      source="Playground · voices38 → v0ices38 / 现实身份仍未知"
    >
      <Tag light>{t < one ? "o → 0" : "只换了一个字母"}</Tag>
      <div
        data-act9-beat={
          t < flip
            ? "完整名字"
            : t < one
              ? "字母特写"
              : t < unknown
                ? "回到完整名字"
                : "身份仍未知"
        }
        style={{
          ...pos,
          left: 150,
          top: 330,
          display: "flex",
          ...mono,
          fontSize: 240,
          lineHeight: 1,
          transformOrigin: "225px 140px",
          transform: `translate(${detail * 580}px,${detail * 40 - u * 80}px) scale(${1 + detail * 1.6})`,
          opacity: 1 - u * 0.55,
        }}
      >
        <span>v</span>
        <div
          style={{
            width: 145,
            height: 280,
            perspective: 900,
            position: "relative",
          }}
        >
          <span
            style={{
              ...pos,
              left: 0,
              top: 0,
              backfaceVisibility: "hidden",
              transform: `rotateX(${p * 180}deg)`,
              color: C.yellow,
            }}
          >
            o
          </span>
          <span
            style={{
              ...pos,
              left: 0,
              top: 0,
              backfaceVisibility: "hidden",
              transform: `rotateX(${-180 + p * 180}deg)`,
              color: mint,
            }}
          >
            0
          </span>
        </div>
        <span>
          ices<span style={{ color: "#64838d" }}>38</span>
        </span>
      </div>
      <Line style={{ top: 690, fontSize: 105, opacity: u }}>
        名字背后，是谁？
      </Line>
    </Stage>
  );
};
