import { Sequence, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import type { ShotTiming } from "../timing";
import { publicAsset } from "../assets";
import { useTime, lerp } from "../components";
import { C } from "../style";
import { GroupMark } from "../act6/Picture";
import { Logo } from "../act9/Stage";
import { Stage, Cut, Still, Words, Label, pos, mono } from "./Stage";
import { say } from "./timing";
type Props = { timing: ShotTiming };
export const Unknown = ({ timing }: Props) => {
  const t = useTime(),
    identity = say(timing, 279, "voices38"),
    platform = say(timing, 280);
  return (
    <Stage
      name="A10-01 · 仍未确认"
      source="资料截止：2026年11月初 · DOC26 / V24 / V29；期限不等于交付结果"
    >
      <Cut to={identity} name="截止日期">
        <Label>尾声 / 2026.11</Label>
        <Still
          src="v38/act9/grant.png"
          x={1050}
          y={190}
          width={900}
          style={{ opacity: 0.23 }}
        />
        <Words style={{ top: 230, ...mono, fontSize: 218 }}>2026.11</Words>
        <div
          style={{
            ...pos,
            left: 120,
            top: 580,
            width: 1400,
            height: 3,
            background: "#6d888a",
          }}
        />
        <div
          style={{
            ...pos,
            left: 290,
            top: 568,
            width: 26,
            height: 26,
            border: "3px solid #83c8c6",
            borderRadius: "50%",
            background: "#071218",
          }}
        />
        <Words style={{ top: 640, fontSize: 58, color: "#83c8c6" }}>
          11.03 / 资料提交期限
        </Words>
      </Cut>
      <Cut from={identity} to={platform} name="身份仍未知">
        <Label>公开资料中</Label>
        <GroupMark
          name="voices38"
          width={1100}
          style={{ ...pos, left: 100, top: 230 }}
        />
        <Words style={{ top: 650 }}>身份仍未确认</Words>
      </Cut>
      <Cut from={platform} name="平台结果未公开">
        <Label>平台交了什么？</Label>
        {(["discord", "reddit", "valve"] as const).map((name, i) => (
          <Logo
            key={name}
            name={name}
            width={280}
            style={{
              ...pos,
              left: 240 + i * 550,
              top: 260,
              height: 150,
              opacity: lerp(t, platform + i * 0.18, platform + i * 0.18 + 0.3),
              filter: name === "discord" ? "invert(1)" : undefined,
            }}
          />
        ))}
        <div
          style={{
            ...pos,
            left: 350,
            top: 510,
            width: 1200,
            height: 3,
            background: "#577578",
            clipPath: `inset(0 ${100 * (1 - lerp(t, platform + 0.2, platform + 0.9))}% 0 0)`,
          }}
        />
        <Words style={{ top: 640, fontSize: 100 }}>外界也不知道。</Words>
      </Cut>
    </Stage>
  );
};
export const Perspectives = ({ timing }: Props) => {
  const t = useTime(),
    players = say(timing, 282),
    thanks = say(timing, 283),
    { fps } = useVideoConfig();
  return (
    <Stage
      name="A10-02 · 两种目光"
      source={
        t < players
          ? "原告诉讼主张 / COURT_COMPLAINT"
          : "部分玩家留言 V27 · 原文节选重排；背景为 EA 官方游戏画面"
      }
    >
      <Cut to={players} name="原告主张" paper>
        <Label style={{ color: C.red }}>Denuvo / 原告诉讼主张</Label>
        <Logo
          name="denuvo"
          width={330}
          style={{ ...pos, left: 110, top: 200, height: 140 }}
        />
        <Words
          style={{ left: 1250, top: 170, ...mono, fontSize: 210, color: C.red }}
        >
          26
        </Words>
        <Still src="v38/act10/introduction.png" y={420} width={1700} />
        <Words style={{ top: 730, fontSize: 70 }}>绕过保护 · 利益受损</Words>
      </Cut>
      <Sequence
        from={Math.round(players * fps)}
        durationInFrames={Math.ceil((timing.duration - players) * fps)}
      >
        <Video
          src={publicAsset("v38/act10/dead-players.mp4")}
          muted
          style={{
            ...pos,
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Sequence>
      <Cut from={players} name="玩家目光" clear>
        <div
          style={{
            ...pos,
            inset: 0,
            background:
              "linear-gradient(90deg,#071218f2,transparent 95%),linear-gradient(0deg,#071218,transparent 55%)",
          }}
        />
        <Label>而在一些玩家看来</Label>
        <Words style={{ top: 250, fontSize: 105 }}>
          让更多人
          <br />
          玩到这些游戏
        </Words>
        <div
          style={{
            ...pos,
            left: 120,
            top: 595,
            width: 1270,
            opacity: lerp(t, thanks, thanks + 0.25),
          }}
        >
          <div
            style={{ ...mono, fontSize: 37, lineHeight: 1.4, color: "#a4d6d4" }}
          >
            “I hope you continue preserving
            <br />
            SEGA video games …”
          </div>
          <div style={{ fontSize: 39, marginTop: 30 }}>
            有人把它称作“保存”。
          </div>
        </div>
      </Cut>
    </Stage>
  );
};
export const Ownership = ({ timing }: Props) => {
  const t = useTime(),
    support = say(timing, 284, "支持"),
    slogan = say(timing, 285),
    translation = say(timing, 286);
  return (
    <Stage
      name="A10-03 · 所有权"
      source="voices38 自述 / V27 原 NFO · 诉讼期间"
    >
      <Cut to={slogan} name="所有权声明">
        <Label>诉讼期间 / NFO 的改动</Label>
        <GroupMark
          name="voices38"
          width={1000}
          style={{ ...pos, left: 110, top: 190 }}
        />
        <Still name="ownership" y={490} width={1700} />
        <Words
          style={{
            top: 600,
            fontSize: 90,
            opacity: lerp(t, support, support + 0.25),
          }}
        >
          也支持
          <br />
          <span style={{ color: C.yellow }}>你的所有权</span>
        </Words>
        <div
          style={{
            ...pos,
            left: 110,
            top: 845,
            height: 5,
            width: 1000 * lerp(t, support + 0.3, support + 1.1),
            background: C.yellow,
          }}
        />
      </Cut>
      <Cut from={slogan} name="口号原文">
        <Label>同一份 NFO / 原文</Label>
        <Still name="own-everything" x={120} y={210} width={1500} />
        <Words style={{ top: 365, ...mono, fontSize: 91 }}>
          We will own everything
          <br />
          and be happy.
        </Words>
        <Words
          style={{
            top: 690,
            fontSize: 70,
            color: C.yellow,
            opacity: lerp(t, translation, translation + 0.3),
          }}
        >
          我们将拥有一切，并且很快乐。
        </Words>
      </Cut>
    </Stage>
  );
};
export const Reversal = ({ timing }: Props) => {
  const t = useTime(),
    reverse = say(timing, 287, "反过来"),
    p = lerp(t, reverse, reverse + 0.38);
  return (
    <Stage name="A10-04 · 反过来的一句话" source="旁白联想 / 编辑文字对照">
      <Label>一句话的反写</Label>
      <Words style={{ top: 250, fontSize: 65, color: "#899ea0" }}>
        你将一无所有，并且很快乐。
      </Words>
      <div
        style={{
          ...pos,
          left: 110,
          top: 430,
          width: 1670,
          height: 2,
          background: "#40575d",
        }}
      />
      <div style={{ ...pos, left: 110, top: 500, fontSize: 124 }}>
        我们将
        <span
          style={{
            display: "inline-block",
            position: "relative",
            width: 550,
            height: 155,
            verticalAlign: "top",
          }}
        >
          <span
            style={{
              ...pos,
              left: 0,
              top: -p * 100,
              opacity: 1 - p,
              color: "#81979c",
            }}
          >
            一无所有
          </span>
          <span
            style={{
              ...pos,
              left: 0,
              top: (1 - p) * 110,
              opacity: p,
              color: C.yellow,
            }}
          >
            拥有一切
          </span>
        </span>
      </div>
      <Words style={{ top: 740, fontSize: 72 }}>并且很快乐。</Words>
    </Stage>
  );
};
