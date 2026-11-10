import type { ShotTiming } from "../timing";
import { say } from "./timing";
// Source-relative emphases, in seconds; shared by visuals and their sound cues.
export const nitroAt = (t: ShotTiming) => say(t, 61) + 3.28;
export const doorAt = (t: ShotTiming) => say(t, 63) + 4.7;
export const pewAt = (t: ShotTiming) => say(t, 80) + 2.78;
export const apologyAt = (t: ShotTiming) => say(t, 97, "并向玩家道歉");
