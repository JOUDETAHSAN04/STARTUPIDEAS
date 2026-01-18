"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface NotesCardProps {
    notes: string;
    show: boolean;
    onClose: () => void;
}

export default function NotesCard({ notes, show, onClose }: NotesCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!show) return;

        function handleClickOutside(event: MouseEvent) {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                onClose();
            }
        }

        // Add a small delay to prevent immediate closing when opening
        const timeoutId = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [show, onClose]);

    if (!show) return null;

    return (
        <motion.div
            ref={cardRef}
            layoutId="notes-card"
            initial={{ opacity: 0, scale: 0.9, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-20 left-4 sm:top-6 sm:left-20 z-[110] w-[90vw] sm:w-80 max-h-[50vh] overflow-auto rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl"
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
