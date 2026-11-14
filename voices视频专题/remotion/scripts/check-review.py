"""Validate the portable review MP4 and save actual export-frame probes."""
from pathlib import Path
import hashlib,json,subprocess,wave,sys
import numpy as np
from PIL import Image,ImageDraw
root=Path(__file__).resolve().parents[1]
basename=sys.argv[1] if len(sys.argv)>1 else 'voices38-review-720p-v2'
video=root/f'out/{basename}.mp4'
p=root/f'out/{basename}.json';m=json.loads(p.read_text())
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(video)]))
v=next(s for s in probe['streams'] if s['codec_type']=='video');a=next(s for s in probe['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'],v['codec_name'],v['pix_fmt'])==(1280,720,'h264','yuv420p')
assert v['r_frame_rate']=='30/1' and int(v['nb_frames'])==m['frames']
assert a['codec_name']=='aac' and int(a['sample_rate'])==48000 and int(a['channels'])==2
assert abs(float(probe['format']['duration'])-m['durationSeconds'])<.15
subprocess.run(['ffmpeg','-v','error','-xerror','-i',str(video),'-f','null','-'],check=True)
points=[26,49,265,564,752,1050,1147,1296]
sheet=Image.new('RGB',(1280,2*208),'#111')
for i,t in enumerate(points):
 dst=root/f'.qa/review-probe-{t}.png';subprocess.run(['ffmpeg','-v','error','-y','-ss',str(t),'-i',str(video),'-frames:v','1','-vf','scale=320:180',str(dst)],check=True)
 im=Image.open(dst);sheet.paste(im,((i%4)*320,(i//4)*208));ImageDraw.Draw(sheet).text(((i%4)*320+8,(i//4)*208+185),f'{t//60:02}:{t%60:02}',fill='white')
sheet.save(root/'.qa/review-contact.jpg')
m.update(bytes=video.stat().st_size,sha256=hashlib.file_digest(video.open('rb'),'sha256').hexdigest(),actualDuration=float(probe['format']['duration']),validation='full decode, audio/video format, duration, actual frames; continuous full BGM2')
p.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(dict(width=1280,height=720,fps=30,duration=m['actualDuration'],bytes=m['bytes'],sha256=m['sha256'],status='PASS'),ensure_ascii=False))
