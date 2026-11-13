import { Cue } from "../Sound";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
export const Act7Sound = ({
  shot,
  timing,
}: {
  shot: number;
  timing: ShotTiming;
}) => {
  switch (shot) {
    case 1:
      return <Cue at={say(timing, 190) - 0.12} file="sweep" volume={0.08} />;
    case 2:
      return (
        <>
          <Cue at={say(timing, 192, "几个小时")} file="click" volume={0.07} />
          <Cue at={say(timing, 193)} file="sweep" volume={0.09} />
        </>
      );
    case 3:
      return (
        <>
          <Cue at={say(timing, 195) - 0.15} file="paper" volume={0.08} />
          <Cue at={say(timing, 196)} file="sweep" volume={0.08} />
          <Cue at={say(timing, 197)} file="click" volume={0.06} />
        </>
      );
    case 4:
      return <Cue at={say(timing, 199)} file="sweep" volume={0.08} />;
    case 5:
      return <Cue at={say(timing, 203)} file="paper" volume={0.07} />;
    case 6:
      return null;
    case 7:
      return (
        <>
          <Cue at={0.2} file="sweep" volume={0.09} />
          <Cue
            at={say(timing, 208) + 1.05}
            file="key"
            volume={0.07}
            duration={0.2}
          />
        </>
      );
    case 8:
      return (
        <>
          <Cue at={0.18} file="sweep" volume={0.065} />
          <Cue
            at={say(timing, 210, "还是") - 0.15}
            file="sweep"
            volume={0.075}
          />
          <Cue
            at={timing.duration - 0.65}
            file="paper"
            volume={0.08}
            duration={0.6}
          />
        </>
      );
    default:
      return null;
  }
};
