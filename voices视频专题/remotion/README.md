# voices38 专题 · 前两幕

1920 × 1080，60 fps。第一幕 **1:24.08（5048 帧）**，第二幕 **2:45.17（9917 帧）**，前两幕合计 **4:09.25（14965 帧）**。时间码最后两位是帧，不是小数秒。使用原有 `sentence_01`—`sentence_64` 配音；BGM 留空，有轻量原创转场和拟声音效。没有导出成片。

## 打开 Studio

```bash
cd '/home/lrxin/文档/IGG/CrackingTeam/voices视频专题/remotion'
npm run studio
```

地址：<http://localhost:3018/V38Act2>。启动命令使用 `--no-open`，不会自动打开浏览器；已有 Studio 可直接切换合成。

- `V38Act1`：第一幕，11 个镜头以 A1 编号排列，可展开配音和音效。
- `V38Act2`：第二幕，A2-01—A2-23，可独立检查和调整。
- `V38Full`：完整片入口，前两幕连续播放；两幕均使用 connected composition。
- `V38Thumb`：复用片名画面的封面构图。

使用 `/home/lrxin/文档/remotion` 现有的 **4.0.542** 本地构建，不修改该仓库。依赖通过 `node_modules` 链接复用。重新取得工程后先运行 `npm run setup`；更换 Remotion 位置时可用 `REMOTION_CHECKOUT=/新路径 npm run setup`，同时调整 `package.json` 的 CLI/tsc 路径。

## 调整入口

- `src/Act1.tsx`：11 个镜头的相邻时间线；声音和字幕随镜头移动。
- `src/Act2.tsx`：第二幕 23 个镜头；`src/Full.tsx` 串联各幕。
- `src/act2/Origins.tsx`：游戏画面、NFO、大小对照。
- `src/act2/Protection.tsx`：版本图、保护层、首发窗口和长尾。
- `src/act2/Voices.tsx`：本人自述、新闻、告别、Reddit 评论、保质期贴纸。
- `src/CourtScenes.tsx`：案卷、翻面、传票、46 → 9。
- `src/ArchiveScenes.tsx`：片名、证物袋、时间轴、“他”。
- `src/timing.ts`：前后空拍、句间间隔与镜头最短时长。`calculateMetadata` 读取 WAV 的实际长度，自动重算镜头及总长。
- `src/captions.json`：原稿字幕与可调时间戳，按现有逐句配音分段；不是逐词强制对齐结果。每条至多 20 字。
- `src/Sound.tsx`：音效时间与音量。当前没有 BGM 节点。
- `src/style.ts`：色板、本地字体。`src/global.css` 统一盒模型。

动画由帧驱动，包含缓推、纸面光影、局部高亮、翻面、卡片运动、光标分裂和手绘圈注。没有 CSS 时间动画。声音保持原速；空拍可在 `src/timing.ts` 与 `src/act2/timing.ts` 调整。第二幕字幕在 `src/act2/captions.json`，音效在 `src/act2/Sound.tsx`。

## 素材与来源

真实法院节选、NFO 题头和配音的路径、裁切坐标、来源及 SHA-256 见 `asset-provenance.json` 与 `act2-asset-provenance.json`。PDF 原件保留在仓库素材库；节选按 400 dpi 生成，律师联系方式、平台账号编号和捐款地址没有入画。法院原文三段拼接只做断行，没有改写文字。纸面装饰、图解卡片和字幕独立于原始截图。

- 起诉书：`COURT_COMPLAINT`，首页；法院命令：`COURT_DOC24`，首页。
- 报道与自述：沿用视频脚本及本地 V04、V06、V07、V20、V21、V24、V31。
- Reddit 卡片为存档标题的示意重排；测试者用灰条；没有虚构个人信息。
- 新青年字体使用本机 `WenYue-XinQingNianTi-W8-J-2.otf`。脚本写作“文艺新青年”，本机文件名为“文悦新青年体”；不是从 Google Fonts 加载。
- JetBrains Mono Medium：JetBrains 官方仓库，OFL 1.1，<https://github.com/JetBrains/JetBrainsMono>。
- Px437 IBM VGA 8x16：VileR, The Ultimate Oldschool PC Font Pack，CC BY-SA 4.0，<https://int10h.org/oldschool-pc-fonts/>；许可证存于 `public/v38/fonts/VGA-LICENSE.txt`。发布简介可署名：`Px437 IBM VGA 8x16 — VileR / The Ultimate Oldschool PC Font Pack, CC BY-SA 4.0`。
- `public/v38/sfx/` 由 `scripts/make-sfx.py` 生成；没有使用音乐采样。

第二幕复用本地 V02（三国 NFO）、V03（Reddit 讨论）、V04（iXBT）、E04（EMPRESS 频道公告）及脚本中的 S40 报道标题。RELOADED 原图只裁题头和口号行，排除了招募邮箱、安装说明及页脚；“成员名单”和“挑衅”按脚本只显示概括标签。xREL NFO 使用文字重排。梗图没有存档，画面明确保留占位框；告别声明只有文件名卡，没有虚构 PDF 内页。

《三国》宣传片选取 11—14、51—56、26—29 秒，精确裁出静音片段，以 720p / 60 fps、CRF 16 保存，Studio 中加颗粒、暗角与适度降饱和。片段留有原片路径、时码和哈希；它们展示游戏内容，不代表特定破解版本的实测。

第二幕的 `FirstAttemptQuote` 和 `ExpirySticker` 为后续回扣保留了可复用组件。

如替换原始配音或需要重建图片：运行 `python3 scripts/prepare-assets.py`；再在仓库根目录运行 `python3 media/00_ledger/build_catalog.py`。PDF 衍生文件另存于媒体库并纳入登记。第二幕素材由 `python3 scripts/prepare-act2.py` 准备，音效由 `python3 scripts/make-act2-sfx.py` 生成。正常启动无需重新生成素材。

## 检查

`npm run typecheck` 检查 TypeScript。`node scripts/check-act2.cjs` 在后台抽查第二幕关键帧和完整片入口，结果放在忽略的 `.qa/` 中；不打开可见浏览器，也不导出成片。可加镜头号只检查指定段落，例如 `node scripts/check-act2.cjs 2 7 21`。第一幕的检查脚本为 `scripts/check-frames.cjs`。

已检查 23 个镜头、45 段第二幕原配音、字幕长度与音频边界，并核对完整片与独立第二幕的对应画面。字幕按逐句配音分配短句时间，JSON 中可继续细调；没有将识别文本替换进原稿。
