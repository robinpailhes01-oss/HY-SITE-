import Image from "next/image";
import { Monogram } from "@/components/monogram";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";

export function SignatureStatement() {
  return (
    <section className="relative overflow-hidden py-24 text-center text-sable md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,147,90,0.1),transparent_60%)]" />

      <div className="container relative flex flex-col items-center">
        <Reveal className="flex w-full items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-sable/50 sm:text-xs">
          <span>Carnon · Méditerranée</span>
          <Monogram className="h-9 w-9 text-brass" />
          <span>Avril — Octobre</span>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 md:mt-14">
          <p className="font-serif text-4xl italic leading-[1.05] sm:text-5xl md:text-6xl">
            L&apos;évasion.
          </p>
          <p className="mt-1 font-serif text-3xl italic leading-[1.05] text-sable/90 sm:text-4xl md:text-5xl">
            Chaque semaine
          </p>
        </Reveal>

        <Reveal delay={0.1} className="relative my-10 md:my-14">
          <div className="pointer-events-none absolute -inset-8 rounded-[50%] border border-dashed border-brass/30 sm:-inset-12" />
          <div
            className="relative aspect-[16/10] w-[75vw] max-w-sm sm:w-[440px]"
            style={{
              maskImage:
                "radial-gradient(ellipse 55% 60% at center, black 55%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 55% 60% at center, black 55%, transparent 100%)",
            }}
          >
            <Image
              src="/images/exterieur-coucher-soleil.jpg"
              alt="Yacht Harmonie Yacht isolé sur une mer calme, vu au loin"
              fill
              sizes="440px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="font-serif text-3xl italic leading-[1.05] text-sable/90 sm:text-4xl md:text-5xl">
            avec <span className="font-script not-italic text-brass">capitaine</span>
          </p>
          <p className="mt-1 font-serif text-4xl italic leading-[1.05] sm:text-5xl md:text-6xl">
            et yacht d&apos;exception.
          </p>
        </Reveal>

        <Magnetic className="mt-12 inline-block md:mt-16">
          <Button href="/sorties" variant="primary">
            Réserver ma sortie
          </Button>
        </Magnetic>
      </div>
    </section>
  );
}
