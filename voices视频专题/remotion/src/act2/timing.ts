import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile, type CalculateMetadataFunction } from "remotion";
import { FPS, totalFrames, type ShotTiming, type ActProps } from "../timing";
import voices from "./voice-manifest.json";
export const specs2 = [
  { ids: [], pre: 0, gap: 0, post: 0, min: 2.8 },
  { ids: [20, 21], pre: 0.35, gap: 0.35, post: 0.7, min: 6.3 },
  { ids: [22, 23], pre: 0.3, gap: 0.6, post: 0.9, min: 4.5 },
  { ids: [24, 25], pre: 0.35, gap: 0.3, post: 0.8, min: 6.8 },
  { ids: [26, 27, 28], pre: 0.4, gap: 0.4, post: 1, min: 11.5 },
  { ids: [29], pre: 0.4, gap: 0, post: 1, min: 4.5 },
  { ids: [30, 31], pre: 0.4, gap: 0.5, post: 1, min: 10 },
  { ids: [32], pre: 0.4, gap: 0, post: 1, min: 4.8 },
  { ids: [33, 34, 35], pre: 0.3, gap: 0.4, post: 0.8, min: 11.8 },
  { ids: [36, 37, 38], pre: 0.4, gap: 0.3, post: 0.7, min: 9 },
  { ids: [39], pre: 0.3, gap: 0, post: 0.8, min: 3.2 },
  { ids: [40, 41], pre: 0.4, gap: 0.3, post: 1, min: 9 },
  { ids: [42, 43, 44], pre: 0.4, gap: 0.45, post: 0.9, min: 12.2 },
  { ids: [45], pre: 0.4, gap: 0, post: 0.9, min: 5.2 },
  { ids: [46], pre: 0.4, gap: 0, post: 0.8, min: 4.2 },
  { ids: [47, 48, 49, 50, 51], pre: 0.4, gap: 0.25, post: 1, min: 12.5 },
  { ids: [52], pre: 0.4, gap: 0, post: 1.5, min: 4.5 },
  { ids: [53, 54], pre: 0.4, gap: 0.45, post: 1, min: 9 },
  { ids: [55], pre: 0.5, gap: 0, post: 1, min: 4.5 },
  { ids: [56, 57, 58], pre: 0.4, gap: 0.35, post: 0.8, min: 6.5 },
  { ids: [59, 60, 61], pre: 0.4, gap: 0.35, post: 1, min: 10.5 },
  { ids: [62, 63], pre: 0.4, gap: 0.3, post: 1, min: 7 },
  { ids: [64], pre: 0.5, gap: 0, post: 1.2, min: 4.5 },
];
export const makeAct2Timings = (durations: number[]): ShotTiming[] =>
  specs2.map((s) => {
    let cursor = s.pre;
    const clips = s.ids.map((id) => {
      const c = { id, start: cursor, duration: durations[id - 20] };
      cursor += c.duration + s.gap;
      return c;
    });
    return {
      duration:
        Math.ceil(
          Math.max(s.min, cursor - (clips.length ? s.gap : 0) + s.post) * FPS,
        ) / FPS,
      voices: clips,
    };
  });
export const initialAct2Timings = makeAct2Timings(
  voices.map((v) => v.duration),
);
export const loadAct2Timings = async () =>
  makeAct2Timings(
    await Promise.all(
      voices.map((v) => getAudioDurationInSeconds(staticFile(v.file))),
    ),
  );
export const calculateAct2Metadata: CalculateMetadataFunction<
  ActProps
> = async () => {
  const timings = await loadAct2Timings();
  return { durationInFrames: totalFrames(timings), props: { timings } };
};
