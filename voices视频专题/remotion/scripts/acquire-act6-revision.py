"""Targeted source acquisition for the Act 5/6 picture revision.

No existing source files are overwritten. Downloaded video is the full official
1080p picture track, without audio; selects are made separately after inspection.
"""
from pathlib import Path
import concurrent.futures, datetime, hashlib, json, requests, subprocess

project = Path(__file__).resolve().parents[1]
repo = project.parents[1]
qa = project / '.qa/revision'

def acquire(item):
    name, app, index = item
    folder = repo / 'media/01_sources' / f'V38_REV_{name}'
    folder.mkdir(parents=True, exist_ok=True)
    cached = folder / 'appdetails.json'
    if cached.exists():
        raw = json.loads(cached.read_text())
    elif (qa / f'steam-{app}.json').exists():
        raw = json.loads((qa / f'steam-{app}.json').read_text())
    else:
        response = requests.get('https://store.steampowered.com/api/appdetails',params={'appids':app,'l':'english'},timeout=30)
        response.raise_for_status(); raw = response.json()
    data = raw[str(app)]['data']; movie = data['movies'][index]
    (folder / 'appdetails.json').write_text(json.dumps(raw, ensure_ascii=False, indent=2)+'\n')
    master = movie['hls_h264']
    r = requests.get(master, timeout=30); r.raise_for_status()
    (folder / 'master.m3u8').write_text(r.text)
    lines = r.text.splitlines()
    playlist = next(requests.compat.urljoin(master, lines[i+1]) for i, line in enumerate(lines) if 'RESOLUTION=1920x1080' in line)
    r = requests.get(playlist, timeout=30); r.raise_for_status()
    (folder / 'video-1080p.m3u8').write_text(r.text)
    dst = repo / 'media/02_footage' / f'V38_REV_{name}_official_1080p.mp4'
    if not dst.exists():
        subprocess.run(['ffmpeg','-v','error','-y','-i',playlist,'-map','0:v:0','-an','-c:v','copy','-movflags','+faststart',str(dst)],check=True)
    probe = json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(dst)],text=True))
    meta = dict(id=f'V38_REV_{name}', task='EX15', kind='video', title=data['name']+' / '+movie['name'],
        path=str(dst.relative_to(repo)), source_page=f'https://store.steampowered.com/app/{app}/',url=master,
        author=' / '.join(data.get('developers',[])+data.get('publishers',[])),
        retrieved_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),status='downloaded',
        rights='官方商店宣传片；公开使用条件待确认',acquisition='完整 1080p 视频轨，无音轨；不是完整音视频',
        bytes=dst.stat().st_size,sha256=hashlib.sha256(dst.read_bytes()).hexdigest(),probe=probe)
    dst.with_suffix('.mp4.meta.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
    (folder/'metadata.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
    print(name, movie['name'],probe['format']['duration'],dst.stat().st_size,flush=True)

if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        list(pool.map(acquire,[('WUKONG',2358720,0),('REQUIEM',3764200,1),('REUNION',2624870,0),('CRIMSON',3321460,1)]))
