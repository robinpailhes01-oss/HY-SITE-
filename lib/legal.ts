/**
 * Informations légales de l'entreprise.
 *
 * ⚠️ À COMPLÉTER AVANT LA MISE EN LIGNE. Les valeurs marquées `À COMPLÉTER`
 * apparaissent telles quelles sur les pages Mentions légales et CGV : elles
 * sont volontairement visibles pour qu'aucune ne passe entre les mailles.
 *
 * Un site commercial français doit publier ces mentions (art. 6 III LCEN), et
 * le formulaire de réservation collecte des données personnelles, ce qui
 * impose une politique de confidentialité (RGPD, art. 13).
 */
export const LEGAL = {
  /** Raison sociale, ex. « Harmonie Yacht SARL ». */
  companyName: "À COMPLÉTER — raison sociale",
  /** Forme juridique, ex. « SARL au capital de 5 000 € ». */
  legalForm: "À COMPLÉTER — forme juridique et capital",
  /** Adresse du siège social. */
  address: "À COMPLÉTER — adresse du siège social",
  /** SIRET à 14 chiffres. */
  siret: "À COMPLÉTER — SIRET",
  /** N° de TVA intracommunautaire, ou « Non assujetti à la TVA ». */
  vat: "À COMPLÉTER — TVA intracommunautaire",
  /** Nom du directeur de la publication. */
  publisher: "À COMPLÉTER — directeur de la publication",
  /** Assurance responsabilité civile professionnelle. */
  insurance: "À COMPLÉTER — assureur RC professionnelle et n° de police",
  /** Hébergeur du site. */
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    url: "https://vercel.com",
  },
  /** Dernière mise à jour des CGV et de la politique de confidentialité. */
  updatedAt: "juillet 2026",
} as const;
