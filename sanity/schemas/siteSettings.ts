import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", initialValue: "BVRMA" }),
    defineField({ name: "tagline", type: "localeString" }),
    defineField({ name: "logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({ name: "contactPhone", type: "string" }),
    defineField({ name: "address", type: "localeText" }),
    defineField({
      name: "socials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string", options: { list: ["instagram","facebook","linkedin","twitter","youtube","tiktok"] } },
            { name: "url", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "mainMenu",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "localeString" },
            { name: "href", type: "string" },
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: "title" } },
});
