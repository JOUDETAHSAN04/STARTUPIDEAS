import { ACTIVITIES } from "@/lib/constants";
import { Activity } from "@/types";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";

interface ActivityGridProps {
    selectedActivity: Activity;
    onSelect: (activity: Activity) => void;
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
            "flex flex-col items-center justify-center text-center", // Changed to center alignment
            "min-h-[140px]", // Slightly reduced height
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

            <TooltipProvider>
                <div className="grid gap-4 grid-cols-3 sm:grid-cols-3 lg:grid-cols-3">
                    {ACTIVITIES.map((a) => {
                        const selected = a.key === selectedActivity;
                        const Icon = a.icon;

                        return (
                            <Tooltip key={a.key}>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        onClick={() => onSelect(a.key)}
                                        className={tileClasses(selected)}
                                    >
                                        <div className={glowClasses(selected)} style={{ background: a.glow }} />

                                        <div className="relative flex h-full flex-col items-center justify-center gap-3">
                                            <Icon className={`w-8 h-8 ${selected ? 'text-white' : 'text-white/60 group-hover:text-white/90'} transition-colors duration-300`} strokeWidth={1.5} />
                                            <div className="text-sm font-medium leading-tight">{a.key}</div>
                                        </div>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>{a.desc}</p>
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
            </TooltipProvider>
        </section>
    );
}
