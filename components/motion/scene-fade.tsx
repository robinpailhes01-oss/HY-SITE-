"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ENTER_FRACTION = 0.16;
const EXIT_FRACTION = 0.16;

interface SceneFadeProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  /** L'accueil s'enchaîne en scènes (section, div…) : le tag suit l'usage. */
  as?: "div" | "section";
  /** Faux pour la toute première scène : elle est déjà visible au chargement. */
  fadeIn?: boolean;
  /** Faux pour la toute dernière scène, avant le pied de page. */
  fadeOut?: boolean;
}

/**
 * Le fondu d'une scène à l'autre sur l'accueil.
 *
 * Chaque section se dissout doucement en quittant l'écran — révélant un
 * instant la couleur pure du moment portée par VoyageScroller — avant que la
 * suivante apparaisse de la même façon. Un seul enchaînement continu plutôt
 * que des sections qui s'arrêtent net.
 *
 * Un seul ScrollTrigger pilote toute l'enveloppe (entrée + sortie) pour éviter
 * que deux animations se disputent la même propriété. Transform/opacity
 * uniquement (60fps), neutralisé en reduced-motion.
 */
export function SceneFade({
  children,
  as: Tag = "div",
  fadeIn = true,
  fadeOut = true,
  ...rest
}: SceneFadeProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!fadeIn && !fadeOut) return;

    gsap.registerPlugin(ScrollTrigger);

    const apply = (progress: number) => {
      let opacity = 1;
      if (fadeIn && progress < ENTER_FRACTION) opacity = progress / ENTER_FRACTION;
      if (fadeOut && progress > 1 - EXIT_FRACTION) {
        opacity = Math.min(opacity, (1 - progress) / EXIT_FRACTION);
      }
      gsap.set(el, { opacity: Math.max(0, Math.min(1, opacity)) });
    };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => apply(self.progress),
      onRefresh: (self) => apply(self.progress),
    });

    return () => {
      trigger.kill();
      gsap.set(el, { clearProps: "opacity" });
    };
  }, [fadeIn, fadeOut]);

  const Component = Tag as "div";

  return (
    <Component ref={ref as React.Ref<HTMLDivElement>} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>
      {children}
    </Component>
  );
}
