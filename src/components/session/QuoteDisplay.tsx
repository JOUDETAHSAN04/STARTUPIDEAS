interface QuoteDisplayProps {
    quote: string;
    fade: boolean;
}

export default function QuoteDisplay({ quote, fade }: QuoteDisplayProps) {
    return (
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
    );
}
