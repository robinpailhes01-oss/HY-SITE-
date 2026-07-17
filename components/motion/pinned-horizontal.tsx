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
    <div ref={sectionRef} className={className}>
      <div
        ref={trackRef}
        className={`flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:snap-none md:gap-6 md:overflow-visible md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden ${trackClassName ?? ""}`}
      >
        {children}
      </div>
    </div>
  );
}
