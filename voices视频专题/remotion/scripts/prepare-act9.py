"""Act 9: manuscript-exact recordings and bounded source derivatives."""
from pathlib import Path
import json,re,wave,hashlib,shutil,subprocess
import pymupdf as fitz
from PIL import Image
root=Path(__file__).resolve().parents[1];repo=root.parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,v):
 p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
phrases=json.loads((root/'src/act9/narration-source.json').read_text());norm=lambda s:re.sub(r'[^\w]','',s).lower()
text=re.split(r'##\s*一个字母',(root.parent/'voices38_B站文稿.md').read_text())[1].split('## 尾声')[0]
assert norm(text)==norm(''.join(phrases.values()))
anchors={237:[3.92,5.52],239:[1.71],242:[1.68,4.82],243:[1.0],244:[2.1,4.79],245:[2.34],247:[2.0,5.67],248:[3.07],251:[4.46],252:[2.09,3.86],256:[2.95],265:[2.59],266:[2.20],267:[2.60,5.25],268:[4.61,8.21],273:[1.30],275:[4.36],277:[2.32,4.02]}
edits=json.loads((root/'src/act9/voice-edits.json').read_text())
voices=[];caps={}
for n in range(237,279):
 src=next((root.parent/'videoVoices').glob(f'sentence_{n}_*.wav'));dst=root/f'public/v38/vo/sentence-{n}.wav';shutil.copyfile(src,dst)
 with wave.open(str(src)) as w:d=w.getnframes()/w.getframerate()
 voices.append(dict(id=n,file=f'v38/vo/sentence-{n}.wav',duration=d,source=str(src.relative_to(repo)),original=src.name,sha256=sha(dst)))
 parts=phrases[str(n)].split('|');edges=[.02]+anchors.get(n,[])+[d-.025];assert len(edges)==len(parts)+1,n;rows=[]
 for t,a,b in zip(parts,edges,edges[1:]):
  if len(t)>28:
   positions=[i for i,c in enumerate(t) if c in ' ，、' and 10<=i<=len(t)-8];k=min(positions,key=lambda i:abs(i-len(t)/2)) if positions else len(t)//2;t=t[:k].rstrip()+'\n'+t[k:].lstrip()
  rows.append(dict(text=t,startMs=round(a*1000),endMs=round(b*1000),timestampMs=None,confidence=None))
 if str(n) in edits:
  edit=edits[str(n)]
  assert norm(rows[0]['text'])==norm(edit['captionBeforeCut']+edit['removedText'])
  rows[0]['text']=edit['captionBeforeCut'];rows[0]['endMs']=round(edit['cutFromFrame']/60*1000)
 caps[str(n)]=rows
write(root/'src/act9/voice-manifest.json',voices);write(root/'src/act9/captions.json',caps)
old=json.loads((root/'current-voice-provenance.json').read_text());write(root/'current-voice-provenance.json',sorted([v for v in old if not 237<=v['id']<=278]+voices,key=lambda v:v['id']))
base=repo/'media/03_stills/voices38_act9';base.mkdir(exist_ok=True)
crops=[('motion', 'COURT_DOC15',7,[98,308,583,425]),('procedure','COURT_DOC24',1,[98,410,582,478]),('reminder','COURT_DOC24',1,[98,550,461,571]),('privacy','COURT_DOC24',1,[98,573,583,734]),('judge-signature','COURT_DOC24',2,[98,282,580,360]),('revised','COURT_DOC25',2,[98,431,582,503]),('pseudonym-context','COURT_DOC25',3,[98,137,582,255]),('grant','COURT_DOC26',2,[98,123,583,318])]
for name,id,page,box in crops:
 src=repo/f'media/01_sources/{id}/original.pdf';doc=fitz.open(src);dst=base/(name+'.png');doc[page-1].get_pixmap(matrix=fitz.Matrix(4,4),clip=fitz.Rect(box),alpha=False).save(dst);m=json.loads(src.with_name('metadata.json').read_text())
 write(dst.with_suffix('.png.meta.json'),dict(id='V38_A9_'+name,task='EX15',kind='image',title=f'{id} 第{page}页原件局部',path=str(dst.relative_to(repo)),derived_from=str(src.relative_to(repo)),source_page=m['source_url'],author='美国加州北区联邦法院 / Denuvo 提交文件',rights='法院公开文件，公开剪辑使用条件待确认',status='exported',page=page,crop_pdf_points=box,sha256=sha(dst),bytes=dst.stat().st_size))
