import { defineField, defineType } from "sanity";

export const memberCategory = defineType({
  name: "memberCategory",
  title: "Member category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (R) => R.required() }),
    defineField({ name: "slug", type: "slug",
      options: { source: (d: { title?: { en?: string } }) => d.title?.en || "" } }),
    defineField({ name: "description", type: "localeText" }),
  ],
  preview: { select: { title: "title.en" } },
});
