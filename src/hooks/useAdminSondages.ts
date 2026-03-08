import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SondageOption {
  id: string;
  label: string;
  votes: number;
}

interface AdminSondage {
  id: string;
  question: string;
  theme: string;
  actif: boolean;
  created_at: string;
  options: SondageOption[];
  totalVotes: number;
}

interface CreateSondagePayload {
  question: string;
  theme: string;
  actif: boolean;
  options: string[];
}

interface UseAdminSondagesReturn {
  sondages: AdminSondage[];
  loading: boolean;
  refresh: () => Promise<void>;
  create: (payload: CreateSondagePayload) => Promise<boolean>;
  update: (id: string, payload: CreateSondagePayload) => Promise<boolean>;
  toggleActif: (id: string, actif: boolean) => Promise<void>;
}

export function useAdminSondages(): UseAdminSondagesReturn {
  const [sondages, setSondages] = useState<AdminSondage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const refresh = useCallback(async (): Promise<void> => {
    setLoading(true);
    const { data: rows } = await supabase
      .from("sondages")
      .select("id, question, theme, actif, created_at")
      .order("created_at", { ascending: false });

    if (!rows?.length) {
      setSondages([]);
      setLoading(false);
      return;
    }

    const ids = rows.map((s) => s.id);
    const { data: opts } = await supabase
      .from("sondage_options")
      .select("id, sondage_id, label, votes")
      .in("sondage_id", ids);

    const mapped: AdminSondage[] = rows.map((s) => {
      const options = (opts ?? [])
        .filter((o) => o.sondage_id === s.id)
        .map((o) => ({ id: o.id, label: o.label, votes: o.votes }));
      return {
        ...s,
        options,
        totalVotes: options.reduce((sum, o) => sum + o.votes, 0),
      };
    });

    setSondages(mapped);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const create = async (p: CreateSondagePayload): Promise<boolean> => {
    const { data, error } = await supabase
      .from("sondages")
      .insert({ question: p.question, theme: p.theme, actif: p.actif })
      .select("id")
      .single();
    if (error || !data) return false;

    const optRows = p.options.map((label) => ({
      sondage_id: data.id,
      label,
    }));
    await supabase.from("sondage_options").insert(optRows);
    await refresh();
    return true;
  };

  const update = async (
    id: string,
    p: CreateSondagePayload
  ): Promise<boolean> => {
    await supabase
      .from("sondages")
      .update({ question: p.question, theme: p.theme, actif: p.actif })
      .eq("id", id);

    await supabase.from("sondage_options").delete().eq("sondage_id", id);
    const optRows = p.options.map((label) => ({ sondage_id: id, label }));
    await supabase.from("sondage_options").insert(optRows);
    await refresh();
    return true;
  };

  const toggleActif = async (id: string, actif: boolean): Promise<void> => {
    await supabase.from("sondages").update({ actif }).eq("id", id);
    await refresh();
  };

  return { sondages, loading, refresh, create, update, toggleActif };
}
