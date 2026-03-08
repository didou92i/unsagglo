import type { SelectOption, SelectOptionGroup } from "@/types/select";

export type StatutOption = SelectOption;
export type StatutGroup = SelectOptionGroup;

export const STATUT_GROUPS: StatutGroup[] = [
  {
    group: "Fonctionnaires",
    options: [
      { value: "fonctionnaire_titulaire", label: "Fonctionnaire titulaire" },
      { value: "fonctionnaire_stagiaire", label: "Fonctionnaire stagiaire" },
      { value: "fonctionnaire_detachement", label: "Fonctionnaire en detachement" },
      { value: "fonctionnaire_mad", label: "Fonctionnaire mis a disposition" },
    ],
  },
  {
    group: "Agents contractuels — Permanents",
    options: [
      { value: "cdi_public", label: "Contractuel CDI (droit public)" },
      { value: "cdi_prive", label: "Contractuel CDI (droit prive)" },
      { value: "cdd_vacance", label: "Contractuel CDD — Vacance d'emploi (art. 3-2)" },
      { value: "cdd_besoin_permanent", label: "Contractuel CDD — Besoin permanent (art. 3-3)" },
      { value: "cdd_direction", label: "Contractuel CDD — Emploi de direction (art. 47)" },
      { value: "assistante_maternelle", label: "Assistante maternelle" },
    ],
  },
  {
    group: "Agents contractuels — Non permanents",
    options: [
      { value: "cdd_remplacement", label: "Contractuel CDD — Remplacement d'agent absent" },
      { value: "cdd_accroissement", label: "Contractuel CDD — Accroissement temporaire" },
      { value: "cdd_saisonnier", label: "Contractuel CDD — Emploi saisonnier" },
      { value: "apprenti", label: "Apprenti" },
      { value: "stagiaire_ecole", label: "Stagiaire ecole (convention de stage)" },
    ],
  },
  {
    group: "Situations particulieres",
    options: [
      { value: "disponibilite", label: "Agent en disponibilite" },
      { value: "clm_cld", label: "Agent en conge longue maladie / longue duree" },
      { value: "citis", label: "Agent en CITIS (accident de service)" },
      { value: "reclassement", label: "Agent en reclassement" },
      { value: "temps_partiel_therapeutique", label: "Agent a temps partiel therapeutique" },
      { value: "vacataire", label: "Vacataire" },
    ],
  },
  {
    group: "Autre",
    options: [
      { value: "autre_statut", label: "Autre situation (preciser)" },
    ],
  },
];

export const STATUTS: StatutOption[] = STATUT_GROUPS.flatMap((g) => g.options);
