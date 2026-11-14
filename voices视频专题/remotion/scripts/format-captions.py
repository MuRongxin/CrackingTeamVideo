"""Display-only single-line subtitle cleanup; preserves cue times and spoken text."""
from pathlib import Path
import json,re
root=Path(__file__).resolve().parents[1]
for p in [root/'src/captions.json']+[root/f'src/act{i}/captions.json' for i in range(2,11)]:
 rows=json.loads(p.read_text())
 for group in rows.values():
  for c in group:
   t=re.sub(r'(?<=[A-Za-z0-9.,])\n(?=[A-Za-z0-9])',' ',c['text']).replace('\n','')
   c['text']=re.sub(r'[，。！？；：、,.!?;:]+([”’」』）)】\]]*)$',r'\1',t).strip()
 p.write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
print('All subtitle cues use one line, with no sentence-final punctuation.')
