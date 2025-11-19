import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const compactNumberFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const standardNumberFormatter = new Intl.NumberFormat("en-US");

export function formatViews(views: number) {
  const safeViews = Math.max(0, Math.round(views));
  return safeViews < 1000
    ? standardNumberFormatter.format(safeViews)
    : compactNumberFormatter.format(safeViews);
}
