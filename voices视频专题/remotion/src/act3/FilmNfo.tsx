import { C, F } from "../style";
import { lerp, useTime } from "../components";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
import { nitroAt, doorAt } from "./motion";
import {
  Stage,
  Raster,
  Still,
  Clip,
  Grid,
  Type,
  Stroke,
  DateRail,
  pos,
  mono,
  ramp,
} from "./motion-shared";

export const NfoGrows = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    grow = say(timing, 55),
    logo = say(timing, 56),
    fields = say(timing, 57);
  const pull = lerp(t, grow, grow + 0.9),
    pan = lerp(t, fields, fields + 1.05);
  const names = ["RELEASE NAME", "RELEASE DATE", "FORMAT", "PROTECTION"];
  const ats = [
    fields + 0.9,
    fields + 1.7,
    fields + 2.5,
    say(timing, 57, "还有"),
  ];
  const row = t < ats[1] ? 0 : t < ats[2] ? 1 : t < ats[3] ? 2 : 3;
  return (
    <Stage
      label="03 / NFO 里的性格与试错"
      source="原始 NFO｜V02、V06、V07 · 文件先后排列为编辑示意"
    >
      <Grid />
      <div style={{ ...pos, inset: 0, opacity: (1 - pull) * 0.3 }}>
        <Still src="v38/act3/motion/nfs-road.png" dim={0.6} />
      </div>
      <div style={{ ...pos, inset: 0, clipPath: "inset(120px 0 245px 0)" }}>
        <div
          style={{
            ...pos,
            left: 130,
            top: 160,
            width: 1660,
            transformOrigin: "50% 45%",
            transform: `perspective(1800px) rotateY(${-14 * (1 - pull)}deg) rotateZ(${-4 * (1 - pull)}deg) scale(${0.92 + pull * 0.08})`,
            translate: `0 ${-pan * 600}px`,
          }}
        >
          <div style={{ opacity: 1 - pull, translate: `${-pull * 1500}px 0` }}>
            <div
              style={{ ...mono, fontSize: 30, color: C.gray, marginBottom: 35 }}
            >
              2025.10 / 只有几行说明
            </div>
            <div
              style={{
                width: 1020,
                height: 150,
                overflow: "hidden",
                background: "white",
              }}
            >
              <Raster
                src="v38/act2/nfo/three-kingdoms-original.png"
                style={{ width: 1020 }}
              />
            </div>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  ...pos,
                  left: 930 + i * 120 - t * 8,
                  top: 80 + i * 115,
                  width: 650,
                  boxShadow: "0 35px 80px #000",
                  opacity: lerp(t, 0.6 + i * 0.9, 1.2 + i * 0.9),
                  transform: `rotate(${8 - i * 5}deg)`,
                }}
              >
                <Raster
                  src={`v38/evidence/${i === 1 ? "fix-sheet" : "nfo-sheet"}.png`}
                  style={{ width: 650 }}
                />
              </div>
            ))}
          </div>
          <div
            style={{
              ...pos,
              left: 0,
              top: 0,
              width: 1660,
              opacity: pull,
              translate: `0 ${(1 - pull) * 850}px`,
              background: "#000",
              padding: "20px 30px",
              boxShadow: "0 40px 100px #000",
            }}
          >
            <Raster
              src="v38/act3/nfo/voices-header.png"
              style={{ width: 1600, height: 527.5 }}
            />
            <div
              style={{
                ...pos,
                left: 25,
                top: 30,
                width: 1610,
                height: 510,
                border: `2px solid ${C.yellow}`,
                opacity: (1 - pan) * lerp(t, logo, logo + 0.3),
                clipPath: `inset(0 ${100 * (1 - lerp(t, logo, logo + 0.9))}% 0 0)`,
              }}
            />
            <Raster
              src="v38/act3/nfo/proper-fields.png"
              style={{ width: 1600, marginTop: 85 }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 660,
          opacity: pan,
          display: "flex",
          gap: 35,
        }}
      >
        {names.map((name, i) => (
          <div
            key={name}
            style={{
              ...mono,
              fontSize: i === row ? 32 : 25,
              color: i === row ? C.yellow : C.gray,
              borderTop: `3px solid ${i === row ? C.yellow : "#485464"}`,
              paddingTop: 20,
              width: i === 3 ? 390 : 350,
              translate: `0 ${lerp(t, ats[i] - 0.5, ats[i], 80, 0)}px`,
            }}
          >
            {name}
            <div style={{ fontFamily: F.cn, fontSize: 29, marginTop: 20 }}>
              {["发布名", "日期", "格式", "保护措施"][i]}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          ...pos,
          left: 110,
          top: 783,
          width: 1700 * ramp(t, 0, timing.duration),
          height: 2,
          background: C.yellow,
        }}
      />
    </Stage>
  );
};

