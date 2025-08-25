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

export function calculateReadingTime(content: string): string {
  if (!content) return "0 min read";
  
  // Remove markdown syntax and HTML tags for more accurate word count
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[.*?\]\(.*?\)/g, '$1') // Remove links, keep text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/#{1,6}\s/g, '') // Remove heading markers
    .replace(/[*_~]/g, '') // Remove emphasis markers
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  const words = cleanContent.split(/\s+/).filter(word => word.length > 0).length;
  const wordsPerMinute = 200; // Average reading speed
  const readingTimeMinutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  
  return `${readingTimeMinutes} min read`;
}