import { formatTime } from "@/lib/utils";

interface TimerDisplayProps {
    activity: string;
    remainingMs: number;
    totalMs: number;
    done: boolean;
}

export default function TimerDisplay({
    activity,
    remainingMs,
    totalMs,
    done,
}: TimerDisplayProps) {
    const progress =
        totalMs === 0 ? 0 : Math.min(1, Math.max(0, (totalMs - remainingMs) / totalMs));

    return (
        <div className="relative flex h-full items-center justify-center">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />

            <div className="relative flex w-full max-w-xl flex-col items-center px-4 sm:px-6 lg:px-10 text-center">
                <div className="text-xs sm:text-sm text-white/65">{activity}</div>

                <div className="mt-3 sm:mt-4 lg:mt-5 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold leading-none tabular-nums tracking-tight text-white/95 drop-shadow-[0_14px_40px_rgba(0,0,0,0.55)]">
                    {formatTime(remainingMs)}
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-10 h-2 sm:h-3 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                        className="h-full bg-white/90 shadow-[0_0_18px_rgba(167,139,250,0.35)] transition-[width] duration-300"
                        style={{ width: `${progress * 100}%` }}
                    />
                </div>

                <div className="mt-3 sm:mt-4 lg:mt-5 text-xs sm:text-sm text-white/65">
                    {done ? (
                        <span className="text-white/90">Done</span>
                    ) : (
                        <>
                            <span className="text-white/90">
                                {Math.ceil(remainingMs / 60000)}
                            </span>{" "}
                            min left
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
