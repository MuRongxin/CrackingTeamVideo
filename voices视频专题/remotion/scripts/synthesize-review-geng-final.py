"""Common-character fourth-tone fallback after rare-character validation failed."""
from pathlib import Path
import requests,json,hashlib,wave,shutil
root=Path(__file__).resolve().parents[1];batch=root.parent/'tts/2026-11-14-review-fixes';b='https://8300-cpod-1xko19fbcsqy-s3.pod.compshare.cn'
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
rows=json.loads((batch/'manifest.json').read_text())
for r in rows:
 if r['id'] not in [309,310]:continue
 text=r['text']
 tts=text.replace('更新','亘新')
 if r['id']==310:tts=tts.replace('亘新更加','亘新、更加')
 payload=dict(text=tts,audio_path='voices38_narration_reference.wav');p=batch/f"{r['id']}.wav"
 if not (batch/f"attempt-{r['id']}-rare.wav").exists():shutil.copyfile(p,batch/f"attempt-{r['id']}-rare.wav");shutil.copyfile(batch/f"request-{r['id']}.json",batch/f"attempt-request-{r['id']}-rare.json")
 (batch/f"request-{r['id']}.json").write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
 print('SYNTH',r['id'],tts,flush=True)
 response=requests.post(b+'/v2/synthesize',json=payload,timeout=180);response.raise_for_status()
 if not response.content.startswith(b'RIFF'):raise RuntimeError(response.text[:200])
 p.write_bytes(response.content)
 with wave.open(str(p)) as w:r.update(duration=w.getnframes()/w.getframerate(),sample_rate=w.getframerate())
 r.update(sha256=sha(p),tts_text=tts,pronunciation_note='罕见字堩首轮未通过复核；改用常用四声近音字亘作TTS输入，字幕保留更；更加保留原字')
 (batch/'manifest.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n');print('DONE',r['id'],r['duration'],flush=True)
print('SYNTH_DONE_NEEDS_VERIFICATION',flush=True)
