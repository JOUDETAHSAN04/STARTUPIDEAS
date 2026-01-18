import { Activity } from "@/types";

interface SessionConfiguratorProps {
    activity: Activity;
    customActivity: string;
    setCustomActivity: (val: string) => void;
    minutes: number;
    setMinutes: (val: number) => void;
    motivation: string;
    setMotivation: (val: string) => void;
    onStart: () => void;
    isStartDisabled: boolean;
}

export default function SessionConfigurator({
    activity,
    customActivity,
    setCustomActivity,
    minutes,
    setMinutes,
    motivation,
    setMotivation,
    onStart,
    isStartDisabled,
}: SessionConfiguratorProps) {
    return (
        <section className="lg:col-span-6">
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl shadow-[0_18px_80px_rgba(0,0,0,0.45)]">
                <h2 className="text-sm font-medium text-white/80">Session</h2>

                {activity === "Custom" && (
                    <div className="mt-6">
                        <label className="text-sm text-white/75">Custom activity name</label>
                        <input
                            value={customActivity}
                            onChange={(e) => setCustomActivity(e.target.value)}
                            placeholder="e.g., Coding, Portfolio, Quran, Learning…"
                            className="mt-3 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white/90 outline-none placeholder:text-white/40 focus:border-white/20"
                        />
                    </div>
                )}

                {/* Duration */}
                <div className="mt-6">
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-white/75">Duration</label>
                        <div className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/90">
                            {minutes} min
                        </div>
                    </div>

                    <input
                        type="range"
                        min={10}
                        max={120}
                        value={minutes}
                        onChange={(e) => setMinutes(Number(e.target.value))}
                        className="mt-4 w-full"
                    />

                    <div className="mt-2 flex justify-between text-xs text-white/45">
                        <span>10m</span>
                        <span>120m</span>
                    </div>
                </div>

                {/* Motivation */}
                <div className="mt-7">
                    <label className="text-sm text-white/75">Motivation (optional)</label>
                    <textarea
                        value={motivation}
                        onChange={(e) => setMotivation(e.target.value)}
                        placeholder="Your why… (e.g., build my future, finish the task, stay consistent)"
                        className="mt-3 h-32 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white/90 outline-none placeholder:text-white/40 focus:border-white/20"
                    />
                </div>

                {/* Start */}
                <button
                    type="button"
                    onClick={onStart}
                    disabled={isStartDisabled}
                    className={[
                        "mt-7 w-full rounded-2xl py-4 text-base font-semibold transition",
                        isStartDisabled
                            ? "cursor-not-allowed bg-white/10 text-white/40"
                            : "bg-white text-zinc-950 hover:bg-white/95",
                    ].join(" ")}
                >
                    Start Focus Session
                </button>

                <p className="mt-3 text-center text-xs text-white/45">
                    Tip: keep the goal small. Consistency beats intensity.
                </p>
            </div>
        </section>
    );
}
