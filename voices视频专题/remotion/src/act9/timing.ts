import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile, type CalculateMetadataFunction } from "remotion";
import { FPS, totalFrames, type ActProps, type ShotTiming } from "../timing";
import voices from "./voice-manifest.json";
import captions from "./captions.json";
import voiceEdits from "./voice-edits.json";
export const specs9 = [
  { ids: [237], post: 0.15 },
  { ids: [238, 239, 240], post: 0.15 },
  { ids: [241, 242], post: 0.15 },
  { ids: [243, 244, 245], post: 0.15 },
  { ids: [246, 247, 248], post: 0.15 },
  { ids: [249, 250, 251], post: 0.15 },
  { ids: [252], post: 0.15 },
  { ids: [253, 254], post: 0.15 },
  { ids: [255, 256, 257, 258], post: 0.15 },
  { ids: [259, 260], post: 0.15 },
  { ids: [261, 262], post: 0.15 },
  { ids: [263, 264, 265], post: 0.15 },
  { ids: [266, 267], post: 0.15 },
  { ids: [268], post: 0.15 },
  { ids: [269, 270, 271, 272], post: 0.15 },
  { ids: [273, 274, 275], post: 0.15 },
  { ids: [276, 277, 278], post: 0.6 },
];
export const makeAct9Timings = (durations: number[]): ShotTiming[] =>
  specs9.map((s) => {
    let cursor = 0.1;
    const clips = s.ids.flatMap((id) => {
      const duration = durations[id - 237];
      const edit = (
        voiceEdits as Record<
          string,
          { cutFromFrame: number; cutToFrame: number }
        >
      )[id];
      const ranges = edit
        ? [
            [0, edit.cutFromFrame / FPS],
            [edit.cutToFrame / FPS, duration],
          ]
        : [[0, duration]];
      const selected = ranges.map(([from, to]) => {
        const clip = {
          id,
          start: cursor,
          duration: to - from,
          trimBefore: from,
        };
        cursor += clip.duration;
        return clip;
      });
      cursor += 0.15;
      return selected;
    });
    return {
      duration: Math.ceil((cursor - 0.15 + s.post) * FPS) / FPS,
      voices: clips,
    };
  });
export const initialAct9Timings = makeAct9Timings(
  voices.map((v) => v.duration),
);
export const loadAct9Timings = async () =>
  makeAct9Timings(
    await Promise.all(
      voices.map((v) =>
        getAudioDurationInSeconds(
          staticFile(v.file) + "?rev=" + v.sha256.slice(0, 12),
        ),
      ),
    ),
  );
export const calculateAct9Metadata: CalculateMetadataFunction<
  ActProps
> = async () => {
  const timings = await loadAct9Timings();
  return { durationInFrames: totalFrames(timings), props: { timings } };
};
export const say = (timing: ShotTiming, id: number, text?: string) => {
  const clips = timing.voices.filter((v) => v.id === id);
  if (!clips.length) throw Error("Missing voice " + id);
  const rows = (
    captions as Record<string, { text: string; startMs: number }[]>
  )[id];
  const cue = text
    ? rows.find((c) => c.text.replace(/\n/g, "").includes(text))
    : null;
  if (text && !cue) throw Error("Missing cue " + id + ": " + text);
  if (!cue) return clips[0].start;
  const sourceTime = cue.startMs / 1000;
  const v = clips.find(
    (clip) =>
      sourceTime >= (clip.trimBefore ?? 0) &&
      sourceTime < (clip.trimBefore ?? 0) + clip.duration,
  );
  if (!v) throw Error("Cue falls inside removed audio " + id + ": " + text);
  return v.start + sourceTime - (v.trimBefore ?? 0);
};
