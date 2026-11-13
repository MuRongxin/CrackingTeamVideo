"""Prepare Act 7 recordings, manuscript-exact captions and reviewed assets."""
from pathlib import Path
import json,re,wave,hashlib,shutil,subprocess,argparse
from PIL import Image
root=Path(__file__).resolve().parents[1];repo=root.parents[1]
parser=argparse.ArgumentParser();parser.add_argument("--captions",action="store_true");args=parser.parse_args()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,v):
 p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
phrases=json.loads((root/'src/act7/narration-source.json').read_text());norm=lambda s:re.sub(r'[^\w]','',s).lower()
text=(root.parent/'voices38_B站文稿.md').read_text().split('## 一个问号')[1].split('## 一份起诉书')[0]
assert norm(text)==norm(''.join(phrases.values()))
anchors={189:[1.7],192:[1.5],193:[1.03],194:[2.72],195:[1.9],196:[2.01],198:[1.23,2.86],199:[3.15],200:[2.28,4.12],201:[3.56,4.8],203:[1.25,2.42,5.28],206:[3.15],208:[1.05],209:[2.02],210:[2.5]}
voices=[];caps={}
for n in range(189,211):
 src=next((root.parent/'videoVoices').glob(f'sentence_{n}_*.wav'));dst=root/f'public/v38/vo/sentence-{n}.wav';shutil.copyfile(src,dst)
 with wave.open(str(src)) as w:d=w.getnframes()/w.getframerate()
 voices.append(dict(id=n,file=f'v38/vo/sentence-{n}.wav',duration=d,source=str(src.relative_to(repo)),original=src.name,sha256=sha(dst)))
 parts=phrases[str(n)].split('|');edges=[.02]+anchors.get(n,[])+[d-.025];assert len(edges)==len(parts)+1,n
 rows=[]
 for t,a,b in zip(parts,edges,edges[1:]):
  if len(t)>28:
   positions=[i for i,c in enumerate(t) if c in ' ，、' and 10<=i<=len(t)-8]
   k=min(positions,key=lambda i:abs(i-len(t)/2)) if positions else len(t)//2
   t=t[:k].rstrip()+'\n'+t[k:].lstrip()
  rows.append(dict(text=t,startMs=round(a*1000),endMs=round(b*1000),timestampMs=None,confidence=None))
 caps[str(n)]=rows
write(root/'src/act7/voice-manifest.json',voices)
if args.captions or not (root/'src/act7/captions.json').exists():write(root/'src/act7/captions.json',caps)
old=json.loads((root/'current-voice-provenance.json').read_text());write(root/'current-voice-provenance.json',sorted([v for v in old if not 189<=v['id']<=210]+voices,key=lambda v:v['id']))
records=[]
def put(src,name):
 dst=root/'public/v38/act7'/name;dst.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dst)
 side=src.with_suffix(src.suffix+'.meta.json');m=json.loads(side.read_text()) if side.exists() else {}
 records.append(dict(m,path=str(dst.relative_to(repo)),ledger_path=str(src.relative_to(repo)),sha256=sha(dst)))
for name in ['techspot-title.png','toms-performance.png','kirigiri-technical.png','razor-jed.png']:
 src=repo/'media/03_stills/voices38_act7'/name
 if src.exists():put(src,name)
# The original CLASS ASCII artwork and release header only; no keys/instructions.
lines=(repo/'media/01_sources/L05/extracted_pre.txt').read_text().splitlines()
write(root/'src/act7/class-header.json',dict(art='\n'.join(lines[:7]),header='\n'.join(lines[7:19]),source='L05 / 原始NFO文字与ASCII原字标'))
# Official EMPRESS channel identity crop, not an invented NFO logo.
src=repo/'media/03_stills/voices38_act2/empress-announcement.png';dst=repo/'media/03_stills/voices38_act7/empress-channel.png';box=[10,10,900,102]
Image.open(src).crop(box).save(dst)
write(dst.with_suffix('.png.meta.json'),dict(id='V38_A7_EMPRESS_CHANNEL',kind='image',task='EX15',title='EMPRESS 官方频道署名与头像局部',path=str(dst.relative_to(repo)),derived_from=str(src.relative_to(repo)),source_page='https://t.me/EmpressRevolution/201',author='EMPRESS',rights='频道公开发布，公开剪辑使用条件待确认',status='exported',crop_pixels=box,sha256=sha(dst),bytes=dst.stat().st_size))
put(dst,'empress-channel.png')
selects=[('requiem-question','V38_REV_REQUIEM_official_1080p.mp4',8.0,6.1),('requiem-clock','V38_REV_REQUIEM_official_1080p.mp4',94,11),('requiem-review','V38_REV_REQUIEM_official_1080p.mp4',185,13),('requiem-mechanism','V38_REV_REQUIEM_official_1080p.mp4',28,16.5),('mafia-report','V38_A7_MAFIA_launch_1080p.mp4',55,15.8),('half-life','V38_A7_HALFLIFE_official_montage.mp4',18.5,11.4),('mafia-question','V38_A7_MAFIA_launch_1080p.mp4',71,4.7)]
for name,file,start,duration in selects:
 src=repo/'media/02_footage'/file;dst=repo/f'media/02_footage/derived/V38_A7_{name}.mp4'
 if not dst.exists():subprocess.run(['ffmpeg','-v','error','-y','-ss',str(start),'-i',str(src),'-t',str(duration),'-map','0:v:0','-an','-c:v','libx264','-crf','18','-preset','medium','-threads','2','-pix_fmt','yuv420p','-movflags','+faststart',str(dst)],check=True)
 m=json.loads(src.with_suffix('.mp4.meta.json').read_text());record=dict(id='V38_A7_'+name,kind='video',task='EX15',title='第七幕 / '+name,path=str(dst.relative_to(repo)),derived_from=str(src.relative_to(repo)),source_page=m['source_page'],author=m['author'],rights=m['rights'],status='exported',selected_range_seconds=[start,start+duration],source_sha256=sha(src),sha256=sha(dst),bytes=dst.stat().st_size,note='原速静音节选，不循环；游戏画面不代表特定破解版本实测')
 write(dst.with_suffix('.mp4.meta.json'),record);put(dst,name+'.mp4')
write(root/'act7-asset-provenance.json',records)
print('22 original voices, manuscript-matched captions,',len(records),'picture assets')
