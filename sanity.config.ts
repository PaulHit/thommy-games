import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import schemas from "./schemas";
import { presentationTool } from "sanity/presentation";

// Determine the base path based on the environment
const isVercel = process.env.VERCEL === "1";
const basePath = isVercel ? "/studio" : "/";

export default defineConfig({
  name: "thommy-games",
  title: "Thommy Games",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "bp2qwftt",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: basePath,
  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: {
        origin: "http://localhost:3000",
        preview: (document) => {
          if (document.slug?.current) {
            return `/${document.slug.current}`;
          }
          return "/";
        },
      },
    }),
  ],
  schema: {
    types: schemas,
  },
});
