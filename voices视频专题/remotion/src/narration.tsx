import { Audio } from "@remotion/media";
import { Sequence, staticFile, useVideoConfig } from "remotion";
import type { Caption } from "@remotion/captions";
import { useTime } from "./components";
import { F } from "./style";
import type { ShotTiming } from "./timing";
import act1Captions from "./captions.json";
import act2Captions from "./act2/captions.json";
const captions: Record<string, Caption[]> = {
  ...act1Captions,
  ...act2Captions,
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
      }}
    >
      {current.text}
    </div>
  ) : null;
};
const VoiceClip = ({ id }: { id: number }) => (
  <>
    <Audio
      name={`配音 ${id}`}
      src={staticFile(`v38/vo/sentence-${String(id).padStart(2, "0")}.wav`)}
    />
    <Subtitle captions={captions[String(id) as keyof typeof captions]} />
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
          <VoiceClip id={clip.id} />
        </Sequence>
      ))}
    </>
  );
};
