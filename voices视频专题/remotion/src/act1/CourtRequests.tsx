import { publicAsset } from "../assets";
import { Img, interpolate } from "remotion";
import { C, F } from "../style";
import { clamp, lerp, useTime } from "../components";
import type { ShotTiming } from "../timing";
import { Act1Kicker, Act1Scene, Act1Source } from "./shared";
import { PlatformLogo } from "./AccountDiscovery";
import { voiceCue } from "./cues";

// Editorial excerpts of documented categories, not 46 invented data types.
const originalScope = [
  ["账户资料", "服务器成员关系", "服务器角色"],
  [
    "注册与账单资料",
    "付款方式",
    "交易记录",
    "IP 与时间戳",
    "设备标识",
    "关联账号",
  ],
  ["账户资料", "发布的帖子", "发布的评论", "加入的 subreddit"],
];
export const Requests = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const court = voiceCue(timing, 7, "法官认为");
  const privacy = voiceCue(timing, 7, "过于涉及");
  const narrow = timing.voices[1].start + 0.05;
  const k = lerp(t, narrow, narrow + 0.7);
  const count = Math.round(
    interpolate(t, [narrow, narrow + 0.56], [46, 9], clamp),
  );
  const ruling =
    lerp(t, court - 0.1, court + 0.25) *
    (1 - lerp(t, narrow - 0.2, narrow + 0.3));
  return (
    <Act1Scene paper>
      <Act1Kicker
        paper
        right={k < 0.5 ? "ORIGINAL → REVISED" : "修改申请 / 2026.10.14"}
      >
        07 / NARROW THE REQUEST
      </Act1Kicker>
      <div
        style={{
          position: "absolute",
          left: 105,
          top: 141,
          display: "flex",
          alignItems: "baseline",
          gap: 28,
        }}
      >
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 150,
            lineHeight: 1,
            color: k > 0.4 ? C.red : C.ink,
          }}
        >
          {count}
        </div>
        <div style={{ fontSize: 34 }}>项请求</div>
        <div style={{ fontSize: 30, color: "#70746c", marginLeft: 25 }}>
          {k > 0.5 ? "按目标账号，重新收窄" : "三个平台，大量账户记录"}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 130,
          right: 130,
          top: 340,
          height: 475,
          perspective: 1400,
        }}
      >
        {[0, 1, 2].map((i) => {
          const enter = lerp(t, i * 0.12, i * 0.12 + 0.65);
          const trim = i === 1 ? 0 : lerp(t, narrow + 0.04, narrow + 0.55);
          const rows = originalScope[i];
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: i * 565,
                top: (1 - enter) * 220,
                width: 525,
                height: 460,
                rotate: `${(1 - enter) * (i - 1) * 7}deg`,
                opacity: enter,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#e1dccf",
                  rotate: `${(i - 1) * 1.5}deg`,
                  translate: "8px 11px",
                  boxShadow: "0 18px 40px #30291e22",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#faf7f0",
                  borderTop: `4px solid ${i === 1 ? C.blue : C.ink}`,
                  overflow: "hidden",
                  boxShadow: "0 12px 24px #3c342312",
                }}
              >
                <div
                  style={{
                    height: 95,
                    padding: "24px 30px",
                    borderBottom: "1px solid #16213a25",
                  }}
                >
                  <PlatformLogo
                    index={i}
                    width={i === 1 ? 160 : 240}
                    height={46}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    right: 28,
                    top: 33,
                    fontFamily: F.mono,
                    fontSize: 27,
                    color: k > 0.5 ? C.red : "#8b8d84",
                    opacity: i === 1 ? k : 1,
                  }}
                >
                  {k > 0.5 ? (i === 1 ? "× 7" : "× 1") : ""}
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 30,
                    right: 30,
                    top: 119,
                    translate: `0 ${-k * 410 - (1 - k) * Math.max(0, t - 0.5) * 11}px`,
                    opacity: 1 - k,
                  }}
                >
                  {rows.map((label, j) => (
                    <div
                      key={label}
                      style={{
                        height: 53,
                        display: "flex",
                        alignItems: "center",
                        fontSize: 30,
                        borderBottom: "1px solid #16213a1a",
                        whiteSpace: "nowrap",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: F.mono,
                          fontSize: 18,
                          color: "#9b9c92",
                          width: 40,
                        }}
                      >
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      {label}
                      <div
                        style={{
                          position: "absolute",
                          left: 30,
                          right: 0,
                          top: 28,
                          height: 2,
                          background: C.red,
                          scale: `${lerp(t, narrow + j * 0.035, narrow + 0.2 + j * 0.035)} 1`,
                          transformOrigin: "left",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 30,
                    right: 30,
                    top: 120,
                    translate: `0 ${(1 - k) * 310}px`,
                    opacity: k,
                  }}
                >
                  {(i === 1
                    ? Array.from(
                        { length: 7 },
                        (_, j) =>
                          `Steam 资料页 ${String(j + 1).padStart(2, "0")}`,
                      )
                    : ["voices38"]
                  ).map((label, j) => (
                    <div
                      key={label}
                      style={{
                        height: i === 1 ? 43 : 105,
                        borderBottom: "1px solid #16213a25",
                        display: "flex",
                        alignItems: "center",
                        gap: 23,
                        fontFamily: F.mono,
                        fontSize: i === 1 ? 26 : 41,
                        opacity: lerp(
                          t,
                          narrow + 0.18 + j * 0.045,
                          narrow + 0.38 + j * 0.045,
                        ),
                        translate: `${lerp(t, narrow + 0.18 + j * 0.045, narrow + 0.55 + j * 0.045, 80, 0)}px 0`,
                      }}
                    >
                      <span style={{ fontSize: 18, color: C.red }}>
                        {i === 1
                          ? String(j + 3).padStart(2, "0")
                          : i === 0
                            ? "01"
                            : "02"}
                      </span>
                      {label}
                    </div>
                  ))}
                  {i !== 1 && (
                    <div
                      style={{
                        fontSize: 30,
                        lineHeight: 1.6,
                        color: C.ink,
                        marginTop: 22,
                      }}
                    >
                      仅请求
                      <br />
                      <span style={{ color: C.red }}>身份与联系资料</span>
                      <div
                        style={{
                          fontSize: 22,
                          color: "#8b8d84",
                          marginTop: 16,
                        }}
                      >
                        同名公开账号的记录
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          left: 680,
          top: 162,
          width: 1100,
          background: "#faf7f0",
          padding: "30px 42px",
          boxShadow: "0 30px 90px #493e2f44",
          borderLeft: `6px solid ${C.red}`,
          opacity: ruling,
          translate: `${lerp(t, court - 0.15, court + 0.5, 260, 0)}px ${lerp(t, court - 0.15, court + 0.5, -75, 0)}px`,
          rotate: `${lerp(t, court - 0.15, court + 0.6, -3, 0)}deg`,
        }}
      >
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 22,
            color: "#8b8d84",
            marginBottom: 24,
          }}
        >
          法院命令 · 2026.10.08
        </div>
        <Img
          src={publicAsset("v38/court/order-line1.png")}
          style={{ width: 980, display: "block", mixBlendMode: "multiply" }}
        />
        <Img
          src={publicAsset("v38/court/order-line3.png")}
          style={{
            width: 840,
            display: "block",
            mixBlendMode: "multiply",
            marginTop: 8,
          }}
        />
        <div
          style={{
            display: "flex",
            gap: 50,
            alignItems: "baseline",
            marginTop: 24,
          }}
        >
          <span style={{ fontSize: 64, color: C.red }}>范围过宽</span>
          <span
            style={{
              fontSize: 42,
              color: C.ink,
              opacity: lerp(t, privacy - 0.1, privacy + 0.2),
            }}
          >
            涉及个人隐私
          </span>
        </div>
        <div
          style={{
            height: 3,
            background: C.red,
            width: "92%",
            marginTop: 18,
            scale: `${lerp(t, court + 0.15, court + 0.7)} 1`,
            transformOrigin: "left",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 286,
          right: 110,
          display: "flex",
          alignItems: "center",
          gap: 25,
          opacity: k,
        }}
      >
        <span style={{ fontSize: 29, color: C.red }}>保留的资料范围</span>
        <span style={{ fontSize: 27, color: C.ink }}>
          姓名 · 身份证明 · 邮箱 · IP · 电话 · 地址
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          right: 100,
          top: 830,
          fontSize: 20,
          color: "#777c78",
        }}
      >
        {k > 0.5
          ? "1 个 Discord + 1 个 Reddit + 7 个 Steam 账号；9 项请求的资料范围相同"
          : "原始请求内容节选；完整请求数为 46 项"}
      </div>
      <Act1Source paper>
        {k > 0.5
          ? "Denuvo 修改后的取证申请 · 2026-10-14"
          : "TorrentFreak · 数据请求范围 · 2026-10-06"}
      </Act1Source>
    </Act1Scene>
  );
};
