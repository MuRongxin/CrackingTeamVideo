"""Register the two user-provided tracks and prepare equal-level dialogue beds."""
from pathlib import Path
import hashlib, json, shutil, subprocess, re, sys
root=Path(__file__).resolve().parents[1];repo=root.parents[1]
sha=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
write=lambda p,v:p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
folder=repo/'media/05_audio/music';folder.mkdir(parents=True,exist_ok=True)
rows=[];info={}
for code,filename,title,artist in [('a','bgm 1 ❌.mp3','❌','Ala'),('b','bgm 2 ring a bell.mp3','ring a bell','用户文件未注明作者')]:
 if len(sys.argv)>1 and code not in sys.argv[1:]:
  old=json.loads((root/'src/music/sources.json').read_text());info[code]=old[code]
  rows.extend(r for r in json.loads((root/'music-asset-provenance.json').read_text()) if r['id']=='V38_BGM_'+code+'_dialogue');continue
 src=root.parent/filename;raw=folder/f'V38_USER_BGM_{code}.mp3';shutil.copyfile(src,raw)
 record=dict(id='V38_USER_BGM_'+code,task='AU15',kind='audio',title=title,path=str(raw.relative_to(repo)),derived_from=str(src.relative_to(repo)),source_sha256=sha(src),source_page='用户提供本地文件',author=artist,rights='用户提供用于本片配乐；原曲权利保留，公开使用条件未另行核实',status='exported',sha256=sha(raw),bytes=raw.stat().st_size)
 write(raw.with_suffix('.mp3.meta.json'),record)
 # Pre-measured values refer to the same high-pass and dialogue-band EQ.
 cache=folder/f'V38_USER_BGM_{code}.analysis.json'
 if cache.exists() and json.loads(cache.read_text()).get('source_sha256')==sha(src):
  stats=json.loads(cache.read_text())['measurement']
 else:
  log_path=root/f'.qa/bgm-{code}-level.txt'
  if log_path.exists():log=log_path.read_text()
  else:
   result=subprocess.run(['ffmpeg','-hide_banner','-nostats','-i',str(src),'-map','0:a:0','-af','highpass=f=65,equalizer=f=2200:t=q:w=0.8:g=-3,loudnorm=I=-18:TP=-2:LRA=11:print_format=json','-f','null','-'],capture_output=True,text=True,check=True);log=result.stderr
  stats=json.loads(re.findall(r'\{\s*"input_i".*?\}',log,re.S)[-1]);write(cache,dict(source_sha256=sha(src),measurement=stats))
 dst=folder/f'V38_BGM_{code}_dialogue.m4a'
 af=f"highpass=f=65,equalizer=f=2200:t=q:w=0.8:g=-3,loudnorm=I=-21:TP=-2:LRA=11:measured_I={stats['input_i']}:measured_TP={stats['input_tp']}:measured_LRA={stats['input_lra']}:measured_thresh={stats['input_thresh']}:offset=0:linear=true"
 if code=='a':af+=',atrim=start=0:end=130.7,asetpts=PTS-STARTPTS'
 subprocess.run(['ffmpeg','-v','error','-y','-i',str(src),'-map','0:a:0','-af',af,'-ar','48000','-ac','2','-c:a','aac','-b:a','192k','-movflags','+faststart',str(dst)],check=True)
 probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-of','json',str(dst)]));duration=float(probe['format']['duration'])
 m=dict(record,id='V38_BGM_'+code+'_dialogue',path=str(dst.relative_to(repo)),derived_from=str(raw.relative_to(repo)),source_sha256=sha(raw),status='exported',sha256=sha(dst),bytes=dst.stat().st_size,note='48kHz立体声AAC；65Hz高通、2.2kHz轻削减，统一约-21 LUFS；原速，源MP3未修改。',filters=af,selected_range_seconds=[0,130.7] if code=='a' else [0,duration],trim_note='BGM1去掉130.7秒后的衰减及长静音；原始MP3保留' if code=='a' else 'BGM2保留完整曲长')
 write(dst.with_suffix('.m4a.meta.json'),m)
 public=root/f'public/v38/music/{code}.m4a';public.parent.mkdir(exist_ok=True,parents=True);shutil.copyfile(dst,public)
 rows.append(dict(m,path=str(public.relative_to(repo)),ledger_path=str(dst.relative_to(repo))))
 info[code]=dict(title=title,artist=artist,file=f'v38/music/{code}.m4a',duration=duration,sha256=sha(dst))
write(root/'music-asset-provenance.json',rows);write(root/'src/music/sources.json',info)
print('Prepared two user music sources, 48kHz stereo dialogue beds.')
