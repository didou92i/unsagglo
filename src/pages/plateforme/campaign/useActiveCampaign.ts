import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { ActiveCampaign } from "./types";

interface UseActiveCampaignReturn {
  campaign: ActiveCampaign | null;
  loading: boolean;
}

export function useActiveCampaign(): UseActiveCampaignReturn {
  const [campaign, setCampaign] = useState<ActiveCampaign | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchActive = async (): Promise<void> => {
      const { data, error } = await supabase.rpc("get_active_campaign");
      if (!error && data && data.length > 0) {
        const c = data[0];
        setCampaign({
          id: c.id,
          title: c.title,
          theme: c.theme,
          description: c.description,
          objective_count: c.objective_count,
          start_date: c.start_date,
          end_date: c.end_date,
          deliverable_label: c.deliverable_label,
          deliverable_date: c.deliverable_date,
          contribution_count: Number(c.contribution_count) || 0,
        });
      }
      setLoading(false);
    };
    void fetchActive();
  }, []);

  return { campaign, loading };
}
