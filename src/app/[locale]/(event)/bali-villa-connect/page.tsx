import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/blocks/section";
import { PricingTiers } from "@/components/blocks/pricing-tiers";
import { SpeakersGrid } from "@/components/blocks/speakers-grid";
import { SponsorsGrid } from "@/components/blocks/sponsors-grid";
import { StatGrid } from "@/components/blocks/stat-grid";

export default async function BVCPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <Section
        eyebrow={t("aboutEyebrow")}
        title="Bali Villa Connect 2026"
        subtitle="Two days. The full Bali villa industry. 26 May 2026."
      >
        <div className="mt-6"><StatGrid /></div>
      </Section>

      <Section bg="muted" eyebrow={t("venueTitle")} title={t("venueSubtitle")}
        subtitle="A premium venue chosen for plenary stages, breakout rooms, and the Gala Dinner.">
        <div className="aspect-[16/8] rounded-2xl bg-gradient-to-br from-primary-200 to-accent-200 dark:from-primary-900 dark:to-accent-900" />
      </Section>

      <Section eyebrow={t("pricingTitle")} title={t("pricingSubtitle")}><PricingTiers /></Section>
      <Section bg="muted" eyebrow={t("speakersTitle")} title={t("speakersSubtitle")}><SpeakersGrid /></Section>
      <Section eyebrow={t("sponsorTitle")} title="Backed by industry leaders"><SponsorsGrid /></Section>
    </>
  );
}
