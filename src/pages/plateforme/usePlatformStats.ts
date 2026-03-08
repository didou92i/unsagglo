import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PlatformStats {
  contributions: number;
  votes: number;
}

interface UsePlatformStatsReturn {
  stats: PlatformStats;
  loading: boolean;
}

export function usePlatformStats(): UsePlatformStatsReturn {
  const [stats, setStats] = useState<PlatformStats>({ contributions: 0, votes: 0 });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const [contribRes, optionsRes] = await Promise.all([
        supabase.from("contributions_elections").select("id", { count: "exact", head: true }),
        supabase.from("sondage_options").select("votes"),
      ]);

      const contributions = contribRes.count ?? 0;
      const votes = (optionsRes.data ?? []).reduce((sum, o) => sum + o.votes, 0);

      setStats({ contributions, votes });
      setLoading(false);
    };

    fetch();
  }, []);

  return { stats, loading };
}
