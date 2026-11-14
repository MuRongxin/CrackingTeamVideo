import { Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { ShotTiming } from "../timing";
import { matchesSpokenCue } from "../captionCue";
import assets from "./assets.json";
import plan from "./plan.json";

type CaptionRow = {text: string; startMs: number};
type Beat = (typeof plan)[number];
const clamp = {extrapolateLeft: "clamp", extrapolateRight: "clamp"} as const;
const Sprite = ({beat, frames}: {beat: Beat; frames: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const asset = assets[beat.asset as keyof typeof assets];
  const [l, top, r, b] = asset.bbox;
  const scale = beat.size / Math.max(r-l, b-top);
  const enter = spring({frame, fps, config: {damping: 16, stiffness: 230, mass: 0.6}});
  const settle = interpolate(frame, [0, fps * 0.38], [0, 1], clamp);
  const exit = interpolate(frame, [frames - Math.round(fps * 0.2), frames-1], [0, 1], clamp);
  const opacity = interpolate(frame, [0, Math.max(1, Math.round(fps*0.08))], [0, 1], clamp) * (1-exit);
  const cheer = beat.motion === "cheer" && frame < fps*0.85
    ? Math.abs(Math.sin(Math.PI * frame / (fps*0.4))) * (1-frame/(fps*0.85)) * 15 : 0;
  const droop = beat.motion === "droop" ? interpolate(frame, [fps*0.3, Math.min(frames-8, fps*1.5)], [0, 18], clamp) : 0;
  const x = beat.motion === "peek" ? (1-settle)*110 : 0;
  const y = (1-enter)*30 + exit*45 + droop - cheer;
  const tilt = beat.motion === "peek" ? (1-settle)*-12 : beat.motion === "droop" ? droop/4 : (1-enter)*-9;
  return <div data-muzimi-sticker={beat.id} data-sticker-label={beat.label}
    style={{position: "absolute", left: beat.x, top: beat.y, width: (r-l)*scale, height: (b-top)*scale,
      opacity, transformOrigin: "50% 88%", transform: `translate(${x}px,${y}px) rotate(${tilt}deg) scale(${0.78+0.22*enter})`,
      zIndex: 70, pointerEvents: "none", filter: "drop-shadow(0 2px 1px #f6eee780) drop-shadow(0 7px 8px #0005)"}}>
    <div style={{width:"100%",height:"100%",position:"relative",overflow:"hidden"}}>
      <Img alt={`睦子米 · ${asset.title}`} src={staticFile(asset.file)+"?rev="+asset.sha256.slice(0,12)}
        style={{position:"absolute",left:-l*scale,top:-top*scale,width:asset.width*scale,height:asset.height*scale,maxWidth:"none"}} />
    </div>
  </div>;
};

export const ShotStickers = ({timing, captions}: {timing: ShotTiming; captions: Record<string, CaptionRow[]>}) => {
  const {fps} = useVideoConfig();
  return <>{plan.flatMap(beat => {
    const row = beat.cue ? captions[String(beat.voice)]?.find(c=>matchesSpokenCue(c.text,beat.cue!)) : null;
    const sourceTime = (row?.startMs ?? 0)/1000 + (beat.offset ?? 0);
    const voice = timing.voices.find(v=>v.id===beat.voice && sourceTime >= (v.trimBefore ?? 0) && sourceTime < (v.trimBefore ?? 0)+v.duration);
    if (!voice) return [];
    if (beat.cue && !row) throw Error(`Missing sticker landmark ${beat.voice}: ${beat.cue}`);
    const from = Math.max(0, Math.round((voice.start + sourceTime-(voice.trimBefore ?? 0))*fps));
    const frames = Math.min(Math.round(beat.seconds*fps), Math.round(timing.duration*fps)-from-1);
    if (frames < 6) return [];
    return [<Sequence key={beat.id} name={`贴纸 · ${beat.label}`} from={from} durationInFrames={frames} layout="none">
      <Sprite beat={beat} frames={frames}/>
    </Sequence>];
  })}</>;
};
