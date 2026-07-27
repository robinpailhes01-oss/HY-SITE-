import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { ChapterHeader } from "@/components/voyage/chapter-header";

/**
 * La visite du bateau.
 *
 * Un client qui hésite ne se demande pas quelle heure il est : il se demande à
 * quoi ressemble le bateau, où il va s'asseoir, où il va dormir. Cette section
 * répond à ça et rien d'autre — de grandes photos, un mot par espace, aucun
 * effet. C'est la pièce qui permet de se projeter avant de réserver.
 */
interface Espace {
  name: string;
  detail: string;
  image: string;
  alt: string;
  /** Tuile pleine largeur, en panoramique. */
  span?: boolean;
  /** Où se trouve le sujet dans la photo, pour les recadrages serrés. */
  position?: string;
}

const ESPACES: Espace[] = [
  {
    name: "Le pont",
    detail: "Bains de soleil à l'avant, cockpit ombragé à l'arrière.",
    image: "/images/exterieur-coucher-soleil.jpg",
    alt: "Le yacht Harmonie Yacht vu de l'extérieur, pont avant et taud arrière, au coucher du soleil",
    span: true,
    position: "object-[center_62%]",
  },
  {
    name: "Le salon",
    detail: "Boiseries acajou, cuir crème, table pour douze.",
    image: "/images/salon-interieur.jpg",
    alt: "Salon intérieur du yacht avec boiseries acajou, banquette en cuir crème et table ovale",
  },
  {
    name: "La cabine",
    detail: "Lit double, climatisation, rangements en bois verni.",
    image: "/images/cabine-lit-nuit-insolite.jpg",
    alt: "Cabine principale du yacht avec lit double et rangements en bois verni",
  },
  {
    name: "Le ponton de bain",
    detail: "Gonflable, avec échelle de mer pour remonter sans effort.",
    image: "/images/groupe-poupe-baignade.jpg",
    alt: "Groupe d'amis rassemblé à l'arrière du yacht, près du ponton de bain gonflable",
    span: true,
    position: "object-[center_58%]",
  },
];

export function BoatTour() {
  return (
    <section className="bg-sable py-24 md:py-32">
      <div className="container">
        <ChapterHeader
          chapter="Le bateau"
          title="Voilà exactement où vous montez."
        />
        <Reveal delay={0.05}>
          <p className="mt-5 max-w-md text-base leading-relaxed text-marine/70">
            Onze mètres, douze invités le jour, deux la nuit. Rien de plus à
            savoir avant de réserver.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
          {ESPACES.map((espace) => (
            <StaggerItem
              key={espace.name}
              className={espace.span ? "md:col-span-2" : undefined}
            >
              <figure className="group relative overflow-hidden">
                <div
                  className={
                    espace.span
                      ? "relative aspect-[4/3] w-full md:aspect-[16/9]"
                      : "relative aspect-[4/3] w-full md:aspect-[4/5]"
                  }
                >
                  <Image
                    src={espace.image}
                    alt={espace.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
                      espace.position ?? ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-marine-400/80 via-marine-400/10 to-transparent" />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="font-serif text-2xl text-sable md:text-3xl">
                    {espace.name}
                  </p>
                  <p className="mt-1 max-w-sm text-sm leading-relaxed text-sable/85">
                    {espace.detail}
                  </p>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Magnetic>
            <Button href="/galerie" variant="outline" className="border-marine/30 hover:bg-marine/5">
              Voir toutes les photos
            </Button>
          </Magnetic>
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-marine/60">
            11 m · 12 personnes le jour · 2 la nuit
          </p>
        </Reveal>
      </div>
    </section>
  );
}
