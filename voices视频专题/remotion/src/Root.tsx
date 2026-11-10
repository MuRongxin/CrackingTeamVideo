import { Composition, Still } from "remotion";
import { Act1, Thumbnail } from "./Act1";
import { Act2 } from "./Act2";
import { Full, calculateFullMetadata } from "./Full";
import { calculateActMetadata, initialTimings, totalFrames } from "./timing";
import { calculateAct2Metadata, initialAct2Timings } from "./act2/timing";
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
      id="V38Act2"
      component={Act2}
      width={1920}
      height={1080}
      fps={60}
      durationInFrames={totalFrames(initialAct2Timings)}
      calculateMetadata={calculateAct2Metadata}
      defaultProps={{ timings: initialAct2Timings }}
    />
    <Composition
      id="V38Full"
      component={Full}
      width={1920}
      height={1080}
      fps={60}
      durationInFrames={
        totalFrames(initialTimings) + totalFrames(initialAct2Timings)
      }
      calculateMetadata={calculateFullMetadata}
      defaultProps={{
        timings: initialTimings,
        act2Timings: initialAct2Timings,
      }}
    />
    <Still id="V38Thumb" component={Thumbnail} width={1920} height={1080} />
  </>
);
