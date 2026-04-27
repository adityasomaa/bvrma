import { defineField, defineType } from "sanity";

const supportedLanguages = [
  { id: "en", title: "English", isDefault: true },
  { id: "id", title: "Bahasa Indonesia" },
];

export const localeString = defineType({
  name: "localeString",
  title: "Localized String",
  type: "object",
  fields: supportedLanguages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: "string",
      validation: lang.isDefault ? (Rule) => Rule.required() : undefined,
    })
  ),
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized Text",
  type: "object",
  fields: supportedLanguages.map((lang) =>
    defineField({ name: lang.id, title: lang.title, type: "text", rows: 4 })
  ),
});

export const localeBlocks = defineType({
  name: "localeBlocks",
  title: "Localized Rich Text",
  type: "object",
  fields: supportedLanguages.map((lang) =>
    defineField({
      name: lang.id,
      title: lang.title,
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
      ],
    })
  ),
});
