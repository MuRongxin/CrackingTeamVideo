"""Prepare act 4 from local evidence. Preserve other acts and tuned captions."""
from pathlib import Path
from PIL import Image
import argparse, hashlib, json, shutil, wave

root = Path(__file__).resolve().parents[1]
repo = root.parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--captions', action='store_true')
args = parser.parse_args()
records, voices = [], []

def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()

def write(p, value):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')

for n in range(104, 137):
    candidates = list((root.parent / 'videoVoices').glob(f'sentence_{n}_*.wav'))
    assert len(candidates) == 1, (n, candidates)
    src = candidates[0]
    dst = root / f'public/v38/vo/sentence-{n}.wav'
    shutil.copyfile(src, dst)
    with wave.open(str(src)) as w:
        duration = w.getnframes() / w.getframerate()
    voices.append(dict(id=n, file=f'v38/vo/sentence-{n}.wav', duration=duration,
                       original=src.name, source=str(src.relative_to(repo)), sha256=sha(dst)))
    records.append(dict(path=str(dst.relative_to(repo)), derived_from=str(src.relative_to(repo)),
                        status='copied', note='第四幕原始录音；保持原速、原样', sha256=sha(dst)))
write(root / 'src/act4/voice-manifest.json', voices)
old = json.loads((root / 'current-voice-provenance.json').read_text())
write(root / 'current-voice-provenance.json', sorted([v for v in old if not 104 <= v['id'] <= 136] + voices, key=lambda v:v['id']))

# Internal clause boundaries measured with ffmpeg silencedetect, -35 dB / .13 s.
# 109 and 126 have continuous speech: linguistic split points are initial alignment.
anchors = {104:[2.00,4.02],105:[.94,2.48],106:[.97],107:[2.16],108:[1.02],109:[1.65],
110:[1.20],111:[1.08],112:[1.70],113:[.94,2.50],114:[2.32],115:[1.88],116:[1.99,3.02],
117:[1.98],118:[.70],119:[2.06],120:[3.19,4.09],121:[1.28],122:[2.37],123:[1.35],
124:[1.84],125:[.62],126:[2.10,3.27],127:[1.34,2.61],128:[.78],129:[2.21],132:[1.88],
133:[2.78],135:[1.14],136:[2.10]}
caption_file = root / 'src/act4/captions.json'
if args.captions or not caption_file.exists():
    phrases = json.loads((root / 'src/act4/narration-source.json').read_text())
    captions = {}
    for v in voices:
        parts = phrases[str(v['id'])].split('|')
        edges = [.02] + anchors.get(v['id'], []) + [v['duration']-.025]
        assert len(edges) == len(parts)+1, v['id']
        rows = []
        for text,a,b in zip(parts,edges,edges[1:]):
            if len(text)>24:
                k = text.rfind(' ',9,23)
                if k < 9: k=len(text)//2
                text=text[:k].rstrip()+'\n'+text[k:].lstrip()
            rows.append(dict(text=text,startMs=round(a*1000),endMs=round(b*1000),timestampMs=None,confidence=None))
        captions[str(v['id'])]=rows
    write(caption_file,captions)

for name, filename, box in [
    ('nfs-header','V16_01.png',(0,0,574,294)),
    ('funding','V16_01.png',(16,734,563,784)),
    ('supporters','V15_01.png',(56,536,305,697)),
    ('sonic-header','V05_01.png',(0,0,574,293)),
    ('colors-header','V30_nfo.png',(0,0,640,322)),
]:
    src=repo/'media/03_stills/source_images'/filename
    archive=repo/'media/03_stills/voices38_act4'/f'{name}.png'
    dst=root/'public/v38/act4'/archive.name
    archive.parent.mkdir(parents=True,exist_ok=True);dst.parent.mkdir(parents=True,exist_ok=True)
    with Image.open(src) as im:im.crop(box).save(archive)
    shutil.copyfile(archive,dst)
    original=json.loads(src.with_suffix(src.suffix+'.meta.json').read_text())
    note='第四幕 NFO 原图局部：'+name
    meta=dict(id='V38_A4_'+name, task='EX15', kind='image',title=note,path=str(archive.relative_to(repo)),
              derived_from=str(src.relative_to(repo)),source_page=original.get('source_page',original.get('url')),
              author=original.get('author'),rights=original['rights'],status='exported',crop_pixels=list(box),
              source_sha256=sha(src),sha256=sha(archive),bytes=archive.stat().st_size)
    write(archive.with_suffix('.png.meta.json'),meta)
    records.append(dict(path=str(dst.relative_to(repo)),ledger_path=str(archive.relative_to(repo)),
                        derived_from=str(src.relative_to(repo)),status='exported',note=note,sha256=sha(dst),crop_pixels=list(box)))
write(root/'act4-asset-provenance.json',records)
print(f'Prepared act 4: {len(voices)} original recordings, 5 evidence crops; no network requests.')
