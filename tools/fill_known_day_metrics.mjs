import { readFileSync, writeFileSync } from "node:fs";

let src = readFileSync("src/data/treks.ts", "utf8");

/** Known day metrics when Secure Travels day cards omit km. */
const MANUAL = {
  "hampta-pass": [
    { distanceKm: 4, startAltitudeM: 2800, endAltitudeM: 3050, difficulty: "Trek · 2–3 Hours" },
    { distanceKm: 5, startAltitudeM: 3050, endAltitudeM: 3600, difficulty: "Trek · 5–6 Hours" },
    { distanceKm: 9, startAltitudeM: 3600, endAltitudeM: 3500, difficulty: "Trek · 7–9 Hours" },
    { distanceKm: 7, startAltitudeM: 3500, endAltitudeM: 3360, difficulty: "Trek · 4–5 Hours" },
    { distanceKm: 85, startAltitudeM: 3360, endAltitudeM: 2050, difficulty: "Drive · 4–5 Hours" },
  ],
  "har-ki-dun": [
    { distanceKm: 200, startAltitudeM: 640, endAltitudeM: 1950, difficulty: "Drive · 8–10 Hours" },
    { distanceKm: 10, startAltitudeM: 1950, endAltitudeM: 2500, difficulty: "Trek · 6–7 Hours" },
    { distanceKm: 8, startAltitudeM: 2500, endAltitudeM: 2900, difficulty: "Trek · 5–6 Hours" },
    { distanceKm: 5, startAltitudeM: 2900, endAltitudeM: 3566, difficulty: "Trek · 5–6 Hours" },
    { distanceKm: 10, startAltitudeM: 3566, endAltitudeM: 2500, difficulty: "Trek · 6–7 Hours" },
    { distanceKm: 8, startAltitudeM: 2500, endAltitudeM: 1950, difficulty: "Trek · 5–6 Hours" },
    { distanceKm: 200, startAltitudeM: 1950, endAltitudeM: 640, difficulty: "Drive · 8–10 Hours" },
  ],
  "kedarkantha-hometown": [
    null,
    null,
    { distanceKm: 200, startAltitudeM: 640, endAltitudeM: 1950, difficulty: "Drive · 8–9 Hours" },
    { distanceKm: 4, startAltitudeM: 1950, endAltitudeM: 2700, difficulty: "Trek · 4–5 Hours" },
    { distanceKm: 4, startAltitudeM: 2700, endAltitudeM: 3400, difficulty: "Trek · 3–4 Hours" },
    { distanceKm: 7, startAltitudeM: 3400, endAltitudeM: 2700, difficulty: "Trek · 7–9 Hours" },
    null,
    null,
    null,
  ],
  "dayara-bugyal": [
    { distanceKm: 185, startAltitudeM: 640, endAltitudeM: 2200, difficulty: "Drive · 7–8 Hours" },
    { distanceKm: 5, startAltitudeM: 2200, endAltitudeM: 2900, difficulty: "Trek · 4–5 Hours" },
    { distanceKm: 7, startAltitudeM: 2900, endAltitudeM: 3688, difficulty: "Trek · 6–7 Hours" },
    { distanceKm: 5, startAltitudeM: 2900, endAltitudeM: 640, difficulty: "Trek · 3–4 Hours · drive 7–8 Hours" },
  ],
  "chopta-tungnath": [
    { distanceKm: 220, startAltitudeM: 340, endAltitudeM: 2600, difficulty: "Drive · 8–10 Hours" },
    { distanceKm: 6, startAltitudeM: 2600, endAltitudeM: 3680, difficulty: "Trek · 6–7 Hours" },
    { distanceKm: 5, startAltitudeM: 2600, endAltitudeM: 340, difficulty: "Trek · 3–4 Hours · drive 8–10 Hours" },
  ],
  "valley-of-flowers": [
    { distanceKm: 265, startAltitudeM: 340, endAltitudeM: 1900, difficulty: "Drive · 9–10 Hours" },
    { distanceKm: 9, startAltitudeM: 1900, endAltitudeM: 3049, difficulty: "Trek · 5–6 Hours" },
    { distanceKm: 10, startAltitudeM: 3049, endAltitudeM: 3049, difficulty: "Trek · 6–7 Hours" },
    { distanceKm: 14, startAltitudeM: 3049, endAltitudeM: 3049, difficulty: "Trek · 8–9 Hours" },
    { distanceKm: 9, startAltitudeM: 3049, endAltitudeM: 1900, difficulty: "Trek · 4–5 Hours" },
    { distanceKm: 265, startAltitudeM: 1900, endAltitudeM: 340, difficulty: "Drive · 9–10 Hours" },
  ],
};

/** Trail totals (walking km, not drive). */
const TRAIL_TOTALS = {
  "dayara-bugyal": 17,
  "har-ki-dun": 41,
  "devkund-waterfall": 7,
  "sar-pass": 46,
  "kuari-pass": 33,
  "brahmatal": 24,
  "andharban-jungle": 14,
  "chopta-tungnath": 11,
  "valley-of-flowers": 42,
  "kalsubai": 7,
  "harishchandragad-night": 7,
  "nag-tibba": 12,
  "rajmachi-fireflies": 10,
  "phulara-ridge": 31,
  "hampta-pass": 25,
};

let patches = 0;

for (const [slug, days] of Object.entries(MANUAL)) {
  const blockRe = new RegExp(
    `(slug:\\s*"${slug}"[\\s\\S]*?itinerary:\\s*\\[)([\\s\\S]*?)(\\r?\\n    \\],\\r?\\n    inclusions:)`,
    "m",
  );
  const m = src.match(blockRe);
  if (!m) {
    console.log("missing", slug);
    continue;
  }
  let dayIdx = 0;
  let itinerary = m[2];
  const dayRe =
    /(\{\s*\r?\n\s*day:\s*)(\d+)(,\s*\r?\n\s*title:\s*"[^"]*",\s*\r?\n\s*route:\s*"[^"]*",\s*\r?\n\s*distanceKm:\s*)([\d.]+)(,\s*\r?\n\s*startAltitudeM:\s*)([\d.]+)(,\s*\r?\n\s*endAltitudeM:\s*)([\d.]+)(,\s*\r?\n[\s\S]*?difficulty:\s*")([^"]*)(")/g;

  itinerary = itinerary.replace(
    dayRe,
    (full, p1, dayNum, p3, dist, p5, startAlt, p7, endAlt, p9, diff, p11) => {
      const facts = days[dayIdx++];
      if (!facts) return full;
      patches++;
      return `${p1}${dayNum}${p3}${facts.distanceKm}${p5}${facts.startAltitudeM}${p7}${facts.endAltitudeM}${p9}${facts.difficulty}${p11}`;
    },
  );
  src = src.replace(blockRe, `$1${itinerary}$3`);
  console.log(slug, "days", dayIdx);
}

for (const [slug, total] of Object.entries(TRAIL_TOTALS)) {
  const re = new RegExp(
    `(slug:\\s*"${slug}",\\s*\\r?\\n\\s*state:[\\s\\S]*?durationNights:\\s*\\d+,\\s*\\r?\\n\\s*distanceKm:\\s*)(\\d+)`,
  );
  const m = src.match(re);
  if (!m) {
    console.log("trail skip", slug);
    continue;
  }
  if (Number(m[2]) === total) continue;
  src = src.replace(re, `$1${total}`);
  patches++;
  console.log("trail total", slug, m[2], "→", total);
}

writeFileSync("src/data/treks.ts", src);
console.log("patches", patches);
