import type { ContribFormData } from "../contribSchema";

export interface WizardData extends Partial<ContribFormData> {
  anonyme: boolean;
}

export type WizardStepId =
  | "welcome"
  | "theme"
  | "story"
  | "solution"
  | "identity"
  | "liste"
  | "review";

export const STEP_ORDER: WizardStepId[] = [
  "welcome",
  "theme",
  "story",
  "solution",
  "identity",
  "liste",
  "review",
];

export const STEP_LABELS: Record<WizardStepId, string> = {
  welcome: "Bienvenue",
  theme: "Sujet",
  story: "Constat",
  solution: "Proposition",
  identity: "Identité",
  liste: "Liste 2026",
  review: "Récap",
};

// Step 1 (welcome) is purely informational; counted in the progression so the
// agent sees forward motion immediately on the first click.
export const TOTAL_PROGRESS_STEPS = STEP_ORDER.length;

interface ThemeMeta {
  emoji: string;
  short: string;
  prompt: string;
}

/** Visual metadata for the theme step — short label + emoji + textarea hint. */
export const THEME_VISUAL: Record<string, ThemeMeta> = {
  // Rémunération
  remuneration: {
    emoji: "💰",
    short: "Pouvoir d'achat",
    prompt:
      "Côté pouvoir d'achat, ce qui me ferait vraiment respirer au quotidien c'est…",
  },
  regime_indemnitaire: {
    emoji: "📊",
    short: "RIFSEEP, primes",
    prompt:
      "Sur mon régime indemnitaire, je trouve qu'il faudrait revoir…",
  },
  heures_supplementaires: {
    emoji: "⏱️",
    short: "Heures sup, astreintes",
    prompt:
      "Concernant les heures sup' et astreintes, ce qui pose problème dans mon service c'est…",
  },
  action_sociale: {
    emoji: "🎟️",
    short: "Action sociale, CNAS",
    prompt:
      "Sur les prestations CNAS et l'action sociale, j'aimerais que…",
  },
  // Conditions
  organisation_temps: {
    emoji: "📅",
    short: "Temps de travail",
    prompt:
      "Sur l'organisation et le temps de travail, ce qui pourrait vraiment changer mon quotidien c'est…",
  },
  teletravail: {
    emoji: "🏠",
    short: "Télétravail",
    prompt:
      "Côté télétravail, dans mon service la situation actuelle c'est…",
  },
  charge_travail: {
    emoji: "📈",
    short: "Charge & effectifs",
    prompt:
      "Sur la charge de travail et les effectifs, ce que je vis concrètement c'est…",
  },
  materiel_equipements: {
    emoji: "🛠️",
    short: "Matériel",
    prompt:
      "Côté matériel et équipements, ce qui me manque pour bien faire mon travail c'est…",
  },
  // Carrière
  avancement: {
    emoji: "🚀",
    short: "Avancement",
    prompt:
      "Sur l'avancement et la promotion interne, mon expérience c'est…",
  },
  mobilite: {
    emoji: "🔁",
    short: "Mobilité",
    prompt:
      "Concernant la mobilité et les mutations, ce qui pourrait être amélioré c'est…",
  },
  formation: {
    emoji: "📚",
    short: "Formation",
    prompt:
      "Sur la formation professionnelle, ce qui me manque c'est…",
  },
  evaluation: {
    emoji: "📝",
    short: "Entretien annuel",
    prompt:
      "Sur l'évaluation professionnelle et l'entretien annuel, je trouve que…",
  },
  // Santé
  rps: {
    emoji: "🧠",
    short: "Risques psychosociaux",
    prompt:
      "Sur les risques psychosociaux dans mon service, je constate que…",
  },
  harcelement: {
    emoji: "🛡️",
    short: "Harcèlement",
    prompt:
      "Concernant la prévention du harcèlement, je pense qu'il faudrait…",
  },
  accidents_service: {
    emoji: "🩹",
    short: "Accidents de service",
    prompt:
      "Sur les accidents de service et la maladie professionnelle, mon vécu c'est…",
  },
  hygiene_securite: {
    emoji: "🧯",
    short: "Hygiène & sécurité",
    prompt:
      "Côté hygiène et sécurité dans mes locaux, ce qui doit changer c'est…",
  },
  // Droits
  conges: {
    emoji: "🏖️",
    short: "Congés",
    prompt:
      "Sur les congés et absences, je trouve que la pratique actuelle…",
  },
  temps_partiel: {
    emoji: "🕐",
    short: "Temps partiel",
    prompt:
      "Sur le temps partiel, ma situation et mes attentes sont…",
  },
  droits_syndicaux: {
    emoji: "✊",
    short: "Droits syndicaux",
    prompt:
      "Sur l'exercice des droits syndicaux dans la collectivité, je note que…",
  },
  egalite_traitement: {
    emoji: "⚖️",
    short: "Égalité de traitement",
    prompt:
      "Sur l'égalité de traitement entre agents, j'observe que…",
  },
  autre: {
    emoji: "💬",
    short: "Autre sujet",
    prompt:
      "Le sujet que je veux porter à UNSAgglo c'est…",
  },
};
