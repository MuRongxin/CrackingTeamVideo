import { Composition, Still } from "remotion";
import { Act1, Full, Thumbnail } from "./Act1";
import { calculateActMetadata, initialTimings, totalFrames } from "./timing";
export const Root = () => (
  <>
    <Composition
      id="V38Act1"
      component={Act1}
      width={1920}
      height={1080}
      fps={60}
      durationInFrames={totalFrames(initialTimings)}
      calculateMetadata={calculateActMetadata}
      defaultProps={{ timings: initialTimings }}
    />
    <Composition
      id="V38Full"
      component={Full}
      width={1920}
      height={1080}
      fps={60}
      durationInFrames={totalFrames(initialTimings)}
      calculateMetadata={calculateActMetadata}
      defaultProps={{ timings: initialTimings }}
    />
    <Still id="V38Thumb" component={Thumbnail} width={1920} height={1080} />
  </>
);
