"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface LogEntry {
  time: string;
  label: string;
}

/**
 * L'horloge de bord : un indicateur flottant qui affiche l'heure du chapitre
 * traversé pendant le scroll des pages "déroulé heure par heure".
 * mix-blend-difference le rend lisible sur fonds clairs comme sombres.
 */
export function TimeIndicator() {
  const [entry, setEntry] = useState<LogEntry | null>(null);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-log-time]")
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            setEntry({
              time: el.dataset.logTime ?? "",
              label: el.dataset.logLabel ?? "",
            });
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    const lastSection = sections[sections.length - 1];
    const clearOutsideLog = () => {
      if (window.scrollY < window.innerHeight * 0.5) {
        setEntry(null);
        return;
      }
      if (lastSection.getBoundingClientRect().bottom < window.innerHeight * 0.35) {
        setEntry(null);
      }
    };
    window.addEventListener("scroll", clearOutsideLog, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", clearOutsideLog);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed right-6 top-1/2 z-[70] hidden -translate-y-1/2 text-right mix-blend-difference md:block lg:right-10"
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        {entry && (
          <motion.div
            key={entry.time}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-serif text-4xl italic tabular-nums text-sable lg:text-5xl">
              {entry.time}
            </p>
            <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-sable/70">
              {entry.label}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
