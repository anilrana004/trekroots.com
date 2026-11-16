import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sync = JSON.parse(
  readFileSync(join(root, "tools/securetravels-sync.json"), "utf8"),
);

function strip(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTrailKm(text) {
  // Prefer explicit trek-distance FAQs / day labels
  const patterns = [
    /total distance of (?:the )?trek\?\s*[^.]{0,40}?([\d.]+)\s*[–-]\s*([\d.]+)\s*kilo?m/i,
    /trek covers approximately\s*([\d.]+)\s*[–-]\s*([\d.]+)\s*kilo?m/i,
    /trek covers approximately\s*([\d.]+)\s*kilo?m/i,
    /trek distance\s*(?:approx\.?)?\s*([\d.]+)\s*km/i,
    /approximately\s*([\d.]+)\s*[–-]\s*([\d.]+)\s*kilometers?/i,
    /(?:total )?trek(?:king)? distance[^.]{0,30}?([\d.]+)\s*[–-]\s*([\d.]+)\s*km/i,
    /(?:total )?trek(?:king)? distance[^.]{0,30}?([\d.]+)\s*km/i,
  ];
  for (const re of patterns) {
    const m = text.match(re);
    if (!m) continue;
    if (m[2]) return Math.round((Number(m[1]) + Number(m[2])) / 2);
    const n = Number(m[1]);
    if (n >= 3 && n <= 80) return Math.round(n);
  }
  return null;
}

const treks = sync.filter((x) => x.type === "trek" && x.ok);
for (const t of treks) {
  process.stdout.write(`${t.slug}... `);
  try {
    const html = await fetch(t.url, {
      headers: { "user-agent": "TrekRootsSync/1.0" },
    }).then((r) => r.text());
    const km = extractTrailKm(strip(html));
    t.trailKm = km;
    console.log(km ?? "null");
  } catch (e) {
    console.log("fail", e.message);
  }
  await new Promise((r) => setTimeout(r, 350));
}

writeFileSync(
  join(root, "tools/securetravels-sync.json"),
  JSON.stringify(sync, null, 2),
);

// Patch distanceKm in treks.ts
let src = readFileSync(join(root, "src/data/treks.ts"), "utf8");
let n = 0;
for (const t of treks) {
  if (t.trailKm == null) continue;
  const re = new RegExp(
    `(slug:\\s*"${t.slug}"[\\s\\S]*?distanceKm:\\s*)([\\d.]+)`,
    "m",
  );
  const next = src.replace(re, `$1${t.trailKm}`);
  if (next !== src) {
    src = next;
    n++;
    console.log(`set ${t.slug} distanceKm=${t.trailKm}`);
  }
}
writeFileSync(join(root, "src/data/treks.ts"), src);
console.log(`Updated distances: ${n}`);
