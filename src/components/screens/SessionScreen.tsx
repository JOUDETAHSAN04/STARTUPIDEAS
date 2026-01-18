"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuroraBackground from "@/components/ui/AuroraBackground";
import TimerDisplay from "@/components/session/TimerDisplay";
import QuoteDisplay from "@/components/session/QuoteDisplay";
import SessionControls from "@/components/session/SessionControls";
import NotesCard from "@/components/session/NotesCard";
import { pickQuote } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";

export default function SessionScreen() {
    const searchParams = useSearchParams();

    const activity = searchParams.get("activity") ?? "Focus";
    const minutesParam = Number(searchParams.get("minutes") ?? 50);
    const minutes = Number.isFinite(minutesParam)
        ? Math.min(120, Math.max(10, minutesParam))
        : 50;

    const notes = searchParams.get("notes") ?? "";

    const totalMs = minutes * 60_000;
    const [isMounted, setIsMounted] = useState(false);
    const endAtRef = useRef<number>(0);
    const [now, setNow] = useState<number>(0);
    const [done, setDone] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const pausedTimeRef = useRef<number>(0);

    // Notes & Fullscreen Toggle State
    const [showNotes, setShowNotes] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Quote State
    // We'll treat notes as a source of "motivation" if simple enough, or just ignore for quotes
    // For now, we stick to generic quotes unless user provided motivation before. Since we replaced it with Notes,
    // we can use "Focus" as motivation seed or just pure random.
    const [quote, setQuote] = useState("");
    const [fade, setFade] = useState(false);

    const remainingMs = useMemo(() => {
        if (!isMounted) return totalMs;
        return Math.max(0, endAtRef.current - now);
    }, [isMounted, now, totalMs]);

    function changeQuote() {
        // Pass empty string for motivation since we switched to Notes
        const next = pickQuote("");
        setFade(true);
        setTimeout(() => {
            setQuote(next);
            setFade(false);
        }, 350);
    }

    // Handle Fullscreen Events
    useEffect(() => {
        function handleFsChange() {
            setIsFullscreen(!!document.fullscreenElement);
        }
        document.addEventListener("fullscreenchange", handleFsChange);
        // Initialize check
        handleFsChange();
        return () => document.removeEventListener("fullscreenchange", handleFsChange);
    }, []);

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement?.requestFullscreen().catch((e) => {
                console.error("Failed to enter fullscreen:", e);
            });
        } else {
            document.exitFullscreen().catch((e) => {
                console.error("Failed to exit fullscreen:", e);
            });
        }
    }

    function handlePauseResume() {
        if (isPaused) {
            // Resume: add the paused duration to the end time
            const pausedDuration = Date.now() - pausedTimeRef.current;
            endAtRef.current += pausedDuration;
            setIsPaused(false);
        } else {
            // Pause: record the current time
            pausedTimeRef.current = Date.now();
            setIsPaused(true);
        }
    }

    function handleReset() {
        const startNow = Date.now();
        endAtRef.current = startNow + totalMs;
        setNow(startNow);
        setDone(false);
        setIsPaused(false);
        pausedTimeRef.current = 0;
    }

    function handleGoHome() {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => { });
        }
        window.location.href = "/";
    }


    useEffect(() => {
        const startNow = Date.now();
        endAtRef.current = startNow + totalMs;
        setNow(startNow);
        setDone(false);
        setQuote(pickQuote(""));
        setIsMounted(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (done || isPaused) return;
        const id = setInterval(() => {
            const t = Date.now();
            setNow(t);
            if (endAtRef.current - t <= 0) setDone(true);
        }, 200);
        return () => clearInterval(id);
    }, [done, isPaused]);

    useEffect(() => {
        if (done) return;
        const id = setInterval(changeQuote, 25_000);
        return () => clearInterval(id);
    }, [done]);

    useEffect(() => {
        if (!done) return;
        setFade(true);
        setTimeout(() => {
            setQuote("Session complete. Take a breath.");
            setFade(false);
        }, 350);
    }, [done]);

    return (
        <AuroraBackground>
            {/* CONTROLS */}
            <SessionControls
                showNotes={showNotes}
                setShowNotes={setShowNotes}
                isFullscreen={isFullscreen}
                toggleFullscreen={toggleFullscreen}
                isPaused={isPaused}
                onPauseResume={handlePauseResume}
                onReset={handleReset}
                onGoHome={handleGoHome}
            />

            {/* NOTES CARD */}
            <AnimatePresence>
                {showNotes && <NotesCard notes={notes} show={showNotes} />}
            </AnimatePresence>

            <div className="relative z-[2] grid h-full grid-cols-2">
                {/* LEFT: TIMER centered */}
                <TimerDisplay
                    activity={activity}
                    remainingMs={remainingMs}
                    totalMs={totalMs}
                    done={done}
                />

                {/* RIGHT: QUOTE */}
                <QuoteDisplay
                    quote={quote}
                    fade={fade}
                />

                <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/5" />
            </div>
        </AuroraBackground>
    );
}