for name,id,page,phrase in [('pseudonym-line','COURT_DOC25',3,'Denuvo has only a pseudonym.'),('privacy-line','COURT_DOC24',1,'could pose substantial privacy concerns.')]:
 src=repo/f'media/01_sources/{id}/original.pdf';doc=fitz.open(src);rect=doc[page-1].search_for(phrase)[0];rect=rect+(-2,-3,2,3);dst=base/(name+'.png');doc[page-1].get_pixmap(matrix=fitz.Matrix(7,7),clip=rect,alpha=False).save(dst);m=json.loads(src.with_name('metadata.json').read_text())
 write(dst.with_suffix('.png.meta.json'),dict(id='V38_A9_'+name,task='EX15',kind='image',title=f'{id} 原件关键句特写',path=str(dst.relative_to(repo)),derived_from=str(src.relative_to(repo)),source_page=m['source_url'],author='法院公开文件',rights=m['rights'],status='exported',page=page,crop_pdf_points=list(rect),sha256=sha(dst),bytes=dst.stat().st_size))
src=repo/'media/03_stills/source_images/V27_nfo.png'
for name,box in [('demon-release',[55,224,625,253]),('demon-kind',[55,287,545,300])]:
 dst=base/(name+'.png');Image.open(src).crop(box).save(dst);m=json.loads(src.with_suffix('.png.meta.json').read_text());write(dst.with_suffix('.png.meta.json'),dict(id='V38_A9_'+name,task='EX15',kind='image',title='V27 原NFO名称／KIND字段',path=str(dst.relative_to(repo)),derived_from=str(src.relative_to(repo)),source_page=m['source_page'],author='voices38',rights=m['rights'],status='exported',crop_pixels=box,sha256=sha(dst),bytes=dst.stat().st_size))
selects=[('dead-return','V38_A9_DEAD_official_1080p.mp4',22,5.7),('demon-tanjiro','V38_A9_TANJIRO_22.5-38.5_1080p.mp4',7,6),('onimusha-release','V38_A9_ONIMUSHA_official_1080p.mp4',100,14),('onimusha-fix','V38_A9_ONIMUSHA_official_1080p.mp4',114.5,13.5)]
videos=[]
for name,file,start,duration in selects:
 src=repo/'media/02_footage'/file;dst=repo/f'media/02_footage/derived/V38_A9_{name}.mp4'
 if not dst.exists():subprocess.run(['ffmpeg','-v','error','-y','-ss',str(start),'-i',str(src),'-t',str(duration),'-map','0:v:0','-an','-c:v','libx264','-crf','18','-preset','fast','-threads','2','-pix_fmt','yuv420p','-movflags','+faststart',str(dst)],check=True)
 m=json.loads(src.with_suffix('.mp4.meta.json').read_text());write(dst.with_suffix('.mp4.meta.json'),dict(id='V38_A9_'+name,task='EX15',kind='video',title='第九幕 / '+name,path=str(dst.relative_to(repo)),derived_from=str(src.relative_to(repo)),source_page=m['source_page'],author=m.get('author','原游戏发行商'),rights=m.get('rights','官方宣传材料，公开使用条件待确认'),status='exported',selected_range_seconds=[start,start+duration],source_sha256=sha(src),sha256=sha(dst),bytes=dst.stat().st_size,note='官方游戏画面，原速静音，不循环；非破解或修复效果实测'));videos.append((dst,name+'.mp4'))
records=[]
for src,name in [(p,p.name) for p in base.iterdir() if p.suffix in ['.png','.webp']]+videos:
 dst=root/'public/v38/act9'/name;dst.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,dst);m=json.loads(src.with_suffix(src.suffix+'.meta.json').read_text());records.append(dict(m,path=str(dst.relative_to(repo)),ledger_path=str(src.relative_to(repo)),sha256=sha(dst)))
write(root/'act9-asset-provenance.json',records)
print('42 original recordings, captions with authorized cuts;',len(records),'source assets')
