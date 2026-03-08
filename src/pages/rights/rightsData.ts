import type { CategoriesDroit } from "@/types";

export interface RightCategory {
  id: CategoriesDroit;
  titre: string;
  description: string;
  color: string;
}

export const RIGHTS_CATEGORIES: RightCategory[] = [
  { id: "carriere", titre: "Carriere et remuneration", color: "hsl(var(--primary))", description: "Avancement, RIFSEEP, NBI, promotions." },
  { id: "conges", titre: "Temps de travail et conges", color: "var(--color-cyan)", description: "RTT, CA, conges pour maladie, evenements familiaux." },
  { id: "citis", titre: "Maladie, accident, CITIS", color: "var(--color-red)", description: "Conge invalidite imputable au service, maintien traitement." },
  { id: "discipline", titre: "Discipline et recours", color: "var(--color-navy)", description: "Droits de la defense, conseil de discipline, recours." },
  { id: "rps", titre: "Risques psychosociaux", color: "var(--color-orange)", description: "Harcelement, burn-out, droit d'alerte." },
  { id: "temps_partiel", titre: "Temps partiel et 6/7emes", color: "var(--color-green)", description: "Quotite de travail, calcul, droits associes." },
];
