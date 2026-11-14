import { Sequence, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import type { ShotTiming } from "../timing";
import { publicAsset } from "../assets";
import { useTime, lerp } from "../components";
import { C } from "../style";
import { GroupMark } from "../act6/Picture";
import { Logo } from "../act9/Stage";
import { Stage, Cut, Still, Words, Label, pos, mono } from "./Stage";
import { Reveal, InkLine, Kinetic, Question, cover, FilmShade } from "./Motion";
import { say } from "./timing";
type Props = { timing: ShotTiming };
export const Unknown = ({ timing }: Props) => {
  const t = useTime(),
    identity = say(timing, 301, "voices38"),
    platform = say(timing, 302),
    result = say(timing, 302, "也没有");
  return (
    <Stage
      name="A10-01 · 仍未确认"
      source="公开资料截至 2026-11-13"
    >
      <Cut to={identity} name="从期限走到资料截止日">
        <Label>尾声 / 公开记录的边界</Label>
        <Still
          src="v38/act9/grant.png"
          x={1120}
          y={170}
          width={720}
          style={{ opacity: 0.32 }}
        />
        <div
          style={{
            ...pos,
            left: 105,
            top: 225,
            width: 1030,
            height: 230,
            overflow: "hidden",
            ...mono,
            fontSize: 155,
            lineHeight: "230px",
          }}
        >
          <div style={{ translate: `0 ${-230 * lerp(t, 0.15, 0.85)}px` }}>
            2026.11.03
            <br />
            2026.11.13
          </div>
        </div>
        <InkLine at={0.25} x={110} y={530} width={1580} color="#6d999f" />
        <div
          style={{
            ...pos,
            left: 110 + 1460 * lerp(t, 0.25, 1.6),
            top: 520,
            width: 25,
            height: 25,
            borderRadius: "50%",
            border: "3px solid #83c8c6",
            background: "#071218",
          }}
        />
        <Words style={{ top: 615, fontSize: 55, color: "#83c8c6" }}>
          11.03 提交期限
        </Words>
        <Kinetic text="11.13 资料截止" at={0.9} x={1210} y={615} size={50} />
      </Cut>
      <Cut from={identity} to={platform} name="署名与空白答案">
        <Label>公开资料中 / 仍只有这个署名</Label>
        <Reveal at={identity} style={{ mixBlendMode: "screen" }}>
          <GroupMark
            name="voices38"
            width={1120}
            style={{ ...pos, left: 120, top: 275 }}
          />
        </Reveal>
        <Question at={identity + 0.7} x={1430} y={230} size={260} />
        <Kinetic text="身份仍未确认" at={identity + 1.35} y={665} size={103} />
        <InkLine at={identity + 2} x={110} y={820} width={1110} />
      </Cut>
      <Cut from={platform} name="平台与尚未公开的结果">
        <Label>平台交了什么？ / 公开资料边界示意</Label>
        {(["discord", "reddit", "valve"] as const).map((name, i) => (
          <div key={name}>
            <Logo
              name={name}
              width={270}
              style={{
                ...pos,
                left: 115,
                top: 235 + i * 175,
                height: 100,
                opacity: lerp(
                  t,
                  platform + i * 0.18,
                  platform + i * 0.18 + 0.25,
                ),
                filter: name === "discord" ? "invert(1)" : undefined,
              }}
            />
            <InkLine
              at={platform + i * 0.22 + 0.35}
              x={460}
              y={285 + i * 175}
              width={760 - i * 105}
              color="#4a747b"
              height={3}
            />
            <div
              style={{
                ...pos,
                left: 1220 - i * 105,
                top: 273 + i * 175,
                width: 24,
                height: 24,
                border: "3px solid #77999e",
                borderRadius: "50%",
                opacity: lerp(
                  t,
                  platform + 0.7 + i * 0.22,
                  platform + 1 + i * 0.22,
                ),
              }}
            />
          </div>
        ))}
        <Question at={result - 0.55} x={1480} y={210} size={220} />
        <Kinetic text="公开结果未确认。" at={result} y={740} size={85} />
      </Cut>
    </Stage>
  );
};
export const Perspectives = ({ timing }: Props) => {
  const t = useTime(),
    players = say(timing, 282),
    thanks = say(timing, 283),
    harm = say(timing, 281, "伤害"),
    { fps } = useVideoConfig();
  return (
    <Stage
      name="A10-02 · 两种目光"
      source={
        t < players
          ? "Denuvo 起诉书 · 原告主张"
          : "Reddit 玩家留言节选 · 游戏画面：EA"
      }
    >
      <Cut to={players} name="原告的二十六项主张" paper>
        <Label style={{ color: C.red }}>Denuvo / 原告诉讼主张</Label>
        <Logo
          name="denuvo"
          width={350}
          style={{ ...pos, left: 110, top: 210, height: 140 }}
        />
        <Reveal at={0.15}>
          <Still src="v38/act10/introduction.png" y={435} width={1700} />
        </Reveal>
        <div
          style={{
            ...pos,
            left: 1210,
            top: 135,
            ...mono,
            fontSize: 220,
            color: C.red,
            clipPath: `inset(0 0 ${100 * (1 - lerp(t, 0.15, 0.65))}% 0)`,
          }}
        >
          26
        </div>
        {Array.from({ length: 26 }, (_, i) => (
          <div
            key={i}
            style={{
              ...pos,
              left: 113 + i * 63,
              top: 700,
              height: 14,
              width: 43,
              background: t >= harm ? C.red : "#759599",
              opacity: lerp(t, 0.25 + i * 0.045, 0.45 + i * 0.045),
            }}
          />
        ))}
        <Kinetic
          text={t < harm ? "绕过游戏保护" : "利益受到损害"}
          at={t < harm ? 0.35 : harm}
          y={752}
          size={65}
          color={C.ink}
        />
      </Cut>
      <Sequence
        name="玩家眼中的游戏"
        from={Math.round(players * fps)}
        durationInFrames={Math.ceil((timing.duration - players) * fps)}
      >
        <Video
          src={publicAsset("v38/act10/dead-players.mp4")}
          muted
          style={cover}
        />
      </Sequence>
      <Cut from={players} name="玩家的目光" clear>
        <FilmShade />
        <Label>而在一些玩家看来 / 死亡空间</Label>
        <div style={{ opacity: 1 - lerp(t, thanks - 0.25, thanks) }}>
          <Kinetic text="让更多人" at={players + 0.15} y={510} size={100} />
          <Kinetic
            text="玩到这些游戏"
            at={players + 0.7}
            y={645}
            size={100}
            color={C.yellow}
          />
        </div>
        <Reveal at={thanks}>
          <div
            style={{
              ...pos,
              left: 110,
              top: 495,
              ...mono,
              fontSize: 43,
              lineHeight: 1.45,
              color: "#b5e2df",
            }}
          >
            “I hope you continue preserving
            <br />
            SEGA video games …”
          </div>
          <Kinetic
            text="有人把它称作“保存”。"
            at={thanks + 0.15}
            y={695}
            size={63}
          />
        </Reveal>
      </Cut>
    </Stage>
  );
};
export const Ownership = ({ timing }: Props) => {
  const t = useTime(),
    support = say(timing, 284, "支持"),
    slogan = say(timing, 285),
    english = say(timing, 285, "We will"),
    translation = say(timing, 286),
    { fps } = useVideoConfig();
  return (
    <Stage
      name="A10-03 · 所有权"
      source="voices38 发行说明 · 游戏画面：游戏科学"
    >
      <Cut to={support} name="从署名读到新说明">
        <Label>诉讼期间 / NFO 的改动</Label>
        <Reveal at={0} seconds={0.4} style={{ mixBlendMode: "screen" }}>
          <GroupMark
            name="voices38"
            width={1190}
            style={{ ...pos, left: 110, top: 200 }}
          />
        </Reveal>
        <Reveal at={1.3} vertical>
          <Still name="ownership" x={110} y={560} width={1690} />
        </Reveal>
        <InkLine at={2.1} x={110} y={655} width={1570} />
        <Kinetic text="捐款说明，改了。" at={2.4} y={710} size={72} />
      </Cut>
      <Sequence
        name="所有权与作品画面"
        from={Math.round(support * fps)}
        durationInFrames={Math.ceil((slogan - support) * fps)}
      >
        <Video
          src={publicAsset("v38/act10-motion/ownership-wukong.mp4")}
          muted
          style={cover}
        />
      </Sequence>
      <Cut from={support} to={slogan} name="支持以后的破解与所有权" clear>
        <FilmShade side />
        <Label>黑神话：悟空 / 原文固定阅读</Label>
        <Still
          src="v38/update/racer-ownership.png"
          x={110}
          y={190}
          width={1690}
        />
        <Kinetic text="支持以后的破解" at={support} y={520} size={96} />
        <Kinetic
          text="也支持你的所有权"
          at={support + 1.05}
          y={660}
          size={96}
          color={C.yellow}
        />
      </Cut>
      <Cut from={slogan} name="口号原文与译述">
        <Label>同一份 NFO / 原文与译述</Label>
        <Still name="own-everything" x={110} y={185} width={1510} />
        <Kinetic
          text="We will own everything"
          at={english}
          y={370}
          size={88}
          step={0.025}
        />
        <Kinetic
          text="and be happy."
          at={english + 0.45}
          y={500}
          size={88}
          step={0.025}
        />
        <InkLine at={english + 0.65} x={110} y={635} width={1650} />
        <Kinetic
          text="我们将拥有一切，并且很快乐。"
          at={translation}
          y={710}
          size={67}
          step={0.035}
          color={C.yellow}
        />
      </Cut>
    </Stage>
  );
};
export const Reversal = ({ timing }: Props) => {
  const t = useTime(),
    quote = say(timing, 287, "你将"),
    reverse = say(timing, 287, "反过来"),
    p = lerp(t, reverse, reverse + 0.42);
  return (
    <Stage name="A10-04 · 反过来的一句话" source="">
      <Label>一句话的反写</Label>
      <div
        style={{
          ...pos,
          left: 110,
          top: 250,
          fontSize: 102,
          color: "#91a7ac",
          translate: `0 ${-45 * p}px`,
          opacity: 1 - p,
        }}
      >
        你将
      </div>
      <div
        style={{
          ...pos,
          left: 110,
          top: 250,
          fontSize: 102,
          color: C.white,
          translate: `0 ${45 * (1 - p)}px`,
          opacity: p,
        }}
      >
        我们将
      </div>
      <div
        style={{
          ...pos,
          left: 110,
          top: 390,
          width: 1650,
          height: 225,
          overflow: "hidden",
          fontSize: 190,
          lineHeight: 1.15,
        }}
      >
        <div
          style={{
            ...pos,
            inset: 0,
            color: "#b3c2c2",
            translate: `0 ${-225 * p}px`,
            clipPath: `inset(0 ${100 * (1 - lerp(t, quote, quote + 0.45))}% 0 0)`,
          }}
        >
          一无所有
        </div>
        <div
          style={{
            ...pos,
            inset: 0,
            color: C.yellow,
            translate: `0 ${225 * (1 - p)}px`,
          }}
        >
          拥有一切
        </div>
      </div>
      <InkLine
        at={quote + 0.65}
        x={110}
        y={630}
        width={1550}
        color="#647f84"
        height={3}
      />
      <Kinetic text="并且很快乐。" at={quote + 0.4} y={715} size={83} />
      <div
        style={{
          ...pos,
          left: 112,
          top: 620,
          width: 800 * lerp(t, reverse + 0.4, reverse + 1),
          height: 7,
          background: C.yellow,
        }}
      />
    </Stage>
  );
};
