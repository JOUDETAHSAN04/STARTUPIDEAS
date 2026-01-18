"use client";

import { Maximize2, Minimize2, StickyNote } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SessionControlsProps {
    showNotes: boolean;
    setShowNotes: (v: boolean) => void;
    isFullscreen: boolean;
    toggleFullscreen: () => void;
}

export default function SessionControls({
    showNotes,
    setShowNotes,
    isFullscreen,
    toggleFullscreen,
}: SessionControlsProps) {
    return (
        <div className="absolute top-6 left-6 z-[100] flex flex-col gap-3">
            <TooltipProvider>
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
            </TooltipProvider>
        </div>
    );
}
