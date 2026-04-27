import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (R) => R.required() }),
    defineField({ name: "slug", type: "slug",
      options: { source: (d: { title?: { en?: string } }) => d.title?.en || "" } }),
    defineField({ name: "startDate", type: "datetime", validation: (R) => R.required() }),
    defineField({ name: "endDate", type: "datetime" }),
    defineField({ name: "location", type: "localeString" }),
    defineField({ name: "venueAddress", type: "localeText" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", type: "localeBlocks" }),
    defineField({
      name: "ticketTiers",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "name", type: "localeString" },
          { name: "price", type: "string" },
          { name: "perks", type: "array", of: [{ type: "localeString" }] },
          { name: "ctaUrl", type: "url" },
          { name: "featured", type: "boolean", initialValue: false },
        ],
      }],
    }),
    defineField({
      name: "speakers",
      type: "array",
      of: [{ type: "reference", to: [{ type: "speaker" }] }],
    }),
    defineField({
      name: "sponsors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "sponsor" }] }],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { select: { title: "title.en", subtitle: "startDate", media: "coverImage" } },
});
