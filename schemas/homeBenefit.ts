import { defineType, defineField } from "sanity";

export default defineType({
  name: "homeBenefit",
  title: "Beneficiu",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlu",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descriere",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Imagine",
      type: "image",
    }),
    defineField({
      name: "order",
      title: "Ordine",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "image" },
  },
  orderings: [
    { title: "Ordine", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
