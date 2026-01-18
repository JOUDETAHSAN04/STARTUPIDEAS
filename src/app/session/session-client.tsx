"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import AuroraBackground from "@/components/ui/AuroraBackground";
import TimerDisplay from "@/components/session/TimerDisplay";
import QuoteDisplay from "@/components/session/QuoteDisplay";
import { pickQuote } from "@/lib/utils";

export default function SessionClient() {
  const searchParams = useSearchParams();

  const activity = searchParams.get("activity") ?? "Focus";
  const minutesParam = Number(searchParams.get("minutes") ?? 50);
  const minutes = Number.isFinite(minutesParam)
    ? Math.min(120, Math.max(10, minutesParam))
    : 50;

  const motivation = searchParams.get("motivation") ?? "";

  const totalMs = minutes * 60_000;
  const endAtRef = useRef<number>(Date.now() + totalMs);
  const [now, setNow] = useState(Date.now());
  const [done, setDone] = useState(false);

  // We set initial state for quote here, but it will be reset in useEffect to avoid hydration mismatch
  // However, to keep it simple, we can just use a static initial quote or handle it via effect entirely.
  // "pickQuote" uses random so it causes hydration issues if run during render.
  // Better to start empty or fixed, then randomize on mount.
  const [quote, setQuote] = useState("");
  const [fade, setFade] = useState(false);

  const remainingMs = useMemo(() => Math.max(0, endAtRef.current - now), [now]);

  function changeQuote() {
    const next = pickQuote(motivation);
    setFade(true);
    setTimeout(() => {
      setQuote(next);
      setFade(false);
    }, 350);
  }

  useEffect(() => {
    const startNow = Date.now();
    endAtRef.current = startNow + totalMs;
    setNow(startNow);
    setDone(false);
    // Initial quote set on client side to avoid hydration mismatch
    setQuote(pickQuote(motivation));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (done) return;

    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (endAtRef.current - t <= 0) setDone(true);
    }, 200);

    return () => clearInterval(id);
  }, [done]);

  useEffect(() => {
    if (done) return;
    const id = setInterval(changeQuote, 25_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done, motivation]);

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