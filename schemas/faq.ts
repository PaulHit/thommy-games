import { defineType, defineField } from "sanity";

export default defineType({
  name: "faq",
  title: "Întrebare frecventă",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Întrebare",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Răspuns",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordine",
      type: "number",
    }),
  ],
});
