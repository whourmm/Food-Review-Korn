import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
const AUTH_TOKEN = process.env.AUTHORIZE_TOKEN;

function transformReview(r: any) {
  return {
    id: String(r.id ?? r._id ?? ""),
    restaurantId: r.restaurant_id ?? "",
    images: r.images ?? [],
    reviewerName: r.reviewer_name ?? "",
    categoriesScore: r.categories_score ?? [],
    review: r.review ?? undefined,
    date: r.date ?? new Date().toISOString(),
  };
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ restaurantId: string }> }
) {
  try {
    const { restaurantId } = await params;
    const res = await fetch(
      `${BACKEND_URL}/api/review/reviews/?restaurant_id=${restaurantId}`,
      {
        headers: { Authorization: `Token ${AUTH_TOKEN}` },
        cache: "no-store",
      }
    );
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch reviews" }, { status: res.status });
    }
    const data = await res.json();
    const results = Array.isArray(data) ? data : (data.results ?? []);
    return NextResponse.json(results.map(transformReview));
  } catch {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}
