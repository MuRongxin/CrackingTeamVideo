const { bundle } = require("@remotion/bundler");
const {
  getCompositions,
  renderStill,
  openBrowser,
} = require("@remotion/renderer");
const fs = require("fs");
(async () => {
  const url = await bundle({
    entryPoint: require("path").resolve("src/index.ts"),
    outDir: require("path").resolve(".qa/bundle"),
    webpackOverride: (c) => c,
  });
  const browser = await openBrowser("chrome", {
    browserExecutable: "/usr/bin/google-chrome-stable",
    chromiumOptions: { gl: "angle" },
  });
  try {
    const comps = await getCompositions(url, { puppeteerInstance: browser });
    const c = comps.find((c) => c.id === "V38Act1");
    fs.writeFileSync(".qa/compositions.json", JSON.stringify(comps, null, 2));
    console.log(
      "COMPOSITION",
      c.id,
      c.durationInFrames,
      c.fps,
      c.width,
      c.height,
    );
    let start = 0;
    const frames = [];
    for (const [i, s] of c.props.timings.entries()) {
      for (const ratio of {
        4: [0.18, 0.6],
        5: [0.4, 0.8],
        6: [0.3, 0.8],
        8: [0.15, 0.95],
        9: [0.25, 0.8],
        10: [0.19, 0.42, 0.8],
      }[i] || [0.6])
        frames.push({
          shot: i + 1,
          frame: start + Math.round(s.duration * 60 * ratio),
        });
      start += Math.round(s.duration * 60);
    }
    const assert = require("node:assert/strict");
    assert.equal(start, c.durationInFrames);
    const allVoices = [];
    for (const s of c.props.timings) {
      let end = 0;
      for (const v of s.voices) {
        assert(v.start >= end);
        assert(v.start + v.duration <= s.duration);
        end = v.start + v.duration;
        allVoices.push(v.id);
      }
    }
    assert.deepEqual(
      allVoices,
      Array.from({ length: 19 }, (_, i) => i + 1),
    );
    const caps = JSON.parse(fs.readFileSync("src/captions.json", "utf8"));
    for (const list of Object.values(caps))
      for (const caption of list) {
        assert(caption.text.length <= 20);
        assert(caption.endMs > caption.startMs);
      }
    for (const item of frames) {
      await renderStill({
        serveUrl: url,
        composition: c,
        frame: item.frame,
        output: `.qa/shot-${String(item.shot).padStart(2, "0")}-${item.frame}.png`,
        puppeteerInstance: browser,
        scale: 0.5,
        logLevel: "error",
      });
      console.log("CHECKED", item);
    }
    const full = comps.find((x) => x.id === "V38Full");
    assert.equal(full.durationInFrames, c.durationInFrames);
    await renderStill({
      serveUrl: url,
      composition: full,
      frame: 4880,
      output: ".qa/full-4880.png",
      puppeteerInstance: browser,
      scale: 0.5,
      logLevel: "error",
    });
    await renderStill({
      serveUrl: url,
      composition: comps.find((x) => x.id === "V38Thumb"),
      frame: 0,
      output: ".qa/thumbnail.png",
      puppeteerInstance: browser,
      scale: 0.5,
      logLevel: "error",
    });
    console.log(
      "PASS: 11 shots, 19 voices, no truncated/overlapping narration, caption bounds, Full and thumbnail loaded.",
    );
  } finally {
    await browser.close({ silent: true });
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
