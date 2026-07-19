import { Suspense } from "react";
import { BookingForm } from "@/components/booking/booking-form";
import { ReviewToast } from "@/components/reviews/review-toast";
import { Reveal } from "@/components/motion/reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Réserver votre traversée",
  description:
    "Réservez votre sortie en mer ou votre nuit insolite à bord en quelques étapes : choisissez votre expérience, votre formule, votre date — nous confirmons sous 24h.",
  path: "/reserver",
});

export default function ReserverPage() {
  return (
    <main className="bg-sable">
      <ReviewToast />
      <section className="pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="container max-w-4xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass-400">
              Réservation
            </p>
            <h1 className="mt-4 font-serif text-3xl italic leading-tight text-marine sm:text-4xl md:text-5xl">
              Réservez votre traversée.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-marine/70">
              Quatre étapes, deux minutes — et nous revenons vers vous sous
              24h pour confirmer la disponibilité.
            </p>
          </Reveal>

          <div className="mt-12 md:mt-16">
            <Suspense fallback={null}>
              <BookingForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
