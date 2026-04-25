import {
  Inbox,
  Search,
  Megaphone,
  CheckCircle2,
  XCircle,
  Handshake,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type StatutTraitement =
  | "recue"
  | "analysee"
  | "portee_cst"
  | "obtenue"
  | "refusee"
  | "en_negociation";

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
    label: "Analysée par UNSAgglo",
    shortLabel: "Analysée",
    icon: Search,
    color: "#29235c",
    bg: "#eef0f6",
  },
  portee_cst: {
    label: "Portée au CST",
    shortLabel: "Portée CST",
    icon: Megaphone,
    color: "#009fe3",
    bg: "#eff9fe",
  },
  en_negociation: {
    label: "En négociation",
    shortLabel: "Négociation",
    icon: Handshake,
    color: "#a04000",
    bg: "#fff8e1",
  },
  obtenue: {
    label: "Obtenue",
    shortLabel: "Obtenue",
    icon: CheckCircle2,
    color: "#15803d",
    bg: "#dcfce7",
  },
  refusee: {
    label: "Refusée par la direction",
    shortLabel: "Refusée",
    icon: XCircle,
    color: "#e74124",
    bg: "#fff4f1",
  },
};

/** Linear progression — used by the timeline. Refusee/Obtenue are terminal forks. */
export const STATUS_PROGRESSION: StatutTraitement[] = [
  "recue",
  "analysee",
  "portee_cst",
  "obtenue",
];

export const STATUS_OPTIONS_ADMIN: StatutTraitement[] = [
  "recue",
  "analysee",
  "portee_cst",
  "en_negociation",
  "obtenue",
  "refusee",
];
