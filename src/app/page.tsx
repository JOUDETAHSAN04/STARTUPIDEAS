"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Activity =
  | "Study"
  | "Work"
  | "Workout"
  | "Reading"
  | "Planning"
  | "Creative"
  | "Meditation"
  | "Chores"
  | "Custom";

const ACTIVITIES: { key: Activity; desc: string; glow: string }[] = [
  {
    key: "Study",
    desc: "Deep attention. One topic. No multitask.",
    glow:
      "radial-gradient(circle at 30% 30%, rgba(56,189,248,0.35), transparent 55%), radial-gradient(circle at 70% 60%, rgba(167,139,250,0.35), transparent 58%)",
  },
  {
    key: "Work",
    desc: "Deliver something real. Small wins count.",
    glow:
      "radial-gradient(circle at 30% 30%, rgba(34,197,94,0.28), transparent 55%), radial-gradient(circle at 70% 60%, rgba(56,189,248,0.28), transparent 58%)",
  },
  {
    key: "Workout",
    desc: "Move. Sweat. Reset your brain.",
    glow:
      "radial-gradient(circle at 30% 30%, rgba(244,63,94,0.22), transparent 55%), radial-gradient(circle at 70% 60%, rgba(245,158,11,0.18), transparent 58%)",
  },
  {
    key: "Reading",
    desc: "Calm focus. One page at a time.",
    glow:
      "radial-gradient(circle at 30% 30%, rgba(167,139,250,0.26), transparent 55%), radial-gradient(circle at 70% 60%, rgba(56,189,248,0.20), transparent 58%)",
  },
  {
    key: "Planning",
    desc: "Organize tasks. Clear the next move.",
    glow:
      "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.26), transparent 55%), radial-gradient(circle at 70% 60%, rgba(34,197,94,0.20), transparent 58%)",
  },
  {
    key: "Creative",
    desc: "Design, write, build — stay in flow.",
    glow:
      "radial-gradient(circle at 30% 30%, rgba(167,139,250,0.30), transparent 55%), radial-gradient(circle at 70% 60%, rgba(244,63,94,0.18), transparent 58%)",
  },
  {
    key: "Meditation",
    desc: "Slow down. Reset. Clear the noise.",
    glow:
      "radial-gradient(circle at 30% 30%, rgba(34,197,94,0.22), transparent 55%), radial-gradient(circle at 70% 60%, rgba(167,139,250,0.22), transparent 58%)",
  },
  {
    key: "Chores",
    desc: "Clean actions. Clean mind. Small progress.",
    glow:
      "radial-gradient(circle at 30% 30%, rgba(245,158,11,0.18), transparent 55%), radial-gradient(circle at 70% 60%, rgba(56,189,248,0.18), transparent 58%)",
  },
  {
    key: "Custom",
    desc: "Name it yourself. Anything you want.",
    glow:
      "radial-gradient(circle at 30% 30%, rgba(56,189,248,0.25), transparent 55%), radial-gradient(circle at 70% 60%, rgba(34,197,94,0.18), transparent 58%)",
  },
];

export default function Home() {
  const router = useRouter();

  const [activity, setActivity] = useState<Activity>("Study");
  const [customActivity, setCustomActivity] = useState("");
  const [minutes, setMinutes] = useState<number>(50);
  const [motivation, setMotivation] = useState("");

  const effectiveActivity = useMemo(() => {
    if (activity !== "Custom") return activity;
    return customActivity.trim() || "Custom";
  }, [activity, customActivity]);

  const isStartDisabled = activity === "Custom" && customActivity.trim().length === 0;

  async function handleStart() {
    const params = new URLSearchParams();
    params.set("activity", effectiveActivity);
    params.set("minutes", String(minutes));
    if (motivation.trim()) params.set("motivation", motivation.trim());

    try {
      await document.documentElement.requestFullscreen();
    } catch {}

    router.push(`/session?${params.toString()}`);
  }

  function tileClasses(selected: boolean) {
    return [
      "group relative w-full overflow-hidden rounded-3xl border p-6 text-left transition",
      "backdrop-blur-xl",
      "flex flex-col justify-start", // ✅ consistent top alignment
      "min-h-[150px]", // ✅ consistent height so text doesn't float around
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
    <main className="min-h-screen text-zinc-100 bg-[radial-gradient(80%_120%_at_20%_10%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(70%_110%_at_80%_20%,rgba(167,139,250,0.22),transparent_55%),radial-gradient(90%_140%_at_50%_90%,rgba(34,197,94,0.12),transparent_60%),linear-gradient(135deg,#050B1E_0%,#07061A_55%,#030712_100%)]">
      <div className="mx-auto max-w-6xl px-8 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight">Set your focus</h1>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Pick what you’re doing, choose how long, add a “why” if you want — then we go full-screen.
          </p>
        </header>

        {/* 50/50 columns */}
        <div className="grid items-stretch gap-8 lg:grid-cols-12">
          {/* LEFT */}
          <section className="lg:col-span-6">
            <div className="mb-4 flex items-end justify-between">
              <h2 className="text-sm font-medium text-white/80">Activity</h2>
              <div className="text-xs text-white/55">
                Selected: <span className="text-white/85">{effectiveActivity}</span>
              </div>
            </div>

            {/* 2 cols small, 3 cols large */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ACTIVITIES.map((a) => {
                const selected = a.key === activity;
                return (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() => setActivity(a.key)}
                    className={tileClasses(selected)}
                  >
                    <div className={glowClasses(selected)} style={{ background: a.glow }} />

                    {/* ✅ consistent content layout */}
                    <div className="relative flex h-full flex-col justify-start">
                      <div className="text-2xl font-semibold leading-tight">{a.key}</div>
                      <div className="mt-2 text-sm leading-snug text-white/70">{a.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* RIGHT */}
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
                onClick={handleStart}
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
        </div>
      </div>
    </main>
  );
}
