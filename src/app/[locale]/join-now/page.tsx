import { setRequestLocale } from "next-intl/server";
import { Section } from "@/components/blocks/section";

export default async function JoinNowPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Section width="narrow" eyebrow="Membership" title="Join BVRMA"
      subtitle="Become a member to access industry data, advocacy, and the BVC 2026 member network.">
      <div className="rounded-xl border border-border bg-card p-8">
        <p className="text-muted-foreground">Membership signup form — wired to Supabase Auth + admin approval queue. Phase 4 build.</p>
      </div>
    </Section>
  );
}