export const KindIntro = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    kind = say(timing, 58, "KIND"),
    type = say(timing, 59),
    joke = say(timing, 60, "玩笑");
  const p = lerp(t, joke - 0.3, joke + 0.65);
  return (
    <Stage
      label="KIND / 他怎样形容这些游戏"
      source="NFO 原文字段｜V16、V10、V15 · 游戏类型为编辑释义"
    >
      <Grid />
      {[
        "v38/act3/motion/nfs-road.png",
        "v38/film/requiem-corridor.png",
        "v38/act3/motion/bond.png",
      ].map((src, i) => (
        <div
          key={src}
          style={{
            ...pos,
            left: i * 640,
            top: 0,
            width: 640,
            height: 1080,
            overflow: "hidden",
            opacity: 0.12 + p * 0.55,
            clipPath: `inset(${(1 - lerp(t, joke - 0.3 + i * 0.12, joke + 0.5 + i * 0.12)) * 100}% 0 0 0)`,
            borderRight: "2px solid #070c10",
          }}
        >
          <Still src={src} x={-i * 300} dim={0.2} />
        </div>
      ))}
      <div
        style={{
          ...pos,
          left: 100,
          top: 180,
          transformOrigin: "left top",
          scale: 1 - p * 0.28,
        }}
      >
        <Type
          at={kind - 0.3}
          duration={0.35}
          style={{ fontSize: 190, color: C.yellow }}
        >
          KIND
        </Type>
        <div
          style={{ ...mono, color: "#788d97", fontSize: 27, letterSpacing: 6 }}
        >
          THE WAY HE SEES A GAME
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 110,
          top: 525,
          fontSize: 95,
          translate: `0 ${-p * 250}px`,
          opacity: 1 - p,
        }}
      >
        <span style={{ opacity: lerp(t, type, type + 0.4) }}>游戏类型</span>
        <span style={{ color: C.gray }}> ?</span>
      </div>
      <div
        style={{
          ...pos,
          left: 920,
          top: 470,
          height: 100,
          overflow: "hidden",
          opacity: (1 - p) * lerp(t, type, type + 0.4),
        }}
      >
        <div
          style={{
            ...mono,
            fontSize: 74,
            color: C.blue,
            translate: `0 ${-Math.min(2, Math.max(0, Math.floor((t - type) / 0.9))) * 105}px`,
          }}
        >
          {["RACING", "HORROR", "ACTION"].map((v) => (
            <div key={v} style={{ height: 105 }}>
              {v}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 110,
          top: 425,
          fontSize: 106,
          opacity: p,
          translate: `0 ${(1 - p) * 180}px`,
          textShadow: "0 6px 35px #000",
        }}
      >
        懂的人，会心一笑。
      </div>
      <div
        style={{
          ...pos,
          left: 110,
          right: 100,
          top: 680,
          display: "flex",
          gap: 50,
          opacity: p,
        }}
      >
        {[
          "Fast Cars\non Nitro",
          "Zombie Puzzle\nSimulator",
          "The MI6\nHitman",
        ].map((line, i) => (
          <div
            key={line}
            style={{
              ...mono,
              whiteSpace: "pre-line",
              fontSize: 41,
              lineHeight: 1.3,
              width: 540,
              color: i ? C.white : C.yellow,
              translate: `0 ${lerp(t, joke + i * 0.2, joke + 0.8 + i * 0.2, 100, 0)}px`,
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </Stage>
  );
};

export const Nitro = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    boost = nitroAt(timing),
    p = lerp(t, boost - 0.15, boost + 0.5);
  return (
    <Stage
      label="极品飞车：热力追踪 重制版 / V16"
      source="EA 官方游戏片段｜KIND 原文：Fast Cars on Nitro"
    >
      <Clip src="v38/film/nfs.mp4" duration={5.12} dim={0.08} />
      <div
        style={{
          ...pos,
          inset: 0,
          background: "linear-gradient(90deg,#020b11bf,transparent 65%)",
        }}
      />
      <div
        style={{
          ...pos,
          left: 95 - p * 1050,
          top: 190,
          fontFamily: F.mono,
          fontSize: 150,
          lineHeight: 0.97,
          textShadow: "0 4px 25px #000",
          transform: `skewX(${-p * 18}deg)`,
        }}
      >
        Fast Cars
        <br />
        <span style={{ color: C.yellow }}>on Nitro</span>
      </div>
      <div
        style={{
          ...pos,
          right: 110,
          top: 640,
          fontSize: 78,
          color: C.yellow,
          translate: `${(1 - p) * 1500}px 0`,
          transform: "skewX(-10deg)",
          textShadow: "0 4px 20px #000",
        }}
      >
        加满氮气的快车
      </div>
      <svg width={1920} height={1080} style={{ ...pos, inset: 0 }}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const q = ramp(t, boost + i * 0.035, boost + 0.5 + i * 0.035);
          return (
            <path
              key={i}
              d={`M${2100 - q * 3000} ${190 + i * 87}h${280 + i * 30}`}
              stroke={i % 2 ? C.white : C.yellow}
              strokeWidth={i % 2 ? 2 : 4}
              opacity={q > 0 && q < 1 ? 0.7 : 0}
            />
          );
        })}
      </svg>
      <div
        style={{
          ...pos,
          left: 100,
          top: 780,
          width: 1720,
          height: 5,
          background: "#ffffff38",
        }}
      >
        <div
          style={{
            width: `${ramp(t, 0, boost) * 100}%`,
            height: "100%",
            background: C.yellow,
          }}
        />
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 733,
          ...mono,
          fontSize: 24,
          color: C.yellow,
        }}
      >
        {p > 0.1 ? "NITRO  >>>" : "KIND / Fast Cars on Nitro"}
      </div>
    </Stage>
  );
};

