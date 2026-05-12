import { defineType, defineField } from "sanity";

export default defineType({
  name: "homeVideo",
  title: "Videoclip",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Etichetă",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Text afișat când videoclipul nu este disponibil",
    }),
    defineField({
      name: "videoFile",
      title: "Fișier video",
      type: "file",
      description: "Videoclip MP4 (muted, autoplay, loop)",
    }),
    defineField({
      name: "order",
      title: "Ordine",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "label" },
  },
  orderings: [
    { title: "Ordine", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
