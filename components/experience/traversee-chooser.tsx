import Image from "next/image";
import Link from "next/link";
import { Stars } from "@/components/voyage/stars";
import { Reveal } from "@/components/motion/reveal";

export function TraverseeChooser() {
  return (
    // La bifurcation du parcours : elle occupe un écran entier, tôt, pour que
    // le visiteur choisisse sa traversée avant de lire quoi que ce soit d'autre.
    <section data-snap className="flex min-h-[100svh] flex-col justify-center py-20 md:py-24">
      <div className="container">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass-400">
            Deux traversées
          </p>
          <h2 className="mt-4 max-w-xl font-serif text-3xl leading-tight text-marine sm:text-4xl md:text-5xl">
            Le jour ou la nuit — choisissez la vôtre.
          </h2>
        </Reveal>
      </div>

      <div className="container mt-8 md:mt-12">
        <div className="flex flex-col gap-4 md:h-[min(560px,60svh)] md:flex-row">
          {/* Le Jour */}
          <Link
            href="/sorties"
            className="chooser-panel group relative flex h-[min(330px,32svh)] flex-col justify-end overflow-hidden md:h-full"
          >
            <Image
              src="/images/sortie-groupe-jour.jpg"
              alt="Sortie en mer de jour : amis au ponton de bain du yacht sous le soleil"
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-marine-400/85 via-marine-300/20 to-brass/20" />
            <div className="relative p-7 md:p-10">
              <p className="font-script text-3xl text-brass md:text-4xl">Le jour</p>
              <h3 className="mt-2 font-serif text-2xl text-sable md:text-3xl">
                Sorties en mer
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-sable/85">
                EVJF, anniversaires, entreprise — baignade au large, musique et
                soleil, jusqu&apos;à 12 personnes.
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-brass">
                Dès 390 € · Je choisis le jour →
              </p>
            </div>
          </Link>

          {/* La Nuit */}
          <Link
            href="/nuits-insolites"
            className="chooser-panel group relative flex h-[min(330px,32svh)] flex-col justify-end overflow-hidden md:h-full"
          >
            <Image
              src="/images/cabine-lit-nuit-insolite.jpg"
              alt="Nuit insolite : cabine du yacht préparée pour deux"
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-marine-400/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-marine-400/95 via-marine-400/40 to-marine-400/20" />
            <Stars />
            <div className="relative p-7 md:p-10">
              <p className="font-script text-3xl text-brass md:text-4xl">La nuit</p>
              <h3 className="mt-2 font-serif text-2xl text-sable md:text-3xl">
                Nuit insolite à bord
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-sable/85">
                À deux, ancrés sous les étoiles — coucher de soleil, tapas,
                nuit sur l&apos;eau et petit-déjeuner au réveil.
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-brass">
                Dès 450 € · Je choisis la nuit →
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
