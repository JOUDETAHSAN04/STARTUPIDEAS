"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const baseQuotes = [
  "Start small. Stay consistent.",
  "One focused hour beats ten distracted.",
  "Quiet effort. Loud results.",
  "Breathe. Reset. Continue.",
  "Do the next right thing.",
  "Win the minute. The hour follows.",
];

function formatTime(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function pickQuote(motivation: string) {
  const why = motivation.trim();
  const base = baseQuotes[Math.floor(Math.random() * baseQuotes.length)];

  if (!why) return base;

  const variants = [
    base,
    `Stay with it. ${why}`,
    `You chose this. ${why}`,
    `Keep going — ${why}`,
  ];

  return variants[Math.floor(Math.random() * variants.length)];
}

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

  const remainingMs = useMemo(() => Math.max(0, endAtRef.current - now), [now]);

  const progress = useMemo(() => {
    const doneMs = totalMs - remainingMs;
    return totalMs === 0 ? 0 : Math.min(1, Math.max(0, doneMs / totalMs));
  }, [totalMs, remainingMs]);

  const [quote, setQuote] = useState(() => pickQuote(motivation));
  const [fade, setFade] = useState(false);

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
    <main className="aurora-root h-screen w-screen">
      <div className="aurora-layer" aria-hidden="true" />
      <div className="aurora-layer two" aria-hidden="true" />

      <div className="relative z-[2] grid h-full grid-cols-2">
        {/* LEFT: TIMER centered */}
        <div className="relative flex h-full items-center justify-center">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />

          <div className="relative flex w-full max-w-xl flex-col items-center px-10 text-center">
            <div className="text-sm text-white/65">{activity}</div>

            <div className="mt-5 text-[128px] font-semibold leading-none tabular-nums tracking-tight text-white/95 drop-shadow-[0_14px_40px_rgba(0,0,0,0.55)]">
              {formatTime(remainingMs)}
            </div>

            <div className="mt-10 h-3 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-white/90 shadow-[0_0_18px_rgba(167,139,250,0.35)] transition-[width] duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <div className="mt-5 text-sm text-white/65">
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

        {/* RIGHT: QUOTE */}
        <div className="relative flex h-full items-center justify-center px-14">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/30 via-black/10 to-transparent" />

          <div
            className={[
              "relative max-w-2xl text-left text-[52px] font-medium leading-snug text-white/95 drop-shadow-[0_12px_44px_rgba(0,0,0,0.62)] transition-all duration-300",
              fade ? "opacity-0 blur-[1px] translate-y-1" : "opacity-100",
            ].join(" ")}
          >
            {quote}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-white/5" />
      </div>
    </main>
  );
}