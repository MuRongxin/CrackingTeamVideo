"""Build a local media manifest and offline contact gallery from verified files."""
from pathlib import Path
from collections import Counter
from datetime import datetime,timezone
from urllib.parse import quote
from PIL import Image,ImageOps,ImageDraw
import csv,hashlib,html,json,re,subprocess

ROOT=Path(__file__).resolve().parents[2]
LEDGER=ROOT/'media/00_ledger'
tasks={}
for line in (ROOT/'document/媒体素材清单.md').read_text().splitlines():
    m=re.match(r'\| ((?:OP|FL|EX|AU|MG)\d{2})／P[012] \|',line)
    if m:
        for code in re.findall(r'\[([A-Z]+\d{2})\]',line):tasks.setdefault(code,[]).append(m[1])
extra={'NEW_FLT_DEMO':['FL22'],'NEW_MEGADEMO_POUET':['FL09'],'NEW_RAZOR_POUET':['EX01'],
       'NEW_HLM_INSTALLER':['EX07'],'NEW_COMMONS_CMI':['FL03'],'NEW_COMMONS_DATASETTE':['OP03']}
tasks.update(extra)

def probe(path):
    p=subprocess.run(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(path)],capture_output=True,text=True,check=True)
    return json.loads(p.stdout)

# Register successful platform-video downloads only after a real media file exists.
for path in (ROOT/'media/02_footage').glob('*.mp4'):
    if '.part.' in path.name:continue
    side=path.with_name(path.name+'.meta.json')
    if side.exists():continue
    info=path.with_suffix('.info.json')
    if not info.exists():continue
    d=json.loads(info.read_text());code=path.name.split('_')[0]
    p=probe(path)
    record=dict(id=path.stem,task=code,kind='video',title=d.get('title',''),
        path=str(path.relative_to(ROOT)),url=d.get('webpage_url'),source_page=d.get('webpage_url'),
        author=d.get('uploader',''),channel_url=d.get('channel_url',''),
        upload_date=d.get('upload_date',''),rights='上传者公开作品录像；作品、录制及音乐使用许可待确认',
        status='downloaded',bytes=path.stat().st_size,sha256=hashlib.sha256(path.read_bytes()).hexdigest(),
        retrieved_at=datetime.now(timezone.utc).isoformat(),probe=p)
    side.write_text(json.dumps(record,ensure_ascii=False,indent=2))

records=[]
for side in sorted((ROOT/'media').rglob('*.meta.json')):
    r=json.loads(side.read_text())
    if r.get('status')!='downloaded':continue
    path=ROOT/r['path']
    if not path.is_file():continue
    r['task']=r.get('task') or ','.join(tasks.get(r.get('source_code',''),[]))
    if r['kind']=='image':
        with Image.open(path) as im:
            r.update(width=im.width,height=im.height,frames=getattr(im,'n_frames',1))
    if r['kind'] in ['video','audio']:
        p=r.get('probe') or probe(path)
        r['duration']=float(p['format'].get('duration',0))
        vs=[x for x in p['streams'] if x['codec_type']=='video']
        if vs:r.update(width=vs[0]['width'],height=vs[0]['height'],fps=vs[0].get('avg_frame_rate',''))
        r['has_audio']=any(x['codec_type']=='audio' for x in p['streams'])
    records.append(r)

# PDF page exports are derivatives, and are never counted as newly acquired originals.
for path in sorted((ROOT/'media/03_stills/pdf_pages').glob('*.png')):
    name=path.name
    if name.startswith('FL02'):code,task='G08','FL02'
    elif name.startswith('FL19'):code,task='G11','FL19'
    else:code,task=re.search(r'(COURT_[A-Z0-9]+)',name).group(1),'OP08'
    meta=json.loads((ROOT/f'media/01_sources/{code}/metadata.json').read_text())
    with Image.open(path) as im:w,h=im.size
    records.append(dict(id=path.stem,task=task,kind='pdf_page_export',path=str(path.relative_to(ROOT)),
        source_page=meta['source_url'],author='见原始文档',rights='随原始 PDF；历史刊物使用条件待确认',
        width=w,height=h,bytes=path.stat().st_size,sha256=hashlib.sha256(path.read_bytes()).hexdigest(),
        derived_from=f'media/01_sources/{code}/original.pdf',status='exported'))

seen={}
for r in records:
    if r.get('sha256') in seen:r['duplicate_of']=seen[r['sha256']]
    else:seen[r.get('sha256')]=r['id']
    r['preview_status']='待人工选段／核对；下载完成不等于可直接公开使用'
