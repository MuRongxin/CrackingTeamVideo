import { Interactive, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import type { ActProps } from "./timing";
import { Narration } from "./narration";
import { initialAct7Timings } from "./act7/timing";
import { OtherSide, HoursAndDays, GoodReviews } from "./act7/Reports";
import { TechnicalClaim, MafiaClaim, OpenQuestion } from "./act7/Dispute";
import { OldArgument, CrackOrBypass } from "./act7/History";
import { Act7Sound } from "./act7/Sound";
const Act7Inner = ({ timings = initialAct7Timings }: ActProps) => {
  const { fps } = useVideoConfig();
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence
        name="A7-01 澄清的另一面"
        durationInFrames={Math.round(timings[0].duration * fps)}
      >
        <OtherSide timing={timings[0]} />
        <Narration timing={timings[0]} />
        <Act7Sound shot={1} timing={timings[0]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A7-02 数小时与四十多天"
        durationInFrames={Math.round(timings[1].duration * fps)}
      >
        <HoursAndDays timing={timings[1]} />
        <Narration timing={timings[1]} />
        <Act7Sound shot={2} timing={timings[1]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A7-03 很高的评价"
        durationInFrames={Math.round(timings[2].duration * fps)}
      >
        <GoodReviews timing={timings[2]} />
        <Narration timing={timings[2]} />
        <Act7Sound shot={3} timing={timings[2]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A7-04 KiriGiri 的解释"
        durationInFrames={Math.round(timings[3].duration * fps)}
      >
        <TechnicalClaim timing={timings[3]} />
        <Narration timing={timings[3]} />
        <Act7Sound shot={4} timing={timings[3]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A7-05 DSOGaming 的说法"
        durationInFrames={Math.round(timings[4].duration * fps)}
      >
        <MafiaClaim timing={timings[4]} />
        <Narration timing={timings[4]} />
        <Act7Sound shot={5} timing={timings[4]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A7-06 独立分析？"
        durationInFrames={Math.round(timings[5].duration * fps)}
      >
        <OpenQuestion timing={timings[5]} />
        <Narration timing={timings[5]} />
        <Act7Sound shot={6} timing={timings[5]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A7-07 1998年的老争论"
        durationInFrames={Math.round(timings[6].duration * fps)}
      >
        <OldArgument timing={timings[6]} />
        <Narration timing={timings[6]} />
        <Act7Sound shot={7} timing={timings[6]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A7-08 破解，还是绕过"
        durationInFrames={Math.round(timings[7].duration * fps)}
      >
        <CrackOrBypass timing={timings[7]} />
        <Narration timing={timings[7]} />
        <Act7Sound shot={8} timing={timings[7]} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
export const Act7 = Interactive.create({
  Component: Act7Inner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});
