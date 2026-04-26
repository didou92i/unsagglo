import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { PublicContribution, StatutTraitement } from "./types";

interface UsePublicContributionsReturn {
  contributions: PublicContribution[];
  loading: boolean;
}

const sanitize = (raw: Record<string, unknown>): PublicContribution | null => {
  const id = raw.id;
  const contenu = raw.contenu;
  const service = raw.service;
  const created_at = raw.created_at;
  if (
    typeof id !== "string" ||
    typeof contenu !== "string" ||
    typeof service !== "string" ||
    typeof created_at !== "string"
  ) {
    return null;
  }

  return {
    id,
    prenom: typeof raw.prenom === "string" ? raw.prenom : null,
    service,
    statut: typeof raw.statut === "string" ? raw.statut : null,
    theme: typeof raw.theme === "string" ? raw.theme : "",
    themes: Array.isArray(raw.themes) ? (raw.themes as string[]) : [],
    contenu,
    anonyme: Boolean(raw.anonyme),
    created_at,
    statut_traitement: (typeof raw.statut_traitement === "string"
      ? raw.statut_traitement
      : "recue") as StatutTraitement,
    cst_date: typeof raw.cst_date === "string" ? raw.cst_date : null,
    reponse_direction:
      typeof raw.reponse_direction === "string" ? raw.reponse_direction : null,
    action_unsagglo:
      typeof raw.action_unsagglo === "string" ? raw.action_unsagglo : null,
    derniere_maj: typeof raw.derniere_maj === "string" ? raw.derniere_maj : created_at,
  };
};

export function usePublicContributions(limit = 12): UsePublicContributionsReturn {
  const [contributions, setContributions] = useState<PublicContribution[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeed = async (): Promise<void> => {
      const { data } = await supabase
        .from("public_contributions_feed")
        .select("*")
        .order("derniere_maj", { ascending: false })
        .limit(limit);
      if (data) {
        const safe = (data as Array<Record<string, unknown>>)
          .map(sanitize)
          .filter((c): c is PublicContribution => c !== null);
        setContributions(safe);
      }
      setLoading(false);
    };
    void fetchFeed();
  }, [limit]);

  return { contributions, loading };
}
