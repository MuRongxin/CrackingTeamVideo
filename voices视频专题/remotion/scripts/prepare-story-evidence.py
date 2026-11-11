"""Safe source excerpts for the continuous act 1 material inspection."""
from pathlib import Path
from PIL import Image
import json,shutil,hashlib
root=Path(__file__).resolve().parents[1];repo=root.parents[1]
pub=root/'public/v38/evidence';pub.mkdir(parents=True,exist_ok=True)
records=[]
for name,filename,box in [
 ('nfo-sheet','V06_nfo.png',(0,0,640,314)),
 ('fix-sheet','V07_nfo.png',(0,0,640,314)),
 ('fix-fields','V07_nfo.png',(56,222,624,314)),
 ('crackfix-notes','V07_nfo.png',(56,751,624,795)),
 ('proper-claim','V06_nfo.png',(176,944,624,977)),
 ('apology','V07_nfo.png',(144,767,280,779)),
 ('hardware-i','V06_nfo.png',(8,1020,632,1045)),
 ('hardware-first-person','V06_nfo.png',(496,1020,632,1033)),
]:
 src=repo/'media/03_stills/source_images'/filename
 archive=repo/'media/03_stills/voices38_act1'/f'{name}.png';archive.parent.mkdir(exist_ok=True)
 with Image.open(src) as im:im.crop(box).save(archive)
 dst=pub/archive.name;shutil.copyfile(archive,dst)
 original=json.loads(src.with_suffix('.png.meta.json').read_text())
 meta=dict(id='V38_A1_'+name,task='OP08',kind='image',title='第一幕原始材料局部：'+name,path=str(archive.relative_to(repo)),
  derived_from=str(src.relative_to(repo)),crop_pixels=list(box),source_page=original['source_page'],author=original['author'],rights=original['rights'],
  status='exported',bytes=archive.stat().st_size,sha256=hashlib.sha256(archive.read_bytes()).hexdigest(),note='真实原图裁切；保留透明通道；不含钱包地址、联系方式和安装步骤')
 archive.with_suffix('.png.meta.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
 records.append(dict(path=str(dst.relative_to(repo)),ledger_path=str(archive.relative_to(repo)),derived_from=meta['derived_from'],crop_pixels=list(box),status='exported',note=meta['note'],sha256=meta['sha256']))
src=repo/'media/03_stills/source_images/V21_valve_requests.png';dst=root/'public/v38/court/original-payments.png';shutil.copyfile(src,dst)
records.append(dict(path=str(dst.relative_to(repo)),derived_from=str(src.relative_to(repo)),status='copied',note='原始 Valve 付款与交易请求节选；原请求第15—17项',sha256=hashlib.sha256(dst.read_bytes()).hexdigest()))
ledger=root/'asset-provenance.json';prior=json.loads(ledger.read_text());paths={r['path'] for r in records}
ledger.write_text(json.dumps([r for r in prior if r['path'] not in paths]+records,ensure_ascii=False,indent=2)+'\n')
print('Prepared real NFO excerpts and original payment requests.')
