"""Build the epilogue from local primary sources and unchanged recordings."""
from pathlib import Path
import json,re,wave,hashlib,shutil,subprocess
import pymupdf as fitz
from PIL import Image
root=Path(__file__).resolve().parents[1];repo=root.parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,v):
 p.parent.mkdir(parents=True,exist_ok=True);p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
phrases={
279:'截至2026年11月初，|公开资料里，还没有可靠消息证明|voices38的身份已经确认。',
280:'平台有没有交出资料、交了什么，外界也不知道。',
281:'Denuvo说，他绕过了26款游戏的保护，|伤害了它的生意。',
282:'但在一些玩家看来，|他又是一个让更多人能够玩到这些游戏的人。',
283:'有人感谢他把这些游戏「保存」了下来。',
284:'voices38自己在诉讼期间的NFO里，把捐款说明改成了：|支持以后的破解，也支持你的所有权。',
285:'下面还有一句口号：|We will own everything and be happy。',
286:'我们将拥有一切，并且很快乐。',
287:'读起来，像是把那句网络流行语|“你将一无所有，并且很快乐”，|反过来写了一遍。',
288:'voices38无疑是一个极具风格的破解者，',
289:'会在KIND栏里讲笑话，|会为漏掉的东西道歉，',
290:'会抱怨内存太贵，|也会和同行隔空争论，什么才算破解。',
291:'这些东西，让我们逐渐认识了这个署名，|也看到了它背后那套工作的方式。',
292:'一年前，他说，这是他的第一次尝试。',
293:'一年后，Reddit上已经找不到这个账号；',
294:'论坛上的名字也从voices变成了v0ices。',
295:'名字变了，留下的痕迹还在，|但身份依然没有答案。',
296:'故事讲到这里，|我们连voices38是个人还是团体都还不清楚。',
297:'只有法院的案卷上，还是依旧写着：|VOICES38。',
}
anchors={279:[1.95,4.55],281:[2.9],282:[1.65],284:[3.95],285:[1.43],287:[2.15,4.4],289:[1.47],290:[1.35],291:[2.8],295:[2.1],296:[1.2],297:[3.0]}
norm=lambda s:re.sub(r'[^\w]','',s).lower()
text=(root.parent/'voices38_B站文稿.md').read_text().split('## 尾声')[1]
assert norm(text)==norm(''.join(phrases.values()))
write(root/'src/act10/narration-source.json',phrases)
voices=[];caps={}
for n,phrase in phrases.items():
 src=next((root.parent/'videoVoices').glob(f'sentence_{n}_*.wav'));dst=root/f'public/v38/vo/sentence-{n}.wav';shutil.copyfile(src,dst)
 with wave.open(str(src)) as w:d=w.getnframes()/w.getframerate()
 voices.append(dict(id=n,file=f'v38/vo/sentence-{n}.wav',duration=d,source=str(src.relative_to(repo)),original=src.name,sha256=sha(src)))
 parts=phrase.split('|');edges=[.02]+anchors.get(n,[])+[d-.025];assert len(parts)+1==len(edges)
 rows=[]
 for text,a,b in zip(parts,edges,edges[1:]):
  assert b>a,(n,text)
  if len(text)>28:
   choices=[i for i,c in enumerate(text) if c in ' ，、：' and 9<=i<=len(text)-8];k=min(choices,key=lambda i:abs(i-len(text)/2)) if choices else len(text)//2;text=text[:k].rstrip()+'\n'+text[k:].lstrip()
  rows.append(dict(text=text,startMs=round(a*1000),endMs=round(b*1000),timestampMs=None,confidence=None))
 caps[str(n)]=rows
