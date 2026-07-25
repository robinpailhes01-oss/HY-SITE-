"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PinnedHorizontal({
  children,
  className,
  trackClassName,
}: {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (reduceMotion || !isDesktop) return;

    gsap.registerPlugin(ScrollTrigger);

    let tween: gsap.core.Tween | undefined;

    const setup = () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();

      const distance = track.scrollWidth - section.clientWidth;
      if (distance <= 0) return;

      tween = gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    };

    setup();
    ScrollTrigger.addEventListener("refreshInit", setup);

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", setup);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, []);

  return (
    // La piste est volontairement plus large que l'écran : c'est GSAP qui la
    // fait défiler. Sans ce rognage, elle allonge la page et le site scrolle
    // latéralement — d'où le `overflow-hidden` porté par la section elle-même.
    <div ref={sectionRef} className={`overflow-hidden ${className ?? ""}`}>
      <div
        ref={trackRef}
        // En portrait, la piste se déplie verticalement : un scroll horizontal
        // imbriqué dans un scroll vertical se bat avec le pouce, et les cartes
        // n'y montraient que leur bord haut. Sur desktop elle reste une piste
        // que GSAP fait défiler.
        className={`flex flex-col gap-6 md:flex-row md:gap-6 md:overflow-visible ${trackClassName ?? ""}`}
      >
        {children}
      </div>
    </div>
  );
}
