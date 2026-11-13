const { bundle } = require("@remotion/bundler");
const {
  getCompositions,
  renderStill,
  openBrowser,
} = require("@remotion/renderer");
const fs = require("fs"),
  path = require("path"),
  assert = require("node:assert/strict"),
  crypto = require("crypto");
const { execFileSync } = require("node:child_process");
(async () => {
  const url = await bundle({
    entryPoint: path.resolve("src/index.ts"),
    outDir: path.resolve(".qa/current-bundle"),
  });
  const browser = await openBrowser("chrome", {
    browserExecutable: "/usr/bin/google-chrome-stable",
    chromiumOptions: { gl: "angle", headless: true },
  });
  try {
    const comps = await getCompositions(url, { puppeteerInstance: browser });
    fs.writeFileSync(
      ".qa/current-compositions.json",
      JSON.stringify(comps, null, 2),
    );
    const full = comps.find((c) => c.id === "V38Full"),
      acts = [
        comps.find((c) => c.id === "V38Act1"),
        comps.find((c) => c.id === "V38Act2"),
        comps.find((c) => c.id === "V38Act3"),
        comps.find((c) => c.id === "V38Act4"),
        comps.find((c) => c.id === "V38Act5"),
        comps.find((c) => c.id === "V38Act6"),
        comps.find((c) => c.id === "V38Act7"),
      ];
    assert.equal(
      full.durationInFrames,
      acts.reduce((sum, act) => sum + act.durationInFrames, 0),
    );
    console.log(
      "DURATIONS",
      comps.map((c) => [c.id, c.durationInFrames]),
    );
    const manifest = JSON.parse(
      fs.readFileSync("current-voice-provenance.json"),
    );
    for (const v of manifest) {
      assert.equal(
        crypto
          .createHash("sha256")
          .update(fs.readFileSync("public/" + v.file))
          .digest("hex"),
        v.sha256,
      );
      assert.equal(
        crypto
          .createHash("sha256")
          .update(fs.readFileSync(path.resolve("../..", v.source)))
          .digest("hex"),
        v.sha256,
        `Original recording ${v.id} was altered`,
      );
    }
    const requested = process.argv.slice(2);
    const all = [];
    const pacingGaps = [];
    const probeFrames = [];
    const extras = {
      1: {
        1: [0.08, 0.18, 0.28, 0.55, 0.65, 0.92],
        3: [0.3, 0.7],
        7: [0.3, 0.75],
        8: [0.4, 0.85],
        9: [0.18, 0.48, 0.85],
        11: [0.16, 0.32, 0.46, 0.52, 0.6, 0.75],
      },
      2: {
        2: [0.2, 0.85],
        4: [0.12, 0.4, 0.7, 0.97],
        5: [0.08, 0.4, 0.7, 0.96],
        6: [0.2, 0.55, 0.74, 0.96],
        9: [0.23, 0.45, 0.55, 0.65, 0.88],
        11: [0.17, 0.48, 0.76, 0.87, 0.97],
        12: [0.4, 0.8],
        13: [0.2, 0.8],
        14: [0.25, 0.48, 0.85],
        16: [0.3, 0.7],
        18: [0.08, 0.35, 0.72, 0.79, 0.85, 0.96],
        19: [0.25, 0.65, 0.9],
        20: [0.08, 0.18, 0.3, 0.65, 0.84],
        21: [0.2, 0.8],
      },
      3: {
        1: [0.16, 0.36, 0.6, 0.72, 0.9],
        2: [0.12, 0.35, 0.65, 0.88],
        3: [0.45, 0.65, 0.75, 0.94],
        4: [0.15, 0.55, 0.81, 0.9, 0.97],
        5: [0.3, 0.65, 0.85],
        6: [0.2, 0.45, 0.75, 0.95],
        7: [0.25, 0.32, 0.42, 0.51, 0.8, 0.97],
        8: [0.14, 0.3, 0.56, 0.7, 0.9],
        9: [0.12, 0.3, 0.6, 0.83, 0.88, 0.97],
        10: [0.3, 0.55, 0.62, 0.83, 0.97],
        11: [0.2, 0.3, 0.65, 0.78, 0.92],
        12: [0.35, 0.75, 0.9],
        13: [0.2, 0.32, 0.5, 0.66, 0.74, 0.95],
        14: [0.2, 0.55, 0.78, 0.92],
        15: [0.08, 0.35, 0.7, 0.95],
        16: [0.14, 0.33, 0.47, 0.7, 0.85],
        17: [0.3, 0.85],
        18: [0.18, 0.45, 0.7, 0.9, 0.97],
      },
    };
    extras[4] = {
      1: [0.15, 0.4, 0.65, 0.95],
      2: [0.12, 0.4, 0.63, 0.92],
      3: [0.15, 0.45, 0.7, 0.92],
      4: [0.15, 0.45, 0.9],
      5: [0.15, 0.6, 0.93],
      6: [0.2, 0.55, 0.93],
      7: [0.1, 0.4, 0.68, 0.94],
      8: [0.1, 0.45, 0.9],
      9: [0.1, 0.35, 0.65, 0.94],
      10: [0.12, 0.4, 0.75, 0.96],
      11: [0.12, 0.45, 0.66, 0.93],
    };
    extras[5] = {
      1: [0.15, 0.58, 0.76, 0.97],
      2: [0.2, 0.55, 0.7, 0.97],
      3: [0.09, 0.22, 0.39, 0.58, 0.72, 0.9],
      4: [0.15, 0.52, 0.63, 0.76, 0.96],
      5: [0.15, 0.48, 0.65, 0.76, 0.9],
      6: [0.14, 0.3, 0.48, 0.62, 0.94],
      7: [0.15, 0.44, 0.6, 0.8, 0.97],
    };
    const normalizeText = (text) =>
      text.replace(/[^\p{L}\p{N}_]/gu, "").toLowerCase();
    const act5Text = fs
      .readFileSync("../voices38_B站文稿.md", "utf8")
      .split("## 三十四个化名")[1]
      .split("## Wuk0ng")[0];
    const act5Captions = JSON.parse(fs.readFileSync("src/act5/captions.json"));
    assert.equal(
      normalizeText(
        Object.values(act5Captions)
          .flat()
          .map((c) => c.text)
          .join(""),
      ),
      normalizeText(act5Text),
    );
    const testers = JSON.parse(fs.readFileSync("src/act5/testers.json"));
    assert.equal(new Set(testers.pragmata.names).size, 34);
    assert.equal(new Set(testers.bond.names).size, 29);
    assert.deepEqual(
      testers.exactMatches,
      testers.pragmata.names.filter((n) => testers.bond.names.includes(n)),
    );
    assert.equal(testers.exactMatches.length, 26);
    assert(!testers.exactMatches.includes("Ace<D>0"));
    extras[6] = {
      1: [0.15, 0.6, 0.94],
      2: [0.14, 0.4, 0.63, 0.91],
      3: [0.3, 0.6, 0.95],
      4: [0.2, 0.5, 0.9],
      5: [0.2, 0.6, 0.92],
      6: [0.12, 0.45, 0.74, 0.93],
      7: [0.18, 0.5, 0.88],
      8: [0.15, 0.38, 0.63, 0.94],
      9: [0.15, 0.45, 0.73, 0.94],
      10: [0.2, 0.38, 0.58, 0.9],
      11: [0.15, 0.45, 0.8, 0.95],
      12: [0.15, 0.92],
      13: [0.15, 0.44, 0.66, 0.85, 0.95],
      14: [0.2, 0.6, 0.92],
    };
    const act6Text = fs
      .readFileSync("../voices38_B站文稿.md", "utf8")
      .split("## Wuk0ng")[1]
      .split("## 一个问号")[0];
    const act6Captions = JSON.parse(fs.readFileSync("src/act6/captions.json"));
    assert.equal(
      normalizeText(
        Object.values(act6Captions)
          .flat()
          .map((c) => c.text)
          .join(""),
      ),
      normalizeText(act6Text),
    );
    extras[7] = {
      1: [0.16, 0.72, 0.95],
      2: [0.2, 0.57, 0.92],
      3: [0.17, 0.4, 0.67, 0.93],
      4: [0.18, 0.48, 0.68, 0.92],
      5: [0.2, 0.49, 0.83, 0.96],
      6: [0.2, 0.5, 0.9],
      7: [0.1, 0.45, 0.7, 0.96],
      8: [0.2, 0.7, 0.96],
    };
    const act7Text = fs
      .readFileSync("../voices38_B站文稿.md", "utf8")
      .split("## 一个问号")[1]
      .split("## 一份起诉书")[0];
    const act7Captions = JSON.parse(fs.readFileSync("src/act7/captions.json"));
    assert.equal(
      normalizeText(
        Object.values(act7Captions)
          .flat()
          .map((c) => c.text)
          .join(""),
      ),
      normalizeText(act7Text),
    );
    for (const [ai, act] of acts.entries()) {
      assert.equal(act.props.timings.length, [11, 22, 18, 11, 7, 14, 8][ai]);
      let start = 0;
      let previousSpeech = null;
      for (const [i, s] of act.props.timings.entries()) {
        if (!s.voices.length) {
          previousSpeech = null; // Deliberate title or chapter transition.
          assert(s.duration <= 2.4, "Silent transition is too long");
        }
        let end = 0;
        for (const v of s.voices) {
          const absoluteStart = start / 60 + v.start;
          if (previousSpeech) {
            const gap = absoluteStart - previousSpeech.end;
            const limit = [38, 204].includes(previousSpeech.id)
              ? 0.75
              : [3, 100].includes(previousSpeech.id)
                ? 0.5
                : 0.4;
            assert(
              gap <= limit,
              `Long speech gap: ${previousSpeech.id} -> ${v.id}: ${gap}s`,
            );
            assert(gap >= -1 / 60, "Overlapping speech");
            pacingGaps.push({
              act: ai + 1,
              from: previousSpeech.id,
              to: v.id,
              gapSeconds: gap,
            });
          }
          previousSpeech = { id: v.id, end: absoluteStart + v.duration };
          assert(v.start >= end);
          assert(v.start + v.duration <= s.duration + 1e-6);
          end = v.start + v.duration;
          all.push(v);
        }
        const selection = `${ai + 1}:${i + 1}`;
        if (!requested.length || requested.includes(selection))
          for (const ratio of extras[ai + 1][i + 1] || [0.65]) {
            const frame = start + Math.round(s.duration * 60 * ratio);
            await renderStill({
              serveUrl: url,
              composition: act,
              frame,
              output: `.qa/current-a${ai + 1}-${String(i + 1).padStart(2, "0")}-${frame}.png`,
              puppeteerInstance: browser,
              scale: 0.5,
              logLevel: "error",
            });
            probeFrames.push({ act: ai + 1, shot: i + 1, frame });
            console.log("CHECKED", selection, frame);
          }
        start += Math.round(s.duration * 60);
      }
      assert.equal(start, act.durationInFrames);
    }
    fs.writeFileSync(
      ".qa/current-probes.json",
      JSON.stringify(probeFrames, null, 2),
    );
    assert.deepEqual(
      [...new Set(all.map((v) => v.id))],
      Array.from({ length: 210 }, (_, i) => i + 1),
    );
    for (const v of manifest) {
      const uses = all.filter((x) => x.id === v.id);
      assert(
        Math.abs(uses.reduce((s, x) => s + x.duration, 0) - v.duration) < 0.001,
        `voice ${v.id}`,
      );
    }
    fs.writeFileSync(
      ".qa/pacing-report.json",
      JSON.stringify(pacingGaps, null, 2),
    );
    const split = all.filter((v) => v.id === 9);
    assert.equal(split.length, 2);
    assert.equal(split[0].duration, split[1].trimBefore);
    for (const file of [
      "src/captions.json",
      "src/act2/captions.json",
      "src/act3/captions.json",
      "src/act4/captions.json",
      "src/act5/captions.json",
      "src/act6/captions.json",
      "src/act7/captions.json",
    ])
      for (const rows of Object.values(JSON.parse(fs.readFileSync(file))))
        for (const c of rows) {
          assert(c.endMs > c.startMs);
          assert(c.text.split("\n").length <= 2);
        }
    for (const ai of [0, 1, 2, 3, 4, 5, 6]) {
      const p =
        probeFrames.find(
          (x) => x.act === ai + 1 && x.shot === [9, 14, 9, 10, 7, 13, 7][ai],
        ) || probeFrames.filter((x) => x.act === ai + 1).at(-1);
      if (!p) continue;
      await renderStill({
        serveUrl: url,
        composition: full,
        frame:
          p.frame +
          acts.slice(0, ai).reduce((sum, a) => sum + a.durationInFrames, 0),
        output: `.qa/current-full-act${ai + 1}.png`,
        puppeteerInstance: browser,
        scale: 0.5,
        logLevel: "error",
      });
      // GPU gradients/shadows may differ by 1–2 levels in separately mounted
      // compositions. Compare decoded pixels, with a strict sub-visible bound;
      // text, layout, timing, and any larger change still fail this check.
      execFileSync("python3", [
        "-c",
        `
from PIL import Image, ImageChops, ImageStat
import sys
a, b = [Image.open(p).convert('RGB') for p in sys.argv[1:]]
assert a.size == b.size
d = ImageChops.difference(a, b)
peak = max(v[1] for v in d.getextrema())
mean = max(ImageStat.Stat(d).mean)
assert peak <= 2 and mean < .05, (peak, mean)
`,
        `.qa/current-full-act${ai + 1}.png`,
        `.qa/current-a${ai + 1}-${String(p.shot).padStart(2, "0")}-${p.frame}.png`,
      ]);
      console.log("MATCHED standalone / Full", ai + 1);
    }
    if (!requested.length) {
      await renderStill({
        serveUrl: url,
        composition: comps.find((c) => c.id === "V38Thumb"),
        frame: 0,
        output: ".qa/current-thumbnail.png",
        puppeteerInstance: browser,
        scale: 0.5,
        logLevel: "error",
      });
    }
    console.log(
      "PASS: current 91 shots, 210 original recordings, audio 09 continuous source ranges, Full duration, subtitle bounds.",
    );
  } finally {
    await browser.close({ silent: true });
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
