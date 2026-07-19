import { Star } from "lucide-react";
import { REVIEWS } from "@/lib/reviews";
import { Stars } from "@/components/voyage/stars";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";

export function ReviewsSection() {
  return (
    <section className="relative overflow-hidden bg-marine-400 py-24 text-sable md:py-32">
      <Stars />
      <div className="container relative">
        <Reveal className="text-center">
          <p className="font-script text-3xl text-brass sm:text-4xl">
            Ils ont largué les amarres
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
            Des moments qui restent.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-6 md:mt-16 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <StaggerItem key={review.name}>
              <figure className="flex h-full flex-col justify-between border border-sable/10 bg-marine-300/60 p-8">
                <div>
                  <div className="flex gap-1" aria-label={`${review.rating} étoiles sur 5`}>
                    {Array.from({ length: review.rating }, (_, i) => (
                      <Star key={i} size={14} className="fill-brass text-brass" />
                    ))}
                  </div>
                  <blockquote className="mt-5 font-serif text-lg italic leading-relaxed text-sable/90">
                    « {review.text} »
                  </blockquote>
                </div>
                <figcaption className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-sable/60">
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
