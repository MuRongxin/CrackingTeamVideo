import { Img, interpolate } from "remotion";
import { publicAsset } from "../assets";
import { clamp, lerp, useTime } from "../components";
import { C, F } from "../style";
import pages from "./farewell-pages.json";

/** All ten images are actual, unretouched public reader page captures. */
export const FarewellDocument = ({ from, duration }: { from: number; duration: number }) => {
  const t = useTime();
  const focus = lerp(t, from + 1.38, from + 2.15);
  const drift = interpolate(t, [from, duration], [0, 1], clamp);
  return (
    <div style={{ position: "absolute", inset: 0, perspective: 1800 }}>
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 112,
          fontFamily: F.mono,
          fontSize: 25,
          color: C.yellow,
          opacity: lerp(t, from - 0.1, from + 0.35),
          translate: `${lerp(t, from - 0.1, from + 0.55, 230, 0)}px 0`,
        }}
      >
        End Of An Era — EMPRESS / {focus > 0.65 ? "09 OF 10" : "10 PAGES"}
      </div>
      {pages.map((page, i) => {
        const active = page.page === 9;
        const row = Math.floor(i / 5);
        const column = i % 5;
        const entry = lerp(t, from - 0.17 + i * 0.024, from + 0.4 + i * 0.024);
        const initialX = 100 + column * 350;
        const initialY = 160 + row * 355;
        const width = active ? 260 + focus * 1480 : 260;
        return (
          <div
            key={page.page}
            style={{
              position: "absolute",
              left: active ? initialX + (90 - initialX) * focus : initialX + (column - 2) * 460 * focus,
              top: active ? initialY + (150 - initialY) * focus : initialY + (row === 0 ? -500 : 520) * focus,
              width,
              height: active ? (260 * page.height) / page.width + focus * 324 : (260 * page.height) / page.width,
              background: "#fff",
              overflow: "hidden",
              opacity: entry * (active ? 1 : 1 - focus),
              translate: `${(1 - entry) * (1450 + column * 90)}px ${(1 - entry) * (row ? 190 : -140) - drift * 5}px`,
              transform: `rotateY(${(1 - entry) * -65}deg) rotateZ(${(1 - focus) * ((column - 2) * 0.7 + drift * 0.6)}deg)`,
              transformOrigin: "50% 50%",
              boxShadow: "0 18px 45px #0009",
              zIndex: active ? 30 : 10 + i,
            }}
          >
            <Img
              src={publicAsset(page.file)}
              style={{ display: "block", width: "100%", translate: `0 ${active ? -focus * 1420 : 0}px` }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 10,
                right: 12,
                padding: "4px 8px",
                color: C.white,
                background: "#0c1611d9",
                fontFamily: F.mono,
                fontSize: 19,
                opacity: 1 - focus,
              }}
            >
              {String(page.page).padStart(2, "0")}
            </div>
          </div>
        );
      })}
    </div>
  );
};
