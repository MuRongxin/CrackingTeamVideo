import { Audio } from "@remotion/media";
import { Sequence, staticFile, useVideoConfig } from "remotion";
import type { ShotTiming } from "./timing";
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
        <Cue at={1.85} file="paper" />
        <Cue at={2.45} file="paper" volume={0.25} />
        <Cue at={3.05} file="paper" volume={0.2} />
      </>
    );
  if (shot === 7)
    return (
      <Cue at={timing.voices[1].start + 0.35} file="paper" volume={0.23} />
    );
  if (shot === 8) return <Cue at={0.3} file="sweep" />;
  if (shot === 9)
    return (
      <>
        <Cue at={0.5} file="paper" />
        <Cue at={0.95} file="paper" volume={0.23} />
        <Cue at={1.4} file="paper" volume={0.18} />
      </>
    );
  if (shot === 11)
    return (
      <>
        <Cue at={5.25} file="sweep" volume={0.2} />
        <Cue at={timing.voices[1].start + 1} file="click" volume={0.2} />
      </>
    );
  return null;
};
