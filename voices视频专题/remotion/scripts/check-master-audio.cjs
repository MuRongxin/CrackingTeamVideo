const { renderMedia, openBrowser } = require("@remotion/renderer");
const fs = require("node:fs"),
  path = require("node:path");
(async () => {
  const cs = JSON.parse(fs.readFileSync(".qa/current-compositions.json"));
  const full = cs.find((c) => c.id === "V38Full");
  const browser = await openBrowser("chrome", {
    browserExecutable: "/usr/bin/google-chrome-stable",
    chromiumOptions: { headless: true, gl: "angle" },
  });
  try {
    for (const [name, from, to] of [
      ["chapter-join", 3870, 4229],
      ["last-name-and-outro", 76880, 77519],
    ]) {
      await renderMedia({
        serveUrl: path.resolve(".qa/current-bundle"),
        composition: full,
        codec: "wav",
        audioCodec: "pcm-16",
        sampleRate: 48000,
        outputLocation: `.qa/${name}.wav`,
        frameRange: [from, to],
        puppeteerInstance: browser,
        concurrency: 2,
        logLevel: "error",
        overwrite: true,
      });
      console.log("RENDERED", name, from, to);
    }
  } finally {
    await browser.close({ silent: true });
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
