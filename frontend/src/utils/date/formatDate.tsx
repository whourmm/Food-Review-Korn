export function formatDate(dateString: string) {
  const d = new Date(dateString);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    weekday: "short",
    month: "short",
    year: "numeric",
  }).format(d);
}