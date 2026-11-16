/**
 * Apply tools/securetravels-sync.json into src/data/{treks,yatras,packages}.ts
 * Only patches numeric / label fields — keeps copy, itineraries, FAQs intact.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sync = JSON.parse(
  readFileSync(join(root, "tools/securetravels-sync.json"), "utf8"),
);

function ftToM(ft) {
  return Math.round(ft / 3.28084);
}

/** Trail distance only — reject road-distance false positives from FAQs. */
function trailDistance(km, days) {
  if (km == null || !Number.isFinite(km)) return null;
  if (days <= 2) return km >= 3 && km <= 35 ? km : null;
  return km >= 8 && km <= 55 ? km : null;
}

function patchTrekBlock(src, fact) {
  const slugRe = new RegExp(
    `(slug:\\s*"${fact.slug}"[\\s\\S]*?)(sourceUrl:\\s*"https://securetravels\\.in[^"]*")`,
    "m",
  );
  const m = src.match(slugRe);
  if (!m) {
    console.warn(`trek block not found: ${fact.slug}`);
    return src;
  }
  let block = m[0];

  if (fact.duration?.days != null) {
    block = block.replace(
      /durationDays:\s*\d+/,
      `durationDays: ${fact.duration.days}`,
    );
    block = block.replace(
      /durationNights:\s*\d+/,
      `durationNights: ${fact.duration.nights}`,
    );
  }

  const dist = trailDistance(fact.distanceKm, fact.duration?.days ?? 5);
  if (dist != null) {
    block = block.replace(/distanceKm:\s*[\d.]+/, `distanceKm: ${dist}`);
  }

  if (fact.altitudeFt) {
    const mAlt = ftToM(fact.altitudeFt);
    block = block.replace(/maxAltitudeM:\s*\d+/, `maxAltitudeM: ${mAlt}`);
    block = block.replace(
      /maxAltitudeFt:\s*\d+/,
      `maxAltitudeFt: ${fact.altitudeFt}`,
    );
  }

  if (fact.difficulty) {
    block = block.replace(
      /difficulty:\s*"[^"]*"/,
      `difficulty: ${JSON.stringify(fact.difficulty)}`,
    );
  }

  if (fact.bestSeason) {
    const season = fact.bestSeason.replace(/\s+/g, " ").trim();
    // avoid gobbling next fields — keep short
    if (season.length < 40) {
      block = block.replace(
        /bestSeason:\s*"[^"]*"/,
        `bestSeason: ${JSON.stringify(season)}`,
      );
    }
  }

  if (fact.priceINR) {
    const orig =
      fact.originalINR && fact.originalINR > fact.priceINR
        ? fact.originalINR
        : undefined;
    const priceExpr = orig
      ? `{ minINR: ${fact.priceINR}, maxINR: ${fact.priceINR}, originalINR: ${orig} }`
      : `{ minINR: ${fact.priceINR}, maxINR: ${fact.priceINR} }`;
    block = block.replace(/priceRange:\s*\{[^}]*\}/, `priceRange: ${priceExpr}`);
  }

  return src.replace(m[0], block);
}

function patchYatraBlock(src, fact) {
  const slugRe = new RegExp(
    `(slug:\\s*"${fact.slug}"[\\s\\S]*?)(sourceUrl:\\s*"https://securetravels\\.in[^"]*")`,
    "m",
  );
  const m = src.match(slugRe);
  if (!m) {
    console.warn(`yatra block not found: ${fact.slug}`);
    return src;
  }
  let block = m[0];

  if (fact.durationLabel) {
    // yatras use duration: "3 Nights / 4 Days" string
    block = block.replace(
      /duration:\s*"[^"]*"/,
      `duration: ${JSON.stringify(fact.durationLabel)}`,
    );
  }

  if (fact.bestSeason) {
    const season = fact.bestSeason.replace(/\s+/g, " ").trim();
    if (season.length < 40) {
      block = block.replace(
        /season:\s*"[^"]*"/,
        `season: ${JSON.stringify(season)}`,
      );
    }
  }

  if (fact.priceINR) {
    const orig =
      fact.originalINR && fact.originalINR > fact.priceINR
        ? fact.originalINR
        : undefined;
    const priceExpr = orig
      ? `{ minINR: ${fact.priceINR}, maxINR: ${fact.priceINR}, originalINR: ${orig} }`
      : `{ minINR: ${fact.priceINR}, maxINR: ${fact.priceINR} }`;
    block = block.replace(/priceRange:\s*\{[^}]*\}/, `priceRange: ${priceExpr}`);
  }

  return src.replace(m[0], block);
}

function patchPackageBlock(src, fact) {
  const slugRe = new RegExp(
    `(slug:\\s*"${fact.slug}"[\\s\\S]*?)(sourceUrl:\\s*"https://securetravels\\.in[^"]*")`,
    "m",
  );
  const m = src.match(slugRe);
  if (!m) {
    console.warn(`package block not found: ${fact.slug}`);
    return src;
  }
  let block = m[0];

  if (fact.durationLabel) {
    block = block.replace(
      /duration:\s*"[^"]*"/,
      `duration: ${JSON.stringify(fact.durationLabel)}`,
    );
  }

  if (fact.priceINR) {
    const orig =
      fact.originalINR && fact.originalINR > fact.priceINR
        ? fact.originalINR
        : undefined;
    const priceExpr = orig
      ? `{ minINR: ${fact.priceINR}, maxINR: ${fact.priceINR}, originalINR: ${orig} }`
      : `{ minINR: ${fact.priceINR}, maxINR: ${fact.priceINR} }`;
    block = block.replace(/priceRange:\s*\{[^}]*\}/, `priceRange: ${priceExpr}`);
  }

  return src.replace(m[0], block);
}

let treks = readFileSync(join(root, "src/data/treks.ts"), "utf8");
let yatras = readFileSync(join(root, "src/data/yatras.ts"), "utf8");
let packages = readFileSync(join(root, "src/data/packages.ts"), "utf8");

let nTrek = 0;
let nYatra = 0;
let nPkg = 0;

for (const fact of sync) {
  if (!fact.ok) continue;
  if (fact.type === "trek") {
    const before = treks;
    treks = patchTrekBlock(treks, fact);
    if (treks !== before) nTrek++;
  } else if (fact.type === "yatra") {
    const before = yatras;
    yatras = patchYatraBlock(yatras, fact);
    if (yatras !== before) nYatra++;
  } else if (fact.type === "package") {
    const before = packages;
    packages = patchPackageBlock(packages, fact);
    if (packages !== before) nPkg++;
  }
}

writeFileSync(join(root, "src/data/treks.ts"), treks);
writeFileSync(join(root, "src/data/yatras.ts"), yatras);
writeFileSync(join(root, "src/data/packages.ts"), packages);

console.log(`Updated treks=${nTrek} yatras=${nYatra} packages=${nPkg}`);
