/**
 * Scrape per-day Distance / Altitude from Secure Travels trek pages
 * and patch matching itinerary days in src/data/treks.ts when values exist.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const TREKS = [
  ["har-ki-dun", "https://securetravels.in/trek/har-ki-dun-trek/"],
  ["dayara-bugyal", "https://securetravels.in/trek/dayara-bugyal-trek/"],
  ["devkund-waterfall", "https://securetravels.in/trek/devkund-waterfall-trek/"],
  ["sar-pass", "https://securetravels.in/trek/sar-pass-trek/"],
  ["kuari-pass", "https://securetravels.in/trek/kuari-pass-trek/"],
  ["hampta-pass", "https://securetravels.in/trek/hampta-pass-trek/"],
  ["brahmatal", "https://securetravels.in/trek/brahmatal-trek/"],
  ["andharban-jungle", "https://securetravels.in/trek/andharban-jungle-trek/"],
  ["chopta-tungnath", "https://securetravels.in/trek/chopta-tungnath-trek/"],
  ["valley-of-flowers", "https://securetravels.in/trek/valley-of-flowers-trek/"],
  ["kalsubai", "https://securetravels.in/trek/kalsubai-trek/"],
  ["harishchandragad-night", "https://securetravels.in/trek/harishchandragad-night-trek/"],
  ["kedarkantha-hometown", "https://securetravels.in/trek/kedarkantha-trek-hometown/"],
  ["nag-tibba", "https://securetravels.in/trek/nag-tibba-trek/"],
  ["rajmachi-fireflies", "https://securetravels.in/trek/rajmachi-fireflies-camping-trek/"],
  ["phulara-ridge", "https://securetravels.in/trek/phulara-ridge-trek/"],
];

function ftToM(ft) {
  return Math.round(ft / 3.28084);
}

function parseDayLists(html) {
  const blocks = [
    ...html.matchAll(/<div class="ct-day-list">([\s\S]*?)<\/div>\s*<\/div>/g),
  ];
  return blocks.map((m) => {
    const plain = m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const dist =
      plain.match(/Distance\s*([\d.]+)\s*km/i)?.[1] ??
      plain.match(/Distance\s*([\d.]+)\s*[–-]\s*([\d.]+)\s*km/i);
    let distanceKm = null;
    if (typeof dist === "string") distanceKm = Number(dist);
    else if (Array.isArray(dist) || (dist && dist[1])) {
      // regex match object
    }
    const distM = plain.match(
      /Distance\s*([\d.]+)(?:\s*[–-]\s*([\d.]+))?\s*km/i,
    );
    if (distM) {
      distanceKm = distM[2]
        ? Math.round((Number(distM[1]) + Number(distM[2])) / 2)
        : Number(distM[1]);
    }
    const altM = plain.match(/Altitude\s*([\d,]+)\s*ft/i);
    const endAltitudeM = altM ? ftToM(Number(altM[1].replace(/,/g, ""))) : null;
    const trekTime = plain.match(/Trek Time\s*([^<]+?)(?=\s*(?:Stay|Drive|Highlight|Distance|Altitude|$))/i)?.[1]?.trim();
    const driveTime = plain.match(/Drive Time\s*([^<]+?)(?=\s*(?:Stay|Trek|Highlight|Distance|Altitude|$))/i)?.[1]?.trim();
    return { distanceKm, endAltitudeM, trekTime, driveTime, plain: plain.slice(0, 120) };
  });
}

let src = readFileSync(join(root, "src/data/treks.ts"), "utf8");
const report = [];

for (const [slug, url] of TREKS) {
  process.stdout.write(`${slug}... `);
  try {
    const html = await fetch(url, {
      headers: { "user-agent": "TrekRootsSync/1.0" },
    }).then((r) => r.text());
    const days = parseDayLists(html);
    console.log(`${days.length} day-lists`, days.map((d) => d.distanceKm).join(","));
    report.push({ slug, days });

    // Patch each itinerary day that still has distanceKm: 0 when we have a value
    for (let i = 0; i < days.length; i++) {
      const d = days[i];
      if (d.distanceKm == null || d.distanceKm <= 0) continue;
      // Replace the Nth distanceKm: 0 inside this trek's itinerary only — careful.
      // Find trek block then replace day by day using title proximity is hard;
      // instead replace sequential `distanceKm: 0` within slug block for itinerary days
    }
  } catch (e) {
    console.log("fail", e.message);
  }
  await new Promise((r) => setTimeout(r, 350));
}

writeFileSync(
  join(root, "tools/day-distances.json"),
  JSON.stringify(report, null, 2),
);

// Apply: for each trek, walk itinerary day objects in order and set distance/altitude
for (const { slug, days } of report) {
  if (!days?.length) continue;
  const blockRe = new RegExp(
    `(slug:\\s*"${slug}"[\\s\\S]*?itinerary:\\s*\\[)([\\s\\S]*?)(\\n    \\],)`,
    "m",
  );
  const m = src.match(blockRe);
  if (!m) {
    console.log("no itinerary block", slug);
    continue;
  }
  let itinerary = m[2];
  let dayIdx = 0;
  itinerary = itinerary.replace(
    /\{\s*day:\s*(\d+),[\s\S]*?landmarks:\s*\[[^\]]*\]\s*\}/g,
    (dayBlock) => {
      const facts = days[dayIdx++];
      if (!facts) return dayBlock;
      let next = dayBlock;
      if (facts.distanceKm != null && facts.distanceKm > 0) {
        next = next.replace(
          /distanceKm:\s*[\d.]+/,
          `distanceKm: ${facts.distanceKm}`,
        );
      }
      if (facts.endAltitudeM != null && facts.endAltitudeM > 0) {
        // only set end if currently 0; set start from previous end when 0
        next = next.replace(
          /endAltitudeM:\s*0/,
          `endAltitudeM: ${facts.endAltitudeM}`,
        );
      }
      if (facts.trekTime && /difficulty:\s*"As per day plan"/.test(next)) {
        next = next.replace(
          /difficulty:\s*"As per day plan"/,
          `difficulty: ${JSON.stringify(`Trek · ${facts.trekTime}`)}`,
        );
      } else if (
        facts.driveTime &&
        /difficulty:\s*"As per day plan"/.test(next)
      ) {
        next = next.replace(
          /difficulty:\s*"As per day plan"/,
          `difficulty: ${JSON.stringify(`Drive · ${facts.driveTime}`)}`,
        );
      }
      return next;
    },
  );
  src = src.replace(blockRe, `$1${itinerary}$3`);
}

writeFileSync(join(root, "src/data/treks.ts"), src);
console.log("patched treks.ts");
