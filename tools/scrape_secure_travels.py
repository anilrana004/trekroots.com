"""Improved Secure Travels scraper using site CSS structure (ct-*)."""
from __future__ import annotations

import json
import re
import time
import urllib.request
from pathlib import Path

from bs4 import BeautifulSoup

OUT = Path(__file__).resolve().parent / "secure_travels_raw.json"

URLS = [
    "https://securetravels.in/trek/har-ki-dun-trek/",
    "https://securetravels.in/trek/dayara-bugyal-trek/",
    "https://securetravels.in/trek/devkund-waterfall-trek/",
    "https://securetravels.in/trek/sar-pass-trek/",
    "https://securetravels.in/trek/kuari-pass-trek/",
    "https://securetravels.in/trek/hampta-pass-trek/",
    "https://securetravels.in/trek/kedarkantha-trek/",
    "https://securetravels.in/trek/brahmatal-trek/",
    "https://securetravels.in/trek/andharban-jungle-trek/",
    "https://securetravels.in/spiti-valley/spiti-valley-tour/",
    "https://securetravels.in/trek/chopta-tungnath-trek/",
    "https://securetravels.in/spiritual-pilgrimage/kedarnath-yatra/",
    "https://securetravels.in/trek/valley-of-flowers-trek/",
    "https://securetravels.in/spiritual-pilgrimage/char-dham-yatra/",
    "https://securetravels.in/spiritual-pilgrimage/kedarnath-with-chopta-tungnath-trek/",
    "https://securetravels.in/spiritual-pilgrimage/kedar-badri-with-chopta-tungnath-trek/",
    "https://securetravels.in/spiritual-pilgrimage/do-dham-yatra/",
    "https://securetravels.in/spiti-valley/summer-spiti-valley-tour/",
    "https://securetravels.in/tours/kerala-full-circuit-tours/",
    "https://securetravels.in/trek/kalsubai-trek/",
    "https://securetravels.in/trek/harishchandragad-night-trek/",
    "https://securetravels.in/tours/the-best-of-uttarakhand/",
    "https://securetravels.in/tours/amritsar-mcleodganj-bir-kasol-manali-tour/",
    "https://securetravels.in/tours/mcleodganj-bir-kasol-manali-tour/",
    "https://securetravels.in/tours/kasol-manali-solang-valley-tour/",
    "https://securetravels.in/tours/jibhi-tirthan-valley-road-trip/",
    "https://securetravels.in/trek/kedarkantha-trek-hometown/",
    "https://securetravels.in/trek/nag-tibba-trek/",
    "https://securetravels.in/trek/rajmachi-fireflies-camping-trek/",
    "https://securetravels.in/trek/phulara-ridge-trek/",
    "https://securetravels.in/spiritual-pilgrimage/adi-kailash-om-parvat-yatra/",
    "https://securetravels.in/ladakh/ladakh-bike-trip-8d-7n/",
    "https://securetravels.in/ladakh/ladakh-bike-trip-7d-6n/",
    "https://securetravels.in/ladakh/ladakh-bike-trip-6d-5n/",
    "https://securetravels.in/tours/kerala-short-getaway/",
]


def clean(text: str | None) -> str:
    if not text:
        return ""
    text = text.replace("\xa0", " ").replace("–", "-").replace("—", "-")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def list_items(root) -> list[str]:
    if not root:
        return []
    items = []
    for li in root.find_all("li"):
        t = clean(li.get_text(" ", strip=True))
        if t and t not in items:
            items.append(t)
    return items


def parse_price(text: str) -> tuple[int | None, int | None]:
    nums = [int(x.replace(",", "")) for x in re.findall(r"₹\s*([\d,]+)", text)]
    nums = [n for n in nums if n > 0]
    if not nums:
        return None, None
    if len(nums) == 1:
        return nums[0], nums[0]
    # often original then discounted
    return min(nums), max(nums)


