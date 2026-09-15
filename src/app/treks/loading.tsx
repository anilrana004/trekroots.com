export default function TreksIndexLoading() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-6">
      <div className="h-10 w-48 rounded-md bg-muted animate-pulse" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[460px] rounded-xl border border-border bg-card overflow-hidden"
          >
            <div className="h-56 bg-muted animate-pulse" />
            <div className="p-5 space-y-3">
              <div className="h-6 w-3/4 rounded bg-muted animate-pulse" />
              <div className="h-4 w-1/2 rounded bg-muted animate-pulse" />
              <div className="h-4 w-full rounded bg-muted animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
