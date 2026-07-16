import Image from "next/image";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Galerie",
  description:
    "Galerie photo Harmonie Yacht : sorties en mer, nuits insolites et vues du yacht au départ de Carnon.",
  path: "/galerie",
  image: "/images/sortie-groupe-jour.jpg",
});

const PHOTOS = [
  {
    src: "/images/hero-sillage-coucher-soleil.jpg",
    alt: "Sillage doré au coucher du soleil vu depuis le pont arrière",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/images/exterieur-coucher-soleil.jpg",
    alt: "Yacht Harmonie Yacht naviguant au coucher du soleil",
    span: "",
  },
  {
    src: "/images/sortie-groupe-jour.jpg",
    alt: "Groupe d'amis au ponton gonflable par une journée ensoleillée",
    span: "",
  },
  {
    src: "/images/salon-interieur.jpg",
    alt: "Salon intérieur du yacht, boiseries acajou et banquette en cuir crème",
    span: "",
  },
  {
    src: "/images/cabine-lit-nuit-insolite.jpg",
    alt: "Cabine principale avec lit rond, préparée pour une nuit insolite",
    span: "",
  },
];

export default function GaleriePage() {
  return (
    <main>
      <PageHero
        eyebrow="Galerie"
        title="La mer, vue depuis le pont."
        description="Quelques instants capturés à bord — sorties entre amis, nuits insolites et lumières de Carnon."
        image="/images/sortie-groupe-jour.jpg"
        imageAlt="Groupe d'amis profitant du ponton gonflable à l'arrière du yacht"
      />

      <section className="bg-sable py-24 md:py-32">
        <div className="container">
          <StaggerGroup className="grid auto-rows-[16rem] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-[14rem]">
            {PHOTOS.map((photo) => (
              <StaggerItem key={photo.src} className={`relative overflow-hidden ${photo.span}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="mt-16 flex flex-col items-center text-center">
            <p className="max-w-md text-base leading-relaxed text-marine/70">
              Envie de vivre votre propre moment à bord ? Réservez votre
              sortie ou votre nuit insolite dès aujourd&apos;hui.
            </p>
            <Button href="/contact" variant="primary" className="mt-8">
              Réserver
            </Button>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
