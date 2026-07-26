import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { VoyageScroller } from "@/components/voyage/voyage-scroller";
import { ChapterHeader } from "@/components/voyage/chapter-header";
import { Stars } from "@/components/voyage/stars";
import { ExperienceFacts } from "@/components/experience/experience-facts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Nuit insolite à bord — le déroulé heure par heure",
  description:
    "De l'embarquement à 18h au petit-déjeuner face au lever du soleil : vivez le déroulé complet d'une nuit insolite à deux à bord d'un yacht ancré au large de Carnon.",
  path: "/nuits-insolites",
  image: "/images/cabine-lit-nuit-insolite.jpg",
});

export default function NuitsInsolitesPage() {
  return (
    <main>
      <PageHero
        eyebrow="La nuit insolite"
        time="18h00"
        moment="heure-doree"
        title="Une nuit à deux, ancrés face à l'horizon."
        description="Heure par heure, la nuit que vous allez vivre."
        image="/images/exterieur-coucher-soleil.jpg"
        imageAlt="Le yacht Harmonie Yacht au mouillage au large de Carnon, au coucher du soleil"
      />

      <ExperienceFacts
        facts={[
          { label: "Horaires", value: "18h00 → 10h00" },
          { label: "Équipage", value: "2 personnes" },
          { label: "Tarif", value: "Dès 350 €" },
          { label: "Départ", value: "Port de Carnon" },
        ]}
      />

      <VoyageScroller>
        {/* 18h00 — L'embarquement (fin d'après-midi dorée) */}
        <section
          data-voyage-bg="#EFE7D4"
          data-snap
          className="flex min-h-[100svh] items-center py-24 md:py-28"
        >
          <div className="container grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
            <div>
              <ChapterHeader
                time="18h00"
                chapter="L'embarquement"
                title="Le port s'éloigne, la soirée commence."
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-marine/75">
                  Accueil au port de Carnon par votre capitaine, verre de
                  bienvenue, et cap sur le large pendant que la lumière
                  devient dorée. Vos affaires sont déjà à bord — vous
                  n&apos;avez plus rien à gérer.
                </p>
              </Reveal>
            </div>
            <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/exterieur-coucher-soleil.jpg"
                alt="Le yacht quitte le port de Carnon dans la lumière dorée de fin d'après-midi"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </section>

        {/* 19h30 — Coucher de soleil & tapas (embrasement) */}
        <section
          data-voyage-bg="#8A4023"
          data-snap
          className="flex min-h-[100svh] items-center py-24 md:py-28 text-sable"
        >
          <div className="container grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
            <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden md:order-2">
              <Image
                src="/images/tapas-coucher-soleil.jpg"
                alt="Planche de tapas et coupes de champagne sur la table du yacht face au coucher de soleil"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
            <div className="md:order-1">
              <ChapterHeader
                time="19h30"
                chapter="L'heure d'or"
                title="Tapas et bulles face au soleil qui tombe."
                tone="dark"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-sable/80">
                  Au mouillage, la table se dresse : planche de tapas
                  préparée par notre partenaire local, champagne frais, et le
                  plus beau spectacle de la Méditerranée en toile de fond.
                  Baignade dorée pour les plus téméraires.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* 22h30 — La nuit sur l'eau */}
        <section
          data-voyage-bg="#070C15"
          data-snap
          className="relative flex min-h-[100svh] items-center py-24 md:py-28 text-sable"
        >
          <Stars />
          <div className="container relative grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
            <div>
              <ChapterHeader
                time="22h30"
                chapter="La nuit sur l'eau"
                title="Le silence, les étoiles, et vous deux."
                tone="dark"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-sable/75">
                  Loin des lumières de la côte, le ciel se découvre comme
                  nulle part ailleurs. La cabine vous attend — literie
                  préparée, lumière tamisée — bercés par le clapot contre la
                  coque.
                </p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-sable/55">
                  Le capitaine reste joignable toute la nuit. Mouillage
                  choisi selon la météo pour une nuit parfaitement calme.
                </p>
              </Reveal>
            </div>
            <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/cabine-lit-nuit-insolite.jpg"
                alt="La cabine du yacht dans la pénombre, prête pour la nuit à l'ancre"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </section>

        {/* 08h00 — Le réveil (aube) */}
        <section
          data-voyage-bg="#F2E4D4"
          data-snap
          className="flex min-h-[100svh] items-center py-24 md:py-28"
        >
          <div className="container grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
            <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden md:order-2">
              <Image
                src="/images/petit-dejeuner-bord.jpg"
                alt="Plateau de petit-déjeuner servi sur le pont du yacht au lever du soleil"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
            <div className="md:order-1">
              <ChapterHeader
                time="08h00"
                chapter="Le réveil"
                title="Petit-déjeuner face au lever du soleil."
              />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-base leading-relaxed text-marine/75">
                  Plateau de petit-déjeuner servi sur le pont — viennoiseries,
                  jus frais, café chaud — pendant que le soleil se lève sur
                  une mer déserte. Baignade du matin pour les lève-tôt, puis
                  retour paisible vers le port de Carnon.
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </VoyageScroller>

      <section className="bg-sable-200 py-24 text-center md:py-32">
        <Reveal className="container flex flex-col items-center">
          <p className="font-script text-3xl text-brass-400 sm:text-4xl">
            Votre nuit vous attend
          </p>
          <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-marine md:text-4xl">
            Offrez-vous une nuit hors du temps.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-marine/70">
            Places limitées : les nuits insolites se réservent plusieurs
            semaines à l&apos;avance en haute saison.
          </p>
          <Magnetic className="mt-10 inline-block">
            <Button href="/reserver?experience=nuit" variant="primary">
              Réserver ma nuit insolite
            </Button>
          </Magnetic>
          <p className="mt-4 text-[0.7rem] uppercase tracking-[0.2em] text-marine/50">
            Dès 350 € · Report gratuit en cas de météo défavorable
          </p>
        </Reveal>
      </section>
    </main>
  );
}
