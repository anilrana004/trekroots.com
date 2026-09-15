export default function TreksLoading() {
  return (
    <div className="min-h-[60vh] bg-background">
      <div className="h-[calc(100dvh-68px)] min-h-[420px] animate-pulse bg-muted" />
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="h-8 w-2/3 max-w-md rounded-md bg-muted animate-pulse" />
        <div className="h-4 w-full max-w-2xl rounded-md bg-muted animate-pulse" />
        <div className="h-4 w-5/6 max-w-xl rounded-md bg-muted animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-xl bg-muted animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
