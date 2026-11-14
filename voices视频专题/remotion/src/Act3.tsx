import { Interactive, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import type { ActProps } from "./timing";
import { Narration } from "./narration";
import { initialAct3Timings } from "./act3/timing";
import {
  NfoGrows,
  KindIntro,
  Nitro,
  ZombiePuzzle,
  MI6,
  AnotherField,
  ProtectionLists,
} from "./act3/FilmNfo";
import { Thanks, SharedTool } from "./act3/FilmCredits";
import {
  DeadSpace,
  ThreeDays,
  ProperWord,
  EarlierBeta,
  Criticism,
  OwnProper,
  Sorry,
  ThreeDaysApart,
  EarlierFix,
} from "./act3/FilmProper";
import { Act3Sound } from "./act3/Sound";

export const act3Scenes = (timings: ActProps["timings"], fps: number) => {
  return (
    <>
      <TransitionSeries.Sequence
        name="A3-01 NFO 长大了"
        durationInFrames={Math.round(timings[0].duration * fps)}
      >
        <NfoGrows timing={timings[0]} />
        <Narration timing={timings[0]} />
        <Act3Sound shot={1} timing={timings[0]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-02 KIND"
        durationInFrames={Math.round(timings[1].duration * fps)}
      >
        <KindIntro timing={timings[1]} />
        <Narration timing={timings[1]} />
        <Act3Sound shot={2} timing={timings[1]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-03 加满氮气的快车"
        durationInFrames={Math.round(timings[2].duration * fps)}
      >
        <Nitro timing={timings[2]} />
        <Narration timing={timings[2]} />
        <Act3Sound shot={3} timing={timings[2]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-04 僵尸解谜模拟器"
        durationInFrames={Math.round(timings[3].duration * fps)}
      >
        <ZombiePuzzle timing={timings[3]} />
        <Narration timing={timings[3]} />
        <Act3Sound shot={4} timing={timings[3]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-05 军情六处的杀手"
        durationInFrames={Math.round(timings[4].duration * fps)}
      >
        <MI6 timing={timings[4]} />
        <Narration timing={timings[4]} />
        <Act3Sound shot={5} timing={timings[4]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-06 另一个字段"
        durationInFrames={Math.round(timings[5].duration * fps)}
      >
        <AnotherField timing={timings[5]} />
        <Narration timing={timings[5]} />
        <Act3Sound shot={6} timing={timings[5]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-07 保护组合"
        durationInFrames={Math.round(timings[6].duration * fps)}
      >
        <ProtectionLists timing={timings[6]} />
        <Narration timing={timings[6]} />
        <Act3Sound shot={7} timing={timings[6]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-08 特别感谢 anadius"
        durationInFrames={Math.round(timings[7].duration * fps)}
      >
        <Thanks timing={timings[7]} />
        <Narration timing={timings[7]} />
        <Act3Sound shot={8} timing={timings[7]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-09 工具的功劳"
        durationInFrames={Math.round(timings[8].duration * fps)}
      >
        <SharedTool timing={timings[8]} />
        <Narration timing={timings[8]} />
        <Act3Sound shot={9} timing={timings[8]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-10 死亡空间"
        durationInFrames={Math.round(timings[9].duration * fps)}
      >
        <DeadSpace timing={timings[9]} />
        <Narration timing={timings[9]} />
        <Act3Sound shot={10} timing={timings[9]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-11 PROPER"
        durationInFrames={Math.round(timings[10].duration * fps)}
      >
        <ProperWord timing={timings[10]} />
        <Narration timing={timings[10]} />
        <Act3Sound shot={11} timing={timings[10]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-12 0xZeOn 的测试版"
        durationInFrames={Math.round(timings[11].duration * fps)}
      >
        <EarlierBeta timing={timings[11]} />
        <Narration timing={timings[11]} />
        <Act3Sound shot={12} timing={timings[11]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-13 他对路线的批评"
        durationInFrames={Math.round(timings[12].duration * fps)}
      >
        <Criticism timing={timings[12]} />
        <Narration timing={timings[12]} />
        <Act3Sound shot={13} timing={timings[12]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-14 自己的老派 Proper"
        durationInFrames={Math.round(timings[13].duration * fps)}
      >
        <OwnProper timing={timings[13]} />
        <Narration timing={timings[13]} />
        <Act3Sound shot={14} timing={timings[13]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-15 三天后"
        durationInFrames={Math.round(timings[14].duration * fps)}
      >
        <ThreeDays timing={timings[14]} />
        <Narration timing={timings[14]} />
        <Act3Sound shot={15} timing={timings[14]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-16 抱歉，工具还要改"
        durationInFrames={Math.round(timings[15].duration * fps)}
      >
        <Sorry timing={timings[15]} />
        <Narration timing={timings[15]} />
        <Act3Sound shot={16} timing={timings[15]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-17 三天前／三天后"
        durationInFrames={Math.round(timings[16].duration * fps)}
      >
        <ThreeDaysApart timing={timings[16]} />
        <Narration timing={timings[16]} />
        <Act3Sound shot={17} timing={timings[16]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A3-18 老前辈也修过"
        durationInFrames={Math.round(timings[17].duration * fps)}
      >
        <EarlierFix timing={timings[17]} />
        <Narration timing={timings[17]} />
        <Act3Sound shot={18} timing={timings[17]} />
      </TransitionSeries.Sequence>
    </>
  );
};
const Act3Inner = ({ timings = initialAct3Timings }: ActProps) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <TransitionSeries>{act3Scenes(timings, fps)}</TransitionSeries>
    </>
  );
};
export const Act3 = Interactive.create({
  Component: Act3Inner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});
