import { useMemo } from "react";
import { Audio } from "@remotion/media";
import { useCurrentFrame, useVideoConfig } from "remotion";
import type { ShotTiming } from "../timing";
import { publicAsset } from "../assets";
import sources from "./sources.json";
import {
  buildMasterPlan,
  musicGainAt,
  type MusicClip,
  type MasterPlan,
} from "./plan";
const MusicRegion = ({ clip, plan }: { clip: MusicClip; plan: MasterPlan }) => {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig();
  const gain = musicGainAt(frame, clip, plan, fps);
  return (
    <>
      <div
        data-master-music-id={clip.id}
        data-master-music-track={clip.track}
        data-master-music-gain={gain}
        style={{ display: "none" }}
      />
      <Audio
        name={`${clip.label} / ${sources[clip.track].title}`}
        src={publicAsset(sources[clip.track].file)}
        from={clip.from}
        trimBefore={clip.trim}
        durationInFrames={clip.frames}
        volume={gain}
      />
    </>
  );
};
export const MasterMusic = ({ groups }: { groups: ShotTiming[][] }) => {
  const { fps } = useVideoConfig();
  const plan = useMemo(() => buildMasterPlan(groups, fps), [groups, fps]);
  return (
    <>
      <div
        data-master-timeline={`${groups.reduce((n, g) => n + g.length, 0)} scenes`}
        data-master-music-regions={plan.clips.length}
        data-master-total-frames={plan.total}
        style={{ display: "none" }}
      />
      {plan.clips.map((clip) => (
        <MusicRegion key={clip.id} clip={clip} plan={plan} />
      ))}
    </>
  );
};
