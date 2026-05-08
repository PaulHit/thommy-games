import { sanityClient } from "@/lib/sanity";
import { previewClient } from "@/sanity/lib/client";

export function getClient(preview: boolean) {
  return preview ? previewClient : sanityClient;
}
