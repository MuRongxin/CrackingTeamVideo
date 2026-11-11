/** Screenshot publicly readable mirror pages through normal scrolling.
 * No login, download endpoint, hidden-page extraction or layout replacement.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {execFileSync} = require('node:child_process');
const {openBrowser} = require('@remotion/renderer');
const root = path.resolve(__dirname, '..');
const repo = path.resolve(root, '../..');
const sourceUrl = 'https://www.scribd.com/document/990201699/End-of-an-Era-Empress';
const archiveDir = path.join(repo, 'media/01_sources/E04_SCRIBD');
const stillDir = path.join(repo, 'media/03_stills/voices38_act2');
const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');

(async () => {
  const browser = await openBrowser('chrome', {
    browserExecutable: '/usr/bin/google-chrome-stable',
    chromiumOptions: {headless: true},
  });
  const pages = [];
  try {
    const page = await browser.newPage({
      context: () => null, logLevel: 'error', indent: false,
      pageIndex: 0, onBrowserLog: null, onLog: () => {},
    });
    await page.setViewport({width: 1400, height: 2100, deviceScaleFactor: 2});
    await page.goto({url: sourceUrl, timeout: 25000, options: {waitUntil: 'load'}});
    for (let n = 1; n <= 10; n++) {
      await page.evaluate((number) => {
        const el = document.querySelector('#outer_page_' + number);
        if (!el) throw new Error('Public reader page missing: ' + number);
        el.scrollIntoView({block: 'center'});
      }, n);
      let observed;
      for (let attempt = 0; attempt < 24; attempt++) {
        await new Promise((resolve) => setTimeout(resolve, 250));
        observed = await page.evaluate((number) => {
          const el = document.querySelector('#outer_page_' + number);
          const r = el.getBoundingClientRect();
          const images = [...el.querySelectorAll('img')];
          return {
            page: number,
            loaded: images.length > 0 && images.every((i) => i.complete && i.naturalWidth > 0),
            imageCount: images.length,
            viewportRect: {x: r.x, y: r.y, width: r.width, height: r.height},
            scroll: {x: window.scrollX, y: window.scrollY},
            clip: {x: Math.ceil(r.x + window.scrollX) + 1, y: Math.ceil(r.y + window.scrollY) + 1,
              width: Math.floor(r.width) - 2, height: Math.floor(r.height) - 2, scale: 1},
          };
        }, n);
        if (observed.loaded) break;
      }
      if (!observed.loaded) throw new Error('Page not publicly rendered: ' + n);
      if (observed.viewportRect.y < 135 || observed.viewportRect.y + observed.clip.height > 2000)
        throw new Error('Reader toolbar or cookie notice would cover page ' + n);
      await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve(undefined)))));
      const {value} = await page._client().send('Page.captureScreenshot', {
        format: 'png', clip: observed.clip, captureBeyondViewport: false,
      });
      const png = Buffer.from(value.data, 'base64');
      execFileSync('python3', ['-c', "from PIL import Image,ImageStat; import io,sys; im=Image.open(io.BytesIO(sys.stdin.buffer.read())).convert('RGB'); assert min(ImageStat.Stat(im).stddev)>1, 'Empty page capture'"], {input: png});
      const name = `empress-farewell-page-${String(n).padStart(2, '0')}.png`;
      const still = path.join(stillDir, name);
      fs.mkdirSync(stillDir, {recursive: true});
      fs.writeFileSync(still, png);
      const meta = {
        id: `V38_A2_EMPRESS_FAREWELL_${String(n).padStart(2, '0')}`,
        kind: 'image', title: `EMPRESS 告别声明公开转载页截图 ${n}/10`,
        path: path.relative(repo, still), source_id: 'E04_SCRIBD', source_page: sourceUrl,
        original_publication: 'https://t.me/EmpressRevolution/201',
        author: 'EMPRESS', uploader: 'shosting66', status: 'exported',
        derived_from: 'media/01_sources/E04_SCRIBD/reader-capture.html',
        retrieved_at: new Date().toISOString(),
        capture: {method: 'actual browser screenshot of publicly readable page', viewport: [1400, 2100], deviceScaleFactor: 2, ...observed},
        note: '正常滚动公开阅读器，完整裁取实际页面；未改写文字、拼接排版、移除遮挡或使用需要登录的下载接口。原始附件 PDF 字节未取得。',
        rights: '原作者公开声明；转载平台与作者的权利分别保留，未取得额外授权。',
        bytes: png.length, sha256: sha(png),
      };
      fs.writeFileSync(still + '.meta.json', JSON.stringify(meta, null, 2) + '\n');
      pages.push({name, still, ...meta});
      console.log('CAPTURED', n, png.length, JSON.stringify(observed.scroll));
    }
    if (new Set(pages.map((p) => p.sha256)).size !== 10)
      throw new Error('Duplicate page images; refusing to publish the capture');
    fs.mkdirSync(archiveDir, {recursive: true});
    const html = await page.evaluate(() => document.documentElement.outerHTML);
    fs.writeFileSync(path.join(archiveDir, 'reader-capture.html'), html);
    fs.writeFileSync(path.join(archiveDir, 'metadata.json'), JSON.stringify({
      id: 'E04_SCRIBD', source_url: sourceUrl,
      title: 'End of an Era - EMPRESS — public mirror reader',
      original_publication: 'https://t.me/EmpressRevolution/201',
      retrieved_at: new Date().toISOString(), status: 'downloaded_unreviewed',
      content_type: 'text/html', path: 'media/01_sources/E04_SCRIBD/reader-capture.html',
      bytes: Buffer.byteLength(html), sha256: sha(Buffer.from(html)),
      note: '10 页均可通过正常滚动公开阅读并已截图；非 Telegram 原始 PDF 下载。',
      rights: '公开转载；原作者与平台权利分别保留。',
      captured_pages: pages.map((p) => p.path),
    }, null, 2) + '\n');
    const manifestPath = path.join(root, 'act2-asset-provenance.json');
    let manifest = JSON.parse(fs.readFileSync(manifestPath));
    for (const p of pages) {
      const destination = path.join(root, 'public/v38/act2/stills', p.name);
      fs.copyFileSync(p.still, destination);
      const publicPath = path.relative(repo, destination);
      manifest = manifest.filter((r) => r.path !== publicPath);
      manifest.push({path: publicPath, derived_from: p.path, source_id: p.source_id,
        source_page: sourceUrl, status: 'copied', sha256: p.sha256,
        note: `公开转载阅读器实际页面截图 ${p.capture.page}/10；非重新排版。`});
    }
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
    fs.writeFileSync(path.join(root, 'src/act2/farewell-pages.json'), JSON.stringify(pages.map((p) => ({
      page: p.capture.page, file: 'v38/act2/stills/' + p.name,
      width: p.capture.clip.width * 2, height: p.capture.clip.height * 2,
    })), null, 2) + '\n');
    console.log('PASS: 10 public page screenshots, source archive and provenance saved');
  } finally {
    await browser.close({silent: true});
  }
})().catch((e) => {console.error(e); process.exit(1);});
