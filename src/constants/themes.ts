export interface ThemeOption {
  value: string;
  label: string;
}

export const THEMES: ThemeOption[] = [
  { value: "remuneration", label: "Remuneration" },
  { value: "conditions_travail", label: "Conditions de travail" },
  { value: "carriere", label: "Carriere" },
  { value: "rps", label: "Risques psychosociaux" },
  { value: "autre", label: "Autre" },
];
