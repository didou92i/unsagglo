export interface ThemeOption {
  value: string;
  label: string;
}

export interface ThemeGroup {
  group: string;
  options: ThemeOption[];
}

export const THEME_GROUPS: ThemeGroup[] = [
  {
    group: "Remuneration et Pouvoir d'achat",
    options: [
      { value: "remuneration", label: "Remuneration et pouvoir d'achat" },
      { value: "regime_indemnitaire", label: "Regime indemnitaire (RIFSEEP, primes)" },
      { value: "heures_supplementaires", label: "Heures supplementaires et astreintes" },
      { value: "action_sociale", label: "Action sociale et prestations CNAS" },
    ],
  },
  {
    group: "Conditions de travail",
    options: [
      { value: "organisation_temps", label: "Organisation et temps de travail" },
      { value: "teletravail", label: "Teletravail" },
      { value: "charge_travail", label: "Charge de travail et effectifs" },
      { value: "materiel_equipements", label: "Materiel et equipements" },
    ],
  },
  {
    group: "Carriere et Formation",
    options: [
      { value: "avancement", label: "Avancement et promotion interne" },
      { value: "mobilite", label: "Mobilite et mutation" },
      { value: "formation", label: "Formation professionnelle" },
      { value: "evaluation", label: "Evaluation professionnelle (entretien annuel)" },
    ],
  },
  {
    group: "Sante et Securite",
    options: [
      { value: "rps", label: "Risques psychosociaux (RPS)" },
      { value: "harcelement", label: "Harcelement moral ou professionnel" },
      { value: "accidents_service", label: "Accidents de service / maladie professionnelle" },
      { value: "hygiene_securite", label: "Conditions d'hygiene et de securite" },
    ],
  },
  {
    group: "Droits et Statut",
    options: [
      { value: "conges", label: "Conges et absences" },
      { value: "temps_partiel", label: "Temps partiel" },
      { value: "droits_syndicaux", label: "Droits syndicaux" },
      { value: "egalite_traitement", label: "Egalite de traitement" },
    ],
  },
  {
    group: "Autre",
    options: [
      { value: "autre", label: "Autre (champ libre)" },
    ],
  },
];

export const THEMES: ThemeOption[] = THEME_GROUPS.flatMap((g) => g.options);
