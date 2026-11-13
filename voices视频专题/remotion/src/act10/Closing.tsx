import { useVideoConfig } from "remotion";
import type { ShotTiming } from "../timing";
import { useTime, lerp } from "../components";
import { GroupMark } from "../act6/Picture";
import { C } from "../style";
import { Stage, Cut, Still, Words, Label, pos, mono } from "./Stage";
import { say } from "./timing";
type Props = { timing: ShotTiming };
export const Signature = ({ timing }: Props) => {
  const t = useTime(),
    joke = say(timing, 289),
    sorry = say(timing, 289, "道歉"),
    ram = say(timing, 290),
    debate = say(timing, 290, "也会"),
    way = say(timing, 291);
  return (
    <Stage
      name="A10-05 · 认识这个署名"
      source="历史回看 / V19 KIND · V07 道歉 · V31 硬件说法 · V13 技术澄清"
    >
      <Cut to={joke} name="风格鲜明的署名">
        <Label>在这些公开文字里</Label>
        <GroupMark
          name="voices38"
          width={1420}
          style={{ ...pos, left: 120, top: 330 }}
        />
      </Cut>
      <Cut from={joke} to={sorry} name="KIND笑话">
        <Label>回看 / KIND</Label>
        <Still src="v38/act5/mgsv-fields.png" x={150} y={260} width={1620} />
        <Words style={{ top: 695, fontSize: 88, color: C.yellow }}>
          KIND 里的一句玩笑
        </Words>
      </Cut>
      <Cut from={sorry} to={ram} name="道歉">
        <Label>回看 / 漏掉之后</Label>
        <Still src="v38/evidence/apology.png" x={120} y={330} width={1520} />
        <Words style={{ top: 610, fontSize: 94 }}>也会道歉。</Words>
      </Cut>
      <Cut from={ram} to={debate} name="硬件">
        <Label>回看 / 硬件筹备</Label>
        <Still
          src="v38/evidence/hardware-first-person.png"
          x={120}
          y={270}
          width={1260}
        />
        <Words style={{ top: 490, fontSize: 146 }}>内存太贵。</Words>
      </Cut>
      <Cut from={debate} to={way} name="什么才算破解">
        <Label>回看 / 技术争论</Label>
        <Words style={{ top: 205, ...mono, fontSize: 128, color: C.yellow }}>
          Crack <span style={{ color: "#6a858d" }}>/</span> Bypass
        </Words>
        <Still
          src="v38/act7/kirigiri-technical.png"
          x={110}
          y={445}
          width={1700}
        />
      </Cut>
      <Cut from={way} name="从材料认识署名">
        <Still src="v38/evidence/apology.png" x={110} y={200} width={650} />
        <Still src="v38/act5/mgsv-fields.png" x={860} y={170} width={890} />
        <Still
          src="v38/evidence/hardware-first-person.png"
          x={120}
          y={430}
          width={1000}
          style={{ opacity: lerp(t, way + 0.4, way + 0.8) }}
        />
        <Words style={{ top: 640, fontSize: 94 }}>
          一个署名，
          <br />
          <span style={{ color: C.yellow }}>一套工作的方式。</span>
        </Words>
      </Cut>
    </Stage>
  );
};
export const FirstAttemptAgain = () => (
  <Stage
    name="A10-06 · 一年前"
    source="回扣第二幕 / 本人自述，经 iXBT 转述 · V04，2025-10-15"
  >
    <Label>
      第一次尝试{" "}
      <span style={{ marginLeft: 1100, color: "#a5b3b8" }}>2025.10</span>
    </Label>
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
        }}
      />
    </div>
    <Words
      style={{
        left: 0,
        top: 600,
        width: 1920,
        textAlign: "center",
        fontSize: 52,
      }}
    >
      这是我的第一次尝试
    </Words>
  </Stage>
);
export const Traces = ({ timing }: Props) => {
  const t = useTime(),
    rename = say(timing, 294),
    traces = say(timing, 295),
    unknown = say(timing, 295, "但身份");
  return (
    <Stage
      name="A10-07 · 痕迹还在"
      source="账号与更名报道 V25 / V26 · 公开 NFO 存档；现实身份未确认"
    >
      <Cut to={rename} name="Reddit入口">
        <Label>一年后 / Reddit</Label>
        <Still src="v38/act9/account-title.png" x={100} y={205} width={1700} />
        <Words style={{ top: 470, ...mono, fontSize: 165, color: "#aab9b7" }}>
          [deleted]
        </Words>
      </Cut>
      <Cut from={rename} to={traces} name="论坛名字">
        <Label>论坛上的名字 / 据 Playground 报道</Label>
        <div
          style={{
            ...pos,
            left: 115,
            top: 210,
            ...mono,
            fontSize: 90,
            color: "#769094",
          }}
        >
          voices38
        </div>
        <Words style={{ top: 390, ...mono, fontSize: 206 }}>
          v<span style={{ color: C.yellow }}>0</span>ices38
        </Words>
      </Cut>
      <Cut from={traces} name="保留下来的文字">
        <Label>名字变了 / 公开文字仍在</Label>
        <Still
          src="v38/evidence/proper-claim.png"
          x={100}
          y={200}
          width={1700}
          style={{
            maxHeight: 260,
            objectFit: "contain",
            objectPosition: "left top",
          }}
        />
        <Still name="ownership" x={100} y={515} width={1700} />
        <Words
          style={{
            top: 675,
            fontSize: 95,
            color: C.yellow,
            opacity: lerp(t, unknown, unknown + 0.25),
          }}
        >
          身份，依然没有答案。
        </Words>
      </Cut>
    </Stage>
  );
};
export const PersonOrGroup = () => {
  const t = useTime();
  return (
    <Stage
      name="A10-08 · 个人还是团体"
      source="起诉书首页 / COURT_COMPLAINT · 原文：an unknown individual or entity"
      paper
    >
      <Label style={{ color: C.red }}>法院文件留下的表述</Label>
      <Still name="entity-line" x={110} y={300} width={1700} />
      <div
        style={{
          ...pos,
          left: 1450,
          top: 465,
          width: 200 * lerp(t, 0.5, 1.1),
          height: 5,
          background: C.red,
        }}
      />
      <Words style={{ top: 625, fontSize: 116 }}>个人，还是团体？</Words>
    </Stage>
  );
};
export const FinalName = ({ timing }: Props) => {
  const { fps } = useVideoConfig();
  const t = useTime(),
    name = say(timing, 297, "VOICES38"),
    end = timing.voices[0].start + timing.voices[0].duration,
    fade = lerp(t, end + 4, timing.duration - 1 / fps);
  return (
    <div style={{ ...pos, inset: 0, background: "#000" }}>
      <div style={{ ...pos, inset: 0, opacity: 1 - fade }}>
        <Stage
          name="A10-09 · VOICES38"
          source="COURT_COMPLAINT / 2026-09-14 · 当事人栏原件"
          paper
        >
          <Cut to={name} name="法院当事人栏" paper>
            <Still name="case-ending" x={160} y={185} width={1600} />
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
                opacity: 1 - lerp(t, end + 0.3, end + 1),
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
