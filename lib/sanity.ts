import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

interface PortableTextChild {
  _key?: string;
  _type?: string;
  text?: string;
}

interface PortableTextBlock {
  _type?: string;
  _key?: string;
  children?: PortableTextChild[];
}

export function toPlainText(blocks: unknown | PortableTextBlock[] = []): string {
  const blockList = Array.isArray(blocks) ? blocks as PortableTextBlock[] : [];
  return blockList
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child) => child.text || "").join("");
    })
    .join("\n");
}
