import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile, type CalculateMetadataFunction } from "remotion";
import { FPS, totalFrames, type ActProps, type ShotTiming } from "../timing";
import voices from "./voice-manifest.json";
import captions from "./captions.json";
export const specs8 = [
  { ids: [211], post: 0.15 },
  { ids: [212, 213], post: 0.15 },
  { ids: [214, 215, 216, 217], post: 0.15 },
  { ids: [218, 219], post: 0.15 },
  { ids: [220], post: 0.15 },
  { ids: [221], post: 0.15 },
  { ids: [222], post: 0.15 },
  { ids: [223], post: 0.15 },
  { ids: [224, 225, 226, 227], post: 0.15 },
  { ids: [228, 229, 230, 231], post: 0.15 },
  { ids: [232, 233], post: 0.15 },
  { ids: [234, 235, 236], post: 0.6 },
];
export const makeAct8Timings = (durations: number[]): ShotTiming[] =>
  specs8.map((s) => {
    let cursor = 0.1;
    const clips = s.ids.map((id) => {
      const clip = { id, start: cursor, duration: durations[id - 211] };
      cursor += clip.duration + 0.15;
      return clip;
    });
    return {
      duration: Math.ceil((cursor - 0.15 + s.post) * FPS) / FPS,
      voices: clips,
    };
  });
export const initialAct8Timings = makeAct8Timings(
  voices.map((v) => v.duration),
);
export const loadAct8Timings = async () =>
  makeAct8Timings(
    await Promise.all(
      voices.map((v) =>
        getAudioDurationInSeconds(
          staticFile(v.file) + "?rev=" + v.sha256.slice(0, 12),
        ),
      ),
    ),
  );
export const calculateAct8Metadata: CalculateMetadataFunction<
  ActProps
> = async () => {
  const timings = await loadAct8Timings();
  return { durationInFrames: totalFrames(timings), props: { timings } };
};
export const say = (timing: ShotTiming, id: number, text?: string) => {
  const v = timing.voices.find((v) => v.id === id);
  if (!v) throw Error("Missing voice " + id);
  const rows = (
    captions as Record<string, { text: string; startMs: number }[]>
  )[id];
  const cue = text
    ? rows.find((c) => c.text.replace(/\n/g, "").includes(text))
    : null;
  if (text && !cue) throw Error("Missing cue " + id + ": " + text);
  return v.start + (cue?.startMs ?? 0) / 1000;
};
