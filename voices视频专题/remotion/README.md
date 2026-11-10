# voices38 专题 · 新版前三幕

依据当前 `voices38_视频脚本.md` 和新版文稿，使用 `videoVoices/` 中的第 01—103 段录音。1920 × 1080，60 fps。BGM 留空，配音保持原速；没有导出成片。

| 合成 | 内容 | 实测时长 |
| --- | --- | --- |
| `V38Act1` | 第一幕，A1-01—A1-11 | **1:06.30 / 3990 帧** |
| `V38Act2` | 第二幕，A2-01—A2-22 | **3:23.44 / 12224 帧** |
| `V38Act3` | 第三幕，A3-01—A3-18 | **3:25.02 / 12302 帧** |
| `V38Full` | 前三幕连续播放 | **7:55.16 / 28516 帧** |
| `V38Thumb` | 新片名封面 | Denuvo 的天敌／voices38的故事 |

末两位是帧，不是小数秒。视频脚本中的时码只作粗剪参考，不再作为镜头最低时长。普通镜头按实际录音长度剪辑：前置 0.1 秒、后置约 0.15 秒，段内独立录音间隔 0.15 秒。名字强调、第一次尝试等少数位置有短停顿；片名卡 2.3 秒、倒带转场 2.2 秒。开头 A1-01 → A1-02 的配音间隔由约 1.94 秒收紧至约 0.25 秒。配音保持原速。

## Studio

```bash
cd '/home/lrxin/文档/IGG/CrackingTeam/voices视频专题/remotion'
npm run studio
```

现有预览：<http://localhost:3018/V38Full>。启动命令带 `--no-open`，不会自动打开浏览器。

第三幕单独检查：<http://localhost:3018/V38Act3>；在 `V38Full` 中从 **4:30.14** 开始。

[第三幕逐镜定位表](src/act3/README.md)列出各镜头的幕内起点、连续版起点和配音编号。

使用 `/home/lrxin/文档/remotion` 的 4.0.542 本地构建，不修改该仓库。依赖通过 `node_modules` 链接复用，首次取得工程后运行 `npm run setup`。更换位置可用 `REMOTION_CHECKOUT=/新路径 npm run setup`，并调整 `package.json` 中的 CLI／tsc 路径。

## 新版同步

- 第一幕改为“申请传票／身份待识别”的问号表格；46 → 9 只表示请求数量，没有编造数据分类。
- 新片名为“Denuvo 的天敌”，副标题为“voices38的故事”；桌面仅展示三个材料袋。
- 第二幕按新版 22 镜重排，加入首发窗口、《生化危机 7》五天对照和 Denuvo 回应；移除 40 GB 比例尺、泼水和保质期贴纸。
- NFO 只展示语言说明题头和代码，具体操作路径没有入画；社区帖采用纯标题构图，双关使用单数 `voice crack`。
- 第二幕止于“这个判断是否准确，当时还没人知道”；第三幕使用第 54—103 段录音，止于 RELOADED 的兼容性修复。第 104 段起属于第四幕，尚未接入。

第 09 段录音同时覆盖 A1-09 与 A1-10，工程在 **5.8 秒**（实测静音区 5.560—6.002 秒）切镜。两段使用互相衔接的原始音频区间，字幕按同一来源时钟偏移，不重复或拉伸录音。其余新录音各使用一次。

字幕以新版文稿为正文，保留 `voices38` 字形；录音里的 “voices thirty-eight” 是其读法。长文件先按测得的停顿和文字短句对齐；字幕 JSON 可以继续逐句微调，未将识别文本替换进原稿。

## 调整入口

