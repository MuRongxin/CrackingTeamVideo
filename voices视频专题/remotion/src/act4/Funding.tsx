import { C, F } from "../style";
import { lerp, useTime } from "../components";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
import {
  Stage,
  Raster,
  Reveal,
  Rule,
  Memory,
  Rig,
  pos,
  mono,
  Stroke,
} from "./shared";

export const Funding = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const note = say(timing, 104, "固定内容"),
    ask = say(timing, 105),
    hardware = say(timing, 106),
    stable = say(timing, 107);
  const scroll = lerp(t, note - 0.5, note + 0.9),
    split = lerp(t, hardware, hardware + 0.8);
  return (
    <Stage
      label="04 / 硬件、测试与五个月"
      source="voices38 发行说明 · 测试硬件与捐款用途"
    >
      <div
        style={{
          ...pos,
          left: 150,
          top: 137,
          width: 1620,
          height: 570 - split * 270,
          overflow: "hidden",
          background: C.paper,
          translate: `0 ${-split * 45}px`,
          scale: 1 - split * 0.025,
          boxShadow: "0 30px 80px #0006",
        }}
      >
        <Raster
          name="nfs-header"
          style={{
            ...pos,
            left: lerp(t, 0, 3, 240, 210),
            top: 55 - scroll * 700,
            width: 1180,
          }}
        />
        <div
          style={{
            ...pos,
            left: 62,
            top: 660 - scroll * 600,
            ...mono,
            fontSize: 27,
            color: C.ink,
          }}
        >
          NOTES / voices38
        </div>
        <Raster
          name="funding"
          style={{ ...pos, left: 58, top: 735 - scroll * 575, width: 1500 }}
        />
        <div
          style={{
            ...pos,
            left: 58,
            top: 160,
            height: 138,
            width: 1500,
            background: "#ffc83d25",
            opacity: lerp(t, ask, ask + 0.3),
            mixBlendMode: "multiply",
          }}
        />
      </div>
      <Reveal
        at={ask}
        style={{
          ...pos,
          left: 150,
          top: lerp(t, hardware, hardware + 0.8, 735, 455),
          fontSize: 68,
          color: C.yellow,
        }}
      >
        支持以后的破解
      </Reveal>
      <div style={{ ...pos, left: 150, top: 565, width: 760, opacity: split }}>
        <div style={{ fontSize: 50 }}>测试硬件</div>
        <div style={{ fontSize: 36, color: C.gray, marginTop: 22 }}>
          各种配置，反复验证。
        </div>
        <Reveal at={stable} style={{ fontSize: 47, marginTop: 36 }}>
          他给出的用途：<span style={{ color: C.yellow }}>保证稳定</span>
        </Reveal>
      </div>
      <div
        style={{
          ...pos,
          left: 1060,
          top: 470,
          width: 650,
          opacity: split,
          translate: `${(1 - split) * 240}px 0`,
        }}
      >
        <Rig active={lerp(t, hardware, stable + 2)} />
      </div>
    </Stage>
  );
};

