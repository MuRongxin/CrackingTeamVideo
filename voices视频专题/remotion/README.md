# voices38 专题 · 新版前三幕

依据当前 `voices38_视频脚本.md` 和新版文稿，使用 `videoVoices/` 中的第 01—103 段录音。1920 × 1080，60 fps。第一幕使用本地合成的原创配乐，第二、三幕 BGM 留空；配音保持原速，没有导出成片。

| 合成 | 内容 | 实测时长 |
| --- | --- | --- |
| `V38Act1` | 第一幕，A1-01—A1-11 | **1:06.30 / 3990 帧** |
| `V38Act2` | 第二幕，A2-01—A2-22 | **3:23.44 / 12224 帧** |
| `V38Act3` | 第三幕，A3-01—A3-18 | **3:25.02 / 12302 帧** |
| `V38Full` | 前三幕连续播放 | **7:55.16 / 28516 帧** |
| `V38Thumb` | 新片名封面 | Denuvo 的天敌／voices38的故事 |

末两位是帧，不是小数秒。视频脚本中的时码只作粗剪参考，不再作为镜头最低时长。普通镜头按实际录音长度剪辑：前置 0.1 秒、后置约 0.15 秒，段内独立录音间隔 0.15 秒。名字强调、第一次尝试等少数位置有短停顿；片名卡 2.3 秒、倒带转场 2.2 秒。开头 A1-01 → A1-02 的配音间隔由约 1.94 秒收紧至约 0.25 秒。第一幕 A1-01—A1-05 已合成固定机位、匹配跳切的冷开场，原 A1-08 片名前移至 A1-05 后（约 21.68 秒），随后再接传票与 46 → 9；配音保持原速。

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

前三幕已按配音与具体材料重做镜头运动：

- 第一幕：官方三家 Logo 的申请单展开为身份资料页，焦点随姓名、住址、联系方式下移；46 → 9 改为具体请求文字的划除与重排。收窄后的九项是 Discord 1 个、Reddit 1 个、Steam 7 个账户目标，共同请求身份及联系方式。原始 46 项只展示已核实的类别节选。
- 第一幕后半：NFO 原图 → 社区帖子原题 → 发行说明组成连续横向阅读；再进入真实日期、字段、第一人称，最终推回起诉书被告栏。替换原来的来源卡片、空月份轴和巨大 I → 他 字卡。
- 第二幕：游戏实景与发行文档接续，老 NFO 纵向扫描、版本年份横向推移、保护层拆开、首发曲线绘出、日历连续翻页。新闻在同一纸面中翻到原话，社区标题接到实际新发行记录；双关波形的破音保持 6 帧。
- 第三幕：沿真实 NFO 阅读字段，KIND 三个笑点结合对应官方游戏动作；保护组合在同一字段里变更，致谢、组件归属、PROPER 原文聚光与 CRACKFIX 道歉按口播推进，最后回到真实 OS FIX 说明。
- 第二幕止于“这个判断是否准确，当时还没人知道”；第三幕使用第 54—103 段录音，止于 RELOADED 的兼容性修复。第 104 段起属于第四幕，尚未接入。

第 09 段录音同时覆盖 A1-09 与 A1-10，工程在 **5.8 秒**（实测静音区 5.560—6.002 秒）切镜。两段使用互相衔接的原始音频区间，字幕按同一来源时钟偏移，不重复或拉伸录音。其余新录音各使用一次。

字幕以新版文稿为正文，保留 `voices38` 字形；录音里的 “voices thirty-eight” 是其读法。长文件先按测得的停顿和文字短句对齐；字幕 JSON 可以继续逐句微调，未将识别文本替换进原稿。

## 调整入口

- `src/Act1.tsx`、`src/Act2.tsx`、`src/Act3.tsx`：当前 11／22／18 镜时间线，各镜头在 Studio 可独立定位。
- `src/CourtScenes.tsx`：第一幕前五段固定机位、匹配跳切的冷开场；`src/ArchiveScenes.tsx`：前移后的片名。
- `src/act1/AccountDiscovery.tsx`：官方 Logo、申请单转页签、身份资料页的逐行焦点；`CourtRequests.tsx`：原请求文字与真实九个账户目标；`PublicTrail.tsx`：原材料长卷、NFO 阅读与被告栏回扣；`shared.tsx`：本幕纸面、来源版式。
- `src/act2/FilmOrigins.tsx`：NFO、字符图、版本卷轴与更新文档；`FilmProtection.tsx`：保护结构、首发曲线、五天与市场总监回应；`FilmVoices.tsx`：新闻纸面、社区材料和双关。
- `src/act2/Origins.tsx`：仍使用其中的倒带、三国实景、署名镜头；`Voices.tsx` 的 `FirstAttemptQuote` 保留回扣字号与位置。旧 `Protection.tsx`、`Revised.tsx` 中的卡片实现不再接入当前时间线。
- `src/act3/FilmNfo.tsx`：新 NFO、KIND 游戏段落与保护字段；`FilmCredits.tsx`：致谢和组件；`FilmProper.tsx`：声明阅读、修复及真实原文硬切。《死亡空间》实景与三天日期推进也由 `FilmProper.tsx` 实现，旧 `ProperScenes.tsx` 不再接入。
- `src/act3/timing.ts`、`motion.ts`，`src/act1/cues.ts`，`src/act2/film-shared.tsx`：按配音和字幕锚点触发动效。氮气、开锁、三声 biu 的画面与音效共享时间。
- 各幕 `captions.json`：当前字幕；`narration-source.json` 为对词短句。常规后置 0.15 秒，KIND 笑点／自述结束 0.25 秒，道歉对照结束 0.35 秒。
- `src/timing.ts`、`src/act2/timing.ts`：段落间隔；有配音的镜头不使用预估时长兜底；`calculateMetadata` 读取当前 WAV 实际时长。
- `src/Sound.tsx`、`src/act2/Sound.tsx`、`src/act3/Sound.tsx`：各幕轻量音效入口。第一幕保留现有原创配乐，第二、三幕 BGM 留空。
- `scripts/make-act1-score.py`：生成第一幕现有原创配乐；重新生成后同步登记 SHA-256。
- `src/assets.ts`：为原图局部、Logo 与游戏节选附加素材 SHA-256，避免已有 Studio 缓存旧版本。

