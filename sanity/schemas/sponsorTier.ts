import { defineField, defineType } from "sanity";

export const sponsorTier = defineType({
  name: "sponsorTier",
  title: "Sponsor tier",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "level", type: "string", options: {
      list: ["platinum", "gold", "silver", "bronze", "media", "strategic"],
    }}),
    defineField({ name: "priority", type: "number", description: "Lower = appears first" }),
    defineField({ name: "perks", type: "array", of: [{ type: "localeString" }] }),
  ],
  preview: { select: { title: "title", subtitle: "level" } },
});
