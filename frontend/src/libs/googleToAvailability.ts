export type TimeBlock = "morning" | "afternoon" | "evening" | "full";

const BLOCKS = {
  morning: [8, 12],
  afternoon: [13, 17],
  evening: [18, 22],
};

export function getFreeBlocks(events: any[], date: string) {
  const busy: [number, number][] = [];

  events.forEach((e) => {
    const start = new Date(e.start.dateTime || e.start.date);
    const end = new Date(e.end.dateTime || e.end.date);

    if (start.toISOString().startsWith(date)) {
      busy.push([
        start.getHours(),
        end.getHours(),
      ]);
    }
  });

  const freeBlocks: TimeBlock[] = [];

  Object.entries(BLOCKS).forEach(([name, [s, e]]) => {
    const isBusy = busy.some(
      ([bs, be]) => Math.max(bs, s) < Math.min(be, e)
    );

    if (!isBusy) freeBlocks.push(name as TimeBlock);
  });

  if (freeBlocks.length === 3) return ["full"];
  return freeBlocks;
}
