import { SanityImage } from "./SanityImage";
import type { SanityItineraryDay } from "@/lib/sanity/types";

export function Itinerary({ days }: { days: SanityItineraryDay[] }) {
  if (!days?.length) return null;

  return (
    <section aria-labelledby="itinerary-heading" className="mt-14 md:mt-16">
      <h2
        id="itinerary-heading"
        className="scroll-mt-28 text-2xl font-semibold tracking-tight text-[#1A1A1A] md:text-[1.75rem]"
      >
        Itinerary
      </h2>
      <ol className="relative mt-8 space-y-0 border-l border-[#E8E8E8] pl-6 md:pl-8">
        {days.map((day) => {
          const meta = [day.distance, day.duration, day.altitude]
            .filter(Boolean)
            .join(" · ");
          return (
            <li key={day._key} className="relative pb-10 last:pb-0">
              <span
                className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full border-2 border-rootsYellow bg-white md:-left-[2.4rem]"
                aria-hidden
              />
              <p className="font-[family-name:var(--font-jetbrains)] text-[11px] font-medium uppercase tracking-[0.14em] text-[#888888]">
                Day {String(day.dayNumber).padStart(2, "0")}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-[#1A1A1A]">
                {day.title}
              </h3>
              {meta ? (
                <p className="mt-1 text-sm text-[#666666]">{meta}</p>
              ) : null}
              {day.description ? (
                <p className="mt-3 text-[1.05rem] leading-relaxed text-[#333333]">
                  {day.description}
                </p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#666666]">
                {day.accommodation ? <span>Stay: {day.accommodation}</span> : null}
                {day.meals ? <span>Meals: {day.meals}</span> : null}
              </div>
              {day.notes ? (
                <p className="mt-2 text-sm italic text-[#777777]">{day.notes}</p>
              ) : null}
              {day.image ? (
                <div className="mt-4 overflow-hidden bg-[#F5F5F5]">
                  <SanityImage
                    image={day.image}
                    alt={day.image.alt || day.title}
                    width={900}
                    height={560}
                    sizes="(max-width: 768px) 100vw, 700px"
                    className="aspect-[16/10]"
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
