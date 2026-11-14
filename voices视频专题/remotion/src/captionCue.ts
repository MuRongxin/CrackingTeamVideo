// Display punctuation and line breaks do not change the spoken cue clock.
const spokenText = (text: string) => text.replace(/[^\p{L}\p{N}_]/gu, "").toLowerCase();
export const matchesSpokenCue = (row: string, phrase: string) => spokenText(row).includes(spokenText(phrase));
