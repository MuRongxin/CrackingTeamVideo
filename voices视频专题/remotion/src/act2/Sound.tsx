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
          <Cue at={0.25} file="rewind" duration={1.4} volume={0.25} />
          <Cue at={1.65} file="click" volume={0.2} />
        </>
      );
    case 3:
      return (
        <Cue at={timing.voices[0].start + 0.6} file="click" volume={0.15} />
      );
    case 4:
      return <Cue at={1.2} file="paper" />;
    case 5:
      return <Cue at={0.05} file="crt" volume={0.13} />;
    case 6:
      return <Cue at={4} file="beep" volume={0.17} />;
    case 7:
      return (
        <Cue at={timing.voices[1].start + 1.7} file="click" volume={0.16} />
      );
    case 8:
      return (
        <>
          <Cue at={timing.voices[1].start + 0.9} file="paper" volume={0.23} />
          <Cue at={timing.voices[2].start + 0.5} file="paper" volume={0.2} />
          <Cue at={timing.voices[3].start} file="click" volume={0.15} />
        </>
      );
    case 9:
      return <Cue at={6.4} file="click" volume={0.12} />;
    case 10:
      return <Cue at={0.65} file="sweep" volume={0.2} />;
    case 12:
      return <Cue at={timing.voices[2].start} file="sweep" volume={0.15} />;
    case 13:
      return (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <Cue
              key={i}
              at={timing.voices[1].start + i * 0.22}
              file="click"
              volume={0.12}
            />
          ))}
        </>
      );
    case 14:
      return (
        <>
          <Cue at={0.1} file="paper" volume={0.2} />
          <Cue at={timing.voices[2].start + 1} file="sweep" volume={0.16} />
        </>
      );
    case 15:
      return <Cue at={0.15} file="paper" volume={0.18} />;
    case 16:
      return (
        <>
          <Cue at={timing.voices[1].start} file="paper" volume={0.16} />
          <Cue at={timing.voices[1].start + 2.4} file="paper" volume={0.14} />
        </>
      );
    case 18:
      return (
        <>
          <Cue at={0.1} file="paper" volume={0.2} />
          <Cue at={timing.voices[1].start} file="paper" volume={0.18} />
        </>
      );
    case 19:
      return <Cue at={timing.voices[2].start} file="notify" volume={0.18} />;
    case 20:
      return (
        <Cue
          at={timing.voices[3].start + 1.83}
          file="voice-break"
          volume={0.18}
        />
      );
    case 21:
      return <Cue at={0.1} file="paper" volume={0.2} />;
    case 22:
      return <Cue at={1} file="click" volume={0.12} />;
    default:
      return null;
  }
};
