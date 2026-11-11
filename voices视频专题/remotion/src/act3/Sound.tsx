import { Cue } from "../Sound";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
import { nitroAt, doorAt, pewAt } from "./motion";
export const Act3Sound = ({
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
          {[0, 1, 2, 3].map((i) => (
            <Cue
              key={i}
              at={say(timing, 57) + 0.5 + i * 0.65}
              file="click"
              volume={0.1}
              duration={0.12}
            />
          ))}
        </>
      );
    case 2:
      return <Cue at={say(timing, 60)} file="click" volume={0.12} />;
    case 3:
      return (
        <Cue at={nitroAt(timing)} file="nitro" volume={0.2} duration={0.65} />
      );
    case 4:
      return (
        <>
          {[0, 1, 2].map((i) => (
            <Cue
              key={i}
              at={say(timing, 63) + 1 + i * 0.85}
              file="key"
              volume={0.15}
              duration={0.2}
            />
          ))}
          <Cue at={doorAt(timing)} file="lock" volume={0.18} duration={0.25} />
        </>
      );
    case 5:
      return (
        <>
          <Cue at={say(timing, 65) + 0.2} file="click" volume={0.12} />
          <Cue at={say(timing, 65) + 0.65} file="click" volume={0.1} />
        </>
      );
    case 6:
      return <Cue at={say(timing, 67)} file="sweep" volume={0.12} />;
    case 7:
      return (
        <>
          {[0, 1, 2].map((i) => (
            <Cue
              key={i}
              at={say(timing, 70, "变成了") + 0.45 + i * 0.62}
              file="click"
              duration={0.12}
              volume={0.1}
            />
          ))}
        </>
      );
    case 9:
      return (
        <>
          <Cue at={say(timing, 78) + 0.2} file="click" volume={0.12} />
          <Cue
            at={say(timing, 78) + 0.95}
            file="lock"
            duration={0.25}
            volume={0.1}
          />
        </>
      );
    case 10:
      return (
        <>
          {[0, 1, 2].map((i) => (
            <Cue
              key={i}
              at={pewAt(timing) + i * 0.18}
              file="pew"
              duration={0.12}
              volume={0.14}
            />
          ))}
        </>
      );
    case 11:
      return <Cue at={say(timing, 83, "PROPER")} file="click" volume={0.13} />;
    case 12:
      return <Cue at={say(timing, 88)} file="paper" volume={0.15} />;
    case 13:
      return (
        <>
          {[90, 91, 92].map((id) => (
            <Cue key={id} at={say(timing, id)} file="paper" volume={0.08} />
          ))}
        </>
      );
    case 15:
      return (
        <>
          {[0.24, 0.7, 1.16].map((at) => (
            <Cue key={at} at={at} file="paper" volume={0.16} duration={0.4} />
          ))}
        </>
      );
    case 16:
      return <Cue at={say(timing, 98) + 1} file="click" volume={0.09} />;
    case 18:
      return (
        <>
          <Cue at={say(timing, 102)} file="paper" volume={0.16} />
          <Cue at={say(timing, 103)} file="paper" volume={0.13} />
        </>
      );
    default:
      return null;
  }
};
