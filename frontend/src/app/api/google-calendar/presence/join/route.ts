// /api/presence/join/route.ts
import { getServerSession } from "next-auth";
import Presence from "@/src/models/Presence";
import { connectMongo } from "@/src/libs/mongo";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user) return new Response("Unauthorized", { status: 401 });

  const { calendarId } = await req.json();
  await connectMongo();

  await Presence.findOneAndUpdate(
    { calendarId, userId: session.user.email },
    {
      name: session.user.name,
      avatar: session.user.image,
      lastSeen: new Date(),
    },
    { upsert: true }
  );

  return Response.json({ ok: true });
}
