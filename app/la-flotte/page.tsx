import type { Metadata } from "next";
import Image from "next/image";
import { Gauge, Ruler, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "La flotte",
  description:
    "Découvrez le yacht Harmonie Yacht : caractéristiques, équipements et aménagements intérieurs, au départ de Carnon.",
};

const SPECS = [
  { icon: Ruler, label: "Longueur", value: "11 mètres" },
  { icon: Users, label: "Capacité jour", value: "12 personnes" },
  { icon: Gauge, label: "Motorisation", value: "2 x 320 ch" },
  { icon: ShieldCheck, label: "Équipage", value: "Capitaine inclus" },
];

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
        eyebrow="La flotte"
        title="Un yacht, pensé pour recevoir."
        description="Boiseries acajou, banquettes en cuir et pont spacieux : découvrez les aménagements du yacht Harmonie."
        image="/images/exterieur-coucher-soleil.jpg"
        imageAlt="Vue extérieure du yacht Harmonie Yacht naviguant au coucher du soleil"
      />

      <section className="bg-sable py-20 md:py-24">
        <div className="container grid grid-cols-2 gap-6 md:grid-cols-4">
          {SPECS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="border-t border-brass/40 pt-5">
              <Icon className="text-brass" size={24} strokeWidth={1.5} />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-marine/50">
                {label}
              </p>
              <p className="mt-1 font-serif text-xl text-marine">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sable pb-24 md:pb-32">
        <div className="container grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/salon-interieur.jpg"
              alt="Salon intérieur du yacht avec boiseries acajou, banquette en cuir crème et table ovale"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass">
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
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-marine py-24 text-sable md:py-32">
        <div className="container grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
          <div className="md:order-2">
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
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden md:order-1">
            <Image
              src="/images/cabine-lit-nuit-insolite.jpg"
              alt="Cabine principale avec lit rond et rangements en bois verni"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-sable py-24 md:py-32">
        <div className="container">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass">
            Équipements
          </p>
          <h2 className="mt-5 max-w-xl font-serif text-3xl leading-tight text-marine md:text-4xl">
            Tout est prévu à bord.
          </h2>
          <ul className="mt-12 grid gap-x-10 gap-y-4 text-base leading-relaxed text-marine/75 sm:grid-cols-2">
            {EQUIPMENT.map((item) => (
              <li key={item} className="border-b border-marine/10 pb-4">
                {item}
              </li>
            ))}
          </ul>
          <Button href="/contact" variant="primary" className="mt-12">
            Poser une question
          </Button>
        </div>
      </section>
    </main>
  );
}
