import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toastVariants = {
  error: "bg-red-100 text-red-600 shadow-md shadow-red-400/30 rounded-xl py-6",
  success:
    "bg-green-100 text-green-600 shadow-md shadow-green-400/30 rounded-xl py-6",
};
