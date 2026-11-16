import { readFileSync, writeFileSync } from "node:fs";

const report = JSON.parse(readFileSync("tools/day-distances.json", "utf8"));
let src = readFileSync("src/data/treks.ts", "utf8");

function avgRange(a, b) {
  if (b == null || Number.isNaN(b)) return a;
  return Math.round((a + b) / 2);
}

function parseKm(plain, existing) {
  // Prefer trek distance when both drive + trek appear on the same day card.
  const trek = plain.match(
    /Trek Distance\s*(?:Approx\.?\s*)?([\d.]+)(?:\s*[–-]\s*([\d.]+))?\s*km/i,
  );
  if (trek) return avgRange(Number(trek[1]), trek[2] ? Number(trek[2]) : null);

  const drive = plain.match(
    /Drive Distance\s*(?:Approx\.?\s*)?([\d.]+)(?:\s*[–-]\s*([\d.]+))?\s*km/i,
  );
  if (drive) return avgRange(Number(drive[1]), drive[2] ? Number(drive[2]) : null);

  if (existing != null && Number(existing) > 0) return Number(existing);
  return null;
}

function parseEndAltitudeM(plain, existing) {
  if (existing != null && Number(existing) > 0) return Number(existing);

  // Prefer explicit meter values if present; otherwise convert ft.
  const m = plain.match(/Altitude\s*(?:Approx\.?\s*)?([\d,]+)\s*m\b/i);
  if (m) return Number(m[1].replace(/,/g, ""));

  const ft = plain.match(
    /Altitude\s*(?:Approx\.?\s*)?([\d,]+)\s*ft/i,
  );
  if (ft) return Math.round(Number(ft[1].replace(/,/g, "")) * 0.3048);

  return null;
}

function difficultyFrom(facts) {
  if (facts.trekTime) return `Trek · ${facts.trekTime}`;
  if (facts.driveTime) return `Drive · ${facts.driveTime}`;
  return null;
}

let patched = 0;

for (const { slug, days } of report) {
  const enriched = days.map((d) => {
    const plain = d.plain || "";
    return {
      distanceKm: parseKm(plain, d.distanceKm),
      endAltitudeM: parseEndAltitudeM(plain, d.endAltitudeM),
      difficulty: difficultyFrom(d),
    };
  });

  // Chain start altitudes from previous end when available.
  for (let i = 0; i < enriched.length; i++) {
    if (i === 0) {
      enriched[i].startAltitudeM = null;
      continue;
    }
    const prevEnd = enriched[i - 1].endAltitudeM;
    enriched[i].startAltitudeM =
      prevEnd != null && prevEnd > 0 ? prevEnd : null;
  }

  const blockRe = new RegExp(
    `(slug:\\s*"${slug}"[\\s\\S]*?itinerary:\\s*\\[)([\\s\\S]*?)(\\r?\\n    \\],\\r?\\n    inclusions:)`,
    "m",
  );
  const m = src.match(blockRe);
  if (!m) {
    console.log("skip block", slug);
    continue;
  }

  let dayIdx = 0;
  let itinerary = m[2];
  const dayRe =
    /(\{\s*\r?\n\s*day:\s*)(\d+)(,\s*\r?\n\s*title:\s*"[^"]*",\s*\r?\n\s*route:\s*"[^"]*",\s*\r?\n\s*distanceKm:\s*)([\d.]+)(,\s*\r?\n\s*startAltitudeM:\s*)([\d.]+)(,\s*\r?\n\s*endAltitudeM:\s*)([\d.]+)(,\s*\r?\n[\s\S]*?difficulty:\s*")([^"]*)(")/g;

  itinerary = itinerary.replace(
    dayRe,
    (
      full,
      p1,
      dayNum,
      p3,
      dist,
      p5,
      startAlt,
      p7,
      endAlt,
      p9,
      diff,
      p11,
    ) => {
      const facts = enriched[dayIdx++];
      if (!facts) return full;

      let nextDist = dist;
      let nextStart = startAlt;
      let nextEnd = endAlt;
      let nextDiff = diff;

      // Keep carefully filled Kedarkantha numbers if already non-zero.
      if (Number(dist) <= 0 && facts.distanceKm != null && facts.distanceKm > 0) {
        nextDist = String(facts.distanceKm);
      }
      if (
        Number(startAlt) <= 0 &&
        facts.startAltitudeM != null &&
        facts.startAltitudeM > 0
      ) {
        nextStart = String(facts.startAltitudeM);
      }
      if (
        Number(endAlt) <= 0 &&
        facts.endAltitudeM != null &&
        facts.endAltitudeM > 0
      ) {
        nextEnd = String(facts.endAltitudeM);
      }
      if (
        (diff === "As per day plan" || !diff) &&
        facts.difficulty
      ) {
        nextDiff = facts.difficulty;
      }

      if (
        nextDist === dist &&
        nextStart === startAlt &&
        nextEnd === endAlt &&
        nextDiff === diff
      ) {
        return full;
      }
      patched++;
      return `${p1}${dayNum}${p3}${nextDist}${p5}${nextStart}${p7}${nextEnd}${p9}${nextDiff}${p11}`;
    },
  );

  if (dayIdx === 0) {
    console.log("no day matches", slug);
    continue;
  }
  src = src.replace(blockRe, `$1${itinerary}$3`);
  console.log(
    slug,
    `days=${dayIdx}`,
    enriched
      .map(
        (e, i) =>
          `D${i + 1}:${e.distanceKm ?? "-"}km ${e.startAltitudeM ?? "-"}→${e.endAltitudeM ?? "-"}m`,
      )
      .join(" | "),
  );
}

writeFileSync("src/data/treks.ts", src);
console.log("total field patches", patched);
