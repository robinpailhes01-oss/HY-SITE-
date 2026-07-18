"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Wraps the homepage chapters and morphs the shared background colour as the
 * visitor scrolls from daylight (sand) to night at anchor (deep marine).
 * Chapters declare their colour via data-voyage-bg; sections stay transparent.
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

    wrapper.style.backgroundColor = chapters[0].dataset.voyageBg ?? "#F7F3EA";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chapters.forEach((chapter) => {
        chapter.style.backgroundColor = chapter.dataset.voyageBg ?? "";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const tweens = chapters.slice(1).map((chapter, i) =>
      gsap.fromTo(
        wrapper,
        { backgroundColor: chapters[i].dataset.voyageBg },
        {
          backgroundColor: chapter.dataset.voyageBg,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: chapter,
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
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
