import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";

export async function GET() {
  try {
    const links = await sanityClient.fetch<{ platform: string; url: string }[]>(
      `*[_type == "siteSettings"][0].socialLinks[]{ platform, url }`
    );
    return NextResponse.json(links || []);
  } catch {
    return NextResponse.json([]);
  }
}
