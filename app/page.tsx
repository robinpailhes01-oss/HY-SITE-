import Image from "next/image";
import Link from "next/link";
import { Anchor, Building2, Moon, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WakeScrollSection } from "@/components/wake-scroll-section";
import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { HeroContent, HeroItem } from "@/components/motion/hero-content";
import { Parallax } from "@/components/motion/parallax";
import { SplitText } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { PinnedHorizontal } from "@/components/motion/pinned-horizontal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Harmonie Yacht — Location de yacht à Carnon, Montpellier",
  description:
    "Harmonie Yacht, créateurs de moments authentiques : sorties en mer à Carnon pour EVJF, anniversaires et entreprises, et nuits insolites à bord au coucher du soleil.",
  path: "/",
});

const EXPERIENCES = [
  {
    icon: Anchor,
    title: "Sorties en mer",
    description:
      "Après-midi ou journée au large de Carnon : EVJF, anniversaires, sorties d'entreprise. Bain, farniente et coucher de soleil à bord.",
    href: "/sorties",
    cta: "Découvrir les sorties",
  },
  {
    icon: Moon,
    title: "Nuits insolites",
    description:
      "Une nuit à deux, ancrés face à l'horizon. Le silence de la mer, le ciel étoilé, et le luxe discret d'un yacht rien que pour vous.",
    href: "/nuits-insolites",
    cta: "Découvrir la nuit insolite",
  },
  {
    icon: Building2,
    title: "Sur-mesure entreprise",
    description:
      "Séminaires, incentives et réceptions privées en mer. Une expérience mémorable pour fédérer vos équipes ou recevoir vos clients.",
    href: "/sorties#entreprise",
    cta: "Organiser un événement",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <Parallax className="absolute inset-0">
          <Image
            src="/images/hero-sillage-coucher-soleil.jpg"
            alt="Sillage doré au coucher du soleil vu depuis le pont arrière d'un yacht au large de Carnon"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-marine-400/90 via-marine-400/30 to-marine-400/10" />

        <HeroContent className="container relative z-10 pb-20 pt-40 md:pb-28">
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
          <HeroItem>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-sable/85 md:text-lg">
              Harmonie Yacht imagine des sorties en mer et des nuits insolites à
              bord, entre Carnon et l&apos;horizon — pour vivre la Méditerranée
              autrement.
            </p>
          </HeroItem>
          <HeroItem className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Magnetic>
              <Button href="/sorties" variant="primary">
                Réserver une sortie
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/nuits-insolites" variant="outline" className="text-sable border-sable/60 hover:bg-sable/10">
                Une nuit insolite
              </Button>
            </Magnetic>
          </HeroItem>
        </HeroContent>
      </section>

      <WakeScrollSection>
        <section className="relative bg-marine py-24 text-sable md:py-32">
          <div className="container">
            <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <Reveal>
                <p className="font-serif text-2xl italic leading-snug text-sable md:text-3xl">
                  &laquo;&nbsp;Créateurs de moments authentiques&nbsp;&raquo; n&apos;est
                  pas qu&apos;une signature : c&apos;est la promesse d&apos;une mer
                  vécue à hauteur d&apos;humain, loin de l&apos;agitation du port.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-base leading-relaxed text-sable/75 md:text-lg">
                  Basé à Carnon, à quelques minutes de Montpellier, Harmonie Yacht
                  met son bateau et son capitaine à votre service pour des
                  moments taillés sur mesure — entre amis pour un EVJF, en
                  famille pour un anniversaire, entre collègues pour un
                  séminaire, ou à deux pour une nuit que vous n&apos;oublierez
                  pas.
                </p>
              </Reveal>
            </div>
          </div>

          <PinnedHorizontal
            className="relative mt-20 md:mt-28"
            trackClassName="px-6 md:px-[max(1.5rem,calc((100vw-1120px)/2+1.5rem))]"
          >
            {EXPERIENCES.map(({ icon: Icon, title, description, href, cta }) => (
              <div
                key={title}
                className="group flex w-[82vw] shrink-0 snap-start flex-col justify-between border border-sable/10 bg-marine-50 p-8 sm:w-[420px] md:w-[34vw] md:min-w-[460px]"
              >
                <div>
                  <Icon className="text-brass" size={28} strokeWidth={1.5} />
                  <h2 className="mt-6 font-serif text-xl text-sable">{title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-sable/70">
                    {description}
                  </p>
                </div>
                <Link
                  href={href}
                  className="mt-8 inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-brass transition-colors group-hover:text-terracotta-100"
                >
                  {cta} →
                </Link>
              </div>
            ))}
          </PinnedHorizontal>
        </section>

        <section className="relative overflow-hidden bg-sable py-24 md:py-32">
          <div className="container grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
            <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden md:order-2">
              <Image
                src="/images/salon-interieur.jpg"
                alt="Salon intérieur du yacht Harmonie Yacht, boiseries acajou et banquette en cuir crème"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
            <Reveal className="md:order-1">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass-400">
                À bord
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-marine md:text-4xl">
                Un intérieur chaleureux, pensé pour recevoir.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-marine/70">
                Boiseries acajou, banquettes en cuir, table dressée pour vos
                repas au mouillage : le yacht Harmonie conjugue le confort
                d&apos;une maison et la liberté du large. Jusqu&apos;à 12
                personnes le jour, ou en tête-à-tête pour la nuit.
              </p>
              <Magnetic className="mt-8 inline-block">
                <Button href="/la-flotte" variant="outline" className="text-marine border-marine/30 hover:bg-marine/5">
                  Découvrir la flotte
                </Button>
              </Magnetic>
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden bg-marine py-24 text-sable md:py-32">
          <div className="container">
            <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:items-center">
              <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/images/sortie-groupe-jour.jpg"
                  alt="Groupe d'amis au ponton gonflable à l'arrière du yacht, journée ensoleillée au large de Carnon"
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </ImageReveal>
              <Reveal>
                <Quote className="text-brass" size={32} strokeWidth={1.5} />
                <p className="mt-6 font-serif text-2xl italic leading-snug text-sable md:text-3xl">
                  Carnon, porte d&apos;entrée sur la Méditerranée — à dix
                  minutes de Montpellier, à une éternité du quotidien.
                </p>
                <p className="mt-6 max-w-md text-base leading-relaxed text-sable/75">
                  Embarquement au port de Carnon, cadre à quelques encablures de
                  la plage : le rendez-vous idéal pour commencer une sortie
                  entre amis ou une escapade à deux.
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </WakeScrollSection>

      <section className="relative overflow-hidden bg-marine py-24 text-center text-sable md:py-32">
        <Reveal className="container relative z-10 flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass">
            Réservation
          </p>
          <h2 className="mt-5 max-w-xl font-serif text-3xl leading-tight md:text-4xl">
            Réservez votre moment sur l&apos;eau.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-sable/75">
            Places limitées chaque semaine — écrivez-nous pour vérifier les
            disponibilités à Carnon.
          </p>
          <Magnetic className="mt-10 inline-block">
            <Button href="/contact" variant="primary">
              Nous contacter
            </Button>
          </Magnetic>
        </Reveal>
      </section>
    </main>
  );
}
