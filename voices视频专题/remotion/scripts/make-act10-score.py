"""Original sparse epilogue score; no sampled or external music."""
from pathlib import Path
import numpy as np
import json,wave,hashlib,shutil,math
root=Path(__file__).resolve().parents[1];repo=root.parents[1];rate=24000
voices=json.loads((root/'src/act10/voice-manifest.json').read_text());ds={v['id']:v['duration'] for v in voices}
groups=[[301,302],[281,282,283],[284,285,286],[287],[288,289,290,291],[292],[303,304],[296],[297],[305,306,307,308]]
posts=[.15,.15,.3,.15,.15,.65,.15,.3,1.6,1.5]
lens=[math.ceil((.1+sum(ds[n] for n in g)+.15*(len(g)-1)+post)*60)/60 for g,post in zip(groups,posts)]
stop=sum(lens[:8]);duration=stop;audio=np.zeros(round(duration*rate))
def note(at,sec,hz,gain,soft=False):
 a=round(at*rate);b=min(len(audio),a+round(sec*rate));t=np.arange(b-a)/rate
 if b<=a:return
 env=(1-np.exp(-t/(.4 if soft else .025)))*np.exp(-t/(2.6 if soft else 1.2))*np.minimum(1,(sec-t)/.5)
 audio[a:b]+=gain*env*(np.sin(2*np.pi*hz*t)+.16*np.sin(2*np.pi*hz*2.002*t))
# Open fifths and a small descending phrase, without percussion or a final cadence.
for at in np.arange(2,stop-10,9.2):
 for hz,gain in [(146.832,.032),(220,.018),(329.628,.012)]:note(float(at),8,hz,gain,True)
for at,hz in [(5,440),(9.8,349.228),(15.5,329.628),(23,440),(29,392),(34.8,329.628),(43,440),(48,349.228),(54,293.665),(61,329.628)]:
 if at<stop-8:note(at,5,hz,.032)
t=np.arange(len(audio))/rate
fade=np.minimum(1,t/2.5)*np.clip((stop-1.5-t)/5,0,1)
audio*=fade
src=repo/'media/05_audio/original/V38_A10_epilogue.wav';src.parent.mkdir(parents=True,exist_ok=True)
with wave.open(str(src),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes((np.clip(audio,-.9,.9)*32767).astype('<i2').tobytes())
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
m=dict(id='V38_A10_SCORE',task='AU15',kind='audio',title='尾声原创稀疏配乐',path=str(src.relative_to(repo)),derived_from=str(Path(__file__).relative_to(repo)),author='本项目原创合成',rights='本项目原创，无外部采样',status='exported',sha256=sha(src),bytes=src.stat().st_size,note='正弦音与少量泛音合成，无打击节拍；第八镜末尾前已退静，最后一句无音乐。')
src.with_suffix('.wav.meta.json').write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
dst=root/'public/v38/act10/epilogue-score.wav';shutil.copyfile(src,dst)
p=root/'act10-asset-provenance.json';rows=json.loads(p.read_text());rows=[r for r in rows if r['id']!=m['id']]+[dict(m,path=str(dst.relative_to(repo)),ledger_path=str(src.relative_to(repo)))];p.write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
print('Shot frames',[round(s*60) for s in lens],'Act10',sum(round(s*60) for s in lens),'score',round(stop,3))
