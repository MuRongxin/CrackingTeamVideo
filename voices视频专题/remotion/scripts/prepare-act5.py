"""Prepare act 5 using existing local sources; never rewrite earlier acts."""
from pathlib import Path
from PIL import Image
import argparse, hashlib, json, shutil, wave

root=Path(__file__).resolve().parents[1]; repo=root.parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--captions',action='store_true');args=parser.parse_args()
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,v):
 p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
records=[];voices=[]
for n in range(137,151):
 candidates=list((root.parent/'videoVoices').glob(f'sentence_{n}_*.wav'));assert len(candidates)==1
 src=candidates[0];dst=root/f'public/v38/vo/sentence-{n}.wav';shutil.copyfile(src,dst)
 with wave.open(str(src)) as w:duration=w.getnframes()/w.getframerate()
 voices.append(dict(id=n,file=f'v38/vo/sentence-{n}.wav',duration=duration,original=src.name,source=str(src.relative_to(repo)),sha256=sha(dst)))
 records.append(dict(path=str(dst.relative_to(repo)),derived_from=str(src.relative_to(repo)),status='copied',note='第五幕原速原始录音',sha256=sha(dst)))
write(root/'src/act5/voice-manifest.json',voices)
old=json.loads((root/'current-voice-provenance.json').read_text())
write(root/'current-voice-provenance.json',sorted([v for v in old if not 137<=v['id']<=150]+voices,key=lambda v:v['id']))
# Phrase boundaries follow local silence measurements (-35dB / .13s).
anchors={137:[1.26,2.81],138:[2.25],139:[1.62],140:[1.62],141:[2.10],142:[1.52],143:[2.29],144:[3.20],145:[.58],146:[2.50],147:[2.22,3.27],148:[1.74],149:[.94,2.62],150:[1.46]}
caption_file=root/'src/act5/captions.json'
if args.captions or not caption_file.exists():
 phrases=json.loads((root/'src/act5/narration-source.json').read_text());captions={}
 for v in voices:
  parts=phrases[str(v['id'])].split('|');edges=[.02]+anchors[v['id']]+[v['duration']-.025];assert len(edges)==len(parts)+1
  rows=[]
  for text,a,b in zip(parts,edges,edges[1:]):
   if len(text)>24:
    k=text.rfind(' ',9,23)
    if k<9:k=len(text)//2
    text=text[:k].rstrip()+'\n'+text[k:].lstrip()
   rows.append(dict(text=text,startMs=round(a*1000),endMs=round(b*1000),timestampMs=None,confidence=None))
  captions[str(v['id'])]=rows
 write(caption_file,captions)

# Reflow the textual record rather than using xREL's restricted page raster.
data={}
for code,key in [('V14','pragmata'),('V15','bond')]:
 src=repo/f'media/01_sources/{code}/extracted_pre.txt';txt=src.read_text()
 block=txt.split('Special thanks to the testers who ensured quality of this release:')[1].strip().split('\n\n')[0]
 lines=[[s.strip() for s in line.split('|') if s.strip()] for line in block.splitlines()]
 names=[name for line in lines for name in line];assert len(names)==len(set(names))
 data[key]=dict(names=names,lines=lines,source=str(src.relative_to(repo)),sha256=sha(src))
assert len(data['pragmata']['names'])==34 and len(data['bond']['names'])==29
# Case, punctuation and spelling are significant; no identity inference.
data['exactMatches']=[n for n in data['pragmata']['names'] if n in data['bond']['names']]
assert 'Ace<D>0' not in data['exactMatches'] and 'Ace<D>0f' not in data['exactMatches']
write(root/'src/act5/testers.json',data)

src=repo/'media/03_stills/source_images/V19_nfo.png';box=[56,223,601,316]
archive=repo/'media/03_stills/voices38_act5/mgsv-fields.png';archive.parent.mkdir(parents=True,exist_ok=True)
with Image.open(src) as im:im.crop(box).save(archive)
dst=root/'public/v38/act5/mgsv-fields.png';dst.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(archive,dst)
original=json.loads(src.with_suffix('.png.meta.json').read_text())
meta=dict(id='V38_A5_MGSV_FIELDS',task='EX15',kind='image',title='第五幕 合金装备5 NFO 原始字段',path=str(archive.relative_to(repo)),derived_from=str(src.relative_to(repo)),source_page=original['source_page'],author=original['author'],rights=original['rights'],status='exported',crop_pixels=box,source_sha256=sha(src),sha256=sha(archive),bytes=archive.stat().st_size)
write(archive.with_suffix('.png.meta.json'),meta)
records.append(dict(path=str(dst.relative_to(repo)),ledger_path=str(archive.relative_to(repo)),derived_from=str(src.relative_to(repo)),status='exported',crop_pixels=box,sha256=sha(dst)))
write(root/'act5-asset-provenance.json',records)
print(f'Prepared {len(voices)} original recordings, 1 crop, {len(data["exactMatches"])} exact name matches.')
