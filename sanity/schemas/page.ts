import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (R) => R.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: (doc: { title?: { en?: string } }) => doc.title?.en || "",
        maxLength: 96,
      },
      validation: (R) => R.required(),
    }),
    defineField({ name: "intro", type: "localeText" }),
    defineField({
      name: "body",
      type: "localeBlocks",
      description: "Long-form content. For richer pages use Sections instead.",
    }),
    defineField({
      name: "sections",
      type: "array",
      title: "Sections (modular)",
      of: [
        { type: "object", name: "hero", title: "Hero",
          fields: [
            { name: "eyebrow", type: "localeString" },
            { name: "title", type: "localeString" },
            { name: "subtitle", type: "localeText" },
            { name: "image", type: "image", options: { hotspot: true } },
            { name: "ctaPrimary", type: "object", fields: [
              { name: "label", type: "localeString" }, { name: "href", type: "string" },
            ]},
          ],
        },
        { type: "object", name: "richText", title: "Rich Text",
          fields: [{ name: "content", type: "localeBlocks" }],
        },
        { type: "object", name: "stats", title: "Stat Grid",
          fields: [
            { name: "items", type: "array", of: [
              { type: "object", fields: [
                { name: "value", type: "string" },
                { name: "label", type: "localeString" },
              ]},
            ]},
          ],
        },
        { type: "object", name: "ctaBand", title: "CTA Band",
          fields: [
            { name: "title", type: "localeString" },
            { name: "subtitle", type: "localeText" },
            { name: "ctaLabel", type: "localeString" },
            { name: "ctaHref", type: "string" },
          ],
        },
      ],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "title.en", slug: "slug.current" },
    prepare: ({ title, slug }) => ({ title: title || "(untitled)", subtitle: `/${slug ?? ""}` }),
  },
});
