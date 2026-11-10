import { Audio } from "@remotion/media";
import { Sequence, staticFile, useVideoConfig } from "remotion";
import type { ShotTiming } from "./timing";
const Cue = ({
  at,
  file,
  volume = 0.3,
}: {
  at: number;
  file: string;
  volume?: number;
}) => {
  const { fps } = useVideoConfig();
  return (
    <Sequence
      name={`音效 ${file}`}
      from={Math.round(at * fps)}
      durationInFrames={Math.ceil(0.6 * fps)}
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
        <Cue at={1.25} file="pencil" />
        <Cue at={1.8} file="pencil" />
      </>
    );
  if (shot === 5) return <Cue at={0.5} file="sweep" />;
  if (shot === 6)
    return (
      <>
        <Cue at={1.85} file="stamp" />
        <Cue at={2.48} file="stamp" />
        <Cue at={3.11} file="stamp" />
        <Cue at={timing.voices[1].start + 0.7} file="pencil" />
      </>
    );
  if (shot === 7)
    return (
      <>
        <Cue at={timing.duration * 0.6} file="paper" />
        <Cue at={timing.duration * 0.6 + 0.3} file="paper" volume={0.18} />
      </>
    );
  if (shot === 8) return <Cue at={0.3} file="sweep" />;
  if (shot === 9) {
    const a = timing.voices[2].start,
      b = timing.voices[3].start;
    return (
      <>
        <Cue at={a - 0.25} file="paper" />
        <Cue at={a + 0.8} file="paper" volume={0.25} />
        <Cue at={a + 1.4} file="paper" volume={0.22} />
        <Cue at={a + 2.25} file="paper" volume={0.2} />
        <Cue at={a + 3.4} file="paper" volume={0.17} />
        <Cue at={b + 0.1} file="paper" volume={0.15} />
        <Cue at={b + 0.45} file="paper" volume={0.14} />
        <Cue at={b + 0.8} file="paper" volume={0.13} />
      </>
    );
  }
  if (shot === 10) return <Cue at={0.9} file="stamp" volume={0.2} />;
  if (shot === 11)
    return (
      <>
        <Cue at={timing.voices[1].start} file="sweep" volume={0.2} />
        <Cue at={timing.voices[2].start + 0.7} file="click" />
        <Cue at={timing.voices[2].start + 1.7} file="click" />
        <Cue at={timing.voices[2].start + 2.8} file="click" />
      </>
    );
  return null;
};
