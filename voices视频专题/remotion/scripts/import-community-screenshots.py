from pathlib import Path
import shutil,json,hashlib
from PIL import Image
r=Path(__file__).resolve().parents[3];p=r/'voices视频专题';raw=p/'素材/社区截图';raw.mkdir(parents=True,exist_ok=True)
items=[(Path('/home/lrxin/Downloads/截图 2026-11-11 11.30.16-fullpage.png'),'reddit-20-fullpage.png'),(Path('/home/lrxin/Downloads/截图 2026-11-11 11.32.47-fullpage.png'),'reddit-21-fullpage.png'),(Path('/tmp/codex-clipboard-2jXHXa.png'),'reddit-we-won-meme.png')]
for src,name in items:
 dst=raw/name
 if dst.exists():
  assert not src.exists() or src.read_bytes()==dst.read_bytes(),dst
 elif src.exists(): shutil.move(str(src),dst)
 else: raise FileNotFoundError(src)
manifest=p/'remotion/act2-asset-provenance.json';records=json.loads(manifest.read_text())
def asset(name,source,box=None):
 ledger=r/'media/03_stills/voices38_act2'/name
 im=Image.open(source)
 (im.crop(box) if box else im).save(ledger)
 dest=p/'remotion/public/v38/act2/stills'/name;shutil.copy2(ledger,dest)
 digest=hashlib.sha256(ledger.read_bytes()).hexdigest()
 meta={'id':name.removesuffix('.png'),'kind':'image','title':name,'path':str(ledger.relative_to(r)),'derived_from':str(source.relative_to(r)),'status':'exported','crop_pixels':box,'source_page':'https://www.reddit.com/r/PiratedGames/comments/1o6cuec/we_won/','note':'用户提供的实际网页截图；保留原文与用户截图中已有的翻译/高亮，不重新绘制评论界面。','sha256':digest,'bytes':ledger.stat().st_size}
 Path(str(ledger)+'.meta.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
 rec={'path':str(dest.relative_to(r)),'derived_from':str(source.relative_to(r)),'crop_pixels':box,'status':'exported','sha256':digest,'note':meta['note']}
 records[:]=[x for x in records if x['path']!=rec['path']];records.append(rec)
asset('reddit-20-context.png',raw/'reddit-20-fullpage.png',(340,1100,1055,1578))
asset('reddit-20-reply.png',raw/'reddit-20-fullpage.png',(365,1408,1055,1578))
asset('reddit-21-comment.png',raw/'reddit-21-fullpage.png',(368,1588,1057,1865))
asset('reddit-we-won-meme.png',raw/'reddit-we-won-meme.png')
manifest.write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
(raw/'README.md').write_text('# 用户提供的 Reddit 原始素材\n\n原始长截图及梗图已从 Downloads / 剪贴板临时目录移入此处，保留完整尺寸。文件仅更名，未修改原始内容。\n\n- `reddit-20-fullpage.png`：第 20 场原帖及 Mordad51 回复。\n- `reddit-21-fullpage.png`：第 21 场 Mediocre-Housing-131 回复，含截图中已有的中译。\n- `reddit-we-won-meme.png`：用户提供的原帖梗图。\n\n视频裁切副本保存在 Remotion 的 `public/v38/act2/stills/`，裁切坐标、来源与哈希在 `act2-asset-provenance.json` 及媒体库同名元数据中登记。\n')
print('Moved originals:',*[str(raw/n) for _,n in items],sep='\n')
