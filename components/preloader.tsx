"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Monogram } from "@/components/monogram";

const EASE = [0.76, 0, 0.24, 1] as const;

export function Preloader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = sessionStorage.getItem("hy-preloader");
    if (reduceMotion || alreadySeen) return;

    sessionStorage.setItem("hy-preloader", "1");
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-marine-400 text-sable"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Monogram className="h-16 w-16 text-brass" />
          </motion.div>
          <motion.p
            className="mt-6 font-serif text-lg uppercase tracking-[0.3em]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Harmonie <span className="text-brass">Yacht</span>
          </motion.p>
          <motion.p
            className="mt-2 font-script text-2xl text-brass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Créateurs de moments authentiques
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
