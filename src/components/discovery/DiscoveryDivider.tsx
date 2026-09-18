import { DISCOVER } from "./tokens";

/** Thin forest-green rule that separates discovery sections. */
export function DiscoveryDivider({ className = "" }: { className?: string }) {
  return (
    <div
      role="separator"
      aria-hidden
      className={`h-px w-full ${className}`}
      style={{ backgroundColor: DISCOVER.greenLine, opacity: 0.55 }}
    />
  );
}
