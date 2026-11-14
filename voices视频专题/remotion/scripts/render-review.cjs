const fs = require("node:fs"),
  path = require("node:path");
const { bundle } = require("@remotion/bundler");
const {
  openBrowser,
  getCompositions,
  renderMedia,
  renderStill,
} = require("@remotion/renderer");
(async () => {
  const basename = process.argv[2] || "voices38-review-720p-v2";
  const output = path.resolve(`out/${basename}.mp4`);
  const started = Date.now();
  const report = (data) => {
    const v = {
      ...data,
      elapsedSeconds: Math.round((Date.now() - started) / 1000),
      updated: new Date().toISOString(),
    };
    fs.writeFileSync(".qa/review-progress.json", JSON.stringify(v, null, 2));
    console.log(JSON.stringify(v));
  };
  report({ stage: "bundle" });
  const serveUrl = process.env.REVIEW_REUSE_BUNDLE === "1" ? path.resolve(".qa/review-bundle") : await bundle({
    entryPoint: path.resolve("src/index.ts"),
    outDir: path.resolve(".qa/review-bundle"),
  });
  report({ stage: "browser" });
  // Use Remotion's bundled headless browser; no visible browser is opened.
  const browser = await openBrowser("chrome", {
    chromiumOptions: { gl: "vulkan" },
  });
  try {
    const compositions = await getCompositions(serveUrl, {
      puppeteerInstance: browser,
    });
    const source = compositions.find((c) => c.id === "V38Full");
    if (!source || source.durationInFrames < 60 * 1200)
      throw Error("Unexpected master duration");
    const props = structuredClone(source.props);
    let originalFrames = 0;
    for (const key of [
      "timings",
      ...Array.from({ length: 9 }, (_, i) => `act${i + 2}Timings`),
    ]) {
      props[key] = props[key].map((shot) => {
        const begin = Math.round(originalFrames / 2);
        originalFrames += Math.round(shot.duration * 60);
        const end = Math.round(originalFrames / 2);
        return { ...shot, duration: (end - begin) / 30 };
      });
    }
    const composition = {
      ...source,
      fps: 30,
      durationInFrames: Math.round(originalFrames / 2),
      props,
    };
    report({ stage: "preflight", totalFrames: composition.durationInFrames });
    await renderStill({
      serveUrl,
      composition,
      frame: 2065,
      scale: 2 / 3,
      output: ".qa/review-preflight.png",
      puppeteerInstance: browser,
      logLevel: "error",
    });

    fs.writeFileSync(
      `out/${basename}.json`,
      JSON.stringify(
        {
          composition: composition.id,
          width: 1280,
          height: 720,
          fps: composition.fps,
          frames: composition.durationInFrames,
          sourceFps: source.fps,
          sourceFrames: source.durationInFrames,
          durationSeconds: composition.durationInFrames / composition.fps,
          crf: 25,
          musicLevels: JSON.parse(fs.readFileSync("src/music/levels.json")),
          musicPlan: JSON.parse(fs.readFileSync("master-timeline.json"))
            .musicRegions,
          startedAt: new Date(started).toISOString(),
        },
        null,
        2,
      ),
    );
    let last = 0;
    report({
      stage: "render",
      renderedFrames: 0,
      totalFrames: composition.durationInFrames,
      percent: 0,
    });
    await renderMedia({
      serveUrl,
      composition,
      codec: "h264",
      outputLocation: output,
      scale: 2 / 3,
      crf: 25,
      x264Preset: "veryfast",
      pixelFormat: "yuv420p",
      audioCodec: "aac",
      audioBitrate: "160k",
      sampleRate: 48000,
      concurrency: 4,
      puppeteerInstance: browser,
      mediaCacheSizeInBytes: 1024 * 1024 * 1024,
      offthreadVideoCacheSizeInBytes: 512 * 1024 * 1024,
      offthreadVideoThreads: 2,
      logLevel: "error",
      overwrite: true,
      onProgress: (p) => {
        if (Date.now() - last > 15000 || p.progress === 1) {
          last = Date.now();
          report({
            stage: p.stitchStage || "render",
            renderedFrames: p.renderedFrames,
            encodedFrames: p.encodedFrames,
            totalFrames: composition.durationInFrames,
            percent: Math.round(p.progress * 1000) / 10,
            etaSeconds: p.renderEstimatedTime
              ? Math.round(p.renderEstimatedTime / 1000)
              : null,
          });
        }
      },
    });
    report({
      stage: "complete",
      output,
      bytes: fs.statSync(output).size,
      percent: 100,
    });
  } finally {
    await browser.close({ silent: true });
  }
})().catch((e) => {
  console.error(e);
  fs.writeFileSync(".qa/review-error.txt", e.stack || String(e));
  process.exit(1);
});
