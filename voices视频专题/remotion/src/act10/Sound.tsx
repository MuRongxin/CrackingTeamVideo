import { Audio } from "@remotion/media";
import { publicAsset } from "../assets";
import { Cue } from "../Sound";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
export const EpilogueSound = ({ timings }: { timings: ShotTiming[] }) => {
  const starts = timings.map((_, i) =>
    timings.slice(0, i).reduce((s, t) => s + t.duration, 0),
  );
  return (
    <>
      <Audio
        name="尾声原创稀疏配乐"
        src={publicAsset("v38/act10/epilogue-score.wav")}
        volume={0.22}
      />
      <Cue
        at={starts[3] + say(timings[3], 287, "反过来")}
        file="key"
        volume={0.035}
      />
      <Cue at={starts[4] + say(timings[4], 289)} file="paper" volume={0.025} />
      <Cue at={starts[4] + say(timings[4], 290)} file="paper" volume={0.018} />
    </>
  );
};