(LEDGER/'assets.json').write_text(json.dumps(records,ensure_ascii=False,indent=2))
fields=['id','task','kind','title','path','width','height','fps','duration','has_audio','author','rights','license_url','source_page','retrieved_at','bytes','sha256','duplicate_of','derived_from','preview_status']
with (LEDGER/'素材登记.csv').open('w',encoding='utf-8-sig',newline='') as f:
    writer=csv.DictWriter(f,fieldnames=fields,extrasaction='ignore');writer.writeheader();writer.writerows(records)

sources=[]
for folder in sorted((ROOT/'media/01_sources').iterdir()):
    candidates=[folder/'original.pdf',folder/'original.html',folder/'original.txt',folder/'appdetails.json',folder/'commons_metadata.json']
    path=next((p for p in candidates if p.is_file()),None)
    if path is None:continue
    meta=json.loads((folder/'metadata.json').read_text()) if (folder/'metadata.json').exists() else {'id':folder.name}
    meta['local_path']=str(path.relative_to(ROOT));meta['bytes']=path.stat().st_size
    sources.append(meta)
(LEDGER/'source_inventory.json').write_text(json.dumps(sources,ensure_ascii=False,indent=2))

thumbs=ROOT/'media/07_selects/thumbnails';thumbs.mkdir(parents=True,exist_ok=True)
cards=[]
unique=[r for r in records if not r.get('duplicate_of')]
for i,r in enumerate(unique):
    path=ROOT/r['path'];thumb=thumbs/f'{i:03}.jpg'
    if r['kind'] in ['image','pdf_page_export']:
        with Image.open(path) as im:
            im=im.convert('RGB');im.thumbnail((480,300));im.save(thumb,quality=86)
    elif r['kind']=='video':
        t=min(20,max(1,r['duration']*.15))
        subprocess.run(['ffmpeg','-v','error','-y','-ss',str(t),'-i',str(path),'-frames:v','1','-vf','scale=480:-2',str(thumb)],check=True)
    url=quote('../'+r['path'].removeprefix('media/'),safe='/')
    pic=quote('../'+str(thumb.relative_to(ROOT/'media')),safe='/')
    visual=f'<img loading="lazy" src="{pic}" alt="{html.escape(r["id"])}">' if thumb.exists() else '<div class="audio">音频</div>'
    size=f'{r.get("width","")} × {r.get("height","")}' if r.get('width') else ''
    duration=f' · {r["duration"]:.1f} 秒' if r.get('duration') else ''
    cards.append(f'<article data-text="{html.escape(str(r))}"><a href="{url}">{visual}</a><h3>{html.escape(r["id"])}</h3><p>{html.escape(r.get("title") or r.get("task") or "史料图像")}</p><p>{size}{duration}</p><p>{html.escape(r.get("author",""))}</p><p>{html.escape(r.get("rights",""))}</p><a href="{url}">打开本地文件</a> · <a href="{html.escape(r.get("source_page", ""))}">来源</a></article>')
page='''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>那些传奇破解组 · 素材浏览</title><style>body{margin:24px;background:#f3f2ee;color:#242424;font:15px system-ui,sans-serif}h1{font-size:26px}input{padding:12px;width:min(620px,90%);font:inherit;margin:12px 0 24px}main{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px}article{background:white;padding:14px;border:1px solid #ddd;overflow-wrap:anywhere}img{width:100%;height:200px;object-fit:contain;background:#151515}h3{font-size:15px}p{line-height:1.5;color:#555}a{color:#155b8b}.audio{height:200px;display:grid;place-content:center;background:#ddd}</style><h1>那些传奇破解组 · 本地素材浏览</h1><p>这里只列实际取得的媒体文件及 PDF 页面导出，已合并字节完全一致的重复素材。公开使用前仍需核对署名、许可与上下文。</p><input id="q" placeholder="搜索编号、作品、作者或许可，例如 FL09、Rubicon、Public domain"><main>'''+''.join(cards)+'''</main><script>document.querySelector('#q').addEventListener('input',e=>{let q=e.target.value.toLowerCase();document.querySelectorAll('article').forEach(a=>a.hidden=!a.dataset.text.toLowerCase().includes(q))})</script></html>'''
(LEDGER/'素材浏览.html').write_text(page)
summary=dict(media_files=len(records),unique_media_files=len(unique),kinds=dict(Counter(r['kind'] for r in records)),
             source_snapshots=len(sources),pdf_originals=sum(x['local_path'].endswith('.pdf') for x in sources),
             total_bytes=sum(p.stat().st_size for p in (ROOT/'media').rglob('*') if p.is_file()))
(LEDGER/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2))
print(json.dumps(summary,ensure_ascii=False,indent=2))
