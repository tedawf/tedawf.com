import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RevalidateBody = {
  slug?: string;
};

function getSecret(request: Request) {
  const url = new URL(request.url);
  return (
    request.headers.get("x-revalidate-secret") ?? url.searchParams.get("secret")
  );
}

export async function POST(request: Request) {
  const secret = getSecret(request);
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET is not set" },
      { status: 500 },
    );
  }

  if (!secret || secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: RevalidateBody = {};
  try {
    body = (await request.json()) as RevalidateBody;
  } catch {
    body = {};
  }

  const slug = body.slug?.trim();

  // Always refresh the blog list because titles/summaries/tags can change.
  revalidateTag("posts");
  revalidatePath("/blog");

  if (slug) {
    revalidateTag(`post:${slug}`);
    revalidatePath(`/blog/${slug}`);
  }

  return NextResponse.json({
    revalidated: true,
    slug: slug ?? null,
    now: Date.now(),
  });
}
