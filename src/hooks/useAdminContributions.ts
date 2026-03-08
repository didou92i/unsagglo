import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Contribution {
  id: string;
  prenom: string;
  service: string;
  theme: string;
  contenu: string;
  anonyme: boolean;
  created_at: string;
}

interface UseAdminContributionsReturn {
  contributions: Contribution[];
  loading: boolean;
}

export function useAdminContributions(): UseAdminContributionsReturn {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContributions = async (): Promise<void> => {
      const { data, error } = await supabase
        .from("contributions_elections")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setContributions(data as Contribution[]);
      }
      setLoading(false);
    };

    fetchContributions();
  }, []);

  return { contributions, loading };
}
