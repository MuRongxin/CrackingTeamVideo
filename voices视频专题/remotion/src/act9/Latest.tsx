import { Video } from "@remotion/media";
import type { ShotTiming } from "../timing";
import { publicAsset } from "../assets";
import { useTime, lerp } from "../components";
import { C } from "../style";
import { Stage, Logo } from "./Stage";
import { Beat, Tag, Line, pos, mono } from "./Motion";
import { Still } from "../act10/Stage";
import { say } from "./timing";
type Props = { timing: ShotTiming };
const Footage = ({ name }: { name: string }) => (
  <Video
    src={publicAsset(`v38/update/${name}.mp4`)}
    volume={0.045}
    style={{
      ...pos,
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
    }}
  />
);
export const GalacticRelease = ({ timing }: Props) => {
  const t = useTime(),
    record = say(timing, 298, "又出现"),
    back = record + 1.7;
  return (
    <Stage
      name="A9-18 · 银河赛车手"
      source="voices38 发行说明 · 2026-11-12 · 游戏画面：Fuse Games / Secret Mode"
    >
      <Footage name="racer-run" />
      <Beat to={record} name="赛车进入" clear>
        <div
          style={{
            ...pos,
            inset: 0,
            background: "linear-gradient(0deg,#071218e8,transparent 70%)",
          }}
        />
        <Tag light>2026.11.12 / 新的发行</Tag>
        <Line style={{ top: 650, fontSize: 98, textShadow: "0 3px 12px #000" }}>
          星球大战：银河赛车手
        </Line>
      </Beat>
      <Beat from={record} to={back} name="发行原件">
        <Tag light>同一份 NFO / 发行记录</Tag>
        <Still
          src="v38/update/racer-release.png"
          x={110}
          y={290}
          width={1700}
        />
        <Line style={{ top: 610, ...mono, fontSize: 145, color: C.yellow }}>
          12 / 11 / 2026
        </Line>
      </Beat>
      <Beat from={back} name="回到赛道" clear>
        <Tag light>STAR WARS: Galactic Racer</Tag>
        <div
          style={{
            ...pos,
            inset: 0,
            background: "linear-gradient(0deg,#071218e8,transparent 55%)",
          }}
        />
        <Line style={{ top: 710, fontSize: 85 }}>署名，仍是 voices38。</Line>
      </Beat>
    </Stage>
  );
};
export const NewPost = ({ timing }: Props) => {
  const t = useTime(),
    nfo = say(timing, 299, "而发行");
  return (
    <Stage
      name="A9-19 · 新发布帖上的署名"
      source="Reddit · r/CrackWatch 发布帖 · 2026-11-12"
    >
      <Beat to={nfo} name="原帖作者文字">
        <Tag light>新发布帖 / 原文摘录重排</Tag>
        <Logo
          name="reddit"
          width={250}
          style={{ ...pos, left: 120, top: 175, height: 120 }}
        />
        <div
          style={{
            ...pos,
            left: 110,
            top: 355,
            width: 1700,
            ...mono,
            fontSize: 51,
            lineHeight: 1.4,
          }}
        >
          STAR.WARS.Galactic.Racer-voices38
        </div>
        <div style={{ ...pos, left: 110, top: 520, ...mono, fontSize: 164 }}>
          u/v<span style={{ color: C.yellow }}>0</span>ices38
        </div>
        <div
          style={{
            ...pos,
            left: 410,
            top: 740,
            width: 100 * lerp(t, 0.5, 1.1),
            height: 5,
            background: C.yellow,
          }}
        />
      </Beat>
      <Beat from={nfo} name="发行NFO署名">
        <Tag light>而发行说明上</Tag>
        <Still
          src="v38/update/racer-signature.png"
          x={120}
          y={200}
          width={1460}
        />
        <Line style={{ top: 735, fontSize: 73, color: C.yellow }}>
          还是原来的署名。
        </Line>
      </Beat>
    </Stage>
  );
};
export const RacingKind = ({ timing }: Props) => {
  const t = useTime(),
    joke = say(timing, 300, "一串"),
    back = timing.duration - 0.8;
  return (
    <Stage
      name="A9-20 · 引擎声与玩笑"
      source="voices38 发行说明 · 游戏画面：Fuse Games / Secret Mode"
    >
      <Footage name="racer-kind-run" />
      <Beat to={joke} name="KIND接到赛车" clear>
        <Tag light>KIND / 还是熟悉的玩笑</Tag>
      </Beat>
      <Beat from={joke} to={back} name="原字段落定" clear>
        <div
          style={{
            ...pos,
            left: 0,
            right: 0,
            top: 230,
            height: 390,
            background: "#071218ef",
          }}
        />
        <Still src="v38/update/racer-kind.png" x={110} y={295} width={1700} />
        <Line style={{ top: 425, ...mono, fontSize: 118, color: C.yellow }}>
          Vroom-Vroom
        </Line>
      </Beat>
      <Beat from={back} name="出弯收束" clear>
        <div
          style={{
            ...pos,
            inset: 0,
            background: `rgba(0,0,0,${0.5 * lerp(t, back, timing.duration)})`,
          }}
        />
      </Beat>
    </Stage>
  );
};
