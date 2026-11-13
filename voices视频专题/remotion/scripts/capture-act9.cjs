// Actual archived webpage DOM, not a reconstructed news or social-media card.
const { openBrowser } = require("@remotion/renderer");
const fs = require("fs"),
  path = require("path"),
  crypto = require("crypto");
(async () => {
  fs.mkdirSync(".qa/act9", { recursive: true });
  const browser = await openBrowser("chrome", {
    browserExecutable: "/usr/bin/google-chrome-stable",
    chromiumOptions: { headless: true },
  });
  try {
    const p = await browser.newPage({
      context: () => null,
      logLevel: "error",
      indent: false,
      pageIndex: 0,
      onBrowserLog: () => {},
      onLog: () => {},
    });
    await p.setViewport({ width: 1440, height: 1200, deviceScaleFactor: 2 });
    await p
      ._client()
      .send("Emulation.setScriptExecutionDisabled", { value: true });
    for (const [id, name, selector, needle] of [
      [
        "V21",
        "request-payment",
        "p",
        "Denuvo’s proposed subpoena also requests",
      ],
      ["V24", "request-scope", "p", "Denuvo wanted to subpoena"],
      ["V24", "request-posts", "p", "Discord was asked to list"],
      ["V01", "release-atomfall", ".release_title_p2p", "Atomfall-voices38"],
      [
        "V01",
        "release-dead",
        ".release_title_p2p",
        "Dead.Space.Remake.REAL.CRACKFIX",
      ],
      [
        "V01",
        "release-onimusha",
        ".release_title_p2p",
        "Onimusha.Way.of.the.Sword-voices38",
      ],
      [
        "V01",
        "release-onimusha-fix",
        ".release_title_p2p",
        "Onimusha.Way.of.the.Sword.CRACKFIX-voices38",
      ],
      ["V21", "platform-response", "p", "reached out to the three"],
      ["V24", "requests-before", "p", "The proposed subpoena to Valve"],
      ["V25", "account-title", "h1", "Voices38 no longer"],
      ["V26", "playground-title", "h1", "Voices38"],
      ["V26", "playground-history", "p", "Важно, что речь"],
      ["V28", "mumbo-report", "p", "Mumbo-Jumbo"],
      ["V28", "fix-report", "p", "Now he has released a fix"],
      ["V28", "licensed-report", "p", "Users noticed that some players"],
    ]) {
      if (fs.existsSync(`../../media/03_stills/voices38_act9/${name}.png`))
        continue;
      const source = `../../media/01_sources/${id}/original.html`;
      if (!fs.existsSync(source)) continue;
      const meta = JSON.parse(
        fs.readFileSync(`../../media/01_sources/${id}/metadata.json`),
      );
      let html = fs
        .readFileSync(source, "utf8")
        .replace("<head>", `<head><base href="${meta.source_url}">`);
      if (
        id === "V01" &&
        fs.existsSync("../../media/01_sources/V01/site.css")
      ) {
        const css = fs.readFileSync(
          "../../media/01_sources/V01/site.css",
          "utf8",
        );
        html = html.replace(
          /<link[^>]+c2f3793317040dce3cf8\.css[^>]*>/,
          `<style>${css}</style>`,
        );
      }
      const local = path.resolve(`.qa/act9/capture-${id}.html`);
      fs.writeFileSync(local, html);
      await p
        .goto({
          url: "file://" + local,
          timeout: 12000,
          options: { waitUntil: "load" },
        })
        .catch((e) => {
          if (!String(e).includes("Navigation timeout")) throw e;
        });
      await new Promise((r) => setTimeout(r, 1500));
      const clip = await p.evaluate(
        (selector, needle) => {
          const el = [...document.querySelectorAll(selector)].find((x) =>
            x.textContent.includes(needle),
          );
          if (!el) throw Error("Missing source " + needle);
          let r = el.getBoundingClientRect();
          if (selector === "h1" || selector === ".release_title_p2p") {
            const range = document.createRange();
            range.selectNodeContents(el);
            r = range.getBoundingClientRect();
          }
          return {
            x: Math.max(0, r.x + scrollX),
            y: Math.max(0, r.y + scrollY),
            width: r.width,
            height: r.height,
            scale: selector === ".release_title_p2p" ? 4 : 1,
          };
        },
        selector,
        needle,
      );
      const shot = await p._client().send("Page.captureScreenshot", {
        format: "png",
        clip,
        captureBeyondViewport: true,
      });
      const file = `../../media/03_stills/voices38_act9/${name}.png`;
      fs.writeFileSync(file, Buffer.from(shot.value.data, "base64"));
      fs.writeFileSync(
        file + ".meta.json",
        JSON.stringify(
          {
            id: `V38_A9_${name}`,
            task: "EX15",
            kind: "image",
            title: `第九幕 ${id} 原网页局部`,
            path: `media/03_stills/voices38_act9/${name}.png`,
            derived_from: `media/01_sources/${id}/original.html`,
            ...(id === "V01"
              ? { stylesheet_source: "media/01_sources/V01/site.css" }
              : {}),
            source_page: meta.source_url,
            author:
              id === "V01"
                ? "xREL"
                : id === "V21" || id === "V24"
                  ? "TorrentFreak"
                  : id === "V25"
                    ? "GBAtemp"
                    : id === "V26"
                      ? "Playground"
                      : "iXBT.games",
            rights: meta.rights,
            status: "exported",
            capture: {
              mode: "原始HTML存档渲染，补base地址并禁用网页脚本以阻止跳转；xREL使用其归档原CSS；正文未改写",
              viewport: [1440, 1200],
              deviceScaleFactor: 2,
              clip,
              selector,
              needle,
            },
            sha256: crypto
              .createHash("sha256")
              .update(fs.readFileSync(file))
              .digest("hex"),
            bytes: fs.statSync(file).size,
          },
          null,
          2,
        ) + "\n",
      );
      console.log(name, clip);
    }
  } finally {
    await browser.close({ silent: true });
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
