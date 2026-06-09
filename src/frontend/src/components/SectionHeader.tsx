interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : ""}`}>
      {label && (
        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-2 font-body">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-3 text-muted-foreground font-body text-base max-w-2xl"
          style={centered ? { margin: "12px auto 0" } : {}}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