const Item = ({ type }: { type: number }) => (
  <svg
    viewBox="0 0 100 100"
    width={100}
    height={100}
    fill="none"
    stroke="currentColor"
    strokeWidth={4}
  >
    {type === 0 ? (
      <>
        <circle cx={30} cy={28} r={17} />
        <path d="M43 42L85 84M60 58L73 45M74 73L87 60" />
      </>
    ) : type === 1 ? (
      <>
        <path d="M50 8L63 29L87 36L74 57L77 82L51 74L30 90L24 65L7 48L30 32Z" />
        <circle cx={49} cy={49} r={12} />
      </>
    ) : (
      <>
        <path d="M15 15H55V35H86V68H58V87H26V64H9V35H15Z" />
        <circle cx={45} cy={49} r={10} />
      </>
    )}
  </svg>
);
export const ZombiePuzzle = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    search = say(timing, 63),
    open = doorAt(timing);
  const map = lerp(t, search, search + 0.7),
    p = lerp(t, open, open + 0.7);
  return (
    <Stage
      label="生化危机：安魂曲 / V10"
      source="CAPCOM 官方游戏素材｜KIND 原文 · 地图、道具与开门为笑点示意"
    >
      <Still src="v38/film/requiem-corridor.png" dim={0.15} />
      <Clip src="v38/film/requiem-establish.mp4" duration={3.3} dim={0.1} />
      <div
        style={{
          ...pos,
          inset: 0,
          background: "#02090c",
          opacity: map * 0.65 * (1 - p),
        }}
      />
      <div
        style={{
          ...pos,
          left: 100,
          top: 155,
          fontSize: 78,
          ...mono,
          transformOrigin: "left top",
          scale: 1 - map * 0.3,
        }}
      >
        Zombie Puzzle
        <br />
        <span style={{ color: C.yellow }}>Simulator</span>
      </div>
      <div
        style={{
          ...pos,
          left: 103,
          top: 377 - map * 55,
          fontSize: 52,
          opacity: 1 - p,
          color: C.yellow,
        }}
      >
        僵尸解谜模拟器
      </div>
      <div
        style={{
          ...pos,
          inset: 0,
          opacity: map * (1 - p),
          transformOrigin: "75% 60%",
          scale: 1 + p * 2,
        }}
      >
        <svg width={1920} height={1080}>
          <path
            d="M130 510H610V425H1050V700H1350M130 710H430V800H890V510H1450M630 440V305H1330V550M1050 700V790H1600"
            stroke="#7091a344"
            strokeWidth={18}
            fill="none"
          />
          <Stroke
            d="M220 540H580V720H1010V490H1470V620"
            at={search + 0.3}
            duration={3.7}
            color={C.yellow}
            width={5}
          />
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx={[230, 700, 1120][i]}
              cy={[540, 720, 490][i]}
              r={52 + ((t - search + i) % 1.5) * 22}
              fill="none"
              stroke={C.blue}
              opacity={0.45}
            />
          ))}
        </svg>
        {[0, 1, 2].map((i) => {
          const at = search + 0.7 + i * 0.85,
            q = lerp(t, at, open - 0.05);
          return (
            <div
              key={i}
              style={{
                ...pos,
                left: [180, 650, 1070][i] + (1490 - [180, 650, 1070][i]) * q,
                top: [490, 670, 440][i] + (570 - [490, 670, 440][i]) * q,
                opacity:
                  lerp(t, search + i * 0.3, search + 0.4 + i * 0.3) * (1 - p),
                color: C.yellow,
                rotate: `${(1 - q) * (i - 1) * 20}deg`,
                scale: 1 - q * 0.35,
              }}
            >
              <Item type={i} />
              <div style={{ fontSize: 24, textAlign: "center" }}>
                {["钥匙", "徽章", "零件"][i]}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          ...pos,
          left: 1400,
          top: 285,
          width: 330,
          height: 520,
          border: `${4 * (1 - p)}px solid ${C.blue}`,
          background: "#07121a",
          opacity: map * (1 - lerp(t, open, open + 0.45)),
          transform: `perspective(1400px) rotateY(${-p * 82}deg)`,
          transformOrigin: "left",
        }}
      >
        <div
          style={{
            ...pos,
            right: 35,
            top: 280,
            width: 13,
            height: 13,
            borderRadius: "50%",
            background: C.yellow,
          }}
        />
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 720,
          ...mono,
          fontSize: 58,
          color: C.yellow,
          opacity: p,
        }}
      >
        OPEN.
      </div>
    </Stage>
  );
};

