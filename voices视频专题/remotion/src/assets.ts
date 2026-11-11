import { staticFile } from "remotion";
import common from "../asset-provenance.json";
import act2 from "../act2-asset-provenance.json";
import act3 from "../act3-asset-provenance.json";
import inserts from "../film-insert-provenance.json";

const versions = Object.fromEntries(
  [...common, ...act2, ...act3, ...inserts].map((asset) => [
    asset.path.split("/public/")[1],
    asset.sha256.slice(0, 12),
  ]),
);
// Studio may already have the previous PNG in memory while assets are refined.
// Version both the original material excerpts and official-game insert files.
export const publicAsset = (path: string) =>
  staticFile(path) + (versions[path] ? `?rev=${versions[path]}` : "");
