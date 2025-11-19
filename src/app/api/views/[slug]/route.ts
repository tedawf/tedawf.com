import { NextResponse } from "next/server";

const TACOS_API_URL = process.env.TACOS_API_URL || "http://localhost:8000";
const TACOS_API_KEY = process.env.TACOS_API_KEY || "";

export async function POST(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  if (!TACOS_API_URL || !TACOS_API_KEY) {
    return NextResponse.json(
      { error: "Backend configuration missing" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(`${TACOS_API_URL}/views/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-TACOS-Key": TACOS_API_KEY,
      },
    });

    if (!response.ok) {
      const detail = await response.text();
      return NextResponse.json(
        { error: "Failed to update views", detail },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating views", error);
    return NextResponse.json(
      { error: "Failed to update views" },
      { status: 500 },
    );
  }
}
