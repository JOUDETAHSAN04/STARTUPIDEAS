import { BASE_QUOTES } from "./constants";

export function formatTime(ms: number) {
    const total = Math.max(0, Math.floor(ms / 1000));
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function pickQuote(motivation: string) {
    const why = motivation.trim();
    const base = BASE_QUOTES[Math.floor(Math.random() * BASE_QUOTES.length)];

    if (!why) return base;

    const variants = [
        base,
        `Stay with it. ${why}`,
        `You chose this. ${why}`,
        `Keep going — ${why}`,
    ];

    return variants[Math.floor(Math.random() * variants.length)];
}
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
