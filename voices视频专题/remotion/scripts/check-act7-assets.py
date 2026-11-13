"""Validate source identity, actual clip duration and cross-act picture ranges."""
from pathlib import Path
import json,hashlib,subprocess
root=Path(__file__).resolve().parents[1];repo=root.parents[1]
assets=json.loads((root/'act7-asset-provenance.json').read_text());assert len(assets)==11
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
previous=[]
for f in root.glob('*provenance.json'):
 if f.name=='act7-asset-provenance.json':continue
 data=json.loads(f.read_text())
 if isinstance(data,list):previous.extend(x for x in data if isinstance(x,dict) and x.get('selected_range_seconds'))
current=[]
for v in assets:
 p=repo/v['path'];assert sha(p)==v['sha256'],p
 assert v['source_page'] and v['rights'] and v['author']
 if p.suffix=='.mp4':
  original=repo/v['derived_from'];assert sha(original)==v['source_sha256']
  probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]));a,b=v['selected_range_seconds']
  assert abs(float(probe['format']['duration'])-(b-a))<.08
  assert not any(s['codec_type']=='audio' for s in probe['streams'])
  for old in previous+current:
   if old.get('derived_from')==v['derived_from']:
    c,d=old['selected_range_seconds'];assert min(b,d)-max(a,c)<=.001,(v['path'],old['path'])
  current.append(v)
assert len(current)==6
print('PASS: 6 original-speed video selects, no repeated source intervals across acts; 5 source images, hashes and provenance valid.')
