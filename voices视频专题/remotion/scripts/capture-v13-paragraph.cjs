// Re-capture the actual V13 paragraph for picture QA; archive only after visual review.
const { openBrowser } = require("@remotion/renderer");
const fs = require("node:fs");
(async () => {
  const b = await openBrowser("chrome", {
    browserExecutable: "/usr/bin/google-chrome-stable",
    chromiumOptions: { headless: true },
  });
  try {
    const p = await b.newPage({
      context: () => null,
      logLevel: "error",
      indent: false,
      pageIndex: 0,
      onBrowserLog: () => {},
      onLog: () => {},
    });
    await p.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 2 });
    await p.goto({
      url: "https://www.gamersky.com/news/202604/2122429.shtml",
      timeout: 30000,
      options: { waitUntil: "load" },
    });
    const rect = await p.evaluate(() => {
      const el = [...document.querySelectorAll(".Mid2L_con p")].find((e) =>
        e.textContent.startsWith("KiriGiri在回应中表示"),
      );
      if (!el) throw Error("Missing actual article paragraph");
      const r = el.getBoundingClientRect();
      return {
        x: r.x + scrollX - 10,
        y: r.y + scrollY - 8,
        width: r.width + 20,
        height: Math.min(r.height + 16, 480),
        scale: 1,
      };
    });
    const r = await p
      ._client()
      .send("Page.captureScreenshot", {
        format: "png",
        clip: rect,
        captureBeyondViewport: true,
      });
    fs.writeFileSync(
      ".qa/revision/v13-quote-capture.png",
      Buffer.from(r.value.data, "base64"),
    );
    console.log(rect);
  } finally {
    await b.close({ silent: true });
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
