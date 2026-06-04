import { defineType, defineField } from "sanity";

export default defineType({
  name: "page",
  title: "Pagină",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlu pagină",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitlu / descriere",
      type: "text",
      description: "Textul de sub titlul paginii",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Conținut",
      type: "array",
      of: [{ type: "block" }, { type: "image" }],
    }),
    defineField({
      name: "heroImage",
      title: "Imagine principală",
      type: "image",
    }),
  ],
});
