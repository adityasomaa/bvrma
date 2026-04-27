import { defineField, defineType } from "sanity";

export const job = defineType({
  name: "job",
  title: "Job ad",
  type: "document",
  fields: [
    defineField({ name: "title", type: "localeString", validation: (R) => R.required() }),
    defineField({ name: "slug", type: "slug",
      options: { source: (d: { title?: { en?: string } }) => d.title?.en || "" } }),
    defineField({ name: "company", type: "string", validation: (R) => R.required() }),
    defineField({ name: "companyLogo", type: "image", options: { hotspot: true } }),
    defineField({ name: "location", type: "localeString" }),
    defineField({ name: "employmentType", type: "string", options: {
      list: ["full-time", "part-time", "contract", "internship", "freelance"],
    }}),
    defineField({ name: "summary", type: "localeText" }),
    defineField({ name: "body", type: "localeBlocks" }),
    defineField({ name: "applyUrl", type: "url" }),
    defineField({ name: "applyEmail", type: "string" }),
    defineField({ name: "postedAt", type: "datetime", validation: (R) => R.required() }),
    defineField({ name: "deadline", type: "date" }),
  ],
  orderings: [
    { title: "Posted (newest)", name: "postedDesc", by: [{ field: "postedAt", direction: "desc" }] },
  ],
  preview: { select: { title: "title.en", subtitle: "company", media: "companyLogo" } },
});
