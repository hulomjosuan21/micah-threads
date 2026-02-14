import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPostgresDateTime(
  value: string | null,
  timeZone: string = "Asia/Manila",
): string | null {
  if (!value) return null;

  const date = new Date(value.replace(" ", "T") + "Z");
  if (isNaN(date.getTime())) return null;

  const datePart = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    timeZone,
  }).format(date);

  const timePart = new Intl.DateTimeFormat("en-US", {
    hour: "numeric", // ← cleaner than 2-digit
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(date);

  return `${datePart} at ${timePart}`;
}
