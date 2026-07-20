"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Star, X } from "lucide-react";
import { Monogram } from "@/components/monogram";
import { REVIEWS, type Review } from "@/lib/reviews";

const APPEAR_DELAY = 1300;
const SHOW_DURATION = 9000;
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Avis contextuel du parcours de réservation, façon « mot qui remonte à la
 * surface » : une note manuscrite sur papier crème, scellée d'un cachet de
 * cire au monogramme, qui émerge en flottant doucement. Deux moments :
 * après le choix de l'expérience (l'avis correspond au choix) et à l'étape
 * des coordonnées. Un seul passage par moment, jamais deux fois le même,
 * rejetable, silencieux pour les lecteurs d'écran et en reduced-motion.
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
      className="pointer-events-none fixed bottom-6 left-4 right-4 z-[75] flex justify-center sm:left-6 sm:right-auto sm:block sm:w-[360px] md:bottom-8 md:left-8"
      aria-hidden="true"
    >
      <AnimatePresence>
        {current && (
          <motion.div
            // Le ballon soulève le mot depuis le fond, puis le tient suspendu :
            // l'ensemble monte au buste, respire (houle lente verticale), et le
            // mot se balance sous le fil comme un pendule.
            initial={{ opacity: 0, y: 150, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: [0, -7, 0], filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -180, filter: "blur(6px)" }}
            transition={{
              opacity: { duration: 0.9, ease: EASE },
              filter: { duration: 0.9, ease: EASE },
              y: { duration: 6.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
            }}
            className="pointer-events-auto flex w-full max-w-[340px] flex-col items-center"
          >
            {/* Le ballon qui tire le mot vers le haut */}
            <motion.div
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              aria-hidden="true"
            >
              <svg width="46" height="60" viewBox="0 0 46 60" fill="none">
                <defs>
                  <radialGradient id="hy-balloon" cx="38%" cy="32%" r="70%">
                    <stop offset="0%" stopColor="#EFDFC4" />
                    <stop offset="45%" stopColor="#DCC091" />
                    <stop offset="100%" stopColor="#B3562F" />
                  </radialGradient>
                </defs>
                <path
                  d="M23 3 C33 3 40 11 40 22 C40 33 31 41 24 45 L22 45 C15 41 6 33 6 22 C6 11 13 3 23 3 Z"
                  fill="url(#hy-balloon)"
                  stroke="#96723F"
                  strokeWidth="0.6"
                />
                <ellipse cx="17" cy="16" rx="4.5" ry="6" fill="#F7F3EA" opacity="0.5" />
                <path d="M21 45 L23 49 L25 45 Z" fill="#8A4023" />
                <path d="M23 49 C21.5 52 24.5 55 23 60" stroke="#96723F" strokeWidth="0.8" fill="none" />
              </svg>
            </motion.div>

            {/* Le fil, du ballon au cachet */}
            <div className="h-4 w-px bg-gradient-to-b from-brass-300/70 to-brass" aria-hidden="true" />

            {/* Le mot, suspendu au fil — se balance comme un pendule */}
            <motion.div
              className="relative w-full origin-top"
              animate={{ rotate: [-1.8, 1.8, -1.8] }}
              transition={{ duration: 7.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
            >
              {/* Cachet de cire — le sceau qui noue le fil au mot */}
              <div className="absolute -top-5 left-1/2 z-10 -translate-x-1/2">
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta-300 shadow-[0_4px_12px_rgba(138,64,35,0.4)] ring-1 ring-terracotta-100/40"
                >
                  <Monogram className="h-6 w-6 text-sable/90" />
                </motion.div>
              </div>

              {/* Le papier du mot */}
              <div className="relative overflow-hidden border border-brass/25 bg-sable-50 px-6 pb-6 pt-8 shadow-[0_24px_60px_rgba(7,12,21,0.28)]">
              <button
                type="button"
                onClick={() => {
                  dismissed.current = true;
                  setCurrent(null);
                }}
                aria-label="Fermer le mot"
                className="absolute right-3 top-3 p-1 text-marine/30 transition-colors hover:text-marine/70"
              >
                <X size={14} />
              </button>

              <p className="text-center font-script text-2xl leading-none text-brass-400">
                Un mot de nos invités
              </p>

              <div className="mt-3 flex justify-center gap-1">
                {Array.from({ length: current.rating }, (_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.55 + i * 0.07, duration: 0.35, ease: EASE }}
                  >
                    <Star size={11} className="fill-brass text-brass" />
                  </motion.span>
                ))}
              </div>

              <p className="mt-4 text-center font-serif text-[0.95rem] italic leading-relaxed text-marine/90">
                « {current.text} »
              </p>

              <div className="mx-auto mt-5 h-px w-10 bg-brass/40" aria-hidden="true" />

              <p className="mt-4 text-center text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-marine/50">
                {current.name}
                <span className="ml-2 text-terracotta-200">· {current.occasion}</span>
              </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
