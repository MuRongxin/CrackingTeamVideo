import { publicAsset } from "../assets";
import { Img, interpolate } from "remotion";
import { C, F } from "../style";
import { NameCursor, clamp, lerp, useTime } from "../components";
import type { ShotTiming } from "../timing";
import { Act1Kicker, Act1Scene, Act1Source } from "./shared";
import { voiceCue } from "./cues";

const nfo = publicAsset("v38/evidence/nfo-sheet.png");
const fix = publicAsset("v38/evidence/fix-sheet.png");
const notes = publicAsset("v38/act3/nfo/proper-notes.png");
const hardware = publicAsset("v38/evidence/hardware-first-person.png");
const pixel = { imageRendering: "pixelated" as const, display: "block" };

const PostSheet = () => (
  <div
    style={{
      width: 1590,
      height: 560,
      background: "#ede8de",
      color: C.ink,
      padding: "45px 65px",
      boxShadow: "0 35px 75px #0008",
    }}
  >
    <div
      style={{
        fontFamily: F.mono,
        fontSize: 25,
        color: "#6c736d",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>r/CrackWatch</span>
      <span>2026.04.27</span>
    </div>
    <div
      style={{
        fontFamily: F.mono,
        fontSize: 78,
        lineHeight: 1.25,
        marginTop: 52,
      }}
    >
      Bl4ck-Myth-Wuk0ng-
      <br />
      <span style={{ color: C.red }}>voices38</span>
    </div>
    <div style={{ height: 2, background: "#16213a22", marginTop: 42 }} />
    <div style={{ fontSize: 27, color: "#7b7e74", marginTop: 23 }}>
      社区帖子原题 · 据文本存档重排
    </div>
  </div>
);

export const Evidence = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const camera = interpolate(
    t,
    [0, 1.45, 2.0, 3.25, 3.8, timing.duration],
    [0, 45, 1920, 1960, 3840, 3900],
    clamp,
  );
  const phase = t < 1.8 ? 0 : t < 3.55 ? 1 : 2;
  return (
    <Act1Scene>
      <Act1Kicker right="公开留下的原始材料">09 / THE PUBLIC TRAIL</Act1Kicker>
      <div
        style={{ position: "absolute", inset: 0, translate: `${-camera}px 0` }}
      >
        <div style={{ position: "absolute", left: 130, top: 165, width: 1660 }}>
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 26,
              color: C.gray,
              marginBottom: 36,
            }}
          >
            Dead.Space.Remake.PROPER-voices38.nfo
          </div>
          <Img
            src={nfo}
            style={{
              ...pixel,
              width: 1280,
              height: 628,
              background: "#090b09",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 1370,
              top: 120,
              fontFamily: F.mono,
              fontSize: 92,
              color: C.yellow,
            }}
          >
            NFO
          </div>
          <div
            style={{
              position: "absolute",
              left: 1370,
              top: 265,
              fontSize: 34,
              lineHeight: 1.6,
              color: C.gray,
            }}
          >
            随发行
            <br />
            留下的文件
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 600,
              width: lerp(t, 0.4, 1.3, 0, 1280),
              height: 3,
              background: C.yellow,
              boxShadow: "0 0 25px #ffc83d55",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 1920 + 160,
            top: 205,
            rotate: `${lerp(t, 1.55, 2.25, 2, -0.5)}deg`,
          }}
        >
          <PostSheet />
        </div>
        <div style={{ position: "absolute", left: 3840 + 130, top: 190 }}>
          <div style={{ fontFamily: F.mono, fontSize: 26, color: C.gray }}>
            2026.01.11 / RELEASE NOTES
          </div>
          <div style={{ fontSize: 74, color: C.yellow, marginTop: 36 }}>
            他自己的发行说明
          </div>
          <div
            style={{
              width: 1704,
              height: 340,
              overflow: "hidden",
              marginTop: 55,
            }}
          >
            <Img
              src={notes}
              style={{
                ...pixel,
                width: 1704,
                height: 312,
                translate: `0 ${lerp(t, 3.8, 5.6, 25, -8)}px`,
              }}
            />
          </div>
          <div
            style={{
              width: lerp(t, 4.15, 4.8, 0, 1000),
              height: 3,
              background: C.yellow,
              marginTop: 18,
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 130,
          right: 130,
          top: 834,
          height: 1,
          background: "#6e8aa633",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `${Math.min(1, t / timing.duration) * 96}%`,
            top: -4,
            width: 48,
            height: 7,
            background: C.yellow,
          }}
        />
      </div>
      <Act1Source>
        {
          [
            "voices38《死亡空间》发行说明",
            "Reddit · r/CrackWatch 发布帖",
            "voices38《死亡空间》PROPER 发行说明",
          ][phase]
        }
      </Act1Source>
    </Act1Scene>
  );
};

