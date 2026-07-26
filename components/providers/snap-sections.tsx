"use client";

import { useEffect } from "react";

const SETTLE_DELAY = 160; // repos avant d'aimanter
const PROXIMITY = 0.22; // n'aimante que si la section est déjà très proche (22% de l'écran)
const MIN_OFFSET = 8; // en dessous, on considère la section déjà alignée

/**
 * Aimantation douce des sections marquées [data-snap] : quand le scroll
 * s'arrête, la section la plus proche s'aligne sur le haut de l'écran.
 * Volontairement en « proximity » et non « mandatory » — on ne piège jamais
 * le visiteur au milieu d'un long chapitre, et le scroll libre reste
 * possible. Neutralisé pendant un pin GSAP (scroll horizontal), en
 * reduced-motion, et si Lenis n'est pas actif.
 */
export function SnapSections() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // `data-snap-mobile` sert aux blocs qui ne sont plein écran qu'en portrait :
    // sur desktop ils repassent en piste horizontale et ne doivent pas aimanter.
    const mobile = !window.matchMedia("(min-width: 768px)").matches;
    const selector = mobile ? "[data-snap], [data-snap-mobile]" : "[data-snap]";
    const sections = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (sections.length === 0) return;

    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    let snapping = false;

    const headerOffset = () =>
      window.matchMedia("(min-width: 1024px)").matches ? 80 : 72;

    const snapToNearest = () => {
      if (snapping) return;
      // Un pin GSAP actif (scroll horizontal des expériences) fige la page :
      // aimanter à ce moment ferait sauter la lecture.
      if (document.querySelector(".pin-spacer [data-snap-lock]")) return;

      const viewport = window.innerHeight;
      const offset = headerOffset();

      let closest: HTMLElement | null = null;
      let closestDistance = Infinity;

      sections.forEach((section) => {
        const distance = Math.abs(section.getBoundingClientRect().top - offset);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = section;
        }
      });

      if (!closest) return;
      if (closestDistance < MIN_OFFSET) return;
      if (closestDistance > viewport * PROXIMITY) return;

      const lenis = window.__hyLenis;
      if (!lenis) return;

      snapping = true;
      lenis.scrollTo(closest, {
        offset: -offset,
        duration: 0.6,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        onComplete: () => {
          snapping = false;
        },
      });
      // Filet de sécurité si onComplete ne se déclenche pas.
      setTimeout(() => {
        snapping = false;
      }, 900);
    };

    const onScroll = () => {
      if (snapping) return;
      clearTimeout(settleTimer);
      settleTimer = setTimeout(snapToNearest, SETTLE_DELAY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
