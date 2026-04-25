import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Contribution {
  id: string;
  prenom: string;
  service: string;
  statut: string | null;
  theme: string;
  themes: string[];
  contenu: string;
  anonyme: boolean;
  created_at: string;
  statut_traitement: string;
  cst_date: string | null;
  reponse_direction: string | null;
  derniere_maj: string;
}

interface UpdateTreatmentInput {
  statut_traitement?: string;
  cst_date?: string | null;
  reponse_direction?: string | null;
}

interface UseAdminContributionsReturn {
  contributions: Contribution[];
  loading: boolean;
  updateTreatment: (id: string, data: UpdateTreatmentInput) => Promise<boolean>;
}

export function useAdminContributions(): UseAdminContributionsReturn {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAll = useCallback(async (): Promise<void> => {
    const { data, error } = await supabase
      .from("contributions_elections")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setContributions(data as Contribution[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const updateTreatment = async (
    id: string,
    data: UpdateTreatmentInput,
  ): Promise<boolean> => {
    const { error } = await supabase
      .from("contributions_elections")
      .update(data)
      .eq("id", id);
    if (error) return false;
    setContributions((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, ...data, derniere_maj: new Date().toISOString() } : c,
      ),
    );
    return true;
  };

  return { contributions, loading, updateTreatment };
}
