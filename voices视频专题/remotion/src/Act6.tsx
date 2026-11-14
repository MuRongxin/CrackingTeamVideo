import { Interactive, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import type { ActProps } from "./timing";
import { Narration } from "./narration";
import { initialAct6Timings } from "./act6/timing";
import {
  TwoRoutes,
  Hypervisor,
  DayOne,
  SystemCost,
  OldSchool,
} from "./act6/Routes";
import { Encounter, NoAgreement, Compatibility } from "./act6/Encounter";
import { DyingSimulator, FilterTitle, ReleaseInterval } from "./act6/Release";
import { Rivals, Clarification, Meanwhile } from "./act6/Dialogue";
import { Act6Sound } from "./act6/Sound";
export const act6Scenes = (timings: ActProps["timings"], fps: number) => {
  return (
    <>
      <TransitionSeries.Sequence
        name="A6-01 两条路"
        durationInFrames={Math.round(timings[0].duration * fps)}
      >
        <TwoRoutes timing={timings[0]} />
        <Narration timing={timings[0]} />
        <Act6Sound shot={1} timing={timings[0]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A6-02 Hypervisor 的位置"
        durationInFrames={Math.round(timings[1].duration * fps)}
      >
        <Hypervisor timing={timings[1]} />
        <Narration timing={timings[1]} />
        <Act6Sound shot={2} timing={timings[1]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A6-03 发售当天"
        durationInFrames={Math.round(timings[2].duration * fps)}
      >
        <DayOne timing={timings[2]} />
        <Narration timing={timings[2]} />
        <Act6Sound shot={3} timing={timings[2]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A6-04 系统环境的代价"
        durationInFrames={Math.round(timings[3].duration * fps)}
      >
        <SystemCost timing={timings[3]} />
        <Narration timing={timings[3]} />
        <Act6Sound shot={4} timing={timings[3]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A6-05 old school"
        durationInFrames={Math.round(timings[4].duration * fps)}
      >
        <OldSchool timing={timings[4]} />
        <Narration timing={timings[4]} />
        <Act6Sound shot={5} timing={timings[4]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A6-06 在悟空上相遇"
        durationInFrames={Math.round(timings[5].duration * fps)}
      >
        <Encounter timing={timings[5]} />
        <Narration timing={timings[5]} />
        <Act6Sound shot={6} timing={timings[5]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A6-07 没有协议"
        durationInFrames={Math.round(timings[6].duration * fps)}
      >
        <NoAgreement timing={timings[6]} />
        <Narration timing={timings[6]} />
        <Act6Sound shot={7} timing={timings[6]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A6-08 兼容性与长期保存"
        durationInFrames={Math.round(timings[7].duration * fps)}
      >
        <Compatibility timing={timings[7]} />
        <Narration timing={timings[7]} />
        <Act6Sound shot={8} timing={timings[7]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A6-09 死亡模拟器"
        durationInFrames={Math.round(timings[8].duration * fps)}
      >
        <DyingSimulator timing={timings[8]} />
        <Narration timing={timings[8]} />
        <Act6Sound shot={9} timing={timings[8]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A6-10 a → 4，o → 0"
        durationInFrames={Math.round(timings[9].duration * fps)}
      >
        <FilterTitle timing={timings[9]} />
        <Narration timing={timings[9]} />
        <Act6Sound shot={10} timing={timings[9]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A6-11 133 GB，18 天"
        durationInFrames={Math.round(timings[10].duration * fps)}
      >
        <ReleaseInterval timing={timings[10]} />
        <Narration timing={timings[10]} />
        <Act6Sound shot={11} timing={timings[10]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A6-12 是对手吗"
        durationInFrames={Math.round(timings[11].duration * fps)}
      >
        <Rivals timing={timings[11]} />
        <Narration timing={timings[11]} />
        <Act6Sound shot={12} timing={timings[11]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A6-13 KiriGiri 的澄清"
        durationInFrames={Math.round(timings[12].duration * fps)}
      >
        <Clarification timing={timings[12]} />
        <Narration timing={timings[12]} />
        <Act6Sound shot={13} timing={timings[12]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A6-14 先有得玩"
        durationInFrames={Math.round(timings[13].duration * fps)}
      >
        <Meanwhile timing={timings[13]} />
        <Narration timing={timings[13]} />
        <Act6Sound shot={14} timing={timings[13]} />
      </TransitionSeries.Sequence>
    </>
  );
};
const Act6Inner = ({ timings = initialAct6Timings }: ActProps) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <TransitionSeries>{act6Scenes(timings, fps)}</TransitionSeries>
    </>
  );
};
export const Act6 = Interactive.create({
  Component: Act6Inner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});
