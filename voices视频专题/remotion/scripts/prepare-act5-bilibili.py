"""Archive the inspected public Bilibili excerpt, then derive the chosen action.
Acquisition used yt-dlp public playback (no login), part 3, 550—578 seconds.
The archived file is a partial excerpt, not the complete 17m57s source video.
"""
from pathlib import Path
import json,shutil,hashlib,subprocess,datetime
root=Path(__file__).resolve().parents[1];repo=root.parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,v):
 p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
page='https://www.bilibili.com/video/BV1JU4y1P7RD/?p=3'
archive=repo/'media/02_footage/V38_MGSV_BILI_BV1JU4y1P7RD_p3_550-578_480p.mp4'
if not archive.exists():shutil.copyfile(root/'.qa/mgsv-fulton-review.mp4',archive)
source=repo/'media/01_sources/V38_BILI_MGSV'
info_file=source/'video-info.json'
if not info_file.exists():info_file=Path('/tmp/v38-act5-bili-training.json')
if not info_file.exists():raise FileNotFoundError('Missing archived video-info.json and original acquisition metadata')
info=json.loads(info_file.read_text())
metadata=dict(id='V38_BILI_MGSV',title=info['title'],url=page,source_page=page,author=info['uploader'],status='downloaded',
 retrieved_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),note='仅取得 P3 的 550—578 秒公开视频轨；非全片；无登录，无音轨。',
 original_duration_seconds=info['duration'],selected_range_seconds=[550,578],width=852,height=480,source_code='V38_BILI_MGSV',
 rights='B站上传者 鹅恶厄；游戏作品 KONAMI。页面标注未经作者授权禁止转载；仅作为内部剪辑研究节选，公开使用授权尚未取得。')
write(source/'metadata.json',metadata)
write(source/'video-info.json',{k:info.get(k) for k in ['id','title','uploader','uploader_id','upload_date','duration','description','webpage_url']})
(source/'readable.txt').write_text(f"{info['title']}\n上传者：{info['uploader']}\n原页：{page}\n\n片段 550—578 秒已取得；整部视频未下载。当前预览使用 553.4—559.9 秒。\n公开使用条件与下载成功分别记录。\n")
write(archive.with_suffix('.mp4.meta.json'),dict(metadata,task='EX15',kind='video',path=str(archive.relative_to(repo)),sha256=sha(archive),bytes=archive.stat().st_size,complete_source_video=False))
select=repo/'media/02_footage/derived/V38_A5_fulton.mp4'
subprocess.run(['ffmpeg','-v','error','-y','-ss','3.4','-i',str(archive),'-t','6.5','-an','-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-threads','2','-movflags','+faststart',str(select)],check=True)
meta=dict(id='V38_A5_FULTON',task='EX15',kind='video',title='第五幕 富尔顿回收实际动作 / B站 P3 553.4—559.9秒',path=str(select.relative_to(repo)),derived_from=str(archive.relative_to(repo)),source_page=page,author=info['uploader'],rights=metadata['rights'],status='exported',selected_range_seconds=[3.4,9.9],original_page_range_seconds=[553.4,559.9],source_sha256=sha(archive),sha256=sha(select),bytes=select.stat().st_size,note='原速、静音、不循环；展示游戏机制，不表示 voices38 版本实测。')
write(select.with_suffix('.mp4.meta.json'),meta)
dst=root/'public/v38/act5/fulton.mp4';shutil.copyfile(select,dst)
write(root/'act5-bilibili-provenance.json',[dict(meta,path=str(dst.relative_to(repo)),ledger_path=str(select.relative_to(repo)))])
print('Archived 28-second partial source and selected 6.5-second action; 480p, original speed.')
