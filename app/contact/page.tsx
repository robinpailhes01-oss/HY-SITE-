import { CalendarCheck, Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/nav";
import { Reveal } from "@/components/motion/reveal";
import { ChapterHeader } from "@/components/voyage/chapter-header";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Une question sur une sortie en mer ou une nuit insolite à Carnon ? Écrivez à Harmonie Yacht, nous répondons nous-mêmes sous 24h.",
  path: "/contact",
  image: "/images/hero-sillage-coucher-soleil.jpg",
});

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Avant de partir"
        time="20h30"
        moment="heure-doree"
        title="Parlons de votre moment en mer."
        description="Écrivez-nous : c'est nous qui lisons, et nous qui répondons."
        image="/images/hero-sillage-coucher-soleil.jpg"
        imageAlt="Sillage doré au coucher du soleil vu depuis le pont arrière du yacht"
      />

      {/* Le raccourci pour ceux qui savent déjà : on ne les fait pas écrire. */}
      <section className="bg-marine-50 py-10 text-sable">
        <Reveal className="container flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <CalendarCheck size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-brass" />
            <p className="max-w-lg text-sm leading-relaxed text-sable/80">
              <span className="font-semibold text-sable">
                Vous savez déjà ce que vous voulez ?
              </span>{" "}
              Passez par la réservation : quatre questions, votre date est
              posée, et vous avez notre réponse sous 24h.
            </p>
          </div>
          <Button
            href="/reserver"
            variant="outline"
            className="shrink-0 border-sable/40 text-sable hover:bg-sable/10"
          >
            Réserver une date
          </Button>
        </Reveal>
      </section>

      <section className="bg-marine py-24 text-sable md:py-32">
        <div className="container grid gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <Reveal>
            <ChapterHeader
              time="22h00"
              chapter="Nos coordonnées"
              title="Rendez-vous au port de Carnon."
              tone="dark"
            />

            <ul className="mt-10 space-y-6 text-base text-sable/85">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-brass" />
                <span>{CONTACT.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="shrink-0 text-brass" />
                <a href={`tel:${CONTACT.phoneHref}`} className="transition-colors hover:text-brass">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0 text-brass" />
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-brass">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <InstagramIcon size={20} className="shrink-0 text-brass" />
                <span>{CONTACT.instagram}</span>
              </li>
            </ul>

            <div className="mt-12 border border-sable/15 bg-sable/[0.04] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
                Quand nous naviguons
              </p>
              <p className="mt-3 text-sm leading-relaxed text-sable/75">
                Sorties du mardi au dimanche, d&apos;avril à octobre. Les nuits
                insolites dépendent de la météo et du mouillage — on vous dit
                franchement quand ce n&apos;est pas la bonne nuit.
              </p>
            </div>
          </Reveal>

          <Reveal className="border border-sable/15 bg-sable/[0.03] p-8 md:p-10" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
