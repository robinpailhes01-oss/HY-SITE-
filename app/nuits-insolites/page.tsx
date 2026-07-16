import type { Metadata } from "next";
import Image from "next/image";
import { Moon, Sunrise, Waves } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { WakeScrollSection } from "@/components/wake-scroll-section";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

export const metadata: Metadata = {
  title: "Nuits insolites à bord",
  description:
    "Passez une nuit insolite à deux à bord d'un yacht ancré au large de Carnon : coucher de soleil, ciel étoilé et réveil face à la mer.",
};

const TIMELINE = [
  {
    icon: Sunrise,
    time: "Fin d'après-midi",
    text: "Embarquement au port de Carnon, mise à l'eau et navigation jusqu'au mouillage choisi pour la soirée.",
  },
  {
    icon: Waves,
    time: "Coucher du soleil",
    text: "Apéritif sur le pont, baignade si la météo s'y prête, et dîner au mouillage face à l'horizon qui s'embrase.",
  },
  {
    icon: Moon,
    time: "Nuit",
    text: "Nuit à bord dans la cabine principale, bercés par le clapot. Le silence du large, loin de toute agitation.",
  },
];

export default function NuitsInsolitesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Nuit insolite"
        title="Une nuit à deux, ancrés face à l'horizon."
        description="Le luxe discret d'un yacht rien que pour vous, entre coucher et lever de soleil sur la Méditerranée."
        image="/images/cabine-lit-nuit-insolite.jpg"
        imageAlt="Cabine principale du yacht avec lit rond et boiseries chaleureuses, préparée pour une nuit insolite"
      />

      <WakeScrollSection>
        <section className="bg-sable py-24 md:py-32">
          <div className="container">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass">
                Déroulé de la soirée
              </p>
              <h2 className="mt-5 max-w-xl font-serif text-3xl leading-tight text-marine md:text-4xl">
                Du dernier rayon de soleil au premier café du matin.
              </h2>
            </Reveal>

            <StaggerGroup className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
              {TIMELINE.map(({ icon: Icon, time, text }) => (
                <StaggerItem key={time}>
                  <div className="border-t border-brass/40 pt-6">
                    <Icon className="text-brass" size={26} strokeWidth={1.5} />
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-marine/50">
                      {time}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-marine/75">{text}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section className="relative overflow-hidden bg-marine py-24 text-sable md:py-32">
          <div className="container grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
            <Reveal className="relative aspect-[4/5] w-full overflow-hidden" y={32}>
              <Image
                src="/images/salon-interieur.jpg"
                alt="Table dressée dans le salon du yacht pour un dîner au mouillage"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass">
                Formule couple
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
                Une expérience pensée pour deux.
              </h2>
              <ul className="mt-6 space-y-3 text-base leading-relaxed text-sable/80">
                <li>— Mouillage privé au large de Carnon, choisi selon la météo</li>
                <li>— Linge de bain et literie fournis, cabine climatisée</li>
                <li>— Options traiteur, décoration et champagne sur demande</li>
                <li>— Capitaine à quai pour la nuit, disponible en cas de besoin</li>
              </ul>
              <Button href="/tarifs" variant="outline" className="mt-8 text-sable border-sable/40 hover:bg-sable/10">
                Voir les tarifs
              </Button>
            </Reveal>
          </div>
        </section>
      </WakeScrollSection>

      <section className="bg-sable py-24 text-center md:py-32">
        <Reveal className="container flex flex-col items-center">
          <h2 className="max-w-xl font-serif text-3xl leading-tight text-marine md:text-4xl">
            Offrez-vous une nuit hors du temps.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-marine/70">
            Places limitées : les nuits insolites se réservent plusieurs
            semaines à l&apos;avance en haute saison.
          </p>
          <Button href="/contact" variant="primary" className="mt-10">
            Réserver ma nuit insolite
          </Button>
        </Reveal>
      </section>
    </main>
  );
}
