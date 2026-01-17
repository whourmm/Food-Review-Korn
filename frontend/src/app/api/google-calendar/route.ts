import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import CalendarMember from "@/src/models/CalendarMember";
import { getCalendarClient } from "@/src/libs/google";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ users: [] });

  const { searchParams } = new URL(req.url);
  const year = Number(searchParams.get("year"));
  const month = Number(searchParams.get("month")); // 0-based

  if (isNaN(year) || isNaN(month)) {
    return NextResponse.json({ users: [] });
  }

  // ⏱ FULL MONTH RANGE
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59);

  const members = await CalendarMember.find({
    calendarCode: "ABC123",
    accessToken: { $exists: true },
  });

  const users = [];

  for (const member of members) {
    
    const calendar = getCalendarClient(member.accessToken, member.refreshToken);

    const eventsRes = await calendar.events.list({
  calendarId: "primary",
  timeMin: start.toISOString(),
  timeMax: end.toISOString(),
  timeZone: "Asia/Bangkok",
  singleEvents: true,
  orderBy: "startTime",
});

    // build busy map
    const busyByDate: Record<string, any[]> = {};

    for (const e of eventsRes.data.items || []) {
      if (!e.start?.dateTime || !e.end?.dateTime) continue;

      const s = new Date(e.start.dateTime);
      const d = s.toISOString().split("T")[0];

      busyByDate[d] ||= [];
      busyByDate[d].push({
  start: new Date(new Date(e.start.dateTime).toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  })),
  end: new Date(new Date(e.end.dateTime).toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  })),
});
    }

    // generate availability for every day
    const availability = [];
    const cursor = new Date(start);

    while (cursor <= end) {
      const date = cursor.toISOString().split("T")[0];
      availability.push({
        date,
        freeHours: 8,
        freeSlots: [{ start: "00:00", end: "23:59" }],
      });
      cursor.setDate(cursor.getDate() + 1);
    }

    users.push({
      id: member.email,
      name: member.name,
      avatar: member.avatar,
      availability,
    });
  }

  return NextResponse.json({ users });
}
