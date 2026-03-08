import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface VisitStat {
  page_path: string;
  count: number;
}

interface UseVisitsStatsReturn {
  stats: VisitStat[];
  total: number;
  loading: boolean;
}

export function useVisitsStats(): UseVisitsStatsReturn {
  const [stats, setStats] = useState<VisitStat[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStats = async (): Promise<void> => {
      setLoading(true);
      const { data, error } = await supabase.rpc("get_visit_stats");

      if (!error && data) {
        const mapped = (data as { page_path: string; visit_count: number }[]).map((row) => ({
          page_path: row.page_path,
          count: Number(row.visit_count),
        }));
        setStats(mapped);
        setTotal(mapped.reduce((sum, r) => sum + r.count, 0));
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  return { stats, total, loading };
}
