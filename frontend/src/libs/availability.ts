export type TimeBlock = "morning" | "afternoon" | "evening" | "full";

export interface DayAvailability {
  date: string; // YYYY-MM-DD
  blocks: TimeBlock[];
}
