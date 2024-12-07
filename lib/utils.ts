import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateUniqueSlug(title: string): string {
  const slug = title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/[\s\-_]+/g, "-") // Replace spaces, underscores, or repeated dashes with a single dash
    .replace(/[^a-z0-9\-]/g, "") // Remove non-alphanumeric characters except dashes
    .replace(/-+/g, "-") // Ensure there are no consecutive dashes
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing dashes

  const uniqueId = uuidv4().split("-")[0]; // Shorten the UUID for brevity
  return `${slug}-${uniqueId}`;
}
