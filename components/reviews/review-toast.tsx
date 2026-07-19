"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Star, X } from "lucide-react";
import { Monogram } from "@/components/monogram";
import { REVIEWS, type Review } from "@/lib/reviews";

const APPEAR_DELAY = 1300;
const SHOW_DURATION = 8500;
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Avis contextuel du parcours de réservation. Deux moments choisis :
 * juste après le choix de l'expérience (l'avis affiché correspond au choix
 * du visiteur) et à l'étape des coordonnées (l'instant de l'engagement).
 * Un seul passage par moment, jamais deux fois le même avis, rejetable,
 * silencieux pour les lecteurs d'écran et en reduced-motion.
 */
export function ReviewToast({
  step,
  experience,
  active,
}: {
  step: number;
  experience: "jour" | "nuit" | null;
  active: boolean;
}) {
  const [current, setCurrent] = useState<Review | null>(null);
  const dismissed = useRef(false);
  const shownSteps = useRef<Set<number>>(new Set());
  const usedReviews = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!active || dismissed.current) {
      setCurrent(null);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (step !== 1 && step !== 3) {
      setCurrent(null);
      return;
    }
    if (shownSteps.current.has(step)) return;

    const matching = REVIEWS.filter((r) => !usedReviews.current.has(r.name)).find(
      (r) => {
        const isNuit = r.occasion.toLowerCase().includes("nuit");
        return experience === "nuit" ? isNuit : !isNuit;
      }
    );
    if (!matching) return;

    shownSteps.current.add(step);
    const show = setTimeout(() => {
      usedReviews.current.add(matching.name);
      setCurrent(matching);
    }, APPEAR_DELAY);
    const hide = setTimeout(() => setCurrent(null), APPEAR_DELAY + SHOW_DURATION);

    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [step, experience, active]);

  return (
    <div
      className="pointer-events-none fixed bottom-4 left-4 right-4 z-[75] sm:right-auto sm:w-[380px] md:bottom-8 md:left-8"
      aria-hidden="true"
    >
      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="pointer-events-auto relative overflow-hidden bg-marine-400/90 shadow-[0_20px_60px_rgba(7,12,21,0.5)] backdrop-blur-md"
          >
            {/* Filet doré supérieur */}
            <div
              className="h-px w-full bg-gradient-to-r from-brass via-brass/40 to-transparent"
              aria-hidden="true"
            />

            <div className="p-6">
              <button
                type="button"
                onClick={() => {
                  dismissed.current = true;
                  setCurrent(null);
                }}
                aria-label="Fermer l'avis"
                className="absolute right-3 top-4 p-1 text-sable/40 transition-colors hover:text-sable"
              >
                <X size={14} />
              </button>

              <div className="flex items-center justify-between pr-6">
                <div className="flex gap-1">
                  {Array.from({ length: current.rating }, (_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 + i * 0.07, duration: 0.35, ease: EASE }}
                    >
                      <Star size={12} className="fill-brass text-brass" />
                    </motion.span>
                  ))}
                </div>
                <Monogram className="h-6 w-6 text-brass/50" />
              </div>

              <p className="mt-4 font-serif text-[0.95rem] italic leading-relaxed text-sable/95">
                « {current.text} »
              </p>
              <p className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-sable/50">
                {current.name}
                <span className="ml-2 text-brass/80">· {current.occasion}</span>
              </p>
            </div>

            {/* Filet de temps restant */}
            <motion.div
              className="h-px origin-left bg-brass/35"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: SHOW_DURATION / 1000, ease: "linear" }}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
