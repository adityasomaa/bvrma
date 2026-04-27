import { useTranslations } from "next-intl";

export function StatGrid() {
  const t = useTranslations("home.stats");

  const stats = [
    { value: "1,000+", label: t("attendees") },
    { value: "100+", label: t("speakers") },
    { value: "B2B", label: t("format") },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((s) => (
        <div
          key={s.label}
          className="group rounded-2xl border border-border bg-card p-8 transition-shadow hover:shadow-md"
        >
          <div className="font-display text-5xl md:text-6xl font-semibold tracking-tight tabular-nums text-primary-700 dark:text-primary-300">
            {s.value}
          </div>
          <div className="mt-3 text-sm text-muted-foreground uppercase tracking-wide">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
