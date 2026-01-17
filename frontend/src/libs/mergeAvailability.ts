import { DayAvailability } from "./availability";

export function mergeAvailability(
  a: DayAvailability[],
  b: DayAvailability[]
): DayAvailability[] {
  const mapB = Object.fromEntries(
    b.map((d) => [d.date, d.blocks])
  );

  return a
    .filter((d) => mapB[d.date])
    .map((d) => ({
      date: d.date,
      blocks: d.blocks.filter((block) =>
        mapB[d.date].includes(block)
      ),
    }))
    .filter((d) => d.blocks.length > 0);
}
