import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Tarifs indicatifs des sorties en mer et nuits insolites Harmonie Yacht au départ de Carnon : après-midi, journée, coucher de soleil, nuit à bord.",
};

const FORMULES = [
  {
    name: "Coucher de soleil",
    duration: "3 heures",
    price: "À partir de 390 €",
    features: [
      "Jusqu'à 10 personnes",
      "Capitaine inclus",
      "Boissons non incluses",
    ],
  },
  {
    name: "Après-midi",
    duration: "4 heures",
    price: "À partir de 590 €",
    features: [
      "Jusqu'à 12 personnes",
      "Capitaine et carburant inclus",
      "Ponton de bain et sono à bord",
    ],
    featured: true,
  },
  {
    name: "Journée",
    duration: "8 heures",
    price: "À partir de 990 €",
    features: [
      "Jusqu'à 12 personnes",
      "Capitaine et carburant inclus",
      "Escale déjeuner au mouillage",
    ],
  },
  {
    name: "Nuit insolite",
    duration: "Une nuit, en couple",
    price: "À partir de 450 €",
    features: [
      "2 personnes",
      "Mouillage privé pour la nuit",
      "Linge de bain et literie inclus",
    ],
  },
];

const FAQ = [
  {
    q: "Le carburant et le capitaine sont-ils inclus ?",
    a: "Oui, toutes nos formules incluent le capitaine et le carburant pour la durée réservée.",
  },
  {
    q: "Peut-on personnaliser une formule EVJF ou entreprise ?",
    a: "Oui, chaque demande de groupe fait l'objet d'un devis sur mesure selon le nombre de personnes, la durée et les options souhaitées (traiteur, décoration, animation).",
  },
  {
    q: "Que se passe-t-il en cas de mauvaise météo ?",
    a: "La sécurité prime : en cas de conditions défavorables, la sortie est reportée ou remboursée selon nos conditions générales.",
  },
  {
    q: "Faut-il verser un acompte à la réservation ?",
    a: "Un acompte est demandé pour confirmer la réservation, le solde étant réglé le jour de la sortie.",
  },
];

export default function TarifsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Tarifs"
        title="Des formules claires, sans surprise."
        description="Tarifs indicatifs pour vos sorties et nuits à bord — un devis personnalisé pour les EVJF, anniversaires et événements d'entreprise."
        image="/images/exterieur-coucher-soleil.jpg"
        imageAlt="Yacht Harmonie Yacht au coucher du soleil au large de Carnon"
      />

      <section className="bg-sable py-24 md:py-32">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-4">
            {FORMULES.map((f) => (
              <div
                key={f.name}
                className={`flex flex-col justify-between border p-8 ${
                  f.featured
                    ? "border-brass bg-marine text-sable"
                    : "border-marine/10 bg-sable-50 text-marine"
                }`}
              >
                <div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                      f.featured ? "text-brass" : "text-marine/50"
                    }`}
                  >
                    {f.duration}
                  </p>
                  <h2 className="mt-3 font-serif text-2xl">{f.name}</h2>
                  <p className="mt-4 font-serif text-xl text-brass">{f.price}</p>
                  <ul className="mt-6 space-y-3 text-sm leading-relaxed">
                    {f.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check size={16} className="mt-0.5 shrink-0 text-brass" />
                        <span className={f.featured ? "text-sable/85" : "text-marine/70"}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  href="/contact"
                  variant={f.featured ? "primary" : "outline"}
                  className={`mt-8 ${!f.featured ? "border-marine/30 hover:bg-marine/5" : ""}`}
                >
                  Réserver
                </Button>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-marine/50">
            Tarifs indicatifs, susceptibles d&apos;évoluer selon la saison. EVJF,
            anniversaires de groupe et événements d&apos;entreprise font
            l&apos;objet d&apos;un devis personnalisé.
          </p>
        </div>
      </section>

      <section className="bg-marine py-24 text-sable md:py-32">
        <div className="container max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass">
            Questions fréquentes
          </p>
          <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
            Tout ce qu&apos;il faut savoir avant de réserver.
          </h2>
          <div className="mt-12 space-y-8">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="border-b border-sable/15 pb-8">
                <p className="font-serif text-lg">{q}</p>
                <p className="mt-3 text-sm leading-relaxed text-sable/70">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sable py-24 text-center md:py-32">
        <div className="container flex flex-col items-center">
          <h2 className="max-w-xl font-serif text-3xl leading-tight text-marine md:text-4xl">
            Une question sur les tarifs ?
          </h2>
          <Button href="/contact" variant="primary" className="mt-10">
            Demander un devis
          </Button>
        </div>
      </section>
    </main>
  );
}
