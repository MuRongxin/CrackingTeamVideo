import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile, type CalculateMetadataFunction } from "remotion";
import voices from "./voice-manifest.json";

export const FPS = 60;
export const specs = [
  { ids: [1], pre: 1, gap: 0, post: 0.7, min: 6.6 },
  { ids: [2], pre: 0.3, gap: 0, post: 0.5, min: 4.2 },
  { ids: [3], pre: 0.4, gap: 0, post: 1.1, min: 4.8 },
  { ids: [4], pre: 0.45, gap: 0, post: 0.6, min: 4.7 },
  { ids: [5, 6], pre: 0.35, gap: 0.5, post: 1, min: 8.8 },
  { ids: [7, 8], pre: 0.4, gap: 0.6, post: 0.7, min: 10.6 },
  { ids: [9], pre: 0.5, gap: 0, post: 1.2, min: 7 },
  { ids: [], pre: 0, gap: 0, post: 0, min: 3.5 },
  { ids: [10, 11, 12, 13], pre: 0.5, gap: 0.3, post: 0.8, min: 14.6 },
  { ids: [14, 15], pre: 0.5, gap: 0.7, post: 0.65, min: 5.3 },
  { ids: [16, 17, 18, 19], pre: 0.5, gap: 0.4, post: 0.9, min: 14 },
];
export type ShotTiming = {
  duration: number;
  voices: { id: number; start: number; duration: number }[];
};
export type ActProps = { timings: ShotTiming[] };
export const makeTimings = (durations: number[]): ShotTiming[] =>
  specs.map((spec) => {
    let cursor = spec.pre;
    const clips = spec.ids.map((id) => {
      const clip = { id, start: cursor, duration: durations[id - 1] };
      cursor += clip.duration + spec.gap;
      return clip;
    });
    return {
      duration:
        Math.ceil(
          Math.max(
            spec.min,
            cursor - (clips.length ? spec.gap : 0) + spec.post,
          ) * FPS,
        ) / FPS,
      voices: clips,
    };
  });
export const initialTimings = makeTimings(voices.map((v) => v.duration));
export const totalFrames = (timings: ShotTiming[]) =>
  timings.reduce((sum, t) => sum + Math.round(t.duration * FPS), 0);
export const calculateActMetadata: CalculateMetadataFunction<
  ActProps
> = async () => {
  const durations = await Promise.all(
    voices.map((v) => getAudioDurationInSeconds(staticFile(v.file))),
  );
  const timings = makeTimings(durations);
  return { durationInFrames: totalFrames(timings), props: { timings } };
};
