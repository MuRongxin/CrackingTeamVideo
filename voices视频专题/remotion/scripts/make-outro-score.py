from pathlib import Path
import numpy as np,json,wave,hashlib,shutil
root=Path(__file__).resolve().parents[1];repo=root.parents[1];sr=24000
vs=json.loads((root/'src/act10/voice-manifest.json').read_text());d={v['id']:v['duration'] for v in vs};seconds=.1+sum(d[n] for n in range(305,309))+.45+1.5
x=np.zeros(round(seconds*sr))
for i,at in enumerate(np.arange(.2,seconds-1,1.35)):
 hz=[220,329.628,440,293.665,349.228,329.628][i%6];a=round(at*sr);b=min(len(x),a+sr*4);t=np.arange(b-a)/sr
 x[a:b]+=.045*(1-np.exp(-t/.012))*np.exp(-t/1.0)*(np.sin(2*np.pi*hz*t)+.12*np.sin(2*np.pi*hz*2*t))
t=np.arange(len(x))/sr;x*=np.minimum(1,t/.4)*np.clip((seconds-t)/1.3,0,1)
p=repo/'media/05_audio/original/V38_outro_score.wav';p.parent.mkdir(exist_ok=True,parents=True)
with wave.open(str(p),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr);w.writeframes((x*32767).astype('<i2').tobytes())
sha=hashlib.sha256(p.read_bytes()).hexdigest();m=dict(id='V38_UP_OUTRO_SCORE',task='AU15',kind='audio',title='片尾原创短拨弦配乐',path=str(p.relative_to(repo)),derived_from=str(Path(__file__).relative_to(repo)),author='本项目原创合成',rights='本项目原创，无外部采样',status='exported',sha256=sha,bytes=p.stat().st_size)
p.with_suffix('.wav.meta.json').write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n');dst=root/'public/v38/update/outro-score.wav';shutil.copyfile(p,dst)
f=root/'update-asset-provenance.json';rows=json.loads(f.read_text());rows=[r for r in rows if r['id']!=m['id']]+[dict(m,path=str(dst.relative_to(repo)),ledger_path=str(p.relative_to(repo)))];f.write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
print('Outro score seconds',seconds)
