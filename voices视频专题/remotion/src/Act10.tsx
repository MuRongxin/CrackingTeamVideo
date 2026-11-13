import { Interactive, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import type { ActProps } from "./timing";
import { Narration } from "./narration";
import { initialAct10Timings } from "./act10/timing";
import { Unknown, Perspectives, Ownership, Reversal } from "./act10/Opening";
import {
  Signature,
  FirstAttemptAgain,
  Traces,
  PersonOrGroup,
  FinalName,
} from "./act10/Closing";
import { EpilogueSound } from "./act10/Sound";
const Act10Inner = ({ timings = initialAct10Timings }: ActProps) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <EpilogueSound timings={timings} />
      <TransitionSeries>
        <TransitionSeries.Sequence
          name="A10-01 身份仍未确认"
          durationInFrames={Math.round(timings[0].duration * fps)}
        >
          <Unknown timing={timings[0]} />
          <Narration timing={timings[0]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="A10-02 两种目光"
          durationInFrames={Math.round(timings[1].duration * fps)}
        >
          <Perspectives timing={timings[1]} />
          <Narration timing={timings[1]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="A10-03 所有权"
          durationInFrames={Math.round(timings[2].duration * fps)}
        >
          <Ownership timing={timings[2]} />
          <Narration timing={timings[2]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="A10-04 反过来的一句话"
          durationInFrames={Math.round(timings[3].duration * fps)}
        >
          <Reversal timing={timings[3]} />
          <Narration timing={timings[3]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="A10-05 认识这个署名"
          durationInFrames={Math.round(timings[4].duration * fps)}
        >
          <Signature timing={timings[4]} />
          <Narration timing={timings[4]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="A10-06 一年前"
          durationInFrames={Math.round(timings[5].duration * fps)}
        >
          <FirstAttemptAgain />
          <Narration timing={timings[5]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="A10-07 痕迹还在"
          durationInFrames={Math.round(timings[6].duration * fps)}
        >
          <Traces timing={timings[6]} />
          <Narration timing={timings[6]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="A10-08 个人还是团体"
          durationInFrames={Math.round(timings[7].duration * fps)}
        >
          <PersonOrGroup />
          <Narration timing={timings[7]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="A10-09 VOICES38"
          durationInFrames={Math.round(timings[8].duration * fps)}
        >
          <FinalName timing={timings[8]} />
          <Narration timing={timings[8]} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
export const Act10 = Interactive.create({
  Component: Act10Inner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});
