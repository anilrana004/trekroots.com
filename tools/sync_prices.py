"""Rewrites catalog priceRange lines from the audited securetravels.in figures.

Run from the project root: python tools/sync_prices.py
One-off sync helper; the catalog files stay the source of truth afterwards.
"""

import re
from pathlib import Path

# slug -> (selling price, list price before discount)
PRICES = {
    "treks.ts": {
        "har-ki-dun": (9499, 11499),
        "dayara-bugyal": (4500, 5999),
        "devkund-waterfall": (1549, 1999),
        "sar-pass": (5999, 7999),
        "kuari-pass": (7999, 9999),
        "hampta-pass": (5999, 6999),
        "kedarkantha": (3999, 5999),
        "brahmatal": (6999, 8999),
        "andharban-jungle": (1549, 1999),
        "chopta-tungnath": (6500, 8499),
        "valley-of-flowers": (6500, 8500),
        "kalsubai": (1399, 1899),
        "harishchandragad-night": (1449, 1900),
        "kedarkantha-hometown": (9999, 11999),
        "nag-tibba": (2000, 3000),
        "rajmachi-fireflies": (1699, 2099),
        "phulara-ridge": (8999, 10999),
    },
    "yatras.ts": {
        "kedarnath": (9499, 11499),
        "char-dham": (19999, 21999),
        "kedarnath-chopta-tungnath": (11500, 13500),
        "kedar-badri-chopta-tungnath": (13499, 15499),
        "do-dham-yatra": (13499, 15499),
        "adi-kailash-om-parvat": (36999, 41999),
    },
    "packages.ts": {
        "spiti-valley-tour": (17999, 21999),
        "summer-spiti-valley": (18999, 20999),
        "kerala-full-circuit": (17499, 20999),
        "kerala-short-getaway": (10499, 12999),
        "best-of-uttarakhand": (16500, 19500),
        "ladakh-bike-6d-5n": (10999, 15999),
        "ladakh-bike-7d-6n": (13999, 19999),
        "ladakh-bike-8d-7n": (19999, 24999),
        # Priced on request at the source too.
        "amritsar-mcleodganj-bir-kasol-manali": (0, 0),
        "mcleodganj-bir-kasol-manali": (0, 0),
        "kasol-manali-solang": (0, 0),
        "jibhi-tirthan-valley": (0, 0),
    },
}

SLUG = re.compile(r"^\s*slug: \"([^\"]+)\",", re.M)
PRICE = re.compile(r"^(\s*)priceRange: \{[^}]*\},", re.M)


def sync(path: Path, prices: dict[str, tuple[int, int]]) -> int:
    text = path.read_text(encoding="utf-8")
    slugs = [(m.start(), m.group(1)) for m in SLUG.finditer(text)]
    changed = 0

    def current_slug(pos: int) -> str | None:
        found = None
        for start, slug in slugs:
            if start < pos:
                found = slug
            else:
                break
        return found

    def replace(match: re.Match[str]) -> str:
        nonlocal changed
        slug = current_slug(match.start())
        if slug not in prices:
            print(f"  ! no price for {slug}, left unchanged")
            return match.group(0)
        selling, original = prices[slug]
        indent = match.group(1)
        if original > selling:
            line = (
                f"{indent}priceRange: {{ minINR: {selling}, maxINR: {selling}, "
                f"originalINR: {original} }},"
            )
        else:
            line = f"{indent}priceRange: {{ minINR: {selling}, maxINR: {selling} }},"
        if line != match.group(0):
            changed += 1
            print(f"  ~ {slug}: {match.group(0).strip()} -> {line.strip()}")
        return line

    updated = PRICE.sub(replace, text)
    if updated != text:
        path.write_text(updated, encoding="utf-8")
    return changed


def main() -> None:
    root = Path(__file__).resolve().parent.parent / "src" / "data"
    for filename, prices in PRICES.items():
        print(filename)
        print(f"  {sync(root / filename, prices)} changed")


if __name__ == "__main__":
    main()
