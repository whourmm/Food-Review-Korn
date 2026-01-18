"use client";

import { useMemo } from "react";
import * as Slider from "@radix-ui/react-slider";

type FreeSlot = {
  start: string;
  end: string;
};

type User = {
  id: string;
  name: string;
  avatar?: string;
};

type BestMeetingDay = {
  date: string;
  users: {
    user: User;
  }[];
  overlaps: FreeSlot[];
};

type Member = {
  userId: string;
  name: string;
  avatar?: string;
};

export default function BestMeetingTimes({
  members,
  bestMeetingDays,
  formatDate,
  filterStart,
  filterEnd,
  onChange,
}: {
  members: Member[];
  bestMeetingDays: BestMeetingDay[];
  formatDate: (date: string) => string;
  filterStart: number; // minutes
  filterEnd: number;   // minutes
  onChange: (start: number, end: number) => void;
}) {
  function toMinutes(t: string) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }

  function minutesToLabel(m: number) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${String(min).padStart(2, "0")} ${period}`;
  }

  const filteredDays = useMemo(() => {
  return bestMeetingDays
    .map((day) => {
      const clippedOverlaps = day.overlaps
        .map((o) => {
          const slotStart = toMinutes(o.start);
          const slotEnd = toMinutes(o.end);

          const start = Math.max(slotStart, filterStart);
          const end = Math.min(slotEnd, filterEnd);

          if (start >= end) return null;

          return {
            start: `${String(Math.floor(start / 60)).padStart(2, "0")}:${String(start % 60).padStart(2, "0")}`,
            end: `${String(Math.floor(end / 60)).padStart(2, "0")}:${String(end % 60).padStart(2, "0")}`,
          };
        })
        .filter(Boolean) as FreeSlot[];

      if (clippedOverlaps.length === 0) return null;

      return {
        ...day,
        overlaps: clippedOverlaps,
      };
    })
    .filter(Boolean) as BestMeetingDay[];
}, [bestMeetingDays, filterStart, filterEnd]);


  return (
    <div className="bg-white rounded shadow p-6">
      {/* Header */}
      <div className="flex flex-row items-center gap-3 mb-4">
        <h2 className="font-bold text-lg">Best Meeting Times</h2>

        <div className="flex gap-2">
          {members.map((m) => (
            <img
              key={m.userId}
              src={m.avatar || "/default-profile.png"}
              className="w-10 h-10 rounded-full"
              title={m.name}
            />
          ))}
        </div>
      </div>

      {/* Time range slider */}
      <div className="mb-6">
        <label className="text-sm text-gray-500">Time range</label>

        <Slider.Root
          className="relative flex items-center select-none touch-none h-5 mt-3"
          value={[filterStart, filterEnd]}
          min={0}
          max={1440}
          step={30}
          minStepsBetweenThumbs={1}
          onValueChange={(v) => onChange(v[0], v[1])}
        >
          <Slider.Track className="bg-slate-200 relative grow rounded-full h-1">
            <Slider.Range className="absolute bg-green-500 rounded-full h-full" />
          </Slider.Track>

          <Slider.Thumb className="block w-4 h-4 bg-white border rounded-full shadow" />
          <Slider.Thumb className="block w-4 h-4 bg-white border rounded-full shadow" />
        </Slider.Root>

        <div className="text-xs text-gray-600 mt-2">
          {minutesToLabel(filterStart)} – {minutesToLabel(filterEnd)}
        </div>
      </div>

      {/* Content */}
      {filteredDays.map((d) => (
        <div key={d.date} className="border rounded p-3 mb-3 bg-green-50">
          <div className="font-semibold">{formatDate(d.date)}</div>

          <div className="flex gap-2 my-2">
            {d.users.map((u) => (
              <img
                key={u.user.id}
                src={u.user.avatar || "/default-profile.png"}
                className="w-8 h-8 rounded-full"
              />
            ))}
          </div>

          {d.overlaps.map((o, i) => (
            <div key={i} className="text-green-700 text-sm">
              {minutesToLabel(toMinutes(o.start))} –{" "}
              {minutesToLabel(toMinutes(o.end))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
