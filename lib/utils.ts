import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const GOOGLE_SHEETS_API = "https://script.google.com/macros/s/AKfycbzwzEfxYDHUJoNEqbxm8pdWNd6qTtN0A_0cTCBhVJ2sTIP4mYiMt7Y75Zg3dNrAoBl_/exec"

export const scrollTo = (id: string) => {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};