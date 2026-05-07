import { defineType, defineField } from "sanity";

export default defineType({
  name: "game",
  title: "Joc",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nume",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "level",
      title: "Nivel",
      type: "string",
      options: {
        list: [
          { title: "Nivel 1", value: "1" },
          { title: "Nivel 2", value: "2" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descriere",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "photos",
      title: "Poze",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "featured",
      title: "Joc în prim-plan",
      type: "boolean",
    }),
  ],
});
