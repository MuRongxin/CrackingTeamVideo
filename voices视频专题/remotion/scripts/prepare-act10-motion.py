"""Fresh, nonoverlapping selections for the epilogue; never re-download sources."""
from pathlib import Path
import hashlib, json, shutil, subprocess
root = Path(__file__).resolve().parents[1]
repo = root.parents[1]
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
selections = [
    ('ownership-wukong', 'V38_REV_WUKONG_official_1080p.mp4', 21.6, 25.2),
    ('signature-dead', 'V38_A9_DEAD_official_1080p.mp4', 38.5, 44),
    ('thanks-wukong', 'V38_REV_WUKONG_official_1080p.mp4', 83.6, 86.5),
    ('thanks-nfs', 'V38_NFS_official_720p.mp4', 2.7, 5.65),
]
records = []
for name, filename, lo, hi in selections:
    src = repo / 'media/02_footage' / filename
    # Reject reuse of any previously registered interval, including alternate takes.
    for manifest in root.glob('*provenance.json'):
        if manifest.name == 'act10-motion-provenance.json':
            continue
        for r in json.loads(manifest.read_text()):
            span = r.get('selected_range_seconds')
            if r.get('derived_from') == str(src.relative_to(repo)) and span and len(span) == 2:
                a, b = span
                assert min(b, hi) <= max(a, lo), (manifest, name, span)
    meta = json.loads(src.with_suffix('.mp4.meta.json').read_text())
    dst = repo / f'media/02_footage/derived/V38_A10M_{name}.mp4'
    old_meta = dst.with_suffix('.mp4.meta.json')
    previous = json.loads(old_meta.read_text()) if old_meta.exists() else {}
    source_info = json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-of','json',str(src)]))
    assert float(source_info['format']['duration']) >= hi, (filename, hi)
    if not dst.exists() or previous.get('selected_range_seconds') != [lo, hi]:
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(lo), '-i', str(src), '-t', str(hi-lo), '-an', '-c:v', 'libx264', '-crf', '18', '-preset', 'fast', '-threads', '2', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(dst)], check=True)
    info = json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-of','json',str(dst)]))
    assert float(info['format']['duration']) >= hi-lo-.04, name
    record = dict(id='V38_A10M_'+name, task='EX15', kind='video', title='尾声动效修订 / '+name,
        path=str(dst.relative_to(repo)), derived_from=str(src.relative_to(repo)), source_sha256=sha(src),
        selected_range_seconds=[lo, hi], source_page=meta.get('source_page', meta.get('source_url')),
        author=meta['author'], rights=meta['rights'], status='exported', sha256=sha(dst), bytes=dst.stat().st_size,
        note='原速静音、不循环；与既有同源节选不重叠。官方作品画面，不是破解实测。')
    dst.with_suffix('.mp4.meta.json').write_text(json.dumps(record,ensure_ascii=False,indent=2)+'\n')
    public = root / f'public/v38/act10-motion/{name}.mp4'
    public.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(dst, public)
    records.append(dict(record, path=str(public.relative_to(repo)), ledger_path=str(dst.relative_to(repo))))
(root/'act10-motion-provenance.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
print('Prepared 4 fresh unlooped selections, no previous source interval overlap.')
