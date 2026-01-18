"use client";

import { useEffect, useMemo, useState, } from "react";
import { formatDate } from "@/src/utils/date/formatDate";

import { useSession } from "next-auth/react";
import BestMeetingTimes from "@/src/components/calendar/BestTimeMeeting";
import AvailabilityCalendar from "@/src/components/calendar/AvailabilityCalendar";

type FreeSlot = {
  start: string;
  end: string;
};

type Availability = {
  date: string;
  freeHours: number;
  freeSlots: FreeSlot[];
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
};

export default function MainPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const session = useSession(); // TODO: Replace with actual session from auth
  const [filterStart, setFilterStart] = useState(9 * 60);   // minutes
  const [filterEnd, setFilterEnd] = useState(18 * 60);     // minutes


  const calendarId = "ABC123"; // temp for testing
  const heartbeatInterval = 10000000; // 10000 seconds = approx 2.7 hours

  /* ---------------- Ensure owner ---------------- */

  useEffect(() => {
    if (!session) return;

    fetch("/api/google-calendar/ensure-owner", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ calendarId }),
    });
  }, [session, calendarId]);




  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-based

    fetch(`/api/google-calendar/availability?year=${year}&month=${month}`)
      .then((res) => res.json())
      .then((data) => {
        const flat: Availability[] = [];

        for (const u of data.users || []) {
          for (const d of u.availability || []) {
            flat.push({
              ...d,
              user: {
                id: u.id,
                name: u.name,
                avatar: u.avatar,
              },
            });
          }
        }

        setAvailability(flat);
      });
  }, [currentDate]); // 👈 IMPORTANT



  /* ---------------- Calendar navigation ---------------- */

  function prevMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  }

  function nextMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  }

  const monthLabel = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });


  /* ---------------- Presence ---------------- */
  useEffect(() => {
    fetch("/api/google-calendar/presence/join", {
      method: "POST",
      body: JSON.stringify({ calendarId }),
    });

    const i = setInterval(() => {
      fetch("/api/google-calendar/presence/heartbeat", {
        method: "POST",
        body: JSON.stringify({ calendarId }),
      });
    }, heartbeatInterval);

    return () => clearInterval(i);
  }, [calendarId]);

  /* ---------------- Members ---------------- */
  useEffect(() => {
    fetch(`/api/google-calendar/members?code=${calendarId}`)
      .then((res) => res.json())
      .then(setMembers);
  }, [calendarId]);

  /* ---------------- Group by date ---------------- */
  const availabilityByDate = useMemo(() => {
    return availability.reduce<Record<string, Availability[]>>((acc, a) => {
      acc[a.date] ||= [];
      acc[a.date].push(a);
      return acc;
    }, {});
  }, [availability]);

  /* ---------------- Best meeting time ---------------- */

  type FreeSlot = {
    start: string;
    end: string;
  };

  function toMinutes(t: string) {
    const time = t.includes("T") ? t.split("T")[1] : t;
    const [h, m] = time.substring(0, 5).split(":").map(Number);
    return h * 60 + m;
  }

  function intersectSlots(a: FreeSlot[], b: FreeSlot[]): FreeSlot[] {
    const result: FreeSlot[] = [];

    for (const x of a) {
      for (const y of b) {
        const startMin = Math.max(toMinutes(x.start), toMinutes(y.start));
        const endMin = Math.min(toMinutes(x.end), toMinutes(y.end));

        if (startMin < endMin) {
          result.push({
            start: `${String(Math.floor(startMin / 60)).padStart(2, "0")}:${String(startMin % 60).padStart(2, "0")}`,
            end: `${String(Math.floor(endMin / 60)).padStart(2, "0")}:${String(endMin % 60).padStart(2, "0")}`,
          });
        }
      }
    }

    return result;
  }

  const bestMeetingDays = useMemo(() => {
    console.log("Calculating best meeting days from availabilityByDate:", availabilityByDate);
    if (members.length === 0) return [];
    console.log("Members:", members);

    return Object.entries(availabilityByDate)
      .filter(([, list]) =>
        list.length === members.length &&
        list.every((u) => u.freeSlots && u.freeSlots.length > 0)
      )
      .map(([date, list]) => {
        let commonSlots = [...list[0].freeSlots];

        for (let i = 1; i < list.length; i++) {
          commonSlots = intersectSlots(commonSlots, list[i].freeSlots);
          if (commonSlots.length === 0) break;
        }

        console.log("Date:", date, "Common Slots:", commonSlots);

        return {
          date,
          users: list.map((l) => ({ user: l.user })),
          overlaps: commonSlots,
        };
      })
      .filter((d) => overlapMinutes(d.overlaps) >= 30);
  }, [availabilityByDate, members]);



  /* ---------------- Invite ---------------- */
  function inviteFriend() {
    const link = `${window.location.origin}/calendar/invite?code=${calendarId}`;
    navigator.clipboard.writeText(link);
  }

  /* ---------------- Helpers ---------------- */
  function getBorderColor(hours: number) {
    if (hours > 7) return "border-green-500";
    if (hours >= 4) return "border-yellow-400";
    return "hidden";
  }

  function slotWithinRange(slot: FreeSlot, start: number, end: number) {
    const s = toMinutes(slot.start);
    const e = toMinutes(slot.end);
    return s >= start && e <= end;
  }

  function clampSlot(slot: FreeSlot, start: number, end: number): FreeSlot | null {
  const s = Math.max(toMinutes(slot.start), start);
  const e = Math.min(toMinutes(slot.end), end);
  if (s >= e) return null;

  return {
    start: `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`,
    end: `${String(Math.floor(e / 60)).padStart(2, "0")}:${String(e % 60).padStart(2, "0")}`,
  };
}

