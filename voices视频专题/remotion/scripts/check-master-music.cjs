const fs = require("node:fs"),
  path = require("node:path"),
  assert = require("node:assert/strict"),
  crypto = require("node:crypto");
require("node:child_process").execFileSync(
  "/home/lrxin/文档/remotion/node_modules/.bin/tsc",
  [
    "--ignoreConfig",
    "src/music/plan.ts",
    "--outDir",
    ".qa/music-model",
    "--module",
    "nodenext",
    "--moduleResolution",
    "nodenext",
    "--target",
    "es2020",
    "--resolveJsonModule",
    "--esModuleInterop",
    "--skipLibCheck",
  ],
  { stdio: "pipe" },
);
const {
  buildMasterPlan,
  musicGainAt,
} = require("../.qa/music-model/music/plan.js");
const cs = JSON.parse(fs.readFileSync(".qa/current-compositions.json"));
const acts = Array.from({ length: 10 }, (_, i) =>
  cs.find((c) => c.id === `V38Act${i + 1}`),
);
const groups = acts.map((a) => a.props.timings),
  plan = buildMasterPlan(groups),
  fps = 60;
assert.equal(plan.total, cs.find(c=>c.id==="V38Full").durationInFrames);
assert.equal(groups.flat().length, 133);
const sources = JSON.parse(fs.readFileSync("src/music/sources.json"));
for (const c of plan.clips) {
  assert(c.frames > 0 && c.from >= 0);
  assert(c.from + c.frames <= plan.total);
  assert(c.trim + c.frames <= Math.ceil(sources[c.track].duration * fps));
}
const bClip = plan.clips.filter(c => c.track === "b");
assert.equal(bClip.length, 1);
assert.equal(bClip[0].trim, 0);
assert.equal(bClip[0].frames, Math.ceil(sources.b.duration * fps));
assert.equal(bClip[0].from + bClip[0].frames, plan.total);
assert.equal(bClip[0].from - Math.max(...plan.clips.filter(c=>c.track==="a").map(c=>c.from+c.frames)), 7*fps);
assert(sources.a.duration < 131, "BGM1 silence tail was not trimmed");

const p30=buildMasterPlan(groups,30);
assert.equal(p30.musicBreak.to-p30.musicBreak.from,210);
const b30=p30.clips.find(c=>c.track==="b");
assert.equal(b30.from+b30.frames,p30.total);
assert(b30.frames/30>=sources.b.duration);

const trace = [],
  curve = [];
for (let frame = 0; frame < plan.total; frame++) {
  const active = plan.clips.filter(
    (c) => frame >= c.from && frame < c.from + c.frames,
  );
  assert(active.length <= 2, `Excess overlap at ${frame}`);
  const gains = active.map((c) => musicGainAt(frame, c, plan));
  assert(gains.every((g) => g >= 0 && g <= 0.75));
  if (frame >= plan.musicBreak.from && frame < plan.musicBreak.to)
    assert(gains.every(g=>g===0), `Music in the seven-second break at ${frame}`);
  else if (frame > fps && frame < plan.total - 1 && frame !== plan.musicBreak.from-1 && frame !== plan.musicBreak.to)
    assert(gains.some(g=>g>0), `Music unexpectedly stops at ${frame}`);
  if (frame % 30 === 0)
    curve.push({
      frame,
      gain: Math.sqrt(gains.reduce((n, g) => n + g * g, 0)),
    });
}
for (const c of plan.clips)
  trace.push({
    ...c,
    trackGainDb: JSON.parse(fs.readFileSync("src/music/levels.json"))[c.track],
    startSeconds: c.from / fps,
    endSeconds: (c.from + c.frames) / fps,
    sourceStartSeconds: c.trim / fps,
  });
let frame = 0;
const scenes = [];
groups.forEach((g, ai) =>
  g.forEach((s, si) => {
    scenes.push({
      scene: `A${ai + 1}-${String(ai === 0 ? [1, 2, 3, 4, 5, 8, 6, 7, 9, 10, 11][si] : si + 1).padStart(2, "0")}`,
      from: frame,
      frames: Math.round(s.duration * fps),
      voices: s.voices.map((v) => v.id),
    });
    frame += Math.round(s.duration * fps);
  }),
);
fs.writeFileSync(
  "master-timeline.json",
  JSON.stringify(
    {
      fps,
      totalFrames: frame,
      scenes,
      musicRegions: trace,
      musicPolicy: "BGM1 trimmed continuous loops; seven-second music break; BGM2 complete once, aligned to the film end",
      musicBreak: plan.musicBreak,
    },
    null,
    2,
  ) + "\n",
);
fs.writeFileSync(".qa/master-music-plan.json", JSON.stringify(plan, null, 2));
fs.writeFileSync(".qa/master-music-gain.json", JSON.stringify(curve));
for (const r of JSON.parse(fs.readFileSync("music-asset-provenance.json"))) {
  for (const p of [r.path, r.ledger_path])
    assert.equal(
      crypto
        .createHash("sha256")
        .update(fs.readFileSync(path.resolve("../..", p)))
        .digest("hex"),
      r.sha256,
    );
  assert.equal(
    crypto
      .createHash("sha256")
      .update(fs.readFileSync(path.resolve("../..", r.derived_from)))
      .digest("hex"),
    r.source_sha256,
  );
}
console.log(
  `PASS: 133 adjacent scenes, ${plan.clips.length} music regions, <=2-way crossfades, source bounds, source hashes, seven-second break, continuous BGM1 loops, full BGM2, total ${frame}f.`,
);
