import { Act1Score, Sound } from "./Sound";
import { Interactive, Sequence, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { ColdOpen, Requests, Subpoenas } from "./CourtScenes";
import { TitleCard, Evidence, Unknown, Pronoun } from "./ArchiveScenes";
import { Narration } from "./narration";
import { initialTimings, type ActProps } from "./timing";

const Act1Inner = ({ timings = initialTimings }: ActProps) => {
  const { fps } = useVideoConfig();
  const coldOpen = timings.slice(0, 5);
  const coldOpenFrames = coldOpen.reduce(
    (sum, timing) => sum + Math.round(timing.duration * fps),
    0,
  );
  return (
    <>
      <Act1Score />
      <TransitionSeries>
        <TransitionSeries.Sequence
          name="A1-01—05 冷开场 · 起诉了一个网名"
          durationInFrames={coldOpenFrames}
        >
          <ColdOpen />
          {coldOpen.map((timing, index) => {
            const from = coldOpen
              .slice(0, index)
              .reduce((sum, item) => sum + Math.round(item.duration * fps), 0);
            return (
              <Sequence
                key={index}
                name={`冷开场配音 ${index + 1}`}
                from={from}
                durationInFrames={Math.round(timing.duration * fps)}
              >
                <Narration timing={timing} captionStyle="panel" />
                <Sound shot={index + 1} timing={timing} />
              </Sequence>
            );
          })}
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="A1-08 片名 · 前置"
          durationInFrames={Math.round(timings[5].duration * fps)}
        >
          <TitleCard />
          <Sound shot={6} timing={timings[5]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="A1-06 向三个平台申请传票"
          durationInFrames={Math.round(timings[6].duration * fps)}
        >
          <Subpoenas timing={timings[6]} />
          <Narration timing={timings[6]} captionStyle="panel" />
          <Sound shot={7} timing={timings[6]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="A1-07 46 → 9"
          durationInFrames={Math.round(timings[7].duration * fps)}
        >
          <Requests timing={timings[7]} />
          <Narration timing={timings[7]} captionStyle="panel" />
          <Sound shot={8} timing={timings[7]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="A1-09 公开留下的材料"
          durationInFrames={Math.round(timings[8].duration * fps)}
        >
          <Evidence timing={timings[8]} />
          <Narration timing={timings[8]} captionStyle="panel" />
          <Sound shot={9} timing={timings[8]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="A1-10 怎样做事"
          durationInFrames={Math.round(timings[9].duration * fps)}
        >
          <Unknown timing={timings[9]} />
          <Narration timing={timings[9]} captionStyle="panel" />
          <Sound shot={10} timing={timings[9]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence
          name="A1-11 他"
          durationInFrames={Math.round(timings[10].duration * fps)}
        >
          <Pronoun timing={timings[10]} />
          <Narration timing={timings[10]} captionStyle="panel" />
          <Sound shot={11} timing={timings[10]} />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
export const Act1 = Interactive.create({
  Component: Act1Inner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});
export const Thumbnail = () => <TitleCard still />;
