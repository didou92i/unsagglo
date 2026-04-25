import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Campaign, CampaignInput } from "./types";

interface UseAdminCampaignsReturn {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createCampaign: (input: CampaignInput) => Promise<boolean>;
  updateCampaign: (id: string, input: Partial<CampaignInput>) => Promise<boolean>;
  deleteCampaign: (id: string) => Promise<boolean>;
  setActive: (id: string) => Promise<boolean>;
}

export function useAdminCampaigns(): UseAdminCampaignsReturn {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (): Promise<void> => {
    const { data, error: err } = await supabase
      .from("campaigns")
      .select("*")
      .order("start_date", { ascending: false });
    if (err) {
      setError(err.message);
      setCampaigns([]);
    } else if (data) {
      setCampaigns(data as Campaign[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const createCampaign = async (input: CampaignInput): Promise<boolean> => {
    const { error: err } = await supabase.from("campaigns").insert(input);
    if (err) {
      setError(err.message);
      return false;
    }
    await refresh();
    return true;
  };

  const updateCampaign = async (
    id: string,
    input: Partial<CampaignInput>,
  ): Promise<boolean> => {
    const { error: err } = await supabase
      .from("campaigns")
      .update(input)
      .eq("id", id);
    if (err) {
      setError(err.message);
      return false;
    }
    await refresh();
    return true;
  };

  const deleteCampaign = async (id: string): Promise<boolean> => {
    const { error: err } = await supabase.from("campaigns").delete().eq("id", id);
    if (err) {
      setError(err.message);
      return false;
    }
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    return true;
  };

  /** Activate one campaign and deactivate all others (only one can be active). */
  const setActive = async (id: string): Promise<boolean> => {
    const { error: deactErr } = await supabase
      .from("campaigns")
      .update({ active: false })
      .neq("id", id);
    if (deactErr) {
      setError(deactErr.message);
      return false;
    }
    const { error: actErr } = await supabase
      .from("campaigns")
      .update({ active: true })
      .eq("id", id);
    if (actErr) {
      setError(actErr.message);
      return false;
    }
    await refresh();
    return true;
  };

  return {
    campaigns,
    loading,
    error,
    refresh,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    setActive,
  };
}
