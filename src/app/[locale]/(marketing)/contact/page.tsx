import { setRequestLocale, getTranslations } from "next-intl/server";
import { Section } from "@/components/blocks/section";
import { ContactForm } from "./contact-form";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <Section width="narrow" eyebrow="Contact" title={t("title")} subtitle={t("intro")}>
      <ContactForm />
    </Section>
  );
}
