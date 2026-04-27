import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/blocks/hero";
import { Section } from "@/components/blocks/section";
import { StatGrid } from "@/components/blocks/stat-grid";
import { PricingTiers } from "@/components/blocks/pricing-tiers";
import { SpeakersGrid } from "@/components/blocks/speakers-grid";
import { SponsorsGrid } from "@/components/blocks/sponsors-grid";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <Hero />

      <Section
        eyebrow={t("aboutEyebrow")}
        title={t("aboutTitle")}
        subtitle={t("aboutBody")}
      >
        <div className="mt-12">
          <StatGrid />
        </div>
      </Section>

      <Section
        bg="muted"
        eyebrow={t("whyAttendTitle")}
        title="Two days that move the industry"
        subtitle="Insights from operators, investors, regulators, and platform partners. Curated networking, deal-room introductions, and an evening that closes Bali's only B2B villa-industry trade event."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Connect", body: "1,000+ owners, operators & decision-makers in one room." },
            { title: "Learn", body: "Sessions on regulation, sustainability, distribution & ops." },
            { title: "Grow", body: "Direct B2B deal flow with verified industry counterparts." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl bg-background p-7 border border-border">
              <h3 className="font-display text-2xl font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow={t("pricingTitle")}
        title={t("pricingSubtitle")}
        subtitle="Choose the experience that matches your goals. Limited Early Bird seats."
      >
        <PricingTiers />
      </Section>

      <Section
        bg="muted"
        eyebrow={t("speakersTitle")}
        title={t("speakersSubtitle")}
        subtitle="A curated lineup spanning Indonesian government, academia, and global hospitality leaders."
      >
        <SpeakersGrid />
      </Section>

      <Section
        eyebrow={t("galaTitle")}
        title={t("galaSubtitle")}
        subtitle="An exclusive evening with the industry's top decision-makers. By VVIP invitation only."
      >
        <div className="aspect-[16/7] rounded-2xl bg-gradient-to-br from-primary-700 to-primary-950 dark:from-primary-800 dark:to-primary-950 flex items-end p-8">
          <div className="text-primary-50">
            <div className="text-xs font-medium uppercase tracking-[0.18em] opacity-80">Limited seats</div>
            <div className="font-display text-3xl md:text-4xl mt-1">Curated table of 200 industry leaders.</div>
          </div>
        </div>
      </Section>

      <Section eyebrow={t("sponsorTitle")} title="Backed by industry leaders">
        <SponsorsGrid />
      </Section>
    </>
  );
}
