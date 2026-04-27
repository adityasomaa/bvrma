import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Meta title", type: "localeString" }),
    defineField({ name: "description", title: "Meta description", type: "localeText" }),
    defineField({
      name: "image",
      title: "OpenGraph image (1200×630)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "noIndex", title: "No-index", type: "boolean", initialValue: false }),
  ],
});
