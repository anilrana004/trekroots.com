"use client";

type Tab = { id: string; label: string };

type DetailSectionNavProps = {
  tabs: Tab[];
  activeId: string;
  onSelect: (id: string) => void;
  ocidPrefix: string;
};

/**
 * Signature Indiahikes sticky yellow section jump bar.
 */
export function DetailSectionNav({
  tabs,
  activeId,
  onSelect,
  ocidPrefix,
}: DetailSectionNavProps) {
  return (
    <nav
      className="detail-section-nav overflow-x-auto hide-scrollbar"
      style={{ backgroundColor: "#FFC107" }}
      data-ocid={`${ocidPrefix}.section_nav`}
      aria-label="Page sections"
    >
      <div className="lux-container">
        <div className="flex gap-1 py-0 min-w-max">
          {tabs.map((tab) => {
            const active = activeId === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                data-ocid={`${ocidPrefix}.tab.${tab.id}`}
                onClick={() => onSelect(tab.id)}
                className={`no-retro px-3.5 md:px-4 py-3 font-body text-[11px] md:text-xs font-semibold whitespace-nowrap transition-colors ${
                  active
                    ? "text-[#1A1A1A] bg-black/10"
                    : "text-[#1A1A1A]/80 hover:bg-black/5"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
