"""Rebuild reviewed, non-overlapping picture selects and their provenance."""
from pathlib import Path
import hashlib,json,shutil,subprocess

project=Path(__file__).resolve().parents[1]; repo=project.parents[1]
pub=project/'public/v38/revision';pub.mkdir(parents=True,exist_ok=True)
out=repo/'media/02_footage/derived'; manifest=[]
selections=[
 ('pragmata-new','V38_PRAGMATA_user_IGN_1080p.mp4',5.5,14.5,'A5-01'),
 ('routes','V38_REV_REQUIEM_official_1080p.mp4',154,160.6,'A6-01'),
 ('layer-game','V38_REV_REQUIEM_official_1080p.mp4',79,92,'A6-02'),
 ('requiem-day','V38_REV_REQUIEM_official_1080p.mp4',144,152,'A6-03'),
 ('crimson-day','V38_REV_CRIMSON_official_1080p.mp4',13.1,16.3,'A6-03'),
 ('reunion-day','V38_REV_REUNION_official_1080p.mp4',30,36,'A6-03'),
 ('system','V38_REV_REQUIEM_official_1080p.mp4',170,178.5,'A6-04'),
 ('oldschool','V38_REV_REQUIEM_official_1080p.mp4',116,127.2,'A6-05'),
 ('wukong-encounter','V38_REV_WUKONG_official_1080p.mp4',27.4,41.5,'A6-06'),
 ('wukong-denial','V38_REV_WUKONG_official_1080p.mp4',60.8,72.5,'A6-07'),
 ('wukong-compatibility','V38_REV_WUKONG_official_1080p.mp4',75,83.5,'A6-08 first 8.5s'),
 ('wukong-title','V38_REV_WUKONG_official_1080p.mp4',42.5,50.8,'A6-10 from 3.5s'),
 ('requiem-interval','V38_REV_REQUIEM_official_1080p.mp4',132.5,143.3,'A6-11 left'),
 ('wukong-interval','V38_REV_WUKONG_official_1080p.mp4',53.5,60.8,'A6-11 from 3.5s right'),
 ('wukong-play','V38_REV_WUKONG_official_1080p.mp4',13.4,21.5,'A6-14'),
 ('tiger-full','V38_TIGER_BILI_BV1Vr4y1o7i4_230-265_480p.mp4',16.5,30.3,'A6-09; original source 246.5–260.3s'),
]

def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
for name,source,start,end,usage in selections:
    original=repo/'media/02_footage'/source
    original_meta=json.loads(original.with_suffix('.mp4.meta.json').read_text())
    dst=out/f'V38_REV_{name}.mp4'
    subprocess.run(['ffmpeg','-v','error','-y','-ss',str(start),'-i',str(original),'-t',str(end-start),'-map','0:v:0','-an',
        '-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart',str(dst)],check=True)
    public=pub/f'{name}.mp4';shutil.copy2(dst,public)
    meta=dict(id=f'V38_REV_SELECT_{name}',kind='video',task='EX15',status='exported',title=name+' / 审片重剪',
        path=str(dst.relative_to(repo)),derived_from=str(original.relative_to(repo)),source_sha256=sha(original),
        selected_range_seconds=[start,end],edit_usage=usage,source_page=original_meta.get('source_page',''),
        author=original_meta.get('author',''),rights=original_meta.get('rights',''),sha256=sha(dst),bytes=dst.stat().st_size,
        note='原速、静音、不循环；作品展示，不表示某个破解版本实测。与本轮其他镜头及既有镜头避免重复。')
    dst.with_suffix('.mp4.meta.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2)+'\n')
    manifest.append({**meta,'ledger_path':meta['path'],'path':str(public.relative_to(repo))})
    print(name,round(end-start,3),flush=True)

for src,name in [
 ('media/03_stills/voices38_act6/denuvowo-original.png','denuvowo.png'),
 ('media/03_stills/voices38_act6/v13-quote-capture.png','v13-quote.png'),
 ('media/03_stills/source_images/V18_nfo.png','voices38-nfo.png'),
]:
    original=repo/src;dst=pub/name;shutil.copy2(original,dst)
    manifest.append(dict(path=str(dst.relative_to(repo)),derived_from=src,status='copied',sha256=sha(dst)))
(project/'picture-revision-provenance.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
