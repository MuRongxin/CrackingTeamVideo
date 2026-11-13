import { Cue } from "../Sound";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
export const Act5Sound = ({
  shot,
  timing,
}: {
  shot: number;
  timing: ShotTiming;
}) => {
  switch (shot) {
    case 1:
      return <Cue at={timing.duration - 0.85} file="sweep" volume={0.1} />;
    case 2:
      return (
        <>
          <Cue
            at={say(timing, 139, "特别感谢")}
            file="key"
            duration={0.2}
            volume={0.09}
          />
          <Cue at={say(timing, 140) - 0.4} file="sweep" volume={0.08} />
        </>
      );
    case 3:
      return (
        <>
          <Cue at={say(timing, 141) + 0.4} file="paper" volume={0.12} />
          <Cue at={say(timing, 142) + 0.3} file="stamp" volume={0.09} />
          <Cue
            at={say(timing, 143) + 1.2}
            file="lock"
            duration={0.25}
            volume={0.13}
          />
        </>
      );
    case 4:
      return <Cue at={say(timing, 144, "参与")} file="sweep" volume={0.1} />;
    case 5:
      return <Cue at={5.55} file="nitro" duration={0.65} volume={0.08} />;
    case 6:
      return (
        <>
          <Cue at={1.1} file="lock" duration={0.25} volume={0.1} />
          <Cue at={2.6} file="click" volume={0.1} duration={0.12} />
          <Cue at={say(timing, 148)} file="sweep" volume={0.09} />
        </>
      );
    case 7:
      return (
        <>
          <Cue
            at={say(timing, 149, "一群捐款")}
            file="key"
            volume={0.07}
            duration={0.2}
          />
          <Cue at={say(timing, 150)} file="key" volume={0.08} duration={0.2} />
          <Cue
            at={say(timing, 150, "还有") + 0.7}
            file="lock"
            volume={0.11}
            duration={0.25}
          />
        </>
      );
    default:
      return null;
  }
};
