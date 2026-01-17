"use client";

type CalendarUser = {
  id: string;
  name: string;
  avatar?: string;
};

type AvailabilityItem = {
  date: string;
  freeHours: number;
  freeSlots: any[];
  user: CalendarUser;
};

type Member = {
  userId: string;
  name: string;
  avatar?: string;
};

export default function AvailabilityCalendar({
  days,
  monthLabel,
  availabilityByDate,
  members,
  prevMonth,
  nextMonth,
  getBorderColor,
  highlightedDates,
}: {
  days: (Date | null)[];
  monthLabel: string;
  availabilityByDate: Record<string, AvailabilityItem[]>;
  members: Member[];
  prevMonth: () => void;
  nextMonth: () => void;
  getBorderColor: any;
  highlightedDates: Map<string, "green" | "yellow">;
}) {
  return (
    <div className="md:col-span-2 bg-white rounded shadow p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="px-3 py-1 rounded border hover:bg-slate-100"
        >
          ←
        </button>

        <h2 className="text-lg font-semibold">{monthLabel}</h2>

        <button
          onClick={nextMonth}
          className="px-3 py-1 rounded border hover:bg-slate-100"
        >
          →
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center font-semibold text-sm">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, i) => {
          if (!day) return <div key={i} />;

          const date = day.toLocaleDateString("en-CA");
          const highlight = highlightedDates.get(date);

          const items =
            availabilityByDate[date] ??
            members.map((m) => ({
              date,
              freeHours: 0,
              freeSlots: [],
              user: {
                id: m.userId,
                name: m.name,
                avatar: m.avatar,
              },
            }));

          return (
            <div
              key={i}
              className={`aspect-square border rounded p-2 transition
                ${
                  highlight === "green"
                    ? "bg-green-100 border-green-500"
                    : highlight === "yellow"
                    ? "bg-yellow-100 border-yellow-400"
                    : "bg-white"
                }
              `}
            >
              <div className="font-semibold">{day.getDate()}</div>

              {/* Show avatars ONLY if highlighted */}
              {highlight && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {items.map((a, idx) => (
                    <img
                      key={idx}
                      src={a.user.avatar || "/default-profile.png"}
                      className="w-6 h-6 rounded-full"
                      title={a.user.name}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
