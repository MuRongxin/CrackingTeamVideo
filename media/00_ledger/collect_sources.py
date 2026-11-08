"""Collect reference pages without executing downloaded programs.

Run from the repository root. Original pages, normalized text, and link inventories
are stored separately. A successful HTTP response is not treated as usable if it
is a login, rate-limit or bot-challenge page.
"""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urljoin
from datetime import datetime, timezone
import hashlib
import json
import re
import requests
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[2]
LEDGER = ROOT / 'media/00_ledger'
SOURCES = ROOT / 'media/01_sources'
HEADERS = {'User-Agent': 'Mozilla/5.0 (compatible; DocumentaryResearch/1.0)'}

def fetch(item):
    code, url = item
    folder = SOURCES / code
    folder.mkdir(parents=True, exist_ok=True)
    record = dict(id=code, source_url=url, retrieved_at=datetime.now(timezone.utc).isoformat(),
                  rights='待确认；公开访问不等于获得视频使用许可', status='failed')
    try:
        r = requests.get(url, headers=HEADERS, timeout=(12, 30), stream=True)
        record.update(http_status=r.status_code, final_url=r.url,
                      content_type=r.headers.get('Content-Type', ''))
        r.raise_for_status()
        chunks, size = [], 0
        for chunk in r.iter_content(65536):
            size += len(chunk)
            if size > 45 * 1024 * 1024:
                raise ValueError('source exceeds 45 MiB limit')
            chunks.append(chunk)
        raw = b''.join(chunks)
        ct = record['content_type'].lower()
        if raw.startswith(b'%PDF'):
            suffix = '.pdf'
        elif 'html' in ct or b'<html' in raw[:2000].lower() or b'<!doctype' in raw[:500].lower():
            suffix = '.html'
        elif ct.startswith('image/'):
            suffix = '.png' if raw.startswith(b'\x89PNG') else '.jpg'
        elif 'text/' in ct:
            suffix = '.txt'
        else:
            raise ValueError(f'unsupported source media type: {ct}')
        out = folder / ('original' + suffix)
        out.write_bytes(raw)
        record.update(path=str(out.relative_to(ROOT)), bytes=len(raw),
                      sha256=hashlib.sha256(raw).hexdigest(), status='downloaded_unreviewed')
        if suffix == '.html':
            soup = BeautifulSoup(raw, 'html.parser')
            title = soup.title.get_text(' ', strip=True) if soup.title else ''
            record['title'] = title
            for tag in soup(['script','style','noscript']):
                tag.decompose()
            plain = soup.get_text('\n',strip=True)
            (folder / 'readable.txt').write_text(plain)
            links = [{'text':a.get_text(' ',strip=True),'url':urljoin(r.url,a['href'])}
                     for a in soup.select('a[href]')]
            images = [{'alt':a.get('alt',''), 'url':urljoin(r.url,a.get('src','')),
                       'srcset':a.get('srcset','')} for a in soup.select('img[src]')]
            (folder / 'links.json').write_text(json.dumps(dict(links=links,images=images),ensure_ascii=False,indent=2))
            if re.search(r'just a moment|access denied|checking your browser|verify you are human|captcha|bot challenge',title,re.I):
                record['status'] = 'blocked_page'
            if len(plain) < 180:
                record['status'] = 'thin_page_needs_review'
    except Exception as exc:
        record['error'] = str(exc)[:350]
    (folder / 'metadata.json').write_text(json.dumps(record,ensure_ascii=False,indent=2))
    return record

if __name__ == '__main__':
    ROOT = Path.cwd()
    refs = dict(re.findall(r'^\[([A-Z]+\d{2})\]: (https?://\S+)$',
                          (ROOT/'document/媒体素材清单.md').read_text(),re.M))
    extras = {
        'NEW_RAZOR_DEMO':'https://demozoo.org/productions/390060/',
        'NEW_HLM_INSTALLER':'https://www.pouet.net/prod.php?which=86759',
        'NEW_FLT_DEMO':'https://www.pouet.net/prod.php?which=54603',
    }
    refs.update(extras)
    records = []
    with ThreadPoolExecutor(max_workers=6) as pool:
        for f in as_completed([pool.submit(fetch,x) for x in refs.items()]):
            r = f.result()
            records.append(r)
            print(r['id'],r['status'],r.get('http_status',''),r.get('bytes',''),flush=True)
    (LEDGER/'sources.json').write_text(json.dumps(sorted(records,key=lambda x:x['id']),ensure_ascii=False,indent=2))
