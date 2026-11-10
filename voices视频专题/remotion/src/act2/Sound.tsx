import { Cue } from "../Sound";
import type { ShotTiming } from "../timing";
export const Act2Sound = ({
  shot,
  timing,
}: {
  shot: number;
  timing: ShotTiming;
}) => {
  switch (shot) {
    case 1:
      return (
        <>
          <Cue at={0.25} file="rewind" volume={0.25} duration={1.4} />
          <Cue at={1.65} file="click" volume={0.25} />
        </>
      );
    case 3:
      return (
        <>
          <Cue at={0.2} file="click" volume={0.12} />
          <Cue at={timing.voices[1].start} file="click" volume={0.17} />
        </>
      );
    case 4:
      return <Cue at={1.2} file="paper" />;
    case 5:
      return (
        <>
          <Cue at={0.05} file="crt" volume={0.13} />
          <Cue at={timing.voices[1].start} file="click" volume={0.12} />
        </>
      );
    case 6:
      return <Cue at={1.65} file="beep" volume={0.17} />;
    case 7:
      return (
        <Cue at={timing.voices[1].start + 1.7} file="click" volume={0.16} />
      );
    case 8:
      return <Cue at={0.9} file="stretch" volume={0.18} duration={2.5} />;
    case 9:
      return (
        <>
          <Cue at={timing.voices[1].start + 0.9} file="paper" volume={0.23} />
          <Cue at={timing.voices[2].start + 0.5} file="paper" volume={0.2} />
        </>
      );
    case 10:
      return (
        <>
          <Cue at={timing.voices[1].start + 0.25} file="stamp" volume={0.2} />
          <Cue at={timing.voices[1].start + 0.75} file="stamp" volume={0.18} />
          <Cue at={timing.voices[1].start + 1.25} file="stamp" volume={0.15} />
        </>
      );
    case 11:
      return <Cue at={0.65} file="sweep" volume={0.2} />;
    case 12:
      return (
        <Cue at={timing.voices[1].start + 1.3} file="click" volume={0.12} />
      );
    case 13:
      return <Cue at={timing.voices[1].start} file="paper" volume={0.23} />;
    case 15:
      return <Cue at={0.7} file="notify" volume={0.22} />;
    case 16:
      return (
        <>
          <Cue at={timing.voices[2].start} file="paper" volume={0.18} />
          <Cue at={timing.voices[2].start + 0.35} file="paper" volume={0.14} />
        </>
      );
    case 18:
      return <Cue at={0.1} file="paper" volume={0.23} />;
    case 19:
      return (
        <>
          <Cue at={0.55} file="click" volume={0.15} />
          <Cue at={0.8} file="paper" volume={0.24} />
        </>
      );
    case 20:
      return <Cue at={timing.voices[2].start} file="click" volume={0.2} />;
    case 21:
      return (
        <>
          <Cue at={timing.voices[1].start} file="paper" volume={0.18} />
          <Cue
            at={timing.voices[2].start + 1.3}
            file="voice-break"
            volume={0.2}
          />
        </>
      );
    case 22:
      return <Cue at={0.55} file="water" volume={0.2} duration={0.75} />;
    case 23:
      return <Cue at={0.9} file="stamp" volume={0.3} />;
    default:
      return null;
  }
};
