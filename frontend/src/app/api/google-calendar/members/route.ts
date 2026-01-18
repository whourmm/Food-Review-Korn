import { NextResponse } from "next/server";
import { connectMongo } from "@/src/libs/mongo";
import CalendarMember from "@/src/models/CalendarMember";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json([], { status: 200 });
  }

  await connectMongo();

  const members = await CalendarMember.find({ calendarCode: code }).lean();

  return NextResponse.json(members);
}
