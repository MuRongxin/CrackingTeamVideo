"""Synthesize explicitly pending narration with the user-provided IndexTTS service."""
from pathlib import Path
import requests,json,hashlib,wave,re,time
root=Path(__file__).resolve().parents[2];folder=root/'tts/2026-11-14';raw=folder/'raw';raw.mkdir(exist_ok=True)
base='https://8300-cpod-1xko19fbcsqy-s3.pod.compshare.cn'
rows=[
(298,'A9-18','11 月 12 日，发行记录里，又出现了一份署名 voices38 的破解：《星球大战：银河赛车手》。'),
(299,'A9-19','新的 Reddit 发布帖，作者一栏写着 v0ices38。而发行说明上，还是原来的 voices38。'),
(300,'A9-20','KIND 一栏，还是熟悉的玩笑：一串引擎声，后面跟着一句粗口。'),
(301,'A10-01','截至 2026 年 11 月 13 日，我们还没有查到 voices38 身份已被确认的可靠公开消息。'),
(302,'A10-01','平台有没有交出资料、交了什么，也没有查到能公开核实的结果。'),
(303,'A10-07','一年后，旧账号已经不见了，新的署名又出现在发布帖上。'),
(304,'A10-07','名字在变，留下的痕迹还在，但身份依然没有答案。'),
(305,'A10-10','这就是新生代D加密梦魇 voices thirty-eight的故事，'),
(306,'A10-10','谢谢你来看我的视频。'),
(307,'A10-10','如果你对其他破解组的故事感兴趣，可以关注我后续的视频更新哦，'),
(308,'A10-10','R组、C组、女皇等的内容正在热情制作中！'),
]
def normalize(t):
 t=t.replace('v0ices38','voices thirty-eight').replace('voices38','voices thirty-eight')
 return t.replace('11 月 12 日','十一月十二日').replace('2026 年 11 月 13 日','二零二六年十一月十三日')
plan=[dict(id=n,shot=shot,text=t,tts_text=normalize(t),output=f'raw/{n}.wav') for n,shot,t in rows]
(folder/'pending.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2)+'\n')
result=[]
for entry in plan:
 path=raw/f"{entry['id']}.wav";payload=dict(text=entry['tts_text'],audio_path='voices38_narration_reference.wav')
 if not path.exists():
  (folder/f"request-{entry['id']}.json").write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
  print('SYNTH',entry['id'],entry['shot'],flush=True)
  response=requests.post(base+'/v2/synthesize',json=payload,timeout=600)
  if not response.ok:
   (folder/f"error-{entry['id']}.txt").write_text(response.text);raise RuntimeError(f'HTTP {response.status_code} for {entry["id"]}')
  if 'json' in response.headers.get('content-type',''):
   j=response.json();(folder/f"response-{entry['id']}.json").write_text(json.dumps(j,ensure_ascii=False,indent=2)+'\n');raise RuntimeError('Expected WAV, got JSON; inspect response')
  path.write_bytes(response.content)
 with wave.open(str(path)) as w:duration=w.getnframes()/w.getframerate();rate=w.getframerate()
 record=dict(entry,path=str(path.relative_to(root.parent)),duration=duration,sample_rate=rate,sha256=hashlib.sha256(path.read_bytes()).hexdigest(),provider='用户提供的 IndexTTS2 API',endpoint=base,reference_sha256=json.loads((folder/'reference-provenance.json').read_text())['sha256'])
 result.append(record);(folder/'manifest.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
 print('DONE',entry['id'],round(duration,3),flush=True)
print('COMPLETE',len(result),round(sum(r['duration'] for r in result),3),flush=True)
