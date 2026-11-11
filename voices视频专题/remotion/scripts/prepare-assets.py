"""Rebuild lossless PDF/NFO excerpts and portable copies of supplied narration."""
from pathlib import Path
from PIL import Image
import shutil, wave, json, subprocess, tempfile, hashlib
root = Path(__file__).resolve().parents[1]
repo = root.parents[1]
pub = root / 'public/v38'
for folder in ['court', 'nfo', 'vo', 'fonts']:
    (pub / folder).mkdir(parents=True, exist_ok=True)
subprocess.run(['python3',str(root/'scripts/sync-voiceover.py')],check=True)
records = []
boxes = {
    'COURT_COMPLAINT': {'header': (100,9,511,31), 'court': (151,400,519,448),
        'parties': (72,460,305,615), 'plaintiff': (76,464,232,506), 'defendant': (76,546,302,609)},
    'COURT_DOC24': {'order-quote': (98,690,565,733), 'order-line1': (324,692,564,708),
        'order-line2': (100,715,277,731), 'order-line3': (277,715,495,731)}
}
with tempfile.TemporaryDirectory(prefix='v38-assets-') as tmp:
    for source, crops in boxes.items():
        original = repo / f'media/01_sources/{source}/original.pdf'
        prefix = Path(tmp)/source
        subprocess.run(['pdftoppm','-f','1','-singlefile','-r','400','-png',str(original),str(prefix)],check=True)
        with Image.open(str(prefix)+'.png') as im:
            for name, box in crops.items():
                dest = pub/'court'/f'{name}.png'
                im.crop(tuple(round(v*400/72) for v in box)).save(dest)
                archive = repo/'media/03_stills/pdf_pages'/f'V38_{source}_{name}.png'
                shutil.copyfile(dest, archive)
                records.append({'path':str(dest.relative_to(repo)),'derived_from':str(original.relative_to(repo)),
                    'page':1,'dpi':400,'crop_pdf_points':box,'ledger_path':str(archive.relative_to(repo)),
                    'status':'exported','note':'真实 PDF 局部；未重写原文；未包含律师联系方式'})
font = Path.home()/'.local/share/fonts/WenYue-XinQingNianTi-W8-J-2.otf'
shutil.copyfile(font,pub/'fonts/xinqingnian.otf')
# The current recordings are imported by the shared synchronizer.
voice_rows=json.loads((root/'current-voice-provenance.json').read_text())[:11]
for v in voice_rows:
    records.append({'path':str((root/'public'/v['file']).relative_to(repo)), 'derived_from':v['source'],'status':'copied','note':'新版录音；原速原样'})
src=repo/'media/03_stills/source_images/V06_nfo.png';dst=pub/'nfo/proper-header.png'
with Image.open(src) as im: im.crop((0,0,640,220)).save(dst)
records.append({'path':str(dst.relative_to(repo)),'derived_from':str(src.relative_to(repo)),
    'crop_pixels':[0,0,640,220],'status':'exported','note':'NFO 题头裁切，未包含邮箱和捐款地址；沿用原素材使用条件'})
for record in records:
    record['sha256']=hashlib.sha256((repo/record['path']).read_bytes()).hexdigest()
ledger=root/'asset-provenance.json'
prior=json.loads(ledger.read_text()) if ledger.exists() else []
paths={record['path'] for record in records}
# Preserve the separately prepared official logos, source excerpts, and score.
records.extend(record for record in prior if record['path'] not in paths)
ledger.write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
print(f'Prepared {len(records)} assets; PDF derivatives archived for the media catalog.')
