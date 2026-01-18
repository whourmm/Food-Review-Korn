import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import CalendarMember from "@/src/models/CalendarMember";
import { getCalendarClient } from "@/src/libs/google";


type FreeSlot = {
  start: string;
  end: string;
};

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ users: [] });

  function invertBusyToFree(
    busy: { start: Date; end: Date }[],
    workStart: Date,
    workEnd: Date
  ) {
    const free: { start: string; end: string }[] = [];
    let cursor = new Date(workStart);

    const sorted = busy.sort(
      (a, b) => a.start.getTime() - b.start.getTime()
    );

    for (const b of sorted) {
      if (cursor < b.start) {
        free.push({
  start: formatBangkokTime(cursor),
  end: formatBangkokTime(b.start),
});
      }
      cursor = new Date(Math.max(cursor.getTime(), b.end.getTime()));
    }

    if (cursor < workEnd) {
      free.push({
  start: formatBangkokTime(cursor),
  end: formatBangkokTime(workEnd),
});
    }

    return free;
  }

  function formatBangkokTime(d: Date) {
  return d.toLocaleTimeString("en-GB", {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

const nowBangkok = new Date(
  new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
);


  const { searchParams } = new URL(req.url);
  const year = Number(searchParams.get("year"));
  const month = Number(searchParams.get("month"));

  if (isNaN(year) || isNaN(month)) {
    return NextResponse.json({ users: [] });
  }

  const start = new Date(year, month, 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(year, month + 1, 1);
  end.setHours(0, 0, 0, 0);

  const members = await CalendarMember.find({
    calendarCode: "ABC123",
  }).select("+accessToken +refreshToken");

  const users = [];

  function slotsToHours(slots: FreeSlot[]): number {
    return slots.reduce((sum, s) => {
      const [sh, sm] = s.start.split(":").map(Number);
      const [eh, em] = s.end.split(":").map(Number);
      return sum + ((eh * 60 + em) - (sh * 60 + sm)) / 60;
    }, 0);
  }

  for (const member of members) {
    const calendar = await getCalendarClient(
      member.accessToken,
      member.refreshToken
    );


    

    const eventsRes = await calendar.events.list({
      calendarId: "primary",
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
 
      singleEvents: true,
      orderBy: "startTime",
    });

    const busyByDate: Record<string, any[]> = {};

    for (const e of eventsRes.data.items || []) {
      if (!e.start?.dateTime || !e.end?.dateTime) continue;

      const s = new Date(e.start.dateTime);
      const d = s.toLocaleDateString("en-CA", {
  timeZone: "Asia/Bangkok",
});


      busyByDate[d] ||= [];
      busyByDate[d].push({
        start: new Date(e.start.dateTime),
        end: new Date(e.end.dateTime),
      });
    }

    const availability = [];
    const cursor = new Date(start);

while (cursor < end) {
  const date = cursor.toLocaleDateString("en-CA", {
    timeZone: "Asia/Bangkok",
  });

  const todayBangkok = nowBangkok.toLocaleDateString("en-CA", {
    timeZone: "Asia/Bangkok",
  });

  if (date < todayBangkok) {
    cursor.setDate(cursor.getDate() + 1);
    continue;
  }



      function bangkokDate(date: string, time: string) {
  return new Date(`${date}T${time}+07:00`);
}

const workStartBase = bangkokDate(date, "00:00:00");
const workEndBase = bangkokDate(date, "23:59:59");

const isToday =
  date ===
  nowBangkok.toLocaleDateString("en-CA", { timeZone: "Asia/Bangkok" });

const workStart = isToday
  ? new Date(Math.max(workStartBase.getTime(), nowBangkok.getTime()))
  : workStartBase;

const workEnd = workEndBase;



      let busyMs = 0;

      for (const b of busyByDate[date] || []) {
        const s = new Date(Math.max(b.start.getTime(), workStart.getTime()));
        const e = new Date(Math.min(b.end.getTime(), workEnd.getTime()));
        if (s < e) busyMs += e.getTime() - s.getTime();
      }

      const freeHours =
        (workEnd.getTime() - workStart.getTime() - busyMs) / 36e5;

      const freeSlots = invertBusyToFree(
        busyByDate[date] || [],
        workStart,
        workEnd
      );

//       console.log(
//   `[${member.email}] ${date} free slots:`,
//   freeSlots.map(s => `${s.start}-${s.end}`).join(", ")
// );

// console.log(
//   `[${member.email}] ${date} free hours:`,
//   slotsToHours(freeSlots)
// );

      availability.push({
        date,
        freeHours: slotsToHours(freeSlots),
        freeSlots,
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
