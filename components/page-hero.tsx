import Image from "next/image";
import { HeroContent, HeroItem } from "@/components/motion/hero-content";
import { Parallax } from "@/components/motion/parallax";
import { SplitText } from "@/components/motion/split-text";
import { AMBIANCE, type Moment } from "@/lib/ambiance";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Où cette page entre dans l'arc de la journée. Pilote le voile sur la photo. */
  moment?: Moment;
  /** Heure du journal de bord — relie la page au récit de l'accueil. */
  time?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  moment = "plein-jour",
  time,
}: PageHeroProps) {
  const ambiance = AMBIANCE[moment];

  return (
    <section className="relative flex min-h-[70svh] items-end overflow-hidden md:min-h-[80svh]">
      <Parallax className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </Parallax>
      <div className={`absolute inset-0 ${ambiance.heroOverlay}`} />
      {/* Le voile d'ambiance donne le ton ; celui-ci garantit la lisibilité.
          Ancré sous le bloc de texte, et plus haut sur mobile où le cadrage
          serré fait remonter de l'eau claire derrière le titre. */}
      <div
        className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-marine-400/85 via-marine-400/50 to-transparent md:h-1/2 md:from-marine-400/75 md:via-marine-400/30"
        aria-hidden="true"
      />

      <HeroContent className="container relative z-10 pb-16 pt-40 md:pb-24">
        <HeroItem>
          {/* Le même gabarit que les chapitres de l'accueil : heure, filet, nom
              du moment. C'est ce qui fait qu'on reste dans la même traversée. */}
          <div className="flex items-baseline gap-4">
            {time && (
              <>
                <span className="font-serif text-xl italic tabular-nums text-brass md:text-2xl">
                  {time}
                </span>
                <span className="h-px w-12 bg-sable/30" aria-hidden="true" />
              </>
            )}
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-sable/70 sm:text-xs">
              {eyebrow}
            </span>
          </div>
        </HeroItem>
        <HeroItem>
          <SplitText
            as="h1"
            text={title}
            className="mt-5 max-w-2xl font-serif text-4xl italic leading-[1.1] text-sable sm:text-5xl"
          />
        </HeroItem>
        <HeroItem>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-sable/85 md:text-lg">
            {description}
          </p>
        </HeroItem>
      </HeroContent>
    </section>
  );
}
