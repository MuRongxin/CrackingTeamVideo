const { bundle } = require("@remotion/bundler");
const {
  getCompositions,
  renderStill,
  openBrowser,
} = require("@remotion/renderer");
const fs = require("fs");
const path = require("path");
const assert = require("node:assert/strict");
(async () => {
  const url = await bundle({
    entryPoint: path.resolve("src/index.ts"),
    outDir: path.resolve(".qa/act2-bundle"),
  });
  const browser = await openBrowser("chrome", {
    browserExecutable: "/usr/bin/google-chrome-stable",
    chromiumOptions: { gl: "angle", headless: true },
  });
  try {
    const comps = await getCompositions(url, { puppeteerInstance: browser });
    fs.writeFileSync(".qa/compositions.json", JSON.stringify(comps, null, 2));
    const act = comps.find((x) => x.id === "V38Act2"),
      first = comps.find((x) => x.id === "V38Act1"),
      full = comps.find((x) => x.id === "V38Full");
    console.log(
      "DURATIONS",
      comps.map((x) => [x.id, x.durationInFrames]),
    );
    assert.equal(
      full.durationInFrames,
      first.durationInFrames + act.durationInFrames,
    );
    const voices = [];
    let start = 0;
    const shots = [];
    const requested = process.argv.slice(2).map(Number);
    const ratios = {
      1: [0.22, 0.73],
      2: [0.2,0.65],
      3: [0.55],
      4: [0.75],
      5: [0.22, 0.75],
      6: [0.65],
      7: [0.3, 0.85],
      8: [0.7],
      9: [0.85],
      10: [0.65],
      11: [0.6],
      12: [0.2,0.65],
      13: [0.2, 0.7],
      14: [0.7],
      15: [0.6],
      16: [0.85],
      17: [0.6],
      18: [0.7],
      19: [0.6],
      20: [0.86],
      21: [0.35, 0.55, 0.85],
      22: [0.7],
      23: [0.7],
    };
    for (const [i, s] of act.props.timings.entries()) {
      let end = 0;
      for (const v of s.voices) {
        assert(v.start >= end);
        assert(v.start + v.duration <= s.duration);
        end = v.start + v.duration;
        voices.push(v.id);
      }
      if (!requested.length || requested.includes(i + 1))
        for (const ratio of ratios[i + 1])
          shots.push({
            shot: i + 1,
            frame: start + Math.round(s.duration * 60 * ratio),
          });
      start += Math.round(s.duration * 60);
    }
    assert.equal(start, act.durationInFrames);
    assert.deepEqual(
      voices,
      Array.from({ length: 45 }, (_, i) => 20 + i),
    );
    const caps = JSON.parse(fs.readFileSync("src/act2/captions.json"));
    for (const list of Object.values(caps)) {
      let end = 0;
      for (const c of list) {
        assert(c.text.length <= 20);
        assert(c.startMs >= end);
        assert(c.endMs > c.startMs);
        end = c.endMs;
      }
    }
    const errors = [];
    for (const shot of shots) {
      await renderStill({
        serveUrl: url,
        composition: act,
        frame: shot.frame,
        output: `.qa/a2-${String(shot.shot).padStart(2, "0")}-${shot.frame}.png`,
        puppeteerInstance: browser,
        scale: 0.5,
        logLevel: "error",
        onBrowserLog: (log) => {
          if (log.type === "error") errors.push(log.text);
        },
      });
      console.log("CHECKED", shot);
    }
    if (!requested.length) {
      await renderStill({
        serveUrl: url,
        composition: full,
        frame: 4880,
        output: ".qa/act1-regression.png",
        puppeteerInstance: browser,
        scale: 0.5,
        logLevel: "error",
      });
      const probe = shots.find((x) => x.shot === 16);
      await renderStill({
        serveUrl: url,
        composition: full,
        frame: first.durationInFrames + probe.frame,
        output: ".qa/full-act2.png",
        puppeteerInstance: browser,
        scale: 0.5,
        logLevel: "error",
      });
      await renderStill({
        serveUrl: url,
        composition: full,
        frame: first.durationInFrames + 5,
        output: ".qa/act-boundary.png",
        puppeteerInstance: browser,
        scale: 0.5,
        logLevel: "error",
      });
    }
    assert.deepEqual(errors, []);
    console.log(
      "PASS: 23 shots, 45 original voices, captions and Full duration.",
    );
  } finally {
    await browser.close({ silent: true });
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
