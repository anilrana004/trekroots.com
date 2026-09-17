import type { ReactNode } from "react";

type SectionHeadProps = {
  title: string;
  /** Sits to the right of the title on desktop: intro copy or a link. */
  aside?: ReactNode;
  className?: string;
};

/**
 * The heading treatment every landing section shares: a left-aligned title
 * with a gold rule running the full width beneath it.
 */
export function SectionHead({ title, aside, className }: SectionHeadProps) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-10">
        <h2 className="font-display text-xl md:text-2xl lg:text-[28px] leading-tight text-[#1A1A1A] shrink-0">
          {title}
        </h2>
        {aside ? (
          <div className="md:max-w-xl md:text-right lux-body text-[13px] leading-relaxed">
            {aside}
          </div>
        ) : null}
      </div>
      <div className="mt-3 h-px w-full" style={{ backgroundColor: "#F0D48A" }} />
    </div>
  );
}
