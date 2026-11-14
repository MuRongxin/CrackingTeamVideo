import { matchesSpokenCue } from "../captionCue";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile, type CalculateMetadataFunction } from "remotion";
import { FPS, totalFrames, type ActProps, type ShotTiming } from "../timing";
import voices from "./voice-manifest.json";
import captions from "./captions.json";
export const specs5 = [
  { ids: [137, 138], post: 0.15 },
  { ids: [139, 140], post: 0.15 },
  { ids: [141, 142, 143], post: 0.25 },
  { ids: [144], post: 0.15 },
  { ids: [145, 146], post: 0.25 },
  { ids: [147, 148], post: 0.15 },
  { ids: [149, 150], post: 0.25 },
];
export const makeAct5Timings = (durations: number[]): ShotTiming[] =>
  specs5.map((s) => {
    let cursor = 0.1;
    const clips = s.ids.map((id) => {
      const clip = { id, start: cursor, duration: durations[id - 137] };
      cursor += clip.duration + 0.15;
      return clip;
    });
    return {
      duration: Math.ceil((cursor - 0.15 + s.post) * FPS) / FPS,
      voices: clips,
    };
  });
export const initialAct5Timings = makeAct5Timings(
  voices.map((v) => v.duration),
);
export const loadAct5Timings = async () =>
  makeAct5Timings(
    await Promise.all(
      voices.map((v) =>
        getAudioDurationInSeconds(
          staticFile(v.file) + "?rev=" + v.sha256.slice(0, 12),
        ),
      ),
    ),
  );
export const calculateAct5Metadata: CalculateMetadataFunction<
  ActProps
> = async () => {
  const timings = await loadAct5Timings();
  return { durationInFrames: totalFrames(timings), props: { timings } };
};
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
