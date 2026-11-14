"""Register and derive the November release and the five authentic outro marks."""
from pathlib import Path
import json,hashlib,shutil,subprocess
from PIL import Image,ImageDraw,ImageFont
repo=Path(__file__).resolve().parents[3];root=Path(__file__).resolve().parents[1];source=repo/'media/01_sources/V38_UPDATE_RACER';base=repo/'media/03_stills/voices38_update';base.mkdir(exist_ok=True)
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,v):p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
refs=dict(reddit='https://www.reddit.com/r/CrackWatch/comments/1xunli6/starwarsgalacticracervoices38/',nfo='https://pastebin.com/R3apr2HJ',nfo_image='https://i.ibb.co/Lh81tpPg/voices38.png',index='https://www.xrel.to/p2p/group-6080-voices38/releases.html',rune='https://www.srrdb.com/download/file/Baldurs.Gate.3-RUNE/rune.nfo',steam='https://store.steampowered.com/app/4078430/')
write(source/'metadata.json',dict(id='V38_UPDATE_RACER',source_url=refs['reddit'],refs=refs,status='downloaded',note='Reddit 原网页下载返回403；作者与标题来自可读取的网页文本，按原文重排，不冒充截图。NFO、发行目录、Steam JSON及官方视频已另行归档。xREL 的 RUNE 位图带站外限制，未采用；实际使用SRRDB原NFO字符头。',rights='史料及商标归原发布者；官方游戏视频公开剪辑使用条件待确认。'))
(source/'post-excerpt.txt').write_text('STAR.WARS.Galactic.Racer-voices38\nAuthor: u/v0ices38\nNFO (Image): '+refs['nfo_image']+'\nNFO (Text): '+refs['nfo']+'\nSource: '+refs['reddit']+'\nCapture: 2026-11-14，网页工具可读文本；原网页HTTP请求403。\n')
records=[]
def asset(name,src,box=None,author='voices38',page=None):
 dst=base/(name+'.png');im=Image.open(src)
 if box:im=im.crop(box)
 im.save(dst);m=dict(id='V38_UP_'+name,kind='image',task='EX15',title=name,path=str(dst.relative_to(repo)),derived_from=str(src.relative_to(repo)),source_sha256=sha(src),crop_pixels=box,source_page=page or refs['reddit'],author=author,rights='原作者与商标权利保留，公开使用条件分别核对',status='exported',sha256=sha(dst),bytes=dst.stat().st_size);write(dst.with_suffix('.png.meta.json'),m);records.append(m)
asset('racer-release',source/'nfo-original.png',[55,224,610,260])
asset('racer-kind',source/'nfo-original.png',[55,274,540,289])
asset('racer-signature',source/'nfo-original.png',[0,0,640,205])
asset('racer-ownership',source/'nfo-original.png',[12,908,639,936])
# These assets preserve actual author-supplied letter forms.
asset('reloaded',repo/'media/03_stills/voices38_act2/reloaded-header.png',author='RELOADED / nERv',page='https://www.xrel.to')
asset('codex',repo/'media/03_stills/voices38_act2/codex-logo.png',author='CODEX',page='https://torrentfreak.com/iconic-game-cracking-group-codex-shuts-down/')
asset('empress',root/'public/v38/act2/nfo/empress-logo.png',author='EMPRESS',page='本地既有 EMPRESS 原 NFO 字标')
asset('razor',repo/'media/03_stills/voices38_act7/razor-jed.png',author='JeD / ACiD',page='https://commons.wikimedia.org/wiki/File:Razor1911_JEDACID_HQ.svg')
p=base/'razor.png.meta.json';m=json.loads(p.read_text());m['rights']='Commons Attribution；需署名 JeD / ACiD';write(p,m);records[-1]=m
raw=source/'rune-original.nfo';lines=raw.read_bytes().decode('cp437').splitlines()[:19];font=ImageFont.truetype(str(root/'public/v38/fonts/vga.ttf'),24);step=24;cw=12
img=Image.new('RGBA',(max(map(len,lines))*cw+32,len(lines)*step+20),(0,0,0,0));d=ImageDraw.Draw(img)
for y,line in enumerate(lines):
 for x,ch in enumerate(line):
  if ch!=' ':d.text((16+x*cw,10+y*step),ch,font=font,fill='#e9ede6')
dst=base/'rune.png';img.save(dst);m=dict(id='V38_UP_rune',task='EX15',kind='image',title='RUNE 原NFO字符头逐字渲染',path=str(dst.relative_to(repo)),derived_from=str(raw.relative_to(repo)),source_sha256=sha(raw),source_page=refs['rune'],author='RUNE / LNK^2020',rights='原NFO作者权利保留；非xREL带限制的渲染位图',status='exported',sha256=sha(dst),bytes=dst.stat().st_size,note='原CP437字符逐字渲染，保留原字符画，不重绘字形。');write(dst.with_suffix('.png.meta.json'),m);records.append(m)
src=repo/'media/02_footage/V38_RACER_launch_1080p.mp4';steam=json.loads((source/'steam.json').read_text())['4078430']['data'];movie=steam['movies'][0]
m=dict(id='V38_UP_RACER_VIDEO',task='EX15',kind='video',title=steam['name']+' / 官方发售预告',path=str(src.relative_to(repo)),source_page=refs['steam'],source_url=movie['hls_h264'],author='Fuse Games / Secret Mode',rights='官方游戏宣传视频；公开剪辑使用条件待确认',status='downloaded',sha256=sha(src),bytes=src.stat().st_size);write(src.with_suffix('.mp4.meta.json'),m)
for name,start,seconds in [('racer-run',47.5,8.2),('racer-kind-run',113,5.7)]:
 dst=repo/f'media/02_footage/derived/V38_UP_{name}.mp4'
 if not dst.exists():subprocess.run(['ffmpeg','-v','error','-y','-ss',str(start),'-i',str(src),'-t',str(seconds),'-map','0:v:0','-map','0:a:0','-c:v','libx264','-crf','18','-preset','fast','-threads','2','-c:a','aac','-b:a','160k','-movflags','+faststart',str(dst)],check=True)
 record=dict(m,id='V38_UP_'+name,path=str(dst.relative_to(repo)),derived_from=str(src.relative_to(repo)),source_sha256=sha(src),selected_range_seconds=[start,start+seconds],status='exported',sha256=sha(dst),bytes=dst.stat().st_size,note='原速、不循环，保留官方混音，以低音量铺底，非破解版本实测。');write(dst.with_suffix('.mp4.meta.json'),record);records.append(record)
public=[]
for r in records:
 src=repo/r['path'];dst=root/'public/v38/update'/src.name.replace('V38_UP_','');dst.parent.mkdir(exist_ok=True,parents=True);shutil.copyfile(src,dst);public.append(dict(r,path=str(dst.relative_to(repo)),ledger_path=r['path']))
write(root/'update-asset-provenance.json',public)
print('Prepared',len(public),'source derivatives')
