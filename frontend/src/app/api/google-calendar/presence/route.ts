// /api/presence/route.ts
import Presence from "@/src/models/Presence";
import { connectMongo } from "@/src/libs/mongo";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const calendarId = searchParams.get("calendarId");

  await connectMongo();

  const cutoff = new Date(Date.now() - 60_000); // 1 min
  const users = await Presence.find({
    calendarId,
    lastSeen: { $gte: cutoff },
  });

  return Response.json({
    count: users.length,
    users,
  });
}
