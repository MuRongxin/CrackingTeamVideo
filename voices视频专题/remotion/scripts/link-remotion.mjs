import fs from "node:fs";
import path from "node:path";
const checkout = process.env.REMOTION_CHECKOUT || "/home/lrxin/文档/remotion";
const root = path.resolve(import.meta.dirname, "..");
const target = path.join(root, "node_modules");
if (fs.existsSync(target) && fs.lstatSync(target).isSymbolicLink())
  fs.unlinkSync(target);
fs.mkdirSync(target, { recursive: true });
const source = path.join(checkout, "packages/example/node_modules");
for (const name of fs.readdirSync(source)) {
  if (name === "@types" || name === ".bin") continue;
  const dest = path.join(target, name);
  if (!fs.existsSync(dest))
    fs.symlinkSync(path.join(source, name), dest, "dir");
}
fs.mkdirSync(path.join(target, "@types"), { recursive: true });
for (const [name, version] of [
  ["react", "19.3.0"],
  ["react-dom", "19.3.0+17530ac01dea6b83"],
  ["node", "22.20.0"],
  ["three", "0.170.0"],
]) {
  const dest = path.join(target, "@types", name);
  if (!fs.existsSync(dest))
    fs.symlinkSync(
      path.join(
        checkout,
        `node_modules/.bun/@types+${name}@${version}/node_modules/@types/${name}`,
      ),
      dest,
      "dir",
    );
}
console.log(`Linked local Remotion checkout: ${checkout}`);
