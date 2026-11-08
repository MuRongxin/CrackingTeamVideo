"""Refresh explicit .gitignore entries for media files at or above a size limit.

Git ignore patterns cannot evaluate file sizes, so rerun this after adding media.
This script changes ignore rules only; it never deletes or unstages files.
"""
from pathlib import Path
import argparse
import re

ROOT = Path(__file__).resolve().parents[2]
BEGIN = '# BEGIN LARGE MEDIA (generated)'
END = '# END LARGE MEDIA (generated)'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--max-mib', type=float, default=10,
                        help='Ignore media files at or above this many MiB (default: 10).')
    args = parser.parse_args()
    if not 0 < args.max_mib < float('inf'):
        parser.error('--max-mib must be a finite positive number')
    limit = args.max_mib * 1024 * 1024
    files = sorted(p for p in (ROOT / 'media').rglob('*')
                   if p.is_file() and not p.is_symlink() and p.stat().st_size >= limit)
    # Escape glob metacharacters and spaces so every entry denotes one literal file.
    entries = ['/' + re.sub(r'([\\*?\[\] !#])', r'\\\1', p.relative_to(ROOT).as_posix())
               for p in files]
    block = '\n'.join([BEGIN, f'# Threshold: >= {args.max_mib:g} MiB', *entries, END])
    path = ROOT / '.gitignore'
    text = path.read_text() if path.exists() else ''
    pattern = re.escape(BEGIN) + r'.*?' + re.escape(END)
    if BEGIN in text or END in text:
        if text.count(BEGIN) != 1 or text.count(END) != 1 or not re.search(pattern, text, re.S):
            raise SystemExit('Invalid generated block; .gitignore was not changed.')
        text = re.sub(pattern, lambda _: block, text, count=1, flags=re.S)
    else:
        text = text.rstrip() + '\n\n' + block + '\n'
    path.write_text(text)
    print(f'Updated .gitignore: {len(files)} media files >= {args.max_mib:g} MiB.')


if __name__ == '__main__':
    main()
