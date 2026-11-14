# 睦子米贴纸

用户指定目录 `no_background_ai` 中选取 20 张不同的透明 PNG，原样复制到素材库和运行目录。图中原有文字、气泡和透明通道保持原样，透明边距由 CSS 窗口裁切。原路径、源哈希和现用副本在 `sticker-asset-provenance.json`。

20 个反应节点绑定原录音和字幕锚点，跟随旁白时钟；统一避开底部字幕和左下来源标注，按场景调整留白。`peek` 是侧探后停住，`pop` 是一次弹入，`cheer` 是短促欢呼，`droop` 是下沉泄气，退出约 0.2 秒。每次只用一张，不添加新音效。

修改位置、大小、时长和所配语句：`src/stickers/plan.json`。画面实现：`StickerLayer.tsx`；统一挂在 `Narration` 的镜头时钟内，所以连续版和分幕共用同一效果。

| 连续版起点 | 口播位置 | 贴纸 | 动作 |
| --- | --- | --- | --- |
| 01:04.09 | 苦主也不知道是谁 | stunned | peek |
| 01:37.41 | 只有0.34KB | tiny | pop |
| 02:59.18 | 不太优雅的逻辑 | smirk | peek |
| 03:52.42 | 我们赢了 | cheer | cheer |
| 04:12.40 | voice crack破音双关 | solo | cheer |
| 05:06.56 | 满地图找钥匙 | map | peek |
| 05:51.34 | 感谢同行组件 | thanks | pop |
| 07:39.17 | 三天后抱歉 | sorry | pop |
| 08:33.16 | 内存涨价的共鸣 | ram | droop |
| 08:55.08 | Linux启动不了 | shrug | droop |
| 09:01.39 | 新年祝福 | wink | pop |
| 10:37.20 | 给士兵绑气球图个乐 | play | cheer |
| 12:16.43 | Windows更新可能失效 | stop | pop |
| 12:34.29 | 虎先锋反复击败 | burned | droop |
| 14:35.28 | Denuvo还在不在 | question | peek |
| 16:07.11 | 一切正常照常继续 | ice | pop |
| 17:15.58 | Discord干脆没回 | wait | peek |
| 19:09.50 | 只是换了一个字母 | skeptic | peek |
| 20:46.26 | 反过来写一遍 | reverse | pop |
| 21:31.41 | 谢谢来看视频 | flowers | cheer |

## 预览与导出

Studio：<http://localhost:3018/V38Full>。本轮贴纸直接用于 Studio 检查，没有重新渲染整片。`out/voices38-review-720p-v2.mp4` 是贴纸加入前完成的音频／画面修订审片版，完整解码已通过；贴纸制作没有改动这份导出。

检查：`node scripts/check-stickers.cjs`，核对源文件一致性、20 个独立图片、口播锚点与实际抽帧。

已核对全部 20 个反应点的源文件及抽帧，并在实际 Studio 检查身份未知、气球段、片尾和回跳；资源加载正常。绑气球段贴纸位于左侧留白，给大字和动作中心留出空间。
