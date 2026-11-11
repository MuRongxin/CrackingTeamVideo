import { Audio } from "@remotion/media";
import { Sequence, staticFile, useVideoConfig } from "remotion";
import type { ShotTiming } from "./timing";
import { voiceCue } from "./act1/cues";

export const Act1Score = () => (
  <Audio
    name="第一幕原创配乐"
    src={staticFile("v38/sfx/act1-score.wav")}
    volume={0.75}
  />
);
export const Cue = ({
  at,
  file,
  volume = 0.3,
  duration = 0.6,
}: {
  at: number;
  file: string;
  volume?: number;
  duration?: number;
}) => {
  const { fps } = useVideoConfig();
  return (
    <Sequence
      name={`音效 ${file}`}
      from={Math.round(at * fps)}
      durationInFrames={Math.ceil(duration * fps)}
    >
      <Audio src={staticFile(`v38/sfx/${file}.wav`)} volume={volume} />
    </Sequence>
  );
};
export const Sound = ({
  shot,
  timing,
}: {
  shot: number;
  timing: ShotTiming;
}) => {
  if (shot === 1)
    return (
      <>
        <Cue at={0.4} file="paper" />
        <Cue at={1.33} file="click" volume={0.15} />
        <Cue at={1.48} file="stamp" volume={0.18} />
        <Cue at={5.82} file="pencil" volume={0.12} />
      </>
    );
  if (shot === 2) return <Cue at={0.6} file="pencil" />;
  if (shot === 3)
    return (
      <>
        <Cue at={1.72} file="sweep" />
        <Cue at={2} file="click" />
      </>
    );
  if (shot === 4)
    return (
      <>
        <Cue at={0.9} file="pencil" />
        <Cue at={1.8} file="pencil" />
      </>
    );
  if (shot === 5) return <Cue at={0.5} file="sweep" />;
  if (shot === 6)
    return (
      <>
        <Cue at={0.08} file="stamp" volume={0.24} />
        <Cue at={0.35} file="sweep" volume={0.18} />
      </>
    );
  if (shot === 7)
    return (
      <>
        <Cue at={1.3} file="paper" />
        <Cue at={1.85} file="paper" volume={0.25} />
        <Cue at={2.4} file="paper" volume={0.2} />
        <Cue at={voiceCue(timing, 6, "弄清楚")} file="sweep" volume={0.16} />
        {["比如叫什么", "住在哪", "怎么联系"].map((phrase) => (
          <Cue
            key={phrase}
            at={voiceCue(timing, 6, phrase)}
            file="click"
            duration={0.15}
            volume={0.09}
          />
        ))}
      </>
    );
  if (shot === 8)
    return (
      <>
        <Cue at={1.85} file="pencil" volume={0.18} />
        <Cue at={timing.voices[1].start + 0.05} file="paper" volume={0.23} />
      </>
    );
  if (shot === 9)
    return (
      <>
        <Cue at={0.1} file="paper" />
        <Cue at={1.55} file="paper" volume={0.23} />
        <Cue at={3.35} file="paper" volume={0.18} />
      </>
    );
  if (shot === 10)
    return (
      <>
        <Cue at={1.9} file="paper" volume={0.13} />
        <Cue at={3.18} file="paper" volume={0.1} />
      </>
    );
  if (shot === 11)
    return (
      <>
        <Cue at={5.25} file="sweep" volume={0.2} />
        <Cue at={timing.voices[1].start - 0.05} file="paper" volume={0.15} />
      </>
    );
  return null;
};