所有动作按帧驱动；长引文整行或分段显现，只有短发布名等内容使用逐字效果。

## 录音、素材与来源

`current-voice-provenance.json` 记录 103 段录音的原文件、实际长度与 SHA-256；`asset-provenance.json`、`act2-asset-provenance.json`、`act3-asset-provenance.json` 记录各幕素材与副本来源；新增官方游戏片段记于 `film-insert-provenance.json`。原始文件保持不变。音频 URL 带当前文件的哈希版本标识，避免已有 Studio 继续命中旧录音缓存。

新录音同步命令：

```bash
python3 scripts/sync-voiceover.py
```

该命令同步前两幕录音、清单和字幕初始对齐，保留后续幕的来源登记。已手动细调字幕后不要无差别重跑。`prepare-assets.py`、`prepare-act2.py` 也调用同一同步入口；它们主要用于重建图片和视频节选，正常预览不需要重建。

第三幕单独使用 `python3 scripts/prepare-act3.py`，不重写前两幕字幕。已有第三幕字幕也默认保留；只有传 `--captions` 时才重建初始对齐。其长句使用已测得的停顿位置，其他短句为按文稿分句的初始对齐。

法院图片保留原始节选，未修改原文或展示律师联系方式。第一幕直接读 V06 原图里的 I respect… 和 I need hardware；V07 没有明确的字面 I，不为凑三份文件补造原话。RELOADED NFO 只取题头及口号行，排除招募邮箱、安装说明和页脚。xREL NFO 只做文字重排。市场总监回应与社区提醒均标明说话主体。A2-18 已使用 iXBT 实际报道页和 EMPRESS 告别声明公开转载阅读器的十页完整截图；在“一个半月后”展开十页，再推进到第九页的正式告别段落。官方发布帖截图另行归档，原始 PDF 附件未下载。A2-20／21 已接入用户提供的实际评论截图，原件与梗图保存在 `../素材/社区截图/`；来源、作者与截取范围见[原件补充记录](../第二幕待补原件.md)。

《三国》片段沿用原片 11—14、51—56、26—29 秒的静音节选；超出短片覆盖的部分改用本地官方静帧缓推，不循环动作。帧率 60，节选 CRF 16。画面用于展示游戏内容，不代表特定破解版本的实测。

《死亡空间》使用原片 **6.3—8.1、14.3—18.0、20.4—23.9 秒**的静音节选，保留原素材帧率，不循环动作，空余覆盖用官方静帧缓推。NFO 题头与 P05 的 OS FIX 说明以原图裁切、按有效阅读区域缩放；透明底白字放在墨蓝底上。原图、裁切坐标和节选时码均有登记。四个第三幕轻音效由 `make-act3-sfx.py` 合成；道歉对照不加拟音。

本次增加的素材与准备入口：

- `scripts/capture-act2-farewell-pages.cjs`：正常滚动公开转载阅读器，截取完整十页，保留每页实际版面、来源与 SHA-256；不使用要求登录的附件下载入口。`src/act2/FarewellDocument.tsx` 控制整份展开与原文推进。
- `scripts/capture-act2-announcement.cjs`：后台浏览器截取 E04 官方公开发布帖，保留原界面和全文，只裁外围空白；截图、采集信息与 SHA-256 一并登记。该脚本不下载附件 PDF。

