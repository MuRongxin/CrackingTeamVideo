import { useTime, lerp } from "../components";
import { C, F } from "../style";
import type { ShotTiming } from "../timing";
import { GroupMark } from "../act6/Picture";
import { say } from "./timing";
import { Stage, Source, Logo } from "./Stage";
import {
  Beat,
  Tag,
  Line,
  Archive,
  Rule,
  NumberDate,
  pos,
  mono,
  lin,
  red,
  mint,
} from "./Motion";

type Props = { timing: ShotTiming };
export const EarlyDiscovery = ({ timing }: Props) => {
  const t = useTime(),
    before = say(timing, 237, "在正常"),
    send = say(timing, 237, "先向");
  return (
    <Stage
      name="A9-01 · 提前取证"
      source="Denuvo 提前取证申请 · TorrentFreak · 2026-10-06"
    >
      <Beat to={before} name="申请原件" paper>
        <Tag>2026.10 / 提前取证申请</Tag>
        <Archive name="motion" y={220} width={1660} />
        <Line style={{ top: 650, fontSize: 112 }}>寻找名字背后的人</Line>
        <Rule at={1.4} />
      </Beat>
      <Beat from={before} to={send} name="提前到正常程序之前">
        <Archive
          name="motion"
          x={-200}
          y={190}
          width={2200}
          style={{ opacity: 0.16 }}
        />
        <Line style={{ left: 170, top: 290, fontSize: 125 }}>
          在正常取证
          <br />
          <span style={{ color: C.yellow }}>开始之前</span>
        </Line>
        <div
          style={{
            ...pos,
            left: 0,
            top: 730,
            width: 1920 * lerp(t, before, before + 0.5),
            height: 7,
            background: C.yellow,
          }}
        />
      </Beat>
      <Beat from={send} name="传票指向三平台" paper>
        <Tag>申请发出传票</Tag>
        {(["discord", "valve", "reddit"] as const).map((n, i) => {
          const p = lerp(t, send + i * 0.25, send + 0.55 + i * 0.25);
          return (
            <div
              key={n}
              style={{
                ...pos,
                left: 160 + i * 570,
                top: 290 + (1 - p) * 400,
                opacity: p,
                transform: `scale(${0.85 + p * 0.15})`,
              }}
            >
              <Logo name={n} width={440} style={{ height: 160 }} />
              <div
                style={{
                  width: 440,
                  height: 3,
                  marginTop: 100,
                  background: red,
                  scale: `${p} 1`,
                  transformOrigin: "left",
                }}
              />
            </div>
          );
        })}
        <Line style={{ top: 660, fontSize: 74, color: red }}>
          Discord → Valve → Reddit
        </Line>
      </Beat>
    </Stage>
  );
};

