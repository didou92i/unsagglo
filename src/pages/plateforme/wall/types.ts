import {
  Inbox,
  Search,
  ScrollText,
  Star,
  CircleSlash,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type StatutTraitement =
  | "recue"
  | "analysee"
  | "integree_programme"
  | "engagement_phare"
  | "non_retenue";

export interface PublicContribution {
  id: string;
  prenom: string | null;
  service: string;
  statut: string | null;
  theme: string;
  themes: string[];
  contenu: string;
  anonyme: boolean;
  created_at: string;
  statut_traitement: StatutTraitement;
  cst_date: string | null;
  reponse_direction: string | null;
  action_unsagglo: string | null;
  derniere_maj: string;
}

interface StatusMeta {
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export const STATUS_META: Record<StatutTraitement, StatusMeta> = {
  recue: {
    label: "Reçue",
    shortLabel: "Reçue",
    icon: Inbox,
    color: "#64748b",
    bg: "#f1f5f9",
  },
  analysee: {
    label: "Analysée par le bureau UNSAgglo",
    shortLabel: "Analysée",
    icon: Search,
    color: "#29235c",
    bg: "#eef0f6",
  },
  integree_programme: {
    label: "Intégrée au programme 2026",
    shortLabel: "Intégrée au programme",
    icon: ScrollText,
    color: "#009fe3",
    bg: "#eff9fe",
  },
  engagement_phare: {
    label: "Engagement phare de campagne",
    shortLabel: "Engagement phare",
    icon: Star,
    color: "#15803d",
    bg: "#dcfce7",
  },
  non_retenue: {
    label: "Non retenue dans le programme",
    shortLabel: "Non retenue",
    icon: CircleSlash,
    color: "#e74124",
    bg: "#fff4f1",
  },
};

/** Linear progression. non_retenue est une issue alternative à integree_programme. */
export const STATUS_PROGRESSION: StatutTraitement[] = [
  "recue",
  "analysee",
  "integree_programme",
  "engagement_phare",
];

export const STATUS_OPTIONS_ADMIN: StatutTraitement[] = [
  "recue",
  "analysee",
  "integree_programme",
  "engagement_phare",
  "non_retenue",
];
