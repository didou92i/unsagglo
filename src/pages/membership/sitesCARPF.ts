/**
 * Catalogue indicatif des principaux sites/communes de la CARPF.
 * Utilisé comme suggestions dans le champ "site d'affectation"
 * (datalist HTML5). La saisie reste libre — un agent peut renseigner
 * un site non listé (locaux décentralisés, antenne, etc.).
 *
 * Liste à compléter / vérifier au fur et à mesure.
 */
export const SITES_CARPF: readonly string[] = [
  // 95 — Val-d'Oise
  "Roissy-en-France (siège)",
  "Louvres",
  "Goussainville",
  "Garges-lès-Gonesse",
  "Sarcelles",
  "Villiers-le-Bel",
  "Gonesse",
  "Fosses",
  "Marly-la-Ville",
  "Survilliers",
  "Saint-Witz",
  "Vémars",
  "Le Thillay",
  "Vaudherland",
  "Bonneuil-en-France",
  "Chennevières-lès-Louvres",
  "Épiais-lès-Louvres",
  // 77 — Seine-et-Marne
  "Le Mesnil-Amelot",
  "Mauregard",
  "Compans",
  "Othis",
  "Mitry-Mory",
  "Villeneuve-sous-Dammartin",
  "Villeparisis",
  "Dammartin-en-Goële",
  "Juilly",
  "Longperrier",
  "Moussy-le-Neuf",
  "Moussy-le-Vieux",
  "Saint-Mard",
  "Thieux",
  "Rouvres",
  "Nantouillet",
  "Gressy",
] as const;
