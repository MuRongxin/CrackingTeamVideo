"""Original synthesized transition accents; no music or voice replacement."""
import math,random,struct,wave
from pathlib import Path
out=Path(__file__).resolve().parents[1]/'public/v38/sfx';sr=48000
for name,duration in [('rewind',1.4),('crt',.45),('beep',.12),('notify',.22),('voice-break',.16)]:
 rng=random.Random(38);samples=[];low=0;phase=0
 for n in range(round(sr*duration)):
  t=n/sr;p=t/duration;noise=rng.uniform(-1,1);low=low*.91+noise*.09
  if name=='rewind':v=(low*.5+math.sin(2*math.pi*(100*t+360*t*t))*.08)*math.sin(math.pi*p)**.6
  elif name=='crt':v=(math.sin(2*math.pi*60*t)*.12+low*.1)*math.exp(-6*p)
  elif name=='beep':v=math.sin(2*math.pi*1100*t)*.2*math.sin(math.pi*p)**.4
  elif name=='stretch':v=low*.35*math.sin(math.pi*p)**.7
  elif name=='notify':v=(math.sin(2*math.pi*920*t)+math.sin(2*math.pi*1380*t)*.3)*.15*math.exp(-5*p)
  elif name=='voice-break':
   phase+=2*math.pi*(180 if p<.4 else 510 if p<.65 else 230)/sr
   v=(math.sin(phase)+.3*math.sin(phase*2))*math.sin(math.pi*p)*.22
  else:v=(low*.5+noise*.15)*math.sin(math.pi*p)**.8*(.65+.35*math.sin(t*50))
  samples.append(struct.pack('<h',int(max(-1,min(1,v))*32767)))
 with wave.open(str(out/f'{name}.wav'),'wb') as w:w.setparams((1,2,sr,0,'NONE','not compressed'));w.writeframes(b''.join(samples))
