// /api/google-calendar/join/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectMongo } from "@/src/libs/mongo";
import CalendarMember from "@/src/models/CalendarMember";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session.accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { code } = await req.json();
  await connectMongo();

  await CalendarMember.findOneAndUpdate(
    {
      calendarCode: code,
      email: session.user.email,
    },
    {
      calendarCode: code,
      email: session.user.email,
      name: session.user.name,
      avatar: session.user.image,
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
      role: "member",
      joinedAt: new Date(),
    },
    { upsert: true }
  );

  return Response.json({ ok: true });
}
