"""Official trailer acquisition, Commons attribution metadata, C64 artwork."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.parse import urljoin
from datetime import datetime,timezone
import importlib.util
import hashlib,json,re,subprocess,requests
from bs4 import BeautifulSoup

BASE=Path(__file__).resolve().parent
def module(name):
    spec=importlib.util.spec_from_file_location(name,BASE/(name+'.py'))
    m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m);return m
a=module('collect_assets');s=module('collect_sources');ROOT=a.ROOT

def trailer(job):
    appid,task,index=job
    folder=ROOT/f'media/01_sources/STEAM_{appid}'
    data=json.loads((folder/'appdetails.json').read_text())
    movie=data['movies'][index]
    master=movie['hls_h264']
    text=requests.get(master,headers=a.HEADERS,timeout=25).text
    (folder/f'trailer_{index}_master.m3u8').write_text(text)
    variants=[]
    lines=text.splitlines()
    for i,line in enumerate(lines):
        m=re.search(r'RESOLUTION=(\d+)x(\d+)',line)
        if m and int(m.group(2))<=720:variants.append((int(m.group(2)),urljoin(master,lines[i+1])))
    audio=re.search(r'#EXT-X-MEDIA:TYPE=AUDIO[^\n]*URI="([^"]+)"',text)
    if not variants or not audio:raise ValueError('missing 720p variant or audio')
    video=max(variants)[1];audio=urljoin(master,audio.group(1))
    path=ROOT/f'media/02_footage/{task}_STEAM_{appid}_trailer{index+1}_720p.mp4'
    path.parent.mkdir(parents=True,exist_ok=True)
    tmp=path.with_name(path.stem+'.part.mp4')
    rec=dict(id=f'{task}_STEAM_{appid}_trailer{index+1}',task=task,kind='video',title=data['name']+' / '+movie['name'],
             source_page=f'https://store.steampowered.com/app/{appid}/',url=master,
             retrieved_at=datetime.now(timezone.utc).isoformat(),path=str(path.relative_to(ROOT)),
             author=', '.join(data.get('publishers',[])),rights='官方商店宣传片；公开视频使用条件待确认',status='failed')
    try:
        cmd=['ffmpeg','-v','error','-nostdin','-y','-i',video,'-i',audio,'-map','0:v:0','-map','1:a:0','-c','copy','-movflags','+faststart',str(tmp)]
        p=subprocess.run(cmd,capture_output=True,text=True,timeout=240)
        if p.returncode:raise ValueError(p.stderr[-400:])
        probe=subprocess.run(['ffprobe','-v','error','-show_format','-show_streams','-of','json',str(tmp)],capture_output=True,text=True,check=True)
        rec['probe']=json.loads(probe.stdout)
        tmp.rename(path)
        rec.update(status='downloaded',bytes=path.stat().st_size,sha256=hashlib.sha256(path.read_bytes()).hexdigest())
    except Exception as e:rec['error']=str(e)[:500];tmp.unlink(missing_ok=True)
    path.with_name(path.name+'.meta.json').write_text(json.dumps(rec,ensure_ascii=False,indent=2))
    print(rec['id'],rec['status'],rec.get('bytes',rec.get('error')),flush=True)

def commons(query,code,limit=2):
    params=dict(action='query',format='json',generator='search',gsrsearch=query,gsrnamespace=6,gsrlimit=limit,
                prop='imageinfo',iiprop='url|extmetadata')
    r=requests.get('https://commons.wikimedia.org/w/api.php',params=params,headers=a.HEADERS,timeout=30)
    r.raise_for_status();data=r.json()
    folder=ROOT/f'media/01_sources/{code}';folder.mkdir(parents=True,exist_ok=True)
    (folder/'commons_metadata.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
    (folder/'metadata.json').write_text(json.dumps(dict(id=code,source_url=r.url,final_url=r.url,status='downloaded_unreviewed',title=query),ensure_ascii=False,indent=2))
    for i,page in enumerate(data.get('query',{}).get('pages',{}).values(),1):
        info=page.get('imageinfo',[{}])[0];em=info.get('extmetadata',{})
        clean=lambda key:BeautifulSoup(str(em.get(key,{}).get('value','')),'html.parser').get_text(' ',strip=True)
        url=info.get('url')
        if not url:continue
        title=page['title'];ext=Path(title).suffix.lower()
        if ext not in ['.jpg','.jpeg','.png','.ogg','.wav','.flac','.webm']:continue
        audio=code.startswith('SOUND')
        kind='audio' if audio else 'image'
        sub='05_audio/reference_sounds' if audio else '03_stills/hardware'
        a.acquire(dict(id=f'{code}_{i:02}',task='AU03' if audio else 'OP03',kind=kind,title=title,url=url,
            path=f'media/{sub}/{code}_{i:02}{ext}',source_page=info['descriptionurl'],
            author=clean('Artist'),rights=clean('LicenseShortName'),license_url=clean('LicenseUrl'),
            attribution=clean('Attribution'),description=clean('ImageDescription')))

def c64():
    code='NEW_RUBICON_SKETCHES';u='http://www.c64.com/pictures/rubicon_sketches/rubicon_sketches.html'
    rec=s.fetch((code,u));print(code,rec['status'],flush=True)
    p=ROOT/f'media/01_sources/{code}/links.json'
    if p.exists():
        data=json.loads(p.read_text());urls=[]
        for x in data['links']:
            if re.search(r'\.(jpg|png)$',x['url'],re.I):urls.append(x['url'])
        for x in data['images']:
            if re.search(r'\.(jpg|png)$',x['url'],re.I):urls.append(x['url'])
        for i,url in enumerate(list(dict.fromkeys(urls))[:10],1):
            a.acquire(dict(id=f'FL14_SKETCH_{i:02}',task='FL14',kind='image',url=url,
               path=f'media/03_stills/c64_artwork/FL14_sketch_{i:02}'+Path(url).suffix,
               source_page=u,author='The Sarge；扫描与刊载见 C64.com',
               rights='作者作品／档案图像；许可待确认；Rubicon 与未发行 Rubicon 2 须逐图区分'))
    for code,name,url in [
        ('FL11','TheSarge_portrait','http://www.c64.com/pictures/sarge_show_the/images/sarge.jpg'),
        ('FL11','TheSarge_interview','http://www.c64.com/interviews/images/scene_interviews_sarge_the.jpg')]:
        a.acquire(dict(id=code+'_'+name,task=code,kind='image',url=url,
            path='media/03_stills/c64_artwork/'+code+'_'+name+'.jpg',source_page='http://www.c64.com/scene_display_interview.php?interview=84',
            author='摄影者见 C64.com 原页，待确认',rights='公开人物照片；许可待确认'))

if __name__=='__main__':
    jobs=[lambda:trailer((524220,'OP01',1)),lambda:trailer((1196590,'EX13',0)),lambda:trailer((34330,'FL21',0)),
      lambda:commons('intitle:"Commodore 64" filetype:bitmap','HARDWARE_C64'),
      lambda:commons('intitle:"Amiga 500" filetype:bitmap','HARDWARE_AMIGA'),
      lambda:commons('intitle:"floppy" filetype:bitmap','HARDWARE_FLOPPY'),
      lambda:commons('intitle:"modem" filetype:bitmap','HARDWARE_MODEM'),
      lambda:commons('intitle:"Fairlight CMI" filetype:bitmap','HARDWARE_CMI'),
      lambda:commons('filetype:audio modem','SOUND_MODEM'),c64]
    def run(f):
        try:f()
        except Exception as e:print('JOB_ERROR',str(e)[:400],flush=True)
    with ThreadPoolExecutor(max_workers=5) as pool:list(pool.map(run,jobs))
