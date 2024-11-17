import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number) {
  // Round the number to 5 decimal places
  const roundedNum = num.toFixed(4);
  // Format the number with commas as thousands separators
  return parseFloat(roundedNum).toLocaleString("en-US", {
    minimumFractionDigits: 5,
  });
}
