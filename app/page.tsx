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
import { MarqueeBand } from "@/components/marquee-band";
import { SignatureStatement } from "@/components/signature-statement";
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
    title: "Choisissez votre formule",
    text: "Après-midi, journée, coucher de soleil ou nuit à bord — chaque moment de la traversée est une formule.",
  },
  {
    number: "2",
    title: "Réservez votre date",
    text: "Un message suffit : nous confirmons la disponibilité et personnalisons la sortie avec vous.",
  },
  {
    number: "3",
    title: "Embarquez à Carnon",
    text: "Rendez-vous au port, le capitaine s'occupe du reste. Vous n'avez qu'à vivre le moment.",
  },
];

const EXPERIENCES = [
  {
    number: "01",
    title: "EVJF & anniversaires",
    description: "Musique, baignade et bulles au large — la fête, version privatisée.",
    image: "/images/sortie-groupe-jour.jpg",
    imageAlt: "Groupe d'amis au ponton de bain du yacht par une journée ensoleillée",
    href: "/sorties",
    cta: "Découvrir les sorties",
  },
  {
    number: "02",
    title: "Entreprise",
    description: "Séminaires et réceptions en mer — fédérez votre équipe autrement.",
    image: "/images/exterieur-coucher-soleil.jpg",
    imageAlt: "Le yacht Harmonie Yacht naviguant au large au coucher du soleil",
    href: "/sorties#entreprise",
    cta: "Organiser un événement",
  },
  {
    number: "03",
    title: "Nuit insolite",
    description: "Une nuit à deux, ancrés face à l'horizon, sous les étoiles.",
    image: "/images/cabine-lit-nuit-insolite.jpg",
    imageAlt: "Cabine principale du yacht préparée pour une nuit insolite en couple",
    href: "/nuits-insolites",
    cta: "Découvrir la nuit insolite",
  },
];

