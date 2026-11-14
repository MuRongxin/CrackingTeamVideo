const { openBrowser } = require("@remotion/renderer");
const fs = require("node:fs"),
  assert = require("node:assert/strict");
const { musicGainAt } = require("../.qa/music-model/music/plan.js");
const plan = JSON.parse(fs.readFileSync(".qa/master-music-plan.json"));
(async () => {
  const browser = await openBrowser("chrome", {
    browserExecutable: "/usr/bin/google-chrome-stable",
    chromiumOptions: { headless: true },
  });
  try {
    const errors = [];
    const page = await browser.newPage({
      context: () => null,
      logLevel: "error",
      indent: false,
      pageIndex: 0,
      onBrowserLog: (l) => {
        if (l.type === "error") errors.push(l.text);
      },
      onLog: () => {},
    });
    await page.setViewport({ width: 1600, height: 1100, deviceScaleFactor: 1 });
    await page.goto({
      url: "http://localhost:3018/V38Full",
      timeout: 30000,
      options: { waitUntil: "load" },
    });
    for (let i = 0; i < 150; i++) {
      if (
        await page.evaluate(
          () => typeof window.remotion_setFrame === "function",
        )
      )
        break;
      await new Promise((r) => setTimeout(r, 100));
    }
    for (const frame of [
      1000, 3990, 16214, 53995, 72344, 72417, 72500, 77240, 77420, plan.total - 1, 61064, 1000,
    ]) {
      await page.evaluate(
        (f) => window.remotion_setFrame(f, "V38Full", 0),
        frame,
      );
      await new Promise((r) => setTimeout(r, 1400));
      const state = await page.evaluate(() => ({
        master: {
          masterTimeline: document
            .querySelector("[data-master-timeline]")
            ?.getAttribute("data-master-timeline"),
          masterTotalFrames: document
            .querySelector("[data-master-timeline]")
            ?.getAttribute("data-master-total-frames"),
        },
        music: [...document.querySelectorAll("[data-master-music-id]")].map(
          (e) => ({
            id: e.dataset.masterMusicId,
            gain: Number(e.dataset.masterMusicGain),
          }),
        ),
        broken: [...document.images]
          .filter((e) => !e.naturalWidth && e.complete)
          .map((e) => e.src),
        folders: document.body.innerText.includes("分幕编辑"),
      }));
      assert.equal(state.master.masterTimeline, "133 scenes");
      assert.equal(Number(state.master.masterTotalFrames), plan.total);
      assert.equal(state.music.length, plan.clips.length);
      assert.equal(state.folders, true);
      for (const m of state.music)
        assert(
          Math.abs(
            m.gain -
              musicGainAt(
                frame,
                plan.clips.find((c) => c.id === m.id),
                plan,
              ),
          ) < 1e-6,
          `Volume clock mismatch ${frame}/${m.id}`,
        );
      assert.deepEqual(state.broken, []);
      console.log(
        "CHECKED Full",
        frame,
        "active music",
        state.music.filter((m) => m.gain > 0).map((m) => m.id),
      );
      if (frame === 1000) {
        const shot = await page
          ._client()
          .send("Page.captureScreenshot", { format: "png" });
        fs.writeFileSync(
          ".qa/master-timeline-studio.png",
          Buffer.from(shot.value.data, "base64"),
        );
      }
    }
    assert.equal(errors.length, 0, errors.join("\n"));
    console.log(
      `PASS: live master timeline, 133 scenes, ${plan.clips.length} music regions, BGM1 silence trimmed and looped, complete BGM2 aligned to end, BGM1 +3dB.`,
    );
  } finally {
    await browser.close({ silent: true });
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
