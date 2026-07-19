"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Star, X } from "lucide-react";
import { REVIEWS } from "@/lib/reviews";

const FIRST_DELAY = 3500;
const SHOW_DURATION = 7000;
const GAP_BETWEEN = 12000;
const MAX_SHOWN = 3;

/**
 * Pop-up discret sur la page réservation : un avis client apparaît
 * délicatement en bas d'écran, puis laisse place au suivant.
 * Décoratif (aria-hidden), rejetable, désactivé en reduced-motion.
 */
export function ReviewToast() {
  const [index, setIndex] = useState<number | null>(null);
  const dismissed = useRef(false);
  const shown = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (REVIEWS.length === 0) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    const showNext = (i: number) => {
      if (dismissed.current || shown.current >= MAX_SHOWN) return;
      shown.current += 1;
      setIndex(i % REVIEWS.length);
      timers.push(
        setTimeout(() => {
          setIndex(null);
          timers.push(setTimeout(() => showNext(i + 1), GAP_BETWEEN));
        }, SHOW_DURATION)
      );
    };

    timers.push(setTimeout(() => showNext(0), FIRST_DELAY));
    return () => timers.forEach(clearTimeout);
  }, []);

  const review = index !== null ? REVIEWS[index] : null;

  return (
    <div
      className="pointer-events-none fixed bottom-20 left-4 right-4 z-[75] md:bottom-8 md:left-8 md:right-auto md:w-96"
      aria-hidden="true"
    >
      <AnimatePresence>
        {review && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto border border-brass/30 bg-marine-400/95 p-5 shadow-[0_16px_48px_rgba(7,12,21,0.45)] backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => {
                dismissed.current = true;
                setIndex(null);
              }}
              aria-label="Fermer l'avis"
              className="absolute right-3 top-3 text-sable/50 transition-colors hover:text-sable"
            >
              <X size={15} />
            </button>
            <div className="flex gap-1">
              {Array.from({ length: review.rating }, (_, i) => (
                <Star key={i} size={12} className="fill-brass text-brass" />
              ))}
            </div>
            <p className="mt-3 font-serif text-sm italic leading-relaxed text-sable/90">
              « {review.text} »
            </p>
            <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sable/55">
              {review.name} <span className="text-brass">· {review.occasion}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