export const PriorContact = ({ timing }: Props) => {
  const t = useTime(),
    no = say(timing, 239),
    silent = say(timing, 240),
    q = lin(t, no, silent);
  return (
    <Stage
      name="A9-02 · 直接找过平台"
      source="TorrentFreak · 转述 Denuvo 的申请材料"
    >
      <Beat to={no} name="直接联系的原文" paper>
        <Tag>在申请传票之前</Tag>
        <Logo
          name="denuvo"
          width={360}
          style={{ ...pos, left: 110, top: 140, height: 110 }}
        />
        <Archive name="platform-response" y={320} width={1740} />
        <Line style={{ top: 740, fontSize: 58 }}>先直接找过三家公司</Line>
      </Beat>
      <Beat from={no} to={silent} name="隐私政策阻断">
        <Tag light>Valve / Reddit 的回复</Tag>
        <div
          style={{
            ...pos,
            left: 120,
            top: 290,
            background: C.paper,
            padding: "25px 35px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Logo name="valve" width={370} />
          <Logo name="reddit" width={370} style={{ marginTop: 70 }} />
        </div>
        <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
          <path
            d="M620 475H1050"
            stroke={mint}
            strokeWidth="5"
            strokeDasharray="14 12"
            strokeDashoffset={-q * 150}
          />
          <path d="M1080 275V675" stroke={red} strokeWidth="12" />
          <path d="M1090 475H1760" stroke="#79909944" strokeWidth="3" />
        </svg>
        <Line style={{ left: 1180, top: 340, fontSize: 78 }}>
          需要
          <br />
          <span style={{ color: C.yellow }}>法律依据</span>
        </Line>
        <Line style={{ left: 1180, top: 610, fontSize: 35, color: "#a2b7be" }}>
          隐私政策不允许交出资料
        </Line>
      </Beat>
      <Beat from={silent} name="Discord未回复">
        <Logo
          name="discord"
          width={740}
          style={{
            ...pos,
            left: 590,
            top: 250,
            height: 200,
            filter: "brightness(0) invert(1)",
          }}
        />
        <Line
          style={{
            left: 0,
            width: 1920,
            top: 560,
            textAlign: "center",
            fontSize: 100,
            color: "#a2b7be",
          }}
        >
          未回复
        </Line>
        <div
          style={{
            ...pos,
            left: 900,
            top: 740,
            width: 120,
            height: 3,
            background: mint,
          }}
        />
      </Beat>
    </Stage>
  );
};

export const DataScope = ({ timing }: Props) => {
  const t = useTime(),
    s = say(timing, 242),
    cuts = [0, s + 1.68, s + 3.65, s + 4.82, timing.duration],
    pull = lerp(t, timing.duration - 1.15, timing.duration - 0.2);
  const items = [
    ["账号 / IP 地址", "request-scope", "discord"],
    ["付款 / 交易记录", "request-payment", "valve"],
    ["登录日志", "request-scope", "valve"],
    ["全部帖子 / 评论", "request-posts", "reddit"],
  ] as const;
  return (
    <Stage
      name="A9-03 · 请求的数据"
      source="TorrentFreak · Denuvo 的原始数据请求"
    >
      {items.map(([label, source, brand], i) => (
        <Beat
          key={label}
          from={cuts[i]}
          to={cuts[i + 1]}
          name={`请求加码 ${label}`}
          paper={i % 2 === 0}
        >
          <div
            style={{
              ...pos,
              inset: 0,

              transformOrigin: "50% 50%",
            }}
          >
            <Tag light={i % 2 === 1}>原始请求 / {i + 1} of 4 类别</Tag>
            <div
              style={{
                ...pos,
                right: 120,
                top: 60,
                padding: "5px 20px",
                background: C.paper,
              }}
            >
              <Logo name={brand} width={260} style={{ height: 75 }} />
            </div>
            <Line
              style={{
                top: 185,
                fontSize: i === 3 ? 126 : 140,
                color: i % 2 ? C.white : C.ink,
                translate: `${(1 - lerp(t, cuts[i], cuts[i] + 0.35)) * -700}px 0`,
              }}
            >
              {label}
            </Line>
            <Archive name={source} x={180} y={440} width={1650} />
            <div
              style={{
                ...pos,
                left: 110,
                top: 790,
                width: 1650 * lin(t, cuts[i], cuts[i + 1]),
                height: 6,
                background: i % 2 ? mint : red,
              }}
            />
          </div>
          {i === 3 && (
            <div
              style={{
                ...pos,
                left: 100,
                top: 755,
                display: "flex",
                gap: 45,
                opacity: pull,
                fontSize: 34,
                color: mint,
              }}
            >
              {items.map(([x]) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          )}
        </Beat>
      ))}
    </Stage>
  );
};

export const ProceduralOrder = ({ timing }: Props) => {
  const t = useTime(),
    issue = say(timing, 244),
    required = say(timing, 244, "按规定"),
    missing = say(timing, 244, "Denuvo"),
    remind = say(timing, 245),
    last = say(timing, 245, "接下来");
  return (
    <Stage
      name="A9-04 · 先补拟议命令"
      source="加州北区联邦法院命令 · 2026-10-08"
    >
      <Beat to={issue} name="签发的法院命令" paper>
        <Tag>美国加州北区联邦法院</Tag>
        <div style={{ ...pos, left: 110, top: 180, width: 620, overflow: "hidden" }}>
          <div style={{ ...mono, fontSize: 27, color: "#879593", letterSpacing: 4 }}>2026 / OCTOBER</div>
          <NumberDate style={{ position: "relative", left: 0, top: 25, color: red,
            fontSize: 185, translate: `0 ${lerp(t, 0, 0.48, 160, 0)}px` }}>10.08</NumberDate>
        </div>
        <div style={{ ...pos, left: 115, top: 490, width: 520, height: 3,
          background: red, transformOrigin: "left", scale: `${lerp(t, 0.2, 0.9)} 1` }} />
        <Line style={{ top: 550, fontSize: 80 }}>法院发出命令</Line>
        <div style={{ ...pos, left: 115, top: 675, fontSize: 31, color: "#677774",
          opacity: lerp(t, 0.6, 1) }}>Haywood S. Gilliam Jr. 签发</div>
        <div style={{ ...pos, left: 820, top: 170, width: 995, height: 630,
          background: "white", boxShadow: "0 30px 65px #1113",
          translate: `0 ${lerp(t, 0, 0.6, 190, 0)}px`,
          clipPath: `inset(0 0 ${100 * (1 - lerp(t, 0, 0.65))}% 0)` }}>
          <div style={{ ...mono, position: "absolute", left: 45, top: 30,
            fontSize: 22, color: "#75817e" }}>CASE 4:26-cv-10423-HSG / DOCUMENT 24</div>
          <Archive name="procedure" x={45} y={135} width={905} />
          <div style={{ position: "absolute", left: 45, right: 45, top: 370, borderTop: "1px solid #ccc" }} />
          <Archive name="judge-signature" x={340} y={415} width={605} />
        </div>
      </Beat>
      <Beat from={issue} to={missing} name="原件里的程序要求" paper>
        <Tag>法院要求 / 程序问题</Tag>
        <Archive name="procedure" x={100} y={270} width={1720} />
        <Line
          style={{
            top: 640,
            fontSize: 110,
            opacity: lerp(t, required, required + 0.35),
          }}
        >
          应当附上：拟议命令
        </Line>
        <Rule at={required} />
      </Beat>
      <Beat from={missing} to={remind} name="缺失的附件">
        <Tag light>提前取证 / 申请与附件</Tag>
        <Archive name="procedure" x={-200} y={80} width={2300} style={{ opacity: 0.1 }} />
        <div style={{ ...pos, left: 180, top: 265, width: 490, height: 390,
          background: C.paper, color: C.ink, boxShadow: "0 20px 60px #0006",
          translate: `${lerp(t, missing, missing + 0.55, -220, 0)}px 0` }}>
          <div style={{ ...mono, padding: "35px 40px", fontSize: 22, color: red }}>FILED / 申请</div>
          <div style={{ padding: "20px 40px", fontSize: 65 }}>提前取证</div>
          {[0,1,2].map(i=><div key={i} style={{ margin: "20px 40px", height: 2,
            width: 365-i*40, background: "#16213a35" }} />)}
        </div>
        <svg width={1920} height={1080} style={pos}>
          <path d="M690 460 H1060" stroke={mint} strokeWidth={4} fill="none"
            strokeDasharray="10 14" strokeDashoffset={-Math.min(0.8, t-missing)*150} />
          <path d="M1030 440 L1060 460 L1030 480" fill="none" stroke={mint} strokeWidth={4} />
        </svg>
        <div style={{ ...pos, left: 1100, top: 265, width: 610, height: 390,
          border: `3px dashed ${red}`, opacity: lerp(t, missing+0.2, missing+0.5),
          clipPath: `inset(0 ${100*(1-lerp(t, missing+0.2, missing+0.7))}% 0 0)` }}>
          <div style={{ ...mono, padding: "35px 40px", fontSize: 22, color: mint }}>REQUIRED / 拟议命令</div>
          <div style={{ padding: "25px 40px", fontSize: 100, color: C.yellow }}>没有附上</div>
        </div>
      </Beat>
      <Beat from={remind} name="补交并遵守规定" paper>
        <Tag>法院要求补交</Tag>
        <Line
          style={{
            top: 175,
            fontSize: 105,
            opacity: 1 - lerp(t, last, last + 0.35),
          }}
        >
          补交拟议命令
        </Line>
        <Archive name="reminder" x={70} y={400} width={1760} />
        <Archive name="judge-signature" x={1120} y={590} width={650} />
        <Line
          style={{
            top: 190,
            fontSize: 98,
            opacity: lerp(t, last, last + 0.35),
          }}
        >
          遵守法院规定
        </Line>
        <Rule at={last} top={540} />
      </Beat>
    </Stage>
  );
};

export const Privacy = ({ timing }: Props) => {
  const t = useTime(),
    why = say(timing, 247),
    purpose = say(timing, 247, "只是为了"),
    question = say(timing, 247, "为什么"),
    warning = say(timing, 248),
    q = lerp(t, purpose, purpose + 0.7);
  return (
    <Stage
      name="A9-05 · 为什么需要这么多"
      source="加州北区联邦法院命令 · 取证范围与隐私"
    >
      <Beat to={purpose} name="命令继续往下" paper>
        <Tag>然后才是重点</Tag>
        <Archive name="privacy" y={180} width={1580} />
        <div
          style={{
            ...pos,
            left: 0,
            top: 0,
            height: 1080,
            width: 1920,
            background: "linear-gradient(0deg,#f3efe4,transparent 45%)",
          }}
        />
        <Line style={{ top: 740, fontSize: 86 }}>为什么要这么多？</Line>
      </Beat>
      <Beat from={purpose} to={question} name="有限的两个目的">
        <Tag light>提前取证 / 有限目的</Tag>
        <div
          style={{
            ...pos,
            left: 130,
            top: 390,
            transform: `scale(${1 - q * 0.12})`,
          }}
        >
          <GroupMark name="voices38" width={570} />
        </div>
        <svg width="1920" height="1080" style={{ ...pos, inset: 0 }}>
          <path
            d="M700 460C900 460 880 300 1120 300M700 460C900 460 880 620 1120 620"
            fill="none"
            stroke={mint}
            strokeWidth="4"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - q}
          />
        </svg>
        <Line style={{ left: 1180, top: 235, fontSize: 100, opacity: q }}>
          识别被告
        </Line>
        <Line
          style={{
            left: 1180,
            top: 555,
            fontSize: 100,
            opacity: lerp(t, purpose + 0.65, purpose + 1.2),
          }}
        >
          完成送达
        </Line>
      </Beat>
      <Beat from={question} to={warning} name="请求越过目的边界">
        <Archive
          name="request-scope"
          x={-360}
          y={140}
          width={1900}
          style={{ opacity: 0.15 }}
        />
        <Archive
          name="request-posts"
          x={600}
          y={590}
          width={1800}
          style={{ opacity: 0.18 }}
        />
        <Line style={{ left: 170, top: 300, fontSize: 145 }}>
          为什么需要
          <br />
          <span style={{ color: C.yellow }}>这么多数据？</span>
        </Line>
      </Beat>
      <Beat from={warning} name="法院指出隐私顾虑" paper>
        <Tag>法院指出：超出识别所需范围</Tag>
        <Archive
          name="privacy"
          x={80}
          y={170}
          width={1750}
          style={{ clipPath: "inset(0 0 43% 0)" }}
        />
        <div
          style={{
            ...pos,
            inset: 0,
            background: "linear-gradient(0deg,#f3efe4 28%,transparent 55%)",
          }}
        />
        <Archive name="privacy-line" x={110} y={560} width={1560} />
        <Line style={{ top: 735, fontSize: 85, color: red }}>
          可能带来严重隐私问题
        </Line>
        <Rule at={warning + 1.4} top={845} />
      </Beat>
    </Stage>
  );
};

export const Narrowing = ({ timing }: Props) => {
  const t = useTime(),
    narrow = say(timing, 250),
    remove = say(timing, 251),
    keep = say(timing, 251, "只剩下"),
    p = lerp(t, narrow + 0.65, narrow + 1.65);
  return (
    <Stage
      name="A9-06 · 46缩成9"
      source="Denuvo 修改后的取证申请 · TorrentFreak"
    >
      <Beat to={remove} name="撤去三十七项请求">
        <Tag light>修改申请</Tag>
        <div
          style={{
            ...pos,
            left: 110,
            top: 260,
            width: 1320,
            transform: `perspective(1600px) rotateY(${-9 + p * 9}deg) scale(${1 + p * 0.1})`,
          }}
        >
          {Array.from({ length: 46 }, (_, i) => {
            const k = lerp(
              t,
              narrow + 0.5 + (i % 9) * 0.055,
              narrow + 1.2 + (i % 9) * 0.055,
            );
            return (
              <div
                key={i}
                style={{
                  ...pos,
                  left: (i % 8) * 145,
                  top: Math.floor(i / 8) * 88 + (i < 9 ? 0 : k * 900),
                  width: 118,
                  height: 67,
                  background: i < 9 ? mint : "#c9d1cc",
                  opacity: i < 9 ? 1 : 1 - k,
                  transform: `rotate(${i < 9 ? 0 : k * (i % 2 ? 18 : -18)}deg)`,
                }}
              />
            );
          })}
        </div>
        <NumberDate style={{ left: 1430, top: 295, fontSize: 280 }}>
          {Math.round(46 - 37 * p)}
        </NumberDate>
        <Line style={{ left: 1475, top: 620, fontSize: 50 }}>项请求</Line>
      </Beat>
      <Beat from={remove} to={keep} name="删除资料类别">
        {["付款、交易", "登录日志", "帖子和评论"].map((x, i) => {
          const k = lerp(t, remove + i * 0.8, remove + 0.5 + i * 0.8);
          return (
            <div
              key={x}
              style={{
                ...pos,
                left: 170 + i * 230,
                top: 175 + i * 190,
                fontSize: 112,
                translate: `${-k * 65}px 0`,
                color: k > 0.8 ? "#6e7e83" : C.white,
              }}
            >
              {x}
              <div
                style={{
                  ...pos,
                  left: -40,
                  top: 70,
                  width: 1100 * k,
                  height: 9,
                  background: red,
                  rotate: "-4deg",
                }}
              />
            </div>
          );
        })}
      </Beat>
      <Beat from={keep} name="留下身份与联系方式" paper>
        <Tag>保留下来的请求</Tag>
        <Archive name="revised" x={80} y={225} width={1780} />
        <Line style={{ top: 590, fontSize: 116 }}>身份 / 联系方式</Line>
        <div
          style={{
            ...pos,
            left: 110,
            top: 770,
            ...mono,
            fontSize: 35,
            color: red,
          }}
        >
          1 Discord + 1 Reddit + 7 Steam
        </div>
      </Beat>
    </Stage>
  );
};

export const Pseudonym = ({ timing }: Props) => {
  const t = useTime(),
    quote = say(timing, 252, "它手里"),
    mark = say(timing, 252, "Denuvo");
  return (
    <Stage
      name="A9-07 · 只有一个化名"
      source="Denuvo 修改后的取证申请"
    >
      <Beat to={quote} name="从段落靠近原句" paper>
        <Tag>修改申请 / Denuvo 写道</Tag>
        <Archive name="pseudonym-context" x={70} y={220} width={1800} />
        <div
          style={{
            ...pos,
            inset: 0,
            background: "linear-gradient(0deg,#f3efe4 24%,transparent 50%)",
          }}
        />
        <Archive
          name="pseudonym-line"
          x={110}
          y={650}
          width={1450}
          style={{ opacity: lerp(t, mark, mark + 0.4) }}
        />
      </Beat>
      <Beat from={quote} name="化名留下">
        <Tag light>ONLY A PSEUDONYM</Tag>
        <div
          style={{
            ...pos,
            left: 500,
            top: 290,
          }}
        >
          <GroupMark name="voices38" width={920} />
        </div>
        <Line
          style={{
            left: 0,
            width: 1920,
            top: 630,
            fontSize: 120,
            textAlign: "center",
            color: C.yellow,
          }}
        >
          只有一个化名
        </Line>
      </Beat>
    </Stage>
  );
};

export const Permission = ({ timing }: Props) => {
  const t = useTime(),
    deadline = say(timing, 254),
    p = lerp(t, deadline, deadline + 0.65);
  return (
    <Stage
      name="A9-08 · 批准与期限"
      source="法院准许取证命令 · 2026-10-16 · TorrentFreak"
    >
      <Beat to={deadline} name="准许有限取证" paper>
        <Tag>2026.10.16 / 法院批准修改后的请求</Tag>
        <Archive name="grant" x={150} y={180} width={1620} />
      </Beat>
      <Beat from={deadline} name="翻到资料期限">
        <Tag light>资料提交期限</Tag>
        <div
          style={{
            ...pos,
            left: 320,
            top: 220,
            width: 1280,
            height: 540,
            overflow: "hidden",
            borderTop: `3px solid ${mint}`,
            borderBottom: `3px solid ${mint}`,
          }}
        >
          <NumberDate
            style={{
              left: 130,
              top: -p * 600 + 105,
              fontSize: 300,
              color: "#78939c",
            }}
          >
            10.16
          </NumberDate>
          <NumberDate
            style={{ left: 130, top: 105 + (1 - p) * 600, fontSize: 300 }}
          >
            11.03
          </NumberDate>
        </div>
        <div
          style={{
            ...pos,
            left: 1550,
            top: 475,
            width: 24,
            height: 24,
            border: `4px solid ${mint}`,
            borderRadius: "50%",
          }}
        />
      </Beat>
    </Stage>
  );
};
