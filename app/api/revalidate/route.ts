import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  revalidatePath("/");
  revalidatePath("/despre");
  revalidatePath("/pachete");
  revalidatePath("/jocuri");
  revalidatePath("/intrebari-frecvente");
  revalidatePath("/contact");
  revalidateTag("sanity");

  return NextResponse.json({ revalidated: true });
}
