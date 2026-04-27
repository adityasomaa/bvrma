import { defineField, defineType } from "sanity";

export const member = defineType({
  name: "member",
  title: "Member (directory)",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "slug", type: "slug",
      options: { source: "name", maxLength: 96 }, validation: (R) => R.required() }),
    defineField({ name: "logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "summary", type: "localeText" }),
    defineField({ name: "body", type: "localeBlocks" }),
    defineField({ name: "category", type: "reference", to: [{ type: "memberCategory" }] }),
    defineField({ name: "website", type: "url" }),
    defineField({ name: "instagram", type: "url" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "region", type: "string", options: {
      list: ["Canggu", "Seminyak", "Ubud", "Uluwatu", "Sanur", "Nusa Dua", "Other"],
    }}),
    defineField({ name: "verified", type: "boolean", initialValue: false }),
    defineField({ name: "memberSince", type: "date" }),
  ],
  preview: { select: { title: "name", media: "logo", subtitle: "region" } },
});
