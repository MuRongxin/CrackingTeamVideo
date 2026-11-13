import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { staticFile, type CalculateMetadataFunction } from "remotion";
import { FPS, totalFrames, type ActProps, type ShotTiming } from "../timing";
import voices from "./voice-manifest.json";
import captions from "./captions.json";
export const specs6 = [
  { ids: [151, 152], post: 0.15 },
  { ids: [153, 154, 155, 156], post: 0.15 },
  { ids: [157, 158], post: 0.15 },
  { ids: [159, 160], post: 0.15 },
  { ids: [161, 162, 163], post: 0.15 },
  { ids: [164, 165, 166, 167], post: 0.15 },
  { ids: [168, 169, 170], post: 0.15 },
  { ids: [171, 172, 173, 174], post: 0.25 },
  { ids: [175, 176, 177], post: 0.25 },
  { ids: [178, 179, 180], post: 0.15 },
  { ids: [181, 182, 183], post: 0.15 },
  { ids: [184], post: 0.25 },
  { ids: [185, 186, 187], post: 0.15 },
  { ids: [188], post: 0.25 },
];
export const makeAct6Timings = (durations: number[]): ShotTiming[] =>
  specs6.map((s) => {
    let cursor = 0.1;
    const clips = s.ids.map((id) => {
      const clip = { id, start: cursor, duration: durations[id - 151] };
      cursor += clip.duration + 0.15;
      return clip;
    });
    return {
      duration: Math.ceil((cursor - 0.15 + s.post) * FPS) / FPS,
      voices: clips,
    };
  });
export const initialAct6Timings = makeAct6Timings(
  voices.map((v) => v.duration),
);
export const loadAct6Timings = async () =>
  makeAct6Timings(
    await Promise.all(
      voices.map((v) =>
        getAudioDurationInSeconds(
          staticFile(v.file) + "?rev=" + v.sha256.slice(0, 12),
        ),
      ),
    ),
  );
export const calculateAct6Metadata: CalculateMetadataFunction<
  ActProps
> = async () => {
  const timings = await loadAct6Timings();
  return { durationInFrames: totalFrames(timings), props: { timings } };
};
export const say = (timing: ShotTiming, id: number, text?: string) => {
  const voice = timing.voices.find((v) => v.id === id);
  if (!voice) throw new Error(`Missing voice ${id}`);
  const rows = (
    captions as Record<string, { text: string; startMs: number }[]>
  )[id];
  const cue = text
    ? rows.find((c) => c.text.replace(/\n/g, "").includes(text))
    : null;
  if (text && !cue) throw new Error(`Missing caption cue ${id}: ${text}`);
  return voice.start + (cue?.startMs ?? 0) / 1000;
};
