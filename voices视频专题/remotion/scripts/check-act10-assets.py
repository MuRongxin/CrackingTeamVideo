from pathlib import Path
import json,hashlib,subprocess
import numpy as np
import wave
repo=Path(__file__).resolve().parents[3];root=Path(__file__).resolve().parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
rows=json.loads((root/'act10-asset-provenance.json').read_text());assert len(rows)==8
for r in rows:
 assert sha(repo/r['path'])==r['sha256']==sha(repo/r['ledger_path'])
 assert (repo/r['derived_from']).exists()
 if r.get('source_sha256'):assert sha(repo/r['derived_from'])==r['source_sha256']
video=next(r for r in rows if r['kind']=='video');lo,hi=video['selected_range_seconds']
for manifest in root.glob('*provenance.json'):
 if manifest.name=='act10-asset-provenance.json':continue
 for r in json.loads(manifest.read_text()):
  if r.get('derived_from')==video['derived_from'] and r.get('selected_range_seconds'):
   a,b=r['selected_range_seconds'];assert min(b,hi)<=max(a,lo),(manifest,a,b,lo,hi)
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(repo/video['path'])]))
assert len(probe['streams'])==1 and probe['streams'][0]['width']==1920 and float(probe['format']['duration'])>=7.3-.034
subprocess.run(['ffmpeg','-v','error','-xerror','-i',str(repo/video['path']),'-f','null','-'],check=True)
score=next(r for r in rows if r['kind']=='audio')
with wave.open(str(repo/score['path'])) as w:
 samples=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2');rate=w.getframerate()
 assert np.max(np.abs(samples.astype('int32')))<32767
 assert np.max(np.abs(samples[-rate:]))==0
voices=json.loads((root/'src/act10/voice-manifest.json').read_text());assert [v['id'] for v in voices]==list(range(279,298))
for v in voices:assert sha(repo/v['source'])==v['sha256']==sha(root/'public'/v['file'])
print('PASS: 7 new assets + 1 archive crop; bounded original crops, new unlooped 1080p range, unclipped original score fading to silence, 19 unchanged recordings.')
