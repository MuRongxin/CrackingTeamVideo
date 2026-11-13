"""Derive the reviewed Tiger Vanguard action from a public Bilibili excerpt.
Only 230—265s of this 2023 demo recording is archived, not the full video.
"""
from pathlib import Path
import json,shutil,hashlib,subprocess,datetime
root=Path(__file__).resolve().parents[1];repo=root.parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,v):
 p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
page='https://www.bilibili.com/video/BV1Vr4y1o7i4/'
source=repo/'media/01_sources/V38_BILI_TIGER'
info_file=source/'video-info.json'
if not info_file.exists():info_file=Path('/tmp/v38-act6-tiger3.json')
info=json.loads(info_file.read_text())
archive=repo/'media/02_footage/V38_TIGER_BILI_BV1Vr4y1o7i4_230-265_480p.mp4'
if not archive.exists():shutil.copyfile(root/'.qa/tiger3-ending.mp4',archive)
rights='B站上传者 大胖頭；游戏作品 Game Science。公开视频节选仅用于内部剪辑研究，公开使用授权未取得。'
meta=dict(id='V38_BILI_TIGER',title=info['title'],url=page,source_page=page,author=info['uploader'],status='downloaded',retrieved_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),original_duration_seconds=info['duration'],selected_range_seconds=[230,265],source_code='V38_BILI_TIGER',rights=rights,note='2023年线下试玩实机；仅归档230—265秒视频轨，无音轨，非全片、非2026破解版本实测。')
write(source/'metadata.json',meta)
write(source/'video-info.json',{k:info.get(k) for k in ['id','title','uploader','uploader_id','upload_date','duration','description','webpage_url']})
(source/'readable.txt').write_text(f"{info['title']}\n上传者：{info['uploader']}\n原页：{page}\n归档230—265秒；实际入画253.5—260秒，6.5秒原速静音。2023年线下试玩，不是2026版本实测。\n未归档其他候选或不完整下载。\n")
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_streams','-of','json',str(archive)]))['streams'][0]
write(archive.with_suffix('.mp4.meta.json'),dict(meta,task='EX15',kind='video',path=str(archive.relative_to(repo)),width=probe['width'],height=probe['height'],actual_duration_seconds=float(probe['duration']),sha256=sha(archive),bytes=archive.stat().st_size,complete_source_video=False))
select=repo/'media/02_footage/derived/V38_A6_tiger.mp4'
subprocess.run(['ffmpeg','-v','error','-y','-ss','23.5','-i',str(archive),'-t','6.5','-map','0:v:0','-an','-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p','-threads','2','-movflags','+faststart',str(select)],check=True)
record=dict(id='V38_A6_TIGER',task='EX15',kind='video',title='第六幕 虎先锋攻击与玩家倒地 / 2023线下试玩',path=str(select.relative_to(repo)),derived_from=str(archive.relative_to(repo)),source_page=page,author=info['uploader'],rights=rights,status='exported',selected_range_seconds=[23.5,30],original_page_range_seconds=[253.5,260],source_sha256=sha(archive),sha256=sha(select),bytes=select.stat().st_size,note='原速、静音、不循环；保留原水印；2023试玩展示战斗动作，不表示特定破解版本实测。')
write(select.with_suffix('.mp4.meta.json'),record)
public=root/'public/v38/act6/tiger.mp4';shutil.copyfile(select,public)
write(root/'act6-bilibili-provenance.json',[dict(record,path=str(public.relative_to(repo)),ledger_path=str(select.relative_to(repo)))])
print('Archived 35-second partial source and 6.5-second original-speed action.')
