import { C, F } from "../style";
import { useTime, lerp, NameCursor } from "../components";
import type { ShotTiming } from "../timing";
import { A3Scene, Header, Reveal, AccentLine } from "./shared";
import { say } from "./timing";

export const Thanks = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const thanks = say(timing, 73);
  const name = say(timing, 73, "anadius");
  const tool = say(timing, 74);
  const scroll = lerp(t, thanks, thanks + 0.8);
  return (
    <A3Scene source="当事人致谢｜V16｜2025-11-18 · 据 NFO 文本存档重排">
      <Header title="发行说明里，还写着别人的名字" right="GREETINGS" />
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 270,
          width: 1640,
          height: 555,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            translate: `0 ${-220 * scroll}px`,
            opacity: 1 - scroll,
            fontFamily: F.mono,
          }}
        >
          <div style={{ fontSize: 28, color: C.gray }}>PROTECTION</div>
          <div style={{ fontSize: 61, color: C.blue, marginTop: 24 }}>
            Denuvo + EA
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            translate: `0 ${220 * (1 - scroll)}px`,
            opacity: scroll,
          }}
        >
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 28,
              color: C.gray,
              letterSpacing: 5,
            }}
          >
            GREETINGS TO
          </div>
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 124,
              lineHeight: 1.2,
              marginTop: 16,
              letterSpacing: -6,
              color: C.white,
            }}
          >
            anadius
            <span style={{ color: C.yellow, opacity: t % 1 < 0.5 ? 1 : 0 }}>
              ▮
            </span>
          </div>
          <div
            style={{
              height: 2,
              width: lerp(t, name, name + 0.7, 0, 1040),
              background: C.yellow,
              marginTop: 20,
            }}
          />
          <Reveal
            at={tool - 0.15}
            style={{
              fontFamily: F.mono,
              fontSize: 38,
              lineHeight: 1.45,
              marginTop: 35,
              color: C.gray,
            }}
          >
            “for his awesome EA emulator
            <br />
            used in this release.”
          </Reveal>
          <Reveal at={tool + 0.8} style={{ fontSize: 51, marginTop: 25 }}>
            本次发行使用了他的 EA 模拟器。
          </Reveal>
        </div>
      </div>
      <div style={{ position: "absolute", right: 140, top: 167, opacity: 0.6 }}>
        <NameCursor size={27} />
      </div>
    </A3Scene>
  );
};

export const SharedTool = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const credit = say(timing, 76);
  const other = say(timing, 77);
  const join = say(timing, 78);
  const p = lerp(t, join, join + 1);
  return (
    <A3Scene source="组件关系示意｜依据 V16 致谢 · EA 模拟器由 anadius 提供">
      <Header
        title="一个人的工具，成为另一次发行的组成部分"
        right="CREDIT / COMPONENT"
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.16,
          backgroundImage: "radial-gradient(#6e8aa6 1px,transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "linear-gradient(transparent 20%,black 45%,transparent 80%)",
        }}
      />
      <Reveal
        at={0}
        style={{
          position: "absolute",
          left: 230,
          top: 270,
          fontFamily: F.mono,
          fontSize: 62,
        }}
      >
        anadius
      </Reveal>
      <Reveal
        at={other - 0.5}
        style={{ position: "absolute", left: 1230, top: 270 }}
      >
        <NameCursor size={62} />
      </Reveal>
      <AccentLine x1={430} y1={360} x2={525 + p * 185} y2={455} at={0.5} />
      <AccentLine x1={1450} y1={360} x2={1395 - p * 65} y2={455} at={other} />
      <div
        style={{
          position: "absolute",
          left: 220 + p * 185,
          top: 455,
          width: 610,
          height: 230,
          border: `1px solid ${C.blue}`,
          background: "#111b1f",
          padding: 38,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 34, color: C.blue }}>
          EA emulator
        </div>
        <div style={{ fontSize: 44, marginTop: 25 }}>EA 平台验证环境</div>
        <div
          style={{
            fontSize: 25,
            color: C.gray,
            marginTop: 15,
            opacity: lerp(t, credit, credit + 0.4),
          }}
        >
          anadius 的作品
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1090 - p * 65,
          top: 455,
          width: 610,
          height: 230,
          border: `1px solid ${C.yellow}`,
          background: "#1d2015",
          padding: 38,
          opacity: lerp(t, other, other + 0.5),
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 34, color: C.yellow }}>
          Denuvo
        </div>
        <div style={{ fontSize: 44, marginTop: 25 }}>voices38 的工作</div>
        <div style={{ fontSize: 25, color: C.gray, marginTop: 15 }}>
          分别标明贡献
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 405,
          top: 700,
          width: 1230,
          height: 38,
          border: `1px solid ${C.gray}`,
          borderTop: 0,
          opacity: p,
        }}
      />
      <Reveal
        at={join + 0.5}
        style={{
          position: "absolute",
          left: 405,
          top: 763,
          width: 1230,
          textAlign: "center",
          fontSize: 34,
          color: C.white,
        }}
      >
        被采用的组件 <span style={{ color: C.gray, margin: "0 25px" }}>→</span>{" "}
        本次发行
      </Reveal>
      <div style={{ opacity: 1 - p }}>
        <Reveal
          at={credit}
          style={{
            position: "absolute",
            left: 220,
            top: 745,
            fontSize: 29,
            color: C.gray,
          }}
        >
          提供组件／在 NFO 中致谢
        </Reveal>
      </div>
    </A3Scene>
  );
};