def extract(soup: BeautifulSoup, url: str) -> dict:
    page = soup.select_one(".ct-page") or soup

    title_el = page.select_one("h1")
    title = clean(title_el.get_text(" ", strip=True) if title_el else "")
    title = re.sub(
        r"\s*(Popular Trek|Popular Tour|Scenic Trail)\s*$", "", title, flags=re.I
    ).strip()

    tagline = ""
    if title_el:
        p = title_el.find_next("p")
        if p:
            tagline = clean(p.get_text(" ", strip=True))

    # Hero facts
    facts = {}
    for fact in page.select(".ct-fact, .ct-stat, .ct-hero-stat"):
        t = clean(fact.get_text(" ", strip=True))
        # Duration4 Nights / 5 Days
        for label in (
            "Duration",
            "Altitude",
            "Difficulty",
            "Best Season",
            "Region",
            "Pickup",
            "Pick Up",
        ):
            if t.lower().startswith(label.lower()):
                facts[label] = clean(t[len(label) :])

    # Also from quick map facts table
    for table in page.select(".ct-table, table"):
        for tr in table.find_all("tr"):
            cells = [clean(td.get_text(" ", strip=True)) for td in tr.find_all(["th", "td"])]
            if len(cells) >= 2:
                facts[cells[0]] = cells[1]

    hero_text = clean((page.select_one(".ct-hero") or page).get_text("\n", strip=True))
    price_min, price_max = parse_price(hero_text)
    m = re.search(r"Starting from\s*₹\s*([\d,]+)", hero_text, re.I)
    if m:
        price_min = int(m.group(1).replace(",", ""))

    # Overview from first ct-section with Why Choose / overview
    overview_parts = []
    for sec in page.select(".ct-section"):
        head = clean((sec.select_one(".ct-title-lg, h2") or sec).get_text(" ", strip=True))
        if any(
            k in head.lower()
            for k in ("why choose", "overview", "about", "experience")
        ):
            for p in sec.select(".ct-desc, p"):
                t = clean(p.get_text(" ", strip=True))
                if t and t.lower() not in ("read more", "add youtube, vimeo, or iframe embed from acf."):
                    overview_parts.append(t)
            break
    overview = "\n\n".join(overview_parts[:15])

    # Itinerary
    itinerary = []
    for day in page.select(".ct-day"):
        num_el = day.select_one(".ct-day-num")
        title_el = day.select_one(".ct-day-title")
        body_el = day.select_one(".ct-day-body")
        list_el = day.select_one(".ct-day-list")
        num_txt = clean(num_el.get_text(" ", strip=True) if num_el else "")
        m = re.search(r"(\d+)", num_txt)
        day_num = int(m.group(1)) if m else len(itinerary) + 1
        day_title = clean(title_el.get_text(" ", strip=True) if title_el else "")
        desc = clean(body_el.get_text("\n", strip=True) if body_el else "")
        meta = {}
        if list_el:
            # Often "Drive Time 8-10 Hours Stay Guesthouse Highlight ..."
            # Split by known labels
            raw = clean(list_el.get_text(" | ", strip=True))
            for label in ("Drive Time", "Trek Time", "Stay", "Highlight", "Meals", "Distance"):
                mm = re.search(
                    rf"{label}\s*[:|]?\s*(.+?)(?=(?:Drive Time|Trek Time|Stay|Highlight|Meals|Distance)|$)",
                    raw,
                    re.I,
                )
                if mm:
                    meta[label] = clean(mm.group(1))
            # Also list items
            for li in list_el.find_all(["li", "div", "span"]):
                t = clean(li.get_text(" ", strip=True))
                for label in ("Drive Time", "Trek Time", "Stay", "Highlight", "Meals"):
                    if t.lower().startswith(label.lower()):
                        meta[label] = clean(t[len(label) :])
        itinerary.append(
            {
                "day": day_num,
                "title": day_title,
                "description": desc,
                "meta": meta,
            }
        )

    # Inclusions / Exclusions
    inclusions, exclusions = [], []
    for card in page.select(".ct-inc-card"):
        head = clean(card.get_text(" ", strip=True))[:40].lower()
        items = list_items(card)
        if "exclusion" in head:
            exclusions = items
        else:
            inclusions = items or inclusions
    if not inclusions or not exclusions:
        for sec in page.select(".ct-section"):
            head = clean((sec.select_one("h2, .ct-title-lg") or sec).get_text(" ", strip=True)).lower()
            if "inclusion" in head or "exclusion" in head or "covered" in head:
                cards = sec.select(".ct-inc-card, .ct-list, ul")
                for card in cards:
                    h = clean(card.get_text(" ", strip=True))[:50].lower()
                    items = list_items(card)
                    if "exclusion" in h:
                        exclusions = items or exclusions
                    elif "inclusion" in h or items:
                        if not inclusions:
                            inclusions = items

    # Packing
    packing = {}
    for card in page.select(".ct-pack-card"):
        h = card.select_one("h3, h4, .ct-title, strong")
        label = clean(h.get_text(" ", strip=True) if h else "Items")
        items = list_items(card)
        if items:
            packing[label] = items

    # How to reach
    how_to_reach = []
    for card in page.select(".ct-route-card"):
        top = clean((card.select_one(".ct-route-top, h3, h4") or card).get_text(" ", strip=True))
        steps = []
        for step in card.select(".ct-step-content, .ct-route-steps li, li"):
            t = clean(step.get_text(" ", strip=True))
            if t:
                steps.append(t)
        how_to_reach.append({"title": top.split("From")[-1].strip() if "From" in top else top, "steps": steps, "heading": top})

    # FAQs
    faqs = []
    for faq in page.select(".ct-faq"):
        q = clean((faq.select_one(".ct-faq-question, .ct-faq-btn") or faq).get_text(" ", strip=True))
        a = clean((faq.select_one(".ct-faq-content") or faq).get_text(" ", strip=True))
        if a.startswith(q):
            a = clean(a[len(q) :])
        if q and a:
            faqs.append({"q": q, "a": a})

    # Policies
    policies = {}
    for card in page.select(".ct-policy-card"):
        h = card.select_one("h3, h4, strong, .ct-title")
        label = clean(h.get_text(" ", strip=True) if h else "Policy")
        policies[label] = list_items(card)

    # Fitness table
    fitness_rows = []
    medical_rows = []
    for table in page.select(".ct-table, table"):
        rows = []
        for tr in table.find_all("tr"):
            cells = [clean(td.get_text(" ", strip=True)) for td in tr.find_all(["th", "td"])]
            if any(cells):
                rows.append(cells)
        blob = " ".join(c for r in rows for c in r).lower()
        if "cardio" in blob or "leg strength" in blob or "recommended practice" in blob:
            fitness_rows = rows
        elif "medical" in blob or "pre-existing" in blob or "personal medication" in blob:
            medical_rows = rows

    # Gallery images
    images = []
    for img in page.select("img"):
        src = img.get("src") or img.get("data-src") or img.get("data-lazy-src") or ""
        if "wp-content" in src and src not in images:
            if src.startswith("//"):
                src = "https:" + src
            elif src.startswith("/"):
                src = "https://securetravels.in" + src
            images.append(src)

    # Highlights from soft cards / bars
    highlights = []
    for el in page.select(".ct-soft-card, .ct-bar-label"):
        t = clean(el.get_text(" ", strip=True))
        if t and len(t) < 80 and t not in highlights:
            highlights.append(t)

    # Section intros
    sections = []
    for sec in page.select(".ct-section"):
        kicker = clean((sec.select_one(".ct-kicker") or "").get_text(" ", strip=True) if sec.select_one(".ct-kicker") else "")
        title_s = clean((sec.select_one(".ct-title-lg, h2") or "").get_text(" ", strip=True) if sec.select_one(".ct-title-lg, h2") else "")
        intro = clean((sec.select_one(".ct-section-intro") or "").get_text(" ", strip=True) if sec.select_one(".ct-section-intro") else "")
        if title_s:
            sections.append({"kicker": kicker, "title": title_s, "intro": intro})

    return {
        "url": url,
        "slug": url.rstrip("/").split("/")[-1],
        "category": (
            "trek"
            if "/trek/" in url
            else "yatra"
            if "/spiritual-pilgrimage/" in url
            else "package"
        ),
        "title": title,
        "tagline": tagline,
        "overview": overview,
        "facts": facts,
        "priceMin": price_min,
        "priceMax": price_max,
        "itinerary": itinerary,
        "inclusions": inclusions,
        "exclusions": exclusions,
        "packing": packing,
        "howToReach": how_to_reach,
        "faqs": faqs,
        "policies": policies,
        "fitnessTable": fitness_rows,
        "medicalTable": medical_rows,
        "highlights": highlights,
        "sections": sections,
        "images": images[:20],
    }


def fetch(url: str) -> str:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "text/html",
        },
    )
    with urllib.request.urlopen(req, timeout=45) as resp:
        return resp.read().decode("utf-8", errors="replace")


def main() -> None:
    results = []
    for i, url in enumerate(URLS, 1):
        print(f"[{i}/{len(URLS)}] {url}")
        try:
            html = fetch(url)
            soup = BeautifulSoup(html, "html.parser")
            for tag in soup(["script", "style", "noscript"]):
                tag.decompose()
            data = extract(soup, url)
            results.append(data)
            print(
                f"  -> {data['title'][:50]!r} days={len(data['itinerary'])} "
                f"inc={len(data['inclusions'])} faq={len(data['faqs'])} price={data['priceMin']}"
            )
        except Exception as e:
            print(f"  ERROR: {e}")
            results.append({"url": url, "slug": url.rstrip('/').split('/')[-1], "error": str(e)})
        time.sleep(0.5)
    OUT.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
