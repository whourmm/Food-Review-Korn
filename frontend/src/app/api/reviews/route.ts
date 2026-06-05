import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
const AUTH_TOKEN = process.env.AUTHORIZE_TOKEN;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = {
      restaurant_id: body.restaurantId ?? body.restaurant_id ?? "",
      images: body.images ?? [],
      reviewer_name: body.reviewerName ?? body.reviewer_name ?? "",
      categories_score: body.categoriesScore ?? body.categories_score ?? [],
      review: body.review ?? null,
    };
    const res = await fetch(`${BACKEND_URL}/api/review/create-review/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${AUTH_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json(err, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}
