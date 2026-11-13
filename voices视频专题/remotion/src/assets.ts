import { staticFile } from "remotion";
import common from "../asset-provenance.json";
import act2 from "../act2-asset-provenance.json";
import act3 from "../act3-asset-provenance.json";
import act4 from "../act4-asset-provenance.json";
import act5 from "../act5-asset-provenance.json";
import act5Bili from "../act5-bilibili-provenance.json";
import act6 from "../act6-asset-provenance.json";
import act6Bili from "../act6-bilibili-provenance.json";
import revision from "../picture-revision-provenance.json";
import inserts from "../film-insert-provenance.json";

import act7 from "../act7-asset-provenance.json";
const versions = Object.fromEntries(
  [
    ...common,
    ...act2,
    ...act3,
    ...act4,
    ...act5,
    ...act5Bili,
    ...act6,
    ...act6Bili,
    ...inserts,
    ...revision,
    ...act7,
  ].map((asset) => [
    asset.path.split("/public/")[1],
    asset.sha256.slice(0, 12),
  ]),
);
// Studio may already have the previous PNG in memory while assets are refined.
// Version both the original material excerpts and official-game insert files.
export const publicAsset = (path: string) =>
  staticFile(path) + (versions[path] ? `?rev=${versions[path]}` : "");
