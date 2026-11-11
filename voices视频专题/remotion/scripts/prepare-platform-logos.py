"""Download official artwork, preserve sources, rasterize without redrawing logos."""
from pathlib import Path
import datetime, hashlib, json, re, shutil, subprocess, requests

root=Path(__file__).resolve().parents[1]
repo=root.parents[1]
cache=root/'.qa/brand-sources'
pub=root/'public/v38/brands';pub.mkdir(parents=True,exist_ok=True)
items=[
 ('discord','https://discord.com/branding','https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e3d741b8346ed0ecebb501_Logo.svg','Discord Inc.','discord-black.svg'),
 ('valve','https://www.valvesoftware.com/en/','https://www.valvesoftware.com/en/','Valve Corporation',None),
 ('reddit','https://redditinc.com/brand','https://redditinc.com/hubfs/Reddit%20Inc/Content/Brand%20Page/Reddit_Lockup_Logo.svg','Reddit, Inc.','reddit.svg'),
]
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,obj):p.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+'\n')
records=[]
for name,page,url,author,cached in items:
 folder=repo/'media/01_sources'/('BRAND_'+name.upper());folder.mkdir(exist_ok=True)
 html=folder/'original.html'
 if not html.exists():
  if (cache/f'{name}.html').exists():shutil.copyfile(cache/f'{name}.html',html)
  else:
   r=requests.get(page,timeout=25);r.raise_for_status();html.write_bytes(r.content)
 svg=folder/'original.svg'
 if not svg.exists():
  if name=='valve':
   # Logo is inline SVG on Valve's own homepage; carry its external CSS fill.
   raw=re.search(r'<svg\b.*?</svg>',html.read_text(),flags=re.S).group(0)
   raw=raw.replace('<defs>','<defs><style>.cls-2{fill:#f74843}</style>')
   svg.write_text(raw)
  elif (cache/cached).exists():shutil.copyfile(cache/cached,svg)
  else:
   r=requests.get(url,timeout=25);r.raise_for_status();svg.write_bytes(r.content)
 rights='官方品牌标识；仅用于纪录片识别平台；不表示平台背书，商标归原权利方'
 write(folder/'metadata.json',dict(id='BRAND_'+name.upper(),source_url=page,asset_url=url,author=author,
  retrieved_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),status='downloaded',path=str(html.relative_to(repo)),
  sha256=sha(html),vector_path=str(svg.relative_to(repo)),vector_sha256=sha(svg),rights=rights,
  note='Valve 从官网内嵌 SVG 与原 CSS 提取；其余为官网提供的原始 SVG'))
 archive=repo/'media/03_stills/platform_logos'/f'{name}.png';archive.parent.mkdir(parents=True,exist_ok=True)
 subprocess.run(['inkscape',str(svg),'--export-type=png',f'--export-filename={archive}','--export-width=1200'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
 dst=pub/archive.name;shutil.copyfile(archive,dst)
 meta=dict(id='V38_BRAND_'+name.upper(),task='OP08',kind='image',title=name+' 官方 Logo',
  path=str(archive.relative_to(repo)),source_page=page,url=url,author=author,rights=rights,status='exported',
  derived_from=str(svg.relative_to(repo)),bytes=archive.stat().st_size,sha256=sha(archive),note='官方矢量标识透明底光栅化；未改色、未变形')
 write(archive.with_suffix('.png.meta.json'),meta)
 records.append(dict(path=str(dst.relative_to(repo)),ledger_path=str(archive.relative_to(repo)),
  derived_from=meta['derived_from'],source_page=page,status='exported',note=meta['note'],sha256=sha(dst)))
ledger=root/'asset-provenance.json';old=json.loads(ledger.read_text())
write(ledger,[r for r in old if '/brands/' not in r['path']]+records)
print('Prepared three official platform logos.')
