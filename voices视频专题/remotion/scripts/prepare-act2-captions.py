"""Compatibility entry point: sync captions against the current storyboard."""
from pathlib import Path
import subprocess
subprocess.run(['python3',str(Path(__file__).with_name('sync-voiceover.py'))],check=True)
