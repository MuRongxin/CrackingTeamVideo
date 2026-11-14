import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";
import { C, F } from "../style";
import {
  Scene,
  SourceTag,
  NameCursor,
  Eyebrow,
  Rule,
  useTime,
  lerp,
  clamp,
} from "../components";
import { Paper, TerminalPanel, Topline, Cursor } from "./shared";
import { SalesCurve } from "./Protection";
import type { ShotTiming } from "../timing";
export const CommercialWindow = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const focus = timing.voices[1].start;
  const shift = timing.voices[2].start;
  return (
    <Scene paper>
      <Topline label="保护的商业价值" right="首发窗口" paper />
      <SalesCurve progress={lerp(t, 0.5, 3)} />
      <div
        style={{
          position: "absolute",
          left: 330,
          top: 370,
          fontSize: 58,
          color: C.blue,
          opacity: lerp(t, focus, focus + 0.5),
        }}
      >
        首发窗口
      </div>
      <div style={{ position: "absolute", left: 185, top: 770, fontSize: 30 }}>
        发售日
      </div>
      <div
        style={{
          position: "absolute",
          left: 800,
          top: 310,
          fontSize: 58,
          lineHeight: 1.5,
          opacity: lerp(t, 0.4, 1) * (1 - lerp(t, shift, shift + 0.5)),
        }}
      >
        不必永远挡住
        <br />
        尽可能把出现时间往后推
      </div>
      <div
        style={{
          position: "absolute",
          left: lerp(t, shift, shift + 3, 500, 1320),
          top: 610,
          opacity: lerp(t, shift, shift + 0.4),
        }}
      >
        <div style={{ fontSize: 29, color: C.red, marginBottom: 15 }}>
          破解出现
        </div>
        <div
          style={{ height: 118, width: 3, background: C.red, margin: "0 auto" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          right: 140,
          top: 815,
          fontSize: 24,
          color: C.gray,
        }}
      >
        示意曲线，不代表实际数据
      </div>
    </Scene>
  );
};
export const FiveDays = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const at = timing.voices[1].start;
  return (
    <Scene paper>
      <Topline label="生化危机 7" right="2017 / 时间对照" paper />
      <div
        style={{
          position: "absolute",
          left: 170,
          top: 270,
          fontFamily: F.mono,
          fontSize: 58,
        }}
      >
        2017.01.24 <span style={{ fontFamily: F.cn, fontSize: 44 }}>发售</span>
      </div>
      <div style={{ position: "absolute", left: 170, right: 170, top: 390 }}>
        <Rule color={C.blue} progress={lerp(t, at - 0.2, at + 1.5)} />
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 170 + (i - 1) * 315,
            top: 440,
            width: 260,
            height: 220,
            padding: 35,
            border: `2px solid ${C.blue}`,
            background: i === 5 ? C.ink : C.paper,
            color: i === 5 ? C.paper : C.ink,
            opacity: lerp(t, at + (i - 1) * 0.22, at + 0.2 + (i - 1) * 0.22),
            translate: `0 ${lerp(t, at + (i - 1) * 0.22, at + 0.45 + (i - 1) * 0.22, 40, 0)}px`,
          }}
        >
          <div style={{ fontFamily: F.mono, fontSize: 85 }}>{i}</div>
          <div style={{ fontFamily: F.mono, fontSize: 32, marginTop: 15 }}>
            {i === 5 ? "CPY" : "DAY"}
          </div>
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 170,
          top: 735,
          fontSize: 47,
          color: C.blue,
          opacity: lerp(t, at + 1.1, at + 1.5),
        }}
      >
        5 天后，Denuvo 保护被突破
      </div>
    </Scene>
  );
};
export const DenuvoResponse = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const compare = timing.voices[1].start,
    logic = timing.voices[2].start;
  const k = lerp(t, logic + 0.7, logic + 1.5);
  return (
    <Scene paper>
      <div style={{ opacity: 1 - k }}>
        <Paper
          style={{
            position: "absolute",
            left: 180,
            top: 170,
            width: 1560,
            height: 620,
            padding: "45px 60px",
            borderTop: `6px solid ${C.blue}`,
            rotate: `${-0.4 + t * 0.018}deg`,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: F.mono,
              fontSize: 26,
              color: C.blue,
            }}
          >
            Ars Technica <span>2017.02.06 · 标题与转述重排</span>
          </div>
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 36,
              lineHeight: 1.5,
              marginTop: 28,
            }}
          >
            Denuvo: Our cracked RE7 protection
            <br />
            is still better than nothing
          </div>
          <div style={{ fontSize: 26, color: C.gray, marginTop: 28 }}>
            Denuvo 市场总监回应，经报道转述
          </div>
          <div style={{ display: "flex", gap: 50, marginTop: 35 }}>
            <div
              style={{
                width: 650,
                padding: 30,
                background: "#16213a08",
                borderTop: `2px solid ${C.ink}`,
                opacity: 1 - lerp(t, compare, compare + 0.7) * 0.35,
              }}
            >
              <div style={{ fontSize: 34 }}>未经保护的游戏</div>
              <div style={{ fontSize: 55, marginTop: 23 }}>
                往往发售当天就被破解
              </div>
            </div>
            <div
              style={{
                width: 650,
                padding: 30,
                background: "#6e8aa61a",
                borderTop: `2px solid ${C.blue}`,
                opacity: lerp(t, compare, compare + 0.6),
              }}
            >
              <div style={{ fontSize: 34 }}>《生化危机 7》</div>
              <div style={{ fontSize: 55, marginTop: 23, color: C.blue }}>
                至少多撑了几天
              </div>
            </div>
          </div>
        </Paper>
      </div>
      <div style={{ opacity: k }}>
        <Topline
          label="Denuvo 的逻辑"
          right="尽可能延后 / 商业逻辑示意"
          paper
        />
        <div
          style={{ position: "absolute", left: 180, top: 270, fontSize: 75 }}
        >
          把破解出现的时间往后推
        </div>
        <div style={{ position: "absolute", left: 180, right: 180, top: 665 }}>
          <Rule color={C.blue} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 180,
            top: 710,
            fontSize: 32,
            color: C.gray,
          }}
        >
          游戏发售
        </div>
        <div
          style={{
            position: "absolute",
            left: lerp(t, logic + 1.4, timing.duration - 1, 460, 1380),
            top: 500,
          }}
        >
          <div style={{ fontSize: 44, color: C.blue, marginBottom: 30 }}>
            破解出现
          </div>
          <div
            style={{
              height: 130,
              width: 3,
              background: C.blue,
              margin: "auto",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 180,
            top: 420,
            fontSize: 42,
            color: C.gray,
          }}
        >
          不必永远挡住
        </div>
      </div>
      <SourceTag>Ars Technica · 2017-02-06</SourceTag>
    </Scene>
  );
};
export const QuietNews = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  return (
    <Scene paper>
      <Topline
        label="全面战争：三国"
        right="2019 首发 / 2025.10 新版发行"
        paper
      />
      <Paper
        style={{
          position: "absolute",
          left: 180,
          top: 255,
          width: 1080,
          height: 490,
          padding: 40,
          rotate: `${-0.7 + t * 0.04}deg`,
        }}
      >
        <Img
          src={staticFile("v38/act2/stills/three-kingdoms.jpg")}
          style={{
            width: 1000,
            height: 285,
            objectFit: "cover",
            filter: "saturate(.7)",
            scale: 1 + t * 0.001,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: F.mono,
            fontSize: 39,
            marginTop: 35,
          }}
        >
          2019 <span style={{ fontSize: 32, color: C.gray }}>六年后</span>{" "}
          2025.10
        </div>
      </Paper>
      <div style={{ position: "absolute", left: 1350, top: 320, width: 380 }}>
        <Eyebrow>新闻栏 / </Eyebrow>
        <div
          style={{
            fontSize: 41,
            borderTop: `2px solid ${C.ink}`,
            paddingTop: 30,
            lineHeight: 1.6,
          }}
        >
          老游戏
          <br />
          新的游戏版本
        </div>
        <div
          style={{
            height: 8,
            width: 250,
            background: "#16213a22",
            marginTop: 36,
          }}
        />
        <div
          style={{
            height: 8,
            width: 210,
            background: "#16213a22",
            marginTop: 20,
          }}
        />
      </div>
      <SourceTag>xREL 发行记录 · 2025-10-14</SourceTag>
    </Scene>
  );
};
export const WhyStarted = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const research = timing.voices[1].start;
  const third = research + 2.4;
  const phase = t < third ? (t < research ? 0 : 1) : 2;
  const cn = [
    "似乎已经少有人关心这件事",
    "花时间逆向研究 Denuvo",
    "研究前辈的工作",
  ];
  return (
    <Scene>
      <div style={{ position: "absolute", left: 140, top: 145 }}>
        <NameCursor size={52} />
      </div>
      <TerminalPanel
        title="iXBT · 2025-10-15 转述"
        style={{
          position: "absolute",
          left: 140,
          top: 240,
          width: 1640,
          height: 565,
          paddingBottom: 30,
        }}
      >
        <div style={{ padding: "55px 60px" }}>
          <div style={{ fontSize: 29, color: C.gray, marginBottom: 40 }}>
            当事人自述 · 中文概括
          </div>
          <div
            style={{
              fontSize: 72,
              color: C.yellow,
              lineHeight: 1.5,
              translate: `0 ${Math.sin(t * 0.5) * 3}px`,
            }}
          >
            {cn[phase]}
          </div>
          {phase === 1 && (
            <div
              style={{
                fontFamily: F.mono,
                fontSize: 40,
                marginTop: 50,
                color: C.white,
              }}
            >
              “I spent a lot of time reverse engineering Denuvo…”
            </div>
          )}
          {phase !== 1 && (
            <div style={{ display: "flex", gap: 15, marginTop: 80 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 165,
                    height: 3,
                    background: i === phase ? C.yellow : "#8a8f9844",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </TerminalPanel>
      <SourceTag>voices38 自述 · iXBT.games · 2025-10-15</SourceTag>
    </Scene>
  );
};
export const Retreat = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const farewell = timing.voices[1].start;
  const k = lerp(t, farewell - 0.2, farewell + 0.6);
  return (
    <Scene paper>
      <div style={{ opacity: 1 - k }}>
        <Paper
          style={{
            position: "absolute",
            left: 180,
            top: 180,
            width: 1560,
            height: 600,
            padding: "45px 60px",
            borderTop: `6px solid ${C.blue}`,
            rotate: `${-0.4 + t * 0.02}deg`,
          }}
        >
          <div style={{ fontFamily: F.mono, fontSize: 36, color: C.blue }}>
            iXBT.games{" "}
            <span style={{ fontSize: 24, float: "right" }}>
              2025.10.15 · 文字存档重排
            </span>
          </div>
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 36,
              lineHeight: 1.5,
              marginTop: 36,
            }}
          >
            Denuvo's "Current" Version Hacked.
            <br />
            Hacker Boasted About Their First Victory Over DRM Protection
          </div>
          <div style={{ fontSize: 26, color: C.gray, marginTop: 40 }}>
            报道中的背景
          </div>
          <div style={{ fontSize: 64, lineHeight: 1.4, marginTop: 22 }}>
            EMPRESS 正在退场
          </div>
          <div style={{ fontSize: 42, color: C.gray, marginTop: 28 }}>
            新的破解者进入讨论
          </div>
        </Paper>
      </div>
      <div style={{ opacity: k }}>
        <Topline label="一个半月后" right="2025.12.01" paper />
        <Paper
          style={{
            position: "absolute",
            left: 240,
            top: 325,
            width: 1440,
            height: 350,
            padding: 65,
            translate: `0 ${(1 - k) * 100}px`,
            rotate: "-1deg",
          }}
        >
          <div style={{ fontFamily: F.mono, fontSize: 48 }}>
            End Of An Era - EMPRESS.pdf
          </div>
          <div style={{ fontSize: 36, color: C.gray, marginTop: 40 }}>
            正式的告别声明
          </div>
          <div style={{ fontSize: 26, color: C.gray, marginTop: 28 }}>
            频道公告所示文件名 · 未展示 PDF 内页
          </div>
        </Paper>
      </div>
      <SourceTag>
        {k < 0.5
          ? "iXBT.games · 2025-10-15"
          : "EMPRESS 告别声明 · 2025-12-01"}
      </SourceTag>
    </Scene>
  );
};
export const CommunityTitle = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const postAt = timing.voices[2].start;
  const chinese = postAt + 4;
  return (
    <Scene>
      <Topline label="破解社区的讨论" right="2025.10.14" />
      <div
        style={{
          position: "absolute",
          left: 230,
          top: 245,
          fontFamily: F.mono,
          fontSize: 46,
          color: C.gray,
          opacity: 1 - lerp(t, postAt - 1, postAt),
        }}
      >
        EMPRESS
      </div>
      <div
        style={{
          position: "absolute",
          right: 240,
          top: 245,
          opacity: 1 - lerp(t, postAt - 1, postAt),
        }}
      >
        <NameCursor size={46} />
      </div>
      <TerminalPanel
        title="r/PiratedGames · 据文本存档重排"
        style={{
          position: "absolute",
          left: 200,
          top: 350,
          width: 1520,
          height: 470,
          translate: `0 ${lerp(t, postAt - 1.5, postAt + 0.5, 0, -100)}px`,
          scale: lerp(t, postAt - 1.5, postAt + 0.5, 0.88, 1),
        }}
      >
        <div
          style={{
            padding: "45px 65px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontFamily: F.mono, fontSize: 115, lineHeight: 1.4 }}>
              we won ?
            </div>
            <div
              style={{
                fontSize: 72,
                color: C.white,
                opacity: lerp(t, chinese - 0.2, chinese + 0.2),
              }}
            >
              我们赢了？
            </div>
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 24, color: C.gray }}>
            2025.10.14
          </div>
        </div>
      </TerminalPanel>
      <SourceTag>Reddit · r/PiratedGames · 2025-10-14</SourceTag>
    </Scene>
  );
};
export const DoubleMeaning = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const explain = timing.voices[1].start;
  const left = timing.voices[2].start;
  const right = timing.voices[3].start;
  const spikeAt = right + 1.83;
  const spike = t >= spikeAt && t < spikeAt + 0.1;
  const d = Array.from({ length: 300 }, (_, i) => {
    const x = 1040 + i * 2.1;
    const amplitude = spike
      ? 15 + 100 * Math.exp(-(((x - 1360) / 40) ** 2))
      : 15;
    return `${i ? "L" : "M"}${x} ${730 + Math.sin(x * 0.07 - t * 10) * amplitude}`;
  }).join(" ");
  return (
    <Scene>
      <Topline label="评论里的双关" right="语义示意" />
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 250,
          fontFamily: F.mono,
          fontSize: 72,
          color: C.white,
        }}
      >
        Voices cracked
      </div>
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 385,
          fontSize: 39,
          color: C.gray,
          opacity: lerp(t, explain, explain + 0.5),
        }}
      >
        这是个双关
      </div>
      <div
        style={{
          position: "absolute",
          left: 180,
          top: 520,
          width: 680,
          opacity: lerp(t, left, left + 0.4),
        }}
      >
        <NameCursor size={59} />
        <div style={{ fontSize: 57, marginTop: 35 }}>破解了游戏</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1000,
          top: 470,
          width: 700,
          opacity: lerp(t, right, right + 0.5),
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 60 }}>voice crack</div>
        <div
          style={{
            fontSize: 64,
            marginTop: 25,
            color: spike ? C.yellow : C.white,
          }}
        >
          ＝ 破音
        </div>
      </div>
      <svg
        width="1920"
        height="1080"
        style={{
          position: "absolute",
          opacity: lerp(t, right + 1, right + 1.5),
        }}
      >
        <path
          d={d}
          stroke={spike ? C.yellow : C.white}
          fill="none"
          strokeWidth="3"
        />
      </svg>
      <SourceTag>
        Reddit · r/PiratedGames · 2025-10-14
      </SourceTag>
    </Scene>
  );
};
export const Caution = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const first = timing.voices[1].start;
  const second = timing.voices[2].start;
  return (
    <Scene>
      <Topline label="也有人暂不庆祝" right="2025.10.14" />
      <TerminalPanel
        title="社区评论者的提醒 · 中文译述"
        style={{
          position: "absolute",
          left: 180,
          top: 245,
          width: 1560,
          height: 565,
          translate: `0 ${lerp(t, 0, 0.9, -100, 0)}px`,
        }}
      >
        <div style={{ padding: "55px 60px" }}>
          <div
            style={{
              fontSize: 62,
              color: C.blue,
              opacity: lerp(t, first, first + 0.5),
            }}
          >
            目前处理的是旧版 Denuvo
          </div>
          <div
            style={{ height: 2, background: "#8a8f9855", margin: "45px 0" }}
          />
          <div
            style={{
              fontSize: 62,
              lineHeight: 1.5,
              color: C.white,
              opacity: lerp(t, second, second + 0.5),
            }}
          >
            新版保护下的新游戏
            <br />
            还不能下结论
          </div>
        </div>
      </TerminalPanel>
      <SourceTag>
        Reddit 评论 · r/PiratedGames · 2025-10-14
      </SourceTag>
    </Scene>
  );
};
export const Unanswered = () => {
  const t = useTime();
  return (
    <Scene>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 155,
          fontFamily: F.mono,
          fontSize: 34,
          color: C.gray,
        }}
      >
        2025.10
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 340,
          textAlign: "center",
          fontSize: 133,
          color: C.white,
          scale: 1 + Math.sin(t * 0.4) * 0.005,
        }}
      >
        新版<span style={{ color: C.red }}>？</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 220,
          top: 695,
          fontSize: 32,
          color: C.gray,
        }}
      >
        这个判断，当时还没有答案
      </div>
      <div
        style={{
          position: "absolute",
          right: 180,
          top: 720,
          width: 380,
          height: 140,
          border: "1px solid #8a8f9844",
          padding: 25,
          color: C.gray,
          fontSize: 26,
          opacity: 0.5,
        }}
      >
        社区提醒
        <br />
        新版还不能下结论
      </div>
    </Scene>
  );
};
