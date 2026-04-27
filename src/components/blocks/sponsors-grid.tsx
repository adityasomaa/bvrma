// Static placeholder sponsor logos. Replaced by Sanity data once migrated.
const sponsors = [
  { name: "Sponsor A", placeholder: true },
  { name: "Sponsor B", placeholder: true },
  { name: "Sponsor C", placeholder: true },
  { name: "Sponsor D", placeholder: true },
];

export function SponsorsGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {sponsors.map((s) => (
        <div
          key={s.name}
          className="aspect-[3/2] rounded-xl border border-border bg-muted/40 flex items-center justify-center text-muted-foreground text-sm"
        >
          {s.name}
        </div>
      ))}
    </div>
  );
}
