export const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/nuits-insolites", label: "Nuits insolites" },
  { href: "/sorties", label: "Sorties" },
  { href: "/la-flotte", label: "La flotte" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
] as const;

/** Pied de page uniquement — hors du parcours principal. */
export const LEGAL_LINKS = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV" },
  { href: "/confidentialite", label: "Confidentialité" },
] as const;

export const CONTACT = {
  phone: "+33 6 00 00 00 00",
  phoneHref: "+33600000000",
  // ⚠️ À REMPLACER par le vrai numéro WhatsApp avant mise en ligne — wa.me
  // exige le numéro complet, sans « + » ni espaces.
  whatsappHref: "https://wa.me/33600000000",
  email: "contact@harmonie-yacht.fr",
  instagram: "@harmonieyacht",
  instagramHref: "https://www.instagram.com/harmonieyacht/",
  googleReviewsHref: "https://share.google/3v46qPj5J2gL9OuXA",
  location: "Port de Carnon, 34280 Carnon-Plage",
} as const;
