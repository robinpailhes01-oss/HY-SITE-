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
        eyebrow="La sortie en mer"
        time="14h00"
        moment="plein-jour"
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

      {/* Les formules & tarifs, avant le déroulé */}
      <section className="bg-sable py-20 md:py-28">
        <div className="container">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass-400">
              Les formules
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-marine md:text-4xl">
              Choisissez votre format de journée.
            </h2>
          </Reveal>

          <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                id: "coucher-de-soleil",
                name: "Coucher de soleil",
                duration: "3 heures",
                price: "Dès 390 €",
                detail: "Départ en fin de journée, pensée pour l'apéritif doré et les photos.",
              },
              {
                id: "apres-midi",
                name: "Après-midi",
                duration: "4 heures",
                price: "Dès 590 €",
                detail: "Le format préféré : baignade, ponton et retour avant le couchant.",
                featured: true,
              },
              {
                id: "journee",
                name: "Journée",
                duration: "8 heures",
                price: "Dès 990 €",
                detail: "Départ le matin, déjeuner au mouillage, la mer toute la journée.",
              },
            ].map((f) => (
              <StaggerItem key={f.id}>
                <div
                  className={`flex h-full flex-col justify-between border p-8 ${
                    f.featured
                      ? "border-brass bg-marine text-sable"
                      : "border-marine/10 bg-sable-50 text-marine"
                  }`}
                >
                  <div>
                    <p
                      className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                        f.featured ? "text-brass" : "text-marine/65"
                      }`}
                    >
                      {f.duration}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl">{f.name}</h3>
                    <p className={`mt-3 font-serif text-xl ${f.featured ? "text-brass" : "text-brass-400"}`}>
                      {f.price}
                    </p>
                    <p className={`mt-4 text-sm leading-relaxed ${f.featured ? "text-sable/80" : "text-marine/70"}`}>
                      {f.detail}
                    </p>
                  </div>
                  <Button
                    href={`/reserver?experience=jour&formule=${f.id}`}
                    variant={f.featured ? "primary" : "outline"}
                    className={`mt-8 ${!f.featured ? "border-marine/30 hover:bg-marine/5" : ""}`}
                  >
                    Réserver
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <p className="mt-6 text-xs text-marine/65">
            Capitaine et carburant inclus dans toutes les formules. EVJF,
            anniversaires et entreprises : devis personnalisé sur demande.
          </p>
        </div>
      </section>

      <VoyageScroller>
        {/* 14h00 — L'embarquement */}
        <section
          data-voyage-bg="#F7F3EA"
          data-log-time="14h00"
          data-log-label="L'embarquement"
          data-snap
          className="flex min-h-[100svh] items-center py-24 md:py-28"
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
          data-snap
          className="flex min-h-[100svh] items-center py-24 md:py-28 text-sable"
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
          data-snap
          className="flex min-h-[100svh] items-center py-24 md:py-28 text-sable"
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
          data-snap
          className="flex min-h-[100svh] items-center py-24 md:py-28 text-sable"
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

      <section className="bg-marine py-24 text-sable md:py-32">
        <div className="container">
          <ChapterHeader
            time="20h00"
            chapter="Pour chaque occasion"
            title="Trois façons de vivre cette journée."
            tone="dark"
          />

          <StaggerGroup className="mt-16 grid gap-6 md:grid-cols-3">
            {OCCASIONS.map(({ id, icon: Icon, title, description }) => (
              <StaggerItem key={id} id={id} className="scroll-mt-28">
                <div className="h-full border border-sable/15 bg-sable/[0.04] p-8">
                  <Icon className="text-brass" size={28} strokeWidth={1.5} />
                  <h3 className="mt-6 font-serif text-xl text-sable">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-sable/75">
                    {description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="bg-marine-400 py-24 text-center text-sable md:py-32">
        <Reveal className="container flex flex-col items-center">
          <p className="font-script text-3xl leading-none text-brass sm:text-4xl">
            La mer vous attend
          </p>
          <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight md:text-4xl">
            Un projet de sortie en tête ?
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-sable/75">
            Dites-nous l&apos;occasion, le nombre de personnes et la date qui
            vous arrange. On vous répond avec un prix ferme, sous 24h.
          </p>
          <Magnetic className="mt-10 inline-block">
            <Button href="/reserver?experience=jour" variant="primary">
              Réserver ma sortie
            </Button>
          </Magnetic>
          <p className="mt-4 text-[0.7rem] uppercase tracking-[0.2em] text-sable/55">
            Dès 390 € · Capitaine &amp; carburant inclus
          </p>
        </Reveal>
      </section>
    </main>
  );
}
