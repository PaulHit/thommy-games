import { sanityClient } from "./sanity";

export async function getSiteSettings() {
  return sanityClient.fetch(`*[_type == "siteSettings"][0]`);
}

export async function getAllPackages() {
  return sanityClient.fetch(`*[_type == "package"] | order(order asc, _createdAt asc)`);
}

export async function getPackageBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "package" && slug.current == $slug][0]`,
    { slug }
  );
}

export async function getFeaturedPackages() {
  return sanityClient.fetch(
    `*[_type == "package" && featured == true] | order(order asc)`
  );
}

export async function getAllGames() {
  return sanityClient.fetch(`*[_type == "game"] | order(name asc)`);
}

export async function getGamesByLevel(level: string) {
  return sanityClient.fetch(
    `*[_type == "game" && level == $level] | order(name asc)`,
    { level }
  );
}

export async function getGameBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "game" && slug.current == $slug][0]`,
    { slug }
  );
}

export async function getPageBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug }
  );
}

export async function getAllTestimonials() {
  return sanityClient.fetch(`*[_type == "testimonial"] | order(_createdAt desc)`);
}

export async function getAllGalleryEntries() {
  return sanityClient.fetch(`*[_type == "galleryEntry"] | order(date desc)`);
}

export async function getAllFaqs() {
  return sanityClient.fetch(`*[_type == "faq"] | order(order asc)`);
}
