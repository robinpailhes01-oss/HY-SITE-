"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Anchor } from "lucide-react";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select";

/**
 * Le curseur du site : une petite ancre plutôt qu'un cercle abstrait — plus
 * proche du monde du bateau, cohérente avec l'iconographie déjà utilisée
 * ailleurs sur le site (tarifs, INCLUS). mix-blend-difference garde l'icône
 * lisible sur fond clair comme sur fond sombre.
 */
export function SiteCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 400, damping: 40, mass: 0.4 });

  useEffect(() => {
    const canHover = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      setHovering(Boolean(target.closest(INTERACTIVE_SELECTOR)));
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        // Un trait fin à faible opacité disparaît en mix-blend-difference sur
        // une photo aux tons moyens (la mer, surtout) : l'opacité reste pleine
        // et le trait plus épais pour que l'ancre reste lisible partout.
        className="-translate-x-1/2 -translate-y-1/2 text-sable"
        animate={{
          scale: hovering ? 1.4 : 1,
          rotate: hovering ? -12 : 0,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <Anchor size={20} strokeWidth={2.25} />
      </motion.div>
    </motion.div>
  );
}
