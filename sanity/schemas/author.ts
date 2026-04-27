import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", type: "localeText" }),
  ],
  preview: { select: { title: "name", media: "photo" } },
});
