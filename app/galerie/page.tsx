import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { GalleryLightbox } from "@/components/gallery-lightbox";
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
    size: "feature",
  },
  {
    src: "/images/exterieur-coucher-soleil.jpg",
    alt: "Yacht Harmonie Yacht naviguant au coucher du soleil",
    size: "tall",
  },
  {
    src: "/images/sortie-groupe-jour.jpg",
    alt: "Groupe d'amis au ponton gonflable par une journée ensoleillée",
  },
  {
    src: "/images/salon-interieur.jpg",
    alt: "Salon intérieur du yacht, boiseries acajou et banquette en cuir crème",
  },
  {
    src: "/images/cabine-lit-nuit-insolite.jpg",
    alt: "Cabine principale avec lit rond, préparée pour une nuit insolite",
  },
] as const;

export default function GaleriePage() {
  return (
    <main>
      <PageHero
        eyebrow="Galerie"
        title="La mer, vue depuis le pont."
        description="Quelques instants capturés à bord — sorties entre amis, nuits insolites et lumières de Carnon. Cliquez une photo pour l'agrandir."
        image="/images/sortie-groupe-jour.jpg"
        imageAlt="Groupe d'amis profitant du ponton gonflable à l'arrière du yacht"
      />

      <section className="bg-sable py-24 md:py-32">
        <div className="container">
          <GalleryLightbox photos={PHOTOS} />

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
