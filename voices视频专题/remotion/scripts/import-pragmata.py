"""Import only the user-provided PRAGMATA source and the two selected inserts."""
import hashlib
import json
import shutil
import subprocess
from pathlib import Path

repo = Path(__file__).resolve().parents[3]
project = repo / 'voices视频专题/remotion'
user_source = Path('/home/lrxin/文档/IGG/Lolicon/【IGN】《PRAGMATA》再度延期预告 ｜ Capcom Showcase.mp4')
archive = repo / 'media/02_footage/V38_PRAGMATA_user_IGN_1080p.mp4'
if not archive.exists():
    shutil.copy2(user_source, archive)
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
if user_source.exists():
    assert sha(archive) == sha(user_source), 'Archived source differs from the user file'
common = {
    'task': 'EX15', 'kind': 'video', 'author': 'CAPCOM（作品）；本地文件名标注 IGN 转载',
    'source_page': '', 'rights': '用户提供的宣传片转载文件；未附原网页地址，公开使用条件待确认',
    'status': 'exported',
}
original = dict(common, id='V38_PRAGMATA_USER_IGN', title=user_source.stem,
    path=str(archive.relative_to(repo)), derived_from=str(user_source), user_supplied_path=str(user_source),
    bytes=archive.stat().st_size, sha256=sha(archive), note='用户指定素材的原样归档副本；原目录不移动、不修改。')
archive.with_name(archive.name + '.meta.json').write_text(json.dumps(original, ensure_ascii=False, indent=2) + '\n')
rows = [original]
for name, start, end, description in [
    ('pragmata-character.mp4', 21.0, 23.4, '角色近景，避开延期告示正文'),
    ('pragmata-action.mp4', 43.1, 50.0, '实机动作及角色收束，避开黑场与片尾延期说明'),
]:
    dest = repo / 'media/02_footage/derived' / name
    subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-ss', str(start), '-i', str(archive),
        '-t', str(end-start), '-map', '0:v:0', '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '19',
        '-pix_fmt', 'yuv420p', '-map_metadata', '-1', '-movflags', '+faststart', str(dest)], check=True)
    public = project / 'public/v38/act3/motion' / name
    shutil.copy2(dest, public)
    row = dict(common, id='V38_MOTION_' + dest.stem, title='识质存在 / ' + description,
        path=str(dest.relative_to(repo)), public_path=str(public.relative_to(repo)),
        derived_from=str(archive.relative_to(repo)), source_sha256=sha(archive),
        selected_range_seconds=[start, end], bytes=dest.stat().st_size, sha256=sha(dest),
        note='原速静音节选，不循环、不裁改画面；用于作品展示，不作为保护技术或破解实测证据。')
    dest.with_name(dest.name + '.meta.json').write_text(json.dumps(row, ensure_ascii=False, indent=2) + '\n')
    rows.append(row)
(project / 'pragmata-provenance.json').write_text(json.dumps(rows, ensure_ascii=False, indent=2) + '\n')
print('Imported source and 2 silent clips (2.4 s + 6.9 s).')
