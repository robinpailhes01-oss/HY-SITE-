"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookingForm } from "@/components/booking/booking-form";
import { Stars } from "@/components/voyage/stars";
import { Reveal } from "@/components/motion/reveal";

type Experience = "jour" | "nuit";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Le mot d'accueil suit le choix : la page parle de ce que le visiteur a choisi. */
const COPY: Record<"neutre" | Experience, { eyebrow: string; title: string; text: string }> = {
  neutre: {
    eyebrow: "L'embarquement",
    title: "Dites-nous quand, on s'occupe du reste.",
    text: "Deux minutes, quatre questions — le capitaine vous répond avant demain soir, la météo en main.",
  },
  jour: {
    eyebrow: "L'embarquement · 14h00",
    title: "Le port vous attend, et la mer est belle.",
    text: "Choisissez la durée, la date, le nombre d'invités. On prépare le ponton de bain, la glacière et la sono — vous n'apportez que la playlist.",
  },
  nuit: {
    eyebrow: "L'embarquement · 18h00",
    title: "Ce soir, vous ne rentrez pas au port.",
    text: "Une cabine préparée pour deux, un mouillage rien qu'à vous, et le petit-déjeuner qui arrive avec le soleil. Dites-nous simplement quelle nuit.",
  },
};

/**
 * La scène de réservation. Le formulaire n'est pas posé sur une page neutre :
 * dès que le visiteur choisit son expérience, toute la lumière du site bascule
 * avec lui — le sable se réchauffe pour la sortie en mer, la page tombe dans la
 * nuit et les étoiles s'allument pour la nuit insolite. C'est le moment où le
 * site cesse de raconter l'histoire et où le visiteur y entre.
 */
export function BookingStage() {
  const [experience, setExperience] = useState<Experience | null>(null);

  // La lumière est posée sur <html> pour que l'en-tête fixe bascule aussi.
  useEffect(() => {
    const root = document.documentElement;
    if (experience) root.dataset.moment = experience;
    else delete root.dataset.moment;
    return () => {
      delete root.dataset.moment;
    };
  }, [experience]);

  const handleExperienceChange = useCallback((next: Experience | null) => {
    setExperience(next);
  }, []);

  const copy = COPY[experience ?? "neutre"];
  const isNight = experience === "nuit";

  return (
    <main className="ambiance relative min-h-[100svh]" data-moment={experience ?? undefined}>
      {/* Les étoiles ne s'allument que la nuit, en fondu — jamais d'un coup. */}
      <AnimatePresence>
        {isNight && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 h-[80vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: EASE }}
            aria-hidden="true"
          >
            <Stars />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Halo doré du soir : chaud pour la sortie, froid et bas pour la nuit. */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]"
        animate={{
          opacity: experience ? 1 : 0.5,
          background: isNight
            ? "radial-gradient(60% 55% at 50% 0%, rgba(184,147,90,0.10), transparent 70%)"
            : "radial-gradient(60% 55% at 50% 0%, rgba(179,86,47,0.12), transparent 70%)",
        }}
        transition={{ duration: 1.2, ease: EASE }}
        aria-hidden="true"
      />

      <section className="relative pb-32 pt-32 md:pb-40 md:pt-40">
        <div className="container max-w-4xl">
          <Reveal>
            {/* Le titre se relaie au lieu de se réécrire : le lecteur voit le
                changement, il ne le subit pas. */}
            <AnimatePresence mode="wait">
              <motion.div
                key={experience ?? "neutre"}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--amb-accent)]">
                  {copy.eyebrow}
                </p>
                <h1 className="mt-4 font-serif text-3xl italic leading-tight text-[color:var(--amb-ink)] sm:text-4xl md:text-5xl">
                  {copy.title}
                </h1>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-[color:var(--amb-ink-soft)]">
                  {copy.text}
                </p>
              </motion.div>
            </AnimatePresence>
          </Reveal>

          <div className="mt-12 md:mt-16">
            <Suspense fallback={null}>
              <BookingForm onExperienceChange={handleExperienceChange} />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
