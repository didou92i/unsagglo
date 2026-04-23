import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { CaptationRow } from "./types";

interface UseCaptationsAdminReturn {
  rows: CaptationRow[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  updateStatutRelance: (id: string, statut: string) => Promise<boolean>;
  updateNotes: (id: string, notes: string) => Promise<boolean>;
  deleteRow: (id: string) => Promise<boolean>;
}

export function useCaptationsAdmin(): UseCaptationsAdminReturn {
  const [rows, setRows] = useState<CaptationRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from("captations_aide_carburant")
      .select("*")
      .order("created_at", { ascending: false });
    if (err) {
      setError(err.message);
      setRows([]);
    } else {
      setRows((data ?? []) as CaptationRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchAll();
  }, [fetchAll]);

  const updateStatutRelance = async (
    id: string,
    statut: string,
  ): Promise<boolean> => {
    const { error: err } = await supabase
      .from("captations_aide_carburant")
      .update({ statut_relance: statut })
      .eq("id", id);
    if (err) return false;
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, statut_relance: statut } : r)),
    );
    return true;
  };

  const updateNotes = async (id: string, notes: string): Promise<boolean> => {
    const value = notes.trim() === "" ? null : notes;
    const { error: err } = await supabase
      .from("captations_aide_carburant")
      .update({ notes_internes: value })
      .eq("id", id);
    if (err) return false;
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, notes_internes: value } : r)),
    );
    return true;
  };

  const deleteRow = async (id: string): Promise<boolean> => {
    const { error: err } = await supabase
      .from("captations_aide_carburant")
      .delete()
      .eq("id", id);
    if (err) return false;
    setRows((prev) => prev.filter((r) => r.id !== id));
    return true;
  };

  return {
    rows,
    loading,
    error,
    refresh: fetchAll,
    updateStatutRelance,
    updateNotes,
    deleteRow,
  };
}
