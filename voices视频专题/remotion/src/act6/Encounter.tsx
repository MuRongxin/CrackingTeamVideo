import { Sequence, useVideoConfig } from "remotion";
import { C, F } from "../style";
import { useTime, lerp } from "../components";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
import { Stage, pos, mono, HV, OS, linear } from "./shared";
import { Film, GroupMark, Shade, CaptionSlug, Slash } from "./Picture";

export const Encounter = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    jan = say(timing, 165),
    rumor = say(timing, 166),
    question = say(timing, 167),
    p = lerp(t, jan, jan + 0.8),
    q = lerp(t, rumor, rumor + 0.6),
    r = lerp(t, question, question + 0.7);
  return (
    <Stage
      label="2026.01 / 在悟空上相遇"
      source="voices38 回应 · GameGPU / 游侠网 · 游戏画面：游戏科学"
    >
      <Film name="wukong-encounter" />
      <Shade side="bottom" />
      <div
        style={{
          ...pos,
          inset: 0,
          background: "linear-gradient(90deg,#020c12b0,transparent 68%)",
          opacity: p,
        }}
      />
      <div
        style={{
          ...pos,
          left: 90,
          top: 160,
          opacity: 1 - p,
          translate: `${p * -500}px 0`,
        }}
      >
        <div style={{ ...mono, fontSize: 30, letterSpacing: 8, color: OS }}>
          BLACK MYTH
        </div>
        <div style={{ fontSize: 143, lineHeight: 1.1, marginTop: 15 }}>
          悟空
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 105,
          top: 180,
          opacity: p,
          translate: `${(1 - p) * -180}px 0`,
        }}
      >
        <div style={{ ...mono, fontSize: 28, color: HV }}>
          2026.01 / HYPERVISOR
        </div>
        <div style={{ ...mono, fontSize: 92, marginTop: 24 }}>0xZeOn</div>
      </div>
      <div
        style={{
          ...pos,
          left: 105,
          top: 560,
          opacity: q,
          translate: `0 ${(1 - q) * 140}px`,
          borderLeft: `5px solid ${OS}`,
          paddingLeft: 28,
        }}
      >
        <div style={{ fontSize: 28, color: OS }}>Reddit 上出现传言</div>
        <div style={{ fontSize: 61, marginTop: 18, opacity: r }}>
          两人有约定？
        </div>
        <div
          style={{ fontSize: 27, color: "#c2c9ca", marginTop: 15, opacity: r }}
        >
          voices38 × 0xZeOn
        </div>
      </div>
      <Slash at={rumor} color={OS} />
    </Stage>
  );
};

export const NoAgreement = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    deny = say(timing, 169),
    tools = say(timing, 170),
    p = lerp(t, deny, deny + 0.55),
    q = lerp(t, tools, tools + 0.85);
  return (
    <Stage
      label="voices38 的回应 / 2026.01"
      source="voices38 回应 · GameGPU / 游侠网"
    >
      <Film name="wukong-denial" />
      <Shade />
      <GroupMark
        name="voices38"
        width={490}
        style={{
          ...pos,
          left: 100,
          top: 155,
          translate: `0 ${-q * 80}px`,
          opacity: 1 - q,
        }}
      />
      <div
        style={{
          ...pos,
          left: 105,
          top: 380 - q * 100,
          opacity: p,
          translate: `${(1 - p) * 150}px 0`,
        }}
      >
        <div style={{ fontSize: 100, color: OS }}>没有任何协议</div>
        <div
          style={{
            fontSize: 33,
            color: "#d1d8d7",
            marginTop: 24,
            opacity: 1 - q,
          }}
        >
          《黑神话》可以交给 0xZeOn
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 110,
          top: 515,
          opacity: q,
          translate: `0 ${(1 - q) * 160}px`,
        }}
      >
        <div style={{ fontSize: 30, color: "#d0dcdf" }}>
          他正专心开发的新工具，针对
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            marginTop: 27,
            ...mono,
            color: OS,
            fontSize: 92,
          }}
        >
          <span>2024</span>
          <span
            style={{
              width: lerp(t, tools + 0.25, tools + 1.5, 0, 220),
              height: 3,
              background: OS,
            }}
          />
          <span style={{ opacity: lerp(t, tools + 0.5, tools + 1.2) }}>
            2026
          </span>
        </div>
        <div style={{ ...mono, fontSize: 27, marginTop: 23, color: "#afbec4" }}>
          DENUVO / 新版本
        </div>
      </div>
      <Slash at={tools} color={OS} />
    </Stage>
  );
};

