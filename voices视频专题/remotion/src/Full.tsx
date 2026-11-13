import { type CalculateMetadataFunction } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile } from "remotion";
import { Act1 } from "./Act1";
import { Act2 } from "./Act2";
import { Act3 } from "./Act3";
import { Act4 } from "./Act4";
import { Act5 } from "./Act5";
import { Act6 } from "./Act6";
import { Act7 } from "./Act7";
import { Act8 } from "./Act8";
import { loadAct8Timings } from "./act8/timing";
import { loadAct7Timings } from "./act7/timing";
import { makeTimings, totalFrames, type ShotTiming } from "./timing";
import { loadAct2Timings } from "./act2/timing";
import { loadAct3Timings } from "./act3/timing";
import { loadAct4Timings } from "./act4/timing";
import { loadAct5Timings } from "./act5/timing";
import { loadAct6Timings } from "./act6/timing";
import voices from "./voice-manifest.json";
export type FullProps = {
  timings: ShotTiming[];
  act2Timings: ShotTiming[];
  act3Timings: ShotTiming[];
  act4Timings: ShotTiming[];
  act5Timings: ShotTiming[];
  act6Timings: ShotTiming[];
  act7Timings: ShotTiming[];
  act8Timings: ShotTiming[];
};
export const Full = ({
  timings,
  act2Timings,
  act3Timings,
  act4Timings,
  act5Timings,
  act6Timings,
  act7Timings,
  act8Timings,
}: FullProps) => (
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
    <TransitionSeries.Sequence
      name="第三幕 · NFO 里的性格与试错"
      durationInFrames={totalFrames(act3Timings)}
    >
      <Act3 name="第三幕" timings={act3Timings} />
    </TransitionSeries.Sequence>
    <TransitionSeries.Sequence
      name="第四幕 · 硬件、测试与五个月"
      durationInFrames={totalFrames(act4Timings)}
    >
      <Act4 name="第四幕" timings={act4Timings} />
    </TransitionSeries.Sequence>
    <TransitionSeries.Sequence
      name="第五幕 · 三十四个化名"
      durationInFrames={totalFrames(act5Timings)}
    >
      <Act5 name="第五幕" timings={act5Timings} />
    </TransitionSeries.Sequence>
    <TransitionSeries.Sequence
      name="第六幕 · Wuk0ng"
      durationInFrames={totalFrames(act6Timings)}
    >
      <Act6 name="第六幕" timings={act6Timings} />
    </TransitionSeries.Sequence>
    <TransitionSeries.Sequence
      name="第七幕 · 一个问号"
      durationInFrames={totalFrames(act7Timings)}
    >
      <Act7 name="第七幕" timings={act7Timings} />
    </TransitionSeries.Sequence>
    <TransitionSeries.Sequence
      name="第八幕 · 一份起诉书"
      durationInFrames={totalFrames(act8Timings)}
    >
      <Act8 name="第八幕" timings={act8Timings} />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
export const calculateFullMetadata: CalculateMetadataFunction<
  FullProps
> = async () => {
  const [
    durations,
    act2Timings,
    act3Timings,
    act4Timings,
    act5Timings,
    act6Timings,
    act7Timings,
    act8Timings,
  ] = await Promise.all([
    Promise.all(
      voices.map((v) =>
        getAudioDurationInSeconds(
          staticFile(v.file) + "?rev=" + v.sha256.slice(0, 12),
        ),
      ),
    ),
    loadAct2Timings(),
    loadAct3Timings(),
    loadAct4Timings(),
    loadAct5Timings(),
    loadAct6Timings(),
    loadAct7Timings(),
    loadAct8Timings(),
  ]);
  const timings = makeTimings(durations);
  return {
    durationInFrames:
      totalFrames(timings) +
      totalFrames(act2Timings) +
      totalFrames(act3Timings) +
      totalFrames(act4Timings) +
      totalFrames(act5Timings) +
      totalFrames(act6Timings) +
      totalFrames(act7Timings) +
      totalFrames(act8Timings),
    props: {
      timings,
      act2Timings,
      act3Timings,
      act4Timings,
      act5Timings,
      act6Timings,
      act7Timings,
      act8Timings,
    },
  };
};
