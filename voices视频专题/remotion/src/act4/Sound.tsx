import { Cue } from "../Sound";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
export const Act4Sound = ({
  shot,
  timing,
}: {
  shot: number;
  timing: ShotTiming;
}) => {
  switch (shot) {
    case 1:
      return <Cue at={say(timing, 105)} file="paper" volume={0.1} />;
    case 2:
      return (
        <>
          <Cue
            at={say(timing, 109) + 0.1}
            file="click"
            volume={0.11}
            duration={0.12}
          />
          <Cue
            at={say(timing, 109) + 0.3}
            file="click"
            volume={0.1}
            duration={0.12}
          />
        </>
      );
    case 3:
      return (
        <Cue at={say(timing, 114)} file="key" volume={0.1} duration={0.2} />
      );
    case 4:
      return (
        <Cue
          at={say(timing, 116, "所有破解") + 0.5}
          file="click"
          volume={0.1}
          duration={0.12}
        />
      );
    case 5:
      return <Cue at={say(timing, 119)} file="paper" volume={0.07} />;
    case 7:
      return (
        <Cue
          at={say(timing, 123, "测试平台") + 2.3}
          file="click"
          volume={0.13}
          duration={0.12}
        />
      );
    case 8:
      return <Cue at={say(timing, 310)} file="sweep" volume={0.07} />;
    case 9:
      return <Cue at={say(timing, 127, "《毁灭")} file="stamp" volume={0.08} />;
    case 10:
      return (
        <Cue
          at={say(timing, 132, "已经") + 0.3}
          file="click"
          volume={0.1}
          duration={0.12}
        />
      );
    default:
      return null;
  }
};
