"""Priority paid-service batch: only the three pronunciation corrections."""
from pathlib import Path
import requests,json,wave,hashlib
root=Path(__file__).resolve().parents[1];repo=root.parents[1];batch=root.parent/'tts/2026-11-14-review-fixes';batch.mkdir(exist_ok=True,parents=True)
base='https://8300-cpod-1xko19fbcsqy-s3.pod.compshare.cn';reference=root.parent/'tts/2026-11-14/reference.wav';name='voices38_narration_reference.wav'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
write=lambda p,v:p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
with reference.open('rb') as f:
 response=requests.post(base+'/v1/upload_audio',files={'audio':(name,f,'audio/wav')},data={'full_path':name},timeout=40);response.raise_for_status();write(batch/'reference-upload.json',response.json())
rows=[]
for new,old,act in [(309,52,2),(310,126,4),(311,267,9)]:
 caps=json.loads((root/f'src/act{act}/captions.json').read_text())[str(old)];text=''.join(c['text'].replace('\n','') for c in caps)
 tts=text.replace('更','堩') if old in [52,126] else text.replace('Wuk0ng','Wukong').replace('WuK0ng','Wukong')
 tts=tts.replace('voices38','voices thirty-eight')
 r=dict(id=new,replaces=old,act=act,text=text,tts_text=tts,reference_sha256=sha(reference),endpoint=base)
 path=batch/f'{new}.wav';payload=dict(text=tts,audio_path=name);write(batch/f'request-{new}.json',payload)
 if not path.exists():
  print('SYNTH',new,'replaces',old,tts,flush=True);response=requests.post(base+'/v2/synthesize',json=payload,timeout=600);response.raise_for_status()
  if not response.content.startswith(b'RIFF'):raise RuntimeError('Expected WAV: '+response.text[:300])
  path.write_bytes(response.content)
 with wave.open(str(path)) as w:r.update(duration=w.getnframes()/w.getframerate(),sample_rate=w.getframerate())
 r.update(path=str(path.relative_to(repo)),sha256=sha(path));rows.append(r);write(batch/'manifest.json',rows);print('DONE',new,round(r['duration'],3),flush=True)
print('SERVICE_BATCH_COMPLETE: all three requested retakes saved locally; no more API calls needed.',flush=True)
