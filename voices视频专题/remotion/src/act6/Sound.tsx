import { Cue } from "../Sound";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
export const Act6Sound = ({
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
          <Cue at={0.4} file="sweep" volume={0.08} />
          <Cue at={say(timing, 152)} file="click" volume={0.09} />
        </>
      );
    case 2:
      return (
        <>
          <Cue at={say(timing, 154)} file="sweep" volume={0.08} />
          <Cue at={say(timing, 155)} file="paper" volume={0.07} />
        </>
      );
    case 3:
      return <Cue at={say(timing, 158)} file="sweep" volume={0.09} />;
    case 4:
      return (
        <>
          <Cue at={say(timing, 159, "玩家")} file="click" volume={0.09} />
          <Cue
            at={say(timing, 160)}
            file="lock"
            volume={0.08}
            duration={0.25}
          />
        </>
      );
    case 5:
      return (
        <Cue
          at={say(timing, 162, "在游戏")}
          file="key"
          volume={0.08}
          duration={0.2}
        />
      );
    case 6:
      return (
        <>
          <Cue at={0.6} file="sweep" volume={0.08} />
          <Cue at={say(timing, 166)} file="key" volume={0.06} duration={0.2} />
        </>
      );
    case 7:
      return (
        <>
          <Cue at={say(timing, 169)} file="sweep" volume={0.08} />
          <Cue at={say(timing, 170)} file="key" volume={0.08} duration={0.2} />
        </>
      );
    case 8:
      return (
        <>
          <Cue at={say(timing, 172)} file="click" volume={0.07} />
          <Cue at={say(timing, 174)} file="stamp" volume={0.07} />
        </>
      );
    case 9:
      return <Cue at={say(timing, 177) - 0.5} file="sweep" volume={0.07} />;
    case 10:
      return (
        <>
          <Cue at={say(timing, 178, "换成")} file="click" volume={0.1} />
          <Cue at={say(timing, 179, "换成")} file="click" volume={0.1} />
        </>
      );
    case 11:
      return (
        <>
          <Cue at={0.15} file="stamp" volume={0.08} />
          <Cue at={say(timing, 182)} file="sweep" volume={0.08} />
        </>
      );
    case 12:
      return <Cue at={say(timing, 184, "是对手")} file="stamp" volume={0.07} />;
    case 13:
      return (
        <>
          <Cue at={say(timing, 187)} file="sweep" volume={0.08} />
          <Cue
            at={say(timing, 187, "他们的")}
            file="key"
            volume={0.08}
            duration={0.2}
          />
        </>
      );
    case 14:
      return (
        <Cue
          at={say(timing, 188, "先有")}
          file="key"
          volume={0.07}
          duration={0.2}
        />
      );
    default:
      return null;
  }
};
