/** Capture the real, public Telegram post. This does not download its PDF. */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {openBrowser} = require('@remotion/renderer');
const root = path.resolve(__dirname, '..');
const repo = path.resolve(root, '../..');
const url = 'https://t.me/EmpressRevolution/201?embed=1&mode=tme';
const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');

(async () => {
  const browser = await openBrowser('chrome', {
    browserExecutable: '/usr/bin/google-chrome-stable',
    chromiumOptions: {headless: true},
  });
  try {
    const page = await browser.newPage({
      context: () => null, logLevel: 'error', indent: false,
      pageIndex: 0, onBrowserLog: null, onLog: () => {},
    });
    await page.setViewport({width: 1000, height: 1000, deviceScaleFactor: 2});
    await page.goto({url, timeout: 25000, options: {waitUntil: 'load'}});
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    const observed = await page.evaluate(() => {
      const post = document.querySelector('[data-post="EmpressRevolution/201"]');
      if (!post) throw new Error('The original post is unavailable');
      if (!post.textContent.includes('official retirement statement'))
        throw new Error('Unexpected post content; refusing to replace the asset');
      const doc = post.querySelector('.tgme_widget_message_document_title');
      const text = post.querySelector('.tgme_widget_message_text');
      const rect = post.getBoundingClientRect();
      return {
        title: doc?.textContent.trim(), text: text?.textContent,
        time: post.querySelector('time')?.getAttribute('datetime'),
        clip: {
          x: Math.max(0, Math.floor(rect.x) - 3),
          y: Math.max(0, Math.floor(rect.y) - 3),
          width: Math.ceil(rect.width) + 6,
          height: Math.ceil(rect.height) + 10,
          scale: 1,
        },
        loadedStylesheets: [...document.styleSheets].map((s) => s.href).filter(Boolean),
      };
    });
    if (!observed.loadedStylesheets.some((s) => s.includes('widget-frame.css')))
      throw new Error('Telegram styles failed to load');
    const html = await page.evaluate(() => document.documentElement.outerHTML);
    const {value} = await page._client().send('Page.captureScreenshot', {
      format: 'png', captureBeyondViewport: true, clip: observed.clip,
    });
    const png = Buffer.from(value.data, 'base64');
    const archive = path.join(repo, 'media/01_sources/E04');
    const still = path.join(repo, 'media/03_stills/voices38_act2/empress-announcement.png');
    const publicFile = path.join(root, 'public/v38/act2/stills/empress-announcement.png');
    fs.mkdirSync(path.dirname(still), {recursive: true});
    fs.mkdirSync(path.dirname(publicFile), {recursive: true});
    fs.writeFileSync(path.join(archive, 'widget-capture.html'), html);
    fs.writeFileSync(still, png);
    fs.writeFileSync(publicFile, png);
    const metadata = {
      id: 'V38_A2_EMPRESS_ANNOUNCEMENT', kind: 'image',
      title: 'EMPRESS 官方告别文件发布帖完整截图（非 PDF 内页）',
      path: path.relative(repo, still), source_id: 'E04', source_page: url,
      author: 'EMPRESS / EmpressRevolution',
      derived_from: 'media/01_sources/E04/widget-capture.html',
      status: 'exported', retrieved_at: new Date().toISOString(),
      capture: {method: 'headless Chrome public post screenshot', viewport: [1000, 1000], deviceScaleFactor: 2, ...observed},
      note: '实际 Telegram 嵌入帖，包含完整发布说明；只裁切外围空白，未重绘界面、改写正文或伪造 PDF 内页。',
      rights: '公开访问；著作权仍属原作者，未取得额外使用授权。',
      bytes: png.length, sha256: sha(png),
    };
    fs.writeFileSync(still + '.meta.json', JSON.stringify(metadata, null, 2) + '\n');
    const provenancePath = path.join(root, 'act2-asset-provenance.json');
    const records = JSON.parse(fs.readFileSync(provenancePath));
    const record = {
      path: path.relative(repo, publicFile), derived_from: path.relative(repo, still),
      source_page: url, source_id: 'E04', status: 'copied',
      note: metadata.note, sha256: metadata.sha256,
    };
    fs.writeFileSync(provenancePath, JSON.stringify([
      ...records.filter((r) => r.path !== record.path), record,
    ], null, 2) + '\n');
    console.log(JSON.stringify({file: still, bytes: png.length, clip: observed.clip, sha256: metadata.sha256}));
  } finally {
    await browser.close({silent: true});
  }
})().catch((e) => {console.error(e); process.exit(1);});
