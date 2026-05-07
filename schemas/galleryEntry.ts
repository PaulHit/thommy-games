import { defineType, defineField } from "sanity";

export default defineType({
  name: "galleryEntry",
  title: "Intrare galerie",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titlu",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Nuntă", value: "nunta" },
          { title: "Corporate", value: "corporate" },
          { title: "Petrecere privată", value: "petrecere" },
          { title: "Festival", value: "festival" },
          { title: "Team-building", value: "teambuilding" },
        ],
      },
    }),
    defineField({
      name: "photos",
      title: "Poze",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "date",
      title: "Data",
      type: "date",
    }),
    defineField({
      name: "description",
      title: "Descriere",
      type: "text",
    }),
  ],
});
