import { Activity } from "@/types";

export const ACTIVITIES: { key: Activity; desc: string; glow: string }[] = [
    {
        key: "Study",
        desc: "Deep attention. One topic. No multitask.",
        glow: "radial-gradient(circle at 30% 30%, rgba(56,189,248,0.35), transparent 55%), radial-gradient(circle at 70% 60%, rgba(167,139,250,0.35), transparent 58%)",
    },
    {
        key: "Work",
        desc: "Deliver something real. Small wins count.",
        glow: "radial-gradient(circle at 30% 30%, rgba(34,197,94,0.28), transparent 55%), radial-gradient(circle at 70% 60%, rgba(56,189,248,0.28), transparent 58%)",
    },
    {
        key: "Workout",
        desc: "Move. Sweat. Reset your brain.",
        glow: "radial-gradient(circle at 30% 30%, rgba(244,63,94,0.22), transparent 55%), radial-gradient(circle at 70% 60%, rgba(245,158,11,0.18), transparent 58%)",
    },
    {
        key: "Reading",
        desc: "Calm focus. One page at a time.",
        glow: "radial-gradient(circle at 30% 30%, rgba(167,139,250,0.26), transparent 55%), radial-gradient(circle at 70% 60%, rgba(56,189,248,0.20), transparent 58%)",
    },
    {
        key: "Planning",
        desc: "Organize tasks. Clear the next move.",
        glow: "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.26), transparent 55%), radial-gradient(circle at 70% 60%, rgba(34,197,94,0.20), transparent 58%)",
    },
    {
        key: "Creative",
        desc: "Design, write, build — stay in flow.",
        glow: "radial-gradient(circle at 30% 30%, rgba(167,139,250,0.30), transparent 55%), radial-gradient(circle at 70% 60%, rgba(244,63,94,0.18), transparent 58%)",
    },
    {
        key: "Meditation",
        desc: "Slow down. Reset. Clear the noise.",
        glow: "radial-gradient(circle at 30% 30%, rgba(34,197,94,0.22), transparent 55%), radial-gradient(circle at 70% 60%, rgba(167,139,250,0.22), transparent 58%)",
    },
    {
        key: "Chores",
        desc: "Clean actions. Clean mind. Small progress.",
        glow: "radial-gradient(circle at 30% 30%, rgba(245,158,11,0.18), transparent 55%), radial-gradient(circle at 70% 60%, rgba(56,189,248,0.18), transparent 58%)",
    },
    {
        key: "Custom",
        desc: "Name it yourself. Anything you want.",
        glow: "radial-gradient(circle at 30% 30%, rgba(56,189,248,0.25), transparent 55%), radial-gradient(circle at 70% 60%, rgba(34,197,94,0.18), transparent 58%)",
    },
];

export const BASE_QUOTES = [
    "Start small. Stay consistent.",
    "One focused hour beats ten distracted.",
    "Quiet effort. Loud results.",
    "Breathe. Reset. Continue.",
    "Do the next right thing.",
    "Win the minute. The hour follows.",
];
