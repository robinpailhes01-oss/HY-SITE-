/**
 * L'arc de la journée — la colonne vertébrale chromatique du site.
 *
 * Harmonie Yacht raconte une seule journée en mer : on part dans la lumière de
 * l'après-midi, le ciel s'embrase, puis on reste au mouillage pour la nuit.
 * Chaque page occupe un moment de cet arc et ne recule jamais dans la lumière —
 * c'est ce qui fait que le site se lit comme un récit continu, et non comme une
 * collection d'écrans qui alternent clair/sombre au hasard.
 *
 * Toute couleur de fond, de texte ou d'accent doit venir d'ici. Si une page a
 * besoin d'une teinte qui n'y figure pas, c'est le signe qu'elle sort du récit.
 */

export type Moment = "aube" | "plein-jour" | "heure-doree" | "crepuscule" | "nuit";

export interface MomentTokens {
  /** Fond de page. Sert aussi de repère au VoyageScroller (`data-voyage-bg`). */
  hex: string;
  /** Le contenu se pose-t-il sur un fond sombre ? */
  onDark: boolean;
  /** Heure de référence dans le journal de bord. */
  time: string;
  /** Nom du moment, affiché dans les en-têtes de chapitre. */
  label: string;
  /** Classe de fond de page. */
  page: string;
  /** Texte principal. */
  ink: string;
  /** Texte secondaire — toujours au-dessus de 4.5:1 sur `page`. */
  inkSoft: string;
  /** Mentions légales, notes de bas de bloc. */
  inkFaint: string;
  /** Laiton, calibré pour rester lisible sur le fond du moment. */
  accent: string;
  /** Filets et séparateurs. */
  line: string;
  /** Cartes et encarts posés sur le fond. */
  surface: string;
  /** Bordure de ces encarts. */
  surfaceLine: string;
  /** Dégradé de voile sur les photos de hero. */
  heroOverlay: string;
}

/**
 * Les cinq moments, du plus clair au plus sombre. L'ordre du tableau EST l'ordre
 * du récit : `MOMENT_ORDER.indexOf()` permet de vérifier qu'une page ne remonte
 * pas vers la lumière.
 */
export const MOMENT_ORDER: Moment[] = [
  "aube",
  "plein-jour",
  "heure-doree",
  "crepuscule",
  "nuit",
];

export const AMBIANCE: Record<Moment, MomentTokens> = {
  aube: {
    hex: "#FDFCF9",
    onDark: false,
    time: "08h00",
    label: "Le lever",
    page: "bg-sable-50",
    ink: "text-marine",
    inkSoft: "text-marine/70",
    inkFaint: "text-marine/55",
    accent: "text-brass-400",
    line: "border-marine/10",
    surface: "bg-sable",
    surfaceLine: "border-marine/10",
    // Photo de petit matin : on éclaircit à peine, la lumière fait le travail.
    heroOverlay: "bg-gradient-to-t from-marine-400/92 via-marine-400/45 to-marine-400/10",
  },
  "plein-jour": {
    hex: "#F7F3EA",
    onDark: false,
    time: "14h00",
    label: "Plein jour",
    page: "bg-sable",
    ink: "text-marine",
    inkSoft: "text-marine/70",
    inkFaint: "text-marine/55",
    accent: "text-brass-400",
    line: "border-marine/10",
    surface: "bg-sable-50",
    surfaceLine: "border-marine/10",
    heroOverlay: "bg-gradient-to-t from-marine-400/92 via-marine-400/48 to-marine-400/12",
  },
  "heure-doree": {
    hex: "#1C2C46",
    onDark: true,
    time: "20h30",
    label: "L'heure d'or",
    page: "bg-marine-50",
    ink: "text-sable",
    inkSoft: "text-sable/75",
    inkFaint: "text-sable/55",
    accent: "text-brass",
    line: "border-sable/15",
    surface: "bg-sable/[0.05]",
    surfaceLine: "border-sable/12",
    // Le seul moment où la terracotta entre dans le voile : le ciel s'embrase.
    heroOverlay:
      "bg-gradient-to-t from-marine-400/94 via-terracotta-300/35 to-marine-400/15",
  },
  crepuscule: {
    hex: "#101B2E",
    onDark: true,
    time: "22h00",
    label: "Le crépuscule",
    page: "bg-marine",
    ink: "text-sable",
    inkSoft: "text-sable/75",
    inkFaint: "text-sable/55",
    accent: "text-brass",
    line: "border-sable/15",
    surface: "bg-sable/[0.05]",
    surfaceLine: "border-sable/12",
    heroOverlay: "bg-gradient-to-t from-marine-400/95 via-marine-400/60 to-marine-400/20",
  },
  nuit: {
    hex: "#070C15",
    onDark: true,
    time: "23h00",
    label: "La nuit à l'ancre",
    page: "bg-marine-400",
    ink: "text-sable",
    inkSoft: "text-sable/75",
    inkFaint: "text-sable/50",
    accent: "text-brass",
    line: "border-sable/12",
    surface: "bg-sable/[0.04]",
    surfaceLine: "border-sable/10",
    heroOverlay: "bg-gradient-to-t from-marine-400/96 via-marine-400/72 to-marine-400/35",
  },
};

/**
 * Le moment où chaque page entre dans le récit, et celui où elle le quitte.
 * Une page descend toujours vers la nuit (ou reste sur place) — jamais l'inverse.
 */
export const PAGE_ARC: Record<string, { from: Moment; to: Moment; chapter: string }> = {
  "/": { from: "plein-jour", to: "nuit", chapter: "La traversée" },
  "/sorties": { from: "plein-jour", to: "heure-doree", chapter: "La sortie en mer" },
  "/nuits-insolites": { from: "heure-doree", to: "nuit", chapter: "La nuit insolite" },
  "/la-flotte": { from: "plein-jour", to: "crepuscule", chapter: "Le bateau" },
  "/tarifs": { from: "plein-jour", to: "crepuscule", chapter: "Le carnet de bord" },
  "/galerie": { from: "crepuscule", to: "nuit", chapter: "Le journal" },
  "/contact": { from: "heure-doree", to: "crepuscule", chapter: "Avant de partir" },
  "/reserver": { from: "plein-jour", to: "nuit", chapter: "L'embarquement" },
};
