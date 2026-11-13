import { Interactive, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import type { ActProps } from "./timing";
import { Narration } from "./narration";
import { initialAct9Timings } from "./act9/timing";
import { Act9Sound } from "./act9/Sound";
import {
  EarlyDiscovery,
  PriorContact,
  DataScope,
  ProceduralOrder,
  Privacy,
  Narrowing,
  Pseudonym,
  Permission,
} from "./act9/Discovery";
import {
  ReturningReleases,
  Exorcism,
  BetterTools,
  Disappeared,
  SurvivingPosts,
  RenameReport,
  OneLetter,
} from "./act9/Activity";
import { Onimusha, RepairReport } from "./act9/Repairs";
const Act9Inner = ({ timings = initialAct9Timings }: ActProps) => {
  const { fps } = useVideoConfig();
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence
        name="A9-01 提前取证"
        durationInFrames={Math.round(timings[0].duration * fps)}
      >
        <EarlyDiscovery timing={timings[0]} />
        <Narration timing={timings[0]} />
        <Act9Sound shot={1} timing={timings[0]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A9-02 先问平台"
        durationInFrames={Math.round(timings[1].duration * fps)}
      >
        <PriorContact timing={timings[1]} />
        <Narration timing={timings[1]} />
        <Act9Sound shot={2} timing={timings[1]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A9-03 请求的数据"
        durationInFrames={Math.round(timings[2].duration * fps)}
      >
        <DataScope timing={timings[2]} />
        <Narration timing={timings[2]} />
        <Act9Sound shot={3} timing={timings[2]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A9-04 程序问题"
        durationInFrames={Math.round(timings[3].duration * fps)}
      >
        <ProceduralOrder timing={timings[3]} />
        <Narration timing={timings[3]} />
        <Act9Sound shot={4} timing={timings[3]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A9-05 隐私与范围"
        durationInFrames={Math.round(timings[4].duration * fps)}
      >
        <Privacy timing={timings[4]} />
        <Narration timing={timings[4]} />
        <Act9Sound shot={5} timing={timings[4]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A9-06 46到9"
        durationInFrames={Math.round(timings[5].duration * fps)}
      >
        <Narrowing timing={timings[5]} />
        <Narration timing={timings[5]} />
        <Act9Sound shot={6} timing={timings[5]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A9-07 只有化名"
        durationInFrames={Math.round(timings[6].duration * fps)}
      >
        <Pseudonym timing={timings[6]} />
        <Narration timing={timings[6]} />
        <Act9Sound shot={7} timing={timings[6]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A9-08 准许与期限"
        durationInFrames={Math.round(timings[7].duration * fps)}
      >
        <Permission timing={timings[7]} />
        <Narration timing={timings[7]} />
        <Act9Sound shot={8} timing={timings[7]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A9-09 发行再次出现"
        durationInFrames={Math.round(timings[8].duration * fps)}
      >
        <ReturningReleases timing={timings[8]} />
        <Narration timing={timings[8]} />
        <Act9Sound shot={9} timing={timings[8]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A9-10 驱魔"
        durationInFrames={Math.round(timings[9].duration * fps)}
      >
        <Exorcism timing={timings[9]} />
        <Narration timing={timings[9]} />
        <Act9Sound shot={10} timing={timings[9]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A9-11 更好的工具"
        durationInFrames={Math.round(timings[10].duration * fps)}
      >
        <BetterTools timing={timings[10]} />
        <Narration timing={timings[10]} />
        <Act9Sound shot={11} timing={timings[10]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A9-12 两天后消失"
        durationInFrames={Math.round(timings[11].duration * fps)}
      >
        <Disappeared timing={timings[11]} />
        <Narration timing={timings[11]} />
        <Act9Sound shot={12} timing={timings[11]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A9-13 留下的帖子"
        durationInFrames={Math.round(timings[12].duration * fps)}
      >
        <SurvivingPosts timing={timings[12]} />
        <Narration timing={timings[12]} />
        <Act9Sound shot={13} timing={timings[12]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A9-14 旧帖还在"
        durationInFrames={Math.round(timings[13].duration * fps)}
      >
        <RenameReport timing={timings[13]} />
        <Narration timing={timings[13]} />
        <Act9Sound shot={14} timing={timings[13]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A9-15 一个字母"
        durationInFrames={Math.round(timings[14].duration * fps)}
      >
        <OneLetter timing={timings[14]} />
        <Narration timing={timings[14]} />
        <Act9Sound shot={15} timing={timings[14]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A9-16 鬼武者与修复"
        durationInFrames={Math.round(timings[15].duration * fps)}
      >
        <Onimusha timing={timings[15]} />
        <Narration timing={timings[15]} />
        <Act9Sound shot={16} timing={timings[15]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A9-17 修复的是游戏"
        durationInFrames={Math.round(timings[16].duration * fps)}
      >
        <RepairReport timing={timings[16]} />
        <Narration timing={timings[16]} />
        <Act9Sound shot={17} timing={timings[16]} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
export const Act9 = Interactive.create({
  Component: Act9Inner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});
