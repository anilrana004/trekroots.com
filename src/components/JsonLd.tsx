type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

/** Server-safe JSON-LD script. Pass only objects that mirror visible page content. */
export function JsonLd({ data, id }: { data: JsonLdData | null; id?: string }) {
  if (!data) return null;
  const payload = Array.isArray(data) ? data.filter(Boolean) : data;
  if (Array.isArray(payload) && payload.length === 0) return null;

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload),
      }}
    />
  );
}
