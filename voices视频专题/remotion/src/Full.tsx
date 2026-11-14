import {
  Sequence,
  useVideoConfig,
  type CalculateMetadataFunction,
} from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile } from "remotion";
import { act1Scenes } from "./Act1";
import { act2Scenes } from "./Act2";
import { act3Scenes } from "./Act3";
import { act4Scenes } from "./Act4";
import { act5Scenes } from "./Act5";
import { act6Scenes } from "./Act6";
import { act7Scenes } from "./Act7";
import { act9Scenes } from "./Act9";
import { act10Scenes } from "./Act10";
import { loadAct10Timings } from "./act10/timing";
import { loadAct9Timings } from "./act9/timing";
import { act8Scenes } from "./Act8";
import { loadAct8Timings } from "./act8/timing";
import { loadAct7Timings } from "./act7/timing";
import { makeTimings, totalFrames, type ShotTiming } from "./timing";
import { loadAct2Timings } from "./act2/timing";
import { loadAct3Timings } from "./act3/timing";
import { loadAct4Timings } from "./act4/timing";
import { loadAct5Timings } from "./act5/timing";
import { loadAct6Timings } from "./act6/timing";
import voices from "./voice-manifest.json";
import { MasterMusic } from "./music/MasterMusic";
import { EpilogueSound } from "./act10/Sound";
export type FullProps = {
  timings: ShotTiming[];
  act2Timings: ShotTiming[];
  act3Timings: ShotTiming[];
  act4Timings: ShotTiming[];
  act5Timings: ShotTiming[];
  act6Timings: ShotTiming[];
  act7Timings: ShotTiming[];
  act8Timings: ShotTiming[];
  act9Timings: ShotTiming[];
  act10Timings: ShotTiming[];
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
  act9Timings,
  act10Timings,
}: FullProps) => {
  const { fps } = useVideoConfig();
  const groups = [
    timings,
    act2Timings,
    act3Timings,
    act4Timings,
    act5Timings,
    act6Timings,
    act7Timings,
    act8Timings,
    act9Timings,
    act10Timings,
  ];
  const framesAtCurrentFps = (group: ShotTiming[]) =>
    group.reduce((sum, shot) => sum + Math.round(shot.duration * fps), 0);
  const finalActStart = groups
    .slice(0, 9)
    .reduce((sum, group) => sum + framesAtCurrentFps(group), 0);
  return (
    <>
      <MasterMusic groups={groups} />
      <Sequence
        name="尾声轻音效"
        from={finalActStart}
        durationInFrames={framesAtCurrentFps(act10Timings)}
      >
        <EpilogueSound timings={act10Timings} withScore={false} />
      </Sequence>
      <TransitionSeries>
        {act1Scenes(timings, fps)}
        {act2Scenes(act2Timings, fps)}
        {act3Scenes(act3Timings, fps)}
        {act4Scenes(act4Timings, fps)}
        {act5Scenes(act5Timings, fps)}
        {act6Scenes(act6Timings, fps)}
        {act7Scenes(act7Timings, fps)}
        {act8Scenes(act8Timings, fps)}
        {act9Scenes(act9Timings, fps)}
        {act10Scenes(act10Timings, fps, false)}
      </TransitionSeries>
    </>
  );
};
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
    act9Timings,
    act10Timings,
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
    loadAct9Timings(),
    loadAct10Timings(),
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
      totalFrames(act8Timings) +
      totalFrames(act9Timings) +
      totalFrames(act10Timings),
    props: {
      timings,
      act2Timings,
      act3Timings,
      act4Timings,
      act5Timings,
      act6Timings,
      act7Timings,
      act8Timings,
      act9Timings,
      act10Timings,
    },
  };
};
