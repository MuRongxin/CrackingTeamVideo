import { Interactive, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { Narration } from "./narration";
import type { ActProps } from "./timing";
import { initialAct2Timings } from "./act2/timing";
import {
  Rewind,
  OldGame,
  Signature,
  WhatNfo,
  OldNfo,
  TinyNfo,
  FewLines,
  FortyGB,
} from "./act2/Origins";
import {
  Versions,
  Updates,
  DenuvoShell,
  LayerDiagram,
  LaunchWindow,
  Tail,
} from "./act2/Protection";
import {
  Research,
  FirstAttempt,
  IxbtOpening,
  Farewell,
  WeWon,
  Cracked,
  ColdWater,
  Expiry,
} from "./act2/Voices";
import { Act2Sound } from "./act2/Sound";
const Act2Inner = ({ timings = initialAct2Timings }: ActProps) => {
  const { fps } = useVideoConfig();
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence
        name="A2-01 倒带与幕标题"
        durationInFrames={Math.round(timings[0].duration * fps)}
      >
        <Rewind />
        <Act2Sound shot={1} timing={timings[0]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-02 六年前的老游戏"
        durationInFrames={Math.round(timings[1].duration * fps)}
      >
        <OldGame timing={timings[1]} />
        <Narration timing={timings[1]} />
        <Act2Sound shot={2} timing={timings[1]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-03 署名"
        durationInFrames={Math.round(timings[2].duration * fps)}
      >
        <Signature timing={timings[2]} />
        <Narration timing={timings[2]} />
        <Act2Sound shot={3} timing={timings[2]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-04 NFO 是什么"
        durationInFrames={Math.round(timings[3].duration * fps)}
      >
        <WhatNfo timing={timings[3]} />
        <Narration timing={timings[3]} />
        <Act2Sound shot={4} timing={timings[3]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-05 老 NFO 是作品"
        durationInFrames={Math.round(timings[4].duration * fps)}
      >
        <OldNfo timing={timings[4]} />
        <Narration timing={timings[4]} />
        <Act2Sound shot={5} timing={timings[4]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-06 0.34 KB"
        durationInFrames={Math.round(timings[5].duration * fps)}
      >
        <TinyNfo />
        <Narration timing={timings[5]} />
        <Act2Sound shot={6} timing={timings[5]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-07 几行字"
        durationInFrames={Math.round(timings[6].duration * fps)}
      >
        <FewLines timing={timings[6]} />
        <Narration timing={timings[6]} />
        <Act2Sound shot={7} timing={timings[6]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-08 40 GB"
        durationInFrames={Math.round(timings[7].duration * fps)}
      >
        <FortyGB />
        <Narration timing={timings[7]} />
        <Act2Sound shot={8} timing={timings[7]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-09 版本时间线"
        durationInFrames={Math.round(timings[8].duration * fps)}
      >
        <Versions timing={timings[8]} />
        <Narration timing={timings[8]} />
        <Act2Sound shot={9} timing={timings[8]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-10 更新加不进去"
        durationInFrames={Math.round(timings[9].duration * fps)}
      >
        <Updates timing={timings[9]} />
        <Narration timing={timings[9]} />
        <Act2Sound shot={10} timing={timings[9]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-11 Denuvo"
        durationInFrames={Math.round(timings[10].duration * fps)}
      >
        <DenuvoShell />
        <Narration timing={timings[10]} />
        <Act2Sound shot={11} timing={timings[10]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-12 包在外面的一层"
        durationInFrames={Math.round(timings[11].duration * fps)}
      >
        <LayerDiagram timing={timings[11]} />
        <Narration timing={timings[11]} />
        <Act2Sound shot={12} timing={timings[11]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-13 首发窗口"
        durationInFrames={Math.round(timings[12].duration * fps)}
      >
        <LaunchWindow timing={timings[12]} />
        <Narration timing={timings[12]} />
        <Act2Sound shot={13} timing={timings[12]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-14 本来不是新闻"
        durationInFrames={Math.round(timings[13].duration * fps)}
      >
        <Tail />
        <Narration timing={timings[13]} />
        <Act2Sound shot={14} timing={timings[13]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-15 一段话"
        durationInFrames={Math.round(timings[14].duration * fps)}
      >
        <Tail talk />
        <Narration timing={timings[14]} />
        <Act2Sound shot={15} timing={timings[14]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-16 逆向与旧破解"
        durationInFrames={Math.round(timings[15].duration * fps)}
      >
        <Research timing={timings[15]} />
        <Narration timing={timings[15]} />
        <Act2Sound shot={16} timing={timings[15]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-17 第一次尝试"
        durationInFrames={Math.round(timings[16].duration * fps)}
      >
        <FirstAttempt />
        <Narration timing={timings[16]} />
        <Act2Sound shot={17} timing={timings[16]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-18 iXBT 的开头"
        durationInFrames={Math.round(timings[17].duration * fps)}
      >
        <IxbtOpening timing={timings[17]} />
        <Narration timing={timings[17]} />
        <Act2Sound shot={18} timing={timings[17]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-19 告别声明"
        durationInFrames={Math.round(timings[18].duration * fps)}
      >
        <Farewell />
        <Narration timing={timings[18]} />
        <Act2Sound shot={19} timing={timings[18]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-20 we won ?"
        durationInFrames={Math.round(timings[19].duration * fps)}
      >
        <WeWon timing={timings[19]} />
        <Narration timing={timings[19]} />
        <Act2Sound shot={20} timing={timings[19]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-21 Voices cracked"
        durationInFrames={Math.round(timings[20].duration * fps)}
      >
        <Cracked timing={timings[20]} />
        <Narration timing={timings[20]} />
        <Act2Sound shot={21} timing={timings[20]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-22 泼冷水"
        durationInFrames={Math.round(timings[21].duration * fps)}
      >
        <ColdWater />
        <Narration timing={timings[21]} />
        <Act2Sound shot={22} timing={timings[21]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-23 保质期"
        durationInFrames={Math.round(timings[22].duration * fps)}
      >
        <Expiry timing={timings[22]} />
        <Narration timing={timings[22]} />
        <Act2Sound shot={23} timing={timings[22]} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
export const Act2 = Interactive.create({
  Component: Act2Inner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});
