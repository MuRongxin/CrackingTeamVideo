"""Targeted voices38 archive collection; reuse valid local files, never fetch binaries."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlsplit,urljoin
from datetime import datetime,timezone
import importlib.util,json,re,requests
from bs4 import BeautifulSoup
BASE=Path(__file__).resolve().parent
ROOT=BASE.parents[1]
def module(name):
    spec=importlib.util.spec_from_file_location(name,BASE/(name+'.py'))
    m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
s=module('collect_sources');a=module('collect_assets');more=module('collect_more')
text=(ROOT/'那些传奇破解组_历史研究档案_v0.16_精简研究版 .md').read_text()
refs={c:(title,url) for c,title,url in re.findall(r'^\[(V\d{2})\] (.*?)\[打开来源\]\((https?://[^)]+)\)',text,re.M)}

def source(item):
    code,(title,url)=item;folder=ROOT/'media/01_sources'/code;meta=folder/'metadata.json'
    old=json.loads(meta.read_text()) if meta.exists() else None
    reader=folder/'web_reader_capture.txt'
    if reader.exists() and reader.stat().st_size>500:
        return {'code':code,'title':title.strip(),'url':url,'status':'reader_text_available','reader_capture':str(reader.relative_to(ROOT))}
    usable=(folder/'readable.txt').is_file() and len((folder/'readable.txt').read_text())>400
    if usable:
        rec=old;state='reused'
    else:
        if old:
            (folder/'previous_metadata.json').write_text(json.dumps(old,ensure_ascii=False,indent=2))
        rec=s.fetch((code,url));state=rec['status']
    p=folder/'original.html'
    if p.exists():
        soup=BeautifulSoup(p.read_bytes(),'html.parser')
        pre='\n\n'.join(x.get_text() for x in soup.select('pre'))
        if len(pre)>100:(folder/'extracted_pre.txt').write_text(pre)
        if 'reddit.com' in url and not usable and len((folder/'readable.txt').read_text())<400:
            # Public JSON endpoint; a blocked response remains a recorded failure.
            attempts=[]
            for endpoint in [url.rstrip('/')+'.json?raw_json=1',url.replace('www.reddit.com','old.reddit.com')]:
                try:
                    r=requests.get(endpoint,headers=s.HEADERS,timeout=(8,18));r.raise_for_status()
                    if '.json?' in endpoint:
                        data=r.json();post=data[0]['data']['children'][0]['data']
                        body=post.get('selftext','')
                        (folder/'post.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
                        (folder/'post_readable.txt').write_text(post.get('title','')+'\n'+body)
                        state='post_json_saved';break
                    soup2=BeautifulSoup(r.content,'html.parser');body=soup2.get_text('\n',strip=True)
                    if len(body)<400:raise ValueError('empty page')
                    (folder/'old_reddit.html').write_bytes(r.content)
                    (folder/'old_reddit_readable.txt').write_text(body)
                    state='alternate_page_needs_review';break
                except Exception as exc:attempts.append({'url':endpoint,'error':str(exc)[:200]})
            (folder/'fallback_attempts.json').write_text(json.dumps(attempts,ensure_ascii=False,indent=2))
    if code in ('V22','V23'):
        replacement='COURT_DOC24' if code=='V22' else 'COURT_DOC26'
        if (ROOT/f'media/01_sources/{replacement}/original.pdf').exists():state='court_pdf_available'
    if state=='reused' and len((folder/'readable.txt').read_text())<400:state='thin_page_needs_review'
    print(code,state,flush=True)
    return {'code':code,'title':title.strip(),'url':url,'status':state}

def images():
    for code in refs:
        folder=ROOT/'media/01_sources'/code;p=folder/'original.html'
        if not p.exists():continue
        meta=json.loads((folder/'metadata.json').read_text());soup=BeautifulSoup(p.read_bytes(),'html.parser')
        urls=list(dict.fromkeys(urljoin(meta.get('final_url',refs[code][1]),x['src']) for x in soup.select('img[src]') if '/nfo-a/' in x['src']))
        for i,url in enumerate(urls,1):
            path=f'media/03_stills/source_images/{code}_{i:02}.png'
            if (ROOT/path).exists():continue
            a.acquire(dict(id=f'{code}_img{i:02}',task='EX15',kind='image',title=refs[code][0].split('｜')[0],url=url,path=path,source_page=refs[code][1],source_code=code,author='发行署名 voices38；图像制作署名见原图',rights='xREL 渲染图仅研究参考；站外使用限制及公开使用许可须另核',usage_status='research_only_permission_unconfirmed'))

def games(appid):
    folder=ROOT/f'media/01_sources/STEAM_{appid}';folder.mkdir(exist_ok=True)
    api=f'https://store.steampowered.com/api/appdetails?appids={appid}&l=english'
    try:
        data=requests.get(api,headers=a.HEADERS,timeout=25).json()[str(appid)]['data']
        (folder/'appdetails.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
        (folder/'metadata.json').write_text(json.dumps(dict(id=f'STEAM_{appid}',source_url=api,final_url=api,title=data['name'],status='downloaded_unreviewed',task='EX15',retrieved_at=datetime.now(timezone.utc).isoformat()),ensure_ascii=False,indent=2))
        for label,url in [('header',data['header_image'])]+[(f'screenshot{i+1}',v['path_full']) for i,v in enumerate(data.get('screenshots',[])[:2])]:
            path=f'media/03_stills/official_games/EX15_{appid}_{label}.jpg'
            if not (ROOT/path).exists():a.acquire(dict(id=f'EX15_STEAM_{appid}_{label}',task='EX15',kind='image',title=data['name'],url=url,path=path,source_page=f'https://store.steampowered.com/app/{appid}/',author=', '.join(data.get('publishers',[])),rights='官方商店宣传图片；公开使用条件待确认'))
        video=ROOT/f'media/02_footage/EX15_STEAM_{appid}_trailer1_720p.mp4'
        if data.get('movies') and not video.exists():more.trailer((appid,'EX15',0))
    except Exception as exc:print('GAME',appid,type(exc).__name__,str(exc)[:150],flush=True)

if __name__=='__main__':
    with ThreadPoolExecutor(max_workers=6) as pool:results=list(pool.map(source,refs.items()))
    (BASE/'voices38_collection.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
    images()
    with ThreadPoolExecutor(max_workers=2) as pool:list(pool.map(games,[779340,1693980]))
