"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * L'astre de la traversée : un soleil qui descend vers l'horizon au fil du
 * scroll, s'embrase à l'heure d'or puis laisse place à la lune dans la nuit.
 * Purement décoratif (aria-hidden, pointer-events-none, blend screen).
 */
export function VoyageSun() {
  const discRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const disc = discRef.current;
    const sun = sunRef.current;
    const moon = moonRef.current;
    if (!disc || !sun || !moon) return;

    gsap.registerPlugin(ScrollTrigger);

    const chapters = Array.from(
      document.querySelectorAll<HTMLElement>("[data-voyage-bg]")
    );
    if (chapters.length < 4) return;

    const [embarquement, grandBleu, heureDor, nuit] = chapters;
    const tweens: gsap.core.Tween[] = [];

    gsap.set(disc, { yPercent: 0, scale: 1, autoAlpha: 0 });
    gsap.set(moon, { autoAlpha: 0 });

    // Apparition au début de la traversée
    tweens.push(
      gsap.to(disc, {
        autoAlpha: 1,
        immediateRender: false,
        scrollTrigger: {
          trigger: embarquement,
          start: "top 70%",
          end: "top 30%",
          scrub: 0.4,
        },
      })
    );

    // Descente progressive vers l'horizon pendant le grand bleu
    tweens.push(
      gsap.fromTo(
        disc,
        { yPercent: 0 },
        {
          yPercent: 90,
          immediateRender: false,
          ease: "none",
          scrollTrigger: {
            trigger: grandBleu,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 0.4,
          },
        }
      )
    );

    // L'heure d'or : le soleil grossit et s'embrase près de l'horizon
    tweens.push(
      gsap.fromTo(
        disc,
        { yPercent: 90, scale: 1 },
        {
          yPercent: 150,
          scale: 1.6,
          immediateRender: false,
          ease: "none",
          scrollTrigger: {
            trigger: heureDor,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.4,
          },
        }
      )
    );

    // La nuit : le soleil se couche, la lune se lève
    tweens.push(
      gsap.fromTo(
        disc,
        { yPercent: 150, scale: 1.6 },
        {
          yPercent: 20,
          scale: 0.7,
          immediateRender: false,
          ease: "none",
          scrollTrigger: {
            trigger: nuit,
            start: "top 80%",
            end: "top 20%",
            scrub: 0.4,
          },
        }
      )
    );
    tweens.push(
      gsap.to(sun, {
        autoAlpha: 0,
        immediateRender: false,
        scrollTrigger: {
          trigger: nuit,
          start: "top 80%",
          end: "top 40%",
          scrub: 0.4,
        },
      })
    );
    tweens.push(
      gsap.to(moon, {
        autoAlpha: 0.9,
        immediateRender: false,
        scrollTrigger: {
          trigger: nuit,
          start: "top 60%",
          end: "top 20%",
          scrub: 0.4,
        },
      })
    );

    // Disparition en fin de traversée
    tweens.push(
      gsap.to(disc, {
        autoAlpha: 0,
        immediateRender: false,
        scrollTrigger: {
          trigger: nuit,
          start: "bottom 70%",
          end: "bottom 40%",
          scrub: 0.4,
        },
      })
    );

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={discRef}
      // Masqué en portrait : un astre fixe sur 390 px de large finit toujours
      // par croiser un paragraphe. L'arc de couleur du fond porte déjà le
      // passage du jour à la nuit sur mobile.
      className="pointer-events-none fixed right-[9vw] top-[14vh] z-[5] hidden md:block"
      aria-hidden="true"
    >
      {/* Un disque franc, pas une tache : le dégradé s'arrête net au bord et
          le halo vit à l'extérieur, sinon l'astre lit comme une salissure
          d'objectif au lieu d'un soleil. */}
      <div ref={sunRef} className="relative h-20 w-20 md:h-28 md:w-28">
        <div
          className="absolute -inset-[55%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(242,200,121,0.35) 0%, rgba(230,160,90,0) 65%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle, #FBEBC4 0%, #F0B968 78%, #E9A65A 100%)" }}
        />
      </div>
      <div ref={moonRef} className="absolute inset-0 h-20 w-20 md:h-28 md:w-28">
        <div
          className="absolute -inset-[45%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(226,232,242,0.28) 0%, rgba(200,210,230,0) 65%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: "radial-gradient(circle, #F4F6FA 0%, #DDE3EE 80%, #C9D2E2 100%)" }}
        />
      </div>
    </div>
  );
}
