"""Original quiet accents; no music, samples, or substitute narration."""
from pathlib import Path
import math, random, struct, wave
out=Path(__file__).resolve().parents[1]/'public/v38/sfx'
sr=48000
for name,duration in [('nitro',.65),('key',.2),('lock',.25),('pew',.12)]:
    rng=random.Random(38);frames=[];low=0;phase=0
    for n in range(round(sr*duration)):
        t=n/sr;p=t/duration;noise=rng.uniform(-1,1);low=.8*low+.2*noise
        if name=='nitro':
            phase+=2*math.pi*(150+1100*p*p)/sr
            v=(low*.4+math.sin(phase)*.1)*math.sin(math.pi*p)**.8
        elif name=='key':v=(math.sin(2*math.pi*2350*t)+.45*math.sin(2*math.pi*3120*t))*.16*math.exp(-p*9)*min(1,t/.002)
        elif name=='lock':v=(low*.5+math.sin(2*math.pi*170*t)*.13)*math.exp(-p*14)*min(1,t/.002)
        else:
            phase+=2*math.pi*(1200*math.exp(-4*p)+220)/sr
            v=math.sin(phase)*.20*math.sin(math.pi*p)*math.exp(-p*2)
        frames.append(struct.pack('<h',round(v*32767)))
    with wave.open(str(out/f'{name}.wav'),'wb') as w:
        w.setparams((1,2,sr,0,'NONE','not compressed'));w.writeframes(b''.join(frames))
print('Created four original act 3 sound accents.')
