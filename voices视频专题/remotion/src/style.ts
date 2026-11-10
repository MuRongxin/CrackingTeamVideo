import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";
export const C = {
  paper: "#F3EFE4",
  ink: "#16213A",
  red: "#C23B2E",
  black: "#0A0C0B",
  white: "#E9EDE6",
  yellow: "#FFC83D",
  blue: "#6E8AA6",
  gray: "#8A8F98",
};
export const F = {
  cn: 'Xinqingnian, "Noto Serif CJK SC", serif',
  mono: "JetBrains, monospace",
  pixel: "VGA, monospace",
  serif: '"Noto Serif CJK SC", serif',
};
void loadFont({
  family: "Xinqingnian",
  url: staticFile("v38/fonts/xinqingnian.otf"),
});
void loadFont({
  family: "JetBrains",
  url: staticFile("v38/fonts/jetbrains.woff2"),
});
void loadFont({ family: "VGA", url: staticFile("v38/fonts/vga.ttf") });