export const MI6 = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    relation = say(timing, 65),
    p = lerp(t, relation, relation + 0.8),
    hitman = say(timing, 65, "做的");
  return (
    <Stage
      label="007：初露锋芒 / V15"
      source="007 官方游戏片段｜KIND 原文 · IO Interactive 开发商关系示意"
    >
      <Clip src="v38/film/bond.mp4" duration={9.2} dim={0.18} />
      <div
        style={{
          ...pos,
          inset: 0,
          background: "linear-gradient(90deg,#07101c9c,transparent)",
        }}
      />
      <div
        style={{
          ...pos,
          left: 100,
          top: 175,
          ...mono,
          fontSize: 122,
          transformOrigin: "left top",
          scale: 1 - p * 0.34,
          translate: `0 ${-p * 40}px`,
        }}
      >
        The <span style={{ color: C.yellow }}>MI6 Hitman</span>
      </div>
      <div
        style={{ ...pos, left: 110, top: 350, fontSize: 64, opacity: 1 - p }}
      >
        军情六处的杀手
      </div>
      <div
        style={{
          ...pos,
          left: 70 - p * 100,
          top: 370,
          ...mono,
          fontSize: 340,
          lineHeight: 1,
          color: "#fff",
          opacity: 0.7,
          letterSpacing: -25,
        }}
      >
        007
      </div>
      <div
        style={{
          ...pos,
          left: 950,
          top: 0,
          width: 1000,
          height: 1080,
          background: "#081017e8",
          transform: `skewX(-12deg) translateX(${(1 - p) * 1300}px)`,
        }}
      />
      <div
        style={{
          ...pos,
          left: 1090,
          top: 360,
          opacity: p,
          translate: `0 ${(1 - p) * 120}px`,
        }}
      >
        <div style={{ fontSize: 28, color: C.gray }}>同一开发商</div>
        <Type at={relation + 0.2} style={{ fontSize: 54, marginTop: 25 }}>
          IO Interactive
        </Type>
        <div
          style={{
            ...mono,
            fontSize: 112,
            marginTop: 75,
            opacity: lerp(t, hitman, hitman + 0.35),
            color: C.yellow,
            letterSpacing: -4,
          }}
        >
          HITMAN
        </div>
      </div>
      <svg width={1920} height={1080} style={{ ...pos, inset: 0 }}>
        <Stroke
          d="M450 747H1080V685H1670"
          at={relation + 0.4}
          duration={1.15}
        />
      </svg>
    </Stage>
  );
};

