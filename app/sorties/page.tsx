import type { Metadata } from "next";
import Image from "next/image";
import { Briefcase, Cake, PartyPopper } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { WakeScrollSection } from "@/components/wake-scroll-section";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

export const metadata: Metadata = {
  title: "Sorties en mer — EVJF, anniversaires, entreprise",
  description:
    "Réservez une sortie en mer à Carnon pour un EVJF, un anniversaire ou un événement d'entreprise : demi-journée ou journée à bord d'un yacht.",
};

const OCCASIONS = [
  {
    id: "evjf",
    icon: PartyPopper,
    title: "EVJF",
    description:
      "Musique, bain et bulles à bord : le cadre idéal pour un enterrement de vie de jeune fille loin des adresses convenues. Ponton gonflable et zone de baignade pour prolonger la fête sur l'eau.",
  },
  {
    id: "anniversaire",
    icon: Cake,
    title: "Anniversaire",
    description:
      "Entre amis ou en famille, célébrez sur l'eau plutôt qu'en salle. Décoration légère, playlist personnalisée et gâteau embarqué possibles sur demande.",
  },
  {
    id: "entreprise",
    icon: Briefcase,
    title: "Entreprise",
    description:
      "Séminaire, incentive ou réception client : un cadre différenciant pour fédérer une équipe ou marquer les esprits. Facturation entreprise et devis sur mesure.",
  },
] as const;

const FORMULES = [
  {
    name: "Après-midi",
    duration: "4 heures",
    detail: "Départ en début d'après-midi, retour avant le coucher du soleil.",
  },
  {
    name: "Journée",
    duration: "8 heures",
    detail: "Départ le matin, déjeuner au mouillage, retour en fin de journée.",
  },
  {
    name: "Coucher de soleil",
    duration: "3 heures",
    detail: "Sortie courte en fin de journée, pensée pour l'apéritif et les photos.",
  },
];

export default function SortiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Sorties en mer"
        title="Votre sortie, votre mer, votre rythme."
        description="Demi-journée, journée ou coucher de soleil au départ de Carnon — pour un EVJF, un anniversaire ou un événement d'entreprise."
        image="/images/sortie-groupe-jour.jpg"
        imageAlt="Groupe d'amis profitant du ponton gonflable à l'arrière du yacht par une journée ensoleillée"
      />

      <WakeScrollSection>
        <section className="bg-sable py-24 md:py-32">
          <div className="container">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass-400">
                Pour chaque occasion
              </p>
              <h2 className="mt-5 max-w-xl font-serif text-3xl leading-tight text-marine md:text-4xl">
                Trois façons de vivre la mer autrement.
              </h2>
            </Reveal>

            <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-3">
              {OCCASIONS.map(({ id, icon: Icon, title, description }) => (
                <StaggerItem key={id} id={id} className="scroll-mt-28">
                  <div className="h-full border border-marine/10 bg-sable-50 p-8">
                    <Icon className="text-brass-400" size={28} strokeWidth={1.5} />
                    <h3 className="mt-6 font-serif text-xl text-marine">{title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-marine/70">
                      {description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section className="relative overflow-hidden bg-marine py-24 text-sable md:py-32">
          <div className="container grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass">
                Formules
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
                Choisissez votre format.
              </h2>
              <div className="mt-10 space-y-8">
                {FORMULES.map((f) => (
                  <div key={f.name} className="border-b border-sable/15 pb-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-serif text-xl">{f.name}</p>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
                        {f.duration}
                      </p>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-sable/70">
                      {f.detail}
                    </p>
                  </div>
                ))}
              </div>
              <Button href="/tarifs" variant="primary" className="mt-10">
                Voir les tarifs détaillés
              </Button>
            </Reveal>
            <Reveal className="relative aspect-[4/5] w-full overflow-hidden" y={32}>
              <Image
                src="/images/exterieur-coucher-soleil.jpg"
                alt="Yacht Harmonie Yacht naviguant au coucher du soleil avec passagers à bord"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </section>
      </WakeScrollSection>

      <section className="bg-sable py-24 text-center md:py-32">
        <Reveal className="container flex flex-col items-center">
          <h2 className="max-w-xl font-serif text-3xl leading-tight text-marine md:text-4xl">
            Un projet de sortie en tête ?
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-marine/70">
            Racontez-nous l&apos;occasion, le nombre de personnes et la date
            souhaitée : nous revenons vers vous avec une proposition sur
            mesure.
          </p>
          <Button href="/contact" variant="primary" className="mt-10">
            Demander un devis
          </Button>
        </Reveal>
      </section>
    </main>
  );
}
