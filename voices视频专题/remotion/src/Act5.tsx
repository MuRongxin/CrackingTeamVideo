import { Interactive, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import type { ActProps } from "./timing";
import { Narration } from "./narration";
import { initialAct5Timings } from "./act5/timing";
import { MoonList, ThirtyFour, Aliases } from "./act5/Names";
import { ReturningNames, UnknownStructure } from "./act5/Continuity";
import { Fulton } from "./act5/Fulton";
import { VisibleWork } from "./act5/Collaboration";
import { Act5Sound } from "./act5/Sound";
const Act5Inner = ({ timings = initialAct5Timings }: ActProps) => {
  const { fps } = useVideoConfig();
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence
        name="A5-01 月球上的新名单"
        durationInFrames={Math.round(timings[0].duration * fps)}
      >
        <MoonList timing={timings[0]} />
        <Narration timing={timings[0]} />
        <Act5Sound shot={1} timing={timings[0]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A5-02 三十四"
        durationInFrames={Math.round(timings[1].duration * fps)}
      >
        <ThirtyFour timing={timings[1]} />
        <Narration timing={timings[1]} />
        <Act5Sound shot={2} timing={timings[1]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A5-03 名字里的游戏与故事"
        durationInFrames={Math.round(timings[2].duration * fps)}
      >
        <Aliases timing={timings[2]} />
        <Narration timing={timings[2]} />
        <Act5Sound shot={3} timing={timings[2]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A5-04 下次名单里仍然在"
        durationInFrames={Math.round(timings[3].duration * fps)}
      >
        <ReturningNames timing={timings[3]} />
        <Narration timing={timings[3]} />
        <Act5Sound shot={4} timing={timings[3]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A5-05 给士兵绑气球"
        durationInFrames={Math.round(timings[4].duration * fps)}
      >
        <Fulton timing={timings[4]} />
        <Narration timing={timings[4]} />
        <Act5Sound shot={5} timing={timings[4]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A5-06 组织结构的空白"
        durationInFrames={Math.round(timings[5].duration * fps)}
      >
        <UnknownStructure timing={timings[5]} />
        <Narration timing={timings[5]} />
        <Act5Sound shot={6} timing={timings[5]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A5-07 能看见的协作"
        durationInFrames={Math.round(timings[6].duration * fps)}
      >
        <VisibleWork timing={timings[6]} />
        <Narration timing={timings[6]} />
        <Act5Sound shot={7} timing={timings[6]} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
export const Act5 = Interactive.create({
  Component: Act5Inner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});