- `scripts/prepare-platform-logos.py`：官方 Discord、Valve、Reddit SVG 用 Inkscape 输出透明 PNG；原件及品牌页保存在 `media/01_sources/BRAND_*`。
- `scripts/prepare-story-evidence.py`：从 V06／V07 原图裁出题头、字段、声明、道歉和第一人称局部。原始图不改动，裁切坐标保存在来源清单。
- `scripts/acquire-game-inserts.py`：取得 NFS、REQUIEM、007 官方 Steam 宣传片的完整 720p 视频轨（不含音轨）；已有原件无需重复下载。
- `scripts/prepare-film-inserts.py`：NFS **13.20—18.32 秒**；REQUIEM **6.00—9.30、15.70—18.50 秒**；007 **34.50—43.70 秒**。所有节选保留原速、源帧率、无音轨、不循环。REQUIEM 后段用同源 16.50 秒静帧缓推；RE7 五天镜头使用官方商店静帧。
- Court Dkt. 25 及 25-1／25-2／25-3 的原始 PDF 与检索文本保存在 `media/01_sources/COURT_DOC25*`；[阅读笔记](../../media/01_sources/COURT_DOC25/requests_reading.md)解释九个账户目标和原始 46 项的证据边界。完整 46 项请求附件没有取得，画面只使用真实类别节选，没有补造条文。

官方游戏画面提供作品语境，不表示某个破解版本的运行测试。上述脚本用于重建已有衍生件，正常 Studio 预览不需要运行采集和重建。

字体沿用文悦新青年体（本机 `WenYue-XinQingNianTi-W8-J-2.otf`）、JetBrains Mono（OFL 1.1）及 Px437 IBM VGA 8x16。许可证在 `public/v38/fonts/`。发布简介署名：`Px437 IBM VGA 8x16 — VileR / The Ultimate Oldschool PC Font Pack, CC BY-SA 4.0`，来源 <https://int10h.org/oldschool-pc-fonts/>。JetBrains 来源 <https://github.com/JetBrains/JetBrainsMono>。

## 第二幕局部动效修订

- A2-04：以 497×264 原图的顶部原文为固定焦点；先看全貌，再读标题与版本／DLC 行。窗口避开原图下部空白与站点页脚。
- A2-05：两份完整 NFO 固定显示宽度，仅纵向滚动；按各自实际高度约束终点。
- A2-06：短 NFO 收拢，数字滚轮在“只有 0.34 KB”落定；提示音同步锁定帧。
- A2-09：六张仅标“更新”的卡片交错碰撞、挤压、回弹，之后汇拢为最新发行文件；卡片数量是动画示意。
- A2-11：`src/act2/ProtectionCube.tsx` 以三维顶点、透视相机和深度排序绘制 SVG 立方体，六面闭合、投影引线跟随旋转、箭头在外壳折返。所有位置、光效与着色按帧驱动；无需 WebGL Canvas，避免实时预览出现空白覆盖层。

Three.js 仅用于向量、旋转和透视相机计算，不创建 WebGL 上下文。版本已列入 `package.json`，类型链接在 `scripts/link-remotion.mjs` 中保留。普通 Studio 预览仍使用原启动命令。

## 第三幕连续动作重做

18 个镜头的当前入口为 `src/act3/FilmNfo.tsx`、`FilmCredits.tsx`、`FilmProper.tsx`。长镜头按口播转折切换景别和主体状态；文件原图、游戏动作和图解承担不同叙事任务。旧 `ProperScenes.tsx` 不再接入。字幕位置、原速录音、总长不变，BGM 留空。

`scripts/prepare-act3-motion.py` 仅从已有本地原片生成 NFS 2.00 秒静帧、24.60—28.70 秒新追车节选和 007 38.10 秒静帧；来源、哈希和副本路径在 `act3-motion-provenance.json`。无需重新采集。另复用第二张《死亡空间》官方静帧作为测试版背景。

`scripts/import-pragmata.py` 从用户指定的 `/home/lrxin/文档/IGG/Lolicon` 素材库归档 IGN 转载的 CAPCOM 预告，选 21.00—23.40 秒角色近景及 43.10—50.00 秒实机动作，接入 A3-07。原目录保留不动；画面原速、静音、不循环。原始路径、归档与节选哈希在 `pragmata-provenance.json`。

## 验证

`npm run typecheck` 检查 TypeScript。`node scripts/check-current.cjs` 在后台检查前三幕及连续版，抽帧存入忽略的 `.qa/`，不打开可见浏览器或导出成片。可指定镜头，如 `node scripts/check-current.cjs 1:7 2:14 3:18`。`check-frames.cjs`、`check-act2.cjs`、`check-act3.cjs` 分别只抽查对应幕的画面。

`node scripts/check-studio-cube.cjs` 直接检查运行中的 Studio：禁用 WebGL 后，跳转立方体各阶段、离开再返回，并检查连续版。截图保存在 `.qa/studio-cube-*.png`。此检查用于覆盖抽帧与用户实时预览可能不同的问题。

`node scripts/check-studio-act3.cjs` 检查运行中的第三幕与连续版，覆盖开门、工具拼合、原文裁切和前后拖动，截图留在 `.qa/`。

验证覆盖 51 个镜头、103 段原速录音、跨镜头音频区间、字幕边界、合成总长，以及完整片与各幕的画面一致性。检查脚本同时约束普通语音衔接的上限，避免长空拍再次出现。
