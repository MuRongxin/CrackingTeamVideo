import { C, F } from "../style";
import { NameCursor, lerp, useTime } from "../components";
import type { ShotTiming } from "../timing";
import { FilmScene } from "../act2/film-shared";
import { say } from "./timing";

export const Thanks = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const entry = say(timing, 73);
  const name = say(timing, 73, "anadius");
  const emulator = say(timing, 74);
  const scroll = lerp(t, entry, entry + 0.8);
  return (
    <FilmScene
      title="NFO 里，还写着别人的名字"
      right="GREETINGS / V16"
      source="当事人致谢｜V16｜2025-11-18 · 原文重排"
    >
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 200,
          width: 1640,
          height: 620,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: F.mono,
            translate: `0 ${-scroll * 500}px`,
            opacity: 1 - scroll,
          }}
        >
          <div style={{ fontSize: 49, color: C.gray }}>PROTECTION</div>
          <div style={{ fontSize: 101, color: C.blue, marginTop: 70 }}>
            Denuvo + EA
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 500,
            translate: `0 ${-scroll * 500}px`,
          }}
        >
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 36,
              color: C.gray,
              letterSpacing: 6,
            }}
          >
            GREETINGS TO
          </div>
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 157,
              marginTop: 30,
              color: C.white,
              opacity: lerp(t, entry + 0.3, entry + 0.7),
              translate: `${lerp(t, entry + 0.3, entry + 1, 180, 0)}px 0`,
            }}
          >
            anadius
          </div>
          <div
            style={{
              height: 3,
              width: lerp(t, name - 0.1, name + 0.65, 0, 1110),
              background: C.yellow,
              marginTop: 20,
            }}
          />
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 48,
              lineHeight: 1.4,
              color: C.gray,
              marginTop: 38,
              opacity: lerp(t, entry + 2, entry + 2.5),
            }}
          >
            for his awesome EA emulator
            <br />
            used in this release.
          </div>
          <div
            style={{
              fontSize: 41,
              color: C.yellow,
              marginTop: 30,
              opacity: lerp(t, emulator + 0.6, emulator + 1.1),
            }}
          >
            本次发行使用的 EA 模拟器
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 140,
          top: 690,
          opacity: lerp(t, emulator + 0.7, emulator + 1.2),
        }}
      >
        <NameCursor size={46} />
      </div>
    </FilmScene>
  );
};
export const SharedTool = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const author = say(timing, 76);
  const other = say(timing, 77);
  const join = say(timing, 78);
  const p = lerp(t, join, join + 1.1);
  const left = 180 + p * 160,
    right = 1110 - p * 105;
  return (
    <FilmScene
      title="被采用的工具，功劳写得很清楚"
      right="组件关系示意"
      source="依据 V16 致谢｜EA 模拟器由 anadius 提供；Denuvo 工作另列"
    >
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 190,
          fontSize: 55,
          color: C.white,
          opacity: 1 - p,
        }}
      >
        EA 平台那一层的验证环境
      </div>
      <div
        style={{
          position: "absolute",
          left: 230,
          top: 285,
          fontFamily: F.mono,
          fontSize: 73,
          color: C.white,
          opacity: lerp(t, author, author + 0.4),
          translate: `0 ${lerp(t, author, author + 0.7, 60, 0)}px`,
        }}
      >
        anadius
      </div>
      <div
        style={{
          position: "absolute",
          left: 1160,
          top: 285,
          opacity: lerp(t, other, other + 0.4),
        }}
      >
        <NameCursor size={73} />
      </div>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d={`M430 380L${left + 310} 470`}
          stroke={C.blue}
          strokeWidth={3}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - lerp(t, author + 0.3, author + 0.9)}
          fill="none"
        />
        <path
          d={`M1450 380L${right + 310} 470`}
          stroke={C.yellow}
          strokeWidth={3}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - lerp(t, other + 0.3, other + 0.9)}
          fill="none"
        />
      </svg>
      {[
        {
          x: left,
          color: C.blue,
          title: "EA emulator",
          text: "EA 平台验证模拟器",
          at: 0.1,
        },
        {
          x: right,
          color: C.yellow,
          title: "Denuvo",
          text: "voices38 的工作",
          at: other,
        },
      ].map((m, i) => (
        <div
          key={m.title}
          style={{
            position: "absolute",
            left: m.x,
            top: 470,
            width: 620,
            height: 260,
            background: i ? "#24271a" : "#142229",
            borderTop: `6px solid ${m.color}`,
            boxShadow: `${-12 + i * 24}px 18px 0 #0006,0 30px 70px #0007`,
            padding: 40,
            opacity: lerp(t, m.at, m.at + 0.5),
            translate: `0 ${lerp(t, m.at, m.at + 0.7, 160, 0)}px`,
          }}
        >
          <div style={{ fontFamily: F.mono, fontSize: 57, color: m.color }}>
            {m.title}
          </div>
          <div style={{ fontSize: 37, marginTop: 30 }}>{m.text}</div>
          <div
            style={{
              height: 2,
              marginTop: 38,
              background: m.color,
              width: lerp(t, m.at + 0.3, m.at + 1.3, 0, 490),
            }}
          />
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 340,
          top: 195,
          fontFamily: F.mono,
          fontSize: 43,
          color: C.white,
          opacity: p,
          translate: `0 ${(1 - p) * -100}px`,
        }}
      >
        Need.For.Speed.Hot.Pursuit.Remastered
      </div>
      <div
        style={{
          position: "absolute",
          left: 340,
          top: 755,
          width: 1285,
          height: 40,
          border: `2px solid ${C.gray}`,
          borderTop: 0,
          opacity: p,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 340,
          top: 803,
          width: 1285,
          fontSize: 28,
          color: C.gray,
          textAlign: "center",
          opacity: p,
        }}
      >
        分别贡献 · 共同组成这次发行
      </div>
    </FilmScene>
  );
};
