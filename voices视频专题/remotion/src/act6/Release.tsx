import { Img, Sequence, useVideoConfig } from "remotion";
import { C, F } from "../style";
import { useTime, lerp } from "../components";
import { publicAsset } from "../assets";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
import { Stage, Raster, pos, mono, HV, OS, linear } from "./shared";
import { Film, GroupMark, NfoTop, Shade, Slash } from "./Picture";

export const DyingSimulator = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    kind = say(timing, 176),
    fight = say(timing, 177),
    p = lerp(t, kind, kind + 0.65),
    action = lerp(t, fight - 0.65, fight + 0.2);
  return (
    <Stage
      label="2026.04 / Dying Simulator"
      source="V18 原始 NFO｜B站 大胖頭：2023 线下试玩 / BV1Vr4y1o7i4｜保留原水印"
    >
      <Film name="tiger-full" />
      <Shade side="bottom" />
      <div
        style={{
          ...pos,
          inset: 0,
          background: "#010509",
          opacity: 0.72 * (1 - action),
        }}
      />
      <div
        style={{
          ...pos,
          left: 110 - action * 15,
          top: 125,
          width: 1400,
          scale: 1 - action * 0.63,
          transformOrigin: "top left",
          transform: `perspective(1400px) rotateY(${(1 - action) * -6}deg)`,
          background: "#000e",
          padding: 28,
          boxShadow: "0 15px 70px #0008",
        }}
      >
        <GroupMark name="voices38" width={650} />
        <Raster
          path="v38/act6/wukong-fields.png"
          style={{ width: 1400, marginTop: 25 }}
        />
        <div
          style={{
            ...pos,
            top: 386,
            left: 26,
            width: lerp(t, kind, kind + 0.8, 0, 1400),
            height: 33,
            background: "#ffc83d2d",
            borderBottom: `3px solid ${OS}`,
          }}
        />
      </div>
      <div
        style={{
          ...pos,
          left: 125,
          top: 650,
          fontSize: 79,
          color: OS,
          opacity: p * (1 - action),
          translate: `0 ${(1 - p) * 65}px`,
        }}
      >
        死亡模拟器
      </div>
      <div
        style={{
          ...pos,
          right: 110,
          top: 150,
          fontSize: 48,
          color: OS,
          opacity: action,
          textShadow: "0 3px 20px black",
        }}
      >
        死亡模拟器
      </div>
      <Slash at={fight - 0.65} color={OS} />
    </Stage>
  );
};

const Reel = ({ from, to, p }: { from: string; to: string; p: number }) => (
  <span
    style={{
      display: "inline-block",
      position: "relative",
      width: "1ch",
      height: "1.2em",
      verticalAlign: "bottom",
      overflow: "hidden",
      color: OS,
    }}
  >
    <span
      style={{
        ...pos,
        left: 0,
        top: 0,
        translate: `0 ${-p * 130}%`,
        rotate: `${p * 22}deg`,
        opacity: 1 - p,
      }}
    >
      {from}
    </span>
    <span
      style={{
        ...pos,
        left: 0,
        top: 0,
        translate: `0 ${(1 - p) * 130}%`,
        rotate: `${(1 - p) * -22}deg`,
      }}
    >
      {to}
    </span>
  </span>
);
export const FilterTitle = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    { fps } = useVideoConfig(),
    a = say(timing, 178, "换成"),
    o = say(timing, 179, "换成"),
    explain = say(timing, 180, "标题这么"),
    ap = lerp(t, a - 0.12, a + 0.5),
    op = lerp(t, o - 0.12, o + 0.5),
    p = lerp(t, explain, explain + 0.7),
    reveal = lerp(t, 3.5, 4.1);
  return (
    <Stage
      label="发布帖标题 / Bl4ck-Myth-Wuk0ng-voices38"
      source="V18 发布帖文字存档重排｜标题与过滤器解释均来自原帖｜背景为游戏科学官方画面"
    >
      <NfoTop
        width={1500}
        style={{
          ...pos,
          left: 210,
          top: 120,
          opacity: 0.28 * (1 - reveal),
          transform: `perspective(1300px) rotateY(-18deg) translateX(${-t * 45}px)`,
        }}
      />
      <Sequence from={Math.round(3.5 * fps)}>
        <Film name="wukong-title" shade={0.25} style={{ opacity: reveal }} />
      </Sequence>
      <Shade />
      <div
        style={{
          ...pos,
          left: 100,
          top: 152,
          display: "flex",
          gap: 24,
          alignItems: "center",
        }}
      >
        <Img
          src={publicAsset("v38/brands/reddit.png")}
          style={{ width: 70, height: 70, objectFit: "contain" }}
        />
        <div style={{ ...mono, fontSize: 29, color: "#d4dcdf" }}>
          r/CrackWatch · 发布帖
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 300 - p * 50,
          ...mono,
          fontSize: 108,
          lineHeight: 1.1,
          letterSpacing: -4,
          textShadow: "0 8px 45px #000",
          transform: `perspective(1500px) rotateY(${(1 - reveal) * -4}deg)`,
        }}
      >
        Bl
        <Reel from="a" to="4" p={ap} />
        ck-Myth-
        <br />
        Wuk
        <Reel from="o" to="0" p={op} />
        ng-voices38
      </div>
      <div
        style={{
          ...pos,
          left: 110,
          top: 640,
          display: "flex",
          gap: 90,
          ...mono,
          fontSize: 40,
          color: OS,
          opacity: 1 - p,
        }}
      >
        <span style={{ opacity: ap }}>a → 4</span>
        <span style={{ opacity: op }}>o → 0</span>
      </div>
      <div
        style={{
          ...pos,
          left: 110,
          top: 602,
          opacity: p,
          translate: `0 ${(1 - p) * 70}px`,
        }}
      >
        <div style={{ fontSize: 50, color: OS }}>因为 Reddit 的过滤器。</div>
        <div style={{ ...mono, fontSize: 29, marginTop: 20, color: "#d8dedf" }}>
          Title is because of reddit filters.
        </div>
      </div>
    </Stage>
  );
};

