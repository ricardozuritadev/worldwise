export const formatDates = (date: Date | undefined) => {
  if (!date) return "No date";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date));
};
