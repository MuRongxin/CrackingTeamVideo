#!/usr/bin/env python3
"""Create the original, restrained Act 1 score. No external audio assets."""

from pathlib import Path
import wave

import numpy as np

RATE = 44100
DURATION = 66.5
OUT = Path(__file__).resolve().parents[1] / "public/v38/sfx/act1-score.wav"
rng = np.random.default_rng(38)
audio = np.zeros(round(RATE * DURATION), dtype=np.float64)


def envelope(start: float, end: float, attack: float = 0.5, release: float = 0.8):
    env = np.zeros_like(audio)
    a = max(0, round(start * RATE))
    b = min(len(audio), round(end * RATE))
    if b <= a:
        return env
    length = b - a
    attack_n = min(length, max(1, round(attack * RATE)))
    release_n = min(length, max(1, round(release * RATE)))
    values = np.ones(length)
    values[:attack_n] = np.sin(np.linspace(0, np.pi / 2, attack_n)) ** 2
    values[-release_n:] *= np.cos(np.linspace(0, np.pi / 2, release_n)) ** 2
    env[a:b] = values
    return env


def add_tone(start: float, duration: float, frequency: float, gain: float, decay=3.0):
    a = round(start * RATE)
    b = min(len(audio), a + round(duration * RATE))
    if a < 0 or b <= a:
        return
    t = np.arange(b - a) / RATE
    attack = np.minimum(1, t / 0.008)
    body = np.exp(-decay * t / max(duration, 0.001))
    audio[a:b] += gain * attack * body * (
        np.sin(2 * np.pi * frequency * t)
        + 0.22 * np.sin(2 * np.pi * frequency * 2.005 * t)
    )


def add_tick(start: float, gain=0.018):
    a = round(start * RATE)
    length = round(0.055 * RATE)
    b = min(len(audio), a + length)
    if b <= a:
        return
    t = np.arange(b - a) / RATE
    noise = rng.normal(0, 1, b - a)
    smooth = np.convolve(noise, np.ones(5) / 5, mode="same")
    audio[a:b] += gain * smooth * np.exp(-90 * t)


# A low, incomplete D-minor sonority carries the court cold open.
drone_env = envelope(0.3, 21.55, 1.4, 0.45)
name_dip = 1 - 0.82 * envelope(10.9, 12.1, 0.15, 0.5)
versus_dip = 1 - 0.72 * envelope(17.45, 18.15, 0.12, 0.35)
t = np.arange(len(audio)) / RATE
drone = np.zeros_like(audio)
for frequency, gain in [(55.0, 0.038), (73.416, 0.026), (110.0, 0.013), (146.832, 0.007)]:
    drone += gain * np.sin(2 * np.pi * frequency * t + frequency * 0.01)
audio += drone * drone_env * name_dip * versus_dip

for start in np.arange(0.65, 17.4, 0.78):
    add_tone(float(start), 0.3, 55.0, 0.032, decay=5.5)
add_tone(11.05, 0.55, 73.416, 0.075, decay=4.5)
add_tone(17.9, 0.75, 55.0, 0.085, decay=4.0)

# Title: a single resolved impact rather than a trailer-style hit.
title_env = envelope(21.68, 24.05, 0.025, 1.0)
title_chord = np.zeros_like(audio)
for frequency, gain in [(73.416, 0.055), (110.0, 0.035), (146.832, 0.024), (220.0, 0.012)]:
    title_chord += gain * np.sin(2 * np.pi * frequency * t)
audio += title_chord * title_env
add_tone(21.68, 0.7, 48.999, 0.12, decay=5.0)

# Discovery: restrained pulses; the ruling section adds dry mechanical ticks.
pulse_env = envelope(23.98, 41.05, 0.5, 0.6)
audio += drone * 0.58 * pulse_env
for start in np.arange(24.15, 33.45, 0.68):
    add_tone(float(start), 0.22, 73.416, 0.025, decay=5.5)
for start in np.arange(33.7, 41.0, 0.34):
    add_tick(float(start), 0.011 if int((start - 33.7) / 0.34) % 2 else 0.017)
add_tone(38.78, 0.6, 58.27, 0.095, decay=4.5)
add_tone(39.05, 0.4, 110.0, 0.035, decay=5.0)

# Public-record montage: three small, articulate plucks and a lighter pulse.
post_title_env = envelope(41.12, 58.55, 0.8, 0.5)
audio += drone * 0.32 * post_title_env
notes = [293.665, 349.228, 440.0, 349.228, 523.251, 440.0]
for i, start in enumerate(np.arange(41.25, 52.2, 0.76)):
    add_tone(float(start), 0.52, notes[i % len(notes)], 0.021, decay=5.8)
for start in [52.5, 54.55, 56.6]:
    add_tone(start, 0.8, 220.0, 0.025, decay=4.0)
add_tone(58.65, 0.65, 146.832, 0.045, decay=4.0)

# The question is left exposed; only a quiet open fifth remains.
question_env = envelope(60.25, 65.95, 0.7, 0.75)
question = np.zeros_like(audio)
for frequency, gain in [(73.416, 0.018), (110.0, 0.012), (220.0, 0.004)]:
    question += gain * np.sin(2 * np.pi * frequency * t)
audio += question * question_env

# Short global edge fades and conservative headroom for narration.
audio *= envelope(0, DURATION, 0.08, 0.35)
peak = float(np.max(np.abs(audio)))
if peak > 0.72:
    audio *= 0.72 / peak
pcm = (np.clip(audio, -1, 1) * 32767).astype("<i2")
OUT.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(OUT), "wb") as wav:
    wav.setnchannels(1)
    wav.setsampwidth(2)
    wav.setframerate(RATE)
    wav.writeframes(pcm.tobytes())
print(f"Wrote {OUT} ({DURATION:.2f}s, peak={np.max(np.abs(audio)):.3f})")
