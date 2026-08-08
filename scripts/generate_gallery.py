#!/usr/bin/env python3
import os
import json

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, '..'))
IMAGES_DIR = os.path.join(ROOT, 'images')
OUT_FILE = os.path.join(ROOT, 'data', 'gallery.json')

ALLOWED = {'.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'}

files = []
if os.path.isdir(IMAGES_DIR):
    for fname in sorted(os.listdir(IMAGES_DIR)):
        if os.path.splitext(fname)[1].lower() in ALLOWED:
            files.append(os.path.join('images', fname).replace('\\', '/'))

os.makedirs(os.path.dirname(OUT_FILE), exist_ok=True)
with open(OUT_FILE, 'w', encoding='utf-8') as f:
    json.dump(files, f, indent=2, ensure_ascii=False)

print(f'Wrote {len(files)} entries to {OUT_FILE}')
