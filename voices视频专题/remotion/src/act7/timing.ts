import { matchesSpokenCue } from "../captionCue";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile, type CalculateMetadataFunction } from "remotion";
import { FPS, totalFrames, type ActProps, type ShotTiming } from "../timing";
import voices from "./voice-manifest.json";
import captions from "./captions.json";
export const specs7 = [
  { ids: [189, 190], post: 0.15 },
  { ids: [191, 192, 193], post: 0.15 },
  { ids: [194, 195, 196, 197], post: 0.15 },
  { ids: [198, 199, 200], post: 0.15 },
  { ids: [201, 202, 203], post: 0.15 },
  { ids: [204, 205, 206], post: 0.25 },
  { ids: [207, 208, 209], post: 0.15 },
  { ids: [210], post: 0.85 },
];
export const makeAct7Timings = (durations: number[]): ShotTiming[] =>
  specs7.map((s) => {
    let cursor = 0.1;
    const clips = s.ids.map((id) => {
      const clip = { id, start: cursor, duration: durations[id - 189] };
      cursor += clip.duration + (id === 204 ? 0.65 : 0.15);
      return clip;
    });
    return {
      duration: Math.ceil((cursor - 0.15 + s.post) * FPS) / FPS,
      voices: clips,
    };
  });
export const initialAct7Timings = makeAct7Timings(
  voices.map((v) => v.duration),
);
export const loadAct7Timings = async () =>
  makeAct7Timings(
    await Promise.all(
      voices.map((v) =>
        getAudioDurationInSeconds(
          staticFile(v.file) + "?rev=" + v.sha256.slice(0, 12),
        ),
      ),
    ),
  );
export const calculateAct7Metadata: CalculateMetadataFunction<
  ActProps
> = async () => {
  const timings = await loadAct7Timings();
  return { durationInFrames: totalFrames(timings), props: { timings } };
};
export const say = (timing: ShotTiming, id: number, text?: string) => {
  const v = timing.voices.find((v) => v.id === id);
  if (!v) throw Error("Missing voice " + id);
  const rows = (
    captions as Record<string, { text: string; startMs: number }[]>
  )[id];
  const cue = text
    ? rows.find((c) => matchesSpokenCue(c.text, text))
    : null;
  if (text && !cue) throw Error("Missing cue " + id + ": " + text);
  return v.start + (cue?.startMs ?? 0) / 1000;
};
