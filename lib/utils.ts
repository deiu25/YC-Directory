import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}

export function manualSlugify(str: string): string {
  let newStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  newStr = newStr.toLowerCase();
  newStr = newStr.replace(/[^a-z0-9\s-]/g, "");
  newStr = newStr.trim().replace(/\s+/g, "-");
  return newStr;
}