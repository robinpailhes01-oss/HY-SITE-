import { ArrowUpRight } from "lucide-react";
import { REVIEWS } from "@/lib/reviews";
import { CONTACT } from "@/lib/nav";
import { Stars } from "@/components/voyage/stars";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

/**
 * Les avis, en citations plutôt qu'en notes.
 *
 * Pas d'étoiles, pas de cartes, pas de cadres : ★★★★★ appartient au vocabulaire
 * des places de marché, et un encadré transforme un mot d'invité en produit.
 * Une phrase, un filet, un prénom — c'est la forme qu'en donne une maison.
 */
export function ReviewsSection() {
  return (
    <section className="relative overflow-hidden bg-marine-400 py-28 text-sable md:py-36">
      <Stars />
      <div className="container relative">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl font-serif text-3xl italic leading-tight md:text-4xl">
            Ce qu&apos;il en reste, après.
          </h2>
          <a
            href={CONTACT.googleReviewsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-sable/60 transition-colors hover:text-brass"
          >
            Voir tous nos avis Google
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-14 md:mt-20 md:grid-cols-3 md:gap-10">
          {REVIEWS.map((review) => (
            <StaggerItem key={review.name}>
              <figure className="border-t border-sable/20 pt-8">
                <blockquote className="font-serif text-xl italic leading-relaxed text-sable/90">
                  « {review.text} »
                </blockquote>
                <figcaption className="mt-7 text-[0.7rem] uppercase tracking-[0.25em] text-sable/55">
                  {review.name}
                  <span className="ml-2 text-brass">· {review.occasion}</span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
