import { useTime, lerp } from "../components";
import { C } from "../style";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
import { Stage, Film, Shade, Logo } from "./Stage";
import { Beat, Tag, Line, Archive, pos, mono, red, mint } from "./Motion";
type Props = { timing: ShotTiming };

export const Onimusha = ({ timing }: Props) => {
  const t = useTime(),
    next = say(timing, 274),
    kind = say(timing, 275),
    meaning = say(timing, 275, "大意");
  return (
    <Stage
      name="A9-16 · 鬼武者与修复"
      source="发行记录：xREL / iXBT.games · 游戏画面：CAPCOM"
    >
      <Film name="onimusha-release" />
      <Beat to={next} name="作品与发行" clear>
        <Tag light>10.31 / 鬼武者：剑之道</Tag>
        <div
          style={{
            ...pos,
            left: 0,
            right: 0,
            top: 590,
            bottom: 0,
            background: "linear-gradient(0deg,#08131be8,transparent)",
          }}
        />
        <Archive
          name="release-onimusha"
          x={110}
          y={650}
          width={1470}
          style={{
            maxHeight: 190,
            objectFit: "contain",
            objectPosition: "left center",
          }}
        />
      </Beat>
      <Beat from={next} to={kind} name="第二天修复" clear>
        <Tag light>11.01 / 第二天</Tag>
        <Line
          style={{
            top: 210,
            fontSize: 150,
            color: C.yellow,
            textShadow: "0 3px 12px #000",
          }}
        >
          CRACKFIX
        </Line>
        <Archive
          name="release-onimusha-fix"
          x={110}
          y={650}
          width={1470}
          style={{
            maxHeight: 190,
            objectFit: "contain",
            objectPosition: "left center",
          }}
        />
      </Beat>
      <Beat from={kind} name="说明里的MumboJumbo" clear>
        <div
          style={{
            ...pos,
            inset: 0,
            background: "linear-gradient(90deg,#08131be8,transparent 85%)",
          }}
        />
        <Tag light>iXBT.games 转述其说明</Tag>
        <Logo
          name="capcom"
          width={220}
          style={{ ...pos, right: 100, top: 60, height: 100 }}
        />
        <Line style={{ top: 230, ...mono, fontSize: 130, color: C.yellow }}>
          Mumbo-Jumbo
        </Line>
        <Archive name="mumbo-report" x={110} y={505} width={1700} />
        <Line
          style={{
            top: 740,
            fontSize: 64,
            opacity: lerp(t, meaning, meaning + 0.25),
          }}
        >
          “故弄玄虚的把戏”
        </Line>
      </Beat>
    </Stage>
  );
};

export const RepairReport = ({ timing }: Props) => {
  const t = useTime(),
    paid = say(timing, 277),
    unrelated = say(timing, 277, "说明"),
    point = say(timing, 278);
  return (
    <Stage
      name="A9-17 · 修复的是游戏"
      source="iXBT.games · 《鬼武者》修复报道 · 游戏画面：CAPCOM"
    >
      <Film name="onimusha-fix" />
      <Beat to={paid} name="修复启动崩溃的原文" clear>
        <div
          style={{
            ...pos,
            inset: 0,
            background: "linear-gradient(90deg,#08131be8,transparent)",
          }}
        />
        <Tag light>那份修复 / iXBT.games 报道</Tag>
        <Line style={{ top: 250, fontSize: 112 }}>
          开新档时
          <br />
          <span style={{ color: C.yellow }}>启动崩溃</span>
        </Line>
        <Archive name="fix-report" x={110} y={690} width={1680} />
      </Beat>
      <Beat from={paid} to={point} name="正版玩家也报告问题" paper>
        <Tag>报道所引 Steam 玩家反馈</Tag>
        <Archive name="licensed-report" x={100} y={260} width={1740} />
        <Line style={{ top: 590, fontSize: 115 }}>正版玩家，也遇到了</Line>
        <div
          style={{
            ...pos,
            left: 110,
            top: 770,
            fontSize: 47,
            color: red,
            opacity: lerp(t, unrelated, unrelated + 0.35),
          }}
        >
          这一问题并非破解所独有
        </div>
      </Beat>
      <Beat from={point} name="让游戏画面收尾" clear>
        <div
          style={{
            ...pos,
            inset: 0,
            background: "linear-gradient(0deg,#08131bc9,transparent 60%)",
          }}
        />
        <Tag light>鬼武者：剑之道</Tag>
        <Line style={{ top: 730, fontSize: 74, textShadow: "0 3px 10px #000" }}>
          他替 Capcom 修了一个严重 bug
        </Line>
      </Beat>
    </Stage>
  );
};
