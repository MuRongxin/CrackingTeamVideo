"""Targeted official picture and attributed Razor artwork acquisition for Act 7."""
from pathlib import Path
import json, requests, hashlib, subprocess, datetime, concurrent.futures
from bs4 import BeautifulSoup
root=Path(__file__).resolve().parents[1];repo=root.parents[1];qa=root/'.qa/act7'
def write(p,v):
 p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
def get(url):
 r=requests.get(url,timeout=45);r.raise_for_status();return r

def record(p,id,title,url,page,author,rights,extra={}):
 m=dict(id=id,kind='image' if p.suffix=='.svg' else 'video',task='EX15',title=title,path=str(p.relative_to(repo)),url=url,source_page=page,author=author,rights=rights,status='downloaded',retrieved_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),sha256=hashlib.sha256(p.read_bytes()).hexdigest(),bytes=p.stat().st_size,**extra)
 write(p.with_suffix(p.suffix+'.meta.json'),m);return m

def mafia():
 folder=repo/'media/01_sources/V38_A7_MAFIA';folder.mkdir(parents=True,exist_ok=True)
 cached=folder/'appdetails.json';raw=json.loads((cached if cached.exists() else qa/'steam-1941540.json').read_text());write(cached,raw)
 movie=raw['1941540']['data']['movies'][1];master=movie['hls_h264'];txt=get(master).text;(folder/'master.m3u8').write_text(txt);lines=txt.splitlines()
 url=next(requests.compat.urljoin(master,lines[i+1]) for i,l in enumerate(lines) if 'RESOLUTION=1920x1080' in l)
 (folder/'video.m3u8').write_text(get(url).text);p=repo/'media/02_footage/V38_A7_MAFIA_launch_1080p.mp4'
 if not p.exists():subprocess.run(['ffmpeg','-v','error','-y','-i',url,'-map','0:v:0','-an','-c:v','copy','-movflags','+faststart',str(p)],check=True)
 write(folder/'metadata.json',record(p,'V38_A7_MAFIA','Mafia: The Old Country / Launch - ESRB - EN',master,'https://store.steampowered.com/app/1941540/','Hangar 13 / 2K','官方宣传片，公开剪辑使用条件待确认',dict(acquisition='完整1080p视频轨，无音轨')));print('Mafia acquired',flush=True)

def hl():
 folder=repo/'media/01_sources/V38_A7_HALFLIFE';folder.mkdir(parents=True,exist_ok=True)
 if not (folder/'original.html').exists():(folder/'original.html').write_text((qa/'halflife.html').read_text())
 url='https://cdn.akamai.steamstatic.com/half-life.com/images/halflife25/hl1_anniversary_mashup_looping_H.264.mp4';p=repo/'media/02_footage/V38_A7_HALFLIFE_official_montage.mp4'
 if not p.exists():p.write_bytes(get(url).content)
 write(folder/'metadata.json',record(p,'V38_A7_HALFLIFE','Half-Life 25周年官网原版游戏蒙太奇',url,'https://www.half-life.com/en/halflife25','Valve','官方周年网页素材；公开使用条件待确认',dict(note='2023周年网页上的初代游戏画面，不是1998发行版本的运行证明')));print('Half-Life acquired',flush=True)

def razor():
 # Commons file downloads were blocked; render its licensed, archived ASCII source.
 import html
 folder=repo/'media/01_sources/V38_A7_RAZOR_MARK';source=folder/'original.txt'
 art=source.read_text();items=[]
 for row,line in enumerate(art.splitlines()):
  for col,c in enumerate(line):
   if c in '█▀▄':items.append(f'<rect x="{col*8}" y="{row*16+(8 if c=="▄" else 0)}" width="8" height="{16 if c=="█" else 8}"/>')
   elif c!=' ':items.append(f'<text x="{col*8}" y="{row*16+14}" font-family="monospace" font-size="14">{html.escape(c)}</text>')
 p=folder/'reconstructed.svg';p.parent.mkdir(parents=True,exist_ok=True)
 p.write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="32 0 632 224"><g fill="#e9ede6">'+''.join(items)+'</g></svg>')
 png=repo/'media/03_stills/voices38_act7/razor-jed.png'
 subprocess.run(['inkscape',str(p),'--export-type=png','--export-width=1896',f'--export-filename={png}'],check=True,stdout=subprocess.DEVNULL)
 meta=json.loads((folder/'metadata.json').read_text());meta.update(path=str(png.relative_to(repo)),derived_from=str(p.relative_to(repo)),ascii_source=str(source.relative_to(repo)),kind='image',status='exported',sha256=hashlib.sha256(png.read_bytes()).hexdigest(),bytes=png.stat().st_size)
 write(png.with_suffix('.png.meta.json'),meta);print('Razor original ASCII reflowed',flush=True)
if __name__=='__main__':
 with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
  for f in [pool.submit(x) for x in [mafia,hl,razor]]:f.result()
