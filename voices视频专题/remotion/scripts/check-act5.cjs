const { spawnSync } = require("node:child_process");
const result = spawnSync(
  process.execPath,
  [
    "scripts/check-current.cjs",
    ...Array.from({ length: 7 }, (_, i) => `5:${i + 1}`),
  ],
  { stdio: "inherit" },
);
process.exit(result.status ?? 1);
