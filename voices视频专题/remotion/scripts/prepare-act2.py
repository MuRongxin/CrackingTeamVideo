"""Prepare act 2 from local sources without modifying any original."""
from pathlib import Path
from PIL import Image
import os,shutil,wave,json,hashlib,subprocess
root=Path(__file__).resolve().parents[1];repo=root.parents[1];pub=root/'public/v38';records=[]
voices=[]
for n in range(20,65):
 src=next((root.parent/'视频文稿配音（前2幕）').glob(f'sentence_{n:02}_*'))
 dst=pub/'vo'/f'sentence-{n:02}.wav';shutil.copyfile(src,dst)
 with wave.open(str(src)) as w:duration=w.getnframes()/w.getframerate()
 voices.append({'id':n,'file':f'v38/vo/sentence-{n:02}.wav','duration':duration,'original':src.name})
 records.append({'path':str(dst.relative_to(repo)),'derived_from':str(src.relative_to(repo)),'status':'copied','note':'原配音；未变速、未替换'})
(root/'src/act2/voice-manifest.json').write_text(json.dumps(voices,ensure_ascii=False,indent=2)+'\n')
source=repo/'media/03_stills/source_images/P04_01.png'
with Image.open(source) as im:
 for name,box in {'reloaded-header':(0,0,624,438),'reloaded-motto':(124,970,502,986)}.items():
  dst=pub/'act2/nfo'/f'{name}.png';im.crop(box).save(dst)
  records.append({'path':str(dst.relative_to(repo)),'derived_from':str(source.relative_to(repo)),
   'crop_pixels':box,'status':'exported','note':'保留透明通道；排除邮箱、安装说明、网站页脚'})
source=repo/'media/02_footage/EX15_STEAM_779340_trailer1_720p.mp4'
source_hash=hashlib.sha256(source.read_bytes()).hexdigest()
# Store exact, mute excerpts: webpack does not reliably copy a public symlink.
old_link=pub/'act2/footage/three-kingdoms.mp4'
if old_link.is_symlink():old_link.unlink()
for name,start,seconds in [('river',11,3),('army',51,5),('snow',26,3)]:
 archive=repo/'media/02_footage/derived'/f'V38_A2_{name}.mp4';archive.parent.mkdir(parents=True,exist_ok=True)
 side=archive.with_suffix('.mp4.meta.json')
 prior=json.loads(side.read_text()) if side.exists() else {}
 if not archive.exists() or prior.get('source_sha256')!=source_hash:
  subprocess.run(['ffmpeg','-v','error','-y','-ss',str(start),'-i',str(source),'-t',str(seconds),'-an','-c:v','libx264','-preset','medium','-crf','16','-pix_fmt','yuv420p','-threads','2','-movflags','+faststart',str(archive)],check=True)
 dst=pub/'act2/footage'/f'{name}.mp4';shutil.copyfile(archive,dst)
 meta={'id':f'V38_A2_{name}','task':'EX15','kind':'video','title':f'第二幕游戏片段：{start}—{start+seconds} 秒',
  'path':str(archive.relative_to(repo)),'derived_from':str(source.relative_to(repo)),
  'source_page':'https://store.steampowered.com/app/779340/','author':'Creative Assembly / SEGA',
  'status':'exported','source_sha256':source_hash,'selected_range_seconds':[start,start+seconds],
  'rights':'衍生静音节选；沿用官方商店宣传片的公开使用条件，未取得额外授权',
  'bytes':archive.stat().st_size,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest()}
 side.write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
 records.append({'path':str(dst.relative_to(repo)),**{k:meta[k] for k in ['derived_from','source_sha256','selected_range_seconds','status']},'ledger_path':str(archive.relative_to(repo)),'note':'1280×720 / 60 fps，CRF 16 精确裁切，无音轨'})
# Archive cropped NFO evidence separately from the original rendering.
for name in ['reloaded-header','reloaded-motto']:
 src=pub/'act2/nfo'/f'{name}.png';archive=repo/'media/03_stills/voices38_act2'/src.name;archive.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,archive)
 meta={'id':f'V38_A2_{name}','task':'EX15','kind':'image','title':'RELOADED 2006 NFO 局部：'+name,'path':str(archive.relative_to(repo)),
  'derived_from':'media/03_stills/source_images/P04_01.png','source_page':'https://www.nfohump.com/index.php?id=104992&item=viewnfo&menu=quicknav&switchto=nfos',
  'author':'RELOADED / nERv；NFOHump 渲染存档','status':'exported','rights':'衍生裁切；沿用原 NFO 渲染存档使用条件，未取得额外公开使用授权',
  'bytes':archive.stat().st_size,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest()}
 archive.with_suffix('.png.meta.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
for name in ['rewind','crt','beep','stretch','notify','voice-break','water']:
 dst=pub/'sfx'/f'{name}.wav'
 if dst.exists():records.append({'path':str(dst.relative_to(repo)),'derived_from':'voices视频专题/remotion/scripts/make-act2-sfx.py','status':'generated','note':'原创合成转场音效；无音乐、无语音采样'})
for r in records:r['sha256']=hashlib.sha256((repo/r['path']).read_bytes()).hexdigest()
(root/'act2-asset-provenance.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
print('Prepared',len(records),'local assets. Voice duration:',sum(v['duration'] for v in voices))
