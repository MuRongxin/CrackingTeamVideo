"""Check source integrity, real media, crop boundaries and unused game ranges."""
from pathlib import Path
import json,hashlib,subprocess
from PIL import Image
root=Path(__file__).resolve().parents[1];repo=root.parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
records=json.loads((root/'act8-asset-provenance.json').read_text())
assert len(records)==22
assert sum(r['kind']=='video' for r in records)==1
for r in records:
 p=repo/r['path'];source=repo/r['ledger_path']
 assert p.exists() and source.exists(),r['path']
 assert sha(p)==r['sha256']==sha(source),p
 if r['kind']=='image':
  with Image.open(p) as im:assert im.format=='PNG' and min(im.size)>10,p
 if r.get('derived_from'):
  assert (repo/r['derived_from']).exists()
 if r.get('source_sha256'):assert sha(repo/r['derived_from'])==r['source_sha256']
 if r.get('crop_pdf_points'):
  # Page 1 excludes the lawyers' contact block; page 2 stops above account IDs.
  y0,y1=r['crop_pdf_points'][1::2]
  if r['page']==1:assert y1<=34 or y0>=399
  if r['page']==2:assert y1<=550
video=next(r for r in records if r['kind']=='video');p=repo/video['path']
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))
v=probe['streams'][0];assert (v['width'],v['height'])==(1920,1080)
assert all(s['codec_type']!='audio' for s in probe['streams'])
voices=json.loads((root/'src/act8/voice-manifest.json').read_text())
need=sum(v['duration'] for v in voices if v['id'] in [212,213])+.4
assert float(probe['format']['duration'])>=need
for manifest in root.glob('*provenance.json'):
 if manifest.name=='act8-asset-provenance.json':continue
 for r in json.loads(manifest.read_text()):
  if r.get('derived_from')==video['derived_from'] and r.get('selected_range_seconds'):
   a,b=r['selected_range_seconds'];c,d=video['selected_range_seconds'];assert min(b,d)<=max(a,c),(manifest,a,b,c,d)
assert [v['id'] for v in voices]==list(range(211,237))
for v in voices:assert sha(repo/v['source'])==v['sha256']==sha(root/'public'/v['file'])
print('PASS: 22 sourced picture assets; original voices 211–236; safe PDF crops; new 1080p footage covers shot, no overlap with previous selections.')
