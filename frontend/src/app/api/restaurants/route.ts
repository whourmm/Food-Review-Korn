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

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/review/restaurants/`, {
      headers: { Authorization: `Token ${AUTH_TOKEN}` },
      cache: "no-store",
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch restaurants" }, { status: res.status });
    }
    const data = await res.json();
    const results = Array.isArray(data) ? data : (data.results ?? []);
    return NextResponse.json(results.map(transformRestaurant));
  } catch (err) {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = {
      name: body.name,
      description: body.description,
      location: body.location,
      images: body.images ?? [],
      created_by: body.createdBy ?? "",
      categories: body.categories ?? [],
      overall_score: body.overallScore ?? 0,
      food_type: body.foodType ?? "Others",
      status: body.status ?? "draft",
    };
    const res = await fetch(`${BACKEND_URL}/api/review/add-restaurant/`, {
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
    return NextResponse.json(transformRestaurant(data), { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Backend unavailable" }, { status: 503 });
  }
}
