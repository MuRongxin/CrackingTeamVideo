import { Video } from "@remotion/media";
import { C, F } from "../style";
import { useTime, lerp } from "../components";
import { publicAsset } from "../assets";
import type { ShotTiming } from "../timing";
import { say } from "./timing";
import { Stage, Raster, pos, mono, smooth } from "./shared";
// The 6.5s excerpt covers the whole shot. It is never slowed down or looped.
export const Fulton = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime(),
    kind = say(timing, 146),
    open = lerp(t, kind - 0.55, kind + 0.2),
    hoist = smooth(t, 5.45, 6.35);
  return (
    <Stage
      label="2026.09 / METAL GEAR SOLID V"
      source="游戏实机：B站「鹅恶厄」 · 《合金装备5》"
    >
      <Video
        src={publicAsset("v38/act5/fulton.mp4")}
        muted
        style={{ width: 1920, height: 1080, objectFit: "cover" }}
      />
      <div
        style={{
          ...pos,
          inset: 0,
          background: `linear-gradient(90deg,rgba(3,12,17,${0.55 - open * 0.42}),transparent 70%),rgba(3,10,14,${0.45 * (1 - open)})`,
        }}
      />
      <div
        style={{
          ...pos,
          left: 130,
          top: 150,
          width: 1300,
          transformOrigin: "top left",
          scale: 1 - open * 0.5,
          translate: `${open * -20}px ${open * -12}px`,
          rotate: `${(1 - open) * -2}deg`,
        }}
      >
        <div
          style={{ ...mono, fontSize: 26, color: C.yellow, marginBottom: 20 }}
        >
          发行说明 / KIND
        </div>
        <Raster path="v38/act5/mgsv-fields.png" style={{ width: 1300 }} />
        <div
          style={{
            ...pos,
            left: 0,
            top: 150,
            width: 1300,
            height: 30,
            borderBottom: `3px solid ${C.yellow}`,
            opacity: lerp(t, 0.5, 1.1),
          }}
        />
      </div>
      <div
        style={{
          ...pos,
          left: 120,
          top: 540,
          fontSize: 90,
          color: C.yellow,
          opacity: 1 - open,
          translate: `${-open * 400}px 0`,
        }}
      >
        给士兵绑气球
      </div>
      <div
        style={{
          ...pos,
          left: 1380,
          top: 550,
          opacity: lerp(t, kind + 0.5, kind + 1) * (1 - hoist),
          translate: `0 ${-hoist * 800}px`,
          rotate: `${hoist * -12}deg`,
          fontSize: 67,
          color: C.yellow,
          textShadow: "0 4px 20px #000",
        }}
      >
        图个乐。
      </div>
    </Stage>
  );
};
