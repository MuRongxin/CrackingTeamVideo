# Caption wording follows the manuscript; phrase boundaries may be fine-tuned in JSON.
import json,re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
phrases=[
'2025 年 10 月 14 日|一款六年前的老游戏',
'出现了一个新的破解版本',
'《全面战争：三国》',
'署名是 voices38',
'随它一起发布的|还有一份 NFO',
'也就是破解组附在发行里的说明文件',
'在老一代破解组那里|NFO 往往是一件作品',
'字符拼成的大幅 Logo|成员名单|组织口号',
'有时还有写给对手的挑衅',
'voices38 的这一份|只有 0.34 KB',
'内容只有几行|游戏已经更新到最新版本|包含全部 DLC',
'然后是怎么切换游戏语言|下面列着十几个语言代码',
'而它附带的游戏本体|大约 40 GB',
'《三国》不是新游戏',
'2019 年|国内玩家常说的 C 组|CODEX 就发布过它的版本',
'2020 年|人称“女皇”的 EMPRESS|也发过相关版本',
'不过 Reddit 上有人解释|旧的破解停在了旧版本上',
'后来的更新加不进去',
'voices38 处理的|是最新的那一版',
'这一版用的保护|叫 Denuvo',
'Denuvo 不是 Steam|那样的正版验证本身',
'而是包在验证外面的一层反篡改保护|让验证没那么容易被绕开',
'它最在乎的|是游戏首发后卖得最好的那几个月',
'2017 年|《生化危机7》的保护被突破后',
'Denuvo 还对媒体说过|就算被破解了|有保护也比没有强',
'所以一款 2019 年的游戏|本来不太会成为新闻',
'让它上了新闻的|是发布者留下的一段话',
'据同期报道转述|voices38 说',
'自己花了很多时间|逆向研究 Denuvo',
'他还翻出很多旧的破解',
'看别人当年是怎么做的',
'因为好像已经没人在乎这件事了',
'他说这是他的第一次尝试',
'俄罗斯游戏媒体 iXBT|报道这件事时',
'开头第一句写的是|EMPRESS 正在退场|别的技术爱好者还在工作',
'一个半月后|EMPRESS 发布了正式的告别声明',
'Reddit 上|有人发了一张梗图',
'标题只有两个词|we won？',
'我们赢了？',
'评论区里有人解释来龙去脉|写了一句 Voices cracked',
'马上就有人接话|说这是故意的吧',
'英语里 voice cracks|是“破音”的意思',
'也有人泼冷水|这些游戏用的都是老版本的 Denuvo',
'别以为新游戏很快也能这样',
'这条提醒|大约管用了五个月',
]
voices=json.loads((root/'src/act2/voice-manifest.json').read_text());out={}
for v,text in zip(voices,phrases):
 parts=text.split('|');weights=[len(re.sub(r'[a-zA-Z0-9.]+','音音',s).replace(' ','')) for s in parts];total=sum(weights);at=40;length=v['duration']*1000-110;rows=[]
 for part,weight in zip(parts,weights):
  assert len(part)<=20,part
  end=at+length*weight/total
  rows.append({'text':part.rstrip('，。；：？！'),'startMs':round(at),'endMs':round(end),'timestampMs':None,'confidence':None});at=end
 out[str(v['id'])]=rows
(root/'src/act2/captions.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