function mergeSlots(slots: FreeSlot[]): FreeSlot[] {
  if (slots.length === 0) return [];

  const sorted = [...slots].sort(
    (a, b) => toMinutes(a.start) - toMinutes(b.start)
  );

  const merged: FreeSlot[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const last = merged[merged.length - 1];
    const curr = sorted[i];

    if (toMinutes(curr.start) <= toMinutes(last.end)) {
      last.end =
        toMinutes(curr.end) > toMinutes(last.end)
          ? curr.end
          : last.end;
    } else {
      merged.push(curr);
    }
  }

  return merged;
}

function slotMinutes(slots: FreeSlot[]) {
  return slots.reduce(
    (sum, s) => sum + (toMinutes(s.end) - toMinutes(s.start)),
    0
  );
}



 const highlightedDates = useMemo(() => {
  const result = new Map<string, "green" | "yellow">();
  const totalRange = filterEnd - filterStart;

  bestMeetingDays.forEach((day) => {
    const date = day.date;
    const list = availabilityByDate[date];
    if (!list || list.length !== members.length) return;

    let combined: FreeSlot[] | null = null;

    for (const user of list) {
      const clipped = user.freeSlots
        .map((s) => clampSlot(s, filterStart, filterEnd))
        .filter(Boolean) as FreeSlot[];

      if (clipped.length === 0) {
        combined = null;
        break;
      }

      combined = combined
        ? intersectSlots(combined, clipped)
        : clipped;
    }

    // ⚪ no free time
    if (!combined || combined.length === 0) return;

    const merged = mergeSlots(combined);
    const minutes = slotMinutes(merged);
    const coverage = minutes / totalRange;

    // 🟢 strong + continuous
    if (merged.length === 1 && coverage >= 0.8) {
      result.set(date, "green");
    }
    // 🟡 partial (any overlap)
    else {
      result.set(date, "yellow");
    }
  });

  return result;
}, [bestMeetingDays, availabilityByDate, members, filterStart, filterEnd]);





  function overlapMinutes(slots: FreeSlot[]): number {
    return slots.reduce((sum, s) => {
      return sum + (toMinutes(s.end) - toMinutes(s.start));
    }, 0);
  }





  /* ---------------- Calendar days ---------------- */
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(new Date(year, month, i));
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ================= LEFT ================= */}
        <div className="md:col-span-2 bg-white rounded shadow p-6">
          <div className="flex mb-10 flex-row items-center justify-between mb-4"><h1 className="text-2xl font-bold ">
            Shared Availability Calendar
          </h1><button
            onClick={inviteFriend}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
              Copy Invite Link
            </button></div>


          <AvailabilityCalendar
            days={days}
            monthLabel={monthLabel}
            availabilityByDate={availabilityByDate}
            members={members}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            getBorderColor={getBorderColor}
            highlightedDates={highlightedDates}
          />
        </div>

        {/* ================= RIGHT ================= */}
        <BestMeetingTimes
          members={members}
          bestMeetingDays={bestMeetingDays}
          formatDate={formatDate}
          filterStart={filterStart}
          filterEnd={filterEnd}
          onChange={(s, e) => {
            if (s < e) {
              setFilterStart(s);
              setFilterEnd(e);
            }
          }}
        />

      </div>
    </div>
  );
}
