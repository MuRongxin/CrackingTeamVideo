import { Composition, Still, Folder } from "remotion";
import { Act1, Thumbnail } from "./Act1";
import { Act2 } from "./Act2";
import { Act3 } from "./Act3";
import { Act4 } from "./Act4";
import { Act5 } from "./Act5";
import { Act6 } from "./Act6";
import { Act7 } from "./Act7";
import { Act9 } from "./Act9";
import { Act10 } from "./Act10";
import { calculateAct10Metadata, initialAct10Timings } from "./act10/timing";
import { calculateAct9Metadata, initialAct9Timings } from "./act9/timing";
import { Act8 } from "./Act8";
import { calculateAct8Metadata, initialAct8Timings } from "./act8/timing";
import { Full, calculateFullMetadata } from "./Full";
import { calculateActMetadata, initialTimings, totalFrames } from "./timing";
import { calculateAct2Metadata, initialAct2Timings } from "./act2/timing";
import { calculateAct3Metadata, initialAct3Timings } from "./act3/timing";
import { calculateAct4Metadata, initialAct4Timings } from "./act4/timing";
import { calculateAct5Metadata, initialAct5Timings } from "./act5/timing";
import { calculateAct6Metadata, initialAct6Timings } from "./act6/timing";
import { calculateAct7Metadata, initialAct7Timings } from "./act7/timing";
export const Root = () => (
  <>
    <Composition
      id="V38Full"
      component={Full}
      width={1920}
      height={1080}
      fps={60}
      durationInFrames={
        totalFrames(initialTimings) +
        totalFrames(initialAct2Timings) +
        totalFrames(initialAct3Timings) +
        totalFrames(initialAct4Timings) +
        totalFrames(initialAct5Timings) +
        totalFrames(initialAct6Timings) +
        totalFrames(initialAct7Timings) +
        totalFrames(initialAct8Timings) +
        totalFrames(initialAct9Timings) +
        totalFrames(initialAct10Timings)
      }
      calculateMetadata={calculateFullMetadata}
      defaultProps={{
        timings: initialTimings,
        act2Timings: initialAct2Timings,
        act3Timings: initialAct3Timings,
        act4Timings: initialAct4Timings,
        act5Timings: initialAct5Timings,
        act6Timings: initialAct6Timings,
        act7Timings: initialAct7Timings,
        act8Timings: initialAct8Timings,
        act9Timings: initialAct9Timings,
        act10Timings: initialAct10Timings,
      }}
    />
    <Folder name="分幕编辑">
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
        id="V38Act3"
        component={Act3}
        width={1920}
        height={1080}
        fps={60}
        durationInFrames={totalFrames(initialAct3Timings)}
        calculateMetadata={calculateAct3Metadata}
        defaultProps={{ timings: initialAct3Timings }}
      />
      <Composition
        id="V38Act4"
        component={Act4}
        width={1920}
        height={1080}
        fps={60}
        durationInFrames={totalFrames(initialAct4Timings)}
        calculateMetadata={calculateAct4Metadata}
        defaultProps={{ timings: initialAct4Timings }}
      />
      <Composition
        id="V38Act5"
        component={Act5}
        width={1920}
        height={1080}
        fps={60}
        durationInFrames={totalFrames(initialAct5Timings)}
        calculateMetadata={calculateAct5Metadata}
        defaultProps={{ timings: initialAct5Timings }}
      />
      <Composition
        id="V38Act6"
        component={Act6}
        width={1920}
        height={1080}
        fps={60}
        durationInFrames={totalFrames(initialAct6Timings)}
        calculateMetadata={calculateAct6Metadata}
        defaultProps={{ timings: initialAct6Timings }}
      />
      <Composition
        id="V38Act7"
        component={Act7}
        width={1920}
        height={1080}
        fps={60}
        durationInFrames={totalFrames(initialAct7Timings)}
        calculateMetadata={calculateAct7Metadata}
        defaultProps={{ timings: initialAct7Timings }}
      />
      <Composition
        id="V38Act8"
        component={Act8}
        width={1920}
        height={1080}
        fps={60}
        durationInFrames={totalFrames(initialAct8Timings)}
        calculateMetadata={calculateAct8Metadata}
        defaultProps={{ timings: initialAct8Timings }}
      />
      <Composition
        id="V38Act9"
        component={Act9}
        width={1920}
        height={1080}
        fps={60}
        durationInFrames={totalFrames(initialAct9Timings)}
        calculateMetadata={calculateAct9Metadata}
        defaultProps={{ timings: initialAct9Timings }}
      />
      <Composition
        id="V38Act10"
        component={Act10}
        width={1920}
        height={1080}
        fps={60}
        durationInFrames={totalFrames(initialAct10Timings)}
        calculateMetadata={calculateAct10Metadata}
        defaultProps={{ timings: initialAct10Timings }}
      />
    </Folder>
    <Still id="V38Thumb" component={Thumbnail} width={1920} height={1080} />
  </>
);
