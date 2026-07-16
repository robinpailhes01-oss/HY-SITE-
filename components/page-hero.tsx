import Image from "next/image";
import { HeroContent, HeroItem } from "@/components/motion/hero-content";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export function PageHero({ eyebrow, title, description, image, imageAlt }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[70svh] items-end overflow-hidden md:min-h-[80svh]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-marine-400/90 via-marine-400/40 to-marine-400/10" />
      <HeroContent className="container relative z-10 pb-16 pt-40 md:pb-24">
        <HeroItem>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass">
            {eyebrow}
          </p>
        </HeroItem>
        <HeroItem>
          <h1 className="mt-5 max-w-2xl font-serif text-4xl italic leading-[1.1] text-sable sm:text-5xl">
            {title}
          </h1>
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
