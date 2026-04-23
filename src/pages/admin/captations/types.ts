export interface CaptationRow {
  id: string;
  email: string;
  created_at: string;
  eligibilite: string;
  critere_bloquant: string | null;
  opt_in_newsletter: boolean;
  composition_foyer: string | null;
  profil_kilometrage: string | null;
  source: string;
  pdf_telecharge: boolean;
  statut_relance: string;
  notes_internes: string | null;
}

export type EligibiliteFilter = "all" | "Éligible" | "Non-éligible";
export type CritereBloquantFilter =
  | "all"
  | "Pas de véhicule"
  | "Statut"
  | "Revenus"
  | "Véhicule employeur"
  | "Kilométrage";
export type NewsletterFilter = "all" | "yes" | "no";
export type StatutRelanceFilter =
  | "all"
  | "Non contacté"
  | "Relancé J+7"
  | "Relancé fin mai"
  | "Adhérent";

export interface CaptationFilters {
  eligibilite: EligibiliteFilter;
  critereBloquant: CritereBloquantFilter;
  newsletter: NewsletterFilter;
  statutRelance: StatutRelanceFilter;
  search: string;
}

export const DEFAULT_FILTERS: CaptationFilters = {
  eligibilite: "all",
  critereBloquant: "all",
  newsletter: "all",
  statutRelance: "all",
  search: "",
};

export const STATUT_RELANCE_OPTIONS: string[] = [
  "Non contacté",
  "Relancé J+7",
  "Relancé fin mai",
  "Adhérent",
];

export const CRITERE_BLOQUANT_OPTIONS: string[] = [
  "Pas de véhicule",
  "Statut",
  "Revenus",
  "Véhicule employeur",
  "Kilométrage",
];
