import Image from "next/image";
import Link from "next/link";
import { Anchor, ArrowRight, Check, Fuel, LifeBuoy, Music, ShieldAlert } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { ChapterHeader } from "@/components/voyage/chapter-header";
import { Stars } from "@/components/voyage/stars";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tarifs",
  description:
    "Tarifs des sorties en mer et nuits insolites Harmonie Yacht au départ de Carnon : coucher de soleil, après-midi, journée, nuit à bord. Capitaine et carburant inclus.",
  path: "/tarifs",
  image: "/images/exterieur-coucher-soleil.jpg",
});

interface Journee {
  id: string;
  name: string;
  duration: string;
  price: string;
  guests: string;
  detail: string;
  /** La formule la plus réservée — mise en avant, pas survendue. */
  featured?: boolean;
}

interface Location {
  duration: string;
  moment?: string;
  withCaptain: number;
  withoutCaptain: number;
}

/** Location courte, à l'heure — avec ou sans capitaine (obligation légale). */
const LOCATIONS: Location[] = [
  { duration: "2 heures", withCaptain: 380, withoutCaptain: 266 },
  { duration: "2 heures", moment: "au coucher de soleil", withCaptain: 350, withoutCaptain: 245 },
  { duration: "3 heures", withCaptain: 550, withoutCaptain: 385 },
  { duration: "4 heures", withCaptain: 750, withoutCaptain: 525 },
];

/** Les trois façons de passer la journée, de la plus courte à la plus longue. */
const JOURNEES: Journee[] = [
  {
    id: "coucher-de-soleil",
    name: "Coucher de soleil",
    duration: "3 heures",
    price: "380 €",
    guests: "Jusqu'à 10 personnes",
    detail:
      "Départ en fin d'après-midi, quand la lumière devient rasante. On coupe le moteur au large pour l'apéritif, et on rentre à la nuit tombante.",
  },
  {
    id: "apres-midi",
    name: "Après-midi",
    duration: "4 heures",
    price: "590 €",
    guests: "Jusqu'à 12 personnes",
    detail:
      "Le format que l'on réserve le plus : le temps de rejoindre un mouillage tranquille, de se baigner, de sortir le ponton, et de rentrer avant le couchant.",
    featured: true,
  },
  {
    id: "journee",
    name: "Journée",
    duration: "8 heures",
    price: "990 €",
    guests: "Jusqu'à 12 personnes",
    detail:
      "On part le matin et on ne regarde plus l'heure. Déjeuner au mouillage, sieste sur le pont, deuxième baignade — la mer sans compter.",
  },
];

/** Ce qui ne se facture jamais en supplément — dit une fois, clairement. */
const INCLUS = [
  { icon: Anchor, label: "Le capitaine", detail: "Il barre, vous profitez." },
  { icon: Fuel, label: "Le carburant", detail: "Compris dans la durée réservée." },
  { icon: Music, label: "Sono & ponton de bain", detail: "Bluetooth, échelle de mer." },
  { icon: LifeBuoy, label: "Sécurité", detail: "Gilets pour tous à bord." },
];

const FAQ = [
  {
    q: "Que se passe-t-il si la météo est mauvaise ?",
    a: "On ne sort jamais dans le doute. Si les conditions ne sont pas bonnes, on reporte à une date qui vous arrange, sans frais — ou on vous rembourse. C'est la seule règle qui ne se négocie pas.",
  },
  {
    q: "Faut-il verser un acompte ?",
    a: "Un acompte confirme la date et la bloque pour vous. Le solde se règle le jour de la sortie, à bord.",
  },
  {
    q: "Peut-on apporter à manger et à boire ?",
    a: "Bien sûr, la glacière et la verrerie sont à bord. Et si vous préférez ne penser à rien, notre partenaire prépare des plateaux de tapas à récupérer au port.",
  },
  {
    q: "EVJF, anniversaire, entreprise : c'est le même tarif ?",
    a: "La base est la même. Au-delà, on chiffre ce que vous voulez ajouter — décoration, traiteur, animation, facturation entreprise. Dites-nous l'occasion, on vous répond avec un prix ferme.",
  },
];

