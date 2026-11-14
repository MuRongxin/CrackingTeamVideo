"""Register the actual 1080p source segment and replace only A6-09's picture."""
from pathlib import Path
import hashlib,json,shutil,subprocess,datetime
root=Path(__file__).resolve().parents[1];repo=root.parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
write=lambda p,v:p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
raw=repo/'media/02_footage/V38_TIGER_ONGBAL_0-45_1080p.webm'
if not raw.exists():shutil.copyfile(root/'.qa/tiger-hd-recovered.webm',raw)
snap=repo/'media/01_sources/V38_TIGER_ONGBAL'
info=json.loads((snap/'metadata.json').read_text()) if (snap/'metadata.json').exists() else next(json.loads(l) for l in (root/'.qa/tiger-new-search.jsonl').read_text().splitlines() if json.loads(l)['id']=='znuj3QZbf-k')
page='https://www.youtube.com/watch?v=znuj3QZbf-k'
source=dict(id='V38_TIGER_ONGBAL',kind='video',task='EX15',title=info['title'],path=str(raw.relative_to(repo)),source_page=page,url=page,author=info['uploader'],status='downloaded',width=1920,height=1080,fps=60,selected_range_seconds=[0,45],actual_duration_seconds=44.999,original_duration_seconds=info['duration'],complete_source_video=False,retrieved_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),sha256=sha(raw),bytes=raw.stat().st_size,rights='上传者 ONGBAL；游戏作品 Game Science。公开画面节选，公开剪辑使用条件未另行确认。',note='仅保留原片0—45秒有效视频轨，无音轨；不是125秒全片。下载中断后由有效WebM数据封装，已完整解码所选范围；非某破解版本实测。')
write(raw.with_suffix('.webm.meta.json'),source)
snap=repo/'media/01_sources/V38_TIGER_ONGBAL';snap.mkdir(parents=True,exist_ok=True)
write(snap/'metadata.json',{k:info.get(k) for k in ['id','title','uploader','channel','upload_date','duration','webpage_url','description','url','status','note']})
dst=repo/'media/02_footage/derived/V38_REVIEW_tiger-hd.mp4'
subprocess.run(['ffmpeg','-v','error','-y','-ss','18.8','-i',str(raw),'-t','14.8','-an','-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',str(dst)],check=True)
public=root/'public/v38/revision/tiger-hd.mp4';shutil.copyfile(dst,public)
m=dict(source,id='V38_REVIEW_tiger_hd',title='虎先锋战斗 / 真1080p审片替换',status='exported',path=str(dst.relative_to(repo)),derived_from=str(raw.relative_to(repo)),source_sha256=sha(raw),selected_range_seconds=[18.8,33.6],sha256=sha(dst),bytes=dst.stat().st_size,edit_usage='A6-09 Dying Simulator',note='原速14.8秒，无音轨，不循环，无额外放大；源片实机HUD保留，所选画面没有B站水印。')
write(dst.with_suffix('.mp4.meta.json'),m)
p=root/'picture-revision-provenance.json';rows=json.loads(p.read_text());rows=[r for r in rows if not r['path'].endswith(('/tiger-full.mp4','/tiger-hd.mp4'))];rows.append(dict(m,ledger_path=m['path'],path=str(public.relative_to(repo))));write(p,rows)
print('Registered actual 1920x1080/60 source segment; 14.8s A6-09 replacement.')
