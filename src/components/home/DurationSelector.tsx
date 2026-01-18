"use client";

import { motion } from "framer-motion";

interface DurationSelectorProps {
    minutes: number;
    setMinutes: (m: number) => void;
}

const PRESETS = [10, 30, 60];

export default function DurationSelector({ minutes, setMinutes }: DurationSelectorProps) {
    // Calculate percentage for the slider fill
    const min = 10;
    const max = 120;
    const range = max - min;
    const percent = Math.min(100, Math.max(0, ((minutes - min) / range) * 100));

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-white/80">Duration</label>
                <div className="text-2xl font-bold text-white tabular-nums tracking-tight">
                    {minutes} <span className="text-base font-normal text-white/50">min</span>
                </div>
            </div>

            {/* Preset Capsules */}
            <div className="grid grid-cols-3 gap-3 mb-8">
                {PRESETS.map((m) => {
                    const isActive = minutes === m;
                    return (
                        <button
                            key={m}
                            type="button"
                            onClick={() => setMinutes(m)}
                            className={[
                                "relative flex items-center justify-center py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                                isActive
                                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white",
                            ].join(" ")}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeCapsule"
                                    className="absolute inset-0 rounded-full bg-white mix-blend-overlay opacity-20"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {m}m
                        </button>
                    );
                })}
            </div>

            {/* Custom Slider */}
            <div className="relative h-12 flex items-center justify-center group pointer-events-none">
                {/* Track Background */}
                <div className="absolute left-0 right-0 h-2 bg-white/10 rounded-full overflow-hidden">
                    {/* Progress Fill */}
                    <div
                        className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 relative"
                        style={{ width: `${percent}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full bg-white/50 blur-[6px]" />
                    </div>
                </div>

                {/* The actual input - invisible but interactive */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={5}
                    value={minutes}
                    onChange={(e) => setMinutes(Number(e.target.value))}
                    className="pointer-events-auto absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                />

                {/* Custom Thumb (Visual Only) */}
                <div
                    className="absolute h-6 w-6 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] flex items-center justify-center pointer-events-none transition-transform duration-100 ease-out group-active:scale-125"
                    style={{
                        left: `calc(${percent}% - 12px)` // 12px is half thumb width
                    }}
                >
                    <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full" />
                </div>
            </div>

            <div className="flex justify-between text-xs text-white/30 mt-1 font-medium px-1">
                <span>10m</span>
                <span>120m</span>
            </div>
        </div>
    );
}
