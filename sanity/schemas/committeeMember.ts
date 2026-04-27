import { defineField, defineType } from "sanity";

export const committeeMember = defineType({
  name: "committeeMember",
  title: "Committee / Board member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "role", type: "localeString" }),
    defineField({ name: "group", type: "string", options: {
      list: [
        { title: "Board", value: "board" },
        { title: "Committee", value: "committee" },
        { title: "Advisor", value: "advisor" },
      ],
    }, initialValue: "committee" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", type: "localeText" }),
    defineField({ name: "linkedinUrl", type: "url" }),
    defineField({ name: "orderRank", type: "number", description: "Lower = appears first" }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "orderRank", direction: "asc" }] },
  ],
  preview: { select: { title: "name", subtitle: "role.en", media: "photo" } },
});
