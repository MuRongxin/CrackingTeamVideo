"""Verify the review's concrete requirements: original sources and no repeated selects."""
from pathlib import Path
import hashlib,json,subprocess

project=Path(__file__).resolve().parents[1];repo=project.parents[1]
rows=json.loads((project/'picture-revision-provenance.json').read_text())
ranges={};count=0
for item in rows:
    p=repo/item['path']
    assert hashlib.sha256(p.read_bytes()).hexdigest()==item['sha256'],p
    if 'selected_range_seconds' not in item:continue
    count+=1
    a,b=item['selected_range_seconds']; assert b>a
    source=item['derived_from'];ranges.setdefault(source,[]).append((a,b,p.name))
    original=repo/source
    assert hashlib.sha256(original.read_bytes()).hexdigest()==item['source_sha256'],source
    probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)],text=True))
    assert abs(float(probe['format']['duration'])-(b-a))<.08,(p,probe['format']['duration'],b-a)
    assert not any(s['codec_type']=='audio' for s in probe['streams']),p
for source,selections in ranges.items():
    for i,(a,b,name) in enumerate(sorted(selections)):
        if i:assert a>=sorted(selections)[i-1][1],(source,name,'overlapping source time')
pragmata=next(r for r in rows if r['path'].endswith('/pragmata-new.mp4'))
a,b=pragmata['selected_range_seconds']
for prior in json.loads((project/'pragmata-provenance.json').read_text()):
    if 'selected_range_seconds' in prior:
        x,y=prior['selected_range_seconds'];assert b<=x or a>=y,'PRAGMATA repeats Act 3'
assert count==16,count
assert all((project/'public/v38/revision'/n).exists() for n in ['voices38-nfo.png','denuvowo.png','v13-quote.png'])
print('PASS: 16 selects, original/public hashes, real durations, silent tracks, no overlapping source ranges; PRAGMATA differs from Act 3.')
