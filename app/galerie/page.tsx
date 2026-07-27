import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { GalleryLightbox } from "@/components/gallery-lightbox";
import { Stars } from "@/components/voyage/stars";
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
  {
    src: "/images/dj-coucher-soleil.jpg",
    alt: "DJ set à bord au coucher du soleil, ambiance pour un EVJF ou un anniversaire",
    size: "tall",
  },
  {
    src: "/images/groupe-poupe-baignade.jpg",
    alt: "Groupe d'amis rassemblé à l'arrière du yacht avant la baignade",
  },
  {
    src: "/images/fruits-de-mer-roses-famille.jpg",
    alt: "Plateau de fruits de mer et bouquet de roses partagés en famille à bord",
  },
  {
    src: "/images/poupe-mouillage-ponton.jpg",
    alt: "Le yacht au mouillage, ponton de bain déployé à l'arrière",
    size: "tall",
  },
  {
    src: "/images/nuit-poupe-crepuscule.jpg",
    alt: "Vue arrière du yacht au crépuscule, ciel embrasé sur l'horizon",
  },
] as const;

export default function GaleriePage() {
  return (
    <main>
      <PageHero
        eyebrow="Le journal"
        moment="crepuscule"
        title="La mer, vue depuis le pont."
        description="Des instants pris à bord, sans mise en scène."
        image="/images/sortie-groupe-jour.jpg"
        imageAlt="Groupe d'amis profitant du ponton gonflable à l'arrière du yacht"
      />

      {/* Fond sombre : les photos respirent, la lumière vient d'elles. */}
      <section className="relative overflow-hidden bg-marine py-24 md:py-32">
        <div className="container relative">
          <GalleryLightbox photos={PHOTOS} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-marine-400 py-24 text-sable md:py-32">
        <Stars />
        <Reveal className="container relative flex flex-col items-center text-center">
          <p className="font-script text-3xl leading-none text-brass sm:text-4xl">
            La prochaine photo
          </p>
          <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight sm:text-4xl">
            La prochaine, c&apos;est vous qui la prenez.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-sable/75">
            Choisissez votre date, on s&apos;occupe de la lumière.
          </p>
          <Magnetic className="mt-10">
            <Button href="/reserver" variant="primary">
              Réserver ma traversée
            </Button>
          </Magnetic>
        </Reveal>
      </section>
    </main>
  );
}
