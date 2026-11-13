import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile, type CalculateMetadataFunction } from "remotion";
import { FPS, totalFrames, type ActProps, type ShotTiming } from "../timing";
import voices from "./voice-manifest.json";
import captions from "./captions.json";
export const specs10 = [
  { ids: [279, 280], post: 0.15 },
  { ids: [281, 282, 283], post: 0.15 },
  { ids: [284, 285, 286], post: 0.3 },
  { ids: [287], post: 0.15 },
  { ids: [288, 289, 290, 291], post: 0.15 },
  { ids: [292], post: 0.65 },
  { ids: [293, 294, 295], post: 0.15 },
  { ids: [296], post: 0.3 },
  { ids: [297], post: 5 },
];
export const makeAct10Timings = (durations: number[]): ShotTiming[] =>
  specs10.map((s) => {
    let cursor = 0.1;
    const clips = s.ids.map((id) => {
      const duration = durations[id - 279];
      const clip = { id, start: cursor, duration };
      cursor += duration + 0.15;
      return clip;
    });
    return {
      duration: Math.ceil((cursor - 0.15 + s.post) * FPS) / FPS,
      voices: clips,
    };
  });
export const initialAct10Timings = makeAct10Timings(
  voices.map((v) => v.duration),
);
export const loadAct10Timings = async () =>
  makeAct10Timings(
    await Promise.all(
      voices.map((v) =>
        getAudioDurationInSeconds(
          staticFile(v.file) + "?rev=" + v.sha256.slice(0, 12),
        ),
      ),
    ),
  );
export const calculateAct10Metadata: CalculateMetadataFunction<
  ActProps
> = async () => {
  const timings = await loadAct10Timings();
  return { durationInFrames: totalFrames(timings), props: { timings } };
};
export const say = (timing: ShotTiming, id: number, text?: string) => {
  const v = timing.voices.find((v) => v.id === id);
  if (!v) throw Error("Missing voice " + id);
  const row = text
    ? (captions as Record<string, { text: string; startMs: number }[]>)[
        id
      ].find((c) => c.text.replace(/\n/g, "").includes(text))
    : undefined;
  if (text && !row) throw Error("Missing cue " + id + ": " + text);
  return v.start + (row?.startMs ?? 0) / 1000;
};