export const AnotherField = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    at = say(timing, 67),
    complex = say(timing, 68),
    p = lerp(t, at - 0.1, at + 0.7);
  return (
    <Stage
      label="同一份 NFO / 语气变了"
      source="V16、V14｜KIND 与 PROTECTION 原文字段重排"
    >
      <Grid tilt />
      <div style={{ ...pos, inset: 0, clipPath: "inset(120px 0 245px 0)" }}>
        <div
          style={{
            ...pos,
            left: 75,
            top: 150,
            width: 1770,
            transform: `perspective(1600px) rotateX(${(1 - p) * 12}deg) rotateZ(${-4 * (1 - p)}deg)`,
            translate: `0 ${-p * 430}px`,
          }}
        >
          <div style={{ ...mono, fontSize: 84, color: C.gray }}>KIND</div>
          {[
            "Fast Cars on Nitro",
            "Zombie Puzzle Simulator",
            "The MI6 Hitman",
          ].map((v, i) => (
            <div
              key={v}
              style={{
                ...mono,
                fontSize: 55,
                color: C.yellow,
                marginTop: 15,
                translate: `${Math.sin(t * 0.7 + i) * 12}px 0`,
              }}
            >
              {v}
            </div>
          ))}
          <div
            style={{
              marginTop: 115,
              borderTop: `2px solid ${C.blue}`,
              paddingTop: 30,
            }}
          >
            <div style={{ ...mono, fontSize: 128, color: "#95bfd8" }}>
              PROTECTION
            </div>
            <div style={{ fontSize: 44, marginTop: 20 }}>游戏用了哪些保护</div>
          </div>
        </div>
      </div>
      <div style={{ ...pos, inset: 0, opacity: p }}>
        <svg width={1920} height={1080}>
          <Stroke
            d="M110 435V690H1770"
            at={complex}
            color={C.blue}
            duration={1.5}
          />
          {Array.from({ length: 40 }, (_, i) => (
            <path
              key={i}
              d={`M${110 + i * 43} 690v${i % 5 === 0 ? 38 : 14}`}
              stroke={C.blue}
              opacity={0.4}
            />
          ))}
        </svg>
        {["Denuvo", "Steam", "VMProtect", "Custom"].map((v, i) => (
          <div
            key={v}
            style={{
              ...pos,
              left: 120 + i * 430,
              top: 500,
              ...mono,
              fontSize: 50,
              color: i === 3 ? C.yellow : C.white,
              opacity: lerp(t, complex + i * 0.65, complex + 0.5 + i * 0.65),
              translate: `${lerp(t, complex + i * 0.65, complex + 0.8 + i * 0.65, 180, 0)}px 0`,
            }}
          >
            <span style={{ fontSize: 23, color: C.blue }}>0{i + 1} /</span>
            <div style={{ marginTop: 28 }}>{v}</div>
          </div>
        ))}
      </div>
    </Stage>
  );
};

