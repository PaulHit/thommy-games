import { definePreview } from "@sanity/preview-kit";
import { sanityClient } from "./sanity.client";

export const usePreview = definePreview({
  projectId: sanityClient.config.projectId,
  dataset: sanityClient.config.dataset,
  onPublicAccessOnly: () => {
    // Optional: add a toast or other visual indicator
  },
});
