# Original, deterministic foley-like accents. No music or musical bed.
import math,random,struct,wave
from pathlib import Path
out=Path(__file__).resolve().parents[1]/'public/v38/sfx';out.mkdir(exist_ok=True)
sr=48000
for name,duration in [('paper',.48),('stamp',.16),('click',.065),('sweep',.24),('pencil',.3)]:
 rng=random.Random(38);samples=[];low=0
 for n in range(round(sr*duration)):
  t=n/sr;p=t/duration;noise=rng.uniform(-1,1);low=.86*low+.14*noise
  if name=='paper':v=(noise*.17+low*.5)*(math.sin(math.pi*p)**1.8)*(.65+.35*math.sin(t*115))
  elif name=='stamp':v=(low*.8+math.sin(2*math.pi*93*t)*.35)*math.exp(-p*14)*min(1,t/.002)
  elif name=='click':v=(noise*.4+math.sin(2*math.pi*1900*t)*.15)*math.exp(-p*13)*min(1,t/.001)
  elif name=='pencil':v=noise*.2*math.sin(math.pi*p)**.5*(.6+.4*math.sin(t*350))
  else:v=low*.7*math.sin(math.pi*p)**2
  samples.append(struct.pack('<h',int(max(-1,min(1,v))*32767)))
 with wave.open(str(out/f'{name}.wav'),'wb') as w:w.setparams((1,2,sr,0,'NONE','not compressed'));w.writeframes(b''.join(samples))