- `src/Act1.tsx`、`src/Act2.tsx`、`src/Act3.tsx`：当前 11／22／18 镜时间线，各镜头在 Studio 中可独立定位。
- `src/CourtScenes.tsx`、`src/ArchiveScenes.tsx`：新版案卷、材料袋、时间轴与“他”。
- `src/act2/Origins.tsx`、`Protection.tsx`：游戏背景、NFO、版本与保护层。
- `src/act2/Revised.tsx`：首发窗口、五天、市场总监回应、社区讨论与结尾问号。
- `src/act2/Voices.tsx`：尾声回扣用的 `FirstAttemptQuote`，保持英文等宽 72px 与固定位置。
- `src/act3/NfoScenes.tsx`：NFO 堆叠展开、KIND 三连镜头、字段平移与保护项列举。
- `src/act3/Credits.tsx`：致谢段落推进与组件拼合；EA 模拟器和 Denuvo 工作分开标示贡献。
- `src/act3/ProperScenes.tsx`：《死亡空间》镜头、PROPER、日历翻页、道歉硬切与 RELOADED 修复回扣。
- `src/act3/timing.ts`、`motion.ts`：按配音与字幕锚点触发动效；氮气、开锁、三声 biu 的画面和音效共享时间。
- `src/act3/captions.json`：第三幕字幕；`narration-source.json` 为对词短句。常规后置 0.15 秒，KIND 笑点／自述结束 0.25 秒，道歉对照结束 0.35 秒。
- `src/timing.ts`、`src/act2/timing.ts`：空拍与句间间隔；有配音的镜头不使用预估时长兜底；`calculateMetadata` 读取当前 WAV 实际时长。
- `src/captions.json`、`src/act2/captions.json`：当前字幕及时间戳。
- `src/Sound.tsx`、`src/act2/Sound.tsx`：轻量音效，没有 BGM 节点。

所有动作按帧驱动；长引文整行或分段显现，只有短发布名等内容使用逐字效果。

## 录音、素材与来源

`current-voice-provenance.json` 记录 103 段录音的原文件、实际长度与 SHA-256；`asset-provenance.json`、`act2-asset-provenance.json`、`act3-asset-provenance.json` 记录各幕素材与副本来源。原始文件保持不变。音频 URL 带当前文件的哈希版本标识，避免已有 Studio 继续命中旧录音缓存。

新录音同步命令：

```bash
python3 scripts/sync-voiceover.py
```

该命令同步前两幕录音、清单和字幕初始对齐，保留后续幕的来源登记。已手动细调字幕后不要无差别重跑。`prepare-assets.py`、`prepare-act2.py` 也调用同一同步入口；它们主要用于重建图片和视频节选，正常预览不需要重建。

第三幕单独使用 `python3 scripts/prepare-act3.py`，不重写前两幕字幕。已有第三幕字幕也默认保留；只有传 `--captions` 时才重建初始对齐。其长句使用已测得的停顿位置，其他短句为按文稿分句的初始对齐。

法院图片保留原始节选，未修改原文或展示律师联系方式。三处第一人称摘录来自 V04 和 V06，并分别标出处；V07 没有明确的字面 I，因此不为凑三份文件补造原话。RELOADED NFO 只取题头及口号行，排除招募邮箱、安装说明和页脚。xREL NFO 只做文字重排。市场总监回应与社区提醒均标明说话主体。告别声明只展示频道公告中的文件名，没有伪造 PDF 内页。

《三国》片段沿用原片 11—14、51—56、26—29 秒的静音节选；超出短片覆盖的部分改用本地官方静帧缓推，不循环动作。帧率 60，节选 CRF 16。画面用于展示游戏内容，不代表特定破解版本的实测。

《死亡空间》使用原片 **6.3—8.1、14.3—18.0、20.4—23.9 秒**的静音节选，保留原素材帧率，不循环动作，空余覆盖用官方静帧缓推。NFO 题头与 P05 的 OS FIX 说明以原图裁切、整数倍显示；透明底白字放在墨蓝底上。原图、裁切坐标和节选时码均有登记。四个第三幕轻音效由 `make-act3-sfx.py` 合成；道歉对照不加拟音。

字体沿用文悦新青年体（本机 `WenYue-XinQingNianTi-W8-J-2.otf`）、JetBrains Mono（OFL 1.1）及 Px437 IBM VGA 8x16。许可证在 `public/v38/fonts/`。发布简介署名：`Px437 IBM VGA 8x16 — VileR / The Ultimate Oldschool PC Font Pack, CC BY-SA 4.0`，来源 <https://int10h.org/oldschool-pc-fonts/>。JetBrains 来源 <https://github.com/JetBrains/JetBrainsMono>。

## 验证

`npm run typecheck` 检查 TypeScript。`node scripts/check-current.cjs` 在后台检查前三幕及连续版，抽帧存入忽略的 `.qa/`，不打开可见浏览器或导出成片。可指定镜头，如 `node scripts/check-current.cjs 1:7 2:14 3:18`。`check-frames.cjs`、`check-act2.cjs`、`check-act3.cjs` 分别只抽查对应幕的画面。

验证覆盖 51 个镜头、103 段原速录音、跨镜头音频区间、字幕边界、合成总长，以及完整片与各幕的画面一致性。检查脚本同时约束普通语音衔接的上限，避免长空拍再次出现。
