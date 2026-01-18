import { ACTIVITIES } from "@/lib/constants";
import { Activity } from "@/types";

interface ActivityGridProps {
    selectedActivity: Activity;
    onSelect: (activity: Activity) => void;
    // Passing effectiveActivity mainly to show "Selected: X" in the header if we want,
    // but for the grid items themselves, they just need to know which is selected.
    effectiveActivityName: string;
}

export default function ActivityGrid({
    selectedActivity,
    onSelect,
    effectiveActivityName,
}: ActivityGridProps) {
    function tileClasses(selected: boolean) {
        return [
            "group relative w-full overflow-hidden rounded-3xl border p-6 text-left transition",
            "backdrop-blur-xl",
            "flex flex-col justify-start",
            "min-h-[150px]",
            selected
                ? "border-white/20 bg-white/[0.10] shadow-[0_18px_80px_rgba(0,0,0,0.55)]"
                : "border-white/10 bg-white/[0.05] hover:bg-white/[0.08] hover:border-white/15",
        ].join(" ");
    }

    function glowClasses(selected: boolean) {
        return [
            "pointer-events-none absolute -inset-16 opacity-0 blur-3xl transition-opacity duration-300",
            selected ? "opacity-100" : "group-hover:opacity-60",
        ].join(" ");
    }

    return (
        <section className="lg:col-span-6">
            <div className="mb-4 flex items-end justify-between">
                <h2 className="text-sm font-medium text-white/80">Activity</h2>
                <div className="text-xs text-white/55">
                    Selected: <span className="text-white/85">{effectiveActivityName}</span>
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {ACTIVITIES.map((a) => {
                    const selected = a.key === selectedActivity;
                    return (
                        <button
                            key={a.key}
                            type="button"
                            onClick={() => onSelect(a.key)}
                            className={tileClasses(selected)}
                        >
                            <div className={glowClasses(selected)} style={{ background: a.glow }} />
                            <div className="relative flex h-full flex-col justify-start">
                                <div className="text-2xl font-semibold leading-tight">{a.key}</div>
                                <div className="mt-2 text-sm leading-snug text-white/70">{a.desc}</div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
