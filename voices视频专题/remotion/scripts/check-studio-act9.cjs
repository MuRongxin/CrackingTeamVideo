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
  const sourceBounds = new Map();
  let stableSources = 0;
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
    const act = compositions.find((c) => c.id === "V38Act9");
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
          "V38Act8",
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
      [14, 0.12],
      [14, 0.18],
      [14, 0.4],
      ...Array.from({ length: 17 }, (_, i) => [i + 1, 0.9]),
      [16, 0.4],
      [10, 0.7],
      [4, 0.5],
      [1, 0.9],
    ];
    for (const id of ["V38Act9", "V38Full"]) {
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
      for (const [shot, ratio] of id === "V38Act9"
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
            ...document.querySelectorAll("[data-act9-stage]"),
          ].find((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 10 && r.height > 10;
          });
          if (!stage) return null;
          const r = stage.getBoundingClientRect();
          return {
            label: stage.dataset.act9Stage,
            beat: [...stage.querySelectorAll("[data-act9-beat]")]
              .map((el) => el.dataset.act9Beat)
              .join("/"),
            sources: [...stage.querySelectorAll("[data-act9-source]")].map(
              (el) => {
                const r = el.getBoundingClientRect();
                return {
                  name: el.dataset.act9Source,
                  box: [r.x, r.y, r.width, r.height],
                };
              },
            ),
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
        if (shot === 14) {
          const text = await page.evaluate(() => document.body.innerText);
          assert(
            !text.includes("俄罗斯游戏网站"),
            "Removed subtitle must not appear",
          );
          if (ratio === 0.12) assert(text.includes("同一时间，"));
          if (ratio === 0.18 || ratio === 0.4)
            assert(text.includes("在一个破解论坛上"));
        }
        for (const source of observed.sources) {
          const key = `${id}/${shot}/${observed.beat}/${source.name}`;
          const previous = sourceBounds.get(key);
          if (previous) {
            assert(
              source.box.every((v, i) => Math.abs(v - previous[i]) < 0.1),
              `Document moved or zoomed during a reading shot: ${key}`,
            );
            stableSources++;
          }
          sourceBounds.set(key, source.box);
        }
        assert.deepEqual(observed.broken, []);
        assert.deepEqual(observed.videoErrors, []);
        const result = await page._client().send("Page.captureScreenshot", {
          format: "png",
          clip: observed.clip,
        });
        fs.writeFileSync(
          `.qa/studio-act9-${id}-${shot}-${ratio}.png`,
          Buffer.from(result.value.data, "base64"),
        );
        console.log("CHECKED", id, shot, frame, observed.label);
      }
    }
    assert.equal(errors.length, 0, errors.join("\n"));
    console.log(
      `PASS: live Act9/Full, forward and backward seeks, images and fonts; ${stableSources} stable document comparisons.`,
    );
  } finally {
    await browser.close({ silent: true });
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
