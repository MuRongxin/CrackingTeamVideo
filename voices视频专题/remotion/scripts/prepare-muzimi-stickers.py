"""Copy the selected user-provided transparent PNGs unchanged, with provenance."""
from pathlib import Path
from PIL import Image
import hashlib,json,shutil
root=Path(__file__).resolve().parents[1];repo=root.parents[1]
source=Path('/home/lrxin/Pictures/muzimi/睦子米表情包系列/no_background_ai');files=sorted(source.glob('*.png'))
selected=[(4,'stunned','目瞪口呆'),(44,'tiny','安静坐着'),(7,'smirk','抿嘴笑'),(5,'cheer','欢呼'),(22,'map','跑图'),(38,'thanks','爱心感谢'),(3,'sorry','慌张'),(31,'ram','咬牙'),(8,'wink','玫瑰眨眼'),(42,'play','开心手势'),(18,'burned','燃尽'),(29,'question','疑惑'),(9,'ice','淡定吃冰淇淋'),(10,'wait','喝水等待'),(33,'skeptic','侧目'),(2,'reverse','交叉手势'),(0,'flowers','送花'),(19,'solo','独奏'),(40,'shrug','摊手'),(6,'stop','暂停')]
folder=repo/'media/03_stills/voices38_stickers';folder.mkdir(parents=True,exist_ok=True);pub=root/'public/v38/stickers';pub.mkdir(exist_ok=True,parents=True);rows=[];assets={}
original_manifest=json.loads((source/'manifest.json').read_text());sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
write=lambda p,v:p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
for n,name,title in selected:
 src=files[n];dst=folder/f'muzimi-{name}.png';shutil.copyfile(src,dst);public=pub/f'{name}.png';shutil.copyfile(src,public)
 with Image.open(src) as im:
  assert im.mode=='RGBA' and im.getextrema()[3]==(0,255)
  box=im.getchannel('A').point(lambda x:255 if x>12 else 0).getbbox();size=im.size
 original=next(r for r in original_manifest['files'] if Path(r['output']).name==src.name)
 meta=dict(id='V38_MUZIMI_'+name,task='MG15',kind='image',title='睦子米 / '+title,path=str(dst.relative_to(repo)),derived_from=str(src),source_sha256=sha(src),sha256=sha(dst),bytes=dst.stat().st_size,width=size[0],height=size[1],alpha_bbox=list(box),status='exported',author='用户提供 / 睦子米表情包系列',source_page='用户指定本地贴纸目录',rights='用户明确授权用于本片剪辑',source_original=original['source'],source_method=original_manifest['method'],note='原PNG逐字节复制；不修改原贴纸，不增加背景；透明边距仅由CSS窗口裁切。')
 write(dst.with_suffix('.png.meta.json'),meta);rows.append(dict(meta,path=str(public.relative_to(repo)),ledger_path=str(dst.relative_to(repo))));assets[name]=dict(file=f'v38/stickers/{name}.png',sha256=meta['sha256'],width=size[0],height=size[1],bbox=list(box),title=title)
write(root/'sticker-asset-provenance.json',rows);(root/'src/stickers').mkdir(exist_ok=True);write(root/'src/stickers/assets.json',assets)
print('Copied 20 different transparent user stickers, original bytes preserved.')
