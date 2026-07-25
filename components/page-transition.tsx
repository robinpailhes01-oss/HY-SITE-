"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Monogram } from "@/components/monogram";

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Le voile qui se lève entre deux pages.
 *
 * Variable au niveau du module, donc remise à zéro à chaque chargement complet
 * mais conservée d'une navigation client à l'autre : au tout premier écran, le
 * préchargeur fait déjà ce geste, on ne le rejoue pas par-dessus. Ensuite,
 * chaque changement de page hérite du même mouvement — le site se lit comme un
 * seul objet plutôt que comme sept pages qui se remplacent.
 */
let hasNavigated = false;

export function PageTransition() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hasNavigated = true;
      return;
    }
    if (!hasNavigated) {
      hasNavigated = true; // premier écran : le préchargeur s'en charge
      return;
    }
    setPlay(true);
  }, []);

  if (!play) return null;

  return (
    <motion.div
      // Décoratif : ne bloque jamais le clic, même pendant qu'il couvre.
      className="pointer-events-none fixed inset-0 z-[105] flex items-center justify-center bg-marine-400"
      initial={{ y: 0 }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.85, ease: EASE }}
      aria-hidden="true"
    >
      <motion.div
        // Le monogramme tient le temps d'être vu, puis s'efface avec le voile
        // au lieu de disparaître dès la première image.
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: [1, 1, 0], scale: [1, 1, 0.92] }}
        transition={{ duration: 0.6, times: [0, 0.55, 1], ease: "easeOut" }}
      >
        <Monogram className="h-12 w-12 text-brass" />
      </motion.div>
    </motion.div>
  );
}