export const Unknown = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const through = voiceCue(timing, 9, "但通过");
  const doing = voiceCue(timing, 9, "我们能看出来");
  const investigate = lerp(t, through, doing + 0.5);
  const focus = lerp(t, doing, doing + 1.25);
  return (
    <Act1Scene>
      <Act1Kicker right="读文件，能看到什么？">
        10 / THE PUBLIC TRAIL
      </Act1Kicker>
      <div
        style={{
          position: "absolute",
          inset: 0,
          translate: `${-investigate * 30}px ${-focus * 70}px`,
          scale: 1 + focus * 0.08,
          transformOrigin: "0% 45%",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 130,
            top: 230,
            rotate: "-1deg",
            boxShadow: "0 30px 80px #0008",
            background: "#080a08",
          }}
        >
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 29,
              color: C.gray,
              marginBottom: 35,
            }}
          >
            2026.01.11 / PROPER
          </div>
          <Img
            src={publicAsset("v38/act3/nfo/proper-fields.png")}
            style={{ ...pixel, width: 1136, height: 184 }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 1090,
            top: 210,
            width: 630,
            height: 490,
            rotate: `${lerp(t, through, through + 0.8, 7, 3)}deg`,
            translate: `${lerp(t, through, through + 0.9, 350, 0)}px 0`,
            opacity: lerp(t, through - 0.2, through + 0.3),
            overflow: "hidden",
            boxShadow: "0 25px 65px #0008",
          }}
        >
          <Img
            src={publicAsset("v38/evidence/fix-fields.png")}
            style={{
              ...pixel,
              width: 1136,
              height: 184,
              background: "#080a08",
              marginTop: 55,
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 1460,
            top: 270,
            opacity: 1 - investigate,
            translate: `${investigate * 230}px 0`,
            fontSize: 43,
            color: C.gray,
          }}
        >
          真实身份
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 142,
              color: C.yellow,
              marginTop: 35,
            }}
          >
            ?
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 525,
            top: 520,
            width: 1030,
            background: "#0a0c0b",
            boxShadow: "0 20px 60px #0009",
            padding: "28px 30px",
            opacity: lerp(t, doing - 0.3, doing + 0.2),
            translate: `0 ${lerp(t, doing - 0.3, doing + 0.7, 230, 0)}px`,
            rotate: "1deg",
          }}
        >
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 23,
              color: C.yellow,
              marginBottom: 22,
            }}
          >
            PROPER NOTES
          </div>
          <Img src={notes} style={{ ...pixel, width: 1136, height: 208 }} />
        </div>
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", inset: 0 }}
        >
          <path
            d="M525 370L905 370"
            stroke={C.yellow}
            strokeWidth={4}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - lerp(t, through, through + 0.6)}
          />
          <path
            d="M1400 390L1650 405"
            stroke={C.yellow}
            strokeWidth={3}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - lerp(t, through + 0.6, doing + 0.2)}
          />
        </svg>
      </div>
      <Act1Source>
        voices38《死亡空间》发行说明
      </Act1Source>
    </Act1Scene>
  );
};

