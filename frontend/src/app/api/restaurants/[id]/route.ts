import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
const AUTH_TOKEN = process.env.AUTHORIZE_TOKEN;

function transformRestaurant(r: any) {
  return {
    id: String(r.id ?? r._id ?? ""),
    name: r.name ?? "",
    description: r.description ?? "",
    location: r.location ?? "",
    images: r.images ?? [],
    createdBy: r.created_by ?? "",
    createdAt: r.created_at ?? "",
    categories: r.categories ?? [],
    overallScore: r.overall_score ?? 0,
    foodType: r.food_type ?? "Others",
    status: r.status ?? "draft",
  };
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const res = await fetch(`${BACKEND_URL}/api/review/restaurants/${id}/`, {
      headers: { Authorization: `Token ${AUTH_TOKEN}` },
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Restaurant not found" }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(transformRestaurant(data));
  } catch (err) {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}
