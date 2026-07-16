import Image from "next/image";
import Link from "next/link";
import { Anchor, Building2, Moon, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WakeScrollSection } from "@/components/wake-scroll-section";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { HeroContent, HeroItem } from "@/components/motion/hero-content";

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
        <Image
          src="/images/hero-sillage-coucher-soleil.jpg"
          alt="Sillage doré au coucher du soleil vu depuis le pont arrière d'un yacht au large de Carnon"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-marine-400/90 via-marine-400/30 to-marine-400/10" />

        <HeroContent className="container relative z-10 pb-20 pt-40 md:pb-28">
          <HeroItem>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.35em] text-brass">
              Carnon · Montpellier
            </p>
          </HeroItem>
          <HeroItem>
            <h1 className="mt-5 max-w-2xl font-serif text-4xl italic leading-[1.1] text-sable sm:text-5xl md:text-6xl">
              Le large, en toute intimité.
            </h1>
          </HeroItem>
          <HeroItem>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-sable/85 md:text-lg">
              Harmonie Yacht imagine des sorties en mer et des nuits insolites à
              bord, entre Carnon et l&apos;horizon — pour vivre la Méditerranée
              autrement.
            </p>
          </HeroItem>
          <HeroItem className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/sorties" variant="primary">
              Réserver une sortie
            </Button>
            <Button href="/nuits-insolites" variant="outline" className="text-sable border-sable/60 hover:bg-sable/10">
              Une nuit insolite
            </Button>
          </HeroItem>
        </HeroContent>
      </section>

      <WakeScrollSection>
        <section className="relative bg-sable py-24 md:py-32">
          <div className="container">
            <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <Reveal>
                <p className="font-serif text-2xl italic leading-snug text-marine md:text-3xl">
                  &laquo;&nbsp;Créateurs de moments authentiques&nbsp;&raquo; n&apos;est
                  pas qu&apos;une signature : c&apos;est la promesse d&apos;une mer
                  vécue à hauteur d&apos;humain, loin de l&apos;agitation du port.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-base leading-relaxed text-marine/75 md:text-lg">
                  Basé à Carnon, à quelques minutes de Montpellier, Harmonie Yacht
                  met son bateau et son capitaine à votre service pour des
                  moments taillés sur mesure — entre amis pour un EVJF, en
                  famille pour un anniversaire, entre collègues pour un
                  séminaire, ou à deux pour une nuit que vous n&apos;oublierez
                  pas.
                </p>
              </Reveal>
            </div>

            <StaggerGroup className="mt-20 grid gap-6 md:mt-28 md:grid-cols-3">
              {EXPERIENCES.map(({ icon: Icon, title, description, href, cta }) => (
                <StaggerItem key={title}>
                  <div className="group flex h-full flex-col justify-between border border-marine/10 bg-sable-50 p-8 transition-colors duration-300 hover:border-brass/50">
                    <div>
                      <Icon className="text-brass-400" size={28} strokeWidth={1.5} />
                      <h2 className="mt-6 font-serif text-xl text-marine">{title}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-marine/70">
                        {description}
                      </p>
                    </div>
                    <Link
                      href={href}
                      className="mt-8 inline-flex items-center text-xs font-semibold uppercase tracking-[0.2em] text-brass-400 transition-colors group-hover:text-terracotta-300"
                    >
                      {cta} →
                    </Link>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section className="relative overflow-hidden bg-marine py-24 text-sable md:py-32">
          <div className="container grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
            <Reveal className="relative aspect-[4/5] w-full overflow-hidden md:order-2" y={32}>
              <Image
                src="/images/salon-interieur.jpg"
                alt="Salon intérieur du yacht Harmonie Yacht, boiseries acajou et banquette en cuir crème"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal className="md:order-1">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass">
                À bord
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-sable md:text-4xl">
                Un intérieur chaleureux, pensé pour recevoir.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-sable/75">
                Boiseries acajou, banquettes en cuir, table dressée pour vos
                repas au mouillage : le yacht Harmonie conjugue le confort
                d&apos;une maison et la liberté du large. Jusqu&apos;à 12
                personnes le jour, ou en tête-à-tête pour la nuit.
              </p>
              <Button href="/la-flotte" variant="outline" className="mt-8 text-sable border-sable/40 hover:bg-sable/10">
                Découvrir la flotte
              </Button>
            </Reveal>
          </div>
        </section>

        <section className="bg-sable py-24 md:py-32">
          <div className="container">
            <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:items-center">
              <Reveal className="relative aspect-[4/5] w-full overflow-hidden" y={32}>
                <Image
                  src="/images/sortie-groupe-jour.jpg"
                  alt="Groupe d'amis au ponton gonflable à l'arrière du yacht, journée ensoleillée au large de Carnon"
                  fill
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </Reveal>
              <Reveal>
                <Quote className="text-brass-400" size={32} strokeWidth={1.5} />
                <p className="mt-6 font-serif text-2xl italic leading-snug text-marine md:text-3xl">
                  Carnon, porte d&apos;entrée sur la Méditerranée — à dix
                  minutes de Montpellier, à une éternité du quotidien.
                </p>
                <p className="mt-6 max-w-md text-base leading-relaxed text-marine/70">
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
          <Button href="/contact" variant="primary" className="mt-10">
            Nous contacter
          </Button>
        </Reveal>
      </section>
    </main>
  );
}
