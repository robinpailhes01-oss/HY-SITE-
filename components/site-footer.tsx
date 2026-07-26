import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram";
import { Monogram } from "@/components/monogram";
import { CONTACT, LEGAL_LINKS, NAV_LINKS } from "@/lib/nav";

export function SiteFooter() {
  return (
    // Le pied de page est le point le plus bas de l'arc : quelle que soit la
    // page, la journée finit toujours au mouillage, dans la nuit.
    <footer className="relative overflow-hidden bg-marine-400 text-sable">
      <p
        className="pointer-events-none select-none whitespace-nowrap px-2 pt-10 text-center font-serif text-[13.5vw] uppercase leading-none tracking-[0.06em] text-sable/[0.05] md:pt-14"
        aria-hidden="true"
      >
        Harmonie Yacht
      </p>
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Monogram className="h-10 w-10 text-brass" />
            <p className="mt-4 font-serif text-2xl tracking-[0.15em] uppercase">
              Harmonie <span className="text-brass">Yacht</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sable/70">
              Créateurs de moments authentiques. Sorties en mer et nuits
              insolites à bord, au départ de Carnon.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Navigation
            </p>
            <ul className="mt-5 space-y-3 text-sm text-sable/80">
              {NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-brass">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-sm text-sable/80">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brass" />
                <span>{CONTACT.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-brass" />
                <a href={`tel:${CONTACT.phoneHref}`} className="transition-colors hover:text-brass">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-brass" />
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-brass">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <InstagramIcon size={16} className="shrink-0 text-brass" />
                <a
                  href={CONTACT.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-brass"
                >
                  {CONTACT.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-sable/10 pt-8 text-xs text-sable/50 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Harmonie Yacht. Tous droits réservés.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-brass">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>Carnon-Plage · Montpellier</p>
        </div>
      </div>
    </footer>
  );
}
