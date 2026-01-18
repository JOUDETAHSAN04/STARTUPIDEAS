"use client";

import { motion } from "framer-motion";

interface NotesCardProps {
    notes: string;
    show: boolean;
}

export default function NotesCard({ notes, show }: NotesCardProps) {
    if (!show) return null;

    return (
        <motion.div
            layoutId="notes-card"
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-6 left-20 z-50 w-80 overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl"
        >
            <div className="p-5">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/50">
                    Session Notes
                </h3>
                <div className="whitespace-pre-wrap text-sm leading-relaxed text-white/90">
                    {notes || <span className="italic text-white/30">No notes for this session.</span>}
                </div>
            </div>
        </motion.div>
    );
}
