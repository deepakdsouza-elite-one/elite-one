import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const GOOGLE_SHEETS_API = "https://script.google.com/macros/s/AKfycbzRNj8U_o4Ld96V94Vm5xBuE4RRoY3hoXaLMtsILgL7N2va_bnfe57MueAPONVoMkvW/exec"

export const scrollTo = (id: string) => {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};
