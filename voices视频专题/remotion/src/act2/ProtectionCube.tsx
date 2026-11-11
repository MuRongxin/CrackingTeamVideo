import { Euler, PerspectiveCamera, Vector3 } from "three";
import { useVideoConfig, interpolate } from "remotion";
import { C, F } from "../style";
import { clamp, lerp, useTime } from "../components";
import type { ShotTiming } from "../timing";
import { FilmScene, GameStill, cue } from "./film-shared";

// Project real 3D vertices into SVG rather than relying on a browser WebGL
// context. Studio scrubbing and frame capture use the same geometry path.
const vertices: [number, number, number][] = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
];
const faces = [
  { normal: [0, 0, 1], corners: [4, 5, 6, 7] },
  { normal: [0, 0, -1], corners: [1, 0, 3, 2] },
  { normal: [1, 0, 0], corners: [5, 1, 2, 6] },
  { normal: [-1, 0, 0], corners: [0, 4, 7, 3] },
  { normal: [0, 1, 0], corners: [7, 6, 2, 3] },
  { normal: [0, -1, 0], corners: [0, 1, 5, 4] },
] as const;

export const ProtectionCube = ({ timing }: { timing: ShotTiming }) => {
  const t = useTime();
  const { width, height } = useVideoConfig();
  const shellAt = cue(timing, 26, "反篡改");
  const blockAt = cue(timing, 26, "没那么容易");
  const verify = lerp(t, 0.18, 1.25);
  const shell = lerp(t, shellAt - 0.1, shellAt + 1.1);
  const alpha = 0.26 + Math.sin(t * 0.55) * 0.04;
  const beta = 0.44 + Math.sin(t * 0.38) * 0.1;
  const rotation: [number, number, number] = [
    alpha,
    beta,
    Math.sin(t * 0.4) * 0.015,
  ];
  const offset: [number, number, number] = [
    -1.35,
    0.06 + Math.sin(t * 1.1) * 0.055,
    0,
  ];
  const euler = new Euler(...rotation);
  const world = (v: [number, number, number]) =>
    new Vector3(...v).applyEuler(euler).add(new Vector3(...offset));
  const camera = new PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(0, 0, 9);
  camera.updateMatrixWorld();
  const projectWorld = (p: Vector3) => {
    const q = p.clone().project(camera);
    return { x: ((q.x + 1) * width) / 2, y: ((1 - q.y) * height) / 2 };
  };
  const project = (v: [number, number, number]) => projectWorld(world(v));
  const contact = world([-1.55, 0, 0.35]);
  const headX = interpolate(
    t,
    [blockAt, blockAt + 0.65, blockAt + 0.79, blockAt + 1.65],
    [-5.8, contact.x, contact.x, -5.6],
    clamp,
  );
  const returning = t > blockAt + 0.79;
  const tailX = returning ? contact.x : -5.8;
  const beam =
    lerp(t, blockAt, blockAt + 0.12) *
    (1 - lerp(t, blockAt + 1.8, blockAt + 2.25));
  const hit =
    lerp(t, blockAt + 0.57, blockAt + 0.69) *
    (1 - lerp(t, blockAt + 0.86, blockAt + 1.28));
  const labels = [
    {
      title: "Denuvo",
      sub: "外层反篡改保护",
      color: "#9cbfd9",
      y: 195,
      at: project([1.55, 1.15, 1.55]),
      opacity: shell,
      ordinal: "03 / OUTER SHELL",
    },
    {
      title: "正版验证",
      sub: "例如 Steam",
      color: C.white,
      y: 420,
      at: project([0.95, 0.35, 0.95]),
      opacity: verify,
      ordinal: "02 / VERIFICATION",
    },
    {
      title: "游戏程序",
      sub: "GAME",
      color: C.yellow,
      y: 645,
      at: project([0.47, -0.25, 0.47]),
      opacity: lerp(t, 0.05, 0.6),
      ordinal: "01 / CORE",
    },
  ];
  const light = new Vector3(-0.45, 0.85, 1).normalize();
  const layers = [
    { name: "game", half: 0.47, amount: 1 },
    { name: "verification", half: 0.95 * (0.8 + verify * 0.2), amount: verify },
    { name: "shell", half: 1.55, amount: shell },
  ];
  const polygons = layers
    .flatMap((layer) =>
      faces.map((face, i) => {
        const close =
          layer.name === "shell"
            ? lerp(t, shellAt - 0.1 + i * 0.055, shellAt + 0.7 + i * 0.055)
            : layer.amount;
        const spread = layer.name === "shell" ? (1 - close) * 1.9 : 0;
        const corners = face.corners.map((index) => {
          const point = vertices[index].map(
            (v, axis) => v * layer.half + face.normal[axis] * spread,
          ) as [number, number, number];
          return world(point);
        });
        const shade = Math.max(
          0,
          new Vector3(...face.normal).applyEuler(euler).dot(light),
        );
        const ink =
          layer.name === "game"
            ? C.yellow
            : layer.name === "shell"
              ? hit > 0.1
                ? "#f67b63"
                : "#8bbbd7"
              : "#e5eee9";
        return {
          key: `${layer.name}-${i}`,
          layer: layer.name,
          points: corners
            .map((p) => {
              const q = projectWorld(p);
              return `${q.x},${q.y}`;
            })
            .join(" "),
          depth: corners.reduce((sum, p) => sum + p.z, 0) / 4,
          opacity: close,
          fill:
            layer.name === "game" ? `hsl(39, 72%, ${27 + shade * 22}%)` : ink,
          fillOpacity:
            layer.name === "game"
              ? 1
              : layer.name === "shell"
                ? 0.045 + shade * 0.045 + hit * 0.08
                : 0.027,
          stroke: ink,
        };
      }),
    )
    .sort((a, b) => a.depth - b.depth);
  const contact2d = projectWorld(contact);
  const head2d = projectWorld(new Vector3(headX, contact.y, contact.z));
  const tail2d = projectWorld(new Vector3(tailX, contact.y, contact.z));
  const shadow = Array.from({ length: 48 }, (_, i) => {
    const a = (i / 48) * Math.PI * 2;
    const q = projectWorld(
      new Vector3(offset[0] + Math.cos(a) * 2.0, -2.4, Math.sin(a) * 1.7),
    );
    return `${q.x},${q.y}`;
  }).join(" ");
  return (
    <FilmScene
      title="正版验证外面，还有一层"
      right="立方体 / 概念示意"
      source="概念示意｜不代表具体产品内部实现"
    >
      <GameStill dark={0.82} />
      <svg
        data-v38-protection-cube="projected-3d"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <linearGradient
            id="cube-metal-shine"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0" stopColor="#fff1b4" stopOpacity="0.35" />
            <stop offset="0.5" stopColor="#fff1b4" stopOpacity="0" />
            <stop offset="1" stopColor="#4e2a08" stopOpacity="0.16" />
          </linearGradient>
          <filter
            id="cube-impact-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker
            id="cube-probe-arrow"
            viewBox="0 0 12 10"
            refX="10"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M0 0L12 5L0 10Z" fill="#ec684c" />
          </marker>
        </defs>
        <polygon points={shadow} fill="#000" opacity="0.28" />
        {Array.from({ length: 21 }, (_, i) => {
          const x = i - 10;
          const a = projectWorld(new Vector3(x, -2.45, -9));
          const b = projectWorld(new Vector3(x, -2.45, 6));
          const c = projectWorld(new Vector3(-11, -2.45, x * 0.7));
          const d = projectWorld(new Vector3(11, -2.45, x * 0.7));
          return (
            <g key={i} stroke="#41666e" strokeOpacity="0.28" strokeWidth="1">
              <path d={`M${a.x} ${a.y}L${b.x} ${b.y}`} />
              <path d={`M${c.x} ${c.y}L${d.x} ${d.y}`} />
            </g>
          );
        })}
        {polygons.map((poly) => (
          <g key={poly.key} data-cube-layer={poly.layer} opacity={poly.opacity}>
            <polygon
              points={poly.points}
              fill={poly.fill}
              fillOpacity={poly.fillOpacity}
              stroke={poly.stroke}
              strokeOpacity={poly.layer === "game" ? 0.9 : 0.65}
              strokeWidth={poly.layer === "shell" ? 1.6 : 1.2}
              strokeLinejoin="round"
            />
            {poly.layer === "game" && (
              <polygon points={poly.points} fill="url(#cube-metal-shine)" />
            )}
          </g>
        ))}
        <path
          data-cube-probe={returning ? "returning" : "approaching"}
          d={`M${tail2d.x} ${tail2d.y}L${head2d.x} ${head2d.y}`}
          stroke="#ec684c"
          strokeWidth="4"
          opacity={beam}
          markerEnd="url(#cube-probe-arrow)"
        />
        <circle
          cx={contact2d.x}
          cy={contact2d.y}
          r={17 + hit * 43}
          fill="none"
          stroke={C.yellow}
          strokeWidth="4"
          opacity={hit}
          filter="url(#cube-impact-glow)"
        />
      </svg>
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", inset: 0 }}
      >
        {labels.map((label) => (
          <g key={label.title} opacity={label.opacity}>
            <path
              d={`M${label.at.x} ${label.at.y} L1190 ${label.y + 58} H1280`}
              stroke={label.color}
              strokeOpacity={0.65}
              strokeWidth={2}
              fill="none"
            />
            <circle cx={label.at.x} cy={label.at.y} r={5} fill={label.color} />
          </g>
        ))}
      </svg>
      {labels.map((label) => (
        <div
          key={label.title}
          style={{
            position: "absolute",
            left: 1310,
            top: label.y,
            opacity: label.opacity,
            translate: `${(1 - label.opacity) * 70}px 0`,
          }}
        >
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 23,
              letterSpacing: 2,
              color: C.gray,
            }}
          >
            {label.ordinal}
          </div>
          <div
            style={{
              fontFamily: label.title === "Denuvo" ? F.mono : F.cn,
              fontSize: 51,
              marginTop: 9,
              color: label.color,
            }}
          >
            {label.title}
          </div>
          <div style={{ fontSize: 29, color: C.gray, marginTop: 9 }}>
            {label.sub}
          </div>
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 125,
          top: 765,
          color: hit > 0.1 ? C.yellow : C.red,
          fontSize: 32,
          opacity: beam,
          translate: `${returning ? -lerp(t, blockAt + 0.8, blockAt + 1.65, 0, 60) : 0}px 0`,
        }}
      >
        {returning ? "在外层被挡回" : "试图绕过验证"}
      </div>
    </FilmScene>
  );
};
