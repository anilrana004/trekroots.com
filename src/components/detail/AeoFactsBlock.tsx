import { formatINR } from "@/lib/price";

export type AeoFact = {
  label: string;
  value: string;
};

type AeoFactsBlockProps = {
  title?: string;
  facts: AeoFact[];
  ocid?: string;
};

/**
 * Plain, labeled fact list for answer engines and scanners.
 * Values must match on-page catalog data — no invented numbers.
 */
export function AeoFactsBlock({
  title = "Key facts",
  facts,
  ocid = "aeo.facts",
}: AeoFactsBlockProps) {
  if (!facts.length) return null;

  return (
    <section
      data-ocid={ocid}
      className="border-b"
      style={{ borderColor: "#E8E8E8", backgroundColor: "#FFFFFF" }}
      aria-labelledby={`${ocid}-heading`}
    >
      <div className="lux-container py-5 md:py-6">
        <h2
          id={`${ocid}-heading`}
          className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-[#888888] mb-3"
        >
          {title}
        </h2>
        <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-3">
          {facts.map((f) => (
            <div key={f.label} className="min-w-0">
              <dt className="font-body text-[11px] text-[#888888] mb-0.5">
                {f.label}
              </dt>
              <dd className="font-body text-[13px] font-semibold text-[#1A1A1A] leading-snug">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function trekAeoFacts(input: {
  durationDays: number;
  durationNights: number;
  maxAltitudeM: number;
  maxAltitudeFt: number;
  difficulty: string;
  bestSeason: string;
  startPoint: string;
  minINR: number;
}): AeoFact[] {
  return [
    {
      label: "Duration",
      value: `${input.durationDays} days / ${input.durationNights} nights`,
    },
    {
      label: "Max altitude",
      value: `${input.maxAltitudeM.toLocaleString("en-IN")} m (${Number(input.maxAltitudeFt).toLocaleString("en-IN")} ft)`,
    },
    { label: "Difficulty", value: input.difficulty },
    { label: "Best season", value: input.bestSeason },
    { label: "Starts from", value: input.startPoint },
    {
      label: "Listed fee",
      value:
        input.minINR > 0 ? `${formatINR(input.minINR)} per person` : "On request",
    },
  ];
}

export function yatraAeoFacts(input: {
  duration: string;
  season: string;
  route: string;
  minINR: number;
}): AeoFact[] {
  return [
    { label: "Duration", value: input.duration },
    { label: "Season", value: input.season },
    { label: "Route", value: input.route },
    {
      label: "Listed fee",
      value:
        input.minINR > 0 ? `${formatINR(input.minINR)} per person` : "On request",
    },
  ];
}
