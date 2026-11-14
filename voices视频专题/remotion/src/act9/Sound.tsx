import { Cue } from "../Sound";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
type SoundCue = [number, "paper" | "sweep" | "key" | "click"];
export const Act9Sound = ({
  shot,
  timing,
}: {
  shot: number;
  timing: ShotTiming;
}) => {
  const cues: Record<number, () => SoundCue[]> = {
    1: () => [[say(timing, 237, "先向"), "paper"]],
    2: () => [[say(timing, 239), "click"]],
    3: () => [
      [say(timing, 242) + 1.68, "paper"],
      [say(timing, 242) + 4.82, "paper"],
    ],
    4: () => [
      [say(timing, 244), "paper"],
      [say(timing, 245), "paper"],
    ],
    5: () => [[say(timing, 247, "只是为了"), "sweep"]],
    6: () => [[say(timing, 250) + 0.5, "paper"]],
    7: () => [],
    8: () => [[say(timing, 254), "paper"]],
    9: () => [[say(timing, 257), "key"]],
    10: () => [[say(timing, 260), "sweep"]],
    11: () => [[say(timing, 262), "click"]],
    12: () => [],
    13: () => [
      [say(timing, 311), "paper"],
      [say(timing, 311) + 2.6, "paper"],
    ],
    14: () => [[say(timing, 268, "在一个"), "paper"]],
    15: () => [[say(timing, 269) + 0.8, "key"]],
    16: () => [[say(timing, 274), "click"]],
    17: () => [],
  };
  return (
    <>
      {cues[shot]().map(([at, file], i) => (
        <Cue
          key={i}
          at={at}
          file={file}
          volume={file === "click" ? 0.04 : 0.055}
        />
      ))}
    </>
  );
};
