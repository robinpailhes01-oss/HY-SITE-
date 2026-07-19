import Image from "next/image";
import { Briefcase, Cake, PartyPopper } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { VoyageScroller } from "@/components/voyage/voyage-scroller";
import { ChapterHeader } from "@/components/voyage/chapter-header";
import { TimeIndicator } from "@/components/experience/time-indicator";
import { ExperienceFacts } from "@/components/experience/experience-facts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sorties en mer — le déroulé de votre journée",
  description:
    "De l'embarquement à 14h au retour au coucher du soleil : le déroulé complet d'une sortie en mer privatisée à Carnon — EVJF, anniversaires, entreprise.",
  path: "/sorties",
  image: "/images/sortie-groupe-jour.jpg",
});

const OCCASIONS = [
  {
    id: "evjf",
    icon: PartyPopper,
    title: "EVJF",
    description:
      "Musique, bain et bulles à bord : le cadre idéal pour un enterrement de vie de jeune fille loin des adresses convenues.",
  },
  {
    id: "anniversaire",
    icon: Cake,
    title: "Anniversaire",
    description:
      "Entre amis ou en famille, célébrez sur l'eau. Décoration, playlist personnalisée et gâteau embarqué sur demande.",
  },
  {
    id: "entreprise",
    icon: Briefcase,
    title: "Entreprise",
    description:
      "Séminaire, incentive ou réception client : un cadre différenciant. Facturation entreprise et devis sur mesure.",
  },
] as const;

export default function SortiesPage() {
  return (
    <main>
      <TimeIndicator />

      <PageHero
        eyebrow="Sorties en mer · La traversée de jour"
        title="Votre journée, votre mer, votre rythme."
        description="De l'embarquement au retour dans le soleil couchant — voici, heure par heure, la journée que vous allez vivre."
        image="/images/sortie-groupe-jour.jpg"
        imageAlt="Groupe d'amis profitant du ponton gonflable à l'arrière du yacht par une journée ensoleillée"
      />

      <ExperienceFacts
        facts={[
          { label: "Formules", value: "3h · 4h · 8h" },
          { label: "Équipage", value: "Jusqu'à 12 pers." },
          { label: "Tarif", value: "Dès 390 €" },
          { label: "Départ", value: "Port de Carnon" },
        ]}
      />

      <VoyageScroller>
        {/* 14h00 — L'embarquement */}
        <section
          data-voyage-bg="#F7F3EA"
          data-log-time="14h00"
          data-log-label="L'embarquement"
          className="py-24 md:py-32"
        >
          <div className="container grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
            <div>
              <ChapterHeader
                time="14h00"
                chapter="L'embarquement"
                title="Larguez les amarres, la journée est à vous."
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-marine/75">
                  Accueil au port de Carnon, briefing express du capitaine,
                  votre playlist sur la sono — et cap au large. Glacière,
                  vaisselle et gilets : tout est déjà à bord.
                </p>
              </Reveal>
            </div>
            <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/exterieur-coucher-soleil.jpg"
                alt="Le yacht Harmonie Yacht quitte le port de Carnon"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </section>

        {/* 15h00 — Le grand bleu */}
        <section
          data-voyage-bg="#1C2C46"
          data-log-time="15h00"
          data-log-label="Baignade au large"
          className="py-24 text-sable md:py-32"
        >
          <div className="container grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
            <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden md:order-2">
              <Image
                src="/images/sortie-groupe-jour.jpg"
                alt="Baignade au large depuis le ponton gonflable du yacht"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
            <div className="md:order-1">
              <ChapterHeader
                time="15h00"
                chapter="Le grand bleu"
                title="Mouillage au large, ponton à l'eau."
                tone="dark"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-sable/80">
                  Le capitaine choisit le plus beau mouillage du jour. Ponton
                  de bain gonflable, paddle, musique et eau turquoise — le
                  large devient votre plage privée.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 17h30 — L'apéritif */}
        <section
          data-voyage-bg="#8A4023"
          data-log-time="17h30"
          data-log-label="L'apéritif au soleil"
          className="py-24 text-sable md:py-32"
        >
          <div className="container grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
            <div>
              <ChapterHeader
                time="17h30"
                chapter="L'apéritif"
                title="Tapas, bulles et lumière dorée."
                tone="dark"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-sable/80">
                  La planche de tapas de notre partenaire local arrive sur la
                  table, les coupes se remplissent, et la lumière commence à
                  dorer. Le moment que tout le monde photographie.
                </p>
              </Reveal>
            </div>
            <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/tapas-coucher-soleil.jpg"
                alt="Planche de tapas et coupes de champagne sur la table du yacht dans la lumière dorée"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </section>

        {/* 19h00 — Le retour au couchant */}
        <section
          data-voyage-bg="#101B2E"
          data-log-time="19h00"
          data-log-label="Le retour au couchant"
          className="py-24 text-sable md:py-32"
        >
          <div className="container grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
            <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden md:order-2">
              <Image
                src="/images/hero-sillage-coucher-soleil.jpg"
                alt="Le sillage doré du yacht au coucher du soleil sur le chemin du retour"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
            <div className="md:order-1">
              <ChapterHeader
                time="19h00"
                chapter="Le retour"
                title="Rentrer au port dans le soleil couchant."
                tone="dark"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-sable/75">
                  Le sillage s&apos;embrase, Carnon se rapproche doucement.
                  Et si personne ne veut rentrer — la formule coucher de
                  soleil prolonge la journée jusqu&apos;à la nuit tombée.
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </VoyageScroller>

      <section className="bg-sable py-24 md:py-32">
        <div className="container">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass-400">
              Pour chaque occasion
            </p>
            <h2 className="mt-5 max-w-xl font-serif text-3xl leading-tight text-marine md:text-4xl">
              Trois façons de vivre cette journée.
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

      <section className="bg-sable pb-24 pt-0 text-center md:pb-32">
        <Reveal className="container flex flex-col items-center">
          <h2 className="max-w-xl font-serif text-3xl leading-tight text-marine md:text-4xl">
            Un projet de sortie en tête ?
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-marine/70">
            Racontez-nous l&apos;occasion, le nombre de personnes et la date
            souhaitée : nous revenons vers vous avec une proposition sur
            mesure.
          </p>
          <Magnetic className="mt-10 inline-block">
            <Button href="/contact" variant="primary">
              Demander un devis
            </Button>
          </Magnetic>
          <p className="mt-4 text-[0.7rem] uppercase tracking-[0.2em] text-marine/50">
            Dès 390 € · Capitaine & carburant inclus
          </p>
        </Reveal>
      </section>
    </main>
  );
}
