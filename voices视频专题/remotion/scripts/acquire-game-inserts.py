"""Acquire just three official gameplay/trailer video tracks for act 3 cutaways."""
from pathlib import Path
import concurrent.futures,datetime,hashlib,json,re,requests,subprocess
root=Path(__file__).resolve().parents[1];repo=root.parents[1]
def acquire(item):
 name,app,index=item;folder=repo/'media/01_sources'/f'STEAM_{app}'
 raw=json.loads((folder/'appdetails.json').read_text());data=raw.get(str(app),raw)['data'];movie=data['movies'][index]
 master=movie['hls_h264'];r=requests.get(master,timeout=25);r.raise_for_status();(folder/f'film_insert_{index}_master.m3u8').write_text(r.text)
 lines=r.text.splitlines();video=None
 for i,line in enumerate(lines):
  if 'RESOLUTION=1280x720' in line:video=requests.compat.urljoin(master,lines[i+1]);break
 if not video:raise ValueError('No 720p source for '+name)
 playlist=requests.get(video,timeout=25);playlist.raise_for_status();(folder/f'film_insert_{index}_720p.m3u8').write_text(playlist.text)
 dst=repo/'media/02_footage'/f'V38_{name}_official_720p.mp4'
 if not dst.exists():subprocess.run(['ffmpeg','-v','error','-y','-i',video,'-an','-c:v','copy','-movflags','+faststart',str(dst)],check=True)
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(dst)],text=True))
 meta=dict(id=f'V38_{name}_official',task='EX15',kind='video',title=data['name']+' / '+movie['name'],path=str(dst.relative_to(repo)),
  source_page=f'https://store.steampowered.com/app/{app}/',url=master,selected_video_playlist=video,author=' / '.join(data.get('developers',[])+data.get('publishers',[])),
  retrieved_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),status='downloaded',rights='官方商店宣传片；公开视频使用条件待确认',
  acquisition='官方 HLS 的完整 720p 视频轨，无音轨；无重新编码，不算带原声的完整音视频',bytes=dst.stat().st_size,sha256=hashlib.sha256(dst.read_bytes()).hexdigest(),probe=probe)
 dst.with_suffix('.mp4.meta.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
 print(name,movie['name'],probe['format']['duration'],dst.stat().st_size,flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:list(pool.map(acquire,[('NFS',1328660,0),('REQUIEM',3764200,0),('007',3768760,7)]))
