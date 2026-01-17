import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { connectMongo } from "@/src/libs/mongo";
import { Calendar } from "@/src/models/Calendar";
import CalendarMember from "@/src/models/CalendarMember";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { calendarId } = await req.json();
  if (!calendarId) {
    return Response.json({ error: "Missing calendarId" }, { status: 400 });
  }

  await connectMongo();

  // 1️⃣ Ensure calendar exists
  await Calendar.findOneAndUpdate(
    { code: calendarId },
    { $setOnInsert: { code: calendarId } },
    { upsert: true }
  );

  // 2️⃣ Ensure owner is a member (ONLY ONE OWNER PER CALENDAR)
  await CalendarMember.findOneAndUpdate(
    {
      calendarCode: calendarId,
      email: session.user.email,
    },
    {
      $setOnInsert: {
        userId: session.user.email, // stable ID
        email: session.user.email,
        name: session.user.name,
        avatar: session.user.image,
        role: "owner",

        // 🔐 SAVE GOOGLE TOKENS
        accessToken: session.accessToken,
        refreshToken: session.refreshToken,
        tokenExpiresAt: session.expiresAt,
      },
    },
    { upsert: true }
  );

  return Response.json({ ok: true });
}
