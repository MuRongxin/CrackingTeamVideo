"""Rebuild Act 8 from original narration, court PDF, branded SVGs and source media."""
from pathlib import Path
import json,re,wave,hashlib,shutil,subprocess
import pymupdf as fitz
root=Path(__file__).resolve().parents[1];repo=root.parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,v):
 p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
phrases=json.loads((root/'src/act8/narration-source.json').read_text())
norm=lambda s:re.sub(r'[^\w]','',s).lower()
text=re.split(r'##\s*一个字母',(root.parent/'voices38_B站文稿.md').read_text().split('## 一份起诉书')[1])[0]
assert norm(text)==norm(''.join(phrases.values()))
anchors={211:[1.97],212:[2.70],213:[2.02,4.06],214:[1.54],216:[3.06],217:[2.80],218:[1.98],220:[1.47],221:[2.28,5.92],222:[1.53,4.40],223:[1.43,4.19],228:[1.87],229:[3.79,6.02],231:[3.66],234:[2.32],235:[2.55]}
voices=[];caps={}
for n in range(211,237):
 src=next((root.parent/'videoVoices').glob(f'sentence_{n}_*.wav'));dst=root/f'public/v38/vo/sentence-{n}.wav';shutil.copyfile(src,dst)
 with wave.open(str(src)) as w:d=w.getnframes()/w.getframerate()
 voices.append(dict(id=n,file=f'v38/vo/sentence-{n}.wav',duration=d,source=str(src.relative_to(repo)),original=src.name,sha256=sha(dst)))
 parts=phrases[str(n)].split('|');edges=[.02]+anchors.get(n,[])+[d-.025];assert len(edges)==len(parts)+1,n
 rows=[]
 for t,a,b in zip(parts,edges,edges[1:]):
  if len(t)>28:
   positions=[i for i,c in enumerate(t) if c in ' ，、' and 10<=i<=len(t)-8];k=min(positions,key=lambda i:abs(i-len(t)/2)) if positions else len(t)//2;t=t[:k].rstrip()+'\n'+t[k:].lstrip()
  rows.append(dict(text=t,startMs=round(a*1000),endMs=round(b*1000),timestampMs=None,confidence=None))
 caps[str(n)]=rows
write(root/'src/act8/voice-manifest.json',voices);write(root/'src/act8/captions.json',caps)
old=json.loads((root/'current-voice-provenance.json').read_text());write(root/'current-voice-provenance.json',sorted([v for v in old if not 211<=v['id']<=236]+voices,key=lambda v:v['id']))
base=repo/'media/03_stills/voices38_act8';base.mkdir(exist_ok=True)
brand_source=repo/'media/02_footage/V38_REV_REQUIEM_official_1080p.mp4'
brand=base/'capcom.png'
subprocess.run(['ffmpeg','-v','error','-y','-ss','202','-i',str(brand_source),'-frames:v','1','-vf','crop=190:60:1460:880',str(brand)],check=True)
bm=json.loads(brand_source.with_suffix('.mp4.meta.json').read_text())
write(brand.with_suffix('.png.meta.json'),dict(id='V38_A8_CAPCOM',task='EX15',kind='image',title='Capcom 官方预告片尾原字标',path=str(brand.relative_to(repo)),derived_from=str(brand_source.relative_to(repo)),source_page=bm['source_page'],author='Capcom',rights=bm['rights'],status='exported',source_time_seconds=202,crop_pixels=[1460,880,190,60],sha256=sha(brand),bytes=brand.stat().st_size))
pdfsrc=repo/'media/01_sources/COURT_COMPLAINT/original.pdf';doc=fitz.open(pdfsrc)
meta=json.loads(pdfsrc.with_name('metadata.json').read_text())
# Only bounded source crops. Neither lawyer contact details nor account IDs enter
# these images, so camera movement cannot reveal them accidentally.
crops=[('court-name',1,[62,399,550,449]),('court-caption',1,[62,399,550,658]),('filed-date',1,[65,8,550,34]),('introduction',2,[65,107,550,191]),('defendant',2,[65,389,550,550]),('game-fifa',5,[65,434,550,505]),('game-hogwarts',7,[65,82,550,153]),('game-requiem',8,[65,458,550,529]),('game-wukong',8,[65,552,550,623]),('count-one',10,[65,410,550,565]),('count-two',11,[65,529,550,689]),('relief',13,[65,178,550,545])]
for name,page,box in crops:
 dst=base/(name+'.png');doc[page-1].get_pixmap(matrix=fitz.Matrix(4,4),clip=fitz.Rect(box),alpha=False).save(dst)
 write(dst.with_suffix('.png.meta.json'),dict(id='V38_A8_'+name,task='EX15',kind='image',title=f'诉状原件第{page}页局部 / {name}',path=str(dst.relative_to(repo)),derived_from=str(pdfsrc.relative_to(repo)),source_page=meta.get('source_url'),author='Denuvo GmbH 诉状',rights='法院公开文件，公开剪辑使用条件待确认',status='exported',page=page,crop_pdf_points=box,sha256=sha(dst),bytes=dst.stat().st_size))
