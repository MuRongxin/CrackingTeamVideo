import { Interactive, useVideoConfig } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { Narration } from "./narration";
import type { ActProps } from "./timing";
import { initialAct2Timings } from "./act2/timing";
import { Rewind, OldGame, Signature } from "./act2/Origins";
import {
  WhatNfo,
  OldNfo,
  TinyNfo,
  FewLines,
  Versions,
  Updates,
} from "./act2/FilmOrigins";
import {
  DenuvoShell,
  LayerDiagram,
  CommercialWindow,
  FiveDays,
  DenuvoResponse,
} from "./act2/FilmProtection";
import { FirstAttempt } from "./act2/Voices";
import {
  QuietNews,
  WhyStarted,
  Retreat,
  CommunityTitle,
  DoubleMeaning,
  Caution,
  Unanswered,
} from "./act2/FilmVoices";
import { Act2Sound } from "./act2/Sound";
export const act2Scenes = (timings: ActProps["timings"], fps: number) => {
  return (
    <>
      <TransitionSeries.Sequence
        name="A2-01 倒带"
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
        <TinyNfo timing={timings[5]} />
        <Narration timing={timings[5]} />
        <Act2Sound shot={6} timing={timings[5]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-07 几行说明"
        durationInFrames={Math.round(timings[6].duration * fps)}
      >
        <FewLines timing={timings[6]} />
        <Narration timing={timings[6]} />
        <Act2Sound shot={7} timing={timings[6]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-08 三个发行年份"
        durationInFrames={Math.round(timings[7].duration * fps)}
      >
        <Versions timing={timings[7]} />
        <Narration timing={timings[7]} />
        <Act2Sound shot={8} timing={timings[7]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-09 新的是游戏版本"
        durationInFrames={Math.round(timings[8].duration * fps)}
      >
        <Updates timing={timings[8]} />
        <Narration timing={timings[8]} />
        <Act2Sound shot={9} timing={timings[8]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-10 D 加密"
        durationInFrames={Math.round(timings[9].duration * fps)}
      >
        <DenuvoShell timing={timings[9]} />
        <Narration timing={timings[9]} />
        <Act2Sound shot={10} timing={timings[9]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-11 反篡改层"
        durationInFrames={Math.round(timings[10].duration * fps)}
      >
        <LayerDiagram timing={timings[10]} />
        <Narration timing={timings[10]} />
        <Act2Sound shot={11} timing={timings[10]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-12 不必永远挡住"
        durationInFrames={Math.round(timings[11].duration * fps)}
      >
        <CommercialWindow timing={timings[11]} />
        <Narration timing={timings[11]} />
        <Act2Sound shot={12} timing={timings[11]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-13 五天"
        durationInFrames={Math.round(timings[12].duration * fps)}
      >
        <FiveDays timing={timings[12]} />
        <Narration timing={timings[12]} />
        <Act2Sound shot={13} timing={timings[12]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-14 Denuvo 的回应"
        durationInFrames={Math.round(timings[13].duration * fps)}
      >
        <DenuvoResponse timing={timings[13]} />
        <Narration timing={timings[13]} />
        <Act2Sound shot={14} timing={timings[13]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-15 本来不会有多少热度"
        durationInFrames={Math.round(timings[14].duration * fps)}
      >
        <QuietNews timing={timings[14]} />
        <Narration timing={timings[14]} />
        <Act2Sound shot={15} timing={timings[14]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-16 为什么开始"
        durationInFrames={Math.round(timings[15].duration * fps)}
      >
        <WhyStarted timing={timings[15]} />
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
        name="A2-18 退场的背景"
        durationInFrames={Math.round(timings[17].duration * fps)}
      >
        <Retreat timing={timings[17]} />
        <Narration timing={timings[17]} />
        <Act2Sound shot={18} timing={timings[17]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-19 we won？"
        durationInFrames={Math.round(timings[18].duration * fps)}
      >
        <CommunityTitle timing={timings[18]} />
        <Narration timing={timings[18]} />
        <Act2Sound shot={19} timing={timings[18]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-20 Voices cracked"
        durationInFrames={Math.round(timings[19].duration * fps)}
      >
        <DoubleMeaning timing={timings[19]} />
        <Narration timing={timings[19]} />
        <Act2Sound shot={20} timing={timings[19]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-21 有人暂不庆祝"
        durationInFrames={Math.round(timings[20].duration * fps)}
      >
        <Caution timing={timings[20]} />
        <Narration timing={timings[20]} />
        <Act2Sound shot={21} timing={timings[20]} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Sequence
        name="A2-22 当时还不知道"
        durationInFrames={Math.round(timings[21].duration * fps)}
      >
        <Unanswered />
        <Narration timing={timings[21]} />
        <Act2Sound shot={22} timing={timings[21]} />
      </TransitionSeries.Sequence>
    </>
  );
};
const Act2Inner = ({ timings = initialAct2Timings }: ActProps) => {
  const { fps } = useVideoConfig();
  return (
    <>
      <TransitionSeries>{act2Scenes(timings, fps)}</TransitionSeries>
    </>
  );
};
export const Act2 = Interactive.create({
  Component: Act2Inner,
  layout: "absolute-fill",
  schema: { ...Interactive.backgroundSchema },
});
