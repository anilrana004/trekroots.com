"""Generate TrekRoots TypeScript catalog data from scraped Secure Travels JSON."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = Path(__file__).resolve().parent / "secure_travels_raw.json"
DATA = ROOT / "src" / "data"

TREK_SLUG_MAP = {
    "kedarkantha-trek": "kedarkantha",
    "valley-of-flowers-trek": "valley-of-flowers",
    "har-ki-dun-trek": "har-ki-dun",
    "kuari-pass-trek": "kuari-pass",
    "brahmatal-trek": "brahmatal",
    "hampta-pass-trek": "hampta-pass",
    "sar-pass-trek": "sar-pass",
    "dayara-bugyal-trek": "dayara-bugyal",
    "devkund-waterfall-trek": "devkund-waterfall",
    "andharban-jungle-trek": "andharban-jungle",
    "chopta-tungnath-trek": "chopta-tungnath",
    "kalsubai-trek": "kalsubai",
    "harishchandragad-night-trek": "harishchandragad-night",
    "kedarkantha-trek-hometown": "kedarkantha-hometown",
    "nag-tibba-trek": "nag-tibba",
    "rajmachi-fireflies-camping-trek": "rajmachi-fireflies",
    "phulara-ridge-trek": "phulara-ridge",
}

YATRA_SLUG_MAP = {
    "char-dham-yatra": "char-dham",
    "kedarnath-yatra": "kedarnath",
    "do-dham-yatra": "do-dham-yatra",
    "kedarnath-with-chopta-tungnath-trek": "kedarnath-chopta-tungnath",
    "kedar-badri-with-chopta-tungnath-trek": "kedar-badri-chopta-tungnath",
    "adi-kailash-om-parvat-yatra": "adi-kailash-om-parvat",
}

PACKAGE_SLUG_MAP = {
    "spiti-valley-tour": "spiti-valley-tour",
    "summer-spiti-valley-tour": "summer-spiti-valley",
    "kerala-full-circuit-tours": "kerala-full-circuit",
    "kerala-short-getaway": "kerala-short-getaway",
    "the-best-of-uttarakhand": "best-of-uttarakhand",
    "amritsar-mcleodganj-bir-kasol-manali-tour": "amritsar-mcleodganj-bir-kasol-manali",
    "mcleodganj-bir-kasol-manali-tour": "mcleodganj-bir-kasol-manali",
    "kasol-manali-solang-valley-tour": "kasol-manali-solang",
    "jibhi-tirthan-valley-road-trip": "jibhi-tirthan-valley",
    "ladakh-bike-trip-8d-7n": "ladakh-bike-8d-7n",
    "ladakh-bike-trip-7d-6n": "ladakh-bike-7d-6n",
    "ladakh-bike-trip-6d-5n": "ladakh-bike-6d-5n",
}

# Curated Unsplash fallbacks by region keyword
IMAGE_FALLBACKS = {
    "uttarakhand": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
    "himachal": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200",
    "ladakh": "https://images.unsplash.com/photo-1586794002204-8f3f3b0f1c1f?w=1200",
    "spiti": "https://images.unsplash.com/photo-1586794002204-8f3f3b0f1c1f?w=1200",
    "kerala": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200",
    "maharashtra": "https://images.unsplash.com/photo-1566404791232-af9fe0ae8f8b?w=1200",
    "spiritual": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200",
    "default": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200",
}


def esc(s: str) -> str:
    return (
        s.replace("\\", "\\\\")
        .replace("`", "\\`")
        .replace("${", "\\${")
    )


def js_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def clean_desc(text: str) -> str:
    text = text or ""
    text = re.sub(r"\s*Read More.*$", "", text, flags=re.I | re.S)
    text = re.sub(
        r"\s*(Drive Time|Trek Time|Stay|Highlight|Meals)\s+.+$",
        "",
        text,
        flags=re.I,
    )
    text = re.sub(r"\s+", " ", text).strip()
    # Deduplicate accidental repeated overview blocks
    half = len(text) // 2
    if half > 200 and text[:half].strip() == text[half:].strip():
        text = text[:half].strip()
    # Also catch near-duplicate when second copy starts mid-sentence
    for size in range(min(800, len(text) // 2), 200, -50):
        chunk = text[:size]
        idx = text.find(chunk, size)
        if idx > 0 and abs(idx - size) < 20:
            text = text[:idx].strip()
            break
    return text


def parse_duration(facts: dict, itinerary: list) -> tuple[int, int]:
    dur = facts.get("Duration") or ""
    m = re.search(r"(\d+)\s*Nights?\s*/\s*(\d+)\s*Days?", dur, re.I)
    if m:
        return int(m.group(2)), int(m.group(1))
    m = re.search(r"(\d+)\s*Days?\s*/\s*(\d+)\s*Nights?", dur, re.I)
    if m:
        return int(m.group(1)), int(m.group(2))
    m = re.search(r"(\d+)\s*Day", dur, re.I)
    if m:
        d = int(m.group(1))
        return d, max(0, d - 1)
    days = max((d.get("day") or 0) for d in itinerary) if itinerary else 1
    return days, max(0, days - 1)


def parse_altitude_ft(facts: dict) -> tuple[int, int]:
    alt = facts.get("Altitude") or facts.get("Max Altitude") or ""
    m = re.search(r"([\d,]+)\s*ft", alt, re.I)
    if m:
        ft = int(m.group(1).replace(",", ""))
        return round(ft / 3.28084), ft
    m = re.search(r"([\d,]+)\s*m", alt, re.I)
    if m:
        meters = int(m.group(1).replace(",", ""))
        return meters, round(meters * 3.28084)
    return 0, 0


def parse_prices(item: dict) -> tuple[int, int]:
    pmin = item.get("priceMin") or 0
    pmax = item.get("priceMax") or pmin
    if pmin == 0 and pmax == 0:
        return 0, 0
    if pmin > pmax:
        pmin, pmax = pmax, pmin
    # scraped max sometimes equals min; bump display range slightly if original was in facts
    return int(pmin), int(pmax or pmin)


def pick_image(item: dict) -> str:
    region = (item.get("facts") or {}).get("Region", "").lower()
    title = (item.get("title") or "").lower()
    blob = f"{region} {title} {item.get('category','')}"
    for key, url in IMAGE_FALLBACKS.items():
        if key != "default" and key in blob:
            return url
    if item.get("category") == "yatra":
        return IMAGE_FALLBACKS["spiritual"]
    return IMAGE_FALLBACKS["default"]


def state_from_facts(item: dict) -> str:
    region = (item.get("facts") or {}).get("Region", "")
    title = item.get("title") or ""
    blob = f"{region} {title}".lower()
    if "maharashtra" in blob or any(
        k in blob for k in ("kalsubai", "andharban", "devkund", "harishchandragad", "rajmachi")
    ):
        return "Maharashtra"
    if "himachal" in blob or any(
        k in blob for k in ("hampta", "sar pass", "spiti", "jibhi", "kasol", "manali", "mcleod")
    ):
        return "Himachal Pradesh"
    if "ladakh" in blob:
        return "Ladakh"
    if "kerala" in blob:
        return "Kerala"
    if "punjab" in blob or "amritsar" in blob:
        return "Multi-State"
    return "Uttarakhand"


def package_category(item: dict) -> str:
    slug = item.get("slug", "")
    title = (item.get("title") or "").lower()
    if "ladakh" in slug or "ladakh" in title:
        return "Ladakh"
    if "spiti" in slug:
        return "Spiti"
    if "kerala" in slug:
        return "Kerala"
    if any(k in slug for k in ("amritsar", "mcleodganj", "kasol", "jibhi", "manali")):
        return "Himachal"
    if "uttarakhand" in slug:
        return "Uttarakhand"
    return "Adventure"


def itinerary_ts(days: list) -> str:
    parts = []
    for d in days:
        title = d.get("title") or f"Day {d.get('day')}"
        desc = clean_desc(d.get("description") or "")
        meta = d.get("meta") or {}
        stay = meta.get("Stay") or "As per itinerary"
        highlight = meta.get("Highlight") or ""
        meals = meta.get("Meals") or "As per itinerary"
        route = title.replace(" - ", " → ").replace(" – ", " → ")
        landmarks = []
        if highlight:
            landmarks.append(highlight)
        # crude distance from trek time not available; keep 0
        parts.append(
            "      {\n"
            f"        day: {int(d.get('day') or 0)},\n"
            f"        title: {js_str(title)},\n"
            f"        route: {js_str(route)},\n"
            f"        distanceKm: 0,\n"
            f"        startAltitudeM: 0,\n"
            f"        endAltitudeM: 0,\n"
            f"        description: {js_str(desc)},\n"
            f"        campsite: {js_str(stay)},\n"
            f"        mealsIncluded: {js_str(meals)},\n"
            f"        difficulty: {js_str(meta.get('Difficulty') or 'As per day plan')},\n"
            f"        landmarks: {js_str(landmarks)},\n"
            "      }"
        )
    return ",\n".join(parts)


def enrichment_fields(item: dict) -> str:
    faqs = item.get("faqs") or []
    packing = item.get("packing") or {}
    how = item.get("howToReach") or []
    policies = item.get("policies") or {}
    tagline = item.get("tagline") or ""
    fitness = item.get("fitnessTable") or []
    medical = item.get("medicalTable") or []

    packing_list = [
        {"label": k, "items": v} for k, v in packing.items() if v
    ]
    how_list = []
    for h in how:
        how_list.append(
            {
                "title": h.get("heading") or h.get("title") or "How to Reach",
                "steps": h.get("steps") or [],
            }
        )
    policy_list = [{"title": k, "items": v} for k, v in policies.items() if v]

    fitness_tips = []
    for row in fitness[1:]:
        if len(row) >= 2:
            fitness_tips.append(f"{row[0]}: {row[1]}" + (f" ({row[2]})" if len(row) > 2 else ""))

    medical_notes = []
    for row in medical[1:]:
        if len(row) >= 2:
            medical_notes.append(f"{row[0]} — {row[1]}")

    lines = [
        f"    tagline: {js_str(tagline)},",
        f"    faqs: {js_str(faqs)},",
        f"    packing: {js_str(packing_list)},",
        f"    howToReach: {js_str(how_list)},",
        f"    policies: {js_str(policy_list)},",
        f"    fitnessTips: {js_str(fitness_tips)},",
        f"    medicalNotes: {js_str(medical_notes)},",
        f"    sourceUrl: {js_str(item.get('url') or '')},",
    ]
    return "\n".join(lines)


def highlights_from(item: dict) -> list[str]:
    junk = {
        "trek profile graph",
        "walking endurance",
        "leg strength",
        "recovery capacity",
        "cold weather readiness",
        "strong",
        "good",
        "moderate+",
        "important",
        "ideal readiness graph",
    }
    highs = []
    for h in item.get("highlights") or []:
        if not h or h.lower().strip() in junk or len(h) >= 100:
            continue
        if h not in highs:
            highs.append(h)
    for d in item.get("itinerary") or []:
        hl = (d.get("meta") or {}).get("Highlight")
        if hl and hl not in highs and hl.lower() not in junk:
            highs.append(hl)
    # Fall back to first sentences of overview
    if len(highs) < 4 and item.get("overview"):
        for sent in re.split(r"(?<=[.!?])\s+", item["overview"]):
            sent = sent.strip()
            if 40 < len(sent) < 140 and sent not in highs:
                highs.append(sent)
            if len(highs) >= 6:
                break
    return highs[:8]


def gen_trek(item: dict, idx: int) -> str:
    slug = TREK_SLUG_MAP.get(item["slug"], item["slug"])
    facts = item.get("facts") or {}
    days, nights = parse_duration(facts, item.get("itinerary") or [])
    alt_m, alt_ft = parse_altitude_ft(facts)
    pmin, pmax = parse_prices(item)
    # Prefer scraped higher original if listed as priceMax differently - use +GST note via same
    if pmin and pmax == pmin:
        # keep same; homepage often showed original higher - leave as is
        pass
    state = state_from_facts(item)
    pickup = facts.get("Pickup Point") or facts.get("Pick Up Point") or "As per itinerary"
    difficulty = facts.get("Difficulty") or "Moderate"
    season = facts.get("Best Season") or "As per season"
    overview = clean_desc(item.get("overview") or item.get("tagline") or "")
    name = item.get("title") or slug
    inclusions = item.get("inclusions") or []
    exclusions = item.get("exclusions") or []
    highs = highlights_from(item)
    itin = itinerary_ts(item.get("itinerary") or [])

    return f"""  {{
    id: {idx},
    name: {js_str(name)},
    slug: {js_str(slug)},
    state: {js_str(state)},
    region: {js_str(facts.get('Region') or state)},
    durationDays: {days},
    durationNights: {nights},
    distanceKm: 0,
    maxAltitudeM: {alt_m},
    maxAltitudeFt: {alt_ft},
    difficulty: {js_str(difficulty)},
    bestSeason: {js_str(season)},
    startPoint: {js_str(pickup)},
    endPoint: {js_str(pickup)},
    description: {js_str(overview)},
    highlights: {js_str(highs)},
    itinerary: [
{itin}
    ],
    inclusions: {js_str(inclusions)},
    exclusions: {js_str(exclusions)},
    priceRange: {{ minINR: {pmin}, maxINR: {max(pmax, pmin)} }},
    imageUrl: {js_str(pick_image(item))},
    category: "Trek",
{enrichment_fields(item)}
  }}"""


def gen_yatra(item: dict, idx: int) -> str:
    slug = YATRA_SLUG_MAP.get(item["slug"], item["slug"])
    facts = item.get("facts") or {}
    days, nights = parse_duration(facts, item.get("itinerary") or [])
    duration = facts.get("Duration") or f"{nights} Nights / {days} Days"
    season = facts.get("Best Season") or "Seasonal"
    overview = clean_desc(item.get("overview") or item.get("tagline") or "")
    pmin, pmax = parse_prices(item)
    pickup = facts.get("Pickup Point") or "Haridwar / Rishikesh"
    itin = itinerary_ts(item.get("itinerary") or [])
    alt = facts.get("Altitude") or ""
    name = item.get("title") or slug

    return f"""  {{
    id: {idx},
    name: {js_str(name)},
    slug: {js_str(slug)},
    duration: {js_str(duration)},
    season: {js_str(season)},
    route: {js_str(pickup + " circuit")},
    description: {js_str(overview)},
    spiritualSignificance: {js_str(item.get('tagline') or overview[:400])},
    temples: {js_str(highlights_from(item)[:6])},
    registration: "Mandatory registration and biometric checks apply for Uttarakhand Char Dham routes. Team assistance included.",
    priceRange: {{ minINR: {pmin}, maxINR: {max(pmax, pmin)} }},
    imageUrl: {js_str(pick_image(item))},
    helicopterInfo: "Helicopter options available on select yatras (Kedarnath / Badrinath) subject to weather and slot availability.",
    permits: "Forest / temple permits and registrations as applicable are guided by our team.",
    accessibility: "Pony, palki, and doli services available on applicable trek segments.",
    itinerary: [
{itin}
    ],
    inclusions: {js_str(item.get('inclusions') or [])},
    exclusions: {js_str(item.get('exclusions') or [])},
{enrichment_fields(item)}
  }}"""


def gen_package(item: dict, idx: int) -> str:
    slug = PACKAGE_SLUG_MAP.get(item["slug"], item["slug"])
    facts = item.get("facts") or {}
    days, nights = parse_duration(facts, item.get("itinerary") or [])
    duration = facts.get("Duration") or f"{nights} Nights / {days} Days"
    overview = clean_desc(item.get("overview") or item.get("tagline") or "")
    pmin, pmax = parse_prices(item)
    itin = itinerary_ts(item.get("itinerary") or [])
    cat = package_category(item)
    name = item.get("title") or slug
    problem = item.get("tagline") or f"Complete {name} with stays, transfers, and on-ground support."

    return f"""  {{
    id: {idx},
    name: {js_str(name)},
    slug: {js_str(slug)},
    duration: {js_str(duration)},
    problemSolved: {js_str(problem)},
    description: {js_str(overview)},
    itinerary: [
{itin}
    ],
    inclusions: {js_str(item.get('inclusions') or [])},
    exclusions: {js_str(item.get('exclusions') or [])},
    priceRange: {{ minINR: {pmin}, maxINR: {max(pmax, pmin)} }},
    groupSize: "Small group departure",
    imageUrl: {js_str(pick_image(item))},
    category: {js_str(cat)},
    accommodationType: "Hotels / Camps as per itinerary",
{enrichment_fields(item)}
  }}"""


def write_module(path: Path, import_type: str, export_name: str, items: list[str]) -> None:
    body = ",\n".join(items)
    content = (
        f"import type {{ {import_type} }} from './types'\n\n"
        f"export const {export_name}: {import_type}[] = [\n"
        f"{body}\n"
        "]\n"
    )
    path.write_text(content, encoding="utf-8")
    print(f"Wrote {path} ({len(items)} items, {path.stat().st_size} bytes)")


def main() -> None:
    raw = json.loads(RAW.read_text(encoding="utf-8"))
    treks = [x for x in raw if x.get("category") == "trek" and not x.get("error")]
    yatras = [x for x in raw if x.get("category") == "yatra" and not x.get("error")]
    packages = [x for x in raw if x.get("category") == "package" and not x.get("error")]

    write_module(
        DATA / "treks.ts",
        "Trek",
        "treks",
        [gen_trek(t, i) for i, t in enumerate(treks)],
    )
    write_module(
        DATA / "yatras.ts",
        "Yatra",
        "yatras",
        [gen_yatra(y, i) for i, y in enumerate(yatras)],
    )
    write_module(
        DATA / "packages.ts",
        "Package",
        "packages",
        [gen_package(p, i) for i, p in enumerate(packages)],
    )


if __name__ == "__main__":
    main()