export const Supporters = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    twice = say(timing, 109),
    unknown = say(timing, 110),
    network = say(timing, 111);
  const pull = lerp(t, network, network + 0.8),
    focus = t >= unknown ? 2 : t >= twice ? 1 : 0;
  const names = [
    "Crystal",
    "Badwith_Names",
    "nah",
    "Mod Weath",
    "kuba271k (x2)",
    "acidmilq",
    "DarkMahesvara",
    "Guilherme Campos",
    "Nitsuga",
    "Pantheon",
    "GOAT38",
    "13 unknown",
  ];
  return (
    <Stage
      label="SUPPORTERS / 公开署名"
      source="voices38《007：初露锋芒》支持者名单"
    >
      <div
        style={{
          ...pos,
          left: 130,
          top: 155,
          width: 650,
          height: 640,
          overflow: "hidden",
          background: "#fff",
          translate: `${-pull * 900}px 0`,
          rotate: `${-pull * 4}deg`,
          boxShadow: "0 30px 80px #0006",
        }}
      >
        <Raster
          name="supporters"
          style={{
            width: lerp(t, twice - 0.15, twice + 0.4, 650, 865),
            translate: `-4px ${focus === 0 ? -3 : focus === 1 ? -50 : -215}px`,
          }}
        />
        <div
          style={{
            ...pos,
            left: 12,
            top: focus === 1 ? 200 : focus === 2 ? 305 : 10,
            width: 600,
            height: 45,
            border: `3px solid ${C.yellow}`,
            opacity: focus ? 1 : 0,
            mixBlendMode: "multiply",
          }}
        />
      </div>
      <div style={{ ...pos, left: 910, top: 200, opacity: 1 - pull }}>
        <div style={{ fontSize: 31, color: C.gray }}>
          SUPPORTERS SINCE LAST RELEASE
        </div>
        <Reveal
          at={twice}
          style={{ marginTop: 65, ...mono, fontSize: 110, color: C.yellow }}
        >
          x2{" "}
          <span style={{ fontFamily: F.cn, fontSize: 44, color: C.white }}>
            捐了两次
          </span>
        </Reveal>
        <Reveal at={unknown} style={{ marginTop: 36, ...mono, fontSize: 79 }}>
          unknown
        </Reveal>
        <Reveal
          at={unknown + 0.15}
          style={{ marginTop: 16, fontSize: 43, color: C.yellow }}
        >
          不留名的捐赠
        </Reveal>
      </div>
      <div style={{ ...pos, inset: 0, opacity: pull }}>
        <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
          {names.map((_, i) => {
            const a = (i * Math.PI) / 6,
              x = 960 + Math.cos(a) * 640,
              y = 470 + Math.sin(a) * 290;
            return (
              <Stroke
                key={i}
                d={`M${x} ${y}L960 470`}
                at={network + 0.1 + i * 0.035}
                color="#6e8aa660"
                width={2}
              />
            );
          })}
        </svg>
        {names.map((n, i) => {
          const a = (i * Math.PI) / 6;
          return (
            <div
              key={n}
              style={{
                ...pos,
                left: 960 + Math.cos(a) * 640,
                top: 470 + Math.sin(a) * 290,
                translate: "-50% -50%",
                ...mono,
                fontSize: n.length > 14 ? 23 : 30,
                color: n.includes("unknown") ? C.yellow : "#b9c9cf",
                padding: "9px 14px",
                background: "#080d11",
              }}
            >
              {n}
            </div>
          );
        })}
        <div
          style={{
            ...pos,
            left: 700,
            top: 395,
            padding: 30,
            background: "#080d11",
            ...mono,
            fontSize: 68,
            color: C.yellow,
          }}
        >
          voices38<span style={{ opacity: t % 1 < 0.6 ? 1 : 0 }}>▮</span>
        </div>
        <div
          style={{ ...pos, left: 710, top: 515, fontSize: 30, color: C.gray }}
        >
          一个匿名的人，一群匿名的支持者
        </div>
      </div>
    </Stage>
  );
};

export const RamPrices = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    buying = say(timing, 113),
    ram = say(timing, 114),
    empathy = say(timing, 115);
  const shift = lerp(t, buying, buying + 0.8),
    bump = lerp(t, ram, ram + 0.3);
  return (
    <Stage
      label="2025.12.28 / 年末的说明"
      source="voices38 年末说明 · Reddit · r/SteamDeckPirates"
      light
    >
      <div
        style={{
          ...pos,
          left: 118,
          top: 145,
          ...mono,
          fontSize: 105,
          letterSpacing: -5,
          color: C.ink,
        }}
      >
        2025<span style={{ color: C.red }}>.12.28</span>
      </div>
      <Rule y={285} color={C.ink} />
      <div
        style={{
          ...pos,
          left: 125,
          top: 338,
          width: lerp(t, buying, buying + 0.8, 1660, 780),
          fontFamily: F.mono,
          fontSize: lerp(t, buying, buying + 0.8, 46, 34),
          lineHeight: 1.65,
        }}
      >
        <div style={{ color: "#687078", fontSize: 24, marginBottom: 22 }}>
          公开帖转述 / Some notes since last release
        </div>
        <div style={{ opacity: t < ram ? 1 : 0.4 }}>
          I keep buying the planned test hardware with the donation money.
        </div>
        <Reveal at={ram} style={{ marginTop: 26, color: C.red }}>
          The ram prices were unforeseen obstacle, but I’ll get there.
        </Reveal>
        <Reveal
          at={buying}
          style={{
            marginTop: 35,
            fontFamily: F.cn,
            fontSize: 41,
            color: C.ink,
          }}
        >
          捐款 → 按计划购买测试硬件
        </Reveal>
      </div>
      <div
        style={{
          ...pos,
          left: 1000,
          top: 320,
          width: 760,
          opacity: shift,
          translate: `${(1 - shift) * 500}px 0`,
          rotate: `${-bump * 2}deg`,
        }}
      >
        <Memory
          insert={lerp(t, buying, buying + 2) * (0.7 - bump * 0.4)}
          price={t >= ram}
          color="#ad8228"
        />
      </div>
      <Reveal
        at={empathy}
        style={{ ...pos, left: 1110, top: 770, fontSize: 44, color: C.red }}
      >
        装机的人，都懂。
      </Reveal>
    </Stage>
  );
};
