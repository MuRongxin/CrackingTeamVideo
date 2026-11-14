import { Sequence, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import type { ShotTiming } from "../timing";
import { publicAsset } from "../assets";
import { useTime, lerp } from "../components";
import { GroupMark } from "../act6/Picture";
import { Logo } from "../act9/Stage";
import { C } from "../style";
import { Stage, Cut, Still, Words, Label, pos, mono } from "./Stage";
import { Reveal, InkLine, Kinetic, Question, FilmShade, cover } from "./Motion";
import { say } from "./timing";
type Props = { timing: ShotTiming };
export const Signature = ({ timing }: Props) => {
  const t = useTime(),
    joke = say(timing, 289),
    sorry = say(timing, 289, "道歉"),
    ram = say(timing, 290),
    debate = say(timing, 290, "也会"),
    way = say(timing, 291),
    work = say(timing, 291, "也看到"),
    { fps } = useVideoConfig();
  return (
    <Stage
      name="A10-05 · 认识这个署名"
      source="voices38 发行说明与公开回应 · 游戏画面：EA"
    >
      <Cut to={joke} name="在公开材料里形成的署名">
        <Label>在这些公开文字里</Label>
        <Reveal at={0} seconds={0.55} style={{ mixBlendMode: "screen" }}>
          <GroupMark
            name="voices38"
            width={1420}
            style={{ ...pos, left: 120, top: 300 }}
          />
        </Reveal>
        <InkLine at={0.55} x={110} y={695} width={1500} />
        <Kinetic text="一个极具风格的署名" at={0.85} y={760} size={57} />
      </Cut>
      <Cut from={joke} to={sorry} name="KIND笑话">
        <Label>回看 / KIND</Label>
        <Reveal at={joke} seconds={0.22}>
          <Still src="v38/act5/mgsv-fields.png" x={130} y={235} width={1660} />
        </Reveal>
        <Kinetic
          text="会讲笑话"
          at={joke + 0.15}
          y={715}
          size={101}
          color={C.yellow}
        />
      </Cut>
      <Cut from={sorry} to={ram} name="漏掉之后的道歉">
        <Label>回看 / 漏掉之后</Label>
        <Reveal at={sorry} seconds={0.22}>
          <Still src="v38/evidence/apology.png" x={120} y={335} width={1520} />
        </Reveal>
        <Kinetic text="也会道歉。" at={sorry + 0.15} y={645} size={102} />
        <InkLine at={sorry + 0.3} x={120} y={810} width={1080} />
      </Cut>
      <Cut from={ram} to={debate} name="硬件筹备">
        <Label>回看 / 硬件筹备</Label>
        <Still
          src="v38/evidence/hardware-first-person.png"
          x={120}
          y={250}
          width={1480}
        />
        <Kinetic text="内存太贵。" at={ram + 0.05} y={560} size={150} />
        <InkLine at={ram + 0.2} x={120} y={790} width={1320} color={C.red} />
      </Cut>
      <Cut from={debate} to={way} name="技术争论">
        <Label>回看 / 什么才算破解</Label>
        <div style={{ ...pos, left: 110, top: 210, ...mono, fontSize: 122 }}>
          <span
            style={{
              display: "inline-block",
              translate: `${-160 * (1 - lerp(t, debate, debate + 0.3))}px 0`,
            }}
          >
            Crack
          </span>
          <span style={{ color: "#68898d", margin: "0 75px" }}>/</span>
          <span
            style={{
              display: "inline-block",
              color: C.yellow,
              translate: `${160 * (1 - lerp(t, debate, debate + 0.3))}px 0`,
            }}
          >
            Bypass
          </span>
        </div>
        <Reveal at={debate + 0.25} vertical seconds={0.4}>
          <Still
            src="v38/act7/kirigiri-technical.png"
            x={110}
            y={445}
            width={1700}
          />
        </Reveal>
      </Cut>
      <Sequence
        name="从作品回到署名"
        from={Math.round(way * fps)}
        durationInFrames={Math.ceil((timing.duration - way) * fps)}
      >
        <Video
          src={publicAsset("v38/act10-motion/signature-dead.mp4")}
          muted
          style={cover}
        />
      </Sequence>
      <Cut from={way} name="从材料认识工作的方式" clear>
        <FilmShade />
        <Label>死亡空间 / 从材料认识这个署名</Label>
        <Reveal at={way + 0.2} style={{ mixBlendMode: "screen" }}>
          <GroupMark
            name="voices38"
            width={890}
            style={{ ...pos, left: 110, top: 215 }}
          />
        </Reveal>
        <Kinetic text="一个署名，" at={way + 0.4} y={565} size={97} />
        <Kinetic
          text="一套工作的方式。"
          at={work}
          y={700}
          size={97}
          color={C.yellow}
        />
      </Cut>
    </Stage>
  );
};
export const FirstAttemptAgain = () => {
  const t = useTime();
  return (
    <Stage
      name="A10-06 · 一年前"
      source="voices38 首次破解声明 · iXBT.games · 2025-10-15"
    >
      <Label>第一次尝试</Label>
      <div
        style={{
          ...pos,
          right: 110,
          top: 190,
          width: 630,
          height: 145,
          overflow: "hidden",
          ...mono,
          fontSize: 105,
          color: "#76999f",
          lineHeight: "145px",
        }}
      >
        <div style={{ translate: `0 ${-145 * lerp(t, 0.05, 0.7)}px` }}>
          2026.11
          <br />
          2025.10
        </div>
      </div>
      <Reveal at={0.25} seconds={0.6}>
        <div
          style={{
            ...pos,
            left: 0,
            right: 0,
            top: 425,
            textAlign: "center",
            ...mono,
            fontSize: 72,
            color: C.yellow,
          }}
        >
          Here's my first attempt
          <span
            style={{
              display: "inline-block",
              width: 34,
              height: 65,
              background: C.yellow,
              marginLeft: 18,
              verticalAlign: "middle",
              opacity: t % 1 < 0.62 ? 1 : 0,
            }}
          />
        </div>
      </Reveal>
      <Kinetic text="这是我的第一次尝试" at={0.7} x={725} y={600} size={52} />
      <InkLine
        at={1.4}
        x={725}
        y={730}
        width={470}
        color="#557b81"
        height={3}
      />
    </Stage>
  );
};
export const Traces = ({ timing }: Props) => {
  const t = useTime(),
    post = say(timing, 303, "新的署名"),
    traces = say(timing, 304),
    unknown = say(timing, 304, "但身份");
  return (
    <Stage
      name="A10-07 · 痕迹还在"
      source="GBAtemp / Playground 报道 · voices38 新发布记录"
    >
      <Cut to={post} name="旧账号的公开记录">
        <Label>10 月 / 旧账号记录</Label>
        <Still src="v38/act9/account-title.png" x={100} y={205} width={1700} />
        <Reveal at={0.25} seconds={0.5}>
          <Words style={{ top: 470, ...mono, fontSize: 165, color: "#aab9b7" }}>
            [deleted]
          </Words>
        </Reveal>
        <InkLine
          at={0.7}
          x={110}
          y={735}
          width={1250}
          color="#587d82"
          height={3}
        />
      </Cut>
      <Cut from={post} to={traces} name="新发布帖的作者">
        <Label>11 月 / 新发布帖 · 原文摘录重排</Label>
        <Logo
          name="reddit"
          width={250}
          style={{ ...pos, left: 110, top: 210, height: 100 }}
        />
        <Reveal at={post} seconds={0.35}>
          <Words style={{ top: 410, ...mono, fontSize: 164 }}>
            u/v<span style={{ color: C.yellow }}>0</span>ices38
          </Words>
        </Reveal>
        <InkLine at={post + 0.45} x={408} y={660} width={100} />
        <Kinetic
          text="2026.11.12"
          at={post + 0.55}
          y={735}
          size={55}
          color="#85b6bc"
        />
      </Cut>
      <Cut from={traces} name="公开文字仍然留下">
        <Label>历史回看 / 留下来的文字</Label>
        <Reveal at={traces} seconds={0.35}>
          <Still
            src="v38/evidence/proper-claim.png"
            x={110}
            y={200}
            width={1330}
            style={{
              maxHeight: 230,
              objectFit: "contain",
              objectPosition: "left top",
            }}
          />
        </Reveal>
        <Reveal at={traces + 0.65} vertical seconds={0.35}>
          <Still name="ownership" x={110} y={485} width={1310} />
        </Reveal>
        <InkLine
          at={traces + 1}
          x={110}
          y={600}
          width={1310}
          color="#4c7b81"
          height={3}
        />
        <Question at={unknown - 0.3} x={1510} y={225} size={220} />
        <Kinetic
          text="身份，依然没有答案。"
          at={unknown}
          y={710}
          size={83}
          color={C.yellow}
        />
      </Cut>
    </Stage>
  );
};
export const PersonOrGroup = () => {
  const t = useTime();
  return (
    <Stage
      name="A10-08 · 个人还是团体"
      source="Denuvo 起诉书 · “个人或实体”原文"
      paper
    >
      <Label style={{ color: C.red }}>故事讲到这里</Label>
      <Reveal at={0.05} seconds={0.4}>
        <Still name="entity-line" x={110} y={215} width={1690} />
      </Reveal>
      <svg
        width="1920"
        height="700"
        style={{ ...pos, left: 0, top: 220 }}
        viewBox="0 0 1920 700"
      >
        {[
          "M960 110 L960 220 L490 220 L490 350",
          "M960 110 L960 220 L1440 220 L1440 350",
        ].map((d, i) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke={i ? "#90a2a9" : "#576f82"}
            strokeWidth="4"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - lerp(t, 0.7 + i * 0.15, 1.65 + i * 0.15)}
          />
        ))}
        {[490, 1390, 1440, 1490].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={i === 0 ? 380 : 380 + (i === 2 ? -18 : 0)}
            r={i === 0 ? 32 : 25}
            fill="none"
            stroke={C.ink}
            strokeWidth="4"
            opacity={lerp(t, 1.35 + i * 0.1, 1.7 + i * 0.1)}
          />
        ))}
      </svg>
      <Kinetic text="个人" at={1.65} x={370} y={670} size={95} color={C.ink} />
      <Kinetic text="团体" at={1.85} x={1320} y={670} size={95} color={C.ink} />
      <Question at={2.4} x={850} y={440} size={150} color={C.red} />
      <div
        style={{
          ...pos,
          right: 0,
          top: 0,
          bottom: 0,
          width: 1920 * lerp(t, 4.75, 5.1),
          background: "#e9e5da",
          opacity: 0.75,
        }}
      />
    </Stage>
  );
};
export const FinalName = ({ timing }: Props) => {
  const { fps } = useVideoConfig();
  const t = useTime(),
    name = say(timing, 297, "VOICES38"),
    end = timing.voices[0].start + timing.voices[0].duration,
    fade = lerp(t, end + 0.95, timing.duration - 1 / fps);
  return (
    <div style={{ ...pos, inset: 0, background: "#000" }}>
      <div style={{ ...pos, inset: 0, opacity: 1 - fade }}>
        <Stage
          name="A10-09 · VOICES38"
          source="Denuvo 起诉书 · 2026-09-14"
          paper
        >
          <Cut to={name} name="法院当事人栏" paper>
            <Reveal at={0} seconds={0.35}>
              <Still name="case-ending" x={160} y={185} width={1600} />
            </Reveal>
            <InkLine
              at={0.65}
              x={220}
              y={740}
              width={1470}
              color="#7a878c"
              height={2}
            />
          </Cut>
          <Cut from={name} name="最后的署名" paper>
            <Still name="name-ending" x={220} y={340} width={1480} />
            <div
              style={{
                ...pos,
                left: 220,
                top: 700,
                ...mono,
                fontSize: 27,
                letterSpacing: 4,
                color: "#667273",
                opacity: 1 - lerp(t, end + 0.2, end + 0.8),
              }}
            >
              CASE 5:26-cv-10423
            </div>
          </Cut>
        </Stage>
      </div>
    </div>
  );
};