export const Compatibility = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    { fps } = useVideoConfig(),
    update = say(timing, 172),
    archive = say(timing, 173),
    jan = say(timing, 174);
  const q = lerp(t, update, update + 0.7),
    r = lerp(t, archive, archive + 0.65),
    j = lerp(t, jan, jan + 0.7);
  return (
    <Stage
      label="兼容性与长期保存 / voices38 的一月评价"
      source="voices38 对 Hypervisor 的批评 · GameGPU / 游侠网"
    >
      <Sequence durationInFrames={Math.round(8.5 * fps)}>
        <Film name="wukong-compatibility" />
      </Sequence>
      <div
        style={{
          ...pos,
          inset: 0,
          background: "linear-gradient(90deg,#030c13f0,#030c1345 80%)",
        }}
      />
      <div
        style={{
          ...pos,
          left: 90,
          top: 145,
          ...mono,
          fontSize: 27,
          color: HV,
          opacity: 1 - j,
        }}
      >
        voices38 / 2026.01 / 当时的评价
      </div>
      <div
        style={{
          ...pos,
          left: 95,
          top: 255,
          translate: `${-q * 820}px 0`,
          opacity: 1 - q,
        }}
      >
        <div style={{ fontSize: 94, fontFamily: F.mono }}>Linux</div>
        <div style={{ fontSize: 94, fontFamily: F.mono, marginTop: 18 }}>
          macOS
        </div>
        <div style={{ fontSize: 43, color: OS, marginTop: 36 }}>用不了</div>
        <div
          style={{
            height: 4,
            width: lerp(t, 0.6, 1.5, 0, 620),
            background: OS,
            marginTop: 21,
          }}
        />
      </div>
      <div
        style={{
          ...pos,
          left: 105,
          top: 265,
          opacity: q * (1 - r),
          translate: `${(1 - q) * 600 - r * 700}px 0`,
        }}
      >
        <div style={{ fontSize: 73, fontFamily: F.mono }}>Windows Update</div>
        <div style={{ fontSize: 57, color: OS, marginTop: 44 }}>
          下一次更新，可能失效
        </div>
        <svg width="640" height="160" style={{ marginTop: 15 }}>
          <path d="M0 80H600" stroke="#62737c" />
          <path
            d={`M0 80H${linear(t, update, update + 2) * 600}`}
            stroke={HV}
            strokeWidth="6"
          />
          <circle
            cx={linear(t, update, update + 2) * 600}
            cy="80"
            r="12"
            fill={OS}
          />
        </svg>
      </div>
      <div
        style={{
          ...pos,
          left: 105,
          top: 285,
          opacity: r * (1 - j),
          translate: `0 ${(1 - r) * 180 - j * 180}px`,
        }}
      >
        <div style={{ fontSize: 79 }}>长期保存</div>
        <div style={{ fontSize: 55, color: OS, marginTop: 36 }}>
          也要考虑下一次启动
        </div>
        <div style={{ ...mono, fontSize: 29, color: "#9db3bd", marginTop: 50 }}>
          COMPATIBILITY / PRESERVATION
        </div>
      </div>
      <div style={{ ...pos, inset: 0, background: "#071017", opacity: j }} />
      <GroupMark
        name="voices38"
        width={510}
        style={{ ...pos, left: 105, top: 160, opacity: j }}
      />
      <div
        style={{
          ...pos,
          left: 100,
          top: 380,
          fontFamily: F.mono,
          fontSize: 194,
          color: OS,
          opacity: j,
          translate: `0 ${(1 - j) * 90}px`,
        }}
      >
        2026.01
      </div>
      <div style={{ ...pos, left: 115, top: 645, fontSize: 40, opacity: j }}>
        这番话的时间，留在一月。
      </div>
      <Slash at={update} />
      <Slash at={archive} />
    </Stage>
  );
};
