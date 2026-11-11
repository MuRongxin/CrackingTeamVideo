import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile, type CalculateMetadataFunction } from "remotion";
import voices from "./voice-manifest.json";

export const FPS = 60;
// Voice-led cuts: hold is used only for a silent title, never as a speech floor.
export const specs = [
  { ids: [1], pre: 1, gap: 0, post: 0.15, hold: 0 },
  { ids: [2], pre: 0.1, gap: 0, post: 0.15, hold: 0 },
  { ids: [3], pre: 0.1, gap: 0, post: 0.35, hold: 0 },
  { ids: [4], pre: 0.1, gap: 0, post: 0.15, hold: 0 },
  { ids: [5], pre: 0.1, gap: 0, post: 0.15, hold: 0 },
  // The title now pays off the cold open before the subpoena explanation.
  { ids: [], pre: 0, gap: 0, post: 0, hold: 2.3 },
  { ids: [6], pre: 0.1, gap: 0, post: 0.15, hold: 0 },
  { ids: [7, 8], pre: 0.1, gap: 0.15, post: 0.15, hold: 0 },
  { ids: [9], pre: 0.1, gap: 0, post: 0, hold: 0 },
  { ids: [9], pre: 0, gap: 0, post: 0.15, hold: 0 },
  { ids: [10, 11], pre: 0.1, gap: 0.15, post: 0.45, hold: 0 },
];
export type ShotTiming = {
  duration: number;
  voices: {
    id: number;
    start: number;
    duration: number;
    trimBefore?: number;
  }[];
};
export type ActProps = { timings: ShotTiming[] };
export const makeTimings = (durations: number[]): ShotTiming[] =>
  specs.map((spec) => {
    let cursor = spec.pre;
    const clips = spec.ids.map((id) => {
      const trimBefore = spec === specs[9] ? 5.8 : 0;
      const duration = spec === specs[8] ? 5.8 : durations[id - 1] - trimBefore;
      const clip = { id, start: cursor, duration, trimBefore };
      cursor += clip.duration + spec.gap;
      return clip;
    });
    return {
      duration:
        Math.ceil(
          (clips.length ? cursor - spec.gap + spec.post : spec.hold) * FPS,
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
    voices.map((v) =>
      getAudioDurationInSeconds(
        staticFile(v.file) + "?rev=" + v.sha256.slice(0, 12),
      ),
    ),
  );
  const timings = makeTimings(durations);
  return { durationInFrames: totalFrames(timings), props: { timings } };
};
