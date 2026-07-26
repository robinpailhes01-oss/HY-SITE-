"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Wraps the homepage chapters and morphs the shared background colour as the
 * visitor scrolls from daylight (sand) to night at anchor (deep marine).
 * Chapters declare their colour via data-voyage-bg; sections stay transparent.
 *
 * Le fondu se fait par calques en opacité, jamais par un tween de
 * background-color : cette propriété force un repaint à chaque frame de
 * scroll (coûteux, non composité par le GPU) et cassait la fluidité. Un
 * calque plein écran par teinte suivante, en z-index négatif, se superpose
 * en fondu — seule l'opacité bouge, à 60fps.
 */
export function VoyageScroller({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const chapters = Array.from(
      wrapper.querySelectorAll<HTMLElement>("[data-voyage-bg]")
    );
    if (chapters.length === 0) return;

    // Une teinte par couleur distincte, pas par chapitre : plusieurs
    // chapitres peuvent partager le jour avant de céder la place à la nuit.
    const bands = chapters.filter(
      (chapter, i) => i === 0 || chapter.dataset.voyageBg !== chapters[i - 1].dataset.voyageBg
    );

    wrapper.style.backgroundColor = bands[0].dataset.voyageBg ?? "#F7F3EA";

    if (bands.length < 2) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      wrapper.style.backgroundColor = bands[bands.length - 1].dataset.voyageBg ?? "";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    wrapper.style.position = "relative";
    wrapper.style.isolation = "isolate";

    const overlays = bands.slice(1).map((band, i) => {
      const overlay = document.createElement("div");
      overlay.setAttribute("aria-hidden", "true");
      overlay.style.position = "absolute";
      overlay.style.inset = "0";
      overlay.style.backgroundColor = band.dataset.voyageBg ?? "";
      overlay.style.opacity = "0";
      overlay.style.zIndex = String(i - bands.length);
      wrapper.prepend(overlay);
      return overlay;
    });

    const tweens = overlays.map((overlay, i) =>
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: bands[i + 1],
            start: "top 85%",
            end: "top 35%",
            scrub: 0.4,
          },
        }
      )
    );

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
      overlays.forEach((overlay) => overlay.remove());
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
