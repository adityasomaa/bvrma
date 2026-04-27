import { setRequestLocale } from "next-intl/server";
import { Section } from "@/components/blocks/section";

export default async function MembersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Section eyebrow="Directory" title="BVRMA Members"
      subtitle="Verified villa management companies and industry partners.">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Wire to allMembersQuery */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border p-5 flex flex-col items-center text-center">
            <div className="aspect-square w-20 rounded-lg bg-muted mb-4" />
            <div className="font-display text-sm font-semibold">Member {i + 1}</div>
            <div className="text-xs text-muted-foreground mt-1">Bali</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
