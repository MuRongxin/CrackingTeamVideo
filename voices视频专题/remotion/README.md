# voices38 专题 · 第一幕

1920 × 1080，60 fps。当前完成 A1-01—A1-11，总长 **1:24.08（5048 帧）**。时间码最后两位是帧，不是小数秒。使用原有 `sentence_01`—`sentence_19` 配音；BGM 留空，有轻量原创纸张、印章、笔划和点击音效。没有导出视频。

## 打开 Studio

```bash
cd '/home/lrxin/文档/IGG/CrackingTeam/voices视频专题/remotion'
npm run studio
```

地址：<http://localhost:3018/V38Act1>。

- `V38Act1`：第一幕，11 个镜头以 A1 编号排列，可展开配音和音效。
- `V38Full`：完整片入口，目前只有第一幕；与第一幕共用 connected composition。
- `V38Thumb`：复用片名画面的封面构图。

使用 `/home/lrxin/文档/remotion` 现有的 **4.0.542** 本地构建，不修改该仓库。依赖通过 `node_modules` 链接复用。重新取得工程后先运行 `npm run setup`；更换 Remotion 位置时可用 `REMOTION_CHECKOUT=/新路径 npm run setup`，同时调整 `package.json` 的 CLI/tsc 路径。

## 调整入口

- `src/Act1.tsx`：11 个镜头的相邻时间线；声音和字幕随镜头移动。
- `src/CourtScenes.tsx`：案卷、翻面、传票、46 → 9。
- `src/ArchiveScenes.tsx`：片名、证物袋、时间轴、“他”。
- `src/timing.ts`：前后空拍、句间间隔与镜头最短时长。`calculateMetadata` 读取 WAV 的实际长度，自动重算镜头及总长。
- `src/captions.json`：原稿字幕与可调时间戳，按现有逐句配音分段；不是逐词强制对齐结果。每条至多 20 字。
- `src/Sound.tsx`：音效时间与音量。当前没有 BGM 节点。
- `src/style.ts`：色板、本地字体。`src/global.css` 统一盒模型。

动画由帧驱动，包含缓推、纸面光影、局部高亮、翻面、卡片运动、光标分裂和手绘圈注。没有 CSS 时间动画。声音保持原速；空拍可在 `timing.ts` 调整。

## 素材与来源

真实法院节选、NFO 题头和配音的路径、裁切坐标、来源及 SHA-256 见 `asset-provenance.json`。PDF 原件保留在仓库素材库；节选按 400 dpi 生成，律师联系方式、平台账号编号和捐款地址没有入画。法院原文三段拼接只做断行，没有改写文字。纸面装饰、图解卡片和字幕独立于原始截图。

- 起诉书：`COURT_COMPLAINT`，首页；法院命令：`COURT_DOC24`，首页。
- 报道与自述：沿用视频脚本及本地 V04、V06、V07、V20、V21、V24、V31。
- Reddit 卡片为存档标题的示意重排；测试者用灰条；没有虚构个人信息。
- 新青年字体使用本机 `WenYue-XinQingNianTi-W8-J-2.otf`。脚本写作“文艺新青年”，本机文件名为“文悦新青年体”；不是从 Google Fonts 加载。
- JetBrains Mono Medium：JetBrains 官方仓库，OFL 1.1，<https://github.com/JetBrains/JetBrainsMono>。
- Px437 IBM VGA 8x16：VileR, The Ultimate Oldschool PC Font Pack，CC BY-SA 4.0，<https://int10h.org/oldschool-pc-fonts/>；许可证存于 `public/v38/fonts/VGA-LICENSE.txt`。发布简介可署名：`Px437 IBM VGA 8x16 — VileR / The Ultimate Oldschool PC Font Pack, CC BY-SA 4.0`。
- `public/v38/sfx/` 由 `scripts/make-sfx.py` 生成；没有使用音乐采样。

如替换原始配音或需要重建图片：运行 `python3 scripts/prepare-assets.py`；再在仓库根目录运行 `python3 media/00_ledger/build_catalog.py`。PDF 衍生文件另存于媒体库并纳入登记。正常启动无需重新生成素材。

## 检查

`npm run typecheck` 检查 TypeScript。`scripts/check-frames.cjs` 仅抽查关键帧，结果放在忽略的 `.qa/` 中，不导出整段视频。检查范围包括 11 个镜头、配音范围、字幕长度、合成时长及完整片入口。
