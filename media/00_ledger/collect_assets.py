"""Acquire stills from saved source pages and official Steam app metadata."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urljoin, urlsplit
from datetime import datetime, timezone
from io import BytesIO
import hashlib
import json
import re
import requests
from bs4 import BeautifulSoup
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
HEADERS = {'User-Agent': 'CrackingTeamVideo/0.1 (https://github.com/MuRongxin/CrackingTeamVideo; documentary media research)'}

def acquire(job):
    rec = dict(job, retrieved_at=datetime.now(timezone.utc).isoformat(),status='failed')
    out = ROOT / job['path']
    out.parent.mkdir(parents=True,exist_ok=True)
    try:
        r = requests.get(job['url'],headers=HEADERS,timeout=(12,35),stream=True)
        rec.update(http_status=r.status_code,final_url=r.url)
        r.raise_for_status()
        chunks,size=[],0
        for c in r.iter_content(65536):
            size+=len(c)
            if size>job.get('limit',40*1024*1024):raise ValueError('size limit')
            chunks.append(c)
        raw=b''.join(chunks)
        if b'<html' in raw[:1000].lower() or b'<!doctype' in raw[:1000].lower():
            raise ValueError('HTML returned instead of media')
        if job.get('kind')=='image':
            with Image.open(BytesIO(raw)) as im:
                rec.update(width=im.width,height=im.height,format=im.format)
                im.verify()
        out.write_bytes(raw)
        rec.update(bytes=len(raw),sha256=hashlib.sha256(raw).hexdigest(),status='downloaded')
    except Exception as e:rec['error']=str(e)[:350]
    out.with_name(out.name+'.meta.json').write_text(json.dumps(rec,ensure_ascii=False,indent=2))
    print(job['id'],rec['status'],rec.get('bytes',rec.get('error','')),flush=True)
    return rec

def source_images():
    jobs=[]
    for folder in (ROOT/'media/01_sources').iterdir():
        if not(folder/'original.html').exists():continue
        meta=json.loads((folder/'metadata.json').read_text())
        soup=BeautifulSoup((folder/'original.html').read_bytes(),'html.parser')
        imgs=[]
        for img in soup.select('img[src]'):
            url=urljoin(meta['final_url'],img['src'])
            if '/nfo-a/' in url or '/files/screenshots/' in url or (folder.name in ['G41','G42'] and 'files.hiddenpalace.org' in url):
                imgs.append(url)
        if folder.name.startswith('NEW_COMMONS_'):
            a=soup.select_one('.fullImageLink a')
            if a:imgs.append(a['href'])
        for i,url in enumerate(dict.fromkeys(imgs),1):
            ext=Path(urlsplit(url).path).suffix.lower()
            if ext not in ['.png','.jpg','.jpeg','.gif','.webp']:continue
            rights='待确认；作品／NFO／游戏图像，仅作为研究与剪辑候选'
            author='见来源页，待核署名'
            if folder.name.startswith('NEW_COMMONS_'):
                licenses=[x.get_text(' ',strip=True) for x in soup.select('.licensetpl_short')]
                rights=' / '.join(dict.fromkeys(licenses)) or '详见 Commons 文件说明页，待核'
                # Preserve the entire license page alongside the image; do not infer from category.
                author='Commons 文件说明页列示作者；署名前对照原页'
            jobs.append(dict(id=f'{folder.name}_img{i:02}',kind='image',url=url,
                path=f'media/03_stills/source_images/{folder.name}_{i:02}{ext}',
                source_page=meta['final_url'],source_code=folder.name,rights=rights,author=author))
        pre=soup.select('pre')
        if pre:
            text='\n\n'.join(x.get_text() for x in pre)
            if len(text)>180:
                out=folder/'extracted_pre.txt';out.write_text(text)
    return jobs

def steam_assets():
    games=[(524220,'OP01'),(34330,'FL21'),(1196590,'EX13'),(70,'EX04'),
           (33230,'EX02'),(1245620,'EX12'),(1687950,'EX16'),(1086940,'EX14'),
           (1237320,'EX15'),(13570,'EX08'),(12110,'EX03'),(990080,'EX13')]
    def app(item):
        appid,task=item
        page=f'https://store.steampowered.com/app/{appid}/'
        api=f'https://store.steampowered.com/api/appdetails?appids={appid}&l=english'
        folder=ROOT/f'media/01_sources/STEAM_{appid}'
        folder.mkdir(parents=True,exist_ok=True)
        try:
            r=requests.get(api,headers=HEADERS,timeout=30);r.raise_for_status()
            result=r.json()[str(appid)]
            if not result.get('success'):raise ValueError('Steam app metadata unavailable')
            data=result['data'];(folder/'appdetails.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
            (folder/'metadata.json').write_text(json.dumps(dict(id=f'STEAM_{appid}',source_url=api,final_url=api,
                title=data['name'],status='downloaded_unreviewed',task=task,retrieved_at=datetime.now(timezone.utc).isoformat()),ensure_ascii=False,indent=2))
            images=[('header',data.get('header_image'))]+[(f'screenshot{i+1}',x['path_full']) for i,x in enumerate(data.get('screenshots',[])[:2])]
            return [dict(id=f'{task}_STEAM_{appid}_{label}',task=task,kind='image',url=url,
                     path=f'media/03_stills/official_games/{task}_{appid}_{label}.jpg',
                     source_page=page,title=data['name'],author=', '.join(data.get('developers',[])),
                     rights='官方商店宣传素材；公开视频使用条件待确认') for label,url in images if url]
        except Exception as e:
            (folder/'error.txt').write_text(str(e));return []
    with ThreadPoolExecutor(max_workers=4) as pool:
        return [j for group in pool.map(app,games) for j in group]

if __name__=='__main__':
    jobs=source_images()+steam_assets()
    with ThreadPoolExecutor(max_workers=6) as pool:list(pool.map(acquire,jobs))