export const Pronoun = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const person = voiceCue(timing, 10, "voices38 一直");
  const call = voiceCue(timing, 10, "我们也用");
  const question = timing.voices[1].start;
  const court = lerp(t, question - 0.1, question + 0.7);
  const second = lerp(t, person + 0.7, person + 1.25);
  const unknown = voiceCue(timing, 11, "是一个人");
  return (
    <Act1Scene>
      <Act1Kicker
        right={court > 0.5 ? "起诉书仍只有这个化名" : "在原文里读他的自述"}
      >
        11 / VOICES38
      </Act1Kicker>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 1 - court,
          translate: `${-court * 600}px 0`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 130,
            top: 165,
            fontFamily: F.mono,
            fontSize: 32,
            color: C.gray,
          }}
        >
          Dead.Space.Remake.PROPER-voices38.nfo
        </div>
        <div
          style={{
            position: "absolute",
            left: 100,
            top: 290,
            width: 1720,
            height: 450,
            overflow: "hidden",
          }}
        >
          <Img
            src={notes}
            style={{
              ...pixel,
              width: 2272,
              height: 416,
              translate: `${lerp(t, 0, person + 1.3, 0, -60)}px 0`,
              opacity: 1 - second * 0.65,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 750,
              right: 0,
              top: 280,
              height: 150,
              background: "#080b08",
              opacity: second,
              translate: `0 ${(1 - second) * 200}px`,
              overflow: "hidden",
            }}
          >
            <Img
              src={hardware}
              style={{
                ...pixel,
                width: 816,
                height: 78,
                translate: `${lerp(t, person + 0.7, person + 1.7, 150, 0)}px 25px`,
              }}
            />
          </div>
        </div>
        <svg
          width={1920}
          height={1080}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <path
            d="M557 300Q542 293 542 320Q545 355 584 343Q600 313 571 301Z"
            fill="none"
            stroke={C.yellow}
            strokeWidth={3}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - lerp(t, person - 0.15, person + 0.3)}
            opacity={1 - second}
          />
          <path
            d="M850 690H1670"
            fill="none"
            stroke={C.yellow}
            strokeWidth={3}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - lerp(t, person + 1.2, person + 2)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 130,
            top: 780,
            fontSize: 35,
            color: C.gray,
            opacity: lerp(t, call - 0.2, call + 0.2),
          }}
        >
          旁白中的称呼：
          <span style={{ color: C.yellow, marginLeft: 16 }}>“他”</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 165,
          width: 1640,
          height: 650,
          background: "#f3efe4",
          boxShadow: "0 30px 90px #0009",
          color: C.ink,
          opacity: court,
          translate: `${(1 - court) * 1700}px ${50 * (1 - court)}px`,
          rotate: `${(1 - court) * 4}deg`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 65,
            top: 44,
            fontFamily: F.mono,
            fontSize: 23,
            color: C.blue,
          }}
        >
          COMPLAINT / 2026.09.14
        </div>
        <Img
          src={publicAsset("v38/court/defendant.png")}
          style={{
            position: "absolute",
            left: 65,
            top: 160,
            width: 1490,
            display: "block",
            mixBlendMode: "multiply",
          }}
        />
        <svg
          width={1640}
          height={650}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <path
            d="M480 284L1495 284"
            fill="none"
            stroke={C.red}
            strokeWidth={4}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - lerp(t, unknown - 0.15, unknown + 0.8)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            left: 65,
            top: 562,
            fontSize: 41,
            color: C.red,
            opacity: lerp(t, unknown + 0.1, unknown + 0.55),
          }}
        >
          一个人，还是一个团队？
        </div>
      </div>
      <Act1Source>
        {court > 0.5
          ? "Denuvo 起诉书 · 被告身份描述"
          : "voices38《死亡空间》PROPER 发行说明"}
      </Act1Source>
    </Act1Scene>
  );
};
