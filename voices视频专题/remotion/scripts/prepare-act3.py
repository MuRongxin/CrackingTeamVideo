"""Prepare only act 3. Preserve originals and previously tuned act 1/2 captions."""
from pathlib import Path
from PIL import Image
import argparse, hashlib, json, re, shutil, subprocess, wave

root = Path(__file__).resolve().parents[1]
repo = root.parents[1]
pub = root / 'public/v38/act3'
parser = argparse.ArgumentParser()
parser.add_argument('--captions', action='store_true', help='Regenerate act 3 initial caption alignment')
args = parser.parse_args()
records = []
voices = []

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')

for n in range(54, 104):
    candidates = list((root.parent / 'videoVoices').glob(f'sentence_{n:02}_*.wav'))
    assert len(candidates) == 1, (n, candidates)
    src = candidates[0]
    dst = root / f'public/v38/vo/sentence-{n:02}.wav'
    shutil.copyfile(src, dst)
    with wave.open(str(src)) as w:
        duration = w.getnframes() / w.getframerate()
    voices.append(dict(id=n, file=f'v38/vo/sentence-{n:02}.wav', duration=duration,
                       original=src.name, source=str(src.relative_to(repo)), sha256=sha(dst)))
    records.append(dict(path=str(dst.relative_to(repo)), derived_from=str(src.relative_to(repo)),
                        status='copied', note='第三幕原始录音；保持原速、原样', sha256=sha(dst)))
write(root / 'src/act3/voice-manifest.json', voices)
old = json.loads((root / 'current-voice-provenance.json').read_text())
write(root / 'current-voice-provenance.json', sorted([v for v in old if not 54 <= v['id'] <= 103] + voices, key=lambda v: v['id']))

# Pause anchors measured with ffmpeg silencedetect (-35 dB / 0.13 s).
# Other short clips use manuscript-weighted initial alignment, editable in JSON.
anchors = {54:[.02,2.81,5.37],57:[.02,.96,3.43,4.55,6.46],61:[.02,2.50,4.66],
           63:[.02,1.31,2.98,4.13,5.74],64:[.02,1.81,3.30,4.37],
           70:[.02,2.29,3.81,6.50,7.59],73:[.02,2.41,5.23,5.95],
           80:[.02,1.46,3.57],89:[.02,3.07,4.58,6.66],
           91:[.02,1.78,3.25,4.59],93:[.02,1.86,3.21,4.63,5.66],
           95:[.02,.82,1.9,4.82,5.51],97:[.02,2.89,4.98,6.01],
           98:[.02,1.25,3.50,5.35],103:[.02,1.81,3.56,5.80]}
caption_file = root / 'src/act3/captions.json'
if args.captions or not caption_file.exists():
    phrases = json.loads((root / 'src/act3/narration-source.json').read_text())
    captions = {}
    for v in voices:
        parts = phrases[str(v['id'])].split('|')
        weights = [max(1, len(re.sub(r'[A-Za-z0-9.]+', '音音', p).replace(' ', ''))) for p in parts]
        edges = anchors.get(v['id'])
        if edges is None:
            edges = [.02]
            for w in weights:
                edges.append(edges[-1] + (v['duration'] - .06) * w / sum(weights))
        assert len(edges) == len(parts) + 1
        rows = []
        for text, a, b in zip(parts, edges, edges[1:]):
            if len(text) > 23:
                split = text.rfind(' ', 7, 22)
                if split < 7:
                    split = len(text) // 2
                text = text[:split].rstrip() + '\n' + text[split:].lstrip()
            rows.append(dict(text=text, startMs=round(a*1000), endMs=round(min(b, v['duration'])*1000), timestampMs=None, confidence=None))
        captions[str(v['id'])] = rows
    write(caption_file, captions)

def register(archive, dst, source, note, extra):
    original = json.loads(source.with_suffix(source.suffix + '.meta.json').read_text())
    shutil.copyfile(archive, dst)
    meta = dict(id='V38_A3_' + archive.stem, task='EX15', kind='video' if archive.suffix=='.mp4' else 'image',
                title=note, path=str(archive.relative_to(repo)), derived_from=str(source.relative_to(repo)),
                source_page=original.get('source_page', original.get('url')), author=original.get('author'),
                rights=original['rights'], status='exported', source_sha256=sha(source), bytes=archive.stat().st_size,
                sha256=sha(archive), **extra)
    write(archive.with_suffix(archive.suffix+'.meta.json'), meta)
    records.append(dict(path=str(dst.relative_to(repo)), ledger_path=str(archive.relative_to(repo)),
                        derived_from=str(source.relative_to(repo)), status='exported', note=note,
                        sha256=sha(dst), **extra))

# Exact pixel crops; no rewritten or generated source imagery.
for name, filename, box in [
    ('voices-header','V06_nfo.png',(0,0,640,211)),
    ('proper-fields','V06_nfo.png',(56,222,624,314)),
    ('proper-notes','V06_nfo.png',(56,873,624,977)),
    ('reloaded-os-header','P05_01.png',(0,0,640,486)),
    ('reloaded-os-note','P05_01.png',(8,548,632,604)),
]:
    source=repo/'media/03_stills/source_images'/filename
    archive=repo/'media/03_stills/voices38_act3'/f'{name}.png'
    dst=pub/'nfo'/archive.name
    archive.parent.mkdir(parents=True,exist_ok=True);dst.parent.mkdir(parents=True,exist_ok=True)
    with Image.open(source) as im:im.crop(box).save(archive)
    register(archive,dst,source,'第三幕 NFO 原图局部：'+name,{'crop_pixels':list(box)})

source=repo/'media/02_footage/EX15_STEAM_1693980_trailer1_720p.mp4'
for name,start,duration in [('corridor',6.3,1.8),('combat',14.3,3.7),('explore',20.4,3.5)]:
    archive=repo/'media/02_footage/derived'/f'V38_A3_{name}.mp4'
    dst=pub/'footage'/f'{name}.mp4';dst.parent.mkdir(parents=True,exist_ok=True)
    if not archive.exists():
        subprocess.run(['ffmpeg','-v','error','-y','-ss',str(start),'-i',str(source),'-t',str(duration),
                        '-an','-c:v','libx264','-preset','medium','-crf','16','-pix_fmt','yuv420p',
                        '-threads','2','-movflags','+faststart',str(archive)],check=True)
    register(archive,dst,source,f'第三幕《死亡空间》官方片段 {start}—{start+duration:.1f} 秒（静音）',
             {'selected_range_seconds':[start,round(start+duration,3)]})
source=repo/'media/03_stills/official_games/EX15_1693980_screenshot1.jpg'
dst=pub/'dead-space.jpg';shutil.copyfile(source,dst)
records.append(dict(path=str(dst.relative_to(repo)),derived_from=str(source.relative_to(repo)),status='copied',
                    note='死亡空间官方静帧；影片片段外缓推使用',sha256=sha(dst)))
subprocess.run(['python3',str(root/'scripts/make-act3-sfx.py')],check=True)
for name in ['nitro','key','lock','pew']:
    dst=root/'public/v38/sfx'/f'{name}.wav'
    records.append(dict(path=str(dst.relative_to(repo)),derived_from=str((root/'scripts/make-act3-sfx.py').relative_to(repo)),
                        status='generated',note='原创合成轻音效；无音乐与语音采样',sha256=sha(dst)))
write(root/'act3-asset-provenance.json',records)
print(f'Prepared act 3: {len(voices)} original recordings, {len(records)-len(voices)} visual assets.')
