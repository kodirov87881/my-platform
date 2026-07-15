import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const siteConfig = {
  name: "Mukhammadali Kodirov",
  title: "Full-Stack Developer & AI Automation Engineer",
  tagline: "Building smart systems that work for you.",
  location: "Kobe, Japan",
  email: "kodirov8788@gmail.com",
  github: "kodirov87881",
  upwork: "Mukhammadali Kodirov",
  skills: [
    "React / Next.js",
    "Node.js / Python",
    "AI Agent Development",
    "Google Apps Script",
    "Automation (n8n)",
    "AWS / Cloud",
    "Chatbot Development",
    "Full-Stack Web Apps",
  ],
  experience: [
    {
      role: "Developer",
      company: "QuinQue (The Edge)",
      location: "Japan",
      period: "Present",
      description: "Building and maintaining web applications.",
    },
  ],
  goals: [
    "$100K+/year remote job",
    "Top Rated Plus on Upwork",
    "Bug bounty on HackerOne",
  ],
}
