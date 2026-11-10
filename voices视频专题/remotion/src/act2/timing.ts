import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile, type CalculateMetadataFunction } from "remotion";
import { FPS, totalFrames, type ShotTiming, type ActProps } from "../timing";
import voices from "./voice-manifest.json";
// Speech duration plus editorial breathing room; no estimated shot-length floor.
export const specs2 = [
  { ids: [], pre: 0, gap: 0, post: 0, hold: 2.2 },
  { ids: [12], pre: 0.1, gap: 0, post: 0.15, hold: 0 },
  { ids: [13], pre: 0.1, gap: 0, post: 0.15, hold: 0 },
  { ids: [14], pre: 0.1, gap: 0, post: 0.15, hold: 0 },
  { ids: [15, 16], pre: 0.1, gap: 0.15, post: 0.15, hold: 0 },
  { ids: [17], pre: 0.1, gap: 0, post: 0.25, hold: 0 },
  { ids: [18, 19], pre: 0.1, gap: 0.15, post: 0.15, hold: 0 },
  { ids: [20, 21, 22, 23], pre: 0.1, gap: 0.15, post: 0.15, hold: 0 },
  { ids: [24], pre: 0.1, gap: 0, post: 0.15, hold: 0 },
  { ids: [25], pre: 0.1, gap: 0, post: 0.15, hold: 0 },
  { ids: [26], pre: 0.1, gap: 0, post: 0.15, hold: 0 },
  { ids: [27, 28, 29], pre: 0.1, gap: 0.15, post: 0.15, hold: 0 },
  { ids: [30, 31], pre: 0.1, gap: 0.15, post: 0.15, hold: 0 },
  { ids: [32, 33, 34], pre: 0.1, gap: 0.15, post: 0.15, hold: 0 },
  { ids: [35], pre: 0.1, gap: 0, post: 0.15, hold: 0 },
  { ids: [36, 37], pre: 0.1, gap: 0.15, post: 0.15, hold: 0 },
  { ids: [38], pre: 0.1, gap: 0, post: 0.6, hold: 0 },
  { ids: [39, 40], pre: 0.1, gap: 0.15, post: 0.15, hold: 0 },
  { ids: [41, 42, 43, 44, 45], pre: 0.1, gap: 0.15, post: 0.15, hold: 0 },
  { ids: [46, 47, 48, 49], pre: 0.1, gap: 0.15, post: 0.25, hold: 0 },
  { ids: [50, 51, 52], pre: 0.1, gap: 0.15, post: 0.15, hold: 0 },
  { ids: [53], pre: 0.1, gap: 0, post: 0.3, hold: 0 },
];
export const makeAct2Timings = (durations: number[]): ShotTiming[] =>
  specs2.map((s) => {
    let cursor = s.pre;
    const clips = s.ids.map((id) => {
      const c = { id, start: cursor, duration: durations[id - 12] };
      cursor += c.duration + s.gap;
      return c;
    });
    return {
      duration:
        Math.ceil((clips.length ? cursor - s.gap + s.post : s.hold) * FPS) /
        FPS,
      voices: clips,
    };
  });
export const initialAct2Timings = makeAct2Timings(
  voices.map((v) => v.duration),
);
export const loadAct2Timings = async () =>
  makeAct2Timings(
    await Promise.all(
      voices.map((v) =>
        getAudioDurationInSeconds(
          staticFile(v.file) + "?rev=" + v.sha256.slice(0, 12),
        ),
      ),
    ),
  );
export const calculateAct2Metadata: CalculateMetadataFunction<
  ActProps
> = async () => {
  const timings = await loadAct2Timings();
  return { durationInFrames: totalFrames(timings), props: { timings } };
};
