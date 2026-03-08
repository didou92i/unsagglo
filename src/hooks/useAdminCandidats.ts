import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Candidat {
  id: string;
  prenom: string;
  service: string;
  email: string;
  telephone: string;
  adresse: string;
  created_at: string;
}

interface UseAdminCandidatsReturn {
  candidats: Candidat[];
  loading: boolean;
}

export function useAdminCandidats(): UseAdminCandidatsReturn {
  const [candidats, setCandidats] = useState<Candidat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const { data } = await supabase
        .from("candidats_liste")
        .select("*")
        .order("created_at", { ascending: false });
      setCandidats((data as Candidat[]) ?? []);
      setLoading(false);
    };
    void fetch();
  }, []);

  return { candidats, loading };
}