export default function HomePage() {
  const hasHeroVideo = existsSync(join(process.cwd(), "public/videos/hero.mp4"));

  return (
    <main>
      <StickyCta />

      {/* ── Embarquement immédiat : hero cinématique ─────────────────── */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <Parallax className="absolute inset-0">
          <Image
            src="/images/hero-sillage-coucher-soleil.jpg"
            alt="Sillage doré au coucher du soleil vu depuis le pont arrière d'un yacht au large de Carnon"
            fill
            priority
            sizes="100vw"
            className="ken-burns object-cover"
          />
          {hasHeroVideo && <HeroVideo />}
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-marine-400/90 via-marine-400/30 to-marine-400/10" />

        <HeroContent className="container relative z-10 pb-24 pt-40 md:pb-28">
          <HeroItem>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-brass">
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
              <Button href="/sorties" variant="primary">
                Réserver une sortie
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                href="/nuits-insolites"
                variant="outline"
                className="text-sable border-sable/60 hover:bg-sable/10"
              >
                Une nuit insolite
              </Button>
            </Magnetic>
          </HeroItem>
          <HeroItem>
            <p className="mt-5 text-[0.7rem] uppercase tracking-[0.2em] text-sable/60">
              Capitaine & carburant inclus · Report gratuit en cas de météo
            </p>
          </HeroItem>
        </HeroContent>

        <div
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-sable/70 md:flex"
          aria-hidden="true"
        >
          <span className="text-[0.6rem] uppercase tracking-[0.3em]">La traversée commence</span>
          <span className="block h-10 w-px animate-pulse bg-gradient-to-b from-sable/0 via-sable/70 to-sable/0" />
        </div>
      </section>

      {/* ── Le choix : jour ou nuit ──────────────────────────────────── */}
      <TraverseeChooser />

      {/* ── La traversée : le fond vit du jour à la nuit ─────────────── */}
      <VoyageSun />
      <VoyageScroller>
        {/* 14h00 — L'embarquement (sable) */}
        <section data-voyage-bg="#F7F3EA" className="py-24 md:py-32">
          <div className="container">
            <ChapterHeader
              time="14h00"
              chapter="L'embarquement"
              title="Trois gestes, et vous êtes en mer."
            />

            <StaggerGroup className="mt-14 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8">
              {STEPS.map((step) => (
                <StaggerItem key={step.number}>
                  <div className="border-t border-brass/40 pt-6">
                    <span className="font-serif text-5xl italic text-brass-400/60 md:text-6xl">
                      {step.number}
                    </span>
                    <h3 className="mt-4 font-serif text-xl text-marine">{step.title}</h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-marine/70">
                      {step.text}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <div className="mt-20 md:mt-24">
            <MarqueeBand />
          </div>
        </section>

        {/* 15h30 — Le grand bleu (bleu jour) */}
        <section data-voyage-bg="#1C2C46" className="py-24 text-sable md:py-32">
          <div className="container">
            <ChapterHeader
              time="15h30"
              chapter="Le grand bleu"
              title="Votre moment, votre équipage."
              tone="dark"
            />
          </div>

          <PinnedHorizontal
            className="relative mt-14 md:mt-20"
            trackClassName="px-6 md:px-[max(1.5rem,calc((100vw-1120px)/2+1.5rem))]"
          >
            {EXPERIENCES.map((xp) => (
              <Link
                key={xp.number}
                href={xp.href}
                className="group relative flex h-[480px] w-[82vw] shrink-0 snap-start flex-col justify-end overflow-hidden sm:w-[420px] md:h-[540px] md:w-[34vw] md:min-w-[440px]"
              >
                <Image
                  src={xp.image}
                  alt={xp.imageAlt}
                  fill
                  sizes="(min-width: 768px) 40vw, 82vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-marine-400/90 via-marine-400/25 to-marine-400/10 transition-colors duration-500 group-hover:from-marine-400/95" />
                <span className="absolute left-6 top-6 font-serif text-5xl italic text-sable/45 md:text-6xl">
                  {xp.number}
                </span>
                <div className="relative p-6 md:p-8">
                  <h3 className="font-serif text-2xl text-sable md:text-3xl">{xp.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-sable/80">
                    {xp.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brass transition-colors group-hover:text-sable">
                    {xp.cta}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </PinnedHorizontal>
        </section>

        {/* 20h30 — L'heure d'or */}
        <section data-voyage-bg="#101B2E" className="py-24 text-sable md:py-32">
          <div className="container grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
            <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden">
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
                title="Un intérieur chaleureux, pensé pour recevoir."
                tone="dark"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-sable/75">
                  Boiseries acajou, banquettes en cuir, table dressée au
                  mouillage pendant que le ciel s&apos;embrase : le yacht
                  Harmonie conjugue le confort d&apos;une maison et la liberté
                  du large. Jusqu&apos;à 12 personnes le jour.
                </p>
                <Magnetic className="mt-8 inline-block">
                  <Button
                    href="/la-flotte"
                    variant="outline"
                    className="text-sable border-sable/40 hover:bg-sable/10"
                  >
                    Découvrir le yacht
                  </Button>
                </Magnetic>
              </Reveal>
            </div>
          </div>

          <div className="mt-20 md:mt-28">
            <SignatureStatement />
          </div>
        </section>

        {/* 23h00 — La nuit à l'ancre (nuit étoilée) */}
        <section data-voyage-bg="#070C15" className="relative py-24 text-sable md:py-36">
          <Stars />
          <div className="container relative">
            <ChapterHeader
              time="23h00"
              chapter="La nuit à l'ancre"
              title="Et quand tout le monde rentre au port, vous restez."
              tone="dark"
            />

            <div className="mt-12 grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-20">
              <Reveal>
                <p className="max-w-lg font-serif text-xl italic leading-relaxed text-sable/85 md:text-2xl">
                  Le silence du large, un ciel sans lumière parasite, le clapot
                  contre la coque — et un réveil face à l&apos;horizon que vous
                  n&apos;oublierez pas.
                </p>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-sable/65">
                  La nuit insolite est notre expérience signature : une cabine
                  préparée pour deux, un mouillage privé au large de Carnon, et
                  le petit-déjeuner servi à bord au lever du soleil.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Magnetic>
                    <Button href="/nuits-insolites" variant="primary">
                      Réserver ma nuit insolite
                    </Button>
                  </Magnetic>
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-sable/50">
                    À partir de 450 € · 2 personnes
                  </p>
                </div>
              </Reveal>
              <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden">
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

      {/* ── La preuve : leurs traversées ─────────────────────────────── */}
      <ReviewsSection />
    </main>
  );
}
