import type { ShotTiming } from "../timing";
import sources from "./sources.json";
import levels from "./levels.json";
export type MusicClip = {
  id: string;
  track: "a" | "b";
  label: string;
  from: number;
  frames: number;
  trim: number;
  fadeIn: number;
  fadeOut: number;
  gain: number;
};
export type Speech = { from: number; to: number; id: number; trim: number };
export const buildMasterPlan = (groups: ShotTiming[][], fps = 60) => {
  const starts: number[] = [],
    shots: number[][] = [],
    speech: Speech[] = [];
  let total = 0;
  groups.forEach((group) => {
    starts.push(total);
    let local = 0;
    const s: number[] = [];
    group.forEach((shot) => {
      s.push(local);
      shot.voices.forEach((v) =>
        speech.push({
          from: total + local + v.start * fps,
          to: total + local + (v.start + v.duration) * fps,
          id: v.id,
          trim: v.trimBefore ?? 0,
        }),
      );
      local += Math.round(shot.duration * fps);
    });
    shots.push(s);
    total += local;
  });
  const clips: MusicClip[] = [];
  const cross = Math.max(1, Math.round(0.12 * fps));
  // Align the complete second track to the end of the film, sample zero first.
  const bFrames = Math.ceil(sources.b.duration * fps);
  const bStart = Math.max(0, total - bFrames);
  const transition = Math.round(2 * fps);
  const endA = Math.max(0, bStart - Math.round(7 * fps));
  const musicBreak = {from: endA, to: bStart};
  const sourceA = Math.floor(sources.a.duration * fps);
  let cursor = Math.round(0.2 * fps), count = 0;
  while (cursor < endA) {
    const frames = Math.min(endA - cursor, sourceA);
    const final = cursor + frames === endA;
    clips.push({
      id: `music-a-${++count}`, track: "a", label: "正文 · BGM1 去静音后连续循环",
      from: cursor, frames, trim: 0,
      fadeIn: count === 1 ? Math.round(0.8 * fps) : cross,
      fadeOut: final ? Math.min(Math.round(1.2 * fps), frames - 1) : cross,
      gain: 0.29,
    });
    if (final) break;
    cursor += frames - cross;
  }
  clips.push({
    id: "music-b-complete", track: "b", label: "片尾倒排 · BGM2 完整一遍",
    from: bStart, frames: total - bStart, trim: 0,
    fadeIn: transition, fadeOut: Math.max(1, Math.round(0.08 * fps)), gain: 0.26,
  });
  const hush: {from: number; to: number; fadeBefore: number; fadeAfter: number}[] = [];
  return { clips, speech, hush, total, starts, shots, musicBreak };
};
export type MasterPlan = ReturnType<typeof buildMasterPlan>;
export const musicGainAt = (
  frame: number,
  clip: MusicClip,
  plan: MasterPlan,
  fps = 60,
) => {
  const local = frame - clip.from;
  if (local < 0 || local >= clip.frames) return 0;
  const clamp = (v: number) => Math.max(0, Math.min(1, v));
  const fade =
    Math.sin((Math.PI / 2) * clamp(local / clip.fadeIn)) *
    Math.sin((Math.PI / 2) * clamp((clip.frames - 1 - local) / clip.fadeOut));
  // Hold the music down through ordinary short narration gaps; release only
  // during an actual pause or title, so it does not pump between sentences.
  let lo = 0,
    hi = plan.speech.length;
  while (lo < hi) {
    const m = (lo + hi) >> 1;
    if (plan.speech[m].from <= frame) lo = m + 1;
    else hi = m;
  }
  let duck = 0;
  for (
    let i = Math.max(0, lo - 2);
    i < Math.min(plan.speech.length, lo + 2);
    i++
  ) {
    const v = plan.speech[i];
    const weight =
      frame < v.from
        ? clamp((frame - (v.from - 0.15 * fps)) / (0.15 * fps))
        : frame <= v.to + 0.12 * fps
          ? 1
          : clamp(1 - (frame - v.to - 0.12 * fps) / (0.45 * fps));
    duck = Math.max(duck, weight);
  }
  let hush = 1;
  for (const h of plan.hush)
    if (frame >= h.from - h.fadeBefore && frame < h.to + h.fadeAfter) {
      hush = Math.min(
        hush,
        frame < h.from
          ? clamp((h.from - frame) / h.fadeBefore)
          : frame < h.to
            ? 0
            : clamp((frame - h.to) / h.fadeAfter),
      );
    }
  return (
    clip.gain *
    Math.pow(10, levels[clip.track] / 20) *
    fade *
    (1 + 0.7 * (1 - duck)) *
    hush
  );
};
