// Check the actual Studio route and backward scrubbing, without opening a
// visible browser or producing a movie. Pixel probes live only in .qa/.
const { openBrowser } = require("@remotion/renderer");
const fs = require("node:fs");
const assert = require("node:assert/strict");
(async () => {
  const browser = await openBrowser("chrome", {
    browserExecutable: "/usr/bin/google-chrome-stable",
    chromiumOptions: { headless: true },
  });
  const errors = [];
  try {
    const page = await browser.newPage({
      context: () => null,
      logLevel: "error",
      indent: false,
      pageIndex: 0,
      onBrowserLog: (log) => {
        if (log.type === "error") errors.push(log.text);
      },
      onLog: () => {},
    });
    await page.setViewport({ width: 1600, height: 1100, deviceScaleFactor: 1 });
    const compositions = JSON.parse(
      fs.readFileSync(".qa/current-compositions.json"),
    );
    const act = compositions.find((c) => c.id === "V38Act8");
    const fullOffset = compositions
      .filter((c) =>
        [
          "V38Act1",
          "V38Act2",
          "V38Act3",
          "V38Act4",
          "V38Act5",
          "V38Act6",
          "V38Act7",
        ].includes(c.id),
      )
      .reduce((n, c) => n + c.durationInFrames, 0);
    let start = 0;
    const starts = act.props.timings.map((s) => {
      const f = start;
      start += Math.round(s.duration * 60);
      return f;
    });
    const requested = process.argv.slice(2).map(Number);
    const probes = [
      [1, 0.95],
      [2, 0.2],
      [2, 0.94],
      [3, 0.16],
      [3, 0.9],
      [4, 0.9],
      [5, 0.8],
      [6, 0.88],
      [7, 0.58],
      [7, 0.93],
      [8, 0.95],
      [9, 0.45],
      [9, 0.95],
      [10, 0.28],
      [10, 0.62],
      [10, 0.96],
      [11, 0.85],
      [12, 0.2],
      [12, 0.93],
      [10, 0.28],
      [2, 0.94],
      [1, 0.95],
    ];
    for (const id of ["V38Act8", "V38Full"]) {
      await page.goto({
        url: `http://localhost:3018/${id}`,
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
      for (const [shot, ratio] of id === "V38Act8"
        ? probes.filter(
            ([shot]) => !requested.length || requested.includes(shot),
          )
        : requested.length
          ? probes.filter(([shot]) => requested.includes(shot)).slice(-2)
          : [
              [1, 0.95],
              [10, 0.96],
              [12, 0.93],
            ]) {
        const frame =
          starts[shot - 1] +
          Math.round(act.props.timings[shot - 1].duration * 60 * ratio) +
          (id === "V38Full" ? fullOffset : 0);
        await page.evaluate(
          (frame, id) => window.remotion_setFrame(frame, id, 0),
          frame,
          id,
        );
        await new Promise((r) => setTimeout(r, 1800));
        await page.evaluate(() =>
          document.fonts.ready.then(() =>
            Promise.all(
              [...document.images].map((im) =>
                im.complete
                  ? Promise.resolve()
                  : new Promise((resolve) => {
                      im.addEventListener("load", resolve, { once: true });
                      im.addEventListener("error", resolve, { once: true });
                    }),
              ),
            ),
          ),
        );
        const observed = await page.evaluate(() => {
          const stage = [
            ...document.querySelectorAll("[data-act8-stage]"),
          ].find((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 10 && r.height > 10;
          });
          if (!stage) return null;
          const r = stage.getBoundingClientRect();
          return {
            label: stage.dataset.act8Stage,
            names: [...stage.querySelectorAll("[data-tester]")].map((el) => {
              const b = el.getBoundingClientRect();
              return {
                name: el.dataset.tester,
                left: b.left,
                right: b.right,
                top: b.top,
                bottom: b.bottom,
              };
            }),
            broken: [...stage.querySelectorAll("img")]
              .filter((im) => !im.naturalWidth)
              .map((im) => im.src),
            videoErrors: [...stage.querySelectorAll("video")]
              .filter((v) => v.error)
              .map((v) => v.error.message),
            clip: {
              x: r.x + scrollX,
              y: r.y + scrollY,
              width: r.width,
              height: r.height,
              scale: 1,
            },
          };
        });
        assert(observed, `Stage must be visible at ${id}/${frame}`);
        assert.deepEqual(observed.broken, []);
        assert.deepEqual(observed.videoErrors, []);
        const result = await page._client().send("Page.captureScreenshot", {
          format: "png",
          clip: observed.clip,
        });
        fs.writeFileSync(
          `.qa/studio-act8-${id}-${shot}-${ratio}.png`,
          Buffer.from(result.value.data, "base64"),
        );
        console.log("CHECKED", id, shot, frame, observed.label);
      }
    }
    assert.equal(errors.length, 0, errors.join("\n"));
    console.log(
      "PASS: live Act8/Full, forward and backward seeks, images and fonts.",
    );
  } finally {
    await browser.close({ silent: true });
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
