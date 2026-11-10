"""Import the current recording set and captions from the current storyboard."""
from pathlib import Path
import wave,json,shutil,hashlib,re
root=Path(__file__).resolve().parents[1];repo=root.parents[1];source=root.parent/'videoVoices';public=root/'public/v38/vo'
records=[]
for n in range(1,54):
 candidates=list(source.glob(f'sentence_{n:02}_*.wav'))
 if len(candidates)!=1:raise ValueError(f'Expected one current recording for sentence {n}, got {candidates}')
 src=candidates[0];dst=public/f'sentence-{n:02}.wav';shutil.copyfile(src,dst)
 with wave.open(str(src)) as w:duration=w.getnframes()/w.getframerate()
 records.append({'id':n,'file':f'v38/vo/sentence-{n:02}.wav','duration':duration,'original':src.name,'source':str(src.relative_to(repo)),'sha256':hashlib.sha256(dst.read_bytes()).hexdigest()})
for path,rows in [('src/voice-manifest.json',records[:11]),('src/act2/voice-manifest.json',records[11:])]:
 (root/path).write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
# These phrases keep manuscript wording and use known pauses in supplied audio.
phrases=[
'2026 年 9 月|美国加州北区联邦地区法院|收到了一份起诉书',
'原告是一家奥地利公司|Denuvo GmbH',
'被告一栏|只有一个奇怪的名字|voices38',
'起诉书对被告的描述是|身份不明的个人或实体',
'换句话说|Denuvo 起诉了一个|连他们都不知道是谁的人',
'因此它请求法院允许它|向 Discord、Valve|和 Reddit 发出传票|弄清楚这个账号背后的人|比如叫什么|住在哪|怎么联系',
'最初的请求有 46 项|法官认为范围太宽|过于涉及个人隐私',
'最后 Denuvo 把请求缩成了 9 项',
'我准备了很多有关 voices38 的内容|大部分是 voices38 自己公开的|虽然我们证明不了他是谁|但通过这些东西|我们能看出来他是怎样做事的',
'在他自己发布的文件里|voices38 一直用第一人称说话|所以这期视频|我们也用“他”来指代这个名字',
'至于“voices38”这个符号背后|是一个人还是一个团队|目前连苦主 Denuvo 都不清楚',
'2025 年 10 月 14 日|一款六年前的老游戏|《全面战争：三国》|出现了一个新的破解版本|v1.7.1',
'发布者的署名是 voices38',
'随它一起发布的|还有一份 NFO|也就是破解组附在发行里的说明文件',
'在老一辈破解组那里|NFO 往往是一件作品',
'有字符拼成的大幅 Logo|成员名单|组织口号|有时还有写给对手的挑衅',
'但 voices38 的这一份|和前辈们比起来微不足道|只有 0.34 KB',
'内容仅仅几行文字|只是告诉大家|游戏已经更新到最新版本|包含全部 DLC',
'说明了切换游戏语言的方式|并且列出了十几个语言代码',
'《三国》不是新游戏',
'2019 年|国内玩家常说的 C 组——CODEX|就发布过它的版本',
'2020 年|人称“女皇”的 EMPRESS|也发过相关版本',
'voices38 现在又发布了一次|让人有点摸不到头脑',
'不过 Reddit 上有人解释|旧的破解使用的是旧版本|后来更新的内容没有加进去|voices38 处理的|是最新的那一版',
'最新一版使用了新的保护方式|Denuvo|也就是俗称的 D 加密',
'Denuvo 不是类似于 Steam|那样的正版验证|而是包在验证外面的一层反篡改保护|让游戏的正版验证没那么容易被绕开',
'Denuvo 并不需要让一款游戏永远无法破解',
'对发行商来说|更重要的是游戏发售后的那段时间|销量最集中的首发窗口',
'只要能尽可能推迟盗版版本的出现|这层保护就有了商业价值',
'2017 年 1 月 24 日|《生化危机 7》发售',
'五天后|破解组织 CPY 就突破了它的|Denuvo 保护',
'面对这次迅速失守|Denuvo 的市场总监回应说|未经保护的游戏往往在发售当天就会被破解',
'相比之下|《生化危机 7》至少多撑了几天|所以这套保护仍然发挥了作用',
'虽然听着有点不优雅|但这就是 Denuvo 的逻辑|它不必永远挡住破解|只需要尽可能把破解出现的时间往后推',
'所以 2025 年 10 月|一款已经发售六年的老游戏|重新出现一个针对新版本的破解|本来不会带来多少热度',
'让它上了新闻的|是发布者 voices38 公开表示|好像已经没人在乎 D 加密的破解了|自己将会接过这个使命',
'并且自己已经花了很多时间|逆向研究 Denuvo 和很多前辈的工作',
'这只是自己的第一次尝试',
'俄罗斯游戏媒体 iXBT 报道这件事时|把它放在了 EMPRESS 退场的背景下|EMPRESS 正在退场|新的接力者已经出现',
'一个半月后|EMPRESS 发布了正式的告别声明',
'这让 voices38 的出现|多了一层别样的意味',
'这些变化引起了破解社区的一些讨论',
'Reddit 上有人发了一张梗图|标题只有两个词|we won|我们赢了',
'这句话多少带着一点玩笑',
'EMPRESS 正在离开|而一个新的破解者刚刚出现|似乎事情又有了转机',
'评论区里有人接了一句|Voices cracked',
'这是个双关',
'一方面 voices38 破解了游戏',
'另一方面英语里的 voice crack|指的是声音突然破掉|也就是我们说的「破音」',
'当然也不是所有人都急着庆祝',
'有人提醒大家|voices38 目前处理的还是|旧版本的 Denuvo',
'能破解这些游戏|不代表他已经有能力对付那些|使用更新版本保护的新游戏',
'这个判断是否准确|当时还没人知道',
]
# Break at punctuation-aligned long pauses where they were measured. Other
# phrase timings are weighted initial alignment, editable in the caption JSON.
anchors={6:[0,1.6,2.95,5.0,7.18,7.8,8.67,9.416],9:[0,2.9,5.8,7.7,8.98,10.974],24:[0,1.7,3.7,5.86,7.58,8.696],26:[0,1.85,2.8,5.7,8.417],39:[0,2.88,5.6,6.9,8.8],43:[0,2.1,3.37,4.02,4.748],49:[0,2.08,3.65,5.143]}
allcaps={}
for record,text in zip(records,phrases):
 parts=text.split('|');d=record['duration']
 # Fit long English names in at most two subtitle lines without altering words.
 weights=[max(1,len(re.sub(r'[A-Za-z0-9.]+','音音',p).replace(' ',''))) for p in parts]
 edges=anchors.get(record['id'])
 if not edges:
  total=sum(weights);at=.02;edges=[at]
  for weight in weights:at+=(d-.08)*weight/total;edges.append(at)
 assert len(edges)==len(parts)+1,(record['id'],edges,parts)
 rows=[]
 for part,a,b in zip(parts,edges,edges[1:]):
  if len(part)>20:
   # Natural word boundary where available, otherwise Chinese phrase midpoint.
   split=part.rfind(' ',0,21)
   if split<7:split=min(19,len(part)//2)
   part=part[:split].rstrip()+'\n'+part[split:].lstrip()
  assert max(map(len,part.split('\n')))<=24,part
  rows.append({'text':part,'startMs':round(a*1000),'endMs':min(round(b*1000),round(d*1000)),'timestampMs':None,'confidence':None})
 allcaps[str(record['id'])]=rows
for path,ids in [('src/captions.json',range(1,12)),('src/act2/captions.json',range(12,54))]:
 (root/path).write_text(json.dumps({str(i):allcaps[str(i)] for i in ids},ensure_ascii=False,indent=2)+'\n')
provenance=root/'current-voice-provenance.json'
later=[v for v in json.loads(provenance.read_text()) if v['id']>=54] if provenance.exists() else []
provenance.write_text(json.dumps(records+later,ensure_ascii=False,indent=2)+'\n')
# Keep the scene asset ledgers on the current voice generation.
for name,subset in [('asset-provenance.json',records[:11]),('act2-asset-provenance.json',records[11:])]:
 ledger=root/name;prior=json.loads(ledger.read_text())
 prior=[r for r in prior if '/public/v38/vo/' not in r['path'] and not r['path'].endswith(('/sfx/water.wav','/sfx/stretch.wav'))]
 prior.extend({'path':str((root/'public'/v['file']).relative_to(repo)),'derived_from':v['source'],'status':'copied','note':'新版 videoVoices 录音；原速原样；以视频脚本为字幕对词依据','sha256':v['sha256']} for v in subset)
 if name=='act2-asset-provenance.json':
  dst=root/'public/v38/act2/stills/three-kingdoms.jpg'
  if dst.exists():
   record={'path':str(dst.relative_to(repo)),'derived_from':'media/03_stills/official_games/EX15_779340_screenshot1.jpg','status':'copied','note':'官方静帧；用于短片不足覆盖镜头的缓推画面','sha256':hashlib.sha256(dst.read_bytes()).hexdigest()}
   prior=[r for r in prior if r['path']!=record['path']]+[record]
 ledger.write_text(json.dumps(prior,ensure_ascii=False,indent=2)+'\n')
print('Synced current recordings 01–53; audio 09 split point is 5.8 seconds, inside the measured pause.')
