import { Sound } from "./Sound";
import { Interactive, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import {
  CourtOpening,
  Plaintiff,
  Defendant,
  Identity,
  Pseudonym,
  Subpoenas,
  Requests,
} from "./CourtScenes";
import { TitleCard, Evidence, Unknown, Pronoun } from "./ArchiveScenes";
import { Narration } from "./narration";
import { initialTimings, type ActProps } from "./timing";

const Act1Inner = ({ timings = initialTimings }: ActProps) => {
  const { fps } = useVideoConfig();
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence
        name="A1-01 法院收到起诉书"
        durationInFrames={Math.round(timings[0].duration * fps)}
      >
        <CourtOpening timing={timings[0]} />
        <Narration timing={timings[0]} />
        <Sound shot={1} timing={timings[0]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A1-02 原告"
        durationInFrames={Math.round(timings[1].duration * fps)}
      >
        <Plaintiff timing={timings[1]} />
        <Narration timing={timings[1]} />
        <Sound shot={2} timing={timings[1]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A1-03 被告一栏"
        durationInFrames={Math.round(timings[2].duration * fps)}
      >
        <Defendant timing={timings[2]} />
        <Narration timing={timings[2]} />
        <Sound shot={3} timing={timings[2]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A1-04 个人或实体"
        durationInFrames={Math.round(timings[3].duration * fps)}
      >
        <Identity timing={timings[3]} />
        <Narration timing={timings[3]} />
        <Sound shot={4} timing={timings[3]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A1-05 不知道是谁"
        durationInFrames={Math.round(timings[4].duration * fps)}
      >
        <Pseudonym timing={timings[4]} />
        <Narration timing={timings[4]} />
        <Sound shot={5} timing={timings[4]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A1-06 向三个平台申请传票"
        durationInFrames={Math.round(timings[5].duration * fps)}
      >
        <Subpoenas timing={timings[5]} />
        <Narration timing={timings[5]} />
        <Sound shot={6} timing={timings[5]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A1-07 46 → 9"
        durationInFrames={Math.round(timings[6].duration * fps)}
      >
        <Requests timing={timings[6]} />
        <Narration timing={timings[6]} />
        <Sound shot={7} timing={timings[6]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A1-08 片名"
        durationInFrames={Math.round(timings[7].duration * fps)}
      >
        <TitleCard />
        <Sound shot={8} timing={timings[7]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A1-09 公开留下的材料"
        durationInFrames={Math.round(timings[8].duration * fps)}
      >
        <Evidence timing={timings[8]} />
        <Narration timing={timings[8]} />
        <Sound shot={9} timing={timings[8]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A1-10 怎样做事"
        durationInFrames={Math.round(timings[9].duration * fps)}
      >
        <Unknown timing={timings[9]} />
        <Narration timing={timings[9]} />
        <Sound shot={10} timing={timings[9]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A1-11 他"
        durationInFrames={Math.round(timings[10].duration * fps)}
      >
        <Pronoun timing={timings[10]} />
        <Narration timing={timings[10]} />
        <Sound shot={11} timing={timings[10]} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
export const Act1 = Interactive.create({
  Component: Act1Inner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});
export const Thumbnail = () => <TitleCard still />;
