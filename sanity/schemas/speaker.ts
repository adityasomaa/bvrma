import { defineField, defineType } from "sanity";

export const speaker = defineType({
  name: "speaker",
  title: "Speaker",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", type: "slug",
      options: { source: "name", maxLength: 96 } }),
    defineField({ name: "title", type: "localeString" }),
    defineField({ name: "organization", type: "string" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", type: "localeText" }),
    defineField({ name: "linkedinUrl", type: "url" }),
    defineField({ name: "orderRank", type: "number", description: "Lower = appears first" }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "orderRank", direction: "asc" }] },
  ],
  preview: { select: { title: "name", subtitle: "organization", media: "photo" } },
});
