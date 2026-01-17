export type AvailabilityType =
  | "full"
  | "morning"
  | "afternoon"
  | "evening"
  | "busy";

export function classifyDay(events: any[]): AvailabilityType {
  if (events.length === 0) return "full";

  let busyHours = 0;

  events.forEach((event) => {
    const start = new Date(event.start.dateTime || event.start.date);
    const end = new Date(event.end.dateTime || event.end.date);
    busyHours += (end.getTime() - start.getTime()) / 36e5;
  });

  if (busyHours >= 8) return "busy";
  if (busyHours >= 4) return "afternoon";
  return "morning";
}
