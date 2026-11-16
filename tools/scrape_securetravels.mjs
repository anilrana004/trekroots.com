/**
 * One-shot Secure Travels fact scraper for catalog sync.
 * Usage: node --env-file=.env.local tools/scrape_securetravels.mjs
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PAGES = [
  // treks
  { type: "trek", slug: "har-ki-dun", url: "https://securetravels.in/trek/har-ki-dun-trek/" },
  { type: "trek", slug: "dayara-bugyal", url: "https://securetravels.in/trek/dayara-bugyal-trek/" },
  { type: "trek", slug: "devkund-waterfall", url: "https://securetravels.in/trek/devkund-waterfall-trek/" },
  { type: "trek", slug: "sar-pass", url: "https://securetravels.in/trek/sar-pass-trek/" },
  { type: "trek", slug: "kuari-pass", url: "https://securetravels.in/trek/kuari-pass-trek/" },
  { type: "trek", slug: "hampta-pass", url: "https://securetravels.in/trek/hampta-pass-trek/" },
  { type: "trek", slug: "kedarkantha", url: "https://securetravels.in/trek/kedarkantha-trek/" },
  { type: "trek", slug: "brahmatal", url: "https://securetravels.in/trek/brahmatal-trek/" },
  { type: "trek", slug: "andharban-jungle", url: "https://securetravels.in/trek/andharban-jungle-trek/" },
  { type: "trek", slug: "chopta-tungnath", url: "https://securetravels.in/trek/chopta-tungnath-trek/" },
  { type: "trek", slug: "valley-of-flowers", url: "https://securetravels.in/trek/valley-of-flowers-trek/" },
  { type: "trek", slug: "kalsubai", url: "https://securetravels.in/trek/kalsubai-trek/" },
  { type: "trek", slug: "harishchandragad-night", url: "https://securetravels.in/trek/harishchandragad-night-trek/" },
  { type: "trek", slug: "kedarkantha-hometown", url: "https://securetravels.in/trek/kedarkantha-trek-hometown/" },
  { type: "trek", slug: "nag-tibba", url: "https://securetravels.in/trek/nag-tibba-trek/" },
  { type: "trek", slug: "rajmachi-fireflies", url: "https://securetravels.in/trek/rajmachi-fireflies-camping-trek/" },
  { type: "trek", slug: "phulara-ridge", url: "https://securetravels.in/trek/phulara-ridge-trek/" },
  // yatras
  { type: "yatra", slug: "kedarnath", url: "https://securetravels.in/spiritual-pilgrimage/kedarnath-yatra/" },
  { type: "yatra", slug: "char-dham", url: "https://securetravels.in/spiritual-pilgrimage/char-dham-yatra/" },
  { type: "yatra", slug: "kedarnath-chopta-tungnath", url: "https://securetravels.in/spiritual-pilgrimage/kedarnath-with-chopta-tungnath-trek/" },
  { type: "yatra", slug: "kedar-badri-chopta-tungnath", url: "https://securetravels.in/spiritual-pilgrimage/kedar-badri-with-chopta-tungnath-trek/" },
  { type: "yatra", slug: "do-dham-yatra", url: "https://securetravels.in/spiritual-pilgrimage/do-dham-yatra/" },
  { type: "yatra", slug: "adi-kailash-om-parvat", url: "https://securetravels.in/spiritual-pilgrimage/adi-kailash-om-parvat-yatra/" },
  // packages
  { type: "package", slug: "spiti-valley-tour", url: "https://securetravels.in/spiti-valley/spiti-valley-tour/" },
  { type: "package", slug: "summer-spiti-valley", url: "https://securetravels.in/spiti-valley/summer-spiti-valley-tour/" },
  { type: "package", slug: "kerala-full-circuit", url: "https://securetravels.in/tours/kerala-full-circuit-tours/" },
  { type: "package", slug: "best-of-uttarakhand", url: "https://securetravels.in/tours/the-best-of-uttarakhand/" },
  { type: "package", slug: "amritsar-mcleodganj-bir-kasol-manali", url: "https://securetravels.in/tours/amritsar-mcleodganj-bir-kasol-manali-tour/" },
  { type: "package", slug: "mcleodganj-bir-kasol-manali", url: "https://securetravels.in/tours/mcleodganj-bir-kasol-manali-tour/" },
  { type: "package", slug: "kasol-manali-solang", url: "https://securetravels.in/tours/kasol-manali-solang-valley-tour/" },
  { type: "package", slug: "jibhi-tirthan-valley", url: "https://securetravels.in/tours/jibhi-tirthan-valley-road-trip/" },
  { type: "package", slug: "ladakh-bike-8d-7n", url: "https://securetravels.in/ladakh/ladakh-bike-trip-8d-7n/" },
  { type: "package", slug: "ladakh-bike-7d-6n", url: "https://securetravels.in/ladakh/ladakh-bike-trip-7d-6n/" },
  { type: "package", slug: "ladakh-bike-6d-5n", url: "https://securetravels.in/ladakh/ladakh-bike-trip-6d-5n/" },
  { type: "package", slug: "kerala-short-getaway", url: "https://securetravels.in/tours/kerala-short-getaway/" },
];

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function parseMoney(s) {
  if (!s) return null;
  const n = Number(String(s).replace(/[^\d]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

function parseDuration(text) {
  // "4 Nights / 5 Days" or "1 Day"
  const m = text.match(/(\d+)\s*Nights?\s*\/\s*(\d+)\s*Days?/i);
  if (m) return { nights: Number(m[1]), days: Number(m[2]) };
  const d = text.match(/(\d+)\s*Days?/i);
  if (d) return { nights: Math.max(0, Number(d[1]) - 1), days: Number(d[1]) };
  return null;
}

function parseAltitudeFt(text) {
  const m = text.match(/Altitude\s*([\d,]+)\s*ft/i) || text.match(/([\d,]+)\s*ft\.?/i);
  if (!m) return null;
  return Number(m[1].replace(/,/g, ""));
}

function parseDistanceKm(text) {
  // FAQ or body: "approximately 20–24 kilometers" / "Approx. 22 km"
  const ranges = [
    /(?:total distance|covers approximately|approximately|approx\.?)\s*([\d.]+)\s*[–-]\s*([\d.]+)\s*kilo?m/i,
    /(?:trek distance|distance)\s*(?:approx\.?)?\s*([\d.]+)\s*km/i,
    /([\d.]+)\s*[–-]\s*([\d.]+)\s*kilometers?/i,
  ];
  for (const re of ranges) {
    const m = text.match(re);
    if (!m) continue;
    if (m[2]) {
      const a = Number(m[1]);
      const b = Number(m[2]);
      return Math.round((a + b) / 2);
    }
    return Math.round(Number(m[1]));
  }
  return null;
}

function extractFacts(html, meta) {
  const text = stripHtml(html);
  const durationLabel =
    text.match(/Duration\s*((?:\d+\s*Nights?\s*\/\s*)?\d+\s*Days?)/i)?.[1] ||
    null;
  const duration = durationLabel ? parseDuration(durationLabel) : null;
  const difficulty =
    text.match(/Difficulty\s*((?:Easy|Moderate|Challenging|Difficult)(?:\s*to\s*(?:Easy|Moderate|Challenging|Difficult))?)/i)?.[1] ||
    null;
  const bestSeason =
    text.match(/Best Season\s*([A-Za-z0-9 ,\-–]+?)(?=\s*(?:Starting from|Region|Pickup|Duration|Altitude|Difficulty|$))/i)?.[1]?.trim() ||
    null;

  // Prices: look near "Starting from" / Offer Price
  const priceBlock =
    text.match(/Starting from\s*₹?\s*([\d,]+)/i) ||
    text.match(/Offer Price[^\d]*₹?\s*([\d,]+)/i);
  const sale = priceBlock ? parseMoney(priceBlock[1]) : null;

  // Original / struck price often appears as ₹X,XXX ₹Y,YYY
  let original = null;
  const pair = text.match(/₹\s*([\d,]+)\s*₹\s*([\d,]+)/);
  if (pair) {
    const a = parseMoney(pair[1]);
    const b = parseMoney(pair[2]);
    if (a && b) {
      original = Math.max(a, b);
      // sale is the smaller if Starting from wasn't found
    }
  }
  const offerPair = text.match(/₹\s*([\d,]+)\s*₹\s*([\d,]+)\s*Popular/i);
  if (offerPair) {
    // pattern: sale then original near Popular badge
    const a = parseMoney(offerPair[1]);
    const b = parseMoney(offerPair[2]);
    if (a && b) {
      return finalize(meta, {
        duration,
        durationLabel,
        difficulty,
        bestSeason,
        altitudeFt: parseAltitudeFt(text),
        distanceKm: parseDistanceKm(text),
        priceINR: Math.min(a, b),
        originalINR: Math.max(a, b),
      });
    }
  }

  const altitudeFt = parseAltitudeFt(
    text.match(/Altitude\s*([\d,]+\s*ft\.?)/i)?.[0] || text,
  );
  const distanceKm = parseDistanceKm(text);

  return finalize(meta, {
    duration,
    durationLabel,
    difficulty,
    bestSeason,
    altitudeFt,
    distanceKm,
    priceINR: sale,
    originalINR: original && sale && original > sale ? original : original,
  });
}

function finalize(meta, facts) {
  return { ...meta, ...facts, ok: true };
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (compatible; TrekRootsSync/1.0; +https://www.trekroots.com)",
      accept: "text/html",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

async function main() {
  const out = [];
  for (const page of PAGES) {
    process.stdout.write(`fetch ${page.slug}... `);
    try {
      const html = await fetchPage(page.url);
      const facts = extractFacts(html, page);
      out.push(facts);
      console.log(
        `ok price=${facts.priceINR} orig=${facts.originalINR} dist=${facts.distanceKm} dur=${facts.durationLabel} alt=${facts.altitudeFt}`,
      );
    } catch (err) {
      console.log(`FAIL ${err.message}`);
      out.push({ ...page, ok: false, error: String(err.message) });
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  const dest = join(__dirname, "securetravels-sync.json");
  writeFileSync(dest, JSON.stringify(out, null, 2));
  console.log(`\nWrote ${dest}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
