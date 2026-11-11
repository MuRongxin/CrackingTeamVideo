import { publicAsset } from "../assets";
import { Img, interpolate, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { C, F } from "../style";
import { NameCursor, useTime, lerp, clamp } from "../components";
import type { ShotTiming } from "../timing";
import { FilmScene, cue } from "./film-shared";
import { FarewellDocument } from "./FarewellDocument";

export const QuietNews = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const { fps } = useVideoConfig();
  const years = lerp(t, 0.3, 2.7);
  return (
    <FilmScene
      title="一款六年前的老游戏"
      right="2019 → 2025.10"
      source="《三国》官方宣传片另一段｜V02 发行记录"
    >
      <Video
        src={publicAsset("v38/act2/footage/quiet-news.mp4")}
        durationInFrames={Math.round(timing.duration * fps)}
        muted
        style={{
          position: "absolute",
          width: 1920,
          height: 1080,
          objectFit: "cover",
          scale: 1.06,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg,rgba(3,9,9,.72),rgba(3,9,9,.38) 70%),linear-gradient(0deg,#000c,transparent 50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 185,
          fontFamily: F.mono,
          fontSize: 200,
          color: "#ffffff18",
          translate: `${-years * 90}px 0`,
        }}
      >
        2019
      </div>
      <div
        style={{
          position: "absolute",
          left: 1000,
          top: 570,
          fontFamily: F.mono,
          fontSize: 160,
          color: C.yellow,
          opacity: years,
          translate: `${(1 - years) * 180}px 0`,
        }}
      >
        2025
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 410,
          fontSize: 91,
          color: C.white,
          lineHeight: 1.45,
        }}
      >
        老游戏，
        <br />
        新的版本。
      </div>
      <div
        style={{
          position: "absolute",
          left: 1090,
          top: 315,
          width: 560,
          height: 250,
          background: "#f0ebdf",
          color: C.ink,
          padding: 40,
          rotate: `${lerp(t, 0, timing.duration, -5, -1)}deg`,
          boxShadow: "0 30px 75px #0008",
          translate: `0 ${lerp(t, 0.3, 1.2, 190, 0)}px`,
        }}
      >
        <div style={{ fontSize: 29, color: C.gray }}>新的发行记录</div>
        <div style={{ fontFamily: F.mono, fontSize: 72, marginTop: 35 }}>
          v1.7.1
        </div>
      </div>
    </FilmScene>
  );
};
export const WhyStarted = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const research = cue(timing, 37);
  const paper = lerp(t, 0.1, 0.9);
  const shift = lerp(t, research - 0.15, research + 0.7);
  const read = interpolate(t, [1.1, research, timing.duration - 0.2], [0, 0.22, 1], clamp);
  return (
    <FilmScene
      title="真正让他上新闻的，是这段自述"
      right="iXBT / 2025.10.15"
      source="报道页截图｜iXBT｜2025-10-15 · 自述经该报道转述"
    >
      <Img
        src={publicAsset("v38/act2/stills/ixbt-voices.png")}
        style={{
          position: "absolute",
          left: 210,
          width: 1500,
          translate: `0 ${40 - read * 720}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 90 - shift * 40,
          top: 155,
          width: 1120,
          opacity: 0,
          height: 640,
          background: "#ede8dc",
          color: C.ink,
          padding: 55,
          boxShadow: "0 30px 90px #0008",
          rotate: `${-1.4 + paper * 0.8 + Math.sin(t * 0.35) * 0.35}deg`,
          translate: `0 ${(1 - paper) * 420 - read * 24}px`,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 31, color: C.blue }}>
          iXBT.games{" "}
          <span style={{ float: "right", fontSize: 24 }}>文字存档重排</span>
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 36,
            lineHeight: 1.4,
            marginTop: 30,
          }}
        >
          Denuvo’s “Current” Version Hacked
        </div>
        <div
          style={{
            position: "absolute",
            left: 55,
            top: 225,
            right: 55,
            height: 330,
            overflow: "hidden",
          }}
        >
          <div style={{ translate: `0 ${-read * 360}px` }}>
            <div style={{ fontSize: 61, lineHeight: 1.55 }}>
              似乎已经少有人
              <br />
              关心这件事。
            </div>
            <div
              style={{
                fontSize: 43,
                color: C.red,
                marginTop: 35,
                opacity: lerp(t, 3.5, 4.3),
              }}
            >
              他表示，要接过这个使命。
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 340,
              translate: `0 ${-read * 360}px`,
            }}
          >
            <div style={{ fontSize: 64, lineHeight: 1.5 }}>逆向研究 Denuvo</div>
            <div
              style={{
                fontFamily: F.mono,
                fontSize: 30,
                color: C.gray,
                marginTop: 25,
              }}
            >
              “I spent a lot of time reverse engineering Denuvo…”
            </div>
            <div style={{ fontSize: 44, color: C.blue, marginTop: 35 }}>
              研究前辈留下的工作
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 55,
            top: 420,
            height: 3,
            width: lerp(t, 1.5, 3, 0, 780),
            background: C.red,
            opacity: 1 - shift,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 1380,
          top: 390,
          width: 500,
          height: 410,
          overflow: "hidden",
          background: "#090e1f",
          boxShadow: "0 30px 80px #0008",
          rotate: "4deg",
          opacity: 0,
          translate: `${(1 - shift) * 650}px 0`,
        }}
      >
        <Img
          src={publicAsset("v38/act2/nfo/reloaded-header.png")}
          style={{ width: 624, height: 438, imageRendering: "pixelated" }}
        />
      </div>
    </FilmScene>
  );
};

export const Retreat = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const end = cue(timing, 40);
  const context = cue(timing, 39, "把它放在了");
  const successor = cue(timing, 39, "新的接力者");
  const turn = lerp(t, end - 0.18, end + 0.56);
  const read = lerp(t, context - 0.3, context + 1.35);
  const drift = interpolate(t, [0, timing.duration], [0, 1], clamp);
  return (
    <FilmScene
      title={turn > 0.5 ? "EMPRESS 的告别声明" : "报道中的退场背景"}
      right={turn > 0.5 ? "2025.12.01" : "iXBT / 2025.10.15"}
      source={
        turn > 0.5
          ? "当事人告别声明｜E04 · 公开转载页实际截图 / 2025-12-01"
          : "同期报道页英文版截图｜V04 / iXBT · 2025-10-15"
      }
    >
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 125,
          width: 1800,
          height: 650,
          overflow: "hidden",
          background: "#fff",
          boxShadow: "0 24px 85px #0008",
          translate: `${-turn * 2020}px ${lerp(t, 0.04, 0.65, 230, 0)}px`,
          rotate: `${-turn * 4}deg`,
          transformOrigin: "0 50%",
        }}
      >
        <Img
          src={publicAsset("v38/act2/stills/ixbt-voices.png")}
          style={{
            width: 1800,
            translate: `0 ${-read * 535 - drift * 22}px`,
            scale: 1 + drift * 0.015,
            transformOrigin: "50% 0",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 80,
            top: 340,
            height: 5,
            width: lerp(t, context + 0.7, context + 1.7, 0, 1530),
            background: C.yellow,
            opacity: read * (1 - turn),
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 105 - turn * 1900,
          top: 794,
          display: "flex",
          alignItems: "center",
          gap: 44,
          opacity: lerp(t, context, context + 0.6),
        }}
      >
        <span style={{ fontFamily: F.mono, fontSize: 47, color: C.gray }}>
          EMPRESS
        </span>
        <span style={{ fontSize: 31, color: C.gray }}>正在退场</span>
        <div
          style={{
            height: 2,
            width: lerp(t, successor - 0.2, successor + 0.7, 0, 310),
            background: C.yellow,
          }}
        />
        <div
          style={{
            opacity: lerp(t, successor, successor + 0.5),
            translate: `${lerp(t, successor, successor + 0.7, 90, 0)}px 0`,
          }}
        >
          <NameCursor size={48} />
        </div>
      </div>
      <FarewellDocument from={end} duration={timing.duration} />
    </FilmScene>
  );
};

export const CommunityTitle = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const { fps } = useVideoConfig();
  const thread = cue(timing, 43);
  const smile = cue(timing, 44);
  const change = cue(timing, 45);
  const arrive = cue(timing, 45, "而一个新的");
  const openAt = cue(timing, 42);
  const open = lerp(t, openAt - 0.2, openAt + 0.65);
  const read = lerp(t, thread + 1.5, thread + 3.3);
  const leave = lerp(t, change - 0.05, change + 1.0);
  const release = lerp(t, arrive - 0.2, arrive + 0.8);
  return (
    <FilmScene
      title="破解社区里的讨论"
      right="2025.10.14"
      source={
        release > 0.5
          ? "发行记录｜V02 · 背景为女神异闻录5 皇家版官方宣传片"
          : "社区帖子｜V03 / r/PiratedGames｜原帖配图"
      }
    >
      <Video
        src={publicAsset("v38/act2/footage/community-persona.mp4")}
        durationInFrames={Math.round(timing.duration * fps)}
        muted
        style={{
          position: "absolute",
          width: 1920,
          height: 1080,
          objectFit: "cover",
          scale: 1.04,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(0deg,#030b0ecc,transparent 42%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 270,
          fontFamily: F.mono,
          fontSize: 135,
          color: "#a8b0a4",
          opacity: (1 - open) * (1 - leave),
          translate: `${-open * 850}px 0`,
        }}
      >
        EMPRESS
        <div style={{ marginTop: 80 }}>
          <NameCursor size={122} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 250,
          top: 150,
          width: 1420,
          height: 700,
          padding: 48,
          background: "#121c18e8",
          borderTop: `2px solid ${C.gray}`,
          boxShadow: "0 35px 90px #0009",
          translate: `${-leave * 900}px ${(1 - open) * 800 - leave * 170}px`,
          scale: 1 + read * 0.1 - leave * 0.33,
          rotate: `${-leave * 4}deg`,
          transformOrigin: "42% 45%",
          opacity: 1 - leave * 0.85,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <Img
            src={publicAsset("v38/brands/reddit.png")}
            style={{ width: 170, height: 48, objectFit: "contain" }}
          />
          <span style={{ fontFamily: F.mono, fontSize: 29, color: C.gray }}>
            r/PiratedGames · 标题重排
          </span>
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 42, color: C.white, marginTop: 18 }}>
          we won ?
        </div>
        <Img
          src={publicAsset("v38/act2/stills/reddit-we-won-meme.png")}
          style={{
            width: 1100,
            marginTop: 16,
            display: "block",
            scale: lerp(t, smile, smile + 0.5, 1, 1.04),
          }}
        />
        <div
          style={{
            fontSize: 67,
            color: C.gray,
            marginTop: 30,
            opacity: lerp(t, thread + 3.5, thread + 3.9),
          }}
        >
          我们赢了？
        </div>
        <div
          style={{
            height: 2,
            width: lerp(t, smile, smile + 0.8, 0, 1400),
            background: C.yellow,
            marginTop: 42,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 140 - leave * 35,
          top: 420 - leave * 80,
          fontFamily: F.mono,
          fontSize: 95,
          color: C.gray,
          opacity: leave * (1 - release * 0.7),
          translate: `0 ${-release * 110}px`,
        }}
      >
        EMPRESS
        <div style={{ fontFamily: F.cn, fontSize: 37, marginTop: 25 }}>
          正在离开
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 590,
          top: 290,
          width: 1180,
          height: 475,
          padding: 50,
          background: "#080f0df5",
          boxShadow: "0 30px 80px #0009",
          borderLeft: `4px solid ${C.yellow}`,
          translate: `${(1 - release) * 1400}px ${(1 - release) * 150}px`,
          rotate: `${(1 - release) * 5}deg`,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 26, color: C.gray }}>
          2025.10.14 / NFO
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 38,
            lineHeight: 1.5,
            color: C.white,
            marginTop: 30,
          }}
        >
          Total.War.Three.Kingdoms.v1.7.1-
          <br />
          <span style={{ color: C.yellow }}>voices38</span>
        </div>
        <div
          style={{
            fontFamily: F.pixel,
            fontSize: 33,
            lineHeight: 1.45,
            color: C.gray,
            marginTop: 35,
          }}
        >
          Game is updated to the latest version
          <br />
          and all DLCs are included.
        </div>
        <div
          style={{
            height: 3,
            width: lerp(t, arrive + 0.5, timing.duration, 0, 1030),
            marginTop: 30,
            background: C.yellow,
          }}
        />
      </div>
    </FilmScene>
  );
};
export const DoubleMeaning = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const split = cue(timing, 47);
  const game = cue(timing, 48);
  const zoom = lerp(t, 1.1, 2.0);
  const reveal = lerp(t, split - 0.1, split + 0.5);
  const sound = cue(timing, 49);
  const spikeAt = sound + 1.83;
  const spike = t >= spikeAt && t < spikeAt + 0.1;
  const wave = Array.from({ length: 420 }, (_, i) => {
    const x = 100 + i * 4;
    const amp = (spike ? 100 * Math.exp(-(((x - 1290) / 95) ** 2)) : 0) + 14;
    return `${i ? "L" : "M"}${x},${740 + Math.sin(i * 0.24 - t * 9) * amp}`;
  }).join(" ");
  return (
    <FilmScene
      title="评论接了一句"
      right={reveal < 0.5 ? "r/PiratedGames / 原帖截图" : "双关 / 语义示意"}
      source="实际评论截图｜V03 / Mordad51 · 后段波形为语义示意"
    >
      <div style={{ position: "absolute", inset: 0, opacity: 1 - reveal, translate: `${-reveal * 1400}px 0` }}>
        <Img src={publicAsset("v38/act2/stills/reddit-20-context.png")} style={{position: "absolute", left: 460, top: 130, width: 1000, opacity: 1 - zoom, scale: 1 + zoom * 0.12, boxShadow: "0 25px 90px #0008"}} />
        <Img src={publicAsset("v38/act2/stills/reddit-20-reply.png")} style={{position: "absolute", left: 190, top: 280, width: 1540, opacity: zoom, translate: `0 ${(1 - zoom) * 120 - t * 2}px`, scale: 0.9 + zoom * 0.1, boxShadow: "0 25px 90px #0008"}} />
      </div>
      <div style={{position: "absolute", inset: 0, opacity: reveal}}>
      <div
        style={{
          position: "absolute",
          left: 130,
          top: 200,
          fontFamily: F.mono,
          fontSize: 105,
          color: C.white,
          translate: `0 ${lerp(t, split, split + 0.6, 110, 0)}px`,
        }}
      >
        <span style={{ color: t > split ? C.yellow : C.white }}>Voices</span>{" "}
        cracked
        <div
          style={{
            fontFamily: F.cn,
            fontSize: 32,
            color: C.gray,
            marginTop: 18,
            opacity: 1 - lerp(t, split, split + 0.45),
          }}
        >
          See what you did there
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 370,
          width: 820,
          height: 3,
          background: C.yellow,
          scale: `${lerp(t, split, split + 0.6)} 1`,
          transformOrigin: "left",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 140,
          top: 470,
          opacity: lerp(t, game, game + 0.35),
          translate: `${lerp(t, game, game + 0.55, 100, 0)}px 0`,
        }}
      >
        <NameCursor size={83} />
        <div style={{ fontSize: 55, color: C.white, marginTop: 35 }}>
          破解了游戏
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1100,
          top: 430,
          opacity: lerp(t, sound, sound + 0.35),
          translate: `0 ${lerp(t, sound, sound + 0.6, 100, 0)}px`,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 69 }}>voice crack</div>
        <div
          style={{
            fontSize: spike ? 115 : 69,
            color: spike ? C.yellow : C.white,
            marginTop: 27,
            translate: spike ? "12px -6px" : "0 0",
          }}
        >
          破音
        </div>
      </div>
      <svg
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          inset: 0,
          opacity: lerp(t, sound + 0.5, sound + 1),
        }}
      >
        <path
          d={wave}
          stroke={spike ? C.yellow : C.blue}
          strokeWidth={spike ? 5 : 3}
          fill="none"
        />
      </svg>
      </div>
    </FilmScene>
  );
};
export const Caution = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const old = cue(timing, 51);
  const newer = cue(timing, 52);
  const pull = lerp(t, newer - 0.2, newer + 0.7);
  return (
    <FilmScene
      title="也有人暂时不庆祝"
      right={pull < 0.5 ? "r/PiratedGames / 原帖截图" : "旧版 → 新版？"}
      source="实际评论截图｜V03 / Mediocre-Housing-131 · 观点属于评论者"
    >
      <Img
        src={publicAsset("v38/act2/stills/reddit-21-comment.png")}
        style={{position: "absolute", left: 195, top: 150, width: 1530,
          translate: `${-pull * 2000}px ${lerp(t, 0.05, 0.65, 200, 0) - t * 1.6}px`,
          scale: 1 + lerp(t, old, newer, 0, 0.018),
          rotate: `${-pull * 3}deg`, boxShadow: "0 25px 90px #0008"}}
      />
      <div style={{position: "absolute", left: 150, top: 245, fontSize: 82,
        color: C.white, opacity: pull, translate: `0 ${(1 - pull) * 90}px`}}>
        旧版破解 <span style={{color: C.yellow}}>≠</span> 新版通行
      </div>
      <div
        style={{
          position: "absolute",
          left: 210 - pull * 90,
          top: 520,
          width: 600,
          height: 245,
          padding: 35,
          border: `2px solid ${C.blue}`,
          background: "#152324",
          rotate: "-5deg",
          opacity: pull,
        }}
      >
        <div style={{ fontFamily: F.mono, fontSize: 57, color: C.blue }}>
          Denuvo
        </div>
        <div style={{ fontSize: 48, marginTop: 22 }}>旧版</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 1110,
          opacity: pull,
          top: 485,
          width: 550,
          height: 300,
          background: "#0a0e0c",
          border: "2px solid #6e8aa64d",
          boxShadow: "0 25px 60px #0007",
          rotate: `${lerp(t, newer, newer + 0.8, 9, 0)}deg`,
          translate: `${(1 - pull) * 700}px 0`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 40,
            top: 30,
            fontFamily: F.mono,
            fontSize: 31,
            color: C.gray,
          }}
        >
          新版 Denuvo
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 165,
            color: C.yellow,
            textAlign: "center",
            marginTop: 65,
          }}
        >
          ?
        </div>
      </div>
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d="M830 640H1030"
          stroke={C.blue}
          strokeWidth={3}
          strokeDasharray="9 10"
          pathLength={1}
          strokeDashoffset={1 - pull}
          opacity={pull}
        />
        <path
          d="M1000 620L1030 640L1000 660"
          stroke={C.blue}
          strokeWidth={3}
          fill="none"
          opacity={pull}
        />
      </svg>
    </FilmScene>
  );
};
export const Unanswered = () => {
  const t = useTime();
  const zoom = lerp(t, 0, 1.2);
  return (
    <FilmScene
      title="2025.10 / 当时还没有答案"
      right="待后续发行回答"
      source="叙事悬念｜2025 年 10 月"
    >
      <div
        style={{
          position: "absolute",
          left: lerp(t, 0, 1.2, 1110, 540),
          top: lerp(t, 0, 1.2, 485, 205),
          width: lerp(t, 0, 1.2, 550, 900),
          height: lerp(t, 0, 1.2, 300, 580),
          border: "2px solid #6e8aa64d",
          background: "#090e0c",
          boxShadow: "0 40px 100px #0009",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 45,
            top: 30,
            fontFamily: F.mono,
            fontSize: 42,
            color: C.gray,
          }}
        >
          新版 Denuvo
        </div>
        <div
          style={{
            textAlign: "center",
            fontFamily: F.mono,
            fontSize: 165 + zoom * 180,
            color: C.yellow,
            marginTop: 65,
            lineHeight: 1.3,
          }}
        >
          ?
        </div>
      </div>
    </FilmScene>
  );
};
