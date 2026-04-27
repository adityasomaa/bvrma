import { setRequestLocale } from "next-intl/server";
import { Section } from "@/components/blocks/section";
import { SponsorsGrid } from "@/components/blocks/sponsors-grid";

export default async function SponsorsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <Section eyebrow="Sponsors & Partners" title="Backed by industry leaders"
      subtitle="The brands that make BVRMA's work possible.">
      <SponsorsGrid />
    </Section>
  );
}
