import { Audio } from "@remotion/media";
import { Sequence, staticFile, useVideoConfig } from "remotion";
import type { Caption } from "@remotion/captions";
import { useTime } from "./components";
import { F } from "./style";
import type { ShotTiming } from "./timing";
import act1Captions from "./captions.json";
import firstVoices from "./voice-manifest.json";
import secondVoices from "./act2/voice-manifest.json";
import thirdVoices from "./act3/voice-manifest.json";
const recordingById = Object.fromEntries(
  [...firstVoices, ...secondVoices, ...thirdVoices].map((v) => [v.id, v]),
);
import act2Captions from "./act2/captions.json";
import act3Captions from "./act3/captions.json";
const captions: Record<string, Caption[]> = {
  ...act1Captions,
  ...act2Captions,
  ...act3Captions,
};

export const Subtitle = ({ captions: items }: { captions: Caption[] }) => {
  const t = useTime() * 1000;
  const current = items.find((c) => t >= c.startMs && t < c.endMs);
  return current ? (
    <div
      style={{
        position: "absolute",
        bottom: 64,
        left: 120,
        right: 120,
        textAlign: "center",
        fontFamily: F.cn,
        fontSize: 44,
        lineHeight: 1.35,
        color: "#fff",
        WebkitTextStroke: "2px #0009",
        paintOrder: "stroke fill",
        textShadow: "0 2px 10px #000b",
        zIndex: 50,
        whiteSpace: "pre-line",
      }}
    >
      {current.text}
    </div>
  ) : null;
};
const VoiceClip = ({
  id,
  trimBefore = 0,
}: {
  id: number;
  trimBefore?: number;
}) => (
  <>
    <Audio
      name={`配音 ${id}`}
      trimBefore={Math.round(trimBefore * 60)}
      src={
        staticFile(recordingById[id].file) +
        "?rev=" +
        recordingById[id].sha256.slice(0, 12)
      }
    />
    <Subtitle
      captions={captions[String(id)].map((c) => ({
        ...c,
        startMs: c.startMs - trimBefore * 1000,
        endMs: c.endMs - trimBefore * 1000,
      }))}
    />
  </>
);
export const Narration = ({ timing }: { timing: ShotTiming }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      {timing.voices.map((clip) => (
        <Sequence
          key={clip.id}
          name={`原始配音 ${String(clip.id).padStart(2, "0")}`}
          from={Math.round(clip.start * fps)}
          durationInFrames={Math.ceil(clip.duration * fps)}
        >
          <VoiceClip id={clip.id} trimBefore={clip.trimBefore} />
        </Sequence>
      ))}
    </>
  );
};
