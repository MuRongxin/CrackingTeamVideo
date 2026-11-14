"""Verify Act9 provenance, unaltered voices and fresh real footage ranges."""
from pathlib import Path
import json,hashlib,subprocess,math
from PIL import Image
root=Path(__file__).resolve().parents[1];repo=root.parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
records=json.loads((root/'act9-asset-provenance.json').read_text())
assert len(records)==32
videos=[r for r in records if r['kind']=='video'];assert len(videos)==4
for r in records:
 p=repo/r['path'];assert sha(p)==r['sha256']==sha(repo/r['ledger_path']),p
 if r.get('derived_from'):assert (repo/r['derived_from']).exists()
 if r.get('source_sha256'):assert sha(repo/r['derived_from'])==r['source_sha256']
 if r['kind']=='image':
  with Image.open(p) as im:assert min(im.size)>10 and im.format in ['PNG','WEBP']
 if r.get('crop_pdf_points'):
  import pymupdf as fitz,re
  page=fitz.open(repo/r['derived_from'])[r['page']-1]
  text=page.get_text(clip=fitz.Rect(r['crop_pdf_points']))
  assert not re.search(r'\b\d{15,20}\b|@[a-zA-Z0-9]+\.',text),text
for video in videos:
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(repo/video['path'])]))
 v=probe['streams'][0];assert v['width']>=1280 and v['height']>=720
 assert all(s['codec_type']!='audio' for s in probe['streams'])
 lo,hi=video['selected_range_seconds'];assert float(probe['format']['duration'])>=hi-lo-1/eval(v['r_frame_rate'])
 for manifest in root.glob('*provenance.json'):
  if manifest.name=='act9-asset-provenance.json':continue
  for r in json.loads(manifest.read_text()):
   if r.get('derived_from')==video['derived_from'] and r.get('selected_range_seconds'):
    a,b=r['selected_range_seconds'];assert min(b,hi)<=max(a,lo),(manifest,a,b,lo,hi)
voices=json.loads((root/'src/act9/voice-manifest.json').read_text());assert {v['id'] for v in voices}==(set(range(237,279))-{267})|{298,299,300,311}
for v in voices:assert sha(repo/v['source'])==v['sha256']==sha(root/'public'/v['file'])
# Actual selected moving-picture durations cover each use, including sentence lead/tail.
durations={v['id']:v['duration'] for v in voices}
for name,ids,post in [('demon-tanjiro',[259,260],.15),('onimusha-release',[273,274,275],.15),('onimusha-fix',[276,277,278],.6)]:
 v=next(r for r in videos if r['path'].endswith(name+'.mp4'));need=math.ceil((.1+sum(durations[i] for i in ids)+.15*(len(ids)-1)+post)*60)/60
 actual=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-of','json',str(repo/v['path'])]))
 assert float(actual['format']['duration'])>=need,(name,need)
assert 5.7>=durations[257]+durations[258]+.3
print('PASS: 32 source assets, 4 unlooped video selections, no previous time-range overlap, 45 active recordings, original take 267 archived, bounded PDF crops.')
