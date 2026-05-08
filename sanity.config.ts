import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import schemas from "./schemas";
import { presentationTool } from "sanity/presentation";

export default defineConfig({
  name: "thommy-games",
  title: "Thommy Games",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "bp2qwftt",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        previewMode: {
          enable: "/api/draft",
          disable: "/api/disable-draft",
        },
      },
    }),
  ],
  schema: {
    types: schemas,
  },
});
