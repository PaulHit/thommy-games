import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nume",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Rol / Tip eveniment",
      type: "string",
    }),
    defineField({
      name: "quote",
      title: "Citat",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Poză",
      type: "image",
    }),
    defineField({
      name: "eventType",
      title: "Tip eveniment",
      type: "string",
      options: {
        list: [
          { title: "Nuntă", value: "nunta" },
          { title: "Corporate", value: "corporate" },
          { title: "Petrecere privată", value: "petrecere" },
          { title: "Botez", value: "botez" },
          { title: "Festival", value: "festival" },
          { title: "Team-building", value: "teambuilding" },
        ],
      },
    }),
  ],
});
