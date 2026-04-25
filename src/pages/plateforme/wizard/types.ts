import {
  Wallet,
  Receipt,
  Clock,
  HeartHandshake,
  CalendarDays,
  Home,
  TrendingUp,
  Wrench,
  Rocket,
  Repeat,
  GraduationCap,
  ClipboardCheck,
  Brain,
  Shield,
  Activity,
  HardHat,
  Sun,
  Hourglass,
  Megaphone,
  Scale,
  MessageSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
  theme: "Sujets",
  story: "Constat",
  solution: "Proposition",
  identity: "Identité",
  liste: "Liste 2026",
  review: "Récap",
};

export const TOTAL_PROGRESS_STEPS = STEP_ORDER.length;

export const MAX_THEMES = 3;

interface ThemeMeta {
  icon: LucideIcon;
  short: string;
  prompt: string;
}

/** Icon + label + textarea hint for each theme value declared in constants/themes.ts. */
export const THEME_VISUAL: Record<string, ThemeMeta> = {
  remuneration: {
    icon: Wallet,
    short: "Pouvoir d'achat",
    prompt: "Côté pouvoir d'achat, ce qui me ferait vraiment respirer au quotidien c'est…",
  },
  regime_indemnitaire: {
    icon: Receipt,
    short: "RIFSEEP, primes",
    prompt: "Sur mon régime indemnitaire, je trouve qu'il faudrait revoir…",
  },
  heures_supplementaires: {
    icon: Clock,
    short: "Heures sup, astreintes",
    prompt: "Concernant les heures sup' et astreintes, ce qui pose problème dans mon service c'est…",
  },
  action_sociale: {
    icon: HeartHandshake,
    short: "Action sociale, CNAS",
    prompt: "Sur les prestations CNAS et l'action sociale, j'aimerais que…",
  },
  organisation_temps: {
    icon: CalendarDays,
    short: "Temps de travail",
    prompt: "Sur l'organisation et le temps de travail, ce qui pourrait vraiment changer mon quotidien c'est…",
  },
  teletravail: {
    icon: Home,
    short: "Télétravail",
    prompt: "Côté télétravail, dans mon service la situation actuelle c'est…",
  },
  charge_travail: {
    icon: TrendingUp,
    short: "Charge & effectifs",
    prompt: "Sur la charge de travail et les effectifs, ce que je vis concrètement c'est…",
  },
  materiel_equipements: {
    icon: Wrench,
    short: "Matériel",
    prompt: "Côté matériel et équipements, ce qui me manque pour bien faire mon travail c'est…",
  },
  avancement: {
    icon: Rocket,
    short: "Avancement",
    prompt: "Sur l'avancement et la promotion interne, mon expérience c'est…",
  },
  mobilite: {
    icon: Repeat,
    short: "Mobilité",
    prompt: "Concernant la mobilité et les mutations, ce qui pourrait être amélioré c'est…",
  },
  formation: {
    icon: GraduationCap,
    short: "Formation",
    prompt: "Sur la formation professionnelle, ce qui me manque c'est…",
  },
  evaluation: {
    icon: ClipboardCheck,
    short: "Entretien annuel",
    prompt: "Sur l'évaluation professionnelle et l'entretien annuel, je trouve que…",
  },
  rps: {
    icon: Brain,
    short: "Risques psychosociaux",
    prompt: "Sur les risques psychosociaux dans mon service, je constate que…",
  },
  harcelement: {
    icon: Shield,
    short: "Harcèlement",
    prompt: "Concernant la prévention du harcèlement, je pense qu'il faudrait…",
  },
  accidents_service: {
    icon: Activity,
    short: "Accidents de service",
    prompt: "Sur les accidents de service et la maladie professionnelle, mon vécu c'est…",
  },
  hygiene_securite: {
    icon: HardHat,
    short: "Hygiène & sécurité",
    prompt: "Côté hygiène et sécurité dans mes locaux, ce qui doit changer c'est…",
  },
  conges: {
    icon: Sun,
    short: "Congés",
    prompt: "Sur les congés et absences, je trouve que la pratique actuelle…",
  },
  temps_partiel: {
    icon: Hourglass,
    short: "Temps partiel",
    prompt: "Sur le temps partiel, ma situation et mes attentes sont…",
  },
  droits_syndicaux: {
    icon: Megaphone,
    short: "Droits syndicaux",
    prompt: "Sur l'exercice des droits syndicaux dans la collectivité, je note que…",
  },
  egalite_traitement: {
    icon: Scale,
    short: "Égalité de traitement",
    prompt: "Sur l'égalité de traitement entre agents, j'observe que…",
  },
  autre: {
    icon: MessageSquare,
    short: "Autre sujet",
    prompt: "Le sujet que je veux porter à UNSAgglo c'est…",
  },
};