write(root/'src/act10/voice-manifest.json',voices);write(root/'src/act10/captions.json',caps)
old=json.loads((root/'current-voice-provenance.json').read_text());write(root/'current-voice-provenance.json',[v for v in old if v['id']<279]+voices)
base=repo/'media/03_stills/voices38_act10';base.mkdir(exist_ok=True)
src=repo/'media/01_sources/COURT_COMPLAINT/original.pdf';doc=fitz.open(src);meta=json.loads(src.with_name('metadata.json').read_text())
for name,box in [('case-ending',[68,470,555,625]),('entity-line',[76,548,300,567]),('name-ending',[76,548,134,567])]:
 dst=base/(name+'.png');doc[0].get_pixmap(matrix=fitz.Matrix(32 if name=='name-ending' else 7,32 if name=='name-ending' else 7),clip=fitz.Rect(box),alpha=False).save(dst)
 write(dst.with_suffix('.png.meta.json'),dict(id='V38_A10_'+name,task='EX15',kind='image',title='尾声 / 起诉书首页原件裁片',path=str(dst.relative_to(repo)),derived_from=str(src.relative_to(repo)),page=1,crop_pdf_points=box,source_page=meta['source_url'],author='Denuvo 提交的法院文件',rights=meta['rights'],status='exported',source_sha256=sha(src),sha256=sha(dst),bytes=dst.stat().st_size))
src=repo/'media/03_stills/source_images/V27_nfo.png';meta=json.loads(src.with_suffix('.png.meta.json').read_text())
for name,box in [('ownership',[12,1041,639,1056]),('own-everything',[12,1055,302,1069])]:
 dst=base/(name+'.png');Image.open(src).crop(box).save(dst)
 write(dst.with_suffix('.png.meta.json'),dict(id='V38_A10_'+name,task='EX15',kind='image',title='V27 原NFO所有权声明 / 无联系方式与捐款地址',path=str(dst.relative_to(repo)),derived_from=str(src.relative_to(repo)),crop_pixels=box,source_page=meta['source_page'],author='voices38',rights=meta['rights'],status='exported',source_sha256=sha(src),sha256=sha(dst),bytes=dst.stat().st_size))
src=repo/'media/02_footage/V38_A9_DEAD_official_1080p.mp4';dst=repo/'media/02_footage/derived/V38_A10_dead-players.mp4';meta=json.loads(src.with_suffix('.mp4.meta.json').read_text())
if not dst.exists():subprocess.run(['ffmpeg','-v','error','-y','-ss','29','-i',str(src),'-t','7.3','-an','-c:v','libx264','-crf','18','-preset','fast','-threads','2','-pix_fmt','yuv420p','-movflags','+faststart',str(dst)],check=True)
write(dst.with_suffix('.mp4.meta.json'),dict(id='V38_A10_dead-players',task='EX15',kind='video',title='尾声 / 死亡空间官方零重力与探索画面',path=str(dst.relative_to(repo)),derived_from=str(src.relative_to(repo)),selected_range_seconds=[29,36.3],source_page=meta['source_page'],author=meta['author'],rights=meta['rights'],status='exported',source_sha256=sha(src),sha256=sha(dst),bytes=dst.stat().st_size,note='原速静音，不循环；与前幕节选不重叠。为游戏作品画面，不是破解版本实测。'))
records=[]
for src in [*sorted(base.glob('*.png')),dst]:
 target=root/'public/v38/act10'/src.name.replace('V38_A10_','');target.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(src,target)
 m=json.loads(src.with_suffix(src.suffix+'.meta.json').read_text());records.append(dict(m,path=str(target.relative_to(repo)),ledger_path=str(src.relative_to(repo))))
# Existing archive crop was a prior alternate; give this act an explicit public copy.
src=repo/'media/03_stills/voices38_act8/introduction.png';target=root/'public/v38/act10/introduction.png';shutil.copyfile(src,target)
m=json.loads(src.with_suffix('.png.meta.json').read_text());records.append(dict(m,id='V38_A10_intro-context',path=str(target.relative_to(repo)),ledger_path=str(src.relative_to(repo)),reused=True))
write(root/'act10-asset-provenance.json',records)
print('Act10:',len(voices),'unchanged recordings;',len(records),'visual assets including archive reuse')
