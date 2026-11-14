import { AbsoluteFill } from "remotion";
import { C } from "../style";
import { useTime, lerp } from "../components";
import type { ShotTiming } from "../timing";
import { GroupMark } from "../act6/Picture";
import { say } from "./timing";
import {
  Stage,
  Footage,
  Darken,
  Kicker,
  SourceImage,
  pos,
  mono,
} from "./Stage";

export const TechnicalClaim = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    model = say(timing, 199),
    vm = say(timing, 199, "Denuvo"),
    comment = say(timing, 200),
    p = lerp(t, model - 0.2, model + 0.65),
    out = lerp(t, comment - 0.1, comment + 0.6);
  return (
    <Stage
      name="A7-04 · KiriGiri 的解释"
      source={
        t < comment
          ? "KiriGiri 的技术解释 · 游民星空转述"
          : ""
      }
    >
      <Footage name="requiem-mechanism" />
      <Darken />
      <AbsoluteFill style={{ background: "#071119", opacity: 0.65 }} />
      <Kicker>
        {t < comment ? "KiriGiri / TECHNICAL CLAIM" : "NARRATOR / 旁白解读"}
      </Kicker>
      <GroupMark
        name="denuvowo"
        width={390}
        style={{ ...pos, left: 1430, top: 30, opacity: 1 - out }}
      />
      <div
        style={{
          ...pos,
          left: 100,
          top: 220,
          width: 1700,
          opacity: 1 - p,
          translate: `0px ${-p * 200}px`,
          transform: `rotateX(${-p * 35}deg)`,
        }}
      >
        <div style={{ fontSize: 87, marginBottom: 35 }}>“并没有被移除。”</div>
        <div
          style={{
            background: "#f0f0f0",
            padding: 22,
            boxShadow: "0 30px 70px #000a",
          }}
        >
          <SourceImage
            name="kirigiri-technical.png"
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div
        style={{ ...pos, inset: 0, opacity: p * (1 - out), perspective: 1800 }}
      >
        <div
          style={{
            ...pos,
            left: 100,
            top: 260,
            width: 640,
            transform: `translateX(${(1 - p) * -150}px)`,
          }}
        >
          <div style={{ fontSize: 65, lineHeight: 1.4 }}>
            许可证
            <br />
            哈希验证
          </div>
          <div style={{ marginTop: 30, fontSize: 31, color: C.yellow }}>
            按其说法：被处理
          </div>
          <svg width="650" height="170" style={{ marginTop: 10 }}>
            <path
              d="M0 80H560L535 55M560 80L535 105"
              fill="none"
              stroke={C.yellow}
              strokeWidth="3"
            />
            <circle
              cx={((t - model) * 170) % 550}
              cy="80"
              r="7"
              fill={C.yellow}
            />
          </svg>
        </div>
        <div
          style={{
            ...pos,
            left: 820,
            top: 245,
            width: 900,
            height: 490,
            transform: `rotateY(${-16 + p * 7}deg) rotateX(8deg)`,
            border: "2px solid #86a9bb",
            background: "#0c1b26e8",
            boxShadow: "18px 20px 0 #142d3c,40px 50px 100px #000b",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              ...pos,
              left: 40,
              top: 35,
              ...mono,
              fontSize: 28,
              color: "#adc3cf",
            }}
          >
            GAME / 技术示意
          </div>
          <div
            style={{
              ...pos,
              left: 100,
              top: 150,
              width: 690,
              height: 220,
              border: "3px solid #84d5d5",
              background: "#10313a",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ ...mono, fontSize: 70 }}>DENUVO VM</div>
            <div
              style={{
                fontSize: 35,
                marginTop: 20,
                color: "#96e0de",
                opacity: lerp(t, vm, vm + 0.4),
              }}
            >
              仍在运行
            </div>
            <svg width="690" height="220" style={{ ...pos, inset: 0 }}>
              <path
                d="M15 15H675V205H15Z"
                pathLength="100"
                fill="none"
                stroke="#9fe7e4"
                strokeWidth="4"
                strokeDasharray="4 96"
                strokeDashoffset={-t * 24}
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 265,
          right: 100,
          opacity: out,
          translate: `0px ${(1 - out) * 90}px`,
        }}
      >
        <div style={{ fontSize: 100, color: C.yellow }}>两条路线，</div>
        <div style={{ fontSize: 100, marginTop: 20 }}>有没有更彻底？</div>
        <div style={{ marginTop: 65, fontSize: 32, color: "#b4c1cc" }}>
          这是文稿对这番话的解读。
        </div>
      </div>
    </Stage>
  );
};

export const MafiaClaim = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    claim = say(timing, 201, "voices38"),
    both = say(timing, 203),
    p = lerp(t, both, both + 0.7);
  return (
    <Stage
      name="A7-05 · DSOGaming 的说法"
      source="DSOGaming · 2026-05-22 · 游戏画面：2K"
    >
      <Footage name="mafia-report" />
      <Darken />
      <AbsoluteFill
        style={{
          background: "linear-gradient(90deg,#071017e6,transparent 90%)",
        }}
      />
      <Kicker>DSOGaming / 2026.05.22</Kicker>
      <div
        style={{
          ...pos,
          left: 100,
          top: 185,
          fontSize: 62,
          translate: `${-p * 60}px 0`,
          opacity: 1 - p,
        }}
      >
        四海兄弟：故乡
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 300,
          ...mono,
          fontSize: 180,
          color: C.yellow,
          opacity: lerp(t, claim - 0.3, claim + 0.4),
          translate: `${(1 - lerp(t, claim - 0.3, claim + 0.4)) * 160}px ${-p * 65}px`,
          letterSpacing: -7,
        }}
      >
        BYPASS
      </div>
      <div
        style={{
          ...pos,
          left: 105,
          top: 520,
          fontSize: 42,
          opacity: lerp(t, claim, claim + 0.6) * (1 - p),
        }}
      >
        绕过，仍在后台运行。
      </div>
      <div
        style={{
          ...pos,
          left: 105,
          top: 635,
          width: 1200,
          ...mono,
          fontSize: 27,
          lineHeight: 1.6,
          opacity: lerp(t, claim + 0.1, claim + 0.5) * (1 - p),
        }}
      >
        “this crack is also bypassing Denuvo.
        <br />
        It does not completely remove it.”
      </div>
      <div
        style={{
          ...pos,
          left: 100,
          top: 495,
          display: "flex",
          gap: 85,
          alignItems: "center",
          opacity: p,
          translate: `0px ${(1 - p) * 100}px`,
        }}
      >
        <div style={{ width: 650 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 35 }}>
            <div
              style={{
                position: "relative",
                width: 160,
                height: 160,
                borderRadius: "50%",
                overflow: "hidden",
                background: "white",
                flexShrink: 0,
              }}
            >
              <SourceImage
                name="empress-channel.png"
                style={{ position: "absolute", width: 1978, left: -33, top: 0 }}
              />
            </div>
            <div style={{ ...mono, fontSize: 78 }}>EMPRESS</div>
          </div>
          <div style={{ fontSize: 25, marginTop: 20, color: "#d5dcd8" }}>
            EMPRESS · 官方频道署名
          </div>
        </div>
        <div style={{ fontSize: 60, color: C.yellow }}>+</div>
        <GroupMark name="voices38" width={640} />
      </div>
      <div style={{ ...pos, left: 100, top: 750, fontSize: 33, opacity: p }}>
        该媒体把两者的 Denuvo 破解都归为绕过。
      </div>
    </Stage>
  );
};

export { OpenQuestion } from "./OpenQuestion";