export const ReleaseInterval = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    { fps } = useVideoConfig(),
    gap = say(timing, 182),
    claim = say(timing, 183),
    p = lerp(t, gap, gap + 1.4),
    q = lerp(t, claim, claim + 0.7);
  return (
    <Stage
      label="两次发行之间 / 18 天"
      source="133 GB 与 18 天据 V18 社区帖｜官方宣传画面｜发行间隔不等于单作破解耗时"
    >
      <Film name="requiem-interval" />
      <Sequence from={Math.round(3.5 * fps)}>
        <Film
          name="wukong-interval"
          style={{
            clipPath: `polygon(${100 - p * 50}% 0,100% 0,100% 100%,${100 - p * 60}% 100%)`,
          }}
        />
      </Sequence>
      <Shade side="bottom" />
      <div
        style={{
          ...pos,
          inset: 0,
          background: "linear-gradient(90deg,#05090caa,transparent)",
          opacity: 1 - p,
        }}
      />
      <div
        style={{
          ...pos,
          left: 105,
          top: 205,
          translate: `${-p * 750}px 0`,
          opacity: 1 - p,
        }}
      >
        <div style={{ ...mono, fontSize: 26, color: OS }}>
          RELEASE SIZE / 原帖字段
        </div>
        <div style={{ ...mono, fontSize: 222, color: "white", marginTop: 10 }}>
          133<span style={{ fontSize: 72 }}> GB</span>
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 780,
          top: 240,
          width: 360,
          textAlign: "center",
          opacity: p,
          scale: 1.2 - p * 0.2,
          textShadow: "0 5px 45px #000",
        }}
      >
        <div style={{ ...mono, fontSize: 187, color: OS }}>
          {Math.round(p * 18)}
        </div>
        <div style={{ fontSize: 43 }}>天</div>
      </div>
      <div style={{ ...pos, left: 100, top: 655, fontSize: 42, opacity: p }}>
        安魂曲
      </div>
      <div
        style={{
          ...pos,
          right: 100,
          top: 655,
          fontSize: 42,
          color: OS,
          opacity: p,
        }}
      >
        黑神话：悟空
      </div>
      <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
        <path d={`M105 740H${105 + p * 1710}`} stroke={OS} strokeWidth="3" />
        {Array.from({ length: 19 }, (_, i) => (
          <path
            key={i}
            d={`M${105 + i * 95} 726V${i % 3 === 0 ? 761 : 750}`}
            stroke={OS}
            strokeWidth="2"
            opacity={lerp(t, gap + i * 0.05, gap + i * 0.05 + 0.25)}
          />
        ))}
      </svg>
      <div
        style={{
          ...pos,
          left: 640,
          top: 788,
          fontSize: 28,
          color: "#d0dcdf",
          opacity: q,
        }}
      >
        连续发行，留下研究进展的线索
      </div>
      <Slash at={gap} color={OS} />
    </Stage>
  );
};
