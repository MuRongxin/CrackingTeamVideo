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

export const Subtitle = ({
  captions: items,
  captionStyle = "default",
}: {
  captions: Caption[];
  captionStyle?: "default" | "panel";
}) => {
  const t = useTime() * 1000;
  const current = items.find((c) => t >= c.startMs && t < c.endMs);
  if (!current) return null;
  if (captionStyle === "panel")
    return (
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: 100,
          right: 100,
          display: "flex",
          justifyContent: "center",
          zIndex: 100,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            maxWidth: 1500,
            padding: "11px 28px 13px",
            background: "#070a09ed",
            borderBottom: "2px solid #ffc83d70",
            color: "#f4f5f1",
            fontFamily: '"Noto Sans CJK SC", sans-serif',
            fontWeight: 500,
            fontSize: 42,
            lineHeight: 1.35,
            textAlign: "center",
            whiteSpace: "pre-line",
          }}
        >
          {current.text}
        </div>
      </div>
    );
  return (
    <div
      style={{
        position: "absolute",
        bottom: 16,
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
  );
};
const VoiceClip = ({
  id,
  trimBefore = 0,
  captionStyle = "default",
}: {
  id: number;
  trimBefore?: number;
  captionStyle?: "default" | "panel";
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
      captionStyle={captionStyle}
      captions={captions[String(id)].map((c) => ({
        ...c,
        startMs: c.startMs - trimBefore * 1000,
        endMs: c.endMs - trimBefore * 1000,
      }))}
    />
  </>
);
export const Narration = ({
  timing,
  captionStyle = "default",
}: {
  timing: ShotTiming;
  captionStyle?: "default" | "panel";
}) => {
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
          <VoiceClip
            id={clip.id}
            trimBefore={clip.trimBefore}
            captionStyle={captionStyle}
          />
        </Sequence>
      ))}
    </>
  );
};
