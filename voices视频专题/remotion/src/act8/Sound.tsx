import { Cue } from "../Sound";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
export const Act8Sound = ({
  shot,
  timing,
}: {
  shot: number;
  timing: ShotTiming;
}) => {
  const cues: Record<
    number,
    { at: number; file: "paper" | "sweep" | "click" | "key" }[]
  > = {
    1: [{ at: 0.1, file: "paper" }],
    2: [{ at: saySafe(213), file: "paper" }],
    3: [{ at: saySafe(216), file: "sweep" }],
    4: [{ at: 1.8, file: "click" }],
    5: [{ at: 0.2, file: "paper" }],
    6: [{ at: 5.9, file: "sweep" }],
    7: [
      { at: 1.55, file: "click" },
      { at: 4.3, file: "click" },
    ],
    8: [{ at: 0.2, file: "paper" }],
    9: [
      { at: saySafe(225), file: "sweep" },
      { at: saySafe(227), file: "sweep" },
    ],
    10: [
      { at: saySafe(229), file: "paper" },
      { at: saySafe(230), file: "sweep" },
    ],
    11: [],
    12: [{ at: saySafe(235), file: "paper" }],
  };
  function saySafe(id: number) {
    return timing.voices.some((v) => v.id === id) ? say(timing, id) : 0;
  }
  return (
    <>
      {cues[shot].map((c, i) => (
        <Cue
          key={i}
          at={c.at}
          file={c.file}
          volume={c.file === "click" ? 0.045 : 0.065}
        />
      ))}
    </>
  );
};
