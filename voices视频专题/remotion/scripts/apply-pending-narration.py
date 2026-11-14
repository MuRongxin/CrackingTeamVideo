"""Apply new IndexTTS recordings without modifying or deleting the original takes."""
from pathlib import Path
import json,hashlib,shutil,re,wave,numpy as np
root=Path(__file__).resolve().parents[1];repo=root.parents[1];folder=root.parent/'tts/2026-11-14'
write=lambda p,v:p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
manifest=json.loads((folder/'manifest.json').read_text());by={r['id']:r for r in manifest}
parts={
298:'11 月 12 日，发行记录里，|又出现了一份署名 voices38 的破解：|《星球大战：银河赛车手》。',
299:'新的 Reddit 发布帖，|作者一栏写着 v0ices38。|而发行说明上，还是原来的 voices38。',
300:'KIND 一栏，还是熟悉的玩笑：|一串引擎声，后面跟着一句粗口。',
301:'截至 2026 年 11 月 13 日，|我们还没有查到 voices38 身份已被确认的可靠公开消息。',
302:'平台有没有交出资料、交了什么，|也没有查到能公开核实的结果。',
303:'一年后，旧账号已经不见了，|新的署名又出现在发布帖上。',
304:'名字在变，留下的痕迹还在，|但身份依然没有答案。',
305:'这就是新生代D加密梦魇 |voices thirty-eight的故事，',306:'谢谢你来看我的视频。',
307:'如果你对其他破解组的故事感兴趣，|可以关注我后续的视频更新哦，',308:'R组、C组、女皇等的内容|正在热情制作中！'}
newvoices=[];caps={}
for n,r in by.items():
 src=repo/r['path'];name=f'sentence_{n}_{r["shot"]}.wav';voice=root.parent/'videoVoices'/name;shutil.copyfile(src,voice)
 public=root/f'public/v38/vo/sentence-{n}.wav';shutil.copyfile(src,public)
 ledger=repo/f'media/05_audio/narration/V38_TTS_{n}.wav';ledger.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,ledger)
 record=dict(id=n,file=f'v38/vo/sentence-{n}.wav',duration=r['duration'],source=str(voice.relative_to(repo)),original=name,sha256=sha(src),provider='IndexTTS2',tts_request=f'voices视频专题/tts/2026-11-14/request-{n}.json')
 newvoices.append(record)
 m=dict(id=f'V38_TTS_{n}',kind='audio',task='AU15',title=f'{r["shot"]} / 新增或替换旁白 {n}',path=str(ledger.relative_to(repo)),derived_from=str(src.relative_to(repo)),author='本项目文稿 / 用户指定 IndexTTS 服务',rights='用户授权使用现有旁白音色合成，内部剪辑与本片使用',status='exported',sha256=sha(src),bytes=ledger.stat().st_size,source_sha256=sha(src),text=r['text'],tts_text=r['tts_text'],reference_sha256=r['reference_sha256'],endpoint=r['endpoint'])
 write(ledger.with_suffix('.wav.meta.json'),m);write(voice.with_suffix('.wav.meta.json'),m)
 chunks=parts[n].split('|');assert ''.join(chunks)==r['text'],(n,r['text'])
 with wave.open(str(src)) as w:rate=w.getframerate();x=np.frombuffer(w.readframes(w.getnframes()),dtype='<i2').astype(float)/32768
 # Use text-weighted anchors, then land close to actual low-energy phrase pauses.
 def weight(t):return len(re.sub(r'[^\w]','',t.replace('voices38','维斯三十八').replace('v0ices38','维斯三十八').replace('voices thirty-eight','维斯三十八')))
 weights=[max(1,weight(c)) for c in chunks];d=r['duration'];edges=[.02]
 for i in range(1,len(chunks)):
  aim=d*sum(weights[:i])/sum(weights);a=max(edges[-1]+.25,aim-.26);b=min(d-.25,aim+.26);hop=int(rate*.01);win=int(rate*.04)
  candidates=[(float(np.mean(x[k:k+win]**2)),k/rate) for k in range(int(a*rate),int(b*rate),hop) if k+win<len(x)]
  point=min(candidates,key=lambda t:t[0]+.001*abs(t[1]-aim))[1] if candidates else aim
  edges.append(point)
 edges.append(d-.025);rows=[]
 for text,a,b in zip(chunks,edges,edges[1:]):
  if len(text)>27:
   choices=[i for i,c in enumerate(text) if c in ' ，、' and 8<=i<=len(text)-7];k=min(choices,key=lambda i:abs(i-len(text)/2)) if choices else len(text)//2;text=text[:k].rstrip()+'\n'+text[k:].lstrip()
  rows.append(dict(text=text,startMs=round(a*1000),endMs=round(b*1000),timestampMs=None,confidence=None))
 caps[str(n)]=rows
retired=[279,280,293,294,295]
for act,add,remove in [(9,[298,299,300],[]),(10,list(range(301,309)),retired)]:
 f=root/f'src/act{act}';vs=json.loads((f/'voice-manifest.json').read_text());vs=[v for v in vs if v['id'] not in remove and v['id'] not in add]+[v for v in newvoices if v['id'] in add];write(f/'voice-manifest.json',vs)
 cs=json.loads((f/'captions.json').read_text());cs={k:v for k,v in cs.items() if int(k) not in remove};cs.update({str(n):caps[str(n)] for n in add});write(f/'captions.json',cs)
 ns=json.loads((f/'narration-source.json').read_text());ns={k:v for k,v in ns.items() if int(k) not in remove};ns.update({str(n):parts[n] for n in add});write(f/'narration-source.json',ns)
vs=json.loads((root/'current-voice-provenance.json').read_text());write(root/'current-voice-provenance.json',[v for v in vs if v['id']<298]+sorted(newvoices,key=lambda v:v['id']))
write(root/'narration-revisions.json',dict(retiredIds=retired,newIds=list(range(298,309)),replacements={'A10-01':{'old':[279,280],'new':[301,302]},'A10-07':{'old':[293,294,295],'new':[303,304]}},batch='voices视频专题/tts/2026-11-14/manifest.json'))
print('Applied 11 synthesized recordings; 5 original takes retained in archive, 303 active recordings')

# Preserve the later review retakes when rebuilding base narration.
if (root.parent/'tts/2026-11-14-review-fixes/manifest.json').exists():
    import subprocess
    subprocess.run(['python3',str(root/'scripts/apply-review-retakes.py')],check=True)
