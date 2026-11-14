import { Interactive, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import type { ActProps } from "./timing";
import { Narration } from "./narration";
import { initialAct4Timings } from "./act4/timing";
import { Funding, Supporters, RamPrices } from "./act4/Funding";
import {
  LinuxTesting,
  TestingLimits,
  NewYear,
  HardwareProgress,
  NewVersions,
} from "./act4/Testing";
import { DarkAges, FiveMonths, Conditions } from "./act4/Breakthrough";
import { Act4Sound } from "./act4/Sound";
export const act4Scenes = (timings: ActProps["timings"], fps: number) => {
  return (
    <>
      <TransitionSeries.Sequence
        name="A4-01 钱用来做什么"
        durationInFrames={Math.round(timings[0].duration * fps)}
      >
        <Funding timing={timings[0]} />
        <Narration timing={timings[0]} />
        <Act4Sound shot={1} timing={timings[0]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A4-02 匿名支持者"
        durationInFrames={Math.round(timings[1].duration * fps)}
      >
        <Supporters timing={timings[1]} />
        <Narration timing={timings[1]} />
        <Act4Sound shot={2} timing={timings[1]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A4-03 内存涨价"
        durationInFrames={Math.round(timings[2].duration * fps)}
      >
        <RamPrices timing={timings[2]} />
        <Narration timing={timings[2]} />
        <Act4Sound shot={3} timing={timings[2]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A4-04 Linux 测试"
        durationInFrames={Math.round(timings[3].duration * fps)}
      >
        <LinuxTesting timing={timings[3]} />
        <Narration timing={timings[3]} />
        <Act4Sound shot={4} timing={timings[3]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A4-05 测试不等于保证"
        durationInFrames={Math.round(timings[4].duration * fps)}
      >
        <TestingLimits timing={timings[4]} />
        <Narration timing={timings[4]} />
        <Act4Sound shot={5} timing={timings[4]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A4-06 新年祝福"
        durationInFrames={Math.round(timings[5].duration * fps)}
      >
        <NewYear timing={timings[5]} />
        <Narration timing={timings[5]} />
        <Act4Sound shot={6} timing={timings[5]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A4-07 测试目标 35%"
        durationInFrames={Math.round(timings[6].duration * fps)}
      >
        <HardwareProgress timing={timings[6]} />
        <Narration timing={timings[6]} />
        <Act4Sound shot={7} timing={timings[6]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A4-08 继续研究新版本"
        durationInFrames={Math.round(timings[7].duration * fps)}
      >
        <NewVersions timing={timings[7]} />
        <Narration timing={timings[7]} />
        <Act4Sound shot={8} timing={timings[7]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A4-09 黑暗时代"
        durationInFrames={Math.round(timings[8].duration * fps)}
      >
        <DarkAges timing={timings[8]} />
        <Narration timing={timings[8]} />
        <Act4Sound shot={9} timing={timings[8]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A4-10 五个月后的回扣"
        durationInFrames={Math.round(timings[9].duration * fps)}
      >
        <FiveMonths timing={timings[9]} />
        <Narration timing={timings[9]} />
        <Act4Sound shot={10} timing={timings[9]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A4-11 研究的条件"
        durationInFrames={Math.round(timings[10].duration * fps)}
      >
        <Conditions timing={timings[10]} />
        <Narration timing={timings[10]} />
        <Act4Sound shot={11} timing={timings[10]} />
      </TransitionSeries.Sequence>
    </>
  );
};
const Act4Inner = ({ timings = initialAct4Timings }: ActProps) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <TransitionSeries>{act4Scenes(timings, fps)}</TransitionSeries>
    </>
  );
};
export const Act4 = Interactive.create({
  Component: Act4Inner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});
