import { setRequestLocale } from "next-intl/server";
import { Section } from "@/components/blocks/section";

export default async function BoardCommitteePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Section eyebrow="Governance" title="Board & Committee"
      subtitle="The leadership steering BVRMA's mission.">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Wired up to Sanity allCommitteeQuery once data is migrated */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border p-5">
            <div className="aspect-square rounded-lg bg-muted mb-4" />
            <div className="font-display text-base font-semibold">Member {i + 1}</div>
            <div className="text-xs text-muted-foreground mt-1">Role title</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
