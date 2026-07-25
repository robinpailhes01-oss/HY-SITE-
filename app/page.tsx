import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { HeroContent, HeroItem } from "@/components/motion/hero-content";
import { Parallax } from "@/components/motion/parallax";
import { SplitText } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { PinnedHorizontal } from "@/components/motion/pinned-horizontal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { TraverseeChooser } from "@/components/experience/traversee-chooser";
import { VoyageScroller } from "@/components/voyage/voyage-scroller";
import { VoyageSun } from "@/components/voyage/voyage-sun";
import { ChapterHeader } from "@/components/voyage/chapter-header";
import { Stars } from "@/components/voyage/stars";
import { StickyCta } from "@/components/sticky-cta";
import { HeroVideo } from "@/components/hero-video";
import { ReviewsSection } from "@/components/reviews/reviews-section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Harmonie Yacht — Location de yacht à Carnon, Montpellier",
  description:
    "Harmonie Yacht, créateurs de moments authentiques : sorties en mer à Carnon pour EVJF, anniversaires et entreprises, et nuits insolites à bord au coucher du soleil.",
  path: "/",
});

const STEPS = [
  {
    number: "1",
    title: "Vous choisissez",
    text: "Après-midi, journée, coucher de soleil ou nuit à bord. Un prix ferme, rien à décoder.",
  },
  {
    number: "2",
    title: "On confirme sous 24h",
    text: "Vous posez une date, on vérifie la météo et le mouillage, et on vous répond nous-mêmes.",
  },
  {
    number: "3",
    title: "Vous montez à bord",
    text: "Rendez-vous au port de Carnon. Le capitaine s'occupe du reste, vous n'avez qu'à être là.",
  },
];

const EXPERIENCES = [
  {
    number: "01",
    title: "EVJF & anniversaires",
    description:
      "Votre musique, le ponton de bain sorti, la baignade au large — et personne d'autre à bord que vous.",
    price: "Dès 390 €",
    image: "/images/sortie-groupe-jour.jpg",
    imageAlt: "Groupe d'amis au ponton de bain du yacht par une journée ensoleillée",
    href: "/reserver?experience=jour",
    cta: "Réserver cette sortie",
  },
  {
    number: "02",
    title: "Entreprise",
    description:
      "Séminaire, incentive ou réception client : un cadre dont on reparle, et une facturation entreprise.",
    price: "Devis sous 24h",
    image: "/images/exterieur-coucher-soleil.jpg",
    imageAlt: "Le yacht Harmonie Yacht naviguant au large au coucher du soleil",
    href: "/sorties#entreprise",
    cta: "Organiser un événement",
  },
  {
    number: "03",
    title: "Nuit insolite",
    description:
      "À deux, ancrés face à l'horizon. Vous dînez au couchant, et vous ne rentrez pas au port.",
    price: "Dès 450 €",
    image: "/images/cabine-lit-nuit-insolite.jpg",
    imageAlt: "Cabine principale du yacht préparée pour une nuit insolite en couple",
    href: "/reserver?experience=nuit",
    cta: "Réserver une nuit",
  },
];

/**
 * L'accueil se lit comme une suite d'écrans pleins, un par idée, chacun avec
 * son action : embarquement → le choix jour/nuit → les trois gestes → les trois
 * occasions → l'heure d'or → la nuit → la preuve. Aucun écran ne se termine
 * sans dire son prix et ce qu'il faut faire ensuite.
 */
