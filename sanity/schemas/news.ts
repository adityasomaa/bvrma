import { defineField, defineType } from "sanity";

export const news = defineType({
  name: "news",
  title: "News article",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (R) => R.required() }),
    defineField({
      name: "slug", type: "slug",
      options: { source: (d: { title?: { en?: string } }) => d.title?.en || "", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({ name: "excerpt", type: "localeText" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", type: "datetime", validation: (R) => R.required() }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "categories", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "body", type: "localeBlocks" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [
    { title: "Published (newest)", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: { select: { title: "title.en", media: "coverImage", subtitle: "publishedAt" } },
});
