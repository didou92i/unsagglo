import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Candidat = Tables<"candidats_liste">;

interface UseAdminCandidatsReturn {
  candidats: Candidat[];
  loading: boolean;
}

export function useAdminCandidats(): UseAdminCandidatsReturn {
  const [candidats, setCandidats] = useState<Candidat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const { data } = await supabase
        .from("candidats_liste")
        .select("*")
        .order("created_at", { ascending: false });
      setCandidats(data ?? []);
      setLoading(false);
    };
    void fetchData();
  }, []);

  return { candidats, loading };
}
