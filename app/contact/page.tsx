import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { CONTACT } from "@/lib/nav";
import { Reveal } from "@/components/motion/reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contactez Harmonie Yacht pour réserver une sortie en mer ou une nuit insolite au départ de Carnon, près de Montpellier.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre moment en mer."
        description="Une question, une envie de date précise, un groupe à organiser : écrivez-nous, nous revenons vers vous rapidement."
        image="/images/hero-sillage-coucher-soleil.jpg"
        imageAlt="Sillage doré au coucher du soleil vu depuis le pont arrière du yacht"
      />

      <section className="bg-sable py-24 md:py-32">
        <div className="container grid gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brass-400">
              Nos coordonnées
            </p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-marine md:text-4xl">
              Rendez-vous au port de Carnon.
            </h2>

            <ul className="mt-10 space-y-6 text-base text-marine/80">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-brass-400" />
                <span>{CONTACT.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="shrink-0 text-brass-400" />
                <a href={`tel:${CONTACT.phoneHref}`} className="hover:text-brass-400">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0 text-brass-400" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-brass-400">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <InstagramIcon size={20} className="shrink-0 text-brass-400" />
                <span>{CONTACT.instagram}</span>
              </li>
            </ul>

            <div className="mt-12 border border-marine/10 bg-sable-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-marine/65">
                Disponibilités
              </p>
              <p className="mt-3 text-sm leading-relaxed text-marine/70">
                Sorties du mardi au dimanche, d&apos;avril à octobre. Nuits
                insolites sur réservation, selon météo et disponibilités du
                mouillage.
              </p>
            </div>
          </Reveal>

          <Reveal className="border border-marine/10 bg-sable-50 p-8 md:p-10" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
