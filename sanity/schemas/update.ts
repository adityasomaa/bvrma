import { defineField, defineType } from "sanity";

export const update = defineType({
  name: "update",
  title: "Association Update",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (R) => R.required() }),
    defineField({ name: "slug", type: "slug",
      options: { source: (d: { title?: { en?: string } }) => d.title?.en || "" } }),
    defineField({ name: "publishedAt", type: "datetime", validation: (R) => R.required() }),
    defineField({ name: "summary", type: "localeText" }),
    defineField({ name: "body", type: "localeBlocks" }),
    defineField({ name: "attachments", type: "array", of: [{ type: "file" }] }),
  ],
  preview: { select: { title: "title.en", subtitle: "publishedAt" } },
});
