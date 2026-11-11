"""Authored, non-looping official-game inserts; preserve exact source time ranges."""
from pathlib import Path
import hashlib,json,requests,shutil,subprocess
root=Path(__file__).resolve().parents[1];repo=root.parents[1];pub=root/'public/v38/film';pub.mkdir(parents=True,exist_ok=True)
records=[]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save_meta(archive,source,title,extra):
 original=json.loads(source.with_suffix(source.suffix+'.meta.json').read_text())
 meta=dict(id='V38_FILM_'+archive.stem,task='EX15',kind='video' if archive.suffix=='.mp4' else 'image',title=title,
  path=str(archive.relative_to(repo)),derived_from=str(source.relative_to(repo)),source_page=original['source_page'],author=original['author'],
  rights=original['rights'],status='exported',bytes=archive.stat().st_size,sha256=sha(archive),source_sha256=sha(source),**extra)
 archive.with_suffix(archive.suffix+'.meta.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
 dst=pub/archive.name;shutil.copyfile(archive,dst)
 records.append(dict(path=str(dst.relative_to(repo)),ledger_path=meta['path'],derived_from=meta['derived_from'],source_page=meta['source_page'],status='exported',sha256=meta['sha256'],**extra))
for name,game,start,length in [('nfs','NFS',13.2,5.12),('requiem-establish','REQUIEM',6,3.3),('requiem-corridor','REQUIEM',15.7,2.8),('bond','007',34.5,9.2)]:
 source=repo/'media/02_footage'/f'V38_{game}_official_720p.mp4'
 archive=repo/'media/02_footage/derived'/f'{name}.mp4'
 subprocess.run(['ffmpeg','-v','error','-y','-ss',str(start),'-i',str(source),'-t',str(length),'-an','-c:v','libx264','-crf','16','-preset','medium','-pix_fmt','yuv420p','-threads','2','-movflags','+faststart',str(archive)],check=True)
 save_meta(archive,source,f'前三幕重剪官方片段：{game} / {start}—{start+length:.2f} 秒',dict(selected_range_seconds=[start,round(start+length,3)],note='原速静音节选，不循环；不表示某个破解版本运行实测'))
source=repo/'media/02_footage/V38_REQUIEM_official_720p.mp4';archive=repo/'media/03_stills/voices38_act3/requiem-corridor.png'
subprocess.run(['ffmpeg','-v','error','-y','-ss','16.5','-i',str(source),'-frames:v','1',str(archive)],check=True)
save_meta(archive,source,'生化危机：安魂曲官方片段 16.5 秒走廊帧',dict(source_time_seconds=16.5,note='官方片段原帧；静音片段结束后缓推覆盖，不重复动作'))
app=418370;raw=json.loads((repo/f'media/01_sources/STEAM_{app}/appdetails.json').read_text());data=raw[str(app)]['data'];url=data['screenshots'][0]['path_full']
archive=repo/'media/03_stills/official_games/EX15_418370_screenshot1.jpg'
if not archive.exists():
 r=requests.get(url,timeout=25);r.raise_for_status();archive.write_bytes(r.content)
meta=dict(id='EX15_418370_screenshot1',task='EX15',kind='image',title='Resident Evil 7 官方商店静帧',path=str(archive.relative_to(repo)),
 url=url,source_page=f'https://store.steampowered.com/app/{app}/',author='CAPCOM',rights='官方商店宣传图；公开使用条件待确认',status='downloaded',bytes=archive.stat().st_size,sha256=sha(archive))
archive.with_suffix('.jpg.meta.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
dst=pub/'re7.jpg';shutil.copyfile(archive,dst);records.append(dict(path=str(dst.relative_to(repo)),derived_from=str(archive.relative_to(repo)),source_page=meta['source_page'],status='copied',sha256=sha(dst)))
(root/'film-insert-provenance.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
print('Prepared four exact video cutaways and two official-image assets.')
