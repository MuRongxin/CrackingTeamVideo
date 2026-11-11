#!/usr/bin/env python3
"""Prepare additional Act 2 evidence and unused official footage from local sources."""
from pathlib import Path
from PIL import Image
import hashlib
import json
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT.parents[1]
PUBLIC = ROOT / "public/v38/act2"
STILLS = REPO / "media/03_stills/voices38_act2"
FOOTAGE = REPO / "media/02_footage/derived"
PROVENANCE = ROOT / "act2-asset-provenance.json"


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def register(public, source, note, ledger=None, **extra):
    record = {
        "path": str(public.relative_to(REPO)),
        "derived_from": str(source.relative_to(REPO)),
        "status": "exported" if extra.get("crop_pixels") or extra.get("selected_range_seconds") else "copied",
        "note": note,
        **extra,
    }
    if ledger:
        record["ledger_path"] = str(ledger.relative_to(REPO))
    record["sha256"] = sha(public)
    records = json.loads(PROVENANCE.read_text())
    records = [r for r in records if r["path"] != record["path"]]
    records.append(record)
    PROVENANCE.write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n")


def image(name, source, box=None, note="真实图像局部；未改写图中内容", rights="沿用原素材使用条件，未取得额外公开使用授权"):
    PUBLIC.joinpath("nfo").mkdir(parents=True, exist_ok=True)
    STILLS.mkdir(parents=True, exist_ok=True)
    ledger = STILLS / f"{name}.png"
    with Image.open(source) as im:
        out = im.crop(box) if box else im.copy()
        out.save(ledger)
    public = PUBLIC / "nfo" / f"{name}.png"
    shutil.copyfile(ledger, public)
    meta = {
        "id": f"V38_A2_{name}", "kind": "image", "title": name,
        "path": str(ledger.relative_to(REPO)), "derived_from": str(source.relative_to(REPO)),
        "status": "exported" if box else "copied", "crop_pixels": box,
        "rights": rights, "bytes": ledger.stat().st_size, "sha256": sha(ledger),
    }
    ledger.with_suffix(".png.meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=2) + "\n")
    register(public, source, note, ledger, **({"crop_pixels": box} if box else {}))


def video(name, source, start, seconds, source_page, author):
    PUBLIC.joinpath("footage").mkdir(parents=True, exist_ok=True)
    FOOTAGE.mkdir(parents=True, exist_ok=True)
    ledger = FOOTAGE / f"V38_A2_{name}.mp4"
    subprocess.run([
        "ffmpeg", "-v", "error", "-y", "-ss", str(start), "-i", str(source),
        "-t", str(seconds), "-an", "-c:v", "libx264", "-preset", "medium",
        "-crf", "17", "-pix_fmt", "yuv420p", "-threads", "2", "-movflags", "+faststart", str(ledger),
    ], check=True)
    public = PUBLIC / "footage" / f"{name}.mp4"
    shutil.copyfile(ledger, public)
    meta = {
        "id": f"V38_A2_{name}", "kind": "video", "title": name,
        "path": str(ledger.relative_to(REPO)), "derived_from": str(source.relative_to(REPO)),
        "source_page": source_page, "author": author, "status": "exported",
        "source_sha256": sha(source), "selected_range_seconds": [start, start + seconds],
        "rights": "衍生静音节选；沿用官方商店宣传片的公开使用条件，未取得额外授权",
        "bytes": ledger.stat().st_size, "sha256": sha(ledger),
    }
    ledger.with_suffix(".mp4.meta.json").write_text(json.dumps(meta, ensure_ascii=False, indent=2) + "\n")
    register(public, source, "官方宣传片静音节选；未循环使用既有 Act 2 片段", ledger,
             source_sha256=meta["source_sha256"], selected_range_seconds=meta["selected_range_seconds"])


restricted = "原渲染图含 xREL 站外使用限制提示；本工程仅作研究剪辑候选，公开使用前需另行确认"
image("three-kingdoms-original", REPO / "media/03_stills/source_images/V02_01.png", note="V02 实际 NFO 渲染截图；完整保留原图", rights=restricted)
image("reloaded-full", REPO / "media/03_stills/source_images/P04_01.png", note="P04 完整 RELOADED NFO 渲染图")
image("razor-full", REPO / "media/03_stills/source_images/L06_01.png", note="L06 完整 Razor NFO 长图", rights=restricted)
image("codex-logo", REPO / "media/03_stills/source_images/C10_01.png", (0, 0, 553, 225), "CODEX 实际 NFO 顶部字符 Logo 裁切", restricted)
image("empress-logo", REPO / "media/03_stills/source_images/E09_01.png", (0, 0, 560, 125), "EMPRESS 实际 NFO 顶部字符 Logo 裁切", restricted)

PUBLIC.joinpath("stills").mkdir(parents=True, exist_ok=True)
source = REPO / "media/03_stills/official_games/EX15_779340_screenshot2.jpg"
public = PUBLIC / "stills/three-kingdoms-2.jpg"
shutil.copyfile(source, public)
register(public, source, "《三国》官方第二张实际游戏静帧；此前未用于 Act 2")

video("launch-window", REPO / "media/02_footage/EX12_STEAM_1245620_trailer1_720p.mp4", 4, 16,
      "https://store.steampowered.com/app/1245620/", "FromSoftware / Bandai Namco")
video("quiet-news", REPO / "media/02_footage/EX15_STEAM_779340_trailer1_720p.mp4", 35, 10,
      "https://store.steampowered.com/app/779340/", "Creative Assembly / SEGA")
video("community-persona", REPO / "media/02_footage/EX16_STEAM_1687950_trailer1_720p.mp4", 8, 22,
      "https://store.steampowered.com/app/1687950/", "ATLUS / SEGA")
print("Prepared Act 2 redesign assets")
