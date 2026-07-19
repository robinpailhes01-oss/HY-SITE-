// ⚠️ AVIS D'EXEMPLE — à remplacer par de VRAIS avis clients (Google / Instagram)
// avant la mise en ligne publique. Modifier uniquement ce fichier :
// la section avis et les pop-ups de la page réservation se mettent à jour seuls.

export interface Review {
  name: string;
  occasion: string;
  text: string;
  rating: number;
}

export const REVIEWS: Review[] = [
  {
    name: "Julien M.",
    occasion: "Anniversaire",
    text: "Anniversaire surprise de ma femme — le coucher de soleil, les tapas, tout était parfait. On a déjà réservé la nuit insolite.",
    rating: 5,
  },
  {
    name: "Camille R.",
    occasion: "EVJF",
    text: "L'EVJF parfait : capitaine adorable, musique, baignade au large. Les filles en parlent encore des semaines après.",
    rating: 5,
  },
  {
    name: "Sarah & Thomas",
    occasion: "Nuit insolite",
    text: "Réveil face au soleil qui se lève sur une mer déserte… on se croyait seuls au monde. Inoubliable.",
    rating: 5,
  },
];