export const ProtectionLists = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    newer = say(timing, 70),
    terms = say(timing, 70, "变成了"),
    custom = say(timing, 71);
  const p = lerp(t, newer, newer + 0.7),
    focus = lerp(t, custom - 0.2, custom + 0.5);
  const list = ["Denuvo", "Steam", "VMProtect", "Custom"];
  return (
    <Stage
      light={p < 0.95}
      label="PROTECTION / 从一份发行到下一份"
      source="NFO｜V16、V14 · 并列组合示意；游戏画面｜用户提供的 CAPCOM 预告"
    >
      <div style={{ ...pos, inset: 0, opacity: 0.4 * (1 - p) }}>
        <Still src="v38/act3/motion/nfs-road.png" dim={0.2} />
      </div>
      <div style={{ ...pos, inset: 0, opacity: 1 - p }}>
        <Grid tilt />
      </div>
      <div
        style={{ ...pos, inset: 0, clipPath: `inset(0 0 0 ${(1 - p) * 100}%)` }}
      >
        <Clip
          src="v38/act3/motion/pragmata-character.mp4"
          at={newer}
          duration={2.4}
          dim={0}
        />
        <Clip
          src="v38/act3/motion/pragmata-action.mp4"
          at={newer + 2.4}
          duration={6.9}
          dim={0}
        />
        <div
          style={{
            ...pos,
            inset: 0,
            background:
              "linear-gradient(0deg,#040b14f0 0%,#040b14cf 26%,#040b1410 58%,#040b1438),linear-gradient(90deg,#040b1470,transparent 65%)",
          }}
        />
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 160,
          fontSize: 62,
          opacity: 1 - p,
          translate: `0 ${-p * 150}px`,
        }}
      >
        极品飞车：热力追踪 重制版
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 160,
          color: C.white,
          opacity: p,
          translate: `0 ${(1 - p) * 140}px`,
          textShadow: "0 3px 24px #000b",
        }}
      >
        <div style={{ ...mono, fontSize: 98 }}>PRAGMATA</div>
        <div style={{ fontSize: 36, color: "#cedbe5", marginTop: 20 }}>
          识质存在
        </div>
      </div>
      <div
        style={{
          ...pos,
          right: 100,
          top: 65,
          ...mono,
          fontSize: 24,
          color: C.yellow,
          opacity: p,
        }}
      >
        2026.05 / NFO
      </div>
      <div
        style={{
          ...pos,
          left: 110,
          top: 400 + p * 255,
          ...mono,
          opacity: 1 - focus,
          fontSize: 105 - p * 59,
          color: p > 0.5 ? "#a8cee5" : "#35546d",
          textShadow: p > 0.5 ? "0 2px 15px #000" : undefined,
        }}
      >
        Denuvo
        <span
          style={{
            display: "inline-block",
            marginLeft: 70,
            opacity: 1 - p,
            translate: `0 ${-p * 220}px`,
            color: C.ink,
          }}
        >
          + EA
        </span>
      </div>
      <div style={{ ...pos, inset: 0, opacity: p }}>
        <svg width={1920} height={1080} style={{ opacity: 1 - focus * 0.85 }}>
          <path d="M110 730H1820" stroke="#a7c7df40" strokeWidth={2} />
          {list.map((_, i) => (
            <Stroke
              key={i}
              d={`M${120 + i * 430} 730v35h330`}
              at={terms + Math.max(0, i - 1) * 0.62}
              color={i === 3 ? C.yellow : "#a8cee5"}
            />
          ))}
        </svg>
        {list.map((word, i) =>
          i === 0 ? null : (
            <div
              key={word}
              style={{
                ...pos,
                left: 110 + i * 430 - focus * (i === 3 ? 900 : 650),
                top: 655,
                opacity:
                  lerp(
                    t,
                    terms + 0.45 + (i - 1) * 0.62,
                    terms + 0.9 + (i - 1) * 0.62,
                  ) * (i === 3 ? 1 : 1 - focus),
                ...mono,
                fontSize: 46,
                color: i === 3 ? C.yellow : C.white,
                transformOrigin: "left",
                scale: i === 3 ? 1 + focus * 0.8 : 1,
                translate: `0 ${lerp(t, terms + 0.45 + (i - 1) * 0.62, terms + 1.2 + (i - 1) * 0.62, -100, 0)}px`,
                textShadow: "0 2px 15px #000",
              }}
            >
              + {word}
            </div>
          ),
        )}
      </div>
      <div
        style={{
          ...pos,
          left: 1000,
          top: 655,
          fontSize: 57,
          color: C.yellow,
          opacity: focus,
          translate: `${(1 - focus) * 250}px 0`,
          textShadow: "0 2px 15px #000",
        }}
      >
        厂商自己的保护
      </div>
      <div style={{ ...pos, inset: 0, opacity: 1 - p }}>
        <DateRail
          from="2025.11 / 2 项"
          to="2026.05 / 4 项"
          progress={ramp(t, newer, custom + 0.5)}
        />
      </div>
    </Stage>
  );
};
