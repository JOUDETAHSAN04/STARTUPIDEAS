"use client";

import { useState } from "react";
import { Maximize2, Minimize2, StickyNote, Home, RotateCcw, Play, Pause, Menu, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";

interface SessionControlsProps {
    showNotes: boolean;
    setShowNotes: (v: boolean) => void;
    isFullscreen: boolean;
    toggleFullscreen: () => void;
    isPaused: boolean;
    onPauseResume: () => void;
    onReset: () => void;
    onGoHome: () => void;
}

export default function SessionControls({
    showNotes,
    setShowNotes,
    isFullscreen,
    toggleFullscreen,
    isPaused,
    onPauseResume,
    onReset,
    onGoHome,
}: SessionControlsProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="absolute top-6 left-6 z-[100] flex flex-col gap-3">
            <TooltipProvider>
                {/* Menu Toggle Button */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            type="button"
                            onClick={() => setIsExpanded(!isExpanded)}
                            className={`group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 backdrop-blur-md transition-all ${isExpanded ? "bg-white/20 text-white" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {isExpanded ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>{isExpanded ? "Close Menu" : "Open Menu"}</p>
                    </TooltipContent>
                </Tooltip>

                {/* Expandable Controls */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col gap-3"
                        >
                            {/* Notes Toggle */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        onClick={() => setShowNotes(!showNotes)}
                                        className={`group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 backdrop-blur-md transition-all ${showNotes ? "bg-white/20 text-white" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                                            }`}
                                    >
                                        <StickyNote size={18} strokeWidth={1.5} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>{showNotes ? "Hide Notes" : "Show Notes"}</p>
                                </TooltipContent>
                            </Tooltip>

                            {/* Pause/Resume Toggle */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        onClick={onPauseResume}
                                        className={`group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 backdrop-blur-md transition-all ${isPaused ? "bg-amber-500/20 border-amber-500/30 text-amber-200" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                                            }`}
                                    >
                                        {isPaused ? <Play size={18} strokeWidth={1.5} /> : <Pause size={18} strokeWidth={1.5} />}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>{isPaused ? "Resume Timer" : "Pause Timer"}</p>
                                </TooltipContent>
                            </Tooltip>

                            {/* Reset Button */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        onClick={onReset}
                                        className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
                                    >
                                        <RotateCcw size={18} strokeWidth={1.5} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Reset Timer</p>
                                </TooltipContent>
                            </Tooltip>

                            {/* Home Button */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        onClick={onGoHome}
                                        className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
                                    >
                                        <Home size={18} strokeWidth={1.5} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>Go to Home</p>
                                </TooltipContent>
                            </Tooltip>

                            {/* Fullscreen Toggle */}
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        onClick={toggleFullscreen}
                                        className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white"
                                    >
                                        {isFullscreen ? (
                                            <Minimize2 size={18} strokeWidth={1.5} />
                                        ) : (
                                            <Maximize2 size={18} strokeWidth={1.5} />
                                        )}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>{isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}</p>
                                </TooltipContent>
                            </Tooltip>
                        </motion.div>
                    )}
                </AnimatePresence>
            </TooltipProvider>
        </div>
    );
}
