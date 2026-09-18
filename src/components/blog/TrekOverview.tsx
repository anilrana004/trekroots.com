type Fact = { label: string; value: string };

export function TrekOverview({
  title = "Trek at a glance",
  facts,
}: {
  title?: string;
  facts: Fact[];
}) {
  if (!facts.length) return null;

  return (
    <section
      aria-labelledby="trek-glance-heading"
      className="border border-[#E8E8E8] bg-[#FAFAFA] px-5 py-6 md:px-8 md:py-7"
    >
      <h2
        id="trek-glance-heading"
        className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#666666]"
      >
        {title}
      </h2>
      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {facts.map((f) => (
          <div key={f.label}>
            <dt className="text-[11px] uppercase tracking-[0.12em] text-[#888888]">
              {f.label}
            </dt>
            <dd className="mt-1 font-[family-name:var(--font-jetbrains)] text-sm font-medium text-[#1A1A1A] md:text-[15px]">
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
