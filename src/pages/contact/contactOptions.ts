import type { SelectOptionGroup } from "@/types/select";

export const CONTACT_OBJECT_VALUES = [
  "accompagnement_disciplinaire",
  "accompagnement_citis",
  "accompagnement_paie",
  "accompagnement_conges_mobilite",
  "accompagnement_rps",
  "accompagnement_autre",
  "droits_carriere",
  "droits_temps_travail",
  "droits_discipline",
  "droits_syndicaux",
  "droits_autre",
  "adhesion_renseignement",
  "adhesion_modification",
  "adhesion_demission",
  "adhesion_don",
  "elections_candidat",
  "elections_scrutin",
  "programme_elections",
  "institutionnel_presse",
  "institutionnel_demande",
  "institutionnel_partenariat",
  "autre",
] as const;

export type ContactObjectValue = (typeof CONTACT_OBJECT_VALUES)[number];

export const CONTACT_OBJECT_GROUPS: SelectOptionGroup[] = [
  {
    group: "Demande d'accompagnement individuel",
    options: [
      {
        value: "accompagnement_disciplinaire",
        label: "Convocation disciplinaire ou entretien préalable",
      },
      {
        value: "accompagnement_citis",
        label: "Accident de service ou de trajet (CITIS)",
      },
      {
        value: "accompagnement_paie",
        label: "Désaccord sur la paie ou le régime indemnitaire",
      },
      {
        value: "accompagnement_conges_mobilite",
        label: "Refus de congé, de temps partiel ou de mobilité",
      },
      {
        value: "accompagnement_rps",
        label: "Risques psychosociaux ou conditions de travail",
      },
      {
        value: "accompagnement_autre",
        label: "Autre situation individuelle",
      },
    ],
  },
  {
    group: "Question sur mes droits",
    options: [
      { value: "droits_carriere", label: "Carrière, avancement, RIFSEEP" },
      { value: "droits_temps_travail", label: "Temps de travail, congés, RTT" },
      { value: "droits_discipline", label: "Discipline et procédures" },
      { value: "droits_syndicaux", label: "Droits syndicaux, DAS, ASA" },
      { value: "droits_autre", label: "Autre question juridique ou statutaire" },
    ],
  },
  {
    group: "Adhésion et vie du syndicat",
    options: [
      { value: "adhesion_renseignement", label: "Renseignement sur l'adhésion" },
      {
        value: "adhesion_modification",
        label: "Modification de mes informations adhérent",
      },
      { value: "adhesion_demission", label: "Démission ou changement d'employeur" },
      { value: "adhesion_don", label: "Don ou soutien à UNSAgglo" },
    ],
  },
  {
    group: "Élections professionnelles décembre 2026",
    options: [
      { value: "elections_candidat", label: "Devenir candidat sur la liste UNSAgglo" },
      { value: "elections_scrutin", label: "Question sur le déroulement du scrutin" },
      { value: "programme_elections", label: "Proposition pour le programme" },
    ],
  },
  {
    group: "Médias et institutionnel",
    options: [
      { value: "institutionnel_presse", label: "Demande presse" },
      { value: "institutionnel_demande", label: "Sollicitation institutionnelle" },
      {
        value: "institutionnel_partenariat",
        label: "Partenariat ou échange inter-syndical",
      },
    ],
  },
  {
    group: "Autre",
    options: [{ value: "autre", label: "Autre demande non listée" }],
  },
];

export const CONTACT_OBJECT_LABELS = CONTACT_OBJECT_GROUPS.flatMap(
  (group) => group.options,
).reduce<Record<string, string>>((labels, option) => {
  labels[option.value] = option.label;
  return labels;
}, {});

export const contactObjectLabel = (value: string): string =>
  CONTACT_OBJECT_LABELS[value] ?? value;
