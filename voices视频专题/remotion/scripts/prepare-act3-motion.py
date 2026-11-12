"""Small local-only selects for the Act 3 motion edit; retain every source."""
import hashlib, json, shutil, subprocess
from pathlib import Path
repo = Path(__file__).resolve().parents[3]
project = repo / 'voices视频专题/remotion'
rows = []
for name, original, start, duration, page in [
 ('nfs-road.png', 'media/02_footage/V38_NFS_official_720p.mp4', 2, None, 'https://store.steampowered.com/app/1328660/'),
 ('nfs-pursuit.mp4', 'media/02_footage/V38_NFS_official_720p.mp4', 24.6, 4.1, 'https://store.steampowered.com/app/1328660/'),
 ('bond.png', 'media/02_footage/V38_007_official_720p.mp4', 38.1, None, 'https://store.steampowered.com/app/3768760/'),
]:
 target = repo / ('media/02_footage/derived' if duration else 'media/03_stills/voices38_act3') / name
 target.parent.mkdir(parents=True, exist_ok=True)
 cmd = ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-ss', str(start), '-i', str(repo / original)]
 cmd += ['-t',str(duration),'-an','-c:v','libx264','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart'] if duration else ['-frames:v','1']
 subprocess.run(cmd + [str(target)], check=True)
 public = project / 'public/v38/act3/motion' / name
 public.parent.mkdir(parents=True, exist_ok=True)
 shutil.copy2(target, public)
 origin_meta = json.loads((repo / (original + '.meta.json')).read_text())
 row = {'id':'V38_MOTION_' + target.stem, 'task':'EX15', 'kind':'video' if duration else 'image', 'title':'第三幕动效重剪 / ' + name, 'author':origin_meta.get('author',''), 'rights':origin_meta.get('rights','沿用原片'), 'bytes':target.stat().st_size, 'source_sha256':origin_meta['sha256'], 'path':str(target.relative_to(repo)), 'public_path':str(public.relative_to(repo)), 'status':'exported','derived_from':original,'source_page':page,'selected_range_seconds':[start,start+duration] if duration else [start], 'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),'note':'本地已有官方素材的原速静音节选或原帧；只作游戏视觉，不代表破解实测。使用条件沿用原片。'}
 target.with_name(target.name+'.meta.json').write_text(json.dumps(row,ensure_ascii=False,indent=2)+'\n')
 rows.append(row)
still = repo / 'media/03_stills/official_games/EX15_1693980_screenshot2.jpg'
public = project / 'public/v38/act3/motion/dead-space-alt.jpg'
shutil.copy2(still, public)
rows.append({'path':str(still.relative_to(repo)), 'public_path':str(public.relative_to(repo)), 'derived_from':str(still.relative_to(repo)), 'status':'copied', 'sha256':hashlib.sha256(still.read_bytes()).hexdigest(), 'source_page':'https://store.steampowered.com/app/1693980/', 'note':'已有官方静帧的原样副本，不新增原件计数。'})
(project/'act3-motion-provenance.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
print('Prepared',len(rows),'local selects')
