import captions from "../captions.json";
import type { ShotTiming } from "../timing";

export const voiceCue = (timing: ShotTiming, id: number, phrase: string) => {
  const voice = timing.voices.find((clip) => clip.id === id);
  const rows = (
    captions as Record<string, { text: string; startMs: number }[]>
  )[id];
  const caption = rows.find((row) =>
    row.text.replace(/\n/g, "").includes(phrase),
  );
  if (!voice || !caption)
    throw new Error(`Missing narration landmark: ${id} / ${phrase}`);
  return voice.start + caption.startMs / 1000 - (voice.trimBefore ?? 0);
};
