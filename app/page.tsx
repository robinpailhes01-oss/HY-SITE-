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
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { TraverseeChooser } from "@/components/experience/traversee-chooser";
import { VoyageScroller } from "@/components/voyage/voyage-scroller";
import { ChapterHeader } from "@/components/voyage/chapter-header";
import { Stars } from "@/components/voyage/stars";
import { BoatTour } from "@/components/boat-tour";
import { StickyCta } from "@/components/sticky-cta";
import { HeroVideo } from "@/components/hero-video";
import { ReviewsSection } from "@/components/reviews/reviews-section";
import { SceneFade } from "@/components/motion/scene-fade";
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
      "Votre musique, la baignade au large, et personne d'autre à bord que vous.",
    price: "Dès 380 €",
    image: "/images/dj-coucher-soleil.jpg",
    imageAlt: "DJ set à bord au coucher du soleil pendant un EVJF",
    href: "/reserver?experience=jour",
    cta: "Réserver cette sortie",
  },
  {
    number: "02",
    title: "Entreprise",
    description:
      "Séminaire ou réception client : un cadre dont on reparle, facturé à l'entreprise.",
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
    price: "Dès 350 €",
    image: "/images/cabine-lit-nuit-insolite.jpg",
    imageAlt: "Cabine principale du yacht préparée pour une nuit insolite en couple",
    href: "/reserver?experience=nuit",
    cta: "Réserver une nuit",
  },
];

/**
 * L'accueil se lit comme une suite d'écrans pleins, un par idée, chacun avec
 * son action : embarquement → le choix jour/nuit → les trois gestes → la
 * visite du bateau → les trois occasions → la nuit → la preuve. Aucun écran
 * ne se termine sans dire son prix et ce qu'il faut faire ensuite.
 */
export default function HomePage() {
  const hasHeroVideo = existsSync(join(process.cwd(), "public/videos/hero.mp4"));

  return (
    <main>
      <StickyCta />

      {/* ── 1. Embarquement immédiat ─────────────────────────────────── */}
      <SceneFade as="section" data-snap fadeIn={false} className="relative flex min-h-[100svh] items-end overflow-hidden">
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
            <SplitText
              as="h1"
              text="Créateurs de moments authentiques sur l'eau."
              className="max-w-2xl font-serif text-4xl italic leading-[1.1] text-sable sm:text-5xl md:text-6xl"
            />
          </HeroItem>
          <HeroItem>
            <p className="mt-4 font-script text-3xl leading-none text-brass sm:text-4xl">
              Harmonie Yacht · Carnon
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
        </HeroContent>

        <div
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-sable/70"
          aria-hidden="true"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.3em]">La traversée commence</span>
          <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-sable/0 via-sable/70 to-sable/0" />
        </div>
      </SceneFade>

      {/* ── 2. La bifurcation : jour ou nuit ─────────────────────────── */}
      <SceneFade>
        <TraverseeChooser />
      </SceneFade>

      {/* ── Une seule bascule de lumière : le jour, puis la nuit ─────── */}
      <VoyageScroller>
        {/* 3. 14h00 — L'embarquement */}
        <SceneFade
          as="section"
          data-voyage-bg="#F7F3EA"
          data-snap
          className="flex min-h-[100svh] items-center py-20 md:py-28"
        >
          <div className="container">
            <ChapterHeader
              chapter="Comment ça se passe"
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
        </SceneFade>

        {/* 4. Le bateau — la question que se pose vraiment un client qui hésite. */}
        <SceneFade>
          <BoatTour />
        </SceneFade>

        {/* 5. Une occasion, une carte : plus de scroll horizontal, tout se lit
            d'un coup d'œil. */}
        <SceneFade as="section" data-voyage-bg="#F7F3EA" className="py-24 md:py-28">
          <div className="container">
            <ChapterHeader
              chapter="Pour quelle occasion"
              title="Votre moment, votre équipage."
            />

            <StaggerGroup className="mt-10 grid gap-6 md:mt-16 md:grid-cols-3">
              {EXPERIENCES.map((xp) => (
                <StaggerItem key={xp.number}>
                  <Link
                    href={xp.href}
                    className="group relative flex aspect-[3/4] w-full flex-col justify-end overflow-hidden"
                  >
                    <Image
                      src={xp.image}
                      alt={xp.imageAlt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-marine-400/95 via-marine-400/45 to-marine-400/10 transition-colors duration-500 group-hover:from-marine-400/97" />
                    <div className="relative p-6 md:p-7">
                      <h3 className="font-serif text-2xl text-sable">{xp.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-sable/85">
                        {xp.description}
                      </p>
                      <p className="mt-3 font-serif text-lg text-brass">{xp.price}</p>
                      <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brass transition-colors group-hover:text-sable">
                        {xp.cta}
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </SceneFade>

        {/* 6. 23h00 — La nuit à l'ancre */}
        <SceneFade
          as="section"
          data-voyage-bg="#070C15"
          data-snap
          className="relative flex min-h-[100svh] items-center py-20 text-sable md:py-28"
        >
          <Stars />
          <div className="container relative">
            <ChapterHeader
              chapter="La nuit insolite"
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
                  Une cabine pour deux, un mouillage privé, et le petit-déjeuner
                  servi à bord au lever du soleil.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Magnetic>
                    <Button href="/reserver?experience=nuit" variant="primary">
                      Réserver ma nuit
                    </Button>
                  </Magnetic>
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-sable/60">
                    18h00 → 10h00 · Dès 350 € pour deux
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
        </SceneFade>
      </VoyageScroller>

      {/* ── 7. La preuve : leurs traversées ──────────────────────────── */}
      <SceneFade fadeOut={false}>
        <ReviewsSection />
      </SceneFade>
    </main>
  );
}