# Source SVGs are archived separately; PNG derivatives are catalog-compatible.
for name in ['ea','ubisoft','sony','steam','capcom']:
 src=repo/'media/01_sources/V38_A8_BRANDS'/f'{name}.svg'
 if not src.exists():continue
 dst=base/(name+'.png')
 subprocess.run(['inkscape',str(src),'--export-type=png','--export-area-drawing',f'--export-filename={dst}','--export-width=640'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
 write(dst.with_suffix('.png.meta.json'),dict(id='V38_A8_BRAND_'+name,task='EX15',kind='image',title=name+' 品牌原标识',path=str(dst.relative_to(repo)),derived_from=str(src.relative_to(repo)),source_page=f'https://simpleicons.org/?q={name}',source_url=f'https://cdn.simpleicons.org/{name}/FFFFFF' if name!='capcom' else 'https://cdn.jsdelivr.net/npm/simple-icons@11/icons/capcom.svg',author='品牌权利人 / Simple Icons',rights='Simple Icons CC0 图标库；商标权归原品牌所有',status='exported',sha256=sha(dst),bytes=dst.stat().st_size))
src=repo/'media/02_footage/V38_A8_HOGWARTS_launch_1080p.mp4';dst=repo/'media/02_footage/derived/V38_A8_hogwarts-list.mp4';start=11;duration=14.8
if not dst.exists() or json.loads(dst.with_suffix('.mp4.meta.json').read_text()).get('selected_range_seconds')!=[start,start+duration]:subprocess.run(['ffmpeg','-v','error','-y','-ss',str(start),'-i',str(src),'-t',str(duration),'-map','0:v:0','-an','-c:v','libx264','-crf','18','-preset','medium','-threads','2','-pix_fmt','yuv420p','-movflags','+faststart',str(dst)],check=True)
m=json.loads(src.with_suffix('.mp4.meta.json').read_text());write(dst.with_suffix('.mp4.meta.json'),dict(m,id='V38_A8_hogwarts-list',path=str(dst.relative_to(repo)),title='第八幕 / 霍格沃茨名单镜头',derived_from=str(src.relative_to(repo)),status='exported',selected_range_seconds=[start,start+duration],source_sha256=sha(src),sha256=sha(dst),bytes=dst.stat().st_size,note='原速静音节选，不循环；仅示意被列名游戏，非破解版本实测'))
records=[]
for src in [*[p for p in base.glob('*.png') if p.stem not in ['introduction','toms-report']],dst]:
 target=root/'public/v38/act8'/(src.name if src.suffix=='.png' else 'hogwarts-list.mp4');target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,target)
 m=json.loads(src.with_suffix(src.suffix+'.meta.json').read_text());records.append(dict(m,path=str(target.relative_to(repo)),ledger_path=str(src.relative_to(repo)),sha256=sha(target)))
write(root/'act8-asset-provenance.json',records)
print('26 original voices, manuscript-exact captions;',len(records),'Act 8 source assets')
