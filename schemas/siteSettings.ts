import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Setări site",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Adresă",
      type: "string",
    }),
    defineField({
      name: "freeTransportKm",
      title: "Transport gratuit (km)",
      type: "number",
    }),
    defineField({
      name: "depositPercent",
      title: "Avans (%)",
      type: "number",
    }),
    defineField({
      name: "gameHours",
      title: "Ore de joc",
      type: "number",
    }),
    defineField({
      name: "socialLinks",
      title: "Linkuri social media",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Platformă", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "title", title: "Titlu SEO", type: "string" },
        { name: "description", title: "Descriere SEO", type: "text" },
        { name: "ogImage", title: "Imagine OG", type: "image" },
      ],
    }),
  ],
});
