import { type CalculateMetadataFunction } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile } from "remotion";
import { Act1 } from "./Act1";
import { Act2 } from "./Act2";
import { makeTimings, totalFrames, type ShotTiming } from "./timing";
import { loadAct2Timings } from "./act2/timing";
import voices from "./voice-manifest.json";
export type FullProps = { timings: ShotTiming[]; act2Timings: ShotTiming[] };
export const Full = ({ timings, act2Timings }: FullProps) => (
  <TransitionSeries>
    <TransitionSeries.Sequence
      name="第一幕 · 起诉了一个网名"
      durationInFrames={totalFrames(timings)}
    >
      <Act1 name="第一幕" timings={timings} />
    </TransitionSeries.Sequence>
    <TransitionSeries.Sequence
      name="第二幕 · 第一次尝试"
      durationInFrames={totalFrames(act2Timings)}
    >
      <Act2 name="第二幕" timings={act2Timings} />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
export const calculateFullMetadata: CalculateMetadataFunction<
  FullProps
> = async () => {
  const [durations, act2Timings] = await Promise.all([
    Promise.all(
      voices.map((v) => getAudioDurationInSeconds(staticFile(v.file))),
    ),
    loadAct2Timings(),
  ]);
  const timings = makeTimings(durations);
  return {
    durationInFrames: totalFrames(timings) + totalFrames(act2Timings),
    props: { timings, act2Timings },
  };
};