export default function HomePage() {
  const hasHeroVideo = existsSync(join(process.cwd(), "public/videos/hero.mp4"));

  return (
    <main>
      <StickyCta />

      {/* ── 1. Embarquement immédiat ─────────────────────────────────── */}
      <section data-snap className="relative flex min-h-[100svh] items-end overflow-hidden">
        <Parallax className="absolute inset-0">
          <Image
            src="/images/hero-sillage-coucher-soleil.jpg"
            alt="Sillage doré au coucher du soleil vu depuis le pont arrière d'un yacht au large de Carnon"
            fill
            priority
            sizes="100vw"
            // Recadré sur la mer : centré, le plafond du taud mangeait le tiers haut.
            className="ken-burns object-cover object-[center_38%]"
          />
          {hasHeroVideo && <HeroVideo />}
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-marine-400/90 via-marine-400/35 to-marine-400/15" />
        {/* Voile de tête : l'en-tête est transparent sur le hero, et du blanc
            sur un ciel pâle ne tient pas. Il descend juste derrière la barre. */}
        <div
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-marine-400/60 to-transparent md:h-36"
          aria-hidden="true"
        />

        <HeroContent className="container relative z-10 pb-24 pt-40 md:pb-28">
          <HeroItem>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-brass-50">
              Carnon · Montpellier
            </p>
          </HeroItem>
          <HeroItem>
            <SplitText
              as="h1"
              text="Le large, en toute intimité."
              className="mt-5 max-w-2xl font-serif text-4xl italic leading-[1.1] text-sable sm:text-5xl md:text-6xl"
            />
          </HeroItem>
          <HeroItem>
            <p className="mt-3 font-script text-3xl leading-none text-brass sm:text-4xl">
              Créateurs de moments authentiques
            </p>
          </HeroItem>
          <HeroItem className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Magnetic>
              <Button href="/reserver" variant="primary">
                Réserver une date
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                href="/sorties"
                variant="outline"
                className="text-sable border-sable/60 hover:bg-sable/10"
              >
                Voir le déroulé
              </Button>
            </Magnetic>
          </HeroItem>
          <HeroItem>
            <p className="mt-5 text-[0.7rem] uppercase tracking-[0.2em] text-sable/70">
              Dès 390 € · Capitaine &amp; carburant inclus · Report gratuit si la météo tourne
            </p>
          </HeroItem>
        </HeroContent>

        <div
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-sable/70"
          aria-hidden="true"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.3em]">La traversée commence</span>
          <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-sable/0 via-sable/70 to-sable/0" />
        </div>
      </section>

      {/* ── 2. La bifurcation : jour ou nuit ─────────────────────────── */}
      <TraverseeChooser />

      {/* ── La traversée : le fond vit du jour à la nuit ─────────────── */}
      <VoyageSun />
      <VoyageScroller>
        {/* 3. 14h00 — L'embarquement */}
        <section
          data-voyage-bg="#F7F3EA"
          data-snap
          className="flex min-h-[100svh] items-center py-20 md:py-28"
        >
          <div className="container">
            <ChapterHeader
              time="14h00"
              chapter="L'embarquement"
              title="Trois gestes, et vous êtes en mer."
            />

            <StaggerGroup className="mt-8 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
              {STEPS.map((step) => (
                <StaggerItem key={step.number}>
                  <div className="border-t border-brass/40 pt-5">
                    <span className="font-serif text-3xl italic text-brass-400/60 md:text-6xl">
                      {step.number}
                    </span>
                    <h3 className="mt-2 font-serif text-lg text-marine md:text-xl">{step.title}</h3>
                    <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-marine/70">
                      {step.text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <Reveal className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-16">
              <Magnetic>
                <Button href="/reserver" variant="primary">
                  Poser une date
                </Button>
              </Magnetic>
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-marine/60">
                Sans engagement · Réponse sous 24h
              </p>
            </Reveal>
          </div>
        </section>

        {/* 4·5·6. 15h30 — Le grand bleu : une occasion par écran en portrait,
            une piste horizontale épinglée sur desktop. */}
        <section data-voyage-bg="#1C2C46" className="py-24 text-sable md:py-28">
          <div className="container">
            <ChapterHeader
              time="15h30"
              chapter="Le grand bleu"
              title="Votre moment, votre équipage."
              tone="dark"
            />
          </div>

          <PinnedHorizontal
            className="relative mt-10 md:mt-16"
            trackClassName="px-6 md:px-[max(1.5rem,calc((100vw-1120px)/2+1.5rem))]"
          >
            {EXPERIENCES.map((xp) => (
              <Link
                key={xp.number}
                href={xp.href}
                data-snap-mobile
                className="group relative flex h-[80svh] w-full shrink-0 flex-col justify-end overflow-hidden md:h-[540px] md:w-[34vw] md:min-w-[440px]"
              >
                <Image
                  src={xp.image}
                  alt={xp.imageAlt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* En portrait la carte fait 80svh et son texte tombe sur la coque
                    blanche en plein soleil : le voile doit tenir jusqu'à
                    mi-hauteur, pas seulement au pied. */}
                <div className="absolute inset-0 bg-gradient-to-t from-marine-400/95 via-marine-400/62 to-marine-400/10 transition-colors duration-500 group-hover:from-marine-400/97 md:via-marine-400/40" />
                <span className="absolute left-6 top-6 font-serif text-5xl italic text-sable/45 md:text-6xl">
                  {xp.number}
                </span>
                <div className="relative p-6 md:p-8">
                  <h3 className="font-serif text-2xl text-sable md:text-3xl">{xp.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-sable/85">
                    {xp.description}
                  </p>
                  <p className="mt-4 font-serif text-xl text-brass">{xp.price}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brass transition-colors group-hover:text-sable">
                    {xp.cta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </PinnedHorizontal>
        </section>

        {/* 7. 20h30 — L'heure d'or. Une photo, une phrase, une action : c'est ce
            qui remplace l'ancienne section décorative « L'évasion ». */}
        <section
          data-voyage-bg="#101B2E"
          data-snap
          className="flex min-h-[100svh] items-center py-20 text-sable md:py-28"
        >
          <div className="container grid gap-8 md:grid-cols-2 md:items-center md:gap-20">
            <ImageReveal className="relative aspect-[4/5] max-h-[34svh] w-full overflow-hidden md:max-h-[58svh]">
              <Image
                src="/images/salon-interieur.jpg"
                alt="Salon intérieur du yacht Harmonie Yacht, boiseries acajou et banquette en cuir crème"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
            <div>
              <ChapterHeader
                time="20h30"
                chapter="L'heure d'or"
                title="On coupe le moteur, et le silence prend la place."
                tone="dark"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-sable/80">
                  Boiseries acajou, banquettes en cuir, la table dressée au
                  mouillage pendant que le ciel s&apos;embrase. Jusqu&apos;à
                  douze à bord, et personne d&apos;autre autour.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Magnetic>
                    <Button href="/reserver?experience=jour&formule=coucher-de-soleil" variant="primary">
                      Réserver cette soirée
                    </Button>
                  </Magnetic>
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-sable/60">
                    Coucher de soleil · Dès 390 €
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 8. 23h00 — La nuit à l'ancre */}
        <section
          data-voyage-bg="#070C15"
          data-snap
          className="relative flex min-h-[100svh] items-center py-20 text-sable md:py-28"
        >
          <Stars />
          <div className="container relative">
            <ChapterHeader
              time="23h00"
              chapter="La nuit à l'ancre"
              title="Et quand tout le monde rentre au port, vous restez."
              tone="dark"
            />

            <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-20">
              <Reveal>
                <p className="max-w-lg font-serif text-xl italic leading-relaxed text-sable/90 md:text-2xl">
                  Le silence du large, un ciel sans lumière parasite, le clapot
                  contre la coque — et un réveil face à l&apos;horizon.
                </p>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-sable/70">
                  Une cabine préparée pour deux, un mouillage privé au large de
                  Carnon, et le petit-déjeuner servi à bord au lever du soleil.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Magnetic>
                    <Button href="/reserver?experience=nuit" variant="primary">
                      Réserver ma nuit
                    </Button>
                  </Magnetic>
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-sable/60">
                    18h00 → 10h00 · Dès 450 € pour deux
                  </p>
                </div>
              </Reveal>
              <ImageReveal className="relative hidden aspect-[4/5] w-full overflow-hidden md:block md:max-h-[52svh]">
                <Image
                  src="/images/cabine-lit-nuit-insolite.jpg"
                  alt="Cabine principale du yacht avec lit rond, prête pour une nuit insolite à l'ancre"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </ImageReveal>
            </div>
          </div>
        </section>
      </VoyageScroller>

      {/* ── 9. La preuve : leurs traversées ──────────────────────────── */}
      <ReviewsSection />
    </main>
  );
}
