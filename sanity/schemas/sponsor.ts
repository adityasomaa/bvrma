import { defineField, defineType } from "sanity";

export const sponsor = defineType({
  name: "sponsor",
  title: "Sponsor / Partner",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", type: "slug",
      options: { source: "name", maxLength: 96 } }),
    defineField({ name: "logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "logoDark", type: "image", description: "Optional alternate logo for dark mode", options: { hotspot: true } }),
    defineField({ name: "website", type: "url" }),
    defineField({ name: "tier", type: "reference", to: [{ type: "sponsorTier" }] }),
    defineField({ name: "kind", type: "string", options: {
      list: [
        { title: "Sponsor", value: "sponsor" },
        { title: "Media partner", value: "media" },
        { title: "Strategic partner", value: "strategic" },
      ],
    }, initialValue: "sponsor" }),
    defineField({ name: "summary", type: "localeText" }),
  ],
  preview: { select: { title: "name", subtitle: "tier.title", media: "logo" } },
});
