import type { CategoriesDroit } from "@/types";

export interface RightCategory {
  id: CategoriesDroit;
  titre: string;
  description: string;
  color: string;
  /**
   * Une catégorie n'est affichée comme cliquable que si `published === true`.
   * Les fiches non publiées sont rendues en carte grisée avec le badge
   * « Fiche en cours de rédaction » et la route correspondante redirige
   * automatiquement vers /rights.
   *
   * Pour publier une nouvelle fiche :
   *   1. Créer le composant React de la fiche (rédaction validée juridiquement).
   *   2. Ajouter la route dédiée dans App.tsx.
   *   3. Passer published à true dans ce fichier.
   */
  published: boolean;
}

export const RIGHTS_CATEGORIES: RightCategory[] = [
  {
    id: "carriere",
    titre: "Carrière et rémunération",
    color: "hsl(var(--primary))",
    description: "Avancement, RIFSEEP, NBI, promotions.",
    published: false,
  },
  {
    id: "conges",
    titre: "Temps de travail et congés",
    color: "var(--color-cyan)",
    description: "RTT, CA, congés pour maladie, événements familiaux.",
    published: false,
  },
  {
    id: "citis",
    titre: "Maladie, accident, CITIS",
    color: "var(--color-red)",
    description: "Congé invalidité imputable au service, maintien du traitement.",
    published: true,
  },
  {
    id: "discipline",
    titre: "Discipline et recours",
    color: "var(--color-navy)",
    description: "Droits de la défense, conseil de discipline, recours.",
    published: false,
  },
  {
    id: "rps",
    titre: "Risques psychosociaux",
    color: "var(--color-orange)",
    description: "Harcèlement, burn-out, droit d'alerte.",
    published: false,
  },
  {
    id: "temps_partiel",
    titre: "Temps partiel et 6/7èmes",
    color: "var(--color-green)",
    description: "Quotité de travail, calcul, droits associés.",
    published: false,
  },
];
