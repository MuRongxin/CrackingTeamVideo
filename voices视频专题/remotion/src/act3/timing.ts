import { matchesSpokenCue } from "../captionCue";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile, type CalculateMetadataFunction } from "remotion";
import { FPS, totalFrames, type ActProps, type ShotTiming } from "../timing";
import voices from "./voice-manifest.json";
import captions from "./captions.json";

// Estimated storyboard lengths are never a minimum. The two emphasis cuts are
// explicit: 0.25 s after the jokes, 0.35 s after the apology comparison.
export const specs3 = [
  { ids: [54, 55, 56, 57], post: 0.15 },
  { ids: [58, 59, 60], post: 0.15 },
  { ids: [61], post: 0.25 },
  { ids: [62, 63], post: 0.25 },
  { ids: [64, 65], post: 0.25 },
  { ids: [66, 67, 68], post: 0.15 },
  { ids: [69, 70, 71], post: 0.15 },
  { ids: [72, 73, 74], post: 0.15 },
  { ids: [75, 76, 77, 78], post: 0.15 },
  { ids: [79, 80, 81, 82], post: 0.15 },
  { ids: [83, 84, 85], post: 0.15 },
  { ids: [86, 87, 88], post: 0.15 },
  { ids: [89, 90, 91, 92], post: 0.15 },
  { ids: [93, 94], post: 0.25 },
  { ids: [95, 96], post: 0.15 },
  { ids: [97, 98], post: 0.15 },
  { ids: [99, 100], post: 0.35 },
  { ids: [101, 102, 103], post: 0.15 },
];
export const makeAct3Timings = (durations: number[]): ShotTiming[] =>
  specs3.map((spec) => {
    let cursor = 0.1;
    const clips = spec.ids.map((id) => {
      const clip = { id, start: cursor, duration: durations[id - 54] };
      cursor += clip.duration + 0.15;
      return clip;
    });
    return {
      duration: Math.ceil((cursor - 0.15 + spec.post) * FPS) / FPS,
      voices: clips,
    };
  });
export const initialAct3Timings = makeAct3Timings(
  voices.map((v) => v.duration),
);
export const loadAct3Timings = async () =>
  makeAct3Timings(
    await Promise.all(
      voices.map((v) =>
        getAudioDurationInSeconds(
          staticFile(v.file) + "?rev=" + v.sha256.slice(0, 12),
        ),
      ),
    ),
  );
export const calculateAct3Metadata: CalculateMetadataFunction<
  ActProps
> = async () => {
  const timings = await loadAct3Timings();
  return { durationInFrames: totalFrames(timings), props: { timings } };
};
// Readable narrative landmarks share the caption/source clock. Visual edits do
// not add time to the shot. Exact onomatopoeia offsets live in motion.ts.
export const say = (timing: ShotTiming, id: number, text?: string) => {
  const voice = timing.voices.find((v) => v.id === id);
  if (!voice) throw new Error(`Missing voice ${id}`);
  const rows = (
    captions as Record<string, { text: string; startMs: number }[]>
  )[id];
  const cue = text
    ? rows.find((c) => matchesSpokenCue(c.text, text))
    : null;
  if (text && !cue) throw new Error(`Missing caption cue ${id}: ${text}`);
  return voice.start + (cue?.startMs ?? 0) / 1000;
};
