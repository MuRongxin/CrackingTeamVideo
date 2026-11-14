"""Activate the three approved retakes; retain every original source and caption."""
from pathlib import Path
import json,hashlib,shutil
root=Path(__file__).resolve().parents[1];repo=root.parents[1];batch=root.parent/'tts/2026-11-14-review-fixes'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
write=lambda p,v:p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
allvoices=json.loads((root/'current-voice-provenance.json').read_text());by={v['id']:v for v in allvoices}
records=json.loads((batch/'manifest.json').read_text());archive=[]
archived={r['voice']['id']:r for r in json.loads((batch/'archived-takes.json').read_text())} if (batch/'archived-takes.json').exists() else {}
for r in records:
 new,old,act=r['id'],r['replaces'],r['act'];folder=root/f'src/act{act}';vs=json.loads((folder/'voice-manifest.json').read_text());caps=json.loads((folder/'captions.json').read_text());prior=by[old]
 archive.append(dict(voice=prior,captions=caps.get(str(old)),replacedBy=new))
 src=repo/r['path'];voice=root.parent/f'videoVoices/sentence_{new}_review.wav';public=root/f'public/v38/vo/sentence-{new}.wav';ledger=repo/f'media/05_audio/narration/V38_TTS_{new}.wav';ledger.parent.mkdir(parents=True,exist_ok=True)
 for dst in [voice,public,ledger]:shutil.copyfile(src,dst)
 v=dict(id=new,file=f'v38/vo/sentence-{new}.wav',duration=r['duration'],source=str(voice.relative_to(repo)),original=voice.name,sha256=sha(src),provider='IndexTTS2',tts_request=str((batch/f'request-{new}.json').relative_to(repo)),replaces=old)
 vs=[x for x in vs if x['id'] not in [old,new]]+[v];write(folder/'voice-manifest.json',vs)
 rows=caps.pop(str(old), None) or archived[old]['captions']
 scale=r['duration']/prior['duration'];caps[str(new)]=[dict(c,startMs=round(c['startMs']*scale),endMs=round(c['endMs']*scale)) for c in rows]
 write(folder/'captions.json',caps)
 ns=folder/'narration-source.json'
 if ns.exists():
  obj=json.loads(ns.read_text())
  if str(old) in obj:obj[str(new)]=obj.pop(str(old))
  write(ns,obj)
 allvoices=[x for x in allvoices if x['id']!=new]+[v]
 m=dict(id=f'V38_TTS_{new}',kind='audio',task='AU15',title=f'审片错音修订 {old} → {new}',path=str(ledger.relative_to(repo)),derived_from=str(src.relative_to(repo)),author='本项目文稿 / 用户指定 IndexTTS 服务',rights='用户授权本片语音合成与剪辑',status='exported',sha256=sha(src),source_sha256=sha(src),bytes=ledger.stat().st_size,text=r['text'],tts_text=r['tts_text'],replaces=old,reference_sha256=r['reference_sha256'])
 write(ledger.with_suffix('.wav.meta.json'),m);write(voice.with_suffix('.wav.meta.json'),m)
write(root/'current-voice-provenance.json',sorted(allvoices,key=lambda v:v['id']))
p=root/'narration-revisions.json';rev=json.loads(p.read_text());rev['retiredIds']=sorted(set(rev['retiredIds']+[52,126,267]));rev['newIds']=sorted(set(rev['newIds']+[309,310,311]));rev['reviewRetakes']=[dict(old=r['replaces'],new=r['id']) for r in records];write(p,rev)
if not (batch/'archived-takes.json').exists():write(batch/'archived-takes.json',archive)
print('Activated 309–311; all old WAV sources preserved.')

import subprocess
subprocess.run(['python3',str(root/'scripts/format-captions.py')],check=True)
