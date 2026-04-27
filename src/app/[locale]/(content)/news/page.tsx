import { setRequestLocale } from "next-intl/server";
import { Section } from "@/components/blocks/section";

export default async function NewsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Section eyebrow="News" title="Latest from the industry"
      subtitle="Reports, market notes, and announcements from BVRMA and our partners.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Wire to allNewsQuery once content is migrated */}
        {Array.from({ length: 6 }).map((_, i) => (
          <article key={i} className="rounded-xl border border-border overflow-hidden">
            <div className="aspect-video bg-muted" />
            <div className="p-5">
              <div className="text-xs text-muted-foreground">Apr 2026</div>
              <h3 className="mt-2 font-display text-lg font-semibold leading-snug">Article placeholder #{i + 1}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                Excerpt placeholder. Wired up to Sanity once migration runs.
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