export default function TarifsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Le carnet de bord"
        moment="plein-jour"
        title="Ce que coûte une traversée."
        description="Trois façons de passer la journée en mer, et une de ne pas rentrer."
        image="/images/exterieur-coucher-soleil.jpg"
        imageAlt="Yacht Harmonie Yacht au coucher du soleil au large de Carnon"
      />

      {/* ── Plein jour : les trois journées ──────────────────────────── */}
      <section className="bg-sable py-24 md:py-32">
        <div className="container">
          <ChapterHeader
            chapter="La journée"
            title="Trois façons de passer la journée en mer."
          />

          <div className="mt-14 overflow-hidden border border-marine/10 md:mt-16">
            <div className="hidden bg-marine px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-sable/70 sm:grid sm:grid-cols-[2fr_1fr_1fr_1fr_auto] sm:gap-4 sm:px-8">
              <span>Formule</span>
              <span className="text-right">Durée</span>
              <span className="text-right">Tarif</span>
              <span className="text-right">Personnes</span>
              <span />
            </div>
            <StaggerGroup>
              {JOURNEES.map((f) => (
                <StaggerItem key={f.id}>
                  <Link
                    href={`/reserver?experience=jour&formule=${f.id}`}
                    className={`group grid grid-cols-2 items-center gap-x-4 gap-y-3 border-t border-marine/10 px-6 py-6 transition-colors sm:grid-cols-[2fr_1fr_1fr_1fr_auto] sm:px-8 ${
                      f.featured ? "bg-marine text-sable hover:bg-marine-400" : "bg-sable-50 text-marine hover:bg-sable-200"
                    }`}
                  >
                    <div className="col-span-2 sm:col-span-1">
                      <div className="flex items-center gap-3">
                        <p className="font-serif text-xl">{f.name}</p>
                        {f.featured && (
                          <span className="font-script text-lg leading-none text-brass">le plus choisi</span>
                        )}
                      </div>
                      <p className={`mt-1 text-sm leading-relaxed ${f.featured ? "text-sable/75" : "text-marine/65"}`}>
                        {f.detail}
                      </p>
                    </div>
                    <p className="text-left text-sm sm:text-right sm:text-base">{f.duration}</p>
                    <p className={`text-left font-serif text-2xl sm:text-right ${f.featured ? "text-brass" : "text-brass-400"}`}>
                      {f.price}
                    </p>
                    <p className="text-left text-sm sm:text-right sm:text-base">{f.guests}</p>
                    <div className="col-span-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] sm:col-span-1 sm:justify-end">
                      Choisir
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          {/* Dit une fois, en clair : ce qu'on ne vous refacturera pas. */}
          <StaggerGroup className="mt-16 grid gap-8 border-t border-brass/30 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUS.map((item) => (
              <StaggerItem key={item.label}>
                <div className="flex items-start gap-3">
                  <item.icon size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-brass-400" />
                  <div>
                    <p className="text-sm font-semibold text-marine">{item.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-marine/70">{item.detail}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <p className="mt-10 max-w-xl text-xs leading-relaxed text-marine/60">
            Tarifs de base pour la durée indiquée, au départ du port de Carnon.
            Les EVJF, anniversaires de groupe et événements d&apos;entreprise
            font l&apos;objet d&apos;un devis — on chiffre exactement ce que
            vous ajoutez, rien d&apos;autre.
          </p>
        </div>
      </section>

      {/* ── Location à l'heure, avec ou sans capitaine ────────────────── */}
      <section className="bg-sable-200 py-24 md:py-32">
        <div className="container">
          <ChapterHeader
            chapter="Location"
            title="À l'heure, avec ou sans capitaine."
          />
          <Reveal delay={0.05}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-marine/70">
              Pour une envie plus courte, le bateau se loue aussi à l&apos;heure.
              Avec capitaine par défaut — et, comme la loi nous y oblige, en
              location libre pour les skippers qualifiés.
            </p>
          </Reveal>

          <div className="mt-12 overflow-hidden border border-marine/10">
            <div className="grid grid-cols-3 gap-4 bg-marine px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-sable/70 sm:px-8">
              <span>Durée</span>
              <span className="text-right">Avec capitaine</span>
              <span className="text-right">Sans capitaine</span>
            </div>
            <StaggerGroup>
              {LOCATIONS.map((l) => (
                <StaggerItem key={`${l.duration}-${l.moment ?? "standard"}`}>
                  <div className="grid grid-cols-3 items-center gap-4 border-t border-marine/10 bg-sable-50 px-6 py-5 sm:px-8">
                    <div>
                      <p className="font-serif text-lg text-marine">{l.duration}</p>
                      {l.moment && (
                        <p className="text-xs uppercase tracking-[0.15em] text-marine/55">
                          {l.moment}
                        </p>
                      )}
                    </div>
                    <p className="text-right font-serif text-2xl text-brass-400">
                      {l.withCaptain} €
                    </p>
                    <p className="text-right font-serif text-2xl text-marine/70">
                      {l.withoutCaptain} €
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8 flex items-start gap-4 border border-brass/50 bg-marine px-6 py-6 text-sable sm:px-8">
              <ShieldAlert size={28} className="mt-0.5 shrink-0 text-brass" />
              <p className="text-sm font-semibold leading-relaxed sm:text-base">
                Location sans capitaine réservée aux titulaires du permis
                côtier depuis au moins 5 ans, justifiant de 50 heures de
                navigation sur ce type de navire.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── La nuit : elle ne se range pas dans une grille ────────────── */}
      <section className="relative overflow-hidden bg-marine py-24 text-sable md:py-32">
        <Stars />
        <div className="container relative grid gap-12 md:grid-cols-[1fr_0.85fr] md:items-center md:gap-20">
          <div>
            <ChapterHeader
              chapter="La nuit"
              title="Et une façon de ne pas rentrer."
              tone="dark"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-sable/75">
                La nuit insolite ne se compare pas aux autres formules, alors on
                ne l&apos;a pas mise dans le même tableau. Vous embarquez à 18h,
                vous dînez face au couchant, vous dormez au mouillage, et le
                petit-déjeuner arrive avec le soleil.
              </p>

              <div className="mt-10 overflow-hidden border border-sable/15">
                <div className="grid grid-cols-3 gap-4 bg-sable/[0.06] px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-sable/60">
                  <span>Durée</span>
                  <span className="text-right">Tarif</span>
                  <span className="text-right">Personnes</span>
                </div>
                <div className="grid grid-cols-3 items-center gap-4 border-t border-sable/15 px-6 py-5">
                  <p className="text-sm sm:text-base">18h → 10h</p>
                  <p className="text-right font-serif text-3xl text-brass">350 €</p>
                  <p className="text-right text-sm sm:text-base">2 pers.</p>
                </div>
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-sable/50">
                Tout compris — le détail ci-dessous
              </p>

              <ul className="mt-8 space-y-3 text-sm leading-relaxed text-sable/80">
                {[
                  "Sortie en mer d'une heure et coucher de soleil compris",
                  "Tapas de notre partenaire Una Mas à l'ancre",
                  "Mouillage privé au large de Carnon",
                  "Cabine préparée, literie et linge de bain fournis",
                  "Plateau de petit-déjeuner de l'Hôtel Neptune servi à bord",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check size={16} className="mt-0.5 shrink-0 text-brass" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Magnetic className="mt-10 inline-block">
                <Button href="/reserver?experience=nuit" variant="primary">
                  Réserver une nuit
                </Button>
              </Magnetic>
            </Reveal>
          </div>

          <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/images/cabine-lit-nuit-insolite.jpg"
              alt="Cabine principale du yacht préparée pour une nuit insolite à l'ancre"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </ImageReveal>
        </div>
      </section>

      {/* ── Les questions qu'on nous pose vraiment ────────────────────── */}
      <section className="bg-marine-400 py-24 text-sable md:py-32">
        <div className="container max-w-3xl">
          <ChapterHeader
            chapter="Avant de réserver"
            title="Les questions qu'on nous pose vraiment."
            tone="dark"
          />
          <StaggerGroup className="mt-12 space-y-8">
            {FAQ.map(({ q, a }) => (
              <StaggerItem key={q}>
                <div className="border-b border-sable/15 pb-8">
                  <p className="font-serif text-lg">{q}</p>
                  <p className="mt-3 text-sm leading-relaxed text-sable/75">{a}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="mt-16 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-sm leading-relaxed text-sable/70">
              Il reste une question ? Écrivez-nous, on répond nous-mêmes — pas
              de standard, pas de formulaire qui se perd.
            </p>
            <Magnetic>
              <Button
                href="/contact"
                variant="outline"
                className="shrink-0 border-sable/40 text-sable hover:bg-sable/10"
              >
                Poser une question
              </Button>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
