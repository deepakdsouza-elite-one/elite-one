import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const GOOGLE_SHEETS_API = "https://script.google.com/macros/s/AKfycbznfz9j1Ze8J7lAPMSh2mc3lpSejSfXi3812JVLROUBOa-eUn1QEfOfnKWE-ZgJB-WvjA/exec"

export const scrollTo = (id: string) => {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};
