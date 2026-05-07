import { defineType, defineField } from "sanity";

export default defineType({
  name: "package",
  title: "Pachet",
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
      name: "description",
      title: "Descriere",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "price",
      title: "Preț (EUR)",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "level1Count",
      title: "Număr jocuri Nivel 1",
      type: "number",
    }),
    defineField({
      name: "level2Count",
      title: "Număr jocuri Nivel 2",
      type: "number",
    }),
    defineField({
      name: "totalGames",
      title: "Total jocuri",
      type: "number",
    }),
    defineField({
      name: "includesAssistant",
      title: "Include asistent dedicat",
      type: "boolean",
    }),
    defineField({
      name: "images",
      title: "Imagini",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "games",
      title: "Jocuri incluse",
      type: "array",
      of: [{ type: "reference", to: { type: "game" } }],
    }),
    defineField({
      name: "featured",
      title: "Pachet în prim-plan",
      type: "boolean",
    }),
    defineField({
      name: "order",
      title: "Ordine afișare",
      type: "number",
    }),
  ],
});
