"""Prepare only act 6 from current recordings and existing local evidence."""
from pathlib import Path
from PIL import Image
import argparse, hashlib, json, shutil, wave, re

root=Path(__file__).resolve().parents[1];repo=root.parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--captions',action='store_true');args=parser.parse_args()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,v):
 p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
phrases=json.loads((root/'src/act6/narration-source.json').read_text())
norm=lambda s:re.sub(r'[^\w]','',s).lower()
manuscript=(root.parent/'voices38_B站文稿.md').read_text().split('## Wuk0ng')[1].split('## 一个问号')[0]
assert norm(manuscript)==norm(''.join(phrases.values())),'Narration must match current manuscript'
voices=[];records=[]
for n in range(151,189):
 candidates=list((root.parent/'videoVoices').glob(f'sentence_{n}_*.wav'));assert len(candidates)==1
 src=candidates[0];dst=root/f'public/v38/vo/sentence-{n}.wav';shutil.copyfile(src,dst)
 with wave.open(str(src)) as w:duration=w.getnframes()/w.getframerate()
 voices.append(dict(id=n,file=f'v38/vo/sentence-{n}.wav',duration=duration,source=str(src.relative_to(repo)),original=src.name,sha256=sha(dst)))
 records.append(dict(path=str(dst.relative_to(repo)),derived_from=str(src.relative_to(repo)),status='copied',sha256=sha(dst),note='第六幕原始录音，原速使用'))
write(root/'src/act6/voice-manifest.json',voices)
old=json.loads((root/'current-voice-provenance.json').read_text())
write(root/'current-voice-provenance.json',sorted([v for v in old if not 151<=v['id']<=188]+voices,key=lambda v:v['id']))
# Measured local silences (-35 dB, .13 s); continuous phrases have explicit manual initial cuts.
anchors={152:[1.15],154:[1.53],156:[.64],157:[2.72],158:[2.96],159:[1.35],160:[1.84],161:[3.14],162:[2.42],163:[.85],165:[1.39],167:[2.24],169:[2.45],170:[1.48],171:[2.87],172:[1.58],173:[2.15],175:[.78],176:[1.32],177:[1.25,3.9],178:[1.44,2.56,3.96],179:[1.24],180:[1.54],182:[2.53],183:[.8],184:[2.43],185:[2.1],186:[1.28,3.87,6.27],187:[2.16,4.03,5.02],188:[3.67,6.52]}
file=root/'src/act6/captions.json'
if args.captions or not file.exists():
 captions={}
 for v in voices:
  parts=phrases[str(v['id'])].split('|');edges=[.02]+anchors.get(v['id'],[])+[v['duration']-.025]
  assert len(edges)==len(parts)+1,(v['id'],parts)
  rows=[]
  for text,a,b in zip(parts,edges,edges[1:]):
   if len(text)>29:
    # Break only at a natural punctuation/space, never inside an English word.
    candidates=[i for i,c in enumerate(text) if c in ' ，、' and 10<=i<=len(text)-8]
    k=min(candidates,key=lambda i:abs(i-len(text)/2)) if candidates else len(text)//2
    text=text[:k].rstrip()+'\n'+text[k:].lstrip()
   rows.append(dict(text=text,startMs=round(a*1000),endMs=round(b*1000),timestampMs=None,confidence=None))
  captions[str(v['id'])]=rows
 write(file,captions)
src=repo/'media/03_stills/source_images/V18_nfo.png';box=[56,222,603,314]
dst=repo/'media/03_stills/voices38_act6/wukong-fields.png';dst.parent.mkdir(parents=True,exist_ok=True)
with Image.open(src) as im:im.crop(box).save(dst)
original=json.loads(src.with_suffix('.png.meta.json').read_text())
meta=dict(id='V38_A6_WUKONG_FIELDS',task='EX15',kind='image',title='第六幕 黑神话悟空 NFO 原始字段',path=str(dst.relative_to(repo)),derived_from=str(src.relative_to(repo)),source_page=original['source_page'],author=original['author'],rights=original['rights'],status='exported',crop_pixels=box,source_sha256=sha(src),sha256=sha(dst),bytes=dst.stat().st_size)
write(dst.with_suffix('.png.meta.json'),meta)
public=root/'public/v38/act6/wukong-fields.png';public.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(dst,public)
records.append(dict(meta,path=str(public.relative_to(repo)),ledger_path=str(dst.relative_to(repo))))
write(root/'act6-asset-provenance.json',records)
print('Prepared 38 original voices, manuscript-matched captions, and one original NFO crop.')
