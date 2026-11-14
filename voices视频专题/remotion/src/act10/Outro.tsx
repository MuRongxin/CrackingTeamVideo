import { Audio, Video } from "@remotion/media";
import { Sequence, useVideoConfig } from "remotion";
import { C } from "../style";
import { useTime, lerp } from "../components";
import { publicAsset } from "../assets";
import type { ShotTiming } from "../timing";
import { GroupMark } from "../act6/Picture";
import { say } from "./timing";
import { Stage, Cut, Still, Label, Words, pos, mono } from "./Stage";
import { Reveal, Kinetic, FilmShade, cover } from "./Motion";
export const Outro = ({
  timing,
  withMusic = true,
}: {
  timing: ShotTiming;
  withMusic?: boolean;
}) => {
  const t = useTime(),
    { fps } = useVideoConfig(),
    thanks = say(timing, 306),
    teaser = say(timing, 307),
    groups = say(timing, 308),
    end =
      timing.voices[timing.voices.length - 1].start +
      timing.voices[timing.voices.length - 1].duration,
    fade = lerp(t, end + 0.65, timing.duration - 1 / fps);
  const turns = [
    teaser,
    teaser + 1.6,
    teaser + 3.1,
    groups + 0.65,
    groups + 1.8,
  ];
  const marks = [
    ["reloaded", "RELOADED", "nERv 原NFO字标"],
    ["razor", "Razor 1911", "JeD / ACiD"],
    ["rune", "RUNE", "原NFO字符头 / LNK^2020"],
    ["codex", "CODEX", "原始组织标识"],
    ["empress", "EMPRESS", "原NFO字标"],
  ];
  return (
    <div style={{ ...pos, inset: 0, background: "#000" }}>
      <div style={{ ...pos, inset: 0, opacity: 1 - fade }}>
        <Stage
          name="A10-10 · 致谢与后续预告"
          source={
            t < teaser
              ? "游戏画面：游戏科学 / EA 官方预告"
              : "Razor 1911 字标：JeD / ACiD · RUNE 字标：LNK^2020"
          }
        >
          {withMusic && (
            <Audio
              name="片尾轻配乐"
              src={publicAsset("v38/update/outro-score.wav")}
              volume={0.2}
            />
          )}
          <Sequence
            name="致谢前的悟空动作"
            durationInFrames={Math.round(2.8 * fps)}
          >
            <Video
              src={publicAsset("v38/act10-motion/thanks-wukong.mp4")}
              muted
              style={cover}
            />
          </Sequence>
          <Sequence
            name="致谢接极品飞车"
            from={Math.round(2.8 * fps)}
            durationInFrames={Math.ceil((teaser - 2.8) * fps)}
          >
            <Video
              src={publicAsset("v38/act10-motion/thanks-nfs.mp4")}
              muted
              style={cover}
            />
          </Sequence>
          <Cut to={teaser} name="作者致谢与作品动作" clear>
            <FilmShade side />
            <Label>VOICES38 / 2025—2026</Label>
            <Reveal at={0.15} seconds={0.65} style={{ mixBlendMode: "screen" }}>
              <GroupMark
                name="voices38"
                width={1090}
                style={{ ...pos, left: 110, top: 245 }}
              />
            </Reveal>
            <Kinetic
              text="谢谢你来看我的视频。"
              at={thanks}
              y={710}
              size={92}
              color={C.yellow}
            />
            <div
              style={{
                ...pos,
                right: 110,
                top: 820,
                ...mono,
                fontSize: 25,
                color: "#b7cdcd",
              }}
            >
              {t < 2.8 ? "黑神话：悟空" : "极品飞车：热力追踪 重制版"}
            </div>
          </Cut>
          {marks.map(([file, name, credit], i) => (
            <Cut
              key={file}
              from={turns[i]}
              to={turns[i + 1] ?? Infinity}
              name={"预告" + name}
            >
              <div
                style={{
                  ...pos,
                  left: 1300 - 230 * lerp(t, turns[i], turns[i] + 1.3),
                  top: -200,
                  width: 470,
                  height: 1600,
                  rotate: "24deg",
                  borderLeft: "2px solid #36565f",
                  background: "#12292f",
                  opacity: 0.6,
                }}
              />
              <Label>那些传奇破解组 / 后续更新</Label>
              <div
                style={{
                  ...pos,
                  right: 120,
                  top: 90,
                  ...mono,
                  fontSize: 23,
                  color: "#7f9ca3",
                }}
              >
                {String(i + 1).padStart(2, "0")} / 05
              </div>
              <div
                style={{
                  ...pos,
                  left: 100,
                  top: 210,
                  width: 1700,
                  height: 480,
                  overflow: "hidden",
                  mixBlendMode: "screen",
                  clipPath: `polygon(0 0,${1900 * lerp(t, turns[i], turns[i] + 0.4)}px 0,${1740 * lerp(t, turns[i], turns[i] + 0.4)}px 100%,0 100%)`,
                }}
              >
                <Still
                  src={`v38/update/${file}.png`}
                  x={0}
                  y={0}
                  width={1480}
                  style={{
                    height: 430,
                    objectFit: "contain",
                    objectPosition: "left center",
                    filter: ["codex", "empress"].includes(file)
                      ? "invert(1)"
                      : undefined,
                  }}
                />
              </div>
              <Kinetic
                text={name}
                at={turns[i] + 0.1}
                y={730}
                size={71}
                color={C.yellow}
                step={0.025}
              />
              <div
                style={{
                  ...pos,
                  left: 1280,
                  top: 780,
                  ...mono,
                  fontSize: 22,
                  color: "#8ba4ab",
                  width: 500,
                }}
              >
                {credit}
              </div>
              <div
                style={{
                  ...pos,
                  left: 110,
                  top: 850,
                  width: 1550,
                  height: 4,
                  background: "#273d44",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: 1550 * lerp(t, teaser, end),
                    background: C.yellow,
                  }}
                />
              </div>
            </Cut>
          ))}
        </Stage>
      </div>
    </div>
  );
};
