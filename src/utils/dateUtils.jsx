import dayjs from "dayjs";

export function formatDateForServer(date) {
  return date.toISOString();
}

export function formatDateForDisplay(date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}

// Other date-related utilities...
