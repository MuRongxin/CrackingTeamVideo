import { Interactive, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import type { ActProps } from "./timing";
import { Narration } from "./narration";
import { initialAct8Timings } from "./act8/timing";
import {
  Filing,
  Games,
  Circumvention,
  FirstCase,
  Injunction,
} from "./act8/Court";
import { Business, Accounts, Response, SameCourt } from "./act8/Network";
import { ReportedDisbanding, Contrast, NoFarewell } from "./act8/Aftermath";
import { Act8Sound } from "./act8/Sound";
export const act8Scenes = (timings: ActProps["timings"], fps: number) => {
  return (
    <>
      <TransitionSeries.Sequence
        name="A8-01 一份起诉书"
        durationInFrames={Math.round(timings[0].duration * fps)}
      >
        <Filing timing={timings[0]} />
        <Narration timing={timings[0]} />
        <Act8Sound shot={1} timing={timings[0]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A8-02 26款游戏"
        durationInFrames={Math.round(timings[1].duration * fps)}
      >
        <Games timing={timings[1]} />
        <Narration timing={timings[1]} />
        <Act8Sound shot={2} timing={timings[1]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A8-03 反规避条款"
        durationInFrames={Math.round(timings[2].duration * fps)}
      >
        <Circumvention timing={timings[2]} />
        <Narration timing={timings[2]} />
        <Act8Sound shot={3} timing={timings[2]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A8-04 技术生意"
        durationInFrames={Math.round(timings[3].duration * fps)}
      >
        <Business timing={timings[3]} />
        <Narration timing={timings[3]} />
        <Act8Sound shot={4} timing={timings[3]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A8-05 据其所知"
        durationInFrames={Math.round(timings[4].duration * fps)}
      >
        <FirstCase timing={timings[4]} />
        <Narration timing={timings[4]} />
        <Act8Sound shot={5} timing={timings[4]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A8-06 未来的游戏"
        durationInFrames={Math.round(timings[5].duration * fps)}
      >
        <Injunction timing={timings[5]} />
        <Narration timing={timings[5]} />
        <Act8Sound shot={6} timing={timings[5]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A8-07 只有账号"
        durationInFrames={Math.round(timings[6].duration * fps)}
      >
        <Accounts timing={timings[6]} />
        <Narration timing={timings[6]} />
        <Act8Sound shot={7} timing={timings[6]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A8-08 照常继续"
        durationInFrames={Math.round(timings[7].duration * fps)}
      >
        <Response timing={timings[7]} />
        <Narration timing={timings[7]} />
        <Act8Sound shot={8} timing={timings[7]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A8-09 同一家法院"
        durationInFrames={Math.round(timings[8].duration * fps)}
      >
        <SameCourt timing={timings[8]} />
        <Narration timing={timings[8]} />
        <Act8Sound shot={9} timing={timings[8]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A8-10 波及另一个团队"
        durationInFrames={Math.round(timings[9].duration * fps)}
      >
        <ReportedDisbanding timing={timings[9]} />
        <Narration timing={timings[9]} />
        <Act8Sound shot={10} timing={timings[9]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A8-11 两种反应"
        durationInFrames={Math.round(timings[10].duration * fps)}
      >
        <Contrast timing={timings[10]} />
        <Narration timing={timings[10]} />
        <Act8Sound shot={11} timing={timings[10]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A8-12 没有告别信"
        durationInFrames={Math.round(timings[11].duration * fps)}
      >
        <NoFarewell timing={timings[11]} />
        <Narration timing={timings[11]} />
        <Act8Sound shot={12} timing={timings[11]} />
      </TransitionSeries.Sequence>
    </>
  );
};
const Act8Inner = ({ timings = initialAct8Timings }: ActProps) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <TransitionSeries>{act8Scenes(timings, fps)}</TransitionSeries>
    </>
  );
};
export const Act8 = Interactive.create({
  Component: Act8Inner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});
