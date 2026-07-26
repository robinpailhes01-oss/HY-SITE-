import Image from "next/image";
import { Gauge, Ruler, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { WakeScrollSection } from "@/components/wake-scroll-section";
import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Counter } from "@/components/motion/counter";
import { Magnetic } from "@/components/motion/magnetic";
import { ChapterHeader } from "@/components/voyage/chapter-header";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "La flotte",
  description:
    "Découvrez le yacht Harmonie Yacht : caractéristiques, équipements et aménagements intérieurs, au départ de Carnon.",
  path: "/la-flotte",
  image: "/images/exterieur-coucher-soleil.jpg",
});

const SPECS = [
  { icon: Ruler, label: "Longueur", count: 11, suffix: " mètres" },
  { icon: Users, label: "Capacité jour", count: 12, suffix: " personnes" },
  { icon: Gauge, label: "Motorisation", value: "2 x 320 ch" },
  { icon: ShieldCheck, label: "Équipage", value: "Capitaine inclus" },
] as const;

const EQUIPMENT = [
  "Ponton de bain gonflable et échelle de mer",
  "Sonorisation Bluetooth intérieur et extérieur",
  "Cabine climatisée avec lit double",
  "Douche de pont et sanitaires à bord",
  "Glacière, vaisselle et verrerie",
  "Gilets de sauvetage pour tous les passagers",
];

export default function LaFlottePage() {
  return (
    <main>
      <PageHero
        eyebrow="Le bateau"
        moment="plein-jour"
        title="Un yacht, pensé pour recevoir."
        description="Onze mètres, douze invités, et tout ce qu'il faut à bord pour ne penser à rien."
        image="/images/exterieur-coucher-soleil.jpg"
        imageAlt="Vue extérieure du yacht Harmonie Yacht naviguant au coucher du soleil"
      />

      <section className="bg-sable py-20 md:py-24">
        <StaggerGroup className="container grid grid-cols-2 gap-6 md:grid-cols-4">
          {SPECS.map((spec) => (
            <StaggerItem key={spec.label}>
              <div className="border-t border-brass/40 pt-5">
                <spec.icon className="text-brass-400" size={24} strokeWidth={1.5} />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-marine/65">
                  {spec.label}
                </p>
                <p className="mt-1 font-serif text-xl text-marine">
                  {"count" in spec ? (
                    <Counter value={spec.count} suffix={spec.suffix} />
                  ) : (
                    spec.value
                  )}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <WakeScrollSection>
        <section className="bg-sable pb-24 md:pb-32">
          <div className="container grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
            <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/images/salon-interieur.jpg"
                alt="Salon intérieur du yacht avec boiseries acajou, banquette en cuir crème et table ovale"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass-400">
                Le salon
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-marine md:text-4xl">
                L&apos;élégance d&apos;un intérieur cousu main.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-marine/70">
                Le carré intérieur, tout en boiseries acajou et cuir crème,
                offre un abri confortable pour les repas au mouillage ou un
                temps calme à l&apos;abri du soleil. La table s&apos;habille
                pour vos déjeuners comme pour vos dîners aux chandelles.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="relative overflow-hidden bg-marine py-24 text-sable md:py-32">
          <div className="container grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
            <Reveal className="md:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass">
                La cabine
              </p>
              <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
                Une suite face à la mer.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-sable/75">
                Lit double, rangements en bois verni, éclairage tamisé : la
                cabine principale accueille les couples pour une nuit insolite,
                bercée par le clapot du mouillage.
              </p>
            </Reveal>
            <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden md:order-1">
              <Image
                src="/images/cabine-lit-nuit-insolite.jpg"
                alt="Cabine principale avec lit rond et rangements en bois verni"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </section>
      </WakeScrollSection>

      <section className="bg-marine-400 py-24 text-sable md:py-32">
        <Reveal className="container">
          <ChapterHeader
            chapter="Équipements"
            title="Tout est prévu à bord."
            tone="dark"
          />
          <ul className="mt-12 grid gap-x-10 gap-y-4 text-base leading-relaxed text-sable/80 sm:grid-cols-2">
            {EQUIPMENT.map((item) => (
              <li key={item} className="border-b border-sable/15 pb-4">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Magnetic>
              <Button href="/reserver" variant="primary">
                Réserver ce bateau
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                href="/contact"
                variant="outline"
                className="border-sable/40 text-sable hover:bg-sable/10"
              >
                Poser une question
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
