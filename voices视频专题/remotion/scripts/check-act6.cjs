const { spawnSync } = require("node:child_process");
const result = spawnSync(
  process.execPath,
  [
    "scripts/check-current.cjs",
    ...Array.from({ length: 14 }, (_, i) => `6:${i + 1}`),
  ],
  { stdio: "inherit" },
);
process.exit(result.status ?? 1);
