import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity";

export async function GET() {
  try {
    const data = await sanityClient.fetch(`
      *[_type == "siteSettings"][0]{
        email,
        phone,
        address,
        "footerDescription": footerSection.footerDescription,
        "footerCopyright": footerSection.footerCopyright
      }
    `);
    return NextResponse.json(data || {});
  } catch {
    return NextResponse.json({});
  }
}
