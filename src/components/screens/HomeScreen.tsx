"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Activity } from "@/types";
import ActivityGrid from "@/components/home/ActivityGrid";
import SessionConfigurator from "@/components/home/SessionConfigurator";

export default function HomeScreen() {
    const router = useRouter();

    const [activity, setActivity] = useState<Activity>("Study");
    const [customActivity, setCustomActivity] = useState("");
    const [minutes, setMinutes] = useState<number>(50);
    const [motivation, setMotivation] = useState("");

    const effectiveActivity = useMemo(() => {
        if (activity !== "Custom") return activity;
        return customActivity.trim() || "Custom";
    }, [activity, customActivity]);

    const isStartDisabled = activity === "Custom" && customActivity.trim().length === 0;

    async function handleStart() {
        const params = new URLSearchParams();
        params.set("activity", effectiveActivity);
        params.set("minutes", String(minutes));
        if (motivation.trim()) params.set("motivation", motivation.trim());

        try {
            await document.documentElement.requestFullscreen();
        } catch { }

        router.push(`/session?${params.toString()}`);
    }

    return (
        <main className="min-h-screen text-zinc-100 bg-[radial-gradient(80%_120%_at_20%_10%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(70%_110%_at_80%_20%,rgba(167,139,250,0.22),transparent_55%),radial-gradient(90%_140%_at_50%_90%,rgba(34,197,94,0.12),transparent_60%),linear-gradient(135deg,#050B1E_0%,#07061A_55%,#030712_100%)]">
            <div className="mx-auto max-w-6xl px-8 py-12">
                <header className="mb-10">
                    <h1 className="text-4xl font-semibold tracking-tight">Set your focus</h1>
                    <p className="mt-2 max-w-2xl text-sm text-white/70">
                        Pick what you’re doing, choose how long, add a “why” if you want — then we go full-screen.
                    </p>
                </header>

                <div className="grid items-stretch gap-8 lg:grid-cols-12">
                    {/* LEFT: Activity Grid */}
                    <ActivityGrid
                        selectedActivity={activity}
                        onSelect={setActivity}
                        effectiveActivityName={effectiveActivity}
                    />

                    {/* RIGHT: Session Configuration */}
                    <SessionConfigurator
                        activity={activity}
                        customActivity={customActivity}
                        setCustomActivity={setCustomActivity}
                        minutes={minutes}
                        setMinutes={setMinutes}
                        motivation={motivation}
                        setMotivation={setMotivation}
                        onStart={handleStart}
                        isStartDisabled={isStartDisabled}
                    />
                </div>
            </div>
        </main>
    );
}
