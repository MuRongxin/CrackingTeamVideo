import { matchesSpokenCue } from "../captionCue";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile, type CalculateMetadataFunction } from "remotion";
import { FPS, totalFrames, type ActProps, type ShotTiming } from "../timing";
import voices from "./voice-manifest.json";
import captions from "./captions.json";

export const specs4 = [
  { ids: [104, 105, 106, 107], post: 0.15 },
  { ids: [108, 109, 110, 111], post: 0.25 },
  { ids: [112, 113, 114, 115], post: 0.25 },
  { ids: [116, 117], post: 0.15 },
  { ids: [118, 119], post: 0.15 },
  { ids: [120, 121], post: 0.25 },
  { ids: [122, 123, 124], post: 0.15 },
  { ids: [125, 310], post: 0.15 },
  { ids: [127, 128, 129], post: 0.15 },
  { ids: [130, 131, 132], post: 0.15 },
  { ids: [133, 134, 135, 136], post: 0.15 },
];
export const makeAct4Timings = (durations: number[]): ShotTiming[] =>
  specs4.map((spec) => {
    let cursor = 0.1;
    const clips = spec.ids.map((id) => {
      const clip = { id, start: cursor, duration: durations[voices.findIndex((v) => v.id === id)] };
      cursor += clip.duration + 0.15;
      return clip;
    });
    return {
      duration: Math.ceil((cursor - 0.15 + spec.post) * FPS) / FPS,
      voices: clips,
    };
  });
export const initialAct4Timings = makeAct4Timings(
  voices.map((v) => v.duration),
);
export const loadAct4Timings = async () =>
  makeAct4Timings(
    await Promise.all(
      voices.map((v) =>
        getAudioDurationInSeconds(
          staticFile(v.file) + "?rev=" + v.sha256.slice(0, 12),
        ),
      ),
    ),
  );
export const calculateAct4Metadata: CalculateMetadataFunction<
  ActProps
> = async () => {
  const timings = await loadAct4Timings();
  return { durationInFrames: totalFrames(timings), props: { timings } };
};
export const say = (timing: ShotTiming, id: number, text?: string) => {
  const voice = timing.voices.find((v) => v.id === id);
  if (!voice) throw new Error(`Missing act 4 voice ${id}`);
  const rows = (
    captions as Record<string, { text: string; startMs: number }[]>
  )[id];
  const cue = text
    ? rows.find((c) => matchesSpokenCue(c.text, text))
    : null;
  if (text && !cue) throw new Error(`Missing act 4 caption ${id}: ${text}`);
  return voice.start + (cue?.startMs ?? 0) / 1000;
};
